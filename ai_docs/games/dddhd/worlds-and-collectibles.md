# DDD HD: worlds, chest census and location work

Research date: 2026-09-18. Every world table below was inspected at the **actual Sora and Riku treasure rows**, selecting the DDD section where pages also contain other games. Counts are computed from numbered rows, not from page headings. KHWiki is a community source.

## Inventory and denominator

| World / inspected source | Sora chests | Riku chests | Combined | Rows with empty location notes |
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

387/438 rows have only area labels and no location notes; the remaining 51 notes also vary in precision. Therefore **the census is established but complete text directions are not ready**. This research set deliberately does not represent blank source notes as complete directions. Full per-chest content/acquisition rows, physical routes, access conditions and HD traversal checks remain MVP work.

## Concrete acquisition and HD correction rows

The source for each group is the corresponding world link above. “Area only” explicitly means the approach route remains unverified. All quantities are one chest unless specified as contents.

| Character | World / source number | Contents in HD | Area / actionable evidence | Verification |
|---|---|---|---|---|
| Riku | Traverse Town #5 | Yoggy Ram Recipe | Second District | Area only |
| Riku | Traverse Town #12 | Candy Goggles | Fourth District | Area only; 3DS item differs |
| Sora | La Cité #19 | Wheeflower Recipe | Town | Area only |
| Sora | La Cité #21 | Troubling Fancy | Town; defeat the large Wheeflower by the Bridge exit to remove the thorn barrier | Text condition evidenced |
| Sora | La Cité #36 | **Catanuki Recipe** | Tunnels; replaces the 3DS Drop-Me-Not contents | Area only; consequential HD delta |
| Sora | La Cité #43 | Toximander Recipe | Catacombs | Area only |
| Sora | The Grid #6 | Eaglider Recipe | Docks, upper level | Local landmark route still needed |
| Sora | The Grid #26 | Candy Goggles | Solar Sailer roof | Route still needed |
| Sora | The Grid #37 | Cyber Yog Recipe | Rectifier 2F | Area only |
| Riku | The Grid #36 | Peepsta Hoo Recipe | Rectifier 1F | Area only |
| Sora | Prankster's Paradise #1 | Blizzara | Amusement Park; climb the tower left of the entrance | Text location evidenced |
| Sora | Prankster's Paradise #5 | Malleable Fantasy | Amusement Park, Ferris wheel | Exact platform still needed |
| Sora | Prankster's Paradise #30 | Tatsu Steed Recipe | Ocean Depths | Area only |
| Riku | Prankster's Paradise #7 | Sir Kyroo Recipe | Monstro: Gullet | Area only |
| Riku | Prankster's Paradise #17 | Collision Magnet | Monstro: Belly, inverted layout | Inversion route still needed |
| Sora | Musketeers #29 | Chef Kyroo Recipe | Dungeon | Area only |
| Sora | Musketeers #32 | Tornado Strike | Cell; return after rescuing Mickey | Access condition evidenced |
| Riku | Musketeers #4 | Shadowbreaker | Grand Lobby basement; rope opens after world clear, or approach via Machine Room exit | Alternate access evidenced |
| Riku | Musketeers #10 | Candy Goggles | Green Room; break the door concealing the chest | Text location evidenced |
| Riku | Musketeers #19 | Ducky Goose Recipe | Machine Room; break a second-floor wall | Exact wall route still needed |
| Sora | Symphony #4 | Glide | Cloudwalk | Area only |
| Sora | Symphony #19 | Electricorn Recipe | Fields | Area only |
| Riku | Symphony #15 | Ryu Dragon Recipe | Golden Wood | Area only |
| Sora | The World That Never Was #8 | Drak Quack Recipe | Avenue to Dreams | Area only |
| Riku | The World That Never Was #11 | Keeba Tiger Recipe | Delusive Beginning | Area only |
| Riku | The World That Never Was #23 | Skelterwild Recipe | Verge of Chaos | Area only |

A source number identifies a chest, not a recipe-item acquisition. Collecting the chest may also satisfy the related recipe ownership goal. Both views must point to the same acquisition event without adding the recipe a second time to world chest totals. Candy Goggles replacements preserve chest identity and count.

## Required record contract

Planning fields: stable collectible ID; game `dddhd`; world; character; category; source-reported number and independently verified journal number; area; contents and quantities; approach landmark; physical action; access/ability prerequisite; returnability/missability evidence; acquisition event; source and edition; confidence; media references and alt text. Unknown prerequisites or returnability remain unknown, never guessed “none” or “always returnable”.

Suggested stable ID shape: `dddhd:treasure:sora:la-cite-des-cloches:036`. IDs are not array positions and must survive a corrected label, route, source number or image. Preserve existing progress through aliases/migrations if numbering is corrected.

The compact numbered mark and expanded detail row are **two views of one record and one persisted state**. The world view, master index, item reverse lookup, search and Data Jiminy all use it. Either toggle updates every other view, including after reload/offline restart and backup restore. Derived recipe/item states reference the acquisition event; they are not independent duplicates of a chest.

World collection percentage is completed eligible chest records divided by the fixed eligible chest denominator for that world/character scope. Search, “remaining only”, item-type and area filters do not shrink it. Show the combined denominator only when both characters are selected; never silently count a shared Spirit twice. Plot events, character biographies, flashbacks, boss story flags, Link actions and platform achievements do not inflate this world collection number. Show portal/challenge and acquisition goals separately.

## Route and verification queue

1. Reconcile all 438 source rows to reliable evidence for HD Reports ordering, preserving the seven world and two character scopes.
2. Author original directions for every chest, starting with the 387 missing-note rows and known upper/lower, inverted-layout, breakable-wall and return-visit cases.
3. Verify access conditions and returnability for collectible routes, especially final-world traversal; ordinary plot progression does not become a checklist.
4. Independently cross-check contents changed in HD and identify toy/recipe replacements.
5. Verify synchronization, denominator stability, quantity handling, backup restore, content migration and media fallbacks using representative Sora/Riku records.

Missing production screenshot/map images are the only deferred assets. Text directions, image fields, gallery behavior, alt text and empty-media states remain required.

