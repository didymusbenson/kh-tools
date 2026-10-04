#!/usr/bin/env python3
"""Build presentation-only KH1/KH2/KH3 maps; never infer identity from list position.
Run from any working directory; --check verifies checked-in output without writing.
"""
from collections import Counter, defaultdict
from pathlib import Path
import argparse
import json
import re

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'src/games/treasure-data'
INVENTORY = ROOT / 'ai_docs/ui/treasure-grid-mapping-inventory-2026-10-04.json'

def read(path):
    return json.loads((ROOT / path).read_text())

def validate(data, expected_ids):
    records = data['records']
    assert len(records) == len({r['id'] for r in records}), 'duplicate stable ID'
    assert {r['id'] for r in records} == set(expected_ids), 'missing/unexpected stable ID'
    evidence_ids = {e['id'] for e in data['evidence']}
    groups = defaultdict(list)
    for r in records:
        assert r['included'] is True
        assert r['evidenceId'] in evidence_ids
        if 'journalSlot' in r:
            assert r['orderEvidence'] == 'source-supported'
            groups[(r['scope'], r.get('character'), r['world'])].append(r['journalSlot'])
        else:
            assert r['orderEvidence'] == 'app-defined'
    for key, slots in groups.items():
        assert sorted(slots) == list(range(1, len(slots) + 1)), key
    return data

def build_kh2():
    source = (ROOT / 'src/games/kh2fm/catalog.ts').read_text()
    entries, _ = json.JSONDecoder().raw_decode(source[source.index('= [') + 2:])
    treasures = [e for e in entries if e['category'] in ('treasures', 'prologue')]
    by_id = {e['id']: e for e in treasures}
    candidates = {}
    world = None
    for line in (ROOT / 'ai_docs/games/kh2fm/treasure-candidates.md').read_text().splitlines():
        if line.startswith('## '):
            world = line[3:].split(' — ')[0]
        if line.startswith('| kh2fm.'):
            cells = [c.strip() for c in line.split('|')[1:-1]]
            id_, n, reward, area = cells[:4]
            assert id_ not in candidates
            candidates[id_] = (world, int(n), reward, area)
    routes = read('ai_docs/games/kh2fm/treasure-locations.json')['entries']
    prologue = {e['id']: e for e in read('ai_docs/games/kh2fm/verified-prologue-chests.json')['entries']}
    audit = json.loads(INVENTORY.read_text())['games']['kh2fm']
    matched = set(audit['khguidesCoverage']['matchedEntryIds'])
    assert len(candidates) == 301 and len(prologue) == 16 and len(matched) == 188
    evidence = [
        {'id':'kh2-journal-source','url':'https://www.khguides.com/kh2/collectibles/treasures/','note':'Explicit left-to-right, top-to-bottom Jiminy order; 188 corroborated Sora IDs from the 2026-10-04 identity audit. This table is incomplete for Final Mix; it is not the sole roster authority.'},
        {'id':'kh2-fm-numbered-workbook','url':'https://docs.google.com/spreadsheets/d/1-HNv1dK8_lQ7ibC1q4jwWOdiKXNCYbLh2SBrI0K4ZGo/edit#gid=0','note':'301 checked-in candidate rows preserve Journal numbers. All world/number/reward/area tuples match the runtime catalogue and have checked-in route review. 112 are not independently covered by the current KHGuides table. No native pixel sweep.'},
        {'id':'kh2-disney-07-resolved','url':'https://www.khwiki.com/Game:Disney_Castle','note':'Disney Castle #7, Courtyard, Mythril Shard is the retained Final Mix correction. KHGuides Blazing Shard conflicts; do not overwrite the resolved canonical reward.'},
        {'id':'kh2-roxas-prologue','url':'https://www.khwiki.com/Game:Twilight_Town','note':'16 source-reviewed Roxas chests, including two Dive to Heart chests. Order is the local checklist order in verified-prologue-chests.json, expressly outside Sora Jiminy numbering.'},
    ]
    records=[]
    for e in treasures:
        pro = e['category'] == 'prologue'
        if pro:
            p=prologue[e['id']]
            assert (e['order'], e['reward'], e['area']) == (p['order'],p['reward'],p['area'])
            evidence_id='kh2-roxas-prologue'
        else:
            assert (e['world'],e['order'],e['reward'],e['area']) == candidates[e['id']]
            assert e['id'] in routes
            assert e['instructions'].startswith(routes[e['id']]['instructions']) or e['id']=='kh2fm.treasure.radiant-garden.46', e['id']
            evidence_id = 'kh2-journal-source' if e['id'] in matched else 'kh2-fm-numbered-workbook'
            if e['id']=='kh2fm.treasure.disney-castle.07':
                assert e['reward']=='Mythril Shard' and e['area']=='Courtyard'
                evidence_id='kh2-disney-07-resolved'
        r={'id':e['id'],'world':e['world'],'character':e['character'],'scope':'prologue' if pro else 'main','kind':'chest','companionOrder':e['order'],'sourceNumber':e['order'],'orderEvidence':'app-defined' if pro else 'source-supported','evidenceId':evidence_id,'included':True}
        if not pro:r['journalSlot']=e['order']
        records.append(r)
    assert dict(Counter(r['world'] for r in records if r['scope']=='main')) == audit['worldCounts']
    return validate({'game':'kh2fm','evidence':evidence,'records':records},by_id)

