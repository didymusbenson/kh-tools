# KH1 Final Mix research audit — current disposition

All **20** baseline findings were investigated in the live-source resolution pass on **2026-10-01**. **8 closed, 8 partially resolved, 4 unresolved**. Current generated inventory is **1,259 entries**, **33 recipes**, **26 coverage groups**. The [resolution report](research-resolution-2026-10-01.md) records evidence URLs, applied changes and exact remaining contradictions/access/evidence limits for every ID. No user gameplay test is a required gate.

| ID | Status | Applied result / exact remaining boundary |
|---|---|---|
| KH1-001 | Unresolved | Rechecked dedicated item, FM changes, KHGuides, original FM FAQ and Steam-era guide. +4 versus +3 remains a real edition-source contradiction. Retain unresolved Defense; recipe stays five Power Gems. |
| KH1-002 | Unresolved | Added the third, more precise first-End-of-World-cutscene claim to boss and Report 13. It conflicts with sealing Hollow Bastion and Final Rest claims. Final Rest remains a sufficient route, not the asserted earliest flag. |
| KH1-003 | Partial | Steam evidence added for pause/cutscene counting, reported 100-hour timer rollover, and awards from eligible pre-final-boss saves. Exact scripted/guest swap flags, every individual menu, and persistent-versus-save-local flag storage remain undocumented. |
| KH1-004 | Unresolved | Steam guide and KHGuides prose support “yards”; other references use meters. No Steam result-screen/string evidence establishes localization. Keep numeric 40 target and precise unit caveat. |
| KH1-005 | Partial | Self-contained Journal registration list now covers seven base games plus four cup time trials. Scoped 22 activity/record targets declared complete. Phil introductory barrels are distinct; no reviewed source establishes a persistent replay field/reward, so that narrow question remains open. |
| KH1-006 | Closed | All 12 blanks resolved from shared footnotes: Gigas after-rescue Tech-only EXP; Pink fixed 2 HP/hit after Stop; Black Fungus fixed 1 vulnerable damage and hardened invulnerability. |
| KH1-007 | Closed | Normalized complete 80-part shape roster plus seven tools, size/stat/stock/shop/source fields and functional limits. Original-only treasure clauses excluded. Mission sources linked, including the missing sixth Wheel-G at Agrabah 1. Roster completeness does not promise every redundant source alternative. |
| KH1-008 | Closed | Normalized 10 restoratives, three permanent stat items, seven Arts and three rank/rare tokens, with effects/use/shop/recipe/world/enemy links. Existing synthesis materials/equipment remain separate. Transient story objects excluded by accepted scope. |
| KH1-009 | Closed | Room/spell map supplied for all seven Arts, advanced rooms, learned-spell prerequisite, reset advice and Pink Agaricus trigger distinction. Dream Shield and each Arts entry share this route. |
| KH1-010 | Partial | All nine Bambi guides now give six qualifying defeats per gauge and 6/12/18 checkpoints; Gigas Shadows explicitly excluded. Sources do not enumerate all other excluded special enemies or establish an exhaustive modifier specification. |
| KH1-011 | Closed | All eight named materials and linked enemies received a specific phase/room/reset route. Mythril Shard gets a repeatable Palace Gates Pot Scorpion alternative (20% separate shard roll), avoiding an unsupported guessed Pot Spider layout. Corrected the two enemy entries' wrong Bambi world from Traverse Town to End of the World. |
| KH1-012 | Closed | Both unopened cage chests relocate together into the central hole of Manor Ruins; importer directions now approach from Bridge and descend into that pocket, retaining pre-destruction routes. |
| KH1-013 | Closed | Four generic guides replaced with legal inventories, quantities, placement principles and flight tactics. Includes 2-block, 5-block and 10-block missions, warp branches, no-damage/zero-score, forbidden collection parts and six weapon restrictions. These are sourced practical builds, not playtested voxel exports or an interactive editor. |
| KH1-014 | Partial | All five Slider courses now have distinct fruit lines plus slowdown/restart instructions. All four Vine courses have differentiated hazards and Glide bypass advice. A checked vine-by-vine sequence for each layout was not found; all four carry this precise caveat. |
| KH1-015 | Unresolved | Compared full 27-case legacy matrix, modern walkthrough “average” wording and forum majority/tie advice. They conflict. Do not invent a majority rule; all-same responses plus departure-time confirmation remain supported. |
| KH1-016 | Partial | Both ending guides distinguish independent collection-menu Theater from save ending conditions. Steam launch reports establish general cutscene availability, but do not explicitly enumerate each secret movie on a fresh profile. |
| KH1-017 | Closed | All 28 enemy blueprints now have 10% drop probability and the full bidirectional route/count table, including first-Hollow-Bastion-story phase annotations. Both old route field and instructions updated together. |
| KH1-018 | Partial | Eight of nine abilities now include quantitative effects/stacking. MP Haste has a documented +15 Ultimania-derived versus +12 HD experimental conflict; no Steam-specific adjudication. Berserk is +4 Strength at critical HP; exact numeric critical-HP boundary is not asserted. |
| KH1-019 | Partial | Public API exposes all 197 real keys; community grouping identifies KH1 ACH_001–055. Saved key inventory and access outcomes. Exact 55 display-name mappings remain unavailable; do not infer from percentages/order. |
| KH1-020 | Partial | Reproducible crosswalk covers every one of 824 rows in all 13 legacy CSVs, including field comparisons and explicit replacement/exclusion contexts. 467 equal numeric, 88 differing numeric and two different/unresolved comparisons recorded. Prose/location-group mappings are explicitly not full semantic equivalence; no exact Steam binary build was inspected. |


---

**Historical boundary:** everything below is the immutable baseline audit narrative and occurrence register. Its counts, open/remaining labels, line anchors and “no external research” statements describe the pre-resolution snapshot, not current state. Use the current ledger above and the resolution report for status; preserve the appendices for provenance.

# Historical baseline audit — 2026-10-01

Audit date: **2026-10-01**. Repository baseline: **f933ab1**, branch `research/audit-2026-10-01`. Scope: modern **Steam KH1 Final Mix / HD 1.5 + 2.5 ReMIX**. This is a repository gap audit, not a new external research pass and not certification that every asserted fact is correct.

## Results and interpretation

**20 deduplicated findings:** 16 open factual/content-completeness findings (KH1-001–016), two lower-priority depth questions (KH1-017–018), and two provenance/audit limitations (KH1-019–020). Within the first 16, five are explicit unresolved documentary caveats and eleven are structural or incomplete-guidance findings; the latter are not claims that the existing facts are false. No gameplay test by the user is a required gate. `ai_docs/testing-and-content-validation.md:5–9` and `:38` govern this audit.

Current canonical inventory is **1,149 entries**: 471 collection entries plus 678 reference entries; **33 recipes**, **23 coverage rows**. Of the entries, 1,148 are `source-backed`, one is `unresolved`. There are **21 explicit `uncertainty` fields** (15 repeated Steam-name/API notices and six substantive caveats), **12 empty scalar fact fields in three enemy records**, and two incomplete reference coverage rows (`minigame`, `guide`). Three coverage denominators are null: one intentional open-ended collection-guide grouping and the two incomplete reference groups. A null expected guide count is not itself a missing game fact.

Many older “incomplete” claims are stale: all 535 world-source rows have dispositions; 306 finite treasure/reward records, 33 puppy groups, 46 marks, 13 Reports, 21 magic acquisitions, six summons, 33 recipes, 48 weapons, 54 accessories, 99 Sora levels, 96 cup records, 30 Gummi missions and 48 blueprints now exist. Energy Bangle and Wonderland mission 2 have later reconciliation. Historical documents must not override this evidence. Conversely, a complete roster does not prove each field or every explicitly requested secondary catalog complete.

Priority: **P1** affects a disputed value, acquisition guidance or an explicitly requested missing catalog; **P2** is narrower or has a safe practical route; **P3** is detail/provenance and does not block an otherwise supported fact.

## Method and coverage

Inventoried all 448 baseline tracked paths. References target the inspected baseline unless the surrounding text explicitly says current; concurrent edits in other agents' shared files are not owned by this audit. Read the six KH1 research documents, game specification, readiness and implementation reports, shared scope/research/source/test-policy documents, both importers and build validation, all five canonical KH1 JSON files, both normalized source packs, challenge coverage, the 535-row source ledger, legacy KHFM HTML/13 CSVs, and KH1/shared runtime and test surfaces. Searches covered hedge/status language and also data shape, every `uncertainty`, verification value, empty/null scalar, coverage denominator, category/subtype membership and absent requested catalogs. Inspected field-level examples and later importer refinements; counts and blank fields were computed from parsed JSON, not inferred from prose.

`public/data/kh1fm.json:1` is a minified generated mirror of canonical entries, recipes and coverage. Its entries were compared with the canonical arrays. Every canonical occurrence in Appendix A therefore also occurs at that line under `entries[id=…]` with the same field path; duplicates are not repeated as separate findings. `tools/content/build.mjs:6–9,91–108` defines this lineage. Untracked/generated `public/data/kh1fm-coppermind.json`, compressed browser exports and the Chroma archive are retrieval derivatives; they are not independent factual evidence. Their exclusion of the one unresolved accessory is documented in `ai_docs/implementation/verification.md:9`, `README.md:57`, and `tools/coppermind/seed.py` (baseline unresolved-record filter; this shared tool is being changed concurrently). Binary assets, fonts, screenshots, dependencies/lockfiles, CSS-only geometry and other games' private datasets were excluded from factual record counting. Shared statements that apply to KH1 are retained below.

No AGENTS.md was present. No source fetches, mutations of data, regeneration, gameplay checks or external services were needed. No test suite was rerun: existing tests validate structure/calculation and cannot resolve these research questions. Runtime uncertainty rendering/retrieval was inspected (`src/components/EntryDetails.tsx:116`, `src/jiminy/retrieval.ts:51–54,189–207`, `src/jiminy/index.ts:358–359`). Blank inventory and TypeScript `unknown` are user/app state, not missing game research.

## Open findings

### KH1-001 — Three Stars Defense is disputed (P1, explicit conflict)

`kh1fm-accessory-three-stars.facts.Defense` is **“Unresolved: +3 or +4”**. Resolve the modern FM Defense value; acquisition and the five-Power-Gem recipe are already reconciled. The competing leads are the dedicated KHWiki infobox versus KHGuides' FM accessory table and the FM changes list. The entire accessory entry is quarantined from Coppermind although only this stat is disputed. Do not reopen its recipe. Occurrences: Appendix A; `ai_docs/implementation/reference-data.md:16`, `:41`; `data/kh1fm/reference-coverage.json:32`; `ai_docs/readiness/kingdom-hearts-final-mix.md:11`; `ai_docs/implementation/verification.md:9,38`; `README.md:57`.

### KH1-002 — Earliest Unknown portal trigger (P2, explicit conflict; usable late route)

`kh1fm-boss-unknown.uncertainty` says **“Sources disagree on the earliest portal-spawn flag”**; `kh1fm-report-13.facts.earliestUnlockStatus` is unresolved. Determine the exact modern story/access flag, including whether sealing Hollow Bastion is sufficient or Final Rest is required. Current instructions guarantee access after Final Rest and do not assert that earlier access is impossible. Leads: Steam-era checklist versus KHWiki FM changes. The EXP Necklace acquisition entry names the boss but supplies no independent earlier trigger. Additional occurrences: `tools/content/import-collectibles.py:362–375`; `tools/content/challenge-coverage.json:16`; `data/kh1fm/reference-coverage.json:72`; `ai_docs/implementation/collectibles.md:44`; historical C02 and D14 references in Appendix B.

### KH1-003 — Restricted-run exceptions, timer and award persistence (P1, explicit limited evidence)

`kh1fm-guide-restricted-run-planning.uncertainty`: **“Steam player reports rather than an audited save-flag specification.”** Separate outstanding questions: (a) exact scripted weapon/accessory swap flags, (b) guest-party equipment edge cases, (c) whether pause and each menu stop Speedster time, (d) timer rollover behavior, (e) awards after restoring an older/pre-final-boss save, and (f) exact persistent versus save-local restriction/award state. Current guidance now covers conservative party equipment preservation, allowed abilities/items, clean-save reloads and post-credits checks; those are partially resolved, not still wholly unknown. The safe route does not depend on exceptions. Leads are the existing Steam discussion citations in that record. Related affected goals: Unchanging Armor, Undefeated, Speedster. Coverage occurrences: `tools/content/challenge-coverage.json:56`, `data/kh1fm/reference-coverage.json:112`. Historical broad warnings remain in Appendix B.

### KH1-004 — Pooh's Swing distance unit (P2, explicit terminology conflict)

`kh1fm-minigame-pooh-s-swing-cheer-record.uncertainty`: **“yards versus meters; use a displayed score of at least 40.”** Identify the Steam display unit/localization; the threshold number 40 is already usable and not disputed here. `kh1fm-guide-cheer-claim-the-five-record-reward` repeats the deliberately unitless target. Existing Pooh/Hundred Acre Wood source citations are leads.

### KH1-005 — Phil replay records/rewards and full minigame denominator (P2, explicit non-establishment)

`kh1fm-guide-phil-barrel-training-routes.uncertainty`: **“do not document a separate saved replay-record field, replay reward, or higher target beyond the two initial tests.”** Establish whether those fields/rewards exist and how Journal registration works; do not infer that absence from reviewed sources proves nonexistence. Initial 20/30s and 25/60s tests and both routes are supplied. `minigame` coverage is `expected:null`, `actual:22`, `complete:false`; determine the complete scoped record inventory, including relation between Phil initial clears and saved Journal records. `kh1fm-achievement-mini-game-maniac.instructions` still says **“Check the in-game Journal for the remaining blank records.”** This is incomplete self-contained registration guidance, not a request to make the user's playthrough a gate. Relevant source: the linked Phil page and Journal/minigame source pages. Do not expand this into exhaustive narrative biography manifests.

