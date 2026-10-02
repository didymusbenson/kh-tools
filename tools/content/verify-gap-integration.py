"""Check seven-game identity/provenance invariants against the published research baseline.

Usage: python3 tools/content/verify-gap-integration.py [checkout] [report.json]
This validates integration; it does not certify factual source claims.
"""
import collections,hashlib,json,re,subprocess,sys
from pathlib import Path
root=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else Path(__file__).resolve().parents[2]
paths={'kh1fm':'public/data/kh1fm.json','recom':'src/games/recom/ui-data.json','kh2fm':'src/games/kh2fm/catalog.ts','bbsfm':'src/games/bbsfm/content.json','dddhd':'src/games/dddhd/content.json','kh02':'src/games/kh02/catalog.ts','kh3':'src/games/kh3/content.json'}
def parse_catalog(path,text):
 if not path.endswith('.ts'):return json.loads(text)
 doc={}
 for key in ('entries','recipes'):
  match=re.search(r'export const '+key+r'[^=]*=\s*',text)
  doc[key]=json.JSONDecoder().raw_decode(text[match.end():])[0] if match else []
 return doc
base={}
for game,path in paths.items():
 doc=parse_catalog(path,subprocess.check_output(['git','show','c5ea2de:'+path],cwd=root,text=True))
 base[game]={'path':path,**{kind:[x['id'] for x in doc.get(kind,[])] for kind in ('entries','recipes')}}
ledgers={'kh1fm':('research-resolution-2026-10-01.md','KH1',20),'recom':('research-resolution-2026-10-01.md','COM',32),'kh2fm':('research-dispositions-2026-10-01.json','KH2',40),'bbsfm':('research-dispositions-2026-10-01.json','BBS',38),'dddhd':('audit-dispositions.json','DDD',25),'kh02':('audit-dispositions.json','KH02',18),'kh3':('audit-dispositions.json','KH3',35)}
report={'baseline':'c5ea2de','scope':'Identity, source presence, recipe links and ledger accounting; factual accuracy assessed separately.','games':{}}
errors=[]
for g,b in base.items():
 p=root/b['path'];s=p.read_text()
 if p.suffix=='.ts':
  doc={}
  for key in ('entries','recipes'):
   m=re.search(r'export const '+key+r'[^=]*=\s*',s)
   doc[key]=json.JSONDecoder().raw_decode(s[m.end():])[0] if m else []
 else: doc=json.loads(s)
 entry_ids={e['id'] for e in doc['entries']}
 out={'path':b['path'],'sha256':hashlib.sha256(p.read_bytes()).hexdigest()}
 for kind in ('entries','recipes'):
  ids=[e['id'] for e in doc.get(kind,[])]
  out[kind]=len(ids)
  out[kind+'RemovedIds']=sorted(set(b[kind])-set(ids))
  out[kind+'AddedIds']=sorted(set(ids)-set(b[kind]))
  out[kind+'DuplicateIds']=[k for k,c in collections.Counter(ids).items() if c>1]
  for check in ('RemovedIds','DuplicateIds'):
   if out[kind+check]:errors.append(g+': '+kind+check)
 out['entriesWithoutSources']=[e['id'] for e in doc['entries'] if not e.get('sources')]
 out['brokenIngredients']=[];out['brokenRecipeEntryLinks']=[]
 for rec in doc.get('recipes',[]):
  for item in rec.get('ingredients',[]):
   ref=item.get('itemId',item.get('id'))
   if ref not in entry_ids:out['brokenIngredients'].append({'recipe':rec['id'],'ingredient':ref})
  for field in ('entryId','productId'):
   if rec.get(field) and rec[field] not in entry_ids:out['brokenRecipeEntryLinks'].append({'recipe':rec['id'],'field':field,'id':rec[field]})
 for check in ('entriesWithoutSources','brokenIngredients','brokenRecipeEntryLinks'):
  if out[check]:errors.append(g+': '+check)
 name,prefix,total=ledgers[g]
 lp=root/'ai_docs/games'/g/name
 if name.endswith('.json'):rows=[(f['id'],f['status']) for f in json.loads(lp.read_text())['findings']]
 else:rows=re.findall(r'^\| ('+prefix+r'-\d{3}) \| ([^|]+) \|',lp.read_text(),re.M)
 ids=[i for i,st in rows];counts=collections.Counter()
 for i,st in rows:
  st=st.strip().lower().replace('*','')
  key='closed' if st.startswith(('closed','resolved')) else 'partial' if st.startswith('partial') else 'unresolvedOrConflicted' if st.startswith(('unresolved','conflicted','blocked','open','researched-open')) else 'otherLimitations'
  counts[key]+=1
 expected={f'{prefix}-{i:03d}' for i in range(1,total+1)}
 out['audit']={'ledger':str(lp.relative_to(root)),'counts':dict(counts),'missingIds':sorted(expected-set(ids)),'unexpectedIds':sorted(set(ids)-expected),'duplicateIds':[k for k,c in collections.Counter(ids).items() if c>1]}
 for key in ('missingIds','unexpectedIds','duplicateIds'):
  if out['audit'][key]:errors.append(g+': audit '+key)
 report['games'][g]=out
report['errors']=errors
report['passed']=not errors
if len(sys.argv)>2:Path(sys.argv[2]).write_text(json.dumps(report,indent=2)+'\n')
for g,v in report['games'].items():print(g,v['entries'],v['recipes'],v['audit']['counts'])
print('PASS' if not errors else 'FAIL: '+repr(errors))
sys.exit(bool(errors))