def build_kh3():
    entries=[e for e in read('src/games/kh3/content.json')['entries'] if e['category']=='treasures' or '.remind.' in e['id'] and '.chest.' in e['id']]
    by_id={e['id']:e for e in entries}
    audit=json.loads(INVENTORY.read_text())['games']['kh3']
    mappings=audit['proposedMappings']
    assert len(entries)==254 and len(mappings)==254
    evidence=[
      {'id':'kh3-gummiphone-transcript','url':'https://gamefaqs.gamespot.com/ps4/718920-kingdom-hearts-iii/faqs/78580','note':'Kalavinka GP09, PS4 v1.10/DLC-inclusive transcript; 254 explicit world/number pairs, 245 base + 9 Scala Re Mind. The checked-in 2026-10-04 audit matched 248 exact reward names and 6 harmless aliases; duplicate rewards are not join keys.'},
      {'id':'kh3-map-aliases','url':'https://gamefaqs.gamespot.com/ps4/718920-kingdom-hearts-iii/faqs/78580','note':'GP09 matches Caribbean #17/#18/#19/#20/#51 with only missing space after Map: in canonical strings. Toy Box #6 uses Petit Ribbon versus source Petite Ribbon. Existing rewards and saved IDs are preserved.'},
      {'id':'kh3-olympus-09-pixels','url':'https://www.gameuidatabase.com/uploads/Kingdom-Hearts-III04022021-124325-74189.jpg','note':'Repository reference pixels re-inspected 2026-10-04: Olympus 4 by 8, Twilight Town 8+2, selected Olympus row 2 column 1 is Map: Mount Olympus (#9). Base layout only; this does not establish Re Mind display or every item/slot pair.'},
    ]
    aliases={e['id']:e for e in audit['provenance']['comparison']['normalizationExceptions']}
    records=[]
    for m in mappings:
        e=by_id[m['entryId']]
        assert e['world']==m['world'] and int(re.search(r'Chest (\d+)',e['name'])[1])==m['proposedSlotNumber']
        assert e.get('area') and e.get('instructions') and e.get('reward')
        if e['id'] in aliases:assert e['reward']==aliases[e['id']]['runtime']
        evidence_id='kh3-map-aliases' if e['id'] in aliases else 'kh3-gummiphone-transcript'
        if e['id']=='kh3.base.olympus.chest.009':
            assert e['reward']=='Map: Mount Olympus'
            evidence_id='kh3-olympus-09-pixels'
        n=m['proposedSlotNumber']
        records.append({'id':e['id'],'world':e['world'],'character':'Sora','scope':'main' if m['scope']=='base' else 'remind','kind':'chest','companionOrder':n,'journalSlot':n,'sourceNumber':n,'orderEvidence':'source-supported','evidenceId':evidence_id,'included':True})
    assert Counter(r['scope'] for r in records)=={'main':245,'remind':9}
    return validate({'game':'kh3','evidence':evidence,'records':records,'geometry':{'columns':8,'confidence':'directly-observed-base','note':'Eight columns observed in the base Treasures reference. Re Mind adopts the same readable layout as a companion convention; DLC geometry and combined totals are not pixel-certified.'}},by_id)

