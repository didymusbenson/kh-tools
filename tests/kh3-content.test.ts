import { describe, expect, it } from 'vitest';
import kh3 from '../src/games/kh3';
import content from '../src/games/kh3/content.json';
import dispositions from '../ai_docs/games/kh3/audit-dispositions.json';

const raw = content.entries as unknown as Array<Record<string, any>>;
const category = (name: string) => raw.filter(e => e.category === name);

describe('KHIII expanded acquisition catalog', () => {
  it('exposes every record category and keeps recipes linked to canonical materials', () => {
    const categories = new Set(kh3.categories.map(c => c.id));
    const ids = new Set(raw.map(e => e.id));
    expect(ids.size).toBe(raw.length);
    expect(new Set(content.recipes.map(r => r.id)).size).toBe(content.recipes.length);
    for (const entry of kh3.entries) {
      expect(categories.has(entry.category), entry.id).toBe(true);
      for (const alias of entry.categories || []) expect(categories.has(alias), entry.id).toBe(true);
    }
    for (const recipe of content.recipes) for (const ingredient of recipe.ingredients) {
      expect(ids.has(ingredient.id), recipe.id).toBe(true);
      expect(Number.isInteger(ingredient.quantity) && ingredient.quantity > 0, recipe.id).toBe(true);
    }
  });
  it('keeps collection units separate and prevents Greek sphere slug collisions', () => {
    for (const [name, count] of Object.entries({ treasures: 245, emblems: 90, 'remind-treasures': 9, 'slider-prizes': 10, photos: 20, adversaries: 81, 'game-records': 54, 'gummi-spheres': 9, 'gummi-battles': 33, 'gummi-parts': 374, 'gummi-blueprints': 52, 'gummi-abilities': 19 })) {
      expect(category(name), name).toHaveLength(count);
    }
    expect(new Set(category('gummi-spheres').map(e => e.name)).size).toBe(9);
    expect(category('synthesis-history')).toHaveLength(88);
    expect(content.recipes.filter(r => r.group === 'Synthesis')).toHaveLength(88);
    expect(category('platform-keyblades').every(e => e.checkable === false)).toBe(true);
    expect(category('party-equipment').every(e => e.checkable === false)).toBe(true);
  });
  it('distinguishes newly synthesized Ultima from the carried level-zero ladder', () => {
    const ultima = raw.find(e => e.category === 'keyblades' && e.name === 'Ultima Weapon')!;
    expect(ultima.properties.initialLevel).toBe(10);
    expect(ultima.properties.ngPlusInitialLevel).toBe(0);
    expect(ultima.forgeTransitions).toHaveLength(10);
    expect(content.recipes.filter(r => r.group === 'Keyblade Forge — NG+ only')).toHaveLength(10);
    const synthesis = content.recipes.find(r => r.group === 'Synthesis' && r.name === 'Ultima Weapon')!;
    expect(synthesis.ingredients.find(i => i.id === 'kh3.material.orichalcum')?.quantity).toBe(7);
    expect(raw.find(e => e.id === 'kh3.material.orichalcum-ordinary')?.name).toBe('Orichalcum');
    expect(raw.find(e => e.id === 'kh3.material.orichalcum')?.name).toBe('Orichalcum+');
    expect(raw.filter(e => e.forgeTransitions).every(e => e.properties.levels.length === 11 && e.forgeTransitions.length === 10)).toBe(true);
  });
  it('documents every audit ID without treating the remaining evidence gaps as resolved', () => {
    expect(dispositions.findings.map(f => f.id)).toEqual(Array.from({ length: 35 }, (_, i) => `KH3-${String(i + 1).padStart(3, '0')}`));
    expect(dispositions.statusCounts).toEqual({ partial: 13, resolved: 20, conflicted: 2 });
    for (const f of dispositions.findings) {
      expect(f.consultedUrls.length, f.id).toBeGreaterThan(0);
      expect(f.remainingEvidenceBoundary.length, f.id).toBeGreaterThan(20);
    }
    expect(category('photos').every(e => typeof e.prerequisites === 'string' && e.prerequisites.length > 0)).toBe(true);
    expect(category('challenges').filter(e => e.name.endsWith(' Flan')).every(e => e.uncertainty?.includes('equality'))).toBe(true);
  });
  it('links obtainable medal variants to their activity pools and equipment to existing acquisitions', () => {
    const entries = new Map(raw.map(e => [e.id, e]));
    const recipeIds = new Set(content.recipes.map(r => r.id));
    const medals = raw.filter(e => e.medalVariant);
    expect(medals).toHaveLength(28);
    for (const medal of medals) {
      expect(entries.get(medal.medalVariant.activityId)?.medalVariantIds).toContain(medal.id);
      expect(medal.medalVariant.probability).toBeNull();
      expect(medal.sources.length).toBeGreaterThan(0);
    }
    for (const entry of raw) {
      for (const id of entry.acquisitionRecordIds || []) expect(entries.has(id), entry.id).toBe(true);
      for (const id of entry.synthesisRecipeIds || []) expect(recipeIds.has(id), entry.id).toBe(true);
      for (const source of entry.sphereRewards || []) {
        expect(entries.get(source.sphereId)?.category).toBe('gummi-spheres');
        expect(source.quantity).toBeGreaterThan(0);
      }
    }
  });
  it('keeps combined Gummi budgets distinct from main-ship limits and describes copy recovery', () => {
    const budget = raw.find(e => e.id === 'kh3.gummi-reference.gummi-build-budgeting')!;
    expect(budget.publishedCombinedCost.levels).toHaveLength(99);
    expect(budget.publishedCombinedCost.levels.at(-1)).toEqual({ level: 99, cost: 1600 });
    expect(budget.publishedCombinedCost.steamValidated).toBe(false);
    expect(budget.instructions).toContain('1,000');
    expect(budget.publishedCombinedCost.unit).toContain('not main ship alone');
    for (const n of [222, 333]) {
      const reward = raw.find(e => e.id === `kh3.rewards.${n}-sora-copies`)!;
      expect(reward.instructions).toContain('pink portal within The Final World');
      expect(reward.uncertainty).toContain('repeatable HP');
    }
  });

  it('gives every ingredient sourced landmark or minigame approaches without changing ingredient IDs', () => {
    const ingredients = raw.filter(e => e.categories?.includes('ingredients'));
    expect(ingredients).toHaveLength(59);
    expect(ingredients.reduce((count, e) => count + e.harvestRoutes.length, 0)).toBe(172);
    for (const entry of ingredients) for (const route of entry.harvestRoutes) {
      expect(route.world.length, entry.id).toBeGreaterThan(0);
      expect(route.directions.length, entry.id).toBeGreaterThan(20);
      expect(entry.sources, entry.id).toContain(route.source);
    }
    expect(ingredients.find(e => e.name === 'Rice')?.instructions).toContain('chef statue');
    expect(ingredients.find(e => e.name === 'Cheese')?.instructions).toContain('hidden Ground Floor room');
    expect(ingredients.find(e => e.name === 'Blackberry')?.harvestRoutes.some((r: any) => r.world === '100 Acre Wood')).toBe(true);
  });

});
