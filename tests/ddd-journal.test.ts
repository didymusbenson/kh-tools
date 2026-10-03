import { describe, expect, it } from 'vitest';
import { dddReadingText } from '../src/journal/DddJournal';
import { emptyProfile, journalStartRoute, parseProfile } from '../src/games/profile';
import ddd from '../src/games/dddhd';

describe('DDD Reports presentation boundaries', () => {
  it('opens new journals on Reports and preserves existing saved routes', () => {
    expect(journalStartRoute('dddhd')).toBe('dddhd/contents');
    expect(parseProfile({...emptyProfile('dddhd'),route:'dddhd/worlds/Traverse%20Town'},ddd).route).toBe('dddhd/worlds/Traverse%20Town');
  });
  it('removes inline citation URLs without changing recipe identity or custom odds caveats', () => {
    const recipe=ddd.recipes![0], original=recipe.instructions;
    const text=dddReadingText(original);
    expect(text).not.toContain('https://');
    expect(text).toContain('not a 100% claim for custom ingredient selection');
    expect(text).toContain('named Recipes-tab selection requires the item');
    expect(recipe.instructions).toBe(original);
  });
  it('keeps important uncertainty and separates report prose from extraction bookkeeping', () => {
    expect(dddReadingText('Source board topology and gates are extracted; disposition-dependent nodes remain conditional.')).toBe('Disposition-dependent nodes remain conditional.');
    const aura=ddd.entries.find(e=>e.id==='dddhd:spirits:aura-lion')!;
    expect(dddReadingText(aura.uncertainty)).toContain('Do not substitute the level gate for the secret purchase.');
    expect(dddReadingText(aura.uncertainty)).toContain('C-7 (250 LP)');
    const reload=ddd.entries.find(e=>e.id==='dddhd:commands:strike-raid')!;
    expect(dddReadingText(reload.uncertainty)).toContain('22, 24 seconds');
    expect(dddReadingText('not a newly verified minimum')).toBe('the earliest requirement is not confirmed');
  });
  it('retains paragraph boundaries and all stable Sora/Riku/shared checklist identities', () => {
    expect(dddReadingText('First paragraph.\n\nSecond paragraph.')).toBe('First paragraph.\n\nSecond paragraph.');
    const sora=ddd.entries.find(e=>e.category==='treasures'&&e.character==='Sora')!;
    const riku=ddd.entries.find(e=>e.category==='treasures'&&e.character==='Riku')!;
    const spirit=ddd.entries.find(e=>e.category==='spirits')!;
    const p=parseProfile({...emptyProfile('dddhd'),checks:{[sora.id]:true,[riku.id]:false,[spirit.id]:true}},ddd);
    expect(p.checks[sora.id]).toBe(true);expect(p.checks[riku.id]).toBe(false);expect(p.checks[spirit.id]).toBe(true);
  });
});
