# KH1 Final Mix reference data

The reference pack is a reviewed, source-backed dataset for the modern Final Mix game. `source-backed` records have cited documentary evidence; none is labelled as hands-on `verified`. The original HTML and CSV roster helped locate records, but version-mixed statistics and incomplete legacy tables were not accepted without reconciliation.

## Rebuild and structure

Run `python tools/content/import-reference.py`, then `npm run content:build`. The importer performs no network requests or external writes. Its checked-in normalized input is `tools/content/import-reference.source.json`; challenge records and their coverage come from `tools/content/challenge-reference.json` and `challenge-coverage.json`. Output is `data/kh1fm/reference.json`, `recipes.json`, and `reference-coverage.json`. The application build validates all cross-catalog IDs, including related collectible acquisition records.

Every recipe has a stable matching guide entry, product ID, set, positive integer ingredient quantities, and source references. Synthesizable materials link to their own recipes, so recursive planning distinguishes inventory from additional crafting requirements. One-time collectible acquisition checks are owned by the collectibles pack; equipment reference records are not collectible world-count entries.

Current substantive coverage comprises 33 recipes; 34 materials; 48 party weapons (18 Keyblades, 15 staves, 15 shields); 54 accessories; 44 acquisition-relevant enemies; 65 abilities; 99 Sora level records and six starting-stat combinations; nine complete Bambi world reward tables; 96 cup round/clear entries; five endgame optional bosses plus five sparring encounters; 30 Gummi missions and 48 blueprints; 55 modern Steam KH1 achievement goals; and linked minigame, challenge and secret-ending guides. The generated coverage manifest provides the authoritative current counts and any remaining limitations.

## Important reconciliations

- **Energy Bangle:** 2 Spirit Shards and 1 Bright Shard. The independent [KHGuides Final Mix synthesis table](https://www.khguides.com/kh/inventory/synthesis/) and [dedicated item source](https://www.khwiki.com/Energy_Bangle) agree; a conflicting material-family usage summary was rejected.
- **Three Stars recipe:** 5 Power Gems, not the legacy value of 1. Its defense stat remains the one explicit equipment uncertainty: the dedicated current item infobox says Final Mix +4, while the Final Mix changes list and KHGuides accessory table say +3. The UI does not silently choose a value. Acquisition and synthesis quantities are resolved.
- **Final Mix equipment:** Dedicated item Final Mix overrides replace original-version values. Examples include Diamond Dust STR 3/MP +3, Divine Rose STR 13, Ultima Weapon STR 14, Wizard's Relic STR 8, Defender STR 13, Save the Queen STR 10 and Save the King STR 11. The weapon catalog records applicable shop gates/prices and links to collectible acquisitions.
- **Bambi:** The nine-world [Paradise reward table](https://www.khwiki.com/Paradise) replaces misleading generic material recommendations. End of the World produces Mythril Shards/Mythril; Traverse Town produces Blaze Shards/Blaze Gems. Each record preserves first, second and third gauge-fill probabilities. Lucky Strike is not indiscriminately applied to scripted rewards.
- **Arch Behemoth:** Final Dimension has Mythril Shard 20% and Omega Arts 5%, explicitly unaffected by Lucky Strike. Its separate Linked Worlds respawn exists only before fully opening the Final Rest door and is not represented as the same repeatable reward farm.
- **Combo Master:** Modern Sora receives it at Sword 50 / Shield 55 / Rod 55, for 3 AP. This is a runtime grant outside the original static level ability table. The [dedicated ability page](https://www.khwiki.com/Combo_Master), complete level guide and [documented HD runtime behavior](https://github.com/gaithern/KH1FM-RANDOMIZER/blob/main/Static%20Files/scripts/1fmRandoFixComboMaster.lua) agree. Generic tables containing Shield 54 were rejected.
- **EXP:** Exact cumulative thresholds are sums of the documented vanilla game's per-level EXP increments, independently matching all 99 rows in the [complete Final Mix level guide](https://www.khguides.com/kh/awakening/dream-weapon-selection/). Level 100 requires Dawn 999,856, Midday 975,766, or Dusk 946,728 EXP. Legacy totals 984,856 / 949,815 / 878,291 are not used. A duplicate level-82 label in the guide is corrected to level 83 using the documented stat table. Donald and Goofy have separate full curves; Tarzan, Aladdin, Ariel, Jack, Peter Pan and Beast share a curve.

## Source and extraction boundaries

Item, ability, material and enemy sources are cited on each record, primarily the dedicated KHWiki page and corroborating KHGuides Final Mix table. Enemy fields select explicit Final Mix overrides before ordinary KH fields and exclude Japanese-original, Chain of Memories and later-game data. Shadow uses its explicit Final Mix world/phase table. HP, Strength, Defense, EXP, elemental multipliers and reward probabilities retain the story-phase distinction; MP recovery is labelled as an enemy combat parameter. Practical room routes identify useful material farms, not an exhaustive population manifest for every room. Cup populations and boss behavior are separate linked records.

Primary reverse-engineering documentation used for EXP and Sora rewards:

- [Vanilla EXP increments](https://github.com/gaithern/KH1FM-RANDOMIZER/blob/main/Documentation/KH1FM%20Documentation%20-%20EXP%20Chart.csv)
- [Sora stat rewards](https://github.com/gaithern/KH1FM-RANDOMIZER/blob/main/Documentation/KH1FM%20Documentation%20-%20Battle%20Table%20Sora%20Level%20Up%20Stats.csv)
- [Sora chosen-weapon rewards](https://github.com/gaithern/KH1FM-RANDOMIZER/blob/main/Documentation/KH1FM%20Documentation%20-%20Battle%20Table%20Sora%20Level%20Up%20Abilities.csv)

Only documented vanilla values were used. Randomized outputs, randomized acquisition behavior and randomizer balance changes were excluded. The complete per-level guide supplies independent corroboration. Sora records include primary stat gains, additional chosen-weapon rewards, cumulative EXP and the individual cost of each level. Cumulative primary stat-gain fields exclude equipment, stat-boost items and additional chosen-weapon rewards. Donald/Goofy/guest EXP is complete; their separate full per-level stat-gain matrices are outside this imported table.

Modern Steam challenge sources distinguish KH1 goals from other games in app 2552430, use the modern 30-blueprint achievement threshold and stacking behavior, and omit the PlayStation platinum. Public Steam API achievement keys have not been invented. The guide models user-marked goals and progress, not direct game-save or Steam-state detection.

## Validation and honest limits

The offline importer checks unique IDs, exactly 33 distinct recipe products, set counts 6/6/6/6/6/3, positive ingredient quantities, resolvable local recipe/product/ingredient IDs, required instructions and HTTPS source references. The application content build checks global related-ID integrity. All 297 Sora cumulative EXP thresholds and all 297 individual level costs were compared with the independent 99-row guide; all matched exactly. Direct recipe totals also confirm 13 Spirit Shards across the 33 products; modern Combo Master overlays and Final Mix enemy overrides were inspected separately.

These checks establish schema, linkage, source coverage and reconciled values. They do not establish hands-on gameplay verification. Three Stars defense is explicitly unresolved. Detailed challenge caveats (including the earliest Unknown portal trigger and restricted-run edge behavior where source evidence remains limited) are retained in the corresponding records and coverage notes. No exhaustive every-room enemy spawn manifest, full party stat-gain matrix, Steam API-ID map, or live game-state integration is claimed.
