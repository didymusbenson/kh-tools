# Game Copperminds and Data Jiminy

## Reference and provenance

Inspected `WintersRain/coppermind` commit `864a2ef57cd1f7a926a637221a68bef40d5f8bd2`, specifically `src/server.py` and README. That implementation stores content, category and comma-separated tags in Chroma with cosine retrieval. It creates `brain_{PROJECT}` collections under one database directory. KH Tools deliberately creates **a separate `chromadb.PersistentClient` directory for each game**. The browser consumes an export and never connects to a Chroma server.

The upstream README says MIT, but the inspected checkout contains no standalone LICENSE. Our tooling is an independent implementation of the documented approach; no upstream source is copied or vendored. Dependency licensing is separate: Chroma Apache-2.0, Transformers.js Apache-2.0, MiniLM Apache-2.0 and SmolLM2 Apache-2.0. Preserve model metadata/license when distributing weights.

## Repeatable preparation

Run only after the app wiring/content validation is complete, per the user's sequence requirement:

```sh
python -m venv .venv-coppermind
.venv-coppermind/bin/pip install -r tools/coppermind/requirements.txt
npm install
npm run content:build
.venv-coppermind/bin/python tools/coppermind/seed.py --input public/data/kh1fm.json --output public/data/kh1fm-coppermind.json
npm run coppermind:package
npm run coppermind:check
```

The database lives at `.copperminds/kh1fm/chroma.sqlite3`, with a report beside it. A future game's input produces `.copperminds/<game>/chroma.sqlite3`, never another collection in KH1FM's instance. Do not put runtime conversations, player checks, inventory or planning TODOs into these authored knowledge databases.

Stable IDs combine game + canonical entry ID + fact role + chunk index. Most thoughts contain one short fact; long source text splits on sentences at a 480-character target, without splitting words. Each repeats its entity/world/area so retrieval does not lose identity. Acquisition facts retain prerequisites. Exact tokenizer validation rejects any thought above MiniLM’s 256-token budget instead of silently truncating it. Metadata records game/edition, category, fact role, tags, provenance, verification, related IDs, content version and content hash. Recipe requirements are separately represented with exact quantities; arithmetic remains application code. Unresolved or unsourced entries are excluded. Re-seeding upserts stable IDs and deletes stale IDs, then exports the actual Chroma documents/metadata/vectors in stable order. The same unchanged input yields byte-identical exports.

Both document and query encoders use **the identical pinned Xenova/all-MiniLM-L6-v2 revision `751bff37182d3f1213fa05d7196b954e230abad9`, fp32 ONNX, mean pooling and L2 normalization, 384 dimensions** through Transformers.js. Do not silently substitute Chroma's default embedding function or a different quantization: vector compatibility is part of the content schema. The seed invokes `embed.mjs` locally; only model downloads require a network.

After seeding, run `npm run coppermind:check`. This Python-standard-library check needs no model download or Chroma installation. It verifies the committed pack's canonical content hash and version, exact source-backed thought IDs/text/metadata, pinned encoder settings, and finite normalized vectors. CI and the GitHub Pages workflow reject a missing or stale pack. Regenerate and commit `public/data/kh1fm-coppermind.json` whenever canonical guide content changes; the workflow does not create replacement embeddings or private databases. `python3 tests/coppermind_pack_test.py` exercises the verification failures without downloading models.

## Browser behavior

`src/jiminy/index.ts` owns one worker/model pair and in-memory per-game follow-up questions. No conversation is persisted. Exact recipe, location and progress requests work before model setup. Optional stock is read, never changed. Browser semantic retrieval validates the active game and content version; unsupported scope is blocked before retrieval. Changing journals invalidates in-flight results.

The worker downloads one shared SmolLM2 135M Instruct q8 model, pinned revision `b8a5c0f183b78c55955a5364f610c36668b5e681`, and the shared query encoder. It reopens both with `local_files_only` and probes actual inference before reporting readiness. The runtime WASM lives under the app's `ort/` path and must be included in the app's offline cache. Model files use Transformers.js's Cache API. Game packs are cached separately. Cache/storage failure is reported rather than claiming readiness. Journal checklists continue working independently.

The smallest model is deliberately constrained: it may select an exact evidence sentence, but unverified generated prose is never displayed. Otherwise the app shows the retrieved source thought. This preserves quantities/conditions and source IDs despite small-model hallucinations. Cosine similarity alone is not evidence; retrieval also requires lexical overlap and source-backed canonical entry membership. Prompts are not a security boundary. There are no model tools, web connectors or memory writes.

## Evaluation and reuse

