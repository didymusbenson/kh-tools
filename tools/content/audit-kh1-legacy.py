#!/usr/bin/env python3
"""Inventory every legacy KHFM CSV row and compare unambiguous numeric fields.
This is provenance evidence, never an importer or a certification of prose equality.
"""
import csv, hashlib, json, re
from collections import Counter
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
entries=json.loads((ROOT/'data/kh1fm/collectibles.json').read_text())+json.loads((ROOT/'data/kh1fm/reference.json').read_text())
byid={e['id']:e for e in entries}
def norm(s):return re.sub('[^a-z0-9]','',str(s).lower())
def match(name,category):return [e for e in entries if e['category']==category and norm(e['name'])==norm(name)]
def numeric(v):
 try:return float(str(v).replace(',','').replace('+','').removeprefix('x'))
 except ValueError:return None
rows=[];files=[]
for p in sorted((ROOT/'csv').glob('khfm*.csv')):
 data=list(csv.reader(p.open()));files.append({'path':str(p.relative_to(ROOT)),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'rows':len(data)})
 context=None;headers=[];section='';cup='';magic_count=Counter()
 for line,cells in enumerate(data,1):
  row={'source':str(p.relative_to(ROOT))+':'+str(line),'cells':cells,'disposition':'historical-format','canonicalIds':[]}; targets=[]; comparisons=[];kind=p.stem;name=cells[0] if cells else ''
  if kind=='khfmbestiary':
   if (line-1)%8==0:
    section=re.sub(r' \(Final Mix [Ee]xclusive\)','',name);targets=match(section,'enemy');context=targets
    if section=='Behemoth':context=[e for e in entries if e['category']=='enemy' and 'behemoth' in e['id']]
   targets=context or []
   phase=(line-1)%8
   if phase in (4,7):
    mapping=['Before Kairi rescue '+v for v in ['HP','Strength','Defense','MP recovery value','EXP']]+['Base rewards','Worlds'] if phase==4 else [v+' multiplier' for v in ['Physical','Fire','Blizzard','Thunder','Gravity','Stop','Other']]
    if len(targets)==1:
     for column,(value,key) in enumerate(zip(cells,mapping),1):
      current=targets[0].get('facts',{}).get(key)
      if current is not None:comparisons.append({'column':column,'canonicalField':'facts.'+key,'legacy':value,'current':current,'comparison':('equal-numeric' if numeric(value)==numeric(current) else 'different-numeric') if numeric(value) is not None and numeric(current) is not None else 'prose-or-phase-detail-not-equated'})
    row['disposition']='superseded-stats-or-resistances'
   elif phase==1:row['disposition']='excluded-narrative-biography'
  elif kind in ('khfmexp','khfmlevels') and name.isdigit():
   targets=[byid['kh1fm-guide-sora-level-'+name]]
   row['disposition']='superseded-level-record'
   if kind=='khfmexp':
    for j,key in enumerate(['Dusk cumulative EXP','Midday cumulative EXP','Dawn cumulative EXP'],1):
     current=targets[0]['facts'][key];comparisons.append({'column':j+1,'canonicalField':'facts.'+key,'legacy':cells[j],'current':current,'comparison':'equal-numeric' if numeric(cells[j])==current else 'different-numeric'})
   else:
    for j,key in enumerate(['Shared stat gain','Sword rewards','Shield rewards','Rod rewards'],1):
     comparisons.append({'column':j+1,'canonicalField':'facts.'+key,'legacy':cells[j],'current':targets[0]['facts'].get(key,''),'comparison':'legacy-abbreviation-or-empty-not-equated'})
  elif kind in ('khfmequipment','khfmweapons'):
   targets=match(re.sub(r' \(Final Mix [^)]+\)', '', name),'accessory' if kind=='khfmequipment' else 'weapon')
   if targets:
    row['disposition']='superseded-equipment-record'
    if kind=='khfmweapons':
     for j,key in [(1,'Strength'),(3,'MP')]:
      if len(cells)>j and numeric(cells[j]) is not None:
       current=targets[0]['facts'].get(key);comparisons.append({'column':j+1,'canonicalField':'facts.'+key,'legacy':cells[j],'current':current,'comparison':'equal-numeric' if numeric(cells[j])==current else 'different-numeric'})
    else:
     for label,key in [('HP','HP'),('MP','MP'),('AP','AP'),('STR','Strength'),('DEF','Defense')]:
      m=re.search(r'\b'+label+r'\s*([+-]\d+)',cells[1])
      if m:
       current=targets[0]['facts'].get(key);comparisons.append({'column':2,'canonicalField':'facts.'+key,'legacy':m[1],'current':current,'comparison':'equal-numeric' if numeric(m[1])==numeric(current) else 'different-or-unresolved'})
  elif kind=='khfmsynth' and name.isdigit():
   targets=match(cells[1],'recipe');row['disposition']='superseded-recipe';row['canonicalRecipeFile']='data/kh1fm/recipes.json'
  elif kind=='khfmsynthneeded' and line>1:
   targets=match(name,'material');row['disposition']='rejected-hand-maintained-aggregate';row['reason']='Calculate material totals from selected current recipe quantities; do not import legacy aggregate or blank farm strategy.'
  elif kind=='khfmdalmations' and line>1:
   n=int(re.search(r'\d+',name)[0]);targets=[e for e in entries if e.get('facts',{}).get('puppyStart')==n];row['disposition']='superseded-final-mix-puppy-route'
  elif kind=='khfmpages' and line>1:
   targets=[e for e in entries if e['category']=='torn-page' and e.get('world')==name];row['disposition']='superseded-page-route'
  elif kind=='khfmpostcards' and name.isdigit():
   targets=[byid[f'kh1fm-postcard-{int(name):02d}']];row['disposition']='superseded-postcard-route'
  elif kind=='khfmmagic' and line>1:
   families={'Fire':'fire','Fira':'fire','Firaga':'fire','Blizzard':'blizzard','Blizzara':'blizzard','Blizzaga':'blizzard','Thunder':'thunder','Thundara':'thunder','Thundaga':'thunder','Cure':'cure','Cura':'cure','Curaga':'cure','Gravity':'gravity','Gravira':'gravity','Graviga':'gravity','Stop':'stop','Stopra':'stop','Stopga':'stop','Aero':'aero','Aerora':'aero','Aeroga':'aero'}
   family=families.get(name)
   targets=[e for e in entries if e['category']=='magic' and e.get('facts',{}).get('spellFamily')==family];row['disposition']='rejected-fixed-tier-label';row['reason']='Current acquisition events upgrade the family in acquisition order; legacy fixed tier is not a universal prerequisite.'
  elif kind=='khfmtrinity' and line>1:
   targets=[e for e in entries if e['category']=='trinity' and e.get('world')==cells[1] and e.get('facts',{}).get('color')==name];row['disposition']='superseded-location-group';row['reason']='Targets are the explicit color/world group, not a guessed one-to-one route match; current sourceRow manifest identifies individual marks.'
  elif kind=='khfmtournaments':
   if name in ('Phil Cup','Pegasus Cup','Hercules Cup','Hades Cup','Gold Match','Platinum Match'):cup=name
   if cup.endswith('Cup'):
    targets=[e for e in entries if e['category']=='cup' and cup in e['name']]
    seed=re.match(r'(\d+) \(',name)
    if seed:targets=[e for e in targets if e.get('facts',{}).get('seed')==int(seed[1])];row['disposition']='superseded-final-mix-seed'
    elif name.startswith(('Solo','Time Trial','Initial','Defeat','To unlock','To Unlock')):row['disposition']='superseded-cup-rules';row['reason']='Legacy mixes original and FM rewards; current cup/boss records choose Final Mix.'
   elif cup=='Gold Match':targets=[byid['kh1fm-boss-ice-titan']]
   elif cup=='Platinum Match':targets=[byid['kh1fm-boss-sephiroth']]
  row['canonicalIds']=[e['id'] for e in targets]
  if comparisons:row['fieldComparisons']=comparisons
  if row['disposition']=='historical-format' and targets and kind!='khfmbestiary':row['disposition']='superseded-record-context'
  rows.append(row)
summary=Counter(r['disposition'] for r in rows);numeric_summary=Counter(c['comparison'] for r in rows for c in r.get('fieldComparisons',[]))
result={'checkedAt':'2026-10-01','scope':'All 13 tracked legacy KHFM CSVs; every parsed row, no omitted rows. Superseded does not mean a legacy value is false: it means current reviewed canonical sources own the value. Numeric comparisons are exact; prose/location-group links are explicitly not semantic equivalence checks. No CSV is imported into production by this audit. Full historical prose/alternative-source equivalence and Steam binary build provenance remain KH1-020 residuals.','files':files,'rowCount':len(rows),'dispositions':dict(summary),'fieldComparisonCounts':dict(numeric_summary),'rows':rows}
(ROOT/'ai_docs/games/kh1fm/legacy-value-crosswalk.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'rows':len(rows),'dispositions':summary,'comparisons':numeric_summary},indent=2))
