#!/usr/bin/env python3
"""Build BBS/DDD presentation metadata without changing acquisition identities.

Run from any directory. --check verifies the committed output without rewriting.
Sources and intentionally unresolved native-order questions are documented in
ai_docs/ui/treasure-crosswalk-bbs-ddd-2026-10-04.md.
"""
import argparse
import csv
import json
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def read(path):
    return json.loads((ROOT / path).read_text())


def treasures(game):
    return {e['id']: e for e in read(f'src/games/{game}/content.json')['entries']
            if e['category'] == 'treasures'}


def finish(game, records, evidence):
    # A board is character + episode + world. Source number is deliberately not
    # inferred from ID suffixes, global extraction order, or content-array order.
    boards = defaultdict(list)
    for record in records:
        boards[(record['character'], record['scope'], record['world'])].append(record)
    ordered = []
    for board in boards.values():
        board.sort(key=lambda r: (r.get('sourceNumber', 0), r['id']))
        for position, record in enumerate(board, 1):
            record['companionOrder'] = position
        included = [r for r in board if r['included']]
        if included:
            assert [r['sourceNumber'] for r in included] == list(range(1, len(included) + 1))
        ordered.extend(board)
    assert len(ordered) == len({r['id'] for r in ordered})
    assert {r['id'] for r in ordered} == set(treasures(game))
    assert all(r['evidenceId'] in {e['id'] for e in evidence} for r in ordered)
    assert not any('journalSlot' in r for r in ordered)
    return {'game': game, 'evidence': evidence, 'records': ordered}


def build_bbs():
    catalog = treasures('bbsfm')
    with (ROOT / 'ai_docs/games/bbsfm/collectible-inventory.csv').open(newline='') as handle:
        rows = [r for r in csv.DictReader(handle)
                if r['category'] in {'treasure', 'tutorial-treasure'}]
    assert len(rows) == 383 and len(catalog) == 383
    assert {r['id'] for r in rows} == set(catalog)
    evidence = [
        {'id': 'bbs-companion-main',
         'url': 'https://gamefaqs.gamespot.com/psp/943347-kingdom-hearts-birth-by-sleep/faqs/62875',
         'note': 'First-hand original PSP Reports transcript explicitly preserves order and supports 374 main chests. Presentation uses per-character/world CSV source_position as stable companion order, not global runtime order. Target Final Mix/HD slot-to-location parity, including duplicate rewards, is not comprehensively established; journalSlot and native geometry are intentionally omitted.'},
        {'id': 'bbs-companion-duplicates',
         'url': 'https://wikiwiki.jp/kh_bbsfm/宝物リスト/ヴェントゥス',
         'note': 'Numbered Japanese tables preserve separate same-room/reward rows, but explicitly copy original-version material. All nine duplicate groups (18 saved IDs) remain separate. Ventus Disney Town Thunder 11/12 has a landmark-alignment concern between this table and the current guide-order join; do not silently swap progress or certify these as HD slots.'},
        {'id': 'bbs-aqua-tower-correction',
         'url': 'https://www.gamerguides.com/kingdom-hearts-hd-25-remix/guide/birth-by-sleep-final-mix/aquas-story/mysterious-tower',
         'note': 'HD walkthrough confirms Mega Magic Recipe under the staircase. Preserve corrected Aqua Mysterious Tower source position 4 and its existing ID; do not restore the old Mega Attack Recipe typo. This verifies acquisition identity, not target-edition grid geometry.'},
        {'id': 'bbs-companion-secret',
         'url': 'https://www.gamerguides.com/kingdom-hearts-hd-25-remix/guide/birth-by-sleep-final-mix/aquas-story/secret-episode',
         'note': 'HD walkthrough accounts for all eight Secret Episode rewards. Its traversal order differs from the source table sequence; CSV positions are retained as companion references only. No separate native Secret Episode Reports grid or ordering was established. These IDs stay outside the 374 main-chest denominator.'},
        {'id': 'bbs-tutorial-exclusion',
         'url': 'https://www.khwiki.com/Game:Land_of_Departure',
         'note': 'The catalogue retains the Ventus Sliding Dash tutorial acquisition as collectible=false. It is not one of the main Reports chests. Keep its saved ID and detail reachable, but exclude it from chest boards and chest totals.'},
    ]
    inventory = read('ai_docs/ui/treasure-grid-mapping-inventory-2026-10-04.json')
    duplicate_ids = {i for g in inventory['games']['bbsfm']['ambiguousSameRewardSameAreaGroups'] for i in g['ids']}
    assert len(duplicate_ids) == 18
    records = []
    for row in rows:
        entry = catalog[row['id']]
        assert row['world'] == entry['world']
        assert row['name'] == entry['name'] and row['area'] == entry['area']
        tutorial = row['category'] == 'tutorial-treasure'
        secret = row['episode'] == 'secret-episode'
        assert row['episode'] in {'main', 'secret-episode'}
        assert entry['character'] == row['character'] + (' · Secret Episode' if secret else '')
        evidence_id = 'bbs-companion-secret' if secret else 'bbs-companion-main'
        if entry['id'] in duplicate_ids:
            evidence_id = 'bbs-companion-duplicates'
        if entry['id'] == 'bbsfm:aqua:mysterious-tower:treasure:4':
            evidence_id = 'bbs-aqua-tower-correction'
        if tutorial:
            evidence_id = 'bbs-tutorial-exclusion'
        record = {
            'id': entry['id'], 'world': entry['world'],
            'character': entry['character'], 'scope': 'secret' if secret else 'main',
            'kind': 'tutorial' if tutorial else 'chest',
            'companionOrder': 0, 'orderEvidence': 'app-defined',
            'evidenceId': evidence_id, 'included': not tutorial,
        }
        if tutorial:
            assert entry['collectible'] is False and not row['source_position']
            record['exclusionReason'] = 'Tutorial acquisition; retained for saved progress and details, excluded from Reports chest totals.'
        else:
            assert entry['collectible'] is True
            record['sourceNumber'] = int(row['source_position'])
        records.append(record)
    assert Counter(r['character'] for r in records if r['included'] and r['scope'] == 'main') == {'Terra': 122, 'Ventus': 130, 'Aqua': 122}
    assert sum(r['scope'] == 'secret' for r in records) == 8
    assert sum(not r['included'] for r in records) == 1
    return finish('bbsfm', records, evidence)


