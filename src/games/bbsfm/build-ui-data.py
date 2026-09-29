"""Structured presentation indexes; existing guide/check identities stay unchanged."""
import csv, json, re
from pathlib import Path
from collections import defaultdict
root=Path(__file__).resolve().parents[3]
research=root/'ai_docs/games/bbsfm'
guide=json.loads((root/'src/games/bbsfm/content.json').read_text())
raw=json.loads((research/'melding-reference.json').read_text())
acq=json.loads((research/'acquisition-tables.json').read_text())
def slug(s): return re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-')
def canonical(s): return {'Confusing Strike':'Confusion Strike'}.get(s,s)
def pair(r): return tuple(sorted([(r['command_1'],r['command_1_level']),(r['command_2'],r['command_2_level'])]))
bad={pair(raw['recipes'][i]) for i in raw['audit']['conflict_rows_zero_based']}
existing={r['id'] for r in guide['recipes']};groups={}
for r in raw['recipes']:
 if pair(r) in bad: continue
 for character,rate in r['success_rate_percent_by_character'].items():
  if not rate: continue
  inputs=pair(r)
  ident=f"bbsfm:{slug(character)}:meld:{slug('-'.join(f'{n}-{l}' for n,l in inputs))}"
  assert ident in existing,ident
  group=groups.setdefault(ident,dict(id=ident,character=character,inputs=[dict(name=canonical(n),level=l) for n,l in inputs],outcomes=[]))
  group['outcomes'].append(dict(name=canonical(r['result']),rate=rate,type=r['recipe_type'],abilities=r['possible_abilities_by_crystal'] if r['abilities_attachable'] else {},attachable=r['abilities_attachable'],notes=[raw['footnote_rules'].get(str(n),str(n)) for n in r['footnotes']]))
for g in groups.values(): assert sum(r['rate'] for r in g['outcomes'])==100,g['id']
seed=(root/'bbsmelding/seed_objects.js').read_text()
types={canonical(r['Command']):r['Type'].replace('Reaction','Reprisal') for r in json.loads(re.search(r'var command_types\s*=\s*(\[[\s\S]*?\]);',seed).group(1))}
known=defaultdict(set)
for row in acq['command_shop']['rows']:
 for c in row['characters']: known[canonical(row['name'])].add(c)
for g in groups.values():
 for r in g['inputs']+g['outcomes']:known[r['name']].add(g['character'])
for e in guide['entries']:
 if e['category']=='treasures' and canonical(e['name']) in types:
  known[canonical(e['name'])].add(e['character'].split(' · ')[0])
items={'Potion','Hi-Potion','Mega-Potion','Ether','Mega-Ether','Panacea','Elixir','Megalixir'}
shotlocks={'Bio Barrage','Lightning Ray','Meteor Shower'}
commands=[dict(name=n,type=types.get(n,'Item' if n in items else 'Shotlock' if n in shotlocks else 'Other'),characters=[c for c in ['Terra','Ventus','Aqua'] if c in cs]) for n,cs in sorted(known.items())]
finish=[]
for r in acq['finish_unlocks']['rows']:
 for c in r['characters']:
  parents=[re.sub(r' \((Terra|Ventus|Aqua)\)$','',p) for p in (r['parent_equipped'] or '').split(' or ') if p]
  finish.append(dict(id=f'bbsfm:{slug(c)}:finish:{slug(r["name"])}',name=r['name'],character=c,level=int(r['level']),parents=parents,metric=r['metric'],target=r['target'],style=r['style']))
crystals=[]
for n,cost,shop,arena in [('Shimmering Crystal',300,1,1),('Fleeting Crystal',350,1,1),('Pulsing Crystal',300,1,1),('Wellspring Crystal',300,1,1),('Soothing Crystal',400,1,1),('Hungry Crystal',350,1,1),('Abounding Crystal',400,4,1),('Chaos Crystal',500,5,10),('Secret Gem',1500,8,15)]:
 crystals.append(dict(name=n,cost=cost,shop=shop,arena=arena))
data=dict(commands=commands,groups=list(groups.values()),finish=finish,crystals=crystals,shops=acq['command_shop']['rows'],abilityStacks=list(csv.DictReader((research/'ability-stacks.csv').open())))
(root/'src/games/bbsfm/ui-data.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print(len(groups),'meld groups;',len(commands),'command identities;',len(finish),'finisher nodes')
