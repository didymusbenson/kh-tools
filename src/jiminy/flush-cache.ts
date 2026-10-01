import { KNOWLEDGE_REVISION } from "./types";

/** Remove obsolete knowledge only; keep model weights, guide caches and player data. */
export async function flushStaleCopperminds(base: string, storage: CacheStorage): Promise<void> {
  const root = new URL(base);
  await Promise.all((await storage.keys()).map(async (name) => {
    const cache = await storage.open(name);
    for (const request of await cache.keys()) {
      const url = new URL(request.url);
      if (url.origin !== root.origin || !url.pathname.startsWith(`${root.pathname}data/`)) continue;
      const filename = url.pathname.slice(`${root.pathname}data/`.length);
      if (!/^[a-z0-9-]+-coppermind\.json$/.test(filename)) continue;
      let current = false;
      try {
        const pack = await (await cache.match(request))?.json();
        current = pack?.knowledgeRevision === KNOWLEDGE_REVISION;
      } catch { /* Unreadable knowledge is stale as well. */ }
      if (!current) await cache.delete(request);
    }
  }));
}
