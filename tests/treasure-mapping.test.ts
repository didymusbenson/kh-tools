import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { GameData } from '../src/domain/types';
import type { GameGuide } from '../src/games/types';
import { acquisitionGroups, emptyPlayerState, makeBackup, parseBackup, validatePlayerState } from '../src/domain/player';
import { emptyProfile, parseProfile } from '../src/games/profile';
import recom, { recomEntries } from '../src/games/recom';
import kh2fm from '../src/games/kh2fm';
import bbsfm from '../src/games/bbsfm';
import dddhd from '../src/games/dddhd';
import kh02 from '../src/games/kh02';
import kh3 from '../src/games/kh3';
import inventory from '../ai_docs/ui/treasure-grid-mapping-inventory-2026-10-04.json';
import rewardSource from '../ai_docs/games/recom/worlds-and-rewards.json';

// These tests deliberately inspect the checked-in mapping contract independently
// of the UI projection: a renderer cannot accidentally make its own bad data pass.
interface MappingRecord {
  id: string;
  world: string;
  character?: string;
  scope: string;
  kind: string;
  companionOrder: number;
  journalSlot?: number;
  sourceNumber?: number;
  orderEvidence: 'source-supported' | 'app-defined' | 'unconfirmed';
  evidenceId?: string;
  included: boolean;
  exclusionReason?: string;
  group?: string;
}
interface Mapping {
  game: string;
  evidence: { id: string; url: string; note: string }[];
  records: MappingRecord[];
}
const games = ['kh1fm', 'recom', 'kh2fm', 'bbsfm', 'dddhd', 'kh02', 'kh3'] as const;
type Game = typeof games[number];
const mappings = Object.fromEntries(games.map(game => [game, JSON.parse(readFileSync(new URL(`../src/games/treasure-data/${game}.json`, import.meta.url), 'utf8'))])) as Record<Game, Mapping>;
const kh1 = JSON.parse(readFileSync(new URL('../public/data/kh1fm.json', import.meta.url), 'utf8')) as GameData;
const guides: GameGuide[] = [recom, kh2fm, bbsfm, dddhd, kh02, kh3];
const entries = { kh1fm: kh1.entries, recom: recom.entries, kh2fm: kh2fm.entries, bbsfm: bbsfm.entries, dddhd: dddhd.entries, kh02: kh02.entries, kh3: kh3.entries };
const mappingCounts: Record<Game, number> = { kh1fm: 306, recom: 41, kh2fm: 317, bbsfm: 383, dddhd: 438, kh02: 41, kh3: 254 };
// Pin every pre-redesign catalogue identity, including non-grid and explicitly
// false saved checks. Presentation-only work must not rename/remove any of them.
const baselineIdentityHashes: Record<Game, string> = {
  kh1fm: '83f1633fb7afd3aeeca99f581561f66f477a91307c139cbe87669a6cd10bb9da',
  recom: '567abc0785653591ecfc40d461d2da892b4d4c288d8c56889f3239d99bd41175',
  kh2fm: 'e1b8b812d5d1cc1f3c41cad00ebd87dd65c0fbb1f5d8a409e123125def714ae9',
  bbsfm: '963952ac94628720345290d5ce873c44e09ae29af05d5e68c44d851cb761a75d',
  dddhd: '4cdf6ddb3c5fd7c06925189fccbe12b50309c231855d9d92f1e8c1c54f3f4d35',
  kh02: '6e7115b0f6c1bf2a6a3bf8258e9c9fea39e8926b899db2c450614ca256bc3f4d',
  kh3: '55ff0f2cf9b121abde61bc52683e3b010373a5287d99a97a7bdf96b073365d3c',
};
const ids = (records: { id: string }[]) => records.map(record => record.id).sort();
const partitionKey = (record: MappingRecord) => JSON.stringify([record.scope, record.character ?? '', record.world]);
const sequence = (count: number) => Array.from({ length: count }, (_, index) => index + 1);
const sortedNumbers = (numbers: number[]) => [...numbers].sort((a, b) => a - b);
const relevant = (game: Game, entry: { category: string }) => game === 'kh1fm' ? entry.category === 'treasure' : game === 'recom' ? entry.category === 'rewards' : game === 'kh2fm' ? ['treasures', 'prologue'].includes(entry.category) : game === 'kh3' ? ['treasures', 'remind-treasures'].includes(entry.category) : entry.category === 'treasures';

