# Re:Chain of Memories readiness

Snapshot: **2026-09-28**. Status: **Initial HD journal implemented locally; partial catalogue and artwork; explicit data conflicts/gaps remain.** [Specification](../games/kingdom-hearts-re-chain-of-memories.md) · [Research pack](../games/recom/README.md).

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

## Content readiness

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
| COM-R14 | Steam goals | 47 candidate goals; primary display-name matches | Native API IDs, hidden runtime comparisons and campaign/counter aggregation |
| COM-R15 | Completion bonuses | Days versus Riku-clear dependency separated | Minimum Steam Days trigger, Gold/Platinum order and ordinary-collection membership |
| COM-R16 | Level / combat | Sora milestones, movement, Riku Dark Mode/duels | HP/CP/AP/DP caps, EXP tables, full bestiary/boss mechanics and encounter timers |
| COM-R17 | Presentation | 22 HD video frames + 2 official HD panels; Journal/D-Report roots, native card categories, collection/detail, records, player/Status menus; [design brief](../ui/recom-menu-design-research.md) | Partial/NEW states, Edit Deck/Sleights detail, Moogle shop, English room predicates, exact fonts/assets and responsive mockup |

Counts above are measured research records, not declared game-completion denominators. Details and sources are in the [manifest](../games/recom/source-manifest.json) and [conflict register](../games/recom/source-conflicts.json).

## Engineering acceptance

| ID | Required behavior | Status |
|---|---|---|
| COM-E01 | Scope checks/inventory/run state by game and campaign; compact/detail/search share identities | Implemented for current catalogue; unit and browser checks pass |
| COM-E02 | Do not double-count chest/output; repeat room creation preserves historical claims | Independent finite reward claims implemented; repeat room creation is not modeled |
| COM-E03 | Fixed denominators under Remaining/search; partial catalogs never claim full 100% | Implemented; fixed totals and explicit partial-catalogue labels |
| COM-E04 | Optional copy inventory respects type/value/Premium; historical checks do not create/deduct stock | Not implemented; discovery checks only |
| COM-E05 | Recipe alternatives/order, two-card sleights, sums and same/different constraints | Sourced references implemented; recipe normalization remains |
| COM-E06 | CP conflicts fail closed for calculations; unknown cost never equals zero | Unknown/conflicting CP labeled; no calculator implemented |
| COM-E07 | Riku preset + retained boss cards; no Sora-only card/editor/shop leakage | Twelve preset references and campaign boundaries implemented; retained boss-card completeness remains |
| COM-E08 | All scoped answers/directions usable offline; Data Jiminy retains sources and uncertainty | Catalogue/notes tested offline; CoM-specific Data Jiminy not implemented |
| COM-E09 | Native journal evidence, mobile navigation, accessibility and Apple acceptance | HD-inspired UI and desktop/phone browser checks complete; exact assets and physical Apple-device acceptance remain |
| COM-E10 | Backup/import, offline relaunch, campaign isolation and migration tests | Backup/import/recovery and game/campaign isolation tested; offline relaunch passes; no CoM schema migration introduced |

The user subsequently authorized implementation. See the [working implementation report](../implementation/recom-hd-journal.md) for delivered behavior, screenshots, validation and remaining boundaries.

## Next research sequence

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
