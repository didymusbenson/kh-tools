# KH2 Final Mix research audit

**Practical review — 2026-10-02:** all 3 remaining research families are deferred with explicit player-goal reasons; no active practical blocker remains in this reviewed scope. Evidence stays 31 closed, 3 partial and 6 other limitations. Deferral does not resolve a disputed fact. [Current per-family decisions](practical-review-2026-10-02.md) supersede older active-research/release-gate wording below; UI/device acceptance and other app work remain separate.

## Current disposition — October 1 follow-through

Current disposition of **all forty findings**, superseding the repository-only `f933ab1` baseline. Every finding was investigated or checked against its existing resolved evidence. All accessible catalog expansions identified during peer review have been integrated; precise remaining facts and engineering/provenance boundaries are separated below. Source-backed does not mean a retail executable was run.

**31 closed**; **3 partial**; **2 implementation**; **1 provenance**; **1 confidence**; **1 platform**; **1 excluded**. These are issue families, not wrong-record counts or an accuracy percentage. Machine-readable evidence: [research-dispositions-2026-10-01.json](research-dispositions-2026-10-01.json).

| Finding | Status | Current disposition |
|---|---|---|
| KH2-001 — Orichalcum+ collector predicate | closed | All sixty types must be deposited, including an Orichalcum+ from one of the other six sources; leave and re-enter synthesis to deposit a new reward. No guessed 59-type exception. |
| KH2-002 — All treasure routes | closed | All 301 treasure IDs have self-contained area/landmark approaches, reviewed against all 189 KHGuides Sora rows plus 112 complete-world walkthrough/item-location rows. Preserved Journal identity; explicitly rejected Disney 07 reward and several guide numbering errors. verified-route-review.json records every ID and source use. No untouched chest directions remain. |
| KH2-003 — Sparse puzzle landmarks | partial | All 144 puzzle routes remain reviewed. Follow-up indexed tables and HD video chapter metadata still disagree on Daylight27 roof versus central pillar; image/frame retrieval failed. Sunset32/36/40 retain the supported white-orb Glide sweep, with individual pipe order unresolved. |
| KH2-004 — Visual puzzle assembly | closed | All six actual gameplay puzzle grids were visually inspected: four 3-column×4-row boards and two 6×8 boards. Awakening/Daylight are placement-only; Heart/Duality/Frontier/Sunset permit rotation. Canonical records supply row-major tile placement, upright artwork landmarks and solved-image references. Starting rotations depend on saved board state and are not a fixed factual input sequence. |
| KH2-005 — Maps/documents/reward areas | closed | All 40 maps (25 chest aliases/15 direct), sixteen documents (ten chests/five Silhouettes/one assembly), three proofs and four charms are normalized. All 13 report and 18 magic areas explicitly match world Rewards/Bonus tables using FM columns. verified-reward-areas.json records all 31 event-area patches; no boss-room inference. |
| KH2-006 — Equipment catalog and shops | partial | All 131 equipment records remain integrated. Dark Anklet missability is resolved: talk to Mogjiro in Disney Castle’s Library before the Badlands portal appears to copy his stock permanently to the hub armor shops. Exact retail stage/room predicates for every shop item remain incomplete; a decoded randomizer shop table was rejected as modified. |
| KH2-007 — Ability/AP/acquisition matrix | closed | All 167 scoped definitions now expose FM AP, effects and Dream/Critical/Form/equipment grants. Lucky Lucky is 1+0.5n for equipped active-party copies. References are not a false 167-item Sora completion goal. |
| KH2-008 — Forms and activation | closed | All five FM EXP curves and Form cap rules are integrated; Final first-replacement probabilities 3/9/27/75, Anti points/bands and Light & Darkness eligibility are recorded. Original-KHII probability curves are excluded. |
| KH2-009 — Summon progression | closed | Full FM cumulative EXP 0/6/22/47/89/152/250 and caps 3/4/5/7 are corroborated by the pinned, explicitly FM OpenKH fixture/parser and separate PC ReFined cap code. Three Drive bars and two present allies are required; unconscious allies qualify. Per-consumed-bar EXP is integrated. This is source-derived repository evidence, not a new retail extraction. |
| KH2-010 — Moogle collection list | closed | All 54 goals and 60 material ranks are integrated, including all-rank sets, Manifest A, Lost S and Orichalcum thresholds. Pinned MICO input supplements community guides and is explicitly not a new retail extraction. |
| KH2-011 — Synthesis reconciliation and progression | closed | All 30 base recipes and 59 outputs reconcile to the pinned FM MIRE input; all 9 Moogle EXP levels, unlock classes, Bright doubling and level 4 two-modifier behavior are recorded. Serenity modifier evidence remains item/FM-table-derived. |
| KH2-012 — Bulky Vendor actions | closed | All five room-specific scenery actions and a modern reset route are integrated. An old Bazaar second-spawn bug is not promoted to a universal Steam fact; exact global spawn probabilities were not invented. |
| KH2-013 — Mushroom gates and tactics | closed | VII appears after the late Twilight Town story episode ending with Axel’s passage into TWTNW; XII after the Oathkeeper/Limit Form visit, except during the later mansion episode. Japanese EP1/EP2 naming is mapped to named events using FM/HD guides and integrated into prerequisites. |
| KH2-014 — Optional battle guidance | closed | Five Silhouettes, thirteen Data rematches, Sephiroth and Lingering Will have access/rewards and practical edition-selected tactics. The Cavern has a working Growth route; all thirteen Data gates are normalized. Full attack/frame walkthroughs are not required for the acquisition scope. |
| KH2-015 — Cup rounds and rules | closed | All eight cups/120 rounds remain integrated. FM-specific KHGuides and AppMedia corroborate 25 MP for party Limits in normal and Paradox Pain/Panic. The unscoped half-cost claim is rejected; the Rapid Thruster tactic now correctly names round8. |
| KH2-016 — Minigame targets and routes | closed | All 23 prior targets now have modern corroboration, room/NPC/start and practical guidance; Hayner100 margin verified, Grandstander corrected to Station Heights. Sand Slider display name retains the old stable ID. Added Chasm repeat clear. |
| KH2-017 — Atlantica songs | closed | All five songs have records, requirements, inputs, repeat conditions and rewards. Qualitative Ariel-gauge success is retained without inventing a number. |
| KH2-018 — Gummi rank/treasure/blueprint dependencies | closed | All 27 normal rank ladders/treasure lists and 54 mission-mode goals are integrated. Forty main blueprints and all 19 automatic Teeny dependencies are covered. Material/G variants share one inventory stock, so the alleged missing shape/color prerequisite was false. The guide does not assert an unproved numeric Steam denominator; completing all main unlocks covers their Teeny children. |
| KH2-019 — Bestiary census and combat values | partial | All 127 combat groups/227 contexts remain integrated. Pinned ENMP rows plus the published level formula now supply I–XII base HP/STR/DEF/EXP, including IV’s phased HP. Runtime labels them as base sheets, not trial hit goals. Complete script overrides and XIII unused/internal attributes remain uncertified. |
| KH2-020 — Journal Limits | closed | All 21 required entries (14 party, seven summon) are normalized with command/access/recording instructions. Four Limit Form moves are explicitly separate from this Journal denominator. |
| KH2-021 — Mickey rescue | closed | Ten eligible encounters, chance-history100/80/64/50 and charge/revive actions are integrated; arbitrary deaths do not qualify and Mickey cannot deliver the finishing blow. |
| KH2-022 — Optional discount controls | implementation | Research is closed: Energy and rank reductions halve and round up per craft. Optional planner controls remain engineering work; live base costs and mandatory Ultima handling stay explicit. |
| KH2-023 — Known encounter gates reach runtime | closed | Known Mushroom and all five Silhouette world/area/prerequisite conditions now propagate, including Lexaeus temporary inaccessibility. |
| KH2-024 — Sephiroth/Lingering Will/proof records | closed | Dedicated fights and three proof aliases now reuse their actual acquisition state. Data clear does not silently mark its chest opened. |
| KH2-025 — Recipe provenance/relationships | closed | All 59 recipes emit source arrays; sixteen documents link acquisition identities and output relationships. UI citation blocks are not reintroduced. |
| KH2-026 — Historical recipe conflicts | closed | Shock Charm, Moon/Star, Mythril upgrade, Manifest rank, Firagun modifier and rejected extra Shadow Archive ingredient corrections remain selected and tested. |
| KH2-027 — Historical raw costs/EXP | closed | Raw Petite3, Ultima Serenity Crystals3/paid2 and Orichalcum+13/paid7, and Centurion/Frozen EXP51 remain correct. |
| KH2-028 — Historical treasure identity/coverage | closed | Prior count/item/branch corrections remain; exact route expansion is KH2-002. Disney Castle07 stays Mythril Shard: explicit FM world table, HD walkthrough and pinned chest248 agree; KHGuides duplicate Blazing Shard is rejected. |
| KH2-029 — Historical puzzle scope/movement | closed | All 144 directions and Sora Daylight23 scope remain. Working movement routes suffice; theoretical minima are not invented or required. |
| KH2-030 — Historical material-source corrections | closed | All selected Bright/Dark/Serenity/rate/Orichalcum corrections remain. Active prose tables now derive from canonical drop rows instead of preserving wrong September rates. |
| KH2-031 — Steam50 and prologue16 | closed | Fifty Steam goals and sixteen separate Roxas prologue chests remain; no PlayStation platinum or KH1 blueprint count leaks into KH2. |
| KH2-032 — Historical equipment/magic corrections | closed | Thirty-three legacy accessories, Luxord Magnet, FM Sweet Memories/Meteor Staff/Genji Shield abilities and element-upgrade grants remain selected. |
| KH2-033 — Mushroom reward bands | closed | Twelve full material/weapon tables retain separate thresholds; IV has no A/S even though its B weapon table can award Majestic Mushroom+. |
| KH2-034 — Cup/Lingering Will gates | closed | Titan Olympus episode2 and Cerberus/Hades Form lists exclude Limit; Lingering Will story/clear-save rule remains. Detailed new tables are KH2-014/015. |
| KH2-035 — Gummi FM S/EX normalization | closed | All 54 mode records retain FM scores/EX constraints, with lower ranks and full dependencies now integrated under KH2-018. |
| KH2-036 — Legacy SQL/workbook inspection limits | provenance | Original workbook helper columns and full SQL statements were not retroactively certified. Current source-backed catalogs supersede their placeholders; historical access metadata cannot be reconstructed by rewriting old logs. |
| KH2-037 — Evidence strength and representative farms | confidence | Multiple wiki pages are not independent corroboration. Representative postgame farms do not claim every room/stage spawn. These are explicit evidence boundaries, not an extra missing factual catalog. |
| KH2-038 — Modern platform boundary | platform | Steam English HD FM remains the target. Official Square Enix page reopened October1 confirms October8 editions are announced; no unreleased-build parity or actual retail execution is claimed. |
| KH2-039 — UI and Data Jiminy | implementation | App/device acceptance and future grounded-answer evaluation are engineering. Copperminds remain flushed with zero thoughts; this research does not reseed them. |
| KH2-040 — Explicit acquisition-scope boundary | excluded | Biographies, story transcripts, mathematical minimum-movement proofs, exhaustive every-stage spawn maps and all secondary munny/orb details remain excluded from this acquisition-data audit; do not silently count them as completed research. |

Focused follow-up of all five partial findings: [continuation report](research-continuation-2026-10-01.md), including new source-derived Mushroom parameters and three remaining factual families.

Full source investigation and residuals: [current resolution ledger](research-resolution-2026-10-01.md). The original narrative and appendices below remain anchored to `f933ab1`; their open/unverified labels are historical, not current work status.


## Historical repository-only audit

Audit date: **2026-10-01**. Repository baseline: **`f933ab1`**, branch `research/audit-2026-10-01`. Edition: **English modern Final Mix in Steam HD 1.5+2.5**. This is an audit of repository evidence, not new external research, a new game-fact certification, or an implementation change.

## Result and method

**40 deduplicated findings: 21 open factual/coverage questions (KH2-001–021), 4 researched-but-unintegrated items (022–025), 10 resolved/historical families (026–035), 3 provenance/edition limits (036–038), and 2 implementation/UI/excluded-scope families (039–040).** P1 means a misleading live instruction or a missing acquisition/completion dependency; P2 means missing factual detail or category coverage; P3 means evidence metadata/maintenance. Counts are issue families, not a count of bad records. A missing optional field alone is not evidence that a game fact is unknown.

Read the entire KH2 pack, September 27/28 follow-ups, specification/readiness, generator/runtime catalog, source/legacy manifests, relevant shared contracts, journal/UI/implementation reports, source-attribution page and content fixtures. Scanned tracked text for KH2 references and hedge/placeholder/conflict vocabulary, then inspected all 301 treasure instructions, 144 puzzle instructions, 48 JSON material source sets, 12 Mushroom rank tables, 27 normal/EX mission pairs, 50 achievement conditions, 16 prologue records and all non-collectible category shapes. Compared later evidence and generated values before assigning current status. No generator was run because it writes the catalog. No external source was reopened: source URLs below are existing leads, not newly verified evidence.

The runtime contains **834 entries and 59 recipes**. Every entry has a `sources` value; none has an `uncertainty` field. Therefore searching only visible uncertainty strings would miss most remaining coverage gaps. Counts: treasures 301, puzzles 144, prologue 16, materials 60, Bestiary 67, Gummi 66 (54 missions + 12 blueprints), achievements 50, Keyblades 24, magic 18, Forms 5, reports 13, summons 2 direct records + 2 chest aliases, Mushroom goals 13, optional battles 18 (5 Silhouettes + 13 Data), cups 8, minigames 23, assembly 6. Seven chest aliases cover five Torn Pages and two charms. These counts overlap in meaning and are not an official complete Journal denominator.

Evidence precedence: current canonical JSON/recipe rows and generator behavior, then September 28, September 27, and lastly September 18 candidate prose. The old readiness table explicitly says it is historical (`ai_docs/readiness/kingdom-hearts-ii-final-mix.md:7`). `ai_docs/testing-and-content-validation.md:5–11` removes any requirement for the user to supply an in-game playthrough. A source-backed fact is not reopened merely because no executable was run.

Coverage inventory:

- All 18 pre-audit files under `ai_docs/games/kh2fm/`; `ai_docs/games/kingdom-hearts-ii-final-mix.md`; `ai_docs/readiness/kingdom-hearts-ii-final-mix.md`.
- `src/games/kh2fm.ts`, `src/games/kh2fm/generate.py`, `src/games/kh2fm/catalog.ts`, `src/journal/Kh2Journal.tsx`, shared `src/games/GuideJournal.tsx` routing/rendering references, KH2 stylesheet, `tests/kh2-content.test.ts`, relevant KH2 sections of multi-game/e2e fixtures.
- `ai_docs/implementation/kh2fm-rollout.md`, `ai_docs/implementation/kh2fm-faithful-journal-mvp.md`, `ai_docs/ui/kh2fm-new-ui-plan.md`, `ai_docs/ui/references/kh2fm/README.md`, `public/assets/kh2-journal/README.md`, `public/kh2-content-sources.html`, README attribution.
- `ai_docs/02-content-inventory.md`, shared product/decision/readiness/implementation indexes, `ai_docs/research/parallel-game-research.md`, `ai_docs/sources/khtables-drive-audit.md`, collectible/synthesis/validation contracts. Other-game comparisons mentioning KH2 were screened; they do not introduce another KH2 dataset.
- `games/kh2fm.html` contains menu placeholders, not usable KH2 factual records. `bosstables.html` and legacy navigation were screened; unrelated game's facts and generated JavaScript/vendor/build copies are excluded. Remote workbook/SQL contents are represented by the checked-in extraction/manifest; unavailable raw remote documents were not silently claimed as re-read.

Generated copies are **not independent findings**. Appendix A maps each treasure candidate to its canonical route. Appendix B preserves every old puzzle-candidate caveat and current route. Appendix C enumerates every equipment candidate. Appendix D enumerates all remaining relevant runtime records/fields with their generator source; it also lists recipes. Generated catalog locations are provided there for navigation, not separate issue counts.

## Prioritized factual gap ledger

### KH2-001 — P1 — Orichalcum+ collector predicate remains internally unresolved

**Status: open factual predicate; live instruction needs reconciliation.** What exact deposited-material count/set qualifies for the Orichalcum+ collector reward, including whether its own material type is excluded and when the reward is claimed? A seven-source checklist is supplied, but one acquisition cannot be explained by a potentially circular requirement.

Affected: `kh2fm.materials.orichalcum-plus.instructions`; downstream `kh2fm.recipe.ultima-weapon`; `kh2fm.achievements.craftsman` collection-list dependency. Current generator says **“deposit all 60 material types”** (`src/games/kh2fm/generate.py:73`), while the source notes explicitly leave **“collector threshold excluding its own reward, and claim timing”** open (`ai_docs/games/kh2fm/materials-and-equipment.md:45`). The September 28 correction concerns ordinary Orichalcum at 55 unique/1,000 total, not this question (`ai_docs/games/kh2fm/data-gap-audit-2026-09-28.md:11,45–46`). Existing leads: KH Wiki Orichalcum/Moogle Shop, Freedom-Kona FM collection list, pinned KH2Randomizer MICO table in that audit. Do not substitute a guessed 59/60 rule in this audit.

### KH2-002 — P1 — Remaining treasure orientation, numbered-position discrimination and access rules

**Status: open, partly improved.** Which precise landmark/approach distinguishes each unresolved chest, and which revisit/movement conditions matter? All 301 have nonempty text; that does not make every route exact. **232 routes cite only the workbook**; 45 add another guide, and 24 Cavern routes use Gamer Guides. All 301 retain older candidate “rewrite + route QA”/missing-text occurrences; Appendix A separates the current source profiles and enumerates every ID and location.

Examples: `kh2fm.treasure.twilight-town.07` says **“that green-roofed building”**, referring to the previous chest; `.16/.17/.18` use bushes/right/left with no entry orientation; `kh2fm.treasure.radiant-garden.17/.18/.19/.20` say only left/right; Agrabah `.10/.11/.12` all say **“Among booths”**. Even source-reviewed Cavern `.44/.45` both say **“Beside the computer terminal”** and `.23–.43` lack a consolidated working access route. This is missing usable positioning, not an assertion that contents/counts are wrong. All Sora chest `missability` fields are absent; verify material exceptions rather than inventing blanket flags.

Locations: `ai_docs/games/kh2fm/treasure-candidates.md:3–7` and each row in Appendix A; `treasure-locations.json:4` and Appendix A; `world-collectibles.md:37,86`; `data-gap-audit-2026-09-27.md:15,43`; `data-gap-audit-2026-09-28.md:53`; `src/games/kh2fm.ts:7`; `ai_docs/readiness/kingdom-hearts-ii-final-mix.md:31,61`. Existing leads: per-world KH Wiki tables, original workbook, KHGuides treasures, GameFAQs #42381/#42235 and Cavern walkthrough already cited in canonical rows. The 17 September 28 changes are resolved improvements, not grounds to reopen their corrected directions (KH2-028).

### KH2-003 — P2 — Thirteen puzzle routes still give movement without a landmark

**Status: open exact-direction detail, distinct from resolved minimum-ability disputes.** The `instructions` for Daylight **14, 16, 22, 28, 39** and Sunset **12, 20, 21, 25, 37, 42, 43, 47** contain movement only. For example, Daylight 14 is **“Route: use LV2 High Jump and LV2 Aerial Dodge.”** Area is known, but the takeoff point and crown position are not explained. Sunset 37 also does not state a sufficient level for its Glide/Aerial Dodge route. A working nonminimal route is acceptable; there is no requirement to prove the theoretical minimum.

Affected IDs, exact JSON lines and old candidate occurrences: Appendix B, marked KH2-003. `src/games/kh2fm/generate.py:28–35` replaces old caveats with these JSON instructions; `ai_docs/games/kh2fm/data-gap-audit-2026-09-27.md:16` claims instructions for all 144 but does not add landmarks to these thirteen. Existing leads: each row's Puzzle/KHGuides/WalkthroughWizard sources. Historical Daylight 14 movement disagreement is resolved by a stated working route (KH2-029); the separate location omission remains.

### KH2-004 — P2 — Exact puzzle grid/visual solution data is still absent

**Status: partial resolution.** For all six `kh2fm.assembly.*-assembly` records (Awakening, Heart, Duality, Frontier, Daylight, Sunset), record grid dimensions, unambiguous final tile positions and an accessible orientation reference. Runtime says **“continue across and down in number order”** and rotate until artwork is upright, but stores no dimensions/tile solution. Arbitrary current-board rotation counts are not a fixed game fact and are not demanded.

Locations: `ai_docs/games/kingdom-hearts-ii-final-mix.md:36`; `ai_docs/games/kh2fm/world-collectibles.md:39–54`; `ai_docs/games/kh2fm/README.md:28`; `ai_docs/readiness/kingdom-hearts-ii-final-mix.md:34,63`; `src/games/kh2fm/generate.py:90`. Later evidence: September 27 audit `:17` and readiness `:7` correctly close absence of basic numbered assembly instructions; those instructions do not supply the residual exact grid data. Lead: existing KH Wiki Puzzle numbering/solution reference.

### KH2-005 — P1 — Direct maps/rewards and acquisition sets are incomplete

**Status: open factual inventory/normalization, partly researched.** Enumerate the complete modern map acquisition set, directly awarded collectible rewards and their exact locations/claim actions, plus the intended per-world denominator. Which records are direct awards versus existing chest aliases? Maps have no category/catalog; `Navigator` says collect all maps without a dependency checklist. The five silhouette recipe rewards and Rare Document are known, but recipe-document acquisition links are not a complete normalized sixteen-document index. Report grants are known; their exact area IDs/modern area labels remain incomplete. All 13 report rows and all 18 magic rows lack `area`, as do both direct charm records; an event named in prose is not automatically a missing fact, but the explicit unresolved location normalization remains.

Affected: `kh2fm.achievements.navigator`, `kh2fm.reports.secret-ansem-report-1` through `-13` (individually enumerated in Appendix D), all magic/direct charm IDs there, chest maps/recipe documents in Appendix A, five Silhouette rewards, `kh2fm.assembly.duality-assembly`, seven Orichalcum+ acquisition relations. Excerpt: **“Direct reward/map inventory, area IDs and aggregate deduplication remain incomplete.”** `ai_docs/readiness/kingdom-hearts-ii-final-mix.md:35,62`; `ai_docs/games/kingdom-hearts-ii-final-mix.md:27–32`; `ai_docs/games/kh2fm/world-collectibles.md:3,35,58–60,64–86`; `src/games/kh2fm/generate.py:31–32,87–90,108–109,125–131`. Leads: already cited world tables, Ansem's Reports, Recipe and Summon Charms. The 445 treasure/piece denominator is deliberately narrower and is not itself an erroneous total.

### KH2-006 — P1 — Complete equipment catalogs, modern stats and acquisition conditions

**Status: open; some item acquisitions/recipes already known.** Verify every weapon/armor/accessory's modern name, inventory membership, STR/MAG/DEF/AP/resistances/abilities where applicable, shop price/gate, enemy chance, synthesis/reward source, repeatability and missability. The **115 named legacy candidates** comprise 24 Keyblades +12 staves +12 shields +34 armor +33 accessories. The staff/shield inventories explicitly omit FM additions; absent names must be recovered, not guessed. Appendix C enumerates every named candidate and its unverified/absent fields. Runtime contains 24 acquisition-only Keyblades; it has no full equipment-stat table. Recipes and Mushroom weapon reward prose supply some additions, but do not constitute full staff/shield catalogs.

Excerpt: **“12 staff/12 shield lists omit Final Mix additions and cannot certify full inventories.”** `ai_docs/games/kh2fm/materials-and-equipment.md:55,84–86`; `equipment-candidates.md:3–143`; `ai_docs/readiness/kingdom-hearts-ii-final-mix.md:38,65`; `data-gap-audit-2026-09-28.md:55`; `src/games/kh2fm/generate.py:77–84,121–122`. Specific one-time gap: Medal (lose to Setzer) versus Champion Belt alternative needs scope/missability rules (`materials-and-equipment.md:86`); prologue chest work does not resolve Struggle reward alternatives. Existing leads: Freedom-Kona #48143, KH Wiki item/Staff/Shield/Armor/Accessory tables, recipe and Mushroom sources. Known FM Lucky Lucky replacements are resolved facts (KH2-032), not still disputed.

### KH2-007 — P1 — Ability/AP/level-choice/Critical/party matrix

**Status: open factual catalog.** Which action/support/Growth ability belongs to which character or Form, how much AP does it cost, how is it obtained under each level-choice/Critical path or equipment grant, and what stacking/effect limits apply where acquisition/farming depends on them? This includes the missing numeric Lucky Lucky effect/stacking model; displayed drops deliberately remain base probabilities. The 167 inspected source rows are not 167 collectible Sora abilities.

Excerpt: **“Ability AP costs and acquisition mapping remain partial; the legacy Abilities tab contains no values.”** `ai_docs/games/kh2fm/materials-and-equipment.md:98`; `sources-and-legacy-audit.md:19,46,53,64`; `ai_docs/games/kingdom-hearts-ii-final-mix.md:57`; `ai_docs/readiness/kingdom-hearts-ii-final-mix.md:39,65`; `src/games/kh2fm.ts:8–26` has no abilities category. No canonical ability IDs exist to enumerate; the explicitly known Growth names are High Jump, Quick Run, Dodge Roll, Aerial Dodge, Glide (Form IDs in Appendix D). Leads: Abilities_(KHII), Lucky_Lucky and Freedom-Kona already listed in the pack.

### KH2-008 — P2 — Form EXP thresholds, level caps, Final/Antiform activation mechanics

**Status: open beyond the supplied EXP units and Growth mapping.** Supply each Form's numeric EXP thresholds/caps and level unlock predicates, Final Form's actual first-activation probability/conditions and the relevant Two Become One/Antiform behavior. Runtime Final Form says only **“After Roxas; first random activation unlocks menu use.”** Antiform is otherwise an achievement count, not usable activation guidance.

Affected: `kh2fm.forms.valor-form`, `.wisdom-form`, `.limit-form`, `.master-form`, `.final-form`; `kh2fm.keyblades.two-become-one`; `kh2fm.achievements.corroded-by-darkness`. `ai_docs/games/kh2fm/materials-and-equipment.md:90–98`; `ai_docs/games/kingdom-hearts-ii-final-mix.md:59`; `src/games/kh2fm/generate.py:83–84`; achievement JSON entry and catalog lines in Appendix D. Leads: five Form pages and Drive_Form in the existing source manifest. Standard Growth 1/2/3 at Form 3/5/7 and MAX belonging to the Form are already supplied and are not open.

### KH2-009 — P2 — Summon progression and party restrictions

**Status: open.** Exact shared summon EXP behavior, numeric level thresholds/caps and party-use restrictions are not extracted. Four charm acquisitions are known and represented (two chest aliases); cup unlocks depend on summon levels 5/7 but the guide cannot explain how those levels are earned.

Excerpt: **“Summon EXP/level thresholds and exact party-use restrictions remain research tasks.”** `ai_docs/games/kh2fm/materials-and-equipment.md:113`; `ai_docs/readiness/kingdom-hearts-ii-final-mix.md:39,65`; `sources-and-legacy-audit.md:177–178`; `src/games/kh2fm/generate.py:108–109`. Affected `kh2fm.summons.baseball-charm`, `.lamp-charm`, `kh2fm.treasure.radiant-garden.14`, `kh2fm.treasure.port-royal.15`, cups `titan-paradox`/`hades-paradox`; confirm exact chest alias IDs against Appendix A/D. Existing leads: Summon and Summon_Charms.

### KH2-010 — P1 — Complete Moogle collection-list requirements and rewards

**Status: open full table, individual corrections resolved.** What is every FM collection-list condition/reward, including complete material rank membership and all claim thresholds? `Craftsman` requires **“complete every collection list”**, but there is no full table. The current 55-type/1,000-total ordinary Orichalcum, A-rank Manifest, S-rank Lost and purchase-deposit thresholds are supplied; do not reopen these corrected values. The self-exclusion issue is separately KH2-001.

Affected: `kh2fm.achievements.craftsman`; all 60 material records' rank/collector relations (Appendix D), specifically `kh2fm.materials.orichalcum`, `.orichalcum-plus`, `.manifest-illusion`, `.lost-illusion`. `ai_docs/readiness/kingdom-hearts-ii-final-mix.md:64`; `ai_docs/games/kingdom-hearts-ii-final-mix.md:44`; `src/games/kh2fm/generate.py:62–76`; `verified-steam-achievements.json` Craftsman row in Appendix D; `data-gap-audit-2026-09-28.md:40–48`. Leads: Moogle Shop, Freedom-Kona collection list, pinned MICO table.

### KH2-011 — P2 — Full synthesis-menu reconciliation and remaining progression/modifier detail

**Status: open narrow coverage validation; discount arithmetic solved.** Independently reconcile the 30-base/59-output set against a complete FM menu/input table, including all unlock/first-creation exceptions, Moogle EXP thresholds and Bright's exact EXP factor/tier/quantity rules. Current prose says only **“Bright affects EXP”** and lists levels enabling modifier types; no complete numeric EXP progression or Bright modifier table exists. The recipe file itself says it is **“not a claim that the game menu has been independently reconciled.”** The pinned template comparison establishes selected recipe rows, not a documented full 59-row reconciliation.

Affected: all 59 recipe IDs/ingredients/instructions in Appendix D; material records `bright-shard`, `bright-stone`, `bright-gem`, `bright-crystal`; future Moogle progression data (no IDs yet). `ai_docs/games/kh2fm/synthesis-recipes.md:3–5,19,23–52,56–60`; `materials-and-equipment.md:49`; `ai_docs/readiness/kingdom-hearts-ii-final-mix.md:53,64`; `data-gap-audit-2026-09-28.md:36–48`; `src/games/kh2fm/generate.py:37–51`. Leads: Synthesis, actual FM guide and pinned MIRE input. Energy/Moogle halving, per-craft rounding and rank-level unlocks are resolved; implementing them is KH2-022.

### KH2-012 — P2 — Bulky Vendor room/build spawn exceptions

**Status: open narrow qualification.** Are the reported room/edition-specific spawn bugs applicable to Steam modern FM, and what exact object/spawn/reset action works in each of Checkpoint, West Hall, Cave of the Dead: Entrance, Bazaar and Candy Cane Lane? Generic scenery interaction and five candidate rooms are supplied; HP bands/reward chances are solved.

Excerpt: **“Room/edition-specific reported spawn bugs need independent validation before becoming route instructions.”** `ai_docs/games/kh2fm/materials-and-equipment.md:29`; `src/games/kh2fm/generate.py:60,70–71`; all Bulky Vendor drops in `verified-material-sources.json` enumerated in Appendix D. Affected `kh2fm.materials.serenity-shard`, `.serenity-stone`, `.serenity-gem`, `.serenity-crystal`, `.orichalcum`. Lead: existing Bulky_Vendor page. This is not an instruction to make the user reproduce a bug.

### KH2-013 — P2 — Mushroom appearance predicates and practical challenge strategies

**Status: open for missing predicates/strategy; rank rewards resolved.** Determine appearance/access conditions for Mushrooms IV–XII and practical controller-neutral objective strategies for I–XII. I/II/III appearances after Xemnas/Experiment/Xaldin and XIII's final claim are already researched; row integration is KH2-023. Full weapon/material bands, quantities and probabilities are present; do not reopen them under the old blanket warning.

Affected all 13 `kh2fm.mushrooms.mushroom-xiii-N` IDs in Appendix D, with missing conditions specifically 4,5,6,7,8,9,10,11,12. Excerpt: **“every appearance condition and controller-neutral strategy directions remain unverified.”** `ai_docs/games/kh2fm/challenges-records-and-gummi.md:25–27`; `ai_docs/readiness/kingdom-hearts-ii-final-mix.md:40,66`; `src/games/kh2fm/generate.py:93,110–123`. Leads: existing Mushroom XIII wiki and Gamer Guides. Prize-orb/munny ambiguity is separately excluded/provenance KH2-040.

### KH2-014 — P2 — Optional encounter and Cavern acquisition guidance