### KH1-006 — Twelve empty enemy-stat fields lack a documented meaning (P1, structural)

Three `source-backed` records contain empty strings: Gigas Shadow's after-rescue EXP (one), Pink Agaricus elemental/status/other multipliers (six), Black Fungus elemental/status/other multipliers (five). Appendix A enumerates every field and both source/output occurrences. Determine whether each is inherited/shared, inapplicable, omitted by transcription or genuinely unknown. Gigas Shadow's before-rescue EXP contains a Tech-point explanation; Pink Agaricus and Black Fungus have special physical-damage rules. Those may explain blank table cells, but the import does not explicitly assert inheritance or non-applicability. Do not replace blanks with guessed zeroes or rates. Current build checks top-level instructions and provenance, not nested scalar completeness (`tools/content/build.mjs:16–28`; `tests/content.test.ts:60–71`).

### KH1-007 — Required Gummi parts catalog is absent (P1, structural catalog omission)

The explicit requirement is **“shapes, stats, purchase/drop/treasure/mission sources, functional restrictions”**, including mission-exclusive cosmetic parts (`ai_docs/games/kh1fm/challenges-gummi-and-run-goals.md:90`; game spec `:112`). The 78 Gummi entries consist only of 30 missions and 48 blueprints; there are zero part subtype records and no part coverage denominator. World rewards and mission reward strings name parts but do not supply the complete parts roster, shape/stat/effect/source catalog. Exact missing inventory/count is unknown; do not claim a zero-part game. Lead already in repo: `https://www.khwiki.com/Gummi_Blocks_(KH)`. Full part stock UI is implementation work; establishing the catalog and acquisition rules is research/content work.

### KH1-008 — Non-equipment item/Arts/rank catalog is not normalized (P1, mixed research/import omission)

`ai_docs/games/kh1fm/synthesis-farming-and-equipment.md:55–60,116` requires individual spell Arts and every consumable/stat/rank/key-item acquisition route. The runtime has material/equipment/treasure records but no general item catalog or Arts/rank challenge records. Specifically known missing individual catalog identities: Fire Arts, Blizzard Arts, Thunder Arts, Cure Arts, Gravity Arts, Stop Arts, Aero Arts, Shiitake Rank, Matsutake Rank, Mystery Mold. Existing White Mushroom, Rare Truffle and Black Fungus entries describe their acquisition mechanics; the roster is not wholly unresearched. Prime Cap already has an accessory record and must not be double-counted as absent. Consumables and permanent stat items occur as rewards/recipe products without a declared exhaustive item roster, effect/use and alternative-source coverage. Determine that roster before claiming complete item coverage. Temporary narrative objects remain intentionally excluded as world checks; the old “every progression key item” wording does not override that accepted boundary.

### KH1-009 — White Mushroom advanced gesture-to-room acquisition map (P1, structural practical gap)

`kh1fm-enemy-white-mushroom.instructions` gives all seven gestures but only says **“advanced spell gestures appear in later-world Mushroom encounters”** and **“Requested gestures depend on the room.”** Identify the exact ordinary Mushroom rooms/phase conditions offering Cure, Gravity, Stop and Aero gestures, with reset/access instructions; distinguish the stationary Pink Agaricus triggers. Current world list is not that mapping. A user seeking each Arts item/Dream Shield still lacks the room-to-request table. Mystery Goo and Dream Shield link this entry; they do not fill the map. Existing White Mushroom source is the lead. This is narrower than requiring every room's complete enemy population.

### KH1-010 — Bambi gauge eligibility is qualitative (P2, structural acquisition condition)

All nine Bambi guides state **“many special Final Mix enemies do not charge the gauge.”** Their first/second/third-fill item probability tables are present and reconciled. Missing: exact gauge charge/kill requirement, qualifying versus excluded enemies, any world-specific thresholds and modifiers needed to reproduce those checkpoints. The nine affected IDs are fully enumerated in Appendix A. Existing `Paradise` citations are leads. Do not reopen the resolved world reward tables or assume every special enemy is excluded.

### KH1-011 — Several recommended material farms still lack exact phase/room/reset routes (P2, structural practical gap)

The ordinary material baseline often repeats **“leave two rooms and return”**, but several actual recommendations remain “Cave of Wonders rooms,” “Monstro chambers,” or “other worlds that retain these enemies.” Appendix A enumerates the affected material records and linked enemy records. Needed: at least one reproducible recommended loop (specific connected room sequence and relevant story phase) for each such source, especially the late Spirit Shard replacement farm. This does not demand the full room-by-room population manifest expressly unclaimed in `ai_docs/implementation/reference-data.md:25,41`. Source world appearances, field stats and drop rates are already present. Leads: existing per-enemy pages and world atlas, `ai_docs/games/kh1fm/synthesis-farming-and-equipment.md:26,120`.

### KH1-012 — Two relocated manor chests lack precise post-destruction positions (P1, structural route gap)

For Orichalcum source row `Halloween Town/Treasures/15`, current text ends **“moves to the ruins.”** Mega-Ether row `/16` ends **“After destruction, check the ruins instead.”** Pre-destruction directions are precise; the new room alone is not an exact post-destruction route. Supply each chest's Manor Ruins landmark/approach after Oogie's Manor falls. The puppy relocation has a more specific alcove and is not included. Source generation: `tools/content/import-collectibles.py:313–314`; existing Gamer Guides Halloween Town link is the lead. This narrowly qualifies the implementation claim that every acquisition already has usable exact directions; it does not reopen the reconciled 306-record inventory.

### KH1-013 — Gummi build guides are starting advice, not complete working builds (P2, structural guide depth)

Four guides cover no-damage, small-build, collection and weapon-restricted missions, but text says **“budget the remaining slots for weapons that you own”** and **“These are starting layouts.”** Missing concrete legal parts/quantities/placements and route tactics for the difficult specified missions, particularly the five-block score target and ≤10-block/777-obstacle mission. Do not claim a specific layout cannot work; none is fully specified. Exact requirements/rewards and mission denominators are already researched. Distinguish factual part/build feasibility research from the optional engineering of an interactive ship editor. Leads: cited Gummi mission and blocks pages; scope `ai_docs/games/kh1fm/world-and-coverage-audit.md:61`.

### KH1-014 — Jungle Slider and Vine Swinging tutorials are coarse (P2, structural practical gap)

Five slider records give course/fruit count/exit and four vine records repeat **“Move from vine to vine to the finish.”** Missing course-specific fruit/branch/obstacle or vine sequence guidance required by the earlier exact-tutorial task. Entries and rewards are present, and navigation to the minigame is provided; this is not a missing nine-course roster. Appendix A enumerates all nine. Existing Jungle Slider/Vine Swinging sources are leads; `ai_docs/games/kh1fm/world-and-coverage-audit.md:60` remains only partially satisfied. User best-time entry controls are separate implementation scope.

### KH1-015 — Mixed opening-question answers lack an EXP-curve rule (P2, structural rule gap)

`kh1fm-guide-dream-weapon-and-experience-choices.instructions` explains all-first/all-middle/all-last responses but not mixed answer combinations or tie handling. Determine the full mapping from the Tidus/Selphie/Wakka responses to Dawn/Midday/Dusk. All three EXP curves, six chosen/sacrificed-weapon starting combinations and 99 level rows are already supplied. This is a narrow onboarding-rule omission, not the stale missing-level-matrix issue. Lead: the guide's existing starting-choice sources.

### KH1-016 — Save secret-ending unlock versus modern theater availability (P2, structural distinction)

Two runtime secret-ending guides give difficulty conditions and movie replacement. They do not explain Steam collection theater availability separately from meeting a save's unlock condition. The planning document explicitly distinguishes these (`ai_docs/games/kh1fm/collectibles-and-progression.md:167`) and retains modern theater reconciliation (`ai_docs/games/kh1fm/world-and-coverage-audit.md:63`; readiness `:61`). Determine exact modern theater availability/access conditions and whether they are independent of save unlocks. No current contradiction in the difficulty predicates was found; do not relabel all ending requirements unverified.

## Lower-priority depth questions and provenance limitations

### KH1-017 — Enemy blueprint probability/route appearance detail (P3, detail completeness)

All 28 enemy-blueprint records have ship identity and route list, but **“Repeat flights if it has not dropped”** has no drop probability, special appearance condition or direction/route-phase qualification. Appendix A enumerates all 28 IDs, with missing fields clearly distinguished from present routes. Determine whether those extra conditions exist and record probability if the scope expects quantitative drop guidance. This does not invalidate the sourced 48-blueprint roster or assert that every blueprint has a special condition. Existing Blueprint/Gummi sources are leads; no precise rate is invented here.

### KH1-018 — Qualitative ability effects without numerical/stack formulas (P3, detail completeness)

Nine entries say “raises,” “improves,” “extends,” or “copies stack” without exact amounts: Critical Plus, Treasure Magnet, MP Haste, MP Rage, Berserk, Jackpot, Tech Boost, Cheer and Second Wind. AP costs and unlock clauses exist. If the required “stats, abilities, special properties” catalog is intended to support quantitative comparisons, research the exact modern effect/stack formula and eligibility conditions for each; current concise acquisition guidance can remain useful without those numbers. These are deliberately lower-priority scope-dependent detail questions, not established incorrect values.

### KH1-019 — Steam API keys unavailable from captured public evidence (P3, provenance/integration)

All **55** achievement records have `facts.platformApiId = "Not exposed by the public achievement list"`; **15** also warn of reused names. All IDs are enumerated in Appendix A, including the other 40 records without a prominent uncertainty banner. Missing exact API-key mapping is distinct from the supported 55 goal descriptions, KH1 scope and manual tracking. Existing public list cannot supply this mapping; direct Steam state integration is not implemented/claimed. Additional occurrences: `ai_docs/implementation/reference-data.md:35,41`; `tools/content/challenge-coverage.json:40`; `data/kh1fm/reference-coverage.json:96`; historical platform mapping requests in Appendix B. No login/API access request is needed for this audit.

### KH1-020 — Legacy/source audit and precise build provenance remain limited (P3, provenance)

Shared records say file/tab discovery is not a full range audit, legacy tables mix editions, links are sparse and helper totals may drift (`ai_docs/02-content-inventory.md:17–21,62–73`; `ai_docs/sources/khtables-drive-audit.md:44–56`; game spec `:147–153`). Current KH1 imports replace many known incorrect values with per-record citations, but no complete legacy row-to-current-record/value/rejection crosswalk or exact researched Steam build ID is present. Sources generally have URLs and 2026-09-18 checked dates; version scope is FM/Steam, not a pinned Steam patch/build. `ai_docs/readiness/README.md:7` asks for precise releases/builds. This is an auditability limitation, not proof every source-backed record is uncertain; do not mandate re-researching 1,148 good records solely because they lack hands-on verification. The 535-row collectible ledger is a genuine complete source-table classification and is not the missing legacy-workbook crosswalk.

## Historical, resolved and excluded ledger

