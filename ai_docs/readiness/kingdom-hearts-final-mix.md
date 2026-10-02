# Kingdom Hearts Final Mix readiness

> **New UI acceptance pending — 2026-09-22.** This document retains content-readiness and old implementation evidence. The [faithful-journal redesign](../ui/kh1fm-new-ui-plan.md) requires a new visual and interaction acceptance pass. Existing data does not need to be re-researched merely because its presentation changes; native narrative expansion remains Q02.

## Current content assessment — 2026-10-01

Canonical inventory: **1,259 entries**, **33 recipes**, **26 coverage groups**. All 20 research findings were investigated; **10 closed, 6 partial, 4 unresolved**. [Current ledger](../games/kh1fm/research_audit.md) and [continuation evidence](../games/kh1fm/research-continuation-2026-10-01.md) govern remaining content work. All 55 Steam keys are mapped from individually observed condition/key rows; both secret movies have source-backed independent Theater access.

### Implementation evidence — initially recorded 2026-09-18

The user authorized implementation after the discovery assessment below. The React journal, local progress, exact synthesis planner, normalized content, per-game Coppermind tooling and local Jiminy runtime now exist. See [implementation verification](../implementation/verification.md), [collection reconciliation](../implementation/collectibles.md), [reference data](../implementation/reference-data.md), [corrective UX review](../implementation/ui-ux-review.md) and [reuse lessons](../implementation/lessons-for-other-games.md).

Collection coverage is now 471 records, including 306 treasure/reward records and all finite specialist sets, reconciled to 430 distinct acquisition actions. All 535 candidate world-source rows are classified. The reference data includes all 33 synthesis recipes, complete level/EXP rows and equipment, material, cup, Gummi and Steam-goal catalogs. Machine-readable coverage and per-record uncertainty remain authoritative.

The remaining content qualifications are narrow and visible: Three Stars' conflicting Defense statistic, Unknown's precise earliest portal flag (a guaranteed practical route is supplied), and restricted-run/minigame edge cases not established by available sources. Do not call source-backed records hands-on verified or declare every possible record metric exhaustive. Production location images remain explicitly deferred; optional media behavior is implemented and tested with synthetic assets.

Initial device targets were clarified to **desktop Chrome and iPhone 17**. Automated Chromium desktop and phone-layout checks are implemented. Physical iPhone 17, its soft keyboard, VoiceOver and real mobile model-memory acceptance remain unverified; see the final verification report for executed results. User gameplay verification is not required.

## Historical discovery assessment

The dated discovery assessment below preserves the original planning context. The D01–D19 status column and research queue have been reconciled to 2026-10-01 canonical evidence. The engineering checklist is retained as a historical implementation plan; current execution evidence is in the reports linked above.

Status: **Sourced planning substantially expanded; full data extraction and validation still required before declaring a comprehensive guide or shipping.**
Assessment: 2026-09-18, updated after public-source research and the user's collectible-compendium clarification. Based on the [KH1FM spec](../games/kingdom-hearts-final-mix.md), [sourced planning reference](../games/kh1fm/README.md), [content inventory](../02-content-inventory.md), and [legacy source audit](../sources/khtables-drive-audit.md). This pass adds real planning tables and citation links; it is not an exhaustive legacy-workbook audit, normalized database import or hands-on gameplay verification.

## Settled scope

- Modern KH1 **Final Mix** releases. No original KH/PS2 compatibility work. Pin current supported modern releases during research and capture only relevant modern platform differences.
- Provide every relevant table and the practical details needed to finish a completion run without another guide.
- Include precise acquisition instructions, necessary access prerequisites, challenges, rewards, synthesis and named completion goals. A full story walkthrough and exhaustive narrative Journal flags are outside the accepted scope.
- Compact world-grouped lists and expanded location rows share the same saved collectible IDs. World percentages count collectibles, not conversations, plot or character updates. See the [shared contract](../content/collectible-compendium-and-linked-views.md).
- Green journal UI, persistent offline progress, and Data Jiminy's fast factual query interface are MVP.
- Production screenshots awaiting assets are deferred; precise text directions are required.
- KH1 is the first detailed readiness assessment, not an implicit removal of other games from MVP.

## Completion definitions

Foreground world/category collectible completion. Maintain separate named requirement sets for synthesis, equipment, optional challenges, Gummi, records, secret unlocks and modern platform trophies/achievements. Do not combine them into an unexplained “100%” denominator. Full narrative Journal tracking is not required; if an actual trophy or unlock depends on Journal completion, preserve that condition separately without equating it with world collectibles. Research establishes exact memberships; the user need not recall every game mechanic.

A requirement must identify what is checked (found, crafted, cleared, unlocked, score achieved), the counting unit, prerequisites, and whether it affects each goal. Track current material inventory separately from historical completion.