**Status: open practical guidance; several unlock/reward facts already solved.** Flesh out Cavern traversal's sufficient movement/access route, each Data member's actual enablement condition where generic text is insufficient, and acquisition-focused tactics/reward receipt guidance for Silhouettes/Data/Sephiroth/Lingering Will. Generic Data prerequisite **“Defeat the original member or Absent Silhouette. A game clear is required for the full set”** does not identify which records need what. Exact Lingering Will all-worlds/clear-save gate and repeat Manifest reward are already researched; missing standalone encounter records are KH2-024.

Affected 18 battle IDs and Cavern treasure `.23–.46` in Appendices A/D; named absent standalone records Sephiroth and Lingering Will. `ai_docs/games/kh2fm/challenges-records-and-gummi.md:33–55`; `ai_docs/games/kingdom-hearts-ii-final-mix.md:66–68`; `ai_docs/readiness/kingdom-hearts-ii-final-mix.md:41,66`; `src/games/kh2fm/generate.py:94–96`; `sources-and-legacy-audit.md:77,135,154`. Leads: existing Absent Silhouette/Replica Data/Lingering Will battle pages, HD achievement guide, Fenrir and Cavern walkthrough. An exhaustive combat walkthrough is excluded; sufficient acquisition guidance remains in scope.

### KH2-015 — P2 — Cup round/rule/strategy detail

**Status: open, access conflicts resolved.** Complete eight cups' round rosters, rule effects and practical scoring guidance, including Hades rule changes by ten-round block. Exact Limit-cost changes/special Drive behavior are only qualitatively described. All eight score targets and listed unlocks/rewards exist; Titan and Limit-Form inclusion disputes were settled September 27.

Affected every `kh2fm.cups.*` ID in Appendix D; missing `instructions` rule/strategy detail. Excerpt: **“Full round rosters and tactic coverage are still incomplete.”** `ai_docs/games/kh2fm/challenges-records-and-gummi.md:59–74`; `ai_docs/readiness/kingdom-hearts-ii-final-mix.md:42,66`; generator `:97`. Leads: individual cup pages and Final Mix Paradox Cup guide. Separate clear/high-score/reward state is implementation, not another factual dispute.

### KH2-016 — P1 — Legacy minigame target verification and acquisition/strategy detail

**Status: open source verification and missing practical detail.** Independently verify all 23 legacy-transcribed targets/comparators and obtain room/NPC start actions, access predicates, rewards and controller-neutral tactics. Runtime records give a world and target only. Excerpt: **“factual target transcription, not a declaration of modern platform verification.”** Upper-bound/count/margin distinctions matter, particularly Hayner/Setzer/Seifer and Junk Sweep.

All 23 `kh2fm.minigames.*` IDs, target excerpts, exact table/generator/catalog locations are in Appendix D. `ai_docs/games/kh2fm/challenges-records-and-gummi.md:78–104`; `sources-and-legacy-audit.md:25,38` (**“See here”** legacy strategy placeholders); `ai_docs/readiness/kingdom-hearts-ii-final-mix.md:42,66`; generator `:98–99`. Existing leads: original Missions and Minigames sheet, cited KH Wiki Minigames and world/activity pages. Correct interpretation ≤5 hits is already recorded; this does not itself independently validate the entire target set.

### KH2-017 — P1 — Five Atlantica song/replay records and exact access/reward predicates

**Status: open full normalization/extraction.** Extract all five named song records, exact unlock prerequisites, replay objective/target semantics and reward links for Blizzard, Mysterious Abyss and Orichalcum+. Source notes mention the five repeat performances but do not enumerate them as a table; current minigames has no Atlantica records. “Ursula's Revenge” and “A New Day is Dawning” are named leads, not a complete five-record set.

Excerpt: **“Song rewards needed for Blizzard, Mysterious Abyss and Orichalcum+ remain explicit acquisition instructions.”** `ai_docs/games/kh2fm/challenges-records-and-gummi.md:106`; `materials-and-equipment.md:41,45,74,107`; `ai_docs/games/kingdom-hearts-ii-final-mix.md:66`; generator `:73,85–87,98–99`. Affected `kh2fm.magic.blizzard-atlantica-completion`, `kh2fm.keyblades.mysterious-abyss`, `kh2fm.materials.orichalcum-plus`; missing song IDs are not invented. Leads: Missions workbook, Atlantica world/activity references.

### KH2-018 — P1 — Gummi completion beyond S-rank targets

**Status: open.** Complete lower-rank score/reward tables, route treasure enemies and their acquisition conditions, all sample-model block-ownership requirements, Teeny Ship dependency/count rules, route unlock facts and a complete blueprint achievement dependency set. Existing twelve special-model rows describe Kingdom/Secret only as mission treasures without the actual enemy/route action. The 28-sample/12-special main-ship count explicitly excludes Teeny children; it is not the complete Steam blueprint denominator.

Affected all 66 `kh2fm.gummi.*` IDs in Appendix D, specifically `.kingdom-blueprint`, `.secret-blueprint`, and `kh2fm.achievements.gummi-ship-collector`; absent sample/Teeny IDs cannot be enumerated before extraction. Excerpt: **“lower-rank prizes, route treasure enemies and the complete blueprint dependency list are not [present].”** `ai_docs/games/kh2fm/data-gap-audit-2026-09-28.md:56`; `challenges-records-and-gummi.md:110–129`; `ai_docs/readiness/kingdom-hearts-ii-final-mix.md:43,67`; `src/games/kh2fm.ts:7`; generator `:100–107`. Sources: nine route pages in `verified-gummi-missions.json`, Blueprint and Gummi Missions. All 54 S targets/27 EX constraints and the “all blueprints” achievement wording are resolved.

### KH2-019 — P2 — Bestiary breadth and combat statistics

**Status: open declared catalog breadth, not a defect in the material-source index.** Establish full modern enemy/boss membership and the acquisition-relevant combat/stat/resistance/reward data beyond synthesis materials. Current Bestiary is deliberately **67 material-source enemies**, generated solely from nonconditional drops, with no HP/STR/DEF/EXP/resistance/behavior fields. Conditional encounters and enemies with no represented material are excluded by construction. It does not prove complete Heartless/Nobody Journal membership.

Affected all 67 `kh2fm.bestiary.*` records in Appendix D, plus `kh2fm.achievements.heartless-highbrow` and `.nobody-know-it-all`. `src/games/kh2fm/generate.py:132–142`; `src/games/kh2fm.ts:7`; `ai_docs/games/kh2fm/data-gap-audit-2026-09-28.md:55`; `sources-and-legacy-audit.md:18,21,53`; `ai_docs/implementation/kh2fm-rollout.md:40,46`. Existing leads: individual enemy sources, legacy 82 descriptions and enemy census. Exhaustive every-room/story-stage spawn inventory and full combat walkthroughs are not required to validate the supplied representative postgame farms (KH2-037/040).

### KH2-020 — P1 — Journal Limit completion lacks an actionable roster

**Status: open acquisition/completion dependency.** Which Limit entries are required, whose commands they are, their access/party requirements, and what action records each in the Journal? `kh2fm.achievements.limit-master` says **“Record every Journal Limit.”** No Limit catalog or list exists in KH2 runtime. This is a missing collectible/record dependency rather than a demand for biography/story transcripts.

Locations: `ai_docs/games/kh2fm/verified-steam-achievements.json` Limit Master row (Appendix D); `src/games/kh2fm.ts:8–26`; `sources-and-legacy-audit.md:50` records legacy schema proposals for limits, not facts. Existing leads: Steam/Exophase checklist URLs attached to achievement, Abilities_(KHII) and original schema/workbook leads. The achievement condition itself is sourced and closed under KH2-031; its actionable dependency table is not.

### KH2-021 — P2 — Mickey rescue opportunity conditions

**Status: open practical achievement guidance.** Which fights/conditions allow Mickey to rescue Sora in this edition, and what action obtains the goal? `kh2fm.achievements.my-hero` only says **“Have Mickey rescue Sora.”** No qualifying encounter or chance/eligibility guidance exists in the pack/runtime. Avoid claiming a random death anywhere is sufficient.

Locations: `ai_docs/games/kh2fm/verified-steam-achievements.json` My Hero row and generated row in Appendix D. Existing leads: attached Steam/Exophase achievement checklists and the already researched relevant encounter pages; no new source inspected. This is missing how-to detail, not an unresolved platform achievement name/condition.

## Researched but not integrated

### KH2-022 — P2 — Optional discount controls and calculation

**Status: solved research; implementation only.** Energy and applicable Moogle reductions halve per-craft ingredient quantities, rounded up; C/B/A/S reductions unlock at 5/6/7/9. Sequential positive-integer rounding equals quarter-once per craft, not rounding after multiplying crafts. Add saved choices, first-craft/Creations handling and modifier costs with arithmetic fixtures before showing discounted totals. All 59 recipe IDs are enumerated in Appendix D; raw-cost instructions deliberately remain live, with mandatory Ultima already paid/rounded.

Excerpt **“This closes the broad factual uncertainty”**: `ai_docs/games/kh2fm/data-gap-audit-2026-09-28.md:16,48,54`; `synthesis-recipes.md:60–64`; generator `:43–50`; UI `src/journal/Kh2Journal.tsx:151–157`. Older open arithmetic occurrences: spec `:52`, readiness `:53,64,84`, September 27 `:42`, rollout `:26–28`. Leads/corroboration: GameFAQs #42870, Synthesis and September 28 comparison. Remaining Bright/progression detail is KH2-011, not reopened halving math.

### KH2-023 — P2 — Known encounter access facts are stranded in prose/world summaries

**Status: researched; row integration missing.** Mushroom I/II/III appearances after Xemnas/Experiment/Xaldin are explicit in `challenges-records-and-gummi.md:25` and some world summaries, but all Mushroom entries have no `prerequisites`; generator `:93,122` does not transfer those predicates. Absent Silhouette rows contain portal/world in `summary`, but no structured `world`/`area`, and omit Lexaeus's temporary inaccessibility stated at `:39`. Affected IDs: Mushroom `1,2,3` and all five `kh2fm.challenges.absent-silhouette-*` listed in Appendix D. Sources already cited: Mushroom XIII, Absent Silhouette. Unknown IV–XII predicates are KH2-013.

### KH2-024 — P2 — Known Sephiroth/Lingering Will/proof records absent from Optional Battles

**Status: researched basic acquisition facts; record creation/linking missing.** Optional Battles has only five Silhouettes and thirteen Data. Sephiroth's Dark Depths/Cloud follow-up and Lingering Will's portal/story/clear-save gate plus first/repeat rewards exist at `challenges-records-and-gummi.md:53–55`; Lingering Will is repeated in `generate.py:75–76`, Fenrir in the Keyblade table `materials-and-equipment.md:80`. Steam goals exist, but no dedicated battle/proof acquisition records or linked crown receipt set beyond the Proof of Nonexistence chest. Affected `kh2fm.keyblades.fenrir`, `kh2fm.materials.manifest-illusion`, achievements `one-winged-angel`/`lingering-will`, `kh2fm.treasure.radiant-garden.46`, Mushroom XIII reward; IDs in Appendix D. Leads: existing Fenrir, Proof, Illusion, Lingering Will and TrueAchievements citations. Detailed tactics remain KH2-014.

### KH2-025 — P3 — Known recipe provenance and relationship metadata not emitted

**Status: source/data integration, not missing ingredient facts.** All 30 canonical recipe rows include sources and unlocks, but generated `CollectionRecipe` objects contain only `id/name/group/ingredients/instructions`; row evidence is not carried as recipe-level `sources`. Recipe-document/material/chest/reward cross-links remain prose rather than normalized relations. This matters for distinguishing provenance-backed instructions from unsupported content, but does not reopen resolved quantities. All 59 recipe IDs in Appendix D. `synthesis-recipes.md:21–52`; `generate.py:38–51`; `ai_docs/games/kingdom-hearts-ii-final-mix.md:30,40–50`; `ai_docs/content/synthesis-and-inventory.md:25`. Existing row URLs are sufficient source leads for integration.

## Resolved and historical caveat ledger

Each family below retains earlier warning occurrences and the later evidence. Appendix rows preserve repeated record occurrences without counting generated copies twice.

| ID / status | Earlier claim or caveat, affected fields | Current resolution and source trail |
|---|---|---|
| **KH2-026 — resolved recipe conflicts** | Shock Charm Gem/Stone reversal; Moon A/S + Gem/Crystal; Mythril Gem upgrade modifier; Manifest A/S; Firagun legacy modifier; Shadow Archive extra Remembrance Shards. Old warnings: spec `:52`; readiness `:37,51–53,57,64`; rollout `:28`; September 27 audit `:18,36,41,50`; materials/equipment `:7`. | `synthesis-recipes.md:9–15,28,35,38,40,51–52`; September 28 `:9,21–27,36–48`; generator `:38–51`; `tests/kh2-content.test.ts:52–67`. Shock uses Lost1/Remembrance Gem1 Stone3/Tranquility Gem1 Stone3; Moon/Star A22, Serenity Gem1; Mythril Crystal Serenity Stone1; Manifest rank A; Firagun Shard1; rejected Shadow extra7 not imported. Recipes individually listed Appendix D. |
| **KH2-027 — resolved raw costs/EXP** | Ultima legacy seven Serenity Shards; Petite two versus three raw Mythril Crystals; Centurion/Frozen Pride legacy EXP78. Readiness `:57`; synthesis `:9–11`; original legacy incomplete recipe inventory (`sources-and-legacy-audit.md:31,46,51,53`). | Canonical synthesis rows `:29,31–34` and generator `:48–50`: Petite/Ribbon raw3; Ultima raw Serenity Crystals3, paid2 with mandatory Energy, raw13 Orichalcum+ paid7, EXP99; Centurion/Frozen EXP51. September 28 `:10,24,43–44`; source comparisons there. No need for user menu screenshot. |
| **KH2-028 — resolved treasure counts/identity/new text and selected branches** | 24 Cavern missing directions; Agrabah24 wrong Serenity tier; canonical name normalization; Spooky Cave14/15 reversed; old 301 candidate rows all say route QA. `treasure-candidates.md:3–7` and every Appendix A row; `world-collectibles.md:86`; readiness `:31,61`; rollout `:32`. | September 27 `:15`; September 28 `:15,53`; current `treasure-locations.json` all301 instructions; `.100-acre-wood.14` right branch and `.15` left, source GameFAQs #42381; 17 named follow-up records mapped Appendix A. Counts/item/area were world-table compared. Remaining precision is KH2-002; no mandatory screenshot verification. |
| **KH2-029 — resolved puzzle coverage/scope/working routes** | 144 candidate “exact-route verification required” occurrences; 16 blank landmarks; Daylight23 Roxas label; Daylight14 competing movement minima. `puzzle-candidates.md:3–5` and every Appendix B row; `world-collectibles.md:33,52,86`; readiness `:33,54,61`; rollout `:32`. | `verified-puzzle-locations.json` has144 instructions; generator `:28–35` removes obsolete caveats; September27 `:16`; readiness `:7`; tests `:9–22`. Daylight23 is Sora, Other Twilight Town. Practical route, not proven minimum, closes R04. Sparse landmarks remain KH2-003; basic assembly now supplied, exact grid residual KH2-004. |
| **KH2-030 — resolved material-source/rate families** | Missing Bright/Dark/FM Serenity; original Nobody Serenity contamination; Fortuneteller/Armored Knight/Surveillance Robot/Devastator/Strafer rates; missing Gargoyle Warrior/Driller Mole/Aerial Champ; Manifest collector rank; first/repeat Lingering Will; ordinary Orichalcum45 versus55. Old materials table `:14–15,21,23,25,29–31`; readiness `:36,52,64`; rollout `:18,40`; September27 `:25–38`. | `verified-material-sources.json`48 sets + generator `:53–76`60 materials; corrected values 10/4/6/12/8%, Gargoyle Warrior10%, Driller Mole Bright3%, Aerial Champ Remembrance8%. September28 `:11,45–46` ordinary Orichalcum55/1000, 45=>AP Boost. Bulky reaction quantities/chances and FM Serenity are present; all material/enemy occurrences Appendix D. Tests `:24–50,86`. Representative farm rooms are supplied; exhaustive populations not claimed. |
| **KH2-031 — resolved Steam50/prologue16 coverage** | Steam23-only, hidden descriptions/duplicate names, legacy PS platinum51, blueprint30 imported KH1; absent Roxas details. `challenges-records-and-gummi.md:133–135`; readiness `:32,44,62,67`; world `:32,86`; rollout `:32,42`; September27 `:44`. | September28 `:12–13,26–32,53–59`; `verified-steam-achievements.json`50 and `verified-prologue-chests.json`16; generator `:143–149`; tests `:70–87`. Gummi achievement says all blueprints. No PS platinum. Prologue has days/rooms/missability; ordering explicitly local. All IDs Appendix D. Platform API IDs are not a missing gameplay condition; further platform differences KH2-038. |
| **KH2-032 — resolved equipment/magic/legacy inventory corrections** | Empty Accessories assumption; Luxord versus Xigbar Magnet; original Lucky Lucky Sweet Memories/Meteor Staff/Genji Shield; 18 hard-coded spell tiers. `sources-and-legacy-audit.md:15,22,36,38,53`; `materials-and-equipment.md:84,102`; readiness `:30,39,57`. | Accessories trailing-space tab recovered33, five actually empty tabs. FM Sweet Memories Drive Converter/+4MAG, Meteor Thunder Boost, Genji Hyper Healing; final Magnet Luxord; magic entries element grants not route-hard-coded tier. Canonical generator `:85–87`; materials `:84,102–113`. Full equipment/AP scope remains KH2-006/007. |
| **KH2-033 — resolved Mushroom reward bands, not every secondary detail** | Old **“Full numeric A/B prize tables”** unverified (`challenges-records-and-gummi.md:27`), readiness `:40,66`, September27 `:44`. | September28 `:14,31,57`; `verified-mushroom-ranks.json`12 tables; generator `:110–123` material quantities + weapon probabilities, separate material/weapon thresholds, IV has no A/S. Tests `:108–117`. Wiki lower tiers are single-source; S and weapon-A corroboration recorded. Appearance/strategy remains KH2-013, orb/munny excluded KH2-040. |
| **KH2-034 — resolved cup gates/Lingering Will basic gate** | Titan vague/conflicting worlds; Limit inclusion in Cerberus/Hades; Lingering Will unlock partial. readiness `:41–42,55,66`; older challenge queue. | `challenges-records-and-gummi.md:53,65,68–72`; September27 `:19`; generator `:75,97`; tests `:104–108`. Titan Olympus episode2; Cerberus Valor/Wisdom/Master5; Hades adds Final7 + summons7 + Space Paranoids episode2, no Limit check; Lingering Will all worlds including Atlantica/100 Acre Wood + final boss + cleared save. Detailed records/strategies remain 014/015/024. |
| **KH2-035 — resolved Gummi S/EX normalization** | Full score/rank/EX table unnormalized; original-KHII mission3 scores; readiness `:43,67`; source manifest `:125–126`; rollout `:32`; September27 old remaining-scope wording. | `verified-gummi-missions.json`9 routes ×3 missions ×2 modes, source per route; September27 `:20`; challenge `:110–112`; generator `:101–107`; tests `:89–102`. All S targets/prizes and27 EX constraints are present. Lower-rank/treasure/blueprint gaps remain KH2-018. |

In that table, short filenames without a directory are under `ai_docs/games/kh2fm/`; `readiness` means `ai_docs/readiness/kingdom-hearts-ii-final-mix.md`; `spec` means `ai_docs/games/kingdom-hearts-ii-final-mix.md`; `rollout` means `ai_docs/implementation/kh2fm-rollout.md`; generator means `src/games/kh2fm/generate.py`. Appendix line maps use full repository-relative paths.

## Provenance, source-access and scope ledger

### KH2-036 — P3 — Legacy/source access limits, not blanket unverified runtime

**Status: provenance limitation.** The remote workbook SQL-helper columns were not fully reviewed; six SQL dumps were scanned, not statement-by-statement certified/executed; stat zeros and seven ability placeholders are explicitly legacy leads. Five truly empty tabs are Colosseum tournaments, Abilities, Mushroom XIII, Nobodies, Absent silhouettes. Equipment/stat and record-strategy consequences are KH2-006/007/016; do not count each SQL copy as another issue.

Locations/excerpts: `ai_docs/games/kh2fm/sources-and-legacy-audit.md:11–55` (**“SQL helper columns … not fully reviewed”**, **“zero placeholders”**); `ai_docs/sources/khtables-drive-audit.md:46–58`; `ai_docs/02-content-inventory.md:25,37`; `games/kh2fm.html:34–66` menu-name placeholders. General “facts unverified” is a historical source warning, superseded for corrected facts.

September28 audit `:21–35` explains GameFAQs full pages robots-blocked/indexed passages read, early “Goo/Stone” tier translation, original-KHII guide cross-listing, shared Gamer Guides/GameFAQs authors not independent corroboration, Kyokugen discrepancies and video-description-only inspection. `:36–46` calls the randomizer input supplementary evidence, not personal retail extraction. Existing source leads/URLs are preserved there. No fact is reopened solely because a source is secondary; no full-source access or menu-frame capture is claimed.

### KH2-037 — P3 — Evidence confidence, row provenance and source-limited coverage

**Status: evidence limitation, mostly accurate.** Treasure numbering is preserved from workbook and compared to community world tables, not independently read from a modern executable (`treasure-candidates.md:3`; readiness `:31`). This is not itself an open numbering contradiction or mandatory game run. Puzzle source text is adapted/attributed; Mushroom lower bands rely on wiki rather than multiple independent tables (`verified-mushroom-ranks.json:6`; September28 `:31`; `public/kh2-content-sources.html:5–9`). Material rooms are representative postgame spawns, not exhaustive/story-stage availability (`verified-material-sources.json:4–5`; September27 `:13`; generator `:58,142`). All applicable record IDs are in Appendices A/B/D.

Single-source lower-rank evidence is a provenance limit rather than 72 invented unresolved rank facts. Likewise `tests/kh2-content.test.ts` checks text presence/counts/selected fixtures; it does not independently prove every game value. Known source resolution lives in canonical JSON, not every old Markdown table.

### KH2-038 — P3 — Other modern editions and announced native releases

**Status: bounded edition evidence, not a Steam blocker.** Japanese/International save compatibility is noted; full genuine modern-platform achievement/gameplay parity is not established. The October8 native releases are recorded as announced/unreleased at this snapshot; do not claim shipped-build parity. Steam50 is supplied; no Steam API identifier map exists, but app-local stable IDs are intentional and no live platform integration is implemented.

Locations: `ai_docs/games/kingdom-hearts-ii-final-mix.md:19–21`; `ai_docs/games/kh2fm/README.md:30–38`; `challenges-records-and-gummi.md:133–137`; source manifest `:194`; readiness `:44–45,67`; `verified-steam-achievements.json:2–3`. Existing leads: official Steam product/global achievements and Square Enix announcement; no new current claim is made in this repository-only audit. Original/non-FM/PS2 compatibility is excluded.

### KH2-039 — P3 — Engineering/UI/test gaps do not count as game-fact gaps

**Status: implementation/UI/testing only.** Data Jiminy KH2 pack/model integration, persistent distinct collected/assembled/claimed or cup-clear/personal-best states, source-aware linked views, app release tests, device validation, provisional world artwork/fonts and native Treasure/Pieces menu fidelity are separate work. User stock “Unknown” is valid state. No screenshot/playthrough requirement is introduced.

Locations: `ai_docs/games/kingdom-hearts-ii-final-mix.md:26,36,47,68,76–78,103–107`; readiness `:69–105`; `ai_docs/implementation/kh2fm-faithful-journal-mvp.md:15–29`; `ai_docs/implementation/kh2fm-rollout.md:34–36,48,54`; `ai_docs/ui/kh2fm-new-ui-plan.md:15,42–66,70`; `ai_docs/ui/references/kh2fm/README.md:7–24`; `src/journal/Kh2Journal.tsx:74–100,150–161`; shared validation `:5–11,15–25`. Existing video only sampled Story screens; local mockup story/counts are not factual production evidence. Older Apple/iPad acceptance wording is superseded by desktop Chrome/iPhone17 direction in shared validation; that is not gameplay uncertainty.

### KH2-040 — P3 — Deliberately excluded details and historical boundaries

**Status: excluded/limited scope, not silently dropped.** Full story/Chronicles transcripts, biography trigger manifests, photo/Album content, original/PS2 support, optimal minimum movement proofs, exhaustive spawn populations and full combat walkthroughs are outside this acquisition pass. Production location images are deferred; exact text is not. Mushroom prize-orb/munny quantities remain ambiguous in the cited wiki and were deliberately not imported (**“the wiki itself flags ambiguity in orb quantities”**, September28 `:57`). That secondary ambiguity is recorded here without pretending it is resolved or required for material/weapon rank correctness.

Locations: `ai_docs/games/kingdom-hearts-ii-final-mix.md:11,13,19,68,109`; `ai_docs/games/kh2fm/data-gap-audit-2026-09-28.md:51–59`; `challenges-records-and-gummi.md:53,137`; `world-collectibles.md:88`; `ai_docs/research/parallel-game-research.md:9,27–34`. Gameplay acquisition questions in KH2-001–021 remain research work despite exclusion of encyclopedic walkthroughs.

## Occurrence appendices

The tables below are exhaustive for repeated candidate rows and relevant runtime IDs at this baseline. Missing future catalogs have no real IDs; the ledger says so rather than fabricating IDs. A category's absence is established by the counted runtime schema and generator paths, not by an empty placeholder table alone.

### Appendix A — All 301 treasure candidate caveats and canonical routes

Every row maps the historical `Location readiness` field (KH2-028) to the current `instructions`/`sources` (KH2-002). W = workbook only (232); K = workbook + KHGuides (23); F = workbook + September28 GameFAQs #42381 (17); O = workbook + GameFAQs #42235 (3); H/S = workbook + Hollow Bastion III / Space Paranoids II walkthrough (1 each); C = Cavern walkthrough (24). Source profile is not a verdict that every W row is false or every multi-source row is exact. All 301 were inspected; identical/vague locators are retained as the precision queue described in KH2-002. Generated copies merge candidate and JSON via `src/games/kh2fm/generate.py:17–36`; Proof46 has an explicit override at `:26`.