# Hand-reviewed source-row crosswalk. Keys identify canonical source rows, not
# journal numbers; values are physical-location codes from the independent snapshot.
KH1_PHYSICAL_ROWS = {
    'Destiny Islands/Treasures/8': 2650011,
    'Traverse Town/Treasures/7': 2650251,
    'Traverse Town/Treasures/12': 2650292,
    'Wonderland/Treasures/0': 2650932,
    'Wonderland/Treasures/1': 2650933,
    'Wonderland/Treasures/2': 2650934,
    'Wonderland/Treasures/3': 2650931,
    'Wonderland/Treasures/8': 2650971,
    'Wonderland/Treasures/16': 2651054,
    'Wonderland/Treasures/20': 2651133,
    'Wonderland/Treasures/22': 2651091,
    'Wonderland/Treasures/31': 2651132,
    'Olympus Coliseum/Treasures/0': 2653332,
    'Olympus Coliseum/Treasures/1': 2653334,
    'Olympus Coliseum/Treasures/4': 2653372,
    'Olympus Coliseum/Treasures/5': 2653371,
    'Olympus Coliseum/Treasures/6': 2653373,
    'Deep Jungle/Treasures/4': 2651331,
    'Deep Jungle/Treasures/6': 2651293,
    'Deep Jungle/Treasures/23': 2651371,
    'Deep Jungle/Treasures/27': 2651332,
    'Agrabah/Treasures/4': 2652092,
    'Agrabah/Treasures/16': 2652054,
    'Agrabah/Treasures/19': 2652332,
    'Agrabah/Treasures/21': 2652133,
    'Agrabah/Treasures/22': 2652171,
    'Agrabah/Treasures/27': 2652254,
    'Agrabah/Treasures/31': 2652291,
    'Monstro/Treasures/6': 2653494,
    'Monstro/Treasures/22': 2655092,
    'Halloween Town/Treasures/2': 2653133,
    'Halloween Town/Treasures/13': 2653132,
    '100 Acre Wood/Treasures/7': 2651692,
    'Hollow Bastion/Treasures/6': 2654494,
    'Hollow Bastion/Treasures/12': 2654332,
    'Hollow Bastion/Treasures/40': 2654292,
    'End of the World/Treasures/23': 2654734,
}
# Special interactions do not become chests merely because the old table said
# Treasures. Cabinet/shell containers are separated from incidental puzzle prizes.
KH1_OTHER_ROWS = {
    'Wonderland/Treasures/6', 'Wonderland/Treasures/7',
    'Olympus Coliseum/Treasures/3', 'Olympus Coliseum/Treasures/7',
    'Halloween Town/Treasures/1', 'Hollow Bastion/Treasures/37',
    '100 Acre Wood/Treasures/2', '100 Acre Wood/Treasures/8',
    *{f'Wonderland/Treasures/{n}' for n in range(23,28)},
    *{f'Neverland/Treasures/{n}' for n in range(12,24)},
    *{f'100 Acre Wood/Treasures/{n}' for n in range(9,14)},
}
KH1_CONTAINER_ROWS = {'Atlantica/Treasures/25', '100 Acre Wood/Treasures/1', 'End of the World/Treasures/20'}
# The source snapshot does not include all Final Mix chests or all container
# types. These two are checked against the same area/reward in the guide.
KH1_GUIDE_CHEST_ROWS = {'Atlantica/Treasures/15', 'Hollow Bastion/Treasures/28', 'Agrabah/Treasures/32', 'Hollow Bastion/Treasures/3', 'End of the World/Treasures/14'}

