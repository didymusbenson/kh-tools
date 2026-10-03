# Materials, farming and equipment

Current October 3 coverage: 12 practical crystal routes cover all nine materials, and all 42 flavor records link to 22 normalized character/event Prize Pod routes. Reset and edition-source limits are explicit. See [the live per-ID ledger](research-dispositions-2026-10-01.json), particularly BBS-015/016/018/019/020; fastest farming, complete numeric certification and the three story ice-cream alternatives remain distinct.

## Crystals and conditional sources

There are nine legacy material entries: seven deterministic ability crystals, Chaos Crystal and Secret Gem. Drop percentages below are **Shop Level** conditions, not enemy or character levels. Blank world/area data is not evidence of a farm route. The underlying workbook has no filled locations.

| Material | Medal cost / gate | Inspected drop examples | Source |
|---|---|---|---|
| Shimmering Crystal | 300; Shop 1, Arena 1 | Blobmob 12%; Archraven 2.4% at Shop 1–4, 3% at 5–6; Spiderchest 3.6% at 1–2, 4.8% at 3–8 | [Shimmering](https://www.khwiki.com/Shimmering) |
| Fleeting Crystal | 350; Shop 1, Arena 1 | Chrono Twister 12%; Sonic Blaster 7.2% at 5–6, 11.4% at 7–8; Thornbite 4.8% at 1–2, 6% at 3–5, 11.4% at 6–8; Spiderchest 3.6% at 1–2 only | [Fleeting](https://www.khwiki.com/Fleeting), [Spiderchest](https://www.khwiki.com/Spiderchest) |
| Pulsing Crystal | 300; Shop 1, Arena 1 | Wild Bruiser 21.6%; Bruiser, Tank Toppler and Buckle Bruiser have level-dependent rates | [Pulsing](https://www.khwiki.com/Pulsing) |
| Wellspring Crystal | 300; Shop 1, Arena 1 | Scrapper 1.8% at 1–2, 3% at 3–8; Triple Wrecker 10.8% | [Wellspring](https://www.khwiki.com/Wellspring) |
| Soothing Crystal | 400; Shop 1, Arena 1 | Flood 4% at 1–6, 3.96% at 7–8; Jellyshade 3.2% | [Soothing](https://www.khwiki.com/Soothing) |
| Hungry Crystal | 350; Shop 1, Arena 1 | Bruiser 6% at 1–2, 7.2% at 3–5, 9.6% at 6–8; Hareraiser 3.2%; Buckle Bruiser 6% at 5 | [Hungry](https://www.khwiki.com/Hungry) |
| Abounding Crystal | 400; Shop 4, Arena 1 | Axe Flapper 14.4%; Mandrake 4.8% at 4–6, 7.6% at 7–8 | [Abounding](https://www.khwiki.com/Abounding) |
| Chaos Crystal | 500; Shop 5, Arena 10 | Archraven 0.3% at 7–8; also first Fantastic on Destiny Islands Master in Ice Cream Beat | [Chaos](https://www.khwiki.com/Chaos) |
| Secret Gem | 1,500; Shop 8, Arena 15 | Flood 0.04% at 7–8; Secret Episode chest is in Lower Zone (resolved by HD route) | [Secret Gem](https://www.khwiki.com/Secret_Gem) |

October 1 correction: Spiderchest’s Fleeting drop is present only at Shop Levels 1–2; a character-specific accessible farming route is still open. The Archraven enemy table establishes Shimmering’s first band as Shop 1–4, superseding the older 2–4 transcription. See [the resolution log](research-resolution-2026-10-01.md).

Medal gates: [Mirage Arena shop](https://www.khwiki.com/Game:Mirage_Arena). Chaos attaches a random ability; Secret Gem also maximizes the resulting command's level. Keep their distributions separate from the seven standard crystal/type mappings. Lucky Strike has a five-stack cap. The [community formula](https://www.khwiki.com/Lucky_Strike) is base rate × (1 + 0.3 × enabled stacks), but that source requests BBS mechanics cleanup; independent edition certification and complete enemy-world-area routes remain open. Do not label an unmeasured route “best.”

Shop Level progression is 1 initially; 2/3/4 for clearing one/two/three of Enchanted Dominion, Dwarf Woodlands and Castle of Dreams; 5 after Radiant Garden; 6/7 after one/both of Olympus Coliseum and Deep Space; 8 after Neverland. Many commands enter stock after first acquisition, independently of ordinary stock levels. [Command Shop](https://www.khwiki.com/Command_Shop).

Ringer Ticket is **250 medals**, Shop Level 1 AND Arena Level 5, for one Dead Ringer entry. Dedicated [Battle Ticket](https://www.khwiki.com/Battle_Ticket), Arena and independent item tables supersede the old Command Shop 205 value. All six ticket costs/gates are structured in `research-enrichment.json`.

## Keyblades

[keyblades.csv](keyblades.csv) records 24 weapon forms from their individual pages, with character/episode scope, Strength, Magic, critical rate/multiplier and acquisition. Main-episode candidates resolve to **16 Terra / 15 Ventus / 15 Aqua**, plus Aqua's Final Episode Brightcrest and Secret Episode Master's Defender. This is an obtainable-form inventory, not a claim that every form is required by every achievement.

| Acquisition goal | Required event |
|---|---|
| [Victory Line](https://www.khwiki.com/Victory_Line) | Castle Circuit first place |
| [Sweetstack](https://www.khwiki.com/Sweetstack) | Make each of the eight eligible kinds once; purchased/already-manufactured kinds need no remake; story-award substitutes remain unverified |
| [Ultima Weapon](https://www.khwiki.com/Ultima_Weapon) | Villains' Vendetta |
| [Royal Radiance](https://www.khwiki.com/Royal_Radiance) | Peering into Darkness |
| [Void Gear](https://www.khwiki.com/Void_Gear) | Vanitas Remnant |
| [No Name](https://www.khwiki.com/No_Name_(KHBBS)) | Unknown; this is the obtainable BBS Keychain, not the ancient Xehanort/Luxu weapon page |

Equipment is a separate collection goal; its rewards do not inflate world chest/sticker totals. BBS gear planning centers on Keyblades and command configuration; do not copy KH1's armor/accessory model into BBS. Forty-eight character/episode reach records and the Royal Radiance passive are normalized in `research-enrichment.json`. Independent FM stat validation remains partial: the older Destiny Islands roster lacks FM additions and disagrees on Sweetstack/Pixie Petal values.

## Ice cream, recipes and Prize Pods

[acquisition-tables.json](acquisition-tables.json) preserves **14 ice cream recipes**, their exact ingredient quantities and character availability, plus a computed ingredient shopping list per character. It also contains **42 flavor entries** with world/event and character leads. Sources: [Ice Cream](https://www.khwiki.com/Ice_cream), [Flavors](https://www.khwiki.com/Flavors).

There are eight eligible recipes per character. Shared entries are Bueno Volcano, Snow Bear, Spark Lemon and Final Mix Daisy Sorbet. The HD name Sugary Skies retains Milky Way as a search alias. The JSON sums one manufacture of each eligible recipe. Do not require a second manufacture of an already-manufactured kind. Purchase unlocks after manufacture, so bought kinds are already covered. Only the three Million Dreams story awards remain uncertain substitute credit.

[Prize Pod](https://www.khwiki.com/Prize_Pod) location tables were inspected. Example: Terra's Dwarf Woodlands spawn is above the Underground Waterway waterfall near the Courtyard exit; an unwanted Red Hot Chili spawn requires an area reset. Ventus's Mine spawn and Aqua's Flower Glade spawn are different records. All 42 flavor records now join the 22 character/event routes in `research-enrichment.json`; world reset and Arena replay guidance are distinct. Enemy counts that conflict between tables are not used. This closes the normalized flavor-route gap without certifying unrelated crystal farms.

## Practical research boundary (October 3)

Twelve crystal-route records now cover all nine materials: seven standard Twister Trench routes, earlier Aqueduct Abounding, character-specific Chaos/Archraven rooms and the all-character Fountain Court ordinary-Flood Secret Gem loop. Conditions retain the HD/legacy encounter and independent reset-report limits; these are sourced practical routes, not directly observed Steam loops or fastest-yield claims. All nine Medal Shop alternatives remain available. Exhaustive atlases and Lucky Strike formula certification are deferred; no crystal is left with only a generic world name.

Purchased ice cream already implies a prior manufacture and must not trigger repeated ingredient collection. The finite Rockin’ Crunch / Double Crunch / Royalberry story-award alternatives remain BBS-019. See the [critical re-audit](critical-reaudit-2026-10-03.md#bbs-015).
