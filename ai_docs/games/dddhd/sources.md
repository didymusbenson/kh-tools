# DDD HD inspected-source manifest

Audit: 2026-09-18. This records **what was inspected**, not blanket endorsement or in-game verification. Source classes: USER = user's legacy source, REPO = existing implementation/planning, PRIMARY = publisher/platform, COMMUNITY = third-party reference. All directions in planning prose are concise original summaries.

## Existing evidence inspected first

| Source | Coverage | Result |
|---|---|---|
| REPO: ai_docs/games/dream-drop-distance.md | Entire file on mobile-friendly | Existing scope preserved and clarified |
| REPO: ai_docs/readiness/dream-drop-distance.md | Entire file | Stub replaced with evidence-backed gaps |
| REPO: ai_docs/sources/khtables-drive-audit.md | Entire file | Discovery evidence, not production certification |
| REPO: recursive mobile-friendly tree; games/ddd.html | Tree and entire placeholder page | No DDD operational datasets; no AGENTS.md found in tree |
| USER: [KH3D DATABASE PROJECT](https://docs.google.com/spreadsheets/d/1dmSyrFQ30jOf8PTfwvhhnrLOlsq8vQm-ggfPLEo-Dyw/edit) | Metadata, header sentinels, bounded data rectangles, full large-table chunks and trailing ID checks | Exact sheetId/ranges and counts in [legacy audit](legacy-audit.md) |

Workbook metadata grid sizes: Spirit/common_lookup/Deck_Command/spirit recipe have 28 columns; ability 27; single/dual_link_attack 25; other tabs 26. Row grids are 1000 except common_lookup 999, dual_attack_recipe/Deck_Command 1001, spirit_unlocks 1124. Grid dimensions are not used-row counts. The user workbook was read-only throughout.

## Primary sources inspected

| Source | Inspected content | Supported use |
|---|---|---|
| [Square Enix Steam listing](https://store.steampowered.com/app/2552440/KINGDOM_HEARTS_HD_28_Final_Chapter_Prologue/) | About, release, language/save notice | Collection composition, Steam release 2024-06-13, Japanese/international save distinction |
| [Steam achievements](https://steamcommunity.com/stats/2552440/achievements) | Full published list | 69 application-wide entries; actual published selected thresholds; 0.2/DDD separation necessary |
| [Square Enix Collection](https://www.jp.square-enix.com/kingdom/collection/) | HD2.8 product section, platforms, announcement date | 2026-10-08 ports are announced, not shipped at audit |
| [Square Enix cloud notice](https://support.jp.square-enix.com/news.php?drt=1781017200&id=19066&la=0&n=2&tag=ab4073e28135a1345b861beefd8b6a2c459e1ed4) | Service/sales notice | Cloud lifecycle; no gameplay parity inference |

## Community sources inspected

All KHWiki sources below are secondary/community. Some contain cleanup tags, unknown values and original-3DS mechanics. They are evidence for candidate facts, not a substitute for independent HD checks.

| Source | Actual inspected section/range | Coverage / limitation |
|---|---|---|
| [Game:Traverse Town](https://www.khwiki.com/Game:Traverse_Town) | DDD treasures Sora 1–34 / Riku 1–32; Secret reward rows | 66 numbered records; all location notes blank |
| [Game:La Cité des Cloches](https://www.khwiki.com/Game:La_Cit%C3%A9_des_Cloches) | Sora 1–49 / Riku 1–34; rewards | 83 rows; HD Catanuki change and thorn gate |
| [Game:The Grid](https://www.khwiki.com/Game:The_Grid) | Sora 1–42 / Riku 1–45; rewards | 87 rows; upper/lower Docks, Solar Sailer |
| [Game:Prankster's Paradise](https://www.khwiki.com/Game:Prankster%27s_Paradise) | Sora 1–31 / Riku 1–22; rewards | 53 rows; inverted Monstro and Ferris wheel |
| [Game:Country of the Musketeers](https://www.khwiki.com/Game:Country_of_the_Musketeers) | Sora 1–32 / Riku 1–31; rewards | 63 rows; breakable walls, return route |
| [Game:Symphony of Sorcery](https://www.khwiki.com/Game:Symphony_of_Sorcery) | Sora 1–22 / Riku 1–21; rewards | 43 rows; all note fields blank |
| [Game:The World That Never Was](https://www.khwiki.com/Game:The_World_That_Never_Was) | DDD Sora 1–15 / Riku 1–28; rewards | 43 rows; KHII section excluded |
| [DDD HD](https://www.khwiki.com/Kingdom_Hearts_Dream_Drop_Distance_HD) | Changes and source notes | Consequential HD differences; community summary |
| [Spirit](https://www.khwiki.com/Spirit) | Ability Link, affinity, disposition, rank, creation and tables | Formula/gate evidence; original/HD wording mixed |
| [Catanuki](https://www.khwiki.com/Catanuki), [Beatalike](https://www.khwiki.com/Beatalike), [Tubguin Ace](https://www.khwiki.com/Tubguin_Ace) | Recipe formulas, acquisition, node tables, dispositions | Ten HD formulas; node samples; unknown stats/body parts remain |
| [Frootz Cat](https://www.khwiki.com/Frootz_Cat), [Kab Kannon](https://www.khwiki.com/Kab_Kannon), [R & R Seal](https://www.khwiki.com/R_%26_R_Seal) | Separate 3DS/HD recipe sections | Twelve HD formulas replacing three legacy formulas |
| [Sudo Neku](https://www.khwiki.com/Sudo_Neku) | Recipe/acquisition section | Missing master breed; two formulas and medal route |
| [Aura Lion](https://www.khwiki.com/Aura_Lion), [Lord Kyroo](https://www.khwiki.com/Lord_Kyroo) | Boards, footnotes, recipes; Kyroo encounter | Red-secret transformations; Aura Lion coordinate discrepancy |
| [Meow Wow](https://www.khwiki.com/Meow_Wow) | Species/board content | Lead for tutorial/default acquisition; no full graph certification |
| [Abilities (KH3D)](https://www.khwiki.com/Abilities_(KH3D)) | Category descriptions, provider table, defaults/footnotes | Permanent versus equipped effects, Scan/EXP Zero |
| [Deck Command (KH3D)](https://www.khwiki.com/Deck_Command_(KH3D)) | All seven category tables, counted rows | 124 candidates; five missing defense commands |
| [Balloon](https://www.khwiki.com/Balloon_(ability)), [Ars Arcanum](https://www.khwiki.com/Ars_Arcanum), [Faith](https://www.khwiki.com/Faith) | DDD mechanics and learning sections | Multiple acquisition sources; acquisition/equip distinction |
| [Link System](https://www.khwiki.com/Link_System) | Gauge and attack/style mechanics, pairing discussion | Character-specific systems; complete mapping still needed |
| [Drop System](https://www.khwiki.com/Drop_System) | Forecast effects/probabilities, drop mechanics | Difficulty/world forecast restriction |
| [Brilliant](https://www.khwiki.com/Brilliant), [Savage](https://www.khwiki.com/Savage) | DDD drops/rewards/edition flags | HD-usable farming fixtures; StreetPass exclusions |
| [Recipe](https://www.khwiki.com/Recipe) | DDD item acquisition table | Recipe item/formula distinction; not all rows migrated |
| [Moogle Shop](https://www.khwiki.com/Moogle_Shop) | DDD shop section located; full page fetched | Stock/level tables remain unextracted; no completeness claim |
| [Portal](https://www.khwiki.com/Portal) | Mechanics and locations paragraphs | Portal census/rotation types; no full location table there |
| [Dive Mode](https://www.khwiki.com/Dive_Mode) | Fourteen ordinary course rows and special Dives | Score thresholds; HD toy reward needs check |
| [Flick Rush](https://www.khwiki.com/Flick_Rush) | Cup access/round rows and ranking mechanics | Ten cups; lineups/card/prize stock not migrated |
| [Julius](https://www.khwiki.com/Julius) | Location, post-clear access, reward | Optional encounter/weapon |
| [Trophies](https://www.khwiki.com/Trophies) | DDD in-game 20 edition-inclusive rows; HD platform 55 rows | 18 HD in-game awards; 55 PlayStation rows incl. platinum |
| [Another Guardian of Light](https://www.khwiki.com/Another_Guardian_of_Light) | Unlock criteria | Difficulty thresholds, answers, credits, Theater; HD verification open |

Individual Keyblade pages inspected (DDD acquisition/stat sections): [Kingdom Key](https://www.khwiki.com/Kingdom_Key), [Way to the Dawn](https://www.khwiki.com/Way_to_the_Dawn), [Skull Noise](https://www.khwiki.com/Skull_Noise), [Guardian Bell](https://www.khwiki.com/Guardian_Bell), [Dual Disc](https://www.khwiki.com/Dual_Disc), [Ferris Gear](https://www.khwiki.com/Ferris_Gear), [Ocean's Rage](https://www.khwiki.com/Ocean%27s_Rage), [Knockout Punch](https://www.khwiki.com/Knockout_Punch), [All for One](https://www.khwiki.com/All_for_One), [Counterpoint](https://www.khwiki.com/Counterpoint), [Sweet Dreams](https://www.khwiki.com/Sweet_Dreams), [Divewing](https://www.khwiki.com/Divewing), [End of Pain](https://www.khwiki.com/End_of_Pain), [Unbound](https://www.khwiki.com/Unbound), [Ultima Weapon](https://www.khwiki.com/Ultima_Weapon). Only DDD acquisition/stat facts are promoted; other games' synthesis requirements are excluded.

## Failed or non-evidence leads

- Legacy EXTRA's GameFAQs guide 64749: connector/web retrieval was restricted; not claimed read.
- TrueAchievements walkthrough endpoint: inaccessible through web retrieval; not claimed read.
- “Trophy” resolved to the Union χ material, not the award list; discarded.
- “List of Keyblades” resolved to a category; individual equipment pages used instead.
- “Ability Link” redirects to Spirit; it is not an independent confirming source.
- “Forecast” redirects to Drop System; it is not independent confirmation.
- “Deck Commands” is disambiguation; the singular Deck Command (KH3D) article supplied the actual tables.
- Broad search queries returned mostly irrelevant results; discarded.
- No game executable/save, in-game testing or screenshot/map assets were inspected or obtained.

No public page alone makes an entire category ready. Preserve source/edition/confidence per fact; record disagreements rather than silently asserting the latest page is definitive.

