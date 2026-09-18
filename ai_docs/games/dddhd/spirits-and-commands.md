# DDD HD: Spirits, recipes, abilities and commands

Research date: 2026-09-18. The [legacy audit](legacy-audit.md) supplies a full 54-name reconciliation target and preserves candidate factual rows. Community evidence below is not in-game verification.

## Consequential HD recipe corrections

Each listed formula is a separate candidate record; the grade is the base rank, not a guaranteed ★ rank. “Recipe item” is a collectible; the formula can be used without owning that item. Do not carry the old AR/StreetPass requirement into HD.

| Spirit / inspected source | HD formulas: ingredient quantities → base rank | Recipe-item acquisition / gap |
|---|---|---|
| [Catanuki](https://www.khwiki.com/Catanuki) | 4 Rampant Fancy + 4 Vibrant Fantasy → D; 3 Rampant Fancy + 3 Dulcet Fantasy → C; 1 Charming Fantasy + 4 Noble Fantasy → A | Sora, La Cité Tunnels chest #36 |
| [Beatalike](https://www.khwiki.com/Beatalike) | 3 Intrepid Fantasy + 6 Noble Figment → C; 3 Lofty Fantasy + 1 Savage Fantasy → B; 2 Wild Fantasy + 8 Vibrant Fancy → A | Moogle shop LV8, 1000 munny / 800 Bargain Flurry |
| [Tubguin Ace](https://www.khwiki.com/Tubguin_Ace) | 3 Lofty Fancy + 3 Vibrant Fancy → E; 2 Lofty Fantasy + 3 Grim Fantasy → D; 1 Brilliant Fantasy + 3 Vibrant Fantasy → C; 3 Intrepid Fancy + 4 Noble Fancy → C | Moogle shop LV2, 200 / 160 |
| [Frootz Cat](https://www.khwiki.com/Frootz_Cat) | 4 Wondrous Fancy + 5 Grim Fantasy → D; 2 Rampant Fantasy + 2 Noble Fantasy → D; 1 Charming Fantasy + 4 Wondrous Fantasy → C; 1 Malleable Fantasy + 6 Wondrous Fantasy → B | HD Moogle shop; price/unlock not verified |
| [Kab Kannon](https://www.khwiki.com/Kab_Kannon) | 4 Grim Figment + 3 Noble Fantasy → D; 2 Lofty Fantasy + 4 Grim Fancy → D; 6 Rampant Fancy + 1 Prickly Fantasy → C; 3 Dulcet Fantasy + 1 Epic Fantasy → A | HD Moogle shop; price/unlock not verified |
| [R & R Seal](https://www.khwiki.com/R_%26_R_Seal) | 6 Wondrous Figment + 2 Vibrant Fantasy → E; 4 Wondrous Fancy + 4 Vibrant Fancy → D; 6 Rampant Fancy + 3 Wondrous Fantasy → D; 4 Rampant Fantasy + 3 Dulcet Fancy → C | HD Moogle shop; price/unlock not verified |
| [Sudo Neku](https://www.khwiki.com/Sudo_Neku) | 1 Wild Fantasy + 2 Noble Fantasy → C; 3 Fleeting Fantasy + 2 Wild Fantasy → B | Medal Shop, 2000 medals at Flick Rush rank 20; exclude 3DS StreetPass alternative |

These are **22 HD formula rows for six corrected/new Spirits**, plus the two Sudo Neku formulas. Frootz Cat, Kab Kannon and R & R Seal have 12 HD formulas replacing the workbook's three 3DS-only candidates. The three new breeds contribute ten formulas. This is a targeted correction set, not verification of all 243 legacy recipes.

The individual HD breed pages also expose unresolved data: Beatalike and Tubguin Ace disposition instructions contain missing body-part text; several base-stat fields are “???”. Preserve unknowns instead of inventing a complete calculator.

## Creation rules and planner contract

[Spirit mechanics](https://www.khwiki.com/Spirit): Sora/Riku share the Spirit roster; instances have fixed creation ranks F–E–D–C–B–A–★. Rank cannot be raised after creation. Each breed has four dispositions, which can change combat behavior and board access. Recipes are not required to create a breed. Extra materials can increase initial level/rank; rank improvement is limited by the weaker ingredient contribution. Risky Winds adds one rank. A donated command is consumed. Source rank-boost thresholds and probability changes need explicit fixtures before enabling calculator results.

Planner inputs must distinguish desired breed, target rank, forecast, difficulty and allowed alternate outcomes. Optional opt-in inventory supplies current material counts and owned recipe items; show each ingredient as owned/required (x/y). The recipe reference and calculator must work without inventory entry. Results must show exact material quantities, outcome probabilities, initial-rank calculation, acquisition sources, consumed command, remaining materials and assumptions. “Best” is a user goal: least scarce materials, earliest accessible ingredients, guaranteed intended breed, or target rank. The incomplete legacy BEST BASE column supplies none of those guarantees.

Unverified probability cells cannot become 100%. A two-outcome formula must be one shared recipe event with explicit outcomes, not independently craftable rows whose probabilities are forgotten. Examples requiring verification: Aura Lion versus Keeba Tiger, and Lord Kyroo versus Ryu Dragon.

For planned roster totals, sum selected ingredient quantities; do not sum every alternative recipe or the entire source table. A stat/rank optimizer must distinguish player stats from Spirit stats, random creation variation from deterministic bonuses, and permanent ownership from a Spirit instance currently equipped.

## Dream Piece catalog and farming

The workbook enumerates **37** material names: Figment/Fancy/Fantasy grades for Fleeting, Lofty, Rampant, Dulcet, Intrepid, Noble, Grim, Vibrant, Troubling and Wondrous; Fantasy-only Malleable, Prickly, Wild, Epic, Charming, Brilliant and Savage. Names are extracted, but a complete HD source/rate/world matrix is not ready.

| Material / source | Concrete HD-usable route | Counting and exclusion |
|---|---|---|
| [Brilliant Fantasy](https://www.khwiki.com/Brilliant) | Riku: Symphony special #6 guaranteed; TWTNW specials #1/#2/#3 at 33%/67%/100% | Repeatable material quantity; exclude 3DS StreetPass drops |
| [Savage Fantasy](https://www.khwiki.com/Savage) | Skelterwild/Ryu Dragon ordinary Nightmares 3%; rare Tyranto Rex 4%; Sora Avenue to Dreams chest | Distinguish fixed chest from renewable drop; preserve enemy form |
| [Forecasts](https://www.khwiki.com/Drop_System) | Treasure Front triples treasure-box/Dream Piece drop likelihood; Bargain Flurry discounts Moogle prices 20%; Risky Winds improves creation rank | Record forecast separately from base rate; do not multiply a portal's reward probability without evidence |

Difficulty matters: the inspected forecast table has no Risky Winds on Beginner or in Traverse Town. A planner must not recommend an unavailable forecast. Other Nightmare/rare-Nightmare drops, shops, first-clear rewards and expiration yields still need full item-level extraction and HD checks.

## Board topology and acquisition fixtures

| Spirit / source | Concrete evidence | Required modeling consequence |
|---|---|---|
| [Aura Lion](https://www.khwiki.com/Aura_Lion) | C-2 is Curaga, later Faith, each shown at 10 LP; E-6 green secret 10 LP; level-30 checkpoint and red secret 250 LP control the deeper route; F-5 Second Chance 300 LP | Node transformation plus prerequisite path, not a 10-LP immediate Faith shortcut |
| [Lord Kyroo](https://www.khwiki.com/Lord_Kyroo) | B-2 changes Blitz to Ars Arcanum after G-4 red secret 350 LP; E-4 green secret 10 LP precedes level-30 gate; D-1 Zantetsuken 400 LP behind D-3 green secret and level-25 gate | Same coordinate changes reward; gate costs and level must remain visible |
| [Beatalike](https://www.khwiki.com/Beatalike) | G-3 Ars Arcanum 400 LP; A-2 and G-2 Link ×3; level-20 and level-30 checkpoints elsewhere | HD board cannot inherit Zolephant's graph |
| [Tubguin Ace](https://www.khwiki.com/Tubguin_Ace) | D-4 Balloonra 150 LP; D-1 Dark Firaga 400 LP; D-3 Combo Plus 200 LP; hidden/disposition routes | Command reverse index needs HD providers |
| [Catanuki](https://www.khwiki.com/Catanuki) | E-4 Spark Raid 300 LP; A-4 Vanish 300 LP; several green secrets and disposition branches | Text node table is not complete edge geometry |

**Visible source conflict:** Aura Lion's table places Secret: Red at C-7, but the transformation footnote calls it D-7 (listed as the level-30 checkpoint). Both refer to the red-secret requirement, but exact graph coordinates need independent checking. Do not silently choose one and certify the route.

For each board, preserve coordinate, node kind, reward state, LP cost, gate quota, disposition predicate and edges. Track purchased nodes and learned abilities against **Spirit instance IDs** as well as breed references. A user can own multiple instances of one breed. Acquired commands and retained passive abilities must not disappear merely because a Spirit leaves the party.

[Abilities (KH3D)](https://www.khwiki.com/Abilities_(KH3D)) distinguishes Stats abilities (active while their provider remains in the party) from permanent Support/Spirits abilities that can be toggled. Scan is default; EXP Zero is default but only in Proud/Critical. These exceptions matter for completion and difficulty-filtered requirements. The legacy 43 abilities need all providers and HD stack checks; 816 flat unlock rows do not certify a navigable board.

## Commands, links and reverse lookup

| Category | Legacy count | Community command-table count | Work |
|---|---:|---:|---|
| Attack | 34 | 34 | Acquisition and reload verification |
| Magic | 45 | 45 | Acquisition and reload verification |
| Item | 9 | 9 | Correct uses-versus-slots schema |
| Movement | 12 | 12 | Exact access/reward conditions |
| Defense | 0 actual | 5 | Add Block, Wake-up Block, Link Block, Sliding Block, Dark Barrier |
| Reprisal | 10 mislabeled Defense | 10 | Correct category |
| Flowmotion | 9 | 9 | Acquisition/default state |
| **Total** | **119** | **124** | Full acquisition graph still incomplete |

Counts are from the inspected [command table](https://www.khwiki.com/Deck_Command_(KH3D)); they are inventory candidates, not a platform-achievement denominator certification.

[Balloon command acquisition](https://www.khwiki.com/Balloon_(ability)) provides a useful multi-route fixture: Balloonra is in Sora's Solar Sailer chest, Juggle Pup's board (10 LP), Jestabocky's board (150 LP), the Prankster's Paradise A-rank Dive reward, or the Moogle shop during Bargain Flurry (720 munny, shop LV5). Tubguin Ace supplies an additional HD board route above. A breed's own combat spell list is not the same as commands acquired for the player. The [Faith page](https://www.khwiki.com/Faith) says both characters can purchase it, while the command inventory restricts equipping it to Sora; acquisition actor and equip eligibility must be separate fields.

Legacy Link catalogs: 27 Sora single attacks, seven dual attacks, five Riku single styles, three dual styles, 30 Sora pairing rows, 15 Riku pairing rows. Keep unordered pairs, character-specific actions, and Meow Wow-family wildcard precedence. Spirit attribute/style fields are blank, so the pairing engine cannot use the legacy master alone. The inspected [Link System](https://www.khwiki.com/Link_System) distinguishes one full gauge for a single Link from two full gauges for a Dual Link. Recover actual breed-to-link/attribute mappings, controls and HD behavior before claiming the engine is complete.

## Required release fixtures

- Creating an HD Frootz Cat never proposes the excluded 3DS formula or an AR scan.
- Beginner creation cannot request Risky Winds; unknown success probability produces an explicit unknown result.
- An Aura Lion “Faith costs 10 LP” answer also explains transformed-node prerequisites and flags the coordinate conflict.
- Lord Kyroo's Blitz and Ars Arcanum do not count as two simultaneously independent nodes.
- Removing a provider changes active Stats abilities without erasing learned permanent abilities.
- Duplicate Spirit instances retain separate board state; the shared breed acquisition goal remains one mark.
- Commands show every verified route and eligible character; a Spirit's own learned spell does not falsely satisfy the player's command checklist.