| Legacy warning / occurrence | Current disposition and later evidence |
|---|---|
| Energy Bangle 1 vs 2 Spirit Shards; planning C01 | **Resolved to 2**, 13 direct Spirit Shards. `ai_docs/implementation/reference-data.md:15`; source `kh1fm-recipe-energy-bangle.facts.source reconciliation`; `tests/content.test.ts:36–46`; recipe coverage `data/kh1fm/reference-coverage.json:8`. Dedicated item, KHGuides and legacy recipe agree. Old caveats remain in Appendix B. |
| Three Stars legacy recipe uses one Power Gem | **Resolved to five**, distinct from KH1-001 Defense. `ai_docs/implementation/reference-data.md:16`; `tests/content.test.ts:47–51`; normalized recipe. |
| Wonderland Gummi mission 2 activation wording / C05 | **Resolved in current source** to at least five Accelerate activations and no damage, with Steam-era corroboration. `data/kh1fm/reference-coverage.json:80`; `tools/content/challenge-coverage.json:24`; `kh1fm-gummi-wonderland-gummi-mission-2`. |
| Full levels/EXP unmeasured; duplicate legacy level 15 | **Resolved current matrix**: 99 levels, all 297 Sora curve thresholds/costs independently reconciled. `ai_docs/implementation/reference-data.md:21,33,39`; `csv/khfmexp.csv:4–5` duplicate and `:22` obsolete totals survive only in legacy. Legacy HTML has the same old chart; current data does not use it. Mixed questionnaire choices remain KH1-015. |
| Missing modern Combo Master or Shield 54 | **Resolved** Sword 50 / Shield 55 / Rod 55, modern runtime overlay, `ai_docs/implementation/reference-data.md:20`. Original static-table absence is not a modern omission. |
| Treasure/puppy/Trinity/Report/magic/summon inventories and exact routes broadly pending | **Mostly resolved** by 471-record collection pack and 535-row ledger, `ai_docs/implementation/collectibles.md:3–11,31–41`. Narrow post-manor route gaps remain KH1-012; Unknown earliest is KH1-002. No current “unresolved container” records survive. |
| `UNCERTAIN` source rows / initial unresolved container messages | **Refined/reconciled later in same importer**, `tools/content/import-collectibles.py:116,154–155,279–320,345–351,408–412`. The 24 original candidate row IDs are enumerated in Appendix C. One Halloween Mythril Shard candidate is rejected as a duplicate; not an open missing treasure. |
| Halloween Town standalone Mythril Shard candidate | **Rejected duplicate**: `tools/content/import-collectibles.py:345–351`, `ai_docs/implementation/collectibles.md:42`; evidence explains six manor chests. `tools/content/import-collectibles.audit.json` retains the row disposition and evidence. |
| Bambi alternatives absent / wrong generic farming advice | **Nine probability tables resolved**, `ai_docs/implementation/reference-data.md:18`. Exact gauge eligibility remains KH1-010. |
| Battleship component rewards / Chimera rolls only qualitative in early planning | **Detailed rewards now present** in both enemies' `facts.Base rewards`; no separate open rate finding. Generic material summary alone is not the entire linked record. |
| Arch Behemoth source/reset and modifier ambiguity | **Resolved** Final Dimension 20% Mythril Shard and 5% Omega Arts ignore Lucky Strike; Linked Worlds respawn boundary separately qualified, `ai_docs/implementation/reference-data.md:19`. |
| Cups “Figure out tournaments”; legacy wave counts contain x? | **Current 83 rounds + 13 clear records**, seed opponents/checkpoints/variants in challenge data; `data/kh1fm/reference-coverage.json:64`. Five legacy question-mark rows and their HTML occurrences are listed in Appendix C. |
| Accessories/weapons/stat catalogs absent | **54 accessories + 48 weapons imported** with FM overrides (`ai_docs/implementation/reference-data.md:11,17`). KH1-001 remains; broad old statements of no equipment inventory are stale. General item catalog is separate KH1-008. |
| Mission 1/2 rewards and route-specific blueprint sources absent | **Current 30 mission reward fields and 28 enemy route lists present**; `data/kh1fm/reference-coverage.json:80,88`. Parts/build detail remain KH1-007/013; optional blueprint rate question is KH1-017. |
| Muddy Path friends and Phil barrel routes missing | **Routes added** in `kh1fm-guide-muddy-path-friends-route` and `kh1fm-guide-phil-barrel-training-routes`, with source citations. Only Phil replay semantics remain KH1-005. |
| Narrative Journal manifest / C04; native Chronicles/biographies Q02 | **Retired/out of scope unless separately requested**: `ai_docs/games/kh1fm/world-and-coverage-audit.md:75`; `ai_docs/content/collectible-compendium-and-linked-views.md:72`; native expansion questions in UI documents do not re-add it. Real Journal-dependent trophy/ending wording remains relevant. |
| Complete every-room enemy spawn manifest and full Donald/Goofy/guest stat-gain matrices | **Explicitly unclaimed/excluded imported scope** (`ai_docs/implementation/reference-data.md:25,33,41`; coverage `:40,56`). Do not promote them to mandatory research blockers; practical farming gaps are narrower KH1-009–011. |
| No hands-on game tests, optional images, iPhone/VoiceOver/offline/model acceptance | **Evidence/engineering boundaries**, not unresolved game facts. `ai_docs/testing-and-content-validation.md:5–9,38`; `ai_docs/implementation/verification.md:38`; UI workbook and faithful-journal MVP acceptance sections. |
| No narrative update/read markers, unavailable native models, exact fonts/artwork, screen geometry | **UI/assets/scope**, excluded from factual finding count. `ai_docs/implementation/kh1fm-faithful-journal-mvp.md:32–42,62–69`; `ai_docs/ui/references/kh1fm/README.md:40–47`. |
| Shared “all games incomplete” rollout wording | Broad statement `ai_docs/implementation/multi-game-rollout.md:31` is not evidence every listed gap applies to KH1. Applied only where canonical KH1 evidence supports one of the findings above. |

## Appendix A — Exact record/field occurrence register

Every row identifies the canonical field and the editable source plus generated canonical JSON occurrences. The minified public mirror also contains every row at `public/data/kh1fm.json:1` under `entries[id=…]`. An absent field is stated as absent; line anchors locate the affected existing record, not an invented field. Repeated records appear under multiple findings only when their missing questions differ.

### KH1-001–005: explicit caveats

| Record / field | Occurrences | Representative evidence / question |
|---|---|---|
| `kh1fm-report-13` → `uncertainty` | `data/kh1fm/collectibles.json:16518` | Sources disagree about the earliest portal appearance. Reaching Final Rest is the conservative source-backed access point used here; this is not a claim that an earlier visit cannot work. |
| `kh1fm-accessory-three-stars` → `uncertainty` | `tools/content/import-reference.source.json:4832`; `data/kh1fm/reference.json:4831` | Defense conflict: dedicated KHWiki item infobox lists Final Mix +4, while KHGuides Final Mix accessory table and KHWiki Final Mix changes list +3. Acquisition and recipe are reconciled; defense is unresolved. |
| `kh1fm-boss-unknown` → `uncertainty` | `tools/content/challenge-reference.json:3840`; `data/kh1fm/reference.json:21841` | The listed route guarantees access. Sources disagree on the earliest portal-spawn flag: a Steam-era checklist places it after sealing Hollow Bastion, while KHWiki Final Mix changes specifies reaching Final Rest. Earlier availability has not been confirmed. |
| `kh1fm-minigame-pooh-s-swing-cheer-record` → `uncertainty` | `tools/content/challenge-reference.json:7474`; `data/kh1fm/reference.json:25475` | Sources label the distance unit differently (yards versus meters); use a displayed score of at least 40. |
| `kh1fm-guide-restricted-run-planning` → `uncertainty` | `tools/content/challenge-reference.json:7854`; `data/kh1fm/reference.json:25855` | Equipment, item and reload guidance is backed by Steam player reports rather than an audited save-flag specification. Exact scripted-swap flags, guest-party edge cases, pause/menu timer behavior, timer rollover and award behavior after restoring an older save remain untested; the route does not rely on those exceptions. |
| `kh1fm-guide-phil-barrel-training-routes` → `uncertainty` | `tools/content/challenge-reference.json:10630`; `data/kh1fm/reference.json:28631` | The reviewed KH1 sources do not document a separate saved replay-record field, replay reward, or higher target beyond the two initial tests. Practice times are personal goals; no KH2 orb-score requirement is imported. |

### KH1-006: every empty nested fact

| Record / field | Occurrences | Representative evidence / question |
|---|---|---|
| `kh1fm-enemy-gigas-shadow` → `facts.After Kairi rescue EXP` | `tools/content/import-reference.source.json:6012`; `data/kh1fm/reference.json:6011` | Empty string; inherited/shared/not applicable versus unresearched is not specified. |
| `kh1fm-enemy-pink-agaricus` → `facts.Fire multiplier` | `tools/content/import-reference.source.json:6764`; `data/kh1fm/reference.json:6763` | Empty string; inherited/shared/not applicable versus unresearched is not specified. |
| `kh1fm-enemy-pink-agaricus` → `facts.Blizzard multiplier` | `tools/content/import-reference.source.json:6765`; `data/kh1fm/reference.json:6764` | Empty string; inherited/shared/not applicable versus unresearched is not specified. |
| `kh1fm-enemy-pink-agaricus` → `facts.Thunder multiplier` | `tools/content/import-reference.source.json:6766`; `data/kh1fm/reference.json:6765` | Empty string; inherited/shared/not applicable versus unresearched is not specified. |
| `kh1fm-enemy-pink-agaricus` → `facts.Gravity multiplier` | `tools/content/import-reference.source.json:6767`; `data/kh1fm/reference.json:6766` | Empty string; inherited/shared/not applicable versus unresearched is not specified. |
| `kh1fm-enemy-pink-agaricus` → `facts.Stun multiplier` | `tools/content/import-reference.source.json:6769`; `data/kh1fm/reference.json:6768` | Empty string; inherited/shared/not applicable versus unresearched is not specified. |
| `kh1fm-enemy-pink-agaricus` → `facts.Other multiplier` | `tools/content/import-reference.source.json:6770`; `data/kh1fm/reference.json:6769` | Empty string; inherited/shared/not applicable versus unresearched is not specified. |
| `kh1fm-enemy-black-fungus` → `facts.Fire multiplier` | `tools/content/import-reference.source.json:8699`; `data/kh1fm/reference.json:8698` | Empty string; inherited/shared/not applicable versus unresearched is not specified. |
| `kh1fm-enemy-black-fungus` → `facts.Blizzard multiplier` | `tools/content/import-reference.source.json:8700`; `data/kh1fm/reference.json:8699` | Empty string; inherited/shared/not applicable versus unresearched is not specified. |
| `kh1fm-enemy-black-fungus` → `facts.Thunder multiplier` | `tools/content/import-reference.source.json:8701`; `data/kh1fm/reference.json:8700` | Empty string; inherited/shared/not applicable versus unresearched is not specified. |
| `kh1fm-enemy-black-fungus` → `facts.Stun multiplier` | `tools/content/import-reference.source.json:8704`; `data/kh1fm/reference.json:8703` | Empty string; inherited/shared/not applicable versus unresearched is not specified. |
| `kh1fm-enemy-black-fungus` → `facts.Other multiplier` | `tools/content/import-reference.source.json:8705`; `data/kh1fm/reference.json:8704` | Empty string; inherited/shared/not applicable versus unresearched is not specified. |

### KH1-008: related existing item/challenge evidence

| Record / field | Occurrences | Representative evidence / question |
|---|---|---|
| `kh1fm-enemy-white-mushroom` → `instructions` | `tools/content/import-reference.source.json:8567`; `data/kh1fm/reference.json:8566` | Respond only to the current gesture: shivering → Fire; fanning itself → Blizzard; light overhead → Thunder; fallen down → Cure; floating → Gravity; frozen in place → Stop; spinning → Aero. Give three correct spells to finish the encounter. Three of the same spell also give that spell's Arts. Wrong attacks or spells end… |
| `kh1fm-enemy-rare-truffle` → `instructions` | `tools/content/import-reference.source.json:8618`; `data/kh1fm/reference.json:8617` | Keep the Truffle airborne by timing single hits under it; the sequence ends when it touches ground. At Neverland's deck, flight helps you stay level with it. In ground areas, position Aerora or Aeroga carefully for repeated contact. Aim for 50 hits for Shiitake Rank and 100 for Matsutake Rank; these rank items are opti… |
| `kh1fm-enemy-black-fungus` → `instructions` | `tools/content/import-reference.source.json:8669`; `data/kh1fm/reference.json:8668` | Find the rare encounter in Agrabah's Bazaar or Halloween Town's Moonlight Hill. Back away while it turns gray and invulnerable. Deliver a qualifying combo finisher to create the rare-item reward opportunity; an arbitrary non-finishing kill does not use the same drop rule. Avoid its poison cloud, then reset the rare enc… |
| `kh1fm-weapon-dream-shield` → `instructions` | `tools/content/import-reference.source.json:3076`; `data/kh1fm/reference.json:3075` | Earn all seven spell Arts by showing one White Mushroom the same requested spell three times. Bring all seven Arts to Merlin in the Magician's Study. |
| `kh1fm-accessory-prime-cap` → `instructions` | `tools/content/import-reference.source.json:4426`; `data/kh1fm/reference.json:4425` | Score 100 hits on Pink Agaricus while it is stopped. Maximize MP before casting Stop, cast Aero and use Ragnarok's follow-up; keep allies away so their hits do not lower the count. |

### KH1-009: mushroom map consumers

| Record / field | Occurrences | Representative evidence / question |
|---|---|---|
| `kh1fm-enemy-white-mushroom` → `instructions` | `tools/content/import-reference.source.json:8567`; `data/kh1fm/reference.json:8566` | Respond only to the current gesture: shivering → Fire; fanning itself → Blizzard; light overhead → Thunder; fallen down → Cure; floating → Gravity; frozen in place → Stop; spinning → Aero. Give three correct spells to finish the encounter. Three of the same spell also give that spell's Arts. Wrong attacks or spells end… |
| `kh1fm-material-mystery-goo` → `instructions` | `tools/content/import-reference.source.json:5913`; `data/kh1fm/reference.json:5912` | Use White Mushroom charades, Rare Truffle juggling or Black Fungus combo-finish challenges. For White Mushrooms, correctly answer three requests; repeat one spell all three times for the Arts reward as well. Consult each linked encounter for its rules. For ordinary enemies, leave two rooms and return to reset; Encounte… |
| `kh1fm-weapon-dream-shield` → `instructions` | `tools/content/import-reference.source.json:3076`; `data/kh1fm/reference.json:3075` | Earn all seven spell Arts by showing one White Mushroom the same requested spell three times. Bring all seven Arts to Merlin in the Magician's Study. |

### KH1-010: every Bambi guide

