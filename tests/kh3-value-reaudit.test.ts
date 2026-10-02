import { describe, expect, it } from 'vitest';
import content from '../src/games/kh3/content.json';
import audit from '../ai_docs/games/kh3/value-reaudit-2026-10-02.json';
import ledger from '../ai_docs/games/kh3/audit-dispositions.json';
const entries = content.entries as unknown as Array<Record<string, any>>;
const byId = new Map(entries.map(e => [e.id, e]));
describe('KH3 corrected player-value audit', () => {
  it('gives all twelve score challenges actions instead of only score targets', () => {
    const ids = [...audit.flanGuideIds, ...audit.scoreGuideIds];
    expect(ids).toHaveLength(12);
    for (const id of ids) {
      const e = byId.get(id)!;
      expect(e.instructions, id).toContain('Start:');
      expect(e.instructions, id).toContain('Scoring method:');
      expect(e.practicalGuide.startProvided).toBe(true);
      expect(e.practicalGuide.scoringMethodProvided).toBe(true);
      expect(e.sources.length).toBeGreaterThan(1);
    }
    expect(byId.get('kh3.challenges.flash-tracer-b')!.instructions).toContain('Go Go');
    expect(byId.get('kh3.challenges.frozen-slider')!.instructions).toContain('Elsa');
    expect(byId.get('kh3.challenges.orange-flan')!.instructions).toContain('seven photographs');
  });
  it('checks every equipment method and canonical reference', () => {
    const equipment = entries.filter(e => e.category === 'equipment' || e.id === 'kh3.equipment.forest-clasp');
    expect(equipment).toHaveLength(157);
    expect(audit.equipmentCensus).toHaveLength(157);
    expect(new Set(audit.equipmentCensus.map(e => e.id)).size).toBe(157);
    const recipeIds = new Set(content.recipes.map(r => r.id));
    for (const e of equipment) {
      expect(e.equipmentAcquisitionReview.actionable, e.id).toBe(true);
      expect(e.equipmentAcquisitionReview.method.length).toBeGreaterThan(5);
      for (const id of e.equipmentAcquisitionReview.referenceIds) expect(byId.has(id) || recipeIds.has(id), `${e.id}: ${id}`).toBe(true);
    }
    expect(byId.get('kh3.equipment.petite-ribbon')!.acquisitionRecordIds).toContain('kh3.base.toy-box.chest.006');
    expect(byId.get('kh3.equipment.laughter-pin')!.instructions).toContain('Scream Strike');
    expect(byId.get('kh3.equipment.lucky-ring')!.instructions).toContain('Mail postcards');
  });
  it('makes known aliases match exactly the fields used by the current renderer', () => {
    expect(audit.searchableAliasEntryIds).toHaveLength(33);
    for (const e of entries.filter(e => e.aliases?.length)) {
      const searchable = `${e.name} ${e.world || ''} ${e.area || ''} ${e.summary}`.toLowerCase();
      for (const alias of e.aliases) expect(searchable.includes(alias.toLowerCase()), `${e.id}: ${alias}`).toBe(true);
    }
  });
  it('reconciles the first-Shore scene and keeps useful naval targeting open', () => {
    const clasp = ledger.findings.find(f => f.id === 'KH3-005')!;
    expect(clasp.status).toBe('resolved');
    expect(clasp.researchDisposition).toBe('resolved');
    expect(byId.get('kh3.equipment.forest-clasp')!.missability).toContain('first Shore');
    expect(ledger.findings.find(f => f.id === 'KH3-022')!.researchDisposition).toBe('open');
    expect(byId.get('kh3.naval.leviathan-level-9')!.instructions).toContain('Confinement Isle');
    const naval = entries.filter(e => e.category === 'naval-rewards');
    expect(naval).toHaveLength(14);
    expect(naval.every(e => e.instructions && ['boarding', 'fleet destruction'].includes(e.navalRewardMethod))).toBe(true);
    expect(byId.get('kh3.naval-rewards.ghost-ship-fleet-4')!.navalRewardMethod).toBe('fleet destruction');
    expect(byId.get('kh3.naval-rewards.black-ship-fleet-11')!.navalRewardMethod).toBe('boarding');
  });
});