| ID | Candidate occurrence | Canonical instructions occurrence | Source profile | Current locator excerpt |
|---|---|---|---|---|
| `kh2fm.treasure.twilight-town.01` | ai_docs/games/kh2fm/treasure-candidates.md:15 | ai_docs/games/kh2fm/treasure-locations.json:6 | W | Lower left corner of the yard. |
| `kh2fm.treasure.twilight-town.02` | ai_docs/games/kh2fm/treasure-candidates.md:16 | ai_docs/games/kh2fm/treasure-locations.json:12 | W | Top right corner of the yard. |
| `kh2fm.treasure.twilight-town.03` | ai_docs/games/kh2fm/treasure-candidates.md:17 | ai_docs/games/kh2fm/treasure-locations.json:18 | W | In the lower part of the forest. |
| `kh2fm.treasure.twilight-town.04` | ai_docs/games/kh2fm/treasure-candidates.md:18 | ai_docs/games/kh2fm/treasure-locations.json:24 | W | In the upper part of the forest towards the left. |
| `kh2fm.treasure.twilight-town.05` | ai_docs/games/kh2fm/treasure-candidates.md:19 | ai_docs/games/kh2fm/treasure-locations.json:30 | W | In the upper part of the forest towards the right. |
| `kh2fm.treasure.twilight-town.06` | ai_docs/games/kh2fm/treasure-candidates.md:20 | ai_docs/games/kh2fm/treasure-locations.json:36 | W | Go through the arch on the way to the Sandlot and find this chest in front of the green-roofed building. |
| `kh2fm.treasure.twilight-town.07` | ai_docs/games/kh2fm/treasure-candidates.md:21 | ai_docs/games/kh2fm/treasure-locations.json:42 | W | Get on top of that green-roofed building and hop on over to the blue ones. The bigger blue has this chest. |
| `kh2fm.treasure.twilight-town.08` | ai_docs/games/kh2fm/treasure-candidates.md:22 | ai_docs/games/kh2fm/treasure-locations.json:48 | W | Near green roof at the bottom of stairs. |
| `kh2fm.treasure.twilight-town.09` | ai_docs/games/kh2fm/treasure-candidates.md:23 | ai_docs/games/kh2fm/treasure-locations.json:54 | W | Across one of the bridges on a building. |
| `kh2fm.treasure.twilight-town.10` | ai_docs/games/kh2fm/treasure-candidates.md:24 | ai_docs/games/kh2fm/treasure-locations.json:60 | W | Behind the Accessory Shop. |
| `kh2fm.treasure.twilight-town.11` | ai_docs/games/kh2fm/treasure-candidates.md:25 | ai_docs/games/kh2fm/treasure-locations.json:66 | W | Find the small bridge between two buildings and climb up to the rooftop. |
| `kh2fm.treasure.twilight-town.12` | ai_docs/games/kh2fm/treasure-candidates.md:26 | ai_docs/games/kh2fm/treasure-locations.json:72 | W | In front of the building near the hole in the wall leading to The Woods. |
| `kh2fm.treasure.twilight-town.13` | ai_docs/games/kh2fm/treasure-candidates.md:27 | ai_docs/games/kh2fm/treasure-locations.json:78 | F | West station wall, between the tracks. |
| `kh2fm.treasure.twilight-town.14` | ai_docs/games/kh2fm/treasure-candidates.md:28 | ai_docs/games/kh2fm/treasure-locations.json:85 | F | Southwest station corner. |
| `kh2fm.treasure.twilight-town.15` | ai_docs/games/kh2fm/treasure-candidates.md:29 | ai_docs/games/kh2fm/treasure-locations.json:92 | F | Northeast station corner. |
| `kh2fm.treasure.twilight-town.16` | ai_docs/games/kh2fm/treasure-candidates.md:30 | ai_docs/games/kh2fm/treasure-locations.json:99 | W | Bushes to the right. |
| `kh2fm.treasure.twilight-town.17` | ai_docs/games/kh2fm/treasure-candidates.md:31 | ai_docs/games/kh2fm/treasure-locations.json:105 | W | Bushes to the left. |
| `kh2fm.treasure.twilight-town.18` | ai_docs/games/kh2fm/treasure-candidates.md:32 | ai_docs/games/kh2fm/treasure-locations.json:111 | W | Bushes to the left. |
| `kh2fm.treasure.twilight-town.19` | ai_docs/games/kh2fm/treasure-candidates.md:33 | ai_docs/games/kh2fm/treasure-locations.json:117 | F | Enter from outside the Tower; follow the right wall. |
| `kh2fm.treasure.twilight-town.20` | ai_docs/games/kh2fm/treasure-candidates.md:34 | ai_docs/games/kh2fm/treasure-locations.json:124 | F | Beneath the Entryway staircase. |
| `kh2fm.treasure.twilight-town.21` | ai_docs/games/kh2fm/treasure-candidates.md:35 | ai_docs/games/kh2fm/treasure-locations.json:131 | W | Near the green door. |
| `kh2fm.treasure.twilight-town.22` | ai_docs/games/kh2fm/treasure-candidates.md:36 | ai_docs/games/kh2fm/treasure-locations.json:137 | F | South end of the Wardrobe, beside the door. |
| `kh2fm.treasure.twilight-town.23` | ai_docs/games/kh2fm/treasure-candidates.md:37 | ai_docs/games/kh2fm/treasure-locations.json:144 | W | Down a corridor and down stairs. |
| `kh2fm.treasure.twilight-town.24` | ai_docs/games/kh2fm/treasure-candidates.md:38 | ai_docs/games/kh2fm/treasure-locations.json:150 | W | Through the doorway and drop down to the left. |
| `kh2fm.treasure.twilight-town.25` | ai_docs/games/kh2fm/treasure-candidates.md:39 | ai_docs/games/kh2fm/treasure-locations.json:156 | W | Down the ramp and to the right. |
| `kh2fm.treasure.twilight-town.26` | ai_docs/games/kh2fm/treasure-candidates.md:40 | ai_docs/games/kh2fm/treasure-locations.json:162 | W | Around a corner top of stairs in the corner to the right. |
| `kh2fm.treasure.twilight-town.27` | ai_docs/games/kh2fm/treasure-candidates.md:41 | ai_docs/games/kh2fm/treasure-locations.json:168 | W | In the beginning to the right. |
| `kh2fm.treasure.twilight-town.28` | ai_docs/games/kh2fm/treasure-candidates.md:42 | ai_docs/games/kh2fm/treasure-locations.json:174 | W | Down the corridor around a corner to the left. |
| `kh2fm.treasure.twilight-town.29` | ai_docs/games/kh2fm/treasure-candidates.md:43 | ai_docs/games/kh2fm/treasure-locations.json:180 | W | Jump onto the train and find this on a nearby roof. |
| `kh2fm.treasure.twilight-town.30` | ai_docs/games/kh2fm/treasure-candidates.md:44 | ai_docs/games/kh2fm/treasure-locations.json:186 | W | All the way down the left end of the tracks and to the right. |
| `kh2fm.treasure.twilight-town.31` | ai_docs/games/kh2fm/treasure-candidates.md:45 | ai_docs/games/kh2fm/treasure-locations.json:192 | W | Halfway down the tracks between two buildings. |
| `kh2fm.treasure.twilight-town.32` | ai_docs/games/kh2fm/treasure-candidates.md:46 | ai_docs/games/kh2fm/treasure-locations.json:198 | W | Down an alley to the right of the tracks. |
| `kh2fm.treasure.twilight-town.33` | ai_docs/games/kh2fm/treasure-candidates.md:47 | ai_docs/games/kh2fm/treasure-locations.json:204 | W | In front of glass doors to the left. |
| `kh2fm.treasure.twilight-town.34` | ai_docs/games/kh2fm/treasure-candidates.md:48 | ai_docs/games/kh2fm/treasure-locations.json:210 | W | Up the staircase to the right. |
| `kh2fm.treasure.twilight-town.35` | ai_docs/games/kh2fm/treasure-candidates.md:49 | ai_docs/games/kh2fm/treasure-locations.json:216 | W | Up the staircase on a balcony. |
| `kh2fm.treasure.twilight-town.36` | ai_docs/games/kh2fm/treasure-candidates.md:50 | ai_docs/games/kh2fm/treasure-locations.json:222 | W | Opposite side of room near a shelf. |
| `kh2fm.treasure.twilight-town.37` | ai_docs/games/kh2fm/treasure-candidates.md:51 | ai_docs/games/kh2fm/treasure-locations.json:228 | W | In the corner to the right. |
| `kh2fm.treasure.twilight-town.38` | ai_docs/games/kh2fm/treasure-candidates.md:52 | ai_docs/games/kh2fm/treasure-locations.json:234 | W | In the corner to the left near stairs. |
| `kh2fm.treasure.twilight-town.39` | ai_docs/games/kh2fm/treasure-candidates.md:53 | ai_docs/games/kh2fm/treasure-locations.json:240 | W | Straight and to the left. |
| `kh2fm.treasure.radiant-garden.01` | ai_docs/games/kh2fm/treasure-candidates.md:61 | ai_docs/games/kh2fm/treasure-locations.json:246 | W | To the left towards the Bailey. |
| `kh2fm.treasure.radiant-garden.02` | ai_docs/games/kh2fm/treasure-candidates.md:62 | ai_docs/games/kh2fm/treasure-locations.json:252 | W | Behind the large machine at the top of the stairs. |
| `kh2fm.treasure.radiant-garden.03` | ai_docs/games/kh2fm/treasure-candidates.md:63 | ai_docs/games/kh2fm/treasure-locations.json:258 | W | To the right of Merlin’s House door. |
| `kh2fm.treasure.radiant-garden.04` | ai_docs/games/kh2fm/treasure-candidates.md:64 | ai_docs/games/kh2fm/treasure-locations.json:264 | W | To the right of the Bailey doorway. |
| `kh2fm.treasure.radiant-garden.05` | ai_docs/games/kh2fm/treasure-candidates.md:65 | ai_docs/games/kh2fm/treasure-locations.json:270 | W | At the bottom of the stairs near Merlin’s House. |
| `kh2fm.treasure.radiant-garden.06` | ai_docs/games/kh2fm/treasure-candidates.md:66 | ai_docs/games/kh2fm/treasure-locations.json:276 | W | Over the railing and to the left. |
| `kh2fm.treasure.radiant-garden.07` | ai_docs/games/kh2fm/treasure-candidates.md:67 | ai_docs/games/kh2fm/treasure-locations.json:282 | W | On a pipe near the stairs leading to the Restoration Site. |
| `kh2fm.treasure.radiant-garden.08` | ai_docs/games/kh2fm/treasure-candidates.md:68 | ai_docs/games/kh2fm/treasure-locations.json:288 | W | Bottom of the winding ramp to the left. |
| `kh2fm.treasure.radiant-garden.09` | ai_docs/games/kh2fm/treasure-candidates.md:69 | ai_docs/games/kh2fm/treasure-locations.json:294 | W | Near pile of debris. |
| `kh2fm.treasure.radiant-garden.10` | ai_docs/games/kh2fm/treasure-candidates.md:70 | ai_docs/games/kh2fm/treasure-locations.json:300 | W | Near pipe. |
| `kh2fm.treasure.radiant-garden.11` | ai_docs/games/kh2fm/treasure-candidates.md:71 | ai_docs/games/kh2fm/treasure-locations.json:306 | W | In a corner near the fork in the road. |
| `kh2fm.treasure.radiant-garden.12` | ai_docs/games/kh2fm/treasure-candidates.md:72 | ai_docs/games/kh2fm/treasure-locations.json:312 | W | At the end of the right fork in a corner. |
| `kh2fm.treasure.radiant-garden.13` | ai_docs/games/kh2fm/treasure-candidates.md:73 | ai_docs/games/kh2fm/treasure-locations.json:318 | W | Near Leon (after first visit to Space Paranoids). |
| `kh2fm.treasure.radiant-garden.14` | ai_docs/games/kh2fm/treasure-candidates.md:74 | ai_docs/games/kh2fm/treasure-locations.json:324 | W | Back to Secret Passage in the corner. |
| `kh2fm.treasure.radiant-garden.15` | ai_docs/games/kh2fm/treasure-candidates.md:75 | ai_docs/games/kh2fm/treasure-locations.json:330 | W | Up on a ledge to the left. |
| `kh2fm.treasure.radiant-garden.16` | ai_docs/games/kh2fm/treasure-candidates.md:76 | ai_docs/games/kh2fm/treasure-locations.json:336 | W | Near a pipe on the right. |
| `kh2fm.treasure.radiant-garden.17` | ai_docs/games/kh2fm/treasure-candidates.md:77 | ai_docs/games/kh2fm/treasure-locations.json:342 | W | To the left. |
| `kh2fm.treasure.radiant-garden.18` | ai_docs/games/kh2fm/treasure-candidates.md:78 | ai_docs/games/kh2fm/treasure-locations.json:348 | W | To the right. |
| `kh2fm.treasure.radiant-garden.19` | ai_docs/games/kh2fm/treasure-candidates.md:79 | ai_docs/games/kh2fm/treasure-locations.json:354 | W | To the right. |
| `kh2fm.treasure.radiant-garden.20` | ai_docs/games/kh2fm/treasure-candidates.md:80 | ai_docs/games/kh2fm/treasure-locations.json:360 | W | To the right. |
| `kh2fm.treasure.radiant-garden.21` | ai_docs/games/kh2fm/treasure-candidates.md:81 | ai_docs/games/kh2fm/treasure-locations.json:366 | H | After the 1,000 Heartless battle, speak to Yuna at the Postern, then open the chest she leaves. |
| `kh2fm.treasure.radiant-garden.22` | ai_docs/games/kh2fm/treasure-candidates.md:82 | ai_docs/games/kh2fm/treasure-locations.json:373 | S | During the second Space Paranoids episode, take the passage from Ansem’s Study to the Manufactory and open the visible chest. |
| `kh2fm.treasure.radiant-garden.23` | ai_docs/games/kh2fm/treasure-candidates.md:83 | ai_docs/games/kh2fm/treasure-locations.json:380 | C | Ledge just above the entrance. |
| `kh2fm.treasure.radiant-garden.24` | ai_docs/games/kh2fm/treasure-candidates.md:84 | ai_docs/games/kh2fm/treasure-locations.json:386 | C | On the cavern floor. |
| `kh2fm.treasure.radiant-garden.25` | ai_docs/games/kh2fm/treasure-candidates.md:85 | ai_docs/games/kh2fm/treasure-locations.json:392 | C | Opposite end of the cavern floor. |
| `kh2fm.treasure.radiant-garden.26` | ai_docs/games/kh2fm/treasure-candidates.md:86 | ai_docs/games/kh2fm/treasure-locations.json:398 | C | Upper ledge reached by climbing back from the exit. |
| `kh2fm.treasure.radiant-garden.27` | ai_docs/games/kh2fm/treasure-candidates.md:87 | ai_docs/games/kh2fm/treasure-locations.json:404 | C | Glide to the opposite upper ledge. |
| `kh2fm.treasure.radiant-garden.28` | ai_docs/games/kh2fm/treasure-candidates.md:88 | ai_docs/games/kh2fm/treasure-locations.json:410 | C | Upper alcove accessed from the Mineshaft. |
| `kh2fm.treasure.radiant-garden.29` | ai_docs/games/kh2fm/treasure-candidates.md:89 | ai_docs/games/kh2fm/treasure-locations.json:416 | C | Center of the room, below the upper platforms. |
| `kh2fm.treasure.radiant-garden.30` | ai_docs/games/kh2fm/treasure-candidates.md:90 | ai_docs/games/kh2fm/treasure-locations.json:422 | C | Platform reached from the tall rising pillar. |
| `kh2fm.treasure.radiant-garden.31` | ai_docs/games/kh2fm/treasure-candidates.md:91 | ai_docs/games/kh2fm/treasure-locations.json:428 | C | Upper platform opposite the exit door. |
| `kh2fm.treasure.radiant-garden.32` | ai_docs/games/kh2fm/treasure-candidates.md:92 | ai_docs/games/kh2fm/treasure-locations.json:434 | C | Corner platform beside the map chest. |
| `kh2fm.treasure.radiant-garden.33` | ai_docs/games/kh2fm/treasure-candidates.md:93 | ai_docs/games/kh2fm/treasure-locations.json:440 | C | Left of the lower entrance; beside the valves. |
| `kh2fm.treasure.radiant-garden.34` | ai_docs/games/kh2fm/treasure-candidates.md:94 | ai_docs/games/kh2fm/treasure-locations.json:446 | C | Corner platform on the upper level. |
| `kh2fm.treasure.radiant-garden.35` | ai_docs/games/kh2fm/treasure-candidates.md:95 | ai_docs/games/kh2fm/treasure-locations.json:452 | C | Corner of the large conveyor belt. |
| `kh2fm.treasure.radiant-garden.36` | ai_docs/games/kh2fm/treasure-candidates.md:96 | ai_docs/games/kh2fm/treasure-locations.json:458 | C | Above the far end of the conveyor. |
| `kh2fm.treasure.radiant-garden.37` | ai_docs/games/kh2fm/treasure-candidates.md:97 | ai_docs/games/kh2fm/treasure-locations.json:464 | C | Glide past the exit doorway. |
| `kh2fm.treasure.radiant-garden.38` | ai_docs/games/kh2fm/treasure-candidates.md:98 | ai_docs/games/kh2fm/treasure-locations.json:470 | C | Small platform left of chest 37. |
| `kh2fm.treasure.radiant-garden.39` | ai_docs/games/kh2fm/treasure-candidates.md:99 | ai_docs/games/kh2fm/treasure-locations.json:476 | C | Walk around the first Mineshaft section. |
| `kh2fm.treasure.radiant-garden.40` | ai_docs/games/kh2fm/treasure-candidates.md:100 | ai_docs/games/kh2fm/treasure-locations.json:482 | C | Far end of the final Glide passage. |
| `kh2fm.treasure.radiant-garden.41` | ai_docs/games/kh2fm/treasure-candidates.md:101 | ai_docs/games/kh2fm/treasure-locations.json:488 | C | First Mineshaft entry, near the Depths doorway. |
| `kh2fm.treasure.radiant-garden.42` | ai_docs/games/kh2fm/treasure-candidates.md:102 | ai_docs/games/kh2fm/treasure-locations.json:494 | C | Second Mineshaft section, before the Aerial Dodge pipes. |
| `kh2fm.treasure.radiant-garden.43` | ai_docs/games/kh2fm/treasure-candidates.md:103 | ai_docs/games/kh2fm/treasure-locations.json:500 | C | Final Mineshaft section, by the Engine Chamber doorway. |
| `kh2fm.treasure.radiant-garden.44` | ai_docs/games/kh2fm/treasure-candidates.md:104 | ai_docs/games/kh2fm/treasure-locations.json:506 | C | Beside the computer terminal. |
| `kh2fm.treasure.radiant-garden.45` | ai_docs/games/kh2fm/treasure-candidates.md:105 | ai_docs/games/kh2fm/treasure-locations.json:512 | C | Beside the computer terminal. |
| `kh2fm.treasure.radiant-garden.46` | ai_docs/games/kh2fm/treasure-candidates.md:106 | ai_docs/games/kh2fm/treasure-locations.json:518 | C | After defeating all thirteen Replica Data battles, open the new chest near the terminal. |
| `kh2fm.treasure.beast-s-castle.01` | ai_docs/games/kh2fm/treasure-candidates.md:114 | ai_docs/games/kh2fm/treasure-locations.json:524 | W | Exit castle’s front door far right of the courtyard. |
| `kh2fm.treasure.beast-s-castle.02` | ai_docs/games/kh2fm/treasure-candidates.md:115 | ai_docs/games/kh2fm/treasure-locations.json:530 | W | To the left. |
| `kh2fm.treasure.beast-s-castle.03` | ai_docs/games/kh2fm/treasure-candidates.md:116 | ai_docs/games/kh2fm/treasure-locations.json:536 | W | Left of the door. |
| `kh2fm.treasure.beast-s-castle.04` | ai_docs/games/kh2fm/treasure-candidates.md:117 | ai_docs/games/kh2fm/treasure-locations.json:542 | W | Big treasure chest in the corner. |
| `kh2fm.treasure.beast-s-castle.05` | ai_docs/games/kh2fm/treasure-candidates.md:118 | ai_docs/games/kh2fm/treasure-locations.json:548 | W | Small chest in other corner. |
| `kh2fm.treasure.beast-s-castle.06` | ai_docs/games/kh2fm/treasure-candidates.md:119 | ai_docs/games/kh2fm/treasure-locations.json:554 | W | Near the stairs. |
| `kh2fm.treasure.beast-s-castle.07` | ai_docs/games/kh2fm/treasure-candidates.md:120 | ai_docs/games/kh2fm/treasure-locations.json:560 | W | In the center of the hallway near a window. |
| `kh2fm.treasure.beast-s-castle.08` | ai_docs/games/kh2fm/treasure-candidates.md:121 | ai_docs/games/kh2fm/treasure-locations.json:566 | K | Between the suits of armor against the north wall. |
| `kh2fm.treasure.beast-s-castle.09` | ai_docs/games/kh2fm/treasure-candidates.md:122 | ai_docs/games/kh2fm/treasure-locations.json:573 | K | Between the suits of armor against the south wall. |
| `kh2fm.treasure.beast-s-castle.10` | ai_docs/games/kh2fm/treasure-candidates.md:123 | ai_docs/games/kh2fm/treasure-locations.json:580 | W | To the right of the staircase base. |
| `kh2fm.treasure.beast-s-castle.11` | ai_docs/games/kh2fm/treasure-candidates.md:124 | ai_docs/games/kh2fm/treasure-locations.json:586 | W | To the left of the staircase base. |
| `kh2fm.treasure.beast-s-castle.12` | ai_docs/games/kh2fm/treasure-candidates.md:125 | ai_docs/games/kh2fm/treasure-locations.json:592 | W | To the right of the Secret Passage entrance. |
| `kh2fm.treasure.beast-s-castle.13` | ai_docs/games/kh2fm/treasure-candidates.md:126 | ai_docs/games/kh2fm/treasure-locations.json:598 | W | In front of the stairs to the left. |
| `kh2fm.treasure.beast-s-castle.14` | ai_docs/games/kh2fm/treasure-candidates.md:127 | ai_docs/games/kh2fm/treasure-locations.json:604 | K | Northeast corner, beside the Undercroft door. |
| `kh2fm.treasure.beast-s-castle.15` | ai_docs/games/kh2fm/treasure-candidates.md:128 | ai_docs/games/kh2fm/treasure-locations.json:611 | K | East wall, between the chair and hay. |
| `kh2fm.treasure.beast-s-castle.16` | ai_docs/games/kh2fm/treasure-candidates.md:129 | ai_docs/games/kh2fm/treasure-locations.json:618 | F | Behind the opened secret door; climb the eastern stairs. |
| `kh2fm.treasure.beast-s-castle.17` | ai_docs/games/kh2fm/treasure-candidates.md:130 | ai_docs/games/kh2fm/treasure-locations.json:625 | F | Behind the opened secret door; climb the eastern stairs. |
| `kh2fm.treasure.beast-s-castle.18` | ai_docs/games/kh2fm/treasure-candidates.md:131 | ai_docs/games/kh2fm/treasure-locations.json:632 | F | Through the secret door, south side before the stairs. |
| `kh2fm.treasure.beast-s-castle.19` | ai_docs/games/kh2fm/treasure-candidates.md:132 | ai_docs/games/kh2fm/treasure-locations.json:639 | W | Up the right stairs. |
| `kh2fm.treasure.beast-s-castle.20` | ai_docs/games/kh2fm/treasure-candidates.md:133 | ai_docs/games/kh2fm/treasure-locations.json:645 | K | Southwest wall, opposite the West Hall passage. |
| `kh2fm.treasure.beast-s-castle.21` | ai_docs/games/kh2fm/treasure-candidates.md:134 | ai_docs/games/kh2fm/treasure-locations.json:652 | W | Near the window. |
| `kh2fm.treasure.olympus-coliseum.01` | ai_docs/games/kh2fm/treasure-candidates.md:142 | ai_docs/games/kh2fm/treasure-locations.json:658 | K | On the east path toward the Underworld Caverns. |
| `kh2fm.treasure.olympus-coliseum.02` | ai_docs/games/kh2fm/treasure-candidates.md:143 | ai_docs/games/kh2fm/treasure-locations.json:665 | W | On the left path of the fork. |
| `kh2fm.treasure.olympus-coliseum.03` | ai_docs/games/kh2fm/treasure-candidates.md:144 | ai_docs/games/kh2fm/treasure-locations.json:671 | W | Near the door for Inner Chamber. |
| `kh2fm.treasure.olympus-coliseum.04` | ai_docs/games/kh2fm/treasure-candidates.md:145 | ai_docs/games/kh2fm/treasure-locations.json:677 | W | On the left path of the fork. |
| `kh2fm.treasure.olympus-coliseum.05` | ai_docs/games/kh2fm/treasure-candidates.md:146 | ai_docs/games/kh2fm/treasure-locations.json:683 | W | On the left path of the fork. |
| `kh2fm.treasure.olympus-coliseum.06` | ai_docs/games/kh2fm/treasure-candidates.md:147 | ai_docs/games/kh2fm/treasure-locations.json:689 | W | On the right path of the fork. |
| `kh2fm.treasure.olympus-coliseum.07` | ai_docs/games/kh2fm/treasure-candidates.md:148 | ai_docs/games/kh2fm/treasure-locations.json:695 | W | Near the save point. |
| `kh2fm.treasure.olympus-coliseum.08` | ai_docs/games/kh2fm/treasure-candidates.md:149 | ai_docs/games/kh2fm/treasure-locations.json:701 | W | Near the Passage doorway. |
| `kh2fm.treasure.olympus-coliseum.09` | ai_docs/games/kh2fm/treasure-candidates.md:150 | ai_docs/games/kh2fm/treasure-locations.json:707 | W | Up the stairs. |
| `kh2fm.treasure.olympus-coliseum.10` | ai_docs/games/kh2fm/treasure-candidates.md:151 | ai_docs/games/kh2fm/treasure-locations.json:713 | W | On the left up the stairs. |
| `kh2fm.treasure.olympus-coliseum.11` | ai_docs/games/kh2fm/treasure-candidates.md:152 | ai_docs/games/kh2fm/treasure-locations.json:719 | W | Drop down onto a ledge. |
| `kh2fm.treasure.olympus-coliseum.12` | ai_docs/games/kh2fm/treasure-candidates.md:153 | ai_docs/games/kh2fm/treasure-locations.json:725 | W | Left path. |
| `kh2fm.treasure.olympus-coliseum.13` | ai_docs/games/kh2fm/treasure-candidates.md:154 | ai_docs/games/kh2fm/treasure-locations.json:731 | K | Southwest wall, opposite the Caverns Entrance passage. |
| `kh2fm.treasure.olympus-coliseum.14` | ai_docs/games/kh2fm/treasure-candidates.md:155 | ai_docs/games/kh2fm/treasure-locations.json:738 | W | Towards Atrium right path. |
| `kh2fm.treasure.olympus-coliseum.15` | ai_docs/games/kh2fm/treasure-candidates.md:156 | ai_docs/games/kh2fm/treasure-locations.json:744 | K | North wall, east of the upper Entrance passage. |
| `kh2fm.treasure.olympus-coliseum.16` | ai_docs/games/kh2fm/treasure-candidates.md:157 | ai_docs/games/kh2fm/treasure-locations.json:751 | W | On the right. |
| `kh2fm.treasure.olympus-coliseum.17` | ai_docs/games/kh2fm/treasure-candidates.md:158 | ai_docs/games/kh2fm/treasure-locations.json:757 | W | Next to the stairs on a ledge. |
| `kh2fm.treasure.olympus-coliseum.18` | ai_docs/games/kh2fm/treasure-candidates.md:159 | ai_docs/games/kh2fm/treasure-locations.json:763 | W | To the right. |
| `kh2fm.treasure.olympus-coliseum.19` | ai_docs/games/kh2fm/treasure-candidates.md:160 | ai_docs/games/kh2fm/treasure-locations.json:769 | W | To the right. |
| `kh2fm.treasure.olympus-coliseum.20` | ai_docs/games/kh2fm/treasure-candidates.md:161 | ai_docs/games/kh2fm/treasure-locations.json:775 | W | To the left. |
| `kh2fm.treasure.agrabah.01` | ai_docs/games/kh2fm/treasure-candidates.md:169 | ai_docs/games/kh2fm/treasure-locations.json:781 | K | Upper platform overlooking the Palace passage. |
| `kh2fm.treasure.agrabah.02` | ai_docs/games/kh2fm/treasure-candidates.md:170 | ai_docs/games/kh2fm/treasure-locations.json:788 | K | Upper level along the western boundary. |
| `kh2fm.treasure.agrabah.03` | ai_docs/games/kh2fm/treasure-candidates.md:171 | ai_docs/games/kh2fm/treasure-locations.json:795 | K | Southeast platform by the lower Bazaar passage. |
| `kh2fm.treasure.agrabah.04` | ai_docs/games/kh2fm/treasure-candidates.md:172 | ai_docs/games/kh2fm/treasure-locations.json:802 | K | Recessed southwest alcove. |
| `kh2fm.treasure.agrabah.05` | ai_docs/games/kh2fm/treasure-candidates.md:173 | ai_docs/games/kh2fm/treasure-locations.json:809 | K | Small upper-level corner on the west side. |
| `kh2fm.treasure.agrabah.06` | ai_docs/games/kh2fm/treasure-candidates.md:174 | ai_docs/games/kh2fm/treasure-locations.json:816 | K | Southeast upper level by the upper Bazaar passage. |
| `kh2fm.treasure.agrabah.07` | ai_docs/games/kh2fm/treasure-candidates.md:175 | ai_docs/games/kh2fm/treasure-locations.json:823 | K | Raised platform in the northwest corner. |
| `kh2fm.treasure.agrabah.08` | ai_docs/games/kh2fm/treasure-candidates.md:176 | ai_docs/games/kh2fm/treasure-locations.json:830 | W | On top of stairs. |
| `kh2fm.treasure.agrabah.09` | ai_docs/games/kh2fm/treasure-candidates.md:177 | ai_docs/games/kh2fm/treasure-locations.json:836 | W | Bottom of the staircase. |
| `kh2fm.treasure.agrabah.10` | ai_docs/games/kh2fm/treasure-candidates.md:178 | ai_docs/games/kh2fm/treasure-locations.json:842 | W | Among booths. |
| `kh2fm.treasure.agrabah.11` | ai_docs/games/kh2fm/treasure-candidates.md:179 | ai_docs/games/kh2fm/treasure-locations.json:848 | W | Among booths. |
| `kh2fm.treasure.agrabah.12` | ai_docs/games/kh2fm/treasure-candidates.md:180 | ai_docs/games/kh2fm/treasure-locations.json:854 | W | Among booths. |
| `kh2fm.treasure.agrabah.13` | ai_docs/games/kh2fm/treasure-candidates.md:181 | ai_docs/games/kh2fm/treasure-locations.json:860 | W | Near the desert path. |
| `kh2fm.treasure.agrabah.14` | ai_docs/games/kh2fm/treasure-candidates.md:182 | ai_docs/games/kh2fm/treasure-locations.json:866 | W | On a block. |
| `kh2fm.treasure.agrabah.15` | ai_docs/games/kh2fm/treasure-candidates.md:183 | ai_docs/games/kh2fm/treasure-locations.json:872 | W | Behind the actual Cave of Wonders entrance. |
| `kh2fm.treasure.agrabah.16` | ai_docs/games/kh2fm/treasure-candidates.md:184 | ai_docs/games/kh2fm/treasure-locations.json:878 | W | To the right. |
| `kh2fm.treasure.agrabah.17` | ai_docs/games/kh2fm/treasure-candidates.md:185 | ai_docs/games/kh2fm/treasure-locations.json:884 | W | Right side on a platform. |
| `kh2fm.treasure.agrabah.18` | ai_docs/games/kh2fm/treasure-candidates.md:186 | ai_docs/games/kh2fm/treasure-locations.json:890 | W | Left side on a platform. |
| `kh2fm.treasure.agrabah.19` | ai_docs/games/kh2fm/treasure-candidates.md:187 | ai_docs/games/kh2fm/treasure-locations.json:896 | W | Left side on a platform. |
| `kh2fm.treasure.agrabah.20` | ai_docs/games/kh2fm/treasure-candidates.md:188 | ai_docs/games/kh2fm/treasure-locations.json:902 | W | Right side on a platform. |
| `kh2fm.treasure.agrabah.21` | ai_docs/games/kh2fm/treasure-candidates.md:189 | ai_docs/games/kh2fm/treasure-locations.json:908 | W | Near the transporter. |
| `kh2fm.treasure.agrabah.22` | ai_docs/games/kh2fm/treasure-candidates.md:190 | ai_docs/games/kh2fm/treasure-locations.json:914 | W | Near the save point. |
| `kh2fm.treasure.agrabah.23` | ai_docs/games/kh2fm/treasure-candidates.md:191 | ai_docs/games/kh2fm/treasure-locations.json:920 | W | Left side near wall. |
| `kh2fm.treasure.agrabah.24` | ai_docs/games/kh2fm/treasure-candidates.md:192 | ai_docs/games/kh2fm/treasure-locations.json:926 | W | Near gold piles. |
| `kh2fm.treasure.agrabah.25` | ai_docs/games/kh2fm/treasure-candidates.md:193 | ai_docs/games/kh2fm/treasure-locations.json:932 | W | Near the stairs. |
| `kh2fm.treasure.agrabah.26` | ai_docs/games/kh2fm/treasure-candidates.md:194 | ai_docs/games/kh2fm/treasure-locations.json:938 | W | Near save point. |
| `kh2fm.treasure.the-land-of-dragons.01` | ai_docs/games/kh2fm/treasure-candidates.md:202 | ai_docs/games/kh2fm/treasure-locations.json:944 | W | To the right of large rock. |
| `kh2fm.treasure.the-land-of-dragons.02` | ai_docs/games/kh2fm/treasure-candidates.md:203 | ai_docs/games/kh2fm/treasure-locations.json:950 | W | To the left. |
| `kh2fm.treasure.the-land-of-dragons.03` | ai_docs/games/kh2fm/treasure-candidates.md:204 | ai_docs/games/kh2fm/treasure-locations.json:956 | W | To the left. |
| `kh2fm.treasure.the-land-of-dragons.04` | ai_docs/games/kh2fm/treasure-candidates.md:205 | ai_docs/games/kh2fm/treasure-locations.json:962 | W | Near rocks across from stream. |
| `kh2fm.treasure.the-land-of-dragons.05` | ai_docs/games/kh2fm/treasure-candidates.md:206 | ai_docs/games/kh2fm/treasure-locations.json:968 | W | Near wagon. |
| `kh2fm.treasure.the-land-of-dragons.06` | ai_docs/games/kh2fm/treasure-candidates.md:207 | ai_docs/games/kh2fm/treasure-locations.json:974 | W | Edge of the cliff. |
| `kh2fm.treasure.the-land-of-dragons.07` | ai_docs/games/kh2fm/treasure-candidates.md:208 | ai_docs/games/kh2fm/treasure-locations.json:980 | W | Uppermost platform. |
| `kh2fm.treasure.the-land-of-dragons.08` | ai_docs/games/kh2fm/treasure-candidates.md:209 | ai_docs/games/kh2fm/treasure-locations.json:986 | W | Uppermost platform. |
| `kh2fm.treasure.the-land-of-dragons.09` | ai_docs/games/kh2fm/treasure-candidates.md:210 | ai_docs/games/kh2fm/treasure-locations.json:992 | W | On a ledge near the path leading to the Village. |
| `kh2fm.treasure.the-land-of-dragons.10` | ai_docs/games/kh2fm/treasure-candidates.md:211 | ai_docs/games/kh2fm/treasure-locations.json:998 | W | Behind the small wagon. |
| `kh2fm.treasure.the-land-of-dragons.11` | ai_docs/games/kh2fm/treasure-candidates.md:212 | ai_docs/games/kh2fm/treasure-locations.json:1004 | W | In plain sight. |
| `kh2fm.treasure.the-land-of-dragons.12` | ai_docs/games/kh2fm/treasure-candidates.md:213 | ai_docs/games/kh2fm/treasure-locations.json:1010 | W | Edge of cliff. |
| `kh2fm.treasure.the-land-of-dragons.13` | ai_docs/games/kh2fm/treasure-candidates.md:214 | ai_docs/games/kh2fm/treasure-locations.json:1016 | W | Near the rockets and wagon. |
| `kh2fm.treasure.the-land-of-dragons.14` | ai_docs/games/kh2fm/treasure-candidates.md:215 | ai_docs/games/kh2fm/treasure-locations.json:1022 | W | On ledge behind throne. |
| `kh2fm.treasure.the-land-of-dragons.15` | ai_docs/games/kh2fm/treasure-candidates.md:216 | ai_docs/games/kh2fm/treasure-locations.json:1028 | W | On ledge behind throne. |
| `kh2fm.treasure.the-land-of-dragons.16` | ai_docs/games/kh2fm/treasure-candidates.md:217 | ai_docs/games/kh2fm/treasure-locations.json:1034 | W | On the side of staircases on the left. |
| `kh2fm.treasure.the-land-of-dragons.17` | ai_docs/games/kh2fm/treasure-candidates.md:218 | ai_docs/games/kh2fm/treasure-locations.json:1040 | W | Down stairs to the right. |
| `kh2fm.treasure.the-land-of-dragons.18` | ai_docs/games/kh2fm/treasure-candidates.md:219 | ai_docs/games/kh2fm/treasure-locations.json:1046 | W | On the side of staircases on the right. |
| `kh2fm.treasure.the-land-of-dragons.19` | ai_docs/games/kh2fm/treasure-candidates.md:220 | ai_docs/games/kh2fm/treasure-locations.json:1052 | W | Down stairs to the right. |
| `kh2fm.treasure.the-land-of-dragons.20` | ai_docs/games/kh2fm/treasure-candidates.md:221 | ai_docs/games/kh2fm/treasure-locations.json:1058 | W | On ledge behind throne. |
| `kh2fm.treasure.the-land-of-dragons.21` | ai_docs/games/kh2fm/treasure-candidates.md:222 | ai_docs/games/kh2fm/treasure-locations.json:1064 | W | On ledge behind throne. |
| `kh2fm.treasure.100-acre-wood.01` | ai_docs/games/kh2fm/treasure-candidates.md:230 | ai_docs/games/kh2fm/treasure-locations.json:1070 | O | Outside Pooh’s house, open the large chest on the far side. |
| `kh2fm.treasure.100-acre-wood.02` | ai_docs/games/kh2fm/treasure-candidates.md:231 | ai_docs/games/kh2fm/treasure-locations.json:1077 | O | Outside Pooh’s house, check beside the large map chest. |
| `kh2fm.treasure.100-acre-wood.03` | ai_docs/games/kh2fm/treasure-candidates.md:232 | ai_docs/games/kh2fm/treasure-locations.json:1084 | O | Outside Pooh’s house, check the small chest behind the house. |
| `kh2fm.treasure.100-acre-wood.04` | ai_docs/games/kh2fm/treasure-candidates.md:233 | ai_docs/games/kh2fm/treasure-locations.json:1091 | W | On a tree stump. |
| `kh2fm.treasure.100-acre-wood.05` | ai_docs/games/kh2fm/treasure-candidates.md:234 | ai_docs/games/kh2fm/treasure-locations.json:1097 | W | On left side of house. |
| `kh2fm.treasure.100-acre-wood.06` | ai_docs/games/kh2fm/treasure-candidates.md:235 | ai_docs/games/kh2fm/treasure-locations.json:1103 | W | In front of tree stump. |
| `kh2fm.treasure.100-acre-wood.07` | ai_docs/games/kh2fm/treasure-candidates.md:236 | ai_docs/games/kh2fm/treasure-locations.json:1109 | W | Behind clothesline. |
| `kh2fm.treasure.100-acre-wood.08` | ai_docs/games/kh2fm/treasure-candidates.md:237 | ai_docs/games/kh2fm/treasure-locations.json:1115 | W | Near fence. |
| `kh2fm.treasure.100-acre-wood.09` | ai_docs/games/kh2fm/treasure-candidates.md:238 | ai_docs/games/kh2fm/treasure-locations.json:1121 | W | In pumpkin patch. |
| `kh2fm.treasure.100-acre-wood.10` | ai_docs/games/kh2fm/treasure-candidates.md:239 | ai_docs/games/kh2fm/treasure-locations.json:1127 | W | Left side of house. |
| `kh2fm.treasure.100-acre-wood.11` | ai_docs/games/kh2fm/treasure-candidates.md:240 | ai_docs/games/kh2fm/treasure-locations.json:1133 | W | Near edge of fence. |
| `kh2fm.treasure.100-acre-wood.12` | ai_docs/games/kh2fm/treasure-candidates.md:241 | ai_docs/games/kh2fm/treasure-locations.json:1139 | W | Right side of house. |
| `kh2fm.treasure.100-acre-wood.13` | ai_docs/games/kh2fm/treasure-candidates.md:242 | ai_docs/games/kh2fm/treasure-locations.json:1145 | W | On left across the ice. |
| `kh2fm.treasure.100-acre-wood.14` | ai_docs/games/kh2fm/treasure-candidates.md:243 | ai_docs/games/kh2fm/treasure-locations.json:1151 | F | From the main crystal chamber, take the first right branch. |
| `kh2fm.treasure.100-acre-wood.15` | ai_docs/games/kh2fm/treasure-candidates.md:244 | ai_docs/games/kh2fm/treasure-locations.json:1158 | F | From the main crystal chamber, take the first left branch. |
| `kh2fm.treasure.100-acre-wood.16` | ai_docs/games/kh2fm/treasure-candidates.md:245 | ai_docs/games/kh2fm/treasure-locations.json:1165 | W | Crystal room third opening from the right. |
| `kh2fm.treasure.100-acre-wood.17` | ai_docs/games/kh2fm/treasure-candidates.md:246 | ai_docs/games/kh2fm/treasure-locations.json:1171 | W | Crystal room third opening from the right. |
| `kh2fm.treasure.100-acre-wood.18` | ai_docs/games/kh2fm/treasure-candidates.md:247 | ai_docs/games/kh2fm/treasure-locations.json:1177 | W | Crystal room second path from the right. |
| `kh2fm.treasure.100-acre-wood.19` | ai_docs/games/kh2fm/treasure-candidates.md:248 | ai_docs/games/kh2fm/treasure-locations.json:1183 | W | Near bushes on the left. |
| `kh2fm.treasure.100-acre-wood.20` | ai_docs/games/kh2fm/treasure-candidates.md:249 | ai_docs/games/kh2fm/treasure-locations.json:1189 | W | Near bushes upper right. |
| `kh2fm.treasure.pride-lands.01` | ai_docs/games/kh2fm/treasure-candidates.md:257 | ai_docs/games/kh2fm/treasure-locations.json:1195 | W | To the right. |
| `kh2fm.treasure.pride-lands.02` | ai_docs/games/kh2fm/treasure-candidates.md:258 | ai_docs/games/kh2fm/treasure-locations.json:1201 | W | To the right. |
| `kh2fm.treasure.pride-lands.03` | ai_docs/games/kh2fm/treasure-candidates.md:259 | ai_docs/games/kh2fm/treasure-locations.json:1207 | W | To the left. |
| `kh2fm.treasure.pride-lands.04` | ai_docs/games/kh2fm/treasure-candidates.md:260 | ai_docs/games/kh2fm/treasure-locations.json:1213 | W | On left near wall. |
| `kh2fm.treasure.pride-lands.05` | ai_docs/games/kh2fm/treasure-candidates.md:261 | ai_docs/games/kh2fm/treasure-locations.json:1219 | W | On a ledge to the right. |
| `kh2fm.treasure.pride-lands.06` | ai_docs/games/kh2fm/treasure-candidates.md:262 | ai_docs/games/kh2fm/treasure-locations.json:1225 | W | Near exit of area. |
| `kh2fm.treasure.pride-lands.07` | ai_docs/games/kh2fm/treasure-candidates.md:263 | ai_docs/games/kh2fm/treasure-locations.json:1231 | W | Behind you to the left. |
| `kh2fm.treasure.pride-lands.08` | ai_docs/games/kh2fm/treasure-candidates.md:264 | ai_docs/games/kh2fm/treasure-locations.json:1237 | W | Jump off ledge to the right. |
| `kh2fm.treasure.pride-lands.09` | ai_docs/games/kh2fm/treasure-candidates.md:265 | ai_docs/games/kh2fm/treasure-locations.json:1243 | W | Edge of the ledge in front of Pride Rock. |
| `kh2fm.treasure.pride-lands.10` | ai_docs/games/kh2fm/treasure-candidates.md:266 | ai_docs/games/kh2fm/treasure-locations.json:1249 | W | Under Pride Rock. |
| `kh2fm.treasure.pride-lands.11` | ai_docs/games/kh2fm/treasure-candidates.md:267 | ai_docs/games/kh2fm/treasure-locations.json:1255 | W | Near a wall in the distance. |
| `kh2fm.treasure.pride-lands.12` | ai_docs/games/kh2fm/treasure-candidates.md:268 | ai_docs/games/kh2fm/treasure-locations.json:1261 | W | Between two rocks. |
| `kh2fm.treasure.pride-lands.13` | ai_docs/games/kh2fm/treasure-candidates.md:269 | ai_docs/games/kh2fm/treasure-locations.json:1267 | W | In front of a rock. |
| `kh2fm.treasure.pride-lands.14` | ai_docs/games/kh2fm/treasure-candidates.md:270 | ai_docs/games/kh2fm/treasure-locations.json:1273 | W | Behind rocks to the left. |
| `kh2fm.treasure.pride-lands.15` | ai_docs/games/kh2fm/treasure-candidates.md:271 | ai_docs/games/kh2fm/treasure-locations.json:1279 | W | Behind rocks. |
| `kh2fm.treasure.pride-lands.16` | ai_docs/games/kh2fm/treasure-candidates.md:272 | ai_docs/games/kh2fm/treasure-locations.json:1285 | W | Near the tree. |
| `kh2fm.treasure.pride-lands.17` | ai_docs/games/kh2fm/treasure-candidates.md:273 | ai_docs/games/kh2fm/treasure-locations.json:1291 | F | Follow the Wastelands from the Savannah; left after the third bend. |
| `kh2fm.treasure.pride-lands.18` | ai_docs/games/kh2fm/treasure-candidates.md:274 | ai_docs/games/kh2fm/treasure-locations.json:1298 | F | Continue past chest 17; right after the next bend. |
| `kh2fm.treasure.pride-lands.19` | ai_docs/games/kh2fm/treasure-candidates.md:275 | ai_docs/games/kh2fm/treasure-locations.json:1305 | F | Left wall near the Jungle exit. |
| `kh2fm.treasure.pride-lands.20` | ai_docs/games/kh2fm/treasure-candidates.md:276 | ai_docs/games/kh2fm/treasure-locations.json:1312 | W | Near the ant hills. |
| `kh2fm.treasure.pride-lands.21` | ai_docs/games/kh2fm/treasure-candidates.md:277 | ai_docs/games/kh2fm/treasure-locations.json:1318 | W | Past the ant hills near a tree. |
| `kh2fm.treasure.pride-lands.22` | ai_docs/games/kh2fm/treasure-candidates.md:278 | ai_docs/games/kh2fm/treasure-locations.json:1324 | K | Below the raised ledge opposite the Wastelands passage. |
| `kh2fm.treasure.pride-lands.23` | ai_docs/games/kh2fm/treasure-candidates.md:279 | ai_docs/games/kh2fm/treasure-locations.json:1331 | W | Edge of the cliff to the right. |
| `kh2fm.treasure.pride-lands.24` | ai_docs/games/kh2fm/treasure-candidates.md:280 | ai_docs/games/kh2fm/treasure-locations.json:1337 | W | Near a tree. |
| `kh2fm.treasure.pride-lands.25` | ai_docs/games/kh2fm/treasure-candidates.md:281 | ai_docs/games/kh2fm/treasure-locations.json:1343 | W | On the side of the waterfall. |
| `kh2fm.treasure.disney-castle.01` | ai_docs/games/kh2fm/treasure-candidates.md:289 | ai_docs/games/kh2fm/treasure-locations.json:1349 | W | On a ledge near the French Horn shrub player. |
| `kh2fm.treasure.disney-castle.02` | ai_docs/games/kh2fm/treasure-candidates.md:290 | ai_docs/games/kh2fm/treasure-locations.json:1355 | W | Highest rampart of Castle shrub. |
| `kh2fm.treasure.disney-castle.03` | ai_docs/games/kh2fm/treasure-candidates.md:291 | ai_docs/games/kh2fm/treasure-locations.json:1361 | W | In a corner near the Cymbals shrub player. |
| `kh2fm.treasure.disney-castle.04` | ai_docs/games/kh2fm/treasure-candidates.md:292 | ai_docs/games/kh2fm/treasure-locations.json:1367 | W | Ledge near the Trumpet shrub player. |
| `kh2fm.treasure.disney-castle.05` | ai_docs/games/kh2fm/treasure-candidates.md:293 | ai_docs/games/kh2fm/treasure-locations.json:1373 | W | Ledge near Flute shrub player. |
| `kh2fm.treasure.disney-castle.06` | ai_docs/games/kh2fm/treasure-candidates.md:294 | ai_docs/games/kh2fm/treasure-locations.json:1379 | W | Right side of Castle shrub. |
| `kh2fm.treasure.disney-castle.07` | ai_docs/games/kh2fm/treasure-candidates.md:295 | ai_docs/games/kh2fm/treasure-locations.json:1385 | W | Ledge near Trombone shrub player. |
| `kh2fm.treasure.disney-castle.08` | ai_docs/games/kh2fm/treasure-candidates.md:296 | ai_docs/games/kh2fm/treasure-locations.json:1391 | W | In plain sight on the right. |
| `kh2fm.treasure.timeless-river.01` | ai_docs/games/kh2fm/treasure-candidates.md:304 | ai_docs/games/kh2fm/treasure-locations.json:1397 | W | Big ledge near the door. |
| `kh2fm.treasure.timeless-river.02` | ai_docs/games/kh2fm/treasure-candidates.md:305 | ai_docs/games/kh2fm/treasure-locations.json:1403 | W | Big ledge near the Wharf path. |
| `kh2fm.treasure.timeless-river.03` | ai_docs/games/kh2fm/treasure-candidates.md:306 | ai_docs/games/kh2fm/treasure-locations.json:1409 | W | Under a tree to the left. |
| `kh2fm.treasure.timeless-river.04` | ai_docs/games/kh2fm/treasure-candidates.md:307 | ai_docs/games/kh2fm/treasure-locations.json:1415 | W | Under a tree to the right. |
| `kh2fm.treasure.timeless-river.05` | ai_docs/games/kh2fm/treasure-candidates.md:308 | ai_docs/games/kh2fm/treasure-locations.json:1421 | W | Near a wall to the left. |
| `kh2fm.treasure.timeless-river.06` | ai_docs/games/kh2fm/treasure-candidates.md:309 | ai_docs/games/kh2fm/treasure-locations.json:1427 | W | End of the left path. |
| `kh2fm.treasure.timeless-river.07` | ai_docs/games/kh2fm/treasure-candidates.md:310 | ai_docs/games/kh2fm/treasure-locations.json:1433 | W | Right path near the windmill. |
| `kh2fm.treasure.halloween-town.01` | ai_docs/games/kh2fm/treasure-candidates.md:318 | ai_docs/games/kh2fm/treasure-locations.json:1439 | W | On the right near the cross tombstone. |
| `kh2fm.treasure.halloween-town.02` | ai_docs/games/kh2fm/treasure-candidates.md:319 | ai_docs/games/kh2fm/treasure-locations.json:1445 | W | To the left near the chained gate. |
| `kh2fm.treasure.halloween-town.03` | ai_docs/games/kh2fm/treasure-candidates.md:320 | ai_docs/games/kh2fm/treasure-locations.json:1451 | W | To the left of the big book. |
| `kh2fm.treasure.halloween-town.04` | ai_docs/games/kh2fm/treasure-candidates.md:321 | ai_docs/games/kh2fm/treasure-locations.json:1457 | W | To the right of the opening and closing gate. |
| `kh2fm.treasure.halloween-town.05` | ai_docs/games/kh2fm/treasure-candidates.md:322 | ai_docs/games/kh2fm/treasure-locations.json:1463 | W | Near the guillotine. |
| `kh2fm.treasure.halloween-town.06` | ai_docs/games/kh2fm/treasure-candidates.md:323 | ai_docs/games/kh2fm/treasure-locations.json:1469 | W | Upper left area. |
| `kh2fm.treasure.halloween-town.07` | ai_docs/games/kh2fm/treasure-candidates.md:324 | ai_docs/games/kh2fm/treasure-locations.json:1475 | W | On the left side. |
| `kh2fm.treasure.halloween-town.08` | ai_docs/games/kh2fm/treasure-candidates.md:325 | ai_docs/games/kh2fm/treasure-locations.json:1481 | W | Right side behind a tree. |
| `kh2fm.treasure.halloween-town.09` | ai_docs/games/kh2fm/treasure-candidates.md:326 | ai_docs/games/kh2fm/treasure-locations.json:1487 | W | Near the house on the right of Santa’s house. |
| `kh2fm.treasure.halloween-town.10` | ai_docs/games/kh2fm/treasure-candidates.md:327 | ai_docs/games/kh2fm/treasure-locations.json:1493 | W | Near the house to the right of the Yuletide Hill path. |
| `kh2fm.treasure.halloween-town.11` | ai_docs/games/kh2fm/treasure-candidates.md:328 | ai_docs/games/kh2fm/treasure-locations.json:1499 | W | To the right of the gates. |
| `kh2fm.treasure.halloween-town.12` | ai_docs/games/kh2fm/treasure-candidates.md:329 | ai_docs/games/kh2fm/treasure-locations.json:1505 | W | To the right of Santa’s house doors. |
| `kh2fm.treasure.halloween-town.13` | ai_docs/games/kh2fm/treasure-candidates.md:330 | ai_docs/games/kh2fm/treasure-locations.json:1511 | W | On the counter. |
| `kh2fm.treasure.halloween-town.14` | ai_docs/games/kh2fm/treasure-candidates.md:331 | ai_docs/games/kh2fm/treasure-locations.json:1517 | W | Next to the counter near the save point. |
| `kh2fm.treasure.port-royal.01` | ai_docs/games/kh2fm/treasure-candidates.md:339 | ai_docs/games/kh2fm/treasure-locations.json:1523 | W | In plain sight in the corner. |
| `kh2fm.treasure.port-royal.02` | ai_docs/games/kh2fm/treasure-candidates.md:340 | ai_docs/games/kh2fm/treasure-locations.json:1529 | W | Around the second corner on the right. |
| `kh2fm.treasure.port-royal.03` | ai_docs/games/kh2fm/treasure-candidates.md:341 | ai_docs/games/kh2fm/treasure-locations.json:1535 | W | Around the corner on the right. |
| `kh2fm.treasure.port-royal.04` | ai_docs/games/kh2fm/treasure-candidates.md:342 | ai_docs/games/kh2fm/treasure-locations.json:1541 | W | Destroy boxes, go down an alley into the opening and in the corner to the right. |
| `kh2fm.treasure.port-royal.05` | ai_docs/games/kh2fm/treasure-candidates.md:343 | ai_docs/games/kh2fm/treasure-locations.json:1547 | W | Towards the Rampart area destroy boxes on the right and go through that hole in the alley. |
| `kh2fm.treasure.port-royal.06` | ai_docs/games/kh2fm/treasure-candidates.md:344 | ai_docs/games/kh2fm/treasure-locations.json:1553 | W | Building near Rampart entry to the left. |
| `kh2fm.treasure.port-royal.07` | ai_docs/games/kh2fm/treasure-candidates.md:345 | ai_docs/games/kh2fm/treasure-locations.json:1559 | W | Next to #4 destroy boxes go down an alley into the opening. |
| `kh2fm.treasure.port-royal.08` | ai_docs/games/kh2fm/treasure-candidates.md:346 | ai_docs/games/kh2fm/treasure-locations.json:1565 | W | To the left on the edge of the ledge. |
| `kh2fm.treasure.port-royal.09` | ai_docs/games/kh2fm/treasure-candidates.md:347 | ai_docs/games/kh2fm/treasure-locations.json:1571 | W | To the left farther along the edge. |
| `kh2fm.treasure.port-royal.10` | ai_docs/games/kh2fm/treasure-candidates.md:348 | ai_docs/games/kh2fm/treasure-locations.json:1577 | W | Inside the gap of the cave near the path leading to Moonlight Nook. |
| `kh2fm.treasure.port-royal.11` | ai_docs/games/kh2fm/treasure-candidates.md:349 | ai_docs/games/kh2fm/treasure-locations.json:1583 | W | Behind the boxes to the left where a pirate explodes from. |
| `kh2fm.treasure.port-royal.12` | ai_docs/games/kh2fm/treasure-candidates.md:350 | ai_docs/games/kh2fm/treasure-locations.json:1589 | W | To the right. |
| `kh2fm.treasure.port-royal.13` | ai_docs/games/kh2fm/treasure-candidates.md:351 | ai_docs/games/kh2fm/treasure-locations.json:1595 | W | To the right. |
| `kh2fm.treasure.port-royal.15` | ai_docs/games/kh2fm/treasure-candidates.md:352 | ai_docs/games/kh2fm/treasure-locations.json:1601 | W | Near the stairs. |
| `kh2fm.treasure.port-royal.15` | ai_docs/games/kh2fm/treasure-candidates.md:353 | ai_docs/games/kh2fm/treasure-locations.json:1607 | W | Near the save point. |
| `kh2fm.treasure.port-royal.16` | ai_docs/games/kh2fm/treasure-candidates.md:354 | ai_docs/games/kh2fm/treasure-locations.json:1613 | F | Descend the eastern ramp; beneath the Black Pearl access path. |
| `kh2fm.treasure.port-royal.17` | ai_docs/games/kh2fm/treasure-candidates.md:355 | ai_docs/games/kh2fm/treasure-locations.json:1620 | F | Northwest path, at the wall corner. |
| `kh2fm.treasure.port-royal.18` | ai_docs/games/kh2fm/treasure-candidates.md:356 | ai_docs/games/kh2fm/treasure-locations.json:1627 | F | Northeast of the Black Pearl landing. |
| `kh2fm.treasure.port-royal.19` | ai_docs/games/kh2fm/treasure-candidates.md:357 | ai_docs/games/kh2fm/treasure-locations.json:1634 | W | To the right before the bridge. |
| `kh2fm.treasure.port-royal.20` | ai_docs/games/kh2fm/treasure-candidates.md:358 | ai_docs/games/kh2fm/treasure-locations.json:1640 | W | Across the bridge to the right. |
| `kh2fm.treasure.port-royal.21` | ai_docs/games/kh2fm/treasure-candidates.md:359 | ai_docs/games/kh2fm/treasure-locations.json:1646 | W | Across the bridge and further down on the left. |
| `kh2fm.treasure.space-paranoids.01` | ai_docs/games/kh2fm/treasure-candidates.md:367 | ai_docs/games/kh2fm/treasure-locations.json:1652 | K | Northwest corner of the corridor to the transporter. |
| `kh2fm.treasure.space-paranoids.02` | ai_docs/games/kh2fm/treasure-candidates.md:368 | ai_docs/games/kh2fm/treasure-locations.json:1659 | K | North wall, beside the map chest. |
| `kh2fm.treasure.space-paranoids.03` | ai_docs/games/kh2fm/treasure-candidates.md:369 | ai_docs/games/kh2fm/treasure-locations.json:1666 | W | Up the ramp ahead. |
| `kh2fm.treasure.space-paranoids.04` | ai_docs/games/kh2fm/treasure-candidates.md:370 | ai_docs/games/kh2fm/treasure-locations.json:1672 | W | Up the ramp on the right. |
| `kh2fm.treasure.space-paranoids.05` | ai_docs/games/kh2fm/treasure-candidates.md:371 | ai_docs/games/kh2fm/treasure-locations.json:1678 | W | Over the walkway and to the left. |
| `kh2fm.treasure.space-paranoids.06` | ai_docs/games/kh2fm/treasure-candidates.md:372 | ai_docs/games/kh2fm/treasure-locations.json:1684 | K | Left of the south energy-core opening. |
| `kh2fm.treasure.space-paranoids.07` | ai_docs/games/kh2fm/treasure-candidates.md:373 | ai_docs/games/kh2fm/treasure-locations.json:1691 | K | North wall beside the windows. |
| `kh2fm.treasure.space-paranoids.08` | ai_docs/games/kh2fm/treasure-candidates.md:374 | ai_docs/games/kh2fm/treasure-locations.json:1698 | K | West corner, near the Simulation Hangar entrance. |
| `kh2fm.treasure.space-paranoids.09` | ai_docs/games/kh2fm/treasure-candidates.md:375 | ai_docs/games/kh2fm/treasure-locations.json:1705 | K | Southeast outer edge of the room. |
| `kh2fm.treasure.space-paranoids.10` | ai_docs/games/kh2fm/treasure-candidates.md:376 | ai_docs/games/kh2fm/treasure-locations.json:1712 | K | Northeast outer edge of the room. |
| `kh2fm.treasure.space-paranoids.11` | ai_docs/games/kh2fm/treasure-candidates.md:377 | ai_docs/games/kh2fm/treasure-locations.json:1719 | W | After using the Solar Sailor on the left. |
| `kh2fm.treasure.space-paranoids.12` | ai_docs/games/kh2fm/treasure-candidates.md:378 | ai_docs/games/kh2fm/treasure-locations.json:1725 | W | After using the Solar Sailor on the right. |
| `kh2fm.treasure.space-paranoids.13` | ai_docs/games/kh2fm/treasure-candidates.md:379 | ai_docs/games/kh2fm/treasure-locations.json:1731 | W | After using the Solar Sailor on the left. |
| `kh2fm.treasure.space-paranoids.14` | ai_docs/games/kh2fm/treasure-candidates.md:380 | ai_docs/games/kh2fm/treasure-locations.json:1737 | W | After using the Solar Sailor on the right. |
| `kh2fm.treasure.the-world-that-never-was.01` | ai_docs/games/kh2fm/treasure-candidates.md:388 | ai_docs/games/kh2fm/treasure-locations.json:1743 | W | Around the building in the corner to the left. |
| `kh2fm.treasure.the-world-that-never-was.02` | ai_docs/games/kh2fm/treasure-candidates.md:389 | ai_docs/games/kh2fm/treasure-locations.json:1749 | W | Around the building in the corner further left. |
| `kh2fm.treasure.the-world-that-never-was.03` | ai_docs/games/kh2fm/treasure-candidates.md:390 | ai_docs/games/kh2fm/treasure-locations.json:1755 | W | In the area with purple ground in the corner near pipes. |
| `kh2fm.treasure.the-world-that-never-was.04` | ai_docs/games/kh2fm/treasure-candidates.md:391 | ai_docs/games/kh2fm/treasure-locations.json:1761 | W | Platform to the left. |
| `kh2fm.treasure.the-world-that-never-was.05` | ai_docs/games/kh2fm/treasure-candidates.md:392 | ai_docs/games/kh2fm/treasure-locations.json:1767 | W | To the left of the skyscraper. |
| `kh2fm.treasure.the-world-that-never-was.06` | ai_docs/games/kh2fm/treasure-candidates.md:393 | ai_docs/games/kh2fm/treasure-locations.json:1773 | W | To the right of the skyscraper near the crashed semi. |
| `kh2fm.treasure.the-world-that-never-was.07` | ai_docs/games/kh2fm/treasure-candidates.md:394 | ai_docs/games/kh2fm/treasure-locations.json:1779 | W | To the left of the skyscraper. |
| `kh2fm.treasure.the-world-that-never-was.08` | ai_docs/games/kh2fm/treasure-candidates.md:395 | ai_docs/games/kh2fm/treasure-locations.json:1785 | W | In plain sight near Moogle. |
| `kh2fm.treasure.the-world-that-never-was.09` | ai_docs/games/kh2fm/treasure-candidates.md:396 | ai_docs/games/kh2fm/treasure-locations.json:1791 | W | Edge of the cliff leading to area’s exit. |
| `kh2fm.treasure.the-world-that-never-was.10` | ai_docs/games/kh2fm/treasure-candidates.md:397 | ai_docs/games/kh2fm/treasure-locations.json:1797 | W | To the left of the Crooked Ascension doorway. |
| `kh2fm.treasure.the-world-that-never-was.11` | ai_docs/games/kh2fm/treasure-candidates.md:398 | ai_docs/games/kh2fm/treasure-locations.json:1803 | W | Go up first ramp to the left on the platform. |
| `kh2fm.treasure.the-world-that-never-was.12` | ai_docs/games/kh2fm/treasure-candidates.md:399 | ai_docs/games/kh2fm/treasure-locations.json:1809 | W | On top of the staircase. |
| `kh2fm.treasure.the-world-that-never-was.13` | ai_docs/games/kh2fm/treasure-candidates.md:400 | ai_docs/games/kh2fm/treasure-locations.json:1815 | W | Near the railing to the left. |
| `kh2fm.treasure.the-world-that-never-was.14` | ai_docs/games/kh2fm/treasure-candidates.md:401 | ai_docs/games/kh2fm/treasure-locations.json:1821 | W | Up two ramps on the ledge to the left. |
| `kh2fm.treasure.the-world-that-never-was.15` | ai_docs/games/kh2fm/treasure-candidates.md:402 | ai_docs/games/kh2fm/treasure-locations.json:1827 | W | Up the third ramp to the left. |
| `kh2fm.treasure.the-world-that-never-was.16` | ai_docs/games/kh2fm/treasure-candidates.md:403 | ai_docs/games/kh2fm/treasure-locations.json:1833 | W | On first platform. |
| `kh2fm.treasure.the-world-that-never-was.17` | ai_docs/games/kh2fm/treasure-candidates.md:404 | ai_docs/games/kh2fm/treasure-locations.json:1839 | W | On second platform. |
| `kh2fm.treasure.the-world-that-never-was.18` | ai_docs/games/kh2fm/treasure-candidates.md:405 | ai_docs/games/kh2fm/treasure-locations.json:1845 | W | On third platform. |
| `kh2fm.treasure.the-world-that-never-was.19` | ai_docs/games/kh2fm/treasure-candidates.md:406 | ai_docs/games/kh2fm/treasure-locations.json:1851 | W | On final platform to the left. |