| Record / field | Occurrences | Representative evidence / question |
|---|---|---|
| `kh1fm-guide-bambi-rewards-traverse-town` → `instructions` | `tools/content/import-reference.source.json:11108`; `data/kh1fm/reference.json:11107` | Summon Bambi in Traverse Town during a fight with enough ordinary enemies. Defeat enemies to fill his Charge Gauge, and collect the MP prizes to sustain your spells. First fill: Potion guaranteed. Second: Ether guaranteed and Blaze Shard 20%. Third: Hi-Potion guaranteed, Blaze Shard 20%, Blaze Gem 20%. These are condit… |
| `kh1fm-guide-bambi-rewards-wonderland` → `instructions` | `tools/content/import-reference.source.json:11140`; `data/kh1fm/reference.json:11139` | Summon Bambi in Wonderland during a fight with enough ordinary enemies. Defeat enemies to fill his Charge Gauge, and collect the MP prizes to sustain your spells. First fill: Potion guaranteed. Second: Ether guaranteed and Frost Shard 20%. Third: Hi-Potion guaranteed, Frost Shard 20%, Frost Gem 20%. These are condition… |
| `kh1fm-guide-bambi-rewards-deep-jungle` → `instructions` | `tools/content/import-reference.source.json:11172`; `data/kh1fm/reference.json:11171` | Summon Bambi in Deep Jungle during a fight with enough ordinary enemies. Defeat enemies to fill his Charge Gauge, and collect the MP prizes to sustain your spells. First fill: Potion guaranteed. Second: Ether guaranteed and Thunder Shard 20%. Third: Hi-Potion guaranteed, Thunder Shard 20%, Thunder Gem 20%. These are co… |
| `kh1fm-guide-bambi-rewards-agrabah` → `instructions` | `tools/content/import-reference.source.json:11204`; `data/kh1fm/reference.json:11203` | Summon Bambi in Agrabah during a fight with enough ordinary enemies. Defeat enemies to fill his Charge Gauge, and collect the MP prizes to sustain your spells. First fill: Potion guaranteed. Second: Ether guaranteed and Bright Shard 20%. Third: Hi-Potion guaranteed, Bright Shard 20%, Bright Gem 20%. These are condition… |
| `kh1fm-guide-bambi-rewards-monstro` → `instructions` | `tools/content/import-reference.source.json:11236`; `data/kh1fm/reference.json:11235` | Summon Bambi in Monstro during a fight with enough ordinary enemies. Defeat enemies to fill his Charge Gauge, and collect the MP prizes to sustain your spells. First fill: Potion guaranteed. Second: Ether guaranteed and Lucid Shard 20%. Third: Hi-Potion guaranteed, Lucid Shard 20%, Lucid Gem 20%. These are conditional … |
| `kh1fm-guide-bambi-rewards-halloween-town` → `instructions` | `tools/content/import-reference.source.json:11268`; `data/kh1fm/reference.json:11267` | Summon Bambi in Halloween Town during a fight with enough ordinary enemies. Defeat enemies to fill his Charge Gauge, and collect the MP prizes to sustain your spells. First fill: Potion guaranteed. Second: Ether guaranteed and Power Shard 20%. Third: Hi-Potion guaranteed, Power Shard 20%, Power Gem 20%. These are condi… |
| `kh1fm-guide-bambi-rewards-neverland` → `instructions` | `tools/content/import-reference.source.json:11300`; `data/kh1fm/reference.json:11299` | Summon Bambi in Neverland during a fight with enough ordinary enemies. Defeat enemies to fill his Charge Gauge, and collect the MP prizes to sustain your spells. First fill: Potion guaranteed. Second: Ether guaranteed and Spirit Shard 20%. Third: Hi-Potion guaranteed, Spirit Shard 20%, Spirit Gem 20%. These are conditi… |
| `kh1fm-guide-bambi-rewards-hollow-bastion` → `instructions` | `tools/content/import-reference.source.json:11332`; `data/kh1fm/reference.json:11331` | Summon Bambi in Hollow Bastion during a fight with enough ordinary enemies. Defeat enemies to fill his Charge Gauge, and collect the MP prizes to sustain your spells. First fill: Potion guaranteed. Second: Ether guaranteed and Lucid Gem 10%. Third: Hi-Potion guaranteed, Lucid Gem 20%, Lucid Crystal 10%. These are condi… |
| `kh1fm-guide-bambi-rewards-end-of-the-world` → `instructions` | `tools/content/import-reference.source.json:11364`; `data/kh1fm/reference.json:11363` | Summon Bambi in End of the World during a fight with enough ordinary enemies. Defeat enemies to fill his Charge Gauge, and collect the MP prizes to sustain your spells. First fill: Potion guaranteed. Second: Ether guaranteed and Mythril Shard 20%. Third: Hi-Potion guaranteed, Mythril Shard 20%, Mythril 10%. These are c… |

### KH1-011: coarse ordinary farming recommendations

| Record / field | Occurrences | Representative evidence / question |
|---|---|---|
| `kh1fm-material-blaze-gem` → `instructions` | `tools/content/import-reference.source.json:5091`; `data/kh1fm/reference.json:5090` | Run the Cave of Wonders rooms for Bandits and Fat Bandits. Get behind Fat Bandits to bypass their frontal defense. For ordinary enemies, leave two rooms and return to reset; Encounter Plus reduces that to one room. Equip Lucky Strike on active party members: three copies give 2.5 times an ordinary base drop rate. Speci… |
| `kh1fm-material-frost-shard` → `instructions` | `tools/content/import-reference.source.json:5130`; `data/kh1fm/reference.json:5129` | Clear Blue Rhapsodies in Wonderland or Monstro. Use Fire or melee and avoid Blizzard, which they absorb. For ordinary enemies, leave two rooms and return to reset; Encounter Plus reduces that to one room. Equip Lucky Strike on active party members: three copies give 2.5 times an ordinary base drop rate. Special encount… |
| `kh1fm-material-thunder-shard` → `instructions` | `tools/content/import-reference.source.json:5207`; `data/kh1fm/reference.json:5206` | Sweep Cave of Wonders rooms or Monstro for Yellow Operas. Use melee or another element; Thunder heals them. For ordinary enemies, leave two rooms and return to reset; Encounter Plus reduces that to one room. Equip Lucky Strike on active party members: three copies give 2.5 times an ordinary base drop rate. Special enco… |
| `kh1fm-material-spirit-shard` → `instructions` | `tools/content/import-reference.source.json:5284`; `data/kh1fm/reference.json:5283` | Before the late-game population change, clear Soldiers and Large Bodies across the districts. Strike Large Bodies from behind. Later, use other worlds that retain these enemies. For ordinary enemies, leave two rooms and return to reset; Encounter Plus reduces that to one room. Equip Lucky Strike on active party members… |
| `kh1fm-material-spirit-gem` → `instructions` | `tools/content/import-reference.source.json:5323`; `data/kh1fm/reference.json:5322` | Sweep the city and Cave of Wonders for Air Soldiers; lock on and jump into short aerial combos. Before the rescue population change, Traverse Town also provides Air Soldiers. For ordinary enemies, leave two rooms and return to reset; Encounter Plus reduces that to one room. Equip Lucky Strike on active party members: t… |
| `kh1fm-material-bright-gem` → `instructions` | `tools/content/import-reference.source.json:5600`; `data/kh1fm/reference.json:5599` | Run the Monstro chambers for Search Ghosts, or use Halloween Town and Atlantica populations. Lock on again after a teleport; use short combos rather than swinging while they disappear. For ordinary enemies, leave two rooms and return to reset; Encounter Plus reduces that to one room. Equip Lucky Strike on active party … |
| `kh1fm-material-lucid-crystal` → `instructions` | `tools/content/import-reference.source.json:5524`; `data/kh1fm/reference.json:5523` | After rescuing Kairi, farm Darkballs in Hollow Bastion or Traverse Town. Wait for them to emerge from their transparent invulnerable movement before committing to a combo. For ordinary enemies, leave two rooms and return to reset; Encounter Plus reduces that to one room. Equip Lucky Strike on active party members: thre… |
| `kh1fm-material-mythril-shard` → `instructions` | `tools/content/import-reference.source.json:5767`; `data/kh1fm/reference.json:5766` | Break hostile pots around Agrabah for Pot Spiders or hostile barrels in Monstro and Neverland for Barrel Spiders. Bambi in End of the World is a more productive alternative when you can fill its gauge three times. For ordinary enemies, leave two rooms and return to reset; Encounter Plus reduces that to one room. Equip … |

### KH1-012: post-manor chest routes

| Record / field | Occurrences | Representative evidence / question |
|---|---|---|
| `kh1fm-treasure-halloween-town-oogies-manor-manor-ruins-orichalcum-16` → `instructions` | `data/kh1fm/collectibles.json:9636` | Strike the Evil Playroom lever, leave and go to the bridge’s end. Drop onto the lowered cage and open Orichalcum. After the manor falls, the unopened chest moves to the ruins. |
| `kh1fm-treasure-halloween-town-oogies-manor-manor-ruins-mega-ether-17` → `instructions` | `data/kh1fm/collectibles.json:9683` | Above the manor’s Fire-powered lift, climb to the broken tower. Jump left onto the jagged wall’s roof, then onto the cage for Mega-Ether. After destruction, check the ruins instead. |

### KH1-013: every Gummi build guide

| Record / field | Occurrences | Representative evidence / question |
|---|---|---|
| `kh1fm-guide-gummi-no-damage-builds` → `instructions` | `tools/content/challenge-reference.json:6629`; `data/kh1fm/reference.json:24630` | Use the editor to keep blocks compact or away from the central firing lane, with a clear view of incoming shots. Add a shield only when the mission permits it. For Traverse Town 3 and Hollow Bastion 3, remove both Shield-G types. A build is not a substitute for steering; practice the route before combining its other re… |
| `kh1fm-guide-gummi-small-build-missions` → `instructions` | `tools/content/challenge-reference.json:6686`; `data/kh1fm/reference.json:24687` | For End of the World 1, use a cockpit and engine only, then steer through the route without braking or taking damage. For the five-block score mission, budget the remaining slots for weapons that you own. For Neverland 3, stay at ten blocks or fewer and prioritize obstacle coverage. These are starting layouts; adjust p… |
| `kh1fm-guide-gummi-collection-missions` → `instructions` | `tools/content/challenge-reference.json:6743`; `data/kh1fm/reference.json:24744` | Use a controllable ship and broad weapon coverage to create drops, then steer through them. Collection parts can help only when allowed: Agrabah 3 prohibits Drain-G and Osmose-G. Avoid a large silhouette for no-damage objectives; Neverland 2 separately requires at least 100 installed blocks. |
| `kh1fm-guide-gummi-weapon-restricted-missions` → `instructions` | `tools/content/challenge-reference.json:6800`; `data/kh1fm/reference.json:24801` | Inspect every weapon in the editor and remove other types. Multiple copies of the permitted type can improve coverage if your stock allows. Keep non-weapon blocks within the mission’s other constraints. Review the departure world as carefully as the weapon rule. |

### KH1-014: all course tutorials

| Record / field | Occurrences | Representative evidence / question |
|---|---|---|
| `kh1fm-minigame-jungle-slider-green-serpent` → `instructions` | `tools/content/challenge-reference.json:6925`; `data/kh1fm/reference.json:24926` | Enter the hollow trunk in Tunnel after sealing Deep Jungle. Collect all ten fruit in Green Serpent without missing any. On your next run, take the left exit to continue to the next course. |
| `kh1fm-minigame-jungle-slider-splash-tunnel` → `instructions` | `tools/content/challenge-reference.json:6961`; `data/kh1fm/reference.json:24962` | Enter the hollow trunk in Tunnel after sealing Deep Jungle. Collect all ten fruit in Splash Tunnel without missing any. The previous course’s fruit challenge must already be cleared; the newly opened branch becomes usable on a later attempt. On your next run, take the left exit to continue to the next course. |
| `kh1fm-minigame-jungle-slider-jade-spiral` → `instructions` | `tools/content/challenge-reference.json:6997`; `data/kh1fm/reference.json:24998` | Enter the hollow trunk in Tunnel after sealing Deep Jungle. Collect all ten fruit in Jade Spiral without missing any. The previous course’s fruit challenge must already be cleared; the newly opened branch becomes usable on a later attempt. On your next run, take the right exit to continue to the next course. |
| `kh1fm-minigame-jungle-slider-panic-fall` → `instructions` | `tools/content/challenge-reference.json:7033`; `data/kh1fm/reference.json:25034` | Enter the hollow trunk in Tunnel after sealing Deep Jungle. Collect all ten fruit in Panic Fall without missing any. The previous course’s fruit challenge must already be cleared; the newly opened branch becomes usable on a later attempt. On your next run, take the left exit to continue to the next course. |
| `kh1fm-minigame-jungle-slider-shadow-cavern` → `instructions` | `tools/content/challenge-reference.json:7069`; `data/kh1fm/reference.json:25070` | Enter the hollow trunk in Tunnel after sealing Deep Jungle. Collect all ten fruit in Shadow Cavern without missing any. The previous course’s fruit challenge must already be cleared; the newly opened branch becomes usable on a later attempt. This is the fifth and final fruit course. |
| `kh1fm-minigame-vine-swinging-jump-course` → `instructions` | `tools/content/challenge-reference.json:7105`; `data/kh1fm/reference.json:25106` | From Hippos’ Lagoon, climb the vine nearest the Camp exit. Examine the yellow flower beside the Vines save point and select this course. Move from vine to vine to the finish; jump off a snake promptly when Danger appears. Glide or Superglide can shorten the route on a later visit. |
| `kh1fm-minigame-vine-swinging-trap-course` → `instructions` | `tools/content/challenge-reference.json:7139`; `data/kh1fm/reference.json:25140` | From Hippos’ Lagoon, climb the vine nearest the Camp exit. Examine the yellow flower beside the Vines save point and select this course. Move from vine to vine to the finish; jump off a snake promptly when Danger appears. Glide or Superglide can shorten the route on a later visit. |
| `kh1fm-minigame-vine-swinging-acrobat-course` → `instructions` | `tools/content/challenge-reference.json:7173`; `data/kh1fm/reference.json:25174` | From Hippos’ Lagoon, climb the vine nearest the Camp exit. Examine the yellow flower beside the Vines save point and select this course. Move from vine to vine to the finish; jump off a snake promptly when Danger appears. Glide or Superglide can shorten the route on a later visit. |
| `kh1fm-minigame-vine-swinging-expert-course` → `instructions` | `tools/content/challenge-reference.json:7207`; `data/kh1fm/reference.json:25208` | From Hippos’ Lagoon, climb the vine nearest the Camp exit. Examine the yellow flower beside the Vines save point and select this course. Move from vine to vine to the finish; jump off a snake promptly when Danger appears. Glide or Superglide can shorten the route on a later visit. |

### KH1-015: EXP question rule

| Record / field | Occurrences | Representative evidence / question |
|---|---|---|
| `kh1fm-guide-dream-weapon-and-experience-choices` → `instructions` | `tools/content/import-reference.source.json:10911`; `data/kh1fm/reference.json:10910` | At Dive to the Heart, your chosen Dream weapon controls Sora's ability order. The sacrificed weapon affects starting stats; it does not replace the chosen-weapon ability schedule. Choosing the Rod provides an extra starting MP and a higher eventual MP total. The later Tidus/Selphie/Wakka questions set Dawn, Midday or D… |

### KH1-016: secret-ending distinction

