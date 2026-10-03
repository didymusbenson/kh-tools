import { describe, expect, it } from 'vitest';
import content from '../src/games/kh3/content.json';
import integration from '../ai_docs/games/kh3/practical-integration-2026-10-02.json';
import dispositions from '../ai_docs/games/kh3/audit-dispositions.json';

const entries = content.entries as unknown as Array<Record<string, any>>;
const byId = new Map(entries.map(entry => [entry.id, entry]));
const get = (suffix: string) => byId.get(`kh3.${suffix}`)!;

describe('KH3 practical acquisition closure', () => {
  it('preserves collection identities and recipe actions', () => {
    expect(entries).toHaveLength(1954);
    expect(content.recipes).toHaveLength(286);
    expect(integration.addedIds).toEqual([]);
    expect(integration.removedIds).toEqual([]);
    for (const id of integration.changedEntryIds) expect(byId.has(id), id).toBe(true);
  });

  it('gives all 33 Gummi battles readable routes and separates score and reward columns', () => {
    const battles = entries.filter(entry => entry.category === 'gummi-battles');
    expect(battles).toHaveLength(33);
    expect(get('gummi-reference.gummi-build-budgeting').instructions).toContain('Gummi Records');
    expect(integration.gummiBattleApproachIds).toHaveLength(33);
    for (const battle of battles) {
      expect(battle.instructions).toMatch(/^Flight approach/);
      expect(battle.instructions).toContain('Gummi build budgeting');
      expect(battle.instructions).not.toContain('Ranks / Ranks');
      expect(battle.routeEvidence.source).toMatch(/^https:/);
      expect(battle.rankRewards.map((rank: any) => rank.rank)).toEqual(['A', 'B', 'C', 'D', 'E']);
      expect(battle.rankRewards.slice(0, 3).every((rank: any) => rank.first && rank.repeat)).toBe(true);
      const scores = battle.rankRewards.map((rank: any) => rank.minimumScore);
      expect(scores.every((score: number, i: number) => Number.isInteger(score) && (i === 0 || scores[i - 1] > score))).toBe(true);
      // The existing source table's columns remain the authority; never shift a C reward into the C score row.
      for (const rank of battle.rankRewards.slice(0, 3)) {
        const source = battle.battleTable.find((row: any) => row.cells[6] === rank.rank);
        expect(rank.first).toBe(source.cells[7]);
        expect(rank.repeat).toBe(source.cells[8]);
      }
    }
    expect(get('gummi-battles.speed-skirmish-5').rankRewards[1].minimumScore).toBe(95000);
    expect(get('gummi-battles.clash-with-the-omega-machina').rankRewards[1].minimumScore).toBe(1500000);
    expect(get('gummi-battles.clash-with-the-comet-crawlers').uncertainty).toContain('100');
  });

  it('joins material farms only to exact sourced enemies and keeps them post-clear', () => {
    expect(integration.materialFarmRouteIds).toHaveLength(41);
    for (const id of integration.materialFarmRouteIds) {
      const material = byId.get(id)!;
      expect(material.farmRoutes).toHaveLength(1);
      const route = material.farmRoutes[0];
      const gate = byId.get(route.gateId)!;
      expect(gate.category).toBe('battlegates');
      expect(gate.encounterFacts.join(' ')).toContain(`${route.enemy} x `);
      expect(material.drops.some((drop: any) => drop.enemy === route.enemy && drop.rate === route.rate)).toBe(true);
      expect(route.prerequisite).toMatch(/clear/i);
      expect(material.instructions).toMatch(/repeat option|Repeat option/);
      expect(material.uncertainty || '').not.toContain('farm location has not yet been added');
    }
  });

  it('accounts for every material path and every research decision without erasing evidence gaps', () => {
    const materials = entries.filter(entry => entry.acquisitionSources);
    expect(materials).toHaveLength(60);
    expect(integration.materialFieldRouteIds).toHaveLength(9);
    for (const material of materials) {
      expect(Boolean(material.farmRoutes?.length || material.fieldFarmEvidence || material.chestRouteIds?.length || material.sphereRewards?.length), material.id).toBe(true);
    }
    expect(dispositions.findings).toHaveLength(35);
    expect(dispositions.statusCounts).toEqual({ partial: 13, resolved: 20, conflicted: 2 });
    expect(dispositions.researchDispositionCounts).toEqual({ resolved: 20, deferred: 13, open: 2 });
    for (const finding of dispositions.findings) {
      expect(finding.evidenceStatus).toBe(finding.status);
      expect(finding.playerGoal.length).toBeGreaterThan(20);
      expect(finding.sufficientGuidance.length).toBeGreaterThan(20);
      if (finding.researchDisposition === 'deferred') {
        expect(finding.deferredDetails.length).toBeGreaterThan(0);
        expect(finding.deferralReason!.length).toBeGreaterThan(50);
        expect(finding.reopenWhen.length).toBeGreaterThan(20);
      }
    }
    expect(dispositions.findings.filter(f => f.researchDisposition === 'open').map(f => f.id)).toEqual(['KH3-022', 'KH3-029']);
  });

  it('explains missable tasks, the forge puzzle and safe DLC saves', () => {
    const clasp = get('equipment.forest-clasp');
    for (const word of ['Aero', 'pond', 'rabbits', 'birds', 'stepping stones', 'pre-Shore save']) expect(clasp.instructions).toContain(word);
    expect(get('equipment.knight-s-shield-plus').instructions).toContain('cauldrons');
    expect(get('edition-reference.re-mind-save-continuation').instructions).toContain('on-screen');
    expect(get('edition-reference.re-mind-save-continuation').instructions).toContain('separate Re Mind Scala');
  });

  it('protects forward achievement attempts without promising code-contaminated save recovery', () => {
    expect(get('achievement.salvager').instructions).toContain('Gummi Ship Meister OFF');
    expect(get('achievement.salvager').instructions).toContain('no verified in-place repair');
    expect(get('premium-codes.ez-gummi-ship-meister').instructions).toContain('not a verified repair');
    expect(get('achievement.risk-taker').instructions).toContain('364,125');
    expect(get('achievement.risk-taker').instructions).toContain('best single score');
    expect(get('achievement.all-rounder').instructions).toContain('other EZ Battle Codes');
    for (const id of ['honey', 'sour-cherry', 'strawberry', 'blood-orange', 'banana', 'grapes', 'melon', 'watermelon']) {
      expect(get(`material.${id}`).uncertainty).not.toContain('pickup positions are not yet mapped');
    }
  });
});
