"""Check fixed identities/counts and corrected 0.2 predicates/source propagation."""
import json,pathlib,collections,subprocess
root=pathlib.Path(__file__).resolve().parents[3];p=pathlib.Path(__file__).parent/'catalog.ts'
def parse(text):return json.loads(text.split(' = ',1)[1].rsplit(';',1)[0])
e=parse(p.read_text());idx={x['id']:x for x in e};assert len(idx)==len(e)==177
physical=[x for x in e if x.get('collectible',True)];assert len(physical)==55
assert collections.Counter(x['world'] for x in physical)=={'Castle Town':11,'The World Within':21,'Forest of Thorns':16,'Depths of Darkness':7}
assert 'first breakable pillar' in idx['kh02:ww-pillar-potion']['summary']
assert 'second inverted' in idx['kh02:ww-pillar-hi-potion']['summary']
for ident in ['ww-pillar-potion','ww-pillar-hi-potion','ww-pisces','ct-memory','ft-memory','ft-flower-01','ft-flower-02','ft-flower-03','objective:15']:
 assert 'uncertainty' not in idx['kh02:'+ident],ident
assert [idx['kh02:ft-flower-'+str(i).zfill(2)]['name'] for i in [1,2,3]]==['Green flower','Blue flower','Red flower']
for ident in ['ft-save-ether','ft-north-potion']:assert idx['kh02:'+ident]['uncertainty']
assert 'one attack' in idx['kh02:objective:15']['summary']
assert 'one attack' in idx['kh02:wardrobe:grace-purple']['instructions']
assert idx['kh02:objective:13']['uncertainty']==idx['kh02:wardrobe:mystic-pauldron']['uncertainty']
assert 'immediately' in idx['kh02:objective:31']['instructions']
assert 'StrategyWiki' in idx['kh02:objective:50']['uncertainty']
for objective in [14,15,18,26,31,36,41,47,50]:
 a=idx['kh02:objective:'+str(objective).zfill(2)];b=next(x for x in e if x['category']=='wardrobe' and x['order']==objective)
 assert set(a['sources'])<=set(b['sources'])
assert 'Divine Back' in idx['kh02:wardrobe:astral-ornament']['instructions']
assert 'Firaja, Blizzaja and Thundaja' in idx['kh02:achievement:a-magical-finale']['instructions']
baseline=parse(subprocess.check_output(['git','show','f933ab1:src/games/kh02/catalog.ts'],cwd=root,text=True));assert {x['id'] for x in baseline}<=idx.keys()
combat=idx['kh02:reference:combat']['instructions']
for phrase in ['Barrier and Counter Blast','Cartwheel','Aerial Recovery','Curaga','critical HP','Fatal combo survival','except on Critical']:assert phrase in combat,phrase
assert 'https://www.khwiki.com/Second_Chance' in idx['kh02:reference:combat']['sources']
print('0.2: fixed 55-find denominator, stable IDs, route/predicate corrections and wardrobe provenance checks passed.')

assert 'uncertainty' not in idx['kh02:ft-steps-ether']
assert 'left stairs' in idx['kh02:ft-steps-ether']['summary']
assert 'https://www.destinyislands.com/kh-02-bbs/collectables/treasure-chests/' in idx['kh02:ft-steps-ether']['sources']

# Native key mappings are canonical provenance; retain checklist identities.
keys=json.loads((root/'ai_docs/games/kh02/steam-key-provenance.json').read_text())
assert keys['mapped']==keys['total']==15
assert not keys['remaining']
assert next(x for x in keys['records'] if x['name']=='Into the Depths of Darkness')['steamApiKey']=='ACH_05'
assert all(x['directInspection']['container']=='achievement-'+x['steamApiKey'] for x in keys['records'])
assert len({x['steamApiKey'] for x in keys['records']})==keys['mapped']
assert all(x['source']=='https://steamdb.info/app/2552440/stats/' and x['observedRequirement'] for x in keys['records'])
assert {x['name'] for x in keys['records']}=={x['name'] for x in e if x['category']=='achievements'}
achievements={x['name']:x for x in e if x['category']=='achievements'}
for record in keys['records']:
 assert achievements[record['name']]['steamApiName']==record['steamApiKey']
 assert record['source'] in achievements[record['name']]['sources']
