"""Check research-to-runtime regressions without network or the shared application suite."""
import json,pathlib,collections,re,subprocess
root=pathlib.Path(__file__).resolve().parents[3];folder=pathlib.Path(__file__).parent
read=lambda n:json.loads((folder/n).read_text())
c=read('content.json');s=read('spirit-facts.json');w=read('world-facts.json');f=read('catalog-facts.json');idx={e['id']:e for e in c['entries']}
assert len(idx)==len(c['entries'])==1283
assert len(c['recipes'])==263
assert len(s)==54 and sum(len(x['board']['nodes']) for x in s)==1144
assert sum(len(x['board']['unmatchedSourceDirections']) for x in s)==1
assert len(w['treasures'])==438 and sum(bool(t['note']) for t in w['treasures'])==51
assert len(w['portals'])==78 and len(w['builtInPortalConfigurations'])==316
assert len(f['materials'])==37 and len(f['commands'])==124 and len(f['abilities'])==43
assert len(f['recipeItems'])==54 and len(f['links'])==43 and sum(len(x['matches']) for x in f['cups'])==27
assert sum(not x['nightmareForm'] for x in s)==9
assert sum(bool(x['rareWorlds']) for x in s)==19
assert sum(x['recipeItemFormula'] for y in s for x in y['formulas'])==54
assert sum(x['probability'] is None and not x['recipeItemFormula'] for y in s for x in y['formulas'])==141
for t in w['treasures']:
 matches=[e for e in c['entries'] if e['category']=='treasures' and e['world']==t['world'] and e['character']==t['character'] and e['order']==t['number']]
 assert len(matches)==1
 if t['note']:assert t['note'] in matches[0]['instructions']
routes=json.loads((root/'ai_docs/games/dddhd/chest-route-enrichment.json').read_text())['rows']
assert len(routes)==438 and len({r['id'] for r in routes})==438
for r in routes:
 e=idx[r['id']]
 assert r['directions'] in e['instructions']
 assert set(r['sources'])<=set(e['sources'])
 assert 'source location-note cell is blank' not in e.get('uncertainty','')
 if r['sourceNumber']!=r['currentNumber']:
  assert r['reportsOrderEvidence']['edition']=='PS4 HD Japanese'
  assert 'HD Reports order: #'+str(r['currentNumber']) in e['instructions']
  assert 'ordering remains unverified' not in e['uncertainty']
assert 'west' in idx['dddhd:treasure:riku:the-world-that-never-was:003']['instructions'].lower()
assert 'Return after completing this world.' in idx['dddhd:treasure:sora:country-of-the-musketeers:032']['prerequisites']
assert next(r['directions'] for r in routes if r['id']=='dddhd:treasure:riku:the-world-that-never-was:003') in idx['dddhd:commands:doubleflight']['instructions']
for name,provider in [('spark-raid','Catanuki'),('vanish','Catanuki'),('ars-arcanum','Beatalike'),('dark-firaga','Tubguin Ace')]:assert provider in idx['dddhd:commands:'+name]['instructions']
assert 'default' in idx['dddhd:abilities:scan']['instructions']
assert 'Proud and Critical' in idx['dddhd:abilities:exp-zero']['instructions']
for ident in ['spirits:aura-lion','commands:faith','commands:curaga','abilities:second-chance']:
 assert 'C-7' in idx['dddhd:'+ident]['uncertainty'] and 'D-7' in idx['dddhd:'+ident]['uncertainty']
