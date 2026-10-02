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
    expect(ledger.practicalReview.evidenceCounts).toEqual({ partial: 17, resolved: 7, blocked: 1 });
    expect(ledger.practicalReview.researchDispositionCounts).toEqual({ deferred: 17, resolved: 7, open: 1 });
    for (const finding of ledger.findings) {
      for (const field of ['playerGoal', 'sufficientGuidance', 'deferralReason', 'reopenWhen', 'practicalReviewReport']) {
        expect(finding[field]?.length, `${finding.id}: ${field}`).toBeGreaterThan(0);
      }
      for (const id of finding.practicalRuntimeEntries) entry(id);
      if (finding.researchDisposition === 'deferred') expect(finding.deferredDetails.length).toBeGreaterThan(0);
    }
    expect(ledger.findings.find((f: any) => f.id === 'DDD-004')).toMatchObject({ status: 'blocked', researchDisposition: 'deferred' });
    expect(ledger.findings.find((f: any) => f.researchDisposition === 'open')).toMatchObject({ id: 'DDD-025', status: 'partial' });
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
    expect(entry('dddhd:awards:daring-diver').instructions).toContain('hidden aggregation rule remains unverified');
    expect(entry('dddhd:awards:dream-pleaser').instructions).toContain('not a claim that release necessarily erases');
    expect(entry('dddhd:challenges:lord-kyroo').instructions).toContain('without loading a save');
    expect(entry('dddhd:commands:strike-raid').uncertainty).toContain('22, 24 seconds');
    expect(spirits.flatMap((s: any) => s.formulas).filter((f: any) => f.probability === null && !f.recipeItemFormula)).toHaveLength(141);
  });
});
