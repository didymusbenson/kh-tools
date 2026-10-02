# Sleights, leveling and movement

Updated 2026-10-01. [98 structured sleights](sleights.json) · [Complete progression](progression.json) · [Current dispositions](research-resolution-2026-10-01.md).

## Re:CoM level milestones

These are earliest level opportunities, not automatically learned rewards. Sora chooses among HP, CP and an available sleight when leveling. A player who chose a stat bonus still needs to select missed sleights later. [Level](https://www.khwiki.com/Level#Kingdom_Hearts_Chain_of_Memories).

| Earliest level | Sleight | Card rule |
|---:|---|---|
| 2 | Sliding Dash | Three same-type attack cards; sum 10–15 |
| 7 | Stun Impact | Three same-type attack cards; sum 20–23 |
| 12 | Strike Raid | Three attack cards; sum 24–26 |
| 17 | Blitz | Three different attack types; sum 10–15 |
| 22 | Zantetsuken | Three attack cards; sum 0 or 27 |
| 27 | Sonic Blade | Three different attack types; sum 20–23 |
| 32 | Lethal Frame | Stop + Attack + Attack |
| 37 | Tornado | Aero + Gravity + Summon |
| 42 | Ars Arcanum | Three attack cards; sum 1–6 |
| 47 | Holy | Mega-Ether + Megalixir + Item |
| 52 | Ragnarok | Three attack cards; sum 7–9 |
| 57 | Mega Flare | Mushu + Fire + Fire |

The [Sleight table](https://www.khwiki.com/Sleight) interleaves original and remake milestones; the remake moves several levels and adds Lethal Frame. [Mega Flare](https://www.khwiki.com/Mega_Flare) independently within the same wiki specifies Re:CoM level 57; the [HD Sleight Master guide](https://www.playstationtrophies.org/game/kingdom-hearts-re-chain-of-memories-ps4/trophy/170888-sleight-master.html) also identifies 57 as the necessary level landmark. That alone does not grant every sleight.

## Other acquisition families

- **Underlying card acquired:** higher Fire/Blizzard/etc. tiers, summon levels and many friend combinations.
- **World Bounty:** Blizzard Raid, Fire Raid, Gifted Miracle, Homing Blizzara, Shock Impact, Teleport, Reflect Raid, Warpinator, Judgment and Raging Storm.
- **Reward room:** Synchro, Warp, Bind, Aqua Splash, Quake, Thunder Raid and Stardust Blitz.
- **Story/world entry:** Terror in Halloween Town, Trinity Limit on entering Castle Oblivion, Magnet Spiral after the 8F Riku Replica encounter, Freeze after the 10F Vexen encounter.
- **100 Acre Wood:** Confuse via Piglet; Cross-slash+, Firaga Burst and Idyll Romp via their minigames. Honey Storm and Honey Pot belong to Bumble-Rumble's special deck.

Use the card/sleight record as the canonical definition and link each acquisition. [Sleight](https://www.khwiki.com/Sleight), [World Cards](https://www.khwiki.com/World_Cards), [100 Acre Wood rewards](https://www.khwiki.com/Game:100_Acre_Wood).

## Combination semantics

Order, identity, value sum, same/different weapon constraint and campaign all matter. A level requirement cannot substitute for learning the sleight. Two-card moves such as Stardust Blitz are real; a schema that requires exactly three ingredients is wrong. Some recipes have alternatives or a generic card category in one slot.

The JSON records **83 ordinary Sora names, two minigame names and 13 Riku names** from the inspected table. These counts describe the extraction, not an independently audited native menu. `combinationReference` remains readable text; `recipeAlternatives` now normalizes all 92 stock recipes, and six duel moves have explicit activation conditions. All 98 moves have effects. Illustrative icons do not narrow generic slots. `thirdCardPrecedence` remains null; full overlap/two-card precedence must be established before certifying a solver. Native order and Steam goal membership remain separate from recipe completeness.

Stocking normally makes the first card unavailable to normal reload for that battle; higher-tier recovery items and enemy effects introduce exceptions. This does not delete the player's permanent copy. Card value zero is a break tool whose behavior depends on play timing, not the numeric “strongest attack.” [Battle Card](https://www.khwiki.com/Battle_Card); the [modern general-info walkthrough](https://www.truetrophies.com/game/KINGDOM-HEARTS-ReChain-of-Memories/walkthrough/2) illustrates how deck order affects repeated Sonic Blade use.

## Movement and return visits

| Ability | Acquisition | Completion use |
|---|---|---|
| High Jump | Monstro, after Room of Beginnings | Text access prerequisite where needed |
| Glide | First entry into Neverland | Return to Tigger's Playground for Spellbinder |
| Super Glide | Castle Oblivion base Room of Rewards | Distinct reward claim; enhanced movement |

Sources: [High Jump](https://www.khwiki.com/High_Jump), [Glide](https://www.khwiki.com/Glide), [Superglide](https://www.khwiki.com/Superglide), [Spellbinder chest](https://www.khwiki.com/Game:100_Acre_Wood). The card world may be placed on a different floor within its allowed group; never state that Glide is universally a specific floor's reward.

## Recipe boundary examples

1. Sonic Blade accepts three different attack identities totaling 21; the same identities totaling 19 do not match it.
2. Sliding Dash and Blitz can share a total but differ by the identity constraint.
3. Zantetsuken accepts 0+0+0 and 9+9+9, not every sum between 0 and 27.
4. A two-card combination stays two-card; a third card may change precedence.
5. Using an item that restores unreloadable cards changes the battle state, not permanent inventory quantities.
6. Riku's Dark Aura is three Soul Eaters totaling 27 and requires Dark Mode; it is not a Sora unlock.

The targeted Re:CoM tests cover structured recipe boundaries and form-sensitive moves. Full frame-level combat data remains open; progression is resolved below.

## Complete progression reference

[Level](https://www.khwiki.com/Level) and [Stats](https://www.khwiki.com/Stats) support all 99 canonical level rows. Level 2 requires 25 EXP; levels 3–99 require four times the square of the destination level. Both campaigns cap at 99. Sora starts at 80 HP/275 CP, gains 15/25 per choice and caps at 560/1625; AP is fixed at 10. Riku starts at 80 HP/10 AP/8 DP, gains 15/1/2 and caps at 560/30/99. AP opportunities are level 2 then every three levels through 59. Deferred AP and Sora sleight choices persist; Sora learns available sleights in fixed order. Only HP choice heals in Re:CoM.

The individual Zantetsuken page and Destiny Islands Sora table contain contradictory 27-level/GBA-style landmarks. The edition-separated Level/Sleight tables retain the Re:CoM sequence above, including Zantetsuken 22 and Sonic Blade 27. See the conflict discussion in the resolution ledger.
