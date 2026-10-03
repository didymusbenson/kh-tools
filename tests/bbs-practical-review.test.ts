import { describe, expect, it } from 'vitest';
import catalog from '../ai_docs/games/bbsfm/command-catalog.json';
import guide from '../src/games/bbsfm/content.json';
import ui from '../src/games/bbsfm/ui-data.json';
import ledger from '../ai_docs/games/bbsfm/research-dispositions-2026-10-01.json';
import { readFileSync } from 'node:fs';

describe('BBS practical research coverage', () => {
  it('gives all 187 persistent commands acquisition guidance and preserves excluded edition evidence', () => {
    expect(catalog.commands).toHaveLength(187);
    for (const command of catalog.commands) {
      expect(command.acquisitions.length, command.name).toBeGreaterThan(0);
      const routes = command.acquisitions.join(' ');
      expect(routes).not.toContain('memory stick');
      expect(routes).not.toContain('[KH BbS]');
      expect(routes).not.toContain('while riding their Keyblade Glider');
      expect(ui.commands.find(c => c.name === command.name)?.acquisitions).toEqual(command.acquisitions);
    }
    expect(catalog.practical_review_2026_10_02.excluded_acquisition_count).toBe(13);
    expect(catalog.practical_review_2026_10_02.previously_empty_acquisitions_filled).toHaveLength(22);
  });

  it('identifies menu-mode command purchases and preserves separate Arena requirements', () => {
    for (const command of catalog.commands) {
      for (const route of command.acquisitions.filter(r => r.includes('Board'))) {
        expect(route, command.name).toContain('menu Command Board');
      }
    }
    const focus = guide.entries.find(e => e.id === 'bbsfm:aqua:command:focus-barrier')!;
    expect(focus.instructions).toContain('menu Command Board');
    expect(focus.sources).toContain('https://www.khwiki.com/Command_Board');
    expect(guide.entries.find(e => e.id === 'bbsfm:terra:arena-level:command-board-wins-7')?.instructions).toContain('Mirage Arena');
  });

  it('renders source-null meld levels honestly without changing saved recipe identities', () => {
    expect(guide.recipes.some(r => r.instructions.includes('level None'))).toBe(false);
    const glide = guide.recipes.find(r => r.id === 'bbsfm:ventus:meld:fire-surge-3-glide-none')!;
    expect(glide.instructions).toContain('Glide (source gives no level requirement)');
    expect(ui.groups.find(r => r.id === glide.id)?.inputs.find(i => i.name === 'Glide')?.level).toBeNull();
    expect(guide.entries).toHaveLength(1653);
    expect(guide.recipes).toHaveLength(492);
    expect(guide.entries.filter(e => e.collectible === true)).toHaveLength(442);
  });

  it('reviews every family without turning missing evidence into factual closure', () => {
    expect(ledger.findings).toHaveLength(38);
    const counts = (field: 'status' | 'researchDisposition') => ledger.findings.reduce<Record<string, number>>((acc, f) => {
      acc[f[field]] = (acc[f[field]] ?? 0) + 1;
      return acc;
    }, {});
    expect(counts('status')).toEqual(ledger.counts);
    expect(counts('researchDisposition')).toEqual({ resolved: 12, deferred: 16, open: 5, 'other-limitation': 5 });
    const report = readFileSync(new URL('../ai_docs/games/bbsfm/critical-reaudit-2026-10-03.md', import.meta.url), 'utf8');
    const deferrals = readFileSync(new URL('../ai_docs/games/bbsfm/future-improvements.md', import.meta.url), 'utf8');
    for (const finding of ledger.findings) {
      expect(report).toContain(`### ${finding.id}\n`);
      expect(finding.playerGoal.length).toBeGreaterThan(15);
      expect(finding.sufficientGuidance.length).toBeGreaterThan(30);
      if (finding.researchDisposition === 'deferred') {
        expect(['partial', 'researched-open']).toContain(finding.status);
        expect(finding.deferredDetails.length).toBeGreaterThan(20);
        expect(finding.deferralReason.length).toBeGreaterThan(30);
        expect(finding.reopenWhen.length).toBeGreaterThan(20);
        expect(deferrals).toContain(`## ${finding.id} —`);
      }
    }
    expect(ledger.findings.filter(f => f.researchDisposition === 'open').map(f => f.id)).toEqual(['BBS-010', 'BBS-019', 'BBS-021', 'BBS-031', 'BBS-032']);
  });

  it('publishes safe completion advice without claiming the unresolved predicates are verified', () => {
    expect(guide.entries.find(e => e.id === 'bbsfm:terra:finish:surprise-1')?.instructions).toContain('keep an eligible parent equipped');
    const secret = guide.entries.find(e => e.id === 'bbsfm:secret-episode:unlock')!;
    expect(secret.instructions).toContain('Do not delete saves');
    expect(secret.uncertainty).toContain('remain unverified');
    const collector = guide.entries.find(e => e.id === 'bbsfm:achievement:collector')!;
    expect(collector.instructions).toContain('not a verified replay or save-deletion remedy');
    expect(guide.entries.find(e => e.id === 'bbsfm:aqua:mission:ringer')?.instructions).toContain('Aim above 40');
    expect(guide.entries.find(e => e.id === 'bbsfm:terra:boss-reference:unknown')?.instructions).toContain('Second Chance and Once More');
  });
});
