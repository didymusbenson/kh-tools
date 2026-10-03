# Kingdom Hearts 0.2 research audit

**Practical review — 2026-10-02:** six residual families have deferred precision; KH02-012 stays open for Treasure Hunter on NG+ with retained Zodiac chests. The northern thicket locator and objective31 post-clear recovery route are now explicitly sourced. Evidence stays 11 resolved, 6 partial and 1 factually blocked. Deferral does not resolve a disputed fact. [Current per-family decisions](practical-review-2026-10-02.md) supersede older active-research/release-gate wording below; UI/device acceptance and other app work remain separate.

**Current continuation:** 10 resolved, 7 partial, 1 blocked; see [every residual outcome](research-continuation-2026-10-01.md). The historical findings below are preserved.

**Historical baseline at f933ab1.** Findings and occurrence appendices below describe the pre-remediation snapshot, not active statuses. The [2026-10-01 disposition ledger](audit-dispositions.md) and machine-readable `audit-dispositions.json` cover every ID with changes, consulted URLs and exact residual blockers.

Audit date: 2026-10-01. Repository baseline: `f933ab1`; audit branch: `research/audit-2026-10-01`. Scope is the separate Aqua-only **0.2 Birth by Sleep — A fragmentary passage** game, with the modern Steam version as baseline. It is not BBS's Secret Episode; 2.8 is collection metadata. This audit uses existing checked-in evidence only and conducts no new external answer research.

## Historical baseline method, coverage and counts

Read the entire dedicated game pack, standalone specification, readiness, rollout, generator, generated TypeScript catalog and guide/config; inspected shared schema, source/Drive and parallel-research records, related BBS-family boundaries, shared rollout and applicable tests. Searched tracked Markdown/JSON/TypeScript/Python/CSV for game names and uncertainty terms, and then checked surrounding data shapes, omission of fields/citations, inventory joins and later implementation evidence. No independent tracked 0.2 JSON/CSV factual dataset exists; the canonical inputs are the three researched Markdown inventories. No external sources were retrieved, no game was played and no functional tests were executed in this audit.

The baseline catalog contains **175 entries**: **55 physical finds** (41 treasures = 29 ordinary + 12 Zodiac, 7 gems, 3 flowers, 4 memories), **51 objectives**, **51 wardrobe rewards**, **15 achievements** and **3 reference records**. Zodiac is an alias facet of 12 existing chest records; objective 42 also aliases the challenge view. World physical totals are 11/21/16/7. There is no missing-count basis for inventing additional collectibles. Contents, exact directions, conditions and retention must be assessed separately.

**18 deduplicated findings:** 16 open factual/research questions (KH02-001–016), 1 provenance/integration finding (KH02-017), and 1 researched-but-unintegrated context finding (KH02-018). These supersede a simplistic reading that all historical KH02-R01–R13 remain equally unresolved. The closed-reflection answer and canonical name/reward aliases have corroborated working resolutions; they appear in the historical ledger, not as new unresolved questions. A sourced fact's lack of in-game testing is not itself a data defect.

## Historical baseline findings

### Baseline KH02-001 — Master of Lightning: 30 or 50 final blows

**Open, disputed; old KH02-R01.** What is the actual Steam/localized objective 13 kill threshold? KHWiki/GameSkinny say 30; PSU/Guiding Key say 50. Affects `kh02:objective:13` and `kh02:wardrobe:mystic-pauldron`, especially `summary`, `instructions`, `uncertainty`. “30 or 50; unresolved” (`ai_docs/games/kh02/objectives-and-wardrobe.md:23`, `:89`); `ai_docs/games/kh02/sources-and-gaps.md:65`; generator `src/games/kh02/generate.py:63`, `:69`. The runtime correctly retains both numbers and does not certify one. Lead: current-version objective text/counter documentation, preserving version/locale differences if established. Exact runtime occurrences are enumerated in Appendix A.

### Baseline KH02-002 — Ice Breaker simultaneity

**Open, disputed; old KH02-R02.** Must all five frozen enemies shatter at once, or are cumulative five freezes/five shatters sufficient? Affects `kh02:objective:15`, `kh02:wardrobe:grace-purple`. “simultaneous rule needs validation” (`ai_docs/games/kh02/objectives-and-wardrobe.md:25`, `:90`); `ai_docs/games/kh02/sources-and-gaps.md:66`; `src/games/kh02/generate.py:63`, `:69`. Grouping is a strategy, not proof of the predicate. Lead: objective/counter documentary evidence or a sufficiently explicit independent mechanics source.

### Baseline KH02-003 — Frozen Rail Ride and Dark Explorer completion conditions

**Open; old KH02-R06.** What reproducible route/condition completes objective 14 and the movement achievement, and do either have a documented hidden distance? Affects `kh02:objective:14`, `kh02:wardrobe:flawless-arm-guards`, `kh02:achievement:dark-explorer`. “numeric distance unverified” (`ai_docs/games/kh02/objectives-and-wardrobe.md:24`, `:94`); `ai_docs/games/kh02/replay-challenges-achievements.md:71`; `ai_docs/games/kh02/sources-and-gaps.md:70`; runtime construction `src/games/kh02/generate.py:63`, `:69`, `:73`. A verified reproducible route can close the useful guidance gap without reverse-engineering an exact number. Do not invent one.

### Baseline KH02-004 — Pillar-labyrinth Potion/Hi-Potion crosswalk

**Open; part of old KH02-R07.** Which of two known inversion routes contains Potion versus Hi-Potion? Affects `kh02:ww-pillar-potion` and `kh02:ww-pillar-hi-potion`, `reward`/`summary`/`instructions` and durable location identity. Both routes are documented: beside first struck pillar after inversion, and near exit after second inversion. “does not resolve which inversion holds which” (`ai_docs/games/kh02/collectibles.md:36–37`, `:59`, `:123`); `ai_docs/games/kh02/sources-and-gaps.md:71`; `src/games/kh02/generate.py:19`. Existing IDs have already entered runtime despite the planning warning against freezing them; a future correction needs migration-safe identity handling. Lead: PSU route guide joined to KHWiki item table, independently corroborated per physical chest.

### Baseline KH02-005 — Remaining ordinary-chest route/content precision

**Open; rest of old KH02-R07 and unnumbered route queue.** What exact starting save point/landmark, movement requirement and item-to-route mapping applies to unresolved ordinary chests? Explicit cases are `kh02:ct-lower-ether` (lower crystal route-to-content), `kh02:ft-start-ledge-potion` (which save point), and an unspecified subset of the ten Forest chests whose guide order was not joined to contents. Because the research never identifies that subset, all ten Forest rows must remain in the review set; that does not prove all ten directions are wrong. IDs: `ft-map`, `ft-start-ledge-potion`, `ft-north-potion`, `ft-ring-potion`, `ft-gap-hi-potion`, `ft-left-hi-potion`, `ft-spiral-mega-potion`, `ft-ring-mega-potion`, `ft-save-ether`, `ft-steps-ether`, all prefixed `kh02:`.

Evidence: “Exact route-to-content cross-check pending” (`ai_docs/games/kh02/collectibles.md:34`), “Exact save-point label needs validation” (`:44`), Forest join warning (`:59`), general precision/access queue (`:123`); `ai_docs/games/kh02/sources-and-gaps.md:47`, `:71`; `src/games/kh02/generate.py:18–20`. The generator flags only literal “pending” or “validation” rows, so it does not carry the broader Forest warning to every potentially affected runtime row. Lead: C/L/F/D/W sources defined at `ai_docs/games/kh02/collectibles.md:25`, paired to physical landmarks, not ordinal row positions. Appendix A enumerates all 29 ordinary rows and the remaining physical guidance coverage.

### Baseline KH02-006 — Pisces staircase approach

**Open, disputed; old KH02-R08.** Is Pisces behind Aqua at initial staircase arrival or at the end, and under which staircase state? Affects `kh02:ww-pisces`, `summary`/`uncertainty`. “KHWiki says the end … PSU specifies behind the initial arrival” (`ai_docs/games/kh02/collectibles.md:75`, `:80`); `ai_docs/games/kh02/sources-and-gaps.md:72`; `src/games/kh02/generate.py:23`. Runtime preserves the conflict; the existing initial-arrival instruction is a working lead. Resolve by documentary route/state evidence; the older “visually checked” wording is not a mandate for the user to play the game.

### Baseline KH02-007 — Flower color-to-route mapping and subarea precision

**Open; part of old KH02-R09.** Which route corresponds to green/blue/red, especially the two Rocky Path flowers? Affects `kh02:ft-flower-01`, `kh02:ft-flower-02`, `kh02:ft-flower-03`, names/labels and area/route fields. “assigning the latter two colors … remains unverified” (`ai_docs/games/kh02/collectibles.md:100`, routes `:104–108`); `ai_docs/games/kh02/sources-and-gaps.md:53`, `:73`; `src/games/kh02/generate.py:27`. Runtime intentionally avoids all color assignments. Save-point returnability is explicitly sourced, so do not recategorize it as unknown merely because color is unknown. Lead: GameSkinny flower guide plus exact color/route evidence.

### Baseline KH02-008 — Castle Town memory building

**Open; part of old KH02-R09.** Which rooftop/awning/building around the plaza contains the blue slipper, and how is it reached? Affects `kh02:ct-memory`, objective 38/Pulse Blades as linked goals. “Exact building needs validation” (`ai_docs/games/kh02/collectibles.md:116`); `ai_docs/games/kh02/sources-and-gaps.md:73`; `src/games/kh02/generate.py:30`. Lead: PSU memories and Guiding Key location supplement, with an exact landmark crosswalk. The post-clear prerequisite is already supported.

### Baseline KH02-009 — Forest memory object label

**Open, disputed label; part of old KH02-R09.** Is the orange memory's correct visual/localized label spinning wheel or sewing machine? Affects `kh02:ft-memory.name`/`summary`/`uncertainty`, objective 45/Pulse Antennae lookup. Location beneath the optional third Rocky Path Darkside is documented; label uncertainty does not make the whole route absent. `ai_docs/games/kh02/collectibles.md:118`; `ai_docs/games/kh02/sources-and-gaps.md:73`; `src/games/kh02/generate.py:31`. Lead: corroborating image/object identity or localized game/reference wording.

### Baseline KH02-010 — Per-asset cleared-save recovery and NG+ retention

**Open; old KH02-R10 plus replay table.** Can the mines be re-entered, are partial gem pickups retained, and what ordinary-chest/memory/flower/counter state resets or carries through clear-data continuation and seeded NG+? What precisely carries for objective completion, wardrobe and level, including NG+ starting level? Zodiac retention/open-chest behavior is explicitly sourced and is not an open subquestion. Flower save-point return is sourced; its NG+ state is not exhaustively specified.

Affected IDs: all 29 ordinary chests, seven `kh02:ww-gem-01` through `-07`, three flower records, four memories, all objective/wardrobe state and `kh02:reference:replay`; Appendix A enumerates every identity. Evidence: `ai_docs/games/kh02/collectibles.md:96`, `:108`, `:123`; `ai_docs/games/kh02/replay-challenges-achievements.md:12–16`, `:19–21`; `ai_docs/games/kh02/sources-and-gaps.md:74`; `src/games/kh02/generate.py:25`, `:75`; `src/games/kh02.ts:21–22`. The inaccessible TrueAchievements snippet cannot prove permanent missability. Lead: cleared-save travel and seeded NG+ documentary evidence, one asset/state type at a time. Manual app checks do not read game-save state.

### Baseline KH02-011 — Counter retroactivity, encounter replay and exact combat predicates

