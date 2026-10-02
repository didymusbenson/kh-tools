# Re:Chain of Memories readiness

Snapshot: **2026-10-01**. Status: **HD journal revised locally; complete campaign card rosters, numeric CP, acquisition pools and event-door data; remaining evidence limits are listed in the current audit.** [Specification](../games/kingdom-hearts-re-chain-of-memories.md) · [Research pack](../games/recom/README.md).

## Inherited decisions and current working baseline

| ID | Basis | Implication |
|---|---|---|
| COM-D01 | Shared modern-release policy; Steam gameplay context | Research HD Re:CoM; separate GBA/PS2 evidence |
| COM-D02 | User asks to document Chain of Memories at KH1/KH2/BBS depth | Both Sora and Riku researched; concrete catalogs and provenance |
| COM-D03 | Shared collectible compendium / persistent progress | Finite acquisitions and shared compact/detail IDs; no narrative flags in world totals |
| COM-D04 | Shared spoiler and prerequisite policy | Spoilers directly visible; prerequisites in text; no Available Now tracker |
| COM-D05 | Shared Apple-first acceptance | App/content verification, not required user gameplay |
| COM-D06 | User subsequently requested implementation and home placement between KH1FM and KH2FM | Initial journal/module implemented; deployment not requested |

HD scope is the application of the existing modern-release policy, not a newly solicited user decision. No product clarification blocks further factfinding.

Current disposition: [all 32 findings](../games/recom/research-resolution-2026-10-01.md): 14 closed, 12 partial, three open after investigation, three non-factual limitations. Every remaining question has consulted sources and a precise failed/insufficient-evidence outcome. The historical rows below are preserved rather than used as current readiness claims.

## October 1 content readiness

| Domain | Current supported scope | Exact residual group |
|---|---|---|
| Card economy / rooms | 152/59 rosters, 440 CP cells, 37 Premium costs, 25 floor doors, 17 Bounty priorities, 16 packs | Full probability distributions; clear-save/fallback semantics (001,009) |
| Farms | All 30 rate/world records, both footnotes, both mushroom rules | Full spawn/reset routes and independent 30-row rate evidence (003,005) |
| Sleights | All 98 effects, 92 stock recipes, six duel activations and all Riku form rules | Native order/Steam denominator and recipe precedence (006,007) |
| Progression / combat | All 99 levels/caps/deferred choices; 59 combat records/379 floor rows/43 timers/24 boss deck tables | Complete encounter decks/tactics/frames and quarantined source ambiguities (014) |
| Riku | 12 world presets and all 12 retained boss-card conditions | Corridor/boss overrides (002) |
| Basic cards / friends | All 29 effects, seven reload matrices, all eight friend windows | Bambi/Goofy exact base durations and unlisted higher tiers (017) |
| Minigames | Six canonical start/objective routes and first/second rewards | Third-and-later replay rewards (015) |
| Steam / Report / Days | All 47 public goal definitions and explicit API-key mappings; actionable Days route; Report guidance | Runtime predicates, full registration/rank formulas, minimum Days/save behavior (008,011–012) |
| Provenance | All 51 missing URLs have new outcomes; 269 direct retrieval attempts plus web inspections | Historical September 28 inspection metadata cannot be reconstructed (020) |

## Initial content readiness (historical)

| ID | Category | Delivered evidence | Remaining gate |
|---|---|---|---|
| COM-R01 | Release | Primary Steam collection contents; explicit HD exclusions | Pin tested build/platform differences before claiming runtime verification |
| COM-R02 | Legacy | Local docs and prior KHTABLES inventory inspected; no dedicated CoM baseline found | Fresh private-Drive audit not performed; do not claim no source exists |
| COM-R03 | Worlds | All 13 Sora/12 Riku visit groups | Exact native map/door predicates; distinguish world-card inventory |
| COM-R04 | Reward rooms | 12 base + 12 Days chest claims | Exact per-world door costs and independent acquisition corroboration |
| COM-R05 | Bounties | 17 named world reward candidates | Precedence, fallback/repeat rules, post-clear save semantics |
| COM-R06 | Cards | 23 attack; 7 magic; 7 summon; 7 item; 8 friend; 2 special | Native Card Index roster/order, World/Gimmick/minigame-only membership |
| COM-R07 | Enemy cards | 56 Sora + 22 Riku campaign records | Seven CP conflicts; complete boss-event routes, effects and resistances |
| COM-R08 | Farming | 30 individual Re:CoM enemy source/rate records | Footnoted encounters, mushroom rules, precise routes and independent rate validation |
| COM-R09 | Maps | 29 identities; 20 applicable to Riku in inspected table | World/difficulty drop matrices and door solver boundary rules |
| COM-R10 | Sleights | 83 ordinary Sora + 2 minigame + 13 Riku candidate names; 12 level milestones | Independent denominator/menu order; normalize alternatives, generic slots and precedence |
| COM-R11 | Deck economics | 16 pack prices; Premium/CP conceptual separation | All per-value CP costs, pack odds, sale exceptions; no calculator yet |
| COM-R12 | Riku presets | 12 Re:CoM decks, card values/source sequence | Independent modern deck check; corridor/boss substitutions and retained-card union |
| COM-R13 | Minigames | Five Pooh score goals; first/replay rewards; Monstro entry | Full Journal completion/character triggers, exact replay behavior and text routes |
| COM-R14 | Steam goals | 47 goals with primary names and explicit secondary indexed API mappings | Hidden runtime comparisons and campaign/counter aggregation |
| COM-R15 | Completion bonuses | Days versus Riku-clear dependency separated | Minimum Steam Days trigger, Gold/Platinum order and ordinary-collection membership |
| COM-R16 | Level / combat | Sora milestones, movement, Riku Dark Mode/duels | HP/CP/AP/DP caps, EXP tables, full bestiary/boss mechanics and encounter timers |
| COM-R17 | Presentation | 22 HD video frames + 2 official HD panels; Journal/D-Report roots, native card categories, collection/detail, records, player/Status menus; [design brief](../ui/recom-menu-design-research.md) | Partial/NEW states, Edit Deck/Sleights detail, Moogle shop, English room predicates, exact fonts/assets and responsive mockup |

