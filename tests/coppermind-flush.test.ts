import { describe, expect, it } from "vitest";
import { flushStaleCopperminds } from "../src/jiminy/flush-cache";
import { KNOWLEDGE_REVISION } from "../src/jiminy/types";

describe("Coppermind cache flush", () => {
  it("removes obsolete game memories across caches while preserving models, guides and other apps", async () => {
    const base = "https://example.com/kh-tools/";
    const old = new Map([
      [`${base}data/kh1fm-coppermind.json?__WB_REVISION__=old`, JSON.stringify({ thoughts: [{ text: "Old fact" }] })],
      [`${base}data/bbsfm-coppermind.json`, "invalid JSON"],
      [`${base}data/kh1fm.json`, "guide"],
      ["https://example.com/other-app/data/kh1fm-coppermind.json", "other app"],
      ["https://huggingface.co/model.onnx", "model"],
    ]);
    const current = new Map([[`${base}data/kh1fm-coppermind.json`, JSON.stringify({ knowledgeRevision: KNOWLEDGE_REVISION, thoughts: [] })]]);
    const maps = [old, current];
    const storage = {
      keys: async () => ["old-precache", "new-precache"],
      open: async (name: string) => {
        const map = maps[name === "old-precache" ? 0 : 1];
        return {
          keys: async () => [...map.keys()].map(url => new Request(url)),
          match: async (request: Request) => new Response(map.get(request.url)),
          delete: async (request: Request) => map.delete(request.url),
        };
      },
    } as unknown as CacheStorage;
    await flushStaleCopperminds(base, storage);
    expect([...old.keys()]).toEqual([
      `${base}data/kh1fm.json`, "https://example.com/other-app/data/kh1fm-coppermind.json", "https://huggingface.co/model.onnx",
    ]);
    expect(current.size).toBe(1);
  });
});
