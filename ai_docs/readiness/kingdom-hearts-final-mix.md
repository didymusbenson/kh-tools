# Kingdom Hearts Final Mix readiness

## Current implementation assessment — 2026-09-18

The user authorized implementation after the discovery assessment below. The React journal, local progress, exact synthesis planner, normalized content, per-game Coppermind tooling and local Jiminy runtime now exist. See [implementation verification](../implementation/verification.md), [collection reconciliation](../implementation/collectibles.md), [reference data](../implementation/reference-data.md), [corrective UX review](../implementation/ui-ux-review.md) and [reuse lessons](../implementation/lessons-for-other-games.md).

Collection coverage is now 471 records, including 306 treasure/reward records and all finite specialist sets, reconciled to 430 distinct acquisition actions. All 535 candidate world-source rows are classified. The reference data includes all 33 synthesis recipes, complete level/EXP rows and equipment, material, cup, Gummi and Steam-goal catalogs. Machine-readable coverage and per-record uncertainty remain authoritative.

The remaining content qualifications are narrow and visible: Three Stars' conflicting Defense statistic, Unknown's precise earliest portal flag (a guaranteed practical route is supplied), and restricted-run/minigame edge cases not established by available sources. Do not call source-backed records hands-on verified or declare every possible record metric exhaustive. Production location images remain explicitly deferred; optional media behavior is implemented and tested with synthetic assets.

Initial device targets were clarified to **desktop Chrome and iPhone 17**. Automated Chromium desktop and phone-layout checks are implemented. Physical iPhone 17, its soft keyboard, VoiceOver and real mobile model-memory acceptance remain unverified; see the final verification report for executed results. User gameplay verification is not required.

## Historical discovery assessment

The rest of this document is retained as the pre-implementation baseline and requirements checklist. Its statements that schemas/UI are unbuilt or extraction is pending describe that earlier phase, not current implementation status. The reports linked above supersede those historical status claims.

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
| KH1-D01 | Worlds, areas and acquisition access requirements | Relevant navigation links, access conditions, revisit changes, earliest availability and return route | World source atlas and movement/Trinity unlocks documented; collectible access links and precise routes pending; no full story-route graph required |
| KH1-D02 | All treasure chests and one-time rewards | Contents, world/area, exact text location, route, required abilities, availability/missability, counts by area | Per-world treasure/reward sources inspected; missability examples documented; exhaustive FM rows/counts/routes still pending |
| KH1-D03 | Dalmatians and reward milestones | Puppy numbers, chest/group identity, location, access conditions, turn-in rewards | 99 puppies / 33 groups, turn-in rewards and FM relocations sourced; reconcile every group/route against legacy data |
| KH1-D04 | Trinity Marks and Trinity unlocks | Color, precise location, unlock and activation conditions, reward, counting rules | 46 marks (17/6/9/4/10 by blue/red/green/yellow/white), unlocks and party rules sourced; full location/reward import pending |
| KH1-D05 | Postcards and turn-in rewards | Acquisition steps, prerequisites, delivery action, reward sequence, completion count | All ten acquisition slots and mailing rewards transcribed; precise Gizmo route and state validation remain |
| KH1-D06 | Torn Pages and Hundred Acre Wood | Page locations, episode unlocks, activities, completion/score targets, rewards | Five page sources, episode rewards, Cheer targets and Rare Nut rewards documented; full tutorials/locations remain |
| KH1-D07 | Ansem Reports and collectible reference mapping | Stable Report IDs, acquisition triggers, required encounters/reward conversations and goal links | All 13 Report acquisitions sourced; normalize and validate dependencies. Full story/character Journal entry-update manifests are outside current scope |
| KH1-D08 | Synthesis recipes and unlock sets | Product, ingredient IDs/quantities, unlock conditions, crafted state, all-catalog requirement | All 33 ingredient rows and unlock sets transcribed; direct totals calculated; Energy Bangle source conflict requires resolution |
| KH1-D09 | Materials, enemies, drops, encounters | Source locations, spawn/respawn conditions, drop rules/rates/modifiers, special-enemy mechanics and concise farming steps | Ordinary base rates, ten special-material encounters, mushroom rewards and reset/modifier rules sourced; full spawn/alternative-source data remain |
| KH1-D10 | Weapons, accessories and item catalog | Sora/Donald/Goofy equipment, stats/effects, shops/prices where needed, all acquisition routes and completion relevance | 18 Keyblades, 15 staves, 15 shields and acquisition methods documented; complete accessories/items/stats and trophy membership remain |
| KH1-D11 | Abilities, level rewards and progression choices | Starting-choice dependencies, level unlocks, AP/effects where relevant, movement unlocks, EXP data needed for leveling | Movement unlocks and FM level landmarks sourced; full choice/stat/EXP matrix and duplicate legacy level-15 row unresolved |
| KH1-D12 | Magic and summons | Every relevant tier/unlock, acquisition requirements, summon acquisition/activation and completion links | 21 magic acquisitions and six summon acquisition paths documented; normalize dependencies and verify alternate orders |
| KH1-D13 | Olympus cups, rounds and variants | Unlocks, opponents, solo/time variants, target rules, rewards, practical strategies | Four cup unlock/variant/reward tables sourced; full seeds, intermediate rewards and checkpoint import remain |
| KH1-D14 | Optional bosses and special encounters | Unlock/location, required preparation, mechanics, concise clear strategy, rewards and goal membership | Five endgame bosses with reward/mechanic summaries; exact Unknown earliest unlock and full strategy validation remain |
| KH1-D15 | Minigames, records and world interactions | Each completion-relevant activity, trigger, target, repeatability, reward, strategy; audit races, timed activities and interaction rewards | Training, Slider/Vines, Pooh, Clock Tower and mushroom systems documented; full record manifest and interaction routes remain |
| KH1-D16 | Gummi completion | Relevant missions, routes, objectives/ranks, blueprints/parts, unlocks, rewards, practical build/control guidance | All 30 mission objectives and 48-blueprint roster documented; detailed rewards/parts/drop routes/builds remain |
| KH1-D17 | Modern trophies/achievements and run constraints | Per-platform requirements, difficulty/clear conditions, stacking rules, missable or incompatible goals, safe route planning | Modern stacking, restricted-run conditions and narrower achievement thresholds sourced; per-platform IDs and edge cases remain |
| KH1-D18 | Endgame and secret unlocks | Ending/unlock conditions by difficulty where applicable; links to required completion records | Secret-ending conditions by difficulty sourced; normalize predicates and verify modern save/theater distinction |
| KH1-D19 | Completion rules and dependencies | Goal membership, unique IDs, grouped-item counts, parent/child rules, prerequisites, no double counting | Separate goal sets, grouped events and synthesis dependency rules documented; normalized memberships and fixtures unbuilt |

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

