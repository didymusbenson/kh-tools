# DDD HD: legacy evidence and integrity audit

Audited 2026-09-18. Source: [KH3D DATABASE PROJECT](https://docs.google.com/spreadsheets/d/1dmSyrFQ30jOf8PTfwvhhnrLOlsq8vQm-ggfPLEo-Dyw/edit). This is the user's legacy research, not independently verified production data.

## What was actually read

Metadata identified 14 tabs. Header sentinels read rows 1–6 across the available width; the following content rectangles were then read. Empty trailing ID-column reads were checked from row 101 to each grid's bottom (row 201 for Deck_Command); large tables were read in 200-row chunks through the grid bottom. This establishes coverage of the keyed tables, not an audit of arbitrary notes outside those rectangles.

| Tab | sheetId | Content range(s) | Populated data rows | Finding |
|---|---:|---|---:|---|
| Spirit | 2005534869 | A1:D100 | 52 | All attribute/style cells blank |
| common_lookup | 1737484377 | A1:E100 | 37 | Lookup names and intended foreign-key domains |
| single_link_attack | 720619836 | A1:C100 | 27 | Names; prose loses button glyphs |
| dual_link_attack | 1434789354 | A1:C100 | 7 | Names and prose |
| dual_attack_recipe | 765976727 | A1:D100 | 30 | Includes symmetrical Meow Wow wildcard rows |
| single_link_style | 2138041148 | A1:D100 | 5 | Riku styles |
| dual_link_style | 1331065738 | A1:D100 | 3 | Riku dual styles |
| dual_style_recipe | 2051954903 | A1:D100 | 15 | Unordered pair combinations |
| ability | 2092260967 | A1:E100 | 43 | Name, category, maximum stacks |
| Deck_Command | 0 | A1:H200 | 119 | 84 Both, 18 Sora, 17 Riku |
| spirit_unlocks | 1578112188 | A1:E1124, 200-row chunks | 816 | IDs 1–816, exactly 16 entries for each of 51 Spirits |
| synthesis_item | 1163091689 | A1:C100 | 37 | Material names; aggregate column blank |
| spirit recipe | 233415641 | A1:I1000, 200-row chunks | 243 | IDs 1–243, 51 named Spirits |
| EXTRA | 90111135 | A1:J100 | 5 nonempty rows | Guide URL and formula labels, no usable formula calculation |

The repository's `games/ddd.html` was inspected: it is a menu placeholder without DDD data. The existing spec/readiness and `ai_docs/sources/khtables-drive-audit.md` were read before research. No AGENTS.md was found in the inspected recursive repository tree. There are no DDD chest or portal datasets in that tree.

[legacy-factual-candidates.json](legacy-factual-candidates.json) preserves the keyed factual cells for review, including raw spellings and nulls. Guide prose and broken controls are excluded. Do not import this file directly as production data.

## Integrity defects that change answers

| Defect | Evidence | Required treatment |
|---|---|---|
| Mixed edition master | Spirit contains Catanuki, Beatalike, Tubguin Ace, but omits Sudo Neku and R & R Seal | HD roster candidate is 54, not 52; reconcile all tables |
| Missing HD boards and recipes | 51 older Spirits have unlock/recipe rows; three additions have none | Add HD sources; do not infer boards from palette-swap relatives |
| Alias joins break | Jeggle Pup/Juggle Pup; Magic Rabbit/Majik Lapin; Duckey Goose/Ducky Goose; Fishbone/Fishboné; R&R Seal/R & R Seal | Canonical names plus preserved aliases |
| Missing defense category | Public inventory has five Defense entries absent from the workbook; the workbook calls all ten Reprisals DEFENSE | 124 total command candidate; categories corrected in [Spirits and commands](spirits-and-commands.md) |
| Quantity is mislabeled as slots | Potion 6, Hi-Potion 4, Mega-Potion 3 appear under “Slots” | Separate item uses per equipped command from deck slot cost |
| Unlock foreign-key errors | Cyber Yog's two Thunder Screen rows have type deck_command | Reclassify after checking actual board coordinates |
| Command aliases | Megaflare, Break time, trailing spaces | Map to Mega Flare and Break Time; preserve legacy spelling in audit |
| Secret transformations lost | Aura Lion Curaga/Faith and Lord Kyroo Blitz/Ars Arcanum appear as independent 10-LP rows | Model one node with state-dependent reward, red-secret purchase and prerequisites |
| No topology | 816 rows contain reward and LP only | Not 816 verified nodes; checkpoints, doors, coordinates and edges are absent |
| Null recipe probabilities | 175 of 243 rows have no probability; others mix “60” and “60%” | Unknown is not automatically 100%; verify each outcome group |
| Incomplete recommendation flags | 24 flags are 1, 87 are 0, 132 blank | “BEST BASE” is unfinished, not a global optimum |
| Wrong HD AR recipes | Frootz Cat, Kab Kannon, R & R Seal retain international 3DS formulas | Replace only within the HD edition dataset; see sourced HD table |
| Missing source links | EXTRA links one 3DS GameFAQs guide | Per-record provenance still required |

The missing five commands are Block, Wake-up Block, Link Block, Sliding Block and Dark Barrier. The [DDD command table](https://www.khwiki.com/Deck_Command_(KH3D)) was counted by section: 34 Attack, 45 Magic, 9 Item, 12 Movement, 5 Defense, 10 Reprisal, 9 Flowmotion. This is a community-source inventory count, not an in-game test.

## Full roster reconciliation

Counts below are computed from the inspected user workbook after alias normalization. “Master” means present in Spirit; “Recipes” and “Unlocks” remain unverified legacy rows. Zero is source coverage, not lack of an in-game recipe or board.


| Spirit | Master | Recipes | Unlock rows |
|---|---|---:|---:|
| Aura Lion | Yes | 4 | 16 |
| Beatalike | Yes | 0 | 0 |
| Catanuki | Yes | 0 | 0 |
| Cera Terror | Yes | 6 | 16 |
| Chef Kyroo | Yes | 6 | 16 |
| Cyber Yog | Yes | 6 | 16 |
| Drak Quack | Yes | 3 | 16 |
| Drill Sye | Yes | 6 | 16 |
| Ducky Goose | Yes | 2 | 16 |
| Eaglider | Yes | 6 | 16 |
| Electricorn | Yes | 4 | 16 |
| Escarglow | Yes | 7 | 16 |
| Fin Fatale | Yes | 6 | 16 |
| Fishboné | Yes | 5 | 16 |
| Flowbermeow | Yes | 3 | 16 |
| Frootz Cat | Yes | 1 | 16 |
| Ghostabocky | Yes | 4 | 16 |
| Halbird | Yes | 5 | 16 |
| Hebby Repp | Yes | 6 | 16 |
| Iceguin Ace | Yes | 6 | 16 |
| Jestabocky | Yes | 4 | 16 |
| Juggle Pup | Yes | 5 | 16 |
| KO Kabuto | Yes | 7 | 16 |
| Kab Kannon | Yes | 1 | 16 |
| Keeba Tiger | Yes | 3 | 16 |
| Komory Bat | Yes | 5 | 16 |
| Kooma Panda | Yes | 6 | 16 |
| Lord Kyroo | Yes | 4 | 16 |
| Majik Lapin | Yes | 8 | 16 |
| Me Me Bunny | Yes | 6 | 16 |
| Meow Wow | Yes | 6 | 16 |
| Meowjesty | Yes | 2 | 16 |
| Necho Cat | Yes | 7 | 16 |
| Peepsta Hoo | Yes | 6 | 16 |
| Pegaslick | Yes | 7 | 16 |
| Pricklemane | Yes | 5 | 16 |
| R & R Seal | Missing | 1 | 16 |
| Ryu Dragon | Yes | 5 | 16 |
| Sir Kyroo | Yes | 6 | 16 |
| Skelterwild | Yes | 3 | 16 |
| Staggerceps | Yes | 6 | 16 |
| Sudo Neku | Missing | 2 | 16 |
| Tama Sheep | Yes | 6 | 16 |
| Tatsu Blaze | Yes | 5 | 16 |
| Tatsu Steed | Yes | 4 | 16 |
| Thunderaffe | Yes | 5 | 16 |
| Toximander | Yes | 7 | 16 |
| Tubguin Ace | Yes | 0 | 0 |
| Tyranto Rex | Yes | 3 | 16 |
| Ursa Circus | Yes | 2 | 16 |
| Wheeflower | Yes | 5 | 16 |
| Woeflower | Yes | 6 | 16 |
| Yoggy Ram | Yes | 5 | 16 |
| Zolephant | Yes | 4 | 16 |

The 54-name union is a reconciliation target. A breed acquired once, a named Spirit instance, a recipe item collected, a formula known, a command acquired and a board node purchased are six different progress concepts.