### Appendix B — All 144 puzzle candidate caveats and current routes

Every candidate `Status`/`Legacy movement lead` warning is historical KH2-029. Current instructions replace them in `src/games/kh2fm/generate.py:28–35`. The thirteen KH2-003 rows still lack a concrete landmark; all other rows are listed to show that old blanket caveats were examined, not silently carried forward. No theoretical-minimum ability claim is made.

| ID | Old candidate occurrence | Canonical instruction occurrence | Disposition |
|---|---|---|---|
| `kh2fm.puzzle.awakening.01` | ai_docs/games/kh2fm/puzzle-candidates.md:86 | ai_docs/games/kh2fm/verified-puzzle-locations.json:7 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.awakening.02` | ai_docs/games/kh2fm/puzzle-candidates.md:87 | ai_docs/games/kh2fm/verified-puzzle-locations.json:13 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.awakening.03` | ai_docs/games/kh2fm/puzzle-candidates.md:88 | ai_docs/games/kh2fm/verified-puzzle-locations.json:19 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.awakening.04` | ai_docs/games/kh2fm/puzzle-candidates.md:49 | ai_docs/games/kh2fm/verified-puzzle-locations.json:25 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.awakening.05` | ai_docs/games/kh2fm/puzzle-candidates.md:205 | ai_docs/games/kh2fm/verified-puzzle-locations.json:31 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.awakening.06` | ai_docs/games/kh2fm/puzzle-candidates.md:50 | ai_docs/games/kh2fm/verified-puzzle-locations.json:37 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.awakening.07` | ai_docs/games/kh2fm/puzzle-candidates.md:51 | ai_docs/games/kh2fm/verified-puzzle-locations.json:44 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.awakening.08` | ai_docs/games/kh2fm/puzzle-candidates.md:170 | ai_docs/games/kh2fm/verified-puzzle-locations.json:50 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.awakening.09` | ai_docs/games/kh2fm/puzzle-candidates.md:52 | ai_docs/games/kh2fm/verified-puzzle-locations.json:56 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.awakening.10` | ai_docs/games/kh2fm/puzzle-candidates.md:53 | ai_docs/games/kh2fm/verified-puzzle-locations.json:62 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.awakening.11` | ai_docs/games/kh2fm/puzzle-candidates.md:171 | ai_docs/games/kh2fm/verified-puzzle-locations.json:68 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.awakening.12` | ai_docs/games/kh2fm/puzzle-candidates.md:172 | ai_docs/games/kh2fm/verified-puzzle-locations.json:74 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.heart.01` | ai_docs/games/kh2fm/puzzle-candidates.md:66 | ai_docs/games/kh2fm/verified-puzzle-locations.json:80 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.heart.02` | ai_docs/games/kh2fm/puzzle-candidates.md:67 | ai_docs/games/kh2fm/verified-puzzle-locations.json:86 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.heart.03` | ai_docs/games/kh2fm/puzzle-candidates.md:120 | ai_docs/games/kh2fm/verified-puzzle-locations.json:92 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.heart.04` | ai_docs/games/kh2fm/puzzle-candidates.md:121 | ai_docs/games/kh2fm/verified-puzzle-locations.json:99 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.heart.05` | ai_docs/games/kh2fm/puzzle-candidates.md:135 | ai_docs/games/kh2fm/verified-puzzle-locations.json:105 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.heart.06` | ai_docs/games/kh2fm/puzzle-candidates.md:93 | ai_docs/games/kh2fm/verified-puzzle-locations.json:111 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.heart.07` | ai_docs/games/kh2fm/puzzle-candidates.md:136 | ai_docs/games/kh2fm/verified-puzzle-locations.json:117 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.heart.08` | ai_docs/games/kh2fm/puzzle-candidates.md:199 | ai_docs/games/kh2fm/verified-puzzle-locations.json:123 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.heart.09` | ai_docs/games/kh2fm/puzzle-candidates.md:122 | ai_docs/games/kh2fm/verified-puzzle-locations.json:129 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.heart.10` | ai_docs/games/kh2fm/puzzle-candidates.md:177 | ai_docs/games/kh2fm/verified-puzzle-locations.json:136 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.heart.11` | ai_docs/games/kh2fm/puzzle-candidates.md:178 | ai_docs/games/kh2fm/verified-puzzle-locations.json:142 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.heart.12` | ai_docs/games/kh2fm/puzzle-candidates.md:55 | ai_docs/games/kh2fm/verified-puzzle-locations.json:148 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.duality.01` | ai_docs/games/kh2fm/puzzle-candidates.md:41 | ai_docs/games/kh2fm/verified-puzzle-locations.json:154 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.duality.02` | ai_docs/games/kh2fm/puzzle-candidates.md:76 | ai_docs/games/kh2fm/verified-puzzle-locations.json:160 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.duality.03` | ai_docs/games/kh2fm/puzzle-candidates.md:64 | ai_docs/games/kh2fm/verified-puzzle-locations.json:166 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.duality.04` | ai_docs/games/kh2fm/puzzle-candidates.md:132 | ai_docs/games/kh2fm/verified-puzzle-locations.json:172 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.duality.05` | ai_docs/games/kh2fm/puzzle-candidates.md:29 | ai_docs/games/kh2fm/verified-puzzle-locations.json:178 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.duality.06` | ai_docs/games/kh2fm/puzzle-candidates.md:118 | ai_docs/games/kh2fm/verified-puzzle-locations.json:184 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.duality.07` | ai_docs/games/kh2fm/puzzle-candidates.md:91 | ai_docs/games/kh2fm/verified-puzzle-locations.json:190 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.duality.08` | ai_docs/games/kh2fm/puzzle-candidates.md:77 | ai_docs/games/kh2fm/verified-puzzle-locations.json:196 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.duality.09` | ai_docs/games/kh2fm/puzzle-candidates.md:197 | ai_docs/games/kh2fm/verified-puzzle-locations.json:202 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.duality.10` | ai_docs/games/kh2fm/puzzle-candidates.md:119 | ai_docs/games/kh2fm/verified-puzzle-locations.json:208 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.duality.11` | ai_docs/games/kh2fm/puzzle-candidates.md:133 | ai_docs/games/kh2fm/verified-puzzle-locations.json:214 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.duality.12` | ai_docs/games/kh2fm/puzzle-candidates.md:65 | ai_docs/games/kh2fm/verified-puzzle-locations.json:220 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.frontier.01` | ai_docs/games/kh2fm/puzzle-candidates.md:211 | ai_docs/games/kh2fm/verified-puzzle-locations.json:226 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.frontier.02` | ai_docs/games/kh2fm/puzzle-candidates.md:78 | ai_docs/games/kh2fm/verified-puzzle-locations.json:232 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.frontier.03` | ai_docs/games/kh2fm/puzzle-candidates.md:30 | ai_docs/games/kh2fm/verified-puzzle-locations.json:238 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.frontier.04` | ai_docs/games/kh2fm/puzzle-candidates.md:92 | ai_docs/games/kh2fm/verified-puzzle-locations.json:244 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.frontier.05` | ai_docs/games/kh2fm/puzzle-candidates.md:212 | ai_docs/games/kh2fm/verified-puzzle-locations.json:250 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.frontier.06` | ai_docs/games/kh2fm/puzzle-candidates.md:198 | ai_docs/games/kh2fm/verified-puzzle-locations.json:256 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.frontier.07` | ai_docs/games/kh2fm/puzzle-candidates.md:134 | ai_docs/games/kh2fm/verified-puzzle-locations.json:262 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.frontier.08` | ai_docs/games/kh2fm/puzzle-candidates.md:176 | ai_docs/games/kh2fm/verified-puzzle-locations.json:268 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.frontier.09` | ai_docs/games/kh2fm/puzzle-candidates.md:31 | ai_docs/games/kh2fm/verified-puzzle-locations.json:274 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.frontier.10` | ai_docs/games/kh2fm/puzzle-candidates.md:32 | ai_docs/games/kh2fm/verified-puzzle-locations.json:280 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.frontier.11` | ai_docs/games/kh2fm/puzzle-candidates.md:42 | ai_docs/games/kh2fm/verified-puzzle-locations.json:286 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.frontier.12` | ai_docs/games/kh2fm/puzzle-candidates.md:43 | ai_docs/games/kh2fm/verified-puzzle-locations.json:293 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.01` | ai_docs/games/kh2fm/puzzle-candidates.md:146 | ai_docs/games/kh2fm/verified-puzzle-locations.json:300 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.02` | ai_docs/games/kh2fm/puzzle-candidates.md:147 | ai_docs/games/kh2fm/verified-puzzle-locations.json:306 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.03` | ai_docs/games/kh2fm/puzzle-candidates.md:148 | ai_docs/games/kh2fm/verified-puzzle-locations.json:312 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.04` | ai_docs/games/kh2fm/puzzle-candidates.md:149 | ai_docs/games/kh2fm/verified-puzzle-locations.json:318 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.05` | ai_docs/games/kh2fm/puzzle-candidates.md:89 | ai_docs/games/kh2fm/verified-puzzle-locations.json:324 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.06` | ai_docs/games/kh2fm/puzzle-candidates.md:22 | ai_docs/games/kh2fm/verified-puzzle-locations.json:330 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.07` | ai_docs/games/kh2fm/puzzle-candidates.md:11 | ai_docs/games/kh2fm/verified-puzzle-locations.json:336 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.08` | ai_docs/games/kh2fm/puzzle-candidates.md:173 | ai_docs/games/kh2fm/verified-puzzle-locations.json:342 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.09` | ai_docs/games/kh2fm/puzzle-candidates.md:174 | ai_docs/games/kh2fm/verified-puzzle-locations.json:348 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.10` | ai_docs/games/kh2fm/puzzle-candidates.md:23 | ai_docs/games/kh2fm/verified-puzzle-locations.json:354 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.11` | ai_docs/games/kh2fm/puzzle-candidates.md:24 | ai_docs/games/kh2fm/verified-puzzle-locations.json:360 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.12` | ai_docs/games/kh2fm/puzzle-candidates.md:73 | ai_docs/games/kh2fm/verified-puzzle-locations.json:366 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.13` | ai_docs/games/kh2fm/puzzle-candidates.md:12 | ai_docs/games/kh2fm/verified-puzzle-locations.json:372 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.14` | ai_docs/games/kh2fm/puzzle-candidates.md:13 | ai_docs/games/kh2fm/verified-puzzle-locations.json:378 | KH2-003: Route: use LV2 High Jump and LV2 Aerial Dodge. |
| `kh2fm.puzzle.daylight.15` | ai_docs/games/kh2fm/puzzle-candidates.md:175 | ai_docs/games/kh2fm/verified-puzzle-locations.json:384 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.16` | ai_docs/games/kh2fm/puzzle-candidates.md:63 | ai_docs/games/kh2fm/verified-puzzle-locations.json:390 | KH2-003: Route: use LV2 High Jump, Aerial Dodge and attack. |
| `kh2fm.puzzle.daylight.17` | ai_docs/games/kh2fm/puzzle-candidates.md:185 | ai_docs/games/kh2fm/verified-puzzle-locations.json:396 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.18` | ai_docs/games/kh2fm/puzzle-candidates.md:150 | ai_docs/games/kh2fm/verified-puzzle-locations.json:402 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.19` | ai_docs/games/kh2fm/puzzle-candidates.md:14 | ai_docs/games/kh2fm/verified-puzzle-locations.json:408 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.20` | ai_docs/games/kh2fm/puzzle-candidates.md:15 | ai_docs/games/kh2fm/verified-puzzle-locations.json:414 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.21` | ai_docs/games/kh2fm/puzzle-candidates.md:74 | ai_docs/games/kh2fm/verified-puzzle-locations.json:420 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.22` | ai_docs/games/kh2fm/puzzle-candidates.md:206 | ai_docs/games/kh2fm/verified-puzzle-locations.json:426 | KH2-003: Route: use LV2 Glide. |
| `kh2fm.puzzle.daylight.23` | ai_docs/games/kh2fm/puzzle-candidates.md:224 | ai_docs/games/kh2fm/verified-puzzle-locations.json:432 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.24` | ai_docs/games/kh2fm/puzzle-candidates.md:90 | ai_docs/games/kh2fm/verified-puzzle-locations.json:438 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.25` | ai_docs/games/kh2fm/puzzle-candidates.md:114 | ai_docs/games/kh2fm/verified-puzzle-locations.json:445 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.26` | ai_docs/games/kh2fm/puzzle-candidates.md:16 | ai_docs/games/kh2fm/verified-puzzle-locations.json:451 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.27` | ai_docs/games/kh2fm/puzzle-candidates.md:207 | ai_docs/games/kh2fm/verified-puzzle-locations.json:457 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.28` | ai_docs/games/kh2fm/puzzle-candidates.md:208 | ai_docs/games/kh2fm/verified-puzzle-locations.json:463 | KH2-003: Route: use LV2 Glide and LV2 Aerial Dodge. |
| `kh2fm.puzzle.daylight.29` | ai_docs/games/kh2fm/puzzle-candidates.md:25 | ai_docs/games/kh2fm/verified-puzzle-locations.json:469 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.30` | ai_docs/games/kh2fm/puzzle-candidates.md:151 | ai_docs/games/kh2fm/verified-puzzle-locations.json:475 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.31` | ai_docs/games/kh2fm/puzzle-candidates.md:209 | ai_docs/games/kh2fm/verified-puzzle-locations.json:481 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.32` | ai_docs/games/kh2fm/puzzle-candidates.md:210 | ai_docs/games/kh2fm/verified-puzzle-locations.json:488 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.33` | ai_docs/games/kh2fm/puzzle-candidates.md:128 | ai_docs/games/kh2fm/verified-puzzle-locations.json:495 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.34` | ai_docs/games/kh2fm/puzzle-candidates.md:115 | ai_docs/games/kh2fm/verified-puzzle-locations.json:501 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.35` | ai_docs/games/kh2fm/puzzle-candidates.md:26 | ai_docs/games/kh2fm/verified-puzzle-locations.json:507 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.36` | ai_docs/games/kh2fm/puzzle-candidates.md:129 | ai_docs/games/kh2fm/verified-puzzle-locations.json:513 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.37` | ai_docs/games/kh2fm/puzzle-candidates.md:27 | ai_docs/games/kh2fm/verified-puzzle-locations.json:520 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.38` | ai_docs/games/kh2fm/puzzle-candidates.md:161 | ai_docs/games/kh2fm/verified-puzzle-locations.json:526 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.39` | ai_docs/games/kh2fm/puzzle-candidates.md:130 | ai_docs/games/kh2fm/verified-puzzle-locations.json:532 | KH2-003: Route: use LV2 Aerial Dodge to reach it. |
| `kh2fm.puzzle.daylight.40` | ai_docs/games/kh2fm/puzzle-candidates.md:116 | ai_docs/games/kh2fm/verified-puzzle-locations.json:538 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.41` | ai_docs/games/kh2fm/puzzle-candidates.md:28 | ai_docs/games/kh2fm/verified-puzzle-locations.json:544 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.42` | ai_docs/games/kh2fm/puzzle-candidates.md:152 | ai_docs/games/kh2fm/verified-puzzle-locations.json:550 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.43` | ai_docs/games/kh2fm/puzzle-candidates.md:54 | ai_docs/games/kh2fm/verified-puzzle-locations.json:556 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.44` | ai_docs/games/kh2fm/puzzle-candidates.md:75 | ai_docs/games/kh2fm/verified-puzzle-locations.json:562 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.45` | ai_docs/games/kh2fm/puzzle-candidates.md:131 | ai_docs/games/kh2fm/verified-puzzle-locations.json:568 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.46` | ai_docs/games/kh2fm/puzzle-candidates.md:117 | ai_docs/games/kh2fm/verified-puzzle-locations.json:574 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.47` | ai_docs/games/kh2fm/puzzle-candidates.md:153 | ai_docs/games/kh2fm/verified-puzzle-locations.json:580 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.daylight.48` | ai_docs/games/kh2fm/puzzle-candidates.md:154 | ai_docs/games/kh2fm/verified-puzzle-locations.json:586 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.01` | ai_docs/games/kh2fm/puzzle-candidates.md:94 | ai_docs/games/kh2fm/verified-puzzle-locations.json:592 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.02` | ai_docs/games/kh2fm/puzzle-candidates.md:213 | ai_docs/games/kh2fm/verified-puzzle-locations.json:598 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.03` | ai_docs/games/kh2fm/puzzle-candidates.md:162 | ai_docs/games/kh2fm/verified-puzzle-locations.json:604 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.04` | ai_docs/games/kh2fm/puzzle-candidates.md:95 | ai_docs/games/kh2fm/verified-puzzle-locations.json:611 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.05` | ai_docs/games/kh2fm/puzzle-candidates.md:137 | ai_docs/games/kh2fm/verified-puzzle-locations.json:617 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.06` | ai_docs/games/kh2fm/puzzle-candidates.md:96 | ai_docs/games/kh2fm/verified-puzzle-locations.json:624 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.07` | ai_docs/games/kh2fm/puzzle-candidates.md:214 | ai_docs/games/kh2fm/verified-puzzle-locations.json:630 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.08` | ai_docs/games/kh2fm/puzzle-candidates.md:215 | ai_docs/games/kh2fm/verified-puzzle-locations.json:636 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.09` | ai_docs/games/kh2fm/puzzle-candidates.md:97 | ai_docs/games/kh2fm/verified-puzzle-locations.json:642 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.10` | ai_docs/games/kh2fm/puzzle-candidates.md:216 | ai_docs/games/kh2fm/verified-puzzle-locations.json:648 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.11` | ai_docs/games/kh2fm/puzzle-candidates.md:186 | ai_docs/games/kh2fm/verified-puzzle-locations.json:654 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.12` | ai_docs/games/kh2fm/puzzle-candidates.md:98 | ai_docs/games/kh2fm/verified-puzzle-locations.json:660 | KH2-003: Route: use LV3 Aerial Dodge. Alternatively, LV2 Aerial Dodge and Reflect can be used. |
| `kh2fm.puzzle.sunset.13` | ai_docs/games/kh2fm/puzzle-candidates.md:217 | ai_docs/games/kh2fm/verified-puzzle-locations.json:666 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.14` | ai_docs/games/kh2fm/puzzle-candidates.md:99 | ai_docs/games/kh2fm/verified-puzzle-locations.json:672 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.15` | ai_docs/games/kh2fm/puzzle-candidates.md:218 | ai_docs/games/kh2fm/verified-puzzle-locations.json:678 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.16` | ai_docs/games/kh2fm/puzzle-candidates.md:100 | ai_docs/games/kh2fm/verified-puzzle-locations.json:684 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.17` | ai_docs/games/kh2fm/puzzle-candidates.md:187 | ai_docs/games/kh2fm/verified-puzzle-locations.json:690 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.18` | ai_docs/games/kh2fm/puzzle-candidates.md:33 | ai_docs/games/kh2fm/verified-puzzle-locations.json:696 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.19` | ai_docs/games/kh2fm/puzzle-candidates.md:101 | ai_docs/games/kh2fm/verified-puzzle-locations.json:702 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.20` | ai_docs/games/kh2fm/puzzle-candidates.md:188 | ai_docs/games/kh2fm/verified-puzzle-locations.json:708 | KH2-003: Route: use LV2 Glide. Alternatively, LV3 High Jump and LV3 Aerial Dodge can be used. |
| `kh2fm.puzzle.sunset.21` | ai_docs/games/kh2fm/puzzle-candidates.md:79 | ai_docs/games/kh2fm/verified-puzzle-locations.json:714 | KH2-003: Route: use LV2 Glide. |
| `kh2fm.puzzle.sunset.22` | ai_docs/games/kh2fm/puzzle-candidates.md:219 | ai_docs/games/kh2fm/verified-puzzle-locations.json:720 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.23` | ai_docs/games/kh2fm/puzzle-candidates.md:34 | ai_docs/games/kh2fm/verified-puzzle-locations.json:727 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.24` | ai_docs/games/kh2fm/puzzle-candidates.md:220 | ai_docs/games/kh2fm/verified-puzzle-locations.json:733 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.25` | ai_docs/games/kh2fm/puzzle-candidates.md:80 | ai_docs/games/kh2fm/verified-puzzle-locations.json:740 | KH2-003: Route: use LV2 Aerial Dodge or skateboard. |
| `kh2fm.puzzle.sunset.26` | ai_docs/games/kh2fm/puzzle-candidates.md:189 | ai_docs/games/kh2fm/verified-puzzle-locations.json:746 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.27` | ai_docs/games/kh2fm/puzzle-candidates.md:102 | ai_docs/games/kh2fm/verified-puzzle-locations.json:753 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.28` | ai_docs/games/kh2fm/puzzle-candidates.md:56 | ai_docs/games/kh2fm/verified-puzzle-locations.json:759 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.29` | ai_docs/games/kh2fm/puzzle-candidates.md:155 | ai_docs/games/kh2fm/verified-puzzle-locations.json:766 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.30` | ai_docs/games/kh2fm/puzzle-candidates.md:103 | ai_docs/games/kh2fm/verified-puzzle-locations.json:772 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.31` | ai_docs/games/kh2fm/puzzle-candidates.md:221 | ai_docs/games/kh2fm/verified-puzzle-locations.json:778 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.32` | ai_docs/games/kh2fm/puzzle-candidates.md:104 | ai_docs/games/kh2fm/verified-puzzle-locations.json:784 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.33` | ai_docs/games/kh2fm/puzzle-candidates.md:138 | ai_docs/games/kh2fm/verified-puzzle-locations.json:790 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.34` | ai_docs/games/kh2fm/puzzle-candidates.md:190 | ai_docs/games/kh2fm/verified-puzzle-locations.json:796 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.35` | ai_docs/games/kh2fm/puzzle-candidates.md:191 | ai_docs/games/kh2fm/verified-puzzle-locations.json:803 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.36` | ai_docs/games/kh2fm/puzzle-candidates.md:105 | ai_docs/games/kh2fm/verified-puzzle-locations.json:810 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.37` | ai_docs/games/kh2fm/puzzle-candidates.md:57 | ai_docs/games/kh2fm/verified-puzzle-locations.json:816 | KH2-003: Route: use Glide and Aerial Dodge. |
| `kh2fm.puzzle.sunset.38` | ai_docs/games/kh2fm/puzzle-candidates.md:222 | ai_docs/games/kh2fm/verified-puzzle-locations.json:822 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.39` | ai_docs/games/kh2fm/puzzle-candidates.md:139 | ai_docs/games/kh2fm/verified-puzzle-locations.json:829 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.40` | ai_docs/games/kh2fm/puzzle-candidates.md:106 | ai_docs/games/kh2fm/verified-puzzle-locations.json:835 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.41` | ai_docs/games/kh2fm/puzzle-candidates.md:35 | ai_docs/games/kh2fm/verified-puzzle-locations.json:841 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.42` | ai_docs/games/kh2fm/puzzle-candidates.md:140 | ai_docs/games/kh2fm/verified-puzzle-locations.json:847 | KH2-003: Route: use LV3 Aerial Dodge and LV2 Glide. |
| `kh2fm.puzzle.sunset.43` | ai_docs/games/kh2fm/puzzle-candidates.md:179 | ai_docs/games/kh2fm/verified-puzzle-locations.json:853 | KH2-003: Route: use LV2 Glide. |
| `kh2fm.puzzle.sunset.44` | ai_docs/games/kh2fm/puzzle-candidates.md:163 | ai_docs/games/kh2fm/verified-puzzle-locations.json:859 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.45` | ai_docs/games/kh2fm/puzzle-candidates.md:223 | ai_docs/games/kh2fm/verified-puzzle-locations.json:865 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.46` | ai_docs/games/kh2fm/puzzle-candidates.md:164 | ai_docs/games/kh2fm/verified-puzzle-locations.json:871 | KH2-029: instruction supplied; older blanket caveat superseded |
| `kh2fm.puzzle.sunset.47` | ai_docs/games/kh2fm/puzzle-candidates.md:107 | ai_docs/games/kh2fm/verified-puzzle-locations.json:877 | KH2-003: Route: use LV2 High Jump. Alternatively, LV1 High Jump and Reflect can be used. |
| `kh2fm.puzzle.sunset.48` | ai_docs/games/kh2fm/puzzle-candidates.md:108 | ai_docs/games/kh2fm/verified-puzzle-locations.json:883 | KH2-029: instruction supplied; older blanket caveat superseded |

### Appendix C — All 115 equipment candidates

KH2-006 applies to modern stat/acquisition verification, not a claim that every known acquisition is absent. Keyblade runtime IDs are shown; the other legacy names have no dedicated equipment records. Recipe/chest/reward text may already supply a partial acquisition. Row-level old unverified fields are STR/MAG/ability for weapons, and absent structured stats/acquisition for armor/accessories. Missing FM staff/shield additions are an unextracted set, not fictitious named rows.

| Candidate | Category | Evidence occurrence | Existing dedicated runtime ID | Fields/status |
|---|---|---|---|---|
| Kingdom Key | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:9 | `kh2fm.keyblades.kingdom-key` | 3 / 1 / Damage Control |
| Star Seeker | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:10 | `kh2fm.keyblades.star-seeker` | 3 / 1 / Air Combo Plus |
| Hidden Dragon | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:11 | `kh2fm.keyblades.hidden-dragon` | 2 / 2 / MP Rage |
| Hero's Crest | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:12 | `kh2fm.keyblades.hero-s-crest` | 4 / 0 / Air Combo Boost |
| Monochrome | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:13 | `kh2fm.keyblades.monochrome` | 3 / 2 / Item Boost |
| Follow the Wind | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:14 | `kh2fm.keyblades.follow-the-wind` | 3 / 1 / Draw |
| Circle of Life | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:15 | `kh2fm.keyblades.circle-of-life` | 4 / 1 / MP Haste |
| Oathkeeper | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:16 | `kh2fm.keyblades.oathkeeper` | 3 / 3 / Form Boost |
| Photon Debugger | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:17 | `kh2fm.keyblades.photon-debugger` | 3 / 2 / Thunder Boost |
| Rumbling Rose | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:18 | `kh2fm.keyblades.rumbling-rose` | 5 / 0 / Finishing Plus |
| Guardian Soul | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:19 | `kh2fm.keyblades.guardian-soul` | 5 / 1 / Reaction Boost |
| Wishing Lamp | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:20 | `kh2fm.keyblades.wishing-lamp` | 4 / 3 / Jackpot |
| Decisive Pumpkin | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:21 | `kh2fm.keyblades.decisive-pumpkin` | 6 / 1 / Combo Boost |
| Gull Wing | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:22 | `kh2fm.keyblades.gull-wing` | 2 / 3 / Experience Boost |
| Sleeping Lion | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:23 | `kh2fm.keyblades.sleeping-lion` | 5 / 3 / Combo Plus |
| Mysterious Abyss | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:24 | `kh2fm.keyblades.mysterious-abyss` | 3 / 3 / Blizzard Boost |
| Sweet Memories | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:25 | `kh2fm.keyblades.sweet-memories` | 0 / 4 / Drive Converter |
| Bond of Flame | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:26 | `kh2fm.keyblades.bond-of-flame` | 4 / 4 / Fire Boost |
| Two Become One | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:27 | `kh2fm.keyblades.two-become-one` | 5 / 4 / Light & Darkness |
| Oblivion | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:28 | `kh2fm.keyblades.oblivion` | 6 / 2 / Drive Boost |
| Fatal Crest | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:29 | `kh2fm.keyblades.fatal-crest` | 3 / 5 / Berserk Charge |
| Fenrir | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:30 | `kh2fm.keyblades.fenrir` | 7 / 1 / Negative Combo |
| Ultima Weapon | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:31 | `kh2fm.keyblades.ultima-weapon` | 6 / 4 / MP Hastega |
| Winner's Proof | Keyblades | ai_docs/games/kh2fm/equipment-candidates.md:32 | `kh2fm.keyblades.winner-s-proof` | 5 / 7 / No Experience |
| Mage's Staff | Staves | ai_docs/games/kh2fm/equipment-candidates.md:38 | No equipment ID | 1 / 1 / |
| Hammer Staff | Staves | ai_docs/games/kh2fm/equipment-candidates.md:39 | No equipment ID | 2 / 1 / |
| Comet Staff | Staves | ai_docs/games/kh2fm/equipment-candidates.md:40 | No equipment ID | 2 / 2 / |
| Victory Bell | Staves | ai_docs/games/kh2fm/equipment-candidates.md:41 | No equipment ID | 3 / 2 / |
| Lord's Broom | Staves | ai_docs/games/kh2fm/equipment-candidates.md:42 | No equipment ID | 3 / 3 / |
| Meteor Staff | Staves | ai_docs/games/kh2fm/equipment-candidates.md:43 | No equipment ID | 4 / 3 / Lucky Lucky |
| Rising Dragon | Staves | ai_docs/games/kh2fm/equipment-candidates.md:44 | No equipment ID | 4 / 4 / Item Boost |
| Wisdom Wand | Staves | ai_docs/games/kh2fm/equipment-candidates.md:45 | No equipment ID | 4 / 5 / |
| Shaman's Relic | Staves | ai_docs/games/kh2fm/equipment-candidates.md:46 | No equipment ID | 4 / 5 / MP Rage |
| Nobody Lance | Staves | ai_docs/games/kh2fm/equipment-candidates.md:47 | No equipment ID | 5 / 5 / Defender |
| Save the Queen | Staves | ai_docs/games/kh2fm/equipment-candidates.md:48 | No equipment ID | 5 / 6 / Hyper Healing |
| Save the Queen + | Staves | ai_docs/games/kh2fm/equipment-candidates.md:49 | No equipment ID | 5 / 6 / MP Hastega |
| Knight's Shield | Shields | ai_docs/games/kh2fm/equipment-candidates.md:55 | No equipment ID | 1 / 0 / - |
| Adamant Shield | Shields | ai_docs/games/kh2fm/equipment-candidates.md:56 | No equipment ID | 2 / 0 / - |
| Falling Star | Shields | ai_docs/games/kh2fm/equipment-candidates.md:57 | No equipment ID | 3 / 0 / - |
| Chain Gear | Shields | ai_docs/games/kh2fm/equipment-candidates.md:58 | No equipment ID | 3 / 0 / - |
| Dreamcloud | Shields | ai_docs/games/kh2fm/equipment-candidates.md:59 | No equipment ID | 4 / 0 / - |
| Ogre Shield | Shields | ai_docs/games/kh2fm/equipment-candidates.md:60 | No equipment ID | 5 / 0 / Defender |
| Genji Shield | Shields | ai_docs/games/kh2fm/equipment-candidates.md:61 | No equipment ID | 6 / 0 / Lucky Lucky |
| Knight Defender | Shields | ai_docs/games/kh2fm/equipment-candidates.md:62 | No equipment ID | 7 / 0 / - |
| Akashic Record | Shields | ai_docs/games/kh2fm/equipment-candidates.md:63 | No equipment ID | 7 / 0 / MP Haste |
| Nobody Guard | Shields | ai_docs/games/kh2fm/equipment-candidates.md:64 | No equipment ID | 8 / 0 / Hyper Healing |
| Save the King | Shields | ai_docs/games/kh2fm/equipment-candidates.md:65 | No equipment ID | 9 / 0 / Item Boost |
| Save the King + | Shields | ai_docs/games/kh2fm/equipment-candidates.md:66 | No equipment ID | 9 / 0 / MP Rage |
| Abas Chain | Armor | ai_docs/games/kh2fm/equipment-candidates.md:72 | No equipment ID | Not structured in legacy sheet |
| Acrisius | Armor | ai_docs/games/kh2fm/equipment-candidates.md:73 | No equipment ID | Not structured in legacy sheet |
| Acrisius+ | Armor | ai_docs/games/kh2fm/equipment-candidates.md:74 | No equipment ID | Not structured in legacy sheet |
| Aegis Chain | Armor | ai_docs/games/kh2fm/equipment-candidates.md:75 | No equipment ID | Not structured in legacy sheet |
| Blizzaga Armlet | Armor | ai_docs/games/kh2fm/equipment-candidates.md:76 | No equipment ID | Not structured in legacy sheet |
| Blizzagun Armlet | Armor | ai_docs/games/kh2fm/equipment-candidates.md:77 | No equipment ID | Not structured in legacy sheet |
| Blizzara Armlet | Armor | ai_docs/games/kh2fm/equipment-candidates.md:78 | No equipment ID | Not structured in legacy sheet |
| Blizzard Armlet | Armor | ai_docs/games/kh2fm/equipment-candidates.md:79 | No equipment ID | Not structured in legacy sheet |
| Buster Band | Armor | ai_docs/games/kh2fm/equipment-candidates.md:80 | No equipment ID | Not structured in legacy sheet |
| Champion Belt | Armor | ai_docs/games/kh2fm/equipment-candidates.md:81 | No equipment ID | Not structured in legacy sheet |
| Chaos Anklet | Armor | ai_docs/games/kh2fm/equipment-candidates.md:82 | No equipment ID | Not structured in legacy sheet |
| Cosmic Belt | Armor | ai_docs/games/kh2fm/equipment-candidates.md:83 | No equipment ID | Not structured in legacy sheet |
| Cosmic Chain | Armor | ai_docs/games/kh2fm/equipment-candidates.md:84 | No equipment ID | Not structured in legacy sheet |
| Dark Anklet | Armor | ai_docs/games/kh2fm/equipment-candidates.md:85 | No equipment ID | Not structured in legacy sheet |
| Divine Bandana | Armor | ai_docs/games/kh2fm/equipment-candidates.md:86 | No equipment ID | Not structured in legacy sheet |
| Elven Bandana | Armor | ai_docs/games/kh2fm/equipment-candidates.md:87 | No equipment ID | Not structured in legacy sheet |
| Fire Bangle | Armor | ai_docs/games/kh2fm/equipment-candidates.md:88 | No equipment ID | Not structured in legacy sheet |
| Fira Bangle | Armor | ai_docs/games/kh2fm/equipment-candidates.md:89 | No equipment ID | Not structured in legacy sheet |
| Firaga Bangle | Armor | ai_docs/games/kh2fm/equipment-candidates.md:90 | No equipment ID | Not structured in legacy sheet |
| Firagun Bangle | Armor | ai_docs/games/kh2fm/equipment-candidates.md:91 | No equipment ID | Not structured in legacy sheet |
| Gaia Belt | Armor | ai_docs/games/kh2fm/equipment-candidates.md:92 | No equipment ID | Not structured in legacy sheet |
| Midnight Anklet | Armor | ai_docs/games/kh2fm/equipment-candidates.md:93 | No equipment ID | Not structured in legacy sheet |
| Petit Ribbon | Armor | ai_docs/games/kh2fm/equipment-candidates.md:94 | No equipment ID | Not structured in legacy sheet |
| Power Band | Armor | ai_docs/games/kh2fm/equipment-candidates.md:95 | No equipment ID | Not structured in legacy sheet |
| Protect Belt | Armor | ai_docs/games/kh2fm/equipment-candidates.md:96 | No equipment ID | Not structured in legacy sheet |
| Ribbon | Armor | ai_docs/games/kh2fm/equipment-candidates.md:97 | No equipment ID | Not structured in legacy sheet |
| Shadow Anklet | Armor | ai_docs/games/kh2fm/equipment-candidates.md:98 | No equipment ID | Not structured in legacy sheet |
| Thunder Trinket | Armor | ai_docs/games/kh2fm/equipment-candidates.md:99 | No equipment ID | Not structured in legacy sheet |
| Thundara Trinket | Armor | ai_docs/games/kh2fm/equipment-candidates.md:100 | No equipment ID | Not structured in legacy sheet |
| Thundaga Trinket | Armor | ai_docs/games/kh2fm/equipment-candidates.md:101 | No equipment ID | Not structured in legacy sheet |
| Thundagun Trinket | Armor | ai_docs/games/kh2fm/equipment-candidates.md:102 | No equipment ID | Not structured in legacy sheet |
| Grand Ribbon | Armor | ai_docs/games/kh2fm/equipment-candidates.md:103 | No equipment ID | Not structured in legacy sheet |
| Shock Charm | Armor | ai_docs/games/kh2fm/equipment-candidates.md:104 | No equipment ID | Not structured in legacy sheet |
| Shock Charm+ | Armor | ai_docs/games/kh2fm/equipment-candidates.md:105 | No equipment ID | Not structured in legacy sheet |
| Ability Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:111 | No equipment ID | Not structured in legacy sheet |
| Aquamarine Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:112 | No equipment ID | Not structured in legacy sheet |
| Cosmic Arts | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:113 | No equipment ID | Not structured in legacy sheet |
| Cosmic Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:114 | No equipment ID | Not structured in legacy sheet |
| Diamond Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:115 | No equipment ID | Not structured in legacy sheet |
| Draw Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:116 | No equipment ID | Not structured in legacy sheet |
| Engineer's Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:117 | No equipment ID | Not structured in legacy sheet |
| Expert's Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:118 | No equipment ID | Not structured in legacy sheet |
| Fencer Earring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:119 | No equipment ID | Not structured in legacy sheet |
| Garnet Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:120 | No equipment ID | Not structured in legacy sheet |
| Gold Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:121 | No equipment ID | Not structured in legacy sheet |
| Lucky Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:122 | No equipment ID | Not structured in legacy sheet |
| Mage Earring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:123 | No equipment ID | Not structured in legacy sheet |
| Master's Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:124 | No equipment ID | Not structured in legacy sheet |
| Medal | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:125 | No equipment ID | Not structured in legacy sheet |
| Moon Amulet | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:126 | No equipment ID | Not structured in legacy sheet |
| Mythril Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:127 | No equipment ID | Not structured in legacy sheet |
| Orichalcum Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:128 | No equipment ID | Not structured in legacy sheet |
| Platinum Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:129 | No equipment ID | Not structured in legacy sheet |
| Sardonyx Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:130 | No equipment ID | Not structured in legacy sheet |
| Silver Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:131 | No equipment ID | Not structured in legacy sheet |
| Star Charm | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:132 | No equipment ID | Not structured in legacy sheet |
| Skill Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:133 | No equipment ID | Not structured in legacy sheet |
| Skillful Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:134 | No equipment ID | Not structured in legacy sheet |
| Slayer Earring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:135 | No equipment ID | Not structured in legacy sheet |
| Soldier Earring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:136 | No equipment ID | Not structured in legacy sheet |
| Technician's Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:137 | No equipment ID | Not structured in legacy sheet |
| Tourmaline Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:138 | No equipment ID | Not structured in legacy sheet |
| Executive's Ring | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:139 | No equipment ID | Not structured in legacy sheet |
| Full Bloom | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:140 | No equipment ID | Not structured in legacy sheet |
| Full Bloom+ | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:141 | No equipment ID | Not structured in legacy sheet |
| Shadow Archive | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:142 | No equipment ID | Not structured in legacy sheet |
| Shadow Archive+ | Accessories | ai_docs/games/kh2fm/equipment-candidates.md:143 | No equipment ID | Not structured in legacy sheet |

### Appendix D — Remaining runtime IDs, affected fields and canonical source mapping

All **389 non-treasure/non-puzzle entries**, plus **59 recipe IDs**, are enumerated. This avoids using “etc.” for repeated affected records. Each source row is an occurrence of the linked issue family; generated locations are navigational copies.

Common field mappings: `materials` → drop/location/rank/collector relations (KH2-010/012/030/037); `bestiary` → missing combat fields (019); `keyblades` → stats/acquisition detail (006); `magic/reports/summons` → area and linked acquisition normalization (005); `forms` → EXP thresholds/activation (008); `mushrooms` → access/strategy versus resolved ranks (013/023/033); `challenges` → prerequisites/strategy and structured world/area (014/023); `cups` → rule/round/strategy detail (015); `minigames` → target verification, area/access/reward/instructions (016); `gummi` → lower-rank/treasure/blueprint dependencies (018); `assembly` → dimensions/orientation (004); `prologue` → resolved scope (031); `achievements` → sourced goal, dependent missing acquisition catalogs where listed.

| Runtime ID | Issue(s) | Canonical research / generator occurrence | Generated occurrence | Record / relevant excerpt |
|---|---|---|---|---|
| `kh2fm.materials.blazing-shard` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:7 | src/games/kh2fm/catalog.ts:6621 | Blazing Shard — Hammer Frame 10%; Minute Bomb 6%. |
| `kh2fm.materials.blazing-stone` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:37 | src/games/kh2fm/catalog.ts:6648 | Blazing Stone — Cannon Gun 6%; Tornado Step 8%. |
| `kh2fm.materials.blazing-gem` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:67 | src/games/kh2fm/catalog.ts:6675 | Blazing Gem — Fat Bandit 12%; Fiery Globe 4%. |
| `kh2fm.materials.blazing-crystal` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:95 | src/games/kh2fm/catalog.ts:6702 | Blazing Crystal — Crescendo 6%; Crimson Jazz 12%. |
| `kh2fm.materials.frost-shard` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:125 | src/games/kh2fm/catalog.ts:6729 | Frost Shard — Hook Bat 6%; Lance Soldier 10%. |
| `kh2fm.materials.frost-stone` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:154 | src/games/kh2fm/catalog.ts:6756 | Frost Stone — Aeroplane 8%; Hot Rod 12%. |
| `kh2fm.materials.frost-gem` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:185 | src/games/kh2fm/catalog.ts:6783 | Frost Gem — Fortuneteller 10%; Icy Cube 4%. |
| `kh2fm.materials.frost-crystal` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:213 | src/games/kh2fm/catalog.ts:6810 | Frost Crystal — Living Bone 12%. |
| `kh2fm.materials.lightning-shard` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:232 | src/games/kh2fm/catalog.ts:6831 | Lightning Shard — Bolt Tower 10%; Rapid Thruster 4%. |
| `kh2fm.materials.lightning-stone` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:262 | src/games/kh2fm/catalog.ts:6858 | Lightning Stone — Driller Mole 6%; Emerald Blues 10%. |
| `kh2fm.materials.lightning-gem` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:293 | src/games/kh2fm/catalog.ts:6885 | Lightning Gem — Armored Knight 4%; Surveillance Robot 6%. |
| `kh2fm.materials.lightning-crystal` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:326 | src/games/kh2fm/catalog.ts:6912 | Lightning Crystal — Devastator 12%; Strafer 8%. |
| `kh2fm.materials.lucid-shard` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:358 | src/games/kh2fm/catalog.ts:6939 | Lucid Shard — Rabid Dog 6%; Trick Ghost 10%. |
| `kh2fm.materials.lucid-stone` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:389 | src/games/kh2fm/catalog.ts:6966 | Lucid Stone — Graveyard 12%; Toy Soldier 12%; Wight Knight 8%. |
| `kh2fm.materials.lucid-gem` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:429 | src/games/kh2fm/catalog.ts:6999 | Lucid Gem — Bookmaster 10%; Magnum Loader 8%. |
| `kh2fm.materials.lucid-crystal` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:457 | src/games/kh2fm/catalog.ts:7026 | Lucid Crystal — Neoshadow 8%. |
| `kh2fm.materials.power-shard` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:476 | src/games/kh2fm/catalog.ts:7047 | Power Shard — Creeper Plant 8%; Large Body 12%. |
| `kh2fm.materials.power-stone` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:505 | src/games/kh2fm/catalog.ts:7074 | Power Stone — Luna Bandit 8%; Silver Rock 6%. |
| `kh2fm.materials.power-gem` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:533 | src/games/kh2fm/catalog.ts:7101 | Power Gem — Aerial Knocker 8%; Shaman 10%. |
| `kh2fm.materials.power-crystal` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:562 | src/games/kh2fm/catalog.ts:7128 | Power Crystal — Morning Star 12%. |
| `kh2fm.materials.dark-shard` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:581 | src/games/kh2fm/catalog.ts:7149 | Dark Shard — Shadow 4%; Soldier 8%. |
| `kh2fm.materials.dark-stone` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:611 | src/games/kh2fm/catalog.ts:7176 | Dark Stone — Assault Rider 12%; Nightwalker 10%. |
| `kh2fm.materials.dark-gem` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:642 | src/games/kh2fm/catalog.ts:7203 | Dark Gem — Gargoyle Knight 10%; Gargoyle Warrior 10%. |
| `kh2fm.materials.dark-crystal` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:674 | src/games/kh2fm/catalog.ts:7230 | Dark Crystal — Air Pirate 8%. |
| `kh2fm.materials.dense-shard` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:693 | src/games/kh2fm/catalog.ts:7251 | Dense Shard — Creeper 8%; Dragoon 12%. |
| `kh2fm.materials.dense-stone` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:724 | src/games/kh2fm/catalog.ts:7278 | Dense Stone — Sniper 12%. |
| `kh2fm.materials.dense-gem` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:743 | src/games/kh2fm/catalog.ts:7299 | Dense Gem — Samurai 12%. |
| `kh2fm.materials.dense-crystal` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:762 | src/games/kh2fm/catalog.ts:7320 | Dense Crystal — Berserker 12%. |
| `kh2fm.materials.twilight-shard` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:781 | src/games/kh2fm/catalog.ts:7341 | Twilight Shard — Dusk 10%; Gambler 12%. |
| `kh2fm.materials.twilight-stone` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:812 | src/games/kh2fm/catalog.ts:7368 | Twilight Stone — Dancer 12%. |
| `kh2fm.materials.twilight-gem` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:831 | src/games/kh2fm/catalog.ts:7389 | Twilight Gem — Assassin 12%. |
| `kh2fm.materials.twilight-crystal` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:850 | src/games/kh2fm/catalog.ts:7410 | Twilight Crystal — Sorcerer 12%. |
| `kh2fm.materials.bright-shard` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:868 | src/games/kh2fm/catalog.ts:7431 | Bright Shard — Creeper Plant 4%; Hook Bat 3%; Minute Bomb 3%; Rabid Dog 3%; Soldier 4%. |
| `kh2fm.materials.bright-stone` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:929 | src/games/kh2fm/catalog.ts:7476 | Bright Stone — Aeroplane 4%; Cannon Gun 3%; Driller Mole 3%; Luna Bandit 4%; Silver Rock 3%; Tornado Step 4%; Wight Knight 4%. |
| `kh2fm.materials.bright-gem` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:1016 | src/games/kh2fm/catalog.ts:7533 | Bright Gem — Aerial Knocker 4%; Magnum Loader 4%; Surveillance Robot 3%. |
| `kh2fm.materials.bright-crystal` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:1055 | src/games/kh2fm/catalog.ts:7566 | Bright Crystal — Air Pirate 4%; Crescendo 3%; Neoshadow 4%; Strafer 4%. |
| `kh2fm.materials.energy-shard` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:1108 | src/games/kh2fm/catalog.ts:7605 | Energy Shard — Bolt Tower 4%; Gargoyle Knight 4%; Gargoyle Warrior 4%; Nightwalker 4%. |
| `kh2fm.materials.energy-stone` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:1162 | src/games/kh2fm/catalog.ts:7644 | Energy Stone — Hammer Frame 4%; Lance Soldier 4%; Trick Ghost 4%. |
| `kh2fm.materials.energy-gem` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:1205 | src/games/kh2fm/catalog.ts:7677 | Energy Gem — Emerald Blues 4%; Fortuneteller 4%. |
| `kh2fm.materials.energy-crystal` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:1234 | src/games/kh2fm/catalog.ts:7704 | Energy Crystal — Bookmaster 4%; Shaman 4%. |
| `kh2fm.materials.serenity-shard` | KH2-010, KH2-030, KH2-037, KH2-012 | ai_docs/games/kh2fm/verified-material-sources.json:1264 | src/games/kh2fm/catalog.ts:7731 | Serenity Shard — Assault Rider 4%; Fat Bandit 4%; Graveyard 4%; Hot Rod 4%; Large Body 4%; Toy Soldier 4%; Beffudler 3%; Camo Cannon 3%; Iron Hammer 4%; Bulky Vendor Conditional. |
| `kh2fm.materials.serenity-stone` | KH2-010, KH2-030, KH2-037, KH2-012 | ai_docs/games/kh2fm/verified-material-sources.json:1385 | src/games/kh2fm/catalog.ts:7807 | Serenity Stone — Crimson Jazz 4%; Devastator 4%; Living Bone 4%; Morning Star 4%; Aerial Champ 4%; Aerial Viking 4%; Lance Warrior 4%; Magic Phantom 4%; Necromancer 4%; Bulky Vendor Conditional. |
| `kh2fm.materials.serenity-gem` | KH2-010, KH2-030, KH2-037, KH2-012 | ai_docs/games/kh2fm/verified-material-sources.json:1505 | src/games/kh2fm/catalog.ts:7883 | Serenity Gem — Mad Ride 4%; Reckless 4%; Runemaster 4%; Spring Metal 4%; Bulky Vendor Conditional. |
| `kh2fm.materials.remembrance-shard` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:1567 | src/games/kh2fm/catalog.ts:7929 | Remembrance Shard — Beffudler 6%; Iron Hammer 10%; Camo Cannon 6%. |
| `kh2fm.materials.remembrance-stone` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:1604 | src/games/kh2fm/catalog.ts:7962 | Remembrance Stone — Aerial Viking 6%; Magic Phantom 10%; Lance Warrior 10%; Necromancer 10%; Aerial Champ 8%. |
| `kh2fm.materials.remembrance-gem` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:1661 | src/games/kh2fm/catalog.ts:8007 | Remembrance Gem — Spring Metal 10%; Runemaster 10%; Mad Ride 12%. |
| `kh2fm.materials.remembrance-crystal` | KH2-010, KH2-030, KH2-037 | ai_docs/games/kh2fm/verified-material-sources.json:1698 | src/games/kh2fm/catalog.ts:8040 | Remembrance Crystal — Reckless 12%. |
| `kh2fm.materials.serenity-crystal` | KH2-010, KH2-030, KH2-037, KH2-012 | ai_docs/games/kh2fm/verified-material-sources.json:1715 | src/games/kh2fm/catalog.ts:8061 | Serenity Crystal — Bulky Vendor Conditional. |
| `kh2fm.materials.mythril-shard` | KH2-010, KH2-030, KH2-037 | src/games/kh2fm/generate.py:66–76 | src/games/kh2fm/catalog.ts:8083 | Mythril Shard — Treasure chests and synthesis. |
| `kh2fm.materials.mythril-stone` | KH2-010, KH2-030, KH2-037 | src/games/kh2fm/generate.py:66–76 | src/games/kh2fm/catalog.ts:8095 | Mythril Stone — Treasure chests and synthesis. |
| `kh2fm.materials.mythril-gem` | KH2-010, KH2-030, KH2-037 | src/games/kh2fm/generate.py:66–76 | src/games/kh2fm/catalog.ts:8107 | Mythril Gem — Treasure chests and synthesis. |
| `kh2fm.materials.mythril-crystal` | KH2-010, KH2-030, KH2-037 | src/games/kh2fm/generate.py:66–76 | src/games/kh2fm/catalog.ts:8119 | Mythril Crystal — Treasure chests and synthesis. |
| `kh2fm.materials.tranquility-shard` | KH2-010, KH2-030, KH2-037 | src/games/kh2fm/generate.py:66–76 | src/games/kh2fm/catalog.ts:8131 | Tranquility Shard — Mushroom XIII challenge rewards. |
| `kh2fm.materials.tranquility-stone` | KH2-010, KH2-030, KH2-037 | src/games/kh2fm/generate.py:66–76 | src/games/kh2fm/catalog.ts:8152 | Tranquility Stone — Mushroom XIII challenge rewards. |
| `kh2fm.materials.tranquility-gem` | KH2-010, KH2-030, KH2-037 | src/games/kh2fm/generate.py:66–76 | src/games/kh2fm/catalog.ts:8173 | Tranquility Gem — Mushroom XIII challenge rewards. |
| `kh2fm.materials.tranquility-crystal` | KH2-010, KH2-030, KH2-037 | src/games/kh2fm/generate.py:66–76 | src/games/kh2fm/catalog.ts:8194 | Tranquility Crystal — Mushroom XIII challenge rewards. |
| `kh2fm.materials.orichalcum` | KH2-010, KH2-030, KH2-037, KH2-012 | src/games/kh2fm/generate.py:66–76 | src/games/kh2fm/catalog.ts:8215 | Orichalcum — Bulky Vendor reaction rewards; finite chests and collector rewards. |
| `kh2fm.materials.orichalcum-plus` | KH2-010, KH2-030, KH2-037, KH2-001 | src/games/kh2fm/generate.py:66–76 | src/games/kh2fm/catalog.ts:8238 | Orichalcum+ — Seven finite acquisitions. |
| `kh2fm.materials.lost-illusion` | KH2-010, KH2-030, KH2-037 | src/games/kh2fm/generate.py:66–76 | src/games/kh2fm/catalog.ts:8257 | Lost Illusion — Absent Silhouettes and corresponding Replica Data rewards. |
| `kh2fm.materials.manifest-illusion` | KH2-010, KH2-030, KH2-037 | src/games/kh2fm/generate.py:66–76 | src/games/kh2fm/catalog.ts:8276 | Manifest Illusion — Lingering Will rematches and synthesis; finite chests and rewards. |
| `kh2fm.keyblades.kingdom-key` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:59; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8297 | Kingdom Key — Starting weapon. |
| `kh2fm.keyblades.star-seeker` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:60; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8307 | Star Seeker — New clothes from the fairies. |
| `kh2fm.keyblades.hidden-dragon` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:61; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8317 | Hidden Dragon — Shan-Yu. |
| `kh2fm.keyblades.hero-s-crest` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:62; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8327 | Hero's Crest — Hydra. |
| `kh2fm.keyblades.monochrome` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:63; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8337 | Monochrome — Finish Timeless River. |
| `kh2fm.keyblades.follow-the-wind` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:64; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8347 | Follow the Wind — Barbossa. |
| `kh2fm.keyblades.circle-of-life` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:65; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8357 | Circle of Life — Speak to Simba at Oasis. |
| `kh2fm.keyblades.oathkeeper` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:66; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8367 | Oathkeeper — Twilight Town's second-visit gate. |
| `kh2fm.keyblades.photon-debugger` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:67; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8377 | Photon Debugger — Hostile Program. |
| `kh2fm.keyblades.rumbling-rose` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:68; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8387 | Rumbling Rose — Reunite with Beast. |
| `kh2fm.keyblades.guardian-soul` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:69; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8397 | Guardian Soul — Hades. |
| `kh2fm.keyblades.wishing-lamp` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:70; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8407 | Wishing Lamp — Jafar. |
| `kh2fm.keyblades.decisive-pumpkin` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:71; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8417 | Decisive Pumpkin — The Experiment. |
| `kh2fm.keyblades.sleeping-lion` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:72; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8427 | Sleeping Lion — Leon before second Space Paranoids visit. |
| `kh2fm.keyblades.gull-wing` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:73; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8437 | Gull Wing — Gullwings after the 1,000 Heartless battle. |
| `kh2fm.keyblades.mysterious-abyss` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:74; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8447 | Mysterious Abyss — Ursula's Revenge. |
| `kh2fm.keyblades.sweet-memories` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:75; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8457 | Sweet Memories — The Expotition. |
| `kh2fm.keyblades.bond-of-flame` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:76; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8467 | Bond of Flame — Nobodies in Betwixt and Between. |
| `kh2fm.keyblades.two-become-one` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:77; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8477 | Two Become One — Roxas. |
| `kh2fm.keyblades.oblivion` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:78; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8487 | Oblivion — Reunion with Riku. |
| `kh2fm.keyblades.fatal-crest` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:79; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8497 | Fatal Crest — Goddess of Fate Cup. |
| `kh2fm.keyblades.fenrir` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:80; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8507 | Fenrir — Sephiroth, then Cloud's follow-up. |
| `kh2fm.keyblades.winner-s-proof` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:81; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8517 | Winner's Proof — Mushroom XIII's final reward. |
| `kh2fm.keyblades.ultima-weapon` | KH2-006, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:82; src/games/kh2fm/generate.py:80–82 | src/games/kh2fm/catalog.ts:8527 | Ultima Weapon — Synthesis; Ultimate Recipe. |
| `kh2fm.forms.valor-form` | KH2-008 | ai_docs/games/kh2fm/materials-and-equipment.md:92; src/games/kh2fm/generate.py:83–84 | src/games/kh2fm/catalog.ts:8537 | Valor Form — New clothes. |
| `kh2fm.forms.wisdom-form` | KH2-008 | ai_docs/games/kh2fm/materials-and-equipment.md:93; src/games/kh2fm/generate.py:83–84 | src/games/kh2fm/catalog.ts:8548 | Wisdom Form — Timeless River clear. |
| `kh2fm.forms.limit-form` | KH2-008 | ai_docs/games/kh2fm/materials-and-equipment.md:94; src/games/kh2fm/generate.py:83–84 | src/games/kh2fm/catalog.ts:8559 | Limit Form — Second Twilight Town visit. |
| `kh2fm.forms.master-form` | KH2-008 | ai_docs/games/kh2fm/materials-and-equipment.md:95; src/games/kh2fm/generate.py:83–84 | src/games/kh2fm/catalog.ts:8570 | Master Form — Mickey reunion in Hollow Bastion. |
| `kh2fm.forms.final-form` | KH2-008 | ai_docs/games/kh2fm/materials-and-equipment.md:96; src/games/kh2fm/generate.py:83–84 | src/games/kh2fm/catalog.ts:8581 | Final Form — After Roxas; first random activation unlocks menu use. |
| `kh2fm.magic.fire-hollow-bastion-gate-defense` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:106; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8592 | Fire · Hollow Bastion gate defense — Hollow Bastion gate defense. |
| `kh2fm.magic.fire-scar` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:106; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8604 | Fire · Scar — Scar. |
| `kh2fm.magic.fire-genie-jafar` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:106; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8616 | Fire · Genie Jafar — Genie Jafar. |
| `kh2fm.magic.blizzard-merlin-meeting` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:107; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8628 | Blizzard · Merlin meeting — Merlin meeting. |
| `kh2fm.magic.blizzard-hollow-bastion-demyx` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:107; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8640 | Blizzard · Hollow Bastion Demyx — Hollow Bastion Demyx. |
| `kh2fm.magic.blizzard-atlantica-completion` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:107; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8652 | Blizzard · Atlantica completion — Atlantica completion. |
| `kh2fm.magic.thunder-hydra` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:108; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8664 | Thunder · Hydra — Hydra. |
| `kh2fm.magic.thunder-storm-rider` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:108; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8676 | Thunder · Storm Rider — Storm Rider. |
| `kh2fm.magic.thunder-groundshaker` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:108; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8688 | Thunder · Groundshaker — Groundshaker. |
| `kh2fm.magic.cure-beast-s-castle-completion` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:109; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8700 | Cure · Beast's Castle completion — Beast's Castle completion. |
| `kh2fm.magic.cure-goofy-reunion` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:109; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8712 | Cure · Goofy reunion — Goofy reunion. |
| `kh2fm.magic.cure-100-acre-wood-completion` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:109; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8724 | Cure · 100 Acre Wood completion — 100 Acre Wood completion. |
| `kh2fm.magic.magnet-oogie-boogie` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:110; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8736 | Magnet · Oogie Boogie — Oogie Boogie. |
| `kh2fm.magic.magnet-grim-reaper` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:110; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8748 | Magnet · Grim Reaper — Grim Reaper. |
| `kh2fm.magic.magnet-luxord-in-final-mix` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:110; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8760 | Magnet · Luxord in Final Mix — Luxord in Final Mix. |
| `kh2fm.magic.reflect-timeless-river-pete` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:111; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8772 | Reflect · Timeless River Pete — Timeless River Pete. |
| `kh2fm.magic.reflect-xaldin` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:111; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8784 | Reflect · Xaldin — Xaldin. |
| `kh2fm.magic.reflect-mcp` | KH2-005, KH2-032 | ai_docs/games/kh2fm/materials-and-equipment.md:111; src/games/kh2fm/generate.py:85–87,125–129 | src/games/kh2fm/catalog.ts:8796 | Reflect · MCP — MCP. |
| `kh2fm.assembly.awakening-assembly` | KH2-004 | ai_docs/games/kh2fm/world-collectibles.md:43; src/games/kh2fm/generate.py:90 | src/games/kh2fm/catalog.ts:8808 | Awakening assembly — Arrange all 12 pieces in the Journal. |
| `kh2fm.assembly.heart-assembly` | KH2-004 | ai_docs/games/kh2fm/world-collectibles.md:44; src/games/kh2fm/generate.py:90 | src/games/kh2fm/catalog.ts:8820 | Heart assembly — Arrange all 12 pieces in the Journal. |
| `kh2fm.assembly.duality-assembly` | KH2-004 | ai_docs/games/kh2fm/world-collectibles.md:45; src/games/kh2fm/generate.py:90 | src/games/kh2fm/catalog.ts:8832 | Duality assembly — Arrange all 12 pieces in the Journal. |
| `kh2fm.assembly.frontier-assembly` | KH2-004 | ai_docs/games/kh2fm/world-collectibles.md:46; src/games/kh2fm/generate.py:90 | src/games/kh2fm/catalog.ts:8844 | Frontier assembly — Arrange all 12 pieces in the Journal. |
| `kh2fm.assembly.daylight-assembly` | KH2-004 | ai_docs/games/kh2fm/world-collectibles.md:47; src/games/kh2fm/generate.py:90 | src/games/kh2fm/catalog.ts:8856 | Daylight assembly — Arrange all 48 pieces in the Journal. |
| `kh2fm.assembly.sunset-assembly` | KH2-004 | ai_docs/games/kh2fm/world-collectibles.md:48; src/games/kh2fm/generate.py:90 | src/games/kh2fm/catalog.ts:8868 | Sunset assembly — Arrange all 48 pieces in the Journal. |
| `kh2fm.reports.secret-ansem-report-1` | KH2-005 | ai_docs/games/kh2fm/world-collectibles.md:68; src/games/kh2fm/generate.py:89,130–131 | src/games/kh2fm/catalog.ts:8880 | Secret Ansem Report 1 — Finish the 1,000 Heartless battle. |
| `kh2fm.reports.secret-ansem-report-2` | KH2-005 | ai_docs/games/kh2fm/world-collectibles.md:69; src/games/kh2fm/generate.py:89,130–131 | src/games/kh2fm/catalog.ts:8890 | Secret Ansem Report 2 — Station Plaza encounter with Mickey. |
| `kh2fm.reports.secret-ansem-report-3` | KH2-005 | ai_docs/games/kh2fm/world-collectibles.md:20; src/games/kh2fm/generate.py:89,130–131 | src/games/kh2fm/catalog.ts:8900 | Secret Ansem Report 3 — Defeat Xigbar. |
| `kh2fm.reports.secret-ansem-report-4` | KH2-005 | ai_docs/games/kh2fm/world-collectibles.md:23; src/games/kh2fm/generate.py:89,130–131 | src/games/kh2fm/catalog.ts:8910 | Secret Ansem Report 4 — Defeat Xaldin. |
| `kh2fm.reports.secret-ansem-report-5` | KH2-005 | ai_docs/games/kh2fm/world-collectibles.md:19; src/games/kh2fm/generate.py:89,130–131 | src/games/kh2fm/catalog.ts:8920 | Secret Ansem Report 5 — First Demyx battle, Olympus. |
| `kh2fm.reports.secret-ansem-report-6` | KH2-005 | ai_docs/games/kh2fm/world-collectibles.md:17; src/games/kh2fm/generate.py:89,130–131 | src/games/kh2fm/catalog.ts:8930 | Secret Ansem Report 6 — Second Grim Reaper battle. |
| `kh2fm.reports.secret-ansem-report-7` | KH2-005 | ai_docs/games/kh2fm/world-collectibles.md:20; src/games/kh2fm/generate.py:89,130–131 | src/games/kh2fm/catalog.ts:8940 | Secret Ansem Report 7 — Defend Hollow Bastion's gate with Leon. |
| `kh2fm.reports.secret-ansem-report-8` | KH2-005 | ai_docs/games/kh2fm/world-collectibles.md:19; src/games/kh2fm/generate.py:89,130–131 | src/games/kh2fm/catalog.ts:8950 | Secret Ansem Report 8 — Defeat Roxas. |
| `kh2fm.reports.secret-ansem-report-9` | KH2-005 | ai_docs/games/kh2fm/world-collectibles.md:13; src/games/kh2fm/generate.py:89,130–131 | src/games/kh2fm/catalog.ts:8960 | Secret Ansem Report 9 — Defeat Luxord. |
| `kh2fm.reports.secret-ansem-report-10` | KH2-005 | ai_docs/games/kh2fm/world-collectibles.md:16; src/games/kh2fm/generate.py:89,130–131 | src/games/kh2fm/catalog.ts:8970 | Secret Ansem Report 10 — Reach the Other Twilight Town. |
| `kh2fm.reports.secret-ansem-report-11` | KH2-005 | ai_docs/games/kh2fm/world-collectibles.md:78; src/games/kh2fm/generate.py:89,130–131 | src/games/kh2fm/catalog.ts:8980 | Secret Ansem Report 11 — Riku regains his usual appearance. |
| `kh2fm.reports.secret-ansem-report-12` | KH2-005 | ai_docs/games/kh2fm/world-collectibles.md:43; src/games/kh2fm/generate.py:89,130–131 | src/games/kh2fm/catalog.ts:8990 | Secret Ansem Report 12 — Defeat Saïx. |
| `kh2fm.reports.secret-ansem-report-13` | KH2-005 | ai_docs/games/kh2fm/world-collectibles.md:22; src/games/kh2fm/generate.py:89,130–131 | src/games/kh2fm/catalog.ts:9000 | Secret Ansem Report 13 — First Xemnas battle. |
| `kh2fm.mushrooms.mushroom-xiii-1` | KH2-013, KH2-023, KH2-033 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:11; ai_docs/games/kh2fm/verified-mushroom-ranks.json:8 | src/games/kh2fm/catalog.ts:9010 | Mushroom XIII · 1 — ≥70 · Hits |
| `kh2fm.mushrooms.mushroom-xiii-2` | KH2-013, KH2-023, KH2-033 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:12; ai_docs/games/kh2fm/verified-mushroom-ranks.json:43 | src/games/kh2fm/catalog.ts:9024 | Mushroom XIII · 2 — ≥80 · Deflection/dodge score |
| `kh2fm.mushrooms.mushroom-xiii-3` | KH2-013, KH2-023, KH2-033 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:13; ai_docs/games/kh2fm/verified-mushroom-ranks.json:78 | src/games/kh2fm/catalog.ts:9038 | Mushroom XIII · 3 — ≥450 · Collected prizes |
| `kh2fm.mushrooms.mushroom-xiii-4` | KH2-013, KH2-023, KH2-033 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:14; ai_docs/games/kh2fm/verified-mushroom-ranks.json:113 | src/games/kh2fm/catalog.ts:9052 | Mushroom XIII · 4 — ≥85 · Clones defeated without a hit |
| `kh2fm.mushrooms.mushroom-xiii-5` | KH2-013, KH2-023, KH2-033 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:15; ai_docs/games/kh2fm/verified-mushroom-ranks.json:148 | src/games/kh2fm/catalog.ts:9066 | Mushroom XIII · 5 — ≤10 seconds · Defeat time |
| `kh2fm.mushrooms.mushroom-xiii-6` | KH2-013, KH2-023, KH2-033 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:16; ai_docs/games/kh2fm/verified-mushroom-ranks.json:183 | src/games/kh2fm/catalog.ts:9080 | Mushroom XIII · 6 — ≤45 seconds · Clear time |
| `kh2fm.mushrooms.mushroom-xiii-7` | KH2-013, KH2-023, KH2-033 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:17; ai_docs/games/kh2fm/verified-mushroom-ranks.json:218 | src/games/kh2fm/catalog.ts:9094 | Mushroom XIII · 7 — ≤10 seconds · Defeat time |
| `kh2fm.mushrooms.mushroom-xiii-8` | KH2-013, KH2-023, KH2-033 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:18; ai_docs/games/kh2fm/verified-mushroom-ranks.json:253 | src/games/kh2fm/catalog.ts:9108 | Mushroom XIII · 8 — ≥85 · Consecutive airborne hits |
| `kh2fm.mushrooms.mushroom-xiii-9` | KH2-013, KH2-023, KH2-033 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:19; ai_docs/games/kh2fm/verified-mushroom-ranks.json:288 | src/games/kh2fm/catalog.ts:9122 | Mushroom XIII · 9 — ≥75 · Hits while spinning |
| `kh2fm.mushrooms.mushroom-xiii-10` | KH2-013, KH2-023, KH2-033 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:20; ai_docs/games/kh2fm/verified-mushroom-ranks.json:323 | src/games/kh2fm/catalog.ts:9136 | Mushroom XIII · 10 — ≤55 seconds · Defeat real target |
| `kh2fm.mushrooms.mushroom-xiii-11` | KH2-013, KH2-023, KH2-033 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:21; ai_docs/games/kh2fm/verified-mushroom-ranks.json:358 | src/games/kh2fm/catalog.ts:9150 | Mushroom XIII · 11 — ≤19 seconds · Complete 99-hit counter |
| `kh2fm.mushrooms.mushroom-xiii-12` | KH2-013, KH2-023, KH2-033 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:22; ai_docs/games/kh2fm/verified-mushroom-ranks.json:393 | src/games/kh2fm/catalog.ts:9164 | Mushroom XIII · 12 — ≥40 · Clones defeated |
| `kh2fm.mushrooms.mushroom-xiii-13` | KH2-013, KH2-023, KH2-033 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:23; src/games/kh2fm/generate.py:93 | src/games/kh2fm/catalog.ts:9178 | Mushroom XIII · 13 — Claim final reward · All twelve appeased first |
| `kh2fm.challenges.absent-silhouette-zexion` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:33; src/games/kh2fm/generate.py:94 | src/games/kh2fm/catalog.ts:9191 | Absent Silhouette · Zexion — Olympus, Cave of the Dead: Inner Chamber; challenge after reaching the Lock |
| `kh2fm.challenges.absent-silhouette-larxene` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:34; src/games/kh2fm/generate.py:94 | src/games/kh2fm/catalog.ts:9202 | Absent Silhouette · Larxene — Port Royal, Isla de Muerta: Rock Face; after Interceptor gunpowder sequence |
| `kh2fm.challenges.absent-silhouette-lexaeus` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:35; src/games/kh2fm/generate.py:94 | src/games/kh2fm/catalog.ts:9213 | Absent Silhouette · Lexaeus — Twilight Town, Sandlot; after second-visit Nobodies |
| `kh2fm.challenges.absent-silhouette-vexen` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:36; src/games/kh2fm/generate.py:94 | src/games/kh2fm/catalog.ts:9224 | Absent Silhouette · Vexen — Agrabah, remodeled Peddler's Shop during second visit |
| `kh2fm.challenges.absent-silhouette-marluxia` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:37; src/games/kh2fm/generate.py:94 | src/games/kh2fm/catalog.ts:9235 | Absent Silhouette · Marluxia — Beast's Room, during second-visit expulsion scene |
| `kh2fm.challenges.replica-data-vexen` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:33; src/games/kh2fm/generate.py:95–96 | src/games/kh2fm/catalog.ts:9246 | Replica Data · Vexen — Defeat Vexen in the Garden of Assemblage. |
| `kh2fm.challenges.replica-data-lexaeus` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:33; src/games/kh2fm/generate.py:95–96 | src/games/kh2fm/catalog.ts:9261 | Replica Data · Lexaeus — Defeat Lexaeus in the Garden of Assemblage. |
| `kh2fm.challenges.replica-data-zexion` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:33; src/games/kh2fm/generate.py:95–96 | src/games/kh2fm/catalog.ts:9276 | Replica Data · Zexion — Defeat Zexion in the Garden of Assemblage. |
| `kh2fm.challenges.replica-data-marluxia` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:33; src/games/kh2fm/generate.py:95–96 | src/games/kh2fm/catalog.ts:9291 | Replica Data · Marluxia — Defeat Marluxia in the Garden of Assemblage. |
| `kh2fm.challenges.replica-data-larxene` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:33; src/games/kh2fm/generate.py:95–96 | src/games/kh2fm/catalog.ts:9306 | Replica Data · Larxene — Defeat Larxene in the Garden of Assemblage. |
| `kh2fm.challenges.replica-data-xemnas` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:48; src/games/kh2fm/generate.py:95–96 | src/games/kh2fm/catalog.ts:9321 | Replica Data · Xemnas — Defeat Xemnas in the Garden of Assemblage. |
| `kh2fm.challenges.replica-data-xigbar` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:49; src/games/kh2fm/generate.py:95–96 | src/games/kh2fm/catalog.ts:9336 | Replica Data · Xigbar — Defeat Xigbar in the Garden of Assemblage. |
| `kh2fm.challenges.replica-data-xaldin` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:49; src/games/kh2fm/generate.py:95–96 | src/games/kh2fm/catalog.ts:9351 | Replica Data · Xaldin — Defeat Xaldin in the Garden of Assemblage. |
| `kh2fm.challenges.replica-data-sa-x` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:49; src/games/kh2fm/generate.py:95–96 | src/games/kh2fm/catalog.ts:9366 | Replica Data · Saïx — Defeat Saïx in the Garden of Assemblage. |
| `kh2fm.challenges.replica-data-axel` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:50; src/games/kh2fm/generate.py:95–96 | src/games/kh2fm/catalog.ts:9381 | Replica Data · Axel — Defeat Axel in the Garden of Assemblage. |
| `kh2fm.challenges.replica-data-roxas` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:50; src/games/kh2fm/generate.py:95–96 | src/games/kh2fm/catalog.ts:9396 | Replica Data · Roxas — Defeat Roxas in the Garden of Assemblage. |
| `kh2fm.challenges.replica-data-demyx` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:51; src/games/kh2fm/generate.py:95–96 | src/games/kh2fm/catalog.ts:9411 | Replica Data · Demyx — Defeat Demyx in the Garden of Assemblage. |
| `kh2fm.challenges.replica-data-luxord` | KH2-014, KH2-023, KH2-024 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:51; src/games/kh2fm/generate.py:95–96 | src/games/kh2fm/catalog.ts:9426 | Replica Data · Luxord — Defeat Luxord in the Garden of Assemblage. |
| `kh2fm.cups.pain-and-panic` | KH2-015, KH2-034 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:63; src/games/kh2fm/generate.py:97 | src/games/kh2fm/catalog.ts:9441 | Pain and Panic — Journal score: 2,000. |
| `kh2fm.cups.cerberus` | KH2-015, KH2-034 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:64; src/games/kh2fm/generate.py:97 | src/games/kh2fm/catalog.ts:9457 | Cerberus — Journal score: 1,000. |
| `kh2fm.cups.titan` | KH2-015, KH2-034 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:65; src/games/kh2fm/generate.py:97 | src/games/kh2fm/catalog.ts:9473 | Titan — Journal score: 5,000. |
| `kh2fm.cups.goddess-of-fate` | KH2-015, KH2-034 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:66; src/games/kh2fm/generate.py:97 | src/games/kh2fm/catalog.ts:9489 | Goddess of Fate — Journal score: 3,000. |
| `kh2fm.cups.pain-and-panic-paradox` | KH2-015, KH2-034 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:67; src/games/kh2fm/generate.py:97 | src/games/kh2fm/catalog.ts:9505 | Pain and Panic Paradox — Journal score: 2,500. |
| `kh2fm.cups.cerberus-paradox` | KH2-015, KH2-034 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:68; src/games/kh2fm/generate.py:97 | src/games/kh2fm/catalog.ts:9520 | Cerberus Paradox — Journal score: 1,300. |
| `kh2fm.cups.titan-paradox` | KH2-015, KH2-034 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:69; src/games/kh2fm/generate.py:97 | src/games/kh2fm/catalog.ts:9535 | Titan Paradox — Journal score: 10,000. |
| `kh2fm.cups.hades-paradox` | KH2-015, KH2-034 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:70; src/games/kh2fm/generate.py:97 | src/games/kh2fm/catalog.ts:9550 | Hades Paradox — Journal score: 15,000. |
| `kh2fm.minigames.mail-delivery` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:82; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9566 | Mail Delivery — Target: ≤14 seconds. |
| `kh2fm.minigames.cargo-climb` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:83; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9577 | Cargo Climb — Target: ≤15 seconds. |
| `kh2fm.minigames.grandstander` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:84; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9588 | Grandstander — Target: ≥100. |
| `kh2fm.minigames.poster-duty` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:85; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9599 | Poster Duty — Target: ≤30 seconds. |
| `kh2fm.minigames.bumble-buster` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:86; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9610 | Bumble-Buster — Target: ≤10 seconds. |
| `kh2fm.minigames.junk-sweep` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:87; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9621 | Junk Sweep — Target: ≤5 hits. |
| `kh2fm.minigames.hayner-struggle` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:88; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9632 | Hayner Struggle — Target: Win by ≥100. |
| `kh2fm.minigames.setzer-struggle` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:89; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9643 | Setzer Struggle — Target: Win with ≥150. |
| `kh2fm.minigames.seifer-struggle` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:90; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9654 | Seifer Struggle — Target: Win with 200. |
| `kh2fm.minigames.sb-street-rave` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:91; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9665 | SB Street Rave — Target: ≥1,000. |
| `kh2fm.minigames.sb-freestyle` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:92; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9676 | SB Freestyle — Target: ≥200. |
| `kh2fm.minigames.phil-s-training-maniac` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:93; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9687 | Phil's Training, Maniac — Target: ≥1,000. |
| `kh2fm.minigames.magic-carpet` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:94; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9698 | Magic Carpet — Target: ≥65. |
| `kh2fm.minigames.sb-sand-glider` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:95; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9709 | SB Sand Glider — Target: ≥10. |
| `kh2fm.minigames.a-blustery-rescue` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:96; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9720 | A Blustery Rescue — Target: ≥18,000. |
| `kh2fm.minigames.hunny-slider` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:97; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9731 | Hunny Slider — Target: ≥8,000. |
| `kh2fm.minigames.balloon-bounce` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:98; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9742 | Balloon Bounce — Target: ≥2,000. |
| `kh2fm.minigames.the-expotition` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:99; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9753 | The Expotition — Target: ≤90 seconds. |
| `kh2fm.minigames.the-hunny-pot` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:100; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9764 | The Hunny Pot — Target: ≥8,000. |
| `kh2fm.minigames.gift-wrapping` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:101; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9775 | Gift Wrapping — Target: ≥150. |
| `kh2fm.minigames.sb-workshop-rave` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:102; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9786 | SB Workshop Rave — Target: ≥1,000. |
| `kh2fm.minigames.sb-time-attack` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:103; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9797 | SB Time Attack — Target: ≤40 seconds. |
| `kh2fm.minigames.light-cycle` | KH2-016 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:104; src/games/kh2fm/generate.py:98–99 | src/games/kh2fm/catalog.ts:9808 | Light Cycle — Target: ≥30. |
| `kh2fm.gummi.highwind-blueprint` | KH2-018, KH2-035 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:118; src/games/kh2fm/generate.py:100 | src/games/kh2fm/catalog.ts:9819 | Highwind α blueprint — Asteroid Sweep mission 2, S. |
| `kh2fm.gummi.pupu-blueprint` | KH2-018, KH2-035 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:119; src/games/kh2fm/generate.py:100 | src/games/kh2fm/catalog.ts:9829 | PuPu blueprint — Stardust Sweep mission 2, S. |
| `kh2fm.gummi.tonberry-blueprint` | KH2-018, KH2-035 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:120; src/games/kh2fm/generate.py:100 | src/games/kh2fm/catalog.ts:9839 | Tonberry blueprint — Phantom Storm mission 2, S. |
| `kh2fm.gummi.moogle-blueprint` | KH2-018, KH2-035 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:121; src/games/kh2fm/generate.py:100 | src/games/kh2fm/catalog.ts:9849 | Moogle blueprint — Splash Island mission 2, S. |
| `kh2fm.gummi.mandragora-blueprint` | KH2-018, KH2-035 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:122; src/games/kh2fm/generate.py:100 | src/games/kh2fm/catalog.ts:9859 | Mandragora blueprint — Floating Island mission 2, S. |
| `kh2fm.gummi.chocobo-blueprint` | KH2-018, KH2-035 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:123; src/games/kh2fm/generate.py:100 | src/games/kh2fm/catalog.ts:9869 | Chocobo blueprint — Ancient Highway mission 2, S. |
| `kh2fm.gummi.cactuar-blueprint` | KH2-018, KH2-035 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:124; src/games/kh2fm/generate.py:100 | src/games/kh2fm/catalog.ts:9879 | Cactuar blueprint — Broken Highway mission 2, S. |
| `kh2fm.gummi.cait-sith-blueprint` | KH2-018, KH2-035 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:125; src/games/kh2fm/generate.py:100 | src/games/kh2fm/catalog.ts:9889 | Cait Sith blueprint — Sunlight Storm mission 2, S. |
| `kh2fm.gummi.fenrir-blueprint` | KH2-018, KH2-035 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:126; src/games/kh2fm/generate.py:100 | src/games/kh2fm/catalog.ts:9899 | Fenrir blueprint — Assault of the Dreadnought mission 2, S. |
| `kh2fm.gummi.mushroom-blueprint` | KH2-018, KH2-035 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:127; src/games/kh2fm/generate.py:100 | src/games/kh2fm/catalog.ts:9909 | Mushroom blueprint — Assault of the Dreadnought mission 1, S. |
| `kh2fm.gummi.kingdom-blueprint` | KH2-018, KH2-035 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:128; src/games/kh2fm/generate.py:100 | src/games/kh2fm/catalog.ts:9919 | Kingdom blueprint — Asteroid Sweep mission 2 treasure. |
| `kh2fm.gummi.secret-blueprint` | KH2-018, KH2-035 | ai_docs/games/kh2fm/challenges-records-and-gummi.md:129; src/games/kh2fm/generate.py:100 | src/games/kh2fm/catalog.ts:9929 | Secret blueprint — Assault of the Dreadnought mission 3 treasure. |
| `kh2fm.gummi.asteroid-sweep-mission-1-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:5; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:9939 | Asteroid Sweep · Mission 1 · Normal — Reach medal level 30. |
| `kh2fm.gummi.asteroid-sweep-mission-1-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:5; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:9953 | Asteroid Sweep · Mission 1 · EX S — Reach medal level 30. |
| `kh2fm.gummi.asteroid-sweep-mission-2-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:5; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:9967 | Asteroid Sweep · Mission 2 · Normal — S rank: 500 enemy defeats. |
| `kh2fm.gummi.asteroid-sweep-mission-2-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:5; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:9981 | Asteroid Sweep · Mission 2 · EX S — S rank: 500 enemy defeats. |
| `kh2fm.gummi.asteroid-sweep-mission-3-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:5; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:9995 | Asteroid Sweep · Mission 3 · Normal — S rank: 2,900,000 points. |
| `kh2fm.gummi.asteroid-sweep-mission-3-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:5; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10009 | Asteroid Sweep · Mission 3 · EX S — S rank: 2,900,000 points. |
| `kh2fm.gummi.stardust-sweep-mission-1-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:31; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10023 | Stardust Sweep · Mission 1 · Normal — Reach medal level 30. |
| `kh2fm.gummi.stardust-sweep-mission-1-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:31; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10037 | Stardust Sweep · Mission 1 · EX S — Reach medal level 30. |
| `kh2fm.gummi.stardust-sweep-mission-2-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:31; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10051 | Stardust Sweep · Mission 2 · Normal — S rank: 500 enemy defeats. |
| `kh2fm.gummi.stardust-sweep-mission-2-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:31; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10065 | Stardust Sweep · Mission 2 · EX S — S rank: 500 enemy defeats. |
| `kh2fm.gummi.stardust-sweep-mission-3-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:31; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10079 | Stardust Sweep · Mission 3 · Normal — S rank: 3,100,000 points. |
| `kh2fm.gummi.stardust-sweep-mission-3-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:31; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10093 | Stardust Sweep · Mission 3 · EX S — S rank: 3,100,000 points. |
| `kh2fm.gummi.phantom-storm-mission-1-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:57; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10107 | Phantom Storm · Mission 1 · Normal — Reach medal level 30. |
| `kh2fm.gummi.phantom-storm-mission-1-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:57; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10121 | Phantom Storm · Mission 1 · EX S — Reach medal level 30. |
| `kh2fm.gummi.phantom-storm-mission-2-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:57; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10135 | Phantom Storm · Mission 2 · Normal — S rank: 500 enemy defeats. |
| `kh2fm.gummi.phantom-storm-mission-2-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:57; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10149 | Phantom Storm · Mission 2 · EX S — S rank: 500 enemy defeats. |
| `kh2fm.gummi.phantom-storm-mission-3-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:57; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10163 | Phantom Storm · Mission 3 · Normal — S rank: 3,100,000 points. |
| `kh2fm.gummi.phantom-storm-mission-3-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:57; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10177 | Phantom Storm · Mission 3 · EX S — S rank: 3,100,000 points. |
| `kh2fm.gummi.splash-island-mission-1-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:83; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10191 | Splash Island · Mission 1 · Normal — Reach medal level 30. |
| `kh2fm.gummi.splash-island-mission-1-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:83; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10205 | Splash Island · Mission 1 · EX S — Reach medal level 30. |
| `kh2fm.gummi.splash-island-mission-2-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:83; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10219 | Splash Island · Mission 2 · Normal — S rank: 350 enemy defeats. |
| `kh2fm.gummi.splash-island-mission-2-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:83; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10233 | Splash Island · Mission 2 · EX S — S rank: 350 enemy defeats. |
| `kh2fm.gummi.splash-island-mission-3-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:83; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10247 | Splash Island · Mission 3 · Normal — S rank: 1,700,000 points. |
| `kh2fm.gummi.splash-island-mission-3-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:83; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10261 | Splash Island · Mission 3 · EX S — S rank: 1,700,000 points. |
| `kh2fm.gummi.floating-island-mission-1-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:109; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10275 | Floating Island · Mission 1 · Normal — Reach medal level 30. |
| `kh2fm.gummi.floating-island-mission-1-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:109; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10289 | Floating Island · Mission 1 · EX S — Reach medal level 30. |
| `kh2fm.gummi.floating-island-mission-2-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:109; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10303 | Floating Island · Mission 2 · Normal — S rank: 300 enemy defeats. |
| `kh2fm.gummi.floating-island-mission-2-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:109; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10317 | Floating Island · Mission 2 · EX S — S rank: 300 enemy defeats. |
| `kh2fm.gummi.floating-island-mission-3-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:109; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10331 | Floating Island · Mission 3 · Normal — S rank: 1,900,000 points. |
| `kh2fm.gummi.floating-island-mission-3-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:109; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10345 | Floating Island · Mission 3 · EX S — S rank: 1,900,000 points. |
| `kh2fm.gummi.ancient-highway-mission-1-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:135; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10359 | Ancient Highway · Mission 1 · Normal — Reach medal level 30. |
| `kh2fm.gummi.ancient-highway-mission-1-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:135; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10373 | Ancient Highway · Mission 1 · EX S — Reach medal level 30. |
| `kh2fm.gummi.ancient-highway-mission-2-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:135; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10387 | Ancient Highway · Mission 2 · Normal — S rank: 350 enemy defeats. |
| `kh2fm.gummi.ancient-highway-mission-2-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:135; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10401 | Ancient Highway · Mission 2 · EX S — S rank: 350 enemy defeats. |
| `kh2fm.gummi.ancient-highway-mission-3-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:135; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10415 | Ancient Highway · Mission 3 · Normal — S rank: 1,900,000 points. |
| `kh2fm.gummi.ancient-highway-mission-3-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:135; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10429 | Ancient Highway · Mission 3 · EX S — S rank: 1,900,000 points. |
| `kh2fm.gummi.broken-highway-mission-1-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:161; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10443 | Broken Highway · Mission 1 · Normal — Reach medal level 30. |
| `kh2fm.gummi.broken-highway-mission-1-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:161; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10457 | Broken Highway · Mission 1 · EX S — Reach medal level 30. |
| `kh2fm.gummi.broken-highway-mission-2-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:161; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10471 | Broken Highway · Mission 2 · Normal — S rank: 350 enemy defeats. |
| `kh2fm.gummi.broken-highway-mission-2-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:161; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10485 | Broken Highway · Mission 2 · EX S — S rank: 350 enemy defeats. |
| `kh2fm.gummi.broken-highway-mission-3-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:161; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10499 | Broken Highway · Mission 3 · Normal — S rank: 2,100,000 points. |
| `kh2fm.gummi.broken-highway-mission-3-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:161; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10513 | Broken Highway · Mission 3 · EX S — S rank: 2,100,000 points. |
| `kh2fm.gummi.sunlight-storm-mission-1-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:187; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10527 | Sunlight Storm · Mission 1 · Normal — Reach medal level 30. |
| `kh2fm.gummi.sunlight-storm-mission-1-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:187; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10541 | Sunlight Storm · Mission 1 · EX S — Reach medal level 30. |
| `kh2fm.gummi.sunlight-storm-mission-2-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:187; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10555 | Sunlight Storm · Mission 2 · Normal — S rank: 600 enemy defeats. |
| `kh2fm.gummi.sunlight-storm-mission-2-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:187; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10569 | Sunlight Storm · Mission 2 · EX S — S rank: 600 enemy defeats. |
| `kh2fm.gummi.sunlight-storm-mission-3-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:187; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10583 | Sunlight Storm · Mission 3 · Normal — S rank: 3,600,000 points. |
| `kh2fm.gummi.sunlight-storm-mission-3-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:187; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10597 | Sunlight Storm · Mission 3 · EX S — S rank: 3,600,000 points. |
| `kh2fm.gummi.assault-of-the-dreadnought-mission-1-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:213; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10611 | Assault of the Dreadnought · Mission 1 · Normal — Reach medal level 30. |
| `kh2fm.gummi.assault-of-the-dreadnought-mission-1-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:213; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10625 | Assault of the Dreadnought · Mission 1 · EX S — Reach medal level 30. |
| `kh2fm.gummi.assault-of-the-dreadnought-mission-2-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:213; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10639 | Assault of the Dreadnought · Mission 2 · Normal — S rank: 650 enemy defeats. |
| `kh2fm.gummi.assault-of-the-dreadnought-mission-2-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:213; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10653 | Assault of the Dreadnought · Mission 2 · EX S — S rank: 650 enemy defeats. |
| `kh2fm.gummi.assault-of-the-dreadnought-mission-3-normal` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:213; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10667 | Assault of the Dreadnought · Mission 3 · Normal — S rank: 7,000,000 points. |
| `kh2fm.gummi.assault-of-the-dreadnought-mission-3-ex-s` | KH2-018, KH2-035 | ai_docs/games/kh2fm/verified-gummi-missions.json:213; src/games/kh2fm/generate.py:101–107 | src/games/kh2fm/catalog.ts:10681 | Assault of the Dreadnought · Mission 3 · EX S — S rank: 7,000,000 points. |
| `kh2fm.summons.baseball-charm` | KH2-005, KH2-009 | ai_docs/games/kh2fm/materials-and-equipment.md:113; src/games/kh2fm/generate.py:108–109 | src/games/kh2fm/catalog.ts:10695 | Baseball Charm — Receive from Merlin when he explains Pooh’s damaged book. |
| `kh2fm.summons.lamp-charm` | KH2-005, KH2-009 | ai_docs/games/kh2fm/materials-and-equipment.md:113; src/games/kh2fm/generate.py:108–109 | src/games/kh2fm/catalog.ts:10706 | Lamp Charm — Complete the first Agrabah visit. |
| `kh2fm.bestiary.aerial-champ` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:10717 | Aerial Champ — Serenity Stone 4%; Remembrance Stone 8%. |
| `kh2fm.bestiary.aerial-knocker` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:10742 | Aerial Knocker — Power Gem 8%; Bright Gem 4%. |
| `kh2fm.bestiary.aerial-viking` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:10761 | Aerial Viking — Serenity Stone 4%; Remembrance Stone 6%. |
| `kh2fm.bestiary.aeroplane` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:10786 | Aeroplane — Frost Stone 8%; Bright Stone 4%. |
| `kh2fm.bestiary.air-pirate` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:10809 | Air Pirate — Dark Crystal 8%; Bright Crystal 4%. |
| `kh2fm.bestiary.armored-knight` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:10828 | Armored Knight — Lightning Gem 4%. |
| `kh2fm.bestiary.assassin` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:10844 | Assassin — Twilight Gem 12%. |
| `kh2fm.bestiary.assault-rider` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:10859 | Assault Rider — Dark Stone 12%; Serenity Shard 4%. |
| `kh2fm.bestiary.beffudler` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:10885 | Beffudler — Serenity Shard 3%; Remembrance Shard 6%. |
| `kh2fm.bestiary.berserker` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:10910 | Berserker — Dense Crystal 12%. |
| `kh2fm.bestiary.bolt-tower` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:10925 | Bolt Tower — Lightning Shard 10%; Energy Shard 4%. |
| `kh2fm.bestiary.bookmaster` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:10945 | Bookmaster — Lucid Gem 10%; Energy Crystal 4%. |
| `kh2fm.bestiary.camo-cannon` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:10963 | Camo Cannon — Serenity Shard 3%; Remembrance Shard 6%. |
| `kh2fm.bestiary.cannon-gun` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:10988 | Cannon Gun — Blazing Stone 6%; Bright Stone 3%. |
| `kh2fm.bestiary.creeper` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11010 | Creeper — Dense Shard 8%. |
| `kh2fm.bestiary.creeper-plant` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11026 | Creeper Plant — Power Shard 8%; Bright Shard 4%. |
| `kh2fm.bestiary.crescendo` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11047 | Crescendo — Blazing Crystal 6%; Bright Crystal 3%. |
| `kh2fm.bestiary.crimson-jazz` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11067 | Crimson Jazz — Blazing Crystal 12%; Serenity Stone 4%. |
| `kh2fm.bestiary.dancer` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11093 | Dancer — Twilight Stone 12%. |
| `kh2fm.bestiary.devastator` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11108 | Devastator — Lightning Crystal 12%; Serenity Stone 4%. |
| `kh2fm.bestiary.dragoon` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11134 | Dragoon — Dense Shard 12%. |
| `kh2fm.bestiary.driller-mole` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11150 | Driller Mole — Lightning Stone 6%; Bright Stone 3%. |
| `kh2fm.bestiary.dusk` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11173 | Dusk — Twilight Shard 10%. |
| `kh2fm.bestiary.emerald-blues` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11189 | Emerald Blues — Lightning Stone 10%; Energy Gem 4%. |
| `kh2fm.bestiary.fat-bandit` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11207 | Fat Bandit — Blazing Gem 12%; Serenity Shard 4%. |
| `kh2fm.bestiary.fiery-globe` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11233 | Fiery Globe — Blazing Gem 4%. |
| `kh2fm.bestiary.fortuneteller` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11249 | Fortuneteller — Frost Gem 10%; Energy Gem 4%. |
| `kh2fm.bestiary.gambler` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11267 | Gambler — Twilight Shard 12%. |
| `kh2fm.bestiary.gargoyle-knight` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11283 | Gargoyle Knight — Dark Gem 10%; Energy Shard 4%. |
| `kh2fm.bestiary.gargoyle-warrior` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11302 | Gargoyle Warrior — Dark Gem 10%; Energy Shard 4%. |
| `kh2fm.bestiary.graveyard` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11321 | Graveyard — Lucid Stone 12%; Serenity Shard 4%. |
| `kh2fm.bestiary.hammer-frame` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11347 | Hammer Frame — Blazing Shard 10%; Energy Stone 4%. |
| `kh2fm.bestiary.hook-bat` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11366 | Hook Bat — Frost Shard 6%; Bright Shard 3%. |
| `kh2fm.bestiary.hot-rod` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11387 | Hot Rod — Frost Stone 12%; Serenity Shard 4%. |
| `kh2fm.bestiary.icy-cube` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11413 | Icy Cube — Frost Gem 4%. |
| `kh2fm.bestiary.iron-hammer` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11429 | Iron Hammer — Serenity Shard 4%; Remembrance Shard 10%. |
| `kh2fm.bestiary.lance-soldier` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11454 | Lance Soldier — Frost Shard 10%; Energy Stone 4%. |
| `kh2fm.bestiary.lance-warrior` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11473 | Lance Warrior — Serenity Stone 4%; Remembrance Stone 10%. |
| `kh2fm.bestiary.large-body` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11498 | Large Body — Power Shard 12%; Serenity Shard 4%. |
| `kh2fm.bestiary.living-bone` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11524 | Living Bone — Frost Crystal 12%; Serenity Stone 4%. |
| `kh2fm.bestiary.luna-bandit` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11549 | Luna Bandit — Power Stone 8%; Bright Stone 4%. |
| `kh2fm.bestiary.mad-ride` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11571 | Mad Ride — Serenity Gem 4%; Remembrance Gem 12%. |
| `kh2fm.bestiary.magic-phantom` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11591 | Magic Phantom — Serenity Stone 4%; Remembrance Stone 10%. |
| `kh2fm.bestiary.magnum-loader` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11616 | Magnum Loader — Lucid Gem 8%; Bright Gem 4%. |
| `kh2fm.bestiary.minute-bomb` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11635 | Minute Bomb — Blazing Shard 6%; Bright Shard 3%. |
| `kh2fm.bestiary.morning-star` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11656 | Morning Star — Power Crystal 12%; Serenity Stone 4%. |
| `kh2fm.bestiary.necromancer` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11681 | Necromancer — Serenity Stone 4%; Remembrance Stone 10%. |
| `kh2fm.bestiary.neoshadow` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11706 | Neoshadow — Lucid Crystal 8%; Bright Crystal 4%. |
| `kh2fm.bestiary.nightwalker` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11725 | Nightwalker — Dark Stone 10%; Energy Shard 4%. |
| `kh2fm.bestiary.rabid-dog` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11745 | Rabid Dog — Lucid Shard 6%; Bright Shard 3%. |
| `kh2fm.bestiary.rapid-thruster` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11766 | Rapid Thruster — Lightning Shard 4%. |
| `kh2fm.bestiary.reckless` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11782 | Reckless — Serenity Gem 4%; Remembrance Crystal 12%. |
| `kh2fm.bestiary.runemaster` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11802 | Runemaster — Serenity Gem 4%; Remembrance Gem 10%. |
| `kh2fm.bestiary.samurai` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11822 | Samurai — Dense Gem 12%. |
| `kh2fm.bestiary.shadow` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11837 | Shadow — Dark Shard 4%. |
| `kh2fm.bestiary.shaman` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11853 | Shaman — Power Gem 10%; Energy Crystal 4%. |
| `kh2fm.bestiary.silver-rock` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11871 | Silver Rock — Power Stone 6%; Bright Stone 3%. |
| `kh2fm.bestiary.sniper` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11893 | Sniper — Dense Stone 12%. |
| `kh2fm.bestiary.soldier` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11908 | Soldier — Dark Shard 8%; Bright Shard 4%. |
| `kh2fm.bestiary.sorcerer` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11929 | Sorcerer — Twilight Crystal 12%. |
| `kh2fm.bestiary.spring-metal` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11944 | Spring Metal — Serenity Gem 4%; Remembrance Gem 10%. |
| `kh2fm.bestiary.strafer` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11964 | Strafer — Lightning Crystal 8%; Bright Crystal 4%. |
| `kh2fm.bestiary.surveillance-robot` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:11984 | Surveillance Robot — Lightning Gem 6%; Bright Gem 3%. |
| `kh2fm.bestiary.tornado-step` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:12003 | Tornado Step — Blazing Stone 8%; Bright Stone 4%. |
| `kh2fm.bestiary.toy-soldier` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:12025 | Toy Soldier — Lucid Stone 12%; Serenity Shard 4%. |
| `kh2fm.bestiary.trick-ghost` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:12051 | Trick Ghost — Lucid Shard 10%; Energy Stone 4%. |
| `kh2fm.bestiary.wight-knight` | KH2-019, KH2-030, KH2-037 | src/games/kh2fm/generate.py:132–142 (all material-drop occurrences below) | src/games/kh2fm/catalog.ts:12070 | Wight Knight — Lucid Stone 8%; Bright Stone 4%. |
| `kh2fm.achievements.a-timeless-world` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:6; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12094 | A Timeless World — Timeless River complete. |
| `kh2fm.achievements.above-honor` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:15; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12106 | Above Honor — Land of Dragons episodes complete. |
| `kh2fm.achievements.a-budding-romance` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:24; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12118 | A Budding Romance — Beast’s Castle episodes complete. |
| `kh2fm.achievements.lifting-the-curse` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:33; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12130 | Lifting the Curse — Port Royal episodes complete. |
| `kh2fm.achievements.what-friends-are-for` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:42; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12142 | What Friends Are For — Agrabah episodes complete. |
| `kh2fm.achievements.the-gift-of-love` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:51; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12154 | The Gift of Love — Halloween Town episodes complete. |
| `kh2fm.achievements.hail-the-hero` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:60; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12166 | Hail the Hero — Olympus episodes complete. |
| `kh2fm.achievements.a-taste-of-the-past` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:69; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12178 | A Taste of the Past — Twilight Town episodes complete. |
| `kh2fm.achievements.return-of-the-king` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:78; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12190 | Return of the King — Pride Lands episodes complete. |
| `kh2fm.achievements.electric-spark` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:87; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12202 | Electric Spark — Space Paranoids episodes complete. |
| `kh2fm.achievements.always-together` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:96; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12214 | Always Together — 100 Acre Wood complete. |
| `kh2fm.achievements.kindred-spirits` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:105; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12226 | Kindred Spirits — Atlantica episodes complete. |
| `kh2fm.achievements.rookie` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:114; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12238 | Rookie — Pain and Panic Cup victory. |
| `kh2fm.achievements.novice-hero` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:123; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12250 | Novice Hero — Cerberus Cup victory. |
| `kh2fm.achievements.artisan-hero` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:132; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12262 | Artisan Hero — Titan Cup victory. |
| `kh2fm.achievements.true-hero` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:141; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12274 | True Hero — Goddess of Fate Cup victory. |
| `kh2fm.achievements.struggle-champion` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:150; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12286 | Struggle Champion — Take every opponent orb. |
| `kh2fm.achievements.nobody-know-it-all` | KH2-031, KH2-038, KH2-019 | ai_docs/games/kh2fm/verified-steam-achievements.json:159; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12298 | Nobody Know-It-All — Complete Nobody Journal entries. |
| `kh2fm.achievements.navigator` | KH2-031, KH2-038, KH2-005 | ai_docs/games/kh2fm/verified-steam-achievements.json:168; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12310 | Navigator — Collect all maps. |
| `kh2fm.achievements.puzzler` | KH2-031, KH2-038, KH2-004 | ai_docs/games/kh2fm/verified-steam-achievements.json:177; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12322 | Puzzler — Assemble every puzzle. |
| `kh2fm.achievements.level-master` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:186; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12334 | Level Master — Raise Sora to level 99. |
| `kh2fm.achievements.veteran-pilot` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:195; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12346 | Veteran Pilot — Earn a Gummi S rank. |
| `kh2fm.achievements.gummi-ship-collector` | KH2-031, KH2-038, KH2-018 | ai_docs/games/kh2fm/verified-steam-achievements.json:204; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12358 | Gummi Ship Collector — Collect every Gummi ship blueprint. |
| `kh2fm.achievements.critical-competitor` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:214; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12371 | Critical Competitor — Finish on Critical. |
| `kh2fm.achievements.proud-player` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:223; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12383 | Proud Player — Finish on Proud or Critical. |
| `kh2fm.achievements.ambitious-adventurer` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:232; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12395 | Ambitious Adventurer — Finish the story and watch the ending. |
| `kh2fm.achievements.summer-s-end` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:241; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12407 | Summer's End — Finish the Roxas prologue. |
| `kh2fm.achievements.coliseum-competitor` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:250; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12419 | Coliseum Competitor — Win Pain and Panic Paradox. |
| `kh2fm.achievements.coliseum-star` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:259; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12431 | Coliseum Star — Win Cerberus Paradox. |
| `kh2fm.achievements.hero-of-the-coliseum` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:268; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12443 | Hero of the Coliseum — Win Titan Paradox. |
| `kh2fm.achievements.coliseum-champion` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:277; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12455 | Coliseum Champion — Win Hades Paradox. |
| `kh2fm.achievements.searcher` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:286; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12467 | Searcher — Record all thirteen Secret Ansem Reports. |
| `kh2fm.achievements.professor` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:295; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12479 | Professor — Complete the Journal character roster. |
| `kh2fm.achievements.heartless-highbrow` | KH2-031, KH2-038, KH2-019 | ai_docs/games/kh2fm/verified-steam-achievements.json:304; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12491 | Heartless Highbrow — Complete the Journal Heartless roster. |
| `kh2fm.achievements.treasure-hunter` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:313; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12503 | Treasure Hunter — Finish the Journal treasure list. |
| `kh2fm.achievements.conqueror` | KH2-031, KH2-038, KH2-013, KH2-015, KH2-016, KH2-017 | ai_docs/games/kh2fm/verified-steam-achievements.json:323; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12516 | Conqueror — Complete every Journal mission. |
| `kh2fm.achievements.minigame-maniac` | KH2-031, KH2-038, KH2-016, KH2-017 | ai_docs/games/kh2fm/verified-steam-achievements.json:332; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12528 | Minigame Maniac — Complete the Journal minigame list. |
| `kh2fm.achievements.limit-master` | KH2-031, KH2-038, KH2-020 | ai_docs/games/kh2fm/verified-steam-achievements.json:341; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12540 | Limit Master — Record every Journal Limit. |
| `kh2fm.achievements.craftsman` | KH2-031, KH2-038, KH2-001, KH2-010, KH2-011 | ai_docs/games/kh2fm/verified-steam-achievements.json:350; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12552 | Craftsman — Complete Synthesis Notes. |
| `kh2fm.achievements.seeker` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:361; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12566 | Seeker — Complete Character Links. |
| `kh2fm.achievements.ace-pilot` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:370; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12578 | Ace Pilot — Earn a normal-mission S rank on every Gummi route. |
| `kh2fm.achievements.top-gun` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:379; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12590 | Top Gun — Earn an EX-mission S rank on every Gummi route. |
| `kh2fm.achievements.mushroom-master` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:388; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12602 | Mushroom Master — Appease all thirteen Mushrooms. |
| `kh2fm.achievements.pro-skater` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:397; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12614 | Pro Skater — Score 5,000 skateboard points. |
| `kh2fm.achievements.reunion` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:406; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12626 | Reunion — Rejoin Riku and Kairi. |
| `kh2fm.achievements.my-hero` | KH2-031, KH2-038, KH2-021 | ai_docs/games/kh2fm/verified-steam-achievements.json:415; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12638 | My Hero — Have Mickey rescue Sora. |
| `kh2fm.achievements.lingering-will` | KH2-031, KH2-038, KH2-014, KH2-024 | ai_docs/games/kh2fm/verified-steam-achievements.json:424; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12650 | Lingering Will — Win against Lingering Will. |
| `kh2fm.achievements.one-winged-angel` | KH2-031, KH2-038, KH2-014, KH2-024 | ai_docs/games/kh2fm/verified-steam-achievements.json:433; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12662 | One-Winged Angel — Win against Sephiroth. |
| `kh2fm.achievements.to-rule-them-all` | KH2-031, KH2-038 | ai_docs/games/kh2fm/verified-steam-achievements.json:442; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12674 | To Rule Them All — Win all thirteen Replica Data battles. |
| `kh2fm.achievements.corroded-by-darkness` | KH2-031, KH2-038, KH2-008 | ai_docs/games/kh2fm/verified-steam-achievements.json:451; src/games/kh2fm/generate.py:143–146 | src/games/kh2fm/catalog.ts:12686 | Corroded by Darkness — Enter Antiform thirteen times. |
| `kh2fm.prologue.serenity` | KH2-031 | ai_docs/games/kh2fm/verified-prologue-chests.json:6; src/games/kh2fm/generate.py:147–149 | src/games/kh2fm/catalog.ts:12702 | Potion · Station of Serenity — Day 3: Potion. |
| `kh2fm.prologue.calling` | KH2-031 | ai_docs/games/kh2fm/verified-prologue-chests.json:21; src/games/kh2fm/generate.py:147–149 | src/games/kh2fm/catalog.ts:12721 | Potion · Station of Calling — Day 3: Potion. |
| `kh2fm.prologue.station-southwest` | KH2-031 | ai_docs/games/kh2fm/verified-prologue-chests.json:36; src/games/kh2fm/generate.py:147–149 | src/games/kh2fm/catalog.ts:12740 | Potion · Southwest corner — Day 5: Potion. |
| `kh2fm.prologue.station-northeast` | KH2-031 | ai_docs/games/kh2fm/verified-prologue-chests.json:51; src/games/kh2fm/generate.py:147–149 | src/games/kh2fm/catalog.ts:12759 | Potion · Northeast corner — Day 5: Potion. |
| `kh2fm.prologue.station-train` | KH2-031 | ai_docs/games/kh2fm/verified-prologue-chests.json:66; src/games/kh2fm/generate.py:147–149 | src/games/kh2fm/catalog.ts:12778 | Hi-Potion · Central Station — Day 5: Hi-Potion. |
| `kh2fm.prologue.terrace-hill` | KH2-031 | ai_docs/games/kh2fm/verified-prologue-chests.json:81; src/games/kh2fm/generate.py:147–149 | src/games/kh2fm/catalog.ts:12797 | Potion · Sunset Hill entrance — Day 5: Potion. |
| `kh2fm.prologue.terrace-roof-base` | KH2-031 | ai_docs/games/kh2fm/verified-prologue-chests.json:96; src/games/kh2fm/generate.py:147–149 | src/games/kh2fm/catalog.ts:12816 | Potion · Below the roof — Day 5: Potion. |
| `kh2fm.prologue.terrace-stream` | KH2-031 | ai_docs/games/kh2fm/verified-prologue-chests.json:111; src/games/kh2fm/generate.py:147–149 | src/games/kh2fm/catalog.ts:12835 | Hi-Potion · Sunset Terrace — Day 5: Hi-Potion. |
| `kh2fm.prologue.terrace-roof` | KH2-031 | ai_docs/games/kh2fm/verified-prologue-chests.json:126; src/games/kh2fm/generate.py:147–149 | src/games/kh2fm/catalog.ts:12854 | Ability Ring · Sunset Terrace — Day 5: Ability Ring. |
| `kh2fm.prologue.foyer-west` | KH2-031 | ai_docs/games/kh2fm/verified-prologue-chests.json:141; src/games/kh2fm/generate.py:147–149 | src/games/kh2fm/catalog.ts:12873 | Potion · West staircase — Day 6: Potion. |
| `kh2fm.prologue.foyer-east` | KH2-031 | ai_docs/games/kh2fm/verified-prologue-chests.json:156; src/games/kh2fm/generate.py:147–149 | src/games/kh2fm/catalog.ts:12892 | Potion · Library landing — Day 6: Potion. |
| `kh2fm.prologue.foyer-window` | KH2-031 | ai_docs/games/kh2fm/verified-prologue-chests.json:171; src/games/kh2fm/generate.py:147–149 | src/games/kh2fm/catalog.ts:12911 | Hi-Potion · Mansion: Foyer — Day 6: Hi-Potion. |
| `kh2fm.prologue.dining-potion` | KH2-031 | ai_docs/games/kh2fm/verified-prologue-chests.json:186; src/games/kh2fm/generate.py:147–149 | src/games/kh2fm/catalog.ts:12930 | Potion · Mansion: Dining Room — Day 6: Potion. |
| `kh2fm.prologue.dining-bandanna` | KH2-031 | ai_docs/games/kh2fm/verified-prologue-chests.json:201; src/games/kh2fm/generate.py:147–149 | src/games/kh2fm/catalog.ts:12949 | Elven Bandanna · Mansion: Dining Room — Day 6: Elven Bandanna. |
| `kh2fm.prologue.library` | KH2-031 | ai_docs/games/kh2fm/verified-prologue-chests.json:216; src/games/kh2fm/generate.py:147–149 | src/games/kh2fm/catalog.ts:12968 | Hi-Potion · Mansion: Library — Day 6: Hi-Potion. |
| `kh2fm.prologue.basement` | KH2-031 | ai_docs/games/kh2fm/verified-prologue-chests.json:231; src/games/kh2fm/generate.py:147–149 | src/games/kh2fm/catalog.ts:12987 | Hi-Potion · Mansion: Basement Corridor — Day 6: Hi-Potion. |

#### Every material drop occurrence (including repeated enemy/source evidence)

The following maps every JSON material key and all its drop-array enemy/rate occurrences. Source-resolved rates belong to KH2-030; representative-room limits belong to KH2-037. Bulky Vendor conditional detail is KH2-012 only for remaining room/build spawn exceptions. These are not new numeric disputes.

| Material key | JSON occurrence | Enemy/rate records |
|---|---|---|
| Blazing Shard | ai_docs/games/kh2fm/verified-material-sources.json:7 | Hammer Frame / 10%; Minute Bomb / 6% |
| Blazing Stone | ai_docs/games/kh2fm/verified-material-sources.json:37 | Cannon Gun / 6%; Tornado Step / 8% |
| Blazing Gem | ai_docs/games/kh2fm/verified-material-sources.json:67 | Fat Bandit / 12%; Fiery Globe / 4% |
| Blazing Crystal | ai_docs/games/kh2fm/verified-material-sources.json:95 | Crescendo / 6%; Crimson Jazz / 12% |
| Frost Shard | ai_docs/games/kh2fm/verified-material-sources.json:125 | Hook Bat / 6%; Lance Soldier / 10% |
| Frost Stone | ai_docs/games/kh2fm/verified-material-sources.json:154 | Aeroplane / 8%; Hot Rod / 12% |
| Frost Gem | ai_docs/games/kh2fm/verified-material-sources.json:185 | Fortuneteller / 10%; Icy Cube / 4% |
| Frost Crystal | ai_docs/games/kh2fm/verified-material-sources.json:213 | Living Bone / 12% |
| Lightning Shard | ai_docs/games/kh2fm/verified-material-sources.json:232 | Bolt Tower / 10%; Rapid Thruster / 4% |
| Lightning Stone | ai_docs/games/kh2fm/verified-material-sources.json:262 | Driller Mole / 6%; Emerald Blues / 10% |
| Lightning Gem | ai_docs/games/kh2fm/verified-material-sources.json:293 | Armored Knight / 4%; Surveillance Robot / 6% |
| Lightning Crystal | ai_docs/games/kh2fm/verified-material-sources.json:326 | Devastator / 12%; Strafer / 8% |
| Lucid Shard | ai_docs/games/kh2fm/verified-material-sources.json:358 | Rabid Dog / 6%; Trick Ghost / 10% |
| Lucid Stone | ai_docs/games/kh2fm/verified-material-sources.json:389 | Graveyard / 12%; Toy Soldier / 12%; Wight Knight / 8% |
| Lucid Gem | ai_docs/games/kh2fm/verified-material-sources.json:429 | Bookmaster / 10%; Magnum Loader / 8% |
| Lucid Crystal | ai_docs/games/kh2fm/verified-material-sources.json:457 | Neoshadow / 8% |
| Power Shard | ai_docs/games/kh2fm/verified-material-sources.json:476 | Creeper Plant / 8%; Large Body / 12% |
| Power Stone | ai_docs/games/kh2fm/verified-material-sources.json:505 | Luna Bandit / 8%; Silver Rock / 6% |
| Power Gem | ai_docs/games/kh2fm/verified-material-sources.json:533 | Aerial Knocker / 8%; Shaman / 10% |
| Power Crystal | ai_docs/games/kh2fm/verified-material-sources.json:562 | Morning Star / 12% |
| Dark Shard | ai_docs/games/kh2fm/verified-material-sources.json:581 | Shadow / 4%; Soldier / 8% |
| Dark Stone | ai_docs/games/kh2fm/verified-material-sources.json:611 | Assault Rider / 12%; Nightwalker / 10% |
| Dark Gem | ai_docs/games/kh2fm/verified-material-sources.json:642 | Gargoyle Knight / 10%; Gargoyle Warrior / 10% |
| Dark Crystal | ai_docs/games/kh2fm/verified-material-sources.json:674 | Air Pirate / 8% |
| Dense Shard | ai_docs/games/kh2fm/verified-material-sources.json:693 | Creeper / 8%; Dragoon / 12% |
| Dense Stone | ai_docs/games/kh2fm/verified-material-sources.json:724 | Sniper / 12% |
| Dense Gem | ai_docs/games/kh2fm/verified-material-sources.json:743 | Samurai / 12% |
| Dense Crystal | ai_docs/games/kh2fm/verified-material-sources.json:762 | Berserker / 12% |
| Twilight Shard | ai_docs/games/kh2fm/verified-material-sources.json:781 | Dusk / 10%; Gambler / 12% |
| Twilight Stone | ai_docs/games/kh2fm/verified-material-sources.json:812 | Dancer / 12% |
| Twilight Gem | ai_docs/games/kh2fm/verified-material-sources.json:831 | Assassin / 12% |
| Twilight Crystal | ai_docs/games/kh2fm/verified-material-sources.json:850 | Sorcerer / 12% |
| Bright Shard | ai_docs/games/kh2fm/verified-material-sources.json:868 | Creeper Plant / 4%; Hook Bat / 3%; Minute Bomb / 3%; Rabid Dog / 3%; Soldier / 4% |
| Bright Stone | ai_docs/games/kh2fm/verified-material-sources.json:929 | Aeroplane / 4%; Cannon Gun / 3%; Driller Mole / 3%; Luna Bandit / 4%; Silver Rock / 3%; Tornado Step / 4%; Wight Knight / 4% |
| Bright Gem | ai_docs/games/kh2fm/verified-material-sources.json:1016 | Aerial Knocker / 4%; Magnum Loader / 4%; Surveillance Robot / 3% |
| Bright Crystal | ai_docs/games/kh2fm/verified-material-sources.json:1055 | Air Pirate / 4%; Crescendo / 3%; Neoshadow / 4%; Strafer / 4% |
| Energy Shard | ai_docs/games/kh2fm/verified-material-sources.json:1108 | Bolt Tower / 4%; Gargoyle Knight / 4%; Gargoyle Warrior / 4%; Nightwalker / 4% |
| Energy Stone | ai_docs/games/kh2fm/verified-material-sources.json:1162 | Hammer Frame / 4%; Lance Soldier / 4%; Trick Ghost / 4% |
| Energy Gem | ai_docs/games/kh2fm/verified-material-sources.json:1205 | Emerald Blues / 4%; Fortuneteller / 4% |
| Energy Crystal | ai_docs/games/kh2fm/verified-material-sources.json:1234 | Bookmaster / 4%; Shaman / 4% |
| Serenity Shard | ai_docs/games/kh2fm/verified-material-sources.json:1264 | Assault Rider / 4%; Fat Bandit / 4%; Graveyard / 4%; Hot Rod / 4%; Large Body / 4%; Toy Soldier / 4%; Beffudler / 3%; Camo Cannon / 3%; Iron Hammer / 4%; Bulky Vendor / Conditional |
| Serenity Stone | ai_docs/games/kh2fm/verified-material-sources.json:1385 | Crimson Jazz / 4%; Devastator / 4%; Living Bone / 4%; Morning Star / 4%; Aerial Champ / 4%; Aerial Viking / 4%; Lance Warrior / 4%; Magic Phantom / 4%; Necromancer / 4%; Bulky Vendor / Conditional |
| Serenity Gem | ai_docs/games/kh2fm/verified-material-sources.json:1505 | Mad Ride / 4%; Reckless / 4%; Runemaster / 4%; Spring Metal / 4%; Bulky Vendor / Conditional |
| Remembrance Shard | ai_docs/games/kh2fm/verified-material-sources.json:1567 | Beffudler / 6%; Iron Hammer / 10%; Camo Cannon / 6% |
| Remembrance Stone | ai_docs/games/kh2fm/verified-material-sources.json:1604 | Aerial Viking / 6%; Magic Phantom / 10%; Lance Warrior / 10%; Necromancer / 10%; Aerial Champ / 8% |
| Remembrance Gem | ai_docs/games/kh2fm/verified-material-sources.json:1661 | Spring Metal / 10%; Runemaster / 10%; Mad Ride / 12% |
| Remembrance Crystal | ai_docs/games/kh2fm/verified-material-sources.json:1698 | Reckless / 12% |
| Serenity Crystal | ai_docs/games/kh2fm/verified-material-sources.json:1715 | Bulky Vendor / Conditional |

#### All 59 recipe outputs

Fields: `ingredients` and `instructions` are canonicalized by generator `:38–51`; recipe-source metadata omission KH2-025; optional discount implementation KH2-022; full-menu/Bright/progression coverage KH2-011. Resolved per-row conflicts are KH2-026/027, not current blockers.

| Recipe ID | Canonical recipe row | Generated occurrence | Output |
|---|---|---|---|
| `kh2fm.recipe.drive-recovery` | ai_docs/games/kh2fm/synthesis-recipes.md:23 | src/games/kh2fm/catalog.ts:13004 | Drive Recovery |
| `kh2fm.recipe.high-drive-recovery` | ai_docs/games/kh2fm/synthesis-recipes.md:23 | src/games/kh2fm/catalog.ts:13028 | High Drive Recovery |
| `kh2fm.recipe.elixir` | ai_docs/games/kh2fm/synthesis-recipes.md:24 | src/games/kh2fm/catalog.ts:13056 | Elixir |
| `kh2fm.recipe.megalixir` | ai_docs/games/kh2fm/synthesis-recipes.md:24 | src/games/kh2fm/catalog.ts:13076 | Megalixir |
| `kh2fm.recipe.mega-potion` | ai_docs/games/kh2fm/synthesis-recipes.md:25 | src/games/kh2fm/catalog.ts:13100 | Mega-Potion |
| `kh2fm.recipe.mega-ether` | ai_docs/games/kh2fm/synthesis-recipes.md:25 | src/games/kh2fm/catalog.ts:13124 | Mega-Ether |
| `kh2fm.recipe.ap-boost` | ai_docs/games/kh2fm/synthesis-recipes.md:26 | src/games/kh2fm/catalog.ts:13152 | AP Boost |
| `kh2fm.recipe.magic-boost` | ai_docs/games/kh2fm/synthesis-recipes.md:26 | src/games/kh2fm/catalog.ts:13176 | Magic Boost |
| `kh2fm.recipe.defense-boost` | ai_docs/games/kh2fm/synthesis-recipes.md:27 | src/games/kh2fm/catalog.ts:13204 | Defense Boost |
| `kh2fm.recipe.power-boost` | ai_docs/games/kh2fm/synthesis-recipes.md:27 | src/games/kh2fm/catalog.ts:13228 | Power Boost |
| `kh2fm.recipe.moon-amulet` | ai_docs/games/kh2fm/synthesis-recipes.md:28 | src/games/kh2fm/catalog.ts:13256 | Moon Amulet |
| `kh2fm.recipe.star-charm` | ai_docs/games/kh2fm/synthesis-recipes.md:28 | src/games/kh2fm/catalog.ts:13280 | Star Charm |
| `kh2fm.recipe.petite-ribbon` | ai_docs/games/kh2fm/synthesis-recipes.md:29 | src/games/kh2fm/catalog.ts:13308 | Petite Ribbon |
| `kh2fm.recipe.ribbon` | ai_docs/games/kh2fm/synthesis-recipes.md:29 | src/games/kh2fm/catalog.ts:13332 | Ribbon |
| `kh2fm.recipe.save-the-queen` | ai_docs/games/kh2fm/synthesis-recipes.md:30 | src/games/kh2fm/catalog.ts:13360 | Save the Queen |
| `kh2fm.recipe.save-the-queen-plus` | ai_docs/games/kh2fm/synthesis-recipes.md:30 | src/games/kh2fm/catalog.ts:13388 | Save the Queen+ |
| `kh2fm.recipe.centurion` | ai_docs/games/kh2fm/synthesis-recipes.md:31 | src/games/kh2fm/catalog.ts:13420 | Centurion |
| `kh2fm.recipe.centurion-plus` | ai_docs/games/kh2fm/synthesis-recipes.md:31 | src/games/kh2fm/catalog.ts:13448 | Centurion+ |
| `kh2fm.recipe.frozen-pride` | ai_docs/games/kh2fm/synthesis-recipes.md:32 | src/games/kh2fm/catalog.ts:13480 | Frozen Pride |
| `kh2fm.recipe.frozen-pride-plus` | ai_docs/games/kh2fm/synthesis-recipes.md:32 | src/games/kh2fm/catalog.ts:13508 | Frozen Pride+ |
| `kh2fm.recipe.save-the-king` | ai_docs/games/kh2fm/synthesis-recipes.md:33 | src/games/kh2fm/catalog.ts:13540 | Save the King |
| `kh2fm.recipe.save-the-king-plus` | ai_docs/games/kh2fm/synthesis-recipes.md:33 | src/games/kh2fm/catalog.ts:13568 | Save the King+ |
| `kh2fm.recipe.ultima-weapon` | ai_docs/games/kh2fm/synthesis-recipes.md:34 | src/games/kh2fm/catalog.ts:13600 | Ultima Weapon |
| `kh2fm.recipe.firaga-bangle` | ai_docs/games/kh2fm/synthesis-recipes.md:35 | src/games/kh2fm/catalog.ts:13636 | Firaga Bangle |
| `kh2fm.recipe.firagun-bangle` | ai_docs/games/kh2fm/synthesis-recipes.md:35 | src/games/kh2fm/catalog.ts:13656 | Firagun Bangle |
| `kh2fm.recipe.blizzaga-armlet` | ai_docs/games/kh2fm/synthesis-recipes.md:36 | src/games/kh2fm/catalog.ts:13680 | Blizzaga Armlet |
| `kh2fm.recipe.blizzagun-armlet` | ai_docs/games/kh2fm/synthesis-recipes.md:36 | src/games/kh2fm/catalog.ts:13700 | Blizzagun Armlet |
| `kh2fm.recipe.thundaga-trinket` | ai_docs/games/kh2fm/synthesis-recipes.md:37 | src/games/kh2fm/catalog.ts:13724 | Thundaga Trinket |
| `kh2fm.recipe.thundagun-trinket` | ai_docs/games/kh2fm/synthesis-recipes.md:37 | src/games/kh2fm/catalog.ts:13744 | Thundagun Trinket |
| `kh2fm.recipe.shock-charm` | ai_docs/games/kh2fm/synthesis-recipes.md:38 | src/games/kh2fm/catalog.ts:13768 | Shock Charm |
| `kh2fm.recipe.shock-charm-plus` | ai_docs/games/kh2fm/synthesis-recipes.md:38 | src/games/kh2fm/catalog.ts:13796 | Shock Charm+ |
| `kh2fm.recipe.full-bloom` | ai_docs/games/kh2fm/synthesis-recipes.md:39 | src/games/kh2fm/catalog.ts:13828 | Full Bloom |
| `kh2fm.recipe.full-bloom-plus` | ai_docs/games/kh2fm/synthesis-recipes.md:39 | src/games/kh2fm/catalog.ts:13852 | Full Bloom+ |
| `kh2fm.recipe.shadow-archive` | ai_docs/games/kh2fm/synthesis-recipes.md:40 | src/games/kh2fm/catalog.ts:13880 | Shadow Archive |
| `kh2fm.recipe.shadow-archive-plus` | ai_docs/games/kh2fm/synthesis-recipes.md:40 | src/games/kh2fm/catalog.ts:13904 | Shadow Archive+ |
| `kh2fm.recipe.garnet-ring` | ai_docs/games/kh2fm/synthesis-recipes.md:41 | src/games/kh2fm/catalog.ts:13932 | Garnet Ring |
| `kh2fm.recipe.diamond-ring` | ai_docs/games/kh2fm/synthesis-recipes.md:41 | src/games/kh2fm/catalog.ts:13956 | Diamond Ring |
| `kh2fm.recipe.mythril-ring` | ai_docs/games/kh2fm/synthesis-recipes.md:42 | src/games/kh2fm/catalog.ts:13984 | Mythril Ring |
| `kh2fm.recipe.orichalcum-ring` | ai_docs/games/kh2fm/synthesis-recipes.md:42 | src/games/kh2fm/catalog.ts:14008 | Orichalcum Ring |
| `kh2fm.recipe.midnight-anklet` | ai_docs/games/kh2fm/synthesis-recipes.md:43 | src/games/kh2fm/catalog.ts:14036 | Midnight Anklet |
| `kh2fm.recipe.chaos-anklet` | ai_docs/games/kh2fm/synthesis-recipes.md:43 | src/games/kh2fm/catalog.ts:14056 | Chaos Anklet |
| `kh2fm.recipe.acrisius` | ai_docs/games/kh2fm/synthesis-recipes.md:44 | src/games/kh2fm/catalog.ts:14080 | Acrisius |
| `kh2fm.recipe.acrisius-plus` | ai_docs/games/kh2fm/synthesis-recipes.md:44 | src/games/kh2fm/catalog.ts:14104 | Acrisius+ |
| `kh2fm.recipe.power-band` | ai_docs/games/kh2fm/synthesis-recipes.md:45 | src/games/kh2fm/catalog.ts:14132 | Power Band |
| `kh2fm.recipe.buster-band` | ai_docs/games/kh2fm/synthesis-recipes.md:45 | src/games/kh2fm/catalog.ts:14156 | Buster Band |
| `kh2fm.recipe.soldier-earring` | ai_docs/games/kh2fm/synthesis-recipes.md:46 | src/games/kh2fm/catalog.ts:14184 | Soldier Earring |
| `kh2fm.recipe.fencer-earring` | ai_docs/games/kh2fm/synthesis-recipes.md:46 | src/games/kh2fm/catalog.ts:14208 | Fencer Earring |
| `kh2fm.recipe.mage-earring` | ai_docs/games/kh2fm/synthesis-recipes.md:47 | src/games/kh2fm/catalog.ts:14236 | Mage Earring |
| `kh2fm.recipe.slayer-earring` | ai_docs/games/kh2fm/synthesis-recipes.md:47 | src/games/kh2fm/catalog.ts:14260 | Slayer Earring |
| `kh2fm.recipe.expert-s-ring` | ai_docs/games/kh2fm/synthesis-recipes.md:48 | src/games/kh2fm/catalog.ts:14288 | Expert's Ring |
| `kh2fm.recipe.master-s-ring` | ai_docs/games/kh2fm/synthesis-recipes.md:48 | src/games/kh2fm/catalog.ts:14316 | Master's Ring |
| `kh2fm.recipe.draw-ring` | ai_docs/games/kh2fm/synthesis-recipes.md:49 | src/games/kh2fm/catalog.ts:14348 | Draw Ring |
| `kh2fm.recipe.lucky-ring` | ai_docs/games/kh2fm/synthesis-recipes.md:49 | src/games/kh2fm/catalog.ts:14376 | Lucky Ring |
| `kh2fm.recipe.mythril-shard` | ai_docs/games/kh2fm/synthesis-recipes.md:50 | src/games/kh2fm/catalog.ts:14408 | Mythril Shard |
| `kh2fm.recipe.mythril-stone` | ai_docs/games/kh2fm/synthesis-recipes.md:50 | src/games/kh2fm/catalog.ts:14432 | Mythril Stone |
| `kh2fm.recipe.mythril-gem` | ai_docs/games/kh2fm/synthesis-recipes.md:51 | src/games/kh2fm/catalog.ts:14460 | Mythril Gem |
| `kh2fm.recipe.mythril-crystal` | ai_docs/games/kh2fm/synthesis-recipes.md:51 | src/games/kh2fm/catalog.ts:14484 | Mythril Crystal |
| `kh2fm.recipe.serenity-crystal` | ai_docs/games/kh2fm/synthesis-recipes.md:52 | src/games/kh2fm/catalog.ts:14512 | Serenity Crystal |
| `kh2fm.recipe.manifest-illusion` | ai_docs/games/kh2fm/synthesis-recipes.md:52 | src/games/kh2fm/catalog.ts:14532 | Manifest Illusion |

## Audit completion check

No code, canonical fact rows, generated catalogs or tests were changed. Counts and appendices were computed from the baseline files; referenced paths/line bounds and record membership were checked. This audit makes the remaining questions reviewable without converting historical source caution, valid unknown player inventory or unexecuted in-game tests into new factual blockers.
