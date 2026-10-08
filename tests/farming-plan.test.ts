import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { buildGuideFarmingPlan, buildKh1FarmingPlan, partitionFarmingSources, SHARED_FARM_WORLD, UNSPECIFIED_FARM_WORLD } from '../src/games/farmingPlan';
import type { FarmingPlan } from '../src/games/farmingPlan';
import type { GameGuide, CollectionEntry } from '../src/games/types';
import type { GameData, GuideEntry } from '../src/domain/types';
import kh2 from '../src/games/kh2fm';
import bbs from '../src/games/bbsfm';
import ddd from '../src/games/dddhd';
import kh3 from '../src/games/kh3';

const kh1 = JSON.parse(readFileSync('public/data/kh1fm.json', 'utf8')) as GameData;
const material = (guide: GameGuide, name: string, character?: string) => guide.entries.find(e => ['material', 'materials'].includes(e.category) && e.name === name && (!character || e.character === character))!;
const kh1Material = (name: string) => kh1.entries.find(e => e.category === 'material' && e.name === name)!;
const rows = (plan: ReturnType<typeof buildGuideFarmingPlan>) => plan.groups.flatMap(group => group.rows.map(row => ({ ...row, world: group.world })));
const planFor = (guide: GameGuide, names: string[], options: { character?: string; world?: string } = {}) => {
  const entries = names.map(name => material(guide, name, guide.id === 'bbsfm' ? options.character : undefined));
  return buildGuideFarmingPlan(guide, entries, {}, Object.fromEntries(entries.map(e => [e.id, 2])), options);
};
const fixture = (entries: CollectionEntry[]): GameGuide => ({ id: 'test', name: 'Test', edition: 'Test', accent: '', categories: [], worlds: [{ name: 'World A', summary: '' }, { name: 'World B', summary: '' }], entries, coverage: '' });

describe('world farming plan contract', () => {
  it('combines all pending materials, while keeping shared-enemy rates material-specific', () => {
    const plan = planFor(kh2, ['Dark Shard', 'Bright Shard']);
    const world = plan.groups.find(g => g.world === 'Timeless River')!;
    const soldiers = world.rows.filter(row => row.source === 'Soldier');
    expect(soldiers.map(row => [row.materialName, row.rate])).toEqual([['Bright Shard', '4%'], ['Dark Shard', '8%']]);
    expect(soldiers[0].location).toContain('Lilliput');
    expect(soldiers[0].location).toContain("Mickey's House");
    expect(world.rows.filter(row => row.materialName === 'Dark Shard' && row.source === 'Soldier')).toHaveLength(1);
    expect(soldiers.every(row => row.sources.length && row.alternative)).toBe(true);
  });
  it('counts unknown stock separately, excludes satisfied and zero targets, and never treats missing stock as zero', () => {
    const entries = ['Dark Shard', 'Bright Shard', 'Bright Gem', 'Frost Shard'].map(name => material(kh2, name));
    const [unknown, satisfied, pending, off] = entries;
    const targets = { [unknown.id]: 3, [satisfied.id]: 3, [pending.id]: 3, [off.id]: 0 };
    const owned = { [satisfied.id]: 4, [pending.id]: 0 };
    const plan = buildGuideFarmingPlan(kh2, entries, owned, targets);
    expect(plan).toMatchObject({ pendingCount: 2, satisfiedCount: 1, unknownCount: 1 });
    expect(new Set(rows(plan).map(row => row.materialId))).toEqual(new Set([unknown.id, pending.id]));
    expect(owned).toEqual({ [satisfied.id]: 4, [pending.id]: 0 });
    expect(targets[off.id]).toBe(0);
  });
  it('deduplicates identical sources without merging distinct materials or conditional rates', () => {
    const a: CollectionEntry = { id: 'a', name: 'A', category: 'materials', summary: '', drops: [
      { enemy: 'Enemy', rate: '6% (late game)', location: 'World A · Room' },
      { enemy: 'Enemy', rate: '6% (late game)', location: 'World A · Room', details: 'Only after the story.' },
      { enemy: 'Enemy', rate: '', location: 'World A · Another room' },
    ], sources: ['https://example.com/source'] };
    const b = { ...a, id: 'b', name: 'B' };
    const plan = buildGuideFarmingPlan(fixture([a, b]), [a, a, b], {}, { a: 1, b: 1 });
    expect(plan.pendingCount).toBe(2);
    expect(rows(plan)).toHaveLength(4);
    expect(rows(plan).filter(row => row.rate === 'Unknown')).toHaveLength(2);
    expect(rows(plan).find(row => row.rate.startsWith('6%'))?.details).toContain('Only after the story.');
    expect(new Set(rows(plan).map(row => row.id)).size).toBe(4);
  });
  it('does not infer worlds from prose, shop unlock requirements, or unknown encounter fields', () => {
    const entry: CollectionEntry = { id: 'a', name: 'A', category: 'materials', summary: 'Visit World A after World B.', instructions: 'Clear World B.', drops: [{ enemy: 'Enemy', rate: '12%', location: 'Unknown; World A is not verified' }] };
    const plan = buildGuideFarmingPlan(fixture([entry]), [entry], {}, { a: 1 });
    expect(plan.groups.map(g => g.world)).toEqual([UNSPECIFIED_FARM_WORLD]);
    expect(rows(plan)[0]).toMatchObject({ rate: '12%', location: 'Unknown; World A is not verified' });
  });
  it('does not change counts when filtering a view by world', () => {
    const entries = ['Dark Shard', 'Frost Gem'].map(name => material(kh2, name));
    const targets = Object.fromEntries(entries.map(e => [e.id, 2]));
    const plan = buildGuideFarmingPlan(kh2, entries, {}, targets, { world: 'Timeless River' });
    expect(plan.pendingCount).toBe(2);
    expect(plan.unknownCount).toBe(2);
    expect(plan.groups.map(g => g.world)).toEqual(['Timeless River']);
  });
});

