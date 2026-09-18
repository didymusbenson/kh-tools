"""Build game-scoped Chroma databases and deterministic browser retrieval exports."""
from __future__ import annotations
import argparse, hashlib, json, re, subprocess, tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MODEL = 'Xenova/all-MiniLM-L6-v2'

def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False).encode()).hexdigest()

def chunks(text, limit=480):
    # Never split words. Keep sentences together when possible; oversized sentences
    # are segmented at whitespace and repeated prerequisites retain their conditions.
    current = ''
    for sentence in re.split(r'(?<=[.!?;])\s+', text.strip()):
        pieces = [sentence]
        if len(sentence) > limit:
            pieces, piece = [], ''
            for word in sentence.split():
                if piece and len(piece) + len(word) + 1 > limit:
                    pieces.append(piece)
                    piece = ''
                piece = f'{piece} {word}'.strip()
            if piece:
                pieces.append(piece)
        for piece in pieces:
            if current and len(current) + len(piece) + 1 > limit:
                yield current
                current = ''
            current = f'{current} {piece}'.strip()
    if current:
        yield current

def thoughts(data):
    game = data['game']
    result = []
    for entry in sorted(data['entries'], key=lambda x: x['id']):
        if entry['game'] != game:
            raise ValueError(f"Cross-game entry: {entry['id']}")
        if entry.get('verification') == 'unresolved' or not entry.get('sources'):
            continue
        scope = ' — '.join(filter(None, [entry['name'], entry.get('world'), entry.get('area')]))
        fields = [('overview', entry.get('summary', '')), ('acquisition', entry.get('instructions', '')),
                  ('prerequisites', entry.get('prerequisites', '')), ('reward', entry.get('reward', '')),
                  ('missability', entry.get('missability', ''))]
        seen = set()
        for kind, value in fields:
            if not value or value.strip() in seen:
                continue
            seen.add(value.strip())
            for number, piece in enumerate(chunks(value)):
                text = f'{scope}. {piece}'
                if kind in ('overview', 'acquisition', 'reward') and entry.get('prerequisites') and entry['prerequisites'] not in text:
                    text += f" Prerequisites: {entry['prerequisites']}"
                if entry.get('uncertainty'):
                    text += f" Qualification: {entry['uncertainty']}"
                result.append({'id': f"{game}:{entry['id']}:{kind}:{number}", 'text': text, 'metadata': {
                    'game': game, 'edition': 'final-mix' if game == 'kh1fm' else game,
                    'entryId': entry['id'], 'category': entry['category'], 'kind': kind,
                    'name': entry['name'], 'world': entry.get('world', ''), 'area': entry.get('area', ''),
                    'tags': ','.join(sorted(set(entry.get('tags', []) + [kind, game, entry['category']]))),
                    'aliases': json.dumps(entry.get('aliases', [])), 'sources': json.dumps(entry['sources'], sort_keys=True),
                    'verification': entry['verification'], 'contentVersion': data['version'],
                    'contentHash': digest(text), 'relatedIds': json.dumps(entry.get('relatedIds', [])),
                }})
    by_id = {entry['id']: entry for entry in data['entries']}
    for recipe in sorted(data.get('recipes', []), key=lambda x:x['id']):
        entry = by_id.get(recipe['entryId'])
        if not entry or recipe.get('verification') == 'unresolved' or not entry.get('sources'):
            continue
        text = f"{recipe['name']} recipe: " + '; '.join(f"{i['quantity']} × {i['name']}" for i in recipe['ingredients']) + f". {recipe['unlock']}"
        metadata = next((dict(r['metadata']) for r in result if r['metadata']['entryId']==entry['id']), None)
        if metadata:
            metadata.update(kind='recipe', contentHash=digest(text), tags=metadata['tags']+',ingredients,synthesis,recipe')
            result.append({'id':f"{game}:{entry['id']}:recipe:0", 'text':text, 'metadata':metadata})
    return result

def seed(data, db_root, output, embedder):
    import chromadb
    from chromadb.config import Settings
    game = data['game']
    if not re.fullmatch(r'[a-z0-9-]+', game):
        raise ValueError('Unsafe canonical game ID')
    records = thoughts(data)
    if not records:
        raise ValueError('No source-backed thoughts to seed')
    vectors = embedder([r['text'] for r in records])
    if len(vectors) != len(records) or any(len(v) != 384 for v in vectors):
        raise ValueError('Embedding dimension/count mismatch')
    db_path = Path(db_root).resolve() / game
    db_path.mkdir(parents=True, exist_ok=True)
    # A dedicated PersistentClient path per game, deliberately not collection-only separation.
    client = chromadb.PersistentClient(path=str(db_path), settings=Settings(anonymized_telemetry=False))
    collection = client.get_or_create_collection('thoughts', metadata={'hnsw:space': 'cosine'}, embedding_function=None)
    existing = set(collection.get()['ids'])
    for offset in range(0, len(records), 128):
        batch = records[offset:offset+128]
        collection.upsert(ids=[r['id'] for r in batch], documents=[r['text'] for r in batch],
                          metadatas=[r['metadata'] for r in batch], embeddings=vectors[offset:offset+128])
    stale = sorted(existing - {r['id'] for r in records})
    if stale:
        collection.delete(ids=stale)
    stored = collection.get(include=['documents', 'metadatas', 'embeddings'])
    ordered = sorted(zip(stored['ids'], stored['documents'], stored['metadatas'], stored['embeddings']), key=lambda x:x[0])
    pack = {'schemaVersion': 1, 'game': game, 'contentVersion': data['version'], 'contentHash': digest(data),
            'embedding': {'model': MODEL, 'dtype': 'fp32', 'dimensions':384, 'pooling':'mean', 'normalize':True, 'revision':'751bff37182d3f1213fa05d7196b954e230abad9'},
            'thoughts': [{'id': i, 'text': t, 'metadata': m, 'vector': [round(float(x), 8) for x in v]} for i,t,m,v in ordered]}
    Path(output).parent.mkdir(parents=True, exist_ok=True)
    Path(output).write_text(json.dumps(pack, separators=(',', ':'), ensure_ascii=False, sort_keys=True) + '\n')
    report = {'game':game, 'databasePath':str(db_path), 'thoughtCount': len(records), 'entryCount':len({r['metadata']['entryId'] for r in records}),
              'contentHash': pack['contentHash'], 'exportSha256':hashlib.sha256(Path(output).read_bytes()).hexdigest(),
              'categories':{c:sum(r['metadata']['category']==c for r in records) for c in sorted({r['metadata']['category'] for r in records})}}
    (db_path / 'seed-report.json').write_text(json.dumps(report, indent=2) + '\n')
    return report

def local_embeddings(texts):
    with tempfile.TemporaryDirectory() as tmp:
        source, target = Path(tmp)/'input.json', Path(tmp)/'output.json'
        source.write_text(json.dumps(texts))
        subprocess.run(['node', str(Path(__file__).with_name('embed.mjs')), str(source), str(target)], check=True, cwd=ROOT)
        return json.loads(target.read_text())

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', required=True)
    parser.add_argument('--db-root', default=str(ROOT / '.copperminds'))
    parser.add_argument('--output', required=True)
    args = parser.parse_args()
    print(json.dumps(seed(json.loads(Path(args.input).read_text()), args.db_root, args.output, local_embeddings), indent=2))