def build_kh1():
    all_entries=read('data/kh1fm/collectibles.json')
    entries=[e for e in all_entries if e['category']=='treasure']
    snapshot=read('tools/content/import-collectibles.sources.json')['independentChestInventory']
    locations={e['locationCode']:e for e in snapshot['physicalChestLocations']}
    assert len(entries)==306 and len(locations)==216
    source_rows={e['facts']['sourceRow']:e for e in entries}
    assert len(source_rows)==306
    assert set(KH1_PHYSICAL_ROWS)|KH1_OTHER_ROWS|KH1_CONTAINER_ROWS|KH1_GUIDE_CHEST_ROWS <= source_rows.keys()
    assert len(set(KH1_PHYSICAL_ROWS.values()))==len(KH1_PHYSICAL_ROWS)
    evidence=[
        {'id':'kh1-physical-locations','url':snapshot['source'],'note':'216 physical-location names, not a 306-row acquisition inventory. The explicit source-row/location-code subset in treasure-kh-maps.py corroborates physical kinds, not rewards or journal slots. Specialist-only and temporary-story locations have different scope.'},
        {'id':'kh1-guide-physical','url':'https://www.khguides.com/kh/collectibles/treasures/','note':'World/area/reward review supports the lamp-created Defense Up chest, Green Room clock-created chest, Coliseum spell-created chests, and the listed Trinity/Library chests. Cabinet and shell interactions are containers; direct puzzles and timed doors stay other acquisitions.'},
        {'id':'kh1-native-shell','url':'https://www.khwiki.com/Jiminy%27s_Journal','note':'No native Treasures sequence is established. The inspected KH1 HD report/detail references show a facing-page shell only. Every order here is a per-world companion index; grouping never renumbers an acquisition.'},
    ]
    for world in dict.fromkeys(e['world'] for e in entries):
        sample=next(e for e in entries if e['world']==world)
        evidence.append({'id':'kh1-canonical-'+re.sub(r'[^a-z0-9]+','-',world.lower()).strip('-'),'url':sample['sources'][0]['url'],'note':'Canonical KH1FM world/area/reward and acquisition action in data/kh1fm/collectibles.json, with original sourceRow retained there. Explicitly described chests/clam shells and non-chest rewards are physically distinguished; no native slot claim.'})
    records=[]; counters=Counter(); clam_count=0
    for e in entries:
        row=e['facts']['sourceRow']; instruction=e['instructions'].lower()
        ev='kh1-canonical-'+re.sub(r'[^a-z0-9]+','-',e['world'].lower()).strip('-')
        if row in KH1_OTHER_ROWS:
            kind='other-reward'
        elif row in KH1_CONTAINER_ROWS:
            kind='container'
        elif row in KH1_PHYSICAL_ROWS:
            assert locations[KH1_PHYSICAL_ROWS[row]]['world']==e['world']
            kind='chest';ev='kh1-physical-locations'
        elif row in KH1_GUIDE_CHEST_ROWS:
            kind='chest';ev='kh1-guide-physical'
        elif 'clam' in instruction:
            assert e['world']=='Atlantica';clam_count+=1;kind='container'
        elif 'chest' in instruction:
            kind='chest'
        elif e['facts']['countingUnit']=='one-time-reward':
            kind='other-reward'
        else:
            kind='unclassified-acquisition'
        group='physical' if kind in ('chest','container') else 'other'
        counters[e['world']]+=1
        r={'id':e['id'],'world':e['world'],'character':'Sora','scope':'main','kind':kind,'companionOrder':counters[e['world']],'orderEvidence':'app-defined','evidenceId':ev,'included':True}
        if e['facts'].get('acquisitionId'):
            r['acquisitionGroupId']=e['facts']['acquisitionId']
            assert any(x['id']==r['acquisitionGroupId'] for x in all_entries)
        records.append(r)
    assert clam_count==16
    assert Counter(r['kind'] for r in records)=={'chest':190,'container':19,'other-reward':97}
    for world in counters:
        assert sorted(r['companionOrder'] for r in records if r['world']==world)==list(range(1,counters[world]+1))
    assert sum('acquisitionGroupId' in r for r in records)==3
    return validate({'game':'kh1fm','evidence':evidence,'records':records}, [e['id'] for e in entries])


def main():
    parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');args=parser.parse_args()
    builders=[build_kh1,build_kh2,build_kh3]
    for builder in builders:
        data=builder();path=OUT / (data['game']+'.json')
        encoded=json.dumps(data,indent=2,ensure_ascii=False)+'\n'
        if args.check:assert path.read_text()==encoded, f'{path.name} needs regeneration'
        else:path.write_text(encoded)
        print(data['game'],len(data['records']),dict(Counter(r['scope'] for r in data['records'])),dict(Counter(r['kind'] for r in data['records'])))

if __name__=='__main__':main()
