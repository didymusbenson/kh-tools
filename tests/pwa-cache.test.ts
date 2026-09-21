import { describe, expect, it } from "vitest";
import { hasSavedJournal } from "../src/pwa-cache";

describe("saved journal readiness", () => {
  const base = "https://example.com/kh-tools/";
  const shell = '<script src="/kh-tools/assets/app-123.js"></script><link href="./assets/app-123.css">';
  function cache(missing?: string) {
    return async (url: string) => {
      if (url.endsWith(missing || "not-present")) return undefined;
      return new Response(url.endsWith("index.html") ? shell : "{}");
    };
  }
  it("recognizes a cached shell and guide under the Pages subpath", async () => {
    expect(await hasSavedJournal(base, cache())).toBe(true);
  });
  it.each(["index.html", "data/kh1fm.json", "assets/app-123.js", "assets/app-123.css"])(
    "does not claim readiness with missing %s", async (missing) => {
      expect(await hasSavedJournal(base, cache(missing))).toBe(false);
    },
  );
  it("rejects an unrelated cached document", async () => {
    expect(await hasSavedJournal(base, async () => new Response("Not a journal"))).toBe(false);
  });
});
