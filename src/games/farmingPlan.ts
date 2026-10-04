import type { GameData, GuideEntry } from '../domain/types';
import type { CollectionEntry, GameGuide } from './types';
import crystalSources from './bbsfm/crystal-sources.json';

export const UNSPECIFIED_FARM_WORLD = 'Location not specified';
export const SHARED_FARM_WORLD = 'Shops & synthesis';
export interface FarmingSource { label: string; url: string }
export interface FarmingPlanRow {
  id: string;
  materialId: string;
  materialName: string;
  source: string;
  /** Literal source rate, including conditions; never an estimated yield. */
  rate: string;
  location?: string;
  details: string[];
  sources: FarmingSource[];
  character?: string;
  /** Other documented options exist; this is not a required additional trip. */
  alternative: boolean;
}
export interface FarmingPlan {
  groups: { world: string; rows: FarmingPlanRow[] }[];
  /** Material counts, not quantities or numbers of source rows. */
  pendingCount: number;
  satisfiedCount: number;
  unknownCount: number;
}
export interface FarmingPlanOptions { character?: string; world?: string }
type Stock = Readonly<Record<string, number | undefined>>;
type Option = Omit<FarmingPlanRow, 'id' | 'materialId' | 'materialName' | 'alternative'> & { world: string };
type ExtraEntry = CollectionEntry & {
  farmRoutes?: { gateId: string; enemy: string; rate: string; world: string; directions: string; prerequisite?: string; evidenceBasis?: string }[];
  harvestRoutes?: { world: string; area: string; directions: string; source?: string }[];
  pickupSources?: { world: string; area: string; appearance?: string; object?: string; quantity?: number; alternativeYields?: string }[];
  shopStock?: { priceMunny: number; unlock: string; editionEvidence?: string };
  shop?: { price: number; unlock?: string[] };
  acquisitionSources?: { method: string; details: string }[];
  chestRouteIds?: string[];
  sphereRewards?: { sphereId: string; quantity: number }[];
  fieldFarmEvidence?: { source: string; edition: string };
};

const unique = (values: (string | undefined)[]) => [...new Set(values.filter((v): v is string => !!v?.trim()))];
const normalize = (s: string) => s.replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();
const scopeName = (s?: string) => s?.replace(': ', ' · ');
function inScope(character?: string, selected?: string) {
  return !selected || selected === 'all' || !character || character === 'Both' || scopeName(character) === scopeName(selected);
}
function citations(values: (string | FarmingSource)[] = []): FarmingSource[] {
  const sources = values.map(value => {
    if (typeof value !== 'string') return { label: value.label, url: value.url };
    let label = value;
    try { const url = new URL(value); label = decodeURIComponent(url.pathname.split('/').filter(Boolean).at(-1) || url.hostname).replaceAll('_', ' '); } catch { /* Keep source text intact. */ }
    return { label, url: value };
  });
  return [...new Map(sources.map(source => [source.url, source])).values()];
}
function baseDetails(entry: CollectionEntry | GuideEntry) {
  return unique([entry.prerequisites, entry.missability, entry.uncertainty]);
}

/** Only parse authoring location fields, never arbitrary acquisition prose.
 * Every list segment must begin with a known world (or a named Battlegate).
 * A world named inside a caveat is not evidence of an encounter there. */
function locations(location: string | undefined, worlds: string[], fallback?: string): { world: string; location?: string }[] {
  const text = location?.trim();
  const names = [...worlds].sort((a, b) => b.length - a.length);
  function parse(part: string) {
    const candidate = normalize(part);
    for (const world of names) {
      const name = normalize(world);
      if (candidate === name || (candidate.startsWith(name) && /^(?:\s*[·—/:()]|\s+-\s)/.test(candidate.slice(name.length)))) return { world, location: part.trim() };
      const gate = candidate.match(/^Battlegate\s+\d+\s*[—·:]\s*(.*)$/i);
      if (gate && (gate[1] === name || gate[1].startsWith(`${name} (`))) return { world, location: part.trim() };
    }
    return undefined;
  }
  if (text) {
    // Commas are list delimiters only when all pieces are complete world fields.
    for (const separator of [/;\s*/, /,\s*/, /\s+\/\s+/]) {
      const parts = text.split(separator);
      const parsed = parts.map(parse);
      if (parts.length > 1 && parsed.every(Boolean)) return parsed as { world: string; location: string }[];
    }
    const direct = parse(text);
    if (direct) return [direct];
  }
  const knownFallback = fallback && names.find(name => normalize(name) === normalize(fallback));
  return [{ world: knownFallback || UNSPECIFIED_FARM_WORLD, location: text }];
}

