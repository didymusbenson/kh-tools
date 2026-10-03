import { describe, expect, it } from 'vitest';
import enrichment from '../ai_docs/games/bbsfm/research-enrichment.json';
import acquisitions from '../ai_docs/games/bbsfm/acquisition-tables.json';
import families from '../ai_docs/games/bbsfm/command-families.json';
import ledger from '../ai_docs/games/bbsfm/research-dispositions-2026-10-01.json';
import guide from '../src/games/bbsfm/content.json';
import ui from '../src/games/bbsfm/ui-data.json';

const entry = (id: string) => guide.entries.find(e => e.id === id)!;
const characters = ['terra', 'ventus', 'aqua'];

describe('BBS critical re-audit', () => {
  it('accounts for all 38 families and every current open record', () => {
    expect(ledger.findings).toHaveLength(38);
    expect(ledger.critical_reaudit_2026_10_03.counts).toEqual({ resolved: 12, deferred: 16, open: 5, 'other-limitation': 5 });
    expect(ledger.practical_review_2026_10_02.historical_only).toBe(true);
    const ids = new Set([...guide.entries, ...guide.recipes].map(r => r.id));
    for (const finding of ledger.findings) {
      for (const key of ['playerGoal', 'sufficientGuidance', 'deferredDetails', 'deferralReason', 'reopenWhen', 'practicalReviewReport'] as const) {
        expect(typeof finding[key], `${finding.id} ${key}`).toBe('string');
      }
      expect(finding.practicalReviewReport).toBe(`critical-reaudit-2026-10-03.md#${finding.id.toLowerCase()}`);
      if (finding.researchDisposition === 'open') {
        expect(finding.openDetails.length).toBeGreaterThan(30);
        expect(finding.openRecordIds.length).toBeGreaterThan(0);
        finding.openRecordIds.forEach(id => expect(ids.has(id), `${finding.id}: ${id}`).toBe(true));
      } else {
        expect(finding.openRecordIds).toEqual([]);
      }
    }
    expect(guide.coverage).toContain('16 deferred optional-precision families, 5 open practical families');
    expect(guide.coverage).not.toContain('Nineteen');
  });

  it('integrates every audited weak chest locator without changing its ID', () => {
    const audit = enrichment.route_recheck_2026_10_02;
    expect(audit.rows).toHaveLength(39);
    expect(audit.unresolved_route_ids).toEqual([]);
    expect(new Set(audit.rows.map(r => r.id)).size).toBe(39);
    for (const row of audit.rows) {
      expect(entry(row.id).instructions, row.id).toContain(row.instructions);
      expect(entry(row.id).instructions).not.toContain('Tower Toom');
      for (const source of row.sources) expect(entry(row.id).sources).toContain(source);
    }
  });

  it('checks all 60 sticker locators independently from album placements', () => {
    const census = enrichment.sticker_route_census_2026_10_03;
    expect(census.rows).toHaveLength(60);
    expect(census.rows.filter(r => !r.baseline_sufficient)).toHaveLength(26);
    expect(census.rows.filter(r => r.correction_integrated)).toHaveLength(26);
    expect(census.unresolved_route_ids).toEqual([]);
    expect(new Set(census.rows.map(r => r.id))).toEqual(new Set(guide.entries.filter(e => e.category === 'stickers').map(e => e.id)));
    for (const row of census.rows) {
      expect(row.current_sufficient, row.id).toBe(true);
      expect(entry(row.id).instructions).toContain(row.current_instruction);
      expect(ui.research.collectible_overrides[row.id as keyof typeof ui.research.collectible_overrides].instructions).toBe(row.current_instruction);
      if (row.correction_integrated) expect(row.correction_sources.length).toBeGreaterThan(0);
    }
  });

  it('exposes a character-scoped repeatable route for every crystal with honest source limits', () => {
    const farms = enrichment.crystal_farm_routes;
    expect(farms).toHaveLength(12);
    expect(new Set(farms.map(f => f.crystal)).size).toBe(9);
    expect(enrichment.crystal_farm_open_routes).toEqual([]);
    for (const crystal of ui.crystals) for (const character of ['Terra', 'Ventus', 'Aqua']) {
      const routes = farms.filter(f => f.crystal === crystal.name && f.characters.includes(character));
      expect(routes.length, `${character}: ${crystal.name}`).toBeGreaterThan(0);
      for (const route of routes) {
        expect(route.repeat.length).toBeGreaterThan(30);
        expect(route.sources.length).toBeGreaterThan(1);
        expect(route.evidence_scope.length).toBeGreaterThan(30);
        expect(entry(`bbsfm:${character.toLowerCase()}:material:${crystal.name.toLowerCase().replaceAll(' ', '-')}`).instructions).toContain(route.instructions);
      }
    }
    const secret = farms.find(f => f.crystal === 'Secret Gem')!;
    expect(secret.area).toBe('Fountain Court');
    expect(secret.enemies).toBe('ordinary Flood');
    expect(secret.conditions).toContain('0.04%');
    expect(secret.conditions).toContain('original Japanese PSP');
    expect(secret.conditions).toContain('Do not apply the rate to giant');
  });

  it('preserves real null Medal Shop gates and integrates known AND requirements', () => {
    const rows = acquisitions.medal_shop.rows;
    expect(rows).toHaveLength(15);
    expect(rows.filter(r => r.shop_level === null).map(r => r.name)).toEqual(['Voltage Stack', 'Unison Rush', 'Aerial Recovery']);
    expect(rows.find(r => r.name === 'Trinity Limit')).toMatchObject({ cost: 1400, shop_level: 3, arena_level: 1 });
    for (const r of rows) for (const c of r.characters) {
      expect(entry(`bbsfm:${c.toLowerCase()}:command:${r.name.toLowerCase().replaceAll(' ', '-')}`).instructions).toContain(r.instructions);
    }
  });

  it('keeps character-specific Arena access and the real Combined Threat exception distinct', () => {
    expect(entry('bbsfm:aqua:arena:a-time-to-chill').prerequisites).toContain('complete Olympus Coliseum and reach Arena Level 13');
    for (const c of ['terra', 'ventus']) {
      expect(entry(`bbsfm:${c}:arena:a-time-to-chill`).prerequisites).toContain('Aqua story clear data');
      expect(entry(`bbsfm:${c}:arena:a-time-to-chill`).prerequisites).toContain('only sold to Aqua');
    }
    for (const c of characters) {
      expect(entry(`bbsfm:${c}:arena:combined-threat`).prerequisites).toContain('Documented normal route');
      expect(entry(`bbsfm:${c}:arena:combined-threat`).prerequisites).toContain('clearing the game with any character');
    }
  });

  it('publishes Rumble Rave controls and actual-hit completion rather than ownership alone', () => {
    const pete = families.dlinks.find(d => d.name === 'Pete')!;
    expect(pete.finisher_actions.find(f => f.name === 'Rumble Rave')?.instructions).toContain('Steer the spinning kart with the left stick');
    for (const c of characters) {
      const links = guide.entries.filter(e => e.character?.toLowerCase() === c && e.category === 'dlinks');
      expect(links).toHaveLength(families.dlinks.filter(link => link.characters.map(x => x.toLowerCase()).includes(c)).length);
      for (const link of links) expect(link.instructions).toContain('land at least one hit');
      for (const shotlock of ui.commands.filter(command => command.type === 'Shotlock' && command.characters.map(x => x.toLowerCase()).includes(c))) {
        expect(entry(`bbsfm:${c}:command:${shotlock.name.toLowerCase().replaceAll(' ', '-')}`).instructions).toContain('land at least one hit');
      }
    }
    expect(enrichment.practical_guidance.reports_hit_counts).toContain('Base and Enhanced');
  });

  it('retains all sixteen board scope footnotes and avoids repeat ice-cream farming', () => {
    const cards = enrichment.command_boards.boards.flatMap(b => b.opponent_decks.flatMap(d => d.cards));
    const scoped = cards.filter(c => 'scope_note' in c);
    expect(scoped).toHaveLength(16);
    for (const card of scoped) expect(card.scope_note).toContain('Menu:');
    for (const recipe of guide.recipes.filter(r => r.group === 'Ice cream')) {
      expect(recipe.instructions).toContain('bought/already-manufactured kind does not require another manufacture');
      expect(recipe.instructions).toContain('story-award substitute credit remains unresolved');
    }
    expect(acquisitions.ice_cream.practical_completion_2026_10_03.unresolved_story_awards).toEqual({ Terra: 'Rockin’ Crunch', Ventus: 'Double Crunch', Aqua: 'Royalberry' });
  });
});
