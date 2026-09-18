# KH1FM world inventory and research coverage

Research date: 2026-09-18. This is the remaining-work ledger for the sourced planning pass. It distinguishes a researched game rule, a transcribed planning table, a normalized app dataset and an in-game-verified record. These are different milestones.

## Release baseline

Use KH1 Final Mix in **Kingdom Hearts HD 1.5 + 2.5 ReMIX**, with Steam as an official, inspectable reference for package contents and achievement wording. This research choice does not answer the user's open question about their first gameplay/device validation target or exclude other modern releases. [Official Steam package](https://store.steampowered.com/app/2552430/KINGDOM_HEARTS_HD_15_25_ReMIX/)

The content is Final Mix; original KH and PS2-era compatibility remain out of scope. Source tables often mix versions and sequels. Select KH1FM annotations and the KH1 section explicitly. PS3-only achievement or control behavior must not become the modern default. Keep modern platform achievement IDs and observed differences in a separate mapping. [Final Mix changes](https://www.khwiki.com/Kingdom_Hearts_Final_Mix), [modern collection changes](https://www.khwiki.com/Kingdom_Hearts_HD_1.5_%2B_2.5_ReMIX)

## World source atlas

These pages were inspected for treasure, reward, prerequisite and revisit coverage. They are the inventory sources for the next extraction pass, not a statement that all their rows have already been ingested. Each area's final guide needs exact directions and dependency IDs beyond the source table's room label.

| World / inspected source | Required inventory and notable rules |
|---|---|
| [Destiny Islands](https://www.khwiki.com/Game:Destiny_Islands) | Raft/supply items, Protect Chain alcove, sparring, race/Pretty Stone, Kairi's supply rewards. Capture day-specific availability and temporary objectives separately from permanent collection. |
| [Traverse Town](https://www.khwiki.com/Game:Traverse_Town) | Chests, shop-stock phases, Gizmo/Postcards, Dalmatians and turn-ins, workshop, Geppetto, spell/summon reward NPCs. The same action can open access and yield a collectible; avoid duplicate checks for one event. |
| [Wonderland](https://www.khwiki.com/Game:Wonderland) | Bizarre Room orientations, Lotus Forest flowers, evidence, Tea Party Garden, Trinities and changed puppy placements. Evidence is pre-trial; Rabbit Hole rewards vary by story phase. |
| [Olympus Coliseum](https://www.khwiki.com/Game:Olympus_Coliseum) | Grounds chests, torch interactions, training, preliminary tournament, four cups/variants, Gold/Platinum. Blizzara/Blizzaga torch rewards and the pot reward must not disappear behind a “cups only” checklist. |
| [Deep Jungle](https://www.khwiki.com/Game:Deep_Jungle) | Tree House/cliff/waterfall chests, slides, camp experiments, gorilla rescues, Trinities, both minigames. Memo/recipe interactions can award consumables outside chests. |
| [Agrabah](https://www.khwiki.com/Game:Agrabah) | City and Cave of Wonders chests, pillar/waterway access, Torn Page, Trinities, Pot Scorpion, Kurt Zisa. Preserve room names and vertical-level routes. |
| [Monstro](https://www.khwiki.com/Game:Monstro) | Mouth/chambers/throat/stomach, changing water access, High Jump chest, Watergleam, Torn Page, Trinities, Grand Ghost. Chamber number alone is inadequate route guidance. |
| [Atlantica](https://www.khwiki.com/Game:Atlantica) | Clams and chests, spell-gated red/blue/yellow shells, dolphin/current routes, Crystal Trident, Torn Page, White Trinity. Model clams as treasure containers without assuming every container is a conventional chest. |
| [Halloween Town](https://www.khwiki.com/Game:Halloween_Town) | Lab/Mayor puzzle, doorbell reward, elevated chests, manor-to-ruins relocation, red/white Trinities, Torn Page, Chimera. Preserve pre/post-destruction locations for the same reward. |
| [Neverland](https://www.khwiki.com/Game:Neverland) | Ship rooms, flight, Yellow Trinity hold, White Trinity deck, twelve clock doors, Phantom, Jet Balloon. The tower becomes unavailable during Phantom's occupation. |
| [Hundred Acre Wood](https://www.khwiki.com/Game:100_Acre_Wood) | Page episodes, five record games, Rare Nuts, campfire/log/tree interactions and Final Mix EXP Ring. Include incidental treasures in addition to episode rewards. |
| [Hollow Bastion](https://www.khwiki.com/Game:Hollow_Bastion) | Waterway/bubble puzzles, emblem pieces, Library books, lift switches, Gravity platforms, post-rescue rewards and Unknown. A Library route unlocks the Lift Stop puppy chest. |
| [End of the World](https://www.khwiki.com/Game:End_of_the_World) | Final Dimension encounters, Giant Crevasse, World Terminus replicas/laboratory, Linked Worlds and Final Rest. FM Meteor Strike is in Giant Crevasse; Mighty Shield is in Neverland's Terminus replica. |

Dive to the Heart additionally needs starting-choice and EXP-curve instructions. Treat it as onboarding/progression content even though it is not a normal revisitable collectible world. [Starting area](https://www.khwiki.com/Dive_to_the_Heart)

### Verified examples that affect route design

- **Destiny Islands:** the Protect Chain is in the Cove alcove reached using a box. First-day Riku sparring and the later race are separate activities. Do not label all early-world activities freely revisitable. [Area inventory](https://www.khwiki.com/Game:Destiny_Islands)
- **Wonderland:** Stench and Claw Marks are available before the trial. The Rabbit Hole has story-phase-dependent rewards. The comprehensive reward catalog must model those phases; the app cannot infer “all rewards” from a single late-game visit. [Treasure conditions](https://www.khwiki.com/Game:Wonderland)
- **Hollow Bastion:** freeze the Waterway bubble to reach the Dark Matter chest. Lower floating puppy platforms with Gravity; link the Library puzzle to the Lift Stop route. [Treasure conditions](https://www.khwiki.com/Game:Hollow_Bastion)
- **End of the World:** the Hollow Bastion laboratory visit in World Terminus becomes inaccessible after its event; flag its Elixir before proceeding. The other Terminus locations have different revisit behavior. [World layout/revisit rule](https://www.khwiki.com/End_of_the_World), [laboratory chest contents](https://www.khwiki.com/Game:End_of_the_World)

“Missable” must be a record-level fact. A missable chest containing a replaceable consumable differs from a permanently lost unique item, a temporary quest item, a restricted-run achievement, or a temporarily inaccessible room. Do not claim that Final Mix has no missables simply because the red Trinity was fixed.

## Coverage against readiness IDs

| ID | What this pass supplies | Remaining work before content is complete |
|---|---|---|
| D01 | World atlas; key ability/color unlocks; important phase changes | Full area graph, earliest-access flags and text routes |
| D02 | Inspected per-world treasure/reward sources; specific missability examples | Extract every FM container/reward; deduplicate interactions; reconcile per-area totals |
| D03 | 33-group/99-puppy denominator, milestone rewards and relocated-group corrections | Import/check every group and exact route against legacy data |
| D04 | 46-mark denominator, color counts/unlocks, party condition and missability correction | Import all locations/rewards; reconcile story marks and chest relations |
| D05 | All ten acquisition slots and ten mailing rewards | Expand Gizmo route into exact steps; verify acquisition/mailing state transitions |
| D06 | Five page sources, episode rewards, Cheer thresholds, Rare Nut rewards | Exact activity tutorials, nut/treasure routes and all record-entry conditions |
| D07 | Journal section taxonomy and all 13 Report acquisitions | Full Chronicles, Characters I/II and Heartless entry/update manifests |
| D08 | All 33 recipe ingredient rows; six unlock sets; recalculated direct material totals | Resolve C01 below, reconcile workbook, verify in game and normalize |
| D09 | Ordinary base sources, ten special-material encounters, reset/modifier rules and mushroom rewards | Every source alternative, spawn room, phase, conditional roll and farming route |
| D10 | 18 Keyblades, 15 staves, 15 shields with acquisition paths; shop prices/stages | Complete accessory/item catalog and all stats/effects; achievement membership |
| D11 | Movement unlocks and FM level landmarks; separate choice/EXP variables | Full level/stat/EXP matrix; resolve duplicate legacy level-15 row |
| D12 | 21 magic acquisitions and six summon acquisition paths | Normalize dependencies; test alternate acquisition orders |
| D13 | Four cups, solo/time variants, unlocks and FM rewards; linked seed tables | Transcribe all rounds and intermediate rewards; confirm checkpoints |
| D14 | Five endgame encounter summaries with rewards/mechanics | Exact Unknown earliest unlock; complete strategy validation and other encounter records |
| D15 | Jungle Slider/Vines/training/Pooh/clock/mushroom coverage | Full minigame entry manifest, exact tutorials and contextual world interactions |
| D16 | All 30 mission objectives; complete 48-blueprint roster by source class | Mission 1/2 reward rows, route-specific enemy drops, all parts, working build guides |
| D17 | Modern stacking, restricted-run conditions, threshold-vs-full-collection distinctions | Exact platform ID lists and requirement predicates; tricky run behavior |
| D18 | Standard/Proud/Beginner secret-ending conditions | Validate goal predicates against a modern save; distinguish theater availability |
| D19 | Separate goal sets, event/group counting rules and recipe dependencies | Implement membership records, cross-links and acceptance fixtures |

## Facts still requiring targeted resolution

These remain research/validation tasks for the agent, not questions asking the user to remember game facts.

| ID | Specific issue | Evidence / resolution needed |
|---|---|---|
| KH1-C01 | Energy Bangle Spirit Shard quantity conflicts across two source pages | Dedicated [recipe](https://www.khwiki.com/Energy_Bangle) says 2; [material summary](https://www.khwiki.com/Spirit_Shard) says 1. Current planning calculation uses 2 provisionally; check modern recipe screen. |
| KH1-C02 | Earliest Unknown portal appearance | [Battle source](https://www.khwiki.com/Game:Xemnas) establishes mechanics/rewards; exact story flag still needs reliable evidence. |
| KH1-C03 | Restricted-run edge cases | [Achievement descriptions](https://steamcommunity.com/stats/2552430/achievements/) do not establish party-equipment scope, scripted exceptions, reload handling or pause/timer semantics. Validate before prescribing a route. |
| KH1-C04 | Exact Journal entry/update manifest | [Journal source](https://www.khwiki.com/Jiminy%27s_Journal) establishes categories; enumerate every required entry and trigger, including updates to an existing character. |
| KH1-C05 | Wonderland Gummi mission 2 wording | [Mission source](https://www.khwiki.com/Gummi_Missions) uses ambiguous wording for Haste blocks; verify whether the in-game requirement is activation count before implementing its predicate. |

## Counts and provenance discipline

Transcribed here: 33 recipes, 10 postcard acquisition slots, 13 Report numbers, 21 magic acquisition events, 6 summons, 30 Gummi objectives, 48 blueprint names and 48 obtainable party weapons. Expected source counts additionally include 33 puppy groups, 46 Trinities and 5 Torn Pages. A grouped table row may represent more than one record; expand it explicitly during import.

No app database was populated by this pass. Full treasure, Journal-entry, accessory, enemy/stat and level-row totals remain **unmeasured**, not zero. No row has been hands-on verified by this research pass. Counts above describe planning coverage and source inventories only.

Most game-mechanic evidence here is from KHWiki, a community reference; its version annotations and occasional inconsistencies need review. Steam provides primary evidence for the modern package and public achievement wording. Store `source_url`, `checked_at`, `ruleset`, `evidence_kind`, `verification_status` and any unresolved conflict with each imported record. Retain original concise instructions rather than copying source guide prose.

## Offline and Data Jiminy implications

Package the actual verified records and authored directions with the game content. Citation links are provenance users can open when online; they must not be the only place an answer exists. Data Jiminy must return a known record's location/prerequisites or a clear unknown status. It must not turn a research lead, ambiguous source or unresolved field into a confident answer. App code performs recipe and completion calculations.

All remaining rows above are MVP work. Screenshots remain optional media fields and test fixtures until real assets are supplied; no missing text route can be deferred because a screenshot might eventually explain it.
