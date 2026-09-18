# Kingdom Hearts 0.2 Birth by Sleep -A fragmentary passage-

Status: **Researched planning baseline; data reconciliation and implementation remain.** Audit date: 2026-09-18. This is the dedicated 0.2 specification. [Research index](./kh02/README.md) · [Readiness](../readiness/kingdom-hearts-02.md) · [BBS family](./birth-by-sleep-final-mix.md).

Ars Arcanum presents 0.2 as its own Aqua-only compendium and progress namespace within the BBS family. **HD 2.8 Final Chapter Prologue is collection metadata, not a separate game/checklist.** The official collection includes DDD HD, 0.2 and the Back Cover cinematic experience. [Square Enix collection page](https://www.square-enix.com/kingdomhearts/2_8/us/).

The accepted [collectible compendium and linked views contract](../content/collectible-compendium-and-linked-views.md) governs this spec. Primary tasks are finding a missing item, understanding its access condition and tracking the same acquisition consistently across compact and detailed views. Ordinary plot walkthroughs, biography flags and narrative Journal completion do not enter world percentages.

The app is fully spoilerific: show bosses, rewards, solutions and late content directly, without warnings, hiding or reveal controls. Do not implement an Available Now filter or story/access-gate tracking. Keep prerequisites as plain text on the relevant item. The optional [crafting and inventory policy](../content/synthesis-and-inventory.md) is **not applicable to 0.2**; this game has no BBS melding or synthesis tool to invent.

## Research-backed content scope

| Module | Candidate content | Required presentation |
|---|---|---|
| Area collectibles | 29 ordinary chests, 12 Zodiac chests, 7 mine gems, 3 flowers, 4 Lingering Memories: 55 physical records | Compact marks, detailed text routes, category counts and one shared state per record |
| Objectives | All 51 numbered objectives, area/unlock groups, counters and distinct boss predicates | Separate challenge progress; official objective numbers |
| Wardrobe | 51 earned cosmetics: 12 Head, 9 Arms, 9 Back, 21 Pattern; Plain default separate | Searchable acquisition index joined to the awarding objective; color settings separate |
| Optional encounters | Zodiac Mirror five-round challenge and encounter-specific objective conditions | Unlock route, strategy, difficulty and replay advice |
| Platform achievements | 15 0.2 goals inside the collection's platform lists | Independent overlay; platform availability/IDs must be verified |
| Combat/acquisition reference | Magic, movement, Prism Rain, Spellweaver, Wayfinder and difficulty rules needed by collectibles/objectives | Searchable mechanics and access requirements; no imported BBS melding/Command Deck system |
| Data Jiminy | Bundled 0.2 Coppermind and local SLM retrieval | Direct location/reward/condition answers with source and conflict visibility |

These counts are a researched candidate baseline, not a claim of in-game validation. Complete tables and unresolved mappings are in [collectibles](./kh02/collectibles.md), [objectives/wardrobe](./kh02/objectives-and-wardrobe.md), and [replay/challenges/achievements](./kh02/replay-challenges-achievements.md). Every specified module remains MVP. Only missing production screenshot/map image assets are deferred; media fields, image-free usability, support and tests remain MVP.

## Areas and collection accounting

| Area page | Physical units | Notes |
|---|---:|---|
| Castle Town | 11 | Includes the separate Main Road approach chest; the game's Castle Town chest objective counts 9 town chests, not that approach chest |
| The World Within | 21 | 13 chests + 7 gems + 1 memory |
| Forest of Thorns | 16 | 12 chests + 3 flowers + 1 memory; retain Uncertain Path, Rocky Path and Path's End labels |
| Depths of Darkness | 7 | 6 chests + 1 memory |
| Homecoming / Destiny Islands finale | No candidate collectible records | Objective 51 belongs here; do not fabricate a collectible denominator or show automatic 100% |

The above grouping is an Ars Arcanum area index within the Dark World. Do not imply four separate Disney worlds or official treasure Journal numbers. Treasure objectives use 9/13/12/6; the overall chest total is 1 Main Road + 9 + 13 + 12 + 6 = 41. Zodiac entries are facets of twelve chest records. Their relics, objective 43 and the mirror unlock do not add duplicate physical units. Gems and flowers count one each; their parent objectives and wardrobe rewards do not add world units. Filtered results never redefine a full-area denominator. Show explicitly named category totals and post-clear access labels.

## Data and saved-state requirements

Each collectible needs a stable acquisition ID, game/ruleset scope, character (`aqua`), area/subarea, category facets, editorial order, content/reward, exact text approach and action, access prerequisites, replay/missability evidence, source references, verification status and nullable media references. The candidate IDs in the location companion must be reconciled before freezing ambiguous route-to-content joins. Subsequent renames or order changes cannot erase progress.

Compact mark, expanded row, wardrobe reward references, category indexes, search and Data Jiminy resolve the same acquisition ID. Toggling either view updates all representations immediately and persists offline. Opening details is a separate accessible action from toggling. Save failure, rollback/retry, undo, import/export and schema migrations follow the [shared persistent progress contract](../content/persistent-checklists-and-progress.md).

Objective definitions additionally need official number/name, aliases, exact predicate, counter target where known, unlock dependencies, encounter scope, difficulty, reward ID and replay restrictions. Keep unknown thresholds explicitly unknown. Objective completion, run-local counters, permanent cosmetic ownership and equipped appearance are different state types. Do not automatically invent game-state carry behavior from the app's persistence model. A clear-data lineage and current run/difficulty must be distinguishable; platform account achievement state is independent.

The app is a manually maintained guide, not a game-save reader. Collection parents can derive their compendium completeness from shared child records while the game objective's reported completion remains an explicit state with its own conditions. A disagreement must be explainable rather than silently marking a reward owned. Never merge BBS Terra/Ventus/Aqua records with this game's Aqua state.

## Edition baseline and known differences

Use the modern Steam edition as the user's content baseline. The other rows preserve scoped modern-platform differences and release metadata.

| Edition | Evidence / treatment as of audit date |
|---|---|
| PS4 / Xbox One HD 2.8 | Earlier released modern versions; 0.2 launched on PS4 in 2017 and Xbox One in 2020. Source is a community chronology; native platform IDs still need extraction. [Game reference](https://www.khwiki.com/Kingdom_Hearts_0.2_Birth_by_Sleep_-A_fragmentary_passage-) |
| Epic Windows | Official listing dates release to 2021-03-30. Content parity and achievement availability need direct checks. [Epic listing](https://store.epicgames.com/en-US/p/kingdom-hearts-hd-2-8-final-chapter-prologue) |
| Steam Windows | Official release 2024-06-13. Store separates Japanese and International versions and says their save data cannot be transferred; preserve locale/version metadata. Collection has 69 platform achievements, of which the researched 0.2 subset is 15. [Steam store](https://store.steampowered.com/app/2552440/KINGDOM_HEARTS_HD_28_Final_Chapter_Prologue/) |
| Switch cloud version | Official listing describes an internet-dependent cloud game. This does not change Ars Arcanum's offline guide requirement. [Nintendo listing](https://www.nintendo.com/us/store/products/kingdom-hearts-hd-2-8-final-chapter-prologue-cloud-version-switch/) |
| Announced native Switch 2 / PS5 / Xbox Series / Microsoft Store Windows | Official Collection [I~III] announcement schedules 2026-10-08 and includes HD 2.8. **Announced/unreleased at audit date**; do not certify content parity, save migration or achievement IDs as shipped. [Square Enix announcement](https://www.jp.square-enix.com/kingdom/collection/) |

Square Enix's Japanese cloud-service notice reports sales ended 2026-06-09 at 23:59 JST, service closure scheduled 2027-06-09 at 23:59 JST and a digital-edition save-transfer offering. Keep region/source context, and distinguish an announced migration policy from a tested migration. [Official Japanese notice](https://support.jp.square-enix.com/news.php?drt=1781017200&id=19066&la=0&n=2&tag=ab4073e28135a1345b861beefd8b6a2c459e1ed4). Shared edition policy remains authoritative for navigation/support labels.

## Replay and completion boundaries

A first clear unlocks Critical and late exploration/objectives. Objectives 36–50 have clear-data availability, with #42 specifically requiring #43. Zodiac relics persist into NG+; other collection/counter carry behavior needs validation. Fresh first-run collection therefore cannot mean all 51 objectives. Objective #51 requires Critical, whereas the platform difficulty achievement accepts Proud or Critical. Certain boss conditions need a live story encounter/NG+; the Zodiac Phantom is not the third story Phantom targeted by #41. See the replay companion for exact distinctions and remaining recovery checks.

No inspected source establishes a separate secret-ending reward for all objectives. Do not import BBS secret-ending rules. Likewise, 51 wardrobe rewards and 15 platform goals are separate sets; a world collection percentage proves neither one.

## Acceptance and remaining work

The React offline PWA must demonstrate bidirectional compact/detail synchronization, stable IDs through sorting/updates, backup/restore, run/difficulty isolation, no duplicate Zodiac count, and full denominators under filters. Verify image-free text navigation and mobile accessibility, initially in the Apple browser on iPhone/iPad; Android follows. The user plays on Steam. Follow the [testing and content-validation contract](../testing-and-content-validation.md): test the app, with documentary content validation; do not require a manual game playthrough. Data Jiminy must answer the documented evaluation questions from the bundled pack, including an honest uncertain answer for the lightning threshold and gem returnability.

Research blockers are exact route/content joins for some chests, several localized memory/flower/Zodiac directions, objective 13's 30/50 discrepancy, objective 15 simultaneity, replay retention and platform details. These are enumerated in [sources and gaps](./kh02/sources-and-gaps.md). No app or pack implementation has been claimed. The distinct 0.2 visual treatment awaits the user's inspiration; the BBS family association does not approve a specific skin.
