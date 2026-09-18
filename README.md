# Ars Arcanum

A mobile-first offline Kingdom Hearts completion journal. The first implementation covers modern **Kingdom Hearts Final Mix**: world collectibles, linked locations, synthesis and optional material inventory, equipment, challenges, and Data Jiminy.

## Run

Use Node 22+ and npm. CPU-only Linux environments can skip the optional ONNX CUDA download:

```sh
ONNXRUNTIME_NODE_INSTALL_CUDA=skip npm ci
npm run content:build
npm run dev
```

Open the printed address. Containers without network-interface discovery can use `npm run dev -- --host 127.0.0.1`.

```sh
npm test
npm run coppermind:check
npm run build
npm run preview
npm run test:e2e
```

The production build is `dist/`. Use HTTPS or localhost for service workers. Hash routes work on static hosts. For a fixed subdirectory, use `BASE_URL=/kh-tools/ npm run build`; the default relative base also supports static subdirectories. Executed validation and reusable patterns are documented under `ai_docs/implementation/`.

## GitHub Pages

Pages Source is set to **GitHub Actions**. The checked-in workflow validates and builds the app, then deploys automatically after a push or merge into `master`. It derives the deployment base path from Pages configuration and uploads only `dist/`. Implementation branches are validated without publishing. See [deployment setup and checks](ai_docs/implementation/github-pages.md).

## Player data and Data Jiminy

- Checklists, stock, plans and resume state save locally in IndexedDB. Export/import provides a backup; importing retains a recovery snapshot. No account or cloud sync is required.
- World totals count acquisition actions. Verified multi-reward events share one atomic check. Synthesis history is separate from current stock.
- Selected-output plans and first-craft catalog plans have distinct dependency semantics. Stock is allocated once; unknown stock is distinct from zero.
- Jiminy returns short sourced answers. Exact facts and calculations use application code. Semantic retrieval and answer selection use pinned local models in a worker; questions never go to an inference service.
- Conversations exist only in RAM. Reload/restart clears them, while player progress stays saved.
- Cached resources are verified before claiming offline readiness. Guide browsing works while models are unavailable. Model setup is separate from journal installation.

## Separate game Copperminds

The original [WintersRain Coppermind](https://github.com/WintersRain/coppermind) informed the content/tag/category/embedding approach. Each game owns **a separate ChromaDB instance and directory**, not merely a collection. See [Coppermind tooling](tools/coppermind/README.md).

After application wiring and canonical content validation:

```sh
python -m venv .venv-coppermind
.venv-coppermind/bin/pip install -r tools/coppermind/requirements.txt
npm run content:build
.venv-coppermind/bin/python tools/coppermind/seed.py \
  --input public/data/kh1fm.json \
  --output public/data/kh1fm-coppermind.json
npm run coppermind:package
npm run build
```

The seeded instance is also preserved in [artifacts/copperminds](artifacts/copperminds/README.md), with an export hash and category counts. The initial KH1FM seed has 4,300 thoughts covering 1,148 source-backed entries; the unresolved accessory-stat entry is excluded.

This creates `.copperminds/kh1fm/` and exports its actual documents, metadata and embeddings into the offline browser pack. The phone needs neither Python nor a Chroma server. Authored knowledge, player progress, model caches and temporary conversation context remain separate. Seed and browser query encoders use identical pinned weights and preprocessing.

## Content and further games

Canonical records live in `data/kh1fm/`; repeatable import/source ledgers live in `tools/content/`. The content build validates identities, relationships, provenance, quantities and optional media. Conflicting evidence remains explicit. Source-backed is not a claim of independent in-game testing.

The accepted design and per-game scope live in [ai_docs](ai_docs/README.md). KH1FM is the current implementation; other destinations remain clearly unavailable until implemented. Development order does not remove them from overall MVP scope. Production location screenshots remain deferred; optional attributed images/maps are supported and text works without them.

The original static entry page is preserved as `legacy-index.html`. Old tables remain migration inputs, not production truth.

### Credits

Special thanks to the following sources that helped me figure out what I was breaking: 

* (CSS Scroll Bars)[https://codepen.io/GhostRider/pen/GHaFw], (Ghost Rider)[https://codepen.io/GhostRider/]
* (Pure CSS Modals)[https://codepen.io/LFeh/pen/oEula], (Felipe Fialho)[https://codepen.io/LFeh/]