describe('sourced guide adapters', () => {
  it('preserves KH2 conditional Vendor rules and normalizes curly apostrophes', () => {
    const plan = planFor(kh2, ['Serenity Crystal', 'Orichalcum']);
    const castle = plan.groups.find(g => g.world === "Beast's Castle")!;
    expect(castle.rows.some(row => row.materialName === 'Orichalcum' && row.source === 'Bulky Vendor')).toBe(true);
    const serenity = rows(plan).find(row => row.materialName === 'Serenity Crystal' && row.source === 'Bulky Vendor')!;
    expect(serenity.rate).toBe('Conditional');
    expect(serenity.details.join(' ')).toContain('1–24% HP');
    expect(serenity.details.join(' ')).toContain('Original KHII Nobody Serenity drops do not apply in Final Mix');
  });
  it('retains KH2 finite chest and synthesis alternatives', () => {
    const plan = planFor(kh2, ['Mythril Shard']);
    expect(rows(plan).some(row => row.source === 'Synthesis' && row.world === SHARED_FARM_WORLD)).toBe(true);
    expect(rows(plan).some(row => row.rate === 'One-time reward' && row.world === 'Twilight Town')).toBe(true);
  });
  it('keeps BBS campaign targets separate and does not promote main-story sources into Aqua episodes', () => {
    const entries = bbs.entries.filter(e => e.category === 'materials' && e.name === 'Secret Gem');
    const targets = Object.fromEntries(entries.map(e => [e.id, 1]));
    const aqua = buildGuideFarmingPlan(bbs, entries, {}, targets, { character: 'Aqua' });
    expect(aqua.pendingCount).toBe(1);
    expect(rows(aqua).every(row => row.character === 'Aqua')).toBe(true);
    expect(rows(aqua).some(row => row.world === 'Radiant Garden' && row.details.join(' ').includes('Final Episode'))).toBe(true);
    for (const scope of ['Aqua · Final Episode', 'Aqua: Final Episode', 'Aqua · Secret Episode']) {
      expect(buildGuideFarmingPlan(bbs, entries, {}, targets, { character: scope }).groups).toEqual([]);
    }
  });
  it('preserves BBS shop-level bands and marks unnormalized enemy worlds as unverified', () => {
    const plan = planFor(bbs, ['Fleeting Crystal'], { character: 'Terra' });
    const spider = rows(plan).find(row => row.source === 'Spiderchest')!;
    expect(spider).toMatchObject({ world: UNSPECIFIED_FARM_WORLD, rate: '3.6% (Shop Lv 1–2 only)', character: 'Terra' });
    expect(spider.details.join(' ')).toContain('Absent from the Shop Lv 3–8');
    const twister = rows(plan).find(row => row.world === 'Keyblade Graveyard')!;
    expect(twister.rate).toBe('Unknown');
    expect(twister.details.join(' ')).toContain('exact per-encounter rates');
    expect(rows(plan).some(row => row.source === 'Medal shop' && row.world === 'Mirage Arena')).toBe(true);
  });
  it('retains both BBS Abounding Crystal routes and ordinary-only Secret Gem rates', () => {
    const plan = planFor(bbs, ['Abounding Crystal', 'Secret Gem'], { character: 'Terra' });
    const abounding = rows(plan).filter(row => row.materialName === 'Abounding Crystal' && row.source === 'Mandrake');
    expect(abounding.map(row => row.world)).toEqual(['Keyblade Graveyard', 'Radiant Garden']);
    expect(abounding.find(row => row.world === 'Keyblade Graveyard')?.rate).toBe('Unknown');
    expect(abounding.find(row => row.world === 'Radiant Garden')?.rate).toBe('Shop Levels 4–6 (4.8%) and 7–8 (7.6%)');
    expect(rows(plan).find(row => row.source === 'ordinary Flood')?.rate).toBe('0.04% (Shop Lv 7–8)');
    expect(rows(plan).some(row => row.materialName === 'Secret Gem' && row.world === 'Keyblade Graveyard')).toBe(false);
  });
  it('uses BBS exact command chests and shop conditions without visiting prerequisite worlds', () => {
    const plan = planFor(bbs, ['Fire Dash', 'Blackout'], { character: 'Terra' });
    const shop = rows(plan).find(row => row.materialName === 'Fire Dash' && row.source === 'Command Shop')!;
    expect(shop.world).toBe(SHARED_FARM_WORLD);
    expect(shop.details.join(' ')).toContain('450');
    expect(rows(plan).some(row => row.materialName === 'Blackout' && row.world === 'Radiant Garden' && row.rate === 'One-time reward')).toBe(true);
    expect(rows(plan).filter(row => row.source === 'Command Shop').every(row => row.world === SHARED_FARM_WORLD)).toBe(true);
  });
  it('keeps DDD portal rewards in the correct character scope', () => {
    const riku = planFor(ddd, ['Brilliant Fantasy', 'Wild Fantasy'], { character: 'Riku' });
    expect(rows(riku).some(row => row.source === 'Riku Special Portal 6' && row.world === 'Symphony of Sorcery' && row.rate === '100%')).toBe(true);
    expect(rows(riku).some(row => row.source.startsWith('Sora Special Portal'))).toBe(false);
    const sora = planFor(ddd, ['Brilliant Fantasy'], { character: 'Sora' });
    expect(rows(sora).some(row => row.source.startsWith('Riku Special Portal'))).toBe(false);
    expect(sora.pendingCount).toBe(1);
  });
  it('never substitutes normal DDD enemy worlds for rare Nightmare or Portal locations', () => {
    const plan = planFor(ddd, ['Dulcet Figment']);
    const rare = rows(plan).filter(row => row.source === 'Necho Cat (Rare Nightmare)');
    expect(rare.map(row => row.world)).toEqual(['La Cité des Cloches']);
    expect(rare[0].location).toContain('Special Portal');
    expect(rare[0].details.join(' ')).toContain('Normal-form worlds are not substituted');
    expect(rows(plan).some(row => row.source === 'Necho Cat (Nightmare)' && row.world === 'Traverse Town')).toBe(true);
    expect(rows(plan).some(row => row.source === 'Moogle Shop' && row.rate === '100 munny')).toBe(true);
  });
  it('preserves KH3 repeat gate conditions and joins two materials to a shared enemy', () => {
    const plan = planFor(kh3, ['Lucid Crystal', 'Wellspring Crystal']);
    const anchor = rows(plan).filter(row => row.world === 'The Caribbean' && row.source === 'Anchor Raider');
    expect(anchor).toHaveLength(2);
    expect(anchor.every(row => row.rate === '8%' && row.details.join(' ').includes('Clear the base game'))).toBe(true);
    expect(anchor.every(row => row.location?.includes('Battlegate 10'))).toBe(true);
  });
  it('uses the exact KH3 field-route enemy without assigning every drop to its world', () => {
    const plan = planFor(kh3, ['Sinister Gem', 'Frost Stone']);
    expect(rows(plan).find(row => row.source === 'Turtletoad')).toMatchObject({ world: 'Monstropolis', rate: '16%' });
    expect(rows(plan).find(row => row.source === 'Flowersnake')).toMatchObject({ world: UNSPECIFIED_FARM_WORLD });
    expect(rows(plan).find(row => row.source === 'Frost Serpent (Wings)')).toMatchObject({ world: 'Arendelle', rate: '40%' });
    expect(rows(plan).find(row => row.source === 'Sea Sprite (Blue)')).toMatchObject({ world: UNSPECIFIED_FARM_WORLD });
  });
  it('distinguishes KH3 ingredient-node appearance from actual yield', () => {
    const plan = planFor(kh3, ['Veal']);
    const pickup = rows(plan).find(row => row.source === 'Ingredient pickup')!;
    expect(pickup.rate).toBe('Node appearance: 100%');
    expect(pickup.details.join(' ')).toContain('does not guarantee');
    expect(pickup.details.join(' ')).toContain('Veal x2 / Sole x2');
    expect(rows(plan).some(row => row.source === 'Ingredient harvest route' && row.world === 'Olympus')).toBe(true);
    expect(rows(plan).find(row => row.source === 'Moogle Shop')?.details.join(' ')).toContain('not a Steam UI capture');
  });
  it('keeps non-enemy KH3 source goals and one-time rewards', () => {
    const plan = planFor(kh3, ['Orichalcum+', 'Fluorite']);
    expect(rows(plan).some(row => row.materialName === 'Orichalcum+' && row.world === 'The Final World' && row.rate === 'One-time reward')).toBe(true);
    expect(rows(plan).some(row => row.source === 'Other methods' && row.details.join(' ').includes('Prize Postcard'))).toBe(true);
    expect(rows(plan).some(row => row.materialName === 'Fluorite' && row.source.includes('Sphere') && row.rate === 'One-time reward ×3')).toBe(true);
  });
});