function finishPlan<T extends { id: string; name: string; character?: string }>(
  materials: readonly T[], owned: Stock, targets: Stock, makeOptions: (entry: T) => Option[], options: FarmingPlanOptions = {},
): FarmingPlan {
  const result: FarmingPlan = { groups: [], pendingCount: 0, satisfiedCount: 0, unknownCount: 0 };
  const groups = new Map<string, FarmingPlanRow[]>();
  for (const entry of [...new Map(materials.map(material => [material.id, material])).values()]) {
    if (!(Number.isFinite(targets[entry.id]) && targets[entry.id]! > 0) || !inScope(entry.character, options.character)) continue;
    const count = owned[entry.id];
    const known = count !== undefined && Number.isFinite(count) && count >= 0;
    if (known && count >= targets[entry.id]!) { result.satisfiedCount++; continue; }
    result.pendingCount++;
    if (!known) result.unknownCount++;
    const merged = new Map<string, Option>();
    const allChoices = makeOptions(entry);
    const choices = allChoices.filter(option => inScope(option.character, options.character));
    if (!choices.length) choices.push({ world: UNSPECIFIED_FARM_WORLD, source: 'Source not documented for this scope', rate: 'Unknown', details: ['The documented character-specific sources do not establish availability in this scope.'], sources: citations(allChoices.flatMap(option => option.sources)), character: entry.character });
    for (const option of choices) {
      const key = JSON.stringify([option.world, option.source, option.rate, option.character || '']);
      const previous = merged.get(key);
      if (previous) {
        previous.location = unique([previous.location, option.location]).join('; ') || undefined;
        previous.details = unique([...previous.details, ...option.details]);
        previous.sources = citations([...previous.sources, ...option.sources]);
      } else merged.set(key, { ...option, details: [...option.details], sources: [...option.sources] });
    }
    for (const [key, option] of merged) {
      if (options.world && options.world !== 'all' && normalize(option.world) !== normalize(options.world)) continue;
      const { world, ...row } = option;
      const rows = groups.get(world) || [];
      rows.push({ ...row, id: `${entry.id}:${key}`, materialId: entry.id, materialName: entry.name, alternative: merged.size > 1 });
      groups.set(world, rows);
    }
  }
  const last = (world: string) => world === UNSPECIFIED_FARM_WORLD ? 2 : world === SHARED_FARM_WORLD ? 1 : 0;
  result.groups = [...groups].sort(([a], [b]) => last(a) - last(b) || a.localeCompare(b)).map(([world, rows]) => ({ world, rows: rows.sort((a, b) => a.materialName.localeCompare(b.materialName) || a.source.localeCompare(b.source) || (a.character || '').localeCompare(b.character || '')) }));
  return result;
}