## Required tables and content readiness

The rows below are required coverage areas to audit, not a claim that every named activity is an official Journal requirement. Applicability, inventories, exact targets, and counts must be verified for the modern Final Mix baseline. No category is currently certified complete.

| ID | Coverage / logical tables | Details required for a completion run | Current evidence and gap |
|---|---|---|---|
| KH1-D01 | Worlds, areas and acquisition access requirements | Relevant navigation links, access conditions, revisit changes, earliest availability and return route | World/room directions and relevant movement/access prerequisites are normalized; no full story-route graph is required. |
| KH1-D02 | All treasure chests and one-time rewards | Contents, world/area, exact text location, route, required abilities, availability/missability, counts by area | 306 finite treasure/reward records; all 535 candidate world rows classified. Both Manor Ruins relocations resolved; roster/text routes complete within declared scope. |
| KH1-D03 | Dalmatians and reward milestones | Puppy numbers, chest/group identity, location, access conditions, turn-in rewards | All 33 puppy groups / 99 puppies and reward milestones normalized, including FM relocations. |
| KH1-D04 | Trinity Marks and Trinity unlocks | Color, precise location, unlock and activation conditions, reward, counting rules | All 46 marks and activation/reward routes normalized; counts 17/6/9/4/10. |
| KH1-D05 | Postcards and turn-in rewards | Acquisition steps, prerequisites, delivery action, reward sequence, completion count | All ten acquisition slots and turn-in rewards normalized, including Gizmo route. |
| KH1-D06 | Torn Pages and Hundred Acre Wood | Page locations, episode unlocks, activities, completion/score targets, rewards | Five page sources and activities/rewards normalized. Pooh Swing target is 40 m, resolved by inspected Steam-linked HUD footage (KH1-004). |
| KH1-D07 | Ansem Reports and collectible reference mapping | Stable Report IDs, acquisition triggers, required encounters/reward conversations and goal links | All 13 acquisition records normalized. Unknown earliest portal boundary remains KH1-002; safe later route supplied. |
| KH1-D08 | Synthesis recipes and unlock sets | Product, ingredient IDs/quantities, unlock conditions, crafted state, all-catalog requirement | All 33 recipes normalized and totals calculated. Energy Bangle resolved to two Spirit Shards; no remaining recipe conflict. |
| KH1-D09 | Materials, enemies, drops, encounters | Source locations, spawn/respawn conditions, drop rules/rates/modifiers, special-enemy mechanics and concise farming steps | 34 materials and 44 acquisition-relevant enemies; all eight named farm loops supplied. Bambi exhaustive eligibility remains KH1-010; every-room encounter enumeration is not claimed. |
| KH1-D10 | Weapons, accessories and item catalog | Sora/Donald/Goofy equipment, stats/effects, shops/prices where needed, all acquisition routes and completion relevance | 48 weapons, 54 accessories and 23 general items normalized with acquisition/effect data. Three Stars Defense remains KH1-001. |
| KH1-D11 | Abilities, level rewards and progression choices | Starting-choice dependencies, level unlocks, AP/effects where relevant, movement unlocks, EXP data needed for leveling | 99 Sora level rows, full EXP curves and 65 ability records imported. Mixed-answer selection KH1-015 and precise ability boundaries KH1-018 remain. |
| KH1-D12 | Magic and summons | Every relevant tier/unlock, acquisition requirements, summon acquisition/activation and completion links | 21 magic acquisition events and six summons normalized with acquisition conditions. |
| KH1-D13 | Olympus cups, rounds and variants | Unlocks, opponents, solo/time variants, target rules, rewards, practical strategies | 96 cup records include seeds, variants, checkpoints and intermediate rewards; old missing-import claim superseded. |
| KH1-D14 | Optional bosses and special encounters | Unlock/location, required preparation, mechanics, concise clear strategy, rewards and goal membership | Five endgame optional bosses plus early encounters have practical guides. Exact earliest Unknown flag remains KH1-002. |
| KH1-D15 | Minigames, records and world interactions | Each completion-relevant activity, trigger, target, repeatability, reward, strategy; audit races, timed activities and interaction rewards | 22 activity/record targets plus four cup timers in cup records; self-contained Journal registration. Phil saved replay-time field KH1-005 and four exact Vine chains KH1-014 remain. |
| KH1-D16 | Gummi completion | Relevant missions, routes, objectives/ranks, blueprints/parts, unlocks, rewards, practical build/control guidance | 30 missions, 48 blueprints, 80 parts and seven tools normalized. All enemy blueprint routes/counts and four practical difficult-mission build families supplied. |
| KH1-D17 | Modern trophies/achievements and run constraints | Per-platform requirements, difficulty/clear conditions, stacking rules, missable or incompatible goals, safe route planning | 55 Steam goals with individually source-backed ACH_001–055 mappings. Restricted-run flag/menu persistence details remain KH1-003. |
| KH1-D18 | Endgame and secret unlocks | Ending/unlock conditions by difficulty where applicable; links to required completion records | Both ending conditions and independent PC Theater availability documented; KH1-016 closed. Viewing a movie is distinct from meeting save ending conditions. |
| KH1-D19 | Completion rules and dependencies | Goal membership, unique IDs, grouped-item counts, parent/child rules, prerequisites, no double counting | Stable shared IDs, goal links and planner fixtures exist. Full legacy prose equivalence / inspected binary provenance remains KH1-020; app acceptance is separate. |