describe('KH1 source adapters', () => {
  it('groups real materials with precise ordinary rates and retains Bambi checkpoints', () => {
    const entries = ['Blaze Shard', 'Frost Shard'].map(kh1Material);
    const plan = buildKh1FarmingPlan(kh1, entries, {}, Object.fromEntries(entries.map(e => [e.id, 2])));
    expect(rows(plan).some(row => row.world === 'Wonderland' && row.source === 'Red Nocturne' && row.rate === '6%')).toBe(true);
    expect(rows(plan).some(row => row.world === 'Wonderland' && row.source === 'Blue Rhapsody' && row.rate === '12%')).toBe(true);
    const bambi = rows(plan).find(row => row.world === 'Traverse Town' && row.source === 'Bambi gauge reward')!;
    expect(bambi.rate).toContain('20% at two fills');
    expect(bambi.location).not.toContain('Bizarre Room');
    expect(bambi.details.join(' ')).toContain('six qualifying enemy defeats');
  });
  it('joins sourced KH1 late-game room encounters across materials without discarding their conditions', () => {
    const entries = ['Energy Stone', 'Bright Crystal', 'Shiny Crystal', 'Frost Shard', 'Lucid Crystal'].map(kh1Material);
    const plan = buildKh1FarmingPlan(kh1, entries, {}, Object.fromEntries(entries.map(e => [e.id, 1])));
    const defender = rows(plan).find(row => row.source === 'Defender' && row.world === 'Hollow Bastion')!;
    expect(defender).toMatchObject({ materialName: 'Bright Crystal', rate: '2%' });
    expect(defender.location).toContain('Entrance Hall');
    expect(defender.location).toContain('Grand Hall');
    expect(defender.details.join(' ')).toContain('After rescuing Kairi');
    const stealth = rows(plan).find(row => row.source === 'Stealth Soldier' && row.world === 'Hollow Bastion')!;
    expect(stealth.rate).toContain('qualifying Stealth Soldier');
    expect(stealth.details.join(' ')).toContain('special variant');
    expect(rows(plan).some(row => row.source === 'Wizard' && row.world === 'Hollow Bastion')).toBe(true);
    expect(rows(plan).some(row => row.source === 'Blue Rhapsody' && row.world === 'Hollow Bastion')).toBe(true);
    expect(rows(plan).some(row => row.source === 'Darkball' && row.world === 'Traverse Town')).toBe(true);
  });
  it('keeps ordinary Pirate rates separate from component-specific Battleship rewards', () => {
    const entry = kh1Material('Power Gem');
    const plan = buildKh1FarmingPlan(kh1, [entry], {}, { [entry.id]: 1 });
    expect(rows(plan).find(row => row.source === 'Pirate')?.rate).toBe('4%');
    expect(rows(plan).find(row => row.source === 'Air Pirate')?.rate).toBe('4%');
    expect(rows(plan).find(row => row.source === 'Battleship')?.rate).toContain('Component-specific');
  });
  it('does not locate Barrel Spider or Arch Behemoth in Agrabah or call special rolls ordinary', () => {
    const entry = kh1Material('Mythril Shard');
    const plan = buildKh1FarmingPlan(kh1, [entry], {}, { [entry.id]: 2 });
    expect(rows(plan).filter(row => row.source === 'Barrel Spider').map(row => row.world)).toEqual(['Monstro', 'Neverland']);
    const arch = rows(plan).find(row => row.source === 'Arch Behemoth')!;
    expect(arch).toMatchObject({ world: 'End of the World', location: 'End of the World · Final Dimension' });
    expect(arch.rate).toContain('unaffected by Lucky Strike');
    expect(arch.details.join(' ')).toContain('not a permanent post-clear');
    expect(rows(plan).find(row => row.source === 'Pot Scorpion')).toMatchObject({ world: 'Agrabah', rate: '20% (Mythril Shard roll)' });
  });
  it('preserves exact special-enemy reward conditions and non-enemy crafting', () => {
    const entries = ['Stormy Stone', 'Fury Stone', 'Mythril', 'Dark Matter', 'Orichalcum'].map(kh1Material);
    const plan = buildKh1FarmingPlan(kh1, entries, {}, Object.fromEntries(entries.map(e => [e.id, 1])));
    expect(rows(plan).find(row => row.source === 'Neoshadow')?.rate).toContain('seventh qualifying Neoshadow');
    expect(rows(plan).find(row => row.source === 'Gigas Shadow')?.rate).toContain('Seven defeated');
    expect(rows(plan).find(row => row.materialName === 'Dark Matter' && row.source === 'Synthesis')?.world).toBe('Traverse Town');
    expect(rows(plan).find(row => row.source === 'Item Shop')?.rate).toContain('after rescuing Kairi');
  });
  it('keeps conditional mushroom sources and unknown locations instead of inventing universal routes', () => {
    const entry = kh1Material('Mystery Goo');
    const plan = buildKh1FarmingPlan(kh1, [entry], {}, { [entry.id]: 1 });
    const white = rows(plan).find(row => row.source === 'White Mushroom')!;
    expect(white).toMatchObject({ world: UNSPECIFIED_FARM_WORLD, rate: 'Conditional reward' });
    expect(white.details.join(' ')).toContain('Mystery Goo 20%');
  });
  it('handles unknown future material data without a guessed rate and omits satisfied stock', () => {
    const entry = { ...kh1Material('Blaze Shard'), id: 'future', name: 'Future material', world: undefined, area: undefined, facts: {}, summary: 'Source not verified', instructions: '', relatedIds: [] } as GuideEntry;
    const plan = buildKh1FarmingPlan(kh1, [entry], {}, { future: 1 });
    expect(rows(plan)[0]).toMatchObject({ world: UNSPECIFIED_FARM_WORLD, rate: 'Unknown' });
    expect(buildKh1FarmingPlan(kh1, [entry], { future: 1 }, { future: 1 })).toMatchObject({ groups: [], pendingCount: 0, satisfiedCount: 1, unknownCount: 0 });
  });
});


