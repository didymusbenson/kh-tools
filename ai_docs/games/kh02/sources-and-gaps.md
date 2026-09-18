# 0.2 evidence manifest and unresolved research

Audit date: 2026-09-18. Evidence is **documented research**, not a current-build play test. Factual inventories are paraphrased/normalized; no production screenshot or map assets were acquired. Primary sources establish collection/release/platform facts; community sources supply gameplay conditions and text routes. A complete source list is not equivalent to a complete validated dataset.

## Existing sources inspected first

| Source | Inspected coverage | Result |
|---|---|---|
| KHTABLES inventory supplied to the research swarm | All 10 inventory entries and their grounded file IDs/MIME types | KH1, KH2, BBS and DDD sources; no named 0.2 source |
| [KHTABLES repository audit](../../sources/khtables-drive-audit.md) | Full document | No 0.2 dataset described; legacy SQL/data cannot be relabeled as 0.2 |
| [BBS family spec](../birth-by-sleep-final-mix.md) | Full document, especially embedded 0.2 discovery section | Prior requirements were prose scope, not an item inventory; dedicated spec now owns those requirements |
| [Original readiness record](../../readiness/kingdom-hearts-02.md) | Full stub before replacement; blob `69998aa4c39303f7d98d70227d7a7bb768b2f53b` | All gates unaudited, no existing numbered user questions/answers to preserve |
| Repository recursive tree at `1d23c5d3da810285c5fecc11c1926118348025f8` | All 91 paths; API `truncated:false` | No `AGENTS.md`, dedicated 0.2 spec, 0.2 data module or 0.2 implementation found; BBS melding/HTML is not 0.2 data |
| `games/bbs.html` | Entire file; blob `c1ba71e24f08c4503dad028a11a6c0b01e6370d5` | Placeholder family menus, no 0.2 acquisition records |
| [KHBBS Tables workbook](https://docs.google.com/spreadsheets/d/10P_1nFwhUHGAf6IJkzjkdgN7bB3u4S8REp6okXv7v4U/edit) | **Delegated actual-range read by the parallel BBS researcher:** `command_melding!A1:Y990`, `Synthesis!A1:Z999`, `Sheet3!A1:B1000` | 298 occupied melding rows (296 recipe-result rows + two headers, with a 16×7 helper/matrix), 10 synthesis rows (9 crystals + header), 151 command rows (150 + header). Researcher confirmed no 0.2 records. This 0.2 agent did not independently re-read those ranges. |

Absence is bounded to the supplied inventory, audited repository and these inspected sources. It does not assert that no private 0.2 notes exist elsewhere. There is no legacy migration dataset for 0.2 in this audit; new structured content must be authored from the researched inventory.

## Primary sources inspected

| ID | Source | Supported facts / limits |
|---|---|---|
| P01 | [Square Enix HD 2.8](https://www.square-enix.com/kingdomhearts/2_8/us/) | Three collection experiences; playable Aqua 0.2 scope. Not a treasure/objective database. |
| P02 | [Steam store](https://store.steampowered.com/app/2552440/KINGDOM_HEARTS_HD_28_Final_Chapter_Prologue/) | 2024-06-13 release, Japanese/International save incompatibility, 69 collection achievements. |
| P03 | [Steam official achievement listing](https://steamcommunity.com/stats/2552440/achievements/) | Entire list inspected, 15-entry 0.2 subset matched by name; five hidden story descriptions not exposed publicly. |
| P04 | [Epic listing](https://store.epicgames.com/en-US/p/kingdom-hearts-hd-2-8-final-chapter-prologue) | Windows release 2021-03-30; does not establish an Epic achievement manifest. |
| P05 | [Nintendo cloud listing](https://www.nintendo.com/us/store/products/kingdom-hearts-hd-2-8-final-chapter-prologue-cloud-version-switch/) | Cloud edition, 2022-02-10 release and network-dependent game. |
| P06 | [Square Enix Collection announcement](https://www.jp.square-enix.com/kingdom/collection/) | Native Switch 2/PS5/Xbox Series/Microsoft Store Windows HD 2.8 planned for 2026-10-08; unreleased at audit date. |
| P07 | [Square Enix Japanese cloud notice](https://support.jp.square-enix.com/news.php?drt=1781017200&id=19066&la=0&n=2&tag=ab4073e28135a1345b861beefd8b6a2c459e1ed4) | Japanese notice: sales ended 2026-06-09, service ends 2027-06-09, both 23:59 JST; digital-edition save-transfer policy. No hands-on migration verification. |

## Gameplay sources inspected

| ID | Source and section | Extracted coverage |
|---|---|---|
| C01 | [KHWiki Wardrobe (KH0.2)](https://www.khwiki.com/Wardrobe_(KH0.2)) | Full 51-objective/unlock/reward table and wardrobe slots/defaults; complete reward join in companion. |
| C02 | [KHWiki Game:Realm of Darkness, 0.2 section](https://www.khwiki.com/Game:Realm_of_Darkness#Kingdom_Hearts_0.2_Birth_by_Sleep_-A_fragmentary_passage-) | Full 41-chest inventory and contents: 29 ordinary, 12 Zodiac. Select 0.2, not neighboring KH1/BBS tables. |
| C03 | [KHWiki Zodiac symbols](https://www.khwiki.com/Zodiac_symbols) | Twelve relics, areas, post-clear and NG+ retained/open-chest rule. |
| C04 | [KHWiki Realm of Darkness](https://www.khwiki.com/Realm_of_Darkness) | 0.2 area topology/names and subareas. |
| C05 | [KHWiki Game:Phantom Aqua](https://www.khwiki.com/Game:Phantom_Aqua) | Story/secret-boss distinction, red-aura attack advice. Page flags incomplete stats/strategy; no certified numerical boss dataset. |
| C06 | [KHWiki Difficulty Level, 0.2 section](https://www.khwiki.com/Difficulty_Level#Kingdom_Hearts_0.2_Birth_by_Sleep_-A_fragmentary_passage-) | First-clear Critical unlock and mode-specific damage/survival differences. |
| C07 | [KHWiki Trophies, 0.2 section](https://www.khwiki.com/Trophies#Kingdom_Hearts_0.2_Birth_by_Sleep_-A_fragmentary_passage-) | Fifteen trophy/achievement entries, hidden story requirements, Xbox-score leads; no 0.2 Platinum entry. |
| C08 | [KHWiki 0.2 game article](https://www.khwiki.com/Kingdom_Hearts_0.2_Birth_by_Sleep_-A_fragmentary_passage-) | Released PS4/Xbox chronology; Command Menu instead of BBS Command Deck, one Shotlock, level-50 starting point, teleport/replay overview. |
| C09 | [PSU complete objectives](https://www.psu.com/news/kingdom-hearts-0-2-objectives-guide-complete-all-challenges/) | All 51 conditions, four memories, NG+ guidance, #36/#50 distinction, levels resetting; conflicts retained. |
| C10 | [PSU Excellent Aim](https://www.psu.com/news/kingdom-hearts-0-2-how-to-complete-objective-18-excellent-aim/) | 28-lock bonus, consecutive Excellent prompts across attacks; streak nuance. |
| C11 | [PSU Gem Gatherer](https://www.psu.com/news/kingdom-hearts-0-2-how-to-complete-objective-29-gem-gatherer/) | All seven gem directions. Text mislabels the star-puzzle objective as #31; cross-check uses #30. |
| C12 | [PSU World Within chests](https://www.psu.com/news/kingdom-hearts-0-2-how-to-complete-objective-39-treasure-hunt-in-the-world-within/) | Eight ordinary chest routes; gravity-chest contents not individually matched. |
| C13 | [PSU Forest chests](https://www.psu.com/news/kingdom-hearts-0-2-how-to-complete-objective-44-treasure-hunt-in-the-forest-of-thorns/) | Ten ordinary routes; first two Uncertain Path, subsequent eight Rocky Path. Some route-to-item matching remains. |
| C14 | [PSU Depths chests](https://www.psu.com/news/kingdom-hearts-0-2-how-to-complete-objective-48-treasure-hunt-in-the-depths-of-darkness/) | Five ordinary text routes, cavern and final sand landmarks. |
| C15 | [PSU Zodiac](https://www.psu.com/news/kingdom-hearts-0-2-how-to-complete-objective-43-quest-for-the-zodiac/) | All twelve relic routes, area split 4/5/2/1. Pisces direction conflicts with C03. |
| C16 | [PSU In the Mirror](https://www.psu.com/news/kingdom-hearts-0-2-how-to-complete-objective-42-in-the-mirror/) | Five-round enemy sequence and restart-on-exit guidance. |
| C17 | [GameSkinny all objectives](https://www.gameskinny.com/tips/kingdom-hearts-28-guide-every-wardrobe-objective-in-02/) | All 51; chest-objective counts 9/13/12/6; #13=30; #08 reward alias. |
| C18 | [GameSkinny mine gems](https://www.gameskinny.com/tips/kingdom-hearts-28-guide-where-to-find-all-7-gems-for-objective-29/) | Independent seven-gem route, star puzzle #30. |
| C19 | [GameSkinny flowers](https://www.gameskinny.com/tips/kingdom-hearts-28-guide-how-to-find-the-3-flowers-for-objective-34/) | Three text routes and save-point return guidance; color-to-route crosswalk incomplete. |
| C20 | [GameSkinny mirror secrets](https://www.gameskinny.com/tips/kingdom-hearts-28-guide-how-to-find-all-the-secrets-in-the-world-within/) | Candles/fight, closed-reflection chest, star-platform puzzle. |
| C21 | [GameSkinny summit](https://www.gameskinny.com/tips/kingdom-hearts-28-guide-how-to-reach-the-highest-point-in-castle-town/) | Double jump/air movement, five gears, northern broken-arch/ledge ascent; only text-supported route lead, no extracted image map. |
| C22 | [Guiding Key objectives](https://guiding-key.tumblr.com/kh0.2-objectives) | Full 51 conditions; useful cross-check with noted #13/#15/#28 disagreements. |
| C23 | [Guiding Key locations](https://guiding-key.tumblr.com/kh0.2-locations) | Full chest/memory route list; guide route ordinals are not game Journal numbers, and contents are not exhaustively attached. |

Sources with incomplete access are **not** supporting proof: TrueAchievements walkthrough search excerpt suggests Gem Gatherer missability, but the full page could not be inspected; direct platform trophy/achievement pages were blocked; guessed PSU Castle Town treasure URL failed. No inability to open a page establishes a gameplay fact. The manifest above lists the evidence actually used, rather than every attempted search.

## Explicit discrepancy and completion queue

| ID | Question / missing evidence | Affected records | Required resolution |
|---|---|---|---|
| KH02-R01 | Master of Lightning says 30 in C01/C17, 50 in C09/C22 | Objective 13, Mystic Pauldron | Find current-version documentary evidence of text/counter; preserve version if different |
| KH02-R02 | Ice Breaker: five total versus five simultaneous shatters | Objective 15 | Verify exact runtime predicate; group strategy alone does not prove requirement |
| KH02-R03 | Open versus closed chest reflection | Objective 28, `ww-mirror-mega-ether` | Working answer closed is corroborated by three guides; seek corroborating evidence and retain correction history |
| KH02-R04 | “Defeat the Darkness” versus “Defeat the Darksides” | Objective 32 | Canonical working name Darksides, erroneous guide spelling retained as alias |
| KH02-R05 | “Divine Back” versus “Astral Ornament” | Objective 08 reward | Working canonical Astral Ornament; confirm localized name, no duplicate item |
| KH02-R06 | No numeric distance for Frozen Rail Ride or Dark Explorer | Objective 14 / achievement | Keep textual condition; find reproducible completion route, not a fabricated numeric threshold |
| KH02-R07 | Pillar Potion/Hi-Potion and several Forest item-to-landmark joins | Ordinary chests | Reconcile gravity states and Forest contents with documented location evidence; freeze IDs with migration mapping |
| KH02-R08 | Pisces initial-arrival versus end-of-stairs wording | `ww-pisces` | Verify exact staircase state and approach |
| KH02-R09 | Town memory building, Forest icon label, flower color mapping | Four memories / three flowers | Confirm precise textual landmarks and object/color labels |
| KH02-R10 | Gem re-entry/missability and run/NG+ retention | Gems, ordinary chests, memories, counters | Research cleared-save travel and seeded NG+ evidence; record each asset separately |
| KH02-R11 | Counter retroactivity, style/final-blow conditions and boss replays | Objectives 18/26/31/36/41/47/50 and late unlocks | Corroborate exact predicates; distinguish live story fight from Zodiac challenge |
| KH02-R12 | Platform-specific requirements/IDs/tiers and new 2026 editions | Fifteen platform goals | Verify current PSN/Xbox/Steam mappings, Epic availability, and new release after shipment |
| KH02-R13 | Combat-reference acquisition timing and strategy fixture validation | Magic/movement/Shotlock/styles/difficulty | Complete the 0.2-specific mechanics pack with version-aware documented strategy |

These are research/QA tasks, not questions the user must answer. Exact hidden counters need not become invented numbers; a verified, reproducible completion condition can be sufficient. Content validation is source reconciliation and data consistency, not a mandatory manual game playthrough. App functionality testing follows the shared validation contract. Only the distinct visual treatment needs user inspiration. No narrative transcript, biography manifest or ordinary story-step inventory is added as a release gate.