Counts above are measured research records, not declared game-completion denominators. Details and sources are in the [manifest](../games/recom/source-manifest.json) and [conflict register](../games/recom/source-conflicts.json).

## Engineering acceptance

| ID | Required behavior | Status |
|---|---|---|
| COM-E01 | Scope checks/inventory/run state by game and campaign; compact/detail/search share identities | Implemented for current catalogue; unit and browser checks pass |
| COM-E02 | Do not double-count chest/output; repeat room creation preserves historical claims | Independent finite reward claims implemented; repeat room creation is not modeled |
| COM-E03 | Fixed denominators under Remaining/search; partial catalogs never claim full 100% | Implemented; fixed 152/59 campaign totals with independent reward checks |
| COM-E04 | Optional copy inventory respects type/value/Premium; historical checks do not create/deduct stock | Not implemented; discovery checks only |
| COM-E05 | Recipe alternatives/order, two-card sleights, sums and same/different constraints | All 92 stock recipes and six duel activations normalized; third-card/overlap precedence remains |
| COM-E06 | CP conflicts fail closed for calculations; unknown cost never equals zero | 44 ten-value CP tables and seven reconciled enemy costs; no calculator implemented |
| COM-E07 | Riku preset + retained boss cards; no Sora-only card/editor/shop leakage | Twelve presets, all 12 retained boss acquisitions and campaign boundaries implemented; corridor overrides remain |
| COM-E08 | All scoped answers/directions usable offline; Data Jiminy retains sources and uncertainty | Catalogue/notes tested offline; CoM-specific Data Jiminy not implemented |
| COM-E09 | Native journal evidence, mobile navigation, accessibility and Apple acceptance | HD-inspired UI and desktop/phone browser checks complete; exact assets and physical Apple-device acceptance remain |
| COM-E10 | Backup/import, offline relaunch, campaign isolation and migration tests | Backup/import/recovery and game/campaign isolation tested; offline relaunch passes; no CoM schema migration introduced |

The user subsequently authorized implementation. See the [working implementation report](../implementation/recom-hd-journal.md) for delivered behavior, screenshots, validation and remaining boundaries.

## Original research sequence (see current audit for completed items)

1. Verify native Card Index and Sleight-menu inventories and reconcile completion membership.
2. Resolve CP conflicts using modern native screens or independent tables; complete value/Premium matrices.
3. Audit world door costs and all finite reward directions, Days flags, clear-save gates and Bounty precedence.
4. Finish exact farm encounters/mushrooms, Riku corridor/boss data and achievement predicates.
5. Build/review the [HD menu design brief](../ui/recom-menu-design-research.md) against captured references; target remaining partial/NEW, deck and shop screens.

## Answer log

- 2026-09-28: Compared KH1/KH2/BBS research depth and established dedicated CoM spec, readiness, source manifest and structured candidates.
- 2026-09-28: Excluded four PS2 bonus identities, GBA Sora Darkball and GBA Riku deck tabs; separated Days and Reverse/Rebirth clear dependencies.
- 2026-09-28: Found seven contradictory CP costs; kept both source values and null production candidates.
- 2026-09-28: Matched 47 Re:CoM achievement names in Steam's 197-goal list; scoped duplicates and retained unknown API/runtime details.
- 2026-09-28: Validated record counts, IDs, required fields, arithmetic, edition exclusions, campaign boundaries and local documentation links. This is documentation/data validation, not game or app testing.

- 2026-09-28: User explicitly requested HD 1.5 ReMIX interface research, excluding original PS2/GBA imagery. Captured both report identities and native card/record/system screens; wrote a sourced reference workbook and proposed responsive design brief. No app implementation or mockup acceptance is claimed.

- 2026-09-28: Implemented the HD journal and requested home placement. Added 403 sourced runtime entries, separate campaign reports, saved discovery/score records and offline coverage. Ten desktop/phone browser tests and the 105-test unit suite pass. Native artwork, full card coverage and the remaining research gates are still open.

- 2026-10-01: Reassessed all 32 audit findings, integrated all basic/sleight effects, structured recipes, progression, combat/form tables, minigame routes and complete friend/mushroom conditions; reconciled fresh access for all 51 old manifest omissions without rewriting historical evidence. Fixed null Riku 100 Acre Wood filtering. Jiminy memories remain empty. Targeted validation is recorded in the per-game resolution ledger.

October 1 continuation: [all residual findings challenged](../games/recom/research-continuation-2026-10-01.md), with complete Steam-key mapping and additional bounded mechanics integrated. No user playthrough required.