```sh
npm test -- tests/coppermind.test.ts
.venv-coppermind/bin/python tests/coppermind_seed_test.py
node tools/coppermind/evaluate-model.mjs /tmp/jiminy-model-evaluation.json
```

Synthetic tests create temporary real Chroma databases, verify database isolation, stable export, chunk bounds and unresolved-data exclusion. Browser guardrail tests cover stale content, unrelated queries and arithmetic. The model evaluation uses actual downloaded weights; Node timing is not evidence of iPhone memory/latency or airplane-mode correctness. Verify Chrome and the user's iPhone 17 after deployment; inspect requests, cold reopen in airplane mode, eviction/retry, switching journals during inference and interrupted setup.

Repeatable patterns for additional games: normalize before embedding; retain canonical entry IDs everywhere; keep acquisition conditions attached to facts; pin preprocessing as well as weights; use per-game filesystem instances; separate durable knowledge from ephemeral conversation; compute exact numbers outside the SLM; fail closed on stale packs; preserve persistent player state when repairing model cache.

### Measured model selection

The 135M q4 candidate failed all three tiny evaluation cases with repetitive output; it is rejected. The same 135M q8 model produced the correct location verbatim, the correct quantity in unwanted prose, and an unsupported answer to a weather request (see `model-evaluation.json`). CPU response times were about 0.8–1.8 seconds across two runs in this container, not a device guarantee. Consequently q8 is used only behind deterministic intent/scope checks and a source-exact output validator. This model is **not approved for unrestricted factual prose**. Larger models must be evaluated with the same fixtures and actual mobile targets before substitution; size alone is not a correctness fix. Unknown inventory uses the shared planner's null semantics, aggregate plans use `calculatePlan`, and collectible totals use `collectibleProgress` acquisition groups rather than adding duplicate entry counts.

## Committed seed artifacts

`npm run coppermind:package` preserves the stopped database as `artifacts/copperminds/kh1fm.tar.gz` and compresses the exact browser export as `kh1fm-browser.json.gz`. A portable seed report records hashes and category counts. Canonical content builds restore the compressed pack byte-for-byte to `public/data/kh1fm-coppermind.json`; production builds and CI reject stale or altered packs. Re-seeding does not update committed artifacts until packaging succeeds.

Research provenance is retained internally and in developer documentation. Player-facing Jiminy citations point to canonical in-app entries, not external research websites, per the user's implementation clarification.


## Real browser acceptance and runtime lessons

Desktop Chromium 153 passed the real-model test against the production `/kh-tools/` subpath. The heavyweight flow took 41.9 seconds in this container, covering initial pinned model delivery, actual WASM inference probes, cache-only reopening, a networking-disabled cold page reload, exact recipe lookup, and a semantic “What does Lucky Strike do?” request requiring real query embedding/retrieval/SLM generation and an internal canonical citation. No additional model resources were requested after networking was disabled. Conversation history was empty after reload. The complete two-test file passed in 44.3 seconds.

Model bytes were the actual pinned files already downloaded from Hugging Face, delivered through a local HTTP streaming fixture to avoid test-environment CDN variability. This is genuine browser WASM inference and cache behavior, **not a live-CDN or physical iPhone certification**. Initial live-browser CDN connectivity and iPhone 17 memory/latency/keyboard behavior still require device acceptance.

Repeat the explicit heavyweight test with models present in `.model-cache`:

```sh
BASE_URL=/kh-tools/ npm run build
ARS_TEST_MODELS=1 ARS_TEST_BASE_PATH=/kh-tools/ npm run test:e2e -- tests/e2e/jiminy.spec.ts --project=desktop-chromium --workers=1
```

Concrete fixes found during acceptance:

- Transformers.js rejects `local_files_only: true` while `env.allowLocalModels` is false. Enable local lookup for cache restoration, and guard the worker’s fetch with Cache API reads during that phase. Missing files fail closed instead of turning the library’s “local” HTTP fallback into an unexpected request.
- Dispose partial/replaced pipelines before retrying; keep one shared model pair. Verify cached files **and actual search/answer inference** before reporting ready.
- Bind setup and restore readiness to the originating game/generation; old game work cannot mark a new journal ready. Retain uncertainty and prerequisites even when the model selects a shorter source sentence.
- Browser automation should stream large ONNX resources over HTTP. Fulfilling 86–140 MB binary bodies through DevTools and recording those weights in traces can crash the test browser. The heavyweight fixture uses HTTP redirects/streaming and disables trace capture of model blobs; no fake models or generated vectors are used.
- Tests should fail immediately on the UI’s explicit error state rather than waiting minutes for a ready label that can no longer appear. Stage-specific progress distinguishes file caching, search inference and answer inference.
