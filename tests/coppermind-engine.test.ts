import { afterEach, describe, it, expect, vi } from "vitest";
import { JiminyEngine } from "../src/jiminy";
import { EMBEDDING_MODEL, EMBEDDING_REVISION } from "../src/jiminy/types";
import type { GameData } from "../src/domain/types";
const data = { game: "kh1fm", version: "fixture" } as GameData;
const pack = {
  schemaVersion: 1,
  game: "kh1fm",
  contentVersion: "fixture",
  embedding: {
    model: EMBEDDING_MODEL,
    revision: EMBEDDING_REVISION,
    dimensions: 384,
    dtype: "fp32",
    pooling: "mean",
    normalize: true,
  },
  thoughts: [],
};
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});
describe("cached Jiminy restore", () => {
  it("restores without fetching and passes a deployment-aware WASM path", async () => {
    const sent: any[] = [];
    class Worker {
      onmessage: any;
      postMessage(data: any) {
        sent.push(data);
        queueMicrotask(() =>
          this.onmessage({ data: { id: data.id, result: true } }),
        );
      }
    }
    vi.stubGlobal("Worker", Worker);
    vi.stubGlobal("document", { baseURI: "https://example.com/kh-tools/" });
    vi.stubEnv("BASE_URL", "./");
    vi.stubGlobal("caches", {
      match: async () => new Response(JSON.stringify(pack)),
    });
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const engine = new JiminyEngine();
    engine.activateGame("kh1fm");
    await engine.restore(data);
    expect(engine.status().phase).toBe("ready");
    expect(fetch).not.toHaveBeenCalled();
    expect(sent[0].action).toBe("restore");
    expect(sent[0].payload.wasmPath).toBe("https://example.com/kh-tools/ort/");
  });
  it("does not open models for a mismatched pack", async () => {
    const worker = vi.fn();
    vi.stubGlobal("Worker", worker);
    vi.stubGlobal("caches", {
      match: async () =>
        new Response(JSON.stringify({ ...pack, contentVersion: "old" })),
    });
    const engine = new JiminyEngine();
    engine.activateGame("kh1fm");
    await engine.restore(data);
    expect(engine.status().phase).toBe("idle");
    expect(worker).not.toHaveBeenCalled();
  });
});
