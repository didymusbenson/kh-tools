# BBS and DDD treasure presentation crosswalk

**Implemented 2026-10-04. Data-only layer; no acquisition or progress migration.**

## Result and evidence boundary

- `src/games/treasure-data/bbsfm.json` preserves all **383** existing treasure-category IDs: **374 main chests**, **8 separate Secret Episode chests**, and **1 retained, excluded tutorial acquisition**.
- `src/games/treasure-data/dddhd.json` preserves all **438** existing IDs: **225 Sora**, **213 Riku**, and no shared chest flags.
- Every included record has a positive per-board `companionOrder`, explicit `sourceNumber`, and `orderEvidence: "app-defined"`. The UI must call these **Guide** references. Neither file asserts `journalSlot` or native column geometry.
- This is an intentional whole-board fallback, not an assertion that the available source numbers are wrong. Partial stronger evidence is recorded below and in `evidence`; it does not turn an incompletely verified board into a certified HD journal.
- Reward text, directions, catalogue IDs, check booleans, and backup namespaces are unchanged. Same-name rewards remain separate acquisitions.

The inputs were the complete treasure subsets in both runtime catalogues; BBS's collectible CSV; DDD's world facts and all 438 route-enrichment records; and the BBS/DDD portions of the [mapping inventory](treasure-grid-mapping-inventory-2026-10-04.json) and [design research](treasure-grid-redesign-research-2026-10-04.md). External checks were targeted, not a new playthrough or an exhaustive HD video transcription.

## Reproduction and invariants

Run `python3 tools/content/treasure-bbs-ddd.py` to regenerate, or add `--check` to verify without writing. Only the two presentation JSON files are generated.

The generator joins BBS rows by exact saved ID and checks world, owning character/episode, reward, area, collectible flag, and source position. It joins DDD facts by character/world/number, then checks the existing saved ID's reward, area, and route-ledger identity. It rejects missing/duplicate IDs, stale output, noncontiguous source numbers, unexpected counts, and changed exception identities.

The DDD room refinements `Solar Sailer` → `Solar Sailer roof` (Sora/The Grid/026) and `Grand Lobby` → `Grand Lobby basement` (Riku/Country of the Musketeers/004) are explicitly allowed. They narrow an existing room and do not create a new chest. These are the only area-label exceptions.

`companionOrder` is assigned after numeric sorting within `(character, scope, world)`. It is never the BBS global CSV extraction index or the DDD content-array index. `sourceNumber` means the current canonical input's number; it does not mean the older DDD route list's number when those disagree. The metadata arrays follow the source's world partition sequence, but array position never identifies a saved check.

Executed checks: generator and `--check` both passed; all 821 source IDs are represented exactly once; 820 are included; all 47 included boards have contiguous local guide sequences; JSON parsing and whitespace checks passed. UI/build/persistence acceptance belongs to the integrating task and is not claimed by this data-only report.

## BBS scope and counts

| World | Terra | Ventus | Aqua |
|---|---:|---:|---:|
| Land of Departure | 4 | 0 | 4 |
| Dwarf Woodlands | 13 | 14 | 18 |
| Castle of Dreams | 11 | 13 | 8 |
| Enchanted Dominion | 10 | 19 | 14 |
| Radiant Garden | 14 | 16 | 16 |
| Disney Town | 16 | 18 | 17 |
| Olympus Coliseum | 4 | 4 | 4 |
| Deep Space | 19 | 16 | 14 |
| Neverland | 20 | 17 | 16 |
| Mysterious Tower | 4 | 4 | 4 |
| Keyblade Graveyard | 7 | 9 | 7 |
| Main total | **122** | **130** | **122** |

There are 32 included main character/world boards. Realm of Darkness is an additional eight-cell board with `scope: "secret"` and the exact runtime character label `Aqua · Secret Episode`. Final Episode has no treasure records in the current catalogue. Stickers and Xehanort Report category aliases are not additional treasure cells.

The saved ID `bbsfm:ventus:land-of-departure:tutorial-treasure:tutorial` is retained with `kind: "tutorial"`, `included: false`, and an explicit reason. Its `companionOrder: 1` is metadata for the retained record, not a counted chest or invented Journal #1. Keep its old acquisition/detail route reachable and exclude it from every chest denominator.

### Main numbering checks

