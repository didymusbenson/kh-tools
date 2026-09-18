# KH2FM synthesis recipe research

Snapshot: 2026-09-18. This enumerates 30 base recipes and 29 upgraded outputs (59 distinct outputs), calculated from the item-specific pages read in this pass. It is a research catalog, not a claim that the game menu has been independently reconciled. The 60 **material types** are a different denominator. Base ingredients are repeated when making an upgrade; do not model the upgrade as consuming the previously crafted equipment.

These community sources are not primary/in-game verification. Amounts below are undiscounted, before Energy or Moogle cost reductions. Upgrade modifiers are stored explicitly, never inferred solely from rank. The inventory is materially fuller than the legacy 25 complete base rows plus placeholder products, but conflicts below prevent a certified all-items shopping list.

## Corrections and unresolved conflicts

- Ultima Weapon: the legacy `7 Serenity Shards` is wrong. The Final Mix item page gives 3 Serenity **Crystals**, and 99 base EXP. Thirteen Orichalcum+ is the displayed raw cost; seven sources exist, so an Energy Crystal is required and the paid Orichalcum+ quantity is seven. [Ultima Weapon](https://www.khwiki.com/Ultima_Weapon).
- Petite Ribbon: Final Mix uses two Mythril Crystals, not the legacy three. [Petite Ribbon](https://www.khwiki.com/Petite_Ribbon).
- Centurion and Frozen Pride pages give 51 EXP each; legacy 78 is not supported. Their recipes use Remembrance and Tranquility respectively.
- Shock Charm: its item page lists Remembrance Gem 1 / Stone 3 and Tranquility Gem 1 / Stone 3, plus Lost Illusion 1, EXP 31. The [Recipe summary](https://www.khwiki.com/Recipe) and [Tranquility summary](https://www.khwiki.com/Tranquility) instead list Tranquility Gem 3 / Stone 1. The legacy sheet additionally reverses the Remembrance quantities. Preserve both current-source candidates; verify in the modern synthesis menu before certifying this recipe or global totals.
- Moon Amulet's item page reports rank A, whereas the recipe block repeated on [Star Charm](https://www.khwiki.com/Star_Charm) reports S. Both show a Serenity Crystal modifier. Rank-dependent cost/EXP logic remains unresolved.
- [Mythril](https://www.khwiki.com/Mythril) labels Mythril Gem rank B but pairs its upgrade with a Serenity Gem. Preserve the literal modifier and verify rank/upgrade semantics before implementing automatic selection.
- [Illusion](https://www.khwiki.com/Illusion) shows Manifest Illusion rank A, while the [material index](https://www.khwiki.com/Synthesis_material) labels it S. This affects collector-rank grouping, not merely presentation. Also, the Remembrance summary incorrectly adds seven Remembrance Shards to Shadow Archive compared with its item recipe. Summary pages cannot certify ingredient totals.

## Catalog

The ingredient column states recipe facts, not a farm route. Unlock names refer to an acquired recipe document or Free Development milestone. Each upgraded row also needs the game's first-creation/Creations availability behavior verified; do not infer possession from synthesis history.

| Base → upgraded output | Rank / EXP | Base ingredients | Unlock | Upgrade modifier | Evidence / status |
|---|---|---|---|---|---|
| Drive Recovery → High Drive Recovery | C / 16 | Mythril Shard x3 Dark Shard x3 Frost Shard x1 Lightning Shard x1 | Amateur Moogle (LV1) Recovery Recipe | Serenity Shard x 1 | [item page](https://www.khwiki.com/Drive_Recovery) — Community recipe evidence |
| Elixir → Megalixir | A / 15 | Mythril Stone x3 Power Stone x1 Dark Stone x1 | Amateur Moogle (LV1) Star Recipe | Serenity Gem x 1 | [item page](https://www.khwiki.com/Elixir) — Community recipe evidence |
| Mega-Potion → Mega-Ether | B / 12 | Mythril Shard x3 Power Shard x1 Blazing Shard x1 Lucid Shard x1 | Amateur Moogle (LV1) Mega Recipe | Serenity Stone x 1 | [item page](https://www.khwiki.com/Mega-Potion) — Community recipe evidence |
| AP Boost → Magic Boost | S / 49 | Mythril Gem x1 Power Crystal x3 Dark Crystal x3 Frost Crystal x3 | Amateur Moogle (LV1) Skill Recipe | Serenity Crystal x 1 | [item page](https://www.khwiki.com/AP_Boost) — Community recipe evidence |
| Defense Boost → Power Boost | S / 50 | Mythril Crystal x1 Blazing Crystal x3 Lightning Crystal x3 Lucid Crystal x3 | Amateur Moogle (LV1) Guard Recipe | Serenity Crystal x 1 | [item page](https://www.khwiki.com/Defense_Boost) — Community recipe evidence |
| Moon Amulet → Star Charm | A / 22 | Orichalcum x3 Mythril Crystal x1 Twilight Stone x1 Twilight Shard x1 | Amateur Moogle (LV1) Moon Recipe | Serenity Crystal x 1 | [item page](https://www.khwiki.com/Moon_Amulet) — CONFLICT: base page rank A; Star Charm recipe block rank S |
| Petite Ribbon → Ribbon | A / 24 | Mythril Crystal x2 Orichalcum x1 Dense Stone x1 Dense Shard x1 | Amateur Moogle (LV1) Style Recipe | Serenity Gem x 1 | [item page](https://www.khwiki.com/Petite_Ribbon) — Community recipe evidence |
| Save the Queen → Save the Queen+ | S / 78 | Orichalcum x1 Dense Crystal x3 Dense Gem x5 Dense Stone x7 Dense Shard x9 | Amateur Moogle (LV1) Queen Recipe | Serenity Crystal x 1 | [item page](https://www.khwiki.com/Save_the_Queen) — Community recipe evidence |
| Centurion → Centurion+ | S / 51 | Lost Illusion x1 Remembrance Crystal x1 Remembrance Gem x3 Remembrance Stone x5 Remembrance Shard x7 | Amateur Moogle (LV1) Strength Beyond Strength | Serenity Crystal x 1 | [item page](https://www.khwiki.com/Centurion) — Community recipe evidence |
| Frozen Pride → Frozen Pride+ | S / 51 | Lost Illusion x1 Tranquility Crystal x1 Tranquility Gem x3 Tranquility Stone x5 Tranquility Shard x7 | Amateur Moogle (LV1) Road to Discovery | Serenity Crystal x 1 | [item page](https://www.khwiki.com/Frozen_Pride) — Community recipe evidence |
| Save the King → Save the King+ | S / 78 | Orichalcum x1 Twilight Crystal x3 Twilight Gem x5 Twilight Stone x7 Twilight Shard x9 | Amateur Moogle (LV1) King Recipe | Serenity Crystal x 1 | [item page](https://www.khwiki.com/Save_the_King) — Community recipe evidence |
| Ultima Weapon → — | S / 99 | Orichalcum+ x13 Orichalcum x1 Mythril Crystal x1 Dense Crystal x1 Twilight Crystal x1 Serenity Crystal x3 | Novice Moogle (LV2) Ultimate Recipe | — | [item page](https://www.khwiki.com/Ultima_Weapon) — Community recipe evidence |
| Firaga Bangle → Firagun Bangle | C / 15 | Mythril Shard x5 Blazing Stone x1 Blazing Shard x1 | Obtain 5 types of materials | Serenity Shard x1 (legacy lead; modifier not present in fetched base page) | [item page](https://www.khwiki.com/Firaga_Bangle) — Community recipe evidence |
| Blizzaga Armlet → Blizzagun Armlet | C / 15 | Mythril Shard x5 Frost Stone x1 Frost Shard x1 | Obtain five types of materials | Serenity Shard x 1 | [item page](https://www.khwiki.com/Blizzaga_Armlet) — Community recipe evidence |
| Thundaga Trinket → Thundagun Trinket | C / 15 | Mythril Shard x5 Lightning Stone x1 Lightning Shard x1 | Obtain 5 types of materials | Serenity Shard x 1 | [item page](https://www.khwiki.com/Thundaga_Trinket) — Community recipe evidence |
| Shock Charm → Shock Charm+ | S / 31 | Lost Illusion x1 Remembrance Gem x1 Remembrance Stone x3 Tranquility Gem x1 Tranquility Stone x3 | Amateur Moogle (LV1) Cloaked Thunder | Serenity Crystal x 1 | [item page](https://www.khwiki.com/Shock_Charm) — CONFLICT: Recipe / Tranquility summary differs |
| Full Bloom → Full Bloom+ | S / 26 | Lost Illusion x1 Manifest Illusion x1 Tranquility Crystal x1 Serenity Gem x3 | Amateur Moogle (LV1) Eternal Blossom | Serenity Crystal x 1 | [item page](https://www.khwiki.com/Full_Bloom) — Community recipe evidence |
| Shadow Archive → Shadow Archive+ | S / 26 | Lost Illusion x1 Manifest Illusion x1 Remembrance Crystal x1 Serenity Gem x3 | Amateur Moogle (LV1) Book of Shadows | Serenity Crystal x 1 | [item page](https://www.khwiki.com/Shadow_Archive) — Community recipe evidence |
| Garnet Ring → Diamond Ring | C / 16 | Mythril Stone x3 Power Stone x1 Power Shard x1 Dark Shard x1 | Obtain 5 types of materials | Serenity Shard x 1 | [item page](https://www.khwiki.com/Garnet_Ring) — Community recipe evidence |
| Mythril Ring → Orichalcum Ring | C / 17 | Mythril Stone x3 Power Stone x1 Dark Stone x1 Dark Shard x1 | Obtain 5 types of materials | Serenity Shard x 1 | [item page](https://www.khwiki.com/Mythril_Ring) — Community recipe evidence |
| Midnight Anklet → Chaos Anklet | C / 15 | Mythril Shard x5 Lucid Stone x1 Lucid Shard x1 | Obtain 5 types of materials | Serenity Shard x 1 | [item page](https://www.khwiki.com/Midnight_Anklet) — Community recipe evidence |
| Acrisius → Acrisius+ | B / 24 | Mythril Stone x5 Blazing Stone x1 Frost Stone x1 Lightning Stone x1 | Obtain 20 types of materials | Serenity Stone x 1 | [item page](https://www.khwiki.com/Acrisius) — Community recipe evidence |
| Power Band → Buster Band | B / 24 | Mythril Stone x5 Power Stone x1 Dark Stone x1 Lucid Stone x1 | Obtain 20 types of materials | Serenity Stone x 1 | [item page](https://www.khwiki.com/Power_Band) — Community recipe evidence |
| Soldier Earring → Fencer Earring | B / 24 | Mythril Gem x3 Dark Gem x1 Frost Gem x1 Lucid Gem x1 | Obtain 20 types of materials | Serenity Stone x 1 | [item page](https://www.khwiki.com/Soldier_Earring) — Community recipe evidence |
| Mage Earring → Slayer Earring | B / 24 | Mythril Gem x3 Power Gem x1 Blazing Gem x1 Lightning Gem x1 | Obtain 20 types of materials | Serenity Stone x 1 | [item page](https://www.khwiki.com/Mage_Earring) — Community recipe evidence |
| Expert's Ring → Master's Ring | A / 29 | Mythril Crystal x3 Dark Crystal x1 Dark Gem x1 Dark Stone x1 Dark Shard x1 | Obtain 20 types of materials | Serenity Gem x 1 | [item page](https://www.khwiki.com/Expert%27s_Ring) — Community recipe evidence |
| Draw Ring → Lucky Ring | S / 55 | Manifest Illusion x1 Remembrance Shard x3 Bright Gem x3 Bright Stone x5 Bright Shard x9 | Amateur Moogle (LV1) Rare Document | Serenity Crystal x 1 | [item page](https://www.khwiki.com/Draw_Ring) — Community recipe evidence |
| Mythril Shard → Mythril Stone | C / 18 | Dense Stone x1 Dense Shard x3 Twilight Stone x1 Twilight Shard x3 | Amateur Moogle (LV1) Obtain 20 different synthesis materials. | Serenity Shard x 1 | [item page](https://www.khwiki.com/Mythril) — Community recipe evidence |
| Mythril Gem → Mythril Crystal | B / 34 | Dense Crystal x1 Dense Gem x3 Twilight Crystal x1 Twilight Gem x3 | Superior Moogle (LV8) | Serenity Gem x 1 | [item page](https://www.khwiki.com/Mythril) — RANK/MODIFIER REVIEW: listed B with Serenity Gem modifier |
| Serenity Crystal → Manifest Illusion | A / 55 | Tranquility Crystal x1 Remembrance Crystal x1 Bright Crystal x9 | Superior Moogle (LV8) Free Development | Serenity Gem x 1 | [item page](https://www.khwiki.com/Serenity) — Community recipe evidence |

## Planner contract and verification fixtures

The user selects target outputs and quantities. Keep crafted-once, currently owned, material stock, deposited/ever-collected materials, Moogle level and found recipe documents separate. Recipe variants remain independently tracked outputs. Calculate requirements from ingredient lines, selected discounts and requested quantities; never migrate legacy `Needed` totals.

The planning expression is `sum(per-craft paid ingredients × requested crafts) − available stock`, floored at zero per material. Resolve compound synthesis for Mythril/Serenity/Illusion explicitly, avoiding a circular plan in which an unavailable advanced material is assumed to exist.

Required fixtures: raw 13 Orichalcum+ becomes paid 7 with Energy; raw quantity 1 never becomes zero; repeated crafts round per craft; using Serenity changes output and adds its modifier; Moogle rank discounts unlock at the relevant levels; a missing recipe document remains an acquisition prerequisite; current stock falling to zero does not erase the collected-material flag. Energy plus Moogle-discount stacking and the exact rounding order require modern menu verification before numeric certification. Do not advertise a fully optimized total while the Shock Charm/rank conflicts remain.

No undiscounted grand total is promoted as obtainable: it would request impossible raw Orichalcum+ quantities and conceal unresolved recipes. Record scenario assumptions with every future total.

A shared-stock fixture: Drive Recovery and Mega-Potion each need three raw Mythril Shards. With five owned, the two-recipe plan needs six total and is short **one**; standalone rows must not allocate the same five twice. Unknown inventory is not zero. Disabling inventory preserves saved stock; historical crafted checks do not consume it. These expectations follow the [shared inventory contract](../../content/synthesis-and-inventory.md).
