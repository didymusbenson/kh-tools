#!/usr/bin/env python3
"""Rebuild factual KH1FM reference records from reviewed extraction and challenge inputs.
No network, inference, or Chroma writes occur during import. See reference-data.md.
"""
from pathlib import Path
import json,collections
ROOT=Path(__file__).resolve().parents[2]
def read(p): return json.loads((ROOT/p).read_text())
def write(p,v): (ROOT/p).write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
def main():
 data=read('tools/content/import-reference.source.json')
 entries=data['entries']; recipes=data['recipes']; coverage=data['coverage']
 p=ROOT/'tools/content/challenge-reference.json'
 if p.exists(): entries+=json.loads(p.read_text())
 p=ROOT/'tools/content/challenge-coverage.json'
 if p.exists():coverage+=json.loads(p.read_text())
 ids=[e['id'] for e in entries]
 assert len(ids)==len(set(ids)), 'Duplicate entry ID'
 assert len(recipes)==33
 assert collections.Counter(r['set'] for r in recipes)=={1:6,2:6,3:6,4:6,5:6,6:3}
 assert len({r['productId'] for r in recipes})==33
 assert all(r['productId'] in ids and r['entryId'] in ids for r in recipes)
 assert all(i['itemId'] in ids and isinstance(i['quantity'],int) and i['quantity']>0 for r in recipes for i in r['ingredients'])
 for e in entries:
  assert e['verification']!='verified', 'Source research is not hands-on verification'
  assert e['sources'] and e['instructions'] and e['summary']
  assert all(s['url'].startswith('https://') for s in e['sources'])
 write('data/kh1fm/reference.json',entries)
 write('data/kh1fm/recipes.json',recipes)
 write('data/kh1fm/reference-coverage.json',coverage)
 print(json.dumps({'entries':len(entries),'recipes':len(recipes),'categories':dict(collections.Counter(e['category'] for e in entries))},indent=2))
if __name__=='__main__':main()