The [first-hand PSP transcript](https://gamefaqs.gamespot.com/psp/943347-kingdom-hearts-birth-by-sleep/faqs/62875), “Things to Know” and “VIII. Treasures,” explicitly describes in-game order and paragraph/row boundaries. Its main totals and selected repeated-reward sequences agree with the inputs. It is original-version evidence, not a direct Final Mix/HD slot-to-location capture.

The numbered Japanese [Terra](https://wikiwiki.jp/kh_bbsfm/宝物リスト/テラ), [Ventus](https://wikiwiki.jp/kh_bbsfm/宝物リスト/ヴェントゥス), and [Aqua](https://wikiwiki.jp/kh_bbsfm/宝物リスト/アクア) tables describe upper-left numbering, but explicitly warn that the material was copied from the original release. A title containing Final Mix does not remove that limitation.

### All nine duplicate groups retained

The numbers below identify the existing CSV/source positions and ID suffixes, not newly certified HD positions. Each listed ID was checked against the catalogue and retained separately.

| Character/world | Same-room reward | Positions | Disposition |
|---|---|---|---|
| Ventus/Dwarf Woodlands | Mountain Trail Potion | 12, 14 | Separate landmarks already in catalogue; Japanese rows do not independently resolve both landmarks. |
| Ventus/Castle of Dreams | Mousehole Potion | 4, 8 | Separate IDs and landmarks; source #4 has a more specific entrance description than #8. |
| Aqua/Radiant Garden | Aqueduct Hi-Potion | 3, 5 | Both numbered rows exist; target-edition landmark-to-slot pairing remains unconfirmed. |
| Terra/Disney Town | Gizmo Gallery Thunder | 9, 10 | Two numbered rows; northwest/lower versus southern source descriptions broadly distinguish them. No HD pixel certificate. |
| Ventus/Disney Town | Gizmo Gallery Mega-Potion | 9, 13 | Separate IDs; original table room labels alone do not certify the guide-landmark pairing. |
| Ventus/Disney Town | Gizmo Gallery Thunder | 11, 12 | **Alignment concern retained:** source #11 says northwest/lower; runtime #11 says lower-left and #12 upper-left. Orientation/join is not resolved by reward names. |
| Aqua/Disney Town | Gizmo Gallery Mega-Potion | 7, 12 | Separate IDs and routes; target-edition slot pairing not independently established. |
| Aqua/Disney Town | Gizmo Gallery Thunder | 9, 10 | Separate numbered rows, insufficient source landmark detail to certify pairing. |
| Ventus/Deep Space | Ship Corridor Hi-Potion | 2, 5 | Source differentiates corridor and bulkhead subarea; runtime routes retain two IDs. |

These are **18 records**, with no collapse or ID swap. The Ventus Thunder concern is not permission to reverse old checks or edit existing acquisition directions on an uncertain basis.

### Corrected reward and Secret Episode

`bbsfm:aqua:mysterious-tower:treasure:4` remains **Mega Magic Recipe**. The [HD walkthrough](https://www.gamerguides.com/kingdom-hearts-hd-25-remix/guide/birth-by-sleep-final-mix/aquas-story/mysterious-tower) identifies it under the staircase, and the Japanese Aqua table puts that recipe at #4. Do not restore the old Mega Attack Recipe import error.

The [HD Secret Episode walkthrough](https://www.gamerguides.com/kingdom-hearts-hd-25-remix/guide/birth-by-sleep-final-mix/aquas-story/secret-episode) accounts for all eight existing rewards. Its traversal sequence differs from the current source-number sequence, which is precisely why neither is silently labeled journal order. Native Secret Episode treasure-screen availability/sequence remains unestablished. The eight saved acquisitions remain a useful separately counted companion board.

## DDD scope and counts

| World | Sora | Riku |
|---|---:|---:|
| Traverse Town | 34 | 32 |
| La Cité des Cloches | 49 | 34 |
| The Grid | 42 | 45 |
| Prankster's Paradise | 31 | 22 |
| Country of the Musketeers | 32 | 31 |
| Symphony of Sorcery | 22 | 21 |
| The World That Never Was | 15 | 28 |
| Total | **225** | **213** |

All 14 boards retain owning character. A Both summary must not combine their sequences or flags. Sorting now projects Riku/TWTNW as 1–28 rather than the raw array's initial 11, 23, 1, 2, 3. Quantities such as ten paint guns still belong to one chest/check.

The full [route-enrichment ledger](../games/dddhd/chest-route-enrichment.json) was joined again: **400** same-item/area/source-number matches, **20** quantity normalizations, **16** explicit HD reward replacements, and **2** remaps. This verifies that the crosswalk preserves the researched acquisitions; it does not automatically promote acquisition evidence to native layout evidence.

The [first-hand 3DS Reports transcript](https://gamefaqs.gamespot.com/3ds/997779-kingdom-hearts-3d-dream-drop-distance/faqs/64967), “Things to Know,” explicitly preserves Reports order and describes five-across rows. That is useful old-edition evidence. No inspected HD Treasures screenshot in this pass establishes the HD geometry or all 438 item/slot pairs.

### All HD replacements retained

The following fourteen source positions retain **Candy Goggles** in HD, rather than restoring the 3DS Treasure Goggles:

| Character/world | Positions |
|---|---|
| Riku/Traverse Town | 12 |
| Sora/La Cité des Cloches | 16 |
| Riku/La Cité des Cloches | 16 |
| Sora/The Grid | 7, 26 |
| Riku/The Grid | 26 |
| Sora/Prankster's Paradise | 10, 28 |
| Riku/Prankster's Paradise | 12 |
| Sora/Country of the Musketeers | 15 |
| Riku/Country of the Musketeers | 10 |
| Sora/Symphony of Sorcery | 11 |
| Riku/Symphony of Sorcery | 17 |
| Riku/The World That Never Was | 24 |

The other two changes are Sora/La Cité des Cloches **35: Drop-Me-Not**, **36: Catanuki Recipe**. The [version-marked world table](https://www.khwiki.com/Game:La_Cité_des_Cloches) was re-opened and confirms both HD replacements and the character-specific Goggles rows. General edition changes are recorded on the [HD page](https://www.khwiki.com/Kingdom_Hearts_Dream_Drop_Distance_HD). All sixteen full saved IDs and rewards are checked against the existing per-world evidence ledger by the generator; this pass does not claim a fresh independent screenshot for every replacement.

### Two known remaps preserved, not reintroduced

The old [KH13 route list](https://www.kh13.com/forums/topic/40565-treasure-list/) calls Riku/TWTNW Doubleflight 2 and Curaga 3. Current canonical facts retain **Curaga 2** and **Doubleflight 3**, joined by unique reward/area rather than the disputed old route number.

The [HD-specific Japanese guide](https://tamaki-game.com/kh3d-riku-world) explicitly says its map numbers follow the Reports list from the left. It confirms the current 2/3 pair and separately lists duplicate Dream Candy 1/9, Elixir 4/5/10 and 22/28, and HD Candy Goggles 24. This is stronger target-edition source evidence for the pair, not a direct Reports-screen capture or a blanket verification of every world. The companion presentation deliberately keeps consistent Guide labels across whole boards.

The web reader returned an internal error for that page's direct map images; those images were not newly inspected or used to assert pixel geometry. The already available local Reports references below were inspected successfully.

### All twelve duplicate groups retained

The [inventory](treasure-grid-mapping-inventory-2026-10-04.json) enumerates these exact **25 IDs**. Their route-ledger and runtime instructions were checked: each remains a separately numbered record with a distinct landmark, never joined only by item name.

| Character/world | Area/reward | Positions |
|---|---|---|
| Sora/Traverse Town | Fourth District/Potion | 13, 15 |
| Riku/Traverse Town | Fourth District/Potion | 8, 13 |
| Riku/Traverse Town | Fourth District/Confetti Candy | 11, 15 |
| Riku/Traverse Town | Back Streets/Potion | 25, 29 |
| Sora/La Cité des Cloches | Nave/Drop-Me-Not | 8, 10 |
| Sora/La Cité des Cloches | Bell Tower/Drop-Me-Not | 12, 14 |
| Riku/La Cité des Cloches | Nave/Drop-Me-Not | 7, 10 |
| Riku/La Cité des Cloches | Bell Tower/Drop-Me-Not | 13, 14 |
| Riku/Prankster's Paradise | Monstro: Gullet/Shield Cookie 2 | 6, 11 |
| Riku/The World That Never Was | Delusive Beginning/Dream Candy | 1, 9 |
| Riku/The World That Never Was | Delusive Beginning/Elixir | 4, 5, 10 |
| Riku/The World That Never Was | Verge of Chaos/Elixir | 22, 28 |

The duplicated-reward identity joins are preserved. Full target-edition slot-to-landmark certification remains separate and is not inferred from the existence of distinct directions.

## Pixel inspection and remaining limits

Inspected the actual pixels of:

- [BBS Unversed Missions](references/bbsfm/reports-unversed-missions.png): outside-left rings, red hierarchy plaques, broad ruled leaf, blue frame. It is not a treasure grid.
- [BBS world index at 13:05](references/bbsfm/book-video-13-05.png): amber frame, left rings, broad index, glove selector. It is Character Files, not treasure ordering evidence.
- [DDD HD Character Files](references/dddhd/Kingdom-Hearts-Dream-Drop-Distance-HD03152021-105142-62749.jpg): outside-left rings, one broad pale leaf, gray frame, magenta tabs, separate NEW marks. It does not establish chest symbols or five-column HD geometry.

Accordingly no numeric `geometry.columns` is supplied. A responsive companion grid may choose readable columns, but must not advertise that choice as the game's native row/column geometry. Source-backed nine-across PSP and five-across 3DS statements do not by themselves settle the HD screens.

Remaining facts are bounded: BBS target-edition pairing for repeated same-room rewards (especially Ventus Disney Town 11/12); Secret Episode's native treasure presentation; whole-board HD order parity for both games; target-edition column counts and incomplete/selected chest icon states. None prevents an honestly labeled, complete, stable-ID companion implementation.
