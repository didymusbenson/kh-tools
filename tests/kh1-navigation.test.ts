import { describe, expect, it } from 'vitest';
import { kh1ParentRoute, kh1ReturnRoute, kh1RouteLabel, kh1WithOrigin } from '../src/domain/kh1Navigation';

describe('KH1 explicit origin navigation', () => {
  it('restores exact search query, filters and page after canonical Gummi navigation', () => {
    const origin='kh1fm/search?q=Fire+Gummi&world=Traverse+Town&status=remaining&page=2';
    const detail=kh1WithOrigin('#/kh1fm/gummi/parts?entry=kh1fm-gummi-fire',origin);
    expect(kh1ParentRoute(detail.slice(2))).toBe(origin);
    expect(kh1RouteLabel(origin)).toBe('Search results');
  });
  it('returns utilities through nested routes without using browser history', () => {
    const origin='kh1fm/trinities?color=Blue&sort=world&world=Agrabah&page=3';
    const search=kh1WithOrigin('#/kh1fm/search',origin).slice(2);
    const settings=kh1WithOrigin('#/kh1fm/progress',search).slice(2);
    expect(kh1ParentRoute(settings)).toBe(search);
    expect(kh1ParentRoute(search)).toBe(origin);
  });
  it.each(['entry','item'])('removes synthesis %s selection in deep-link fallback without losing filters', key => {
    expect(kh1ParentRoute(`kh1fm/synthesis/materials?q=blaze&page=2&${key}=material`)).toBe('kh1fm/synthesis/materials?q=blaze&page=2');
  });
  it('preserves world context for canonical deep links', () => {
    expect(kh1ParentRoute('kh1fm/gummi/missions?world=Wonderland&fromWorld=Wonderland&page=2')).toBe('kh1fm/gummi?world=Wonderland&fromWorld=Wonderland');
    expect(kh1ParentRoute('kh1fm/gummi?world=Wonderland&fromWorld=Wonderland')).toBe('kh1fm/worlds/Wonderland');
    expect(kh1ParentRoute('kh1fm/entry/unknown')).toBe('kh1fm/contents');
  });
  it.each(['https://evil.test','//evil.test','javascript:alert(1)','kh2fm/contents','kh1fm/contents#evil','kh1fm/contents\n'])('rejects unsafe or non-KH1 origin %s', value => {
    expect(kh1ReturnRoute(value)).toBeUndefined();
    expect(kh1ParentRoute('kh1fm/search?returnTo='+encodeURIComponent(value))).toBe('kh1fm/contents');
  });
});
