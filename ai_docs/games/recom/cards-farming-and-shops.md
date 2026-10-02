# Cards, enemy farming and Moogle shops

Current reference, updated October 1, 2026. See the [complete 32-finding disposition](research-resolution-2026-10-01.md) for supported facts and precise remaining limits; the [September 28 closure](data-gap-audit-2026-09-28.md) remains historical provenance.

Research: updated 2026-10-01. [Card inventories](README.md#machine-readable-research).

## What counts as a card

| Family | Extracted coverage | Completion/inventory interpretation |
|---|---:|---|
| Sora attack | 23 HD identities | Track type discovery separately from each numeric-value/Premium copy |
| Magic | 7 | Higher spell tiers come from stacking; not new Fire/Fira/Firaga card items |
| Summon | 7 | Shared card definition links to summon and mixed sleights |
| Item | 7 | Battle reload effects; do not use KH1 potion stock semantics |
| Friend | 8 Sora | Battle pickups; appearances and Journal discovery are not permanent deck quantities |
| Enemy | 56 Sora, 22 Riku records | Shared names may have different campaign access and effects |
| Special | 2 | Gold/Platinum follow-up collection; preserve ordinary Card Master distinction |
| Map/key | 29 | Types and held numeric values are different measures |
| World/gimmick/minigame-only | Complete type roster | 152 Sora / 59 Riku card types; minigame-only cards add no inventory slots |

[Attack Card](https://www.khwiki.com/Attack_Card), [Magic Card](https://www.khwiki.com/Magic_Card), [Summon Card](https://www.khwiki.com/Summon_Card), [Item Card](https://www.khwiki.com/Item_Card), [Friend Card](https://www.khwiki.com/Friend_Card), [Special Card](https://www.khwiki.com/Special_Card).

Sora's deck is constrained by CP, while a card's 0–9 value controls breaks/stack totals. These are not interchangeable numbers. A weapon's strike/thrust/finish multipliers are a third concept. The canonical data supplies all 44 ten-value CP matrices (440 numeric costs), including all 23 attack identities, and 37 Premium costs.

Premium attack/magic cards trade lower CP for ordinary-reload restrictions. Sleight position and high-tier item recovery matter; a “Premium is always better” rule is invalid. [Battle Card](https://www.khwiki.com/Battle_Card). Premium cost is the value-1 CP cost. Premium cards reload normally in stock slots two/three, but are spent when played alone or first. Hi-Potion, Mega-Potion, Mega-Ether, Elixir and Megalixir restore their appropriate spent types. All seven item cards now have structured reload-scope/unreloadable/reset rules; used item cards themselves cannot be restored.

## First acquisition versus repeat copies

World-specific attack types join their world source pools; special types need a first reward before later copies appear. A Moogle pack is not guaranteed to contain a needed card or value. Keep the unlock event, random source pool, actual possession, and historical discovery distinct.

Concrete HD corrections are already encoded: Spellbinder is the Tigger's Playground chest; Mega-Ether comes from Whirlwind Plunge; Elixir comes from Bumble-Rumble. The original GBA routes for those rewards are excluded. [Game:100 Acre Wood](https://www.khwiki.com/Game:100_Acre_Wood).

Pluto unlocks in Traverse Town’s Room of Beginnings. The [Traverse Town gameplay table](https://www.khwiki.com/Game:Traverse_Town) gives a 20% replacement chance for an eligible friend spawn when cards left are at most two and reloadable cards at most nine. All eight friend availability rules are structured. Donald/Goofy are absent from the 11F Replica battle until the 12F Larxene battle; Peter Pan is absent from entering Room of Guidance until entering Room of Truth. Friend cards remain battle pickups, not purchasable permanent stock.

## Enemy-card farming

For ordinary drops, defeat the intended enemy **last**. Teeming Darkness, Almighty Darkness and Looming Darkness multiply eligible enemy-card chance by 2.5; they do not boost every enemy killed into an independent card roll. White Mushroom and Black Fungus use their own rooms and are excluded from that multiplier. [Enemy Card](https://www.khwiki.com/Enemy_Card).

The [30-row farm file](enemy-card-farms.json) selects explicitly Re:CoM enemy infoboxes, retaining base/boosted rates and world lists. Examples:

| Enemy | Candidate base → boosted | Useful world/source |
|---|---|---|
| Shadow | 4% → 10% | [Traverse Town and other worlds](https://www.khwiki.com/Shadow); Atlantica only in Bottomless Darkness |
| Soldier | 3% → 7.5% | [Traverse Town / Wonderland / Twilight Town](https://www.khwiki.com/Soldier); Neverland only when summoned by Crescendo |
| Powerwild | 2% → 5% | [Olympus Coliseum](https://www.khwiki.com/Powerwild) |
| Fat Bandit | 2% → 5% | [Agrabah](https://www.khwiki.com/Fat_Bandit) |
| Search Ghost | 2% → 5% | [Monstro / Halloween Town / Atlantica](https://www.khwiki.com/Search_Ghost) |
| Neoshadow | 3% → 7.5% | [Castle Oblivion](https://www.khwiki.com/Neoshadow) |
| White Mushroom | 4%; no darkness boost | [White Room](https://www.khwiki.com/White_Mushroom) |
| Black Fungus | 3%; no darkness boost | [Black Room](https://www.khwiki.com/Black_Fungus) |

These are source-reported rates, not measured Steam probabilities. Shadow/Soldier footnotes and both mushroom success rules are now resolved. White Mushroom requires three requested Fire/Blizzard/Thunder casts in White Room (Warp also permits card drops); Black Fungus must be defeated in Black Room, waiting out its invulnerability. Finish the intended target last. Complete generated encounter compositions/reset routes and independent corroboration of all 30 rates remain open. Do not claim a guaranteed number of attempts or add unverified RNG manipulation instructions.

## Moogle economy

Each pack holds five random cards. The [reconciled remake pack records](moogle-packs.json) supply these prices; the mixed-edition [Moogle Shop table](https://www.khwiki.com/Moogle_Shop) still contains contrary 270/300 Magic Pack values:

| Tier | Floors | Attack | Magic | Item | Assorted |
|---|---|---:|---:|---:|---:|
| Grass | 1–13 | 100 | 200 | 150 | 150 |
| Brown | 7–13 | 200 | 250 | 200 | 200 |
| Black | 7–13 | 300 | 350 | 300 | 300 |
| Mog | 11–13 | 500 | 400 | 350 | 400 |

Units are Moogle Points. A newly generated shop grants a free Attack Pack: Grass on 1–6, Brown on 7–13 in Re:CoM. A shop has finite stock; a newly created Moogle Room supplies a new shop. Riku has no shop/deck-building workflow.

[16 structured pack records](moogle-packs.json) preserve the numerical table. All 16 floor-stock records and eight magic/item identity pools are filled. Attack/assorted identity odds, value odds and Premium frequency remain unknown. Trade value is twice CP divided by three, rounding the division down first; Premium uses value-1 CP then adds 10 MP. Unique boss/Special Cards cannot be sold.

## App implications

Room Synthesis is a card-consuming room system, not material crafting. There is no justification for grafting KH1 synthesis recipes onto this game. Optional card inventory needs identity, value, Premium status and count; historical discovery must survive spending/selling. Door predicates and CP costs are available for a future planner; full sleight precedence and random pack distributions remain incomplete.

## October 1 edition clarification

Ansem’s player card is correctly resistance-only in Re:CoM. Stocked-card concealment belongs to original CoM Link Mode, while enemy Ansem’s own use is separate. The audit’s assumed missing active effect (COM-018) is closed; see [resolution evidence](research-resolution-2026-10-01.md). All 29 basic-card effects and 22 numeric/use-detail notes now reach the journal. The continuation sources Dumbo’s base duration and additional summon output; exact Bambi/Goofy base durations remain open. All copied mushroom TODOs and both farm footnotes are corrected (COM-032 closed).