describe('stable treasure mapping contract', () => {
  for (const game of games) {
    describe(game, () => {
      const mapping = mappings[game];
      it('covers every relevant acquisition exactly once with real unchanged IDs', () => {
        expect(mapping.game).toBe(game);
        expect(mapping.records).toHaveLength(mappingCounts[game]);
        expect(new Set(ids(mapping.records)).size).toBe(mapping.records.length);
        expect(ids(mapping.records)).toEqual(ids(entries[game].filter(entry => relevant(game, entry))));
        const hash = createHash('sha256').update(ids(entries[game]).join('\n')).digest('hex');
        expect(hash).toBe(baselineIdentityHashes[game]);
        for (const record of mapping.records) {
          const entry = entries[game].find(entry => entry.id === record.id)!;
          expect(record.world, record.id).toBe(entry.world);
          expect(record.scope, record.id).toBeTruthy();
          expect(record.kind, record.id).toBeTruthy();
          expect(typeof record.included, record.id).toBe('boolean');
          if (record.included) {
            expect(entry.checkable, record.id).not.toBe(false);
            expect(Number.isInteger(record.companionOrder), record.id).toBe(true);
            expect(record.companionOrder, record.id).toBeGreaterThan(0);
          } else {
            expect(record.exclusionReason?.trim(), record.id).toBeTruthy();
          }
        }
      });
      it('keeps evidence separate from companion positions and resolves provenance', () => {
        expect(new Set(mapping.evidence.map(source => source.id)).size).toBe(mapping.evidence.length);
        for (const source of mapping.evidence) {
          expect(source.url, source.id).toBeTruthy();
          expect(source.note.trim(), source.id).toBeTruthy();
        }
        for (const record of mapping.records) {
          expect(['source-supported', 'app-defined', 'unconfirmed'], record.id).toContain(record.orderEvidence);
          if (record.evidenceId) expect(mapping.evidence.some(source => source.id === record.evidenceId), record.id).toBe(true);
          if (record.journalSlot !== undefined) {
            expect(record.orderEvidence, record.id).toBe('source-supported');
            expect(record.evidenceId, record.id).toBeTruthy();
            expect(Number.isInteger(record.journalSlot), record.id).toBe(true);
            expect(record.journalSlot, record.id).toBeGreaterThan(0);
          }
          if (record.sourceNumber !== undefined) {
            expect(Number.isInteger(record.sourceNumber), record.id).toBe(true);
            expect(record.sourceNumber, record.id).toBeGreaterThan(0);
          }
        }
      });
      it('has stable contiguous guide positions and no duplicate native positions within a board', () => {
        const partitions = new Map<string, MappingRecord[]>();
        for (const record of mapping.records.filter(record => record.included)) {
          // Groups/facets may show subsets with reference gaps; only the full
          // world/character/scope sequence must be unique and contiguous.
          const key = partitionKey(record);
          partitions.set(key, [...(partitions.get(key) ?? []), record]);
        }
        for (const [key, records] of partitions) {
          expect(sortedNumbers(records.map(record => record.companionOrder)), key).toEqual(sequence(records.length));
          const native = records.filter(record => record.journalSlot !== undefined).map(record => record.journalSlot!);
          expect(new Set(native).size, key).toBe(native.length);
          // Only fully mapped partitions can assert contiguous native slots.
          if (native.length === records.length) expect(sortedNumbers(native), key).toEqual(sequence(records.length));
        }
      });
    });
  }
});

