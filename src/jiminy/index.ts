import type { GameData, PlayerState } from "../domain/types";
import {
  EMBEDDING_MODEL,
  EMBEDDING_REVISION,
  type CoppermindPack,
  type JiminyAnswer,
  type JiminyProgress,
} from "./types";
import {
  citation,
  exactAnswer,
  rankThoughts,
  scopedQuestion,
} from "./retrieval";
export { AI_DISCLAIMER, MODEL_NAME } from "./types";
export type { JiminyAnswer, JiminyProgress } from "./types";
const matchingEmbedding = (pack: CoppermindPack) =>
  pack.schemaVersion === 1 &&
  pack.embedding?.model === EMBEDDING_MODEL &&
  pack.embedding.revision === EMBEDDING_REVISION &&
  pack.embedding.dimensions === 384 &&
  pack.embedding.dtype === "fp32" &&
  pack.embedding.pooling === "mean" &&
  pack.embedding.normalize === true;
const MISSING: JiminyAnswer = {
  text: "No matching information in this journal.",
  citations: [],
  mode: "missing",
};
export class JiminyEngine {
  private worker?: Worker;
  private sequence = 0;
  private generation = 0;
  private activation = 0;
  private active: string | null = null;
  private pack?: CoppermindPack;
  private lastQuestions = new Map<string, string>();
  private progress: JiminyProgress = {
    phase: "idle",
    message:
      "Download Data Jiminy for local semantic answers. Journal lookups already work offline.",
  };
  private pending = new Map<
    number,
    {
      resolve: (value: any) => void;
      reject: (error: Error) => void;
      progress?: (p: JiminyProgress) => void;
    }
  >();
  private setupPromise?: Promise<void>;
  private listeners = new Set<(p: JiminyProgress) => void>();
  subscribe(listener: (p: JiminyProgress) => void) {
    this.listeners.add(listener);
    listener(this.status());
    return () => { this.listeners.delete(listener); };
  }
  private reportProgress(p: JiminyProgress) {
    this.progress = p;
    for (const listener of this.listeners) listener(this.status());
  }
  status() {
    return { ...this.progress };
  }
  activateGame(game: string | null) {
    if (this.active !== game) {
      this.active = game;
      this.generation++;
      this.activation++;
      this.pack = undefined;
      this.reportProgress({
        phase: "idle",
        message:
          "Open the assistant to restore this journal’s local files, or download them once.",
      });
    }
  }
  clearSession() {
    this.lastQuestions.clear();
    this.generation++;
  }
  private rpc(
    action: string,
    payload?: unknown,
    onProgress?: (p: JiminyProgress) => void,
  ): Promise<any> {
    if (!this.worker) {
      this.worker = new Worker(
        new URL("./runtime.worker.ts", import.meta.url),
        { type: "module" },
      );
      this.worker.onmessage = ({ data }) => {
        const p = this.pending.get(data.id);
        if (!p) return;
        if (data.progress) {
          p.progress?.(data.progress);
          return;
        }
        this.pending.delete(data.id);
        data.error ? p.reject(new Error(data.error)) : p.resolve(data.result);
      };
      this.worker.onerror = () => {
        for (const p of this.pending.values())
          p.reject(
            new Error(
              "Local model runtime could not start. Your journal and saved progress remain available.",
            ),
          );
        this.pending.clear();
        this.worker?.terminate();
        this.worker = undefined;
      };
    }
    return new Promise((resolve, reject) => {
      const id = ++this.sequence;
      this.pending.set(id, { resolve, reject, progress: onProgress });
      this.worker!.postMessage({ id, action, payload });
    });
  }
  async restore(
    data: GameData,
    onProgress?: (p: JiminyProgress) => void,
  ): Promise<void> {
    if (this.active !== data.game) return;
    const origin = this.activation;
    // A previous panel may still own the shared worker's setup. Wait for it,
    // then restore for this activation instead of leaving the new panel idle.
    while (this.setupPromise) await this.setupPromise.catch(() => undefined);
    if (origin !== this.activation) return;
    if (this.progress.phase === "ready") {
      onProgress?.(this.status());
      return;
    }
    const report = (p: JiminyProgress) => {
      if (origin !== this.activation) return;
      this.reportProgress(p);
      onProgress?.(p);
    };
    this.setupPromise = (async () => {
      try {
        const url = `${import.meta.env.BASE_URL}data/${data.game}-coppermind.json`;
        const response = await caches.match(url, { ignoreSearch: true });
        if (!response) return;
        const pack = (await response.json()) as CoppermindPack;
        if (
          pack.game !== data.game ||
          pack.contentVersion !== data.version ||
          !matchingEmbedding(pack)
        )
          return;
        report({
          phase: "loading",
          message: "Reopening the saved local assistant…",
        });
        await this.rpc("restore", {
          wasmPath: new URL(`${import.meta.env.BASE_URL}ort/`, document.baseURI)
            .href,
        });
        if (origin !== this.activation) return;
        this.pack = pack;
        report({
          phase: "ready",
          message:
            "Local models and this journal reopened from the offline cache.",
        });
      } catch {
        report({
          phase: "idle",
          message:
            "The complete local assistant is not cached. Download it once to enable semantic answers.",
        });
      } finally {
        this.setupPromise = undefined;
      }
    })();
    return this.setupPromise;
  }
  async setup(onProgress?: (p: JiminyProgress) => void): Promise<void> {
    if (!this.active)
      throw new Error("Open a game journal before preparing Data Jiminy.");
    const setupGame = this.active,
      setupGeneration = this.activation;
    while (this.setupPromise) await this.setupPromise.catch(() => undefined);
    if (setupGeneration !== this.activation) return;
    if (this.progress.phase === "ready") {
      onProgress?.(this.status());
      return;
    }
    const report = (p: JiminyProgress) => {
      if (setupGeneration !== this.activation) return;
      this.reportProgress(p);
      onProgress?.(p);
    };
    this.setupPromise = (async () => {
      report({
        phase: "loading",
        message:
          "Preparing local models. The first download can take several minutes.",
      });
      try {
        await this.rpc(
          "setup",
          {
            wasmPath: new URL(
              `${import.meta.env.BASE_URL}ort/`,
              document.baseURI,
            ).href,
          },
          report,
        );
        if (setupGame) {
          const url = `${import.meta.env.BASE_URL}data/${setupGame}-coppermind.json`;
          const response = await fetch(url).catch(
            async () => await caches.match(url),
          );
          if (!response)
            throw new Error(
              "The game pack is not cached. Connect once to download it.",
            );
          if (!response.ok)
            throw new Error("The game Coppermind pack is unavailable.");
          const pack = (await response.json()) as CoppermindPack;
          if (pack.game !== setupGame || !matchingEmbedding(pack))
            throw new Error(
              "The downloaded Coppermind does not match this journal.",
            );
          const journalResponse = await fetch(
            `${import.meta.env.BASE_URL}data/${setupGame}.json`,
          ).catch(
            async () =>
              await caches.match(
                `${import.meta.env.BASE_URL}data/${setupGame}.json`,
              ),
          );
          if (!journalResponse?.ok)
            throw new Error("The journal data is not available offline.");
          const journal = (await journalResponse.json()) as GameData;
          if (pack.contentVersion !== journal.version)
            throw new Error(
              "The Coppermind pack needs an update for this journal.",
            );
          if (setupGeneration === this.activation) this.pack = pack;
          const cache = await caches.open("ars-arcanum-copperminds-v1");
          await cache.put(
            `${import.meta.env.BASE_URL}data/${setupGame}-coppermind.json`,
            new Response(JSON.stringify(pack), {
              headers: { "Content-Type": "application/json" },
            }),
          );
        }
        await navigator.storage?.persist?.();
        if (setupGeneration !== this.activation || setupGame !== this.active)
          return;
        report({
          phase: "ready",
          message:
            "Local models verified from the offline cache. Ready on this device.",
        });
      } catch (error) {
        report({
          phase: "error",
          message: error instanceof Error ? error.message : String(error),
        });
        throw error;
      } finally {
        this.setupPromise = undefined;
      }
    })();
    return this.setupPromise;
  }
  async ask(
    question: string,
    data: GameData,
    player?: PlayerState,
  ): Promise<JiminyAnswer> {
    if (this.active !== data.game)
      throw new Error("Open this game journal before asking Data Jiminy.");
    if (question.length > 1000)
      return {
        text: "Please shorten the question to 1,000 characters.",
        citations: [],
        mode: "missing",
      };
    const scope = scopedQuestion(question);
    if (scope) return scope;
    const previous = this.lastQuestions.get(data.game);
    const query =
      /\b(it|that|those|there)\b/i.test(question) && previous
        ? question.replace(/\b(it|that|those|there)\b/gi, previous)
        : question;
    const exact = exactAnswer(query, data, player);
    if (exact) {
      this.lastQuestions.set(data.game, exact.citations[0]?.name || question);
      return exact;
    }
    if (this.progress.phase !== "ready")
      return {
        text: "Download Data Jiminy to search this guide by meaning. You can still ask for an exact item name, recipe or checklist progress.",
        citations: [],
        mode: "missing",
      };
    const origin = this.generation;
    if (!this.pack) {
      const url = `${import.meta.env.BASE_URL}data/${data.game}-coppermind.json`;
      const response = await fetch(url).catch(
        async () => await caches.match(url),
      );
      if (!response)
        throw new Error(
          "The game Coppermind pack is not cached. Connect once to download it.",
        );
      if (!response.ok)
        throw new Error("The game Coppermind pack is unavailable.");
      const loaded = (await response.json()) as CoppermindPack;
      if (origin !== this.generation)
        throw new Error(
          "The active journal changed; the old answer was discarded.",
        );
      this.pack = loaded;
    }
    const pack = this.pack;
    if (!matchingEmbedding(pack))
      throw new Error("The guide embedding model does not match this runtime.");
    const vector = (await this.rpc("embed", query)) as number[];
    const thoughts = rankThoughts(query, vector, pack, data);
    if (origin !== this.generation)
      throw new Error(
        "The active journal changed; the old answer was discarded.",
      );
    if (!thoughts.length) return MISSING;
    const evidence = thoughts.map((t) => t.text);
    // The SLM selects evidence sentences; all displayed words must be source-exact.
    // This makes tiny-model hallucinations fail closed instead of adding game facts.
    const generated = (
      (await this.rpc(
        "generate",
        `Question: ${query}\nEvidence:\n${evidence.map((t, i) => `[${i + 1}] ${t}`).join("\n")}\nReturn only the most relevant complete evidence sentence, copied exactly.`,
      )) as string
    ).trim();
    if (origin !== this.generation)
      throw new Error(
        "The active journal changed; the old answer was discarded.",
      );
    const grounded =
      generated.length > 12 &&
      evidence.some((t) => t.includes(generated)) &&
      !/https?:|\[\d+\]/.test(generated);
    let text = grounded ? generated : thoughts[0].text;
    const sourceThoughts = grounded
      ? thoughts.filter((t) => t.text.includes(generated))
      : [thoughts[0]];
    const ids = new Set(sourceThoughts.map((t) => t.metadata.entryId));
    const citedEntries = data.entries.filter((e) => ids.has(e.id));
    const citations = citedEntries.map(citation);
    for (const entry of citedEntries) {
      if (entry.prerequisites && !text.includes(entry.prerequisites))
        text += ` Conditions: ${entry.prerequisites}`;
      if (entry.uncertainty && !text.includes(entry.uncertainty))
        text += ` Qualification: ${entry.uncertainty}`;
    }
    this.lastQuestions.set(data.game, citations[0]?.name || question);
    return { text, citations, mode: grounded ? "model" : "retrieval" };
  }
}
export const jiminy = new JiminyEngine();