function guideOptions(guide: GameGuide, entry: ExtraEntry, selected?: string): Option[] {
  const worlds = unique([...guide.worlds.map(world => world.name), ...guide.entries.map(e => e.world)]);
  const result: Option[] = [];
  const sources = citations(entry.sources);
  const details = baseDetails(entry);
  // These named field-route records exist only as an explicitly tagged sentence
  // in the checked-in KH3 research. Keep the enemy join exact: the route for
  // Turtletoad does not establish a Flowersnake route for the same material.
  const fieldEnemies: Record<string, string> = {
    'kh3.material.frost-shard': 'Winterhorn',
    'kh3.material.frost-stone': 'Frost Serpent (Wings)',
    'kh3.material.frost-gem': 'Frost Serpent (Wings)',
    'kh3.material.frost-crystal': 'Frost Serpent',
    'kh3.material.sinister-shard': 'Flood',
    'kh3.material.sinister-stone': 'Flowersnake',
    'kh3.material.sinister-gem': 'Turtletoad',
    'kh3.material.sinister-crystal': 'Spiked Turtletoad',
    'kh3.material.hungry-gem': 'Frost Serpent (Tail)',
  };
  const fieldRoute = entry.fieldFarmEvidence && entry.instructions?.match(/Field route: ([^,]+), ([\s\S]*)$/);
  const add = (source: string, rate: string, location?: string, extra: string[] = [], character = entry.character, refs = sources, fallback?: string) => {
    for (const place of locations(location, worlds, fallback)) result.push({ ...place, source, rate: rate.trim() || 'Unknown', details: unique([...extra, ...details]), sources: refs, character });
  };
  const shared = (source: string, rate: string, extra: string[]) => result.push({ world: SHARED_FARM_WORLD, source, rate, details: unique([...extra, ...details]), sources, character: entry.character });

  for (const drop of entry.drops || []) {
    const portalCharacter = guide.id === 'dddhd' ? drop.enemy.match(/^(Sora|Riku)\s+Special Portal\b/)?.[1] : undefined;
    const matchingRoute = entry.farmRoutes?.find(route => route.enemy === drop.enemy && route.rate === drop.rate);
    const gate = matchingRoute && guide.entries.find(e => e.id === matchingRoute.gateId);
    const routeDetails = matchingRoute ? unique([matchingRoute.directions, matchingRoute.prerequisite, matchingRoute.evidenceBasis, gate?.instructions]) : [];
    const field = fieldRoute && fieldEnemies[entry.id] === drop.enemy && worlds.includes(fieldRoute[1]);
    add(drop.enemy || 'Acquisition source', drop.rate, field ? `${fieldRoute[1]} · ${fieldRoute[2]}` : drop.location, unique([
      field ? entry.fieldFarmEvidence?.edition : undefined,
      drop.details, ...routeDetails,
      // An entry's conditions are retained even when they qualify a nonnumeric rate.
      entry.instructions,
      guide.id === 'dddhd' && !portalCharacter ? 'Character-specific ordinary/rare encounter access is not fully indexed; use the source conditions.' : undefined,
    ]), portalCharacter || entry.character);
  }
  // Exact structured route joins supply additional locations without cross-joining
  // unrelated enemies with all worlds in a material's prose summary.
  for (const route of entry.farmRoutes || []) {
    if (entry.drops?.some(drop => drop.enemy === route.enemy && drop.rate === route.rate && locations(drop.location, worlds).some(place => place.world === route.world))) continue;
    const gate = guide.entries.find(e => e.id === route.gateId);
    add(route.enemy, route.rate, `${route.world} · ${gate?.name || route.gateId.split('.').at(-1)}`, unique([route.directions, route.prerequisite, route.evidenceBasis, gate?.instructions]));
  }
  for (const pickup of entry.pickupSources || []) add('Ingredient pickup', pickup.appearance ? `Node appearance: ${pickup.appearance}` : 'Unknown yield', `${pickup.world} · ${pickup.area}`, unique([
    pickup.object, pickup.alternativeYields && `Possible yields: ${pickup.alternativeYields}.`,
    pickup.quantity !== undefined ? `Listed quantity: ${pickup.quantity}; node appearance does not guarantee this material's yield.` : undefined,
  ]));
  for (const route of entry.harvestRoutes || []) add('Ingredient harvest route', 'Unknown yield', `${route.world} · ${route.area}`, [route.directions], entry.character, citations([...sources, ...(route.source ? [route.source] : [])]));
  if (entry.shopStock) shared('Moogle Shop', `${entry.shopStock.priceMunny} munny`, unique([entry.shopStock.unlock, entry.shopStock.editionEvidence]));
  else if (entry.shop) shared('Moogle Shop', `${entry.shop.price} munny`, entry.shop.unlock || []);

  // Chests are joined by exact reward identity, preserving campaign/episode scope.
  const chests = guide.entries.filter(e => ['treasures', 'remind-treasures'].includes(e.category) &&
    (e.reward === entry.name || e.name === entry.name || entry.chestRouteIds?.includes(e.id)) &&
    inScope(e.character, entry.character) && inScope(e.character, selected));
  for (const chest of chests) add(`Chest${chest.order !== undefined ? ` #${chest.order}` : ''}`, 'One-time reward', [chest.world, chest.area].filter(Boolean).join(' · '), unique([chest.instructions, chest.prerequisites, chest.missability, chest.uncertainty]), chest.character || entry.character, citations([...sources, ...(chest.sources || [])]));
  for (const reward of entry.sphereRewards || []) {
    const sphere = guide.entries.find(e => e.id === reward.sphereId);
    if (sphere) add(sphere.name, `One-time reward ×${reward.quantity}`, [sphere.world, sphere.area].filter(Boolean).join(' · '), unique([sphere.instructions, sphere.prerequisites]), entry.character, citations([...sources, ...(sphere.sources || [])]));
  }
  for (const recipe of guide.recipes || []) {
    if (recipe.name !== entry.name || !inScope(recipe.character, entry.character) || !inScope(recipe.character, selected)) continue;
    shared(guide.id === 'bbsfm' ? 'Command melding' : 'Synthesis', 'Recipe requirements', unique([recipe.instructions, recipe.ingredients.map(ingredient => `${ingredient.quantity} × ${guide.entries.find(e => e.id === ingredient.id)?.name || ingredient.id}`).join(', ')]));
  }

  if (guide.id === 'bbsfm') {
    const shop = entry.instructions?.match(/Command Shop: ([\s\S]*?)(?=; Chest:|$)/)?.[1];
    if (shop) shared('Command Shop', shop.match(/^(\d[\d,]*) munny\b/)?.[0] || 'Conditional price / stock', [shop]);
    const routes = [...(entry.instructions || '').matchAll(/Farm route: ([^.]+)\. Enemies: ([^.]+)\. ([\s\S]*?)(?= Farm route: |$)/g)];
    for (const route of routes) {
      // These are authored per-character routes, unlike unscoped enemy examples.
      // An explicitly ordinary Flood is the ordinary table; giant Flood is not.
      const exactSource = crystalSources.find(source => source.crystal === entry.name && source.enemy === route[2].replace(/^ordinary /, ''));
      const quotedRate = route[3].match(/Mandrake drops Abounding Crystal at (Shop Levels [\s\S]*?%)\)\./)?.[1]?.concat(')');
      add(route[2], exactSource?.rate || quotedRate || (route[3].includes('%') ? 'Conditional; see source notes' : 'Unknown'), route[1], [route[3]]);
    }
    for (const source of crystalSources.filter(source => source.crystal === entry.name)) {
      const exampleLocations = source.locations.map(location => location.world).join(', ');
      result.push({ world: UNSPECIFIED_FARM_WORLD, source: source.enemy, rate: source.rate, location: exampleLocations ? `World examples, character route unverified: ${exampleLocations}` : undefined,
        details: unique([source.conditions, 'These enemy-table examples do not establish an accessible route for the selected character.', ...details]), sources: citations([...sources, source.source]), character: entry.character });
    }
    if (!entry.drops?.length && !shop && !chests.length) {
      const method = /menu Command Board/.test(entry.instructions || '') ? 'Command Board' : /\bmeld\b/i.test(entry.instructions || '') ? 'Command melding' : 'Acquisition source';
      shared(method, 'Conditional', unique([entry.instructions, entry.summary]));
    }
  }
  if (guide.id === 'dddhd') {
    const shop = entry.instructions?.match(/Moogle Shop: ([^.]+\.)/)?.[1];
    if (shop) shared('Moogle Shop', shop.match(/^\d[\d,]* munny\b/)?.[0] || 'Conditional', [shop]);
    const other = entry.instructions?.match(/Other source: ([^.]+\.)/)?.[1];
    if (other) add('Other acquisition', 'Conditional', undefined, [other]);
  }
  // Keep unnormalized reward/source facts available without guessing their world.
  for (const acquisition of entry.acquisitionSources || []) {
    if (acquisition.method === 'Drops' || (acquisition.method === 'Treasures' && chests.length)) continue;
    add(acquisition.method, 'Conditional', undefined, [acquisition.details]);
  }
  if (!result.length) add('Acquisition source', /conditional|reward|synthesi[sz]|craft|shop/i.test(`${entry.summary} ${entry.instructions}`) ? 'Conditional' : 'Unknown', [entry.world, entry.area].filter(Boolean).join(' · '), unique([entry.summary, entry.instructions]));
  return result;
}