describe('game-specific scope and evidence boundaries', () => {
  it('labels all KH1, Re:CoM and KH0.2 positions as companion order', () => {
    for (const game of ['kh1fm', 'recom', 'kh02'] as const) {
      for (const record of mappings[game].records) {
        expect(record.orderEvidence, record.id).toBe('app-defined');
        expect(record.journalSlot, record.id).toBeUndefined();
      }
    }
  });
  it('keeps Re:CoM base, Days and Bounty claims in semantic order with eligible Bounty priority', () => {
    const records = mappings.recom.records;
    expect(records.every(record => record.included && record.character === 'Sora' && record.scope === 'main' && record.kind === 'reward-claim')).toBe(true);
    for (const [group, count] of [['Base', 12], ['Days bonus', 12], ['Bounty', 17]] as const) expect(records.filter(record => record.group === group)).toHaveLength(count);
    for (const source of rewardSource.records) {
      const record = records.find(record => record.id === source.id)!;
      expect(record.sourceNumber, source.id).toBe('bountyOrder' in source ? source.bountyOrder : undefined);
    }
    for (const partition of inventory.games.recom.partitions) {
      const world = records.filter(record => record.world === partition.world).sort((a, b) => a.companionOrder - b.companionOrder);
      expect(world, partition.world).toHaveLength(partition.Sora);
      expect(world.slice(0, 2).map(record => record.group)).toEqual(['Base', 'Days bonus']);
      expect(world.slice(2).map(record => record.sourceNumber)).toEqual(sequence(world.length - 2));
    }
    expect(records.some(record => record.world === '100 Acre Wood')).toBe(false);
    const atlantica = records.filter(record => record.world === 'Atlantica').sort((a, b) => a.companionOrder - b.companionOrder);
    expect(atlantica.slice(2).map(record => record.id)).toEqual(['recom-sora-atlantica-bounty-shock-impact', 'recom-sora-atlantica-bounty-homing-blizzara']);
    const cards = recomEntries.filter(entry => entry.category === 'cards');
    expect(cards.filter(entry => entry.campaign === 'sora')).toHaveLength(152);
    expect(cards.filter(entry => entry.campaign === 'riku')).toHaveLength(59);
    expect(records.some(record => cards.some(card => card.id === record.id))).toBe(false);
  });
  it('keeps every KH0.2 Zodiac facet on the same chest and retains objective boundaries', () => {
    const records = mappings.kh02.records;
    expect(records.every(record => record.included && record.character === 'Aqua' && record.scope === 'main' && record.kind === 'chest')).toBe(true);
    expect(records.filter(record => record.group === 'Ordinary')).toHaveLength(29);
    expect(ids(records.filter(record => record.group === 'Zodiac'))).toEqual(ids(kh02.entries.filter(entry => entry.categories?.includes('zodiac'))));
    for (const partition of inventory.games.kh02.partitions) {
      const world = records.filter(record => record.world === partition.world);
      expect(world, partition.world).toHaveLength(partition.count);
      expect(world.filter(record => record.group === 'Ordinary')).toHaveLength(partition.ordinary);
      expect(world.filter(record => record.group === 'Zodiac')).toHaveLength(partition.zodiac);
    }
    expect(records.find(record => record.id === 'kh02:ct-main-road')).toMatchObject({ world: 'Castle Town', companionOrder: 1 });
    expect(records.filter(record => record.world === 'Castle Town' && record.id !== 'kh02:ct-main-road')).toHaveLength(9);
    expect(kh02.entries.find(entry => entry.id === 'kh02:objective:37')!.summary).toMatch(/nine|9/);
    for (const id of ['kh02:ft-north-potion', 'kh02:ft-save-ether']) expect(kh02.entries.find(entry => entry.id === id)!.uncertainty).toBeTruthy();
    for (const entry of kh02.entries.filter(entry => entry.categories?.includes('zodiac'))) expect(entry.prerequisites).toMatch(/clear|New Game/i);
    expect(kh02.entries.filter(entry => ['gems', 'flowers', 'memories'].includes(entry.category))).toHaveLength(14);
    expect(records.some(record => record.world === 'Homecoming')).toBe(false);
  });
  it('keeps KH2 Roxas and Cavern scope separate from Sora worlds', () => {
    const sora = mappings.kh2fm.records.filter(record => record.character === 'Sora');
    const roxas = mappings.kh2fm.records.filter(record => record.character === 'Roxas');
    expect(sora).toHaveLength(301);
    expect(roxas).toHaveLength(16);
    expect(new Set(roxas.map(record => record.scope)).size).toBe(1);
    expect(roxas[0].scope).not.toBe(sora[0].scope);
    expect(roxas.every(record => record.journalSlot === undefined && record.orderEvidence === 'app-defined')).toBe(true);
    for (const [world, count] of Object.entries(inventory.games.kh2fm.worldCounts)) expect(sora.filter(record => record.world === world), world).toHaveLength(count);
    const cavern = sora.filter(record => record.world === 'Radiant Garden' && (record.journalSlot ?? 0) >= 23);
    expect(cavern).toHaveLength(24);
    expect(sora.some(record => record.world === 'Atlantica')).toBe(false);
    expect(kh2fm.entries.find(entry => entry.id === 'kh2fm.treasure.disney-castle.07')!.reward).toBe('Mythril Shard');
  });
  it('retains BBS tutorial as excluded acquisition, 374 main chests and eight Secret Episode chests', () => {
    const records = mappings.bbsfm.records;
    const tutorial = records.find(record => record.id === 'bbsfm:ventus:land-of-departure:tutorial-treasure:tutorial')!;
    expect(tutorial.included).toBe(false);
    expect(tutorial.exclusionReason).toBeTruthy();
    expect(tutorial.journalSlot).toBeUndefined();
    expect(records.filter(record => record.included)).toHaveLength(382);
    const secret = records.filter(record => record.id.startsWith('bbsfm:aqua:secret-episode:'));
    expect(secret).toHaveLength(8);
    expect(secret.every(record => record.included)).toBe(true);
    const main = records.filter(record => record.included && !secret.includes(record));
    expect(main).toHaveLength(374);
    for (const [character, count] of Object.entries(inventory.games.bbsfm.mainByCharacter)) expect(main.filter(record => record.character === character), character).toHaveLength(count);
    expect(new Set(main.map(partitionKey)).size).toBe(32);
    expect(new Set(secret.map(record => record.scope)).size).toBe(1);
    expect(secret[0].scope).not.toBe(main[0].scope);
    expect(records.filter(record => !record.included)).toEqual([tutorial]);
    expect(bbsfm.entries.find(entry => entry.id === tutorial.id)!.collectible).toBe(false);
  });
  it('keeps every BBS and DDD repeated reward and every audited character/world partition', () => {
    for (const game of ['bbsfm', 'dddhd'] as const) {
      const records = mappings[game].records;
      for (const partition of inventory.games[game].partitions) {
        const runtimeIds = new Set(entries[game].filter(entry => entry.category === 'treasures' && entry.character === partition.characterScope && entry.world === partition.world).map(entry => entry.id));
        const matched = records.filter(record => runtimeIds.has(record.id));
        expect(matched, `${game}: ${partition.characterScope}: ${partition.world}`).toHaveLength(partition.runtimeRecords);
        expect(matched.filter(record => record.included)).toHaveLength(partition.countedChestCandidates);
      }
      for (const group of inventory.games[game].ambiguousSameRewardSameAreaGroups) {
        expect(records.filter(record => group.ids.includes(record.id))).toHaveLength(group.ids.length);
      }
    }
    const ddd = mappings.dddhd.records;
    expect(ddd.filter(record => record.character === 'Sora')).toHaveLength(225);
    expect(ddd.filter(record => record.character === 'Riku')).toHaveLength(213);
    expect(ddd.every(record => ['Sora', 'Riku'].includes(record.character!) && record.included)).toBe(true);
    expect(new Set(ddd.map(partitionKey)).size).toBe(14);
    const twtnw = ddd.filter(record => record.character === 'Riku' && record.world === 'The World That Never Was').sort((a, b) => a.companionOrder - b.companionOrder);
    expect(twtnw.slice(0, 3).map(record => record.sourceNumber)).toEqual([1, 2, 3]);
  });
  it('retains all 254 source-supported KH3 pairs and the 245/9 episode boundary', () => {
    const records = mappings.kh3.records;
    for (const pair of inventory.games.kh3.proposedMappings) {
      expect(records.find(record => record.id === pair.entryId), pair.entryId).toMatchObject({ world: pair.world, journalSlot: pair.proposedSlotNumber, orderEvidence: 'source-supported', included: true });
    }
    const base = records.filter(record => record.id.startsWith('kh3.base.'));
    const remind = records.filter(record => record.id.startsWith('kh3.remind.'));
    expect(base).toHaveLength(245);
    expect(remind).toHaveLength(9);
    expect(new Set(base.map(record => record.scope)).size).toBe(1);
    expect(new Set(remind.map(record => record.scope)).size).toBe(1);
    expect(base[0].scope).not.toBe(remind[0].scope);
    for (const partition of inventory.games.kh3.partitions) expect(records.filter(record => record.world === partition.world), partition.world).toHaveLength(partition.count);
  });
});

