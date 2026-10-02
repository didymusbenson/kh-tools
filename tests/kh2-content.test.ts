import { describe, expect, it } from 'vitest';
import kh2 from '../src/games/kh2fm';

const entry = (id: string) => kh2.entries.find(e => e.id === `kh2fm.${id}`)!;
const recipe = (name: string) => kh2.recipes!.find(r => r.name === name)!;
const ingredient = (name: string, material: string) => recipe(name).ingredients.find(i => i.id === `kh2fm.materials.${material}`)?.quantity;

describe('KH2 Final Mix source corrections', () => {
  it('keeps directions attached to all numbered treasures and puzzle pieces', () => {
    for (const [category, count] of [['treasures', 301], ['puzzles', 144]] as const) {
      const records = kh2.entries.filter(e => e.category === category);
      expect(records).toHaveLength(count);
      for (const e of records) {
        expect(e.instructions?.trim(), e.id).toBeTruthy();
        expect(e.sources?.length, e.id).toBeGreaterThan(0);
      }
    }
    expect(entry('treasure.radiant-garden.46').instructions).toContain('open the chest');
    expect(entry('treasure.radiant-garden.46').prerequisites).toContain('thirteen');
    expect(entry('treasure.100-acre-wood.01').instructions).toContain('Outside');
    expect(entry('puzzle.daylight.23').character).toBe('Sora');
  });

  it.each([
    ['frost-gem', 'Fortuneteller', '10%'],
    ['lightning-gem', 'Armored Knight', '4%'],
    ['lightning-gem', 'Surveillance Robot', '6%'],
    ['lightning-crystal', 'Devastator', '12%'],
    ['lightning-crystal', 'Strafer', '8%'],
    ['dark-gem', 'Gargoyle Warrior', '10%'],
    ['bright-stone', 'Driller Mole', '3%'],
    ['remembrance-stone', 'Aerial Champ', '8%'],
  ])('uses the enemy reward table for %s / %s', (material, enemy, rate) => {
    const drop = entry(`materials.${material}`).drops?.find(d => d.enemy === enemy);
    expect(drop?.rate).toBe(rate);
    expect(drop?.location).toContain(' · ');
  });

  it('keeps Final Mix Serenity farms distinct from original KHII Nobody drops', () => {
    const nobodies = ['Creeper', 'Dusk', 'Dancer', 'Dragoon', 'Gambler', 'Sniper', 'Assassin', 'Berserker', 'Samurai', 'Sorcerer'];
    for (const tier of ['shard', 'stone', 'gem', 'crystal']) {
      const material = entry(`materials.serenity-${tier}`);
      expect(material.drops?.some(d => nobodies.includes(d.enemy))).toBe(false);
      expect(material.drops?.find(d => d.enemy === 'Bulky Vendor')?.details).toContain('guarantees');
    }
    expect(entry('materials.serenity-crystal').drops?.map(d => d.enemy)).toEqual(['Bulky Vendor']);
    expect(entry('materials.serenity-crystal').instructions).toContain('9 Bright Crystals');
    expect(entry('materials.tranquility-crystal').instructions).toContain('within 3 seconds');
  });

  it('preserves paid Ultima costs and uses the correct Mythril upgrade modifier', () => {
    expect(ingredient('Ultima Weapon', 'orichalcum-plus')).toBe(7);
    expect(ingredient('Ultima Weapon', 'serenity-crystal')).toBe(2);
    expect(ingredient('Ultima Weapon', 'energy-crystal')).toBe(1);
    expect(ingredient('Mythril Crystal', 'serenity-stone')).toBe(1);
    expect(ingredient('Mythril Crystal', 'serenity-gem')).toBeUndefined();
    expect(ingredient('Shock Charm', 'tranquility-gem')).toBe(1);
    expect(ingredient('Shock Charm', 'tranquility-stone')).toBe(3);
    expect(ingredient('Shock Charm+', 'serenity-crystal')).toBe(1);
    expect(recipe('Shock Charm').instructions).not.toContain('conflict');
    expect(ingredient('Star Charm', 'serenity-gem')).toBe(1);
    expect(ingredient('Star Charm', 'serenity-crystal')).toBeUndefined();
    expect(recipe('Star Charm').instructions).toContain('A / 22');
    expect(recipe('Star Charm').instructions).not.toContain('Sources disagree');
    expect(ingredient('Petite Ribbon', 'mythril-crystal')).toBe(3);
    expect(ingredient('Ribbon', 'mythril-crystal')).toBe(3);
  });

  it('keeps the missable prologue separate from Sora’s treasure totals', () => {
    const roxas = kh2.entries.filter(e => e.category === 'prologue');
    expect(roxas).toHaveLength(16);
    expect(roxas.every(e => e.character === 'Roxas' && e.collectible === false && !!e.missability)).toBe(true);
    expect(roxas.filter(e => e.reward === 'Potion')).toHaveLength(9);
    expect(roxas.filter(e => e.reward === 'Hi-Potion')).toHaveLength(5);
    expect(kh2.entries.filter(e => e.category === 'treasures' && e.world === 'Twilight Town')).toHaveLength(39);
  });

  it('covers the complete KH2 Steam set without KH1 blueprint requirements', () => {
    const goals = kh2.entries.filter(e => e.category === 'achievements');
    expect(goals).toHaveLength(50);
    expect(new Set(goals.map(e => e.id)).size).toBe(50);
    expect(entry('achievements.gummi-ship-collector').summary).toBe('Collect every Gummi ship blueprint.');
    expect(entry('achievements.corroded-by-darkness').summary).toContain('thirteen');
    expect(entry('achievements.top-gun').summary).toContain('EX-mission');
    expect(entry('achievements.critical-competitor').summary).toContain('Critical');
    expect(entry('materials.orichalcum').instructions).toContain('55 material types');
  });

  it('uses Final Mix Gummi targets and preserves EX equipment constraints', () => {
    const missions = kh2.entries.filter(e => e.category === 'gummi' && e.name.includes(' · Mission '));
    expect(missions).toHaveLength(54);
    expect(entry('gummi.asteroid-sweep-mission-3-normal').summary).toContain('2,900,000');
    expect(entry('gummi.assault-of-the-dreadnought-mission-3-ex-s').summary).toContain('7,000,000');
    expect(entry('gummi.floating-island-mission-3-ex-s').prerequisites).toContain('without any Teeny Ships');
    for (const e of missions) {
      expect(e.summary).toMatch(/\d/);
      expect(e.reward).toBeTruthy();
      if (e.name.endsWith('EX S')) expect(e.prerequisites).toMatch(/Fly/);
    }
  });

  it('states the named form requirements and Titan episode unlock', () => {
    expect(entry('cups.titan').prerequisites).toBe('Complete the second Olympus Coliseum episode');
    expect(entry('cups.cerberus-paradox').prerequisites).toContain('Valor, Wisdom and Master Forms at level 5');
    expect(entry('cups.hades-paradox').prerequisites).toContain('Valor, Wisdom, Master and Final Forms');
  });

  it('distinguishes Mushroom material ranks, weapon ranks and Journal targets', () => {
    const one = entry('mushrooms.mushroom-xiii-1').instructions!;
    expect(one).toContain('B: 70–89');
    expect(one).toContain('B: 80–93');
    expect(entry('mushrooms.mushroom-xiii-4').instructions).toContain('no A or S reward rank');
    expect(entry('mushrooms.mushroom-xiii-5').summary).toContain('10');
    expect(entry('mushrooms.mushroom-xiii-5').instructions).toContain('S: 3.00 or less');
    expect(entry('mushrooms.mushroom-xiii-6').instructions).toContain('Ultimate Mushroom');
    expect(entry('mushrooms.mushroom-xiii-13').instructions).toContain('Ready, Go!');
  });

  it('gives the Spooky Cave branches the correct chest numbers', () => {
    expect(entry('treasure.100-acre-wood.14').instructions).toMatch(/right branch|branch to the right/);
    expect(entry('treasure.100-acre-wood.15').instructions).toMatch(/left branch|branch to the left/);
    expect(entry('treasure.twilight-town.19').instructions).toMatch(/Enter from outside|outside door/);
    expect(entry('treasure.disney-castle.07').reward).toBe('Mythril Shard');
  });

  it('normalizes acquisition indexes without duplicating chest rewards', () => {
    const indexed = (category: string) => kh2.entries.filter(e => e.category === category || e.categories?.includes(category));
    expect(indexed('maps')).toHaveLength(40);
    expect(indexed('recipe-documents')).toHaveLength(16);
    expect(indexed('proofs')).toHaveLength(3);
    expect(kh2.entries.filter(e => e.category === 'limits')).toHaveLength(21);
    expect(kh2.entries.filter(e => e.category === 'moogle')).toHaveLength(55);
    expect(kh2.recipes!.every(r => r.sources?.length)).toBe(true);
    expect(entry('materials.orichalcum-plus').instructions).toContain('include Orichalcum+ itself');
  });

  it('includes Final Mix equipment and character-specific ability definitions', () => {
    expect(kh2.entries.filter(e => e.category === 'equipment')).toHaveLength(107);
    expect(kh2.entries.filter(e => e.category === 'keyblades')).toHaveLength(24);
    expect(kh2.entries.filter(e => e.category === 'abilities')).toHaveLength(167);
    expect(entry('equipment.plain-mushroom-plus').sources?.length).toBeGreaterThan(0);
    expect(entry('equipment.medal').checkable).toBe(false);
    expect(entry('equipment.champion-belt').checkable).toBe(false);
    expect(entry('forms.final-form').instructions).toContain('3%, 9%, 27%, then 75%');
  });

  it('supplies all main and Teeny blueprint dependencies and enemy treasures', () => {
    const gummi = kh2.entries.filter(e => e.category === 'gummi');
    expect(gummi.filter(e => e.name.endsWith('sample blueprint'))).toHaveLength(28);
    expect(gummi.filter(e => e.name.endsWith('Teeny blueprint'))).toHaveLength(19);
    expect(entry('gummi.asteroid-sweep-mission-2-normal').instructions).toContain('Spider');
    expect(entry('gummi.assault-of-the-dreadnought-mission-3-normal').instructions).toContain('Hunter-X');
    expect(entry('gummi.highwind-lv-1-sample-blueprint').instructions).toContain('31 Material/G');
  });

  it('preserves edition and encounter-specific combat attributes', () => {
    expect(kh2.entries.filter(e => e.category === 'bestiary')).toHaveLength(127);
    const knocker = entry('bestiary.aerial-knocker');
    expect(knocker.instructions).toContain('HP: 61; Strength: 26; Defense: 14; EXP: 87');
    expect(knocker.instructions).toContain('Cerberus Cup');
    expect(knocker.instructions).toContain('HP: 67; Strength: 29; Defense: 16');
    expect(entry('bestiary.sa-x').instructions).toContain('Data Rematch');
    expect(entry('bestiary.sa-x').instructions).toContain('Neutral: ×1.0');
    expect(entry('bestiary.bulky-vendor').instructions).toContain('EXP: 1700');
    expect(entry('bestiary.undead-pirate').instructions).toContain('Fire: ×2.5');
    expect(entry('bestiary.hostile-program').instructions).toContain('HP: 960');
    expect(entry('bestiary.hostile-program').instructions).not.toContain('HP: 640');
    expect(entry('achievements.nobody-know-it-all').instructions).toContain('Twilight Thorn');
    expect(entry('achievements.heartless-highbrow').instructions).toContain('Mushroom XIII · 13');
  });

});
