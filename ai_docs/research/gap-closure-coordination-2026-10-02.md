# Seven-game gap closure coordination — October 2, 2026 UTC

User authorization: research the remaining facts, document evidence, update canonical data and the app, push checkpoints, and merge each game's completed work to `master`. Each game has a dedicated agent at medium reasoning and a separate branch/worktree. All seven agents completed their scoped research passes, with at most three workers running concurrently. The coordinator serializes integration to avoid concurrent writes to `master`.

Baseline: `c5ea2de`. All 208 original findings are accounted for: 103 closed, 75 partial, 16 unresolved/conflicted, and 14 other limitations. These are issue families, not individual facts. The current game's ledger controls its exact remaining questions. A published checkpoint or passing test does not imply research completion.

| Game | Branch | Starting partial / unresolved | Execution |
|---|---|---:|---|
| KH1 FM | `research/finish-kh1fm-gaps-2026-10-01` | 6 / 4 | Integrated; 1 new closure, exact residuals remain |
| BBS FM | `research/finish-bbsfm-gaps-2026-10-01` | 17 / 4 | Integrated; exact factual residuals remain |
| DDD HD | `research/finish-dddhd-gaps-2026-10-01` | 17 / 1 | Integrated; exact factual residuals remain |
| Re:CoM | `research/finish-recom-gaps-2026-10-01` | 11 / 3 | Integrated; exact factual residuals remain |
| KH2 FM | `research/finish-kh2fm-gaps-2026-10-01` | 3 / 0 | Integrated; exact factual residuals remain |
| KH0.2 | `research/finish-kh02-gaps-2026-10-01` | 7 / 1 | Integrated; 1 new closure, exact residuals remain |
| KH3 / Re Mind | `research/finish-kh3-gaps-2026-10-01` | 14 / 3 | Integrated; 1 new closure, exact residuals remain |

## Recovery and integration contract

- Each worker owns its game-specific sources, generators, runtime data, evidence ledger and game documentation. Shared research summaries and cross-game integration belong to the coordinator.
- Each worker records the exact starting findings, consulted sources, supported changes, honest residuals and checks in `ai_docs/games/<game>/gap-closure-2026-10-02.md` and updates its existing current ledgers.
- Workers commit and push meaningful checkpoints throughout the work, including incomplete work. The remote commit is verified before reporting the checkpoint as backed up.
- Source conflicts are resolved with relevant evidence, not majority vote, edition mixing, or duplicated guide claims. Technical sources that change game behavior cannot prove vanilla behavior. Missing evidence stays explicit.
- Stable progress IDs remain intact. Data Jiminy remains empty. No new user playthrough requirement is introduced.
- The coordinator reviews each pushed branch, runs relevant validation, merges one game at a time, updates shared status and pushes/verifies `master`. Workers do not compete to merge into the same checkout.
- Tests validate implementation and content invariants. They do not prove all researched facts are correct. Remaining factual limitations are reported separately from integration success.

## Integration results

- DDD HD branch endpoint `19f56474ddf2f3b1d5afb0fed5b3c9904a14bb05`: 11 HD chest-access routes, character-specific Sweet Dreams guidance, explicitly reported Tubguin interaction and the complete available Flick Rush scoring/prize tables with 19 level milestones. All 18 starting residuals were investigated. Current totals remain 7 closed, 17 partial and 1 unresolved; no whole-family closure is claimed. See the [DDD pass report](../games/dddhd/gap-closure-2026-10-02.md). Focused data validation and integration identity/source/recipe/ledger accounting passed; all 133 application tests and the full production build passed before this merge was published.

- BBS FM branch endpoint `6dba616c25830e7126804a0cccd48f08c301dd33`: normalized 108 shop records, 95 prior-acquisition alternatives, 288 Command Board opponent rows, 22 D-Link action summaries, independent recipe corroboration and Arena clarification. All 21 starting residuals investigated; totals remain 12 closed, 17 partial, 4 unresolved and 5 other limitations. [BBS pass report](../games/bbsfm/gap-closure-2026-10-02.md). All 135 application tests, full production build and cross-game identity/source/recipe/ledger checks passed before publication.

