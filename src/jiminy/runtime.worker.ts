/// <reference lib="webworker" />
import { env, pipeline } from "@huggingface/transformers";
import {
  EMBEDDING_MODEL,
  MODEL_ID,
  EMBEDDING_REVISION,
  MODEL_REVISION,
} from "./types";
import { STANDING_INSTRUCTIONS } from "./standing-instructions";
env.allowLocalModels = false;
env.useBrowserCache = true;
if (env.backends.onnx.wasm) {
  env.backends.onnx.wasm.numThreads = 1;
  // The owning document passes its deployment base; a hashed worker URL is not the app root.
}
// Pipelines have task-dependent overloaded call signatures; keep their boundary here.
let encoder: any, generator: any;
async function disposeModels() {
  const oldEncoder = encoder,
    oldGenerator = generator;
  encoder = undefined;
  generator = undefined;
  await Promise.allSettled([oldEncoder?.dispose(), oldGenerator?.dispose()]);
}
const networkFetch = self.fetch.bind(self);
async function cacheOnlyFetch(input: RequestInfo | URL): Promise<Response> {
  const response = await caches.match(input, { ignoreSearch: true });
  if (response) return response;
  throw new Error(
    "A required local assistant file is not cached. Download local models again.",
  );
}
async function load(localOnly: boolean, id: number) {
  // Transformers requires allowLocalModels when local_files_only is set. Its
  // fallback "local" path may still use HTTP, so guard fetch during cache restore.
  env.allowLocalModels = localOnly;
  self.fetch = localOnly ? cacheOnlyFetch : networkFetch;
  const options = { device: "wasm" as const, local_files_only: localOnly };
  const progress = (label: string) => (p: any) =>
    self.postMessage({
      id,
      progress: {
        phase: localOnly ? "loading" : "downloading",
        message: localOnly ? `Opening saved ${label}…` : `Preparing ${label}…`,
        percent: typeof p.progress === "number" ? p.progress : undefined,
      },
    });
  try {
    encoder = await pipeline("feature-extraction", EMBEDDING_MODEL, {
      ...options,
      dtype: "fp32",
      revision: EMBEDDING_REVISION,
      progress_callback: progress("search model"),
    });
    generator = await pipeline("text-generation", MODEL_ID, {
      ...options,
      dtype: "q8",
      revision: MODEL_REVISION,
      progress_callback: progress("answer model"),
    });
  } finally {
    self.fetch = networkFetch;
  }
}

let queue = Promise.resolve();
self.onmessage = ({ data }) => {
  queue = queue.then(() => handle(data));
};
async function handle(data: { id: number; action: string; payload: any }) {
  const { id, action, payload } = data;
  try {
    if (action === "setup" || action === "restore") {
      await disposeModels();
      if (env.backends.onnx.wasm)
        env.backends.onnx.wasm.wasmPaths = payload.wasmPath;
      if (action === "restore") await load(true, id);
      else {
        try {
          await load(true, id);
        } catch {
          await disposeModels();
          await load(false, id);
        }
      }
      // Dispose and reopen cache-only: an in-memory successful download is not offline readiness.
      self.postMessage({
        id,
        progress: {
          phase: "loading",
          message: "Verifying the downloaded model files…",
        },
      });
      await disposeModels();
      await load(true, id);
      self.postMessage({
        id,
        progress: {
          phase: "loading",
          message: "Verifying local search inference…",
        },
      });
      const probe = await encoder("journal", {
        pooling: "mean",
        normalize: true,
      });
      if (probe.data.length !== 384)
        throw new Error("Unexpected embedding dimensions.");
      self.postMessage({
        id,
        progress: {
          phase: "loading",
          message: "Verifying local answer inference…",
        },
      });
      await generator([{ role: "user", content: "Reply with OK." }], {
        max_new_tokens: 2,
        do_sample: false,
      });
      self.postMessage({ id, result: true });
    } else if (action === "embed") {
      if (!encoder) throw new Error("Download Data Jiminy first.");
      const result = await encoder(payload, {
        pooling: "mean",
        normalize: true,
      });
      self.postMessage({ id, result: Array.from(result.data) });
    } else if (action === "generate") {
      if (!generator) throw new Error("Download Data Jiminy first.");
      const result = await generator(
        [
          { role: "system", content: STANDING_INSTRUCTIONS },
          { role: "user", content: payload },
        ],
        { max_new_tokens: 100, do_sample: false, return_full_text: false },
      );
      const value = result[0]?.generated_text;
      self.postMessage({
        id,
        result:
          typeof value === "string" ? value : value?.at(-1)?.content || "",
      });
    }
  } catch (error) {
    if (action === "setup" || action === "restore") await disposeModels();
    self.postMessage({
      id,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
