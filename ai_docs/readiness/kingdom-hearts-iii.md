# Kingdom Hearts III readiness

Status: **Research baseline established; not implementation-ready.** Assessed 2026-09-18.

Specification: [Kingdom Hearts III](../games/kingdom-hearts-iii.md). Evidence: [KH3 research index](../games/kh3/README.md). Apply the [shared readiness/edition policy](README.md) and accepted [collectible compendium and linked-view contract](../content/collectible-compendium-and-linked-views.md), [synthesis/inventory contract](../content/synthesis-and-inventory.md) and [testing/content-validation contract](../testing-and-content-validation.md). All required modules remain MVP; only missing production screenshot/map images are deferred.

## Confirmed direction

- Acquisition compendium with synchronized compact marks and expanded detail rows backed by one stable record/state.
- World percentages measure collectibles, never plot, biography or ordinary conversation flags. Acquisition-specific access conditions remain visible.
- Dark digital Gummiphone-style menu; complete text instructions, responsive phone layouts, accessible controls.
- React offline PWA, persistent local progress, backup/update safety and bundled per-game Coppermind/Data Jiminy remain required.
- Base, free-update features, paid Re Mind episodes, platform extras and save lineage are explicit scopes.
- Steam is the user’s platform; initial functionality acceptance is Apple browser/iPhone/iPad, with Android follow-up. No user gameplay/playthrough gate.
- Spoilerific app without warnings/hiding/reveal controls. No Available Now, story-milestone or progress-gate tracking/filter. Text prerequisites remain.
- Optional opt-in inventory with owned/required x/y counts; synthesis is first-class with strong game-specific formula validation.

## Evidence and category matrix

| Category | Earlier baseline | Research added | Status / release gap |
|---|---|---|---|
| KHTABLES/repository | No identified KH3 source | Ten-file inventory + full returned-text scan of three ambiguous docs (466,933 chars); complete repo tree | Audited absence of reusable KH3 source; other-game sheet cells not re-audited |
| Base numbered chests | Scope only | 245 candidate records with contents/areas, per-world counts and contiguous source numbering | Identity inventory complete from community tables; all precise original routes and in-game numbering verification unfinished |
| Lucky Emblems | Scope only | 90 candidate records across nine worlds; rewards/access exceptions | Precise camera directions/first-visit conditions incomplete; Toy Box #8 floor conflict |
| Extra world collections | Scope only | Five Golden Herc Figure locations; ten Frozen Slider prizes identified separately | Frozen Slider full routes and Final World bonus acquisition rules unfinished |
| Re Mind chests | Scope only | Nine separate Scala records | All detailed routes/replay-missability/save behavior unfinished; never count in base 245 |
| Synthesis/materials | Scope only | 20 photo subject/reward identities; 58-type Ultima unlock; seven Orichalcum+ paths; selected drop rates | Complete recipes/quantities/collector goals/source catalogue and exact total still needed |
| Keyblades/equipment | Scope only | Acquisition anchors; full ten-step Kingdom Key fixture and calculated totals; DLC reward table | Complete blade/formchange/forge rows, staves/shields/armor/accessories and entitlement edges incomplete |
| Ingredients/cuisine | Scope only | 59 ingredient identities, 28 dish identities, 20-Classic-dish five-star rule | Full 59 sourcing routes, every recipe quantity/menu assignment, meal effects and farming guidance unfinished |
| Classic Kingdom | Scope only | All 23 acquisition identities, joined to 18 chest records and five Twilight Town unlocks | High-score success predicates and original play instructions require testing |
| Minigames/records | Scope only | Seven Flan upper thresholds; rank versus trophy comparison for five courses | Exact Flan equality, full Game Records/100 Acre Wood/Caribbean rewards unfinished |
| Battlegates/Reports | Scope only | 15 gate identities, 13 report links, first-clear rewards, Dark Inferno distinction | Routes, strategy and repeat-reward verification incomplete |
| Gummi | Scope only | Three zones; nine constellations; 10/17/6 map battle entries; global goal ladders, two boss access rules | Every treasure/sphere/fragment/part/blueprint/rank reward not yet normalized; full completion predicate unresolved |
| Re Mind/Limitcut/Secret | Scope only | Official feature list; 11→13 data lock, all 13 first-clear rewards; Yozora reward | Full prerequisite/start/resume/replay test matrix and encounter guidance unfinished |
| Premium Menu | Scope only | Per-save mode unlocks, 15 EZ/13 PRO identities counted, nine merits, maximum/A-rank points | Exact code predicates, trophy blocking, score replacement/rounding and uncertain rank-B value unresolved |
| Editions/achievements | Not audited | Primary Steam/DLC/cloud/future-release pages; 51 Steam achievements; visible predicates | All shipped build IDs and PS/Xbox/Epic sets require audit; 2026-10-08 editions **announced/unreleased** |
| Runtime/UX/Data Jiminy | No KH3 implementation | Domain contracts, examples and acceptance cases below | Not implemented or tested in this research task |

Detailed coverage and disagreements: [source manifest](../games/kh3/sources-and-conflicts.md). Candidate inventory coverage is not route completeness or production verification. No category receives a false “ready” merely because a source table exists.

## Critical corrections