assert '[[' not in idx['dddhd:spirits:jestabocky']['uncertainty']
assert 'Moogle Shop: 80 munny' not in idx['dddhd:commands:balloon']['instructions']
assert 'Moogle Shop: 80 munny' in idx['dddhd:training:balloon']['instructions']
assert 'price conflict' not in idx['dddhd:commands:quick-blitz'].get('uncertainty','')
assert '100 munny, or 80 munny' in idx['dddhd:commands:quick-blitz']['instructions']
assert '400 munny' not in idx['dddhd:commands:quick-blitz']['instructions']
assert 'price conflict' not in idx['dddhd:commands:balloonra'].get('uncertainty','')
assert all(e['reward']=='Candy Goggles' for e in c['entries'] if e['category']=='dives' and e['world']=='The Grid')
assert sum(e['category']=='achievements' for e in c['entries'])==54
for e in c['entries']:assert e.get('sources'),e['id']
for r in c['recipes']:assert r.get('sources'),r['id']
# Progress migrations must not lose prior records merely because acquisition routes improved.
baseline=json.loads(subprocess.check_output(['git','show','f933ab1:src/games/dddhd/content.json'],cwd=root))
assert {e['id'] for e in baseline['entries']} <= idx.keys()
assert {r['id'] for r in baseline['recipes']} <= {r['id'] for r in c['recipes']}
# All 124 mechanics were assessed, including tiered articles and cross-game text.
commands={x['name']:x for x in f['commands']}
assert sum(x['reloadSeconds'] is not None for x in f['commands'])==78
assert [x['name'] for x in f['commands'] if x['kind'] in ['Attack','Magic'] and x['reloadSeconds'] is None]==['Strike Raid']
for name,reload in [('Spark Dive',22),('Fire',12),('Fira',18),('Firaga',26),('Cure',20),('Cura',24),('Curaga',30),('Thunder',12),('Thundara',18),('Thundaga',26),('Balloon',12),('Balloonra',18),('Balloonga',26),('Spark',12),('Sparkra',20),('Sparkga',36)]:
 assert commands[name]['reloadSeconds']==reload,name
for x in f['commands']:
 if x['reloadSeconds'] is not None:
  runtime=next(e for e in c['entries'] if e['category']=='commands' and e['name']==x['name'])
  assert 'Reload: '+str(x['reloadSeconds'])+' seconds' in runtime['instructions']
assert commands['Strike Raid']['reloadCandidates']==[22.0,24.0]
assert '22, 24 seconds' in idx['dddhd:commands:strike-raid']['uncertainty']
assert all(x['slotsOrUses'] for x in f['commands'] if x['kind'] in ['Attack','Magic','Item'])
print('DDD: complete catalog, source propagation, HD defaults, probability bounds and stable-ID checks passed.')

# Native key mappings are canonical provenance; retain checklist identities.
keys=json.loads((root/'ai_docs/games/dddhd/steam-key-provenance.json').read_text())
assert keys['mapped']==54
assert len({x['steamApiKey'] for x in keys['records']})==keys['mapped']
assert all(x['source']=='https://steamdb.info/app/2552440/stats/' and x['observedRequirement'] for x in keys['records'])
assert {x['name'] for x in keys['records']}=={x['name'] for x in c['entries'] if x['category']=='achievements'}

# Follow-up evidence must survive both direct entries and reverse acquisition routes.
followup=json.loads((root/'ai_docs/games/dddhd/continuation-facts.json').read_text())['gapFollowup']
assert sum('accessEvidence' in r for r in routes)==11
for r in routes:
 if 'accessEvidence' in r:assert r['accessEvidence']['source'] in idx[r['id']]['sources']
assert 'ride it past the wall' in idx['dddhd:commands:gravity-strike']['instructions']
for key in ['keyblades:sweet-dreams','challenges:secret-cup']:
 assert 'verify ownership separately for Sora and Riku' in idx['dddhd:'+key]['instructions']
 assert 'Steam event retrigger' in idx['dddhd:'+key]['uncertainty']
scoring=followup['flickRushScoring']
assert scoring['spendableMedalPayoutMatrix'] is None
assert len({cup for group in scoring['timeGroups'] for cup in group['cups']})==9
assert scoring['unassignedTimeGroups']==['Speed Cup']
for cup in f['cups']:
 runtime=next(e for e in c['entries'] if e['category']=='challenges' and e['name']==cup['name'])
 assert 'These points are not spendable Medals.' in runtime['instructions']
 assert 'not independently verified' in runtime['uncertainty']
 rounds=len(cup['matches']);assert scoring['cupPrizeThresholdsByRounds'][str(rounds)]['gold']==4*rounds
assert 'LV 15 and LV 17' in idx['dddhd:challenges:secret-cup']['prerequisites']
assert all(next(s for s in read('spirit-facts.json') if s['name']==name)['baseStats']['hp']=='???' for name in ['Catanuki','Beatalike','Tubguin Ace'])
print('DDD follow-up: route propagation, separate character delivery, score/prize boundaries and unknown vanilla stats passed.')
