import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import ddd from '../src/games/dddhd';

const read = (path: string) => JSON.parse(readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'));
const facts = read('ai_docs/games/dddhd/practical-facts-2026-10-02.json');
const ledger = read('ai_docs/games/dddhd/audit-dispositions.json');
const spirits = read('src/games/dddhd/spirit-facts.json');
const entry = (id: string) => {
  const value = ddd.entries.find(e => e.id === id);
  expect(value, id).toBeDefined();
  return value!;
};

describe('DDD player-goal research dispositions', () => {
  it('separates evidence from deferred work and preserves the genuine recovery question', () => {
    expect(ledger.findings).toHaveLength(25);
    expect(ledger.practicalReview.evidenceCounts).toEqual({ partial: 16, resolved: 8, blocked: 1 });
    expect(ledger.practicalReview.researchDispositionCounts).toEqual({ deferred: 14, resolved: 8, open: 3 });
    for (const finding of ledger.findings) {
      for (const field of ['playerGoal', 'sufficientGuidance', 'deferralReason', 'reopenWhen', 'practicalReviewReport']) {
        expect(finding[field]?.length, `${finding.id}: ${field}`).toBeGreaterThan(0);
      }
      for (const id of finding.practicalRuntimeEntries) entry(id);
      if (finding.researchDisposition === 'deferred') expect(finding.deferredDetails.length).toBeGreaterThan(0);
    }
    expect(ledger.findings.find((f: any) => f.id === 'DDD-004')).toMatchObject({ status: 'blocked', researchDisposition: 'open' });
    expect(ledger.findings.find((f: any) => f.id === 'DDD-025')).toMatchObject({ id: 'DDD-025', status: 'partial' });
    expect(entry('dddhd:reference:secret-ending').instructions).toContain('without that backup remains unverified');
  });

  it('carries 22 HD portal landmarks into the correct stable identities and material routes', () => {
    expect(facts.portalLandmarks).toHaveLength(22);
    expect(new Set(facts.portalLandmarks.map((r: any) => r.id)).size).toBe(22);
    for (const route of facts.portalLandmarks) {
      const portal = entry(route.id);
      expect(portal).toMatchObject({ character: route.character, world: route.world, area: route.expectedArea });
      expect(portal.instructions).toContain(route.landmark);
      expect(portal.sources).toContain(route.source);
      for (const material of ddd.entries.filter(e => e.category === 'materials')) {
        for (const drop of material.drops ?? []) {
          if (drop.enemy === `${route.character} Special Portal ${route.number}` && drop.location.startsWith(`${route.world} · `)) {
            expect(drop.details).toContain(route.landmark);
            expect(material.sources).toContain(route.source);
          }
        }
      }
    }
  });

  it('checks the Faith detour against actual reciprocal board edges and LP costs', () => {
    const spirit = spirits.find((s: any) => s.name === 'Flowbermeow');
    const path = ['A-6', 'B-6', 'C-6', 'D-6', 'E-6', 'F-6'];
    for (let i = 1; i < path.length; i++) {
      expect(spirit.board.edges.some((edge: string[]) => edge.includes(path[i - 1]) && edge.includes(path[i]))).toBe(true);
    }
    const nodes = path.map(coordinate => spirit.board.nodes.find((n: any) => n.coordinate === coordinate));
    expect(nodes.filter(n => n.cost.endsWith(' LP')).reduce((sum, n) => sum + parseInt(n.cost), 0)).toBe(480);
    expect(nodes.find(n => n.coordinate === 'E-6').cost).toBe('Level 25');
    expect(entry('dddhd:commands:faith').instructions).toContain('480 LP');
    expect(entry('dddhd:commands:faith').uncertainty).toContain('C-7');
  });

  it('proves known petting detours exist without filling unknown cells', () => {
    let missing = 0;
    for (const spirit of spirits) {
      const states = spirit.dispositions;
      for (const state of states) {
        for (const transition of state.interactions) {
          if (transition.bodyPart !== null) continue;
          missing++;
          const known = new Set<string>([state.name]);
          const queue = [state.name];
          while (queue.length) {
            const currentName = queue.shift();
            const current = states.find((s: any) => s.name === currentName);
            for (const step of current.interactions.filter((s: any) => s.bodyPart)) {
              if (!known.has(step.to)) { known.add(step.to); queue.push(step.to); }
            }
          }
          expect(known.has(transition.to), `${spirit.name}: ${state.name} → ${transition.to}`).toBe(true);
        }
      }
    }
    expect(missing).toBe(5);
    for (const name of ['Beatalike', 'Catanuki', 'Tubguin Ace']) {
      expect(spirits.find((s: any) => s.name === name).baseStats.hp).toBe('???');
    }
    expect(entry('dddhd:reference:spirit-disposition-routes').instructions).toContain('a single treat does not guarantee');
  });

  it('applies every reviewed entry patch and keeps all ordinary catalog identities', () => {
    for (const patch of facts.entryPatches) {
      expect(entry(patch.id).instructions).toContain(patch.appendInstructions);
      for (const source of patch.sources) expect(entry(patch.id).sources).toContain(source);
    }
    expect(ddd.entries).toHaveLength(1285);
    expect(ddd.recipes).toHaveLength(263);
    expect(ddd.entries.filter(e => e.category === 'treasures')).toHaveLength(438);
    expect(ddd.entries.filter(e => e.category === 'portals')).toHaveLength(346);
    expect(ddd.entries.filter(e => e.category === 'achievements')).toHaveLength(54);
    expect(new Set(ddd.entries.map(e => e.id)).size).toBe(ddd.entries.length);
  });

  it('keeps conservative completion advice separate from missing timing and counter evidence', () => {
    expect(entry('dddhd:challenges:secret-cup').instructions).toContain('not a newly verified minimum');
    expect(entry('dddhd:awards:daring-diver').instructions).toContain('recorded High Scores');
    expect(entry('dddhd:awards:daring-diver').instructions).not.toContain('either');
    expect(entry('dddhd:awards:dream-pleaser').instructions).toContain('affinity level 9');
    expect(entry('dddhd:awards:dream-pleaser').instructions).toContain('remains unverified');
    expect(entry('dddhd:challenges:lord-kyroo').instructions).toContain('without loading a save');
    expect(entry('dddhd:commands:strike-raid').uncertainty).toContain('22, 24 seconds');
    expect(spirits.flatMap((s: any) => s.formulas).filter((f: any) => f.probability === null && !f.recipeItemFormula)).toHaveLength(141);
  });
});


describe('DDD critical sufficiency re-audit', () => {
  const review = read('ai_docs/games/dddhd/practical-reaudit-evidence-2026-10-02.json');
  it('does not attach a raw 100-percent guarantee to colliding custom ingredients', () => {
    expect(review.recipeInputCollisions).toHaveLength(3);
    const pairs = review.recipeInputCollisions.map((x: any) => x.outcomes.map((o: any) => o.breed).sort());
    expect(pairs).toContainEqual(['Cyber Yog', 'Sir Kyroo']);
    expect(pairs).toContainEqual(['Tyranto Rex', 'Ursa Circus']);
    expect(pairs).toContainEqual(['Jestabocky', 'Meow Wow']);
    expect(ddd.recipes!.filter(r => r.instructions.includes('Named recipe route:'))).toHaveLength(54);
    for (const recipe of ddd.recipes!) {
      expect(recipe.instructions).not.toContain('Success: 100% for the marked recipe-item formula');
      expect(recipe.instructions).toContain('named Recipes-tab selection requires the item');
    }
    expect(entry('dddhd:recipe-items:ursa-circus-recipe').instructions).toContain('Obtain this item to select');
    expect(entry('dddhd:recipe-items:ursa-circus-recipe').instructions).not.toContain('stock level .');
    expect(entry('dddhd:reference:spirit-creation').instructions).toContain('Custom creation is a separate tab');
  });
  it('distinguishes the strict adapter graph from the source-reported connector', () => {
    const board = spirits.find((s: any) => s.name === 'Jestabocky').board;
    const reachable = (edges: string[][]) => {
      const seen = new Set<string>(['A-1']);
      let changed = true;
      while (changed) {
        changed = false;
        for (const [a, b] of edges) {
          if (seen.has(a) && !seen.has(b)) { seen.add(b); changed = true; }
          if (seen.has(b) && !seen.has(a)) { seen.add(a); changed = true; }
        }
      }
      return seen;
    };
    const strictEdges = board.edges.filter((edge: string[]) => !(edge.includes('A-3') && edge.includes('B-3')));
    expect(board.nodes.length - reachable(strictEdges).size).toBe(9);
    expect(reachable(board.edges).size).toBe(board.nodes.length);
    expect(reachable([...board.edges, review.boardAdapterFinding.reportedUndirectedConnector]).size).toBe(board.nodes.length);
    expect(board.unmatchedSourceDirections).toEqual([['B-3', 'Left', 'A-3']]);
    expect(entry('dddhd:spirits:jestabocky').instructions).toContain('Additional source-reported connectors: A-3 ↔ B-3');
    expect(entry('dddhd:spirits:jestabocky').uncertainty).toContain('not proof of an in-game locked branch');
  });
  it('supplies a repeat loop for the five required Brilliant Fantasies', () => {
    const budget = spirits.flatMap((s: any) => s.formulas.filter((f: any) => f.recipeItemFormula).flatMap((f: any) => f.ingredients.filter((i: any) => i[0] === 'Brilliant Fantasy').map((i: any) => i[1]))).reduce((a: number, b: number) => a + b, 0);
    expect(budget).toBe(5);
    const route = entry('dddhd:materials:brilliant-fantasy').instructions!;
    for (const text of ['Delusive Beginning', 'Tyranto Rex', 'Drop to Sora and back', 'five', 'no all-39-clear prerequisite']) expect(route).toContain(text);
    expect(entry('dddhd:materials:wild-fantasy').instructions).toContain('Drop away and back');
  });
  it('gives seven concrete bonus examples and aggregate completion actions', () => {
    expect(review.bonusExamples).toHaveLength(7);
    expect(new Set(review.bonusExamples.map((x: any) => x.type)).size).toBe(7);
    const worlds = read('src/games/dddhd/world-facts.json');
    for (const example of review.bonusExamples) {
      const actual = worlds.portals.find((p: any) => p.character === example.character && p.world === example.world && p.number === example.number);
      expect(actual).toMatchObject({ objective: example.objective, area: example.area, forecast: example.forecast, unlock: example.unlock });
      expect(entry('dddhd:achievements:brave-challengers').instructions).toContain(example.area);
    }
    for (const id of ['record-keeper', 'star-combatant', 'storyteller', 'item-collector', 'command-collector']) expect(entry(`dddhd:achievements:${id}`).instructions!.length).toBeGreaterThan(120);
  });
});


describe('Golden Egg practical rank route', () => {
  it('distinguishes a guaranteed star rank from selecting one particular breed', () => {
    const guide = read('src/games/dddhd/content.json');
    const target = guide.entries.find((e: any) => e.id === 'dddhd:achievements:golden-egg');
    for (const phrase of ['10 Intrepid Figments', '8 Vibrant Figments', 'either Tama Sheep or Pricklemane', 'not a particular breed', 'B → A → ★']) expect(target.instructions).toContain(phrase);
    const inputs = [{id:'dddhd:materials:intrepid-figment',quantity:5},{id:'dddhd:materials:vibrant-figment',quantity:4}];
    const pair = guide.recipes.filter((r: any) => ['Tama Sheep', 'Pricklemane'].includes(r.group) && JSON.stringify(r.ingredients) === JSON.stringify(inputs));
    expect(pair).toHaveLength(2);
    for (const recipe of pair) expect(recipe.name).toContain('base rank B');
    expect(target.sources).toContain('https://gamefaqs.gamespot.com/ps4/181154-kingdom-hearts-hd-28-final-chapter-prologue/faqs/77497');
  });
});