The [D01–D19 research coverage audit](../games/kh1fm/world-and-coverage-audit.md#coverage-against-readiness-ids) links these findings to their detailed tables and original citation sources.

These are logical datasets, not a mandate for nineteen separate SQL tables. Every verified requirement must map to a record or a documented rule; the audit must add categories if it finds omissions.

## Minimum record contract

- Stable ID, canonical name/aliases, category, modern ruleset/platform applicability.
- World/area and unambiguous text instructions where applicable.
- Prerequisite flags, abilities, choices, unlock chain, earliest availability, and verified missability/revisit behavior.
- Reward/result, relevant quantities, threshold or completion action, goal memberships and counting unit.
- Related recipe/item/enemy/encounter IDs; links must resolve.
- Source reference, verification date/status, and original explanatory text.
- Explicit “not applicable” versus “unknown”; unknown data must not look complete.
- Optional media references only; no missing-image dependency.

The current coverage inventory is recorded above and in canonical coverage JSON. Source-backed status is documentary evidence, not hands-on verification. Roster completeness does not imply every redundant source alternative, every enemy room or every optional timing metric. Narrative Journal entry/update totals are outside the accepted compendium inventory.

## User decisions — answer as we reach them

These refine presentation and workflow; none authorizes dropping a completion category.

| ID | Question | Default / accepted direction | When needed | Answer/status |
|---|---|---|---|---|
| KH1-Q01 | What completion goal should the first dashboard foreground? | World/category collectibles; separate named tracks for synthesis, challenges and other goals; exclude narrative flags | Dashboard design | Answered 2026-09-18 — user clarification |
| KH1-Q02 | Spoiler policy | Fully spoilerful app; no warnings, concealment or reveal controls | All presentation | Answered 2026-09-18 |
| KH1-Q03 | Game context and initial app test targets | User plays Steam. Initial app smoke/acceptance on desktop Chrome and iPhone 17; Android later. No gameplay/playthrough acceptance gate | App testing | Answered 2026-09-18 |
| KH1-Q04 | Available Now / progress gates | Omit Available Now filtering and manual ability/story tracking; keep required abilities and access conditions in acquisition text | Collection UX | Answered 2026-09-18 — feature declined |
| KH1-Q05 | Synthesis inventory | Optional opt-in owned quantities; ingredient reminders show owned/required (x/y). Synthesis is first-class with robust remaining-material calculations and functional acceptance | Planner interaction | Answered 2026-09-18 |
| KH1-Q06 | How should collection guidance be organized? | Compact lists by world, expanded into precise item location/acquisition rows; shared checks; relevant prerequisites and missability guidance; no full story walkthrough | Guide navigation | Answered 2026-09-18 — user clarification |

All six current product questions are answered. Remaining work is research and implementation; new product questions should be raised only when a concrete unresolved choice requires one.

### Answer log

| Date | ID | Answer |
|---|---|---|
| 2026-09-18 | KH1-A01 | Use modern Final Mix for KH1 and KH2; no original/PS2-era support |
| 2026-09-18 | KH1-A02 | Include all relevant tables and practical details needed to accomplish a completion run |
| 2026-09-18 | KH1-A03 / Q01 | World percentages represent collectibles, not narrative Journal flags, conversations or character updates; retain other completion goals separately |
| 2026-09-18 | KH1-A04 / Q06 | Use a world-grouped compact index and expanded item-location details backed by identical persistent item records; compendium scope, not a full story walkthrough |

Accepted 2026-09-18: Q02 no spoiler warnings; Q03 Steam context and Apple-first app testing; Q04 no progress-gate filtering/tracking; Q05 optional inventory and first-class synthesis. These apply across the game specs. See [synthesis/inventory](../content/synthesis-and-inventory.md) and [testing/content validation](../testing-and-content-validation.md).

Record new answers under the question ID, then update status and corresponding spec; preserve rejected alternatives in notes rather than reopening settled questions.

## Research queue — current residuals, not questions for the user

- [x] KH1-R01: All 824 legacy CSV rows have a reproducible crosswalk. Full prose-clause equivalence remains KH1-020; row coverage is not that claim.
- [x] KH1-R02: Steam scope and all 55 achievement key mappings established. Exact inspected executable/build provenance remains KH1-020.
- [x] KH1-R03: Declared treasure, Report, equipment, item, enemy, level and Gummi manifests normalized. No narrative/biography manifest gate.
- [x] KH1-R04: Recipe totals, Energy Bangle, grouped collectibles, cup seeds and level rows reconciled. Three Stars Defense KH1-001 and mixed-answer mapping KH1-015 remain separate precise questions.
- [ ] KH1-R05: Four exact Vine chains KH1-014 and exhaustive Bambi eligibility KH1-010 remain; practical farming routes and Gummi builds are supplied.
- [ ] KH1-R06: Resolve Unknown earliest flag KH1-002, run flags/menu/persistence KH1-003, Phil saved best-time persistence KH1-005 and precise ability boundaries KH1-018.
- [x] KH1-R07: Complete disposition/evidence reports supplied for all 20 findings and all 12 prior residuals; no untouched issue closed by relabeling.

## Historical engineering queue — implementation evidence supersedes unchecked boxes

- [ ] KH1-E01: Define versioned schemas, stable IDs, relationships, import validation and update migrations.
- [ ] KH1-E02: Implement green mobile journal with compact world-grouped slots and expanded location rows using the same stable records, search, Remaining filters and compact source links.
- [ ] KH1-E03: Implement saved checks/counters, progress counts, resume, undo, export/import and failure recovery.
- [ ] KH1-E04: Treat synthesis as first-class: optional persistent inventory, owned/required ingredient reminders, accurate per-recipe and aggregate shortfalls, source navigation and independently checked calculation fixtures. Allocate shared stock once; keep crafted-history checks separate from current stock. Follow the shared synthesis contract.
- [ ] KH1-E05: Package app/content/models for offline cold starts; distinguish download completion from verified readiness; preserve progress through updates.
- [ ] KH1-E06: Build game-scoped Coppermind data and query embeddings; select/evaluate the small model and runtime. Render exact data directly where possible.
- [ ] KH1-E07: Validate Data Jiminy on locations, prerequisites, recipes, quantities, progress queries, ambiguous questions, unsupported questions and instruction-override attempts. No personality or unsolicited elaboration.
- [ ] KH1-E08: Validate touch/keyboard/screen-reader use, readable dense tables, zero-image rendering and synthetic media fixtures.

## Representative end-to-end checks

| User goal | Required behavior / evidence |
|---|---|
| Find a missing puppy group | Stable group ID, correct location/access conditions, saved check and correct count everywhere |
| Finish a world's collectibles | Exhaustive area inventory; no omitted reward sources, duplicates or unexplained denominator |
| Craft remaining synthesis products | Verified recipes; exact totals; owned materials and previously crafted items handled correctly; actionable source instructions |
| Clear a cup or optional encounter | Unlock chain, variant, relevant preparation, required objective and reward |
| Check a compact slot, then open world details | Same saved item check in both views, search and summaries; reverse toggle and offline relaunch agree |
| Record an access milestone or narrative update | World collectible percentage remains unchanged; only actual collectible acquisition checks affect it |
| Complete a platform achievement list | Correct modern platform rules, run restrictions and missability guidance; separate from world collectible percentage; accurately state any real Journal condition |
| Ask Data Jiminy “Where is this?” | Short sourced answer with necessary conditions; no invented location or extra commentary |
| Resume offline after an update | Correct content version, retained checks, functioning search and direct question answering |

## Release gate

KH1FM is ready only when every required coverage row has a verified inventory and usable details, all critical research conflicts are resolved, needed product decisions are answered, and offline/progress/calculation/Data Jiminy tests pass on the agreed device matrix. A player must be able to find, obtain and track the scoped collectibles and completion items using Ars Arcanum alone. A full narrative walkthrough is not a release requirement. Screenshots are not a release blocker; missing text guidance is.

Current content blockers/limitations are exactly the ten residual audit findings: KH1-001–005, 010, 014, 015, 018 and 020. Existing catalogs, cup seeds, recipes and normalized UI/data are implemented; do not treat the historical engineering boxes as current absence claims. Redesigned UI acceptance and desktop Chrome/iPhone 17 functional evidence remain separate engineering work; this research continuation does not certify them.

## Accepted app acceptance policy

Use the [shared test plan](../testing-and-content-validation.md): desktop Chrome and iPhone 17 initially; Android follow-up. The user plays Steam, but no manual playthrough or in-game verification is required from them. Preserve content accuracy through cited source reconciliation and data/calculation validation. App checks must also verify optional inventory off/on, x/y quantities, no spoiler UI, and no Available Now tracker/filter.
