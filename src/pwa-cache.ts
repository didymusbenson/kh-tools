/** Verify saved shell, guide data, and its entry scripts/styles; registration alone is insufficient. */
export async function hasSavedJournal(
  base: string,
  match: (url: string) => Promise<Response | undefined>,
): Promise<boolean> {
  const index = await match(new URL("index.html", base).href);
  const guide = await match(new URL("data/kh1fm.json", base).href);
  if (!index?.ok || !guide?.ok) return false;
  const html = await index.text();
  const assets = [...html.matchAll(/(?:src|href)=["']([^"']+\.(?:js|css))["']/g)]
    .map((entry) => new URL(entry[1], base).href);
  if (!assets.some((url) => url.endsWith(".js"))) return false;
  return (await Promise.all(assets.map(match))).every((response) => response?.ok);
}
