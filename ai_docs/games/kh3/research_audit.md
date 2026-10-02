# Kingdom Hearts III + Re Mind research-gap audit

Audit date: **2026-10-01**. Repository baseline: **`f933ab1`**, audit branch `research/audit-2026-10-01`. The original sections below are a historical repository-only inventory; live research and implementation dispositions now supersede them. Modern Steam + bundled Re Mind is primary; existing modern-platform distinctions are preserved. Supported corrections are documented in the current ledger.

## Current disposition

**14 partial, 18 resolved, 3 conflicted (35 total).** See [complete resolution/evidence ledger](audit-resolution-2026-10-01.md) and [structured dispositions](audit-dispositions.json). Current canonical counts: 1926 entries + 286 recipe actions. No finding is considered closed merely because examples were added.

## Historical baseline results and scope

**35 deduplicated findings**: 34 open or mixed factual/normalization/extraction findings (KH3-001–KH3-034), plus one primarily researched-but-unintegrated finding (KH3-035). Five historical/resolved ledgers (H01–H05), three provenance/access ledgers (P01–P03), and five nonfactual/excluded-work ledgers (N01–N05) prevent stale caveats being counted as new research. Findings overlap records; do not sum per-finding record counts as unique items.

The complete canonical runtime comprises **617 entries + 39 recipe actions = 656 IDs**. Categories have 245 base chests, 90 emblems, nine Re Mind chests, five Golden Herc figures, 20 photos, 15 gates, 14 DLC encounters, 11 Gummi entries, 12 challenges, 23 score records, five independent Classic acquisitions, 17 equipment/Keyblade entries, 28 cuisine entries, 72 material entries (59 also tagged Ingredients) and 51 achievements. Eighteen chest entries are also Classic Kingdom acquisitions; 13 gate entries are also Reports. These aliases are not additional physical records.

**421 explicit runtime uncertainties**: 343 generic area-only collectible notes, one Toy Box floor conflict (together all 344 numbered base/DLC collectibles), 59 ingredient pickup notes, seven Flan equality notes, six achievement notes and five material-farm notes. There are **16 explicit nulls**, all photo prerequisites; **eight empty arrays**, all material drops. No empty strings, TODO/TBD tokens or other nulls were found in canonical content. Null/empty is inspected contextually, not automatically treated as an unknown.

Read all seven KH3 research files, the specification, readiness and rollout in full, plus the two runtime files. Parsed every JSON object and field recursively; compared category/recipe coverage, key shapes, nulls, empty arrays, placeholders, sources and cross-category aliases. Searched all tracked text for KH3/Kingdom Hearts III/Re Mind and searched caveat wording beyond those hits. Appendix B preserves all substantive research/spec/readiness/rollout prose and table-status occurrences, including resolved assertions; Appendix A enumerates every runtime object with exact line/field references, so repeated hedge records are never hidden behind “etc.”

Shared review included `ai_docs/testing-and-content-validation.md`, `ai_docs/sources/khtables-drive-audit.md`, `ai_docs/research/parallel-game-research.md`, `ai_docs/02-content-inventory.md`, shared acquisition/synthesis/readiness contracts, `ai_docs/implementation/multi-game-rollout.md`, `src/games/types.ts`, `src/games/registry.ts`, `src/games/GuideJournal.tsx`, `src/games/profile.ts`, `tests/multi-game.test.ts`, and `tests/e2e/multi-game.spec.ts`. Registry loads the canonical content through `src/games/kh3.ts`; no tracked KH3 generator, legacy dataset or independently maintained production duplicate was found. Other-game files containing KH3D/DDD or cross-game comparison/source-manifest labels are not KH3 content. Generated/binary app/assets/test output are not independent research occurrences; canonical mapping is runtime bundle → `src/games/kh3.ts` → `src/games/kh3/content.json`. Historical source snapshots/Drive claims are assessed as recorded, not re-fetched.

Per `ai_docs/testing-and-content-validation.md:5`–`13` and `:37`–`39`, content validation is not a user playthrough gate. Old “test in-game/fresh save” language below means resolve a specific mechanic with reliable evidence; lack of hands-on verification alone is not an open finding. Missing images, app behavior, styling, browser/hardware acceptance and Data Jiminy work are separated below.

## Deduplicated factual and content findings

### KH3-001 — Base chest and emblem routes

**Current status (2026-10-01): partial.** Systematically reconciled all 335 base records with eleven complete numbered PowerPyx world guides and targeted GamerGuides checks. Added directions to 64 empty records and four reward-only Classic Kingdom records; 82 directions added/expanded/corrected overall, including the two San Fransokyo eastern-tower corrections. All 245 chests and 90 emblems have pickup landmarks, stable IDs and per-record guide provenance. Added post-clear recovery, explicit camera/night/story gates and Sandbar lagoon approach. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-001--partial) and [current ledger](audit-resolution-2026-10-01.md#kh3-001--partial).

**Historical baseline scope and evidence:**

For 245 base chests and 90 emblems, supply landmark/save-point approaches, actions/camera alignment, earliest access, ability requirements and revisit conditions. Area/number alone is insufficient. Separate modern journal-number reconciliation from already validated contiguous source counts.

**Evidence / occurrences:** `ai_docs/games/kh3/collectible-inventory.md:3`; `ai_docs/games/kh3/collectible-inventory.md:534`; `ai_docs/readiness/kingdom-hearts-iii.md:23`; `ai_docs/readiness/kingdom-hearts-iii.md:24`; `ai_docs/implementation/kh3-rollout.md:33`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** KHWiki world tables and Lucky Emblem page already cited; original route text remains absent. Runtime ledger enumerates 335 records, including KH3-003 overlap.

### KH3-002 — Modern English names and journal aliases

**Current status (2026-10-01): partial.** Preserved stable IDs and searchable Trial/Trail, Horseshoe Isle/Island, Petit/Petite and Bandana/Bandanna aliases; corrected source typographical material/equipment names. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-002--partial) and [current ledger](audit-resolution-2026-10-01.md#kh3-002--partial).

**Historical baseline scope and evidence:**

Reconcile Trial/Trail of Valediction, Horseshoe Isle/Island, Petit/Petite Ribbon, Bandana/Bandanna and Strength/Power labels against modern English Steam UI/source evidence; ingredient regional/romanization aliases also were omitted. Preserve aliases without silently changing stable IDs.

**Evidence / occurrences:** `ai_docs/games/kh3/collectible-inventory.md:29`; `ai_docs/games/kh3/workshop-and-equipment.md:103`; `ai_docs/games/kh3/sources-and-conflicts.md:90`; `ai_docs/games/kh3/cuisine-and-records.md:25`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** KH3-C07 remains open. Appendix A retains all runtime name/area occurrences matching these aliases. No wholesale title uncertainty is inferred.

### KH3-003 — Toy Box Lucky Emblem 8 floor/camera position

**Current status (2026-10-01): resolved.** Independent guides agree: use the 3F bench to reach the hanging red-and-white UFO and photograph its hatch. Replaced the conflicting runtime floor note. Full evidence and residual: [current ledger](audit-resolution-2026-10-01.md#kh3-003--resolved).

**Historical baseline scope and evidence:**

Is the valid camera standing position on 2F or 3F, and is the apparent disagreement a target-floor versus camera-floor distinction? Preserve hanging-UFO landmark.

**Evidence / occurrences:** `ai_docs/games/kh3/collectible-inventory.md:170`; `ai_docs/games/kh3/collectible-inventory.md:526`; `ai_docs/games/kh3/sources-and-conflicts.md:85`; `ai_docs/readiness/kingdom-hearts-iii.md:24`; `ai_docs/games/kingdom-hearts-iii.md:188`; `ai_docs/implementation/kh3-rollout.md:33`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** KH3-C02: Lucky Emblem page versus Toy Box world table; runtime kh3.base.toy-box.emblem.008 explicitly preserves conflict.

### KH3-004 — Re Mind nine chest routes and episode/save boundaries

**Current status (2026-10-01): partial.** All nine Re Mind chest routes integrated. Added separate-episode save guidance, console alternate-load controls, same-DLC-save base progression and warning to preserve Re Mind Scala before Limitcut overwrite. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-004--partial) and [current ledger](audit-resolution-2026-10-01.md#kh3-004--partial).

**Historical baseline scope and evidence:**

For all nine Scala chests supply full routes and determine post-episode availability, replay missability, overwrite behavior, selected cleared-save start flow and whether later base gains transfer to DLC. Verify Re Mind/Limitcut/Secret resume controls and platform-specific save lineage; do not infer from separate IDs.

**Evidence / occurrences:** `ai_docs/games/kh3/collectible-inventory.md:513`; `ai_docs/games/kh3/collectible-inventory.md:534`; `ai_docs/games/kh3/editions-and-dlc.md:39`; `ai_docs/games/kh3/editions-and-dlc.md:40`; `ai_docs/games/kh3/editions-and-dlc.md:65`; `ai_docs/readiness/kingdom-hearts-iii.md:26`; `ai_docs/readiness/kingdom-hearts-iii.md:34`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Scala source notes empty (sources-and-conflicts.md:48). Runtime all nine are area-only; implemented IDs/categories do not establish save semantics. No user playthrough gate.

### KH3-005 — Forest Clasp exact missability trigger

**Current status (2026-10-01): conflicted.** Retained four activities and conservative completion before first Shore visit, distinct from the nonmissable Rapunzel photo. Forest Clasp stats integrated. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-005--conflicted) and [current ledger](audit-resolution-2026-10-01.md#kh3-005--conflicted).

**Historical baseline scope and evidence:**

Does the four-activity reward close on first reaching Shore, when Rapunzel leaves, or another trigger? Clarify sequence/access for dandelions, pond, rabbits and birds. Current conservative pre-Shore guidance is a mitigation, not resolution.

**Evidence / occurrences:** `ai_docs/games/kh3/collectible-inventory.md:530`; `ai_docs/games/kh3/sources-and-conflicts.md:86`; `ai_docs/games/kh3/gummi-and-optional.md:33`; `ai_docs/readiness/kingdom-hearts-iii.md:44`; `ai_docs/readiness/kingdom-hearts-iii.md:83`; `src/games/kh3.ts:8`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** KH3-C03, Forest Clasp item and Corona world pages. kh3.equipment.forest-clasp.missability retains discrepancy; photo 20 is explicitly a separate nonmissable objective.

### KH3-006 — Frozen Slider ten prize routes and persistence

**Current status (2026-10-01): resolved.** Added ten individually checkable Slider prize routes. Completion of the run retains prizes; ten cannot all be collected in one run. Corrected translated reward names to Orichalcum+ and Master Treasure Magnet. Full evidence and residual: [current ledger](audit-resolution-2026-10-01.md#kh3-006--resolved).

**Historical baseline scope and evidence:**

Enumerate all ten prize IDs and exact path choices, replay approach, finish/run-end save behavior and reward redemption; no ten-prize records exist. 500,000 rank and 600,000 trophy thresholds are already distinguished.

**Evidence / occurrences:** `ai_docs/games/kh3/cuisine-and-records.md:59`; `ai_docs/games/kh3/collectible-inventory.md:25`; `ai_docs/games/kh3/collectible-inventory.md:534`; `ai_docs/readiness/kingdom-hearts-iii.md:25`; `ai_docs/implementation/kh3-rollout.md:33`; `src/games/kh3.ts:10`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Frozen Slider page is existing lead. The single kh3.challenges.frozen-slider score entry and Orichalcum+ prose do not represent ten collectible paths.

### KH3-007 — Photo Missions camera routes and unlock milestones

**Current status (2026-10-01): resolved.** All 20 unlock milestones and actionable target/save-point approaches; camera acknowledgment, success notification, twelve teammate identities, Zeus statue alternative, day/night and Demon Tower gate constraints. Corrected preliminary robot/cactuar floor assignments against the independent guide. Full evidence and residual: [current ledger](audit-resolution-2026-10-01.md#kh3-007--resolved).

**Historical baseline scope and evidence:**

All 20 need concrete target locations, accepted poses/aiming/actions and complete unlock milestones; mission 20 lacks the enumerated twelve teammate subjects. Sixteen prerequisites are null; null does not certify no prerequisite. Zeus alternative and some timing facts are researched but absent from affected rows.

**Evidence / occurrences:** `ai_docs/games/kh3/workshop-and-equipment.md:15`; `ai_docs/games/kh3/workshop-and-equipment.md:40`; `ai_docs/games/kh3/sources-and-conflicts.md:56`; `ai_docs/implementation/kh3-rollout.md:35`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Photo Missions and Synthesis source rows were inspected; runtime 20 summaries only say Photograph [subject]. Four prerequisites retain night/day/Demon Tower/Rapunzel facts. Appendix A enumerates every row/null.

### KH3-008 — Complete synthesis recipe catalogue

**Current status (2026-10-01): resolved.** Full 88-output recipe catalog, exact quantities and unlocks, explicit + variants, 88 separate synthesis-history records. Recipe materials resolve to canonical entries. Corrected Hungry Shield typo to Hungry Shard and Acrisis to Acrisius. Full evidence and residual: [current ledger](audit-resolution-2026-10-01.md#kh3-008--resolved).

**Historical baseline scope and evidence:**

Enumerate exact modern output total and every recipe input/quantity/unlock/variant relation, including photo recipes and synthesized equipment; define synthesis-history completion. Only Ultima is a Synthesis recipe; cooking 28 and Kingdom Key forge 10 do not close this gap.

**Evidence / occurrences:** `ai_docs/games/kh3/workshop-and-equipment.md:99`; `ai_docs/games/kh3/sources-and-conflicts.md:57`; `ai_docs/readiness/kingdom-hearts-iii.md:27`; `ai_docs/implementation/kh3-rollout.md:33`; `ai_docs/games/kingdom-hearts-iii.md:42`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Synthesis and individual product pages. The kh3.achievement.synthesist summary is not an exact recipe inventory; avoid treating all 39 actions as synthesis recipes.

### KH3-009 — Collector Goals and material discovery thresholds

**Current status (2026-10-01): resolved.** All 78 numbered Collector Goals: 24 recipe unlocks, 24 direct item rewards and 30 material shop unlocks, with reward type and menu order. Includes first-material Ether item reward, cumulative/rarity/family rewards and Sinister shop thresholds. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-009--resolved) and [current ledger](audit-resolution-2026-10-01.md#kh3-009--resolved).

**Historical baseline scope and evidence:**

Extract all 24 inspected material-type unlock rows, every Collector Goal, recipe unlocking condition and shop stock threshold. Ultima at 58 types alone cannot represent the complete discovery/reward ladder.

**Evidence / occurrences:** `ai_docs/games/kh3/workshop-and-equipment.md:7`; `ai_docs/games/kh3/workshop-and-equipment.md:100`; `ai_docs/games/kh3/sources-and-conflicts.md:57`; `ai_docs/games/kingdom-hearts-iii.md:50`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Synthesis source is located/partly inspected; no dedicated Collector Goal records exist. This includes completion denominators, not merely a new UI control.

### KH3-010 — Complete synthesis material identities and sources

**Current status (2026-10-01): partial.** All 60 material identities and KHIII acquisition/drop data; ordinary Orichalcum has a separate ID, retaining the old Orichalcum+ ID. Added shop thresholds and selected gate farm approaches. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-010--partial) and [current ledger](audit-resolution-2026-10-01.md#kh3-010--partial).

**Historical baseline scope and evidence:**

Enumerate every material family/rank and alternative chest/shop/enemy/Gummi sources with unlock/rate conditions. Runtime has 13 synthesis/forge material records; five are acquisition placeholders (Lucid Crystal, Pulsing Crystal, Wellspring Shard/Stone/Gem), and Damascus/Adamantite have only coarse chest prose. Ordinary Orichalcum has no dedicated row; kh3.material.orichalcum is actually Orichalcum+.

**Evidence / occurrences:** `ai_docs/games/kh3/workshop-and-equipment.md:100`; `ai_docs/readiness/kingdom-hearts-iii.md:27`; `ai_docs/implementation/kh3-rollout.md:26`; `ai_docs/implementation/kh3-rollout.md:33`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Wellspring, Lucid, Pulsing, Damascus, Adamantite, Orichalcum and other item pages are leads already in runtime/docs. Appendix A lists all 13 and eight empty drops arrays; non-enemy one-time Orichalcum+ having no drops is intentional.

### KH3-011 — Farm mechanics, rate modifiers and postcard acquisition

**Current status (2026-10-01): partial.** Lucky Strike multiplier 1 + 0.3 × active-party copies, repeat gate routes for five crystals, shop-visit postcard lottery and Twilight mailbox; no repeatable Orichalcum+ claim. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-011--partial) and [current ledger](audit-resolution-2026-10-01.md#kh3-011--partial).

**Historical baseline scope and evidence:**

Determine Lucky Strike stacking and rate conditions, practical repeatable encounter/asteroid reset routes and evidence for farming efficiency where recommended. Explain obtaining/mailing Prize Postcards and their random reward conditions; no guaranteed repeatable Orichalcum+ farm is established.

**Evidence / occurrences:** `ai_docs/games/kh3/workshop-and-equipment.md:58`; `ai_docs/games/kh3/workshop-and-equipment.md:66`; `ai_docs/games/kh3/workshop-and-equipment.md:72`; `ai_docs/games/kh3/sources-and-conflicts.md:61`; `ai_docs/games/kingdom-hearts-iii.md:102`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Published selected base rates exist; absence of hands-on tests does not invalidate those rates. Remaining gap is modifiers, actionable farm routes and unsupported best-farm claims, not mandatory gameplay verification of every drop.

### KH3-012 — Every Keyblade forge ladder, properties and actions

**Current status (2026-10-01): resolved.** 22 blade catalogs: initial level, all eleven STR/MAG levels, abilities/forms/shotlocks and 220 source transitions. 160 ordinary Steam forge actions plus ten distinct NG+ Ultima actions; other-platform keys are reference-only. Full evidence and residual: [current ledger](audit-resolution-2026-10-01.md#kh3-012--resolved).

**Historical baseline scope and evidence:**

Supply each applicable blade’s initial level, every transition/cost, STR/MAG/abilities, formchanges and shotlocks. Kingdom Key ten-step fixture is implemented; never generalize it to all blades. Core NG+ Ultima mode remains KH3-034.

**Evidence / occurrences:** `ai_docs/games/kh3/workshop-and-equipment.md:93`; `ai_docs/games/kh3/workshop-and-equipment.md:101`; `ai_docs/readiness/kingdom-hearts-iii.md:28`; `ai_docs/implementation/kh3-rollout.md:25`; `ai_docs/implementation/kh3-rollout.md:33`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Kingdom Key/Ultima/item pages. Appendix A enumerates all 16 acquisition anchors and ten forge steps; none supplies a full per-blade properties graph.

### KH3-013 — Complete non-Keyblade equipment and acquisition alternatives

**Current status (2026-10-01): partial.** 128 new non-Keyblade equipment records plus existing Forest Clasp with stats/acquisition; 25 encounter/party weapon references separated from collectable ownership. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-013--partial) and [current ledger](audit-resolution-2026-10-01.md#kh3-013--partial).

**Historical baseline scope and evidence:**

Enumerate Donald staves, Goofy shields, armor/accessories, stats/abilities and every chest/shop/synthesis/reward alternative including Re Mind. Forest Clasp alone is an equipment row; item names embedded in chest rewards are insufficient. Preserve character applicability, including encounter-specific temporary characters.

**Evidence / occurrences:** `ai_docs/games/kh3/workshop-and-equipment.md:93`; `ai_docs/games/kh3/workshop-and-equipment.md:102`; `ai_docs/readiness/kingdom-hearts-iii.md:28`; `ai_docs/implementation/kh3-rollout.md:33`; `ai_docs/games/kingdom-hearts-iii.md:55`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** World reward tables and individual equipment pages; 13 Limitcut first-clear reward names exist but do not provide equipment stats or alternative sources.

### KH3-014 — Platform-exclusive Keyblade entitlement catalogue

**Current status (2026-10-01): partial.** Steam Dead of Night is included; five other shipped platform-exclusive blades have full properties and reference-only eligibility. PS5/Xbox Series changes are explicitly future on audit date. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-014--partial) and [current ledger](audit-resolution-2026-10-01.md#kh3-014--partial).

**Historical baseline scope and evidence:**

Add Steam Dead of Night (officially researched but absent runtime); reconcile current/historical entitlement acquisition for Midnight Blue, Phantom Green, Dawn Till Dusk, Elemental Encoder and Advent Red. Keep advertised Long Night/future native bonuses dated and separate. Do not combine platform exclusives into a universal denominator.

**Evidence / occurrences:** `ai_docs/games/kh3/editions-and-dlc.md:12`; `ai_docs/games/kh3/editions-and-dlc.md:18`; `ai_docs/games/kh3/editions-and-dlc.md:20`; `ai_docs/games/kh3/sources-and-conflicts.md:24`; `ai_docs/games/kh3/sources-and-conflicts.md:26`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Official Steam product/Square Enix collection and target storefront readbacks are existing leads. Absence of a Dead of Night entry is integration work; unresolved historical storefront predicates are research.

### KH3-015 — 59 ingredient pickup/farming routes and shop availability

**Current status (2026-10-01): partial.** Reprocessed 298 world ingredient rows, preserving alternate yields and quantities; 51 ordinary ingredients have object/area sources. Eight reward-only ingredients remain linked to Flan/Hunny minigames; all 59 identities retained. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-015--partial) and [current ledger](audit-resolution-2026-10-01.md#kh3-015--partial).

**Historical baseline scope and evidence:**

For all 59 material-category ingredient records map each pickup to world/area/object/position, replenishment/farm route, minigame reward tier and shop unlock/stock rule. Generic Buy ... when stocked prices do not specify availability. Preserve ingredient alias migration and source-page changes.

**Evidence / occurrences:** `ai_docs/games/kh3/cuisine-and-records.md:25`; `ai_docs/games/kh3/cuisine-and-records.md:29`; `ai_docs/games/kh3/sources-and-conflicts.md:43`; `ai_docs/games/kh3/sources-and-conflicts.md:63`; `ai_docs/readiness/kingdom-hearts-iii.md:29`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Ingredients and world ingredient tables; 106 Caribbean source rows were not individually validated. September 20 added area lists/prices, not exact routes. All 59 uncertainty occurrences enumerated in Appendix A.

### KH3-016 — Cuisine stats, meal bonuses and cooking success guidance

**Current status (2026-10-01): resolved.** 56 normal/+ dish effects, five course assignments, six cumulative full-course bonus pools/durations, four original cooking-control guides and ingredient consumption/Chef Extraordinaire behavior. Existing 28 recipes retained. Full evidence and residual: [current ledger](audit-resolution-2026-10-01.md#kh3-016--resolved).

**Historical baseline scope and evidence:**

Supply normal/+ dish effects, course assignments as structured data, complete meal-bonus catalogue, stacking/duration rules, precise success/control guidance and failure consumption where not already documented. Recipe quantities and Classic/Special assignment are now implemented (H02), not remaining unknowns.

**Evidence / occurrences:** `ai_docs/games/kh3/cuisine-and-records.md:19`; `ai_docs/games/kh3/cuisine-and-records.md:21`; `ai_docs/games/kh3/sources-and-conflicts.md:65`; `ai_docs/readiness/kingdom-hearts-iii.md:29`; `ai_docs/games/kingdom-hearts-iii.md:68`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Cuisine/Le Grand Bistrot tables; all 28 runtime cuisine rows and cooking recipes are enumerated with missing effect model in Appendix A.

### KH3-017 — Four versus five cooking minigames

**Current status (2026-10-01): resolved.** Four cooking methods identified and documented: chopping, egg cracking, flambé and pepper grinding. Five is the number of meal courses, not cooking controls. Full evidence and residual: [current ledger](audit-resolution-2026-10-01.md#kh3-017--resolved).

**Historical baseline scope and evidence:**

Resolve source disagreement: Synthesis says five, Bistrot describes four. Runtime currently uses four named methods; that is consistent with preferred Bistrot evidence but no documented conflict-resolution citation supersedes KH3-C06.

**Evidence / occurrences:** `ai_docs/games/kh3/sources-and-conflicts.md:64`; `ai_docs/games/kh3/sources-and-conflicts.md:89`; `ai_docs/implementation/kh3-rollout.md:11`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** KH3-C06; four runtime methods are Crack the Egg, Chop the Ingredients, Grind the Pepper and Flambé the Food. Keep control-guide verification separate from implemented ingredients.

### KH3-018 — Flantastic Seven exact equality and complete reward/access rules

**Current status (2026-10-01): conflicted.** All seven lower/upper reward tiers, routes, post-world access, first-time abilities and repeat fruit; safe aim-above wording remains. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-018--conflicted) and [current ledger](audit-resolution-2026-10-01.md#kh3-018--conflicted).

**Historical baseline scope and evidence:**

Verify equality at seven printed strict upper thresholds; preserve lower-tier rewards, exact routes, Honeydew night access and first-time versus repeated ingredient/ability behavior. Do not equate attempted/completed minigame with upper-tier Orichalcum+ qualification.

**Evidence / occurrences:** `ai_docs/games/kh3/cuisine-and-records.md:33`; `ai_docs/games/kh3/cuisine-and-records.md:45`; `ai_docs/games/kh3/sources-and-conflicts.md:88`; `ai_docs/readiness/kingdom-hearts-iii.md:31`; `ai_docs/games/kingdom-hearts-iii.md:188`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** KH3-C05; seven runtime threshold uncertainty rows enumerate Cherry 20k, Strawberry 17k, Orange 23k, Banana 20k, Grape 20k, Watermelon 28k, Honeydew 15k. Equality is not silently converted to >=.

### KH3-019 — Classic Kingdom first score/minimum predicates and instructions

**Current status (2026-10-01): resolved.** 23 original controls/play descriptions, any registered result rather than an invented high-score target, golf lower-is-better distinction, completion-stamp check. Acquisition stays joined to 18 chest IDs plus five Twilight records. Full evidence and residual: [current ledger](audit-resolution-2026-10-01.md#kh3-019--resolved).

**Historical baseline scope and evidence:**

Determine exact first-record/minimum-score behavior for all 23 games and Classic Tone/Classically Trained; author each minigame’s original controls/success guidance. Five poster/story acquisition summaries need actionable poster identification. Do not import Union χ promo targets.

**Evidence / occurrences:** `ai_docs/games/kh3/cuisine-and-records.md:65`; `ai_docs/games/kh3/cuisine-and-records.md:93`; `ai_docs/readiness/kingdom-hearts-iii.md:30`; `ai_docs/implementation/kh3-rollout.md:20`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Classic Kingdom and Steam; 23 score entries only say set a high score. Acquisition identities/chest aliases are implemented and remain independent from score completion.

### KH3-020 — Comprehensive minigame reward tables and strategies

**Current status (2026-10-01): partial.** Full published five-course rank/reward tables, two harvest rank/quantity tables, independent Hunny 20k/40k/60k honey quantities and all eight score-record units. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-020--partial) and [current ledger](audit-resolution-2026-10-01.md#kh3-020--partial).

**Historical baseline scope and evidence:**

Complete 100 Acre Wood vegetable/fruit/flower records, ingredients/reward tiers and access; comprehensive Verum Rex, Festival Dance, Flash Tracer and Frozen Slider reward/strategy tables beyond five A-rank/trophy comparisons.

**Evidence / occurrences:** `ai_docs/games/kh3/cuisine-and-records.md:61`; `ai_docs/games/kh3/sources-and-conflicts.md:67`; `ai_docs/readiness/kingdom-hearts-iii.md:31`; `ai_docs/implementation/kh3-rollout.md:33`; `ai_docs/games/kingdom-hearts-iii.md:95`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Existing individual minigame pages; five score comparisons are source-backed partial coverage. Frozen Slider collectible paths are separately KH3-006.

### KH3-021 — Full Game Records and Adversaries predicates

**Current status (2026-10-01): resolved.** 81 base adversaries and complete 54 Game Records: 29 shotlocks, five attractions, five links, seven Flan results and eight other minigames. Corrected Munny Popcat typo; omitted source prose incorrectly conflating shotlocks with formchange gauge. Full evidence and residual: [current ledger](audit-resolution-2026-10-01.md#kh3-021--resolved).

**Historical baseline scope and evidence:**

Enumerate all Game Records units (combat actions, shotlocks, links, attractions and other requirements), exact thresholds and adversary identity/location coverage. Determine complete denominators for One for the Books/Know Thine Enemy; current achievement summaries do not supply inventories. Narrative character/glossary unlocks are excluded from completion gates.

**Evidence / occurrences:** `ai_docs/games/kh3/cuisine-and-records.md:97`; `ai_docs/games/kingdom-hearts-iii.md:74`; `ai_docs/games/kingdom-hearts-iii.md:78`; `ai_docs/readiness/kingdom-hearts-iii.md:31`; `ai_docs/implementation/kh3-rollout.md:33`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Research pack explicitly requires extraction; runtime has no bestiary or comprehensive Game Records category. Reference/search character content is a separate scope, not a missing story checklist.

### KH3-022 — Other world reward quantities and repeatability

**Current status (2026-10-01): partial.** 222/333 Sora copy +5 HP rewards, Olympus rescue rewards, nine Leviathan levels with cumulative white-crab requirements, Black Pearl access and 14 naval fleet reward rows. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-022--partial) and [current ledger](audit-resolution-2026-10-01.md#kh3-022--partial).

**Historical baseline scope and evidence:**

Resolve Final World extra Sora-copy HP reward counts/triggers/replayability, Olympus rescue rewards and Caribbean white-crab/Leviathan levels, ship combat, Treasure Ship and Black/Ghost Ship fleet rewards. Provide separate units and acquisition methods.

**Evidence / occurrences:** `ai_docs/games/kh3/gummi-and-optional.md:35`; `ai_docs/games/kh3/gummi-and-optional.md:69`; `ai_docs/games/kh3/cuisine-and-records.md:61`; `ai_docs/readiness/kingdom-hearts-iii.md:25`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** World gameplay pages already cited. Runtime Dreadnought/True Captain achievements provide broad goals only; Caribbean naval content is not Gummi.

### KH3-023 — Battlegate encounter routes and repeat rewards

**Current status (2026-10-01): resolved.** All 15 gate approaches, level/difficulty/enemy counts, first-clear vs repeat drops, infinite adds for gates 2/8/11, selfie thresholds and original Dark Inferno defensive/punish guide. Full evidence and residual: [current ledger](audit-resolution-2026-10-01.md#kh3-023--resolved).

**Historical baseline scope and evidence:**

Supply concrete gate approaches, encounter enemies/actions, repeat-clear reward semantics and practical farm/Dark Inferno strategy. Distinct first-clear reports/equipment exist; selfie thresholds 5/10/14 are researched but unintegrated.

**Evidence / occurrences:** `ai_docs/games/kh3/gummi-and-optional.md:7`; `ai_docs/games/kh3/gummi-and-optional.md:27`; `ai_docs/games/kh3/gummi-and-optional.md:68`; `ai_docs/readiness/kingdom-hearts-iii.md:32`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Battlegate/world tables; runtime 15 entries merely Clear the encounter at [area]. Report aliases correctly share 13 gate IDs. Do not treat absent hands-on combat testing alone as research failure.

### KH3-024 — Gummi full battle/treasure/sphere/fragment/part inventory

**Current status (2026-10-01): partial.** 33 battles, nine spheres/gear sequences, 374 parts and 52 blueprints, plus all 45 physical fragments with 90 inspected images. All 45 fragments have written approaches, including independently identified STR-13 sphere VII/η landmark. A wrong-zone STR-04 overview image is explicitly rejected. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-024--partial) and [current ledger](audit-resolution-2026-10-01.md#kh3-024--partial).

**Historical baseline scope and evidence:**

Normalize all 10/17/6 map battle entries, rank-dependent treasures, nine sphere positions/contents, every fragment and normal/special blueprint, parts/weapons and acquisition alternative. Determine category totals; 20 unique treasures is only an achievement target.

**Evidence / occurrences:** `ai_docs/games/kh3/gummi-and-optional.md:39`; `ai_docs/games/kh3/gummi-and-optional.md:60`; `ai_docs/games/kh3/gummi-and-optional.md:64`; `ai_docs/games/kh3/gummi-and-optional.md:65`; `ai_docs/games/kh3/sources-and-conflicts.md:70`; `ai_docs/implementation/kh3-rollout.md:33`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Starlight Way/Misty Stream/Eclipse/Gummi Missions; only nine constellations and two bosses appear in runtime. Zero dedicated sphere/fragment/treasure entries.

### KH3-025 — Complete Gummi Missions and final completion rule

**Current status (2026-10-01): resolved.** All 46 Gummi mission identities with predicates/rewards. Nine constellation records reused, avoiding duplicate collection units. Completionist requires all other 45 missions. Full evidence and residual: [current ledger](audit-resolution-2026-10-01.md#kh3-025--resolved).

**Historical baseline scope and evidence:**

Extract complete mission/reward ladders and resolve opaque Gummi Ship Completionist predicate. Partial waypoint/world/kill/weapon/sphere ladders and zone fragment rewards are researched but unintegrated.

**Evidence / occurrences:** `ai_docs/games/kh3/gummi-and-optional.md:49`; `ai_docs/games/kh3/gummi-and-optional.md:66`; `ai_docs/games/kh3/sources-and-conflicts.md:71`; `ai_docs/readiness/kingdom-hearts-iii.md:33`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Gummi Missions is successfully inspected lead; guessed Gummi_Missions_(KHIII) failed. Do not infer final predicate from mission name.

### KH3-026 — Nine constellation flight/camera routes

**Current status (2026-10-01): resolved.** Nine constellation flight landmarks and camera framing guidance, joined to mission completion/blueprint rewards. Omega supplemented because the first guide omits its text section. Full evidence and residual: [current ledger](audit-resolution-2026-10-01.md#kh3-026--resolved).

**Historical baseline scope and evidence:**

Replace coarse lower-right/upper-left positions with textual approach and camera alignment for every constellation. Associated blueprint names are sourced; missing art is not the reason text routes are missing.

**Evidence / occurrences:** `ai_docs/games/kh3/gummi-and-optional.md:47`; `ai_docs/readiness/kingdom-hearts-iii.md:33`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Nine runtime gummi.*-constellation summaries enumerated in Appendix A; zone pages/Gummi Missions are leads.

### KH3-027 — Gummi acquisition build constraints and boss guidance

**Current status (2026-10-01): partial.** 19 Gummi abilities, 374 part properties, all 13 special weapons with damage/recharge/effects/unlocks, Teeny block-sharing guidance and level 99 base cost 1,000. First-clear guidance and a separately identified community-supported A-rank Schwarzgeist replay route are integrated. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-027--partial) and [current ledger](audit-resolution-2026-10-01.md#kh3-027--partial).

**Historical baseline scope and evidence:**

Supply editor cost/level/ability constraints and actionable ship/boss strategy where acquisition requires them; establish rank rewards and Schwarzgeist A-rank merit criteria. Speed >=200 and Omega other-five-battles unlock are sourced, not open questions.

**Evidence / occurrences:** `ai_docs/games/kh3/gummi-and-optional.md:55`; `ai_docs/games/kh3/gummi-and-optional.md:56`; `ai_docs/games/kh3/gummi-and-optional.md:67`; `ai_docs/games/kh3/sources-and-conflicts.md:72`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Schwarzgeist/Omega/zone pages; calculator implementation/fixture testing is N02, distinct from missing game constraints.

### KH3-028 — DLC encounter and creative-mode access guidance

**Current status (2026-10-01): resolved.** 14 encounter-specific original defensive/opening guides, 11→13 unlock order and rewards, temporary character equipment references; Data Greeting/Slideshow access and Secret-clear Quadratum unlock kept non-collectible. Full evidence and residual: [current ledger](audit-resolution-2026-10-01.md#kh3-028--resolved).

**Historical baseline scope and evidence:**

Provide encounter-specific acquisition guidance for 13 data fights/Yozora, relevant playable-character abilities/choices and difficulty/PRO-code interactions. Document Data Greeting/Slideshow unlock/access without invented completion totals. Known XI-to-Xion/Master Xehanort and XIII-to-Yozora locks and rewards are implemented.

**Evidence / occurrences:** `ai_docs/games/kh3/editions-and-dlc.md:32`; `ai_docs/games/kh3/editions-and-dlc.md:43`; `ai_docs/games/kh3/editions-and-dlc.md:65`; `ai_docs/readiness/kingdom-hearts-iii.md:34`; `ai_docs/games/kingdom-hearts-iii.md:103`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Re Mind/Recreated Data/official DLC. 14 runtime encounters give defeat/prerequisite/reward only; actual save-flow research is KH3-004.

### KH3-029 — Premium Menu code/merit/achievement eligibility tables

**Current status (2026-10-01): partial.** All 28 code effects, all 9 merit predicates and explicit unlock stages, Gummi Meister permanence and 34 PRO boss scores are integrated. EZ menu access need only be unlocked; no active EZ code is required except Survival, which requires Survival on and other EZ battle codes off. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-029--partial) and [current ledger](audit-resolution-2026-10-01.md#kh3-029--partial).

**Historical baseline scope and evidence:**

Enumerate all 15 EZ and 13 PRO codes, effects, nine exact merit predicates, Survival active-code configuration, boss eligibility and trophy blocking. Preserve permanent Gummi Ship Meister effects, per-save unlock mode and Yozora both-menu unlock.

**Evidence / occurrences:** `ai_docs/games/kh3/editions-and-dlc.md:69`; `ai_docs/games/kh3/editions-and-dlc.md:71`; `ai_docs/readiness/kingdom-hearts-iii.md:35`; `ai_docs/implementation/kh3-rollout.md:33`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Premium Menu lead; runtime includes All-rounder/Risk-taker achievement goals but no code/merit records. Some unlock facts are already researched, canonical full table is not.

### KH3-030 — PRO rank ladder and score calculation

**Current status (2026-10-01): conflicted.** All 34 boss base/max scores and 13 rank references, maximum 530,000, A 364,125 corroborated by Steam guide; uncertainty explicit for B. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-030--conflicted) and [current ledger](audit-resolution-2026-10-01.md#kh3-030--conflicted).

**Historical baseline scope and evidence:**

Resolve uncertain rank B, verify A-rank value/source interpretation, all per-boss base points/star multiplier, best-score replacement, repeated-boss aggregation and rounding. Max 530,000 and published A 364,125 do not certify full calculator.

**Evidence / occurrences:** `ai_docs/games/kh3/editions-and-dlc.md:73`; `ai_docs/games/kh3/sources-and-conflicts.md:87`; `ai_docs/readiness/kingdom-hearts-iii.md:35`; `ai_docs/games/kingdom-hearts-iii.md:188`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** KH3-C04; Premium Menu. No runtime PRO calculator exists; missing arithmetic game rule is factual, calculator implementation is N02.

### KH3-031 — Hidden Steam achievements and compound completion predicates

**Current status (2026-10-01): resolved.** All seven hidden Steam achievement predicates populated from independently readable Steam community guide, with explicit description provenance. Full evidence and residual: [current ledger](audit-resolution-2026-10-01.md#kh3-031--resolved).

**Historical baseline scope and evidence:**

Independently confirm The Hearts Joined to His, No Matter What, The Battle to End All (generic placeholders), plus Flanmeister, Thermosphere and Beyond the Curtain (candidate requirements with uncertainty). Confirm Datascraper hidden-description provenance despite absent uncertainty field. Full inventories needed for synthesis/adversaries/Game Records/Gummi goals are other findings.

**Evidence / occurrences:** `ai_docs/games/kh3/cuisine-and-records.md:57`; `ai_docs/games/kh3/editions-and-dlc.md:77`; `ai_docs/games/kh3/sources-and-conflicts.md:25`; `ai_docs/implementation/kh3-rollout.md:13`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** 51 names/visible descriptions implemented; six runtime uncertainty fields persist, not merely three story placeholders. Steam public blanks require independent evidence; existing boss/Flash Tracer research supports candidate gameplay conditions, not Steam readback.

### KH3-032 — Shipped builds/platform sets and transfer details

**Current status (2026-10-01): partial.** Steam/Xbox 51 versus PlayStation 52 including platinum distinction; modern Steam bundle and future 2026-10-08 release/cloud sunset facts are dated. Follow-up evidence and exact remaining boundary: [continuation](research-continuation-2026-10-01.md#kh3-032--partial) and [current ledger](audit-resolution-2026-10-01.md#kh3-032--partial).

**Historical baseline scope and evidence:**

Record relevant modern Steam build metadata; independently read PS/Xbox/Epic trophy/achievement sets and applicability without inferring Steam’s 51. Verify region/platform cloud-to-digital transfer instructions and date-sensitive announced native editions when available. Upcoming builds are not current Steam blockers.

**Evidence / occurrences:** `ai_docs/games/kh3/editions-and-dlc.md:11`; `ai_docs/games/kh3/editions-and-dlc.md:14`; `ai_docs/games/kh3/editions-and-dlc.md:18`; `ai_docs/games/kh3/editions-and-dlc.md:24`; `ai_docs/games/kh3/editions-and-dlc.md:79`; `ai_docs/games/kh3/sources-and-conflicts.md:29`; `ai_docs/readiness/kingdom-hearts-iii.md:36`; `ai_docs/readiness/kingdom-hearts-iii.md:96`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Primary links in edition/source manifest are leads only, not freshly browsed here. Scope date is 2026-10-01; preserve research assertion 2026-10-08 announced/unreleased rather than inventing later verification.

### KH3-033 — Modern synthesis crafted-item checkmarks

**Current status (2026-10-01): resolved.** Crafted-history checkmarks were added in patch 1.04; separate synthesized history is now represented for all 88 recipes. Removed old absence claim from active status. Full evidence and residual: [current ledger](audit-resolution-2026-10-01.md#kh3-033--resolved).

**Historical baseline scope and evidence:**

Confirm modern Steam crafted-item marker behavior/version because Synthesis’s no-checkmarks statement conflicts with console v1.04 patch notes. Treat old claim as stale; this is factual game-UI metadata, not app UI styling.

**Evidence / occurrences:** `ai_docs/games/kh3/workshop-and-equipment.md:11`; `ai_docs/games/kh3/sources-and-conflicts.md:84`; `ai_docs/games/kingdom-hearts-iii.md:188`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** KH3-C01. Runtime does not repeat no-checkmarks claim, so no current false instruction was identified; underlying conflict remains documented.

### KH3-034 — New Game+ carryover and Ultima acquisition-mode levels

**Current status (2026-10-01): resolved.** NG+ keys, proofs, selfie poses and six post-clear abilities, level-zero carryover, ordinary newly synthesized Ultima level10 versus NG+ Ultima level0 and its separate ten-step ladder. Full evidence and residual: [current ledger](audit-resolution-2026-10-01.md#kh3-034--resolved).

**Historical baseline scope and evidence:**

Specify carried Keyblades/Proofs, imported initial levels/upgrades and base/DLC/NG+ lineage. First synthesis gives Ultima level 10 and must not incur level-0 forge costs; that part is implemented. Determine how low-level Ultima upgrade tables apply to NG+ before exposing those costs.

**Evidence / occurrences:** `ai_docs/games/kh3/workshop-and-equipment.md:44`; `ai_docs/games/kh3/workshop-and-equipment.md:101`; `ai_docs/games/kh3/editions-and-dlc.md:24`; `ai_docs/games/kh3/editions-and-dlc.md:26`; `ai_docs/games/kh3/editions-and-dlc.md:65`; `ai_docs/games/kh3/sources-and-conflicts.md:91`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** KH3-C08 partly resolved for first synthesis by recipe instructions; unspecified NG+ import behavior remains. Runtime single-profile limitation is N01.

### KH3-035 — Known reward ladders and relationships missing runtime records

**Current status (2026-10-01): resolved.** Integrated 18 Lucky Emblem rewards, four difficulty-specific secret-movie rules, five Bistrot star rewards, three gate selfie milestones, complete Gummi mission goals and six free-update abilities. Full evidence and residual: [current ledger](audit-resolution-2026-10-01.md#kh3-035--resolved).

**Historical baseline scope and evidence:**

Normalize all Lucky Emblem reward thresholds, Bistrot 4/7/10/14/20 stars and first/third/fifth rewards, Battlegate 5/10/14 selfie rewards, Gummi partial ladders/zone fragment reward relationships and six post-clear free-update abilities. Known snippets need integration; missing full inventories stay in their research findings.

**Evidence / occurrences:** `ai_docs/games/kh3/cuisine-and-records.md:7`; `ai_docs/games/kh3/gummi-and-optional.md:27`; `ai_docs/games/kh3/gummi-and-optional.md:43`; `ai_docs/games/kh3/gummi-and-optional.md:49`; `ai_docs/games/kh3/editions-and-dlc.md:24`; `ai_docs/games/kh3/editions-and-dlc.md:28`; `ai_docs/games/kh3/sources-and-conflicts.md:54`. All repeated runtime occurrences and JSON field names are in Appendix A; further prose repetitions and representative excerpts are in Appendix B.

**Existing leads / resolution evidence:** Runtime retains only selected reward predicates (80 emblems, 90 emblems/Proof, 20 Classic dishes). Existing evidence is not missing research merely because no dedicated structured row exists; ability identities/full emblem reward extraction still needed from cited pages.

## Historical and resolved caveats

| Ledger | Earlier assertion and exact locations | Reconciliation at this baseline |
|---|---|---|
| H01 | “No KH3 data/working page”, “not implementation-ready”, “Specification only”: `ai_docs/games/kh3/README.md:26`; `ai_docs/games/kh3/sources-and-conflicts.md:7`; `ai_docs/games/kingdom-hearts-iii.md:5`; `ai_docs/readiness/kingdom-hearts-iii.md:3`, `:37`; `ai_docs/02-content-inventory.md:40`. | Historical September 18 status. September 20 `ai_docs/implementation/kh3-rollout.md:17`–`29`, `src/games/registry.ts:11` and canonical 656 IDs establish actual implementation. Remaining data gaps still apply. |
| H02 | Eight Special recipes “must be explicitly assigned”, recipe quantities/transcription unverified: `ai_docs/games/kh3/cuisine-and-records.md:19`, `:21`; `ai_docs/games/kh3/sources-and-conflicts.md:64`; `ai_docs/readiness/kingdom-hearts-iii.md:29`; broad recipe gap `ai_docs/games/kingdom-hearts-iii.md:192`. | `ai_docs/implementation/kh3-rollout.md:11`, `:24`, `:41` and all 28 `kh3.cook.*` actions resolve cooking quantities (one each), methods and 20 Classic/8 Special assignment. Cuisine effects/routes remain KH3-015/016. Runtime recipes have no own sources field, addressed in P03. |
| H03 | Grand totals/Classic acquisition identities/Golden Herc routes not all implemented at research time: `ai_docs/games/kh3/collectible-inventory.md:25`; `ai_docs/readiness/kingdom-hearts-iii.md:23`–`30`. | Canonical totals 245/90/9, all 23 Classic acquisitions (18 chest aliases + five independent), five named Herc landmarks, 20 photos, 15 gates and 13 data rewards are now present. Five Herc IDs are explicitly listed in Appendix A. No blanket “Golden Herc locations unknown” finding; exact general route/ability needs only where not established. |
| H04 | Initial synthesized Ultima versus low-level rows; rank versus trophy, code entitlement, Rapunzel photo missability: `ai_docs/games/kh3/sources-and-conflicts.md:91`; `ai_docs/readiness/kingdom-hearts-iii.md:45`–`47`; `ai_docs/games/kh3/workshop-and-equipment.md:40`, `:44`. | Ultima recipe explicitly begins at 10; five score comparisons distinguish achievement/rank; Oathkeeper/Oblivion say free update; photo 20 retains Rapunzel exception. These facts are integrated; NG+ and broader predicates remain open. |
| H05 | “Three hidden story predicates” and platform achievement scope: `ai_docs/implementation/kh3-rollout.md:13`; old all-platform incompleteness `ai_docs/readiness/kingdom-hearts-iii.md:36`. | All 51 Steam names are integrated, but six uncertainty notes remain, of which three have generic story summaries. Datascraper is candidate-sourced without uncertainty, despite `ai_docs/games/kh3/cuisine-and-records.md:57`. Do not report only three remaining achievement concerns or all 51 as missing. |

## Source, provenance and access ledger

| Ledger | Exact occurrences / limits | Consequence |
|---|---|---|
| P01 | `ai_docs/games/kh3/sources-and-conflicts.md:7`–`17`; `ai_docs/sources/khtables-drive-audit.md:13`–`22`, `:47`–`59`; `ai_docs/02-content-inventory.md:29`; `ai_docs/research/parallel-game-research.md:19`. | Ten-file legacy inventory has no dedicated KH3 source; three ambiguous docs scanned 466,933 chars. Four other-game sheets and three explicitly KH2 docs were not wholly re-read. KH3D means DDD. This audit does not claim exhaustive Drive absence or fresh access. |
| P02 | `ai_docs/games/kh3/sources-and-conflicts.md:95` (every failure listed in Appendix B). | PowerPyx collectible/material/Re Mind opens failed; NA press 401 and old DLC URL unrelated; guessed Gummi/NG+ titles failed; Keyblade_Forge and Little_Chef redirect aliases are not corroboration. Existing successful Japanese official/wiki pages are leads. Retrieval failure is not a gameplay contradiction. |
| P03 | `ai_docs/games/kh3/sources-and-conflicts.md:3`, `:29`, `:33`, `:63`–`78`; `ai_docs/games/kh3/README.md:26`; `ai_docs/implementation/kh3-rollout.md:11`–`13`; `src/games/types.ts:16`, `:22`–`29`. | All 617 entries have nonempty sources arrays, but linked URLs do not prove every fact/modern variant. All 39 recipes lack record-level source/date/verification fields (schema does not supply them); citations live in associated entry/research/rollout. Ingredient migration aliases and platform build evidence remain limited. No fresh web verification or gameplay certification is claimed. |

## Nonfactual implementation, testing and exclusions

| Ledger | Exact occurrences | Treatment |
|---|---|---|
| N01 | `ai_docs/implementation/kh3-rollout.md:35`; `ai_docs/games/kingdom-hearts-iii.md:138`–`155`; `ai_docs/readiness/kingdom-hearts-iii.md:62`–`66`. | Single shared game profile, missing save-lineage controls, independent/derived inventory events and coarse generic schema are implementation limits. Actual game save/carryover rules remain KH3-004/034. |
| N02 | `ai_docs/implementation/kh3-rollout.md:37`–`43`; `ai_docs/implementation/multi-game-rollout.md:35`–`41`; `tests/multi-game.test.ts:18`–`33`; `tests/e2e/multi-game.spec.ts:7`–`35`. | Structural catalog tests check IDs/positive inputs, browser checks persistence/fit; they do not prove routes/rates or full inventory. Build/unit/browser outcomes and earlier transient timeouts are app validation, not missing game facts. No tests were run or changed for this documentation-only audit. |
| N03 | `ai_docs/games/kh3/README.md:16`, `:20`, `:22`; `ai_docs/games/kingdom-hearts-iii.md:17`, `:168`–`180`; `ai_docs/readiness/kingdom-hearts-iii.md:14`, `:66`; `ai_docs/implementation/kh3-rollout.md:7`, `:35`; `src/games/kh3.ts:47`; `ai_docs/implementation/ui-ux-review.md:35`. | Digital skin, optional missing images/media, Data Jiminy exclusion and stale iPad acceptance targets are UI/product/asset issues, not research findings. Authoritative shared testing policy sets desktop Chrome/iPhone 17. No mandatory player replay. |
| N04 | `ai_docs/games/kh3/cuisine-and-records.md:65`, `:97`; `ai_docs/games/kh3/editions-and-dlc.md:32`, `:43`, `:65`; `ai_docs/games/kingdom-hearts-iii.md:196`; `ai_docs/research/parallel-game-research.md:9`; `ai_docs/games/kh3/sources-and-conflicts.md:76`. | No Union χ promotional score requirements, narrative/biography completion flags, invented creative-mode totals, concert collectibles, temporary-character duplicate campaigns or old-platform reopening. Future announcements remain dated leads; other-game manifests mentioning KH3 are not KH3 factual records. |
| N05 | `ai_docs/games/kh3/README.md:16`; `ai_docs/games/kh3/workshop-and-equipment.md:9`; `ai_docs/games/kingdom-hearts-iii.md:15`; `ai_docs/readiness/kingdom-hearts-iii.md:16`; `ai_docs/content/synthesis-and-inventory.md:3`, `:8`, `:18`–`22`. | Earlier opt-in inventory/recursive desired-products planning language is superseded by September 20 always-available blank stock and additive direct material targets. This is a stale product contract, not an unresearched game mechanic or missing automatic inventory transaction. |

## Historical Appendix A — exhaustive canonical runtime record/field occurrences

Each row names one actual stable ID and its exact `id` line; parenthetical fields give every evidence field inspected for that finding. All 656 objects are included, including resolved/non-gap records to make coverage checkable. `—` means no additional unresolved issue identified from that row alone, not independent factual certification. Repeated uncertainty text is quoted verbatim; placeholder/null/empty context is explicit. Recipe source absence is structural P03.

| Stable record ID | Exact canonical occurrence / fields | Findings | Representative value / disposition |
|---|---|---|---|
| `kh3.base.olympus.chest.001` | `src/games/kh3/content.json:4`; `summary`:7, `area`:9, `uncertainty`:14, `name`:6, `reward`:15, `sources`:11 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.002` | `src/games/kh3/content.json:18`; `summary`:21, `area`:23, `uncertainty`:28, `name`:20, `reward`:29, `sources`:25 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.003` | `src/games/kh3/content.json:32`; `summary`:35, `area`:37, `uncertainty`:42, `name`:34, `reward`:43, `sources`:39 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.004` | `src/games/kh3/content.json:46`; `summary`:49, `area`:51, `uncertainty`:56, `name`:48, `reward`:57, `sources`:53 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.005` | `src/games/kh3/content.json:60`; `summary`:63, `area`:65, `uncertainty`:70, `name`:62, `reward`:71, `sources`:67 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.006` | `src/games/kh3/content.json:74`; `summary`:77, `area`:79, `uncertainty`:84, `name`:76, `reward`:85, `sources`:81 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.007` | `src/games/kh3/content.json:88`; `summary`:91, `area`:93, `uncertainty`:98, `name`:90, `reward`:99, `sources`:95 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.008` | `src/games/kh3/content.json:102`; `summary`:105, `area`:107, `uncertainty`:112, `name`:104, `reward`:113, `sources`:109 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.009` | `src/games/kh3/content.json:116`; `summary`:119, `area`:121, `uncertainty`:126, `name`:118, `reward`:127, `sources`:123 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.010` | `src/games/kh3/content.json:130`; `summary`:133, `area`:135, `uncertainty`:140, `name`:132, `reward`:141, `sources`:137 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.011` | `src/games/kh3/content.json:144`; `summary`:147, `area`:149, `uncertainty`:154, `name`:146, `reward`:155, `sources`:151 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.012` | `src/games/kh3/content.json:158`; `summary`:161, `area`:163, `uncertainty`:168, `name`:160, `reward`:169, `sources`:165 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.013` | `src/games/kh3/content.json:172`; `summary`:175, `area`:177, `uncertainty`:182, `name`:174, `reward`:183, `sources`:179 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.014` | `src/games/kh3/content.json:186`; `summary`:189, `area`:191, `uncertainty`:196, `name`:188, `reward`:197, `sources`:193 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.015` | `src/games/kh3/content.json:200`; `summary`:203, `area`:205, `uncertainty`:210, `name`:202, `reward`:211, `sources`:207 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.016` | `src/games/kh3/content.json:214`; `summary`:217, `area`:219, `uncertainty`:224, `name`:216, `reward`:225, `sources`:221 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.017` | `src/games/kh3/content.json:228`; `summary`:231, `area`:233, `uncertainty`:238, `name`:230, `reward`:239, `sources`:235 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.018` | `src/games/kh3/content.json:242`; `summary`:245, `area`:247, `uncertainty`:252, `name`:244, `reward`:253, `sources`:249 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.019` | `src/games/kh3/content.json:256`; `summary`:259, `area`:261, `uncertainty`:266, `name`:258, `reward`:267, `sources`:263 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.020` | `src/games/kh3/content.json:270`; `summary`:273, `area`:275, `uncertainty`:280, `name`:272, `reward`:281, `sources`:277 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.021` | `src/games/kh3/content.json:284`; `summary`:287, `area`:289, `uncertainty`:294, `name`:286, `reward`:295, `sources`:291 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.022` | `src/games/kh3/content.json:298`; `summary`:301, `area`:303, `uncertainty`:308, `name`:300, `reward`:309, `sources`:305 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.023` | `src/games/kh3/content.json:312`; `summary`:315, `area`:317, `uncertainty`:322, `name`:314, `reward`:323, `sources`:319 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.024` | `src/games/kh3/content.json:326`; `summary`:329, `area`:331, `uncertainty`:336, `name`:328, `reward`:337, `sources`:333 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.025` | `src/games/kh3/content.json:340`; `summary`:343, `area`:345, `uncertainty`:350, `name`:342, `reward`:351, `sources`:347 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.026` | `src/games/kh3/content.json:354`; `summary`:357, `area`:359, `uncertainty`:364, `name`:356, `reward`:365, `sources`:361 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.027` | `src/games/kh3/content.json:368`; `summary`:371, `area`:373, `uncertainty`:378, `name`:370, `reward`:379, `sources`:375 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.028` | `src/games/kh3/content.json:382`; `summary`:385, `area`:387, `uncertainty`:392, `name`:384, `reward`:393, `sources`:389 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.029` | `src/games/kh3/content.json:396`; `summary`:399, `area`:401, `uncertainty`:406, `name`:398, `reward`:407, `sources`:403 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.030` | `src/games/kh3/content.json:410`; `summary`:413, `area`:415, `uncertainty`:420, `name`:412, `reward`:421, `sources`:417 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.031` | `src/games/kh3/content.json:424`; `summary`:427, `area`:429, `prerequisites`:436, `uncertainty`:434, `name`:426, `reward`:435, `sources`:431 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.chest.032` | `src/games/kh3/content.json:439`; `summary`:442, `area`:444, `uncertainty`:449, `name`:441, `reward`:450, `sources`:446 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.emblem.001` | `src/games/kh3/content.json:453`; `summary`:456, `area`:458, `instructions`:464, `prerequisites`:465, `uncertainty`:463, `name`:455, `sources`:460 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.emblem.002` | `src/games/kh3/content.json:468`; `summary`:471, `area`:473, `instructions`:479, `prerequisites`:480, `uncertainty`:478, `name`:470, `sources`:475 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.emblem.003` | `src/games/kh3/content.json:483`; `summary`:486, `area`:488, `instructions`:494, `prerequisites`:495, `uncertainty`:493, `name`:485, `sources`:490 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.emblem.004` | `src/games/kh3/content.json:498`; `summary`:501, `area`:503, `instructions`:509, `prerequisites`:510, `uncertainty`:508, `name`:500, `sources`:505 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.emblem.005` | `src/games/kh3/content.json:513`; `summary`:516, `area`:518, `instructions`:524, `prerequisites`:525, `uncertainty`:523, `name`:515, `sources`:520 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.emblem.006` | `src/games/kh3/content.json:528`; `summary`:531, `area`:533, `instructions`:539, `prerequisites`:540, `uncertainty`:538, `name`:530, `sources`:535 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.emblem.007` | `src/games/kh3/content.json:543`; `summary`:546, `area`:548, `instructions`:554, `prerequisites`:555, `uncertainty`:553, `name`:545, `sources`:550 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.emblem.008` | `src/games/kh3/content.json:558`; `summary`:561, `area`:563, `instructions`:569, `prerequisites`:570, `uncertainty`:568, `name`:560, `sources`:565 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.emblem.009` | `src/games/kh3/content.json:573`; `summary`:576, `area`:578, `instructions`:584, `prerequisites`:585, `uncertainty`:583, `name`:575, `sources`:580 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.emblem.010` | `src/games/kh3/content.json:588`; `summary`:591, `area`:593, `instructions`:599, `prerequisites`:600, `uncertainty`:598, `name`:590, `sources`:595 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.emblem.011` | `src/games/kh3/content.json:603`; `summary`:606, `area`:608, `instructions`:614, `prerequisites`:615, `uncertainty`:613, `name`:605, `sources`:610 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.olympus.emblem.012` | `src/games/kh3/content.json:618`; `summary`:621, `area`:623, `instructions`:629, `prerequisites`:630, `uncertainty`:628, `name`:620, `sources`:625 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.chest.001` | `src/games/kh3/content.json:633`; `summary`:636, `area`:638, `uncertainty`:643, `name`:635, `reward`:644, `sources`:640 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.chest.002` | `src/games/kh3/content.json:647`; `summary`:650, `area`:652, `uncertainty`:657, `name`:649, `reward`:658, `sources`:654 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.chest.003` | `src/games/kh3/content.json:661`; `summary`:664, `area`:666, `uncertainty`:671, `name`:663, `reward`:672, `sources`:668 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.chest.004` | `src/games/kh3/content.json:675`; `summary`:678, `area`:680, `uncertainty`:685, `name`:677, `reward`:686, `sources`:682 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.chest.005` | `src/games/kh3/content.json:689`; `summary`:692, `area`:694, `uncertainty`:699, `name`:691, `reward`:700, `sources`:696 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.chest.006` | `src/games/kh3/content.json:703`; `summary`:706, `area`:708, `uncertainty`:713, `name`:705, `reward`:714, `sources`:710 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.chest.007` | `src/games/kh3/content.json:717`; `summary`:720, `area`:722, `uncertainty`:727, `name`:719, `reward`:728, `sources`:724 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.chest.008` | `src/games/kh3/content.json:731`; `summary`:734, `area`:736, `uncertainty`:741, `name`:733, `reward`:742, `sources`:738 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.chest.009` | `src/games/kh3/content.json:745`; `summary`:748, `area`:750, `uncertainty`:755, `name`:747, `reward`:756, `sources`:752 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.chest.010` | `src/games/kh3/content.json:759`; `summary`:762, `area`:764, `uncertainty`:769, `name`:761, `reward`:770, `sources`:766 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.emblem.001` | `src/games/kh3/content.json:773`; `summary`:776, `area`:778, `instructions`:784, `uncertainty`:783, `name`:775, `sources`:780 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.emblem.002` | `src/games/kh3/content.json:787`; `summary`:790, `area`:792, `instructions`:798, `uncertainty`:797, `name`:789, `sources`:794 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.emblem.003` | `src/games/kh3/content.json:801`; `summary`:804, `area`:806, `instructions`:812, `uncertainty`:811, `name`:803, `sources`:808 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.emblem.004` | `src/games/kh3/content.json:815`; `summary`:818, `area`:820, `instructions`:826, `uncertainty`:825, `name`:817, `sources`:822 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.emblem.005` | `src/games/kh3/content.json:829`; `summary`:832, `area`:834, `instructions`:840, `uncertainty`:839, `name`:831, `sources`:836 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.emblem.006` | `src/games/kh3/content.json:843`; `summary`:846, `area`:848, `instructions`:854, `uncertainty`:853, `name`:845, `sources`:850 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.emblem.007` | `src/games/kh3/content.json:857`; `summary`:860, `area`:862, `instructions`:868, `uncertainty`:867, `name`:859, `sources`:864 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.emblem.008` | `src/games/kh3/content.json:871`; `summary`:874, `area`:876, `instructions`:882, `uncertainty`:881, `name`:873, `sources`:878 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.twilight-town.emblem.009` | `src/games/kh3/content.json:885`; `summary`:888, `area`:890, `instructions`:896, `uncertainty`:895, `name`:887, `sources`:892 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.001` | `src/games/kh3/content.json:899`; `summary`:902, `area`:904, `uncertainty`:909, `name`:901, `reward`:910, `sources`:906 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.002` | `src/games/kh3/content.json:913`; `summary`:916, `area`:918, `uncertainty`:923, `name`:915, `reward`:924, `sources`:920 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.003` | `src/games/kh3/content.json:927`; `summary`:930, `area`:932, `uncertainty`:937, `name`:929, `reward`:938, `sources`:934 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.004` | `src/games/kh3/content.json:941`; `summary`:944, `area`:946, `uncertainty`:951, `name`:943, `reward`:952, `sources`:948 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.005` | `src/games/kh3/content.json:955`; `summary`:958, `area`:960, `uncertainty`:965, `name`:957, `reward`:966, `sources`:962 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.006` | `src/games/kh3/content.json:969`; `summary`:972, `area`:974, `uncertainty`:979, `name`:971, `reward`:980, `sources`:976 | KH3-001, KH3-002 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.007` | `src/games/kh3/content.json:983`; `summary`:986, `area`:988, `uncertainty`:993, `name`:985, `reward`:994, `sources`:990 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.008` | `src/games/kh3/content.json:997`; `summary`:1000, `area`:1002, `uncertainty`:1007, `name`:999, `reward`:1008, `sources`:1004 | KH3-001, KH3-002 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.009` | `src/games/kh3/content.json:1011`; `summary`:1014, `area`:1016, `uncertainty`:1021, `name`:1013, `reward`:1022, `sources`:1018 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.010` | `src/games/kh3/content.json:1025`; `summary`:1028, `area`:1030, `uncertainty`:1035, `name`:1027, `reward`:1036, `sources`:1032 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.011` | `src/games/kh3/content.json:1039`; `summary`:1042, `area`:1044, `uncertainty`:1049, `name`:1041, `reward`:1050, `sources`:1046 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.012` | `src/games/kh3/content.json:1053`; `summary`:1056, `area`:1058, `uncertainty`:1063, `name`:1055, `reward`:1064, `sources`:1060 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.013` | `src/games/kh3/content.json:1067`; `summary`:1070, `area`:1072, `instructions`:1082, `uncertainty`:1077, `name`:1069, `reward`:1078, `sources`:1074, `categories`:1079 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.014` | `src/games/kh3/content.json:1085`; `summary`:1088, `area`:1090, `uncertainty`:1095, `name`:1087, `reward`:1096, `sources`:1092 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.015` | `src/games/kh3/content.json:1099`; `summary`:1102, `area`:1104, `uncertainty`:1109, `name`:1101, `reward`:1110, `sources`:1106 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.016` | `src/games/kh3/content.json:1113`; `summary`:1116, `area`:1118, `uncertainty`:1123, `name`:1115, `reward`:1124, `sources`:1120 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.017` | `src/games/kh3/content.json:1127`; `summary`:1130, `area`:1132, `uncertainty`:1137, `name`:1129, `reward`:1138, `sources`:1134 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.018` | `src/games/kh3/content.json:1141`; `summary`:1144, `area`:1146, `uncertainty`:1151, `name`:1143, `reward`:1152, `sources`:1148 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.019` | `src/games/kh3/content.json:1155`; `summary`:1158, `area`:1160, `uncertainty`:1165, `name`:1157, `reward`:1166, `sources`:1162 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.020` | `src/games/kh3/content.json:1169`; `summary`:1172, `area`:1174, `uncertainty`:1179, `name`:1171, `reward`:1180, `sources`:1176 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.021` | `src/games/kh3/content.json:1183`; `summary`:1186, `area`:1188, `uncertainty`:1193, `name`:1185, `reward`:1194, `sources`:1190 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.022` | `src/games/kh3/content.json:1197`; `summary`:1200, `area`:1202, `uncertainty`:1207, `name`:1199, `reward`:1208, `sources`:1204 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.023` | `src/games/kh3/content.json:1211`; `summary`:1214, `area`:1216, `uncertainty`:1221, `name`:1213, `reward`:1222, `sources`:1218 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.024` | `src/games/kh3/content.json:1225`; `summary`:1228, `area`:1230, `instructions`:1240, `uncertainty`:1235, `name`:1227, `reward`:1236, `sources`:1232, `categories`:1237 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.025` | `src/games/kh3/content.json:1243`; `summary`:1246, `area`:1248, `uncertainty`:1253, `name`:1245, `reward`:1254, `sources`:1250 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.026` | `src/games/kh3/content.json:1257`; `summary`:1260, `area`:1262, `uncertainty`:1267, `name`:1259, `reward`:1268, `sources`:1264 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.027` | `src/games/kh3/content.json:1271`; `summary`:1274, `area`:1276, `uncertainty`:1281, `name`:1273, `reward`:1282, `sources`:1278 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.028` | `src/games/kh3/content.json:1285`; `summary`:1288, `area`:1290, `uncertainty`:1295, `name`:1287, `reward`:1296, `sources`:1292 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.chest.029` | `src/games/kh3/content.json:1299`; `summary`:1302, `area`:1304, `instructions`:1314, `uncertainty`:1309, `name`:1301, `reward`:1310, `sources`:1306, `categories`:1311 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.emblem.001` | `src/games/kh3/content.json:1317`; `summary`:1320, `area`:1322, `instructions`:1328, `uncertainty`:1327, `name`:1319, `sources`:1324 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.emblem.002` | `src/games/kh3/content.json:1331`; `summary`:1334, `area`:1336, `instructions`:1342, `uncertainty`:1341, `name`:1333, `sources`:1338 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.emblem.003` | `src/games/kh3/content.json:1345`; `summary`:1348, `area`:1350, `instructions`:1356, `uncertainty`:1355, `name`:1347, `sources`:1352 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.emblem.004` | `src/games/kh3/content.json:1359`; `summary`:1362, `area`:1364, `instructions`:1370, `uncertainty`:1369, `name`:1361, `sources`:1366 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.emblem.005` | `src/games/kh3/content.json:1373`; `summary`:1376, `area`:1378, `instructions`:1384, `uncertainty`:1383, `name`:1375, `sources`:1380 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.emblem.006` | `src/games/kh3/content.json:1387`; `summary`:1390, `area`:1392, `instructions`:1398, `prerequisites`:1399, `uncertainty`:1397, `name`:1389, `sources`:1394 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.emblem.007` | `src/games/kh3/content.json:1402`; `summary`:1405, `area`:1407, `instructions`:1413, `uncertainty`:1412, `name`:1404, `sources`:1409 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.emblem.008` | `src/games/kh3/content.json:1416`; `summary`:1419, `area`:1421, `instructions`:1427, `uncertainty`:1426, `name`:1418, `sources`:1423 | KH3-001, KH3-003 | Sources disagree on 2F versus 3F. Look for the hanging UFO; camera position is not yet reconciled. |
| `kh3.base.toy-box.emblem.009` | `src/games/kh3/content.json:1430`; `summary`:1433, `area`:1435, `instructions`:1441, `uncertainty`:1440, `name`:1432, `sources`:1437 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.emblem.010` | `src/games/kh3/content.json:1444`; `summary`:1447, `area`:1449, `instructions`:1455, `uncertainty`:1454, `name`:1446, `sources`:1451 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.toy-box.emblem.011` | `src/games/kh3/content.json:1458`; `summary`:1461, `area`:1463, `instructions`:1469, `uncertainty`:1468, `name`:1460, `sources`:1465 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.001` | `src/games/kh3/content.json:1472`; `summary`:1475, `area`:1477, `uncertainty`:1482, `name`:1474, `reward`:1483, `sources`:1479 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.002` | `src/games/kh3/content.json:1486`; `summary`:1489, `area`:1491, `uncertainty`:1496, `name`:1488, `reward`:1497, `sources`:1493 | KH3-001, KH3-002 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.003` | `src/games/kh3/content.json:1500`; `summary`:1503, `area`:1505, `uncertainty`:1510, `name`:1502, `reward`:1511, `sources`:1507 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.004` | `src/games/kh3/content.json:1514`; `summary`:1517, `area`:1519, `uncertainty`:1524, `name`:1516, `reward`:1525, `sources`:1521 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.005` | `src/games/kh3/content.json:1528`; `summary`:1531, `area`:1533, `uncertainty`:1538, `name`:1530, `reward`:1539, `sources`:1535 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.006` | `src/games/kh3/content.json:1542`; `summary`:1545, `area`:1547, `uncertainty`:1552, `name`:1544, `reward`:1553, `sources`:1549 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.007` | `src/games/kh3/content.json:1556`; `summary`:1559, `area`:1561, `uncertainty`:1566, `name`:1558, `reward`:1567, `sources`:1563 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.008` | `src/games/kh3/content.json:1570`; `summary`:1573, `area`:1575, `uncertainty`:1580, `name`:1572, `reward`:1581, `sources`:1577 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.009` | `src/games/kh3/content.json:1584`; `summary`:1587, `area`:1589, `instructions`:1599, `uncertainty`:1594, `name`:1586, `reward`:1595, `sources`:1591, `categories`:1596 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.010` | `src/games/kh3/content.json:1602`; `summary`:1605, `area`:1607, `uncertainty`:1612, `name`:1604, `reward`:1613, `sources`:1609 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.011` | `src/games/kh3/content.json:1616`; `summary`:1619, `area`:1621, `uncertainty`:1626, `name`:1618, `reward`:1627, `sources`:1623 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.012` | `src/games/kh3/content.json:1630`; `summary`:1633, `area`:1635, `uncertainty`:1640, `name`:1632, `reward`:1641, `sources`:1637 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.013` | `src/games/kh3/content.json:1644`; `summary`:1647, `area`:1649, `uncertainty`:1654, `name`:1646, `reward`:1655, `sources`:1651 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.014` | `src/games/kh3/content.json:1658`; `summary`:1661, `area`:1663, `uncertainty`:1668, `name`:1660, `reward`:1669, `sources`:1665 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.015` | `src/games/kh3/content.json:1672`; `summary`:1675, `area`:1677, `uncertainty`:1682, `name`:1674, `reward`:1683, `sources`:1679 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.016` | `src/games/kh3/content.json:1686`; `summary`:1689, `area`:1691, `uncertainty`:1696, `name`:1688, `reward`:1697, `sources`:1693 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.017` | `src/games/kh3/content.json:1700`; `summary`:1703, `area`:1705, `uncertainty`:1710, `name`:1702, `reward`:1711, `sources`:1707 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.018` | `src/games/kh3/content.json:1714`; `summary`:1717, `area`:1719, `uncertainty`:1724, `name`:1716, `reward`:1725, `sources`:1721 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.019` | `src/games/kh3/content.json:1728`; `summary`:1731, `area`:1733, `uncertainty`:1738, `name`:1730, `reward`:1739, `sources`:1735 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.020` | `src/games/kh3/content.json:1742`; `summary`:1745, `area`:1747, `uncertainty`:1752, `name`:1744, `reward`:1753, `sources`:1749 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.021` | `src/games/kh3/content.json:1756`; `summary`:1759, `area`:1761, `uncertainty`:1766, `name`:1758, `reward`:1767, `sources`:1763 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.022` | `src/games/kh3/content.json:1770`; `summary`:1773, `area`:1775, `instructions`:1785, `uncertainty`:1780, `name`:1772, `reward`:1781, `sources`:1777, `categories`:1782 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.023` | `src/games/kh3/content.json:1788`; `summary`:1791, `area`:1793, `uncertainty`:1798, `name`:1790, `reward`:1799, `sources`:1795 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.024` | `src/games/kh3/content.json:1802`; `summary`:1805, `area`:1807, `instructions`:1817, `uncertainty`:1812, `name`:1804, `reward`:1813, `sources`:1809, `categories`:1814 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.025` | `src/games/kh3/content.json:1820`; `summary`:1823, `area`:1825, `uncertainty`:1830, `name`:1822, `reward`:1831, `sources`:1827 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.026` | `src/games/kh3/content.json:1834`; `summary`:1837, `area`:1839, `uncertainty`:1844, `name`:1836, `reward`:1845, `sources`:1900 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.027` | `src/games/kh3/content.json:1848`; `summary`:1851, `area`:1853, `uncertainty`:1858, `name`:1850, `reward`:1859, `sources`:1855 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.chest.028` | `src/games/kh3/content.json:1862`; `summary`:1865, `area`:1867, `uncertainty`:1872, `name`:1864, `reward`:1873, `sources`:1869 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.emblem.001` | `src/games/kh3/content.json:1876`; `summary`:1879, `area`:1881, `instructions`:1887, `uncertainty`:1886, `name`:1878, `sources`:1883 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.emblem.002` | `src/games/kh3/content.json:1890`; `summary`:1893, `area`:1895, `instructions`:1901, `uncertainty`:1900, `name`:1892, `sources`:1897 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.emblem.003` | `src/games/kh3/content.json:1904`; `summary`:1907, `area`:1909, `instructions`:1915, `uncertainty`:1914, `name`:1906, `sources`:1911 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.emblem.004` | `src/games/kh3/content.json:1918`; `summary`:1921, `area`:1923, `instructions`:1929, `uncertainty`:1928, `name`:1920, `sources`:1925 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.emblem.005` | `src/games/kh3/content.json:1932`; `summary`:1935, `area`:1937, `instructions`:1943, `uncertainty`:1942, `name`:1934, `sources`:1939 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.emblem.006` | `src/games/kh3/content.json:1946`; `summary`:1949, `area`:1951, `instructions`:1957, `uncertainty`:1956, `name`:1948, `sources`:1953 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.emblem.007` | `src/games/kh3/content.json:1960`; `summary`:1963, `area`:1965, `instructions`:1971, `uncertainty`:1970, `name`:1962, `sources`:1967 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.emblem.008` | `src/games/kh3/content.json:1974`; `summary`:1977, `area`:1979, `instructions`:1985, `uncertainty`:1984, `name`:1976, `sources`:1981 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.kingdom-of-corona.emblem.009` | `src/games/kh3/content.json:1988`; `summary`:1991, `area`:1993, `instructions`:1999, `uncertainty`:1998, `name`:1990, `sources`:1995 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.001` | `src/games/kh3/content.json:2002`; `summary`:2005, `area`:2007, `uncertainty`:2012, `name`:2004, `reward`:2013, `sources`:2009 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.002` | `src/games/kh3/content.json:2016`; `summary`:2019, `area`:2021, `uncertainty`:2026, `name`:2018, `reward`:2027, `sources`:2023 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.003` | `src/games/kh3/content.json:2030`; `summary`:2033, `area`:2035, `uncertainty`:2040, `name`:2032, `reward`:2041, `sources`:2037 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.004` | `src/games/kh3/content.json:2044`; `summary`:2047, `area`:2049, `uncertainty`:2054, `name`:2046, `reward`:2055, `sources`:2051 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.005` | `src/games/kh3/content.json:2058`; `summary`:2061, `area`:2063, `uncertainty`:2068, `name`:2060, `reward`:2069, `sources`:2065 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.006` | `src/games/kh3/content.json:2072`; `summary`:2075, `area`:2077, `uncertainty`:2082, `name`:2074, `reward`:2083, `sources`:2079 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.007` | `src/games/kh3/content.json:2086`; `summary`:2089, `area`:2091, `uncertainty`:2096, `name`:2088, `reward`:2097, `sources`:2093 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.008` | `src/games/kh3/content.json:2100`; `summary`:2103, `area`:2105, `prerequisites`:2112, `uncertainty`:2110, `name`:2102, `reward`:2111, `sources`:2107 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.009` | `src/games/kh3/content.json:2115`; `summary`:2118, `area`:2120, `uncertainty`:2125, `name`:2117, `reward`:2126, `sources`:2122 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.010` | `src/games/kh3/content.json:2129`; `summary`:2132, `area`:2134, `instructions`:2144, `uncertainty`:2139, `name`:2131, `reward`:2140, `sources`:2136, `categories`:2141 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.011` | `src/games/kh3/content.json:2147`; `summary`:2150, `area`:2152, `uncertainty`:2157, `name`:2149, `reward`:2158, `sources`:2154 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.012` | `src/games/kh3/content.json:2161`; `summary`:2164, `area`:2166, `uncertainty`:2171, `name`:2163, `reward`:2172, `sources`:2168 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.013` | `src/games/kh3/content.json:2175`; `summary`:2178, `area`:2180, `uncertainty`:2185, `name`:2177, `reward`:2186, `sources`:2182 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.014` | `src/games/kh3/content.json:2189`; `summary`:2192, `area`:2194, `uncertainty`:2199, `name`:2191, `reward`:2200, `sources`:2196 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.015` | `src/games/kh3/content.json:2203`; `summary`:2206, `area`:2208, `uncertainty`:2213, `name`:2205, `reward`:2214, `sources`:2210 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.016` | `src/games/kh3/content.json:2217`; `summary`:2220, `area`:2222, `uncertainty`:2227, `name`:2219, `reward`:2228, `sources`:2224 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.017` | `src/games/kh3/content.json:2231`; `summary`:2234, `area`:2236, `uncertainty`:2241, `name`:2233, `reward`:2242, `sources`:2238 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.018` | `src/games/kh3/content.json:2245`; `summary`:2248, `area`:2250, `uncertainty`:2255, `name`:2247, `reward`:2256, `sources`:2252 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.019` | `src/games/kh3/content.json:2259`; `summary`:2262, `area`:2264, `instructions`:2274, `uncertainty`:2269, `name`:2261, `reward`:2270, `sources`:2266, `categories`:2271 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.020` | `src/games/kh3/content.json:2277`; `summary`:2280, `area`:2282, `uncertainty`:2287, `name`:2279, `reward`:2288, `sources`:2284 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.021` | `src/games/kh3/content.json:2291`; `summary`:2294, `area`:2296, `prerequisites`:2303, `uncertainty`:2301, `name`:2293, `reward`:2302, `sources`:2298 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.chest.022` | `src/games/kh3/content.json:2306`; `summary`:2309, `area`:2311, `uncertainty`:2316, `name`:2308, `reward`:2317, `sources`:2313 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.emblem.001` | `src/games/kh3/content.json:2320`; `summary`:2323, `area`:2325, `instructions`:2331, `uncertainty`:2330, `name`:2322, `sources`:2327 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.emblem.002` | `src/games/kh3/content.json:2334`; `summary`:2337, `area`:2339, `instructions`:2345, `uncertainty`:2344, `name`:2336, `sources`:2341 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.emblem.003` | `src/games/kh3/content.json:2348`; `summary`:2351, `area`:2353, `instructions`:2359, `uncertainty`:2358, `name`:2350, `sources`:2355 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.emblem.004` | `src/games/kh3/content.json:2362`; `summary`:2365, `area`:2367, `instructions`:2373, `uncertainty`:2372, `name`:2364, `sources`:2369 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.emblem.005` | `src/games/kh3/content.json:2376`; `summary`:2379, `area`:2381, `instructions`:2387, `uncertainty`:2386, `name`:2378, `sources`:2383 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.emblem.006` | `src/games/kh3/content.json:2390`; `summary`:2393, `area`:2395, `instructions`:2401, `uncertainty`:2400, `name`:2392, `sources`:2397 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.emblem.007` | `src/games/kh3/content.json:2404`; `summary`:2407, `area`:2409, `instructions`:2415, `uncertainty`:2414, `name`:2406, `sources`:2411 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.emblem.008` | `src/games/kh3/content.json:2418`; `summary`:2421, `area`:2423, `instructions`:2429, `uncertainty`:2428, `name`:2420, `sources`:2425 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.emblem.009` | `src/games/kh3/content.json:2432`; `summary`:2435, `area`:2437, `instructions`:2443, `uncertainty`:2442, `name`:2434, `sources`:2439 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.emblem.010` | `src/games/kh3/content.json:2446`; `summary`:2449, `area`:2451, `instructions`:2457, `uncertainty`:2456, `name`:2448, `sources`:2453 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.monstropolis.emblem.011` | `src/games/kh3/content.json:2460`; `summary`:2463, `area`:2465, `instructions`:2471, `prerequisites`:2472, `uncertainty`:2470, `name`:2462, `sources`:2467 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.001` | `src/games/kh3/content.json:2475`; `summary`:2478, `area`:2480, `uncertainty`:2485, `name`:2477, `reward`:2486, `sources`:2482 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.002` | `src/games/kh3/content.json:2489`; `summary`:2492, `area`:2494, `uncertainty`:2499, `name`:2491, `reward`:2500, `sources`:2496 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.003` | `src/games/kh3/content.json:2503`; `summary`:2506, `area`:2508, `uncertainty`:2513, `name`:2505, `reward`:2514, `sources`:2510 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.004` | `src/games/kh3/content.json:2517`; `summary`:2520, `area`:2522, `uncertainty`:2527, `name`:2519, `reward`:2528, `sources`:2524 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.005` | `src/games/kh3/content.json:2531`; `summary`:2534, `area`:2536, `uncertainty`:2541, `name`:2533, `reward`:2542, `sources`:2538 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.006` | `src/games/kh3/content.json:2545`; `summary`:2548, `area`:2550, `uncertainty`:2555, `name`:2547, `reward`:2556, `sources`:2552 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.007` | `src/games/kh3/content.json:2559`; `summary`:2562, `area`:2564, `instructions`:2574, `uncertainty`:2569, `name`:2561, `reward`:2570, `sources`:2566, `categories`:2571 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.008` | `src/games/kh3/content.json:2577`; `summary`:2580, `area`:2582, `instructions`:2592, `uncertainty`:2587, `name`:2579, `reward`:2588, `sources`:2584, `categories`:2589 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.009` | `src/games/kh3/content.json:2595`; `summary`:2598, `area`:2600, `uncertainty`:2605, `name`:2597, `reward`:2606, `sources`:2602 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.010` | `src/games/kh3/content.json:2609`; `summary`:2612, `area`:2614, `uncertainty`:2619, `name`:2611, `reward`:2620, `sources`:2616 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.011` | `src/games/kh3/content.json:2623`; `summary`:2626, `area`:2628, `uncertainty`:2633, `name`:2625, `reward`:2634, `sources`:2630 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.012` | `src/games/kh3/content.json:2637`; `summary`:2640, `area`:2642, `uncertainty`:2647, `name`:2639, `reward`:2648, `sources`:2644 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.013` | `src/games/kh3/content.json:2651`; `summary`:2654, `area`:2656, `uncertainty`:2661, `name`:2653, `reward`:2662, `sources`:2658 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.014` | `src/games/kh3/content.json:2665`; `summary`:2668, `area`:2670, `instructions`:2680, `uncertainty`:2675, `name`:2667, `reward`:2676, `sources`:2672, `categories`:2677 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.015` | `src/games/kh3/content.json:2683`; `summary`:2686, `area`:2688, `uncertainty`:2693, `name`:2685, `reward`:2694, `sources`:2690 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.016` | `src/games/kh3/content.json:2697`; `summary`:2700, `area`:2702, `uncertainty`:2707, `name`:2699, `reward`:2708, `sources`:2704 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.017` | `src/games/kh3/content.json:2711`; `summary`:2714, `area`:2716, `uncertainty`:2721, `name`:2713, `reward`:2722, `sources`:2718 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.018` | `src/games/kh3/content.json:2725`; `summary`:2728, `area`:2730, `uncertainty`:2735, `name`:2727, `reward`:2736, `sources`:2732 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.019` | `src/games/kh3/content.json:2739`; `summary`:2742, `area`:2744, `uncertainty`:2749, `name`:2741, `reward`:2750, `sources`:2746 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.020` | `src/games/kh3/content.json:2753`; `summary`:2756, `area`:2758, `uncertainty`:2763, `name`:2755, `reward`:2764, `sources`:2760 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.021` | `src/games/kh3/content.json:2767`; `summary`:2770, `area`:2772, `uncertainty`:2777, `name`:2769, `reward`:2778, `sources`:2774 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.022` | `src/games/kh3/content.json:2781`; `summary`:2784, `area`:2786, `uncertainty`:2791, `name`:2783, `reward`:2792, `sources`:2788 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.023` | `src/games/kh3/content.json:2795`; `summary`:2798, `area`:2800, `uncertainty`:2805, `name`:2797, `reward`:2806, `sources`:2802 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.024` | `src/games/kh3/content.json:2809`; `summary`:2812, `area`:2814, `uncertainty`:2819, `name`:2811, `reward`:2820, `sources`:2816 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.chest.025` | `src/games/kh3/content.json:2823`; `summary`:2826, `area`:2828, `uncertainty`:2833, `name`:2825, `reward`:2834, `sources`:2830 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.emblem.001` | `src/games/kh3/content.json:2837`; `summary`:2840, `area`:2842, `instructions`:2848, `uncertainty`:2847, `name`:2839, `sources`:2844 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.emblem.002` | `src/games/kh3/content.json:2851`; `summary`:2854, `area`:2856, `instructions`:2862, `uncertainty`:2861, `name`:2853, `sources`:2858 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.emblem.003` | `src/games/kh3/content.json:2865`; `summary`:2868, `area`:2870, `instructions`:2876, `uncertainty`:2875, `name`:2867, `sources`:2872 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.emblem.004` | `src/games/kh3/content.json:2879`; `summary`:2882, `area`:2884, `instructions`:2890, `uncertainty`:2889, `name`:2881, `sources`:2886 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.emblem.005` | `src/games/kh3/content.json:2893`; `summary`:2896, `area`:2898, `instructions`:2904, `uncertainty`:2903, `name`:2895, `sources`:2900 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.emblem.006` | `src/games/kh3/content.json:2907`; `summary`:2910, `area`:2912, `instructions`:2918, `uncertainty`:2917, `name`:2909, `sources`:2914 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.emblem.007` | `src/games/kh3/content.json:2921`; `summary`:2924, `area`:2926, `instructions`:2932, `uncertainty`:2931, `name`:2923, `sources`:2928 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.emblem.008` | `src/games/kh3/content.json:2935`; `summary`:2938, `area`:2940, `instructions`:2946, `uncertainty`:2945, `name`:2937, `sources`:2942 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.emblem.009` | `src/games/kh3/content.json:2949`; `summary`:2952, `area`:2954, `instructions`:2960, `uncertainty`:2959, `name`:2951, `sources`:2956 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.emblem.010` | `src/games/kh3/content.json:2963`; `summary`:2966, `area`:2968, `instructions`:2974, `uncertainty`:2973, `name`:2965, `sources`:2970 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.arendelle.emblem.011` | `src/games/kh3/content.json:2977`; `summary`:2980, `area`:2982, `instructions`:2988, `uncertainty`:2987, `name`:2979, `sources`:2984 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.001` | `src/games/kh3/content.json:2991`; `summary`:2994, `area`:2996, `uncertainty`:3001, `name`:2993, `reward`:3002, `sources`:2998 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.002` | `src/games/kh3/content.json:3005`; `summary`:3008, `area`:3010, `uncertainty`:3015, `name`:3007, `reward`:3016, `sources`:3012 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.003` | `src/games/kh3/content.json:3019`; `summary`:3022, `area`:3024, `uncertainty`:3029, `name`:3021, `reward`:3030, `sources`:3026 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.004` | `src/games/kh3/content.json:3033`; `summary`:3036, `area`:3038, `instructions`:3048, `uncertainty`:3043, `name`:3035, `reward`:3044, `sources`:3040, `categories`:3045 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.005` | `src/games/kh3/content.json:3051`; `summary`:3054, `area`:3056, `uncertainty`:3061, `name`:3053, `reward`:3062, `sources`:3058 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.006` | `src/games/kh3/content.json:3065`; `summary`:3068, `area`:3070, `uncertainty`:3075, `name`:3067, `reward`:3076, `sources`:3072 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.007` | `src/games/kh3/content.json:3079`; `summary`:3082, `area`:3084, `uncertainty`:3089, `name`:3081, `reward`:3090, `sources`:3086 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.008` | `src/games/kh3/content.json:3093`; `summary`:3096, `area`:3098, `uncertainty`:3103, `name`:3095, `reward`:3104, `sources`:3100 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.009` | `src/games/kh3/content.json:3107`; `summary`:3110, `area`:3112, `uncertainty`:3117, `name`:3109, `reward`:3118, `sources`:3114 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.010` | `src/games/kh3/content.json:3121`; `summary`:3124, `area`:3126, `instructions`:3136, `uncertainty`:3131, `name`:3123, `reward`:3132, `sources`:3128, `categories`:3133 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.011` | `src/games/kh3/content.json:3139`; `summary`:3142, `area`:3144, `uncertainty`:3149, `name`:3141, `reward`:3150, `sources`:3146 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.012` | `src/games/kh3/content.json:3153`; `summary`:3156, `area`:3158, `uncertainty`:3163, `name`:3155, `reward`:3164, `sources`:3160 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.013` | `src/games/kh3/content.json:3167`; `summary`:3170, `area`:3172, `instructions`:3182, `uncertainty`:3177, `name`:3169, `reward`:3178, `sources`:3174, `categories`:3179 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.014` | `src/games/kh3/content.json:3185`; `summary`:3188, `area`:3190, `uncertainty`:3195, `name`:3187, `reward`:3196, `sources`:3192 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.015` | `src/games/kh3/content.json:3199`; `summary`:3202, `area`:3204, `uncertainty`:3209, `name`:3201, `reward`:3210, `sources`:3206 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.016` | `src/games/kh3/content.json:3213`; `summary`:3216, `area`:3218, `uncertainty`:3223, `name`:3215, `reward`:3224, `sources`:3220 | KH3-001, KH3-002 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.017` | `src/games/kh3/content.json:3227`; `summary`:3230, `area`:3232, `uncertainty`:3237, `name`:3229, `reward`:3238, `sources`:3234 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.018` | `src/games/kh3/content.json:3241`; `summary`:3244, `area`:3246, `uncertainty`:3251, `name`:3243, `reward`:3252, `sources`:3248 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.019` | `src/games/kh3/content.json:3255`; `summary`:3258, `area`:3260, `uncertainty`:3265, `name`:3257, `reward`:3266, `sources`:3262 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.020` | `src/games/kh3/content.json:3269`; `summary`:3272, `area`:3274, `uncertainty`:3279, `name`:3271, `reward`:3280, `sources`:3276 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.021` | `src/games/kh3/content.json:3283`; `summary`:3286, `area`:3288, `uncertainty`:3293, `name`:3285, `reward`:3294, `sources`:3290 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.022` | `src/games/kh3/content.json:3297`; `summary`:3300, `area`:3302, `uncertainty`:3307, `name`:3299, `reward`:3308, `sources`:3304 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.023` | `src/games/kh3/content.json:3311`; `summary`:3314, `area`:3316, `uncertainty`:3321, `name`:3313, `reward`:3322, `sources`:3318 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.024` | `src/games/kh3/content.json:3325`; `summary`:3328, `area`:3330, `uncertainty`:3335, `name`:3327, `reward`:3336, `sources`:3332 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.025` | `src/games/kh3/content.json:3339`; `summary`:3342, `area`:3344, `uncertainty`:3349, `name`:3341, `reward`:3350, `sources`:3346 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.026` | `src/games/kh3/content.json:3353`; `summary`:3356, `area`:3358, `uncertainty`:3363, `name`:3355, `reward`:3364, `sources`:3360 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.027` | `src/games/kh3/content.json:3367`; `summary`:3370, `area`:3372, `uncertainty`:3377, `name`:3369, `reward`:3378, `sources`:3374 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.028` | `src/games/kh3/content.json:3381`; `summary`:3384, `area`:3386, `uncertainty`:3391, `name`:3383, `reward`:3392, `sources`:3388 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.029` | `src/games/kh3/content.json:3395`; `summary`:3398, `area`:3400, `uncertainty`:3405, `name`:3397, `reward`:3406, `sources`:3402 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.030` | `src/games/kh3/content.json:3409`; `summary`:3412, `area`:3414, `uncertainty`:3419, `name`:3411, `reward`:3420, `sources`:3416 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.031` | `src/games/kh3/content.json:3423`; `summary`:3426, `area`:3428, `uncertainty`:3433, `name`:3425, `reward`:3434, `sources`:3430 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.032` | `src/games/kh3/content.json:3437`; `summary`:3440, `area`:3442, `uncertainty`:3447, `name`:3439, `reward`:3448, `sources`:3444 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.033` | `src/games/kh3/content.json:3451`; `summary`:3454, `area`:3456, `uncertainty`:3461, `name`:3453, `reward`:3462, `sources`:3458 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.034` | `src/games/kh3/content.json:3465`; `summary`:3468, `area`:3470, `uncertainty`:3475, `name`:3467, `reward`:3476, `sources`:3472 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.035` | `src/games/kh3/content.json:3479`; `summary`:3482, `area`:3484, `uncertainty`:3489, `name`:3481, `reward`:3490, `sources`:3486 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.036` | `src/games/kh3/content.json:3493`; `summary`:3496, `area`:3498, `uncertainty`:3503, `name`:3495, `reward`:3504, `sources`:3500 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.037` | `src/games/kh3/content.json:3507`; `summary`:3510, `area`:3512, `uncertainty`:3517, `name`:3509, `reward`:3518, `sources`:3514 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.038` | `src/games/kh3/content.json:3521`; `summary`:3524, `area`:3526, `uncertainty`:3531, `name`:3523, `reward`:3532, `sources`:3528 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.039` | `src/games/kh3/content.json:3535`; `summary`:3538, `area`:3540, `uncertainty`:3545, `name`:3537, `reward`:3546, `sources`:3542 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.040` | `src/games/kh3/content.json:3549`; `summary`:3552, `area`:3554, `uncertainty`:3559, `name`:3551, `reward`:3560, `sources`:3556 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.041` | `src/games/kh3/content.json:3563`; `summary`:3566, `area`:3568, `uncertainty`:3573, `name`:3565, `reward`:3574, `sources`:3570 | KH3-001, KH3-002 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.042` | `src/games/kh3/content.json:3577`; `summary`:3580, `area`:3582, `uncertainty`:3587, `name`:3579, `reward`:3588, `sources`:3584 | KH3-001, KH3-002 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.043` | `src/games/kh3/content.json:3591`; `summary`:3594, `area`:3596, `uncertainty`:3601, `name`:3593, `reward`:3602, `sources`:3598 | KH3-001, KH3-002 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.044` | `src/games/kh3/content.json:3605`; `summary`:3608, `area`:3610, `uncertainty`:3615, `name`:3607, `reward`:3616, `sources`:3612 | KH3-001, KH3-002 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.045` | `src/games/kh3/content.json:3619`; `summary`:3622, `area`:3624, `uncertainty`:3629, `name`:3621, `reward`:3630, `sources`:3626 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.046` | `src/games/kh3/content.json:3633`; `summary`:3636, `area`:3638, `uncertainty`:3643, `name`:3635, `reward`:3644, `sources`:3640 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.047` | `src/games/kh3/content.json:3647`; `summary`:3650, `area`:3652, `instructions`:3662, `uncertainty`:3657, `name`:3649, `reward`:3658, `sources`:3654, `categories`:3659 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.048` | `src/games/kh3/content.json:3665`; `summary`:3668, `area`:3670, `uncertainty`:3675, `name`:3667, `reward`:3676, `sources`:3672 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.049` | `src/games/kh3/content.json:3679`; `summary`:3682, `area`:3684, `uncertainty`:3689, `name`:3681, `reward`:3690, `sources`:3686 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.050` | `src/games/kh3/content.json:3693`; `summary`:3696, `area`:3698, `uncertainty`:3703, `name`:3695, `reward`:3704, `sources`:3700 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.051` | `src/games/kh3/content.json:3707`; `summary`:3710, `area`:3712, `uncertainty`:3717, `name`:3709, `reward`:3718, `sources`:3714 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.052` | `src/games/kh3/content.json:3721`; `summary`:3724, `area`:3726, `uncertainty`:3731, `name`:3723, `reward`:3732, `sources`:3728 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.053` | `src/games/kh3/content.json:3735`; `summary`:3738, `area`:3740, `uncertainty`:3745, `name`:3737, `reward`:3746, `sources`:3742 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.054` | `src/games/kh3/content.json:3749`; `summary`:3752, `area`:3754, `uncertainty`:3759, `name`:3751, `reward`:3760, `sources`:3756 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.055` | `src/games/kh3/content.json:3763`; `summary`:3766, `area`:3768, `uncertainty`:3773, `name`:3765, `reward`:3774, `sources`:3770 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.chest.056` | `src/games/kh3/content.json:3777`; `summary`:3780, `area`:3782, `uncertainty`:3787, `name`:3779, `reward`:3788, `sources`:3784 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.emblem.001` | `src/games/kh3/content.json:3791`; `summary`:3794, `area`:3796, `instructions`:3802, `uncertainty`:3801, `name`:3793, `sources`:3798 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.emblem.002` | `src/games/kh3/content.json:3805`; `summary`:3808, `area`:3810, `instructions`:3816, `uncertainty`:3815, `name`:3807, `sources`:3812 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.emblem.003` | `src/games/kh3/content.json:3819`; `summary`:3822, `area`:3824, `instructions`:3830, `uncertainty`:3829, `name`:3821, `sources`:3826 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.emblem.004` | `src/games/kh3/content.json:3833`; `summary`:3836, `area`:3838, `instructions`:3844, `uncertainty`:3843, `name`:3835, `sources`:3840 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.emblem.005` | `src/games/kh3/content.json:3847`; `summary`:3850, `area`:3852, `instructions`:3858, `uncertainty`:3857, `name`:3849, `sources`:3854 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.emblem.006` | `src/games/kh3/content.json:3861`; `summary`:3864, `area`:3866, `instructions`:3872, `uncertainty`:3871, `name`:3863, `sources`:3868 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.emblem.007` | `src/games/kh3/content.json:3875`; `summary`:3878, `area`:3880, `instructions`:3886, `uncertainty`:3885, `name`:3877, `sources`:3882 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.emblem.008` | `src/games/kh3/content.json:3889`; `summary`:3892, `area`:3894, `instructions`:3900, `uncertainty`:3899, `name`:3891, `sources`:3896 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.emblem.009` | `src/games/kh3/content.json:3903`; `summary`:3906, `area`:3908, `instructions`:3914, `uncertainty`:3913, `name`:3905, `sources`:3910 | KH3-001, KH3-002 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.emblem.010` | `src/games/kh3/content.json:3917`; `summary`:3920, `area`:3922, `instructions`:3928, `uncertainty`:3927, `name`:3919, `sources`:3924 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.emblem.011` | `src/games/kh3/content.json:3931`; `summary`:3934, `area`:3936, `instructions`:3942, `uncertainty`:3941, `name`:3933, `sources`:3938 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.emblem.012` | `src/games/kh3/content.json:3945`; `summary`:3948, `area`:3950, `instructions`:3956, `uncertainty`:3955, `name`:3947, `sources`:3952 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-caribbean.emblem.013` | `src/games/kh3/content.json:3959`; `summary`:3962, `area`:3964, `instructions`:3970, `uncertainty`:3969, `name`:3961, `sources`:3966 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.001` | `src/games/kh3/content.json:3973`; `summary`:3976, `area`:3978, `uncertainty`:3983, `name`:3975, `reward`:3984, `sources`:3980 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.002` | `src/games/kh3/content.json:3987`; `summary`:3990, `area`:3992, `uncertainty`:3997, `name`:3989, `reward`:3998, `sources`:3994 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.003` | `src/games/kh3/content.json:4001`; `summary`:4004, `area`:4006, `uncertainty`:4011, `name`:4003, `reward`:4012, `sources`:4008 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.004` | `src/games/kh3/content.json:4015`; `summary`:4018, `area`:4020, `uncertainty`:4025, `name`:4017, `reward`:4026, `sources`:4022 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.005` | `src/games/kh3/content.json:4029`; `summary`:4032, `area`:4034, `uncertainty`:4039, `name`:4031, `reward`:4040, `sources`:4036 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.006` | `src/games/kh3/content.json:4043`; `summary`:4046, `area`:4048, `uncertainty`:4053, `name`:4045, `reward`:4054, `sources`:4050 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.007` | `src/games/kh3/content.json:4057`; `summary`:4060, `area`:4062, `uncertainty`:4067, `name`:4059, `reward`:4068, `sources`:4064 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.008` | `src/games/kh3/content.json:4071`; `summary`:4074, `area`:4076, `uncertainty`:4081, `name`:4073, `reward`:4082, `sources`:4078 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.009` | `src/games/kh3/content.json:4085`; `summary`:4088, `area`:4090, `uncertainty`:4095, `name`:4087, `reward`:4096, `sources`:4092 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.010` | `src/games/kh3/content.json:4099`; `summary`:4102, `area`:4104, `uncertainty`:4109, `name`:4101, `reward`:4110, `sources`:4106 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.011` | `src/games/kh3/content.json:4113`; `summary`:4116, `area`:4118, `uncertainty`:4123, `name`:4115, `reward`:4124, `sources`:4120 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.012` | `src/games/kh3/content.json:4127`; `summary`:4130, `area`:4132, `uncertainty`:4137, `name`:4129, `reward`:4138, `sources`:4134 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.013` | `src/games/kh3/content.json:4141`; `summary`:4144, `area`:4146, `uncertainty`:4151, `name`:4143, `reward`:4152, `sources`:4148 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.014` | `src/games/kh3/content.json:4155`; `summary`:4158, `area`:4160, `uncertainty`:4165, `name`:4157, `reward`:4166, `sources`:4162 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.015` | `src/games/kh3/content.json:4169`; `summary`:4172, `area`:4174, `uncertainty`:4179, `name`:4171, `reward`:4180, `sources`:4176 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.016` | `src/games/kh3/content.json:4183`; `summary`:4186, `area`:4188, `uncertainty`:4193, `name`:4185, `reward`:4194, `sources`:4190 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.017` | `src/games/kh3/content.json:4197`; `summary`:4200, `area`:4202, `uncertainty`:4207, `name`:4199, `reward`:4208, `sources`:4204 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.018` | `src/games/kh3/content.json:4211`; `summary`:4214, `area`:4216, `uncertainty`:4221, `name`:4213, `reward`:4222, `sources`:4218 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.019` | `src/games/kh3/content.json:4225`; `summary`:4228, `area`:4230, `uncertainty`:4235, `name`:4227, `reward`:4236, `sources`:4232 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.020` | `src/games/kh3/content.json:4239`; `summary`:4242, `area`:4244, `uncertainty`:4249, `name`:4241, `reward`:4250, `sources`:4246 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.021` | `src/games/kh3/content.json:4253`; `summary`:4256, `area`:4258, `uncertainty`:4263, `name`:4255, `reward`:4264, `sources`:4260 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.022` | `src/games/kh3/content.json:4267`; `summary`:4270, `area`:4272, `uncertainty`:4277, `name`:4269, `reward`:4278, `sources`:4274 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.023` | `src/games/kh3/content.json:4281`; `summary`:4284, `area`:4286, `uncertainty`:4291, `name`:4283, `reward`:4292, `sources`:4288 | KH3-001, KH3-002 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.024` | `src/games/kh3/content.json:4295`; `summary`:4298, `area`:4300, `uncertainty`:4305, `name`:4297, `reward`:4306, `sources`:4302 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.025` | `src/games/kh3/content.json:4309`; `summary`:4312, `area`:4314, `uncertainty`:4319, `name`:4311, `reward`:4320, `sources`:4316 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.026` | `src/games/kh3/content.json:4323`; `summary`:4326, `area`:4328, `uncertainty`:4333, `name`:4325, `reward`:4334, `sources`:4330 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.027` | `src/games/kh3/content.json:4337`; `summary`:4340, `area`:4342, `uncertainty`:4347, `name`:4339, `reward`:4348, `sources`:4344 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.028` | `src/games/kh3/content.json:4351`; `summary`:4354, `area`:4356, `uncertainty`:4361, `name`:4353, `reward`:4362, `sources`:4358 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.029` | `src/games/kh3/content.json:4365`; `summary`:4368, `area`:4370, `uncertainty`:4375, `name`:4367, `reward`:4376, `sources`:4372 | KH3-001, KH3-002 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.030` | `src/games/kh3/content.json:4379`; `summary`:4382, `area`:4384, `uncertainty`:4389, `name`:4381, `reward`:4390, `sources`:4386 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.031` | `src/games/kh3/content.json:4393`; `summary`:4396, `area`:4398, `uncertainty`:4403, `name`:4395, `reward`:4404, `sources`:4400 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.032` | `src/games/kh3/content.json:4407`; `summary`:4410, `area`:4412, `uncertainty`:4417, `name`:4409, `reward`:4418, `sources`:4414 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.033` | `src/games/kh3/content.json:4421`; `summary`:4424, `area`:4426, `uncertainty`:4431, `name`:4423, `reward`:4432, `sources`:4428 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.034` | `src/games/kh3/content.json:4435`; `summary`:4438, `area`:4440, `instructions`:4450, `uncertainty`:4445, `name`:4437, `reward`:4446, `sources`:4442, `categories`:4447 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.035` | `src/games/kh3/content.json:4453`; `summary`:4456, `area`:4458, `instructions`:4468, `uncertainty`:4463, `name`:4455, `reward`:4464, `sources`:4460, `categories`:4465 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.chest.036` | `src/games/kh3/content.json:4471`; `summary`:4474, `area`:4476, `instructions`:4486, `uncertainty`:4481, `name`:4473, `reward`:4482, `sources`:4478, `categories`:4483 | KH3-001, KH3-019 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.emblem.001` | `src/games/kh3/content.json:4489`; `summary`:4492, `area`:4494, `instructions`:4500, `uncertainty`:4499, `name`:4491, `sources`:4496 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.emblem.002` | `src/games/kh3/content.json:4503`; `summary`:4506, `area`:4508, `instructions`:4514, `uncertainty`:4513, `name`:4505, `sources`:4510 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.emblem.003` | `src/games/kh3/content.json:4517`; `summary`:4520, `area`:4522, `instructions`:4528, `prerequisites`:4529, `uncertainty`:4527, `name`:4519, `sources`:4524 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.emblem.004` | `src/games/kh3/content.json:4532`; `summary`:4535, `area`:4537, `instructions`:4543, `uncertainty`:4542, `name`:4534, `sources`:4539 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.emblem.005` | `src/games/kh3/content.json:4546`; `summary`:4549, `area`:4551, `instructions`:4557, `uncertainty`:4556, `name`:4548, `sources`:4553 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.emblem.006` | `src/games/kh3/content.json:4560`; `summary`:4563, `area`:4565, `instructions`:4571, `uncertainty`:4570, `name`:4562, `sources`:4567 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.emblem.007` | `src/games/kh3/content.json:4574`; `summary`:4577, `area`:4579, `instructions`:4585, `uncertainty`:4584, `name`:4576, `sources`:4581 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.emblem.008` | `src/games/kh3/content.json:4588`; `summary`:4591, `area`:4593, `instructions`:4599, `uncertainty`:4598, `name`:4590, `sources`:4595 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.emblem.009` | `src/games/kh3/content.json:4602`; `summary`:4605, `area`:4607, `instructions`:4613, `uncertainty`:4612, `name`:4604, `sources`:4609 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.emblem.010` | `src/games/kh3/content.json:4616`; `summary`:4619, `area`:4621, `instructions`:4627, `uncertainty`:4626, `name`:4618, `sources`:4623 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.san-fransokyo.emblem.011` | `src/games/kh3/content.json:4630`; `summary`:4633, `area`:4635, `instructions`:4641, `uncertainty`:4640, `name`:4632, `sources`:4637 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.100-acre-wood.emblem.001` | `src/games/kh3/content.json:4644`; `summary`:4647, `area`:4649, `instructions`:4655, `uncertainty`:4654, `name`:4646, `sources`:4651 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.100-acre-wood.emblem.002` | `src/games/kh3/content.json:4658`; `summary`:4661, `area`:4663, `instructions`:4669, `uncertainty`:4668, `name`:4660, `sources`:4665 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.100-acre-wood.emblem.003` | `src/games/kh3/content.json:4672`; `summary`:4675, `area`:4677, `instructions`:4683, `uncertainty`:4682, `name`:4674, `sources`:4679 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.keyblade-graveyard.chest.001` | `src/games/kh3/content.json:4686`; `summary`:4689, `area`:4691, `uncertainty`:4696, `name`:4688, `reward`:4697, `sources`:4693 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.keyblade-graveyard.chest.002` | `src/games/kh3/content.json:4700`; `summary`:4703, `area`:4705, `uncertainty`:4710, `name`:4702, `reward`:4711, `sources`:4707 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.keyblade-graveyard.chest.003` | `src/games/kh3/content.json:4714`; `summary`:4717, `area`:4719, `uncertainty`:4724, `name`:4716, `reward`:4725, `sources`:4721 | KH3-001, KH3-002 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.keyblade-graveyard.chest.004` | `src/games/kh3/content.json:4728`; `summary`:4731, `area`:4733, `uncertainty`:4738, `name`:4730, `reward`:4739, `sources`:4735 | KH3-001, KH3-002 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.keyblade-graveyard.chest.005` | `src/games/kh3/content.json:4742`; `summary`:4745, `area`:4747, `uncertainty`:4752, `name`:4744, `reward`:4753, `sources`:4749 | KH3-001, KH3-002 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.keyblade-graveyard.chest.006` | `src/games/kh3/content.json:4756`; `summary`:4759, `area`:4761, `uncertainty`:4766, `name`:4758, `reward`:4767, `sources`:4763 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.base.the-final-world.chest.001` | `src/games/kh3/content.json:4770`; `summary`:4773, `area`:4775, `prerequisites`:4782, `uncertainty`:4780, `name`:4772, `reward`:4781, `sources`:4777 | KH3-001 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.remind.scala-ad-caelum.chest.001` | `src/games/kh3/content.json:4785`; `summary`:4788, `area`:4790, `prerequisites`:4797, `uncertainty`:4795, `name`:4787, `reward`:4796, `sources`:4792 | KH3-004 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.remind.scala-ad-caelum.chest.002` | `src/games/kh3/content.json:4800`; `summary`:4803, `area`:4805, `prerequisites`:4812, `uncertainty`:4810, `name`:4802, `reward`:4811, `sources`:4807 | KH3-004 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.remind.scala-ad-caelum.chest.003` | `src/games/kh3/content.json:4815`; `summary`:4818, `area`:4820, `prerequisites`:4827, `uncertainty`:4825, `name`:4817, `reward`:4826, `sources`:4822 | KH3-004 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.remind.scala-ad-caelum.chest.004` | `src/games/kh3/content.json:4830`; `summary`:4833, `area`:4835, `prerequisites`:4842, `uncertainty`:4840, `name`:4832, `reward`:4841, `sources`:4837 | KH3-004 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.remind.scala-ad-caelum.chest.005` | `src/games/kh3/content.json:4845`; `summary`:4848, `area`:4850, `prerequisites`:4857, `uncertainty`:4855, `name`:4847, `reward`:4856, `sources`:4852 | KH3-004 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.remind.scala-ad-caelum.chest.006` | `src/games/kh3/content.json:4860`; `summary`:4863, `area`:4865, `prerequisites`:4872, `uncertainty`:4870, `name`:4862, `reward`:4871, `sources`:4867 | KH3-004 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.remind.scala-ad-caelum.chest.007` | `src/games/kh3/content.json:4875`; `summary`:4878, `area`:4880, `prerequisites`:4887, `uncertainty`:4885, `name`:4877, `reward`:4886, `sources`:4882 | KH3-004 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.remind.scala-ad-caelum.chest.008` | `src/games/kh3/content.json:4890`; `summary`:4893, `area`:4895, `prerequisites`:4902, `uncertainty`:4900, `name`:4892, `reward`:4901, `sources`:4897 | KH3-004 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.remind.scala-ad-caelum.chest.009` | `src/games/kh3/content.json:4905`; `summary`:4908, `area`:4910, `prerequisites`:4917, `uncertainty`:4915, `name`:4907, `reward`:4916, `sources`:4912 | KH3-004 | Area and journal number are sourced; a precise route is not yet verified. |
| `kh3.classic-kingdom.giantland` | `src/games/kh3/content.json:4920`; `summary`:4923, `name`:4922, `sources`:4925 | KH3-019 | Twilight Town clear |
| `kh3.classic-records.giantland-high-score` | `src/games/kh3/content.json:4930`; `summary`:4933, `prerequisites`:4934, `name`:4932, `reward`:4935, `sources`:4936 | KH3-019 | Set a new high score in Giantland. |
| `kh3.classic-kingdom.mickey-the-mail-pilot` | `src/games/kh3/content.json:4941`; `summary`:4944, `name`:4943, `sources`:4946 | KH3-019 | Tram Common film poster after Twilight Town |
| `kh3.classic-records.mickey-the-mail-pilot-high-score` | `src/games/kh3/content.json:4951`; `summary`:4954, `prerequisites`:4955, `name`:4953, `reward`:4956, `sources`:4957 | KH3-019 | Set a new high score in Mickey, the Mail Pilot. |
| `kh3.classic-kingdom.the-musical-farmer` | `src/games/kh3/content.json:4962`; `summary`:4965, `name`:4964, `sources`:4967 | KH3-019 | Tram Common film poster after Twilight Town |
| `kh3.classic-records.the-musical-farmer-high-score` | `src/games/kh3/content.json:4972`; `summary`:4975, `prerequisites`:4976, `name`:4974, `reward`:4977, `sources`:4978 | KH3-019 | Set a new high score in The Musical Farmer. |
| `kh3.classic-kingdom.building-a-building` | `src/games/kh3/content.json:4983`; `summary`:4986, `name`:4985, `sources`:4988 | KH3-019 | Tram Common film poster after 100 Acre Wood |
| `kh3.classic-records.building-a-building-high-score` | `src/games/kh3/content.json:4993`; `summary`:4996, `prerequisites`:4997, `name`:4995, `reward`:4998, `sources`:4999 | KH3-019 | Set a new high score in Building a Building. |
| `kh3.classic-kingdom.the-mad-doctor` | `src/games/kh3/content.json:5004`; `summary`:5007, `name`:5006, `sources`:5009 | KH3-019 | Tram Common film poster after 100 Acre Wood |
| `kh3.classic-records.the-mad-doctor-high-score` | `src/games/kh3/content.json:5014`; `summary`:5017, `prerequisites`:5018, `name`:5016, `reward`:5019, `sources`:5020 | KH3-019 | Set a new high score in The Mad Doctor. |
| `kh3.classic-records.mickey-cuts-up-high-score` | `src/games/kh3/content.json:5025`; `summary`:5028, `prerequisites`:5029, `name`:5027, `reward`:5030, `sources`:5031 | KH3-019 | Set a new high score in Mickey Cuts Up. |
| `kh3.classic-records.taxi-troubles-high-score` | `src/games/kh3/content.json:5036`; `summary`:5039, `prerequisites`:5040, `name`:5038, `reward`:5041, `sources`:5042 | KH3-019 | Set a new high score in Taxi Troubles. |
| `kh3.classic-records.the-barnyard-battle-high-score` | `src/games/kh3/content.json:5047`; `summary`:5050, `prerequisites`:5051, `name`:5049, `reward`:5052, `sources`:5053 | KH3-019 | Set a new high score in The Barnyard Battle. |
| `kh3.classic-records.the-wayward-canary-high-score` | `src/games/kh3/content.json:5058`; `summary`:5061, `prerequisites`:5062, `name`:5060, `reward`:5063, `sources`:5064 | KH3-019 | Set a new high score in The Wayward Canary. |
| `kh3.classic-records.camping-out-high-score` | `src/games/kh3/content.json:5069`; `summary`:5072, `prerequisites`:5073, `name`:5071, `reward`:5074, `sources`:5075 | KH3-019 | Set a new high score in Camping Out. |
| `kh3.classic-records.the-karnival-kid-high-score` | `src/games/kh3/content.json:5080`; `summary`:5083, `prerequisites`:5084, `name`:5082, `reward`:5085, `sources`:5086 | KH3-019 | Set a new high score in The Karnival Kid. |
| `kh3.classic-records.how-to-play-golf-high-score` | `src/games/kh3/content.json:5091`; `summary`:5094, `prerequisites`:5095, `name`:5093, `reward`:5096, `sources`:5097 | KH3-019 | Set a new high score in How to Play Golf. |
| `kh3.classic-records.mickey-s-circus-high-score` | `src/games/kh3/content.json:5102`; `summary`:5105, `prerequisites`:5106, `name`:5104, `reward`:5107, `sources`:5108 | KH3-019 | Set a new high score in Mickey's Circus. |
| `kh3.classic-records.barnyard-sports-high-score` | `src/games/kh3/content.json:5113`; `summary`:5116, `prerequisites`:5117, `name`:5115, `reward`:5118, `sources`:5119 | KH3-019 | Set a new high score in Barnyard Sports. |
| `kh3.classic-records.the-klondike-kid-high-score` | `src/games/kh3/content.json:5124`; `summary`:5127, `prerequisites`:5128, `name`:5126, `reward`:5129, `sources`:5130 | KH3-019 | Set a new high score in The Klondike Kid. |
| `kh3.classic-records.mickey-s-kitten-catch-high-score` | `src/games/kh3/content.json:5135`; `summary`:5138, `prerequisites`:5139, `name`:5137, `reward`:5140, `sources`:5141 | KH3-019 | Set a new high score in Mickey's Kitten Catch. |
| `kh3.classic-records.fishin-frenzy-high-score` | `src/games/kh3/content.json:5146`; `summary`:5149, `prerequisites`:5150, `name`:5148, `reward`:5151, `sources`:5152 | KH3-019 | Set a new high score in Fishin' Frenzy. |
| `kh3.classic-records.beach-party-high-score` | `src/games/kh3/content.json:5157`; `summary`:5160, `prerequisites`:5161, `name`:5159, `reward`:5162, `sources`:5163 | KH3-019 | Set a new high score in Beach Party. |
| `kh3.classic-records.mickey-s-prison-escape-high-score` | `src/games/kh3/content.json:5168`; `summary`:5171, `prerequisites`:5172, `name`:5170, `reward`:5173, `sources`:5174 | KH3-019 | Set a new high score in Mickey's Prison Escape. |
| `kh3.classic-records.cast-out-to-sea-high-score` | `src/games/kh3/content.json:5179`; `summary`:5182, `prerequisites`:5183, `name`:5181, `reward`:5184, `sources`:5185 | KH3-019 | Set a new high score in Cast Out to Sea. |
| `kh3.classic-records.how-to-play-baseball-high-score` | `src/games/kh3/content.json:5190`; `summary`:5193, `prerequisites`:5194, `name`:5192, `reward`:5195, `sources`:5196 | KH3-019 | Set a new high score in How to Play Baseball. |
| `kh3.classic-records.mickey-s-mechanical-man-high-score` | `src/games/kh3/content.json:5201`; `summary`:5204, `prerequisites`:5205, `name`:5203, `reward`:5206, `sources`:5207 | KH3-019 | Set a new high score in Mickey's Mechanical Man. |
| `kh3.classic-records.mickey-steps-out-high-score` | `src/games/kh3/content.json:5212`; `summary`:5215, `prerequisites`:5216, `name`:5214, `reward`:5217, `sources`:5218 | KH3-019 | Set a new high score in Mickey Steps Out. |
| `kh3.photos.photo-01-flame-core` | `src/games/kh3/content.json:5223`; `summary`:5226, `prerequisites`:5231, `name`:5225, `reward`:5227, `sources`:5228 | KH3-007 | Photograph Flame Core.; prerequisites=null (not proof of no unlock condition) |
| `kh3.photos.photo-02-water-core` | `src/games/kh3/content.json:5234`; `summary`:5237, `prerequisites`:5242, `name`:5236, `reward`:5238, `sources`:5239 | KH3-007 | Photograph Water Core.; prerequisites=null (not proof of no unlock condition) |
| `kh3.photos.photo-03-chief-puff` | `src/games/kh3/content.json:5245`; `summary`:5248, `prerequisites`:5253, `name`:5247, `reward`:5249, `sources`:5250 | KH3-007 | Photograph Chief Puff.; prerequisites=null (not proof of no unlock condition) |
| `kh3.photos.photo-04-hercules-statue` | `src/games/kh3/content.json:5256`; `summary`:5259, `prerequisites`:5264, `name`:5258, `reward`:5260, `sources`:5261 | KH3-007 | Photograph Hercules statue.; prerequisites=null (not proof of no unlock condition) |
| `kh3.photos.photo-05-beasts-bugs-display` | `src/games/kh3/content.json:5267`; `summary`:5270, `prerequisites`:5275, `name`:5269, `reward`:5271, `sources`:5272 | KH3-007 | Photograph Beasts & Bugs display.; prerequisites=null (not proof of no unlock condition) |
| `kh3.photos.photo-06-rapunzels-tower` | `src/games/kh3/content.json:5278`; `summary`:5281, `prerequisites`:5286, `name`:5280, `reward`:5282, `sources`:5283 | KH3-007 | Photograph Rapunzel’s tower.; prerequisites=null (not proof of no unlock condition) |
| `kh3.photos.photo-07-festival` | `src/games/kh3/content.json:5289`; `summary`:5292, `prerequisites`:5297, `name`:5291, `reward`:5293, `sources`:5294 | KH3-007 | Photograph Festival.; prerequisites=null (not proof of no unlock condition) |
| `kh3.photos.photo-08-secluded-forge-fire` | `src/games/kh3/content.json:5300`; `summary`:5303, `prerequisites`:5308, `name`:5302, `reward`:5304, `sources`:5305 | KH3-007 | Photograph Secluded Forge fire.; prerequisites=null (not proof of no unlock condition) |
| `kh3.photos.photo-09-zeus` | `src/games/kh3/content.json:5311`; `summary`:5314, `prerequisites`:5319, `name`:5313, `reward`:5315, `sources`:5316 | KH3-007 | Photograph Zeus.; prerequisites=null (not proof of no unlock condition) |
| `kh3.photos.photo-10-tram` | `src/games/kh3/content.json:5322`; `summary`:5325, `prerequisites`:5330, `name`:5324, `reward`:5326, `sources`:5327 | KH3-007 | Photograph Tram.; prerequisites=null (not proof of no unlock condition) |
| `kh3.photos.photo-11-cda-agent` | `src/games/kh3/content.json:5333`; `summary`:5336, `prerequisites`:5341, `name`:5335, `reward`:5337, `sources`:5338 | KH3-007 | Photograph CDA agent.; prerequisites=null (not proof of no unlock condition) |
| `kh3.photos.photo-12-ice-palace` | `src/games/kh3/content.json:5344`; `summary`:5347, `prerequisites`:5352, `name`:5346, `reward`:5348, `sources`:5349 | KH3-007 | Photograph Ice palace.; prerequisites=null (not proof of no unlock condition) |
| `kh3.photos.photo-13-olaf` | `src/games/kh3/content.json:5355`; `summary`:5358, `prerequisites`:5363, `name`:5357, `reward`:5359, `sources`:5360 | KH3-007 | Photograph Olaf.; prerequisites=null (not proof of no unlock condition) |
| `kh3.photos.photo-14-green-cactuar` | `src/games/kh3/content.json:5366`; `summary`:5369, `prerequisites`:5374, `name`:5368, `reward`:5370, `sources`:5371 | KH3-007 | Photograph Green cactuar.; prerequisites=null (not proof of no unlock condition) |
| `kh3.photos.photo-15-scarecrow` | `src/games/kh3/content.json:5377`; `summary`:5380, `prerequisites`:5385, `name`:5379, `reward`:5381, `sources`:5382 | KH3-007 | Photograph Scarecrow.; prerequisites=null (not proof of no unlock condition) |
| `kh3.photos.photo-16-evening-star` | `src/games/kh3/content.json:5388`; `summary`:5391, `prerequisites`:5396, `name`:5390, `reward`:5392, `sources`:5393 | KH3-007 | Photograph Evening star. |
| `kh3.photos.photo-17-fish-shaped-windsocks` | `src/games/kh3/content.json:5399`; `summary`:5402, `prerequisites`:5407, `name`:5401, `reward`:5403, `sources`:5404 | KH3-007 | Photograph Fish-shaped windsocks. |
| `kh3.photos.photo-18-port-royal-waterfall` | `src/games/kh3/content.json:5410`; `summary`:5413, `prerequisites`:5418, `name`:5412, `reward`:5414, `sources`:5415 | KH3-007 | Photograph Port Royal waterfall.; prerequisites=null (not proof of no unlock condition) |
| `kh3.photos.photo-19-demon-tower` | `src/games/kh3/content.json:5421`; `summary`:5424, `prerequisites`:5429, `name`:5423, `reward`:5425, `sources`:5426 | KH3-007 | Photograph Demon Tower. |
| `kh3.photos.photo-20-twelve-teammates` | `src/games/kh3/content.json:5432`; `summary`:5435, `prerequisites`:5440, `name`:5434, `reward`:5436, `sources`:5437 | KH3-007, KH3-002 | Photograph Twelve teammates. |
| `kh3.battlegates.battlegate-00` | `src/games/kh3/content.json:5443`; `summary`:5446, `area`:5448, `prerequisites`:5449, `name`:5445, `reward`:5450, `sources`:5451 | KH3-023, KH3-035 | Clear the encounter at Skein of Severance. |
| `kh3.battlegates.battlegate-01` | `src/games/kh3/content.json:5456`; `summary`:5459, `area`:5461, `prerequisites`:5462, `name`:5458, `reward`:5463, `sources`:5464, `categories`:5467 | KH3-023, KH3-035 | Clear the encounter at Courtyard. |
| `kh3.battlegates.battlegate-02` | `src/games/kh3/content.json:5472`; `summary`:5475, `area`:5477, `prerequisites`:5478, `name`:5474, `reward`:5479, `sources`:5480, `categories`:5483 | KH3-023, KH3-035 | Clear the encounter at Apex. |
| `kh3.battlegates.battlegate-03` | `src/games/kh3/content.json:5488`; `summary`:5491, `area`:5493, `prerequisites`:5494, `name`:5490, `reward`:5495, `sources`:5496, `categories`:5499 | KH3-023, KH3-035 | Clear the encounter at Old Mansion. |
| `kh3.battlegates.battlegate-04` | `src/games/kh3/content.json:5504`; `summary`:5507, `area`:5509, `prerequisites`:5510, `name`:5506, `reward`:5511, `sources`:5512, `categories`:5515 | KH3-023, KH3-035 | Clear the encounter at Kid Korral. |
| `kh3.battlegates.battlegate-05` | `src/games/kh3/content.json:5520`; `summary`:5523, `area`:5525, `prerequisites`:5526, `name`:5522, `reward`:5527, `sources`:5528, `categories`:5531 | KH3-023, KH3-035 | Clear the encounter at Main Floor 1F. |
| `kh3.battlegates.battlegate-06` | `src/games/kh3/content.json:5536`; `summary`:5539, `area`:5541, `prerequisites`:5542, `name`:5538, `reward`:5543, `sources`:5544, `categories`:5547 | KH3-023, KH3-035 | Clear the encounter at Wetlands. |
| `kh3.battlegates.battlegate-07` | `src/games/kh3/content.json:5552`; `summary`:5555, `area`:5557, `prerequisites`:5558, `name`:5554, `reward`:5559, `sources`:5560, `categories`:5563 | KH3-023, KH3-035 | Clear the encounter at Hills. |
| `kh3.battlegates.battlegate-08` | `src/games/kh3/content.json:5568`; `summary`:5571, `area`:5573, `prerequisites`:5574, `name`:5570, `reward`:5575, `sources`:5576, `categories`:5579 | KH3-023, KH3-035 | Clear the encounter at Tank Yard. |
| `kh3.battlegates.battlegate-09` | `src/games/kh3/content.json:5584`; `summary`:5587, `area`:5589, `prerequisites`:5590, `name`:5586, `reward`:5591, `sources`:5592, `categories`:5595 | KH3-023, KH3-035 | Clear the encounter at Middle Tier. |
| `kh3.battlegates.battlegate-10` | `src/games/kh3/content.json:5600`; `summary`:5603, `area`:5605, `prerequisites`:5606, `name`:5602, `reward`:5607, `sources`:5608, `categories`:5611 | KH3-023, KH3-035 | Clear the encounter at Huddled Isles. |
| `kh3.battlegates.battlegate-11` | `src/games/kh3/content.json:5616`; `summary`:5619, `area`:5621, `prerequisites`:5622, `name`:5618, `reward`:5623, `sources`:5624, `categories`:5627 | KH3-023, KH3-035 | Clear the encounter at North District. |
| `kh3.battlegates.battlegate-12` | `src/games/kh3/content.json:5632`; `summary`:5635, `area`:5637, `prerequisites`:5638, `name`:5634, `reward`:5639, `sources`:5640, `categories`:5643 | KH3-023, KH3-035 | Clear the encounter at Central District. |
| `kh3.battlegates.battlegate-13` | `src/games/kh3/content.json:5648`; `summary`:5651, `area`:5653, `prerequisites`:5654, `name`:5650, `reward`:5655, `sources`:5656, `categories`:5659 | KH3-023, KH3-035 | Clear the encounter at Badlands. |
| `kh3.battlegates.battlegate-14-dark-inferno` | `src/games/kh3/content.json:5664`; `summary`:5667, `area`:5669, `prerequisites`:5670, `name`:5666, `reward`:5671, `sources`:5672 | KH3-023, KH3-035 | Clear the encounter at Badlands. |
| `kh3.challenges.cherry-flan` | `src/games/kh3/content.json:5677`; `summary`:5680, `area`:5682, `uncertainty`:5684, `name`:5679, `reward`:5683, `sources`:5685 | KH3-018 | Published threshold uses a strict greater-than comparison; exact equality is not verified. |
| `kh3.challenges.strawberry-flan` | `src/games/kh3/content.json:5690`; `summary`:5693, `area`:5695, `uncertainty`:5697, `name`:5692, `reward`:5696, `sources`:5698 | KH3-018 | Published threshold uses a strict greater-than comparison; exact equality is not verified. |
| `kh3.challenges.orange-flan` | `src/games/kh3/content.json:5703`; `summary`:5706, `area`:5708, `uncertainty`:5710, `name`:5705, `reward`:5709, `sources`:5711 | KH3-018 | Published threshold uses a strict greater-than comparison; exact equality is not verified. |
| `kh3.challenges.banana-flan` | `src/games/kh3/content.json:5716`; `summary`:5719, `area`:5721, `uncertainty`:5723, `name`:5718, `reward`:5722, `sources`:5724 | KH3-018 | Published threshold uses a strict greater-than comparison; exact equality is not verified. |
| `kh3.challenges.grape-flan` | `src/games/kh3/content.json:5729`; `summary`:5732, `area`:5734, `uncertainty`:5736, `name`:5731, `reward`:5735, `sources`:5737 | KH3-018 | Published threshold uses a strict greater-than comparison; exact equality is not verified. |
| `kh3.challenges.watermelon-flan` | `src/games/kh3/content.json:5742`; `summary`:5745, `area`:5747, `uncertainty`:5749, `name`:5744, `reward`:5748, `sources`:5750 | KH3-018 | Published threshold uses a strict greater-than comparison; exact equality is not verified. |
| `kh3.challenges.honeydew-flan` | `src/games/kh3/content.json:5755`; `summary`:5758, `area`:5760, `uncertainty`:5762, `name`:5757, `reward`:5761, `sources`:5763 | KH3-018 | Published threshold uses a strict greater-than comparison; exact equality is not verified. |
| `kh3.challenges.verum-rex-beat-of-lead` | `src/games/kh3/content.json:5768`; `summary`:5771, `instructions`:5772, `name`:5770, `sources`:5773 | KH3-020 | A rank: 10,000,000. |
| `kh3.challenges.festival-dance` | `src/games/kh3/content.json:5778`; `summary`:5781, `instructions`:5782, `name`:5780, `sources`:5783 | KH3-020 | A rank: 50,000. |
| `kh3.challenges.frozen-slider` | `src/games/kh3/content.json:5788`; `summary`:5791, `instructions`:5792, `name`:5790, `sources`:5793 | KH3-006, KH3-020 | A rank: 500,000. |
| `kh3.challenges.flash-tracer-a` | `src/games/kh3/content.json:5798`; `summary`:5801, `instructions`:5802, `name`:5800, `sources`:5803 | KH3-020 | A rank: 60,000. |
| `kh3.challenges.flash-tracer-b` | `src/games/kh3/content.json:5808`; `summary`:5811, `instructions`:5812, `name`:5810, `sources`:5813 | KH3-020 | A rank: 75,000. |
| `kh3.herc.figure-1` | `src/games/kh3/content.json:5818`; `summary`:5821, `area`:5823, `name`:5820, `reward`:5825, `sources`:5826 | — | On the bench opposite the save point.; known landmark implemented (H03) |
| `kh3.herc.figure-2` | `src/games/kh3/content.json:5831`; `summary`:5834, `area`:5836, `name`:5833, `reward`:5838, `sources`:5839 | — | On the giant statue’s shield.; known landmark implemented (H03) |
| `kh3.herc.figure-3` | `src/games/kh3/content.json:5844`; `summary`:5847, `area`:5849, `name`:5846, `reward`:5851, `sources`:5852 | — | On the bench in the storage building.; known landmark implemented (H03) |
| `kh3.herc.figure-4` | `src/games/kh3/content.json:5857`; `summary`:5860, `area`:5862, `name`:5859, `reward`:5864, `sources`:5865 | — | In the excavated hole.; known landmark implemented (H03) |
| `kh3.herc.figure-5` | `src/games/kh3/content.json:5870`; `summary`:5873, `area`:5875, `name`:5872, `reward`:5877, `sources`:5878 | — | On rear scaffolding near the temple.; known landmark implemented (H03) |
| `kh3.remind.ansem-data-battle` | `src/games/kh3/content.json:5883`; `summary`:5886, `prerequisites`:5888, `name`:5885, `reward`:5889, `sources`:5890 | KH3-004, KH3-028 | Defeat Ansem in Limitcut. |
| `kh3.remind.xemnas-data-battle` | `src/games/kh3/content.json:5895`; `summary`:5898, `prerequisites`:5900, `name`:5897, `reward`:5901, `sources`:5902 | KH3-004, KH3-028, KH3-002 | Defeat Xemnas in Limitcut. |
| `kh3.remind.xigbar-data-battle` | `src/games/kh3/content.json:5907`; `summary`:5910, `prerequisites`:5912, `name`:5909, `reward`:5913, `sources`:5914 | KH3-004, KH3-028 | Defeat Xigbar in Limitcut. |
| `kh3.remind.luxord-data-battle` | `src/games/kh3/content.json:5919`; `summary`:5922, `prerequisites`:5924, `name`:5921, `reward`:5925, `sources`:5926 | KH3-004, KH3-028 | Defeat Luxord in Limitcut. |
| `kh3.remind.larxene-data-battle` | `src/games/kh3/content.json:5931`; `summary`:5934, `prerequisites`:5936, `name`:5933, `reward`:5937, `sources`:5938 | KH3-004, KH3-028 | Defeat Larxene in Limitcut. |
| `kh3.remind.marluxia-data-battle` | `src/games/kh3/content.json:5943`; `summary`:5946, `prerequisites`:5948, `name`:5945, `reward`:5949, `sources`:5950 | KH3-004, KH3-028 | Defeat Marluxia in Limitcut. |
| `kh3.remind.saix-data-battle` | `src/games/kh3/content.json:5955`; `summary`:5958, `prerequisites`:5960, `name`:5957, `reward`:5961, `sources`:5962 | KH3-004, KH3-028, KH3-002 | Defeat Saïx in Limitcut. |
| `kh3.remind.terra-xehanort-data-battle` | `src/games/kh3/content.json:5967`; `summary`:5970, `prerequisites`:5972, `name`:5969, `reward`:5973, `sources`:5974 | KH3-004, KH3-028, KH3-002 | Defeat Terra-Xehanort in Limitcut. |
| `kh3.remind.dark-riku-data-battle` | `src/games/kh3/content.json:5979`; `summary`:5982, `prerequisites`:5984, `name`:5981, `reward`:5985, `sources`:5986 | KH3-004, KH3-028, KH3-002 | Defeat Dark Riku in Limitcut. |
| `kh3.remind.vanitas-data-battle` | `src/games/kh3/content.json:5991`; `summary`:5994, `prerequisites`:5996, `name`:5993, `reward`:5997, `sources`:5998 | KH3-004, KH3-028 | Defeat Vanitas in Limitcut. |
| `kh3.remind.young-xehanort-data-battle` | `src/games/kh3/content.json:6003`; `summary`:6006, `prerequisites`:6008, `name`:6005, `reward`:6009, `sources`:6010 | KH3-004, KH3-028 | Defeat Young Xehanort in Limitcut. |
| `kh3.remind.xion-data-battle` | `src/games/kh3/content.json:6015`; `summary`:6018, `prerequisites`:6020, `name`:6017, `reward`:6021, `sources`:6022 | KH3-004, KH3-028 | Defeat Xion in Limitcut. |
| `kh3.remind.master-xehanort-data-battle` | `src/games/kh3/content.json:6027`; `summary`:6030, `prerequisites`:6032, `name`:6029, `reward`:6033, `sources`:6034 | KH3-004, KH3-028 | Defeat Master Xehanort in Limitcut. |
| `kh3.remind.yozora` | `src/games/kh3/content.json:6039`; `summary`:6042, `prerequisites`:6044, `name`:6041, `reward`:6045, `sources`:6046 | KH3-004, KH3-028 | Win the Secret Episode encounter; the loss ending is not a victory. |
| `kh3.gummi.cactuar-constellation` | `src/games/kh3/content.json:6051`; `summary`:6054, `name`:6053, `reward`:6056, `sources`:6057 | KH3-026 | Photograph the constellation. Lower right, Corona side. |
| `kh3.gummi.bomb-constellation` | `src/games/kh3/content.json:6062`; `summary`:6065, `name`:6064, `reward`:6067, `sources`:6068 | KH3-026 | Photograph the constellation. Olympus side. |
| `kh3.gummi.moogle-constellation` | `src/games/kh3/content.json:6073`; `summary`:6076, `name`:6075, `reward`:6078, `sources`:6079 | KH3-026 | Photograph the constellation. Upper left between Twilight Town and Toy Box. |
| `kh3.gummi.endymion-constellation` | `src/games/kh3/content.json:6084`; `summary`:6087, `name`:6086, `reward`:6089, `sources`:6090 | KH3-026 | Photograph the constellation. Lower middle between San Fransokyo and Caribbean. |
| `kh3.gummi.tonberry-constellation` | `src/games/kh3/content.json:6095`; `summary`:6098, `name`:6097, `reward`:6100, `sources`:6101 | KH3-026 | Photograph the constellation. Upper right near Arendelle. |
| `kh3.gummi.imp-constellation` | `src/games/kh3/content.json:6106`; `summary`:6109, `name`:6108, `reward`:6111, `sources`:6112 | KH3-026 | Photograph the constellation. Upper left near Monstropolis. |
| `kh3.gummi.bismarck-constellation` | `src/games/kh3/content.json:6117`; `summary`:6120, `name`:6119, `reward`:6122, `sources`:6123 | KH3-026 | Photograph the constellation. Lower left. |
| `kh3.gummi.ultros-constellation` | `src/games/kh3/content.json:6128`; `summary`:6131, `name`:6130, `reward`:6133, `sources`:6134 | KH3-026 | Photograph the constellation. Upper middle near Keyblade Graveyard. |
| `kh3.gummi.omega-constellation` | `src/games/kh3/content.json:6139`; `summary`:6142, `name`:6141, `reward`:6144, `sources`:6145 | KH3-026 | Photograph the constellation. Lower right. |
| `kh3.gummi.schwarzgeist` | `src/games/kh3/content.json:6150`; `summary`:6153, `name`:6152, `reward`:6155, `sources`:6156 | KH3-027 | Enter the Misty Stream encounter with ship Speed at least 200. |
| `kh3.gummi.omega-machina` | `src/games/kh3/content.json:6161`; `summary`:6164, `name`:6163, `reward`:6166, `sources`:6167 | KH3-027 | Clear the other five Eclipse battles to unlock the boss. |
| `kh3.material.veal` | `src/games/kh3/content.json:6172`; `summary`:6175, `instructions`:6180, `uncertainty`:6184, `name`:6174, `sources`:6181, `categories`:6177 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.beef` | `src/games/kh3/content.json:6187`; `summary`:6190, `instructions`:6195, `uncertainty`:6199, `name`:6189, `sources`:6196, `categories`:6192 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.quail` | `src/games/kh3/content.json:6202`; `summary`:6205, `instructions`:6210, `uncertainty`:6214, `name`:6204, `sources`:6211, `categories`:6207 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.filet-mignon` | `src/games/kh3/content.json:6217`; `summary`:6220, `instructions`:6225, `uncertainty`:6229, `name`:6219, `sources`:6226, `categories`:6222 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.crab` | `src/games/kh3/content.json:6232`; `summary`:6235, `instructions`:6240, `uncertainty`:6244, `name`:6234, `sources`:6241, `categories`:6237 | KH3-015, KH3-002 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.scallop` | `src/games/kh3/content.json:6247`; `summary`:6250, `instructions`:6255, `uncertainty`:6259, `name`:6249, `sources`:6256, `categories`:6252 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.lobster` | `src/games/kh3/content.json:6262`; `summary`:6265, `instructions`:6270, `uncertainty`:6274, `name`:6264, `sources`:6271, `categories`:6267 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.sole` | `src/games/kh3/content.json:6277`; `summary`:6280, `instructions`:6285, `uncertainty`:6289, `name`:6279, `sources`:6286, `categories`:6282 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.eel` | `src/games/kh3/content.json:6292`; `summary`:6295, `instructions`:6300, `uncertainty`:6304, `name`:6294, `sources`:6301, `categories`:6297 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.sea-bass` | `src/games/kh3/content.json:6307`; `summary`:6310, `instructions`:6315, `uncertainty`:6319, `name`:6309, `sources`:6316, `categories`:6312 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.mussel` | `src/games/kh3/content.json:6322`; `summary`:6325, `instructions`:6330, `uncertainty`:6334, `name`:6324, `sources`:6331, `categories`:6327 | KH3-015, KH3-002 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.cod` | `src/games/kh3/content.json:6337`; `summary`:6340, `instructions`:6345, `uncertainty`:6349, `name`:6339, `sources`:6346, `categories`:6342 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.pumpkin` | `src/games/kh3/content.json:6352`; `summary`:6355, `instructions`:6360, `uncertainty`:6364, `name`:6354, `sources`:6361, `categories`:6357 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.zucchini` | `src/games/kh3/content.json:6367`; `summary`:6370, `instructions`:6375, `uncertainty`:6379, `name`:6369, `sources`:6376, `categories`:6372 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.onion` | `src/games/kh3/content.json:6382`; `summary`:6385, `instructions`:6390, `uncertainty`:6394, `name`:6384, `sources`:6391, `categories`:6387 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.tomato` | `src/games/kh3/content.json:6397`; `summary`:6400, `instructions`:6405, `uncertainty`:6409, `name`:6399, `sources`:6406, `categories`:6402 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.eggplant` | `src/games/kh3/content.json:6412`; `summary`:6415, `instructions`:6420, `uncertainty`:6424, `name`:6414, `sources`:6421, `categories`:6417 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.carrot` | `src/games/kh3/content.json:6427`; `summary`:6430, `instructions`:6435, `uncertainty`:6439, `name`:6429, `sources`:6436, `categories`:6432 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.garlic` | `src/games/kh3/content.json:6442`; `summary`:6445, `instructions`:6450, `uncertainty`:6454, `name`:6444, `sources`:6451, `categories`:6447 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.celery` | `src/games/kh3/content.json:6457`; `summary`:6460, `instructions`:6465, `uncertainty`:6469, `name`:6459, `sources`:6466, `categories`:6462 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.morel` | `src/games/kh3/content.json:6472`; `summary`:6475, `instructions`:6480, `uncertainty`:6484, `name`:6474, `sources`:6481, `categories`:6477 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.porcini` | `src/games/kh3/content.json:6487`; `summary`:6490, `instructions`:6495, `uncertainty`:6499, `name`:6489, `sources`:6496, `categories`:6492 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.chanterelle` | `src/games/kh3/content.json:6502`; `summary`:6505, `instructions`:6510, `uncertainty`:6514, `name`:6504, `sources`:6511, `categories`:6507 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.portobello` | `src/games/kh3/content.json:6517`; `summary`:6520, `instructions`:6525, `uncertainty`:6529, `name`:6519, `sources`:6526, `categories`:6522 | KH3-015, KH3-002 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.black-truffle` | `src/games/kh3/content.json:6532`; `summary`:6535, `instructions`:6540, `uncertainty`:6544, `name`:6534, `sources`:6541, `categories`:6537 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.king-oyster-mushroom` | `src/games/kh3/content.json:6547`; `summary`:6550, `instructions`:6555, `uncertainty`:6559, `name`:6549, `sources`:6556, `categories`:6552 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.black-trumpet` | `src/games/kh3/content.json:6562`; `summary`:6565, `instructions`:6570, `uncertainty`:6574, `name`:6564, `sources`:6571, `categories`:6567 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.miller-mushroom` | `src/games/kh3/content.json:6577`; `summary`:6580, `instructions`:6585, `uncertainty`:6589, `name`:6579, `sources`:6586, `categories`:6582 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.cloves` | `src/games/kh3/content.json:6592`; `summary`:6595, `instructions`:6600, `uncertainty`:6604, `name`:6594, `sources`:6601, `categories`:6597 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.rosemary` | `src/games/kh3/content.json:6607`; `summary`:6610, `instructions`:6615, `uncertainty`:6619, `name`:6609, `sources`:6616, `categories`:6612 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.thyme` | `src/games/kh3/content.json:6622`; `summary`:6625, `instructions`:6630, `uncertainty`:6634, `name`:6624, `sources`:6631, `categories`:6627 | KH3-015, KH3-002 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.bay-leaf` | `src/games/kh3/content.json:6637`; `summary`:6640, `instructions`:6645, `uncertainty`:6649, `name`:6639, `sources`:6646, `categories`:6642 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.basil` | `src/games/kh3/content.json:6652`; `summary`:6655, `instructions`:6660, `uncertainty`:6664, `name`:6654, `sources`:6661, `categories`:6657 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.dill` | `src/games/kh3/content.json:6667`; `summary`:6670, `instructions`:6675, `uncertainty`:6679, `name`:6669, `sources`:6676, `categories`:6672 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.parsley` | `src/games/kh3/content.json:6682`; `summary`:6685, `instructions`:6690, `uncertainty`:6694, `name`:6684, `sources`:6691, `categories`:6687 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.saffron` | `src/games/kh3/content.json:6697`; `summary`:6700, `instructions`:6705, `uncertainty`:6709, `name`:6699, `sources`:6706, `categories`:6702 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.apricot` | `src/games/kh3/content.json:6712`; `summary`:6715, `instructions`:6720, `uncertainty`:6724, `name`:6714, `sources`:6721, `categories`:6717 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.gooseberry` | `src/games/kh3/content.json:6727`; `summary`:6730, `instructions`:6735, `uncertainty`:6739, `name`:6729, `sources`:6736, `categories`:6732 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.lemon` | `src/games/kh3/content.json:6742`; `summary`:6745, `instructions`:6750, `uncertainty`:6754, `name`:6744, `sources`:6751, `categories`:6747 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.orange` | `src/games/kh3/content.json:6757`; `summary`:6760, `instructions`:6765, `uncertainty`:6769, `name`:6759, `sources`:6766, `categories`:6762 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.raspberry` | `src/games/kh3/content.json:6772`; `summary`:6775, `instructions`:6780, `uncertainty`:6784, `name`:6774, `sources`:6781, `categories`:6777 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.pear` | `src/games/kh3/content.json:6787`; `summary`:6790, `instructions`:6795, `uncertainty`:6799, `name`:6789, `sources`:6796, `categories`:6792 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.blackberry` | `src/games/kh3/content.json:6802`; `summary`:6805, `instructions`:6810, `uncertainty`:6814, `name`:6804, `sources`:6811, `categories`:6807 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.apple` | `src/games/kh3/content.json:6817`; `summary`:6820, `instructions`:6825, `uncertainty`:6829, `name`:6819, `sources`:6826, `categories`:6822 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.cheese` | `src/games/kh3/content.json:6832`; `summary`:6835, `instructions`:6840, `uncertainty`:6844, `name`:6834, `sources`:6841, `categories`:6837 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.chocolate` | `src/games/kh3/content.json:6847`; `summary`:6850, `instructions`:6855, `uncertainty`:6859, `name`:6849, `sources`:6856, `categories`:6852 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.caviar` | `src/games/kh3/content.json:6862`; `summary`:6865, `instructions`:6870, `uncertainty`:6874, `name`:6864, `sources`:6871, `categories`:6867 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.butter` | `src/games/kh3/content.json:6877`; `summary`:6880, `instructions`:6885, `uncertainty`:6889, `name`:6879, `sources`:6886, `categories`:6882 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.olive-oil` | `src/games/kh3/content.json:6892`; `summary`:6895, `instructions`:6900, `uncertainty`:6904, `name`:6894, `sources`:6901, `categories`:6897 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.cornichon` | `src/games/kh3/content.json:6907`; `summary`:6910, `instructions`:6915, `uncertainty`:6919, `name`:6909, `sources`:6916, `categories`:6912 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.rice` | `src/games/kh3/content.json:6922`; `summary`:6925, `instructions`:6930, `uncertainty`:6934, `name`:6924, `sources`:6931, `categories`:6927 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.honey` | `src/games/kh3/content.json:6937`; `summary`:6940, `instructions`:6945, `uncertainty`:6949, `name`:6939, `sources`:6946, `categories`:6942 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.sour-cherry` | `src/games/kh3/content.json:6952`; `summary`:6955, `instructions`:6960, `uncertainty`:6964, `name`:6954, `sources`:6961, `categories`:6957 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.strawberry` | `src/games/kh3/content.json:6967`; `summary`:6970, `instructions`:6975, `uncertainty`:6979, `name`:6969, `sources`:6976, `categories`:6972 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.blood-orange` | `src/games/kh3/content.json:6982`; `summary`:6985, `instructions`:6990, `uncertainty`:6994, `name`:6984, `sources`:6991, `categories`:6987 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.banana` | `src/games/kh3/content.json:6997`; `summary`:7000, `instructions`:7005, `uncertainty`:7009, `name`:6999, `sources`:7006, `categories`:7002 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.grapes` | `src/games/kh3/content.json:7012`; `summary`:7015, `instructions`:7020, `uncertainty`:7024, `name`:7014, `sources`:7021, `categories`:7017 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.melon` | `src/games/kh3/content.json:7027`; `summary`:7030, `instructions`:7035, `uncertainty`:7039, `name`:7029, `sources`:7036, `categories`:7032 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.material.watermelon` | `src/games/kh3/content.json:7042`; `summary`:7045, `instructions`:7050, `uncertainty`:7054, `name`:7044, `sources`:7051, `categories`:7047 | KH3-015 | Listed source areas; individual pickup positions are not yet mapped. |
| `kh3.cuisine.mushroom-terrine-excellent` | `src/games/kh3/content.json:7057`; `summary`:7060, `area`:7062, `instructions`:7063, `name`:7059, `reward`:7064, `sources`:7065 | KH3-016, KH3-017 | Cook with an Excellent result using Crack the Egg. |
| `kh3.cuisine.scallop-poele-excellent` | `src/games/kh3/content.json:7070`; `summary`:7073, `area`:7075, `instructions`:7076, `name`:7072, `reward`:7077, `sources`:7078 | KH3-016, KH3-017 | Cook with an Excellent result using Flambé the Food. |
| `kh3.cuisine.ratatouille-excellent` | `src/games/kh3/content.json:7083`; `summary`:7086, `area`:7088, `instructions`:7089, `name`:7085, `reward`:7090, `sources`:7091 | KH3-016, KH3-017 | Cook with an Excellent result using Chop the Ingredients. |
| `kh3.cuisine.lobster-mousse-excellent` | `src/games/kh3/content.json:7096`; `summary`:7099, `area`:7101, `instructions`:7102, `name`:7098, `reward`:7103, `sources`:7104 | KH3-016, KH3-017 | Cook with an Excellent result using Crack the Egg. |
| `kh3.cuisine.caprese-salad-excellent` | `src/games/kh3/content.json:7109`; `summary`:7112, `area`:7114, `instructions`:7115, `name`:7111, `reward`:7116, `sources`:7117 | KH3-016, KH3-017 | Cook with an Excellent result using Grind the Pepper. |
| `kh3.cuisine.consomme-excellent` | `src/games/kh3/content.json:7122`; `summary`:7125, `area`:7127, `instructions`:7128, `name`:7124, `reward`:7129, `sources`:7130 | KH3-016, KH3-017 | Cook with an Excellent result using Chop the Ingredients. |
| `kh3.cuisine.pumpkin-veloute-excellent` | `src/games/kh3/content.json:7135`; `summary`:7138, `area`:7140, `instructions`:7141, `name`:7137, `reward`:7142, `sources`:7143 | KH3-016, KH3-017 | Cook with an Excellent result using Crack the Egg. |
| `kh3.cuisine.carrot-potage-excellent` | `src/games/kh3/content.json:7148`; `summary`:7151, `area`:7153, `instructions`:7154, `name`:7150, `reward`:7155, `sources`:7156 | KH3-016, KH3-017 | Cook with an Excellent result using Grind the Pepper. |
| `kh3.cuisine.crab-bisque-excellent` | `src/games/kh3/content.json:7161`; `summary`:7164, `area`:7166, `instructions`:7167, `name`:7163, `reward`:7168, `sources`:7169 | KH3-016, KH3-017 | Cook with an Excellent result using Flambé the Food. |
| `kh3.cuisine.cold-tomato-soup-excellent` | `src/games/kh3/content.json:7174`; `summary`:7177, `area`:7179, `instructions`:7180, `name`:7176, `reward`:7181, `sources`:7182 | KH3-016, KH3-017 | Cook with an Excellent result using Chop the Ingredients. |
| `kh3.cuisine.sole-meuniere-excellent` | `src/games/kh3/content.json:7187`; `summary`:7190, `area`:7192, `instructions`:7193, `name`:7189, `reward`:7194, `sources`:7195 | KH3-016, KH3-017 | Cook with an Excellent result using Grind the Pepper. |
| `kh3.cuisine.eel-matelote-excellent` | `src/games/kh3/content.json:7200`; `summary`:7203, `area`:7205, `instructions`:7206, `name`:7202, `reward`:7207, `sources`:7208 | KH3-016, KH3-017 | Cook with an Excellent result using Flambé the Food. |
| `kh3.cuisine.bouillabaisse-excellent` | `src/games/kh3/content.json:7213`; `summary`:7216, `area`:7218, `instructions`:7219, `name`:7215, `reward`:7220, `sources`:7221 | KH3-016, KH3-017 | Cook with an Excellent result using Chop the Ingredients. |
| `kh3.cuisine.sea-bass-en-papillote-excellent` | `src/games/kh3/content.json:7226`; `summary`:7229, `area`:7231, `instructions`:7232, `name`:7228, `reward`:7233, `sources`:7234 | KH3-016, KH3-017 | Cook with an Excellent result using Grind the Pepper. |
| `kh3.cuisine.seafood-tartare-excellent` | `src/games/kh3/content.json:7239`; `summary`:7242, `area`:7244, `instructions`:7245, `name`:7241, `reward`:7246, `sources`:7247 | KH3-016, KH3-017 | Cook with an Excellent result using Grind the Pepper. |
| `kh3.cuisine.sea-bass-poele-excellent` | `src/games/kh3/content.json:7252`; `summary`:7255, `area`:7257, `instructions`:7258, `name`:7254, `reward`:7259, `sources`:7260 | KH3-016, KH3-017 | Cook with an Excellent result using Flambé the Food. |
| `kh3.cuisine.sweetbread-poele-excellent` | `src/games/kh3/content.json:7265`; `summary`:7268, `area`:7270, `instructions`:7271, `name`:7267, `reward`:7272, `sources`:7273 | KH3-016, KH3-017 | Cook with an Excellent result using Flambé the Food. |
| `kh3.cuisine.beef-saute-excellent` | `src/games/kh3/content.json:7278`; `summary`:7281, `area`:7283, `instructions`:7284, `name`:7280, `reward`:7285, `sources`:7286 | KH3-016, KH3-017 | Cook with an Excellent result using Grind the Pepper. |
| `kh3.cuisine.beef-bourguignon-excellent` | `src/games/kh3/content.json:7291`; `summary`:7294, `area`:7296, `instructions`:7297, `name`:7293, `reward`:7298, `sources`:7299 | KH3-016, KH3-017 | Cook with an Excellent result using Grind the Pepper. |
| `kh3.cuisine.stuffed-quail-excellent` | `src/games/kh3/content.json:7304`; `summary`:7307, `area`:7309, `instructions`:7310, `name`:7306, `reward`:7311, `sources`:7312 | KH3-016, KH3-017 | Cook with an Excellent result using Chop the Ingredients. |
| `kh3.cuisine.filet-mignon-poele-excellent` | `src/games/kh3/content.json:7317`; `summary`:7320, `area`:7322, `instructions`:7323, `name`:7319, `reward`:7324, `sources`:7325 | KH3-016, KH3-017 | Cook with an Excellent result using Flambé the Food. |
| `kh3.cuisine.chocolate-mousse-excellent` | `src/games/kh3/content.json:7330`; `summary`:7333, `area`:7335, `instructions`:7336, `name`:7332, `reward`:7337, `sources`:7338 | KH3-016, KH3-017 | Cook with an Excellent result using Crack the Egg. |
| `kh3.cuisine.fresh-fruit-compote-excellent` | `src/games/kh3/content.json:7343`; `summary`:7346, `area`:7348, `instructions`:7349, `name`:7345, `reward`:7350, `sources`:7351 | KH3-016, KH3-017 | Cook with an Excellent result using Chop the Ingredients. |
| `kh3.cuisine.crepes-suzette-excellent` | `src/games/kh3/content.json:7356`; `summary`:7359, `area`:7361, `instructions`:7362, `name`:7358, `reward`:7363, `sources`:7364 | KH3-016, KH3-017 | Cook with an Excellent result using Flambé the Food. |
| `kh3.cuisine.berries-au-fromage-excellent` | `src/games/kh3/content.json:7369`; `summary`:7372, `area`:7374, `instructions`:7375, `name`:7371, `reward`:7376, `sources`:7377 | KH3-016, KH3-017 | Cook with an Excellent result using Crack the Egg. |
| `kh3.cuisine.warm-banana-souffle-excellent` | `src/games/kh3/content.json:7382`; `summary`:7385, `area`:7387, `instructions`:7388, `name`:7384, `reward`:7389, `sources`:7390 | KH3-016, KH3-017 | Cook with an Excellent result using Crack the Egg. |
| `kh3.cuisine.fruit-gelee-excellent` | `src/games/kh3/content.json:7395`; `summary`:7398, `area`:7400, `instructions`:7401, `name`:7397, `reward`:7402, `sources`:7403 | KH3-016, KH3-017 | Cook with an Excellent result using Chop the Ingredients. |
| `kh3.cuisine.tarte-aux-fruits-excellent` | `src/games/kh3/content.json:7408`; `summary`:7411, `area`:7413, `instructions`:7414, `name`:7410, `reward`:7415, `sources`:7416 | KH3-016, KH3-017 | Cook with an Excellent result using Crack the Egg. |
| `kh3.material.orichalcum` | `src/games/kh3/content.json:7421`; `summary`:7424, `drops`:7429, `name`:7423, `sources`:7426 | KH3-010, KH3-011 | Seven one-unit acquisition events: Exile Island chest 12; Final World return chest; 80 emblems; all seven Flan upper rewards; ten Frozen Slider prizes; Omega Machina; random Prize Postcard reward. No guaranteed repeatable farm.; drops=[] (intentional unique/random event source) |
| `kh3.material.wellspring-crystal` | `src/games/kh3/content.json:7432`; `summary`:7435, `drops`:7440, `name`:7434, `sources`:7437 | KH3-010, KH3-011 | Farm High Soldiers in Battlegate 12. |
| `kh3.material.lucid-crystal` | `src/games/kh3/content.json:7459`; `summary`:7462, `uncertainty`:7468, `drops`:7467, `name`:7461, `sources`:7464 | KH3-010, KH3-011 | A reliable farm location has not yet been added.; drops=[] |
| `kh3.material.pulsing-crystal` | `src/games/kh3/content.json:7471`; `summary`:7474, `uncertainty`:7480, `drops`:7479, `name`:7473, `sources`:7476 | KH3-010, KH3-011 | A reliable farm location has not yet been added.; drops=[] |
| `kh3.material.illusory-crystal` | `src/games/kh3/content.json:7483`; `summary`:7486, `drops`:7491, `name`:7485, `sources`:7488 | KH3-010, KH3-011 | Demon Tower in Battlegate 8; one-time first-clear rewards at gates 6 and 8. |
| `kh3.material.evanescent-crystal` | `src/games/kh3/content.json:7500`; `summary`:7503, `drops`:7508, `name`:7502, `sources`:7505 | KH3-010, KH3-011 | Berserkers in Battlegate 9; one-time first-clear rewards at gates 3 and 9. |
| `kh3.material.fluorite` | `src/games/kh3/content.json:7517`; `summary`:7520, `drops`:7525, `name`:7519, `sources`:7522 | KH3-010, KH3-011 | Starlight Way rocks; shop 500 munny after Toy Box and Corona. |
| `kh3.material.electrum` | `src/games/kh3/content.json:7534`; `summary`:7537, `drops`:7542, `name`:7536, `sources`:7539 | KH3-010, KH3-011 | Destroy blue rocks in the Eclipse. |
| `kh3.material.damascus` | `src/games/kh3/content.json:7551`; `summary`:7554, `drops`:7559, `name`:7553, `sources`:7556 | KH3-010, KH3-011 | Treasure chests include Corona Wetlands/Campsite and Arendelle Treescape/Foothills.; drops=[] |
| `kh3.material.adamantite` | `src/games/kh3/content.json:7562`; `summary`:7565, `drops`:7570, `name`:7564, `sources`:7567 | KH3-010, KH3-011 | Treasure chests on Caribbean islands and in San Fransokyo.; drops=[] |
| `kh3.material.wellspring-shard` | `src/games/kh3/content.json:7573`; `summary`:7576, `uncertainty`:7582, `drops`:7581, `name`:7575, `sources`:7578 | KH3-010, KH3-011 | A reliable farm location has not yet been added.; drops=[] |
| `kh3.material.wellspring-stone` | `src/games/kh3/content.json:7585`; `summary`:7588, `uncertainty`:7594, `drops`:7593, `name`:7587, `sources`:7590 | KH3-010, KH3-011 | A reliable farm location has not yet been added.; drops=[] |
| `kh3.material.wellspring-gem` | `src/games/kh3/content.json:7597`; `summary`:7600, `uncertainty`:7606, `drops`:7605, `name`:7599, `sources`:7602 | KH3-010, KH3-011 | A reliable farm location has not yet been added.; drops=[] |
| `kh3.achievement.a-new-journey` | `src/games/kh3/content.json:7609`; `summary`:7612, `name`:7611, `sources`:7613 | — | Begin your brand new adventure. |
| `kh3.achievement.tall-enough-to-ride` | `src/games/kh3/content.json:7618`; `summary`:7621, `name`:7620, `sources`:7622 | — | Use an attraction to defeat enemies for the first time. |
| `kh3.achievement.clash-of-the-gods` | `src/games/kh3/content.json:7627`; `summary`:7630, `name`:7629, `sources`:7631 | — | Adventure through Olympus and complete the story. |
| `kh3.achievement.grand-mage` | `src/games/kh3/content.json:7636`; `summary`:7639, `name`:7638, `sources`:7640 | — | Cast grand magic for the first time. |
| `kh3.achievement.a-wish-at-twilight` | `src/games/kh3/content.json:7645`; `summary`:7648, `name`:7647, `sources`:7649 | — | Adventure through Twilight Town and complete the story. |
| `kh3.achievement.say-cheese` | `src/games/kh3/content.json:7654`; `summary`:7657, `name`:7656, `sources`:7658 | — | Snap your first photo. |
| `kh3.achievement.knight` | `src/games/kh3/content.json:7663`; `summary`:7666, `name`:7665, `sources`:7667 | — | Defeat 1,000 enemies. |
| `kh3.achievement.heartbound` | `src/games/kh3/content.json:7672`; `summary`:7675, `name`:7674, `sources`:7676 | — | Use a link to defeat enemies for the first time. |
| `kh3.achievement.inseparable-friends` | `src/games/kh3/content.json:7681`; `summary`:7684, `name`:7683, `sources`:7685 | — | Adventure through Toy Box and complete the story. |
| `kh3.achievement.happily-ever-after` | `src/games/kh3/content.json:7690`; `summary`:7693, `name`:7692, `sources`:7694 | — | Adventure through the Kingdom of Corona and complete the story. |
| `kh3.achievement.full-course` | `src/games/kh3/content.json:7699`; `summary`:7702, `name`:7701, `sources`:7703 | — | Earn your first "Excellent" while preparing cuisine. |
| `kh3.achievement.the-power-of-laughter` | `src/games/kh3/content.json:7708`; `summary`:7711, `name`:7710, `sources`:7712 | — | Adventure through Monstropolis and complete the story. |
| `kh3.achievement.an-act-of-true-love` | `src/games/kh3/content.json:7717`; `summary`:7720, `name`:7719, `sources`:7721 | — | Adventure through Arendelle and complete the story. |
| `kh3.achievement.way-of-the-pirate` | `src/games/kh3/content.json:7726`; `summary`:7729, `name`:7728, `sources`:7730 | — | Adventure through The Caribbean and complete the story. |
| `kh3.achievement.making-a-difference` | `src/games/kh3/content.json:7735`; `summary`:7738, `name`:7737, `sources`:7739 | — | Adventure through San Fransokyo and complete the story. |
| `kh3.achievement.the-hearts-joined-to-his` | `src/games/kh3/content.json:7744`; `summary`:7747, `uncertainty`:7751, `name`:7746, `sources`:7748 | KH3-031 | Steam hides this description; requirement needs independent confirmation. |
| `kh3.achievement.no-matter-what` | `src/games/kh3/content.json:7754`; `summary`:7757, `uncertainty`:7761, `name`:7756, `sources`:7758 | KH3-031 | Steam hides this description; requirement needs independent confirmation. |
| `kh3.achievement.the-battle-to-end-all` | `src/games/kh3/content.json:7764`; `summary`:7767, `uncertainty`:7771, `name`:7766, `sources`:7768 | KH3-031 | Steam hides this description; requirement needs independent confirmation. |
| `kh3.achievement.another-chapter-closed` | `src/games/kh3/content.json:7774`; `summary`:7777, `name`:7776, `sources`:7778 | — | Finish the game and view the ending. |
| `kh3.achievement.home-again` | `src/games/kh3/content.json:7783`; `summary`:7786, `name`:7785, `sources`:7787 | — | Adventure through the Hundred Acre Wood and complete the story. |
| `kh3.achievement.bishop` | `src/games/kh3/content.json:7792`; `summary`:7795, `name`:7794, `sources`:7796 | — | Defeat 3,000 enemies. |
| `kh3.achievement.muscle-memory` | `src/games/kh3/content.json:7801`; `summary`:7804, `name`:7803, `sources`:7805 | KH3-019 | Get a new high score in one of the Classic Kingdom games. |
| `kh3.achievement.lasting-memories` | `src/games/kh3/content.json:7810`; `summary`:7813, `name`:7812, `sources`:7814 | — | Hold on to 50 photos. |
| `kh3.achievement.blademaster` | `src/games/kh3/content.json:7819`; `summary`:7822, `name`:7821, `sources`:7823 | — | Obtain a Keyblade that is fully powered up. |
| `kh3.achievement.behind-the-curtain` | `src/games/kh3/content.json:7828`; `summary`:7831, `name`:7830, `sources`:7832 | — | Clear KINGDOM HEARTS Ⅲ Re Mind. |
| `kh3.achievement.hidden-kings` | `src/games/kh3/content.json:7837`; `summary`:7840, `name`:7839, `sources`:7841 | — | Complete the Lucky Emblems section of the Gummiphone. |
| `kh3.achievement.ultima-weapon` | `src/games/kh3/content.json:7846`; `summary`:7849, `name`:7848, `sources`:7850 | — | Synthesize the Ultima Weapon. |
| `kh3.achievement.rook` | `src/games/kh3/content.json:7855`; `summary`:7858, `name`:7857, `sources`:7859 | — | Defeat 5,000 enemies. |
| `kh3.achievement.flanmeister` | `src/games/kh3/content.json:7864`; `summary`:7867, `uncertainty`:7871, `name`:7866, `sources`:7868 | KH3-031 | Steam hides this description; requirement needs independent confirmation. |
| `kh3.achievement.leveled-out` | `src/games/kh3/content.json:7874`; `summary`:7877, `name`:7876, `sources`:7878 | — | Raise Sora to LV 99. |
| `kh3.achievement.cornucopia` | `src/games/kh3/content.json:7883`; `summary`:7886, `name`:7885, `sources`:7887 | — | Collect every type of ingredient. |
| `kh3.achievement.dreadnought` | `src/games/kh3/content.json:7892`; `summary`:7895, `name`:7894, `sources`:7896 | KH3-022 | Fully power up the Leviathan. |
| `kh3.achievement.thermosphere` | `src/games/kh3/content.json:7901`; `summary`:7904, `uncertainty`:7908, `name`:7903, `sources`:7905 | KH3-031 | Steam hides this description; requirement needs independent confirmation. |
| `kh3.achievement.start-analysis` | `src/games/kh3/content.json:7911`; `summary`:7914, `name`:7913, `sources`:7915 | — | Eliminate One Darkness in the datascape. |
| `kh3.achievement.know-thine-enemy` | `src/games/kh3/content.json:7920`; `summary`:7923, `name`:7922, `sources`:7924 | KH3-021 | Complete the Adversaries section of the Gummiphone. |
| `kh3.achievement.shield-shredder` | `src/games/kh3/content.json:7929`; `summary`:7932, `name`:7931, `sources`:7933 | — | Score at least 600,000 pts. in Frozen Slider. |
| `kh3.achievement.master-chef` | `src/games/kh3/content.json:7938`; `summary`:7941, `name`:7940, `sources`:7942 | — | Earn an "Excellent" while preparing every type of cuisine. |
| `kh3.achievement.no-stone-unturned` | `src/games/kh3/content.json:7947`; `summary`:7950, `name`:7949, `sources`:7951 | — | Complete the Treasures section of the Gummiphone. |
| `kh3.achievement.classically-trained` | `src/games/kh3/content.json:7956`; `summary`:7959, `name`:7958, `sources`:7960 | KH3-019 | Get a new high score in every Classic Kingdom game. |
| `kh3.achievement.salvager` | `src/games/kh3/content.json:7965`; `summary`:7968, `name`:7967, `sources`:7969 | KH3-024 | Use the gummi ship to obtain 20 unique treasures. |
| `kh3.achievement.stargazer` | `src/games/kh3/content.json:7974`; `summary`:7977, `name`:7976, `sources`:7978 | — | Use the gummi ship to find and photograph all the constellations. |
| `kh3.achievement.festive-dancer` | `src/games/kh3/content.json:7983`; `summary`:7986, `name`:7985, `sources`:7987 | — | Score at least 70,000 pts. in the Festival Dance. |
| `kh3.achievement.centurion` | `src/games/kh3/content.json:7992`; `summary`:7995, `name`:7994, `sources`:7996 | — | Score at least 12,000,000 pts. in Verum Rex: Beat of Lead. |
| `kh3.achievement.analysis-complete` | `src/games/kh3/content.json:8001`; `summary`:8004, `name`:8003, `sources`:8005 | — | Eliminate Thirteen Darknesses in the datascape. |
| `kh3.achievement.datascraper` | `src/games/kh3/content.json:8010`; `summary`:8013, `name`:8012, `sources`:8014 | KH3-031 | Get an A rank on both Flash Tracer courses. |
| `kh3.achievement.true-captain` | `src/games/kh3/content.json:8019`; `summary`:8022, `name`:8021, `sources`:8023 | KH3-022 | Sink 200 enemy ships in The Caribbean. |
| `kh3.achievement.synthesist` | `src/games/kh3/content.json:8028`; `summary`:8031, `name`:8030, `sources`:8032 | KH3-008 | Complete the Synthesis section of the Gummiphone. |
| `kh3.achievement.beyond-the-curtain` | `src/games/kh3/content.json:8037`; `summary`:8040, `uncertainty`:8044, `name`:8039, `sources`:8041 | KH3-031 | Steam hides this description; requirement needs independent confirmation. |
| `kh3.achievement.one-for-the-books` | `src/games/kh3/content.json:8047`; `summary`:8050, `name`:8049, `sources`:8051 | KH3-021 | Complete the Game Records section of the Gummiphone. |
| `kh3.achievement.all-rounder` | `src/games/kh3/content.json:8056`; `summary`:8059, `name`:8058, `sources`:8060 | KH3-029 | Earn all EZ Code merits. |
| `kh3.achievement.risk-taker` | `src/games/kh3/content.json:8065`; `summary`:8068, `name`:8067, `sources`:8069 | KH3-030 | Reach the highest PRO Code merit rank. |
| `kh3.keyblade.kingdom-key` | `src/games/kh3/content.json:8074`; `summary`:8077, `name`:8076, `sources`:8079 | KH3-012, KH3-013, KH3-014, KH3-034 | Starting equipment |
| `kh3.keyblade.hero-s-origin` | `src/games/kh3/content.json:8084`; `summary`:8087, `name`:8086, `sources`:8089 | KH3-012, KH3-013, KH3-014, KH3-034 | Clear Olympus. |
| `kh3.keyblade.shooting-star` | `src/games/kh3/content.json:8094`; `summary`:8097, `name`:8096, `sources`:8099 | KH3-012, KH3-013, KH3-014, KH3-034 | Clear Twilight Town. |
| `kh3.keyblade.favorite-deputy` | `src/games/kh3/content.json:8104`; `summary`:8107, `name`:8106, `sources`:8109 | KH3-012, KH3-013, KH3-014, KH3-034 | Clear Toy Box. |
| `kh3.keyblade.ever-after` | `src/games/kh3/content.json:8114`; `summary`:8117, `name`:8116, `sources`:8119 | KH3-012, KH3-013, KH3-014, KH3-034 | Clear Kingdom of Corona. |
| `kh3.keyblade.happy-gear` | `src/games/kh3/content.json:8124`; `summary`:8127, `name`:8126, `sources`:8129 | KH3-012, KH3-013, KH3-014, KH3-034 | Clear Monstropolis. |
| `kh3.keyblade.crystal-snow` | `src/games/kh3/content.json:8134`; `summary`:8137, `name`:8136, `sources`:8139 | KH3-012, KH3-013, KH3-014, KH3-034 | Clear Arendelle. |
| `kh3.keyblade.wheel-of-fate` | `src/games/kh3/content.json:8144`; `summary`:8147, `name`:8146, `sources`:8149 | KH3-012, KH3-013, KH3-014, KH3-034 | Clear The Caribbean. |
| `kh3.keyblade.nano-gear` | `src/games/kh3/content.json:8154`; `summary`:8157, `name`:8156, `sources`:8159 | KH3-012, KH3-013, KH3-014, KH3-034 | Clear San Fransokyo. |
| `kh3.keyblade.hunny-spout` | `src/games/kh3/content.json:8164`; `summary`:8167, `name`:8166, `sources`:8169 | KH3-012, KH3-013, KH3-014, KH3-034 | Clear 100 Acre Wood. |
| `kh3.keyblade.starlight` | `src/games/kh3/content.json:8174`; `summary`:8177, `name`:8176, `sources`:8179 | KH3-012, KH3-013, KH3-014, KH3-034 | Progress through the Keyblade Graveyard story. |
| `kh3.keyblade.grand-chef` | `src/games/kh3/content.json:8184`; `summary`:8187, `name`:8186, `sources`:8189 | KH3-012, KH3-013, KH3-014, KH3-034 | Prepare all 20 Classic Menu dishes with Excellent ratings. Special Menu dishes do not raise the Bistrot star rating. |
| `kh3.keyblade.classic-tone` | `src/games/kh3/content.json:8194`; `summary`:8197, `name`:8196, `sources`:8199 | KH3-012, KH3-013, KH3-014, KH3-034 | Set a new high score in all 23 Classic Kingdom games. |
| `kh3.keyblade.ultima-weapon` | `src/games/kh3/content.json:8204`; `summary`:8207, `name`:8206, `sources`:8209 | KH3-012, KH3-013, KH3-014, KH3-034 | Discover 58 synthesis material types, then synthesize with 7 Orichalcum+ and 2 each Wellspring, Lucid and Pulsing Crystals. |
| `kh3.keyblade.oathkeeper` | `src/games/kh3/content.json:8214`; `summary`:8217, `name`:8216, `sources`:8219 | KH3-012, KH3-013, KH3-014, KH3-034 | Clear the game and photograph all 90 emblems; exchange Proof of Promises at a Moogle. Free update, not a paid DLC requirement. |
| `kh3.keyblade.oblivion` | `src/games/kh3/content.json:8224`; `summary`:8227, `name`:8226, `sources`:8229 | KH3-012, KH3-013, KH3-014, KH3-034 | Clear Critical Mode; exchange Proof of Times Past at a Moogle. Free update, not a paid DLC requirement. |
| `kh3.equipment.forest-clasp` | `src/games/kh3/content.json:8234`; `summary`:8238, `missability`:8239, `name`:8236, `sources`:8240 | KH3-005 | Complete all four before reaching the Shore. The exact later deadline differs between sources. |
| `kh3.synthesis.ultima-weapon` | `src/games/kh3/content.json:8247`; `instructions`:8250, `ingredients`:8251, `name`:8248 | KH3-008, KH3-010, KH3-034 | Discover 58 synthesis material types to unlock. Newly synthesized Ultima is level 10; do not add the level-0 forge ladder.; sources field absent (P03) |
| `kh3.cook.mushroom-terrine` | `src/games/kh3/content.json:8271`; `instructions`:8274, `ingredients`:8275, `name`:8272 | KH3-016, KH3-017 | Crack the Egg; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.scallop-poele` | `src/games/kh3/content.json:8295`; `instructions`:8298, `ingredients`:8299, `name`:8296 | KH3-016, KH3-017 | Flambé the Food; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.ratatouille` | `src/games/kh3/content.json:8311`; `instructions`:8314, `ingredients`:8315, `name`:8312 | KH3-016, KH3-017 | Chop the Ingredients; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.lobster-mousse` | `src/games/kh3/content.json:8339`; `instructions`:8342, `ingredients`:8343, `name`:8340 | KH3-016, KH3-017 | Crack the Egg; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.caprese-salad` | `src/games/kh3/content.json:8359`; `instructions`:8362, `ingredients`:8363, `name`:8360 | KH3-016, KH3-017 | Grind the Pepper; Special Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.consomme` | `src/games/kh3/content.json:8383`; `instructions`:8386, `ingredients`:8387, `name`:8384 | KH3-016, KH3-017 | Chop the Ingredients; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.pumpkin-veloute` | `src/games/kh3/content.json:8403`; `instructions`:8406, `ingredients`:8407, `name`:8404 | KH3-016, KH3-017 | Crack the Egg; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.carrot-potage` | `src/games/kh3/content.json:8419`; `instructions`:8422, `ingredients`:8423, `name`:8420 | KH3-016, KH3-017 | Grind the Pepper; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.crab-bisque` | `src/games/kh3/content.json:8443`; `instructions`:8446, `ingredients`:8447, `name`:8444 | KH3-016, KH3-017 | Flambé the Food; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.cold-tomato-soup` | `src/games/kh3/content.json:8471`; `instructions`:8474, `ingredients`:8475, `name`:8472 | KH3-016, KH3-017 | Chop the Ingredients; Special Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.sole-meuniere` | `src/games/kh3/content.json:8491`; `instructions`:8494, `ingredients`:8495, `name`:8492 | KH3-016, KH3-017 | Grind the Pepper; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.eel-matelote` | `src/games/kh3/content.json:8507`; `instructions`:8510, `ingredients`:8511, `name`:8508 | KH3-016, KH3-017 | Flambé the Food; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.bouillabaisse` | `src/games/kh3/content.json:8527`; `instructions`:8530, `ingredients`:8531, `name`:8528 | KH3-016, KH3-017 | Chop the Ingredients; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.sea-bass-en-papillote` | `src/games/kh3/content.json:8555`; `instructions`:8558, `ingredients`:8559, `name`:8556 | KH3-016, KH3-017 | Grind the Pepper; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.seafood-tartare` | `src/games/kh3/content.json:8579`; `instructions`:8582, `ingredients`:8583, `name`:8580 | KH3-016, KH3-017 | Grind the Pepper; Special Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.sea-bass-poele` | `src/games/kh3/content.json:8603`; `instructions`:8606, `ingredients`:8607, `name`:8604 | KH3-016, KH3-017 | Flambé the Food; Special Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.sweetbread-poele` | `src/games/kh3/content.json:8631`; `instructions`:8634, `ingredients`:8635, `name`:8632 | KH3-016, KH3-017 | Flambé the Food; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.beef-saute` | `src/games/kh3/content.json:8651`; `instructions`:8654, `ingredients`:8655, `name`:8652 | KH3-016, KH3-017 | Grind the Pepper; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.beef-bourguignon` | `src/games/kh3/content.json:8675`; `instructions`:8678, `ingredients`:8679, `name`:8676 | KH3-016, KH3-017 | Grind the Pepper; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.stuffed-quail` | `src/games/kh3/content.json:8703`; `instructions`:8706, `ingredients`:8707, `name`:8704 | KH3-016, KH3-017 | Chop the Ingredients; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.filet-mignon-poele` | `src/games/kh3/content.json:8735`; `instructions`:8738, `ingredients`:8739, `name`:8736 | KH3-016, KH3-017 | Flambé the Food; Special Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.chocolate-mousse` | `src/games/kh3/content.json:8767`; `instructions`:8770, `ingredients`:8771, `name`:8768 | KH3-016, KH3-017 | Crack the Egg; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.fresh-fruit-compote` | `src/games/kh3/content.json:8787`; `instructions`:8790, `ingredients`:8791, `name`:8788 | KH3-016, KH3-017 | Chop the Ingredients; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.crepes-suzette` | `src/games/kh3/content.json:8807`; `instructions`:8810, `ingredients`:8811, `name`:8808 | KH3-016, KH3-017 | Flambé the Food; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.berries-au-fromage` | `src/games/kh3/content.json:8827`; `instructions`:8830, `ingredients`:8831, `name`:8828 | KH3-016, KH3-017 | Crack the Egg; Classic Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.warm-banana-souffle` | `src/games/kh3/content.json:8855`; `instructions`:8858, `ingredients`:8859, `name`:8856 | KH3-016, KH3-017 | Crack the Egg; Special Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.fruit-gelee` | `src/games/kh3/content.json:8875`; `instructions`:8878, `ingredients`:8879, `name`:8876 | KH3-016, KH3-017 | Chop the Ingredients; Special Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.cook.tarte-aux-fruits` | `src/games/kh3/content.json:8895`; `instructions`:8898, `ingredients`:8899, `name`:8896 | KH3-016, KH3-017 | Crack the Egg; Special Menu. One of each listed ingredient per attempt. All ingredients are consumed even on failure. Crafted history is separate from the Excellent record.; sources field absent (P03) |
| `kh3.forge.kingdom-key.1` | `src/games/kh3/content.json:8931`; `instructions`:8934, `ingredients`:8935, `name`:8932 | KH3-012, KH3-034 | One upgrade step; add each required step separately. This is not a cost schedule for other Keyblades.; sources field absent (P03) |
| `kh3.forge.kingdom-key.2` | `src/games/kh3/content.json:8947`; `instructions`:8950, `ingredients`:8951, `name`:8948 | KH3-012, KH3-034 | One upgrade step; add each required step separately. This is not a cost schedule for other Keyblades.; sources field absent (P03) |
| `kh3.forge.kingdom-key.3` | `src/games/kh3/content.json:8963`; `instructions`:8966, `ingredients`:8967, `name`:8964 | KH3-012, KH3-034 | One upgrade step; add each required step separately. This is not a cost schedule for other Keyblades.; sources field absent (P03) |
| `kh3.forge.kingdom-key.4` | `src/games/kh3/content.json:8979`; `instructions`:8982, `ingredients`:8983, `name`:8980 | KH3-012, KH3-034 | One upgrade step; add each required step separately. This is not a cost schedule for other Keyblades.; sources field absent (P03) |
| `kh3.forge.kingdom-key.5` | `src/games/kh3/content.json:8995`; `instructions`:8998, `ingredients`:8999, `name`:8996 | KH3-012, KH3-034 | One upgrade step; add each required step separately. This is not a cost schedule for other Keyblades.; sources field absent (P03) |
| `kh3.forge.kingdom-key.6` | `src/games/kh3/content.json:9011`; `instructions`:9014, `ingredients`:9015, `name`:9012 | KH3-012, KH3-034 | One upgrade step; add each required step separately. This is not a cost schedule for other Keyblades.; sources field absent (P03) |
| `kh3.forge.kingdom-key.7` | `src/games/kh3/content.json:9027`; `instructions`:9030, `ingredients`:9031, `name`:9028 | KH3-012, KH3-034 | One upgrade step; add each required step separately. This is not a cost schedule for other Keyblades.; sources field absent (P03) |
| `kh3.forge.kingdom-key.8` | `src/games/kh3/content.json:9043`; `instructions`:9046, `ingredients`:9047, `name`:9044 | KH3-012, KH3-034 | One upgrade step; add each required step separately. This is not a cost schedule for other Keyblades.; sources field absent (P03) |
| `kh3.forge.kingdom-key.9` | `src/games/kh3/content.json:9059`; `instructions`:9062, `ingredients`:9063, `name`:9060 | KH3-012, KH3-034 | One upgrade step; add each required step separately. This is not a cost schedule for other Keyblades.; sources field absent (P03) |
| `kh3.forge.kingdom-key.10` | `src/games/kh3/content.json:9075`; `instructions`:9078, `ingredients`:9079, `name`:9076 | KH3-012, KH3-034 | One upgrade step; add each required step separately. This is not a cost schedule for other Keyblades.; sources field absent (P03) |

### Numbered candidate-table to runtime mapping

The following exact research-table rows are canonical identity/area-only occurrences for KH3-001/004 (and KH3-002/003 where appropriate). They are not independently route-verified duplicates. Every numbered row is explicitly mapped; this avoids hiding the research ledger behind runtime-generated copies.

| Research occurrence | Runtime stable ID | Source-table excerpt |
|---|---|---|
| `ai_docs/games/kh3/collectible-inventory.md:39` | `kh3.base.olympus.chest.001` | \| 1 \| Power Ring \| Ravine \| |
| `ai_docs/games/kh3/collectible-inventory.md:40` | `kh3.base.olympus.chest.002` | \| 2 \| Water Cufflink \| Ravine \| |
| `ai_docs/games/kh3/collectible-inventory.md:41` | `kh3.base.olympus.chest.003` | \| 3 \| Potion \| Cliff Ascent \| |
| `ai_docs/games/kh3/collectible-inventory.md:42` | `kh3.base.olympus.chest.004` | \| 4 \| Panacea \| Cliff Ascent \| |
| `ai_docs/games/kh3/collectible-inventory.md:43` | `kh3.base.olympus.chest.005` | \| 5 \| Ability Ring \| Cliff Ascent \| |
| `ai_docs/games/kh3/collectible-inventory.md:44` | `kh3.base.olympus.chest.006` | \| 6 \| Bronze Necklace \| Cliff Ascent \| |
| `ai_docs/games/kh3/collectible-inventory.md:45` | `kh3.base.olympus.chest.007` | \| 7 \| Potion \| Cliff Ascent \| |
| `ai_docs/games/kh3/collectible-inventory.md:46` | `kh3.base.olympus.chest.008` | \| 8 \| AP Boost \| Cliff Ascent \| |
| `ai_docs/games/kh3/collectible-inventory.md:47` | `kh3.base.olympus.chest.009` | \| 9 \| Map: Mount Olympus \| Cliff Ascent \| |
| `ai_docs/games/kh3/collectible-inventory.md:48` | `kh3.base.olympus.chest.010` | \| 10 \| AP Boost \| Mountainside \| |
| `ai_docs/games/kh3/collectible-inventory.md:49` | `kh3.base.olympus.chest.011` | \| 11 \| Fluorite \| Summit \| |
| `ai_docs/games/kh3/collectible-inventory.md:50` | `kh3.base.olympus.chest.012` | \| 12 \| Hi-Ether \| Mountainside \| |
| `ai_docs/games/kh3/collectible-inventory.md:51` | `kh3.base.olympus.chest.013` | \| 13 \| AP Boost \| Alleyway \| |
| `ai_docs/games/kh3/collectible-inventory.md:52` | `kh3.base.olympus.chest.014` | \| 14 \| Potion \| Alleyway \| |
| `ai_docs/games/kh3/collectible-inventory.md:53` | `kh3.base.olympus.chest.015` | \| 15 \| Fluorite \| Agora \| |
| `ai_docs/games/kh3/collectible-inventory.md:54` | `kh3.base.olympus.chest.016` | \| 16 \| Ether \| The Big Olive \| |
| `ai_docs/games/kh3/collectible-inventory.md:55` | `kh3.base.olympus.chest.017` | \| 17 \| Mega-Potion \| The Big Olive \| |
| `ai_docs/games/kh3/collectible-inventory.md:56` | `kh3.base.olympus.chest.018` | \| 18 \| Magic Ring \| Gardens \| |
| `ai_docs/games/kh3/collectible-inventory.md:57` | `kh3.base.olympus.chest.019` | \| 19 \| Ether \| Overlook \| |
| `ai_docs/games/kh3/collectible-inventory.md:58` | `kh3.base.olympus.chest.020` | \| 20 \| Shield Belt \| Overlook \| |
| `ai_docs/games/kh3/collectible-inventory.md:59` | `kh3.base.olympus.chest.021` | \| 21 \| Potion \| Gardens \| |
| `ai_docs/games/kh3/collectible-inventory.md:60` | `kh3.base.olympus.chest.022` | \| 22 \| AP Boost \| Overlook \| |
| `ai_docs/games/kh3/collectible-inventory.md:61` | `kh3.base.olympus.chest.023` | \| 23 \| Potion \| Overlook \| |
| `ai_docs/games/kh3/collectible-inventory.md:62` | `kh3.base.olympus.chest.024` | \| 24 \| Map: Thebes \| Overlook \| |
| `ai_docs/games/kh3/collectible-inventory.md:63` | `kh3.base.olympus.chest.025` | \| 25 \| Fluorite \| Courtyard \| |
| `ai_docs/games/kh3/collectible-inventory.md:64` | `kh3.base.olympus.chest.026` | \| 26 \| Refocuser \| Courtyard \| |
| `ai_docs/games/kh3/collectible-inventory.md:65` | `kh3.base.olympus.chest.027` | \| 27 \| Potion \| Courtyard \| |
| `ai_docs/games/kh3/collectible-inventory.md:66` | `kh3.base.olympus.chest.028` | \| 28 \| Mythril Shard \| Corridors \| |
| `ai_docs/games/kh3/collectible-inventory.md:67` | `kh3.base.olympus.chest.029` | \| 29 \| Map: Realm of the Gods \| Corridors \| |
| `ai_docs/games/kh3/collectible-inventory.md:68` | `kh3.base.olympus.chest.030` | \| 30 \| Refocuser \| Cloud Ridge \| |
| `ai_docs/games/kh3/collectible-inventory.md:69` | `kh3.base.olympus.chest.031` | \| 31 \| Elixir \| Corridors \| |
| `ai_docs/games/kh3/collectible-inventory.md:70` | `kh3.base.olympus.chest.032` | \| 32 \| Potion \| Corridors \| |
| `ai_docs/games/kh3/collectible-inventory.md:76` | `kh3.base.olympus.emblem.001` | \| 1 \| Overlook \| |
| `ai_docs/games/kh3/collectible-inventory.md:77` | `kh3.base.olympus.emblem.002` | \| 2 \| The Big Olive \| |
| `ai_docs/games/kh3/collectible-inventory.md:78` | `kh3.base.olympus.emblem.003` | \| 3 \| Agora \| |
| `ai_docs/games/kh3/collectible-inventory.md:79` | `kh3.base.olympus.emblem.004` | \| 4 \| Overlook \| |
| `ai_docs/games/kh3/collectible-inventory.md:80` | `kh3.base.olympus.emblem.005` | \| 5 \| Cliff Ascent \| |
| `ai_docs/games/kh3/collectible-inventory.md:81` | `kh3.base.olympus.emblem.006` | \| 6 \| Cliff Ascent \| |
| `ai_docs/games/kh3/collectible-inventory.md:82` | `kh3.base.olympus.emblem.007` | \| 7 \| Cliff Ascent \| |
| `ai_docs/games/kh3/collectible-inventory.md:83` | `kh3.base.olympus.emblem.008` | \| 8 \| Mountainside \| |
| `ai_docs/games/kh3/collectible-inventory.md:84` | `kh3.base.olympus.emblem.009` | \| 9 \| Corridors \| |
| `ai_docs/games/kh3/collectible-inventory.md:85` | `kh3.base.olympus.emblem.010` | \| 10 \| Corridors \| |
| `ai_docs/games/kh3/collectible-inventory.md:86` | `kh3.base.olympus.emblem.011` | \| 11 \| Secluded Forge \| |
| `ai_docs/games/kh3/collectible-inventory.md:87` | `kh3.base.olympus.emblem.012` | \| 12 \| Cloud Ridge \| |
| `ai_docs/games/kh3/collectible-inventory.md:97` | `kh3.base.twilight-town.chest.001` | \| 1 \| Map: The Neighborhood \| Tram Common \| |
| `ai_docs/games/kh3/collectible-inventory.md:98` | `kh3.base.twilight-town.chest.002` | \| 2 \| Mythril Shard \| Tram Common \| |
| `ai_docs/games/kh3/collectible-inventory.md:99` | `kh3.base.twilight-town.chest.003` | \| 3 \| Fluorite \| Tram Common \| |
| `ai_docs/games/kh3/collectible-inventory.md:100` | `kh3.base.twilight-town.chest.004` | \| 4 \| Fluorite \| Tram Common \| |
| `ai_docs/games/kh3/collectible-inventory.md:101` | `kh3.base.twilight-town.chest.005` | \| 5 \| Hi-Potion \| Tram Common \| |
| `ai_docs/games/kh3/collectible-inventory.md:102` | `kh3.base.twilight-town.chest.006` | \| 6 \| Refocuser \| Underground Conduit \| |
| `ai_docs/games/kh3/collectible-inventory.md:103` | `kh3.base.twilight-town.chest.007` | \| 7 \| AP Boost \| The Woods \| |
| `ai_docs/games/kh3/collectible-inventory.md:104` | `kh3.base.twilight-town.chest.008` | \| 8 \| Ether \| The Woods \| |
| `ai_docs/games/kh3/collectible-inventory.md:105` | `kh3.base.twilight-town.chest.009` | \| 9 \| Fluorite \| The Woods \| |
| `ai_docs/games/kh3/collectible-inventory.md:106` | `kh3.base.twilight-town.chest.010` | \| 10 \| Defense Boost \| The Old Mansion \| |
| `ai_docs/games/kh3/collectible-inventory.md:112` | `kh3.base.twilight-town.emblem.001` | \| 1 \| Tram Common \| |
| `ai_docs/games/kh3/collectible-inventory.md:113` | `kh3.base.twilight-town.emblem.002` | \| 2 \| Tram Common \| |
| `ai_docs/games/kh3/collectible-inventory.md:114` | `kh3.base.twilight-town.emblem.003` | \| 3 \| Tram Common \| |
| `ai_docs/games/kh3/collectible-inventory.md:115` | `kh3.base.twilight-town.emblem.004` | \| 4 \| Tram Common \| |
| `ai_docs/games/kh3/collectible-inventory.md:116` | `kh3.base.twilight-town.emblem.005` | \| 5 \| Tram Common \| |
| `ai_docs/games/kh3/collectible-inventory.md:117` | `kh3.base.twilight-town.emblem.006` | \| 6 \| The Woods \| |
| `ai_docs/games/kh3/collectible-inventory.md:118` | `kh3.base.twilight-town.emblem.007` | \| 7 \| The Woods \| |
| `ai_docs/games/kh3/collectible-inventory.md:119` | `kh3.base.twilight-town.emblem.008` | \| 8 \| The Woods \| |
| `ai_docs/games/kh3/collectible-inventory.md:120` | `kh3.base.twilight-town.emblem.009` | \| 9 \| The Old Mansion \| |
| `ai_docs/games/kh3/collectible-inventory.md:130` | `kh3.base.toy-box.chest.001` | \| 1 \| Map: Andy's House \| Andy's House \| |
| `ai_docs/games/kh3/collectible-inventory.md:131` | `kh3.base.toy-box.chest.002` | \| 2 \| Elixir \| Andy's House \| |
| `ai_docs/games/kh3/collectible-inventory.md:132` | `kh3.base.toy-box.chest.003` | \| 3 \| Mythril Gem \| Andy's House \| |
| `ai_docs/games/kh3/collectible-inventory.md:133` | `kh3.base.toy-box.chest.004` | \| 4 \| Fluorite \| Andy's House \| |
| `ai_docs/games/kh3/collectible-inventory.md:134` | `kh3.base.toy-box.chest.005` | \| 5 \| Map: Galaxy Toys \| Main Floor: 1F \| |
| `ai_docs/games/kh3/collectible-inventory.md:135` | `kh3.base.toy-box.chest.006` | \| 6 \| Petit Ribbon \| Main Floor: 2F \| |
| `ai_docs/games/kh3/collectible-inventory.md:136` | `kh3.base.toy-box.chest.007` | \| 7 \| Potion \| Main Floor: 3F \| |
| `ai_docs/games/kh3/collectible-inventory.md:137` | `kh3.base.toy-box.chest.008` | \| 8 \| Strength Boost \| Action Figures \| |
| `ai_docs/games/kh3/collectible-inventory.md:138` | `kh3.base.toy-box.chest.009` | \| 9 \| Ether \| Action Figures \| |
| `ai_docs/games/kh3/collectible-inventory.md:139` | `kh3.base.toy-box.chest.010` | \| 10 \| Soldier's Earring \| Action Figures \| |
| `ai_docs/games/kh3/collectible-inventory.md:140` | `kh3.base.toy-box.chest.011` | \| 11 \| Refocuser \| Lower Vents \| |
| `ai_docs/games/kh3/collectible-inventory.md:141` | `kh3.base.toy-box.chest.012` | \| 12 \| Ether \| Lower Vents \| |
| `ai_docs/games/kh3/collectible-inventory.md:142` | `kh3.base.toy-box.chest.013` | \| 13 \| Taxi Troubles \| Lower Vents \| |
| `ai_docs/games/kh3/collectible-inventory.md:143` | `kh3.base.toy-box.chest.014` | \| 14 \| Gold Amulet \| Babies & Toddlers: Dolls \| |
| `ai_docs/games/kh3/collectible-inventory.md:144` | `kh3.base.toy-box.chest.015` | \| 15 \| Mage's Staff+ \| Babies & Toddlers: Dolls \| |
| `ai_docs/games/kh3/collectible-inventory.md:145` | `kh3.base.toy-box.chest.016` | \| 16 \| Fluorite \| Babies & Toddlers: Dolls \| |
| `ai_docs/games/kh3/collectible-inventory.md:146` | `kh3.base.toy-box.chest.017` | \| 17 \| Fire Bangle \| Babies & Toddlers: Dolls \| |
| `ai_docs/games/kh3/collectible-inventory.md:147` | `kh3.base.toy-box.chest.018` | \| 18 \| Hi-Ether \| Babies & Toddlers: Outdoors \| |
| `ai_docs/games/kh3/collectible-inventory.md:148` | `kh3.base.toy-box.chest.019` | \| 19 \| Abas Chain \| Babies & Toddlers: Outdoors \| |
| `ai_docs/games/kh3/collectible-inventory.md:149` | `kh3.base.toy-box.chest.020` | \| 20 \| Ability Ring+ \| Video Games \| |
| `ai_docs/games/kh3/collectible-inventory.md:150` | `kh3.base.toy-box.chest.021` | \| 21 \| Fluorite \| Kid Korral \| |
| `ai_docs/games/kh3/collectible-inventory.md:151` | `kh3.base.toy-box.chest.022` | \| 22 \| Potion \| Kid Korral \| |
| `ai_docs/games/kh3/collectible-inventory.md:152` | `kh3.base.toy-box.chest.023` | \| 23 \| Buster Ring \| Kid Korral \| |
| `ai_docs/games/kh3/collectible-inventory.md:153` | `kh3.base.toy-box.chest.024` | \| 24 \| The Barnyard Battle \| Kid Korral \| |
| `ai_docs/games/kh3/collectible-inventory.md:154` | `kh3.base.toy-box.chest.025` | \| 25 \| Thunder Trinket \| Kid Korral \| |
| `ai_docs/games/kh3/collectible-inventory.md:155` | `kh3.base.toy-box.chest.026` | \| 26 \| Fire Cufflink \| Rest Area \| |
| `ai_docs/games/kh3/collectible-inventory.md:156` | `kh3.base.toy-box.chest.027` | \| 27 \| Hi-Refocuser \| Main Floor: 1F \| |
| `ai_docs/games/kh3/collectible-inventory.md:157` | `kh3.base.toy-box.chest.028` | \| 28 \| Mythril Stone \| Babies & Toddlers: Outdoors \| |
| `ai_docs/games/kh3/collectible-inventory.md:158` | `kh3.base.toy-box.chest.029` | \| 29 \| Mickey Cuts Up \| Main Floor: 3F \| |
| `ai_docs/games/kh3/collectible-inventory.md:164` | `kh3.base.toy-box.emblem.001` | \| 1 \| Andy's House \| |
| `ai_docs/games/kh3/collectible-inventory.md:165` | `kh3.base.toy-box.emblem.002` | \| 2 \| Andy's House \| |
| `ai_docs/games/kh3/collectible-inventory.md:166` | `kh3.base.toy-box.emblem.003` | \| 3 \| Andy's House \| |
| `ai_docs/games/kh3/collectible-inventory.md:167` | `kh3.base.toy-box.emblem.004` | \| 4 \| Andy's House \| |
| `ai_docs/games/kh3/collectible-inventory.md:168` | `kh3.base.toy-box.emblem.005` | \| 5 \| Main Floor: 1F \| |
| `ai_docs/games/kh3/collectible-inventory.md:169` | `kh3.base.toy-box.emblem.006` | \| 6 \| Main Floor: 1F \| |
| `ai_docs/games/kh3/collectible-inventory.md:170` | `kh3.base.toy-box.emblem.007` | \| 7 \| Lower Vents \| |
| `ai_docs/games/kh3/collectible-inventory.md:171` | `kh3.base.toy-box.emblem.008` | \| 8 \| Main Floor: 3F \| |
| `ai_docs/games/kh3/collectible-inventory.md:172` | `kh3.base.toy-box.emblem.009` | \| 9 \| Babies & Toddlers: Dolls \| |
| `ai_docs/games/kh3/collectible-inventory.md:173` | `kh3.base.toy-box.emblem.010` | \| 10 \| Main Floor: 3F \| |
| `ai_docs/games/kh3/collectible-inventory.md:174` | `kh3.base.toy-box.emblem.011` | \| 11 \| Main Floor: 1F \| |
| `ai_docs/games/kh3/collectible-inventory.md:184` | `kh3.base.kingdom-of-corona.chest.001` | \| 1 \| Mask Rosette \| Tower \| |
| `ai_docs/games/kh3/collectible-inventory.md:185` | `kh3.base.kingdom-of-corona.chest.002` | \| 2 \| Elven Bandanna \| Hills \| |
| `ai_docs/games/kh3/collectible-inventory.md:186` | `kh3.base.kingdom-of-corona.chest.003` | \| 3 \| Wind Fan \| Hills \| |
| `ai_docs/games/kh3/collectible-inventory.md:187` | `kh3.base.kingdom-of-corona.chest.004` | \| 4 \| Bronze Amulet \| Hills \| |
| `ai_docs/games/kh3/collectible-inventory.md:188` | `kh3.base.kingdom-of-corona.chest.005` | \| 5 \| Panacea \| Hills \| |
| `ai_docs/games/kh3/collectible-inventory.md:189` | `kh3.base.kingdom-of-corona.chest.006` | \| 6 \| Potion \| Hills \| |
| `ai_docs/games/kh3/collectible-inventory.md:190` | `kh3.base.kingdom-of-corona.chest.007` | \| 7 \| Map: The Forest (1/2) \| Hills \| |
| `ai_docs/games/kh3/collectible-inventory.md:191` | `kh3.base.kingdom-of-corona.chest.008` | \| 8 \| Refocuser \| Hills \| |
| `ai_docs/games/kh3/collectible-inventory.md:192` | `kh3.base.kingdom-of-corona.chest.009` | \| 9 \| Camping Out \| Hills \| |
| `ai_docs/games/kh3/collectible-inventory.md:193` | `kh3.base.kingdom-of-corona.chest.010` | \| 10 \| Map: The Forest (2/2) \| Marsh \| |
| `ai_docs/games/kh3/collectible-inventory.md:194` | `kh3.base.kingdom-of-corona.chest.011` | \| 11 \| Potion \| Marsh \| |
| `ai_docs/games/kh3/collectible-inventory.md:195` | `kh3.base.kingdom-of-corona.chest.012` | \| 12 \| Shadow Anklet \| Marsh \| |
| `ai_docs/games/kh3/collectible-inventory.md:196` | `kh3.base.kingdom-of-corona.chest.013` | \| 13 \| Mage's Earring \| Wetlands \| |
| `ai_docs/games/kh3/collectible-inventory.md:197` | `kh3.base.kingdom-of-corona.chest.014` | \| 14 \| Aero Cufflink \| Wetlands \| |
| `ai_docs/games/kh3/collectible-inventory.md:198` | `kh3.base.kingdom-of-corona.chest.015` | \| 15 \| Defense Belt \| Wetlands \| |
| `ai_docs/games/kh3/collectible-inventory.md:199` | `kh3.base.kingdom-of-corona.chest.016` | \| 16 \| Damascus \| Wetlands \| |
| `ai_docs/games/kh3/collectible-inventory.md:200` | `kh3.base.kingdom-of-corona.chest.017` | \| 17 \| Mythril Stone \| Wetlands \| |
| `ai_docs/games/kh3/collectible-inventory.md:201` | `kh3.base.kingdom-of-corona.chest.018` | \| 18 \| Ether \| Campsite \| |
| `ai_docs/games/kh3/collectible-inventory.md:202` | `kh3.base.kingdom-of-corona.chest.019` | \| 19 \| Damascus \| Campsite \| |
| `ai_docs/games/kh3/collectible-inventory.md:203` | `kh3.base.kingdom-of-corona.chest.020` | \| 20 \| AP Boost \| Shore \| |
| `ai_docs/games/kh3/collectible-inventory.md:204` | `kh3.base.kingdom-of-corona.chest.021` | \| 21 \| Hi-Ether \| Wildflower Clearing \| |
| `ai_docs/games/kh3/collectible-inventory.md:205` | `kh3.base.kingdom-of-corona.chest.022` | \| 22 \| The Wayward Canary \| Wildflower Clearing \| |
| `ai_docs/games/kh3/collectible-inventory.md:206` | `kh3.base.kingdom-of-corona.chest.023` | \| 23 \| Magic Boost \| Thoroughfare \| |
| `ai_docs/games/kh3/collectible-inventory.md:207` | `kh3.base.kingdom-of-corona.chest.024` | \| 24 \| The Karnival Kid \| Thoroughfare \| |
| `ai_docs/games/kh3/collectible-inventory.md:208` | `kh3.base.kingdom-of-corona.chest.025` | \| 25 \| Ether \| Thoroughfare \| |
| `ai_docs/games/kh3/collectible-inventory.md:209` | `kh3.base.kingdom-of-corona.chest.026` | \| 26 \| Sea Bass en Papillote+ \| Wharf \| |
| `ai_docs/games/kh3/collectible-inventory.md:210` | `kh3.base.kingdom-of-corona.chest.027` | \| 27 \| Rune Ring \| Wharf \| |
| `ai_docs/games/kh3/collectible-inventory.md:211` | `kh3.base.kingdom-of-corona.chest.028` | \| 28 \| Hi-Potion \| Wharf \| |
| `ai_docs/games/kh3/collectible-inventory.md:217` | `kh3.base.kingdom-of-corona.emblem.001` | \| 1 \| Tower \| |
| `ai_docs/games/kh3/collectible-inventory.md:218` | `kh3.base.kingdom-of-corona.emblem.002` | \| 2 \| Marsh \| |
| `ai_docs/games/kh3/collectible-inventory.md:219` | `kh3.base.kingdom-of-corona.emblem.003` | \| 3 \| Wetlands \| |
| `ai_docs/games/kh3/collectible-inventory.md:220` | `kh3.base.kingdom-of-corona.emblem.004` | \| 4 \| Shore \| |
| `ai_docs/games/kh3/collectible-inventory.md:221` | `kh3.base.kingdom-of-corona.emblem.005` | \| 5 \| Thoroughfare \| |
| `ai_docs/games/kh3/collectible-inventory.md:222` | `kh3.base.kingdom-of-corona.emblem.006` | \| 6 \| Thoroughfare \| |
| `ai_docs/games/kh3/collectible-inventory.md:223` | `kh3.base.kingdom-of-corona.emblem.007` | \| 7 \| Wharf \| |
| `ai_docs/games/kh3/collectible-inventory.md:224` | `kh3.base.kingdom-of-corona.emblem.008` | \| 8 \| Wharf \| |
| `ai_docs/games/kh3/collectible-inventory.md:225` | `kh3.base.kingdom-of-corona.emblem.009` | \| 9 \| Wharf \| |
| `ai_docs/games/kh3/collectible-inventory.md:235` | `kh3.base.monstropolis.chest.001` | \| 1 \| Map: Monsters, Inc. \| Lobby & Offices \| |
| `ai_docs/games/kh3/collectible-inventory.md:236` | `kh3.base.monstropolis.chest.002` | \| 2 \| Hi-Potion \| Lobby & Offices \| |
| `ai_docs/games/kh3/collectible-inventory.md:237` | `kh3.base.monstropolis.chest.003` | \| 3 \| Technician's Ring+ \| Lobby & Offices \| |
| `ai_docs/games/kh3/collectible-inventory.md:238` | `kh3.base.monstropolis.chest.004` | \| 4 \| Refocuser \| Laugh Floor \| |
| `ai_docs/games/kh3/collectible-inventory.md:239` | `kh3.base.monstropolis.chest.005` | \| 5 \| Fencer's Earring \| Upper Level \| |
| `ai_docs/games/kh3/collectible-inventory.md:240` | `kh3.base.monstropolis.chest.006` | \| 6 \| Star Shield+ \| Lower Level \| |
| `ai_docs/games/kh3/collectible-inventory.md:241` | `kh3.base.monstropolis.chest.007` | \| 7 \| Hi-Potion \| Service Area \| |
| `ai_docs/games/kh3/collectible-inventory.md:242` | `kh3.base.monstropolis.chest.008` | \| 8 \| Thunder Cufflink \| Upper Level / Service Area \| |
| `ai_docs/games/kh3/collectible-inventory.md:243` | `kh3.base.monstropolis.chest.009` | \| 9 \| Map: The Factory \| Basement \| |
| `ai_docs/games/kh3/collectible-inventory.md:244` | `kh3.base.monstropolis.chest.010` | \| 10 \| How to Play Golf \| Ground Floor \| |
| `ai_docs/games/kh3/collectible-inventory.md:245` | `kh3.base.monstropolis.chest.011` | \| 11 \| Damascus \| Ground Floor \| |
| `ai_docs/games/kh3/collectible-inventory.md:246` | `kh3.base.monstropolis.chest.012` | \| 12 \| Umbrella Rosette \| Ground Floor \| |
| `ai_docs/games/kh3/collectible-inventory.md:247` | `kh3.base.monstropolis.chest.013` | \| 13 \| Hi-Potion \| Second Floor \| |
| `ai_docs/games/kh3/collectible-inventory.md:248` | `kh3.base.monstropolis.chest.014` | \| 14 \| Valor Ring \| Second Floor \| |
| `ai_docs/games/kh3/collectible-inventory.md:249` | `kh3.base.monstropolis.chest.015` | \| 15 \| Firefighter Rosette \| Accessway \| |
| `ai_docs/games/kh3/collectible-inventory.md:250` | `kh3.base.monstropolis.chest.016` | \| 16 \| Fira Bangle \| Accessway \| |
| `ai_docs/games/kh3/collectible-inventory.md:251` | `kh3.base.monstropolis.chest.017` | \| 17 \| Damascus \| Accessway \| |
| `ai_docs/games/kh3/collectible-inventory.md:252` | `kh3.base.monstropolis.chest.018` | \| 18 \| Ether \| Tank Yard \| |
| `ai_docs/games/kh3/collectible-inventory.md:253` | `kh3.base.monstropolis.chest.019` | \| 19 \| Mickey's Circus \| Tank Yard \| |
| `ai_docs/games/kh3/collectible-inventory.md:254` | `kh3.base.monstropolis.chest.020` | \| 20 \| Mega-Ether \| Vault Passage \| |
| `ai_docs/games/kh3/collectible-inventory.md:255` | `kh3.base.monstropolis.chest.021` | \| 21 \| Megalixir \| Vault Passage \| |
| `ai_docs/games/kh3/collectible-inventory.md:256` | `kh3.base.monstropolis.chest.022` | \| 22 \| Hi-Refocuser \| Accessway \| |
| `ai_docs/games/kh3/collectible-inventory.md:262` | `kh3.base.monstropolis.emblem.001` | \| 1 \| Laugh Floor \| |
| `ai_docs/games/kh3/collectible-inventory.md:263` | `kh3.base.monstropolis.emblem.002` | \| 2 \| Laugh Floor \| |
| `ai_docs/games/kh3/collectible-inventory.md:264` | `kh3.base.monstropolis.emblem.003` | \| 3 \| Upper Level \| |
| `ai_docs/games/kh3/collectible-inventory.md:265` | `kh3.base.monstropolis.emblem.004` | \| 4 \| Upper Level \| |
| `ai_docs/games/kh3/collectible-inventory.md:266` | `kh3.base.monstropolis.emblem.005` | \| 5 \| Ground Floor \| |
| `ai_docs/games/kh3/collectible-inventory.md:267` | `kh3.base.monstropolis.emblem.006` | \| 6 \| Ground Floor \| |
| `ai_docs/games/kh3/collectible-inventory.md:268` | `kh3.base.monstropolis.emblem.007` | \| 7 \| Second Floor \| |
| `ai_docs/games/kh3/collectible-inventory.md:269` | `kh3.base.monstropolis.emblem.008` | \| 8 \| Accessway \| |
| `ai_docs/games/kh3/collectible-inventory.md:270` | `kh3.base.monstropolis.emblem.009` | \| 9 \| Accessway \| |
| `ai_docs/games/kh3/collectible-inventory.md:271` | `kh3.base.monstropolis.emblem.010` | \| 10 \| Tank Yard \| |
| `ai_docs/games/kh3/collectible-inventory.md:272` | `kh3.base.monstropolis.emblem.011` | \| 11 \| Vault Passage \| |
| `ai_docs/games/kh3/collectible-inventory.md:282` | `kh3.base.arendelle.chest.001` | \| 1 \| Map: The North Mountain \| Treescape \| |
| `ai_docs/games/kh3/collectible-inventory.md:283` | `kh3.base.arendelle.chest.002` | \| 2 \| Blizzard Choker \| Treescape \| |
| `ai_docs/games/kh3/collectible-inventory.md:284` | `kh3.base.arendelle.chest.003` | \| 3 \| Damascus \| Treescape \| |
| `ai_docs/games/kh3/collectible-inventory.md:285` | `kh3.base.arendelle.chest.004` | \| 4 \| Elixir \| Gorge \| |
| `ai_docs/games/kh3/collectible-inventory.md:286` | `kh3.base.arendelle.chest.005` | \| 5 \| Guardian's Belt \| Gorge \| |
| `ai_docs/games/kh3/collectible-inventory.md:287` | `kh3.base.arendelle.chest.006` | \| 6 \| Force Ring \| Snowfield \| |
| `ai_docs/games/kh3/collectible-inventory.md:288` | `kh3.base.arendelle.chest.007` | \| 7 \| Mickey's Kitten Catch \| Snowfield \| |
| `ai_docs/games/kh3/collectible-inventory.md:289` | `kh3.base.arendelle.chest.008` | \| 8 \| The Klondike Kid \| Treescape \| |
| `ai_docs/games/kh3/collectible-inventory.md:290` | `kh3.base.arendelle.chest.009` | \| 9 \| Orichalcum \| Snowfield \| |
| `ai_docs/games/kh3/collectible-inventory.md:291` | `kh3.base.arendelle.chest.010` | \| 10 \| Map: The Labyrinth of Ice \| Middle Tier \| |
| `ai_docs/games/kh3/collectible-inventory.md:292` | `kh3.base.arendelle.chest.011` | \| 11 \| Dark Anklet \| Upper Tier \| |
| `ai_docs/games/kh3/collectible-inventory.md:293` | `kh3.base.arendelle.chest.012` | \| 12 \| Snowman Rosette \| Middle Tier \| |
| `ai_docs/games/kh3/collectible-inventory.md:294` | `kh3.base.arendelle.chest.013` | \| 13 \| Damascus \| Upper Tier \| |
| `ai_docs/games/kh3/collectible-inventory.md:295` | `kh3.base.arendelle.chest.014` | \| 14 \| Barnyard Sports \| Lower Tier \| |
| `ai_docs/games/kh3/collectible-inventory.md:296` | `kh3.base.arendelle.chest.015` | \| 15 \| Blizzard Cufflink \| Middle Tier \| |
| `ai_docs/games/kh3/collectible-inventory.md:297` | `kh3.base.arendelle.chest.016` | \| 16 \| Hi-Potion \| Valley of Ice \| |
| `ai_docs/games/kh3/collectible-inventory.md:298` | `kh3.base.arendelle.chest.017` | \| 17 \| Refocuser \| Valley of Ice \| |
| `ai_docs/games/kh3/collectible-inventory.md:299` | `kh3.base.arendelle.chest.018` | \| 18 \| Hi-Ether \| Valley of Ice \| |
| `ai_docs/games/kh3/collectible-inventory.md:300` | `kh3.base.arendelle.chest.019` | \| 19 \| Blizzara Choker \| Valley of Ice \| |
| `ai_docs/games/kh3/collectible-inventory.md:301` | `kh3.base.arendelle.chest.020` | \| 20 \| AP Boost \| Valley of Ice \| |
| `ai_docs/games/kh3/collectible-inventory.md:302` | `kh3.base.arendelle.chest.021` | \| 21 \| Mega-Ether \| Frozen Wall \| |
| `ai_docs/games/kh3/collectible-inventory.md:303` | `kh3.base.arendelle.chest.022` | \| 22 \| Silver Amulet \| Frozen Wall \| |
| `ai_docs/games/kh3/collectible-inventory.md:304` | `kh3.base.arendelle.chest.023` | \| 23 \| Magician's Wand+ \| Frozen Wall \| |
| `ai_docs/games/kh3/collectible-inventory.md:305` | `kh3.base.arendelle.chest.024` | \| 24 \| Slayer's Earring \| Foothills \| |
| `ai_docs/games/kh3/collectible-inventory.md:306` | `kh3.base.arendelle.chest.025` | \| 25 \| Damascus \| Foothills \| |
| `ai_docs/games/kh3/collectible-inventory.md:312` | `kh3.base.arendelle.emblem.001` | \| 1 \| Treescape \| |
| `ai_docs/games/kh3/collectible-inventory.md:313` | `kh3.base.arendelle.emblem.002` | \| 2 \| Middle Tier \| |
| `ai_docs/games/kh3/collectible-inventory.md:314` | `kh3.base.arendelle.emblem.003` | \| 3 \| Lower Tier \| |
| `ai_docs/games/kh3/collectible-inventory.md:315` | `kh3.base.arendelle.emblem.004` | \| 4 \| Middle Tier \| |
| `ai_docs/games/kh3/collectible-inventory.md:316` | `kh3.base.arendelle.emblem.005` | \| 5 \| Upper Tier \| |
| `ai_docs/games/kh3/collectible-inventory.md:317` | `kh3.base.arendelle.emblem.006` | \| 6 \| Mountain Ridge \| |
| `ai_docs/games/kh3/collectible-inventory.md:318` | `kh3.base.arendelle.emblem.007` | \| 7 \| Frozen Wall \| |
| `ai_docs/games/kh3/collectible-inventory.md:319` | `kh3.base.arendelle.emblem.008` | \| 8 \| Frozen Wall \| |
| `ai_docs/games/kh3/collectible-inventory.md:320` | `kh3.base.arendelle.emblem.009` | \| 9 \| Snowfield \| |
| `ai_docs/games/kh3/collectible-inventory.md:321` | `kh3.base.arendelle.emblem.010` | \| 10 \| Snowfield \| |
| `ai_docs/games/kh3/collectible-inventory.md:322` | `kh3.base.arendelle.emblem.011` | \| 11 \| Foothills \| |
| `ai_docs/games/kh3/collectible-inventory.md:332` | `kh3.base.the-caribbean.chest.001` | \| 1 \| Master's Ring \| Huddled Isles \| |
| `ai_docs/games/kh3/collectible-inventory.md:333` | `kh3.base.the-caribbean.chest.002` | \| 2 \| Adamantite \| Undersea Cavern \| |
| `ai_docs/games/kh3/collectible-inventory.md:334` | `kh3.base.the-caribbean.chest.003` | \| 3 \| Orichalcum \| Undersea Cavern \| |
| `ai_docs/games/kh3/collectible-inventory.md:335` | `kh3.base.the-caribbean.chest.004` | \| 4 \| Fishin' Frenzy \| Undersea Cavern \| |
| `ai_docs/games/kh3/collectible-inventory.md:336` | `kh3.base.the-caribbean.chest.005` | \| 5 \| Damascus \| Isla de los Mástiles \| |
| `ai_docs/games/kh3/collectible-inventory.md:337` | `kh3.base.the-caribbean.chest.006` | \| 6 \| Silver Necklace \| Isla de los Mástiles \| |
| `ai_docs/games/kh3/collectible-inventory.md:338` | `kh3.base.the-caribbean.chest.007` | \| 7 \| Cosmic Arts \| Ship's End \| |
| `ai_docs/games/kh3/collectible-inventory.md:339` | `kh3.base.the-caribbean.chest.008` | \| 8 \| Mega-Ether \| Ship's End \| |
| `ai_docs/games/kh3/collectible-inventory.md:340` | `kh3.base.the-caribbean.chest.009` | \| 9 \| Electrum \| Isla Verdemontaña \| |
| `ai_docs/games/kh3/collectible-inventory.md:341` | `kh3.base.the-caribbean.chest.010` | \| 10 \| Cast Out to Sea \| Isla Verdemontaña \| |
| `ai_docs/games/kh3/collectible-inventory.md:342` | `kh3.base.the-caribbean.chest.011` | \| 11 \| Electrum \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:343` | `kh3.base.the-caribbean.chest.012` | \| 12 \| Orichalcum+ \| Exile Island \| |
| `ai_docs/games/kh3/collectible-inventory.md:344` | `kh3.base.the-caribbean.chest.013` | \| 13 \| Beach Party \| Confinement Island \| |
| `ai_docs/games/kh3/collectible-inventory.md:345` | `kh3.base.the-caribbean.chest.014` | \| 14 \| Yin-Yang Cufflink \| Northern Waters \| |
| `ai_docs/games/kh3/collectible-inventory.md:346` | `kh3.base.the-caribbean.chest.015` | \| 15 \| Ocean Heartbinder \| Undersea Cavern \| |
| `ai_docs/games/kh3/collectible-inventory.md:347` | `kh3.base.the-caribbean.chest.016` | \| 16 \| Acrisius \| Horseshoe Island \| |
| `ai_docs/games/kh3/collectible-inventory.md:348` | `kh3.base.the-caribbean.chest.017` | \| 17 \| Map:Isla de los Mástiles \| Isla de los Mástiles \| |
| `ai_docs/games/kh3/collectible-inventory.md:349` | `kh3.base.the-caribbean.chest.018` | \| 18 \| Map:Ship's End \| Ship's End \| |
| `ai_docs/games/kh3/collectible-inventory.md:350` | `kh3.base.the-caribbean.chest.019` | \| 19 \| Map:Sandbar Isle \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:351` | `kh3.base.the-caribbean.chest.020` | \| 20 \| Map:Huddled Isles \| Huddled Isles \| |
| `ai_docs/games/kh3/collectible-inventory.md:352` | `kh3.base.the-caribbean.chest.021` | \| 21 \| Panacea \| Huddled Isles \| |
| `ai_docs/games/kh3/collectible-inventory.md:353` | `kh3.base.the-caribbean.chest.022` | \| 22 \| Mega-Potion \| Huddled Isles \| |
| `ai_docs/games/kh3/collectible-inventory.md:354` | `kh3.base.the-caribbean.chest.023` | \| 23 \| Insulator Rosette \| Isla de los Mástiles \| |
| `ai_docs/games/kh3/collectible-inventory.md:355` | `kh3.base.the-caribbean.chest.024` | \| 24 \| Adamantite \| Isla de los Mástiles \| |
| `ai_docs/games/kh3/collectible-inventory.md:356` | `kh3.base.the-caribbean.chest.025` | \| 25 \| Orichalcum \| Isla Verdemontaña \| |
| `ai_docs/games/kh3/collectible-inventory.md:357` | `kh3.base.the-caribbean.chest.026` | \| 26 \| Hungry Crystal \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:358` | `kh3.base.the-caribbean.chest.027` | \| 27 \| Adamantite \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:359` | `kh3.base.the-caribbean.chest.028` | \| 28 \| Damascus \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:360` | `kh3.base.the-caribbean.chest.029` | \| 29 \| Orichalcum \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:361` | `kh3.base.the-caribbean.chest.030` | \| 30 \| Adamantite \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:362` | `kh3.base.the-caribbean.chest.031` | \| 31 \| Electrum \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:363` | `kh3.base.the-caribbean.chest.032` | \| 32 \| Adamantite \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:364` | `kh3.base.the-caribbean.chest.033` | \| 33 \| Orichalcum \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:365` | `kh3.base.the-caribbean.chest.034` | \| 34 \| Storm Anchor+ \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:366` | `kh3.base.the-caribbean.chest.035` | \| 35 \| Electrum \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:367` | `kh3.base.the-caribbean.chest.036` | \| 36 \| Orichalcum \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:368` | `kh3.base.the-caribbean.chest.037` | \| 37 \| Adamantite \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:369` | `kh3.base.the-caribbean.chest.038` | \| 38 \| Electrum \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:370` | `kh3.base.the-caribbean.chest.039` | \| 39 \| Adamantite \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:371` | `kh3.base.the-caribbean.chest.040` | \| 40 \| Hungry Crystal \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:372` | `kh3.base.the-caribbean.chest.041` | \| 41 \| Damascus \| Horseshoe Island \| |
| `ai_docs/games/kh3/collectible-inventory.md:373` | `kh3.base.the-caribbean.chest.042` | \| 42 \| Firaga Bangle \| Horseshoe Island \| |
| `ai_docs/games/kh3/collectible-inventory.md:374` | `kh3.base.the-caribbean.chest.043` | \| 43 \| Blizzaga Choker \| Horseshoe Island \| |
| `ai_docs/games/kh3/collectible-inventory.md:375` | `kh3.base.the-caribbean.chest.044` | \| 44 \| Chaos Anklet \| Horseshoe Island \| |
| `ai_docs/games/kh3/collectible-inventory.md:376` | `kh3.base.the-caribbean.chest.045` | \| 45 \| Celestriad \| Leviathan \| |
| `ai_docs/games/kh3/collectible-inventory.md:377` | `kh3.base.the-caribbean.chest.046` | \| 46 \| Hi-Refocuser \| Fort \| |
| `ai_docs/games/kh3/collectible-inventory.md:378` | `kh3.base.the-caribbean.chest.047` | \| 47 \| Mickey's Prison Escape \| Fort \| |
| `ai_docs/games/kh3/collectible-inventory.md:379` | `kh3.base.the-caribbean.chest.048` | \| 48 \| Sorcerer's Ring \| Seaport \| |
| `ai_docs/games/kh3/collectible-inventory.md:380` | `kh3.base.the-caribbean.chest.049` | \| 49 \| Hi-Potion \| Seaport \| |
| `ai_docs/games/kh3/collectible-inventory.md:381` | `kh3.base.the-caribbean.chest.050` | \| 50 \| Mega-Ether \| Seaport \| |
| `ai_docs/games/kh3/collectible-inventory.md:382` | `kh3.base.the-caribbean.chest.051` | \| 51 \| Map:Port Royal Waters \| Docks \| |
| `ai_docs/games/kh3/collectible-inventory.md:383` | `kh3.base.the-caribbean.chest.052` | \| 52 \| Tent \| Settlement \| |
| `ai_docs/games/kh3/collectible-inventory.md:384` | `kh3.base.the-caribbean.chest.053` | \| 53 \| Hi-Ether \| Docks \| |
| `ai_docs/games/kh3/collectible-inventory.md:385` | `kh3.base.the-caribbean.chest.054` | \| 54 \| Elixir \| Seaport \| |
| `ai_docs/games/kh3/collectible-inventory.md:386` | `kh3.base.the-caribbean.chest.055` | \| 55 \| Mega-Potion \| Settlement \| |
| `ai_docs/games/kh3/collectible-inventory.md:387` | `kh3.base.the-caribbean.chest.056` | \| 56 \| Ether \| Seaport \| |
| `ai_docs/games/kh3/collectible-inventory.md:393` | `kh3.base.the-caribbean.emblem.001` | \| 1 \| Docks \| |
| `ai_docs/games/kh3/collectible-inventory.md:394` | `kh3.base.the-caribbean.emblem.002` | \| 2 \| Docks \| |
| `ai_docs/games/kh3/collectible-inventory.md:395` | `kh3.base.the-caribbean.emblem.003` | \| 3 \| Seaport \| |
| `ai_docs/games/kh3/collectible-inventory.md:396` | `kh3.base.the-caribbean.emblem.004` | \| 4 \| Seaport \| |
| `ai_docs/games/kh3/collectible-inventory.md:397` | `kh3.base.the-caribbean.emblem.005` | \| 5 \| Fort \| |
| `ai_docs/games/kh3/collectible-inventory.md:398` | `kh3.base.the-caribbean.emblem.006` | \| 6 \| Fort \| |
| `ai_docs/games/kh3/collectible-inventory.md:399` | `kh3.base.the-caribbean.emblem.007` | \| 7 \| Isla Verdemontaña \| |
| `ai_docs/games/kh3/collectible-inventory.md:400` | `kh3.base.the-caribbean.emblem.008` | \| 8 \| Isle of Luck \| |
| `ai_docs/games/kh3/collectible-inventory.md:401` | `kh3.base.the-caribbean.emblem.009` | \| 9 \| Horseshoe Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:402` | `kh3.base.the-caribbean.emblem.010` | \| 10 \| Port Royal Waters \| |
| `ai_docs/games/kh3/collectible-inventory.md:403` | `kh3.base.the-caribbean.emblem.011` | \| 11 \| Ship's End \| |
| `ai_docs/games/kh3/collectible-inventory.md:404` | `kh3.base.the-caribbean.emblem.012` | \| 12 \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:405` | `kh3.base.the-caribbean.emblem.013` | \| 13 \| Sandbar Isle \| |
| `ai_docs/games/kh3/collectible-inventory.md:415` | `kh3.base.san-fransokyo.chest.001` | \| 1 \| Aegis Chain \| Central District \| |
| `ai_docs/games/kh3/collectible-inventory.md:416` | `kh3.base.san-fransokyo.chest.002` | \| 2 \| Skill Ring+ \| South District \| |
| `ai_docs/games/kh3/collectible-inventory.md:417` | `kh3.base.san-fransokyo.chest.003` | \| 3 \| Map:The City \| South District \| |
| `ai_docs/games/kh3/collectible-inventory.md:418` | `kh3.base.san-fransokyo.chest.004` | \| 4 \| Hi-Refocuser \| South District \| |
| `ai_docs/games/kh3/collectible-inventory.md:419` | `kh3.base.san-fransokyo.chest.005` | \| 5 \| AP Boost \| North District \| |
| `ai_docs/games/kh3/collectible-inventory.md:420` | `kh3.base.san-fransokyo.chest.006` | \| 6 \| Electrum \| North District \| |
| `ai_docs/games/kh3/collectible-inventory.md:421` | `kh3.base.san-fransokyo.chest.007` | \| 7 \| Phantom Ring \| South District \| |
| `ai_docs/games/kh3/collectible-inventory.md:422` | `kh3.base.san-fransokyo.chest.008` | \| 8 \| AP Boost \| Central District \| |
| `ai_docs/games/kh3/collectible-inventory.md:423` | `kh3.base.san-fransokyo.chest.009` | \| 9 \| Mega-Ether \| Central District \| |
| `ai_docs/games/kh3/collectible-inventory.md:424` | `kh3.base.san-fransokyo.chest.010` | \| 10 \| Adamantite \| North District \| |
| `ai_docs/games/kh3/collectible-inventory.md:425` | `kh3.base.san-fransokyo.chest.011` | \| 11 \| Mega-Potion \| South District \| |
| `ai_docs/games/kh3/collectible-inventory.md:426` | `kh3.base.san-fransokyo.chest.012` | \| 12 \| Thundaga Trinket \| South District \| |
| `ai_docs/games/kh3/collectible-inventory.md:427` | `kh3.base.san-fransokyo.chest.013` | \| 13 \| Elixir \| North District \| |
| `ai_docs/games/kh3/collectible-inventory.md:428` | `kh3.base.san-fransokyo.chest.014` | \| 14 \| Storm Fan \| North District \| |
| `ai_docs/games/kh3/collectible-inventory.md:429` | `kh3.base.san-fransokyo.chest.015` | \| 15 \| AP Boost \| North District \| |
| `ai_docs/games/kh3/collectible-inventory.md:430` | `kh3.base.san-fransokyo.chest.016` | \| 16 \| Magic Boost \| Central District \| |
| `ai_docs/games/kh3/collectible-inventory.md:431` | `kh3.base.san-fransokyo.chest.017` | \| 17 \| Hi-Ether \| Central District \| |
| `ai_docs/games/kh3/collectible-inventory.md:432` | `kh3.base.san-fransokyo.chest.018` | \| 18 \| Mega-Ether \| South District \| |
| `ai_docs/games/kh3/collectible-inventory.md:433` | `kh3.base.san-fransokyo.chest.019` | \| 19 \| Nirvana+ \| Central District \| |
| `ai_docs/games/kh3/collectible-inventory.md:434` | `kh3.base.san-fransokyo.chest.020` | \| 20 \| AP Boost \| South District \| |
| `ai_docs/games/kh3/collectible-inventory.md:435` | `kh3.base.san-fransokyo.chest.021` | \| 21 \| Damascus \| South District \| |
| `ai_docs/games/kh3/collectible-inventory.md:436` | `kh3.base.san-fransokyo.chest.022` | \| 22 \| Adamantite \| North District \| |
| `ai_docs/games/kh3/collectible-inventory.md:437` | `kh3.base.san-fransokyo.chest.023` | \| 23 \| Divine Bandanna \| Central District \| |
| `ai_docs/games/kh3/collectible-inventory.md:438` | `kh3.base.san-fransokyo.chest.024` | \| 24 \| Hi-Refocuser \| Central District \| |
| `ai_docs/games/kh3/collectible-inventory.md:439` | `kh3.base.san-fransokyo.chest.025` | \| 25 \| Star Charm \| Central District \| |
| `ai_docs/games/kh3/collectible-inventory.md:440` | `kh3.base.san-fransokyo.chest.026` | \| 26 \| Electrum \| Central District \| |
| `ai_docs/games/kh3/collectible-inventory.md:441` | `kh3.base.san-fransokyo.chest.027` | \| 27 \| Buster Band \| South District \| |
| `ai_docs/games/kh3/collectible-inventory.md:442` | `kh3.base.san-fransokyo.chest.028` | \| 28 \| Magic Boost \| North District \| |
| `ai_docs/games/kh3/collectible-inventory.md:443` | `kh3.base.san-fransokyo.chest.029` | \| 29 \| Strength Boost \| North District \| |
| `ai_docs/games/kh3/collectible-inventory.md:444` | `kh3.base.san-fransokyo.chest.030` | \| 30 \| Midnight Anklet \| Central District \| |
| `ai_docs/games/kh3/collectible-inventory.md:445` | `kh3.base.san-fransokyo.chest.031` | \| 31 \| Mega-Potion \| South District \| |
| `ai_docs/games/kh3/collectible-inventory.md:446` | `kh3.base.san-fransokyo.chest.032` | \| 32 \| Damascus \| North District \| |
| `ai_docs/games/kh3/collectible-inventory.md:447` | `kh3.base.san-fransokyo.chest.033` | \| 33 \| AP Boost \| North District \| |
| `ai_docs/games/kh3/collectible-inventory.md:448` | `kh3.base.san-fransokyo.chest.034` | \| 34 \| Mickey's Mechanical Man \| Central District \| |
| `ai_docs/games/kh3/collectible-inventory.md:449` | `kh3.base.san-fransokyo.chest.035` | \| 35 \| How to Play Baseball \| South District \| |
| `ai_docs/games/kh3/collectible-inventory.md:450` | `kh3.base.san-fransokyo.chest.036` | \| 36 \| Mickey Steps Out \| South District \| |
| `ai_docs/games/kh3/collectible-inventory.md:456` | `kh3.base.san-fransokyo.emblem.001` | \| 1 \| Hiro's Garage \| |
| `ai_docs/games/kh3/collectible-inventory.md:457` | `kh3.base.san-fransokyo.emblem.002` | \| 2 \| South District \| |
| `ai_docs/games/kh3/collectible-inventory.md:458` | `kh3.base.san-fransokyo.emblem.003` | \| 3 \| South District:Night \| |
| `ai_docs/games/kh3/collectible-inventory.md:459` | `kh3.base.san-fransokyo.emblem.004` | \| 4 \| South District \| |
| `ai_docs/games/kh3/collectible-inventory.md:460` | `kh3.base.san-fransokyo.emblem.005` | \| 5 \| Central District \| |
| `ai_docs/games/kh3/collectible-inventory.md:461` | `kh3.base.san-fransokyo.emblem.006` | \| 6 \| Central District \| |
| `ai_docs/games/kh3/collectible-inventory.md:462` | `kh3.base.san-fransokyo.emblem.007` | \| 7 \| Central District \| |
| `ai_docs/games/kh3/collectible-inventory.md:463` | `kh3.base.san-fransokyo.emblem.008` | \| 8 \| North District \| |
| `ai_docs/games/kh3/collectible-inventory.md:464` | `kh3.base.san-fransokyo.emblem.009` | \| 9 \| North District \| |
| `ai_docs/games/kh3/collectible-inventory.md:465` | `kh3.base.san-fransokyo.emblem.010` | \| 10 \| North District \| |
| `ai_docs/games/kh3/collectible-inventory.md:466` | `kh3.base.san-fransokyo.emblem.011` | \| 11 \| North District \| |
| `ai_docs/games/kh3/collectible-inventory.md:476` | `kh3.base.100-acre-wood.emblem.001` | \| 1 \| Rabbit's House \| |
| `ai_docs/games/kh3/collectible-inventory.md:477` | `kh3.base.100-acre-wood.emblem.002` | \| 2 \| Rabbit's House \| |
| `ai_docs/games/kh3/collectible-inventory.md:478` | `kh3.base.100-acre-wood.emblem.003` | \| 3 \| Rabbit's House \| |
| `ai_docs/games/kh3/collectible-inventory.md:488` | `kh3.base.keyblade-graveyard.chest.001` | \| 1 \| Map: The Badlands \| The Badlands \| |
| `ai_docs/games/kh3/collectible-inventory.md:489` | `kh3.base.keyblade-graveyard.chest.002` | \| 2 \| Cosmic Belt \| The Badlands \| |
| `ai_docs/games/kh3/collectible-inventory.md:490` | `kh3.base.keyblade-graveyard.chest.003` | \| 3 \| Map: The Skein of Severance \| Trail of Valediction \| |
| `ai_docs/games/kh3/collectible-inventory.md:491` | `kh3.base.keyblade-graveyard.chest.004` | \| 4 \| Megalixir \| Trail of Valediction \| |
| `ai_docs/games/kh3/collectible-inventory.md:492` | `kh3.base.keyblade-graveyard.chest.005` | \| 5 \| Mega-Potion \| Trail of Valediction \| |
| `ai_docs/games/kh3/collectible-inventory.md:493` | `kh3.base.keyblade-graveyard.chest.006` | \| 6 \| Mega-Ether \| Twist of Isolation \| |
| `ai_docs/games/kh3/collectible-inventory.md:503` | `kh3.base.the-final-world.chest.001` | \| 1 \| Orichalcum+ \| The Final World \| |
| `ai_docs/games/kh3/collectible-inventory.md:513` | `kh3.remind.scala-ad-caelum.chest.001` | \| 1 \| Map: The Stairway to the Sky \| The Stairway to the Sky \| |
| `ai_docs/games/kh3/collectible-inventory.md:514` | `kh3.remind.scala-ad-caelum.chest.002` | \| 2 \| Map: Breezy Quarter \| Breezy Quarter \| |
| `ai_docs/games/kh3/collectible-inventory.md:515` | `kh3.remind.scala-ad-caelum.chest.003` | \| 3 \| Megalixir \| Breezy Quarter \| |
| `ai_docs/games/kh3/collectible-inventory.md:516` | `kh3.remind.scala-ad-caelum.chest.004` | \| 4 \| Tarte aux Fruits+ \| Breezy Quarter \| |
| `ai_docs/games/kh3/collectible-inventory.md:517` | `kh3.remind.scala-ad-caelum.chest.005` | \| 5 \| Wellspring Crystal \| Breezy Quarter \| |
| `ai_docs/games/kh3/collectible-inventory.md:518` | `kh3.remind.scala-ad-caelum.chest.006` | \| 6 \| Wellspring Gem \| Breezy Quarter \| |
| `ai_docs/games/kh3/collectible-inventory.md:519` | `kh3.remind.scala-ad-caelum.chest.007` | \| 7 \| Mega-Ether \| Breezy Quarter \| |
| `ai_docs/games/kh3/collectible-inventory.md:520` | `kh3.remind.scala-ad-caelum.chest.008` | \| 8 \| Electrum \| Breezy Quarter \| |
| `ai_docs/games/kh3/collectible-inventory.md:521` | `kh3.remind.scala-ad-caelum.chest.009` | \| 9 \| Hungry Crystal \| Breezy Quarter \| |

## Historical Appendix B — complete documentary caveat/context occurrence ledger

All substantive prose/list/status-table lines in the seven research documents, specification, readiness and rollout are preserved below (numbered collectible identity rows are mapped above). Includes source-confidence qualifiers and required-scope lists even without hedge keywords, so an unimplemented category cannot disappear just because it was phrased as a requirement. Quotes are repository evidence, not newly verified external source claims. The topic column is a cross-reference aid; detailed status/resolution is authoritative in the numbered findings and H/P/N ledgers.

| Exact occurrence | Topics / disposition | Representative excerpt |
|---|---|---|
| `ai_docs/games/kh3/README.md:3` | 029/030; P01/P02/P03 | Research date: 2026-09-18. This set expands the [KH3 specification](../kingdom-hearts-iii.md) and [readiness assessment](../../readiness/kingdom-hearts-iii.md). It documents evidence and unresolved work; it is not production data or a claim of complete gameplay verification. |
| `ai_docs/games/kh3/README.md:7` | 001/004 | - [Numbered collectible inventory](collectible-inventory.md): 245 base chests, 90 Lucky Emblems, nine separate Re Mind chests; complete candidate identities/areas, incomplete detailed routes. |
| `ai_docs/games/kh3/README.md:8` | 007/026; 010/011; 012/014; 013; H01/N01/N02/N03/N04 | - [Workshop and equipment](workshop-and-equipment.md): Photo Missions, Ultima Weapon, materials, Keyblade upgrades and acquisition model. |
| `ai_docs/games/kh3/README.md:9` | 008/009/H02; 015/H02; 016/017/H02; 018; 019; 020; 021; H01/N01/N02/N03/N04 | - [Cuisine and records](cuisine-and-records.md): ingredient/recipe categories, Flantastic Seven, all 23 Classic Kingdom acquisition identities, minigame thresholds. |
| `ai_docs/games/kh3/README.md:10` | 023; 024/025/026/027; 035 | - [Gummi and optional rewards](gummi-and-optional.md): constellations, zone structure, Battlegates/Reports, side rewards and remaining inventories. |
| `ai_docs/games/kh3/README.md:11` | 004/034; 031/032; 032 | - [Editions, Re Mind and achievements](editions-and-dlc.md): shipped versus announced releases, free updates versus paid content, episode/save boundaries and achievement overlays. |
| `ai_docs/games/kh3/README.md:12` | P01/P02/P03 | - [Inspected-source manifest and conflicts](sources-and-conflicts.md): source coverage, legacy absence evidence, confidence limits and disagreements. |
| `ai_docs/games/kh3/README.md:16` | 008/009/H02; 012/014; 013; 021; 023; 024/025/026/027; 029/030; 031/032; 032; H01/N01/N02/N03/N04 | The compendium answers **where an item is and how to acquire it**. Apply the [shared acquisition contract](../../content/collectible-compendium-and-linked-views.md), [synthesis/inventory contract](../../content/synthesis-and-inventory.md) and [validation contract](../../testing-and-content-validation.md). Steam is the user’s platform. The app is spoilerific without warnings/hiding/reveal controls; no Available Now or story-progress tracking/filter is planned. Retain textual acquisition prerequisites. Optional inventory shows owned/required x/y counts; synthesis and forge calculations need strong validation. Initial browser/functionality acceptance targets Apple/iPhone/iPad, with Android follow-up. No user gameplay or playthrough is a release gate. Story and biography checklists are not world-percentage gates. Access conditions may reference story progress only where they change an acquisition. Synthesis, equipment, records, optional encounters, Gummi and platform achievements remain separate useful MVP modules. |
| `ai_docs/games/kh3/README.md:18` | 001/004; 004/034; 029/030; 035; H01/N01/N02/N03/N04 | World collection progress uses the complete applicable collectible denominator. A filter, search, unavailable night state or locked route cannot make an unfinished world read as complete. Each small mark and its expanded detail row resolve to one stable record and one saved state, including when shown through Data Jiminy or an item index. Parent rewards and contained items must not duplicate physical collectibles. Show category counts before any mixed-unit roll-up. |
| `ai_docs/games/kh3/README.md:20` | 029/030; H01/N01/N02/N03/N04 | All required data, text directions, offline progress, import/export safety, media fields and Data Jiminy remain MVP. Only missing production screenshot/map images are deferred. This audit introduces no new feature deferrals. |
| `ai_docs/games/kh3/README.md:22` | 024/025/026/027; H01/N01/N02/N03/N04 | KH3 keeps the accepted dark digital Gummiphone-style presentation: navy/indigo background, readable blue/violet tiles, cyan selection and explicit completion indicators. Mobile layouts expand details without shrinking a console menu screenshot. |
| `ai_docs/games/kh3/README.md:26` | 001/004; 004/034; 008/009/H02; 010/011; 013; 021; 024/025/026/027; 031/032; 032; P01/P02/P03; H01/N01/N02/N03/N04 | The repository previously supplied a scope outline and readiness stub; it had no KH3 data or working KH3 game page. KHTABLES supplies no identified KH3 source. This research adds complete community-table candidate inventory coverage for the numbered world collectibles, several fully enumerated smaller categories and concrete planning fixtures. It does **not** certify all routes, equipment/recipe edges, drop rates, Gummi records, version-specific save behavior or every platform achievement. The readiness page identifies those release blockers explicitly. |
| `ai_docs/games/kh3/collectible-inventory.md:3` | 001/004; 024/025/026/027; 029/030; P01/P02/P03; H01/N01/N02/N03/N04 | Research date: 2026-09-18. [Research index](README.md). This is a complete **candidate identity/contents/area inventory** from inspected community tables, not a completed text-route guide or an in-game verification claim. Numbering follows the cited tables and must be reconciled against the modern Gummiphone before production through content validation; no user gameplay test is required. Empty location-detail fields must remain explicitly incomplete. |
| `ai_docs/games/kh3/collectible-inventory.md:5` | 001/004; 004/034; 019; 021; H01/N01/N02/N03/N04 | All base records belong to Sora’s selected save. Re Mind records use a separate episode scope. World pages, compact marks, expanded detail rows, item indexes and Data Jiminy must point to one stable record and one saved state. A chest containing a Classic Kingdom game is one chest event, with a link to the game acquisition; it is not a second chest. |
| `ai_docs/games/kh3/collectible-inventory.md:9` | 001/004 | \| World \| Base chests \| Lucky Emblems \| Re Mind chests \| |
| `ai_docs/games/kh3/collectible-inventory.md:11` | Context / scope | \| Olympus \| 32 \| 12 \| 0 \| |
| `ai_docs/games/kh3/collectible-inventory.md:12` | Context / scope | \| Twilight Town \| 10 \| 9 \| 0 \| |
| `ai_docs/games/kh3/collectible-inventory.md:13` | Context / scope | \| Toy Box \| 29 \| 11 \| 0 \| |
| `ai_docs/games/kh3/collectible-inventory.md:14` | Context / scope | \| Kingdom of Corona \| 28 \| 9 \| 0 \| |
| `ai_docs/games/kh3/collectible-inventory.md:15` | Context / scope | \| Monstropolis \| 22 \| 11 \| 0 \| |
| `ai_docs/games/kh3/collectible-inventory.md:16` | Context / scope | \| Arendelle \| 25 \| 11 \| 0 \| |
| `ai_docs/games/kh3/collectible-inventory.md:17` | Context / scope | \| The Caribbean \| 56 \| 13 \| 0 \| |
| `ai_docs/games/kh3/collectible-inventory.md:18` | Context / scope | \| San Fransokyo \| 36 \| 11 \| 0 \| |
| `ai_docs/games/kh3/collectible-inventory.md:19` | 020 | \| 100 Acre Wood \| 0 \| 3 \| 0 \| |
| `ai_docs/games/kh3/collectible-inventory.md:20` | 012/014 | \| Keyblade Graveyard \| 6 \| 0 \| 0 \| |
| `ai_docs/games/kh3/collectible-inventory.md:21` | Context / scope | \| The Final World \| 1 \| 0 \| 0 \| |
| `ai_docs/games/kh3/collectible-inventory.md:22` | Context / scope | \| Scala ad Caelum \| 0 \| 0 \| 9 \| |
| `ai_docs/games/kh3/collectible-inventory.md:23` | Context / scope | \| **Total** \| **245** \| **90** \| **9** \| |
| `ai_docs/games/kh3/collectible-inventory.md:25` | 001/004; 006; 010/011; 015/H02; 023; 024/025/026/027; H01/N01/N02/N03/N04 | The 245-chest and 90-emblem totals exclude Golden Herc Figures, Frozen Slider prizes, Gummi treasure, materials, ingredients and DLC chests. Those have their own units. Five Golden Herc Figures and ten Frozen Slider prizes remain collectible subcategories; their complete routes must be supplied before release. One optional world collection roll-up may combine collectible units, but must show its category denominators and never add plot/biography gates. |
| `ai_docs/games/kh3/collectible-inventory.md:29` | 001/004; 002; 004/034; 029/030; 035; P01/P02/P03 | Proposed key: `kh3.base.<world>.chest.<nnn>` or `kh3.base.<world>.emblem.<nnn>`; DLC key: `kh3.remind.scala-ad-caelum.chest.<nnn>`. Keep a separate `journal_number`, canonical area ID, display alias, source, verification status and save profile. Do not key by the reward name, which repeats. The source spelling `Trail of Valediction` needs reconciliation with `Trial of Valediction`; `Horseshoe Island`/`Horseshoe Isle` and `Petit`/`Petite Ribbon` are also alias candidates. |
| `ai_docs/games/kh3/collectible-inventory.md:33` | P01/P02/P03 | Source: [Olympus gameplay tables](https://www.khwiki.com/Game:Olympus); only the KH3 section (or explicitly Re Mind section) was selected. |
| `ai_docs/games/kh3/collectible-inventory.md:91` | P01/P02/P03 | Source: [Twilight Town gameplay tables](https://www.khwiki.com/Game:Twilight_Town); only the KH3 section (or explicitly Re Mind section) was selected. |
| `ai_docs/games/kh3/collectible-inventory.md:124` | P01/P02/P03 | Source: [Toy Box gameplay tables](https://www.khwiki.com/Game:Toy_Box); only the KH3 section (or explicitly Re Mind section) was selected. |
| `ai_docs/games/kh3/collectible-inventory.md:178` | P01/P02/P03 | Source: [Kingdom of Corona gameplay tables](https://www.khwiki.com/Game:Kingdom_of_Corona); only the KH3 section (or explicitly Re Mind section) was selected. |
| `ai_docs/games/kh3/collectible-inventory.md:229` | P01/P02/P03 | Source: [Monstropolis gameplay tables](https://www.khwiki.com/Game:Monstropolis); only the KH3 section (or explicitly Re Mind section) was selected. |
| `ai_docs/games/kh3/collectible-inventory.md:276` | P01/P02/P03 | Source: [Arendelle gameplay tables](https://www.khwiki.com/Game:Arendelle); only the KH3 section (or explicitly Re Mind section) was selected. |
| `ai_docs/games/kh3/collectible-inventory.md:326` | P01/P02/P03 | Source: [The Caribbean gameplay tables](https://www.khwiki.com/Game:The_Caribbean); only the KH3 section (or explicitly Re Mind section) was selected. |
| `ai_docs/games/kh3/collectible-inventory.md:409` | P01/P02/P03 | Source: [San Fransokyo gameplay tables](https://www.khwiki.com/Game:San_Fransokyo); only the KH3 section (or explicitly Re Mind section) was selected. |
| `ai_docs/games/kh3/collectible-inventory.md:470` | 020; P01/P02/P03 | Source: [100 Acre Wood gameplay tables](https://www.khwiki.com/Game:100_Acre_Wood); only the KH3 section (or explicitly Re Mind section) was selected. |
| `ai_docs/games/kh3/collectible-inventory.md:482` | 012/014; P01/P02/P03 | Source: [Keyblade Graveyard gameplay tables](https://www.khwiki.com/Game:Keyblade_Graveyard); only the KH3 section (or explicitly Re Mind section) was selected. |
| `ai_docs/games/kh3/collectible-inventory.md:497` | P01/P02/P03 | Source: [The Final World gameplay tables](https://www.khwiki.com/Game:The_Final_World); only the KH3 section (or explicitly Re Mind section) was selected. |
| `ai_docs/games/kh3/collectible-inventory.md:507` | P01/P02/P03 | Source: [Scala ad Caelum gameplay tables](https://www.khwiki.com/Game:Scala_ad_Caelum); only the KH3 section (or explicitly Re Mind section) was selected. |
| `ai_docs/games/kh3/collectible-inventory.md:525` | 001/004; 024/025/026/027; H01/N01/N02/N03/N04 | - Olympus emblems require the Gummiphone, so the initial Olympus visit cannot finish that category. Olympus chest 31 needs a Diving Strike. The Golden Herc side collection has five figures, exchanged for Hero’s Belt after Olympus. [Olympus](https://www.khwiki.com/Game:Olympus), [Golden Herc Figure](https://www.khwiki.com/Golden_Herc_Figure). |
| `ai_docs/games/kh3/collectible-inventory.md:526` | 001/004; 003; 007/026; P01/P02/P03 | - Toy Box emblem 6 needs the display destroyed with a Gigas. Emblem 8 has a source discrepancy: the dedicated emblem page calls it 2F, while the world table calls it 3F; use the hanging UFO landmark and verify the camera standing position. [Toy Box](https://www.khwiki.com/Game:Toy_Box), [Lucky Emblem](https://www.khwiki.com/Lucky_Emblem). |
| `ai_docs/games/kh3/collectible-inventory.md:527` | 001/004 | - Monstropolis chest 8 (elevator), chest 21 and emblem 11 are marked for return after completing the world. Store access conditions separately from `found`. [Monstropolis](https://www.khwiki.com/Game:Monstropolis). |
| `ai_docs/games/kh3/collectible-inventory.md:528` | 001/004; 029/030; H01/N01/N02/N03/N04 | - San Fransokyo emblem 3 requires night. Keep this as a text prerequisite; no Available Now/progression filter is planned. [Lucky Emblem](https://www.khwiki.com/Lucky_Emblem). |
| `ai_docs/games/kh3/collectible-inventory.md:529` | 001/004; 010/011; H01/N01/N02/N03/N04 | - The Final World’s Orichalcum+ chest is a revisit acquisition. Re Mind’s nine Scala chests must never enter the base Treasures denominator. [The Final World](https://www.khwiki.com/Game:The_Final_World), [Scala ad Caelum](https://www.khwiki.com/Game:Scala_ad_Caelum). |
| `ai_docs/games/kh3/collectible-inventory.md:530` | 005/007; 013; 023; 029/030; 035; P01/P02/P03; H01/N01/N02/N03/N04 | - Forest Clasp is missable. Four Rapunzel activities are involved: dandelions, pond splashing, protecting rabbits and guiding birds. The item page gives the stricter deadline “before reaching the Shore”; the world page says before Rapunzel leaves the party. Publish the conservative pre-Shore warning until gameplay verifies the exact trigger. This optional equipment reward is not a story-completion gate. [Forest Clasp](https://www.khwiki.com/Forest_Clasp), [Corona](https://www.khwiki.com/Game:Kingdom_of_Corona). |
| `ai_docs/games/kh3/collectible-inventory.md:534` | 001/004; 004/034; 006; 007/026; 024/025/026/027; 029/030; P01/P02/P03 | Every row still needs complete original, source-validated text directions from a named save point or landmark, action/camera position, earliest access, revisit/missability evidence, and optional media metadata. Source table notes are sparse, especially many chest rows and Scala. No row is promoted to `route_verified` merely because its number and area exist here. Frozen Slider’s ten path choices and Gummi treasure positions are not represented by these world tables. |
| `ai_docs/games/kh3/cuisine-and-records.md:3` | 016/017/H02; 029/030; 031/032; H01/N01/N02/N03/N04 | Research date: 2026-09-18. [Index](README.md). Acquisition, cooking success, record rank and achievement progress are separate states. |
| `ai_docs/games/kh3/cuisine-and-records.md:7` | 001/004; 016/017/H02; H01/N01/N02/N03/N04 | The Bistrot’s five-star requirement uses the **20 Classic Menu dishes rated Excellent**. Special Menu dishes do not raise the star count; the full cooking catalogue has 28 dishes. Milestones are 4/7/10/14/20 Excellent Classic dishes for stars 1–5; the first, third and fifth award Gourmand’s Ring, Elixir and Grand Chef. Excellent creates the `+` dish. Owning a dish from a chest does not demonstrate an Excellent cooking record. [Le Grand Bistrot](https://www.khwiki.com/Le_Grand_Bistrot). |
| `ai_docs/games/kh3/cuisine-and-records.md:9` | 016/017/H02 | The 28 dishes, grouped by course, are: |
| `ai_docs/games/kh3/cuisine-and-records.md:11` | 016/017/H02 | \| Course \| Dishes \| |
| `ai_docs/games/kh3/cuisine-and-records.md:13` | H01/N01/N02/N03/N04 | \| Starters \| Mushroom Terrine; Scallop Poêlé; Ratatouille; Lobster Mousse; Caprese Salad \| |
| `ai_docs/games/kh3/cuisine-and-records.md:14` | Context / scope | \| Soup \| Consommé; Pumpkin Velouté; Carrot Potage; Crab Bisque; Cold Tomato Soup \| |
| `ai_docs/games/kh3/cuisine-and-records.md:15` | H01/N01/N02/N03/N04 | \| Fish \| Sole Meunière; Eel Matelote; Bouillabaisse; Sea Bass en Papillote; Seafood Tartare; Sea Bass Poêlé \| |
| `ai_docs/games/kh3/cuisine-and-records.md:16` | H01/N01/N02/N03/N04 | \| Meat \| Sweetbread Poêlé; Beef Sauté; Beef Bourguignon; Stuffed Quail; Filet Mignon Poêlé \| |
| `ai_docs/games/kh3/cuisine-and-records.md:17` | H01/N01/N02/N03/N04 | \| Dessert \| Chocolate Mousse; Fresh Fruit Compote; Crêpes Suzette; Berries au Fromage; Warm Banana Soufflé; Fruit Gelée; Tarte aux Fruits \| |
| `ai_docs/games/kh3/cuisine-and-records.md:19` | 008/009/H02; 016/017/H02; 029/030; P01/P02/P03 | Source: [Le Grand Bistrot](https://www.khwiki.com/Le_Grand_Bistrot). Retain course and menu as independent properties; the eight Special recipes must be explicitly assigned during recipe-edge extraction. |
| `ai_docs/games/kh3/cuisine-and-records.md:21` | 008/009/H02; 010/011; 016/017/H02; P01/P02/P03; H01/N01/N02/N03/N04 | For a full course, store one dish per course and distinguish the selected dish’s stats from the additional meal bonus. The complete bonus catalogue, duration rules and recipe material quantities remain unverified in this pass. [Cuisine](https://www.khwiki.com/Cuisine). |
| `ai_docs/games/kh3/cuisine-and-records.md:25` | 002; 015/H02; 016/017/H02; 029/030; 035; P01/P02/P03; H01/N01/N02/N03/N04 | The inspected Ingredients table contains **59 ingredients**. Names below are candidate modern-English identifiers; its regional aliases/romanization were omitted. Every item requires a found-ever state, current quantity and distinct location/reward/shop edges. The source is being proposed for merging into Cuisine; preserve record-level URLs and migration aliases. [Ingredients](https://www.khwiki.com/Ingredients). |
| `ai_docs/games/kh3/cuisine-and-records.md:27` | Context / scope | Veal; Beef; Quail; Filet Mignon; Crab; Scallop; Lobster; Sole; Eel; Sea Bass; Mussel; Cod; Pumpkin; Zucchini; Onion; Tomato; Eggplant; Carrot; Garlic; Celery; Morel; Porcini; Chanterelle; Portobello; Black Truffle; King Oyster Mushroom; Black Trumpet; Miller Mushroom; Cloves; Rosemary; Thyme; Bay Leaf; Basil; Dill; Parsley; Saffron; Apricot; Gooseberry; Lemon; Orange; Raspberry; Pear; Blackberry; Apple; Cheese; Chocolate; Caviar; Butter; Olive Oil; Cornichon; Rice; Honey; Sour Cherry; Strawberry; Blood Orange; Banana; Grapes; Melon; Watermelon. |
| `ai_docs/games/kh3/cuisine-and-records.md:29` | 001/004; 010/011; 015/H02; 029/030; P01/P02/P03; H01/N01/N02/N03/N04 | Useful location patterns: Twilight Town food boxes and baskets differ from forest mushrooms/herbs; Monstropolis includes vending-machine sources; Caribbean underwater sources differ from land pickups. A broad world label is insufficient for a production ingredient route. The world ingredient tables were inspected structurally and sampled for these patterns, not fully rewritten into 59 farm guides. |
| `ai_docs/games/kh3/cuisine-and-records.md:33` | 010/011; 015/H02; 018; 035; P01/P02/P03; H01/N01/N02/N03/N04 | The following upper thresholds earn three ingredients plus the ability reward, and all seven upper-tier results lead to Orichalcum+ and Flanniversary Badge. The source prints strict `>` comparisons; exact equality requires verification, so do not silently implement `>=`. [Flantastic Seven](https://www.khwiki.com/Flantastic_Seven). |
| `ai_docs/games/kh3/cuisine-and-records.md:35` | 015/H02; 018 | \| Flan \| World / area \| Upper threshold \| Ingredient \| Ability \| |
| `ai_docs/games/kh3/cuisine-and-records.md:37` | 012/014 | \| Cherry \| Olympus / Overlook \| >20,000 \| Sour Cherry \| Formchange Extender \| |
| `ai_docs/games/kh3/cuisine-and-records.md:38` | Context / scope | \| Strawberry \| Toy Box / Rest Area \| >17,000 \| Strawberry \| Attraction Extender \| |
| `ai_docs/games/kh3/cuisine-and-records.md:39` | Context / scope | \| Orange \| Corona / Hills \| >23,000 \| Blood Orange \| Treasure Magnet \| |
| `ai_docs/games/kh3/cuisine-and-records.md:40` | Context / scope | \| Banana \| Monstropolis / Upper Level \| >20,000 \| Banana \| Grand Magic Extender \| |
| `ai_docs/games/kh3/cuisine-and-records.md:41` | Context / scope | \| Grape \| Arendelle / Mountain Ridge \| >20,000 \| Grape \| Unison Blizzard \| |
| `ai_docs/games/kh3/cuisine-and-records.md:42` | Context / scope | \| Watermelon \| Caribbean / Fort \| >28,000 \| Watermelon \| Focus Syphon \| |
| `ai_docs/games/kh3/cuisine-and-records.md:43` | Context / scope | \| Honeydew \| San Fransokyo / South District \| >15,000 \| Melon \| Attraction Extender \| |
| `ai_docs/games/kh3/cuisine-and-records.md:45` | 001/004; 015/H02; 020; 035; P01/P02/P03; H01/N01/N02/N03/N04 | Track score, qualifying reward tier and ingredient received separately. Do not replace this reward requirement with an “attempted the minigame” marker. Repeatable ingredients and one-time ability rewards must remain distinct. Honeydew’s night access and each exact route need gameplay verification. |
| `ai_docs/games/kh3/cuisine-and-records.md:49` | 020; 031/032; P01/P02/P03 | \| Activity \| A-rank threshold \| Achievement target / separate collection \| Source \| |
| `ai_docs/games/kh3/cuisine-and-records.md:51` | Context / scope | \| Verum Rex: Beat of Lead \| 10,000,000 \| 12,000,000 for Centurion \| [Verum Rex](https://www.khwiki.com/Verum_Rex:_Beat_of_Lead) \| |
| `ai_docs/games/kh3/cuisine-and-records.md:52` | Context / scope | \| Festival Dance \| 50,000 \| 70,000 for Festive Dancer \| [Festival Dance](https://www.khwiki.com/Festival_Dance) \| |
| `ai_docs/games/kh3/cuisine-and-records.md:53` | 006 | \| Frozen Slider \| 500,000 \| 600,000 for Shield Shredder; ten special prizes separately \| [Frozen Slider](https://www.khwiki.com/Frozen_Slider) \| |
| `ai_docs/games/kh3/cuisine-and-records.md:54` | 020 | \| Flash Tracer A \| 60,000 \| A rank in both courses \| [Flash Tracer](https://www.khwiki.com/Flash_Tracer) \| |
| `ai_docs/games/kh3/cuisine-and-records.md:55` | 020 | \| Flash Tracer B \| 75,000 \| A rank in both courses \| [Flash Tracer](https://www.khwiki.com/Flash_Tracer) \| |
| `ai_docs/games/kh3/cuisine-and-records.md:57` | 031/032; 032 | The first three trophy targets are also directly published by [Steam achievements](https://steamcommunity.com/stats/2552450/achievements/). The Flash Tracer trophy description needs another platform readback because hidden Steam descriptions are blank. |
| `ai_docs/games/kh3/cuisine-and-records.md:59` | 001/004; 004/034; 006; 010/011; 024/025/026/027; H01/N01/N02/N03/N04 | Frozen Slider’s ten prizes are not Arendelle’s 25 Gummiphone chests. Completion awards Orichalcum+ and Master Treasure Magnet. Replay access is through Elsa/Goofy at the Ice Palace after clearing Arendelle. Full numbered path directions and confirmation of run-end save behavior remain required. [Frozen Slider](https://www.khwiki.com/Frozen_Slider). |
| `ai_docs/games/kh3/cuisine-and-records.md:61` | 001/004; 015/H02; 020; 021; 022; 024/025/026/027; 035; H01/N01/N02/N03/N04 | 100 Acre Wood’s vegetable, fruit and flower minigames must retain their ingredient/reward tables and record conditions. This pass establishes its zero base chests and three emblems, but does not finish all minigame rewards. The Caribbean also needs white-crab/Leviathan upgrades, ship battles, Treasure Ship and Black/Ghost Ship fleet rewards; those are not Gummi Ship records. |
| `ai_docs/games/kh3/cuisine-and-records.md:65` | 001/004; 019; 029/030; P01/P02/P03; H01/N01/N02/N03/N04 | All **23 KH3 games** are enumerated below. Acquisition is separate from recording a score. Do not import the former Union χ promotion’s score targets into KH3. First-five acquisition conditions use [Classic Kingdom](https://www.khwiki.com/Classic_Kingdom); chest references use the [numbered world ledger](collectible-inventory.md) and its individual world sources. |
| `ai_docs/games/kh3/cuisine-and-records.md:67` | H01/N01/N02/N03/N04 | \| No. \| Game \| Acquisition \| |
| `ai_docs/games/kh3/cuisine-and-records.md:69` | Context / scope | \| 01 \| Giantland \| Twilight Town clear \| |
| `ai_docs/games/kh3/cuisine-and-records.md:70` | Context / scope | \| 02 \| Mickey, the Mail Pilot \| Tram Common film poster after Twilight Town \| |
| `ai_docs/games/kh3/cuisine-and-records.md:71` | 010/011 | \| 03 \| The Musical Farmer \| Tram Common film poster after Twilight Town \| |
| `ai_docs/games/kh3/cuisine-and-records.md:72` | 020; 032; H01/N01/N02/N03/N04 | \| 04 \| Building a Building \| Tram Common film poster after 100 Acre Wood \| |
| `ai_docs/games/kh3/cuisine-and-records.md:73` | 020 | \| 05 \| The Mad Doctor \| Tram Common film poster after 100 Acre Wood \| |
| `ai_docs/games/kh3/cuisine-and-records.md:74` | 001/004 | \| 06 \| Mickey Cuts Up \| Toy Box chest 29 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:75` | 001/004 | \| 07 \| Taxi Troubles \| Toy Box chest 13 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:76` | 001/004 | \| 08 \| The Barnyard Battle \| Toy Box chest 24 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:77` | 001/004 | \| 09 \| The Wayward Canary \| Kingdom of Corona chest 22 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:78` | 001/004 | \| 10 \| Camping Out \| Kingdom of Corona chest 9 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:79` | 001/004 | \| 11 \| The Karnival Kid \| Kingdom of Corona chest 24 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:80` | 001/004 | \| 12 \| How to Play Golf \| Monstropolis chest 10 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:81` | 001/004 | \| 13 \| Mickey's Circus \| Monstropolis chest 19 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:82` | 001/004 | \| 14 \| Barnyard Sports \| Arendelle chest 14 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:83` | 001/004 | \| 15 \| The Klondike Kid \| Arendelle chest 8 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:84` | 001/004 | \| 16 \| Mickey's Kitten Catch \| Arendelle chest 7 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:85` | 001/004 | \| 17 \| Fishin' Frenzy \| The Caribbean chest 4 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:86` | 001/004 | \| 18 \| Beach Party \| The Caribbean chest 13 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:87` | 001/004 | \| 19 \| Mickey's Prison Escape \| The Caribbean chest 47 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:88` | 001/004 | \| 20 \| Cast Out to Sea \| The Caribbean chest 10 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:89` | 001/004 | \| 21 \| How to Play Baseball \| San Fransokyo chest 35 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:90` | 001/004 | \| 22 \| Mickey's Mechanical Man \| San Fransokyo chest 34 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:91` | 001/004 | \| 23 \| Mickey Steps Out \| San Fransokyo chest 36 \| |
| `ai_docs/games/kh3/cuisine-and-records.md:93` | 001/004; 004/034; 019; 031/032; 035; P01/P02/P03 | The Classic Tone reward and Classically Trained achievement belong to the record goal, not merely opening all game chests. Steam describes a new high score in every game. Exact minimum-score/first-record behavior should be verified in a fresh save before choosing a numerical predicate. [Classic Kingdom](https://www.khwiki.com/Classic_Kingdom), [Steam achievements](https://steamcommunity.com/stats/2552450/achievements/). |
| `ai_docs/games/kh3/cuisine-and-records.md:97` | 008/009/H02; 012/014; 020; 021; 023; 031/032; H01/N01/N02/N03/N04 | Retain Game Records, Adversaries, synthesis history and reports as separate goals. Character files/glossary may serve reference/search, but their narrative unlocks do not gate collection percentages. Extract full Game Records requirements before claiming that an A-rank minigame list is the complete Records tab: combat actions, shotlocks, links, attractions and other entries may have separate units. Do not invent their total from trophy names. |
| `ai_docs/games/kh3/cuisine-and-records.md:99` | 001/004; 008/009/H02; 019; H01/N01/N02/N03/N04 | Required fixtures: Excellent 20 Classic/0 Special yields the five-star goal while leaving eight recipes unfinished; obtaining Sea Bass en Papillote+ from Corona chest 26 does not mark it cooked Excellent; acquiring Classic game 13 via Monstropolis chest 19 synchronizes acquisition but leaves the high-score state untouched. |
| `ai_docs/games/kh3/editions-and-dlc.md:3` | 004/034; 032; P01/P02/P03; H01/N01/N02/N03/N04 | Research date: **2026-09-18**. [Index](README.md). A feature being announced is not evidence that a shipped build has been tested. Store/platform family, content entitlement, game build, language, difficulty and save lineage are independent fields. |
| `ai_docs/games/kh3/editions-and-dlc.md:7` | 032; P01/P02/P03 | \| Edition \| Status at research date \| Evidence / treatment \| |
| `ai_docs/games/kh3/editions-and-dlc.md:9` | Context / scope | \| PS4 / Xbox One base game with updates \| Shipped \| Base content and free update features; paid Re Mind entitlement remains separate \| |
| `ai_docs/games/kh3/editions-and-dlc.md:10` | H01/N01/N02/N03/N04 | \| PS4 Re Mind / Xbox One Re Mind \| Shipped; released 2020-01-23 / 2020-02-25 \| Official Japanese DLC page identifies both; base game is required \| |
| `ai_docs/games/kh3/editions-and-dlc.md:11` | 032; H01/N01/N02/N03/N04 | \| Epic PC KH3 + Re Mind \| Shipped bundle \| Current official collection page lists Epic as available; exact installed build not audited \| |
| `ai_docs/games/kh3/editions-and-dlc.md:12` | 031/032 | \| Steam KH3 + Re Mind \| Shipped, 2024-06-13 \| Steam confirms bundled Re Mind, Dead of Night and 51 achievements \| |
| `ai_docs/games/kh3/editions-and-dlc.md:13` | 032 | \| Switch Cloud KH3 + Re Mind \| Shipped service, sales ended \| Official notice: sales ended 2026-06-09 23:59 JST; play ends 2027-06-09 23:59 JST \| |
| `ai_docs/games/kh3/editions-and-dlc.md:14` | 031/032; 032; P01/P02/P03 | \| Native Switch 2, PS5, Xbox Series X/S and Microsoft Store Windows KH3 + Re Mind \| **Announced for 2026-10-08; unreleased** \| Official Collection [I–III] page; gameplay/achievement differences unverified \| |
| `ai_docs/games/kh3/editions-and-dlc.md:16` | 029/030; 031/032; 032; P01/P02/P03 | Primary sources: [Square Enix Re Mind](https://www.jp.square-enix.com/kingdom/kh3/dlc/index.html), [Steam product](https://store.steampowered.com/app/2552450/KINGDOM_HEARTS_III__Re_Mind_DLC/), [Square Enix Collection](https://www.jp.square-enix.com/kingdom/collection/), [Square Enix cloud notice](https://support.jp.square-enix.com/news.php?drt=1781017200&id=19066&la=0&n=2&tag=ab4073e28135a1345b861beefd8b6a2c459e1ed4). |
| `ai_docs/games/kh3/editions-and-dlc.md:18` | 004/034; 032; P01/P02/P03; H01/N01/N02/N03/N04 | The official future-release page advertises Long Night for Switch 2, Midnight Blue for PS5 and Phantom Green for Xbox Series/Windows. It also confirms cloud-to-digital save transfer availability; region/platform-specific transfer steps still need verification. Do not display those unreleased editions as tested. Native Switch support on that page applies to KH1.5+2.5, **not KH3**. [Square Enix Collection](https://www.jp.square-enix.com/kingdom/collection/). |
| `ai_docs/games/kh3/editions-and-dlc.md:20` | 012/014; 029/030; 031/032; 032; H01/N01/N02/N03/N04 | Older platform bonuses (Midnight Blue, Phantom Green, Dawn Till Dusk, Elemental Encoder, Advent Red) need exact historical/current entitlement edges and storefront readback. Do not put every exclusive in a single universal Keyblade denominator. Steam’s Dead of Night is directly confirmed by its product page. Store availability is metadata, not a reason to delete an existing user’s acquired record. |
| `ai_docs/games/kh3/editions-and-dlc.md:24` | 001/004; 004/034; 006; 007/026; 008/009/H02; 029/030; 033 | Published community patch history identifies v1.04 Critical Mode/Proofs/Frozen Slider treasure display/synthesis checkmarks; v1.05 New Game+ carryover and 200-photo capacity; v1.07 Oathkeeper/Oblivion exchanges plus six post-clear abilities; v1.10 active Premium Menu code counters. These refer to the console patch numbering; do not assume PC version strings are identical. [KH3 patch history](https://www.khwiki.com/Kingdom_Hearts_III#Patch_update_data). |
| `ai_docs/games/kh3/editions-and-dlc.md:26` | 001/004; 004/034; 007/026; 029/030; H01/N01/N02/N03/N04 | Proof of Promises requires 90 photographed emblems and a cleared game; Proof of Times Past requires a Critical clear. They exchange for Oathkeeper and Oblivion respectively. Proofs carry through New Game+. These are updated-base-game acquisitions, not a paid Re Mind unlock. [Proof](https://www.khwiki.com/Proof). |
| `ai_docs/games/kh3/editions-and-dlc.md:28` | 001/004; 029/030 | The secret-ending emblem thresholds differ by difficulty (90 Beginner, 60 Standard, 30 Proud, none Critical). They are an ending goal, not the 90-emblem collection denominator. [Lucky Emblem](https://www.khwiki.com/Lucky_Emblem). |
| `ai_docs/games/kh3/editions-and-dlc.md:32` | 001/004; 028; 029/030; 032 | The official DLC lists Re Mind scenario, Limitcut with 13 bosses, Secret Episode, playable-character changes, Data Greeting, Slideshow and Premium Menu. The orchestra edition adds a concert recording; that is not another set of world collectibles. [Square Enix Re Mind](https://www.jp.square-enix.com/kingdom/kh3/dlc/index.html). |
| `ai_docs/games/kh3/editions-and-dlc.md:34` | 029/030; H01/N01/N02/N03/N04 | Model separate progress scopes: |
| `ai_docs/games/kh3/editions-and-dlc.md:36` | P01/P02/P03; H01/N01/N02/N03/N04 | \| Scope \| What belongs here \| Prerequisite / unresolved verification \| |
| `ai_docs/games/kh3/editions-and-dlc.md:38` | 001/004; 004/034; 008/009/H02; 021; 032; H01/N01/N02/N03/N04 | \| Base save \| 245 chests, 90 emblems, synthesis, normal records \| Selected save identity, difficulty/build \| |
| `ai_docs/games/kh3/editions-and-dlc.md:39` | 001/004; 004/034; 032; 035; H01/N01/N02/N03/N04 | \| Re Mind scenario \| Nine Scala chests, DLC rewards \| Base cleared-save start flow and return/replay behavior require platform test \| |
| `ai_docs/games/kh3/editions-and-dlc.md:40` | 004/034; 028; 035; P01/P02/P03; H01/N01/N02/N03/N04 | \| Limitcut \| Thirteen individual data victories and first-clear rewards \| Re Mind-clear start flow needs menu/save test; XI→Xion/Master Xehanort lock is sourced \| |
| `ai_docs/games/kh3/editions-and-dlc.md:41` | 028 | \| Secret Episode \| Yozora attempt/victory, Crystal Regalia+ \| All thirteen data victories unlock episode \| |
| `ai_docs/games/kh3/editions-and-dlc.md:42` | 004/034; 029/030 | \| Premium Menu \| Mode chosen, enabled codes, merits, per-boss best PRO score \| Per-save unlock/eligibility; do not merge across unrelated runs \| |
| `ai_docs/games/kh3/editions-and-dlc.md:43` | 007/026; 028 | \| Creative modes \| Data Greeting/Slideshow unlock/access reference \| No invented “all poses/photos” completion denominator \| |
| `ai_docs/games/kh3/editions-and-dlc.md:45` | 010/011; 028 | The initial Limitcut set has eleven accessible fights; Xion and Master Xehanort open after those eleven. All thirteen wins unlock the Secret Episode; first-clear drops do not repeat. [Recreated Data](https://www.khwiki.com/Real_Organization_XIII%27s_Recreated_Data). |
| `ai_docs/games/kh3/editions-and-dlc.md:47` | 035 | \| Data opponent \| First-clear reward \| |
| `ai_docs/games/kh3/editions-and-dlc.md:49` | Context / scope | \| Ansem \| Defense Boost \| |
| `ai_docs/games/kh3/editions-and-dlc.md:50` | Context / scope | \| Xemnas \| Power Weight \| |
| `ai_docs/games/kh3/editions-and-dlc.md:51` | Context / scope | \| Xigbar \| AP Boost \| |
| `ai_docs/games/kh3/editions-and-dlc.md:52` | Context / scope | \| Luxord \| Magic Weight \| |
| `ai_docs/games/kh3/editions-and-dlc.md:53` | Context / scope | \| Larxene \| Magic Boost \| |
| `ai_docs/games/kh3/editions-and-dlc.md:54` | Context / scope | \| Marluxia \| Magic Weight \| |
| `ai_docs/games/kh3/editions-and-dlc.md:55` | Context / scope | \| Saïx \| Power Weight \| |
| `ai_docs/games/kh3/editions-and-dlc.md:56` | Context / scope | \| Terra-Xehanort \| Strength Boost \| |
| `ai_docs/games/kh3/editions-and-dlc.md:57` | Context / scope | \| Dark Riku \| Power Weight \| |
| `ai_docs/games/kh3/editions-and-dlc.md:58` | Context / scope | \| Vanitas \| AP Boost \| |
| `ai_docs/games/kh3/editions-and-dlc.md:59` | Context / scope | \| Young Xehanort \| Magic Weight \| |
| `ai_docs/games/kh3/editions-and-dlc.md:60` | Context / scope | \| Xion \| Breakthrough \| |
| `ai_docs/games/kh3/editions-and-dlc.md:61` | Context / scope | \| Master Xehanort \| Master Belt \| |
| `ai_docs/games/kh3/editions-and-dlc.md:63` | 028; 035; P01/P02/P03 | Source: [Recreated Data](https://www.khwiki.com/Real_Organization_XIII%27s_Recreated_Data). Yozora awards Crystal Regalia+; it is separate from Dark Inferno’s Crystal Regalia. [The Final World, Re Mind rewards](https://www.khwiki.com/Game:The_Final_World). |
| `ai_docs/games/kh3/editions-and-dlc.md:65` | 001/004; 004/034; P01/P02/P03; H01/N01/N02/N03/N04 | Temporary playable Riku, Aqua, Roxas and Kairi are encounter character choices, not separate world collectible campaigns. Store `playable_character` where an encounter/ability depends on it; do not multiply the base chest inventory by those characters. Save lineage must distinguish a base source save, DLC continuation and New Game+ descendant. Base/DLC resume controls, transfer of later base gains, inaccessible post-episode chests and replay overwrite behavior are not certified by this audit; these require an explicit test matrix before player instructions are considered safe. |
| `ai_docs/games/kh3/editions-and-dlc.md:69` | 004/034; 024/025/026/027; 028; 029/030; 031/032 | Easy Adventure unlocks EZ Codes; Challenging Adventure unlocks PRO Codes; Usual Adventure initially locks the menu. Defeating Yozora unlocks both code menus on that save. Active EZ Battle Codes can prevent PRO merit points and affect trophies. Gummi Ship Meister permanently sets its affected inventory/level; toggling it is not reversible in that save. [Premium Menu](https://www.khwiki.com/Premium_Menu). |
| `ai_docs/games/kh3/editions-and-dlc.md:71` | 029/030; 031/032; P01/P02/P03; H01/N01/N02/N03/N04 | Nine EZ merits: Aerial, Rage Form, Link, Icebreaker, Gigas, Sky Walk, Schwarzgeist, Bowling and Survival. Store merits separately from toggled codes. Survival requires its specific active-code configuration. The inspected page lists 15 EZ codes and 13 PRO codes; exact per-code effects/achievement blocking and all nine predicates still need a canonical audited table. |
| `ai_docs/games/kh3/editions-and-dlc.md:73` | 020; 029/030; P01/P02/P03; H01/N01/N02/N03/N04 | The same source gives maximum PRO points 530,000 and A rank at **364,125**. It describes 1.25 per difficulty star, reaching 50× with all codes; the rank-B value is explicitly uncertain. Do not implement the rank ladder, repeated-boss aggregation or rounding from that uncertainty. Record per-boss best score and active-code configuration, then verify replacement/rounding rules. [Premium Menu](https://www.khwiki.com/Premium_Menu). |
| `ai_docs/games/kh3/editions-and-dlc.md:77` | 001/004; 008/009/H02; 012/014; 015/H02; 016/017/H02; 019; 024/025/026/027; 029/030; 031/032; P01/P02/P03; H01/N01/N02/N03/N04 | Steam publishes 51 achievements for the bundled game. Inspected acquisition-relevant predicates include all Lucky Emblems, Treasures, ingredient types, Excellent cuisine types, all Classic Kingdom high scores, one fully powered Keyblade, Ultima synthesis, 20 unique Gummi treasures and all constellations. DLC predicates include Re Mind clear, data victories and Premium Menu merits. Hidden descriptions are blank on the public Steam page. [Steam achievements](https://steamcommunity.com/stats/2552450/achievements/). |
| `ai_docs/games/kh3/editions-and-dlc.md:79` | 031/032; 032; P01/P02/P03; H01/N01/N02/N03/N04 | Keep `achievement_set_id` and platform-scoped predicates. PS trophies, Xbox achievements and Epic coverage were not fully read back; their counts must not be inferred from Steam’s 51. New native 2026 sets are announced/unverified. Story, level-99 and combat counters can remain achievement goals without being added to world collection percentages. |
| `ai_docs/games/kh3/editions-and-dlc.md:81` | 001/004; 010/011; 012/014; 013; 028; 035; H01/N01/N02/N03/N04 | Required cases: 80/90 emblems satisfies the Orichalcum+ event but not Hidden Kings; one level-10 Keyblade may satisfy Blademaster while the all-Keyblade-upgrades goal remains incomplete; base chest completion remains 245/245 when nine Re Mind chests are missing; a Yozora loss/alternate ending is not victory or its equipment reward. |
| `ai_docs/games/kh3/gummi-and-optional.md:3` | Context / scope | Research date: 2026-09-18. [Index](README.md). |
| `ai_docs/games/kh3/gummi-and-optional.md:7` | 001/004; 010/011; 012/014; 013; 023; H01/N01/N02/N03/N04 | There are 15 gate identities, numbered 0–14. Gate 0 is available during the Keyblade Graveyard visit; gates 1–14 open after the ending. Gates 1–13 grant the corresponding Secret Report. Gate 14 is Dark Inferno and awards Crystal Regalia. Gate 0 has no report. First-clear state, repeated farming and equipment/report acquisition must be modeled separately. [Battlegate](https://www.khwiki.com/Battlegate). |
| `ai_docs/games/kh3/gummi-and-optional.md:9` | 010/011; 013; 023; H01/N01/N02/N03/N04 | \| Gate \| World / area \| First-clear equipment/material, besides report \| |
| `ai_docs/games/kh3/gummi-and-optional.md:11` | 012/014; 023 | \| 0 \| Keyblade Graveyard / Skein of Severance \| No report \| |
| `ai_docs/games/kh3/gummi-and-optional.md:12` | Context / scope | \| 1 \| Olympus / Courtyard \| Fire Cufflink \| |
| `ai_docs/games/kh3/gummi-and-optional.md:13` | Context / scope | \| 2 \| Olympus / Apex \| Cosmic Belt+ \| |
| `ai_docs/games/kh3/gummi-and-optional.md:14` | Context / scope | \| 3 \| Twilight Town / Old Mansion \| Evanescent Crystal \| |
| `ai_docs/games/kh3/gummi-and-optional.md:15` | Context / scope | \| 4 \| Toy Box / Kid Korral \| Megalixir \| |
| `ai_docs/games/kh3/gummi-and-optional.md:16` | Context / scope | \| 5 \| Toy Box / Main Floor 1F \| Thunder Cufflink \| |
| `ai_docs/games/kh3/gummi-and-optional.md:17` | Context / scope | \| 6 \| Corona / Wetlands \| Illusory Crystal \| |
| `ai_docs/games/kh3/gummi-and-optional.md:18` | Context / scope | \| 7 \| Corona / Hills \| Aero Cufflink \| |
| `ai_docs/games/kh3/gummi-and-optional.md:19` | Context / scope | \| 8 \| Monstropolis / Tank Yard \| Illusory Crystal \| |
| `ai_docs/games/kh3/gummi-and-optional.md:20` | Context / scope | \| 9 \| Arendelle / Middle Tier \| Evanescent Crystal \| |
| `ai_docs/games/kh3/gummi-and-optional.md:21` | Context / scope | \| 10 \| Caribbean / Huddled Isles \| Water Cufflink \| |
| `ai_docs/games/kh3/gummi-and-optional.md:22` | Context / scope | \| 11 \| San Fransokyo / North District \| Yin-Yang Cufflink \| |
| `ai_docs/games/kh3/gummi-and-optional.md:23` | Context / scope | \| 12 \| San Fransokyo / Central District \| Blizzard Cufflink \| |
| `ai_docs/games/kh3/gummi-and-optional.md:24` | 012/014 | \| 13 \| Keyblade Graveyard / Badlands \| Celestriad \| |
| `ai_docs/games/kh3/gummi-and-optional.md:25` | 012/014 | \| 14 \| Keyblade Graveyard / Badlands \| Crystal Regalia \| |
| `ai_docs/games/kh3/gummi-and-optional.md:27` | 001/004; 023; 035; P01/P02/P03; H01/N01/N02/N03/N04 | Reward rows are also present in the corresponding [world gameplay sources](collectible-inventory.md). Reports are collectible rewards, not biography gates. A report index links to its gate requirement; do not count the gate and the report as two world chests. Gate-clear selfie rewards occur at 5, 10 and 14 distinct nonzero gates. [Battlegate](https://www.khwiki.com/Battlegate). |
| `ai_docs/games/kh3/gummi-and-optional.md:31` | 004/034; 032; 035; H01/N01/N02/N03/N04 | Five Golden Herc Figures: two at Overlook (bench opposite save point, giant statue’s shield), two at Gardens (storage-building bench, excavated hole), one at Alleyway (rear scaffolding near the temple). After Olympus, deliver the set to the child in Agora for Hero’s Belt. Count five figures and one derived reward event, not six figures. [Golden Herc Figure](https://www.khwiki.com/Golden_Herc_Figure). |
| `ai_docs/games/kh3/gummi-and-optional.md:33` | 001/004; 005/007; 013; 035; H01/N01/N02/N03/N04 | Forest Clasp’s four Rapunzel activities are explicitly [tracked as a missable equipment route](collectible-inventory.md#acquisition-rules-that-change-the-route). Story reward acquisition links may be shown for weapons and abilities without turning the story into a completion checklist. |
| `ai_docs/games/kh3/gummi-and-optional.md:35` | 001/004; 004/034; 022; 035; H01/N01/N02/N03/N04 | The Final World’s extra Sora-copy HP rewards, Olympus rescue rewards, Caribbean white-crab levels and special ship fleets remain acquisition-relevant research tasks. Their exact quantities, one-time triggers and replayability are not certified here. Do not silently omit them or put them into the base chest denominator. |
| `ai_docs/games/kh3/gummi-and-optional.md:39` | 021; 024/025/026/027; 035; P01/P02/P03 | Each zone needs its own stable battle, treasure, sphere, constellation and blueprint-fragment records. Overworld asteroid resources are repeatable sources, not unique treasures. A battle may supply multiple rank-dependent rewards. The relevant zone tables enumerate **10 Starlight Way battles, 17 Misty Stream battles and 6 Eclipse battles**; these counts describe map battle entries, not the complete Gummi collectible total. |
| `ai_docs/games/kh3/gummi-and-optional.md:41` | 024/025/026/027; 035 | \| Zone \| Constellations and coarse location \| Blueprint-fragment completion reward \| |
| `ai_docs/games/kh3/gummi-and-optional.md:43` | Context / scope | \| Starlight Way \| Cactuar: Corona side, lower right; Bomb: Olympus side; Moogle: upper left between Twilight Town/Toy Box \| Vega \| |
| `ai_docs/games/kh3/gummi-and-optional.md:44` | Context / scope | \| Misty Stream \| Endymion: lower middle between San Fransokyo/Caribbean; Tonberry: upper right near Arendelle; Imp: upper left near Monstropolis \| Sirius \| |
| `ai_docs/games/kh3/gummi-and-optional.md:45` | 012/014 | \| The Eclipse \| Bismarck: lower left; Ultros: upper middle near Keyblade Graveyard; Omega: lower right \| Shooting Star \| |
| `ai_docs/games/kh3/gummi-and-optional.md:47` | 007/026; 024/025/026/027; 029/030; P01/P02/P03; H01/N01/N02/N03/N04 | Sources: [Starlight Way](https://www.khwiki.com/Starlight_Way), [Misty Stream](https://www.khwiki.com/Misty_Stream), [The Eclipse](https://www.khwiki.com/The_Eclipse), [Gummi Missions](https://www.khwiki.com/Gummi_Missions). The nine constellation photographs unlock their associated blueprints. Coarse map positions still need textual flight directions and camera alignment; missing production images do not excuse missing directions. |
| `ai_docs/games/kh3/gummi-and-optional.md:49` | 024/025/026/027 | The global Gummi Missions table spans all zones. Its goal ladders include waypoints 3/6/9, discovered worlds 2/6/9, enemy defeats 500/1,500/3,000/5,000/9,999, distinct special weapons 3/5/7/10/13 and treasure spheres 1/3/5/7/9. All three zone fragment sets and nine constellation missions are separate. The final “Gummi Ship Completionist” row has an opaque description, so its exact predicate is unresolved. [Gummi Missions](https://www.khwiki.com/Gummi_Missions). |
| `ai_docs/games/kh3/gummi-and-optional.md:53` | H01/N01/N02/N03/N04 | \| Encounter \| Access / meaningful requirement \| Acquisition relationship \| |
| `ai_docs/games/kh3/gummi-and-optional.md:55` | 020; 024/025/026/027; 029/030; 031/032 | \| Schwarzgeist \| Misty Stream; ship Speed at least 200 \| Thermosphere achievement; A rank is separately relevant to an EZ merit \| |
| `ai_docs/games/kh3/gummi-and-optional.md:56` | 010/011 | \| Omega Machina \| Eclipse; clear the other five battles first \| One of the seven Orichalcum+ events \| |
| `ai_docs/games/kh3/gummi-and-optional.md:58` | 010/011; 023; 024/025/026/027; P01/P02/P03 | Sources: [Schwarzgeist](https://www.khwiki.com/Schwarzgeist), [Omega Machina](https://www.khwiki.com/Omega_Machina), [Orichalcum](https://www.khwiki.com/Orichalcum). Neither boss is a Re Mind purchase gate. Do not confuse the Omega constellation/blueprint with Omega Machina or Schwarzgeist with a similarly named blueprint. |
| `ai_docs/games/kh3/gummi-and-optional.md:60` | 007/026; 024/025/026/027; 031/032; P01/P02/P03 | Steam’s Salvager target is **20 unique Gummi treasures**. This is a trophy threshold, not evidence that only 20 Gummi treasures exist. Stargazer covers the constellation photographs. [Steam achievements](https://steamcommunity.com/stats/2552450/achievements/). |
| `ai_docs/games/kh3/gummi-and-optional.md:64` | 024/025/026/027; 035 | - Full zone treasure/rank reward lists, nine sphere contents and precise sphere locations. |
| `ai_docs/games/kh3/gummi-and-optional.md:65` | 024/025/026/027; 035; H01/N01/N02/N03/N04 | - Every blueprint fragment, normal/special blueprint, part, special weapon and acquisition alternative; deduplicate shared rewards. |
| `ai_docs/games/kh3/gummi-and-optional.md:66` | 024/025/026/027 | - Complete Gummi mission list and exact final completion predicate. |
| `ai_docs/games/kh3/gummi-and-optional.md:67` | 001/004; 024/025/026/027; H01/N01/N02/N03/N04 | - Gummi editor cost/level/ability constraints only where they support an acquisition route; calculator fixtures must be tested. |
| `ai_docs/games/kh3/gummi-and-optional.md:68` | 001/004; 010/011; 023; 035; H01/N01/N02/N03/N04 | - Gate encounter routes, repeat-clear reward semantics and accessible farming directions; Dark Inferno strategy adequate for acquiring its reward. |
| `ai_docs/games/kh3/gummi-and-optional.md:69` | 024/025/026/027; 029/030; 035 | - Caribbean ship progression/rewards as a separate module from Gummi. |
| `ai_docs/games/kh3/gummi-and-optional.md:71` | P01/P02/P03; H01/N01/N02/N03/N04 | No module above is deferred. These are required data/verification gaps before a release can claim self-contained acquisition guidance. |
| `ai_docs/games/kh3/sources-and-conflicts.md:3` | 029/030; P01/P02/P03; H01/N01/N02/N03/N04 | Research date: 2026-09-18. [Index](README.md). “Inspected” means returned content was read or programmatically bounded and checked as described. It does not mean an in-game test, an official endorsement, or permission to copy guide prose/images. No production screenshots were acquired. |
| `ai_docs/games/kh3/sources-and-conflicts.md:7` | P01/P02/P03; H01/N01/N02/N03/N04 | Repository: `didymusbenson/kh-tools`, branch `mobile-friendly`. The initial recursive tree read was complete (`truncated: false`) at tree commit `1d23c5d3da810285c5fecc11c1926118348025f8`. No `AGENTS.md`, KH3 game implementation or KH3 dataset path appeared. Existing KH3 sources were the scope document and readiness stub, both read in full, alongside `ai_docs/sources/khtables-drive-audit.md`. The tree contains older KHFM CSVs and BBS seed data; their presence is not KH3 coverage. |
| `ai_docs/games/kh3/sources-and-conflicts.md:9` | 001/004; 018; 024/025/026/027; P01/P02/P03 | The supplied KHTABLES inventory contains ten files: four sheets (KHFM, KH2FM, BBS, KH3D/DDD) and six documents already classified as KH2 work by the shared audit. There is **no dedicated KH3 file**. To check ambiguous titles, the following documents were fetched directly through Drive and their full returned text scanned for KH3-specific terms (KH3 excluding KH3D, Kingdom Hearts III, Lucky Emblem, Flantastic, Arendelle, San Fransokyo, Toy Box, Re Mind, Gummiphone): |
| `ai_docs/games/kh3/sources-and-conflicts.md:11` | P01/P02/P03 | \| Drive document \| Returned coverage \| Result \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:13` | 013; H01/N01/N02/N03/N04 | \| [Untitled document](https://docs.google.com/document/d/1YuSnSRKxt3GJ-Vs-cq72JjapDApMc2wd_VoE_nRVG2I/edit) \| 240,256 characters; 1,905 lines \| No KH3 markers; KH2FM Mushroom XIII/puzzles/equipment data \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:14` | 029/030 | \| [kh create tables](https://docs.google.com/document/d/1l6nJG8HNlWQR6aMObO5O6Ygc0DnbrEzK5ZWGVZ5SRk8/edit) \| 12,200 characters; 313 lines \| No KH3 markers; KH2-style puzzle/limit/weapon schema and TODOs \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:15` | 010/011 | \| [KHDB SETUP SQL SCRIPT](https://docs.google.com/document/d/1u9TXxWL-3heKoh7Uf50BqL0BsUEtaLuHsKfZbmRSUdw/edit) \| 214,477 characters; 1,703 lines \| No KH3 markers; KH2FM material/enemy/puzzle/weapon data \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:17` | 010/011; 021; 029/030; P01/P02/P03 | Total scanned ambiguous-document coverage: 466,933 characters. These are legacy-source observations, not KH3 gameplay evidence. No useful KH3 records were identified. This agent did **not** re-read every cell in the other games’ four spreadsheets or all three explicitly KH2-named documents; absence of a dedicated/reusable KH3 source is the supported conclusion, not a proof that no incidental KH3 phrase can exist anywhere in Drive. KH3D names Dream Drop Distance and must not be misclassified as KH3. |
| `ai_docs/games/kh3/sources-and-conflicts.md:21` | P01/P02/P03; H01/N01/N02/N03/N04 | \| Source \| Inspected scope \| What it supports \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:23` | 028; 029/030; 032; H01/N01/N02/N03/N04 | \| [Square Enix Re Mind](https://www.jp.square-enix.com/kingdom/kh3/dlc/index.html) \| Product metadata, platform/date fields, DLC feature descriptions/image alt text, purchase prerequisites \| PS4/Xbox DLC dates, paid expansion, 13 Limitcut bosses, creative/Premium features \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:24` | 029/030; 031/032 | \| [Steam KH3 product](https://store.steampowered.com/app/2552450/KINGDOM_HEARTS_III__Re_Mind_DLC/) \| Release date, About, feature count \| Steam 2024-06-13 release, bundled Re Mind, Dead of Night, 51 achievements \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:25` | 031/032; P01/P02/P03 | \| [Steam achievement list](https://steamcommunity.com/stats/2552450/achievements/) \| Full public list returned; visible descriptions inspected \| Published visible predicates; hidden descriptions remain blank \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:26` | 029/030; 032 | \| [Square Enix Collection](https://www.jp.square-enix.com/kingdom/collection/) \| 2026 product/date/platform sections and KH3 bonuses \| **Announced**, not shipped, 2026-10-08 native releases; Long Night/Midnight Blue/Phantom Green bonuses \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:27` | 004/034; 032 | \| [Square Enix cloud notice](https://support.jp.square-enix.com/news.php?drt=1781017200&id=19066&la=0&n=2&tag=ab4073e28135a1345b861beefd8b6a2c459e1ed4) \| Full notice, dated 2026-06-10 JST \| Sales end, service end, affected packages and stated save-transfer support \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:29` | 001/004; 004/034; 029/030; 031/032; 032; H01/N01/N02/N03/N04 | The upcoming-build announcements do not establish unchanged chest numbering, achievement sets, performance, or save behavior. Regional product details still need target-store confirmation. |
| `ai_docs/games/kh3/sources-and-conflicts.md:33` | 001/004; P01/P02/P03; H01/N01/N02/N03/N04 | All table rows in the following numbered chest/emblem sections were extracted and inspected for number, contents and area. Consecutive numbering and count sums were checked. Notes were sampled for important acquisition conditions; they were not treated as complete text routes. Other-game sections on shared world pages were excluded. |
| `ai_docs/games/kh3/sources-and-conflicts.md:35` | 001/004; P01/P02/P03 | \| KHWiki page \| Numbered rows inspected \| Additional coverage \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:37` | 001/004; 015/H02; 035; P01/P02/P03 | \| [Olympus](https://www.khwiki.com/Game:Olympus) \| Chests 1–32; emblems 1–12 \| Rewards inspected; ingredient/source layout sampled \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:38` | 001/004; 015/H02; 035; P01/P02/P03 | \| [Twilight Town](https://www.khwiki.com/Game:Twilight_Town) \| Chests 1–10; emblems 1–9 \| KH3 rewards inspected; shop/ingredient structure sampled \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:39` | 001/004; 035; P01/P02/P03 | \| [Toy Box](https://www.khwiki.com/Game:Toy_Box) \| Chests 1–29; emblems 1–11 \| Rewards inspected; Gigas/emblem exception \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:40` | 001/004; 005/007; 015/H02; 035; P01/P02/P03 | \| [Corona](https://www.khwiki.com/Game:Kingdom_of_Corona) \| Chests 1–28; emblems 1–9 \| Rapunzel reward condition inspected; ingredients sampled \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:41` | 001/004; 015/H02; 035; P01/P02/P03 | \| [Monstropolis](https://www.khwiki.com/Game:Monstropolis) \| Chests 1–22; emblems 1–11 \| Revisit exceptions/rewards inspected; ingredients sampled \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:42` | 001/004; 015/H02; 035; P01/P02/P03 | \| [Arendelle](https://www.khwiki.com/Game:Arendelle) \| Chests 1–25; emblems 1–11 \| Rewards/ingredient table structure inspected \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:43` | 001/004; 015/H02; 035; P01/P02/P03 | \| [Caribbean](https://www.khwiki.com/Game:The_Caribbean) \| Chests 1–56; emblems 1–13 \| Rewards inspected; 106 ingredient-source rows not individually validated \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:44` | 001/004; 035; P01/P02/P03 | \| [San Fransokyo](https://www.khwiki.com/Game:San_Fransokyo) \| Chests 1–36; emblems 1–11 \| Night access; reward table inspected \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:45` | 001/004; 015/H02; 020; 035; P01/P02/P03 | \| [100 Acre Wood](https://www.khwiki.com/Game:100_Acre_Wood) \| Emblems 1–3; no KH3 chest table \| KH3 rewards/three ingredient activity rows inspected structurally \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:46` | 001/004; 012/014; 035; P01/P02/P03 | \| [Keyblade Graveyard](https://www.khwiki.com/Game:Keyblade_Graveyard) \| KH3 chests 1–6 \| Rewards and Re Mind bonus levels inspected \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:47` | 001/004; 028; 035; P01/P02/P03 | \| [The Final World](https://www.khwiki.com/Game:The_Final_World) \| KH3 chest 1 \| Re Mind Yozora reward inspected \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:48` | 001/004 | \| [Scala ad Caelum](https://www.khwiki.com/Game:Scala_ad_Caelum) \| Re Mind chests 1–9 \| Notes all empty; detailed routes absent \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:52` | P01/P02/P03 | \| Source \| Inspected content / limit \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:54` | 001/004; 035 | \| [Lucky Emblem](https://www.khwiki.com/Lucky_Emblem) \| All world counts/numbered table sections and reward thresholds; used to compare selected world rows \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:55` | 019; H01/N01/N02/N03/N04 | \| [Classic Kingdom](https://www.khwiki.com/Classic_Kingdom) \| All 23 KH3 acquisition identities; Union χ section explicitly excluded from KH3 requirements \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:56` | 007/026; 035 | \| [Photo Missions](https://www.khwiki.com/Photo_Missions) \| All 20 subject/reward/unlock rows and footnotes \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:57` | 007/026; 008/009/H02; 010/011; 012/014 | \| [Synthesis](https://www.khwiki.com/Synthesis) \| KH3 24 material-type unlock rows, 20 photo rows, forge-start levels and shared-stock description; not all item recipes \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:58` | Context / scope | \| [Kingdom Key](https://www.khwiki.com/Kingdom_Key) \| KH3 stats and all ten upgrade transitions, summed independently \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:59` | 008/009/H02; 012/014 | \| [Ultima Weapon](https://www.khwiki.com/Ultima_Weapon) \| KH3 recipe/unlock, forge values; other games excluded \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:60` | 001/004; 010/011; 035 | \| [Orichalcum](https://www.khwiki.com/Orichalcum) \| KH3 drops/chests/rewards/postcard route; all seven Orichalcum+ events accounted for \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:61` | 010/011 | \| [Wellspring](https://www.khwiki.com/Wellspring) \| KH3 drop rows; sample farm relationships, no exhaustive efficiency comparison \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:62` | 035; H01/N01/N02/N03/N04 | \| [Illusory](https://www.khwiki.com/Illusory), [Evanescent](https://www.khwiki.com/Evanescent), [Fluorite](https://www.khwiki.com/Fluorite) \| Acquisition/rate/reward rules; base versus first-clear distinction \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:63` | 001/004; 008/009/H02; 015/H02; P01/P02/P03 | \| [Ingredients](https://www.khwiki.com/Ingredients) \| All 59 ingredient names; source/recipe columns inspected as a table, not every source route verified \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:64` | 008/009/H02; 015/H02; 016/017/H02; 020; 035 | \| [Le Grand Bistrot](https://www.khwiki.com/Le_Grand_Bistrot) \| Four cooking minigames, star thresholds, 28 dishes/ingredient lists; complete recipe-edge transcription still open \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:65` | 016/017/H02; H01/N01/N02/N03/N04 | \| [Cuisine](https://www.khwiki.com/Cuisine) \| Dish/plus variants and stat-table structure; full bonus/duration model not certified \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:66` | 015/H02; 018; 035 | \| [Flantastic Seven](https://www.khwiki.com/Flantastic_Seven) \| All seven locations, upper reward scores, ingredients and abilities \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:67` | 006; 035 | \| [Frozen Slider](https://www.khwiki.com/Frozen_Slider), [Festival Dance](https://www.khwiki.com/Festival_Dance), [Flash Tracer](https://www.khwiki.com/Flash_Tracer), [Verum Rex](https://www.khwiki.com/Verum_Rex:_Beat_of_Lead) \| Access, rank thresholds, reward sections; strategy completeness not certified \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:68` | 013; 023; 035; H01/N01/N02/N03/N04 | \| [Battlegate](https://www.khwiki.com/Battlegate) \| All 15 gate identities, report/equipment rewards and selfie thresholds \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:69` | 005/007; H01/N01/N02/N03/N04 | \| [Golden Herc Figure](https://www.khwiki.com/Golden_Herc_Figure), [Forest Clasp](https://www.khwiki.com/Forest_Clasp) \| Full acquisition/location conditions \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:70` | 024/025/026/027; 035; P01/P02/P03 | \| [Starlight Way](https://www.khwiki.com/Starlight_Way), [Misty Stream](https://www.khwiki.com/Misty_Stream), [The Eclipse](https://www.khwiki.com/The_Eclipse) \| Map battle/constellation tables; resource rates; treasure/sphere/reward sections located, not completely normalized \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:71` | 024/025/026/027 | \| [Gummi Missions](https://www.khwiki.com/Gummi_Missions) \| Full returned KH3 table scanned for global goals/constellations; final completion predicate opaque \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:72` | H01/N01/N02/N03/N04 | \| [Schwarzgeist](https://www.khwiki.com/Schwarzgeist), [Omega Machina](https://www.khwiki.com/Omega_Machina) \| Access conditions; no combat testing \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:73` | 035; H01/N01/N02/N03/N04 | \| [Re Mind](https://www.khwiki.com/Kingdom_Hearts_III_Re_Mind), [Recreated Data](https://www.khwiki.com/Real_Organization_XIII%27s_Recreated_Data) \| Episode/features and all thirteen boss rewards/locks; narrative content not imported \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:74` | 029/030 | \| [Premium Menu](https://www.khwiki.com/Premium_Menu) \| Unlocks, code/merit sections, boss points and rank table; uncertainty preserved \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:75` | 012/014; 029/030; 032; H01/N01/N02/N03/N04 | \| [Proof](https://www.khwiki.com/Proof), [KH3 patch history](https://www.khwiki.com/Kingdom_Hearts_III#Patch_update_data) \| Proof/Keyblade conditions, selected free updates; latest installed builds not audited \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:76` | 032; P01/P02/P03 | \| [Long Night](https://www.khwiki.com/Long_Night), [Integrum Masterpiece](https://www.khwiki.com/Kingdom_Hearts_Integrum_Masterpiece) \| Leads only; future edition and cloud claims followed to primary Square Enix sources \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:78` | P01/P02/P03 | No generic KHWiki link is an assertion of primary evidence. Published rates/thresholds are community facts awaiting game verification where consequential. |
| `ai_docs/games/kh3/sources-and-conflicts.md:82` | P01/P02/P03; H01/N01/N02/N03/N04 | \| ID \| Evidence \| Required treatment \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:84` | 008/009/H02; 033; H01/N01/N02/N03/N04 | \| KH3-C01 \| Synthesis says no crafted-item markers; KH3 v1.04 history says checkmarks added \| Treat old statement as stale; confirm modern UI and cite version \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:85` | 001/004; 003; P01/P02/P03 | \| KH3-C02 \| Toy Box emblem 8 listed as 2F on Lucky Emblem page, 3F on world table \| Verify standing point versus target location; retain UFO landmark, do not silently select one floor \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:86` | 005/007; H01/N01/N02/N03/N04 | \| KH3-C03 \| Forest Clasp item page says before first Shore; world page says before Rapunzel leaves party \| Use conservative pre-Shore notice; exact missability trigger requires testing \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:87` | 020; 029/030; P01/P02/P03 | \| KH3-C04 \| Premium Menu rank-B value marked uncertain \| Do not publish a certified full rank calculator; A rank and rounding/repeat-score behavior need verification \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:88` | 018; H01/N01/N02/N03/N04 | \| KH3-C05 \| Flan tables use `>`; many user expectations use “at least” \| Exact-equality fixture required for all seven upper thresholds \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:89` | 008/009/H02; 016/017/H02; 020; 023; 029/030; P01/P02/P03 | \| KH3-C06 \| Synthesis mentions five cooking minigames; Le Grand Bistrot describes four \| Do not propagate five; use four provisionally and verify in-game controls \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:90` | 002; P01/P02/P03; H01/N01/N02/N03/N04 | \| KH3-C07 \| Trial/Trail, Horseshoe Isle/Island, Petit/Petite, Bandana/Bandanna differ \| Preserve aliases and source spelling; canonical English UI pass required \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:91` | 004/034; 008/009/H02; 010/011; H01/N01/N02/N03/N04 | \| KH3-C08 \| Ultima upgrade tables include low-level rows although first synthesis starts at 10 \| Tag acquisition mode/New Game+ before computing material cost \| |
| `ai_docs/games/kh3/sources-and-conflicts.md:95` | 001/004; 002; 008/009/H02; 010/011; 012/014; 024/025/026/027; P01/P02/P03; H01/N01/N02/N03/N04 | Broad web searches returned largely irrelevant results and were not used as game evidence. PowerPyx collectible, synthesis-material and Re Mind guide URLs failed via web open. An official NA press link returned 401 and the old NA DLC route returned unrelated site text; the Japanese official DLC page was usable. `Gummi_Missions_(KHIII)`, `Gummi_constellation`, `New_Game_Plus` and the guessed collection title failed; use the successfully inspected main/zone pages instead. `Keyblade_Forge` redirects to Synthesis and `Little_Chef` to Remy; neither redirect supplies an independent source. Do not count redirect aliases as corroboration. |
| `ai_docs/games/kh3/workshop-and-equipment.md:3` | P01/P02/P03; H01/N01/N02/N03/N04 | Research date: 2026-09-18. [Index](README.md). Community evidence unless explicitly labeled otherwise; no in-game testing performed. |
| `ai_docs/games/kh3/workshop-and-equipment.md:7` | 001/004; 007/026; 008/009/H02; 010/011; 012/014; 029/030 | Keep distinct states for material type discovered, current quantity, recipe unlocked, product crafted at least once, product currently owned and Keyblade upgrade level. Synthesis and forging spend the same material stock. A collectible chest can award a material without creating a second chest record. Collector’s Goals and Photo Missions unlock recipes; do not port KH2’s Moogle-level/Energy/Serenity rules. Ultima Weapon unlocks at 58 different material types. The highest forge level is 10, but initial levels differ. [Synthesis](https://www.khwiki.com/Synthesis). |
| `ai_docs/games/kh3/workshop-and-equipment.md:9` | 008/009/H02; 010/011; 012/014; 015/H02; 029/030 | A desired-products planner must expand ingredient edges and reserve stock once across selected synthesis/forge goals. Track discovery independently: spending the final copy does not erase having discovered that material. Never assume that possessing a product proves the user synthesized it. |
| `ai_docs/games/kh3/workshop-and-equipment.md:11` | 008/009/H02; 033; P01/P02/P03; H01/N01/N02/N03/N04 | The Synthesis page’s claim that crafted items have no checkmarks conflicts with the KH3 patch-history description of v1.04. Modern UI verification is required; do not use that old claim in player instructions. [Patch history](https://www.khwiki.com/Kingdom_Hearts_III#Patch_update_data). |
| `ai_docs/games/kh3/workshop-and-equipment.md:15` | 007/026; 008/009/H02; 013; 021; H01/N01/N02/N03/N04 | Each mission is one record, even mission 20’s twelve subjects. Subject child records may store photos/checks, with a derived parent completion. These are recipe unlocks, not an award of the finished equipment. The first ten rows are corroborated by the KH3 Photo Mission table in [Synthesis](https://www.khwiki.com/Synthesis); rows 11–20 and special conditions use [Photo Missions](https://www.khwiki.com/Photo_Missions). |
| `ai_docs/games/kh3/workshop-and-equipment.md:17` | 008/009/H02 | \| No. \| Subject \| Recipe unlocked \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:19` | Context / scope | \| 1 \| Flame Core \| Firefighter Rosette \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:20` | Context / scope | \| 2 \| Water Core \| Umbrella Rosette \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:21` | Context / scope | \| 3 \| Chief Puff \| Mask Rosette \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:22` | Context / scope | \| 4 \| Hercules statue \| Cosmic Ring \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:23` | Context / scope | \| 5 \| Beasts & Bugs display \| Soldier’s Earring \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:24` | 005/007 | \| 6 \| Rapunzel’s tower \| Mage’s Earring \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:25` | Context / scope | \| 7 \| Festival \| Moon Amulet \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:26` | 012/014 | \| 8 \| Secluded Forge fire \| Fire Chain \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:27` | Context / scope | \| 9 \| Zeus \| Thunder Chain \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:28` | Context / scope | \| 10 \| Tram \| Draw Ring \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:29` | Context / scope | \| 11 \| CDA agent \| Insulator Rosette \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:30` | Context / scope | \| 12 \| Ice palace \| Blizzard Chain \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:31` | Context / scope | \| 13 \| Olaf \| Snowman Rosette \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:32` | Context / scope | \| 14 \| Green cactuar \| Fencer’s Earring \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:33` | Context / scope | \| 15 \| Scarecrow \| Slayer’s Earring \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:34` | Context / scope | \| 16 \| Evening star \| Star Charm \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:35` | Context / scope | \| 17 \| Fish-shaped windsocks \| Aero Armlet \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:36` | Context / scope | \| 18 \| Port Royal waterfall \| Aqua Chaplet \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:37` | Context / scope | \| 19 \| Demon Tower \| Dark Chain \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:38` | 002 | \| 20 \| Twelve teammates \| Petite Ribbon \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:40` | 005/007; 007/026; 023; P01/P02/P03; H01/N01/N02/N03/N04 | The evening-star photo requires night; windsocks require daytime. Zeus’s Cliff Ascent statue is an accepted alternative. Rapunzel can still satisfy mission 20 after she leaves the party, so this photo objective must not inherit Forest Clasp’s missability warning. Demon Tower is available in Battlegate 8. Precise camera positions and every unlock milestone remain to be authored and verified. [Photo Missions](https://www.khwiki.com/Photo_Missions), [Battlegate](https://www.khwiki.com/Battlegate). |
| `ai_docs/games/kh3/workshop-and-equipment.md:44` | 004/034; 008/009/H02; 010/011; 012/014; H01/N01/N02/N03/N04 | Recipe: **7 Orichalcum+ + 2 Wellspring Crystals + 2 Lucid Crystals + 2 Pulsing Crystals**, unlocked by discovering 58 material types. Its normal first synthesis grants a level-10 Keyblade. Store an acquired/crafted distinction and a separate New Game+ import state; never charge the level-0 upgrade ladder to a freshly synthesized level-10 weapon. [Ultima Weapon](https://www.khwiki.com/Ultima_Weapon), [Synthesis](https://www.khwiki.com/Synthesis). |
| `ai_docs/games/kh3/workshop-and-equipment.md:46` | 010/011; H01/N01/N02/N03/N04 | The seven Orichalcum+ acquisition events are one unit each: |
| `ai_docs/games/kh3/workshop-and-equipment.md:48` | H01/N01/N02/N03/N04 | \| Event \| Exact scope / link \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:50` | 001/004 | \| Caribbean chest \| Exile Island, chest 12 \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:51` | 001/004 | \| Final World chest \| Return visit, chest 1 \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:52` | 001/004; 007/026 | \| Lucky Emblems \| Photograph 80 \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:53` | 018; 035 | \| Flantastic Seven \| Meet the high reward threshold in all seven games \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:54` | 006 | \| Frozen Slider \| Collect all ten special prizes \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:55` | 024/025/026/027 | \| Omega Machina \| Defeat the Gummi boss \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:56` | 035 | \| Prize Postcard \| Random reward from mailing postcards \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:58` | 001/004; 010/011 | These are distinct from ordinary Orichalcum, which can drop from Eclipse asteroids. No repeatable guaranteed Orichalcum+ farming route is established. The planner must expose the postcard randomness and the remaining unique events, not suggest killing an enemy for more Orichalcum+. [Orichalcum](https://www.khwiki.com/Orichalcum). |
| `ai_docs/games/kh3/workshop-and-equipment.md:60` | 001/004; 010/011 | Validation examples: four completed Orichalcum+ events imply three remaining events; 80 emblems unlock this material goal but leave ten of the 90-emblem collection unfinished; a found chest updates its Orichalcum+ dependency without counting a second world chest. |
| `ai_docs/games/kh3/workshop-and-equipment.md:64` | 010/011; P01/P02/P03 | \| Material \| Inspected source \| Planning implication \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:66` | 001/004; 010/011; 023 | \| Wellspring Crystal \| High Soldier 12%; Helmed Body 4%; Anchor Raider 8% \| Battlegate 12 contains High Soldiers; link repeatable route and drop record \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:67` | 010/011; 023; 035 | \| Illusory Crystal \| Demon Tower 10%, specifically Battlegate 8; first-clear rewards at gates 6 and 8 \| Separate repeatable drop from one-time gate reward \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:68` | 001/004; 023; 035 | \| Evanescent Crystal \| Berserker 9%; first-clear rewards at gates 3 and 9 \| Gate 9 supplies a repeatable Berserker route \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:69` | 010/011 | \| Fluorite \| Starlight Way rocks 2.5%; shop price 500 after Toy Box + Corona \| Show buy/farm alternatives with access conditions \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:70` | 010/011; 024/025/026/027; P01/P02/P03 | \| Electrum \| Eclipse blue rocks 1% \| Keep Gummi-source results visible in material search \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:72` | 010/011; P01/P02/P03 | Sources: [Wellspring](https://www.khwiki.com/Wellspring), [Illusory](https://www.khwiki.com/Illusory), [Evanescent](https://www.khwiki.com/Evanescent), [Fluorite](https://www.khwiki.com/Fluorite), [The Eclipse](https://www.khwiki.com/The_Eclipse). These are published community base rates; this audit does not certify Lucky Strike stacking, encounter-time efficiency or a universal best farm. |
| `ai_docs/games/kh3/workshop-and-equipment.md:76` | 012/014; 029/030; 032; H01/N01/N02/N03/N04 | A checked Kingdom Key upgrade schedule provides a nontrivial fixture before building the full forge catalogue. [Kingdom Key, KH3](https://www.khwiki.com/Kingdom_Key). |
| `ai_docs/games/kh3/workshop-and-equipment.md:78` | 010/011 | \| Target level \| Ore \| Wellspring material \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:80` | Context / scope | \| 1 \| Fluorite ×1 \| Shard ×2 \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:81` | Context / scope | \| 2 \| Fluorite ×1 \| Shard ×3 \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:82` | Context / scope | \| 3 \| Fluorite ×1 \| Shard ×4 \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:83` | Context / scope | \| 4 \| Damascus ×1 \| Stone ×1 \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:84` | Context / scope | \| 5 \| Damascus ×1 \| Stone ×2 \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:85` | Context / scope | \| 6 \| Damascus ×1 \| Stone ×3 \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:86` | Context / scope | \| 7 \| Adamantite ×1 \| Gem ×1 \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:87` | Context / scope | \| 8 \| Adamantite ×1 \| Gem ×2 \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:88` | Context / scope | \| 9 \| Adamantite ×1 \| Gem ×3 \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:89` | Context / scope | \| 10 \| Electrum ×1 \| Crystal ×1 \| |
| `ai_docs/games/kh3/workshop-and-equipment.md:91` | 010/011; 023 | Calculated level 0→10 totals: Fluorite 3, Damascus 3, Adamantite 3, Electrum 1, Wellspring Shards 9, Stones 6, Gems 6, Crystal 1. Level 3→6 needs Damascus 3 and Wellspring Stones 6. At level 10 its STR/MAG are 9/8. These totals are derived from the ten rows, not copied from a material aggregate. |
| `ai_docs/games/kh3/workshop-and-equipment.md:93` | 012/014; 013; 029/030; H01/N01/N02/N03/N04 | Each production Keyblade needs acquisition, initial level, all level transitions, stats/abilities, formchanges and shotlocks. Keyblade state is Sora-specific; Donald staves, Goofy shields and temporary playable characters need distinct equipment applicability. Do not make Riku/Aqua/Roxas/Kairi copies of Sora’s forge checklist. |
| `ai_docs/games/kh3/workshop-and-equipment.md:95` | 001/004; 012/014; 013; 016/017/H02; 020; 021; 032; H01/N01/N02/N03/N04 | Base acquisition anchors include Hero’s Origin (Olympus), Shooting Star (Twilight Town), Favorite Deputy (Toy Box), Ever After (Corona), Happy Gear (Monstropolis), Crystal Snow (Arendelle), Wheel of Fate (Caribbean), Nano Gear (San Fransokyo), Hunny Spout (100 Acre Wood) and Starlight (Keyblade Graveyard). These are recorded in the corresponding [world tables](collectible-inventory.md), alongside chest equipment. Grand Chef and Classic Tone have their own [record dependencies](cuisine-and-records.md); Oathkeeper/Oblivion and platform extras have [edition rules](editions-and-dlc.md). |
| `ai_docs/games/kh3/workshop-and-equipment.md:99` | 008/009/H02; 015/H02 | - Enumerate the complete synthesis output set and every ingredient/quantity edge; independently reconcile the exact modern total before asserting it. |
| `ai_docs/games/kh3/workshop-and-equipment.md:100` | 007/026; 008/009/H02; 010/011; 029/030; P01/P02/P03 | - Extract every Collector’s Goal, recipe unlock, all material families/ranks, shop unlock thresholds and source-rate conditions. This pass inspected the 24 type-count unlock rows and 20 photo rows, not every product recipe. |
| `ai_docs/games/kh3/workshop-and-equipment.md:101` | 004/034; 012/014; 029/030; H01/N01/N02/N03/N04 | - Extract the full Keyblade upgrade catalogue. The Kingdom Key fixture is not representative proof for every blade; Ultima/New Game+ behavior especially needs testing. |
| `ai_docs/games/kh3/workshop-and-equipment.md:102` | 001/004; 013; 035; H01/N01/N02/N03/N04 | - Enumerate all staves, shields, armor and accessories, including every acquisition alternative and Re Mind rewards. Chest identity coverage does not make the entire equipment catalogue ready. |
| `ai_docs/games/kh3/workshop-and-equipment.md:103` | 002; P01/P02/P03; H01/N01/N02/N03/N04 | - Verify aliases (Bandana/Bandanna, Petit/Petite Ribbon, Source’s Strength/Power labels) against modern English UI before assigning canonical names. |
| `ai_docs/games/kingdom-hearts-iii.md:5` | P01/P02/P03; H01/N01/N02/N03/N04 | Research baseline established on 2026-09-18; not implementation-ready. No reusable KH3 KHTABLES data was identified after auditing the inventory and ambiguous legacy documents. See the [research set](kh3/README.md), [source manifest](kh3/sources-and-conflicts.md) and [readiness matrix](../readiness/kingdom-hearts-iii.md). |
| `ai_docs/games/kingdom-hearts-iii.md:9` | 010/011; 013; 015/H02; 029/030; H01/N01/N02/N03/N04 | Provide a Kingdom Hearts III acquisition compendium: where a collectible, ingredient, material or equipment item is and how to obtain it, covering updated base-game content and explicitly separated Re Mind episodes. |
| `ai_docs/games/kingdom-hearts-iii.md:11` | 008/009/H02; 023; 029/030; 031/032; H01/N01/N02/N03/N04 | Apply the accepted [collectible compendium and linked-view contract](../content/collectible-compendium-and-linked-views.md), [synthesis and inventory contract](../content/synthesis-and-inventory.md), and [testing/content-validation contract](../testing-and-content-validation.md). The user plays Steam. The app is openly spoilerific: no spoiler warnings, hiding or reveal controls. Do not track story milestones or offer an Available Now/progress-gate filter; explain necessary prerequisites in the acquisition text. |
| `ai_docs/games/kingdom-hearts-iii.md:13` | 001/004; 004/034; P01/P02/P03; H01/N01/N02/N03/N04 | World percentages count applicable collectibles only, not plot, biographies or ordinary conversations. Compact world marks, expanded detail rows, search and Data Jiminy resolve to one stable record and one saved state. Preserve verified journal order/numbers without making display order the storage key. Filters do not change full denominators. |
| `ai_docs/games/kingdom-hearts-iii.md:15` | 008/009/H02; 015/H02; H01/N01/N02/N03/N04 | Inventory is optional and opt-in. When enabled, show owned/required ingredient quantities as x/y, with tested game-specific synthesis and forging formulas. Inventory and first-crafted history are distinct. Synthesis remains a first-class module. |
| `ai_docs/games/kingdom-hearts-iii.md:17` | 023; 029/030; H01/N01/N02/N03/N04 | React offline PWA, local persistence, bundled SLM/per-game Coppermind, text directions and media support remain MVP. Only missing production screenshot/map images are deferred. Initial functionality testing targets Apple browsers/iPhone/iPad; Android follows. User gameplay or a complete user playthrough is not a release gate. |
| `ai_docs/games/kingdom-hearts-iii.md:23` | 001/004 | - Every treasure chest |
| `ai_docs/games/kingdom-hearts-iii.md:24` | 001/004 | - World, area, precise location, and route |
| `ai_docs/games/kingdom-hearts-iii.md:25` | 029/030; H01/N01/N02/N03/N04 | - Required progression or abilities |
| `ai_docs/games/kingdom-hearts-iii.md:26` | Context / scope | - Maps and area completion totals |
| `ai_docs/games/kingdom-hearts-iii.md:27` | Context / scope | - Missability and revisit availability |
| `ai_docs/games/kingdom-hearts-iii.md:28` | 007/026 | - Photo/location context where useful |
| `ai_docs/games/kingdom-hearts-iii.md:32` | 001/004 | - Every Lucky Emblem |
| `ai_docs/games/kingdom-hearts-iii.md:33` | Context / scope | - World and area |
| `ai_docs/games/kingdom-hearts-iii.md:34` | Context / scope | - Precise visual/location description |
| `ai_docs/games/kingdom-hearts-iii.md:35` | 007/026 | - Suggested camera position |
| `ai_docs/games/kingdom-hearts-iii.md:36` | Context / scope | - Earliest availability |
| `ai_docs/games/kingdom-hearts-iii.md:37` | 035 | - Reward thresholds |
| `ai_docs/games/kingdom-hearts-iii.md:38` | 029/030 | - Progress tracking and world totals |
| `ai_docs/games/kingdom-hearts-iii.md:42` | 008/009/H02 | - Every synthesis recipe |
| `ai_docs/games/kingdom-hearts-iii.md:43` | Context / scope | - Unlock conditions |
| `ai_docs/games/kingdom-hearts-iii.md:44` | 015/H02 | - Ingredients and quantities |
| `ai_docs/games/kingdom-hearts-iii.md:45` | 010/011; P01/P02/P03; H01/N01/N02/N03/N04 | - Material acquisition sources |
| `ai_docs/games/kingdom-hearts-iii.md:46` | 010/011 | - Enemy drop rates and locations |
| `ai_docs/games/kingdom-hearts-iii.md:47` | 023; P01/P02/P03 | - Battlegate or special sources |
| `ai_docs/games/kingdom-hearts-iii.md:48` | H01/N01/N02/N03/N04 | - Computed totals and remaining requirements |
| `ai_docs/games/kingdom-hearts-iii.md:49` | Context / scope | - Ultima Weapon path |
| `ai_docs/games/kingdom-hearts-iii.md:50` | Context / scope | - Workshop Collector's Goals and related milestones |
| `ai_docs/games/kingdom-hearts-iii.md:54` | 012/014; H01/N01/N02/N03/N04 | - Every Keyblade and acquisition method |
| `ai_docs/games/kingdom-hearts-iii.md:55` | Context / scope | - Stats and abilities |
| `ai_docs/games/kingdom-hearts-iii.md:56` | 012/014 | - Formchanges |
| `ai_docs/games/kingdom-hearts-iii.md:57` | 010/011; H01/N01/N02/N03/N04 | - upgrades and required materials |
| `ai_docs/games/kingdom-hearts-iii.md:58` | 013 | - armor and accessories |
| `ai_docs/games/kingdom-hearts-iii.md:59` | 013; H01/N01/N02/N03/N04 | - character equipment |
| `ai_docs/games/kingdom-hearts-iii.md:60` | 035; P01/P02/P03 | - item sources and special rewards |
| `ai_docs/games/kingdom-hearts-iii.md:64` | 015/H02 | - Every ingredient |
| `ai_docs/games/kingdom-hearts-iii.md:65` | 010/011; P01/P02/P03; H01/N01/N02/N03/N04 | - acquisition sources and farming locations |
| `ai_docs/games/kingdom-hearts-iii.md:66` | 008/009/H02 | - every recipe |
| `ai_docs/games/kingdom-hearts-iii.md:67` | Context / scope | - Little Chef ranks/results |
| `ai_docs/games/kingdom-hearts-iii.md:68` | Context / scope | - bonuses and full-course effects |
| `ai_docs/games/kingdom-hearts-iii.md:69` | 015/H02; 018; 035 | - Flantastic Seven ingredient/reward relationships |
| `ai_docs/games/kingdom-hearts-iii.md:70` | 016/017/H02; H01/N01/N02/N03/N04 | - cooking completion requirements |
| `ai_docs/games/kingdom-hearts-iii.md:74` | 021 | - Adversaries |
| `ai_docs/games/kingdom-hearts-iii.md:75` | Context / scope | - Treasures |
| `ai_docs/games/kingdom-hearts-iii.md:76` | 001/004 | - Lucky Emblems |
| `ai_docs/games/kingdom-hearts-iii.md:77` | 019 | - Classic Kingdom games |
| `ai_docs/games/kingdom-hearts-iii.md:78` | 021 | - Game Records |
| `ai_docs/games/kingdom-hearts-iii.md:79` | 023; H01/N01/N02/N03/N04 | - Character files and glossary as reference/search context, without narrative completion gates |
| `ai_docs/games/kingdom-hearts-iii.md:80` | 023 | - Secret Reports |
| `ai_docs/games/kingdom-hearts-iii.md:81` | 007/026 | - Photo Missions |
| `ai_docs/games/kingdom-hearts-iii.md:82` | 008/009/H02; 021 | - synthesis records |
| `ai_docs/games/kingdom-hearts-iii.md:83` | H01/N01/N02/N03/N04 | - category collection counts and exact goal predicates, separate from narrative Journal state |
| `ai_docs/games/kingdom-hearts-iii.md:87` | 018 | - Flantastic Seven |
| `ai_docs/games/kingdom-hearts-iii.md:88` | 019 | - Classic Kingdom |
| `ai_docs/games/kingdom-hearts-iii.md:89` | Context / scope | - Verum Rex: Beat of Lead |
| `ai_docs/games/kingdom-hearts-iii.md:90` | Context / scope | - Festival Dance |
| `ai_docs/games/kingdom-hearts-iii.md:91` | 006 | - Frozen Slider and treasures |
| `ai_docs/games/kingdom-hearts-iii.md:92` | Context / scope | - Flash Tracer |
| `ai_docs/games/kingdom-hearts-iii.md:93` | Context / scope | - Hundred Acre Wood |
| `ai_docs/games/kingdom-hearts-iii.md:94` | Context / scope | - optional world-specific challenges |
| `ai_docs/games/kingdom-hearts-iii.md:95` | 035 | - score thresholds, rewards, and strategies |
| `ai_docs/games/kingdom-hearts-iii.md:99` | 023 | - Battlegates |
| `ai_docs/games/kingdom-hearts-iii.md:100` | Context / scope | - Dark Inferno |
| `ai_docs/games/kingdom-hearts-iii.md:101` | Context / scope | - optional and secret bosses |
| `ai_docs/games/kingdom-hearts-iii.md:102` | 010/011 | - EXP and material farming |
| `ai_docs/games/kingdom-hearts-iii.md:103` | 029/030 | - challenge/Pro Code interactions where relevant |
| `ai_docs/games/kingdom-hearts-iii.md:104` | Context / scope | - Critical Mode considerations |
| `ai_docs/games/kingdom-hearts-iii.md:108` | 001/004 | - Routes and zones |
| `ai_docs/games/kingdom-hearts-iii.md:109` | 024/025/026/027 | - treasures and blueprints |
| `ai_docs/games/kingdom-hearts-iii.md:110` | 007/026; 024/025/026/027 | - constellation photographs and their blueprints |
| `ai_docs/games/kingdom-hearts-iii.md:111` | 035 | - missions, ranks, and rewards |
| `ai_docs/games/kingdom-hearts-iii.md:112` | Context / scope | - ship parts and customization |
| `ai_docs/games/kingdom-hearts-iii.md:113` | Context / scope | - optional bosses |
| `ai_docs/games/kingdom-hearts-iii.md:114` | H01/N01/N02/N03/N04 | - completion requirements |
| `ai_docs/games/kingdom-hearts-iii.md:118` | 029/030 | Keep add-on progress distinct from base-game completion: |
| `ai_docs/games/kingdom-hearts-iii.md:120` | Context / scope | - Re Mind scenario |
| `ai_docs/games/kingdom-hearts-iii.md:121` | 028 | - Limitcut Episode |
| `ai_docs/games/kingdom-hearts-iii.md:122` | 028 | - Secret Episode |
| `ai_docs/games/kingdom-hearts-iii.md:123` | Context / scope | - Data Organization XIII |
| `ai_docs/games/kingdom-hearts-iii.md:124` | Context / scope | - secret boss |
| `ai_docs/games/kingdom-hearts-iii.md:125` | 028 | - Data Greeting |
| `ai_docs/games/kingdom-hearts-iii.md:126` | 029/030 | - Premium Menu: EZ Codes and PRO Codes |
| `ai_docs/games/kingdom-hearts-iii.md:127` | 029/030; H01/N01/N02/N03/N04 | - merit/challenge requirements |
| `ai_docs/games/kingdom-hearts-iii.md:128` | 031/032 | - add-on-specific trophies/achievements |
| `ai_docs/games/kingdom-hearts-iii.md:129` | 004/034; H01/N01/N02/N03/N04 | - save-data and unlock prerequisites |
| `ai_docs/games/kingdom-hearts-iii.md:133` | 031/032; 032 | - Trophy/achievement sets by platform |
| `ai_docs/games/kingdom-hearts-iii.md:134` | Context / scope | - Base game versus add-on grouping |
| `ai_docs/games/kingdom-hearts-iii.md:135` | 021; H01/N01/N02/N03/N04 | - Requirements mapped to in-game completion records |
| `ai_docs/games/kingdom-hearts-iii.md:136` | 032 | - Platform/release differences |
| `ai_docs/games/kingdom-hearts-iii.md:140` | 001/004 | - `lucky_emblem` |
| `ai_docs/games/kingdom-hearts-iii.md:141` | 012/014 | - `keyblade_upgrade_level` |
| `ai_docs/games/kingdom-hearts-iii.md:142` | 012/014 | - `formchange` |
| `ai_docs/games/kingdom-hearts-iii.md:143` | 008/009/H02; 015/H02; 016/017/H02 | - `ingredient` and `cooking_recipe` |
| `ai_docs/games/kingdom-hearts-iii.md:144` | 016/017/H02 | - `cooking_result` |
| `ai_docs/games/kingdom-hearts-iii.md:145` | 007/026 | - `photo_mission` |
| `ai_docs/games/kingdom-hearts-iii.md:146` | Context / scope | - `game_record` |
| `ai_docs/games/kingdom-hearts-iii.md:147` | Context / scope | - `classic_kingdom_game` |
| `ai_docs/games/kingdom-hearts-iii.md:148` | 023 | - `battlegate` |
| `ai_docs/games/kingdom-hearts-iii.md:149` | 024/025/026/027 | - `gummi_zone`, `gummi_mission`, and `gummi_blueprint` |
| `ai_docs/games/kingdom-hearts-iii.md:150` | Context / scope | - `dlc_content_set` |
| `ai_docs/games/kingdom-hearts-iii.md:151` | 029/030 | - `premium_menu_code` and `merit` |
| `ai_docs/games/kingdom-hearts-iii.md:152` | 031/032; 032 | - `platform_achievement` |
| `ai_docs/games/kingdom-hearts-iii.md:153` | 035; H01/N01/N02/N03/N04 | - `acquisition_event` linking collectible, contained item and reward without duplicate counting |
| `ai_docs/games/kingdom-hearts-iii.md:154` | 004/034; 029/030; 032 | - `save_profile`, `save_lineage`, `edition_status` and `content_entitlement` |
| `ai_docs/games/kingdom-hearts-iii.md:155` | 008/009/H02; 010/011 | - `material_discovery`, `inventory_quantity`, `crafted_once` and independent `recipe_unlock` |
| `ai_docs/games/kingdom-hearts-iii.md:159` | Context / scope | - “What am I missing in this world?” |
| `ai_docs/games/kingdom-hearts-iii.md:160` | 001/004 | - “Where is this Lucky Emblem or treasure?” |
| `ai_docs/games/kingdom-hearts-iii.md:161` | Context / scope | - “What do I still need for Ultima Weapon?” |
| `ai_docs/games/kingdom-hearts-iii.md:162` | 010/011; 015/H02 | - “Where can I farm this material or ingredient?” |
| `ai_docs/games/kingdom-hearts-iii.md:163` | Context / scope | - “Which Game Record is incomplete?” |
| `ai_docs/games/kingdom-hearts-iii.md:164` | 020; H01/N01/N02/N03/N04 | - “What score or rank does this minigame require?” |
| `ai_docs/games/kingdom-hearts-iii.md:165` | Context / scope | - “What remains in the base game versus Re Mind?” |
| `ai_docs/games/kingdom-hearts-iii.md:166` | 024/025/026/027 | - “Which Gummi objectives count toward completion?” |
| `ai_docs/games/kingdom-hearts-iii.md:170` | 024/025/026/027; H01/N01/N02/N03/N04 | Accepted user direction: KH3 uses a more menu-like digital journal, based on the supplied Gummiphone screenshot. It does not need a literal book, parchment, or binder. |
| `ai_docs/games/kingdom-hearts-iii.md:172` | 024/025/026/027 | - Dark navy/indigo star-field atmosphere with restrained constellation-like lines. |
| `ai_docs/games/kingdom-hearts-iii.md:173` | 029/030 | - Rectangular blue/violet category tiles, prominent readable icons, and explicit labels. |
| `ai_docs/games/kingdom-hearts-iii.md:174` | Context / scope | - Cyan/blue selected-state highlights and warm completion badges. |
| `ai_docs/games/kingdom-hearts-iii.md:175` | H01/N01/N02/N03/N04 | - A world/context panel may appear on larger screens when useful assets exist; it must not leave an empty character-art column in MVP. |
| `ai_docs/games/kingdom-hearts-iii.md:176` | H01/N01/N02/N03/N04 | - Responsive tile counts and full-width detail panels on phones; do not shrink the console screenshot. |
| `ai_docs/games/kingdom-hearts-iii.md:177` | 029/030; 032 | - Preserve the same search, progress, cross-links, accessibility, and edition controls as other games. |
| `ai_docs/games/kingdom-hearts-iii.md:178` | H01/N01/N02/N03/N04 | - Text and location instructions remain complete without images. |
| `ai_docs/games/kingdom-hearts-iii.md:180` | 029/030 | This supersedes the earlier bright-page palette proposal. The journal is the information model; its presentation here is digital. |
| `ai_docs/games/kingdom-hearts-iii.md:182` | H01/N01/N02/N03/N04 | See [shared design direction](../ui/jiminys-journal-design-direction.md). |
| `ai_docs/games/kingdom-hearts-iii.md:186` | 001/004; 006; 007/026; 008/009/H02; 013; 015/H02; 016/017/H02; 019; 023; 024/025/026/027; 028; 035; P01/P02/P03; H01/N01/N02/N03/N04 | The [numbered inventory](kh3/collectible-inventory.md) accounts for 245 base chests, 90 Lucky Emblems and nine separate Re Mind chests. Five Golden Herc Figures, ten Frozen Slider prizes, reports and Gummi collectibles use their own units. The research also enumerates 23 Classic Kingdom acquisitions, 20 Photo Mission subjects/rewards, 59 ingredients, 28 dishes, 15 Battlegates/13 Reports and 13 Limitcut first-clear rewards. These are candidate source-grounded inventories, not completed precise route/equipment/recipe datasets. |
| `ai_docs/games/kingdom-hearts-iii.md:188` | 001/004; 003; 004/034; 005/007; 008/009/H02; 010/011; 012/014; 018; 029/030; H01/N01/N02/N03/N04 | Concrete synthesis fixtures include the seven Orichalcum+ paths, Ultima's 58-type recipe unlock and full recipe, and the Kingdom Key's ten forge transitions with calculated material totals. Preserve uncertainty around Flan equality comparisons, Forest Clasp's exact cutoff, Toy Box emblem 8's floor label, Premium Menu rank/score rules and stale synthesis UI statements. Resolve these through content research and app/data validation; do not require the user to replay the game. |
| `ai_docs/games/kingdom-hearts-iii.md:190` | 012/014; 031/032; 032; H01/N01/N02/N03/N04 | The [edition audit](kh3/editions-and-dlc.md) separates free updates from paid Re Mind, shipped Steam/console/cloud releases from announced native 2026-10-08 editions, and platform-exclusive Keyblades. The official cloud sunset notice and new native announcements are recorded with dates. Upcoming builds are not certified by this research. |
| `ai_docs/games/kingdom-hearts-iii.md:192` | 001/004; 004/034; 007/026; 008/009/H02; 010/011; 013; 016/017/H02; 021; 024/025/026/027; 029/030; 031/032; 032; 035; H01/N01/N02/N03/N04 | Required remaining data: complete original chest/emblem/camera routes; all synthesis/equipment/material/cooking relationships and quantities; all Gummi treasure/fragment/mission/part records; complete Game Records and optional reward predicates; base/DLC/NG+ save semantics; exact achievement sets and code eligibility by shipped platform. See [readiness](../readiness/kingdom-hearts-iii.md) for coverage and fixtures. |
| `ai_docs/games/kingdom-hearts-iii.md:196` | 008/009/H02; 010/011; 013; 023; 029/030; 031/032; P01/P02/P03; H01/N01/N02/N03/N04 | A player can find/acquire the specified collectibles, materials and equipment from complete text guidance and clearly see separate base, Re Mind, recipe, record and achievement goals. The app must pass meaningful calculation, linked-state, offline, migration, backup and mobile functionality checks, with source conflicts represented honestly. No full narrative Journal reproduction, Available Now tracking, spoiler controls or user playthrough gate is implied. |
| `ai_docs/readiness/kingdom-hearts-iii.md:3` | H01/N01/N02/N03/N04 | Status: **Research baseline established; not implementation-ready.** Assessed 2026-09-18. |
| `ai_docs/readiness/kingdom-hearts-iii.md:5` | 008/009/H02; 029/030; 032; P01/P02/P03; H01/N01/N02/N03/N04 | Specification: [Kingdom Hearts III](../games/kingdom-hearts-iii.md). Evidence: [KH3 research index](../games/kh3/README.md). Apply the [shared readiness/edition policy](README.md) and accepted [collectible compendium and linked-view contract](../content/collectible-compendium-and-linked-views.md), [synthesis/inventory contract](../content/synthesis-and-inventory.md) and [testing/content-validation contract](../testing-and-content-validation.md). All required modules remain MVP; only missing production screenshot/map images are deferred. |
| `ai_docs/readiness/kingdom-hearts-iii.md:9` | H01/N01/N02/N03/N04 | - Acquisition compendium with synchronized compact marks and expanded detail rows backed by one stable record/state. |
| `ai_docs/readiness/kingdom-hearts-iii.md:10` | H01/N01/N02/N03/N04 | - World percentages measure collectibles, never plot, biography or ordinary conversation flags. Acquisition-specific access conditions remain visible. |
| `ai_docs/readiness/kingdom-hearts-iii.md:11` | 024/025/026/027 | - Dark digital Gummiphone-style menu; complete text instructions, responsive phone layouts, accessible controls. |
| `ai_docs/readiness/kingdom-hearts-iii.md:12` | 029/030; H01/N01/N02/N03/N04 | - React offline PWA, persistent local progress, backup/update safety and bundled per-game Coppermind/Data Jiminy remain required. |
| `ai_docs/readiness/kingdom-hearts-iii.md:13` | 004/034; 032; H01/N01/N02/N03/N04 | - Base, free-update features, paid Re Mind episodes, platform extras and save lineage are explicit scopes. |
| `ai_docs/readiness/kingdom-hearts-iii.md:14` | 023; 031/032; 032 | - Steam is the user’s platform; initial functionality acceptance is Apple browser/iPhone/iPad, with Android follow-up. No user gameplay/playthrough gate. |
| `ai_docs/readiness/kingdom-hearts-iii.md:15` | 023; 029/030; H01/N01/N02/N03/N04 | - Spoilerific app without warnings/hiding/reveal controls. No Available Now, story-milestone or progress-gate tracking/filter. Text prerequisites remain. |
| `ai_docs/readiness/kingdom-hearts-iii.md:16` | 008/009/H02; H01/N01/N02/N03/N04 | - Optional opt-in inventory with owned/required x/y counts; synthesis is first-class with strong game-specific formula validation. |
| `ai_docs/readiness/kingdom-hearts-iii.md:20` | Context / scope | \| Category \| Earlier baseline \| Research added \| Status / release gap \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:22` | P01/P02/P03 | \| KHTABLES/repository \| No identified KH3 source \| Ten-file inventory + full returned-text scan of three ambiguous docs (466,933 chars); complete repo tree \| Audited absence of reusable KH3 source; other-game sheet cells not re-audited \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:23` | 001/004; 021; P01/P02/P03; H01/N01/N02/N03/N04 | \| Base numbered chests \| Scope only \| 245 candidate records with contents/areas, per-world counts and contiguous source numbering \| Identity inventory complete from community tables; all precise original routes and in-game numbering verification unfinished \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:24` | 001/004; 003; 007/026; 021; 035; H01/N01/N02/N03/N04 | \| Lucky Emblems \| Scope only \| 90 candidate records across nine worlds; rewards/access exceptions \| Precise camera directions/first-visit conditions incomplete; Toy Box #8 floor conflict \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:25` | 001/004; 006; H01/N01/N02/N03/N04 | \| Extra world collections \| Scope only \| Five Golden Herc Figure locations; ten Frozen Slider prizes identified separately \| Frozen Slider full routes and Final World bonus acquisition rules unfinished \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:26` | 001/004; 004/034; 021; H01/N01/N02/N03/N04 | \| Re Mind chests \| Scope only \| Nine separate Scala records \| All detailed routes/replay-missability/save behavior unfinished; never count in base 245 \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:27` | 007/026; 008/009/H02; 010/011; 035; P01/P02/P03; H01/N01/N02/N03/N04 | \| Synthesis/materials \| Scope only \| 20 photo subject/reward identities; 58-type Ultima unlock; seven Orichalcum+ paths; selected drop rates \| Complete recipes/quantities/collector goals/source catalogue and exact total still needed \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:28` | 012/014; 013; 035; H01/N01/N02/N03/N04 | \| Keyblades/equipment \| Scope only \| Acquisition anchors; full ten-step Kingdom Key fixture and calculated totals; DLC reward table \| Complete blade/formchange/forge rows, staves/shields/armor/accessories and entitlement edges incomplete \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:29` | 001/004; 008/009/H02; 010/011; 015/H02; 016/017/H02; H01/N01/N02/N03/N04 | \| Ingredients/cuisine \| Scope only \| 59 ingredient identities, 28 dish identities, 20-Classic-dish five-star rule \| Full 59 sourcing routes, every recipe quantity/menu assignment, meal effects and farming guidance unfinished \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:30` | 001/004; 019; 021; H01/N01/N02/N03/N04 | \| Classic Kingdom \| Scope only \| All 23 acquisition identities, joined to 18 chest records and five Twilight Town unlocks \| High-score success predicates and original play instructions require testing \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:31` | 018; 020; 021; 031/032; 035; H01/N01/N02/N03/N04 | \| Minigames/records \| Scope only \| Seven Flan upper thresholds; rank versus trophy comparison for five courses \| Exact Flan equality, full Game Records/100 Acre Wood/Caribbean rewards unfinished \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:32` | 001/004; 023; 035; P01/P02/P03; H01/N01/N02/N03/N04 | \| Battlegates/Reports \| Scope only \| 15 gate identities, 13 report links, first-clear rewards, Dark Inferno distinction \| Routes, strategy and repeat-reward verification incomplete \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:33` | 024/025/026/027; 035; H01/N01/N02/N03/N04 | \| Gummi \| Scope only \| Three zones; nine constellations; 10/17/6 map battle entries; global goal ladders, two boss access rules \| Every treasure/sphere/fragment/part/blueprint/rank reward not yet normalized; full completion predicate unresolved \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:34` | 004/034; 028; 035; H01/N01/N02/N03/N04 | \| Re Mind/Limitcut/Secret \| Scope only \| Official feature list; 11→13 data lock, all 13 first-clear rewards; Yozora reward \| Full prerequisite/start/resume/replay test matrix and encounter guidance unfinished \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:35` | 004/034; 020; 029/030; 031/032; H01/N01/N02/N03/N04 | \| Premium Menu \| Scope only \| Per-save mode unlocks, 15 EZ/13 PRO identities counted, nine merits, maximum/A-rank points \| Exact code predicates, trophy blocking, score replacement/rounding and uncertain rank-B value unresolved \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:36` | 031/032; 032; H01/N01/N02/N03/N04 | \| Editions/achievements \| Not audited \| Primary Steam/DLC/cloud/future-release pages; 51 Steam achievements; visible predicates \| All shipped build IDs and PS/Xbox/Epic sets require audit; 2026-10-08 editions **announced/unreleased** \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:37` | H01/N01/N02/N03/N04 | \| Runtime/UX/Data Jiminy \| No KH3 implementation \| Domain contracts, examples and acceptance cases below \| Not implemented or tested in this research task \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:39` | 001/004; 029/030; P01/P02/P03 | Detailed coverage and disagreements: [source manifest](../games/kh3/sources-and-conflicts.md). Candidate inventory coverage is not route completeness or production verification. No category receives a false “ready” merely because a source table exists. |
| `ai_docs/readiness/kingdom-hearts-iii.md:43` | 001/004; 006; 024/025/026/027 | 1. 245 base chests + 90 emblems are distinct denominators; Re Mind’s nine chests, Frozen Slider’s ten prizes and Gummi treasure remain separate. |
| `ai_docs/readiness/kingdom-hearts-iii.md:44` | 005/007; 007/026; P01/P02/P03; H01/N01/N02/N03/N04 | 2. Forest Clasp is missable; the item/world sources disagree on the exact deadline. Use a conservative pre-Shore warning pending test. Photo Mission 20’s Rapunzel photo remains obtainable later. |
| `ai_docs/readiness/kingdom-hearts-iii.md:45` | 001/004; 008/009/H02; 010/011; 016/017/H02; H01/N01/N02/N03/N04 | 3. 80 emblems yields Orichalcum+, while the full set is 90. Grand Chef requires 20 Excellent Classic dishes, whereas the recipe catalogue has 28. |
| `ai_docs/readiness/kingdom-hearts-iii.md:46` | 006; 020; 031/032 | 4. Frozen Slider A rank is 500,000 versus a 600,000 achievement; Festival Dance is 50,000 versus 70,000; Verum Rex is 10 million versus 12 million. |
| `ai_docs/readiness/kingdom-hearts-iii.md:47` | 029/030; 032; H01/N01/N02/N03/N04 | 5. Oathkeeper/Oblivion are free-update acquisitions. Premium Menu and the three Re Mind episodes require the DLC entitlement (bundled on some platforms). |
| `ai_docs/readiness/kingdom-hearts-iii.md:48` | 032; P01/P02/P03; H01/N01/N02/N03/N04 | 6. Official sources now announce native 2026-10-08 editions and a cloud service sunset. Announced content is not a verified shipped build. |
| `ai_docs/readiness/kingdom-hearts-iii.md:52` | 001/004; P01/P02/P03 | - Verify exact base sums per world: chests 32/10/29/28/22/25/56/36/0/6/1 = 245; emblems 12/9/11/9/11/11/13/11/3 = 90. Each within-world numbering set is contiguous in the community inventory. |
| `ai_docs/readiness/kingdom-hearts-iii.md:53` | 001/004; 019; H01/N01/N02/N03/N04 | - Toggle Toy Box chest 24 in compact view; expanded row and Classic Kingdom acquisition agree offline. Its high-score record remains independent. |
| `ai_docs/readiness/kingdom-hearts-iii.md:54` | 001/004; 029/030; H01/N01/N02/N03/N04 | - San Fransokyo emblem 3 retains its night text prerequisite and remains in the full denominator under search/category filters. Do not add an Available Now control or story-progress tracker. |
| `ai_docs/readiness/kingdom-hearts-iii.md:55` | 010/011 | - Kingdom Key 0→10: Fluorite 3, Damascus 3, Adamantite 3, Electrum 1; Wellspring Shards 9, Stones 6, Gems 6, Crystal 1. Level 3→6 costs only Damascus 3 + Stones 6. |
| `ai_docs/readiness/kingdom-hearts-iii.md:56` | 008/009/H02; 010/011; P01/P02/P03 | - Ultima recipe is 7 Orichalcum+ plus two each Wellspring/Lucid/Pulsing Crystals. Four satisfied Orichalcum+ events leave three event sources, not an invented repeatable farm. |
| `ai_docs/readiness/kingdom-hearts-iii.md:57` | 001/004; 008/009/H02; 016/017/H02; H01/N01/N02/N03/N04 | - Acquiring Corona chest 26’s cuisine does not mark an Excellent cooking record. Twenty Classic Excellent results can finish Grand Chef while Special Menu recipes remain. |
| `ai_docs/readiness/kingdom-hearts-iii.md:58` | 001/004; 004/034; 029/030 | - A base save with 245/245 chests remains complete when its Re Mind profile has 0/9. Temporary playable characters do not duplicate Sora’s world inventory. |
| `ai_docs/readiness/kingdom-hearts-iii.md:59` | 023; 028 | - Gate 0 awards no report; gates 1–13 map to reports 1–13; gate 14’s Crystal Regalia differs from Yozora’s Crystal Regalia+. |
| `ai_docs/readiness/kingdom-hearts-iii.md:60` | 012/014; 013; 031/032; H01/N01/N02/N03/N04 | - Acquiring one maxed Keyblade satisfies only its relevant achievement predicate, not the all-equipment goal. |
| `ai_docs/readiness/kingdom-hearts-iii.md:64` | 001/004; 029/030; 032; P01/P02/P03; H01/N01/N02/N03/N04 | Verify compact/detail/search/Data Jiminy state agreement, undo, failed-write rollback/retry, reload offline, export/import, profile isolation, renamed-record migrations and cross-version backups. Clearing a filter must restore scroll context without changing denominators. Missing/unverified inventory never becomes a certified 100%. Screen readers must announce world/category/number/content/state and distinguish open-detail from toggle. |
| `ai_docs/readiness/kingdom-hearts-iii.md:66` | P01/P02/P03; H01/N01/N02/N03/N04 | Verify every location is usable with images absent. Media placeholders must not create empty artwork columns. Character references cannot alter collection percentages. Do not add manually tracked access milestones. |
| `ai_docs/readiness/kingdom-hearts-iii.md:70` | 029/030; 032 | Each answer must cite local record IDs and provenance and expose edition/uncertainty when relevant: |
| `ai_docs/readiness/kingdom-hearts-iii.md:72` | H01/N01/N02/N03/N04 | \| Question \| Required answer behavior \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:74` | 001/004; P01/P02/P03 | \| “Which Toy Box chest gives The Barnyard Battle?” \| Chest 24/Kid Korral, linked record; route not invented from area-only evidence \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:75` | 001/004; 024/025/026/027; H01/N01/N02/N03/N04 | \| “Why can’t I finish Olympus emblems on the first visit?” \| Gummiphone/revisit prerequisite; category remains 12 \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:76` | 001/004; 010/011 | \| “I have 80 emblems. Am I finished?” \| Orichalcum+ event achieved; ten of 90 remain \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:77` | 010/011; 023; 035; P01/P02/P03 | \| “Where can I farm Illusory Crystal?” \| Battlegate 8 Demon Tower source; first-clear gate rewards separately \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:78` | 001/004 | \| “Does my Sea Bass en Papillote+ chest count for Master Chef?” \| Ownership and Excellent preparation are separate \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:79` | 001/004; 029/030; H01/N01/N02/N03/N04 | \| “Is Oathkeeper paid DLC?” \| Free-update Proof exchange; state clear + 90-emblem requirement \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:80` | Context / scope | \| “Where are the last two data portals?” \| Complete the initial eleven for Xion/Master Xehanort \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:81` | 006; 020; 031/032 | \| “Does a 500,000 Frozen Slider score earn the trophy?” \| A rank; trophy is 600,000; ten prizes separate \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:82` | 032; P01/P02/P03; H01/N01/N02/N03/N04 | \| “Is Switch 2 supported as a shipped build?” \| As of date, announced 2026-10-08; do not claim gameplay verification \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:83` | 001/004; 005/007 | \| “Can I still get Forest Clasp?” \| Explain missable window and conflicting exact trigger, ask route state only if needed \| |
| `ai_docs/readiness/kingdom-hearts-iii.md:87` | 001/004; 031/032; 032; P01/P02/P03; H01/N01/N02/N03/N04 | No blocking user decision identified. Accepted compendium focus, linked-state behavior, DLC separation, theme, Steam platform, spoilerific presentation, absence of Available Now tracking, optional inventory, Apple-first testing and MVP policy are already settled. Source disagreements, missing routes and exact game predicates are research tasks, not questions to push back onto the user. |
| `ai_docs/readiness/kingdom-hearts-iii.md:89` | H01/N01/N02/N03/N04 | No new questions were solicited. The parent relayed the accepted decisions above during this audit; they have been incorporated. Earlier stub contained no unanswered game-specific questions. |
| `ai_docs/readiness/kingdom-hearts-iii.md:93` | 001/004; 021; P01/P02/P03 | 1. Finish original route text and reconcile numbered records using reliable modern sources/captures, starting with the documented conflicts and all nine Scala chests. |
| `ai_docs/readiness/kingdom-hearts-iii.md:94` | 008/009/H02; 010/011; 013; 016/017/H02; 024/025/026/027; H01/N01/N02/N03/N04 | 2. Normalize complete synthesis, material, equipment, cooking and Gummi acquisition graphs; calculate costs from edge quantities. |
| `ai_docs/readiness/kingdom-hearts-iii.md:95` | 004/034; 028; 029/030; 035; P01/P02/P03 | 3. Verify base/Re Mind/Limitcut/Secret/NG+ save boundaries, Premium code eligibility and exact reward thresholds. |
| `ai_docs/readiness/kingdom-hearts-iii.md:96` | 031/032; 032; H01/N01/N02/N03/N04 | 4. Read every supported shipped platform achievement set and build metadata; keep upcoming editions in announced status until available and tested. |
| `ai_docs/readiness/kingdom-hearts-iii.md:97` | 001/004; 023; P01/P02/P03; H01/N01/N02/N03/N04 | 5. Implement the shared offline linked-record contract and the KH3 dark menu, then run the meaningful functionality and calculation fixtures above plus source/route completeness checks. Do not make the user’s gameplay or a full playthrough a gate. |
| `ai_docs/implementation/kh3-rollout.md:5` | 001/004; 029/030; P01/P02/P03; H01/N01/N02/N03/N04 | Read the complete `ai_docs/games/kh3` research set and readiness assessment, then applied the refinement playbook. The existing research supplies numbered collectible identities but explicitly does not establish complete precise routes. Do not promote those identities to fully verified route guidance. |
| `ai_docs/implementation/kh3-rollout.md:7` | 001/004; 010/011; 016/017/H02; 019; 021; 031/032; H01/N01/N02/N03/N04 | Normalize the existing factual tables into stable records; reuse chest IDs for Classic Kingdom acquisitions; preserve separate cooking, high-score, DLC and achievement outcomes; expose direct input quantities as additive farming targets. Use the shared journal renderer for searchable category pages, world links and independent inline details. Data Jiminy is excluded. |
| `ai_docs/implementation/kh3-rollout.md:9` | P01/P02/P03 | Additional source inspection on 2026-09-20: |
| `ai_docs/implementation/kh3-rollout.md:11` | 008/009/H02; 015/H02; 016/017/H02 | - https://www.khwiki.com/Le_Grand_Bistrot — all 28 recipe ingredient lists, cooking methods and Classic/Special distinction. Recipe inputs are one unit of each listed ingredient. All attempts consume ingredients; crafting history is not Excellent cooking history. |
| `ai_docs/implementation/kh3-rollout.md:12` | 015/H02; P01/P02/P03 | - https://www.khwiki.com/Ingredients — 59 ingredient identities, listed source areas and available shop prices. |
| `ai_docs/implementation/kh3-rollout.md:13` | 031/032; H01/N01/N02/N03/N04 | - https://steamcommunity.com/stats/2552450/achievements/ — 51 achievement names and publicly visible requirements. Three hidden story predicates remain explicitly unavailable; other hidden conditions are tied to the existing research, with uncertainty retained. |
| `ai_docs/implementation/kh3-rollout.md:17` | 008/009/H02; H01/N01/N02/N03/N04 | `src/games/kh3.ts` configures the guide; `src/games/kh3/content.json` stores 617 entries and 39 recipe actions. |
| `ai_docs/implementation/kh3-rollout.md:19` | 001/004; 031/032; 035 | - 245 base chests, 90 Lucky Emblems and nine separate Re Mind chests. Canonical numbered IDs follow the research convention. Base collectible totals exclude Re Mind, achievements, story rewards and record goals. |
| `ai_docs/implementation/kh3-rollout.md:20` | 001/004; 019; 021; H01/N01/N02/N03/N04 | - 23 Classic Kingdom acquisition views: 18 share their chest event IDs and five have independent acquisition records. The 23 high-score records remain separate. |
| `ai_docs/implementation/kh3-rollout.md:21` | 007/026; 008/009/H02; 013; H01/N01/N02/N03/N04 | - 20 Photo Missions, with recipe unlocks explicitly distinguished from receiving finished equipment. |
| `ai_docs/implementation/kh3-rollout.md:22` | 023 | - 15 Battlegates; gates 1–13 appear in the Reports category using the same event IDs. Gate 0 has no report; gate 14 awards Crystal Regalia. |
| `ai_docs/implementation/kh3-rollout.md:23` | 018; 020; 031/032 | - Five Golden Herc Figures, seven Flan upper-tier objectives, five named minigame rank/achievement comparisons. |
| `ai_docs/implementation/kh3-rollout.md:24` | 008/009/H02; 015/H02; 016/017/H02; 021; H01/N01/N02/N03/N04 | - 28 Excellent cuisine records, all 28 cooking input recipes, 59 ingredient stock/found-ever records. Twenty Classic and eight Special dishes are distinguished. An acquired dish does not mark it cooked Excellent. |
| `ai_docs/implementation/kh3-rollout.md:25` | 008/009/H02; 012/014; P01/P02/P03 | - Ultima Weapon synthesis and the ten individual Kingdom Key forge steps. Forge steps are explicit source-level→target-level actions, not a purported universal upgrade ladder. Ultima synthesis creates a level-10 weapon. |
| `ai_docs/implementation/kh3-rollout.md:26` | 005/007; 008/009/H02; 010/011; 012/014; H01/N01/N02/N03/N04 | - 13 synthesis/forge materials, 16 Keyblade acquisition anchors and Forest Clasp’s conservative missability warning. |
| `ai_docs/implementation/kh3-rollout.md:27` | 024/025/026/027 | - Nine Gummi constellations and two optional Gummi bosses. |
| `ai_docs/implementation/kh3-rollout.md:28` | 001/004; 028; H01/N01/N02/N03/N04 | - Thirteen Limitcut victories and Yozora, distinct from the nine Re Mind chests. DLC labels and prerequisites remain visible. |
| `ai_docs/implementation/kh3-rollout.md:29` | 031/032 | - All 51 Steam achievements; completion remains independent from the base collectible denominator. |
| `ai_docs/implementation/kh3-rollout.md:33` | 001/004; 003; 006; 008/009/H02; 010/011; 012/014; 013; 015/H02; 020; 021; 024/025/026/027; 029/030; 035; P01/P02/P03; H01/N01/N02/N03/N04 | This is a functioning sourced guide with broad coverage, not a complete KH3 acquisition encyclopedia. Full synthesis output/ingredient graphs, all Keyblade forge ladders, bestiary, equipment sources, Gummi treasure/sphere/fragment catalogs, Frozen Slider’s ten exact prize routes, Premium Menu code predicates and comprehensive minigame rewards remain unfinished. No fabricated entries fill those gaps. Several material sources remain explicitly unverified. World chest/emblem records generally give an area and number rather than a precise physical route, and retain a visible note saying so. Toy Box emblem 8 retains the conflicting floor evidence. |
| `ai_docs/implementation/kh3-rollout.md:35` | 004/034; 007/026; 021; 024/025/026/027; 029/030; 035; H01/N01/N02/N03/N04 | One shared game profile currently contains explicitly named base and DLC records, with distinct IDs/categories; this does not implement multiple save-lineage or New Game+ profiles. Related events do not automatically alter inventory or derived reward checks. Photo missions lack some precise camera positions. The shared journal aesthetic is retained; a complete digital Gummiphone visual skin is not part of this module. |
| `ai_docs/implementation/kh3-rollout.md:39` | Context / scope | - `npx tsc --noEmit --pretty false` passed after the module was written. |
| `ai_docs/implementation/kh3-rollout.md:40` | 008/009/H02 | - Data validation passed: 656 distinct entry/recipe IDs; all recipe input IDs resolve to entries; all quantities positive. |
| `ai_docs/implementation/kh3-rollout.md:41` | 008/009/H02; 016/017/H02; 021; H01/N01/N02/N03/N04 | - Asserted 28 cuisine records with exactly 20 Classic Menu and eight Special Menu recipes. |
| `ai_docs/implementation/kh3-rollout.md:42` | 001/004; 029/030 | - Numbered inventories reproduce the checked-in 245/90/9 counts. |
| `ai_docs/implementation/kh3-rollout.md:43` | 029/030; 032; H01/N01/N02/N03/N04 | - Root integration owns browser, shared-profile and full build checks; these were not independently claimed by this content agent. |

## Appendix C — shared/runtime integration mentions

Direct KH3/Re Mind mentions outside the dedicated pack are retained below. Most are scope, implementation or source-inventory context, not additional factual findings. KH3D-only hits, unrelated cross-game source page labels and other-game factual data are excluded as described above. Shared generic constraints are covered in the main ledgers.

| Exact occurrence | Repository excerpt / disposition |
|---|---|
| `ai_docs/01-product-vision-and-scope.md:55` | - Kingdom Hearts III, including separately scoped Re Mind content |
| `ai_docs/02-content-inventory.md:29` | No legacy Drive source was found for 0.2 or Kingdom Hearts III. |
| `ai_docs/02-content-inventory.md:40` | \| Kingdom Hearts III + Re Mind \| [Open](./games/kingdom-hearts-iii.md) \| Specification only \| All factual datasets and exact completion rules \| |
| `ai_docs/02-content-inventory.md:48` | \| Synthesis planner \| KH1/KH2/KH3 \| What materials remain and where do I farm them? \| Recipes, quantities, drops, locations, optional inventory \| First-class MVP \| Owned/required (x/y) reminders when enabled; validated totals and shared-stock allocation \| |
| `ai_docs/02-content-inventory.md:52` | \| Lucky Emblem and Gummiphone tracker \| KH3 \| What remains in each record category? \| Emblems, treasures, records, requirements \| High \| Base game and DLC separated \| |
| `ai_docs/03-information-architecture.md:55` | - Add-ons such as Re Mind remain visibly distinct from base-game completion. |
| `ai_docs/07-decision-log.md:93` | - **Decision:** KH1–2 use green journal theming; BBS uses blue Reports theming; KH3 uses a dark, menu-like digital journal. Preserve the anchored game menu with fly-in artwork and shared navigation semantics. |
| `ai_docs/07-decision-log.md:97` | - **Supersedes / superseded by:** Replaces earlier speculative KH1/KH2/KH3 palette proposals and refines DEC-003; does not replace the journal concept. |
| `ai_docs/07-decision-log.md:189` | - **Consequences:** Prioritize recipe/source navigation, persistent optional stock, deterministic calculations and independent acceptance fixtures. Keep crafted history separate from current stock and avoid double-allocating inventory. Propagate applicable lessons to KH2/KH3 synthesis, BBS melding and DDD creation without inventing crafting in 0.2. See [shared contract](./content/synthesis-and-inventory.md). |
| `ai_docs/content/collectible-compendium-and-linked-views.md:64` | - Character-specific BBS and DDD collections remain correctly separated. Shared records count once in the applicable scope. 0.2 and Re Mind boundaries remain explicit. |
| `ai_docs/content/persistent-checklists-and-progress.md:33` | \| KH3 \| Base-game and Re Mind requirements remain distinct; platform achievements are a separate overlay \| |
| `ai_docs/content/persistent-checklists-and-progress.md:82` | - KH3: tile-level summaries and item-level checks in the digital menu. |
| `ai_docs/content/synthesis-and-inventory.md:35` | \| KH3 \| Synthesis recipes, materials, unlocks and verified variant rules; keep cuisine as a distinct game-specific system. Base/Re Mind boundaries remain explicit. \| |
| `ai_docs/data-jiminy.md:50` | - 0.2 has its own game session even inside the BBS navigation family. Re Mind remains explicitly scoped within KH3. |
| `ai_docs/games/README.md:14` | - [Kingdom Hearts III](./kingdom-hearts-iii.md) |
| `ai_docs/games/README.md:71` | [Five game research assignments](../research/parallel-game-research.md) cover KH2FM, BBSFM, 0.2, DDD HD and KH3/Re Mind. Each starts with the user's existing source records, then documents edition-correct findings, citations and unresolved inventory/verification gaps in its own spec and readiness file. |
| `ai_docs/games/kh02/replay-challenges-achievements.md:43` | Objective 51 specifically needs Critical. The platform difficulty achievement allows **Proud or Critical**; satisfying the latter on Proud does not satisfy #51. Do not import BBS Critical rules or KH3 Critical abilities into this game. |
| `ai_docs/implementation/kh02-rollout.md:27` | Generation asserts all inventories, unique IDs, exactly55 physical units and world totals11/21/16/7. `git diff --check` passes. Full TypeScript checking currently reports only the unrelated missing `./kh3` module in the root-owned registry, with no 0.2 errors. Parent integration owns shared-shell desktop/phone and persistence validation. No in-game/playthrough verification is claimed. |
| `ai_docs/implementation/kh2fm-rollout.md:42` | Steam Achievements now includes 23 public KHII-scoped goals whose names and requirements were read directly from the [official Steam collection achievement list](https://steamcommunity.com/stats/2552430/achievements/) on September 20, 2026. These cover world episodes, regular cups, Struggle, maps/puzzles/Nobodies, level99 and Gummi goals. Hidden descriptions and ambiguous collection-duplicate names remain outside this partial subset. The UI coverage text explicitly states23 rather than claiming a complete platform set. No PS platinum was imported. Full TypeScript checking now only reports the in-progress KH3 registry import, not a KH2 alias issue. |
| `ai_docs/implementation/multi-game-rollout.md:27` | \| KH3/Re Mind \| [Base/DLC collections, cooking, forge and challenges](kh3-rollout.md) \| |
| `ai_docs/implementation/multi-game-rollout.md:41` | Final follow-up: after the last BBS catalog additions and assistant-dock CSS correction, catalog integrity checks passed again and all 16 new-game desktop/phone cases passed across the final run and a focused KH3 rerun. Two KH3 cases timed out during an unusually delayed run; both passed in under a second on the isolated rerun. A regression assertion now checks that new journals do not reserve assistant-dock padding. |
| `ai_docs/implementation/ui-ux-review.md:35` | The first cover screenshot displayed the Heartless symbol because `khfm.png` was confused with the original `khfm.jpg`. Corrected KH1 to the supplied repository Sora-and-flag illustration, and BBS to its original character illustration. Original bytes are unchanged. The illustration moves while the list stays anchored. Unavailable KH3/0.2 art is omitted rather than borrowing another game's illustration. Added spacing between the framed illustration and its caption. |
| `ai_docs/readiness/README.md:17` | - [Kingdom Hearts III](./kingdom-hearts-iii.md) |
| `ai_docs/research/parallel-game-research.md:19` | \| kh3_research \| KH3 / Re Mind \| Existing spec/readiness and repository; no dedicated KHTABLES source found \| Existing KH3 spec/readiness; games/kh3/ \| |
| `ai_docs/research/recom-2026-09-28-coverage-and-gap-research.md:20` | The inspected `src/App.tsx` game list contains KH1FM, KH2FM, BBSFM, DDDHD, KH02 and KH3. `src/games/registry.ts` loads the five non-KH1 guides. There is no Re:CoM selector/module in that inspected state. Existing uncommitted BBS/decision-log work was left intact. |
| `ai_docs/ui/jiminys-journal-design-direction.md:131` | Theme differences must not change fundamental navigation, accessibility, or data meaning. They may change layout composition: a physical journal for KH1–2/BBS and a digital tile menu for KH3. Shared shell means shared behavior, not mandatory binder decoration. |
| `ai_docs/ui/jiminys-journal-design-direction.md:173` | \| KH3 \| Digital, menu-like journal \| Dark star field, blue/violet category tiles, white icons, cyan selection, contextual side panel \| |
| `ai_docs/ui/jiminys-journal-design-direction.md:198` | - KH3 category tiles reflow rather than becoming miniature console tiles. |
| `ai_docs/ui/jiminys-journal-design-direction.md:214` | Inside every selected game, anchor Jiminy at the bottom right with a small visible “…” chat bubble that opens the game-scoped Data Jiminy interface. Preserve this location across green journals, blue Reports and KH3's digital treatment. The main game-selection screen has no unscoped Jiminy launcher. |
| `src/App.tsx:297` | id: "kh3", |
| `src/App.tsx:298` | name: "Kingdom Hearts III", |
| `src/App.tsx:299` | edition: "& Re Mind", |
| `src/games/registry.ts:11` | kh3: () => import("./kh3"), |
| `src/jiminy/retrieval.ts:26` | /\b(birth by sleep\|bbs\|terra\|aqua\|ventus\|command meld\|kh2\|kh3\|kingdom hearts (?:ii\|iii\|2\|3)\|dream drop\|re mind)\b/i.test( |
| `tests/e2e/multi-game.spec.ts:7` | ["kh3", "treasures"], |
| `tests/multi-game.test.ts:3` | import kh3 from "../src/games/kh3"; |
| `tests/multi-game.test.ts:19` | for (const guide of [kh2, bbs, ddd, kh02, kh3]) |

### Guide configuration occurrences

`src/games/kh3.ts` is a wrapper over canonical JSON, but its independently authored summaries/coverage disclaimers are retained here in full.

| Exact occurrence | Excerpt |
|---|---|
| `src/games/kh3.ts:5` | ['Olympus','Return with the Gummiphone for Lucky Emblems. Five Golden Herc Figures exchange for Hero’s Belt in Agora.'], |
| `src/games/kh3.ts:6` | ['Twilight Town','Tram Common contains the Bistrot, Moogle workshop and Classic Kingdom posters.'], |
| `src/games/kh3.ts:7` | ['Toy Box','Galaxy Toys spans several floors and departments; use area names to distinguish repeated rooms.'], |
| `src/games/kh3.ts:8` | ['Kingdom of Corona','Complete Rapunzel’s four Forest Clasp activities before reaching the Shore; sources disagree on the later cutoff.'], |
| `src/games/kh3.ts:9` | ['Monstropolis','Return after the story for elevator/vault treasures and the Vault Passage emblem.'], |
| `src/games/kh3.ts:10` | ['Arendelle','Frozen Slider’s ten prizes are separate from the 25 world chests. The score achievement needs 600,000, above the 500,000 A rank.'], |
| `src/games/kh3.ts:11` | ['The Caribbean','Island treasures, underwater passages and Port Royal are separate areas. Ship combat is distinct from Gummi combat.'], |
| `src/games/kh3.ts:12` | ['San Fransokyo','Choose day or night at the save point; Lucky Emblem 3 requires night.'], |
| `src/games/kh3.ts:13` | ['100 Acre Wood','Three Lucky Emblems; no numbered base-game chests.'], |
| `src/games/kh3.ts:14` | ['Keyblade Graveyard','Battlegate 0 differs from the post-clear gates. Dark Inferno awards Crystal Regalia.'], |
| `src/games/kh3.ts:15` | ['The Final World','Return for the Orichalcum+ chest.'], |
| `src/games/kh3.ts:16` | ['Scala ad Caelum','The nine listed chests belong to Re Mind and do not count toward the base 245.'], |
| `src/games/kh3.ts:17` | ['Starlight Way','Gummi zone containing Olympus, Twilight Town, Toy Box and Corona routes.'], |
| `src/games/kh3.ts:18` | ['Misty Stream','Schwarzgeist requires a ship with at least 200 Speed.'], |
| `src/games/kh3.ts:19` | ['The Eclipse','Clear the five other battles to unlock Omega Machina and its Orichalcum+.'], |
| `src/games/kh3.ts:20` | ['Limitcut','Clear the eleven initial data battles to unlock Xion and Master Xehanort.'], |
| `src/games/kh3.ts:21` | ['Secret Episode','All thirteen data wins unlock Yozora. Victory rewards Crystal Regalia+.'], |
| `src/games/kh3.ts:24` | id:'kh3', name:'Kingdom Hearts III', edition:'Re Mind · Steam', accent:'#536bba', |
| `src/games/kh3.ts:28` | {id:'treasures',label:'Treasures',icon:'chest'}, |
| `src/games/kh3.ts:29` | {id:'emblems',label:'Lucky Emblems',icon:'heart'}, |
| `src/games/kh3.ts:30` | {id:'photos',label:'Photo Missions',icon:'search'}, |
| `src/games/kh3.ts:31` | {id:'keyblades',label:'Keyblades & Equipment',icon:'sword'}, |
| `src/games/kh3.ts:32` | {id:'ingredients',label:'Ingredients',icon:'leaf'}, |
| `src/games/kh3.ts:33` | {id:'cuisine',label:'Excellent Cuisine',icon:'cup'}, |
| `src/games/kh3.ts:34` | {id:'classic-kingdom',label:'Classic Kingdom',icon:'book'}, |
| `src/games/kh3.ts:35` | {id:'classic-records',label:'Classic Kingdom Scores',icon:'medal'}, |
| `src/games/kh3.ts:36` | {id:'challenges',label:'Challenges & Minigames',icon:'spark'}, |
| `src/games/kh3.ts:37` | {id:'herc',label:'Golden Herc Figures',icon:'world'}, |
| `src/games/kh3.ts:38` | {id:'battlegates',label:'Battlegates',icon:'monster'}, |
| `src/games/kh3.ts:39` | {id:'reports',label:'Secret Reports',icon:'scroll'}, |
| `src/games/kh3.ts:40` | {id:'gummi',label:'Gummi Routes',icon:'world'}, |
| `src/games/kh3.ts:41` | {id:'remind-treasures',label:'Re Mind Treasures',icon:'chest'}, |
| `src/games/kh3.ts:42` | {id:'remind',label:'Limitcut & Secret Episode',icon:'sword'}, |
| `src/games/kh3.ts:43` | {id:'achievements',label:'Steam Achievements',icon:'medal'}, |
| `src/games/kh3.ts:44` | {id:'material',label:'Materials',icon:'flask'}, |
| `src/games/kh3.ts:46` | entries:content.entries as CollectionEntry[], recipes:content.recipes, |
| `src/games/kh3.ts:47` | coverage:'Base inventory: 245 chests and 90 Lucky Emblems. Re Mind: nine separate chests. Includes 23 Classic Kingdom acquisitions and separate high scores, 20 Photo Missions, 15 Battlegates, 28 Excellent cuisine records and recipes, 59 ingredients, 51 Steam achievements, selected synthesis/forge, Keyblades, Flan, Gummi and DLC encounters. Chest/emblem routes currently identify areas, not every exact landmark. Full synthesis, equipment, bestiary, Gummi treasures, Frozen Slider prize routes and Premium Menu predicates remain incomplete. Counts refer to represented records only; Data Jiminy is excluded.', |

## Verification of this audit

Counts were recomputed from parsed canonical JSON; all 656 IDs unique, all recipe ingredient IDs resolve, no nonpositive quantities, and all 344 numbered research-table rows map to existing runtime IDs. All 421 uncertainty occurrences, 16 nulls and eight empty arrays are represented in Appendix A. Appendix B covers the complete documentary substantive-line census, while Appendix A maps every numbered candidate row. Referenced repository paths/line numbers were checked against the baseline working files. No external source was opened and no game facts were newly certified; only this audit file was authored.