**Open, partly researched; old KH02-R11.** Do pre-unlock events count, what resets a streak/counter, and which story encounter or replay satisfies each objective? Prior research singles out objectives **18, 26, 31, 36, 41, 47, 50** and late unlocks; objective **46** rail revisiting is separately sourced. Keep the known distinctions: #18 six consecutive Excellent prompts spanning attacks with 28 locks; #36 Castle Town Spellweaver final blow; #41 third story Phantom, not Zodiac; #47 orb-supporting story Darkside; #50 Wayfinder active at victory, not an invented Finish requirement. The remaining question is independent exact-predicate/replay/retroactivity confirmation, particularly #26's three combat rooms and #31's “during Phantom Aqua” versus final-blow scope, not wholesale absence of guidance.

Evidence: `ai_docs/games/kh02/sources-and-gaps.md:75`; `ai_docs/games/kh02/objectives-and-wardrobe.md:28`, `:36`, `:41`, `:46`, `:51`, `:56–60`, `:78–83`; `ai_docs/games/kh02/replay-challenges-achievements.md:12`, `:16`, `:19`; `src/games/kh02/generate.py:40`, `:48–54`, `:62`. Affected objective IDs and their wardrobe rewards are fully listed in Appendix A. Lead: C01/C05/C09/C10 and edition-specific encounter/replay evidence. Do not reclassify the researched #51 Critical requirement as uncertain.

### Baseline KH02-012 — Treasure Hunter exact chest trigger

**Open.** Does Steam Treasure Hunter require exactly the 41 researched chests, including Zodiac and Main Road, and how is completion evaluated across continued/NG+ saves? Affects `kh02:achievement:treasure-hunter.instructions` and shared chest predicates. “verify its exact runtime trigger” (`ai_docs/games/kh02/replay-challenges-achievements.md:69`; `src/games/kh02/generate.py:73`). The 41-record app census is established independently from that trigger. The four chest objective counts 9/13/12/6 exclude Main Road from Castle Town's nine; those already reconcile to 41 including Main Road (`ai_docs/games/kh02/collectibles.md:17`). Lead: official requirement plus explicit trigger/carry evidence.

### Baseline KH02-013 — A Magical Finale exact command set and accumulation

**Open.** Which magic Situation Commands are required, what unlocks each, and do executions accumulate across reloads/runs? Affects `kh02:achievement:a-magical-finale.instructions` and combat reference. “Research the exact magic Situation Command set and acquisition triggers” (`ai_docs/games/kh02/replay-challenges-achievements.md:71`; `src/games/kh02/generate.py:73`). The runtime repeats that the set/cross-run rules are not normalized; no complete member list exists in checked-in research. Lead: Situation Command/magic mechanics and achievement-specific evidence. This is distinct from Dark Explorer's unknown distance and Undefeated's run condition.

### Baseline KH02-014 — Combat-tool acquisition timing and difficulty reference

**Open; old KH02-R13.** What exact 0.2-specific restoration/acquisition timing, command/movement controls and version-aware mechanics are needed for magic, Doubleflight/Air Slide, Prism Rain, Spellweaver and Wayfinder? A single `kh02:reference:combat` paragraph plus objective availability phrases is not a complete searchable mechanics pack. `ai_docs/games/kh02/sources-and-gaps.md:77`; `ai_docs/readiness/kingdom-hearts-02.md:33`; `ai_docs/games/kingdom-hearts-02.md:20`; `src/games/kh02/generate.py:77`. Difficulty multipliers/survival exceptions are already documented (`ai_docs/games/kh02/replay-challenges-achievements.md:41`), so do not say they are unresearched; current-version applicability and complete mechanics/strategy fixtures remain to be reconciled. Lead: C06/C08/C09/C10 and exact acquisition/controls sources. No BBS melding or KH3 Critical mechanics should be imported.

### Baseline KH02-015 — Enhanced Phantom strategy and numeric stats

**Open, source limitation.** Which numeric stats and difficulty-specific strategy facts can be supported beyond the incomplete gameplay page? Affects `kh02:objective:42` / challenge view and `kh02:wardrobe:tiara`, prospective boss-reference fields. “stats/strategy sections … needing improvement” (`ai_docs/games/kh02/replay-challenges-achievements.md:37`; `ai_docs/games/kh02/sources-and-gaps.md:39`). Five-round roster, Zodiac unlock, reset-on-exit and red-aura evasion are already documented/integrated (`src/games/kh02/generate.py:50`). There is no justified new no-damage requirement for the challenge. Lead: independent reliable boss/difficulty reference; certify only fields supported by evidence, not the page wholesale.

### Baseline KH02-016 — Platform mappings, identifiers and edition-specific behavior

**Open, scoped.** What are the native Steam/PSN/Xbox IDs and applicable tiers, Epic achievement availability, other-platform equivalents, and version-specific save/content differences? All 15 Steam names/visible conditions have primary support; five hidden story descriptions have secondary corroboration and are not wholly absent. Xbox scores are leads summing to 1,000, not API verification. `ai_docs/games/kh02/replay-challenges-achievements.md:47`, `:67`; `ai_docs/games/kh02/sources-and-gaps.md:25`, `:41`, `:76`; `ai_docs/games/kingdom-hearts-02.md:53–59`. All 15 `achievements` records lack native IDs because no IDs are invented (`src/games/kh02/generate.py:72`). Future 2026-10-08 versions are follow-up only. Official Japanese/international save incompatibility and collection composition are already sourced; do not confuse unknown parity with an assertion that current Steam facts are wrong.

### Baseline KH02-017 — Per-record source/caveat propagation omissions

**Provenance and integration.** Which runtime facts lost the citations or qualifications that support them? Ordinary chest generation ignores the table's Evidence column and assigns KHWiki alone (`src/games/kh02/generate.py:18`), dropping Guiding Key/PSU route citations from 19 multi-source rows. All 12 Zodiac rows omit the PSU supplement (`:22`). Objectives use only Wardrobe + general PSU (`:58`), omitting targeted Shotlock/summit/mirror/boss sources and the conflicting GameSkinny/Guiding Key sides; wardrobe generation carries only Wardrobe (`:67`). `kh02:objective:42` thus contains five-round strategy without its specific five-round source URL. The general Forest crosswalk warning is omitted except where the literal row text contains “pending” or “validation” (`:20`). Four memories lack explicit `area` even where subarea is known (`:29`).

Canonical provenance is in `ai_docs/games/kh02/collectibles.md:25`, `:63`, `:84`, `:100`, `:112`; `ai_docs/games/kh02/objectives-and-wardrobe.md:7`, `:78–83`, `:89–93`; `ai_docs/games/kh02/sources-and-gaps.md:35–57`. `src/games/types.ts:1–20` has no per-fact edition/confidence field. This is not a request to rediscover already researched routes, nor evidence that every field is false. Appendix A lists every runtime record; Appendix B identifies exact multi-source input rows and caveat occurrences.

### Baseline KH02-018 — Researched context and aliases not fully represented

**Researched but unintegrated.** The complete difficulty comparison (`ai_docs/games/kh02/replay-challenges-achievements.md:41`) is absent from the three reference records. Canonical “Defeat the Darksides” is present for objective 32 but the known “Defeat the Darkness” search alias is not stored; the schema has no aliases. Objective 08 contains Divine Back as an alias in prose, but the Astral Ornament wardrobe record itself omits it (`src/games/kh02/generate.py:64`, `:67`). Detailed encounter restrictions are attached to objective entries, while corresponding wardrobe entries repeat only short conditions and lack those replay qualifications (`:62`, `:67–69`). Evidence already exists; integrate context/linkage rather than promoting these as wholly unresearched game facts. Exact alias resolution history follows below.

## Historical and resolved caveat ledger

- **H01 — Mirror reflection, old KH02-R03:** working **closed** answer is corroborated by PSU/GameSkinny and Guiding Key's own location page against its erroneous objective page (`ai_docs/games/kh02/objectives-and-wardrobe.md:80`, `:91`; `ai_docs/games/kh02/sources-and-gaps.md:67`). Runtime `kh02:ww-mirror-mega-ether` and objective 28 use closed (`src/games/kh02/generate.py:44`). Further corroboration can strengthen provenance, but this is not an unresolved equal-weight open/closed conflict.
- **H02 — Objective 32 title, old KH02-R04:** “Defeat the Darksides” follows the game-table source; “Defeat the Darkness” is an older guide error/alias (`ai_docs/games/kh02/objectives-and-wardrobe.md:42`, `:92`; `ai_docs/games/kh02/sources-and-gaps.md:68`). No duplicate objective is warranted. The missing runtime alias is KH02-018.
- **H03 — Objective 08 reward, old KH02-R05:** Astral Ornament is corroborated by Wardrobe/PSU; Divine Back is retained as alias/transliteration lead (`ai_docs/games/kh02/objectives-and-wardrobe.md:18`, `:93`; `ai_docs/games/kh02/sources-and-gaps.md:69`). No evidence supports a second cosmetic. Locale-specific naming confirmation remains a provenance lead, not a reason to discard the working reward join.
- **H04 — Wrong star-puzzle number:** PSU Gem Gatherer mislabels it #31; cross-check and catalog use #30 (`ai_docs/games/kh02/sources-and-gaps.md:45`, `:52`; `ai_docs/games/kh02/objectives-and-wardrobe.md:40`; `src/games/kh02/generate.py:46`). Resolved indexing correction.
- **H05 — No 0.2 data/implementation:** `ai_docs/readiness/kingdom-hearts-02.md:20`, `:45–49`, `ai_docs/games/kingdom-hearts-02.md:3`, `:71`, and research README `:5` describe the earlier state. The September 20 rollout and 175-entry catalog supersede absence claims (`ai_docs/implementation/kh02-rollout.md:9–17`), while advanced state/source/route work remains.
- **H06 — Counts and aliases:** all 55 physical finds, 51 objectives/rewards, 15 achievements and five-round challenge are represented. Zodiac chest duplication, Plain as a 52nd earned reward, #41 targeting the secret Phantom, and Proud satisfying #51 are explicitly prevented by the researched implementation; none is a new missing inventory.
- **H07 — Gameplay source versus play test:** research packs' “candidate/not play-tested” wording is historical evidence status, not a required current-save/manual-playthrough gate (`ai_docs/testing-and-content-validation.md:5–9`, `ai_docs/testing-and-content-validation.md:38`). Do not require the user to reproduce acquisitions.
- **H08 — Initial typecheck/test limitations:** the unrelated missing KH3 module in `ai_docs/implementation/kh02-rollout.md:27` was an integration-time state; `ai_docs/implementation/multi-game-rollout.md:37–41` records later passing build/typecheck/unit/e2e work. Applicable tests now exist. They validate app behavior and IDs, not gameplay thresholds.

## Provenance, access and nonfactual limitations

