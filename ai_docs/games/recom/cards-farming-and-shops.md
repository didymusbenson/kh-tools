# Cards, enemy farming and Moogle shops

Current data update: see the [2026-09-28 closure audit](data-gap-audit-2026-09-28.md). The initial research notes below retain their original evidence limits; the audit supersedes missing-field statements where data has now been filled.

Research: 2026-09-28. [Card inventories](README.md#machine-readable-research).

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
| World/gimmick/minigame-only | Partial | Required to reconcile native Card Index; no final all-card denominator yet |

[Attack Card](https://www.khwiki.com/Attack_Card), [Magic Card](https://www.khwiki.com/Magic_Card), [Summon Card](https://www.khwiki.com/Summon_Card), [Item Card](https://www.khwiki.com/Item_Card), [Friend Card](https://www.khwiki.com/Friend_Card), [Special Card](https://www.khwiki.com/Special_Card).

Sora's deck is constrained by CP, while a card's 0–9 value controls breaks/stack totals. These are not interchangeable numbers. A weapon's strike/thrust/finish multipliers are a third concept. The attack-card JSON records multipliers but deliberately leaves the per-value CP matrix empty.

Premium attack/magic cards trade lower CP for ordinary-reload restrictions. Sleight position and high-tier item recovery matter; a “Premium is always better” rule is invalid. [Battle Card](https://www.khwiki.com/Battle_Card). Full Premium CP/reload exception fixtures remain a research gate.

## First acquisition versus repeat copies

World-specific attack types join their world source pools; special types need a first reward before later copies appear. A Moogle pack is not guaranteed to contain a needed card or value. Keep the unlock event, random source pool, actual possession, and historical discovery distinct.

Concrete HD corrections are already encoded: Spellbinder is the Tigger's Playground chest; Mega-Ether comes from Whirlwind Plunge; Elixir comes from Bumble-Rumble. The original GBA routes for those rewards are excluded. [Game:100 Acre Wood](https://www.khwiki.com/Game:100_Acre_Wood).

Pluto deserves an explicit acquisition note: the [Traverse Town gameplay table](https://www.khwiki.com/Game:Traverse_Town) gives a conditional replacement chance when Sora has very few usable/reloadable cards. Registering Pluto may matter for broader Journal goals. The exact condition is source evidence, not a reason to count Pluto as a purchasable permanent card.

## Enemy-card farming

For ordinary drops, defeat the intended enemy **last**. Teeming Darkness, Almighty Darkness and Looming Darkness multiply eligible enemy-card chance by 2.5; they do not boost every enemy killed into an independent card roll. White Mushroom and Black Fungus use their own rooms and are excluded from that multiplier. [Enemy Card](https://www.khwiki.com/Enemy_Card).

The [30-row farm file](enemy-card-farms.json) selects explicitly Re:CoM enemy infoboxes, retaining base/boosted rates and world lists. Examples:

| Enemy | Candidate base → boosted | Useful world/source |
|---|---|---|
| Shadow | 4% → 10% | [Traverse Town and other worlds](https://www.khwiki.com/Shadow); some appearances have source footnotes |
| Soldier | 3% → 7.5% | [Traverse Town / Wonderland / Twilight Town](https://www.khwiki.com/Soldier); Neverland footnote needs encounter audit |
| Powerwild | 2% → 5% | [Olympus Coliseum](https://www.khwiki.com/Powerwild) |
| Fat Bandit | 2% → 5% | [Agrabah](https://www.khwiki.com/Fat_Bandit) |
| Search Ghost | 2% → 5% | [Monstro / Halloween Town / Atlantica](https://www.khwiki.com/Search_Ghost) |
| Neoshadow | 3% → 7.5% | [Castle Oblivion](https://www.khwiki.com/Neoshadow) |
| White Mushroom | 4%; no darkness boost | [White Room](https://www.khwiki.com/White_Mushroom) |
| Black Fungus | 3%; no darkness boost | [Black Room](https://www.khwiki.com/Black_Fungus) |

These are source-reported rates, not measured Steam probabilities. Complete encounter compositions, the mushroom success predicates, reset routes and scripted-only world footnotes remain open. Do not claim a guaranteed number of attempts or add unverified RNG manipulation instructions.

## Moogle economy

Each pack holds five random cards. The [Moogle Shop table](https://www.khwiki.com/Moogle_Shop#Kingdom_Hearts_Chain_of_Memories) supplies these prices:

| Tier | Floors | Attack | Magic | Item | Assorted |
|---|---|---:|---:|---:|---:|
| Grass | 1–13 | 100 | 200 | 150 | 150 |
| Brown | 7–13 | 200 | 250 | 200 | 200 |
| Black | 7–13 | 300 | 270 | 300 | 300 |
| Mog | 11–13 | 500 | 300 | 350 | 400 |

Units are Moogle Points. A newly generated shop grants a free Attack Pack: Grass on 1–6, Brown on 7–13 in Re:CoM. A shop has finite stock; a newly created Moogle Room supplies a new shop. Riku has no shop/deck-building workflow.

[16 structured pack records](moogle-packs.json) preserve the numerical table. Pack composition/value odds and stock quantities remain untranscribed. The published Re:CoM sale formula uses CP with rounding; because CP sources conflict, no numeric sale calculator is certified here.

## App implications

Room Synthesis is a card-consuming room system, not material crafting. There is no justification for grafting KH1 synthesis recipes onto this game. Optional card inventory needs identity, value, Premium status and count; historical discovery must survive spending/selling. A room-key or deck planner can become useful after cost rules are verified, but this research does not authorize implementing a speculative optimizer.

## October 1 edition clarification

Ansem’s player card is correctly resistance-only in Re:CoM. Stocked-card concealment belongs to original CoM Link Mode, while enemy Ansem’s own use is separate. The audit’s assumed missing active effect (COM-018) is closed; see [resolution evidence](research-resolution-2026-10-01.md). The copied mushroom research caveat was removed from 28 ordinary enemy entries; actual White Mushroom/Black Fungus conditions and encounter-route footnotes remain open.