describe('complete material catalogs', () => {
  it.each([kh2, bbs, ddd, kh3])('keeps a source or an explicit fallback for every $id target', guide => {
    const entries = guide.entries.filter(e => ['materials', 'material'].includes(e.category));
    const targets = Object.fromEntries(entries.map(e => [e.id, 1]));
    const plan = buildGuideFarmingPlan(guide, entries, {}, targets);
    expect(plan.pendingCount).toBe(entries.length);
    expect(plan.unknownCount).toBe(entries.length);
    expect(new Set(rows(plan).map(row => row.materialId))).toEqual(new Set(entries.map(e => e.id)));
    expect(rows(plan).every(row => row.source && row.rate && row.sources.length)).toBe(true);
    expect(new Set(rows(plan).map(row => row.id)).size).toBe(rows(plan).length);
  });
  it('retains all 34 KH1 material targets without mutating their source records', () => {
    const entries = kh1.entries.filter(e => e.category === 'material');
    const before = JSON.stringify(entries);
    const plan = buildKh1FarmingPlan(kh1, entries, {}, Object.fromEntries(entries.map(e => [e.id, 1])));
    expect(plan.pendingCount).toBe(34);
    expect(new Set(rows(plan).map(row => row.materialId)).size).toBe(34);
    expect(rows(plan).every(row => row.source && row.rate && row.sources.length)).toBe(true);
    expect(JSON.stringify(entries)).toBe(before);
  });
});