def build_ddd():
    catalog = treasures('dddhd')
    facts = read('src/games/dddhd/world-facts.json')['treasures']
    routes = read('ai_docs/games/dddhd/chest-route-enrichment.json')['rows']
    route_by_id = {r['id']: r for r in routes}
    assert len(catalog) == len(facts) == len(route_by_id) == 438
    assert set(catalog) == set(route_by_id)
    assert Counter(r['identityStatus'] for r in routes) == {
        'same-item-area-and-source-number': 400, 'quantity-notation-normalized': 20,
        'explicit-hd-reward-replacement': 16, 'unique-item-area-remap': 2,
    }
    fact_by_identity = {(r['character'], r['world'], r['number']): r for r in facts}
    assert len(fact_by_identity) == 438
    evidence = [
        {'id': 'ddd-companion-order',
         'url': 'https://gamefaqs.gamespot.com/3ds/997779-kingdom-hearts-3d-dream-drop-distance/faqs/64967',
         'note': 'The first-hand 3DS Reports transcript explicitly uses journal order and five-across rows. Current HD world-facts numbers are retained as separate sourceNumber values and used for stable companion ordering within each character/world. This is not a 438-row HD native-slot certificate; journalSlot and native geometry are intentionally omitted.'},
        {'id': 'ddd-duplicate-identities',
         'url': 'https://www.kh13.com/forums/topic/40565-treasure-list/',
         'note': 'The 2012 route list and checked-in route ledger retain 12 same-area/reward groups (25 saved IDs), with distinct numbered landmarks. No name-only join or duplicate collapse is allowed. Numbered route rows are acquisition evidence; they do not establish all HD Reports positions.'},
        {'id': 'ddd-hd-replacements',
         'url': 'https://www.khwiki.com/Kingdom_Hearts_Dream_Drop_Distance_HD',
         'note': 'Preserve 16 explicitly reconciled HD replacements in the route ledger: 14 Treasure Goggles to Candy Goggles changes and Sora La Cite des Cloches positions 35/36 (Drop-Me-Not/Catanuki Recipe). The current world-facts rows and existing reward text remain authoritative; never overwrite them with 3DS transcript rewards.'},
        {'id': 'ddd-hd-cloches-replacements',
         'url': 'https://www.khwiki.com/Game:La_Cité_des_Cloches',
         'note': 'Version-marked treasure rows explicitly give Sora 35 as Drop-Me-Not in HD (Block-it Chocolate 2 on 3DS) and 36 as Catanuki Recipe in HD (Drop-Me-Not on 3DS). Both saved IDs and canonical source numbers are preserved.'},
        {'id': 'ddd-hd-riku-remaps',
         'url': 'https://tamaki-game.com/kh3d-riku-world',
         'note': 'HD-specific guide explicitly numbers its maps from the Reports list left-to-right. It supports Curaga 2 and Doubleflight 3, contrary to the old route list 3/2; the unique item/area join already resolved the saved identities. Rechecked 2026-10-04. Stronger evidence for this pair is preserved without claiming that every other board was verified.'},
    ]
    inventory = read('ai_docs/ui/treasure-grid-mapping-inventory-2026-10-04.json')
    duplicate_ids = {i for g in inventory['games']['dddhd']['ambiguousSameRewardSameAreaGroups'] for i in g['ids']}
    assert len(duplicate_ids) == 25
    records = []
    entries_by_identity = {(e['character'], e['world'], e['order']): e for e in catalog.values()}
    assert len(entries_by_identity) == 438
    # Use the world's explicit source sequence for board ordering as well; the
    # runtime array currently begins with special-item rows from several boards.
    for fact in facts:
        entry = entries_by_identity[(fact['character'], fact['world'], fact['number'])]
        route = route_by_id[entry['id']]
        assert entry['reward'] == fact['item'] == route['hdItem']
        assert fact['area'] == route['area']
        # Later acquisition research refines two broad source room labels. These
        # are the same numbered chest, not another cell or a renumbering.
        area_refinements = {
            'dddhd:treasure:sora:the-grid:026': ('Solar Sailer', 'Solar Sailer roof'),
            'dddhd:treasure:riku:country-of-the-musketeers:004': ('Grand Lobby', 'Grand Lobby basement'),
        }
        assert entry['area'] == fact['area'] or area_refinements.get(entry['id']) == (fact['area'], entry['area'])
        assert entry['world'] == route['world'] and entry['character'] == route['character']
        assert fact['number'] == route['currentNumber']
        evidence_id = 'ddd-duplicate-identities' if entry['id'] in duplicate_ids else 'ddd-companion-order'
        if route['identityStatus'] == 'explicit-hd-reward-replacement':
            evidence_id = 'ddd-hd-replacements'
            if entry['character'] == 'Sora' and entry['world'] == 'La Cité des Cloches' and entry['order'] in {35, 36}:
                evidence_id = 'ddd-hd-cloches-replacements'
        if route['identityStatus'] == 'unique-item-area-remap':
            evidence_id = 'ddd-hd-riku-remaps'
            assert entry['world'] == 'The World That Never Was' and entry['character'] == 'Riku'
            assert (fact['number'], route['sourceNumber'], entry['reward']) in {(2, 3, 'Curaga'), (3, 2, 'Doubleflight')}
        records.append({
            'id': entry['id'], 'world': entry['world'], 'character': entry['character'],
            'scope': 'main', 'kind': 'chest', 'companionOrder': 0,
            'sourceNumber': fact['number'], 'orderEvidence': 'app-defined',
            'evidenceId': evidence_id, 'included': True,
        })
    assert Counter(r['character'] for r in records) == {'Sora': 225, 'Riku': 213}
    assert len({(r['character'], r['world']) for r in records}) == 14
    return finish('dddhd', records, evidence)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    for game, data in [('bbsfm', build_bbs()), ('dddhd', build_ddd())]:
        path = ROOT / f'src/games/treasure-data/{game}.json'
        output = json.dumps(data, ensure_ascii=False, indent=2) + '\n'
        if args.check:
            assert path.read_text() == output, f'{path.relative_to(ROOT)} is stale'
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(output)
        print(f"{game}: {len(data['records'])} stable IDs; {sum(r['included'] for r in data['records'])} included; source positions checked; native slots not asserted")


if __name__ == '__main__':
    main()