| Record / field | Occurrences | Representative evidence / question |
|---|---|---|
| `kh1fm-guide-secret-ending-another-side-another-story` → `instructions` | `tools/content/challenge-reference.json:7712`; `data/kh1fm/reference.json:25713` | Finish the game after meeting the condition for your difficulty: Standard (Final Mix) requires all Keyholes sealed and all 99 puppies rescued; Proud requires finishing the game. Beginner cannot unlock this movie. If Deep Dive requirements are satisfied, that movie replaces the shorter one. |
| `kh1fm-guide-secret-ending-deep-dive` → `instructions` | `tools/content/challenge-reference.json:7742`; `data/kh1fm/reference.json:25743` | On Standard (Final Mix), complete Jiminy’s Journal before finishing the game. On Proud, seal every Keyhole and clear the Hades Cup before finishing. Beginner cannot unlock this movie. Deep Dive replaces the shorter secret movie when its conditions are met. |

### KH1-011: all linked enemy occurrences for the selected farms

| Record / field | Occurrences | Representative evidence / question |
|---|---|---|
| `kh1fm-enemy-air-soldier` → `instructions` | `tools/content/import-reference.source.json:7398`; `data/kh1fm/reference.json:7397` | City |
| `kh1fm-enemy-arch-behemoth` → `instructions` | `tools/content/import-reference.source.json:8516`; `data/kh1fm/reference.json:8515` | Final Dimension / Linked Worlds |
| `kh1fm-enemy-bandit` → `instructions` | `tools/content/import-reference.source.json:6838`; `data/kh1fm/reference.json:6837` | Cave of Wonders |
| `kh1fm-enemy-barrel-spider` → `instructions` | `tools/content/import-reference.source.json:8460`; `data/kh1fm/reference.json:8459` | City |
| `kh1fm-enemy-blue-rhapsody` → `instructions` | `tools/content/import-reference.source.json:6950`; `data/kh1fm/reference.json:6949` | Lotus Forest |
| `kh1fm-enemy-darkball` → `instructions` | `tools/content/import-reference.source.json:7956`; `data/kh1fm/reference.json:7955` | Late-game rooms |
| `kh1fm-enemy-fat-bandit` → `instructions` | `tools/content/import-reference.source.json:6894`; `data/kh1fm/reference.json:6893` | Cave of Wonders |
| `kh1fm-enemy-large-body` → `instructions` | `tools/content/import-reference.source.json:7342`; `data/kh1fm/reference.json:7341` | Districts |
| `kh1fm-enemy-pot-spider` → `instructions` | `tools/content/import-reference.source.json:8404`; `data/kh1fm/reference.json:8403` | City |
| `kh1fm-enemy-search-ghost` → `instructions` | `tools/content/import-reference.source.json:8073`; `data/kh1fm/reference.json:8072` | Chambers |
| `kh1fm-enemy-soldier` → `instructions` | `tools/content/import-reference.source.json:7286`; `data/kh1fm/reference.json:7285` | Districts |
| `kh1fm-enemy-yellow-opera` → `instructions` | `tools/content/import-reference.source.json:7118`; `data/kh1fm/reference.json:7117` | Cave of Wonders |

### KH1-017: all 28 enemy blueprint probability omissions

| Record / field | Occurrences | Representative evidence / question |
|---|---|---|
| `kh1fm-gummi-cindy-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5177`; `data/kh1fm/reference.json:23178` | Route list is present: Wonderland - Deep Jungle; Olympus Coliseum - Deep Jungle; Neverland - Hollow Bastion; Hollow Bastion - End of the World |
| `kh1fm-gummi-shiva-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5215`; `data/kh1fm/reference.json:23216` | Route list is present: Neverland - Hollow Bastion |
| `kh1fm-gummi-lamia-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5253`; `data/kh1fm/reference.json:23254` | Route list is present: Agrabah - Atlantica; Neverland - Hollow Bastion |
| `kh1fm-gummi-sandy-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5291`; `data/kh1fm/reference.json:23292` | Route list is present: Agrabah - Halloween Town; Halloween Town - Atlantica; Halloween Town - Neverland |
| `kh1fm-gummi-sylph-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5329`; `data/kh1fm/reference.json:23330` | Route list is present: Traverse Town - Wonderland; Hollow Bastion - End of the World |
| `kh1fm-gummi-carbuncle-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5367`; `data/kh1fm/reference.json:23368` | Route list is present: Agrabah - Atlantica |
| `kh1fm-gummi-mindy-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5405`; `data/kh1fm/reference.json:23406` | Route list is present: Atlantica - Neverland |
| `kh1fm-gummi-goblin-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5443`; `data/kh1fm/reference.json:23444` | Route list is present: Traverse Town - Wonderland; Traverse Town - Olympus Coliseum; Wonderland - Deep Jungle; Olympus Coliseum - Deep Jungle |
| `kh1fm-gummi-bomb-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5481`; `data/kh1fm/reference.json:23482` | Route list is present: Halloween Town - Neverland; Atlantica - Neverland; Warp (Traverse Town - Agrabah) |
| `kh1fm-gummi-remora-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5519`; `data/kh1fm/reference.json:23520` | Route list is present: Warp (Olympus Coliseum - Agrabah) |
| `kh1fm-gummi-ahriman-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5557`; `data/kh1fm/reference.json:23558` | Route list is present: Traverse Town - Wonderland; Traverse Town - Olympus Coliseum |
| `kh1fm-gummi-imp-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5595`; `data/kh1fm/reference.json:23596` | Route list is present: Warp (Olympus Coliseum - Agrabah) |
| `kh1fm-gummi-siren-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5633`; `data/kh1fm/reference.json:23634` | Route list is present: Warp (Traverse Town - Hollow Bastion) |
| `kh1fm-gummi-stingray-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5671`; `data/kh1fm/reference.json:23672` | Route list is present: Halloween Town - Neverland; Atlantica - Neverland; Neverland - Hollow Bastion; Hollow Bastion - End of the World; Warp (Traverse Town - Agrabah) |
| `kh1fm-gummi-catoblepas-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5709`; `data/kh1fm/reference.json:23710` | Route list is present: Halloween Town - Neverland; Atlantica - Neverland |
| `kh1fm-gummi-adamant-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5747`; `data/kh1fm/reference.json:23748` | Route list is present: Neverland - Hollow Bastion |
| `kh1fm-gummi-serpent-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5785`; `data/kh1fm/reference.json:23786` | Route list is present: Neverland - Hollow Bastion |
| `kh1fm-gummi-ifrit-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5823`; `data/kh1fm/reference.json:23824` | Route list is present: Warp (Traverse Town - Hollow Bastion) |
| `kh1fm-gummi-odin-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5861`; `data/kh1fm/reference.json:23862` | Route list is present: Wonderland - Deep Jungle; Olympus Coliseum - Deep Jungle |
| `kh1fm-gummi-atomos-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5899`; `data/kh1fm/reference.json:23900` | Route list is present: Traverse Town - Wonderland |
| `kh1fm-gummi-golem-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5937`; `data/kh1fm/reference.json:23938` | Route list is present: Wonderland - Deep Jungle |
| `kh1fm-gummi-diablos-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:5975`; `data/kh1fm/reference.json:23976` | Route list is present: Agrabah - Atlantica |
| `kh1fm-gummi-deathguise-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:6013`; `data/kh1fm/reference.json:24014` | Route list is present: Neverland - Hollow Bastion; Hollow Bastion - End of the World; Warp (Traverse Town - Agrabah) |
| `kh1fm-gummi-typhoon-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:6051`; `data/kh1fm/reference.json:24052` | Route list is present: Agrabah - Halloween Town |
| `kh1fm-gummi-alexander-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:6089`; `data/kh1fm/reference.json:24090` | Route list is present: Traverse Town - Wonderland; Traverse Town - Olympus Coliseum |
| `kh1fm-gummi-leviathan-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:6127`; `data/kh1fm/reference.json:24128` | Route list is present: Warp (Traverse Town - Agrabah) |
| `kh1fm-gummi-ramuh-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:6165`; `data/kh1fm/reference.json:24166` | Route list is present: Traverse Town - Olympus Coliseum; Olympus Coliseum - Deep Jungle |
| `kh1fm-gummi-omega-blueprint` → `absent probability/appearance conditions; facts.routes` | `tools/content/challenge-reference.json:6203`; `data/kh1fm/reference.json:24204` | Route list is present: Hollow Bastion - End of the World |

### KH1-018: all nine qualitative effect entries

| Record / field | Occurrences | Representative evidence / question |
|---|---|---|
| `kh1fm-ability-critical-plus` → `summary` | `tools/content/import-reference.source.json:8964`; `data/kh1fm/reference.json:8963` | Raises the chance of critical hits; copies stack. |
| `kh1fm-ability-treasure-magnet` → `summary` | `tools/content/import-reference.source.json:10190`; `data/kh1fm/reference.json:10189` | Pulls nearby dropped prizes toward the character; copies extend the reach. |
| `kh1fm-ability-mp-haste` → `summary` | `tools/content/import-reference.source.json:10259`; `data/kh1fm/reference.json:10258` | Improves MP recovery from successful attacks. |
| `kh1fm-ability-mp-rage` → `summary` | `tools/content/import-reference.source.json:10295`; `data/kh1fm/reference.json:10294` | Recovers MP based on damage taken; multiple equipped copies stack. |
| `kh1fm-ability-berserk` → `summary` | `tools/content/import-reference.source.json:10331`; `data/kh1fm/reference.json:10330` | Raises physical power while HP is critical. |
| `kh1fm-ability-jackpot` → `summary` | `tools/content/import-reference.source.json:10439`; `data/kh1fm/reference.json:10438` | Increases dropped HP/MP prizes and munny; it does not replace Lucky Strike for synthesis drops. |
| `kh1fm-ability-tech-boost` → `summary` | `tools/content/import-reference.source.json:10511`; `data/kh1fm/reference.json:10510` | Increases EXP from technical actions such as blocks; copies stack. |
| `kh1fm-ability-cheer` → `summary` | `tools/content/import-reference.source.json:10552`; `data/kh1fm/reference.json:10551` | Extends summon duration/MP; active party copies help. |
| `kh1fm-ability-second-wind` → `summary` | `tools/content/import-reference.source.json:10585`; `data/kh1fm/reference.json:10584` | Shortens an ally's knockout recovery and restores full HP on revival. |

### KH1-019: all 55 unavailable API keys