- **P01 — Bounded legacy absence:** supplied ten-file KHTABLES inventory, earlier repository and delegated BBS ranges contained no 0.2 dataset. This is not proof no private notes exist (`ai_docs/games/kh02/sources-and-gaps.md:9–17`). The BBS researcher, not the original 0.2 author, read those workbook ranges. No legacy migration dataset should be invented.
- **P02 — Inaccessible sources:** full TrueAchievements missability guide and direct platform pages were blocked; guessed PSU Castle Town route failed (`ai_docs/games/kh02/sources-and-gaps.md:59`). Search snippets cannot settle recovery. This audit makes no new access attempt.
- **P03 — Source classes:** publisher/platform pages establish version/release/names; community guides establish most gameplay. Numerical boss cleanup tags create a bounded source issue (KH02-015); community attribution by itself does not invalidate all facts.
- **N01 — Manual flags versus game state:** no objective numeric counter engine, automatic inference, equipped wardrobe, run/difficulty lineage or NG+ migration is implemented (`ai_docs/implementation/kh02-rollout.md:23`). Those are engineering features, separate from the uncertain underlying retention rules. Shared persistence works with manual guide state, not game saves.
- **N02 — Coppermind/Data Jiminy, richer state, visual skin, accessibility and test coverage** are implementation/acceptance concerns. The rollout explicitly did no Data Jiminy work (`ai_docs/implementation/kh02-rollout.md:5`); a missing pack does not make all source-backed answers unresearched. Distinct visual inspiration is the user-owned item (`ai_docs/readiness/kingdom-hearts-02.md:72`).
- **N03 — Only production screenshots/maps are deferred:** image absence is not a location fact and does not defer text guidance (`ai_docs/games/kh02/collectibles.md:123`). Earlier Apple/iPad wording is superseded by desktop Chrome/iPhone 17 in `ai_docs/testing-and-content-validation.md:13`; existing phone emulation is not real-hardware evidence (`ai_docs/implementation/multi-game-rollout.md:39`).
- **N04 — Exclusions:** no invented synthesis/BBS Command Deck, no BBS Secret Episode record reuse, no ordinary story/biography completion gate, no invented all-objectives secret-ending reward (`ai_docs/games/kh02/replay-challenges-achievements.md:71`; standalone spec `:65`). Lack of evidence for such a reward is a scope boundary, not an open promise to add one. Future-version parity and IDs are follow-up, not baseline Steam gates.

## Historical baseline appendix A — Complete runtime identity and field ledger

`src/games/kh02/catalog.ts` is generated from `collectibles.md`, `objectives-and-wardrobe.md`, `replay-challenges-achievements.md` by `generate.py`. Generated copies are not independent sources. Every record is enumerated here, including those without explicit uncertainty, so a category-wide replay/provenance gap cannot hide behind sparse `uncertainty` fields. The ID line anchors the object; listed field lines locate caveat-bearing text. Compiled bundles and assets are excluded because they add no independent facts. No relevant game CSV/independent JSON was found.

