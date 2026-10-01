"""Replace a game's stored knowledge with an empty Chroma instance and browser pack.

Run packaging in a separate process afterwards, once Chroma has stopped.
Canonical guide data, player data and model weights are not changed.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil

import chromadb
from chromadb.config import Settings
from check_pack import EXPECTED_EMBEDDING, validate_pack
from seed import ROOT, KNOWLEDGE_RELEASE, digest


def flush(game):
    if not re.fullmatch(r'[a-z0-9-]+', game):
        raise ValueError('Unsafe game ID')
    if KNOWLEDGE_RELEASE['state'] != 'empty':
        raise ValueError('Set an explicit empty knowledge release before flushing.')
    data = json.loads((ROOT / 'public/data' / f'{game}.json').read_text())
    if data['game'] != game:
        raise ValueError('Wrong canonical game')
    database = ROOT / '.copperminds' / game
    # A fresh empty database removes old SQLite/vector files, including residual
    # deleted records. Keep the same independent per-game instance and collection.
    if database.exists():
        shutil.rmtree(database)
    database.mkdir(parents=True)
    client = chromadb.PersistentClient(path=str(database), settings=Settings(anonymized_telemetry=False))
    collection = client.get_or_create_collection('thoughts', metadata={'hnsw:space': 'cosine'}, embedding_function=None)
    if collection.count() != 0:
        raise ValueError('The flushed instance is not empty')
    pack = {'schemaVersion': 1, 'game': game, 'contentVersion': data['version'],
            'contentHash': digest(data), 'knowledgeRevision': KNOWLEDGE_RELEASE['revision'],
            'knowledgeState': 'empty', 'embedding': EXPECTED_EMBEDDING, 'thoughts': []}
    validate_pack(data, pack, allow_empty=True)
    output = ROOT / 'public/data' / f'{game}-coppermind.json'
    output.write_text(json.dumps(pack, separators=(',', ':'), ensure_ascii=False, sort_keys=True) + '\n')
    report = {'game': game, 'databasePath': str(database), 'knowledgeRevision': pack['knowledgeRevision'],
              'knowledgeState': 'empty', 'thoughtCount': 0, 'entryCount': 0, 'categories': {},
              'reason': KNOWLEDGE_RELEASE['reason'], 'contentHash': pack['contentHash'],
              'exportSha256': hashlib.sha256(output.read_bytes()).hexdigest()}
    (database / 'seed-report.json').write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps(report, indent=2))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--game', default='kh1fm')
    flush(parser.parse_args().game)