| Record / field | Occurrences | Representative evidence / question |
|---|---|---|
| `kh1fm-achievement-proud-player` → `facts.platformApiId` | `tools/content/challenge-reference.json:7896`; `data/kh1fm/reference.json:25897` | Not exposed by the public achievement list; also .uncertainty: reused name warning |
| `kh1fm-achievement-final-mix-master` → `facts.platformApiId` | `tools/content/challenge-reference.json:7933`; `data/kh1fm/reference.json:25934` | Not exposed by the public achievement list |
| `kh1fm-achievement-novice-player` → `facts.platformApiId` | `tools/content/challenge-reference.json:7969`; `data/kh1fm/reference.json:25970` | Not exposed by the public achievement list |
| `kh1fm-achievement-unchanging-armor` → `facts.platformApiId` | `tools/content/challenge-reference.json:8038`; `data/kh1fm/reference.json:26039` | Not exposed by the public achievement list |
| `kh1fm-achievement-undefeated` → `facts.platformApiId` | `tools/content/challenge-reference.json:8108`; `data/kh1fm/reference.json:26109` | Not exposed by the public achievement list; also .uncertainty: reused name warning |
| `kh1fm-achievement-speedster` → `facts.platformApiId` | `tools/content/challenge-reference.json:8178`; `data/kh1fm/reference.json:26179` | Not exposed by the public achievement list |
| `kh1fm-achievement-he-who-doesn-t-exist` → `facts.platformApiId` | `tools/content/challenge-reference.json:8217`; `data/kh1fm/reference.json:26218` | Not exposed by the public achievement list |
| `kh1fm-achievement-the-cloaked-shadow` → `facts.platformApiId` | `tools/content/challenge-reference.json:8255`; `data/kh1fm/reference.json:26256` | Not exposed by the public achievement list |
| `kh1fm-achievement-the-sandy-blade` → `facts.platformApiId` | `tools/content/challenge-reference.json:8293`; `data/kh1fm/reference.json:26294` | Not exposed by the public achievement list |
| `kh1fm-achievement-novice-hero` → `facts.platformApiId` | `tools/content/challenge-reference.json:8331`; `data/kh1fm/reference.json:26332` | Not exposed by the public achievement list; also .uncertainty: reused name warning |
| `kh1fm-achievement-artisan-hero` → `facts.platformApiId` | `tools/content/challenge-reference.json:8370`; `data/kh1fm/reference.json:26371` | Not exposed by the public achievement list; also .uncertainty: reused name warning |
| `kh1fm-achievement-hero-of-the-coliseum` → `facts.platformApiId` | `tools/content/challenge-reference.json:8409`; `data/kh1fm/reference.json:26410` | Not exposed by the public achievement list; also .uncertainty: reused name warning |
| `kh1fm-achievement-coliseum-champion` → `facts.platformApiId` | `tools/content/challenge-reference.json:8448`; `data/kh1fm/reference.json:26449` | Not exposed by the public achievement list; also .uncertainty: reused name warning |
| `kh1fm-achievement-the-frosty-giant` → `facts.platformApiId` | `tools/content/challenge-reference.json:8487`; `data/kh1fm/reference.json:26488` | Not exposed by the public achievement list |
| `kh1fm-achievement-one-winged-angel` → `facts.platformApiId` | `tools/content/challenge-reference.json:8525`; `data/kh1fm/reference.json:26526` | Not exposed by the public achievement list; also .uncertainty: reused name warning |
| `kh1fm-achievement-supreme-soloist` → `facts.platformApiId` | `tools/content/challenge-reference.json:8567`; `data/kh1fm/reference.json:26568` | Not exposed by the public achievement list |
| `kh1fm-achievement-time-attacker` → `facts.platformApiId` | `tools/content/challenge-reference.json:8608`; `data/kh1fm/reference.json:26609` | Not exposed by the public achievement list |
| `kh1fm-achievement-level-master` → `facts.platformApiId` | `tools/content/challenge-reference.json:8644`; `data/kh1fm/reference.json:26645` | Not exposed by the public achievement list; also .uncertainty: reused name warning |
| `kh1fm-achievement-treasure-hunter` → `facts.platformApiId` | `tools/content/challenge-reference.json:8681`; `data/kh1fm/reference.json:26682` | Not exposed by the public achievement list; also .uncertainty: reused name warning |
| `kh1fm-achievement-from-rags-to-riches` → `facts.platformApiId` | `tools/content/challenge-reference.json:8718`; `data/kh1fm/reference.json:26719` | Not exposed by the public achievement list |
| `kh1fm-achievement-heartless-hunter` → `facts.platformApiId` | `tools/content/challenge-reference.json:8754`; `data/kh1fm/reference.json:26755` | Not exposed by the public achievement list |
| `kh1fm-achievement-where-the-bells-toll` → `facts.platformApiId` | `tools/content/challenge-reference.json:8790`; `data/kh1fm/reference.json:26791` | Not exposed by the public achievement list |
| `kh1fm-achievement-the-rabbit-hole` → `facts.platformApiId` | `tools/content/challenge-reference.json:8827`; `data/kh1fm/reference.json:26828` | Not exposed by the public achievement list |
| `kh1fm-achievement-junior-hero` → `facts.platformApiId` | `tools/content/challenge-reference.json:8864`; `data/kh1fm/reference.json:26865` | Not exposed by the public achievement list |
| `kh1fm-achievement-member-of-the-tribe` → `facts.platformApiId` | `tools/content/challenge-reference.json:8901`; `data/kh1fm/reference.json:26902` | Not exposed by the public achievement list |
| `kh1fm-achievement-magic-lamp` → `facts.platformApiId` | `tools/content/challenge-reference.json:8938`; `data/kh1fm/reference.json:26939` | Not exposed by the public achievement list |
| `kh1fm-achievement-honest-soul` → `facts.platformApiId` | `tools/content/challenge-reference.json:8975`; `data/kh1fm/reference.json:26976` | Not exposed by the public achievement list |
| `kh1fm-achievement-master-of-the-seas` → `facts.platformApiId` | `tools/content/challenge-reference.json:9012`; `data/kh1fm/reference.json:27013` | Not exposed by the public achievement list |
| `kh1fm-achievement-pumpkin-prince` → `facts.platformApiId` | `tools/content/challenge-reference.json:9049`; `data/kh1fm/reference.json:27050` | Not exposed by the public achievement list |
| `kh1fm-achievement-pixie-dust` → `facts.platformApiId` | `tools/content/challenge-reference.json:9086`; `data/kh1fm/reference.json:27087` | Not exposed by the public achievement list |
| `kh1fm-achievement-end-of-the-world` → `facts.platformApiId` | `tools/content/challenge-reference.json:9123`; `data/kh1fm/reference.json:27124` | Not exposed by the public achievement list |
| `kh1fm-achievement-pooh-s-friend` → `facts.platformApiId` | `tools/content/challenge-reference.json:9159`; `data/kh1fm/reference.json:27160` | Not exposed by the public achievement list |
| `kh1fm-achievement-record-keeper` → `facts.platformApiId` | `tools/content/challenge-reference.json:9196`; `data/kh1fm/reference.json:27197` | Not exposed by the public achievement list |
| `kh1fm-achievement-storyteller` → `facts.platformApiId` | `tools/content/challenge-reference.json:9233`; `data/kh1fm/reference.json:27234` | Not exposed by the public achievement list |
| `kh1fm-achievement-searcher` → `facts.platformApiId` | `tools/content/challenge-reference.json:9270`; `data/kh1fm/reference.json:27271` | Not exposed by the public achievement list; also .uncertainty: reused name warning |
| `kh1fm-achievement-professor` → `facts.platformApiId` | `tools/content/challenge-reference.json:9307`; `data/kh1fm/reference.json:27308` | Not exposed by the public achievement list; also .uncertainty: reused name warning |
| `kh1fm-achievement-top-dog` → `facts.platformApiId` | `tools/content/challenge-reference.json:9344`; `data/kh1fm/reference.json:27345` | Not exposed by the public achievement list |
| `kh1fm-achievement-best-friend` → `facts.platformApiId` | `tools/content/challenge-reference.json:9381`; `data/kh1fm/reference.json:27382` | Not exposed by the public achievement list |
| `kh1fm-achievement-mini-game-maniac` → `facts.platformApiId` | `tools/content/challenge-reference.json:9440`; `data/kh1fm/reference.json:27441` | Not exposed by the public achievement list |
| `kh1fm-achievement-synthesis-master` → `facts.platformApiId` | `tools/content/challenge-reference.json:9477`; `data/kh1fm/reference.json:27478` | Not exposed by the public achievement list |
| `kh1fm-achievement-first-synthesis` → `facts.platformApiId` | `tools/content/challenge-reference.json:9514`; `data/kh1fm/reference.json:27515` | Not exposed by the public achievement list |
| `kh1fm-achievement-synthesis-novice` → `facts.platformApiId` | `tools/content/challenge-reference.json:9551`; `data/kh1fm/reference.json:27552` | Not exposed by the public achievement list |
| `kh1fm-achievement-synthesis-amateur` → `facts.platformApiId` | `tools/content/challenge-reference.json:9588`; `data/kh1fm/reference.json:27589` | Not exposed by the public achievement list |
| `kh1fm-achievement-synthesis-vet` → `facts.platformApiId` | `tools/content/challenge-reference.json:9625`; `data/kh1fm/reference.json:27626` | Not exposed by the public achievement list |
| `kh1fm-achievement-gummi-ship-collector` → `facts.platformApiId` | `tools/content/challenge-reference.json:9711`; `data/kh1fm/reference.json:27712` | Not exposed by the public achievement list; also .uncertainty: reused name warning |
| `kh1fm-achievement-flying-ace` → `facts.platformApiId` | `tools/content/challenge-reference.json:9748`; `data/kh1fm/reference.json:27749` | Not exposed by the public achievement list |
| `kh1fm-achievement-customizer` → `facts.platformApiId` | `tools/content/challenge-reference.json:9784`; `data/kh1fm/reference.json:27785` | Not exposed by the public achievement list |
| `kh1fm-achievement-top-gun` → `facts.platformApiId` | `tools/content/challenge-reference.json:9821`; `data/kh1fm/reference.json:27822` | Not exposed by the public achievement list; also .uncertainty: reused name warning |
| `kh1fm-achievement-test-pilot` → `facts.platformApiId` | `tools/content/challenge-reference.json:9869`; `data/kh1fm/reference.json:27870` | Not exposed by the public achievement list |
| `kh1fm-achievement-veteran-pilot` → `facts.platformApiId` | `tools/content/challenge-reference.json:9917`; `data/kh1fm/reference.json:27918` | Not exposed by the public achievement list; also .uncertainty: reused name warning |
| `kh1fm-achievement-ace-pilot` → `facts.platformApiId` | `tools/content/challenge-reference.json:9965`; `data/kh1fm/reference.json:27966` | Not exposed by the public achievement list; also .uncertainty: reused name warning |
| `kh1fm-achievement-oathkeeper` → `facts.platformApiId` | `tools/content/challenge-reference.json:10002`; `data/kh1fm/reference.json:28003` | Not exposed by the public achievement list |
| `kh1fm-achievement-blade-master` → `facts.platformApiId` | `tools/content/challenge-reference.json:10038`; `data/kh1fm/reference.json:28039` | Not exposed by the public achievement list |
| `kh1fm-achievement-master-magician` → `facts.platformApiId` | `tools/content/challenge-reference.json:10075`; `data/kh1fm/reference.json:28076` | Not exposed by the public achievement list |
| `kh1fm-achievement-master-defender` → `facts.platformApiId` | `tools/content/challenge-reference.json:10112`; `data/kh1fm/reference.json:28113` | Not exposed by the public achievement list |

### Explicit field and coverage occurrences supplement

| Finding / record field | Exact occurrences |
|---|---|
| `kh1fm-accessory-three-stars.facts.Defense` | `tools/content/import-reference.source.json:4827`; `data/kh1fm/reference.json:4826` |
| `kh1fm-accessory-three-stars.verification` | `tools/content/import-reference.source.json:4821`; `data/kh1fm/reference.json:4820` |
| `kh1fm-report-13.facts.earliestUnlockStatus` | `data/kh1fm/collectibles.json:16511` |
| KH1-019 `kh1fm-achievement-proud-player.uncertainty` | `tools/content/challenge-reference.json:7899`; `data/kh1fm/reference.json:25900` |
| KH1-019 `kh1fm-achievement-undefeated.uncertainty` | `tools/content/challenge-reference.json:8112`; `data/kh1fm/reference.json:26113` |
| KH1-019 `kh1fm-achievement-novice-hero.uncertainty` | `tools/content/challenge-reference.json:8334`; `data/kh1fm/reference.json:26335` |
| KH1-019 `kh1fm-achievement-artisan-hero.uncertainty` | `tools/content/challenge-reference.json:8373`; `data/kh1fm/reference.json:26374` |
| KH1-019 `kh1fm-achievement-hero-of-the-coliseum.uncertainty` | `tools/content/challenge-reference.json:8412`; `data/kh1fm/reference.json:26413` |
| KH1-019 `kh1fm-achievement-coliseum-champion.uncertainty` | `tools/content/challenge-reference.json:8451`; `data/kh1fm/reference.json:26452` |
| KH1-019 `kh1fm-achievement-one-winged-angel.uncertainty` | `tools/content/challenge-reference.json:8528`; `data/kh1fm/reference.json:26529` |
| KH1-019 `kh1fm-achievement-level-master.uncertainty` | `tools/content/challenge-reference.json:8647`; `data/kh1fm/reference.json:26648` |
| KH1-019 `kh1fm-achievement-treasure-hunter.uncertainty` | `tools/content/challenge-reference.json:8684`; `data/kh1fm/reference.json:26685` |
| KH1-019 `kh1fm-achievement-searcher.uncertainty` | `tools/content/challenge-reference.json:9273`; `data/kh1fm/reference.json:27274` |
| KH1-019 `kh1fm-achievement-professor.uncertainty` | `tools/content/challenge-reference.json:9310`; `data/kh1fm/reference.json:27311` |
| KH1-019 `kh1fm-achievement-gummi-ship-collector.uncertainty` | `tools/content/challenge-reference.json:9714`; `data/kh1fm/reference.json:27715` |
| KH1-019 `kh1fm-achievement-top-gun.uncertainty` | `tools/content/challenge-reference.json:9824`; `data/kh1fm/reference.json:27825` |
| KH1-019 `kh1fm-achievement-veteran-pilot.uncertainty` | `tools/content/challenge-reference.json:9920`; `data/kh1fm/reference.json:27921` |
| KH1-019 `kh1fm-achievement-ace-pilot.uncertainty` | `tools/content/challenge-reference.json:9968`; `data/kh1fm/reference.json:27969` |

Coverage `expected`, `complete` and `notes`: `tools/content/challenge-coverage.json:43–56` and `data/kh1fm/reference-coverage.json:99–112` identify incomplete `minigame` and challenge `guide`; `data/kh1fm/collectibles-coverage.json:67–72` is the intentional open-ended world-guide grouping. `tools/content/import-reference.source.json` owns the first seven reference coverage rows; the challenge coverage source owns the remaining seven.

## Appendix B — Planning and shared-document occurrence register

These are additional explicit missing/hedged/remaining-work occurrences, with present disposition. Resolved planning gaps are retained to prevent their being mistaken for new blockers. Line ranges refer to unchanged baseline files.

