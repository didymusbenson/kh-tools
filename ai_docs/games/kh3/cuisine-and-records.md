# KH3 cuisine, minigames and records

Research date: 2026-09-18. [Index](README.md). Acquisition, cooking success, record rank and achievement progress are separate states.

## Cuisine counting

The Bistrot’s five-star requirement uses the **20 Classic Menu dishes rated Excellent**. Special Menu dishes do not raise the star count; the full cooking catalogue has 28 dishes. Milestones are 4/7/10/14/20 Excellent Classic dishes for stars 1–5; the first, third and fifth award Gourmand’s Ring, Elixir and Grand Chef. Excellent creates the `+` dish. Owning a dish from a chest does not demonstrate an Excellent cooking record. [Le Grand Bistrot](https://www.khwiki.com/Le_Grand_Bistrot).

The 28 dishes, grouped by course, are:

| Course | Dishes |
|---|---|
| Starters | Mushroom Terrine; Scallop Poêlé; Ratatouille; Lobster Mousse; Caprese Salad |
| Soup | Consommé; Pumpkin Velouté; Carrot Potage; Crab Bisque; Cold Tomato Soup |
| Fish | Sole Meunière; Eel Matelote; Bouillabaisse; Sea Bass en Papillote; Seafood Tartare; Sea Bass Poêlé |
| Meat | Sweetbread Poêlé; Beef Sauté; Beef Bourguignon; Stuffed Quail; Filet Mignon Poêlé |
| Dessert | Chocolate Mousse; Fresh Fruit Compote; Crêpes Suzette; Berries au Fromage; Warm Banana Soufflé; Fruit Gelée; Tarte aux Fruits |

Source: [Le Grand Bistrot](https://www.khwiki.com/Le_Grand_Bistrot). Retain course and menu as independent properties; the eight Special recipes must be explicitly assigned during recipe-edge extraction.

For a full course, store one dish per course and distinguish the selected dish’s stats from the additional meal bonus. The complete bonus catalogue, duration rules and recipe material quantities remain unverified in this pass. [Cuisine](https://www.khwiki.com/Cuisine).

## Ingredient identity inventory

The inspected Ingredients table contains **59 ingredients**. Names below are candidate modern-English identifiers; its regional aliases/romanization were omitted. Every item requires a found-ever state, current quantity and distinct location/reward/shop edges. The source is being proposed for merging into Cuisine; preserve record-level URLs and migration aliases. [Ingredients](https://www.khwiki.com/Ingredients).

Veal; Beef; Quail; Filet Mignon; Crab; Scallop; Lobster; Sole; Eel; Sea Bass; Mussel; Cod; Pumpkin; Zucchini; Onion; Tomato; Eggplant; Carrot; Garlic; Celery; Morel; Porcini; Chanterelle; Portobello; Black Truffle; King Oyster Mushroom; Black Trumpet; Miller Mushroom; Cloves; Rosemary; Thyme; Bay Leaf; Basil; Dill; Parsley; Saffron; Apricot; Gooseberry; Lemon; Orange; Raspberry; Pear; Blackberry; Apple; Cheese; Chocolate; Caviar; Butter; Olive Oil; Cornichon; Rice; Honey; Sour Cherry; Strawberry; Blood Orange; Banana; Grapes; Melon; Watermelon.

Useful location patterns: Twilight Town food boxes and baskets differ from forest mushrooms/herbs; Monstropolis includes vending-machine sources; Caribbean underwater sources differ from land pickups. A broad world label is insufficient for a production ingredient route. The world ingredient tables were inspected structurally and sampled for these patterns, not fully rewritten into 59 farm guides.

## Flantastic Seven

The following upper thresholds earn three ingredients plus the ability reward, and all seven upper-tier results lead to Orichalcum+ and Flanniversary Badge. The source prints strict `>` comparisons; exact equality requires verification, so do not silently implement `>=`. [Flantastic Seven](https://www.khwiki.com/Flantastic_Seven).

| Flan | World / area | Upper threshold | Ingredient | Ability |
|---|---|---:|---|---|
| Cherry | Olympus / Overlook | >20,000 | Sour Cherry | Formchange Extender |
| Strawberry | Toy Box / Rest Area | >17,000 | Strawberry | Attraction Extender |
| Orange | Corona / Hills | >23,000 | Blood Orange | Treasure Magnet |
| Banana | Monstropolis / Upper Level | >20,000 | Banana | Grand Magic Extender |
| Grape | Arendelle / Mountain Ridge | >20,000 | Grape | Unison Blizzard |
| Watermelon | Caribbean / Fort | >28,000 | Watermelon | Focus Syphon |
| Honeydew | San Fransokyo / South District | >15,000 | Melon | Attraction Extender |

Track score, qualifying reward tier and ingredient received separately. Do not replace this reward requirement with an “attempted the minigame” marker. Repeatable ingredients and one-time ability rewards must remain distinct. Honeydew’s night access and each exact route need gameplay verification.

## Minigame rank is not the trophy threshold

| Activity | A-rank threshold | Achievement target / separate collection | Source |
|---|---:|---|---|
| Verum Rex: Beat of Lead | 10,000,000 | 12,000,000 for Centurion | [Verum Rex](https://www.khwiki.com/Verum_Rex:_Beat_of_Lead) |
| Festival Dance | 50,000 | 70,000 for Festive Dancer | [Festival Dance](https://www.khwiki.com/Festival_Dance) |
| Frozen Slider | 500,000 | 600,000 for Shield Shredder; ten special prizes separately | [Frozen Slider](https://www.khwiki.com/Frozen_Slider) |
| Flash Tracer A | 60,000 | A rank in both courses | [Flash Tracer](https://www.khwiki.com/Flash_Tracer) |
| Flash Tracer B | 75,000 | A rank in both courses | [Flash Tracer](https://www.khwiki.com/Flash_Tracer) |

The first three trophy targets are also directly published by [Steam achievements](https://steamcommunity.com/stats/2552450/achievements/). The Flash Tracer trophy description needs another platform readback because hidden Steam descriptions are blank.

Frozen Slider’s ten prizes are not Arendelle’s 25 Gummiphone chests. Completion awards Orichalcum+ and Master Treasure Magnet. Replay access is through Elsa/Goofy at the Ice Palace after clearing Arendelle. Full numbered path directions and confirmation of run-end save behavior remain required. [Frozen Slider](https://www.khwiki.com/Frozen_Slider).

100 Acre Wood’s vegetable, fruit and flower minigames must retain their ingredient/reward tables and record conditions. This pass establishes its zero base chests and three emblems, but does not finish all minigame rewards. The Caribbean also needs white-crab/Leviathan upgrades, ship battles, Treasure Ship and Black/Ghost Ship fleet rewards; those are not Gummi Ship records.

## Classic Kingdom acquisition identities

All **23 KH3 games** are enumerated below. Acquisition is separate from recording a score. Do not import the former Union χ promotion’s score targets into KH3. First-five acquisition conditions use [Classic Kingdom](https://www.khwiki.com/Classic_Kingdom); chest references use the [numbered world ledger](collectible-inventory.md) and its individual world sources.

| No. | Game | Acquisition |
|---:|---|---|
| 01 | Giantland | Twilight Town clear |
| 02 | Mickey, the Mail Pilot | Tram Common film poster after Twilight Town |
| 03 | The Musical Farmer | Tram Common film poster after Twilight Town |
| 04 | Building a Building | Tram Common film poster after 100 Acre Wood |
| 05 | The Mad Doctor | Tram Common film poster after 100 Acre Wood |
| 06 | Mickey Cuts Up | Toy Box chest 29 |
| 07 | Taxi Troubles | Toy Box chest 13 |
| 08 | The Barnyard Battle | Toy Box chest 24 |
| 09 | The Wayward Canary | Kingdom of Corona chest 22 |
| 10 | Camping Out | Kingdom of Corona chest 9 |
| 11 | The Karnival Kid | Kingdom of Corona chest 24 |
| 12 | How to Play Golf | Monstropolis chest 10 |
| 13 | Mickey's Circus | Monstropolis chest 19 |
| 14 | Barnyard Sports | Arendelle chest 14 |
| 15 | The Klondike Kid | Arendelle chest 8 |
| 16 | Mickey's Kitten Catch | Arendelle chest 7 |
| 17 | Fishin' Frenzy | The Caribbean chest 4 |
| 18 | Beach Party | The Caribbean chest 13 |
| 19 | Mickey's Prison Escape | The Caribbean chest 47 |
| 20 | Cast Out to Sea | The Caribbean chest 10 |
| 21 | How to Play Baseball | San Fransokyo chest 35 |
| 22 | Mickey's Mechanical Man | San Fransokyo chest 34 |
| 23 | Mickey Steps Out | San Fransokyo chest 36 |

The Classic Tone reward and Classically Trained achievement belong to the record goal, not merely opening all game chests. Steam describes a new high score in every game. Exact minimum-score/first-record behavior should be verified in a fresh save before choosing a numerical predicate. [Classic Kingdom](https://www.khwiki.com/Classic_Kingdom), [Steam achievements](https://steamcommunity.com/stats/2552450/achievements/).

## Other Gummiphone records

Retain Game Records, Adversaries, synthesis history and reports as separate goals. Character files/glossary may serve reference/search, but their narrative unlocks do not gate collection percentages. Extract full Game Records requirements before claiming that an A-rank minigame list is the complete Records tab: combat actions, shotlocks, links, attractions and other entries may have separate units. Do not invent their total from trophy names.

Required fixtures: Excellent 20 Classic/0 Special yields the five-star goal while leaving eight recipes unfinished; obtaining Sea Bass en Papillote+ from Corona chest 26 does not mark it cooked Excellent; acquiring Classic game 13 via Monstropolis chest 19 synchronizes acquisition but leaves the high-score state untouched.
