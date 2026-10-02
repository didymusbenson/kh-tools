# DDD HD: worlds, chest census and location work

2026-10-01 current state: 1,283 generated entries and 263 formulas; all 54 boards, 124 commands, 43 abilities/Links, 346 portal identities and 54 Steam achievements are represented. Data Jiminy remains empty. See [all current per-ID dispositions](audit-dispositions.md).

Census inspected 2026-09-18; full route reconciliation completed 2026-10-01. Every world table below was inspected at the **actual Sora and Riku treasure rows**, selecting the DDD section where pages also contain other games. Counts are computed from numbered rows, not from page headings. KHWiki is a community source.

## Inventory and denominator

| World / inspected source | Sora chests | Riku chests | Combined | KHWiki note cells originally empty |
|---|---:|---:|---:|---:|
| [Traverse Town](https://www.khwiki.com/Game:Traverse_Town) | 34 | 32 | 66 | 66 |
| [La Cité des Cloches](https://www.khwiki.com/Game:La_Cit%C3%A9_des_Cloches) | 49 | 34 | 83 | 82 |
| [The Grid](https://www.khwiki.com/Game:The_Grid) | 42 | 45 | 87 | 73 |
| [Prankster's Paradise](https://www.khwiki.com/Game:Prankster%27s_Paradise) | 31 | 22 | 53 | 42 |
| [Country of the Musketeers](https://www.khwiki.com/Game:Country_of_the_Musketeers) | 32 | 31 | 63 | 38 |
| [Symphony of Sorcery](https://www.khwiki.com/Game:Symphony_of_Sorcery) | 22 | 21 | 43 | 43 |
| [The World That Never Was](https://www.khwiki.com/Game:The_World_That_Never_Was) | 15 | 28 | 43 | 43 |
| **Total** | **225** | **213** | **438** | **387** |

Each character's sequence begins at 1 and runs continuously to the table count. These are source-reported treasure numbers; verify against reliable HD references before certifying official journal order. 438 is a chest census, not a count of distinct item types or all game accomplishments. Multiple copies in one chest count as one chest. Sora and Riku chests are different records even when area, number and contents coincide.

All 438 chest records now include pickup landmarks from the complete [KH13 treasure list](https://www.kh13.com/forums/topic/40565-treasure-list/), joined to current HD identities. The 387 blank cells above describe the KHWiki table alone, not missing runtime directions. All 51 nonempty KHWiki notes and previously authored longer approaches are preserved. Directions use map north, not camera orientation. The canonical [chest route supplement](chest-route-enrichment.json) holds every row, identity check, consulted source and bounded residual.

## Complete acquisition and HD reconciliation

The 438-row join comprises 400 exact item/area/number matches, 20 quantity-notation normalizations, 16 explicit HD replacements and two item/area remaps. The replacements cover all 14 Treasure Goggles → Candy Goggles chests and Sora’s La Cité Tunnels #35 (Block-it Chocolate ×2 → Drop-Me-Not) and #36 (Drop-Me-Not → Catanuki Recipe). The source is a 2012 location guide despite its modern forum category; HD item differences were checked against current world tables.

Riku’s Delusive Beginning Curaga and Doubleflight reverse numbers between KH13 and the current table. Curaga retains current ID #002 (guide #3), at the north side of the central room on the ground. Doubleflight retains current ID #003 (guide #2), on the central column reached using Reality Shift on the west orb. [GamerGuides](https://www.gamerguides.com/kingdom-hearts-3d-dream-drop-distance/guide/walkthrough/walkthrough/the-world-that-never-was-part-1) independently supports those item-specific landmarks, but does not establish HD Reports order. The independent [Japanese PS4 HD map guide](https://tamaki-game.com/kh3d-riku-world) explicitly numbers chests in left-to-right Reports order and corroborates Curaga #2 / Doubleflight #3. Its annotated HD map image was inspected. The known pair conflict is resolved; legacy numbering and stable IDs are preserved.

These landmarks also populate command, material, recipe-item and training-item acquisition references. A chest remains one physical record regardless of its reward quantity or the related ownership goal. The complete directions table provides 34 available access actions/conditional hints and explicitly says to return after world completion for Sora’s Cell Tornado Strike. It does not establish comprehensive earliest access, minimum movement abilities or returnability for the remaining 437 IDs; existing additional world notes remain in the output. No blank field is interpreted as unrestricted access.

The [GameFAQs 64798](https://gamefaqs.gamespot.com/3ds/997779-kingdom-hearts-3d-dream-drop-distance/faqs/64798) direct request returned HTTP403 and web retrieval was restricted. Indexed excerpts overlap KH13 and count as shared lineage, not independent corroboration. The full KH13 table, all current world tables and the independent final-world item landmarks were inspected.


## Authored acquisition annotations retained by the generator

These original notes supplement the complete 438-row pickup-landmark catalog; the table is not the coverage denominator.

| Character | World / source number | Contents in HD | Area / actionable evidence | Verification |
|---|---|---|---|---|
| Riku | Traverse Town #5 | Yoggy Ram Recipe | Second District | Full pickup landmark joined from the canonical supplement |
| Riku | Traverse Town #12 | Candy Goggles | Fourth District | Full pickup landmark joined from the canonical supplement |
| Sora | La Cité #19 | Wheeflower Recipe | Town | Full pickup landmark joined from the canonical supplement |
| Sora | La Cité #21 | Troubling Fancy | Town; defeat the large Wheeflower by the Bridge exit to remove the thorn barrier | Full pickup landmark joined from the canonical supplement |
| Sora | La Cité #36 | **Catanuki Recipe** | Tunnels; replaces the 3DS Drop-Me-Not contents | Full pickup landmark joined from the canonical supplement |
| Sora | La Cité #43 | Toximander Recipe | Catacombs | Full pickup landmark joined from the canonical supplement |
| Sora | The Grid #6 | Eaglider Recipe | Docks, upper level | Full pickup landmark joined from the canonical supplement |
| Sora | The Grid #26 | Candy Goggles | Solar Sailer roof | Full pickup landmark joined from the canonical supplement |
| Sora | The Grid #37 | Cyber Yog Recipe | Rectifier 2F | Full pickup landmark joined from the canonical supplement |
| Riku | The Grid #36 | Peepsta Hoo Recipe | Rectifier 1F | Full pickup landmark joined from the canonical supplement |
| Sora | Prankster's Paradise #1 | Blizzara | Amusement Park; climb the tower left of the entrance | Full pickup landmark joined from the canonical supplement |
| Sora | Prankster's Paradise #5 | Malleable Fantasy | Amusement Park, Ferris wheel | Full pickup landmark joined from the canonical supplement |
| Sora | Prankster's Paradise #30 | Tatsu Steed Recipe | Ocean Depths | Full pickup landmark joined from the canonical supplement |
| Riku | Prankster's Paradise #7 | Sir Kyroo Recipe | Monstro: Gullet | Full pickup landmark joined from the canonical supplement |
| Riku | Prankster's Paradise #17 | Collision Magnet | Monstro: Belly, inverted layout | Full pickup landmark joined from the canonical supplement |
| Sora | Musketeers #29 | Chef Kyroo Recipe | Dungeon | Full pickup landmark joined from the canonical supplement |
| Sora | Musketeers #32 | Tornado Strike | Cell; return after rescuing Mickey | Full pickup landmark joined from the canonical supplement |
| Riku | Musketeers #4 | Shadowbreaker | Grand Lobby basement; rope opens after world clear, or approach via Machine Room exit | Full pickup landmark joined from the canonical supplement |
| Riku | Musketeers #10 | Candy Goggles | Green Room; break the door concealing the chest | Full pickup landmark joined from the canonical supplement |
| Riku | Musketeers #19 | Ducky Goose Recipe | Machine Room; break a second-floor wall | Full pickup landmark joined from the canonical supplement |
| Sora | Symphony #4 | Glide | Cloudwalk | Full pickup landmark joined from the canonical supplement |
| Sora | Symphony #19 | Electricorn Recipe | Fields | Full pickup landmark joined from the canonical supplement |
| Riku | Symphony #15 | Ryu Dragon Recipe | Golden Wood | Full pickup landmark joined from the canonical supplement |
| Sora | The World That Never Was #8 | Drak Quack Recipe | Avenue to Dreams | Full pickup landmark joined from the canonical supplement |
| Riku | The World That Never Was #11 | Keeba Tiger Recipe | Delusive Beginning | Full pickup landmark joined from the canonical supplement |
| Riku | The World That Never Was #23 | Skelterwild Recipe | Verge of Chaos | Full pickup landmark joined from the canonical supplement |

## Required record contract

Planning fields: stable collectible ID; game `dddhd`; world; character; category; source-reported number and independently verified journal number; area; contents and quantities; approach landmark; physical action; access/ability prerequisite; returnability/missability evidence; acquisition event; source and edition; confidence; media references and alt text. Unknown prerequisites or returnability remain unknown, never guessed “none” or “always returnable”.

Suggested stable ID shape: `dddhd:treasure:sora:la-cite-des-cloches:036`. IDs are not array positions and must survive a corrected label, route, source number or image. Preserve existing progress through aliases/migrations if numbering is corrected.

The compact numbered mark and expanded detail row are **two views of one record and one persisted state**. The world view, master index, item reverse lookup, search and Data Jiminy all use it. Either toggle updates every other view, including after reload/offline restart and backup restore. Derived recipe/item states reference the acquisition event; they are not independent duplicates of a chest.

World collection percentage is completed eligible chest records divided by the fixed eligible chest denominator for that world/character scope. Search, “remaining only”, item-type and area filters do not shrink it. Show the combined denominator only when both characters are selected; never silently count a shared Spirit twice. Plot events, character biographies, flashbacks, boss story flags, Link actions and platform achievements do not inflate this world collection number. Show portal/challenge and acquisition goals separately.

## Route and verification queue

1. Reconcile all 438 source rows to reliable evidence for HD Reports ordering, preserving the seven world and two character scopes.
2. Expand sourced pickup landmarks into entrance-to-pickup walking routes where needed; verify minimum movement requirements without inventing them.
3. Verify access conditions and returnability for collectible routes, especially final-world traversal; ordinary plot progression does not become a checklist.
4. Preserve all 16 reconciled HD reward replacements when updating future source tables.
5. Verify synchronization, denominator stability, quantity handling, backup restore, content migration and media fallbacks using representative Sora/Riku records.

Missing production screenshot/map images are the only deferred assets. Text directions, image fields, gallery behavior, alt text and empty-media states remain required.