describe('enemy and other source partitions', () => {
  const allMaterialsPlan = (guide: GameGuide) => {
    const entries = guide.entries.filter(entry => ['material', 'materials'].includes(entry.category));
    return buildGuideFarmingPlan(guide, entries, {}, Object.fromEntries(entries.map(entry => [entry.id, 1])));
  };
  const kh1Entries = kh1.entries.filter(entry => entry.category === 'material');
  const catalogs: { id: string; plan: FarmingPlan; enemyCount: number; otherCount: number; otherSources: string[] }[] = [
    {
      id: 'kh1fm',
      plan: buildKh1FarmingPlan(kh1, kh1Entries, {}, Object.fromEntries(kh1Entries.map(entry => [entry.id, 1]))),
      enemyCount: 54, otherCount: 69,
      otherSources: ['Bambi gauge reward', 'Item Shop', 'Synthesis'],
    },
    {
      id: 'kh2fm', plan: allMaterialsPlan(kh2), enemyCount: 172, otherCount: 167,
      otherSources: ['Finite rewards', 'Synthesis'],
    },
    {
      id: 'bbsfm', plan: allMaterialsPlan(bbs), enemyCount: 141, otherCount: 473,
      otherSources: ['Medal shop', 'Command Shop', 'Command Board', 'Command melding'],
    },
    {
      id: 'dddhd', plan: allMaterialsPlan(ddd), enemyCount: 343, otherCount: 263,
      otherSources: ['Moogle Shop', 'Other acquisition',
        'Sora Special Portal 1', 'Sora Special Portal 2', 'Sora Special Portal 3',
        'Sora Special Portal 4', 'Sora Special Portal 5', 'Sora Special Portal 6',
        'Riku Special Portal 1', 'Riku Special Portal 2', 'Riku Special Portal 3',
        'Riku Special Portal 4', 'Riku Special Portal 5', 'Riku Special Portal 6'],
    },
    {
      id: 'kh3', plan: allMaterialsPlan(kh3), enemyCount: 169, otherCount: 427,
      otherSources: ['Ingredient pickup', 'Ingredient harvest route', 'Moogle Shop', 'Synthesis',
        'Rocks', 'Blue rocks', 'Asteroids', 'Rewards', 'Other Methods', 'Other methods',
        'Treasure Sphere β', 'Treasure Sphere γ', 'Treasure Sphere δ', 'Treasure Sphere ε',
        'Treasure Sphere ζ', 'Treasure Sphere η', 'Treasure Sphere θ', 'Treasure Sphere ι'],
    },
  ];

  it.each(catalogs)('classifies every $id catalog row, including all legacy non-enemy drops', ({ plan, enemyCount, otherCount, otherSources }) => {
    // This expected catalog inventory is independent of the adapter metadata.
    // All remaining source identities are enemy drops, including conditional ones.
    const nonEnemySources = new Set(otherSources);
    const allRows = rows(plan);
    for (const row of allRows) {
      const isChest = /^Chest(?: #\d+| \/ one-time reward)?$/.test(row.source);
      expect(row.sourceKind, `${row.materialName}: ${row.source}`).toBe(isChest || nonEnemySources.has(row.source) ? 'other' : 'enemy');
    }
    expect(new Set(allRows.filter(row => row.sourceKind === 'other' && !row.source.startsWith('Chest')).map(row => row.source))).toEqual(nonEnemySources);
    expect(allRows.filter(row => row.sourceKind === 'enemy')).toHaveLength(enemyCount);
    expect(allRows.filter(row => row.sourceKind === 'other')).toHaveLength(otherCount);
  });

  it.each(catalogs)('partitions the entire $id catalog without losing, duplicating, reordering, or changing rows', ({ plan }) => {
    const before = JSON.stringify(plan);
    const originalRows = plan.groups.flatMap(group => group.rows);
    const originalById = new Map(originalRows.map(row => [row.id, row]));
    const partitions = (['enemy', 'other'] as const).map(kind => {
      const groups = partitionFarmingSources(plan, kind);
      expect(groups.every(group => group.rows.length > 0)).toBe(true);
      expect(groups.map(group => group.world)).toEqual(plan.groups.filter(group => group.rows.some(row => row.sourceKind === kind)).map(group => group.world));
      for (const group of groups) {
        const original = plan.groups.find(candidate => candidate.world === group.world)!;
        expect(group.rows).toEqual(original.rows.filter(row => row.sourceKind === kind));
        for (const row of group.rows) expect(row).toBe(originalById.get(row.id));
      }
      return groups.flatMap(group => group.rows);
    });
    const combined = partitions.flat();
    expect(combined).toHaveLength(originalRows.length);
    expect(new Set(combined.map(row => row.id))).toEqual(new Set(originalRows.map(row => row.id)));
    expect(new Set(combined.map(row => row.id)).size).toBe(combined.length);
    expect(new Set(combined.map(row => row.materialId))).toEqual(new Set(originalRows.map(row => row.materialId)));
    expect(JSON.stringify(plan)).toBe(before);
  });

  it('does not derive enemy classification from conditional rates, source wording, or portal locations', () => {
    const entry: CollectionEntry = {
      id: 'future-enemy', name: 'Future material', category: 'materials', summary: '',
      drops: [{ enemy: 'Future Special Portal hunter', rate: 'Conditional reward', location: 'World A · Special Portal chamber', details: 'Available after visiting the shop.' }],
    };
    const plan = buildGuideFarmingPlan(fixture([entry]), [entry], {}, { [entry.id]: 2 });
    expect(rows(plan)[0]).toMatchObject({ sourceKind: 'enemy', rate: 'Conditional reward', world: 'World A' });
    expect(partitionFarmingSources(plan, 'other')).toEqual([]);
    expect(plan).toMatchObject({ pendingCount: 1, unknownCount: 1, satisfiedCount: 0 });
  });

  it('keeps legacy classification scoped to the game, rather than applying a global label rule', () => {
    const entry: CollectionEntry = { id: 'future', name: 'Future', category: 'materials', summary: '', drops: [{ enemy: 'Medal shop', rate: 'Unknown', location: 'World A' }] };
    const plan = buildGuideFarmingPlan(fixture([entry]), [entry], {}, { future: 1 });
    expect(rows(plan)[0].sourceKind).toBe('enemy');
  });

  it('preserves rare Nightmare drops as enemies even when the encounter is in a Special Portal', () => {
    const plan = planFor(ddd, ['Dulcet Figment']);
    const rare = rows(plan).filter(row => row.source === 'Necho Cat (Rare Nightmare)');
    expect(rare).toHaveLength(1);
    expect(rare[0]).toMatchObject({ sourceKind: 'enemy', world: 'La Cité des Cloches' });
    expect(rare[0].location).toContain('Special Portal');
    expect(partitionFarmingSources(plan, 'enemy').flatMap(group => group.rows)).toContainEqual(plan.groups.find(group => group.world === 'La Cité des Cloches')!.rows.find(row => row.id === rare[0].id));
  });

  it('retains the scoped DDD portal character and rate in Other sources', () => {
    const plan = planFor(ddd, ['Brilliant Fantasy', 'Wild Fantasy'], { character: 'Riku' });
    const other = partitionFarmingSources(plan, 'other').flatMap(group => group.rows);
    expect(other.some(row => row.source === 'Riku Special Portal 6' && row.character === 'Riku' && row.rate === '100%')).toBe(true);
    expect(other.some(row => row.source.startsWith('Sora Special Portal'))).toBe(false);
    expect(partitionFarmingSources(plan, 'enemy').flatMap(group => group.rows).some(row => row.source.startsWith('Riku Special Portal'))).toBe(false);
  });

  it('places unverified sources and out-of-scope fallbacks in Other sources without inventing enemy drops', () => {
    const entry: CollectionEntry = { id: 'future', name: 'Future', category: 'materials', summary: 'Source not verified' };
    const plan = buildGuideFarmingPlan(fixture([entry]), [entry], {}, { future: 1 });
    expect(rows(plan)[0]).toMatchObject({ sourceKind: 'other', rate: 'Unknown', world: UNSPECIFIED_FARM_WORLD });
    expect(partitionFarmingSources(plan, 'enemy')).toEqual([]);

    const portal = { ...entry, drops: [{ enemy: 'Riku Special Portal 1', rate: '33%', location: 'World A' }], sources: ['https://example.com/portal'] };
    const scoped = buildGuideFarmingPlan({ ...fixture([portal]), id: 'dddhd' }, [portal], {}, { future: 1 }, { character: 'Sora' });
    expect(rows(scoped)[0]).toMatchObject({ sourceKind: 'other', source: 'Source not documented for this scope', rate: 'Unknown', world: UNSPECIFIED_FARM_WORLD });
    expect(scoped).toMatchObject({ pendingCount: 1, unknownCount: 1, satisfiedCount: 0 });
    expect(partitionFarmingSources(scoped, 'other')[0].rows[0].sources).toEqual([{ label: 'portal', url: 'https://example.com/portal' }]);
  });

  it('retains target totals and empty states after world filtering, satisfaction, and repeated partitioning', () => {
    const entries = ['Dark Shard', 'Bright Shard', 'Frost Gem'].map(name => material(kh2, name));
    const targets = Object.fromEntries(entries.map(entry => [entry.id, 2]));
    const plan = buildGuideFarmingPlan(kh2, entries, { [entries[1].id]: 2 }, targets, { world: 'Timeless River' });
    const before = JSON.stringify(plan);
    expect(plan).toMatchObject({ pendingCount: 2, unknownCount: 2, satisfiedCount: 1 });
    expect(partitionFarmingSources(plan, 'enemy').map(group => group.world)).toEqual(['Timeless River']);
    expect(partitionFarmingSources(plan, 'other')).toEqual([]);
    expect(partitionFarmingSources(plan, 'enemy')).toEqual(partitionFarmingSources(plan, 'enemy'));
    expect(JSON.stringify(plan)).toBe(before);

    const satisfied = buildGuideFarmingPlan(kh2, entries, targets, targets);
    expect(satisfied).toMatchObject({ pendingCount: 0, unknownCount: 0, satisfiedCount: 3 });
    expect(partitionFarmingSources(satisfied, 'enemy')).toEqual([]);
    expect(partitionFarmingSources(satisfied, 'other')).toEqual([]);
  });
});