- `kh02:ct-main-road` — `src/games/kh02/catalog.ts:5`; treasures; no explicit caveat field.
- `kh02:ct-map` — `src/games/kh02/catalog.ts:19`; treasures; no explicit caveat field.
- `kh02:ct-alley-potion` — `src/games/kh02/catalog.ts:33`; treasures; no explicit caveat field.
- `kh02:ct-rooftop-potion` — `src/games/kh02/catalog.ts:47`; treasures; no explicit caveat field.
- `kh02:ct-house-ether` — `src/games/kh02/catalog.ts:61`; treasures; no explicit caveat field.
- `kh02:ct-lower-ether` — `src/games/kh02/catalog.ts:75`; treasures; caveat lines 87.
- `kh02:ww-map` — `src/games/kh02/catalog.ts:90`; treasures; no explicit caveat field.
- `kh02:ww-pillar-potion` — `src/games/kh02/catalog.ts:104`; treasures; caveat lines 116.
- `kh02:ww-pillar-hi-potion` — `src/games/kh02/catalog.ts:119`; treasures; caveat lines 131.
- `kh02:ww-stairs-hi-potion` — `src/games/kh02/catalog.ts:134`; treasures; no explicit caveat field.
- `kh02:ww-mines-hi-potion` — `src/games/kh02/catalog.ts:148`; treasures; no explicit caveat field.
- `kh02:ww-hub-mega-potion` — `src/games/kh02/catalog.ts:162`; treasures; no explicit caveat field.
- `kh02:ww-mirror-mega-ether` — `src/games/kh02/catalog.ts:176`; treasures; no explicit caveat field.
- `kh02:ww-mines-megalixir` — `src/games/kh02/catalog.ts:190`; treasures; no explicit caveat field.
- `kh02:ft-map` — `src/games/kh02/catalog.ts:204`; treasures; no explicit caveat field.
- `kh02:ft-start-ledge-potion` — `src/games/kh02/catalog.ts:218`; treasures; caveat lines 230.
- `kh02:ft-north-potion` — `src/games/kh02/catalog.ts:233`; treasures; no explicit caveat field.
- `kh02:ft-ring-potion` — `src/games/kh02/catalog.ts:247`; treasures; no explicit caveat field.
- `kh02:ft-gap-hi-potion` — `src/games/kh02/catalog.ts:261`; treasures; no explicit caveat field.
- `kh02:ft-left-hi-potion` — `src/games/kh02/catalog.ts:275`; treasures; no explicit caveat field.
- `kh02:ft-spiral-mega-potion` — `src/games/kh02/catalog.ts:289`; treasures; no explicit caveat field.
- `kh02:ft-ring-mega-potion` — `src/games/kh02/catalog.ts:303`; treasures; no explicit caveat field.
- `kh02:ft-save-ether` — `src/games/kh02/catalog.ts:317`; treasures; no explicit caveat field.
- `kh02:ft-steps-ether` — `src/games/kh02/catalog.ts:331`; treasures; no explicit caveat field.
- `kh02:dd-map` — `src/games/kh02/catalog.ts:345`; treasures; no explicit caveat field.
- `kh02:dd-wide-hi-potion` — `src/games/kh02/catalog.ts:359`; treasures; no explicit caveat field.
- `kh02:dd-low-mega-ether` — `src/games/kh02/catalog.ts:373`; treasures; no explicit caveat field.
- `kh02:dd-before-arena-mega-ether` — `src/games/kh02/catalog.ts:387`; treasures; no explicit caveat field.
- `kh02:dd-end-elixir` — `src/games/kh02/catalog.ts:401`; treasures; no explicit caveat field.
- `kh02:ct-aquarius` — `src/games/kh02/catalog.ts:415`; treasures; no explicit caveat field.
- `kh02:ct-aries` — `src/games/kh02/catalog.ts:434`; treasures; no explicit caveat field.
- `kh02:ct-sagittarius` — `src/games/kh02/catalog.ts:453`; treasures; no explicit caveat field.
- `kh02:ct-virgo` — `src/games/kh02/catalog.ts:472`; treasures; no explicit caveat field.
- `kh02:ww-cancer` — `src/games/kh02/catalog.ts:491`; treasures; no explicit caveat field.
- `kh02:ww-gemini` — `src/games/kh02/catalog.ts:510`; treasures; no explicit caveat field.
- `kh02:ww-leo` — `src/games/kh02/catalog.ts:529`; treasures; no explicit caveat field.
- `kh02:ww-libra` — `src/games/kh02/catalog.ts:548`; treasures; no explicit caveat field.
- `kh02:ww-pisces` — `src/games/kh02/catalog.ts:567`; treasures; caveat lines 584.
- `kh02:ft-taurus` — `src/games/kh02/catalog.ts:587`; treasures; no explicit caveat field.
- `kh02:ft-scorpio` — `src/games/kh02/catalog.ts:606`; treasures; no explicit caveat field.
- `kh02:dd-capricorn` — `src/games/kh02/catalog.ts:625`; treasures; no explicit caveat field.
- `kh02:ww-gem-01` — `src/games/kh02/catalog.ts:644`; gems; caveat lines 652.
- `kh02:ww-gem-02` — `src/games/kh02/catalog.ts:658`; gems; caveat lines 666.
- `kh02:ww-gem-03` — `src/games/kh02/catalog.ts:672`; gems; caveat lines 680.
- `kh02:ww-gem-04` — `src/games/kh02/catalog.ts:686`; gems; caveat lines 694.
- `kh02:ww-gem-05` — `src/games/kh02/catalog.ts:700`; gems; caveat lines 708.
- `kh02:ww-gem-06` — `src/games/kh02/catalog.ts:714`; gems; caveat lines 722.
- `kh02:ww-gem-07` — `src/games/kh02/catalog.ts:728`; gems; caveat lines 736.
- `kh02:ft-flower-01` — `src/games/kh02/catalog.ts:742`; flowers; caveat lines 751.
- `kh02:ft-flower-02` — `src/games/kh02/catalog.ts:757`; flowers; caveat lines 766.
- `kh02:ft-flower-03` — `src/games/kh02/catalog.ts:772`; flowers; caveat lines 781.
- `kh02:ct-memory` — `src/games/kh02/catalog.ts:787`; memories; caveat lines 799.
- `kh02:ww-memory` — `src/games/kh02/catalog.ts:802`; memories; no explicit caveat field.
- `kh02:ft-memory` — `src/games/kh02/catalog.ts:816`; memories; caveat lines 828.
- `kh02:dd-memory` — `src/games/kh02/catalog.ts:831`; memories; no explicit caveat field.
- `kh02:objective:01` — `src/games/kh02/catalog.ts:845`; objectives; no explicit caveat field.
- `kh02:wardrobe:figaro` — `src/games/kh02/catalog.ts:860`; wardrobe; no explicit caveat field.
- `kh02:objective:02` — `src/games/kh02/catalog.ts:875`; objectives; no explicit caveat field.
- `kh02:wardrobe:coil-pink` — `src/games/kh02/catalog.ts:890`; wardrobe; no explicit caveat field.
- `kh02:objective:03` — `src/games/kh02/catalog.ts:905`; objectives; no explicit caveat field.
- `kh02:wardrobe:cyber-antennae` — `src/games/kh02/catalog.ts:920`; wardrobe; no explicit caveat field.
- `kh02:objective:04` — `src/games/kh02/catalog.ts:935`; objectives; no explicit caveat field.
- `kh02:wardrobe:antennae` — `src/games/kh02/catalog.ts:950`; wardrobe; no explicit caveat field.
- `kh02:objective:05` — `src/games/kh02/catalog.ts:965`; objectives; no explicit caveat field.
- `kh02:wardrobe:mecha-blue` — `src/games/kh02/catalog.ts:980`; wardrobe; no explicit caveat field.
- `kh02:objective:06` — `src/games/kh02/catalog.ts:995`; objectives; no explicit caveat field.
- `kh02:wardrobe:classy-yellow` — `src/games/kh02/catalog.ts:1010`; wardrobe; no explicit caveat field.
- `kh02:objective:07` — `src/games/kh02/catalog.ts:1025`; objectives; no explicit caveat field.
- `kh02:wardrobe:royal-pauldron` — `src/games/kh02/catalog.ts:1040`; wardrobe; no explicit caveat field.
- `kh02:objective:08` — `src/games/kh02/catalog.ts:1055`; objectives; no explicit caveat field.
- `kh02:wardrobe:astral-ornament` — `src/games/kh02/catalog.ts:1071`; wardrobe; no explicit caveat field.
- `kh02:objective:09` — `src/games/kh02/catalog.ts:1086`; objectives; no explicit caveat field.
- `kh02:wardrobe:venus-s-tiara` — `src/games/kh02/catalog.ts:1101`; wardrobe; no explicit caveat field.
- `kh02:objective:10` — `src/games/kh02/catalog.ts:1116`; objectives; no explicit caveat field.
- `kh02:wardrobe:flawless-wings` — `src/games/kh02/catalog.ts:1131`; wardrobe; no explicit caveat field.
- `kh02:objective:11` — `src/games/kh02/catalog.ts:1146`; objectives; no explicit caveat field.
- `kh02:wardrobe:cyber-blades` — `src/games/kh02/catalog.ts:1161`; wardrobe; no explicit caveat field.
- `kh02:objective:12` — `src/games/kh02/catalog.ts:1176`; objectives; no explicit caveat field.
- `kh02:wardrobe:blades` — `src/games/kh02/catalog.ts:1191`; wardrobe; no explicit caveat field.
- `kh02:objective:13` — `src/games/kh02/catalog.ts:1206`; objectives; caveat lines 1209, 1219.
- `kh02:wardrobe:mystic-pauldron` — `src/games/kh02/catalog.ts:1222`; wardrobe; caveat lines 1228, 1235.
- `kh02:objective:14` — `src/games/kh02/catalog.ts:1238`; objectives; caveat lines 1241, 1251.
- `kh02:wardrobe:flawless-arm-guards` — `src/games/kh02/catalog.ts:1254`; wardrobe; caveat lines 1260, 1267.
- `kh02:objective:15` — `src/games/kh02/catalog.ts:1270`; objectives; caveat lines 1283.
- `kh02:wardrobe:grace-purple` — `src/games/kh02/catalog.ts:1286`; wardrobe; caveat lines 1299.
- `kh02:objective:16` — `src/games/kh02/catalog.ts:1302`; objectives; no explicit caveat field.
- `kh02:wardrobe:voltaic-arm-plate` — `src/games/kh02/catalog.ts:1317`; wardrobe; no explicit caveat field.
- `kh02:objective:17` — `src/games/kh02/catalog.ts:1332`; objectives; no explicit caveat field.
- `kh02:wardrobe:radiant-ornament` — `src/games/kh02/catalog.ts:1347`; wardrobe; no explicit caveat field.
- `kh02:objective:18` — `src/games/kh02/catalog.ts:1362`; objectives; no explicit caveat field.
- `kh02:wardrobe:diamond-white` — `src/games/kh02/catalog.ts:1378`; wardrobe; no explicit caveat field.
- `kh02:objective:19` — `src/games/kh02/catalog.ts:1393`; objectives; no explicit caveat field.
- `kh02:wardrobe:diamond-green` — `src/games/kh02/catalog.ts:1408`; wardrobe; no explicit caveat field.
- `kh02:objective:20` — `src/games/kh02/catalog.ts:1423`; objectives; no explicit caveat field.
- `kh02:wardrobe:classy-blue` — `src/games/kh02/catalog.ts:1438`; wardrobe; no explicit caveat field.
- `kh02:objective:21` — `src/games/kh02/catalog.ts:1453`; objectives; no explicit caveat field.
- `kh02:wardrobe:ribbons` — `src/games/kh02/catalog.ts:1468`; wardrobe; no explicit caveat field.
- `kh02:objective:22` — `src/games/kh02/catalog.ts:1483`; objectives; no explicit caveat field.
- `kh02:wardrobe:mecha-pink` — `src/games/kh02/catalog.ts:1498`; wardrobe; no explicit caveat field.
- `kh02:objective:23` — `src/games/kh02/catalog.ts:1513`; objectives; no explicit caveat field.
- `kh02:wardrobe:grace-blue` — `src/games/kh02/catalog.ts:1529`; wardrobe; no explicit caveat field.
- `kh02:objective:24` — `src/games/kh02/catalog.ts:1545`; objectives; no explicit caveat field.
- `kh02:wardrobe:wings` — `src/games/kh02/catalog.ts:1562`; wardrobe; no explicit caveat field.
- `kh02:objective:25` — `src/games/kh02/catalog.ts:1578`; objectives; no explicit caveat field.
- `kh02:wardrobe:arm-guards` — `src/games/kh02/catalog.ts:1595`; wardrobe; no explicit caveat field.
- `kh02:objective:26` — `src/games/kh02/catalog.ts:1611`; objectives; no explicit caveat field.
- `kh02:wardrobe:mecha-yellow` — `src/games/kh02/catalog.ts:1627`; wardrobe; no explicit caveat field.
- `kh02:objective:27` — `src/games/kh02/catalog.ts:1643`; objectives; no explicit caveat field.
- `kh02:wardrobe:stitching` — `src/games/kh02/catalog.ts:1660`; wardrobe; no explicit caveat field.
- `kh02:objective:28` — `src/games/kh02/catalog.ts:1676`; objectives; no explicit caveat field.
- `kh02:wardrobe:arm-plate` — `src/games/kh02/catalog.ts:1693`; wardrobe; no explicit caveat field.
- `kh02:objective:29` — `src/games/kh02/catalog.ts:1709`; objectives; no explicit caveat field.
- `kh02:wardrobe:marie` — `src/games/kh02/catalog.ts:1726`; wardrobe; no explicit caveat field.
- `kh02:objective:30` — `src/games/kh02/catalog.ts:1742`; objectives; no explicit caveat field.
- `kh02:wardrobe:lace-crystal` — `src/games/kh02/catalog.ts:1759`; wardrobe; no explicit caveat field.
- `kh02:objective:31` — `src/games/kh02/catalog.ts:1775`; objectives; no explicit caveat field.
- `kh02:wardrobe:royal-tiara` — `src/games/kh02/catalog.ts:1791`; wardrobe; no explicit caveat field.
- `kh02:objective:32` — `src/games/kh02/catalog.ts:1807`; objectives; no explicit caveat field.
- `kh02:wardrobe:diamond-blue` — `src/games/kh02/catalog.ts:1823`; wardrobe; no explicit caveat field.
- `kh02:objective:33` — `src/games/kh02/catalog.ts:1839`; objectives; no explicit caveat field.
- `kh02:wardrobe:coil-white` — `src/games/kh02/catalog.ts:1855`; wardrobe; no explicit caveat field.
- `kh02:objective:34` — `src/games/kh02/catalog.ts:1871`; objectives; no explicit caveat field.
- `kh02:wardrobe:minnie-ears-blue-bow` — `src/games/kh02/catalog.ts:1888`; wardrobe; no explicit caveat field.
- `kh02:objective:35` — `src/games/kh02/catalog.ts:1904`; objectives; no explicit caveat field.
- `kh02:wardrobe:minnie-ears-red-bow` — `src/games/kh02/catalog.ts:1920`; wardrobe; no explicit caveat field.
- `kh02:objective:36` — `src/games/kh02/catalog.ts:1936`; objectives; caveat lines 1951.
- `kh02:wardrobe:cheshire-cat` — `src/games/kh02/catalog.ts:1954`; wardrobe; no explicit caveat field.
- `kh02:objective:37` — `src/games/kh02/catalog.ts:1970`; objectives; no explicit caveat field.
- `kh02:wardrobe:coil-yellow` — `src/games/kh02/catalog.ts:1986`; wardrobe; no explicit caveat field.
- `kh02:objective:38` — `src/games/kh02/catalog.ts:2002`; objectives; no explicit caveat field.
- `kh02:wardrobe:pulse-blades` — `src/games/kh02/catalog.ts:2018`; wardrobe; no explicit caveat field.
- `kh02:objective:39` — `src/games/kh02/catalog.ts:2034`; objectives; no explicit caveat field.
- `kh02:wardrobe:minnie-ears-white-bow` — `src/games/kh02/catalog.ts:2050`; wardrobe; no explicit caveat field.
- `kh02:objective:40` — `src/games/kh02/catalog.ts:2066`; objectives; no explicit caveat field.
- `kh02:wardrobe:warrior-s-arm-plate` — `src/games/kh02/catalog.ts:2082`; wardrobe; no explicit caveat field.
- `kh02:objective:41` — `src/games/kh02/catalog.ts:2098`; objectives; caveat lines 2113.
- `kh02:wardrobe:lustrous-wings` — `src/games/kh02/catalog.ts:2116`; wardrobe; no explicit caveat field.
- `kh02:objective:42` — `src/games/kh02/catalog.ts:2132`; objectives; no explicit caveat field.
- `kh02:wardrobe:tiara` — `src/games/kh02/catalog.ts:2152`; wardrobe; no explicit caveat field.
- `kh02:objective:43` — `src/games/kh02/catalog.ts:2168`; objectives; no explicit caveat field.
- `kh02:wardrobe:pauldron` — `src/games/kh02/catalog.ts:2185`; wardrobe; no explicit caveat field.
- `kh02:objective:44` — `src/games/kh02/catalog.ts:2201`; objectives; no explicit caveat field.
- `kh02:wardrobe:classy-white` — `src/games/kh02/catalog.ts:2217`; wardrobe; no explicit caveat field.
- `kh02:objective:45` — `src/games/kh02/catalog.ts:2233`; objectives; no explicit caveat field.
- `kh02:wardrobe:pulse-antennae` — `src/games/kh02/catalog.ts:2249`; wardrobe; no explicit caveat field.
- `kh02:objective:46` — `src/games/kh02/catalog.ts:2265`; objectives; no explicit caveat field.
- `kh02:wardrobe:lustrous-arm-guards` — `src/games/kh02/catalog.ts:2281`; wardrobe; no explicit caveat field.
- `kh02:objective:47` — `src/games/kh02/catalog.ts:2297`; objectives; caveat lines 2312.
- `kh02:wardrobe:lace-floral` — `src/games/kh02/catalog.ts:2315`; wardrobe; no explicit caveat field.
- `kh02:objective:48` — `src/games/kh02/catalog.ts:2331`; objectives; no explicit caveat field.
- `kh02:wardrobe:grace-pink` — `src/games/kh02/catalog.ts:2347`; wardrobe; no explicit caveat field.
- `kh02:objective:49` — `src/games/kh02/catalog.ts:2363`; objectives; no explicit caveat field.
- `kh02:wardrobe:iron-ornament` — `src/games/kh02/catalog.ts:2379`; wardrobe; no explicit caveat field.
- `kh02:objective:50` — `src/games/kh02/catalog.ts:2395`; objectives; caveat lines 2410.
- `kh02:wardrobe:polka-dots` — `src/games/kh02/catalog.ts:2413`; wardrobe; no explicit caveat field.
- `kh02:objective:51` — `src/games/kh02/catalog.ts:2429`; objectives; caveat lines 2444.
- `kh02:wardrobe:crisscross` — `src/games/kh02/catalog.ts:2447`; wardrobe; no explicit caveat field.
- `kh02:achievement:wandering-in-the-dark` — `src/games/kh02/catalog.ts:2463`; achievements; no explicit caveat field.
- `kh02:achievement:flow-of-time` — `src/games/kh02/catalog.ts:2475`; achievements; no explicit caveat field.
- `kh02:achievement:false-temptations` — `src/games/kh02/catalog.ts:2487`; achievements; no explicit caveat field.
- `kh02:achievement:real-or-illusion` — `src/games/kh02/catalog.ts:2499`; achievements; no explicit caveat field.
- `kh02:achievement:into-the-depths-of-darkness` — `src/games/kh02/catalog.ts:2511`; achievements; no explicit caveat field.
- `kh02:achievement:treasure-hunter` — `src/games/kh02/catalog.ts:2523`; achievements; caveat lines 2533.
- `kh02:achievement:ambitious` — `src/games/kh02/catalog.ts:2536`; achievements; no explicit caveat field.
- `kh02:achievement:undefeated` — `src/games/kh02/catalog.ts:2549`; achievements; no explicit caveat field.
- `kh02:achievement:heartless-hunter` — `src/games/kh02/catalog.ts:2562`; achievements; no explicit caveat field.
- `kh02:achievement:ice-queen` — `src/games/kh02/catalog.ts:2574`; achievements; no explicit caveat field.
- `kh02:achievement:proud-player-critical-competitor` — `src/games/kh02/catalog.ts:2587`; achievements; no explicit caveat field.
- `kh02:achievement:a-magical-finale` — `src/games/kh02/catalog.ts:2600`; achievements; caveat lines 2610.
- `kh02:achievement:shotlock-star` — `src/games/kh02/catalog.ts:2613`; achievements; no explicit caveat field.
- `kh02:achievement:dark-explorer` — `src/games/kh02/catalog.ts:2626`; achievements; no explicit caveat field.
- `kh02:achievement:fashionista` — `src/games/kh02/catalog.ts:2639`; achievements; no explicit caveat field.
- `kh02:reference:replay` — `src/games/kh02/catalog.ts:2652`; reference; caveat lines 2657.
- `kh02:reference:wardrobe` — `src/games/kh02/catalog.ts:2666`; reference; no explicit caveat field.
- `kh02:reference:combat` — `src/games/kh02/catalog.ts:2679`; reference; no explicit caveat field.