For each KH1-D row, attach: source files/ranges inspected, expected record count and its source, extracted count, verified count, unresolved conflicts, and reviewer/evidence. Expected/source counts now include 33 recipes, 33 puppy groups / 99 puppies, 46 Trinities, 10 Postcards, 5 Torn Pages, 13 Reports, 21 magic acquisition events, 6 summons, 30 Gummi missions, 48 blueprints and 48 obtainable party weapons. The research audit distinguishes what was transcribed from what was only inventoried. Full treasure, accessory, acquisition-relevant enemy/stat and level-row totals remain **unmeasured**, not zero; no normalized app import or hands-on verification is claimed. Narrative Journal entry/update totals are not a required compendium inventory.

## User decisions — answer as we reach them

These refine presentation and workflow; none authorizes dropping a completion category.

| ID | Question | Default / accepted direction | When needed | Answer/status |
|---|---|---|---|---|
| KH1-Q01 | What completion goal should the first dashboard foreground? | World/category collectibles; separate named tracks for synthesis, challenges and other goals; exclude narrative flags | Dashboard design | Answered 2026-09-18 — user clarification |
| KH1-Q02 | Spoiler policy | Fully spoilerful app; no warnings, concealment or reveal controls | All presentation | Answered 2026-09-18 |
| KH1-Q03 | Game context and initial app test targets | User plays Steam. Initial app smoke/acceptance on Apple browser, iPhone and iPad; Android later. No gameplay/playthrough acceptance gate | App testing | Answered 2026-09-18 |
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

## Research queue — agent work, not questions for the user

- [ ] KH1-R01: Audit every relevant workbook range and existing repository file. Extract real records, not just tab names; identify duplicates and incomplete ranges.
- [ ] KH1-R02: Research baseline now uses KH1FM in HD 1.5 + 2.5 ReMIX, with official Steam evidence. Finish exact per-platform achievement mapping and source reconciliation; no PS2 compatibility work.
- [ ] KH1-R03: System inventories/counts for the previously missing modules are now sourced. Complete exhaustive treasure, Report-acquisition, accessory, acquisition-relevant enemy and level manifests; normalize goal membership. Do not require narrative/biography update manifests.
- [ ] KH1-R04: Reconcile the 33 transcribed recipes and calculated totals against legacy/in-game data; resolve Energy Bangle conflict KH1-C01. Verify complete drop conditions, grouped collectibles, tournament seeds and level-choice tables.
- [ ] KH1-R05: Sourced acquisition/farming/encounter summaries now exist. Expand remaining room routes, activity tutorials, boss strategies and Gummi builds into self-contained practical guides.
- [ ] KH1-R06: Modern stacking and specific missability examples are sourced. Verify all record-level availability and restricted-run edge cases; resolve active KH1-C02, C03 and C05 in the research audit. C04's exhaustive narrative manifest requirement is retired by the scope clarification.
- [x] KH1-R07: Produce a sourced planning/completeness report with unresolved records — [2026-09-18 audit](../games/kh1fm/world-and-coverage-audit.md). This reporting task is complete; the content/data gates remain open.

## Engineering queue and validation

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

Current blockers: exhaustive inventories and precise routes still incomplete; four active targeted fact/behavior issues remain in the research audit; the narrative-manifest issue is retired; platform mapping and source reconciliation are incomplete; normalized data/UI are unbuilt; offline model/retrieval behavior is untested. No completion percentage or release date is claimed.

## Accepted app acceptance policy

Use the [shared test plan](../testing-and-content-validation.md): Apple browser, iPhone and iPad initially; Android follow-up. The user plays Steam, but no manual playthrough or in-game verification is required from them. Preserve content accuracy through cited source reconciliation and data/calculation validation. App checks must also verify optional inventory off/on, x/y quantities, no spoiler UI, and no Available Now tracker/filter.