/** Pass the full scoped material catalog, not a search-filtered list. */
export function buildGuideFarmingPlan(guide: GameGuide, materials: readonly CollectionEntry[], owned: Stock, targets: Stock, options: FarmingPlanOptions = {}): FarmingPlan {
  return finishPlan(materials, owned, targets, entry => guideOptions(guide, entry, options.character), options);
}

function kh1Options(data: GameData, entry: GuideEntry): Option[] {
  const worlds = unique(data.entries.map(e => e.world)).filter(world => !/various|multiple|all worlds/i.test(world));
  const result: Option[] = [];
  const sources = citations(entry.sources);
  const add = (source: string, rate: string, world = entry.world, area = entry.area, extra: string[] = [], refs = sources) => {
    for (const place of locations([world, area].filter(Boolean).join(' · '), worlds)) result.push({ ...place, source, rate: rate || 'Unknown', details: unique([...extra, ...baseDetails(entry)]), sources: refs });
  };
  const enemy = (name: string) => data.entries.find(e => e.category === 'enemy' && e.name === name);
  const rules = String(entry.facts?.['drop rules'] || entry.summary);
  const reward = entry.facts?.['reward rule'];
  const ordinaryDrops = [...rules.matchAll(/(?:^|; )([^:;\n]+): (\d+(?:\.\d+)?%)(?=[.;]|$)/g)];
  if (typeof entry.facts?.['source enemy'] === 'string') {
    add(entry.facts['source enemy'], typeof reward === 'string' ? reward : 'Conditional', entry.world, entry.area, [entry.instructions]);
  } else if (ordinaryDrops.length) {
    for (const [, name, rate] of ordinaryDrops) {
      const record = enemy(name);
      if (name === 'Barrel Spider' && entry.id === 'kh1fm-material-mythril-shard') {
        // The shared legacy enemy.world incorrectly repeats the material's Agrabah.
        for (const world of ['Monstro', 'Neverland']) add(name, rate, world, 'Hostile barrels', [entry.instructions], citations([...sources, ...(record?.sources || [])]));
      } else if (name === 'Arch Behemoth' && entry.id === 'kh1fm-material-mythril-shard') {
        add(name, `${rate} (Final Dimension; unaffected by Lucky Strike)`, record?.world, 'Final Dimension', unique([record?.instructions, 'Encounter-specific reward; not a permanent post-clear farming route.']), citations([...sources, ...(record?.sources || [])]));
      } else add(name, rate, entry.world, entry.area, [entry.instructions], citations([...sources, ...(record?.sources || [])]));
    }
  } else if (entry.id === 'kh1fm-material-mystery-goo') {
    for (const id of entry.relatedIds) {
      const record = data.entries.find(e => e.id === id && e.category === 'enemy');
      if (!record) continue;
      // The enemy Worlds field includes special/cup contexts; do not promote its
      // entire range to an unconditional Mystery Goo farming itinerary.
      add(record.name, 'Conditional reward', record.world || '', record.area || '', unique([record.instructions, ...Object.entries(record.facts || {}).filter(([key]) => /Mixed correct|identical correct|^\d+ hits|Combo-finisher/.test(key)).map(([key, value]) => `${key}: ${value}`)]), citations([...sources, ...record.sources]));
    }
  } else {
    const source = entry.id === 'kh1fm-material-orichalcum' ? 'Item Shop' : ['kh1fm-material-mythril', 'kh1fm-material-dark-matter'].includes(entry.id) ? 'Synthesis' : 'Acquisition source';
    add(source, source === 'Item Shop' ? '5,000 munny; after rescuing Kairi' : source === 'Synthesis' ? 'Recipe requirements' : /conditional/i.test(rules) ? 'Conditional' : 'Unknown', entry.world, entry.area, [rules, entry.instructions]);
  }
  // Exact enemy joins against authored repeatable-room routes. The route text
  // supplies story phase, ordinary/special encounter variants, and reset details.
  // It is not valid to cross-join every world mentioned in general instructions.
  const roomRoutes = [
    { id: 'kh1fm-material-blaze-gem', world: 'Agrabah', area: 'Cave of Wonders: Hall', enemies: ['Bandit', 'Fat Bandit'] },
    { id: 'kh1fm-material-frost-shard', world: 'Hollow Bastion', area: 'Entrance Hall', enemies: ['Blue Rhapsody', 'Defender'] },
    { id: 'kh1fm-material-thunder-shard', world: 'Traverse Town', area: 'Second District', enemies: ['Yellow Opera'] },
    { id: 'kh1fm-material-spirit-shard', world: 'Hollow Bastion', area: 'Grand Hall', enemies: ['Large Body', 'Soldier', 'Defender', 'Stealth Soldier'] },
    { id: 'kh1fm-material-spirit-gem', world: 'Hollow Bastion', area: 'Entrance Hall', enemies: ['Air Soldier', 'Defender', 'Wizard', 'Stealth Soldier'] },
    { id: 'kh1fm-material-lucid-crystal', world: 'Traverse Town', area: 'Third District', enemies: ['Darkball'] },
    { id: 'kh1fm-material-bright-gem', world: 'Monstro', area: 'Chamber 1', enemies: ['Search Ghost'] },
  ];
  for (const route of roomRoutes) {
    const record = data.entries.find(e => e.id === route.id);
    const directions = record?.facts?.['Repeatable room route'];
    if (typeof directions !== 'string') continue;
    for (const source of [...result].filter(option => route.enemies.includes(option.source))) {
      add(source.source, source.rate, route.world, route.area, unique([directions, ...source.details]), citations([...source.sources, ...(record?.sources || [])]));
    }
  }
  if (entry.id === 'kh1fm-material-power-gem') {
    const battleship = enemy('Battleship');
    if (battleship) add('Battleship', 'Component-specific; see source notes', entry.world, entry.area, unique([battleship.instructions, String(battleship.facts?.['Base rewards'] || '')]), citations([...sources, ...battleship.sources]));
  }
  // Bambi has material-specific reward checkpoints, rather than enemy kill rates.
  for (const record of data.entries.filter(e => e.id.startsWith('kh1fm-guide-bambi-rewards-') && e.relatedIds.includes(entry.id))) {
    const checkpointRates = Object.entries(record.facts || {}).flatMap(([checkpoint, value]) => {
      if (typeof value !== 'string') return [];
      const reward = value.split('; ').find(part => part.startsWith(`${entry.name} `));
      return reward ? [`${reward.slice(entry.name.length + 1)} at ${checkpoint}`] : [];
    });
    if (checkpointRates.length) add('Bambi gauge reward', checkpointRates.join('; '), record.world, '', [record.instructions], citations([...sources, ...record.sources]));
  }
  if (entry.id === 'kh1fm-material-mythril-shard' && String(entry.facts?.['Repeatable room route']).includes('separate Mythril Shard drop is 20%')) add('Pot Scorpion', '20% (Mythril Shard roll)', 'Agrabah', 'Palace Gates', [String(entry.facts!['Repeatable room route'])]);
  for (const chest of data.entries.filter(e => e.category === 'treasure' && e.reward === entry.name)) {
    add('Chest / one-time reward', 'One-time reward', chest.world || '', chest.area || '', unique([chest.instructions, chest.prerequisites, chest.missability, chest.uncertainty]), citations([...sources, ...chest.sources]));
  }
  return result;
}

export function buildKh1FarmingPlan(data: GameData, materials: readonly GuideEntry[], owned: Stock, targets: Stock): FarmingPlan {
  return finishPlan(materials, owned, targets, entry => kh1Options(data, entry));
}