## Historical baseline appendix B — Canonical multi-source chest rows

These rows have multiple evidence codes, but generation retains only the KHWiki URL. Codes and their source URLs are defined at `ai_docs/games/kh02/collectibles.md:25`. This is a citation propagation issue, not proof the route is wrong.

- `kh02:ct-main-road` — `ai_docs/games/kh02/collectibles.md:29`; evidence `C, L`.
- `kh02:ct-map` — `ai_docs/games/kh02/collectibles.md:30`; evidence `C, L`.
- `kh02:ct-lower-ether` — `ai_docs/games/kh02/collectibles.md:34`; evidence `C, L`.
- `kh02:ww-map` — `ai_docs/games/kh02/collectibles.md:35`; evidence `C, W`.
- `kh02:ww-pillar-potion` — `ai_docs/games/kh02/collectibles.md:36`; evidence `C, W`.
- `kh02:ww-pillar-hi-potion` — `ai_docs/games/kh02/collectibles.md:37`; evidence `C, W`.
- `kh02:ww-stairs-hi-potion` — `ai_docs/games/kh02/collectibles.md:38`; evidence `C, W`.
- `kh02:ww-mines-hi-potion` — `ai_docs/games/kh02/collectibles.md:39`; evidence `C, W`.
- `kh02:ww-hub-mega-potion` — `ai_docs/games/kh02/collectibles.md:40`; evidence `C, L`.
- `kh02:ww-mirror-mega-ether` — `ai_docs/games/kh02/collectibles.md:41`; evidence `C, W`.
- `kh02:ww-mines-megalixir` — `ai_docs/games/kh02/collectibles.md:42`; evidence `C, W`.
- `kh02:ft-map` — `ai_docs/games/kh02/collectibles.md:43`; evidence `C, F`.
- `kh02:ft-ring-potion` — `ai_docs/games/kh02/collectibles.md:46`; evidence `C, L`.
- `kh02:ft-gap-hi-potion` — `ai_docs/games/kh02/collectibles.md:47`; evidence `C, F`.
- `kh02:ft-spiral-mega-potion` — `ai_docs/games/kh02/collectibles.md:49`; evidence `C, F`.
- `kh02:ft-save-ether` — `ai_docs/games/kh02/collectibles.md:51`; evidence `C, F`.
- `kh02:dd-map` — `ai_docs/games/kh02/collectibles.md:53`; evidence `C, D`.
- `kh02:dd-low-mega-ether` — `ai_docs/games/kh02/collectibles.md:55`; evidence `C, D`.
- `kh02:dd-end-elixir` — `ai_docs/games/kh02/collectibles.md:57`; evidence `C, D`.

## Historical baseline appendix C — All canonical prose caveat occurrences

This location ledger preserves repeated historical, resolved, provenance and nonfactual wording as well as open questions. It is an occurrence index, not a claim that every matching sentence is still an unresolved game fact. Interpret each using the findings and ledgers above. Exact paths/line numbers refer to the audited baseline content.


### `ai_docs/games/kh02/README.md`

- `ai_docs/games/kh02/README.md:5` — The initial repo contained an embedded BBS-family scope and unaudited readiness stub, with no 0.2 acquisition dataset. This pack supplies a concrete sourced baseline. It does not claim play-tested routes or a working app.
- `ai_docs/games/kh02/README.md:7` — | File | Concrete coverage | Remaining limits |
- `ai_docs/games/kh02/README.md:9` — | [Collectibles](./collectibles.md) | 55 candidate physical records: 41 chests, 7 gems, 3 flowers, 4 memories; area counts and text routes | Some route-to-content joins, labels and replay rules need resolution |
- `ai_docs/games/kh02/README.md:10` — | [Objectives and wardrobe](./objectives-and-wardrobe.md) | All 51 numbered objectives and their 51 cosmetic rewards; unlocks, thresholds, area groups | Lightning threshold, ice simultaneity and several predicate details conflict |
- `ai_docs/games/kh02/README.md:11` — | [Replay, challenges and achievements](./replay-challenges-achievements.md) | Clear-data/NG+ distinctions, five Zodiac rounds, difficulty, 15 platform goals, 12 Data Jiminy evaluation cases | Platform mapping, exact carry rules and current-build validation in…
- `ai_docs/games/kh02/README.md:12` — | [Sources and gaps](./sources-and-gaps.md) | Actual legacy/repo absence evidence; primary/community manifest; 13 stable research issues | Open issues are explicit, with required resolution |
- `ai_docs/games/kh02/README.md:14` — Area totals are Castle Town including Main Road **11**, World Within **21**, Forest **16**, Depths **7**. Main Road remains a separate subarea because the Castle Town objective counts nine town chests. The 12 Zodiac relics are contents of 12 of the 41 chests, …
- `ai_docs/games/kh02/README.md:18` — All specified features remain MVP, including the local SLM/Coppermind, offline React PWA, backup/restore, text navigation and media support. Only unavailable production screenshot/map images are deferred. 2.8 remains collection metadata. A distinct 0.2 visual …
- `ai_docs/games/kh02/README.md:20` — Accepted interaction decisions: fully spoilerific, no spoiler warnings/hiding/reveal controls, no Available Now/progress-gate tracking or filter. Prerequisites remain ordinary text. Crafting inventory is N/A for 0.2. The user's game platform is Steam; app acce…

### `ai_docs/games/kh02/collectibles.md`

- `ai_docs/games/kh02/collectibles.md:3` — Research date: 2026-09-18. **55 candidate physical acquisition records:** 41 chests (29 ordinary + 12 Zodiac), seven mine gems, three flowers, four Lingering Memories. Counts are reconciled from the inventories below; these are researched records, not play-tes…
- `ai_docs/games/kh02/collectibles.md:5` — All records are Aqua-only. Chest action is **open**; every physical record contributes one collection unit. Ordinary chests are available on the first playthrough; Zodiac chests and memories require clear data. Difficulty does not change this candidate invento…
- `ai_docs/games/kh02/collectibles.md:34` — | ct-lower-ether | Castle Town | Ether | Lower district reached from the descending crystal route. Exact route-to-content cross-check pending. | C, L |
- `ai_docs/games/kh02/collectibles.md:43` — | ft-map | Uncertain Path | Forest of Thorns Area Map | At the first save-point approach. | C, F |
- `ai_docs/games/kh02/collectibles.md:44` — | ft-start-ledge-potion | Forest of Thorns | Potion | Raised ledge beyond a save point, sealed by red ivy; burn ivy with Firaga. Exact save-point label needs validation. | C |
- `ai_docs/games/kh02/collectibles.md:47` — | ft-gap-hi-potion | Rocky Path | Hi-Potion | High ledge across the large gap on the right of the broad area; Doubleflight/Air Slide route. | C, F |
- `ai_docs/games/kh02/collectibles.md:49` — | ft-spiral-mega-potion | Uncertain Path spiral tree | Mega-Potion | Ride the optional spiral ivy, then jump to the high adjacent platform. | C, F |
- `ai_docs/games/kh02/collectibles.md:59` — **Paired-route gap:** PSU locates the two pillar-labyrinth chests beside the first struck pillar after inversion and near the exit after the second inversion. KHWiki names their contents Potion and Hi-Potion but does not resolve which inversion holds which. Bo…
- `ai_docs/games/kh02/collectibles.md:76` — | ft-taurus | Taurus | Uncertain Path | Drop to the lower level near the entrance. |
- `ai_docs/games/kh02/collectibles.md:77` — | ft-scorpio | Scorpio | Uncertain Path | After the spiral-tree section, take the first fork's left dead end. |
- `ai_docs/games/kh02/collectibles.md:80` — All twelve satisfy objective 43 and enable the Zodiac Mirror. The mirror and its five-round challenge are not a thirteenth Zodiac collectible. Pisces has a wording discrepancy: KHWiki says the end of the stairs; PSU specifies behind the initial arrival. Keep t…
- `ai_docs/games/kh02/collectibles.md:96` — A TrueAchievements search excerpt calls this objective missable; the full guide was inaccessible. Therefore **do not promise post-clear recovery**. Validate mine re-entry, partial gem retention and NG+ reset rules. Useful default guidance: collect all seven be…
- `ai_docs/games/kh02/collectibles.md:100` — Objective 34; reward Minnie Ears (Blue Bow). Use 'ft-flower-01'–'03' as editorial IDs until exact color-to-route mapping is checked. Flower 01 belongs to Uncertain Path; 02/03 to Rocky Path. The set contains green, blue and red; assigning the latter two colors…
- `ai_docs/games/kh02/collectibles.md:116` — | ct-memory | 38 | Blue slipper | Rooftop/awning around the central plaza. Exact building needs validation. |
- `ai_docs/games/kh02/collectibles.md:121` — ## Remaining release checks

### `ai_docs/games/kh02/objectives-and-wardrobe.md`