1. 245 base chests + 90 emblems are distinct denominators; Re Mind’s nine chests, Frozen Slider’s ten prizes and Gummi treasure remain separate.
2. Forest Clasp is missable; the item/world sources disagree on the exact deadline. Use a conservative pre-Shore warning pending test. Photo Mission 20’s Rapunzel photo remains obtainable later.
3. 80 emblems yields Orichalcum+, while the full set is 90. Grand Chef requires 20 Excellent Classic dishes, whereas the recipe catalogue has 28.
4. Frozen Slider A rank is 500,000 versus a 600,000 achievement; Festival Dance is 50,000 versus 70,000; Verum Rex is 10 million versus 12 million.
5. Oathkeeper/Oblivion are free-update acquisitions. Premium Menu and the three Re Mind episodes require the DLC entitlement (bundled on some platforms).
6. Official sources now announce native 2026-10-08 editions and a cloud service sunset. Announced content is not a verified shipped build.

## Data and calculation acceptance fixtures

- Verify exact base sums per world: chests 32/10/29/28/22/25/56/36/0/6/1 = 245; emblems 12/9/11/9/11/11/13/11/3 = 90. Each within-world numbering set is contiguous in the community inventory.
- Toggle Toy Box chest 24 in compact view; expanded row and Classic Kingdom acquisition agree offline. Its high-score record remains independent.
- San Fransokyo emblem 3 retains its night text prerequisite and remains in the full denominator under search/category filters. Do not add an Available Now control or story-progress tracker.
- Kingdom Key 0→10: Fluorite 3, Damascus 3, Adamantite 3, Electrum 1; Wellspring Shards 9, Stones 6, Gems 6, Crystal 1. Level 3→6 costs only Damascus 3 + Stones 6.
- Ultima recipe is 7 Orichalcum+ plus two each Wellspring/Lucid/Pulsing Crystals. Four satisfied Orichalcum+ events leave three event sources, not an invented repeatable farm.
- Acquiring Corona chest 26’s cuisine does not mark an Excellent cooking record. Twenty Classic Excellent results can finish Grand Chef while Special Menu recipes remain.
- A base save with 245/245 chests remains complete when its Re Mind profile has 0/9. Temporary playable characters do not duplicate Sora’s world inventory.
- Gate 0 awards no report; gates 1–13 map to reports 1–13; gate 14’s Crystal Regalia differs from Yozora’s Crystal Regalia+.
- Acquiring one maxed Keyblade satisfies only its relevant achievement predicate, not the all-equipment goal.

## Offline and mobile acceptance

Verify compact/detail/search/Data Jiminy state agreement, undo, failed-write rollback/retry, reload offline, export/import, profile isolation, renamed-record migrations and cross-version backups. Clearing a filter must restore scroll context without changing denominators. Missing/unverified inventory never becomes a certified 100%. Screen readers must announce world/category/number/content/state and distinguish open-detail from toggle.

Verify every location is usable with images absent. Media placeholders must not create empty artwork columns. Character references cannot alter collection percentages. Do not add manually tracked access milestones.

## Data Jiminy evaluation set

Each answer must cite local record IDs and provenance and expose edition/uncertainty when relevant:

| Question | Required answer behavior |
|---|---|
| “Which Toy Box chest gives The Barnyard Battle?” | Chest 24/Kid Korral, linked record; route not invented from area-only evidence |
| “Why can’t I finish Olympus emblems on the first visit?” | Gummiphone/revisit prerequisite; category remains 12 |
| “I have 80 emblems. Am I finished?” | Orichalcum+ event achieved; ten of 90 remain |
| “Where can I farm Illusory Crystal?” | Battlegate 8 Demon Tower source; first-clear gate rewards separately |
| “Does my Sea Bass en Papillote+ chest count for Master Chef?” | Ownership and Excellent preparation are separate |
| “Is Oathkeeper paid DLC?” | Free-update Proof exchange; state clear + 90-emblem requirement |
| “Where are the last two data portals?” | Complete the initial eleven for Xion/Master Xehanort |
| “Does a 500,000 Frozen Slider score earn the trophy?” | A rank; trophy is 600,000; ten prizes separate |
| “Is Switch 2 supported as a shipped build?” | As of date, announced 2026-10-08; do not claim gameplay verification |
| “Can I still get Forest Clasp?” | Explain missable window and conflicting exact trigger, ask route state only if needed |

## User decisions and answer log

No blocking user decision identified. Accepted compendium focus, linked-state behavior, DLC separation, theme, Steam platform, spoilerific presentation, absence of Available Now tracking, optional inventory, Apple-first testing and MVP policy are already settled. Source disagreements, missing routes and exact game predicates are research tasks, not questions to push back onto the user.

No new questions were solicited. The parent relayed the accepted decisions above during this audit; they have been incorporated. Earlier stub contained no unanswered game-specific questions.

## Next required work

1. Finish original route text and reconcile numbered records using reliable modern sources/captures, starting with the documented conflicts and all nine Scala chests.
2. Normalize complete synthesis, material, equipment, cooking and Gummi acquisition graphs; calculate costs from edge quantities.
3. Verify base/Re Mind/Limitcut/Secret/NG+ save boundaries, Premium code eligibility and exact reward thresholds.
4. Read every supported shipped platform achievement set and build metadata; keep upcoming editions in announced status until available and tested.
5. Implement the shared offline linked-record contract and the KH3 dark menu, then run the meaningful functionality and calculation fixtures above plus source/route completeness checks. Do not make the user’s gameplay or a full playthrough a gate.
