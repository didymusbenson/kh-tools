# DDD HD faithful Reports journal

**2026-10-03 · Functional implementation and validation record**  
Branch: `research/ddd-journal-interface-2026-10-03`  
Factual base: final published research checkpoint `2cfc0ff` (1,285 entries / 263 formulas).

[Native research](../ui/dddhd-journal-design-research.md) · [UI plan](../ui/dddhd-new-ui-plan.md) · [Original references](../ui/references/dddhd/README.md) · [Visual evidence](../../artifacts/ddd-ui/)

## Implemented composition

DDD now has its own functional `DddJournal` renderer, loaded through the existing `GuideJournal` profile/state owner. It replaces the generic sidebar interface for DDD only. A new profile opens Reports; old saved world/category/workshop routes remain supported.

The renderer recreates the native Reports structure: charcoal/silver framing, a black cover with adjacent artwork/menu panels, outside-left metallic rings, magenta beveled hierarchy plaques, a broad single pale reading leaf, corner ornaments/crown watermark, hand-selection gutter, gray contextual footer, technical shell type and handwritten reading type. Top-level interiors use one section plaque; nested destinations use two.

The cover's working destinations are Worlds & Treasures, Dream Eaters, Game Records, Spirit Creation, Collection, Mechanics, Trophy Shelf and Completion. These are useful companion destinations in native-style composition. They do not purport to add the game's Story, Glossary or Character Files content. Collection keeps all fourteen existing guide categories reachable, with Browse by World and Spirit Creation shortcuts.

- Worlds connect to scoped catalogues; treasures retain separate Sora/Riku identities.
- Dream Eaters presents the actual 54 shared Spirit records and creation links. There is no fabricated Nightmare encounter collection or simulated native unread state.
- Game Records groups existing Links, Dives, challenges and Link Portals, with the real Reality Shift reference.
- Spirit Creation retains every formula, ingredient navigation, owned/required counts, additive farming targets and historical creation checks that never spend inventory.
- Completion uses native-style circular icon / magenta label / silver capsule / gold value lanes, with real app check counts. It excludes noncheckable reference-note totals, Play Time and invented official completion percentages.
- Search, category/world/character/status filtering, backups, import recovery and storage feedback remain functional.
- In-game trophies and Steam achievements remain separate catalogue concepts. No Data Jiminy knowledge was seeded or restored.

## Interaction constraints carried forward

The frame and book bounds remain fixed across destinations. Lists measure available capacity and keep compact top-aligned rows; long reading content uses numbered continuation pages. Entry navigation is distinct from note-page navigation. Browser history, filtered-return position and keyboard focus are preserved.

Phones reflow to a readable single leaf. Normal-height phones reserve two utility rows so primary controls have 44px hit areas; very short and zoom-equivalent layouts use more compact controls to retain usable reading space. Compact portrait and landscape layouts reduce redundant chrome while preserving usable list/reading space. Material stock/target controls are inside the paginated reading flow when necessary rather than reducing the text window to zero. Original Reports stills show a native scrollbar; numbered continuation pages are the established app adaptation.

Focus/selection, manual acquired checks and native unread/completion semantics are not conflated. Checking a record changes the same canonical profile state across views and tabs. Filters leave the scoped total unchanged. Unknown stock is distinct from zero; changing a material must not carry another material's draft quantity into it.

## Direct source comparison and refinements

At 1920 × 1080, the initial measured app book was x=220.8, y=146, width=1478.4, height=795; the source book is approximately x=220–1704, y=147–944. The composition therefore tracks the native stage rather than imposing a centered two-leaf journal from another game.

Direct inspection led to these corrections before final validation:

- Removed conspicuous diagonal hatching in favor of a smooth charcoal cover and quiet paper texture
- Increased large-screen type and strengthened the Reports masthead
- Added the default selection glove without changing row dimensions
- Recreated the distinctive Completion capsule family instead of presenting it as another generic list
- Corrected top-level plaques to one section plaque; reserved double plaques for nested hierarchy
- Preserved practical factual qualifications while removing inline citation URLs and extraction bookkeeping from reading prose
- Fixed short landscape reading windows and compact index overlap
- Keyed stock/target controls by material identity to prevent unsaved/failed drafts leaking into the next material
- Guarded malformed world decoding so an invalid route can recover instead of blanking the app

## Fidelity boundaries

The native cover's seated Sora/Riku portrait is not available as an already permitted standalone asset. The implementation uses the repository's existing falling Sora/Riku/Mickey artwork. The six original screenshot files remain research-only and byte-identical; no screenshot artwork was copied into production. This is the largest visible asset difference, not an exact portrait match.

Chakra Petch and Itim are the existing licensed font substitutes. Ornaments/emblems are code-rendered approximations, not extracted native textures. The functional root labels, real app check marks, filtering controls, mobile composition and paginated prose are deliberate companion adaptations.

Exact HD Treasures grid/world-character transitions, Game Records detail layouts and native Spirit Creation screens were not visually verified in the available sources. Those interiors use the well-evidenced Reports language and existing guide functions; they are not certified pixel-identical native screens. Steam-specific controller/keyboard prompts and animation timing remain unverified. No user visual acceptance, real iPhone hardware acceptance or live game playthrough is claimed.

## Validation

The test files are committed with the implementation:

- `tests/ddd-journal.test.ts`: start-route compatibility, prose/caveat handling, paragraph boundaries, canonical identities
- `tests/e2e/ddd-layout.spec.ts`: stage stability, hover/focus geometry, adaptive row capacity, resize/return focus, long notes, scope counts, malformed route recovery and quantity identity
- `tests/e2e/ddd-reports-regression.spec.ts`: Sora/Riku isolation, cross-tab sync, search/history/reload, denominator stability, stock/target arithmetic, backup/import/recovery, failed-write rollback, offline reload and compact-screen readability
- DDD cases in existing multi-game/practical-research suites now exercise the new report routes instead of obsolete generic-row selectors

Final local test counts and representative capture details are recorded in [validation.json](../../artifacts/ddd-ui/validation.json). Browser checks use the installed `@sparticuz/chromium` executable through `ARS_TEST_CHROMIUM=/tmp/chromium`, with desktop and iPhone-profile Chromium emulation. The standard system Chromium could not launch in this sandbox; it was not used to claim a passing run.

All six user reference SHA-256 hashes and the complete generated DDD content were checked against the pre-refactor baseline. No entry, formula, chest or portal identity changed. Production compilation/content generation and empty Coppermind pack verification are included in the build checks.

### Existing repository-wide CI limitation

The documentation-only checkpoint `2e9c4ee`, before the new DDD renderer was committed, ran the full GitHub workflow. All 176 unit tests, canonical content, pack validation and production build passed. The full browser step had **72 passes and 50 failures** across existing KH1/KH2-oriented suites. Many tests still target superseded generic/inline selectors. [Exact baseline run](https://github.com/didymusbenson/kh-tools/actions/runs/37086668533).

Those pre-existing failures are not removed, skipped or relabeled as passes in this change. DDD's final regression and current cross-journal suites are validated separately. A passing focused run is not a claim that the whole legacy browser suite is green. Final remote-commit CI state is reported in the handoff; the feature branch is not automatically merged or deployed.