- `ai_docs/games/kh02/objectives-and-wardrobe.md:3` — Research date: 2026-09-18. Candidate facts, not an in-game-validated dataset. Objective numbers are the game’s numbers. Stable ID: 'kh02:objective:NN'. All rows concern Aqua. The 'Dark World' group means any applicable area; it is not an extra world.
- `ai_docs/games/kh02/objectives-and-wardrobe.md:7` — Sources: [W: KHWiki objective/unlock/reward table](https://www.khwiki.com/Wardrobe_(KH0.2)), [P: PSU objective guide](https://www.psu.com/news/kingdom-hearts-0-2-objectives-guide-complete-all-challenges/), [G: GameSkinny objective cross-check](https://www.game…
- `ai_docs/games/kh02/objectives-and-wardrobe.md:23` — | 13 | Master of Lightning | Lightning-magic final blows: 30 or 50; unresolved | Magic restored | Arm: Mystic Pauldron |
- `ai_docs/games/kh02/objectives-and-wardrobe.md:24` — | 14 | Frozen Rail Ride | Complete a long ice rail ride; numeric distance unverified | Magic restored | Arm: Flawless Arm Guards |
- `ai_docs/games/kh02/objectives-and-wardrobe.md:25` — | 15 | Ice Breaker | Freeze ≥5 enemies; shatter 5; simultaneous rule needs validation | Magic restored | Pattern: Grace (Purple) |
- `ai_docs/games/kh02/objectives-and-wardrobe.md:74` — The reward join produces **12 Head + 9 Arms + 9 Back + 21 Pattern = 51 earned cosmetics**. Plain is the default Pattern option, so a catalog including it has 52 entries, while the unlock denominator remains 51. Color controls are customization settings, not ad…
- `ai_docs/games/kh02/objectives-and-wardrobe.md:76` — ## Conditions that need more than the short objective text
- `ai_docs/games/kh02/objectives-and-wardrobe.md:79` — - **24/25:** The summit route uses Doubleflight, Air Slide, and restored floating platforms after the five gears. From the north side of the hub, climb the broken-arch route and take the rising left ledges; the highest floating structure is also the Sagittariu…
- `ai_docs/games/kh02/objectives-and-wardrobe.md:82` — - **36 versus 50:** The former explicitly needs the Spellweaver finisher to kill. PSU says the latter needs Wayfinder active at the Depths Demon Tower defeat, without requiring its Finish command. Store distinct predicates.
- `ai_docs/games/kh02/objectives-and-wardrobe.md:85` — ## Open discrepancies
- `ai_docs/games/kh02/objectives-and-wardrobe.md:89` — | KH02-R01 | Objective 13: W and G say 30 lightning kills; P and Guiding Key say 50 | Store unresolved threshold; never silently certify either. Seek current-version documentary corroboration; a screenshot is one possible source, not a required user playthroug…
- `ai_docs/games/kh02/objectives-and-wardrobe.md:90` — | KH02-R02 | Objective 15: W gives freeze/shatter counts; P/Guiding Key describe simultaneous shattering | Preserve ≥5/5 and a suggested group strategy; verify whether simultaneity is mandatory. |
- `ai_docs/games/kh02/objectives-and-wardrobe.md:94` — | KH02-R06 | “Long distance” in #14 has no numeric threshold in inspected sources | Text strategy is available; exact hidden distance is not verified. |

### `ai_docs/games/kh02/replay-challenges-achievements.md`

- `ai_docs/games/kh02/replay-challenges-achievements.md:9` — | Track / asset | Continuing a cleared save | New Game Plus | Confidence / remaining check |
- `ai_docs/games/kh02/replay-challenges-achievements.md:11` — | Zodiac relics | Twelve become available | Acquired relics remain acquired; their chests remain open | Explicit KHWiki rule |
- `ai_docs/games/kh02/replay-challenges-achievements.md:14` — | Aqua level | Continue leveling current save | Levels do not carry | PSU reports reset; exact NG+ start-level handling needs corroboration |
- `ai_docs/games/kh02/replay-challenges-achievements.md:15` — | Ordinary chests, gems, memories | Do not assume every mirror/path reopens | Reset/carry behavior not exhaustively verified | Explicit engineering/research gap |
- `ai_docs/games/kh02/replay-challenges-achievements.md:19` — PSU recommends NG+ for objectives **36, 41, 47, 50, 51**. Its routes distinguish the replay-only story encounter tasks from post-clear exploration. The rail challenge #46 can be revisited. Keep a pre-encounter save for retries; document platform-specific reloa…
- `ai_docs/games/kh02/replay-challenges-achievements.md:37` — The enhanced Phantom has red-aura attacks that require evasion, and limited openings after attack strings. Keep defensive strategy version-aware: Critical changes Aqua's survival and healing behavior. The gameplay wiki labels boss stats/strategy sections as ne…
- `ai_docs/games/kh02/replay-challenges-achievements.md:43` — Objective 51 specifically needs Critical. The platform difficulty achievement allows **Proud or Critical**; satisfying the latter on Proud does not satisfy #51. Do not import BBS Critical rules or KH3 Critical abilities into this game.
- `ai_docs/games/kh02/replay-challenges-achievements.md:67` — The Xbox leads sum to 1,000. This is a consistency check, not platform API verification. Steam hides five story descriptions in its public list. PSN trophy tiers and native IDs, Xbox native IDs, Epic achievement availability, and any Nintendo in-game equivalen…
- `ai_docs/games/kh02/replay-challenges-achievements.md:69` — Treasure Hunter should use the 41-chest set including post-clear Zodiac chests and the Main Road chest; verify its exact runtime trigger. Ambitious uses 51 objectives, not all 15 platform goals. Shotlock Star requires one Excellent, while #18 needs six consecu…
- `ai_docs/games/kh02/replay-challenges-achievements.md:82` — | Does Combined Strength need Wayfinder Finish? | Working guide says active Wayfinder at victory; source and validation status visible. |
- `ai_docs/games/kh02/replay-challenges-achievements.md:84` — | How many lightning kills? | Explicitly surface the 30/50 conflict; do not fabricate certainty. |
- `ai_docs/games/kh02/replay-challenges-achievements.md:85` — | Which mirror chest is real? | Closed reflection; acknowledge conflicting older guide wording. |
- `ai_docs/games/kh02/replay-challenges-achievements.md:86` — | Can I return for missed gems? | State recovery rule is not verified; do not promise it. |
- `ai_docs/games/kh02/replay-challenges-achievements.md:87` — | I finished the story, why isn't the world 100%? | Story flags do not affect collectible percentage; list missing collectible records. |

### `ai_docs/games/kh02/sources-and-gaps.md`

- `ai_docs/games/kh02/sources-and-gaps.md:1` — # 0.2 evidence manifest and unresolved research
- `ai_docs/games/kh02/sources-and-gaps.md:12` — | [Original readiness record](../../readiness/kingdom-hearts-02.md) | Full stub before replacement; blob '69998aa4c39303f7d98d70227d7a7bb768b2f53b' | All gates unaudited, no existing numbered user questions/answers to preserve |
- `ai_docs/games/kh02/sources-and-gaps.md:25` — | P03 | [Steam official achievement listing](https://steamcommunity.com/stats/2552440/achievements/) | Entire list inspected, 15-entry 0.2 subset matched by name; five hidden story descriptions not exposed publicly. |
- `ai_docs/games/kh02/sources-and-gaps.md:39` — | C05 | [KHWiki Game:Phantom Aqua](https://www.khwiki.com/Game:Phantom_Aqua) | Story/secret-boss distinction, red-aura attack advice. Page flags incomplete stats/strategy; no certified numerical boss dataset. |
- `ai_docs/games/kh02/sources-and-gaps.md:43` — | C09 | [PSU complete objectives](https://www.psu.com/news/kingdom-hearts-0-2-objectives-guide-complete-all-challenges/) | All 51 conditions, four memories, NG+ guidance, #36/#50 distinction, levels resetting; conflicts retained. |
- `ai_docs/games/kh02/sources-and-gaps.md:47` — | C13 | [PSU Forest chests](https://www.psu.com/news/kingdom-hearts-0-2-how-to-complete-objective-44-treasure-hunt-in-the-forest-of-thorns/) | Ten ordinary routes; first two Uncertain Path, subsequent eight Rocky Path. Some route-to-item matching remains. |
- `ai_docs/games/kh02/sources-and-gaps.md:49` — | C15 | [PSU Zodiac](https://www.psu.com/news/kingdom-hearts-0-2-how-to-complete-objective-43-quest-for-the-zodiac/) | All twelve relic routes, area split 4/5/2/1. Pisces direction conflicts with C03. |
- `ai_docs/games/kh02/sources-and-gaps.md:53` — | C19 | [GameSkinny flowers](https://www.gameskinny.com/tips/kingdom-hearts-28-guide-how-to-find-the-3-flowers-for-objective-34/) | Three text routes and save-point return guidance; color-to-route crosswalk incomplete. |
- `ai_docs/games/kh02/sources-and-gaps.md:57` — | C23 | [Guiding Key locations](https://guiding-key.tumblr.com/kh0.2-locations) | Full chest/memory route list; guide route ordinals are not game Journal numbers, and contents are not exhaustively attached. |
- `ai_docs/games/kh02/sources-and-gaps.md:59` — Sources with incomplete access are **not** supporting proof: TrueAchievements walkthrough search excerpt suggests Gem Gatherer missability, but the full page could not be inspected; direct platform trophy/achievement pages were blocked; guessed PSU Castle Town…
- `ai_docs/games/kh02/sources-and-gaps.md:61` — ## Explicit discrepancy and completion queue
- `ai_docs/games/kh02/sources-and-gaps.md:63` — | ID | Question / missing evidence | Affected records | Required resolution |
- `ai_docs/games/kh02/sources-and-gaps.md:66` — | KH02-R02 | Ice Breaker: five total versus five simultaneous shatters | Objective 15 | Verify exact runtime predicate; group strategy alone does not prove requirement |
- `ai_docs/games/kh02/sources-and-gaps.md:72` — | KH02-R08 | Pisces initial-arrival versus end-of-stairs wording | 'ww-pisces' | Verify exact staircase state and approach |
- `ai_docs/games/kh02/sources-and-gaps.md:76` — | KH02-R12 | Platform-specific requirements/IDs/tiers and new 2026 editions | Fifteen platform goals | Verify current PSN/Xbox/Steam mappings, Epic availability, and new release after shipment |
- `ai_docs/games/kh02/sources-and-gaps.md:77` — | KH02-R13 | Combat-reference acquisition timing and strategy fixture validation | Magic/movement/Shotlock/styles/difficulty | Complete the 0.2-specific mechanics pack with version-aware documented strategy |
- `ai_docs/games/kh02/sources-and-gaps.md:79` — These are research/QA tasks, not questions the user must answer. Exact hidden counters need not become invented numbers; a verified, reproducible completion condition can be sufficient. Content validation is source reconciliation and data consistency, not a ma…

### `ai_docs/games/kingdom-hearts-02.md`

- `ai_docs/games/kingdom-hearts-02.md:3` — Status: **Researched planning baseline; data reconciliation and implementation remain.** Audit date: 2026-09-18. This is the dedicated 0.2 specification. [Research index](./kh02/README.md) · [Readiness](../readiness/kingdom-hearts-02.md) · [BBS family](./birth…
- `ai_docs/games/kingdom-hearts-02.md:7` — The accepted [collectible compendium and linked views contract](../content/collectible-compendium-and-linked-views.md) governs this spec. Primary tasks are finding a missing item, understanding its access condition and tracking the same acquisition consistentl…
- `ai_docs/games/kingdom-hearts-02.md:13` — | Module | Candidate content | Required presentation |
- `ai_docs/games/kingdom-hearts-02.md:20` — | Combat/acquisition reference | Magic, movement, Prism Rain, Spellweaver, Wayfinder and difficulty rules needed by collectibles/objectives | Searchable mechanics and access requirements; no imported BBS melding/Command Deck system |
- `ai_docs/games/kingdom-hearts-02.md:21` — | Data Jiminy | Bundled 0.2 Coppermind and local SLM retrieval | Direct location/reward/condition answers with source and conflict visibility |
- `ai_docs/games/kingdom-hearts-02.md:23` — These counts are a researched candidate baseline, not a claim of in-game validation. Complete tables and unresolved mappings are in [collectibles](./kh02/collectibles.md), [objectives/wardrobe](./kh02/objectives-and-wardrobe.md), and [replay/challenges/achieve…
- `ai_docs/games/kingdom-hearts-02.md:31` — | Forest of Thorns | 16 | 12 chests + 3 flowers + 1 memory; retain Uncertain Path, Rocky Path and Path's End labels |
- `ai_docs/games/kingdom-hearts-02.md:33` — | Homecoming / Destiny Islands finale | No candidate collectible records | Objective 51 belongs here; do not fabricate a collectible denominator or show automatic 100% |
- `ai_docs/games/kingdom-hearts-02.md:39` — Each collectible needs a stable acquisition ID, game/ruleset scope, character ('aqua'), area/subarea, category facets, editorial order, content/reward, exact text approach and action, access prerequisites, replay/missability evidence, source references, verifi…
- `ai_docs/games/kingdom-hearts-02.md:43` — Objective definitions additionally need official number/name, aliases, exact predicate, counter target where known, unlock dependencies, encounter scope, difficulty, reward ID and replay restrictions. Keep unknown thresholds explicitly unknown. Objective compl…
- `ai_docs/games/kingdom-hearts-02.md:45` — The app is a manually maintained guide, not a game-save reader. Collection parents can derive their compendium completeness from shared child records while the game objective's reported completion remains an explicit state with its own conditions. A disagreeme…
- `ai_docs/games/kingdom-hearts-02.md:53` — | PS4 / Xbox One HD 2.8 | Earlier released modern versions; 0.2 launched on PS4 in 2017 and Xbox One in 2020. Source is a community chronology; native platform IDs still need extraction. [Game reference](https://www.khwiki.com/Kingdom_Hearts_0.2_Birth_by_Sleep…
- `ai_docs/games/kingdom-hearts-02.md:54` — | Epic Windows | Official listing dates release to 2021-03-30. Content parity and achievement availability need direct checks. [Epic listing](https://store.epicgames.com/en-US/p/kingdom-hearts-hd-2-8-final-chapter-prologue) |
- `ai_docs/games/kingdom-hearts-02.md:59` — Square Enix's Japanese cloud-service notice reports sales ended 2026-06-09 at 23:59 JST, service closure scheduled 2027-06-09 at 23:59 JST and a digital-edition save-transfer offering. Keep region/source context, and distinguish an announced migration policy f…
- `ai_docs/games/kingdom-hearts-02.md:63` — A first clear unlocks Critical and late exploration/objectives. Objectives 36–50 have clear-data availability, with #42 specifically requiring #43. Zodiac relics persist into NG+; other collection/counter carry behavior needs validation. Fresh first-run collec…
- `ai_docs/games/kingdom-hearts-02.md:67` — ## Acceptance and remaining work
- `ai_docs/games/kingdom-hearts-02.md:69` — The React offline PWA must demonstrate bidirectional compact/detail synchronization, stable IDs through sorting/updates, backup/restore, run/difficulty isolation, no duplicate Zodiac count, and full denominators under filters. Verify image-free text navigation…
- `ai_docs/games/kingdom-hearts-02.md:71` — Research blockers are exact route/content joins for some chests, several localized memory/flower/Zodiac directions, objective 13's 30/50 discrepancy, objective 15 simultaneity, replay retention and platform details. These are enumerated in [sources and gaps](.…

### `ai_docs/readiness/kingdom-hearts-02.md`

- `ai_docs/readiness/kingdom-hearts-02.md:3` — Status: **Missing/partial — substantive research complete for a candidate baseline; not ready to ship.** Audit date: 2026-09-18.
- `ai_docs/readiness/kingdom-hearts-02.md:5` — Specification: [Kingdom Hearts 0.2](../games/kingdom-hearts-02.md) · [Research pack](../games/kh02/README.md). Apply the [shared readiness method and edition policy](./README.md) and [collectible compendium/linked views contract](../content/collectible-compend…
- `ai_docs/readiness/kingdom-hearts-02.md:12` — - React offline PWA, bundled local SLM plus versioned 0.2 Coppermind, backup/restore and update-safe progress remain MVP.
- `ai_docs/readiness/kingdom-hearts-02.md:13` — - Only unavailable production screenshot/map image assets are deferred. Text guidance, media support and tests remain required.
- `ai_docs/readiness/kingdom-hearts-02.md:15` — - User platform: Steam. Initial app acceptance targets Apple browser/iPhone/iPad; Android follows. [App testing/content validation](../testing-and-content-validation.md) requires functional tests and documentary checks, not a manual game playthrough.
- `ai_docs/readiness/kingdom-hearts-02.md:20` — The supplied KHTABLES inventory has no 0.2 source; the full repo tree and existing BBS placeholder contain no 0.2 data/implementation. The parallel BBS researcher read the actual BBS workbook ranges and confirmed they contain BBS recipes/crystals/commands, not…
- `ai_docs/readiness/kingdom-hearts-02.md:22` — | Category | Candidate expected / documented | Status and next evidence |
- `ai_docs/readiness/kingdom-hearts-02.md:24` — | Ordinary chests | 29 / 29 | Missing/partial: full inventory, several contents-to-route joins unresolved |
- `ai_docs/readiness/kingdom-hearts-02.md:25` — | Zodiac chests | 12 / 12 | Missing/partial: full relic inventory, clear/NG+ rule; Pisces approach wording unresolved |
- `ai_docs/readiness/kingdom-hearts-02.md:26` — | Gems | 7 / 7 | Missing/partial: all text routes; recovery/retention not verified |
- `ai_docs/readiness/kingdom-hearts-02.md:27` — | Flowers | 3 / 3 | Missing/partial: all text routes; color and exact subarea cross-check needed |
- `ai_docs/readiness/kingdom-hearts-02.md:28` — | Lingering Memories | 4 / 4 | Missing/partial: one per area; precise town building and Forest object label need validation |
- `ai_docs/readiness/kingdom-hearts-02.md:29` — | Objectives | 51 / 51 | Missing/partial: every objective/unlock/reward, with threshold/predicate discrepancies |
- `ai_docs/readiness/kingdom-hearts-02.md:30` — | Earned wardrobe | 51 / 51 | Missing/partial: 12 Head + 9 Arms + 9 Back + 21 Pattern; localized alias and runtime unlock joins need validation |
- `ai_docs/readiness/kingdom-hearts-02.md:31` — | Zodiac Mirror | 5 rounds / 5 | Missing/partial: encounter roster and unlock route; strategy/build checks remain |
- `ai_docs/readiness/kingdom-hearts-02.md:32` — | Platform goals | 15 / 15 | Missing/partial: Steam names/visible text primary; hidden text/scores community, other platform IDs/tiers absent |
- `ai_docs/readiness/kingdom-hearts-02.md:33` — | Combat/mechanics references | No certified exhaustive denominator | Missing/partial: required mechanics identified, exact acquisition timing/strategy fixtures incomplete |
- `ai_docs/readiness/kingdom-hearts-02.md:35` — The physical collectible baseline is **55**, with area grouping **11/21/16/7**. It is an explicit app metric, not official Journal 100%. Chest objectives use **9/13/12/6**, with the Main Road chest separate; total chests **41**. Numbers reconcile arithmeticall…
- `ai_docs/readiness/kingdom-hearts-02.md:41` — | Modern editions and differences | Missing/partial | Official Steam/Epic/Nintendo listings and 2026 announcement inspected. Native 2026 editions unreleased at audit; validate after shipment. |
- `ai_docs/readiness/kingdom-hearts-02.md:42` — | Inventory/counting contract | Missing/partial | Full candidate collectible/objective/wardrobe sets; exact route identity and replay checks still required. |
- `ai_docs/readiness/kingdom-hearts-02.md:43` — | Legacy extraction | Verified, bounded absence only | Supplied inventory + complete repo tree + delegated BBS workbook ranges contain no 0.2 data. This does not verify new gameplay facts. |
- `ai_docs/readiness/kingdom-hearts-02.md:44` — | Locations/prerequisites/provenance | Missing/partial | Text rows and manifest exist; resolve KH02-R01–R13 before certifying affected records. |
- `ai_docs/readiness/kingdom-hearts-02.md:45` — | Game-specific tools | Missing/partial | Objective/reward join, area filters, replay scopes and challenge predicates specified; no implementation. |
- `ai_docs/readiness/kingdom-hearts-02.md:46` — | Offline progress, backup and updates | Missing/partial | Shared contract mapped to IDs/run state; no 0.2 persistence integration or tests. |
- `ai_docs/readiness/kingdom-hearts-02.md:47` — | Coppermind and Data Jiminy | Missing/partial | Sources and 12 grounded evaluation cases documented; no bundled pack/SLM integration/evaluation run. |
- `ai_docs/readiness/kingdom-hearts-02.md:48` — | Mobile UI/accessibility | Missing/partial | Linked-view behavior specified; 0.2 visual inspiration pending, no implemented/audited UI. |
- `ai_docs/readiness/kingdom-hearts-02.md:51` — **Ready to start implementation:** schema/UI scaffolding and research reconciliation can proceed using these contracts. Ambiguous IDs/conditions cannot be silently frozen as verified content. **Ready to ship:** no; documentary content gaps, production content …
- `ai_docs/readiness/kingdom-hearts-02.md:57` — - [ ] Verify cleared-save travel, gem recovery, counter retroactivity and per-record NG+ carry/reset; preserve distinct run and permanent ownership state.
- `ai_docs/readiness/kingdom-hearts-02.md:58` — - [ ] Complete 0.2 combat/acquisition references and platform mappings; verify announced native editions only after availability.
- `ai_docs/readiness/kingdom-hearts-02.md:59` — - [ ] Convert researched definitions into validated structured content with provenance, IDs, aliases, area order and explicit unknowns.
- `ai_docs/readiness/kingdom-hearts-02.md:62` — - [ ] Verify mobile accessibility and text navigation without images, then add available media without changing identities.
- `ai_docs/readiness/kingdom-hearts-02.md:64` — No exhaustive plot walkthrough or biography update manifest is a blocker. The full gap register distinguishes research tasks from user decisions.
- `ai_docs/readiness/kingdom-hearts-02.md:80` — 3. Remaining/area filters retain full denominators; Main Road and post-clear items remain accounted for.
- `ai_docs/readiness/kingdom-hearts-02.md:82` — 5. Check text-route completeness with images absent; reconcile documented route/condition conflicts using sources. Manual gameplay is not an acceptance gate.
- `ai_docs/readiness/kingdom-hearts-02.md:84` — 7. Pass the grounded Data Jiminy cases with source/version context and honest answers for unresolved facts.
- `ai_docs/readiness/kingdom-hearts-02.md:86` — These are required future validations, not claimed completed tests.

### `ai_docs/implementation/kh02-rollout.md`

- `ai_docs/implementation/kh02-rollout.md:5` — Read the refinement playbook, dedicated 0.2 specification/readiness and all four research inventories. Preserve Aqua-only scope separately from BBS; HD 2.8 remains collection metadata. Use category destinations, compact single-column expandable rows, independe…
- `ai_docs/implementation/kh02-rollout.md:14` — - All 51 earned wardrobe items use stable cosmetic-name IDs and separate ownership checks. Objective completion does not silently mark ownership or vice versa. Plain remains a default Pattern, not a fabricated earned collectible.
- `ai_docs/implementation/kh02-rollout.md:21` — Objective13 retains the 30/50 Lightning kill conflict. Objective15 retains the simultaneous-shatter question; no hidden numeric rail or travel threshold is invented. World Within's paired Potion/Hi-Potion routes expose the unresolved contents crosswalk. Pisces…
- `ai_docs/implementation/kh02-rollout.md:23` — The app's manual completion flags do not implement objective numeric counters, automatic game-state inference, equipped wardrobe, difficulty/run lineage or NG+ migration. These richer state features are remaining scope, documented here rather than represented …
- `ai_docs/implementation/kh02-rollout.md:27` — Generation asserts all inventories, unique IDs, exactly55 physical units and world totals11/21/16/7. 'git diff --check' passes. Full TypeScript checking currently reports only the unrelated missing './kh3' module in the root-owned registry, with no 0.2 errors.…

### `ai_docs/sources/khtables-drive-audit.md`

- `ai_docs/sources/khtables-drive-audit.md:13` — | KHBBS Tables | Google Sheet | Birth by Sleep Final Mix | High | Extract domain model and verify all facts |
- `ai_docs/sources/khtables-drive-audit.md:14` — | KH FM TABLES | Google Sheet | Kingdom Hearts Final Mix | High | Extract completion categories and candidate records |
- `ai_docs/sources/khtables-drive-audit.md:17` — | KH2 SETUP | Google Doc | Kingdom Hearts II Final Mix | Medium | Schema and data dump with TODOs |
- `ai_docs/sources/khtables-drive-audit.md:20` — | Kh2FM tables | Google Sheet | Kingdom Hearts II Final Mix | High | Extract candidate datasets and gaps |
- `ai_docs/sources/khtables-drive-audit.md:26` — The old database work models relationships that remain product-relevant:
- `ai_docs/sources/khtables-drive-audit.md:49` — - Some intended tabs are empty.
- `ai_docs/sources/khtables-drive-audit.md:50` — - TODO comments explicitly acknowledge missing areas and weak sources.
- `ai_docs/sources/khtables-drive-audit.md:56` — - Several datasets are broad but incomplete.
- `ai_docs/sources/khtables-drive-audit.md:58` — - Controller-button glyphs are missing from some Dream Drop Distance descriptions.
- `ai_docs/sources/khtables-drive-audit.md:64` — For each candidate record:
- `ai_docs/sources/khtables-drive-audit.md:68` — 3. Verify the fact against an acceptable source.
- `ai_docs/sources/khtables-drive-audit.md:73` — 8. Preserve uncertainty explicitly until resolved.

### `ai_docs/02-content-inventory.md`

- `ai_docs/02-content-inventory.md:50` — | Objective tracker | 0.2 | Which objectives remain and how are they completed? | Objectives, unlocks, conditions, rewards | High | Independent from BBS progression |

### `ai_docs/games/README.md`

- `ai_docs/games/README.md:63` — Every game inherits [Persistent Checklists and Player Progress](../content/persistent-checklists-and-progress.md) and the [collectible compendium and linked-view contract](../content/collectible-compendium-and-linked-views.md). World-grouped compact slots and …
- `ai_docs/games/README.md:71` — [Five game research assignments](../research/parallel-game-research.md) cover KH2FM, BBSFM, 0.2, DDD HD and KH3/Re Mind. Each starts with the user's existing source records, then documents edition-correct findings, citations and unresolved inventory/verificati…
- `ai_docs/games/README.md:75` — Every game inherits [first-class synthesis and always-on inventory](../content/synthesis-and-inventory.md) where applicable, including owned/required recipe reminders and direct-ingredient farming targets, and [Apple-first app testing](../testing-and-content-v…

### `ai_docs/readiness/README.md`

- `ai_docs/readiness/README.md:3` — These are working readiness checklists and answer logs, not declarations that a game is ready. All specified games/features remain MVP unless explicitly deferred. KH1FM is the first detailed readiness assessment; parallel researchers are expanding the other ga…

### `ai_docs/implementation/multi-game-rollout.md`

- `ai_docs/implementation/multi-game-rollout.md:12` — - Collapsed drop/location summaries, Conditional labels, inline source details, target/owned/remaining quantities and no automatic stock consumption.
- `ai_docs/implementation/multi-game-rollout.md:13` — - Game-isolated IndexedDB profiles, atomic concurrent mutations, cross-tab refresh, resume links, backup import/export and pre-import recovery. Unknown stock remains distinct from zero; errors are visible.
- `ai_docs/implementation/multi-game-rollout.md:18` — Concurrency limits required running the game assignments in waves. Each game received a bounded implementation/review assignment; root owned shared integration, persistence, responsive styling and validation.
- `ai_docs/implementation/multi-game-rollout.md:31` — This is a functional review build, not a declaration that every game's research is complete. Some precise chest approach directions, hidden achievement conditions, complete enemy/equipment/synthesis catalogs and advanced game-specific calculators remain incomp…
- `ai_docs/implementation/multi-game-rollout.md:33` — The common presentation intentionally prioritizes browsable answers over separate detail pages. The recorded modal and world-category table alternatives remain backup approaches for the next human review.
- `ai_docs/implementation/multi-game-rollout.md:35` — ## Validation
- `ai_docs/implementation/multi-game-rollout.md:37` — Production build and type checking passed. All 76 unit checks passed, including new catalog identity/recipe integrity, atomic concurrent target additions, recovery, game isolation, quantity validation and family sorting checks. The targeted integration rerun p…
- `ai_docs/implementation/multi-game-rollout.md:39` — Desktop and phone screenshots were inspected; corrected cramped mobile filters, desktop paper padding and the inherited empty assistant dock. This is Chromium phone emulation, not a claim of physical iPhone/Safari testing.
- `ai_docs/implementation/multi-game-rollout.md:43` — Work is committed on 'feat/refined-game-guides' for review and remote backup. The deployed master branch remains the previously approved KHFM refinement build.

### `ai_docs/testing-and-content-validation.md`

- `ai_docs/testing-and-content-validation.md:1` — # Testing and content validation
- `ai_docs/testing-and-content-validation.md:11` — Content still needs cited, edition-correct sources, reconciliation of contradictory values, schema/reference checks, inventory counts and independently checked calculation fixtures. Do not label a source-backed fact “in-game tested” without such evidence. Reso…
- `ai_docs/testing-and-content-validation.md:29` — - Scope isolation, grouped-item counts, filters, resume, undo, export/import, migrations and failed writes behave correctly.
- `ai_docs/testing-and-content-validation.md:31` — - Offline installation/readiness, cold relaunch, interrupted downloads, safe updates, local inference and missing-data responses work on the initial matrix.
- `ai_docs/testing-and-content-validation.md:32` — - Readable dense tables, touch/keyboard access and accessible names/states work without production images; optional-media fixture tests remain in scope.
- `ai_docs/testing-and-content-validation.md:34` — - No Available Now filter, ability/story milestone questionnaire or progression-gate tracker. Required abilities/access conditions remain plain acquisition guidance.
- `ai_docs/testing-and-content-validation.md:38` — Passing app tests does not certify unverified guide facts. Conversely, source validation does not require the user to test facts while playing. Record research, structured-data validation, app implementation and executed app acceptance separately. This superse…

### `ai_docs/implementation/human-feedback.md`

- `ai_docs/implementation/human-feedback.md:203` — Verification: production build and type check passed; all 72 standard browser cases passed, with two optional heavyweight model tests skipped. After final cosmetic adjustments, all 28 affected desktop/phone cases passed again. A route sweep covered 214 desktop…

Caveat occurrence index: **161 source lines**. This is a lexical backstop after the structural/manual audit, not the finding count.

## Coverage inventory and exclusions

Full game-owned source/data files were inspected, including all records using structured scans for large JSON/TypeScript artifacts. Shared and related-game files were searched and relevant sections/context inspected; their unrelated game content is outside this audit. No files were edited except this game's audit report.

- `ai_docs/01-product-vision-and-scope.md:1` — 106 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/02-content-inventory.md:1` — 82 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/03-information-architecture.md:1` — 145 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/05-technical-architecture.md:1` — 126 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/07-decision-log.md:1` — 364 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/content/collectible-compendium-and-linked-views.md:1` — 91 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/content/persistent-checklists-and-progress.md:1` — 113 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/content/synthesis-and-inventory.md:1` — 53 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/data-jiminy.md:1` — 157 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/games/README.md:1` — 85 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/games/bbsfm/README.md:1` — 20 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/games/bbsfm/challenges-and-unlocks.md:1` — 95 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/games/bbsfm/collectibles-and-reports.md:1` — 74 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/games/bbsfm/source-manifest.json:1` — 1066 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/games/birth-by-sleep-final-mix.md:1` — 181 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/games/dddhd/README.md:1` — 42 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/games/dddhd/rewards-and-achievements.md:1` — 125 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/games/dddhd/sources.md:1` — 76 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/games/kh02/README.md:1` — 20 lines; full game-owned evidence/runtime.
- `ai_docs/games/kh02/collectibles.md:1` — 123 lines; full game-owned evidence/runtime.
- `ai_docs/games/kh02/objectives-and-wardrobe.md:1` — 96 lines; full game-owned evidence/runtime.
- `ai_docs/games/kh02/replay-challenges-achievements.md:1` — 90 lines; full game-owned evidence/runtime.
- `ai_docs/games/kh02/sources-and-gaps.md:1` — 79 lines; full game-owned evidence/runtime.
- `ai_docs/games/kh1fm/synthesis-farming-and-equipment.md:1` — 120 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/games/kingdom-hearts-02.md:1` — 71 lines; full game-owned evidence/runtime.
- `ai_docs/implementation/human-feedback.md:1` — 213 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/implementation/kh02-rollout.md:1` — 27 lines; full game-owned evidence/runtime.
- `ai_docs/implementation/multi-game-rollout.md:1` — 43 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/implementation/ui-ux-review.md:1` — 47 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/readiness/README.md:1` — 36 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/readiness/birth-by-sleep-final-mix.md:1` — 79 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/readiness/dream-drop-distance.md:1` — 85 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/readiness/kingdom-hearts-02.md:1` — 86 lines; full game-owned evidence/runtime.
- `ai_docs/research/bbsfm-2026-09-28-coverage-and-gap-research.md:1` — 184 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/research/bbsfm-category-scope-matrix-2026-09-28.md:1` — 109 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/research/parallel-game-research.md:1` — 33 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/research/recom-2026-09-28-coverage-and-gap-research.md:1` — 71 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/sources/khtables-drive-audit.md:1` — 84 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/testing-and-content-validation.md:1` — 38 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/ui/jiminys-journal-design-direction.md:1` — 230 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/ui/kh1fm-new-ui-plan.md:1` — 232 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/ui/kh2fm-new-ui-plan.md:1` — 70 lines; shared/related context or lexical discovery; relevant sections only.
- `ai_docs/ui/references/recom/source-manifest.json:1` — 531 lines; shared/related context or lexical discovery; relevant sections only.
- `games/bbs.html:1` — 75 lines; shared/related context or lexical discovery; relevant sections only.
- `games/khfm.html:1` — 5223 lines; shared/related context or lexical discovery; relevant sections only.
- `src/App.tsx:1` — 1159 lines; shared/related context or lexical discovery; relevant sections only.
- `src/components/EntryMedia.tsx:1` — 161 lines; shared/related context or lexical discovery; relevant sections only.
- `src/games/bbsfm/content.json:1` — 27077 lines; shared/related context or lexical discovery; relevant sections only.
- `src/games/bbsfm/generate.py:1` — 158 lines; shared/related context or lexical discovery; relevant sections only.
- `src/games/kh02.ts:1` — 28 lines; full game-owned evidence/runtime.
- `src/games/kh02/catalog.ts:1` — 2692 lines; full game-owned evidence/runtime.
- `src/games/kh02/generate.py:1` — 86 lines; full game-owned evidence/runtime.
- `src/games/registry.ts:1` — 12 lines; shared/related context or lexical discovery; relevant sections only.
- `src/games/types.ts:1` — 40 lines; shared/related context or lexical discovery; relevant sections only.
- `src/jiminy/retrieval.ts:1` — 312 lines; shared/related context or lexical discovery; relevant sections only.
- `tests/e2e/multi-game.spec.ts:1` — 106 lines; shared/related context or lexical discovery; relevant sections only.
- `tests/multi-game.test.ts:1` — 78 lines; shared/related context or lexical discovery; relevant sections only.
- `tools/content/import-reference.source.json:1` — 19051 lines; shared/related context or lexical discovery; relevant sections only.

No independent facts were taken from generated browser bundles, image assets, untracked work, external private files or newly fetched pages. Cross-game BBS Secret Episode/DDD/0.2 mentions were used only to enforce game boundaries. Source URLs and local links were inspected as provenance strings; external reachability and live source changes were not checked in this existing-evidence audit.

## Consistency results

- 175 catalog IDs are unique; 51 objective numbers each have a matching earned wardrobe entry. Physical counts reconcile to 55 and world totals 11/21/16/7.
- All 12 Zodiac views reuse existing chest IDs; objective 42 reuses its challenge identity. There is no duplicated 13th relic or earned Plain reward.
- No empty/null literal runtime field was found; structural absence of aliases/native platform IDs/normalized counters is reported separately rather than treated as a known negative.
- 19 ordinary source-table rows cite multiple evidence codes; their route-source citations are lost by the generator, as recorded in KH02-017 and Appendix B.
- Existing tests at `tests/multi-game.test.ts:18–33` and `tests/e2e/multi-game.spec.ts:1–35`, `tests/e2e/multi-game.spec.ts:94–108` check catalog/app behavior, not independent objective thresholds or route correctness.

Local Markdown link targets within the game research pack all resolve. Literal `0.2` matches in package versions, unrelated KH1 statistics and BBS prototype metadata were inspected as search false positives and excluded from game coverage.