describe('pre-redesign save compatibility', () => {
  it.each(guides.map(guide => [guide.id, guide] as const))('%s round-trips every legacy entry, explicit false checks and quantities without mutation', (_game, guide) => {
    const checks = Object.fromEntries(guide.entries.map((entry, index) => [entry.id, index % 2 === 0]));
    const original = { ...emptyProfile(guide.id), checks, owned: { [guide.entries[0].id]: 3 }, targets: { [guide.entries[1].id]: 7 }, route: `${guide.id}/treasures?entry=${encodeURIComponent(guide.entries[0].id)}` };
    const snapshot = JSON.stringify(original);
    Object.freeze(original.checks);
    Object.freeze(original.owned);
    Object.freeze(original.targets);
    Object.freeze(original);
    const parsed = parseProfile(original, guide);
    expect(parsed).toEqual(original);
    expect(JSON.stringify(original)).toBe(snapshot);
    expect(parsed.checks).not.toBe(original.checks);
    expect(Object.values(parsed.checks)).toContain(false);
    expect(parseProfile(JSON.parse(JSON.stringify(parsed)), guide)).toEqual(original);
    // Display reordering, including the excluded BBS tutorial, must not move a bit.
    const reverseGuide = { ...guide, entries: [...guide.entries].reverse() };
    expect(parseProfile(parsed, reverseGuide)).toEqual(original);
  });
  it.each([true, false])('retains the excluded BBS tutorial saved as %s', completed => {
    const tutorial = 'bbsfm:ventus:land-of-departure:tutorial-treasure:tutorial';
    const original = { ...emptyProfile('bbsfm'), checks: { [tutorial]: completed } };
    expect(parseProfile(JSON.parse(JSON.stringify(original)), bbsfm).checks).toEqual({ [tutorial]: completed });
  });
  it('keeps card discovery and reward claim values independent, and Zodiac aliases on one saved value', () => {
    const reward = 'recom-sora-traverse-town-room-of-rewards-base-lionheart';
    const card = recomEntries.find(entry => entry.name === 'Lionheart' && entry.category === 'cards' && entry.campaign === 'sora')!;
    expect(card).toBeTruthy();
    const profile = { ...emptyProfile('recom'), checks: { [reward]: true, [card.id]: false } };
    expect(parseProfile(profile, recom).checks).toEqual(profile.checks);
    const zodiac = mappings.kh02.records.find(record => record.group === 'Zodiac')!;
    const saved = parseProfile({ ...emptyProfile('kh02'), checks: { [zodiac.id]: false } }, kh02);
    expect(saved.checks).toEqual({ [zodiac.id]: false });
    expect(() => parseProfile(saved, bbsfm)).toThrow('this game');
  });
  it('round-trips KH1 legacy checks and shared acquisition aliases through its separate backup format', () => {
    const checks = Object.fromEntries(kh1.entries.filter(entry => entry.checkable).map((entry, index) => [entry.id, index % 2 === 0]));
    // Existing shared acquisition normalization is respected rather than passing
    // a deliberately conflicting old backup to the strict importer.
    for (const members of acquisitionGroups(kh1).values()) for (const id of members) checks[id] = checks[members[0]];
    const original = { ...emptyPlayerState(), checks, lastRoute: '#/kh1fm/treasure?entry=kh1fm-treasure-destiny-islands-cove-protect-chain-09' };
    const snapshot = JSON.stringify(original);
    Object.freeze(original.checks);
    Object.freeze(original);
    expect(validatePlayerState(original, kh1).checks).toEqual(checks);
    expect(parseBackup(makeBackup(original), kh1)).toEqual(original);
    expect(JSON.stringify(original)).toBe(snapshot);
    expect(Object.values(checks)).toContain(false);
    expect(parseBackup(makeBackup(original), { ...kh1, entries: [...kh1.entries].reverse() }).checks).toEqual(checks);
    expect(() => parseBackup(makeBackup({ ...original, checks: { 'removed-or-invented-id': true } }), kh1)).toThrow('Unknown checks identifier');
    // Local retention is intentionally more permissive than strict imports.
    expect(validatePlayerState({ ...original, checks: { 'legacy-local-id': false } }).checks).toEqual({ 'legacy-local-id': false });
  });
});