- KH1 FM branch endpoint `3003c200b11b6084698fc6d58e5231ecd185f65a`: closed KH1-004 using directly inspected Steam-linked footage (Pooh's Swing HUD uses metres); canonical target is 40 m. Also completed 642 queued legacy comparison cells as 787 scoped clause decisions. Current totals: 11 closed, 6 partial, 3 unresolved. [KH1 pass report](../games/kh1fm/gap-closure-2026-10-02.md). Empty Jiminy browser/archive metadata was refreshed while retaining zero records and original empty SQLite bytes. All 135 application tests, the full production build, 7 pack-verification tests and cross-game identity/source/recipe/ledger checks passed before publication.

- KH0.2 branch endpoint `1253db49f9547d68b6c68d8d7ba159d735153e9e`: closed KH02-016 with all 15 directly inspected Steam achievement key associations; the coordinator propagated every key and its source into runtime metadata while preserving progress IDs. Improved collection guidance and investigated all eight residual findings. Current totals: 11 closed, 6 partial, 1 unresolved. [KH0.2 pass report](../games/kh02/gap-closure-2026-10-02.md). All 135 application tests, full production build, KH0.2 audit and cross-game identity/source/recipe/ledger checks passed.

- Re:CoM branch endpoint `dae1ec89a3e1eccbb858e8b2abccca43f392e152`: scoped retry guidance on all 30 Sora enemy-card farms, three optional detailed RNG routes, three-card priority on two-card recipes, Days reading/unlock guidance on all 13 bonus rewards, and additional Riku encounter/report directions. All 14 residual findings investigated; totals remain 15 closed, 11 partial, 3 unresolved and 3 other limitations. [Re:CoM pass report](../games/recom/gap-closure-2026-10-02.md). All 136 application tests, full production build and cross-game identity/source/recipe/ledger checks passed.

- KH2 FM branch endpoint `9e972ccd7f5f4fef81faa7aed5e9bc4120291c9d`: actual HD gameplay resolves the Daylight 27 roof/pillar locator; all 14 numbered Mushroom scripts inventoried with hashes/callsites, supported HP floors and XII warp Thunder behavior integrated. Investigated original shop-data candidates without inventing vanilla predicates. Totals remain 31 closed, 3 partial and 6 other limitations. [KH2 pass report](../games/kh2fm/gap-closure-2026-10-02.md). All 136 application tests, full production build and cross-game integration checks passed. Seven pack and two seed tests also passed (seed tests use the pinned Chroma dependency in an isolated environment).

- KH3 / Re Mind branch endpoint `6d7e3faf91d9dbca1aab2fef65ca989cfde0f737`: all 59 ingredient pages reviewed and 172 route groups integrated, 28 obtainable medal variants added, nine sphere routes completed, 151 acquisition associations across 104 equipment records, 12 sphere/material quantity links and copy-recovery corrections. Full published 99-level combined Main + Teeny budget table retained with its edition/unit caveats. KH3-024 newly closed; totals 19 closed, 13 partial, 3 conflicted. [KH3 pass report](../games/kh3/gap-closure-2026-10-02.md). All 139 application tests and the full production build passed.

## Current factual totals

After all seven game integrations: **106 closed, 73 partial, 15 unresolved/conflicted, 14 other limitations**. Every one of the 91 starting partial/unresolved findings received a research pass. Three whole families newly closed (KH1-004, KH02-016, KH3-024); many other subclauses improved while their families remain partial. This completes the assigned seven-agent investigation and integration pass, not every remaining factual gap.

## Verified starting state and published worker checkpoints

The coordinator ran the baseline locally after pulling `c5ea2de`: all 133 tests in 14 files passed, and the complete production build passed, including content and empty Jiminy pack validation. The existing bundle-size advisory remains. The main checkout was clean after generation.

Initial scope checkpoints are published on the game branches: KH1 `1dfa184`, BBS `252be0f`, DDD `0ef9f3d`. These record assignments and recovery scope; they are not claims of completed research.

## Browser validation limitation

The full DDD-branch [GitHub browser run](https://github.com/didymusbenson/kh-tools/actions/runs/36958854601) reported 61 passing, 51 failing and 2 skipped browser scenarios. Many failures address older KH1/KH2 layouts; the DDD research diff changes no journal components, styles or browser tests. The coordinator reproduced two representative failures against untouched baseline `c5ea2de` in a detached checkout: `navigation.spec.ts:19` expects the old `#row-...` list, and `navigation.spec.ts:37` expects `#/kh1fm/contents` to redirect to `worlds`. Both fail there for the same selector/URL reasons. This demonstrates those two failures predate the new research; it does not certify every failure as pre-existing. Unit tests, focused content validation and production build success are reported separately. The complete browser suite is not claimed green, and its failures have not been hidden by changing or disabling tests.

## Focused browser checks after five merges

At integrated `1bb9ed6`, `research-expansion.spec.ts` and `bbs-ux.spec.ts` produced 16 passes and two failures across desktop/mobile. Both failures are the KH3 Gummi checkbox immediate-reload scenario; the desktop failure was also reproduced against untouched `c5ea2de`. Selected Re:CoM reward-link, acquisition-note and paged-content scenarios passed 6/6 across desktop/mobile. Thus this selected run has 22 passes and two failures; it is not a full-browser green result. Browser tests have not been altered or disabled.

The repeatable integration checker is `python3 tools/content/verify-gap-integration.py`. It reads the published baseline from Git and checks all seven catalogs for removed/duplicate identities, missing sources, broken recipe links and missing/duplicate audit findings. It does not independently prove the facts.

## Final integration validation

- All 139 application tests in 14 files pass; production build passes with the existing bundle-size advisory.
- Seven pack tests and two seed tests pass. Empty Jiminy validation confirms zero thoughts/records.
- DDD and KH0.2 content audits pass. The repeatable cross-game checker passes; its [machine-readable result](gap-closure-validation-2026-10-02.json) accounts for all 208 findings and preserves all prior entry/recipe IDs and source/recipe references. KH3 adds 28 entries.
- After the final KH3 integration, desktop/mobile KH3 collection persistence and layout checks pass 2/2. Together with the earlier selected run, 24 selected scenarios passed and two immediate-reload scenarios failed; the separately documented full browser suite is not green.
- Each worker branch and the serialized merges are published to GitHub. Active game ledgers and linked per-game reports retain the exact unresolved questions and evidence boundaries.