| Location | Excerpt / issue | Current disposition |
|---|---|---|
| `ai_docs/games/kh1fm/README.md:5,21–29` | does not certify… dataset complete; finish inventories; explicit uncertainties; Energy Bangle provisional | Inventories largely delivered; C01 resolved; use current findings. |
| `ai_docs/games/kh1fm/world-and-coverage-audit.md:3,13,31` | different milestones; exact directions beyond room; starting-choice instructions | Historical import stage; KH1-011–015 retain precise remaining issues. |
| `ai_docs/games/kh1fm/world-and-coverage-audit.md:46–52` | D01–D07 area links, every container, puppy/Trinity import, Gizmo route, Pooh tutorials, Reports | Canonical collection import resolves broad inventory work; KH1-002,005,012,014 remain narrow. |
| `ai_docs/games/kh1fm/world-and-coverage-audit.md:53–57` | D08–D12 recipe conflict, all material alternatives, stats, level matrix, normalize magic | C01/matrix/rosters resolved; KH1-006,008–011,015 remain. |
| `ai_docs/games/kh1fm/world-and-coverage-audit.md:58–64` | D13–D19 rounds/checkpoints, Unknown, minigames, Gummi parts/builds, platform/run rules, theater, memberships | Rounds/missions/blueprints imported; KH1-002–005,007–008,013–016,019 remain or qualify. |
| `ai_docs/games/kh1fm/world-and-coverage-audit.md:72–76` | C01–C05 explicit targeted issues | C01/C05 resolved; C02=KH1-002; C03=KH1-003; C04 retired. |
| `ai_docs/games/kh1fm/world-and-coverage-audit.md:82–84,88–92` | unmeasured totals; community sources; honest unknowns; no gameplay gate | Old import counts superseded; provenance boundary KH1-020; policy still valid. |
| `ai_docs/games/kh1fm/collectibles-and-progression.md:23,42` | expected planning counts; Gummi puppy reward not every part | Current counted records supplied; missing parts catalog KH1-007. |
| `ai_docs/games/kh1fm/collectibles-and-progression.md:157,167,171` | matrix remains; theater separate; exact routes/check modern behavior | Matrix resolved; KH1-016 theater; no manual gameplay gate. |
| `ai_docs/games/kh1fm/synthesis-farming-and-equipment.md:3,15,26` | not every spawn table; Battleship rules; room-by-room work | Battleship rates supplied; full spawn manifest excluded; practical route gap KH1-011. |
| `ai_docs/games/kh1fm/synthesis-farming-and-equipment.md:32–41` | initial qualitative special encounter rewards | Linked enemy fact tables now contain exact conditional distributions; KH1-006 empty special-enemy facts remain. |
| `ai_docs/games/kh1fm/synthesis-farming-and-equipment.md:55–60,112,116,118,120` | individual Arts; goal membership; accessory stats; C01; Bambi/reset/distributions/workbook | C01/accessory roster/Bambi distributions resolved; KH1-007–011,019–020. |
| `ai_docs/games/kh1fm/synthesis-recipes.md:3,53,84,88–90` | awaiting reconciliation; independent totals and later calculation validation | C01 resolved; stock uncertainty is not recipe research uncertainty. |
| `ai_docs/games/kh1fm/challenges-gummi-and-run-goals.md:5,14,26` | import seeds/checkpoints; Unknown exact flag | Cups imported; KH1-002 remains. |
| `ai_docs/games/kh1fm/challenges-gummi-and-run-goals.md:70` | verify Wonderland Haste wording | Resolved in challenge source and current coverage. |
| `ai_docs/games/kh1fm/challenges-gummi-and-run-goals.md:90,108,112` | parts catalog; exact platform IDs; restricted-run behavior | KH1-007,013,019,003. |
| `ai_docs/games/kingdom-hearts-final-mix.md:5,17,59,67–71,82,112,118,147–157` | draft, precise guidance, all sources/parts, edition stats, source risks | See current findings; broad unbuilt/incomplete claims superseded by imports. |
| `ai_docs/readiness/kingdom-hearts-final-mix.md:9–17` | current narrow qualifications; historical baseline retained | Authoritative precedence notice; three current caveat families do not exhaust structural gaps. |
| `ai_docs/readiness/kingdom-hearts-final-mix.md:44–62` | KH1-D01–D19 pre-implementation requirements/status | Same disposition as corresponding D rows above; no second set of current missing inventories. |
| `ai_docs/readiness/kingdom-hearts-final-mix.md:76,79,111–117,146–148` | unknown vs inapplicable; unmeasured counts; old research queue/release blockers | Counts/matrix/recipes imported; specific open findings govern. |
| `ai_docs/02-content-inventory.md:14,17–21,31,62–73` | repository audit required; facts unverified; treasure/accessory largest gap; source risks | Historical generic inventory claims; current artifacts supersede many; KH1-020 remains auditability limitation. |
| `ai_docs/sources/khtables-drive-audit.md:5,13,44–56,62–71` | not accurate/complete claim; mixed editions; sparse provenance; candidate migration rules | KH1-020. No uninspected Drive contents silently treated as audited. |
| `ai_docs/research/parallel-game-research.md:23–33` | inspect actual ranges; separate source presence; leave unresolved facts visible | Method/provenance guidance, not an extra KH1 data gap. |
| `ai_docs/08-roadmap-and-backlog.md:73–74` | actual range audits ongoing; no dataset certified complete | Historical shared status; KH1-020 crosswalk limitation, not wholesale current data rejection. |
| `ai_docs/readiness/README.md:7,24–25` | pin releases/builds; missing/partial/verified states; expected/actual evidence | KH1-020 precise build provenance; inventory denominators checked. |
| `ai_docs/content/collectible-compendium-and-linked-views.md:65,72,91` | unknown inventory cannot be 100%; narrative exclusion | Interpretation rule; excluded narrative manifests not counted. |
| `ai_docs/content/persistent-checklists-and-progress.md:45` | unknown/unsupported/unverified requirements | Implementation contract; no new factual item by itself. |
| `ai_docs/content/synthesis-and-inventory.md:25` | unknown/disputed quantities | Generic rule; current 33 recipes have no unresolved quantity. |
| `ai_docs/implementation/reference-data.md:3,11,15–21,25,33,35,39–41` | reviewed source-backed; reconciliations; every-room/party/API caveats | Current resolution evidence; KH1-001,019 and scoped exclusions. |
| `ai_docs/implementation/collectibles.md:3–11,38–44` | source-backed/exhaustive declared inventory; original geometry; duplicate and Unknown | Current reconciled inventory; KH1-002/012 qualify exact access guidance. |
| `ai_docs/implementation/verification.md:7–9,38` | 1,149 entries; excluded Three Stars; restricted/minigame caveats | Current caveat occurrences KH1-001–005; app/hardware limits excluded. |
| `ai_docs/implementation/multi-game-rollout.md:31` | Some precise chest approaches/hidden achievements/catalogs remain incomplete | Shared broad statement; apply only where KH1 records establish a gap. |

## Appendix C — Legacy and superseded source occurrences

The 13 legacy CSVs (`csv/khfmbestiary.csv`, `khfmdalmations.csv`, `khfmequipment.csv`, `khfmexp.csv`, `khfmlevels.csv`, `khfmmagic.csv`, `khfmpages.csv`, `khfmpostcards.csv`, `khfmsynth.csv`, `khfmsynthneeded.csv`, `khfmtournaments.csv`, `khfmtrinity.csv`, `khfmweapons.csv`) and `games/khfm.html` are candidate/archival data, not production imports. They have no record-level modern citation/date/status crosswalk. Empty layout/separator cells, level rows without an awarded ability, literal “N/A” and Dream Rod's fictional “unknown power” are not automatically factual gaps.

| Occurrence | Evidence and disposition |
|---|---|
| `games/khfm.html:5162` | “This section is incomplete… missing a few… Final Mix exclusive heartless.” Current 44 acquisition-relevant enemies include all ten special-material encounters; this old warning is not current missing-enemy proof. A complete narrative bestiary is excluded. |
| `csv/khfmtournaments.csv:76`; `games/khfm.html:2474` | Hades seed 26, Shadow x? waves 1/3/5/12. Current seed record has reviewed opponents. |
| `csv/khfmtournaments.csv:86`; `games/khfm.html:2514` | Hades seed 16, Darkball x? waves 1/3/5/12. Current seed record supersedes it. |
| `csv/khfmtournaments.csv:97`; `games/khfm.html:2558` | Hades seed 5, Shadow and Darkball x?. Current seed record supersedes it. |
| `csv/khfmtournaments.csv:99`; `games/khfm.html:2566` | Hades seed 3, Wyvern/Wizard/Defender x? and malformed parentheses. Current reviewed opponents supersede it. |
| `csv/khfmtournaments.csv:100`; `games/khfm.html:2570` | Hades seed 2, Darkball/Angel Star/Invisible x?. Current reviewed opponents supersede it. |
| `csv/khfmexp.csv:4–5,22` | Duplicate level 15 and rejected late-game totals. Current full curves supersede them. |
| `csv/khfmsynthneeded.csv:2–35` | Legacy hand-maintained aggregate/farming notes, many blank strategies; current recipes/material/enemy records supersede values. Blank strategy cells are fully enumerated below. |
| `tools/content/import-collectibles.py:116,154–155` | Initial uncertain position set and generated disclaimer; later refinements at 279–320 and duplicate removal 345–351 supersede these states. All original candidate row identities are enumerated below. |

Legacy blank strategy fields (all occurrences; resolved as legacy omissions, except current narrow KH1-011 routes):

- `csv/khfmsynthneeded.csv:2` — `Blaze Gem.STRATEGY`.
- `csv/khfmsynthneeded.csv:3` — `Blaze Shard.STRATEGY`.
- `csv/khfmsynthneeded.csv:5` — `Bright Crystal.STRATEGY`.
- `csv/khfmsynthneeded.csv:6` — `Bright Gem.STRATEGY`.
- `csv/khfmsynthneeded.csv:7` — `Bright Shard.STRATEGY`.
- `csv/khfmsynthneeded.csv:9` — `Dark Matter.STRATEGY`.
- `csv/khfmsynthneeded.csv:11` — `Frost Gem.STRATEGY`.
- `csv/khfmsynthneeded.csv:12` — `Frost Shard.STRATEGY`.
- `csv/khfmsynthneeded.csv:15` — `Gale.STRATEGY`.
- `csv/khfmsynthneeded.csv:17` — `Lucid Crystal.STRATEGY`.
- `csv/khfmsynthneeded.csv:18` — `Lucid Gem.STRATEGY`.
- `csv/khfmsynthneeded.csv:19` — `Lucid Shard.STRATEGY`.
- `csv/khfmsynthneeded.csv:21` — `Mythril.STRATEGY`.
- `csv/khfmsynthneeded.csv:22` — `Mythril shard.STRATEGY`.
- `csv/khfmsynthneeded.csv:24` — `Orichalcum.STRATEGY`.
- `csv/khfmsynthneeded.csv:25` — `Power Crystal.STRATEGY`.
- `csv/khfmsynthneeded.csv:26` — `Power Gem.STRATEGY`.
- `csv/khfmsynthneeded.csv:27` — `Power Shard.STRATEGY`.
- `csv/khfmsynthneeded.csv:30` — `Shiny Crystal.STRATEGY`.
- `csv/khfmsynthneeded.csv:31` — `Spirit Gem.STRATEGY`.
- `csv/khfmsynthneeded.csv:32` — `Spirit Shard.STRATEGY`.
- `csv/khfmsynthneeded.csv:33` — `Stormy Stone.STRATEGY`.
- `csv/khfmsynthneeded.csv:34` — `Thunder Gem.STRATEGY`.
- `csv/khfmsynthneeded.csv:35` — `Thunder Shard.STRATEGY`.

Initial uncertain container set (all 24; no surviving unresolved-container status):

- `100 Acre Wood/Treasures/9` — refined to source-backed; see importer refinements.
- `100 Acre Wood/Treasures/10` — refined to source-backed; see importer refinements.
- `Agrabah/Treasures/2` — refined to source-backed; see importer refinements.
- `Agrabah/Treasures/6` — refined to source-backed; see importer refinements.
- `Agrabah/Treasures/11` — refined to source-backed; see importer refinements.
- `Agrabah/Treasures/12` — refined to source-backed; see importer refinements.
- `Agrabah/Treasures/17` — refined to source-backed; see importer refinements.
- `Agrabah/Treasures/22` — refined to source-backed; see importer refinements.
- `Agrabah/Treasures/23` — refined to source-backed; see importer refinements.
- `Atlantica/Treasures/4` — refined to source-backed; see importer refinements.
- `Atlantica/Treasures/11` — refined to source-backed; see importer refinements.
- `Atlantica/Treasures/12` — refined to source-backed; see importer refinements.
- `Atlantica/Treasures/13` — refined to source-backed; see importer refinements.
- `End of the World/Treasures/14` — refined to source-backed; see importer refinements.
- `Halloween Town/Treasures/4` — refined to source-backed; see importer refinements.
- `Halloween Town/Treasures/15` — refined to source-backed; see importer refinements.
- `Halloween Town/Treasures/16` — refined to source-backed; see importer refinements.
- `Halloween Town/Treasures/17` — rejected duplicate; existing Trinity chest represents acquisition.
- `Hollow Bastion/Treasures/5` — refined to source-backed; see importer refinements.
- `Hollow Bastion/Treasures/11` — refined to source-backed; see importer refinements.
- `Hollow Bastion/Treasures/12` — refined to source-backed; see importer refinements.
- `Hollow Bastion/Treasures/16` — refined to source-backed; see importer refinements.
- `Hollow Bastion/Treasures/17` — refined to source-backed; see importer refinements.
- `Wonderland/Treasures/7` — refined to source-backed; see importer refinements.

The 87 empty notes cells in the captured world tables are source-table omissions rather than blank production directions: all current collection entries have instructions and no empty scalar fields. Their exact JSON paths follow so the snapshot omissions remain auditable without treating them as unresolved game facts. Later routes/refinements and the source ledger identify their canonical disposition.

