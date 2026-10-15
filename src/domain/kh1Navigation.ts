/** Route-local return destinations survive reloads and never depend on browser history. */
export function kh1ReturnRoute(value: string | null): string | undefined {
  if (!value || value.length > 12000 || !/^kh1fm\/[a-z][a-z0-9-]*(?:\/[^?#\s]*)?(?:\?[^#\s]*)?$/.test(value)) return;
  return value;
}

export function kh1WithOrigin(target: string, origin: string): string {
  if (origin === 'kh1fm/contents') return target;
  if (!target.startsWith('#/kh1fm/') || !kh1ReturnRoute(origin)) return target;
  const [path, query = ''] = target.slice(2).split('?');
  const params = new URLSearchParams(query);
  params.set('returnTo', origin);
  return `#/${path}?${params}`;
}

export function kh1ParentRoute(route: string): string {
  const [path, query = ''] = route.split('?');
  const params = new URLSearchParams(query);
  const explicit = kh1ReturnRoute(params.get('returnTo'));
  if (explicit && explicit !== route) return explicit;
  params.delete('returnTo');
  if (params.has('entry') || params.has('item')) {
    params.delete('entry'); params.delete('item');
    if (path.startsWith('kh1fm/entry/')) return 'kh1fm/contents';
    return path + (params.size ? `?${params}` : '');
  }
  if (path.startsWith('kh1fm/gummi/')) {
    params.delete('page');
    return 'kh1fm/gummi' + (params.size ? `?${params}` : '');
  }
  if (path.startsWith('kh1fm/worlds/')) return 'kh1fm/worlds';
  if (params.get('fromWorld')) return 'kh1fm/worlds/' + encodeURIComponent(params.get('fromWorld')!);
  if (path.startsWith('kh1fm/synthesis/')) return 'kh1fm/synthesis';
  return 'kh1fm/contents';
}

export function kh1RouteLabel(route: string): string {
  const [path, query = ''] = route.split('?');
  const parts = path.split('/');
  const names: Record<string, string> = {contents:'Contents', search:'Search results', progress:'Save & Settings', worlds:'Worlds', bestiary:'Heartless', 'ansem-reports':'Ansem’s Reports', dalmatians:'101 Dalmatians', trinities:'Trinity Marks', minigames:'Mini-Games', synthesis:'Synthesis', treasures:'Treasures & Postcards', 'torn-pages':'Torn Pages', 'magic-upgrades':'Magic', equipment:'Equipment, Items & Abilities', coliseum:'Coliseum', gummi:'Gummi Ship', challenges:'Challenges', achievements:'Steam Achievements', reference:'Reference', entry:'Journal entry'};
  if (parts[1] === 'worlds' && parts[2]) { try { return decodeURIComponent(parts[2]); } catch { return 'Worlds'; } }
  const sub: Record<string,string> = {parts:'Parts', missions:'Missions', blueprints:'Blueprints', recipes:'Recipes', materials:'Materials', plan:'Farming Plan'};
  const title = sub[parts[2]] || names[parts[1]] || 'Contents';
  return new URLSearchParams(query).has('entry') || new URLSearchParams(query).has('item') ? `${title} entry` : title;
}
