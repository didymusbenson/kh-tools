# KH1FM implementation verification

## Delivered scope

React offline journal with the accepted green/cream/burgundy presentation and purple contents, original anchored game menu and moving artwork, responsive collection/detail/search views, separate challenge goals, exact synthesis planning, optional inventory, persistent checks, recovery/import/export/undo and an in-memory-only Data Jiminy conversation. Other game destinations remain visible but unavailable until their implementations are delivered.

Canonical content: **1,149 entries, 33 recipes and 23 coverage groups**. The collection import has 471 records and 430 distinct acquisition actions across 13 worlds, with all 535 candidate source rows classified. Reference content includes complete Sora level/EXP tables, equipment, abilities, acquisition-relevant enemies, cups, Gummi missions/blueprints and Steam goals. Detailed coverage, source reconciliation and narrow uncertainties are in the collection/reference reports and canonical data.

After all application wiring and content freeze, the dedicated KH1FM Chroma instance was seeded with **4,300 thoughts covering 1,148 source-backed entries**. The unresolved Three Stars accessory-stat entry is excluded; its recipe is separately resolved. Pinned encoder/tokenizer validation found no thought above 256 tokens. The archived real database, compressed browser export and hash report are in `artifacts/copperminds/`. Source IDs, categories, tags, prerequisites, qualifications and provenance stay attached to knowledge records. No conversation or player state is stored in Chroma.

Player-facing references link to canonical in-app entries. External research citations remain in maintenance documentation and internal provenance, per the user's final clarification.

## Executed checks

| Check | Result |
| --- | --- |
| Canonical build | 1,149 entries and all recipe/related-entry links validated |
| Application unit tests | 36 passing: domain planning/persistence, source contracts, assistant guardrails and cache restoration |
| Python pack verifier tests | 6 passing: stale/hash/game/model/content/vector rejection |
| Python Chroma seed tests | 2 passing with real temporary separate databases |
| Real KH1FM pack gate | 4,300 canonical thought IDs/text/metadata and normalized 384-dimensional vectors match current content |
| Production build | TypeScript and Vite/PWA pass, including `/kh-tools/` deployment base |
| Functional/media/UX browser suite | 20 passing across desktop and phone Chromium; heavy model tests explicitly separate |
| Real browser model acceptance | 2 passing in 44.3 seconds; heavyweight case 41.9 seconds |

The real-model browser check streamed the actual pinned MiniLM and q8 SmolLM2 weights from a local HTTP fixture, replacing only model delivery. It exercised real WASM model loading and both inference probes, then disabled networking and cold-reloaded the app. Cache-only restore succeeded. An exact recipe answer and a semantic Lucky Strike query with a canonical in-app citation both succeeded offline, with no extra model-file requests. This is actual browser inference, not mocked model output. It is not a live Hugging Face CDN test or an iPhone latency benchmark.

## Final corrective review

The independent UX reviewer corrected launcher overlap, reading contrast, small touch controls, original cover artwork, responsive scroll ownership, optional media captions/zoom/focus and disclaimer copy. Root reviewed the results and fixed further integration issues: inactive service-worker caches despite registration; valid resume-route persistence and a cover resume link; unconditional success announcements after rolled-back writes; all-uncrafted planning mode and explicit quantity handling; uncertainty retained in generated answers; stale game setup readiness; deployment-aware worker asset paths; and player-facing research citation/audit-field leakage.

The full model check discovered a genuine Transformers.js configuration contradiction: cache-only loading cannot use `allowLocalModels:false`. The worker now enables the required local mode while enforcing cache-only fetches, then verifies actual inference before readiness. Large model test fixtures stream over HTTP rather than injecting entire binaries through DevTools, which had crashed the initial harness.

## Deployment and acceptance boundaries

GitHub Pages Source was switched to GitHub Actions by the user. The checked-in Pages workflow validates, builds and publishes `dist/` after pushes/merges into `master`, with the base path from Pages configuration. Implementation branches run CI without publishing. Adding this workflow does not itself merge the implementation or certify a live deployment; the release PR and Actions run supply that evidence.

Initial targets are desktop Chrome and iPhone 17. Desktop Chromium and phone-size Chromium emulation were exercised; physical iPhone 17 Safari/Chrome, soft keyboard, VoiceOver, storage eviction and mobile model-memory behavior remain unverified. No in-game playthrough is claimed. Sources still disagree on Three Stars' Defense statistic and Unknown's earliest portal flag; a guaranteed practical Unknown route is supplied. Some restricted-run/minigame edge behavior is explicitly qualified rather than invented. Production location images are deferred; optional media behavior is tested with synthetic fixtures.

Reusable helpers and lessons are documented in `lessons-for-other-games.md`. Preserve these acceptance boundaries when extending to another game.