- `tools/content/import-collectibles.sources.json:9` → `worldTables['Agrabah'].Treasures[0][2]` (source-row `Agrabah/Treasures/0`).
- `tools/content/import-collectibles.sources.json:14` → `worldTables['Agrabah'].Treasures[1][2]` (source-row `Agrabah/Treasures/1`).
- `tools/content/import-collectibles.sources.json:19` → `worldTables['Agrabah'].Treasures[2][2]` (source-row `Agrabah/Treasures/2`).
- `tools/content/import-collectibles.sources.json:24` → `worldTables['Agrabah'].Treasures[3][2]` (source-row `Agrabah/Treasures/3`).
- `tools/content/import-collectibles.sources.json:34` → `worldTables['Agrabah'].Treasures[5][2]` (source-row `Agrabah/Treasures/5`).
- `tools/content/import-collectibles.sources.json:39` → `worldTables['Agrabah'].Treasures[6][2]` (source-row `Agrabah/Treasures/6`).
- `tools/content/import-collectibles.sources.json:49` → `worldTables['Agrabah'].Treasures[8][2]` (source-row `Agrabah/Treasures/8`).
- `tools/content/import-collectibles.sources.json:54` → `worldTables['Agrabah'].Treasures[9][2]` (source-row `Agrabah/Treasures/9`).
- `tools/content/import-collectibles.sources.json:59` → `worldTables['Agrabah'].Treasures[10][2]` (source-row `Agrabah/Treasures/10`).
- `tools/content/import-collectibles.sources.json:64` → `worldTables['Agrabah'].Treasures[11][2]` (source-row `Agrabah/Treasures/11`).
- `tools/content/import-collectibles.sources.json:69` → `worldTables['Agrabah'].Treasures[12][2]` (source-row `Agrabah/Treasures/12`).
- `tools/content/import-collectibles.sources.json:79` → `worldTables['Agrabah'].Treasures[14][2]` (source-row `Agrabah/Treasures/14`).
- `tools/content/import-collectibles.sources.json:94` → `worldTables['Agrabah'].Treasures[17][2]` (source-row `Agrabah/Treasures/17`).
- `tools/content/import-collectibles.sources.json:109` → `worldTables['Agrabah'].Treasures[20][2]` (source-row `Agrabah/Treasures/20`).
- `tools/content/import-collectibles.sources.json:114` → `worldTables['Agrabah'].Treasures[21][2]` (source-row `Agrabah/Treasures/21`).
- `tools/content/import-collectibles.sources.json:119` → `worldTables['Agrabah'].Treasures[22][2]` (source-row `Agrabah/Treasures/22`).
- `tools/content/import-collectibles.sources.json:129` → `worldTables['Agrabah'].Treasures[24][2]` (source-row `Agrabah/Treasures/24`).
- `tools/content/import-collectibles.sources.json:134` → `worldTables['Agrabah'].Treasures[25][2]` (source-row `Agrabah/Treasures/25`).
- `tools/content/import-collectibles.sources.json:184` → `worldTables['Agrabah'].Treasures[35][2]` (source-row `Agrabah/Treasures/35`).
- `tools/content/import-collectibles.sources.json:313` → `worldTables['Atlantica'].Treasures[9][2]` (source-row `Atlantica/Treasures/9`).
- `tools/content/import-collectibles.sources.json:348` → `worldTables['Atlantica'].Treasures[16][2]` (source-row `Atlantica/Treasures/16`).
- `tools/content/import-collectibles.sources.json:353` → `worldTables['Atlantica'].Treasures[17][2]` (source-row `Atlantica/Treasures/17`).
- `tools/content/import-collectibles.sources.json:358` → `worldTables['Atlantica'].Treasures[18][2]` (source-row `Atlantica/Treasures/18`).
- `tools/content/import-collectibles.sources.json:363` → `worldTables['Atlantica'].Treasures[19][2]` (source-row `Atlantica/Treasures/19`).
- `tools/content/import-collectibles.sources.json:368` → `worldTables['Atlantica'].Treasures[20][2]` (source-row `Atlantica/Treasures/20`).
- `tools/content/import-collectibles.sources.json:373` → `worldTables['Atlantica'].Treasures[21][2]` (source-row `Atlantica/Treasures/21`).
- `tools/content/import-collectibles.sources.json:378` → `worldTables['Atlantica'].Treasures[22][2]` (source-row `Atlantica/Treasures/22`).
- `tools/content/import-collectibles.sources.json:700` → `worldTables['Monstro'].Treasures[7][2]` (source-row `Monstro/Treasures/7`).
- `tools/content/import-collectibles.sources.json:705` → `worldTables['Monstro'].Treasures[8][2]` (source-row `Monstro/Treasures/8`).
- `tools/content/import-collectibles.sources.json:710` → `worldTables['Monstro'].Treasures[9][2]` (source-row `Monstro/Treasures/9`).
- `tools/content/import-collectibles.sources.json:730` → `worldTables['Monstro'].Treasures[13][2]` (source-row `Monstro/Treasures/13`).
- `tools/content/import-collectibles.sources.json:735` → `worldTables['Monstro'].Treasures[14][2]` (source-row `Monstro/Treasures/14`).
- `tools/content/import-collectibles.sources.json:740` → `worldTables['Monstro'].Treasures[15][2]` (source-row `Monstro/Treasures/15`).
- `tools/content/import-collectibles.sources.json:755` → `worldTables['Monstro'].Treasures[18][2]` (source-row `Monstro/Treasures/18`).
- `tools/content/import-collectibles.sources.json:760` → `worldTables['Monstro'].Treasures[19][2]` (source-row `Monstro/Treasures/19`).
- `tools/content/import-collectibles.sources.json:765` → `worldTables['Monstro'].Treasures[20][2]` (source-row `Monstro/Treasures/20`).
- `tools/content/import-collectibles.sources.json:770` → `worldTables['Monstro'].Treasures[21][2]` (source-row `Monstro/Treasures/21`).
- `tools/content/import-collectibles.sources.json:833` → `worldTables['100 Acre Wood'].Treasures[0][2]` (source-row `100 Acre Wood/Treasures/0`).
- `tools/content/import-collectibles.sources.json:853` → `worldTables['100 Acre Wood'].Treasures[4][2]` (source-row `100 Acre Wood/Treasures/4`).
- `tools/content/import-collectibles.sources.json:858` → `worldTables['100 Acre Wood'].Treasures[5][2]` (source-row `100 Acre Wood/Treasures/5`).
- `tools/content/import-collectibles.sources.json:1182` → `worldTables['End of the World'].Treasures[0][2]` (source-row `End of the World/Treasures/0`).
- `tools/content/import-collectibles.sources.json:1192` → `worldTables['End of the World'].Treasures[2][2]` (source-row `End of the World/Treasures/2`).
- `tools/content/import-collectibles.sources.json:1202` → `worldTables['End of the World'].Treasures[4][2]` (source-row `End of the World/Treasures/4`).
- `tools/content/import-collectibles.sources.json:1207` → `worldTables['End of the World'].Treasures[5][2]` (source-row `End of the World/Treasures/5`).
- `tools/content/import-collectibles.sources.json:1217` → `worldTables['End of the World'].Treasures[7][2]` (source-row `End of the World/Treasures/7`).
- `tools/content/import-collectibles.sources.json:1232` → `worldTables['End of the World'].Treasures[10][2]` (source-row `End of the World/Treasures/10`).
- `tools/content/import-collectibles.sources.json:1237` → `worldTables['End of the World'].Treasures[11][2]` (source-row `End of the World/Treasures/11`).
- `tools/content/import-collectibles.sources.json:1242` → `worldTables['End of the World'].Treasures[12][2]` (source-row `End of the World/Treasures/12`).
- `tools/content/import-collectibles.sources.json:1247` → `worldTables['End of the World'].Treasures[13][2]` (source-row `End of the World/Treasures/13`).
- `tools/content/import-collectibles.sources.json:1252` → `worldTables['End of the World'].Treasures[14][2]` (source-row `End of the World/Treasures/14`).
- `tools/content/import-collectibles.sources.json:1307` → `worldTables['End of the World'].Treasures[25][2]` (source-row `End of the World/Treasures/25`).
- `tools/content/import-collectibles.sources.json:1353` → `worldTables['Traverse Town'].Treasures[6][2]` (source-row `Traverse Town/Treasures/6`).
- `tools/content/import-collectibles.sources.json:1388` → `worldTables['Traverse Town'].Treasures[13][2]` (source-row `Traverse Town/Treasures/13`).
- `tools/content/import-collectibles.sources.json:1393` → `worldTables['Traverse Town'].Treasures[14][2]` (source-row `Traverse Town/Treasures/14`).
- `tools/content/import-collectibles.sources.json:1453` → `worldTables['Traverse Town'].Treasures[26][2]` (source-row `Traverse Town/Treasures/26`).
- `tools/content/import-collectibles.sources.json:1458` → `worldTables['Traverse Town'].Treasures[27][2]` (source-row `Traverse Town/Treasures/27`).
- `tools/content/import-collectibles.sources.json:1468` → `worldTables['Traverse Town'].Treasures[29][2]` (source-row `Traverse Town/Treasures/29`).
- `tools/content/import-collectibles.sources.json:1781` → `worldTables['Hollow Bastion'].Treasures[0][2]` (source-row `Hollow Bastion/Treasures/0`).
- `tools/content/import-collectibles.sources.json:1786` → `worldTables['Hollow Bastion'].Treasures[1][2]` (source-row `Hollow Bastion/Treasures/1`).
- `tools/content/import-collectibles.sources.json:1791` → `worldTables['Hollow Bastion'].Treasures[2][2]` (source-row `Hollow Bastion/Treasures/2`).
- `tools/content/import-collectibles.sources.json:1796` → `worldTables['Hollow Bastion'].Treasures[3][2]` (source-row `Hollow Bastion/Treasures/3`).
- `tools/content/import-collectibles.sources.json:1821` → `worldTables['Hollow Bastion'].Treasures[8][2]` (source-row `Hollow Bastion/Treasures/8`).
- `tools/content/import-collectibles.sources.json:1826` → `worldTables['Hollow Bastion'].Treasures[9][2]` (source-row `Hollow Bastion/Treasures/9`).
- `tools/content/import-collectibles.sources.json:1831` → `worldTables['Hollow Bastion'].Treasures[10][2]` (source-row `Hollow Bastion/Treasures/10`).
- `tools/content/import-collectibles.sources.json:1836` → `worldTables['Hollow Bastion'].Treasures[11][2]` (source-row `Hollow Bastion/Treasures/11`).
- `tools/content/import-collectibles.sources.json:1841` → `worldTables['Hollow Bastion'].Treasures[12][2]` (source-row `Hollow Bastion/Treasures/12`).
- `tools/content/import-collectibles.sources.json:1846` → `worldTables['Hollow Bastion'].Treasures[13][2]` (source-row `Hollow Bastion/Treasures/13`).
- `tools/content/import-collectibles.sources.json:1856` → `worldTables['Hollow Bastion'].Treasures[15][2]` (source-row `Hollow Bastion/Treasures/15`).
- `tools/content/import-collectibles.sources.json:1861` → `worldTables['Hollow Bastion'].Treasures[16][2]` (source-row `Hollow Bastion/Treasures/16`).
- `tools/content/import-collectibles.sources.json:1866` → `worldTables['Hollow Bastion'].Treasures[17][2]` (source-row `Hollow Bastion/Treasures/17`).
- `tools/content/import-collectibles.sources.json:1996` → `worldTables['Hollow Bastion'].Treasures[43][2]` (source-row `Hollow Bastion/Treasures/43`).
- `tools/content/import-collectibles.sources.json:2001` → `worldTables['Hollow Bastion'].Treasures[44][2]` (source-row `Hollow Bastion/Treasures/44`).
- `tools/content/import-collectibles.sources.json:2026` → `worldTables['Hollow Bastion'].Treasures[49][2]` (source-row `Hollow Bastion/Treasures/49`).
- `tools/content/import-collectibles.sources.json:2031` → `worldTables['Hollow Bastion'].Treasures[50][2]` (source-row `Hollow Bastion/Treasures/50`).
- `tools/content/import-collectibles.sources.json:2036` → `worldTables['Hollow Bastion'].Treasures[51][2]` (source-row `Hollow Bastion/Treasures/51`).
- `tools/content/import-collectibles.sources.json:2164` → `worldTables['Deep Jungle'].Treasures[7][2]` (source-row `Deep Jungle/Treasures/7`).
- `tools/content/import-collectibles.sources.json:2169` → `worldTables['Deep Jungle'].Treasures[8][2]` (source-row `Deep Jungle/Treasures/8`).
- `tools/content/import-collectibles.sources.json:2229` → `worldTables['Deep Jungle'].Treasures[20][2]` (source-row `Deep Jungle/Treasures/20`).
- `tools/content/import-collectibles.sources.json:2421` → `worldTables['Neverland'].Treasures[6][2]` (source-row `Neverland/Treasures/6`).
- `tools/content/import-collectibles.sources.json:2426` → `worldTables['Neverland'].Treasures[7][2]` (source-row `Neverland/Treasures/7`).
- `tools/content/import-collectibles.sources.json:2431` → `worldTables['Neverland'].Treasures[8][2]` (source-row `Neverland/Treasures/8`).
- `tools/content/import-collectibles.sources.json:2446` → `worldTables['Neverland'].Treasures[11][2]` (source-row `Neverland/Treasures/11`).
- `tools/content/import-collectibles.sources.json:2647` → `worldTables['Halloween Town'].Treasures[17][2]` (source-row `Halloween Town/Treasures/17`).
- `tools/content/import-collectibles.sources.json:2652` → `worldTables['Halloween Town'].Treasures[18][2]` (source-row `Halloween Town/Treasures/18`).
- `tools/content/import-collectibles.sources.json:2657` → `worldTables['Halloween Town'].Treasures[19][2]` (source-row `Halloween Town/Treasures/19`).
- `tools/content/import-collectibles.sources.json:2662` → `worldTables['Halloween Town'].Treasures[20][2]` (source-row `Halloween Town/Treasures/20`).
- `tools/content/import-collectibles.sources.json:2667` → `worldTables['Halloween Town'].Treasures[21][2]` (source-row `Halloween Town/Treasures/21`).

## Appendix D — Scope exclusions and verification limits

- Source-backed facts are not “unverified” merely because no one played them in-game. Current-source contradictions, genuinely absent fields and incomplete guide facts were audited separately from historical hands-on labels.
- The production `complete:true` values generally certify the declared roster, not every possible metric. `reference-coverage` still explicitly disclaims every-room spawn coverage and party stat gains; missing parts/item catalogs are evidenced by explicit requirements and absent subtypes, not by guessing missing counts.
- Narrative Chronicles/Characters updates, full Report text, original-KH/PS2 compatibility, exhaustive bestiary biography flags, live save/Steam state detection, native UI art/fonts and actual hardware acceptance are not silently added as research gates.
- Runtime tests and generated data checks are evidence of internal consistency. Their successful counts do not independently prove the Three Stars value, portal timing, source-table truth or an absent catalog's completeness.
- No externally verified new mechanics or rates have been supplied in this audit. Existing repository source URLs are leads for the next factfinding pass. Resolve P1 contradictions and absent requested catalogs first, then precise acquisition routes and P2 edge conditions; P3 detail/provenance should not invalidate usable source-backed guidance.
