# Reverse/Rebirth — separate campaign, separate completion

Current data update: see the [2026-09-28 closure audit](data-gap-audit-2026-09-28.md). The initial research notes below retain their original evidence limits; the audit supersedes missing-field statements where data has now been filled.

Research: 2026-09-28. [World preset decks](riku-decks.json) · [Enemy-card records](enemy-cards.json) · [Sleights](sleights.json).

Riku's campaign unlocks after Sora's clear. It starts at Hollow Bastion on B12F, then follows selectable world groups and the fixed Destiny Islands → Twilight Town → Castle Oblivion ending floors. No 100 Acre Wood visit is present. Riku's deck is prescribed by the current world; Sora's card-buying and free deck editing are inapplicable. [Riku gameplay](https://www.khwiki.com/Riku), [World Cards](https://www.khwiki.com/World_Cards).

## Twelve Re:CoM presets extracted

Each linked source has separate original/remake tabs. These records come from **KHRECOM**, including every listed card value in source order. Counts below exclude previously earned, retained boss cards.

| World | Soul Eater cards | Other cards in preset | Source |
|---|---:|---|---|
| Traverse Town | 12 | Shadow | [World table](https://www.khwiki.com/Game:Traverse_Town) |
| Wonderland | 9 | Large Body | [World table](https://www.khwiki.com/Game:Wonderland) |
| Olympus Coliseum | 21 | Hi-Potion; Powerwild | [World table](https://www.khwiki.com/Game:Olympus_Coliseum) |
| Agrabah | 20 | Fat Bandit | [World table](https://www.khwiki.com/Game:Agrabah) |
| Halloween Town | 17 | Wight Knight | [World table](https://www.khwiki.com/Game:Halloween_Town) |
| Monstro | 20 | Search Ghost | [World table](https://www.khwiki.com/Game:Monstro) |
| Atlantica | 14 | Sea Neon; Darkball | [World table](https://www.khwiki.com/Game:Atlantica) |
| Neverland | 15 | Pirate | [World table](https://www.khwiki.com/Game:Neverland) |
| Hollow Bastion | 15 | Defender | [World table](https://www.khwiki.com/Game:Hollow_Bastion) |
| Twilight Town | 22 | Potion | [World table](https://www.khwiki.com/Game:Twilight_Town) |
| Destiny Islands | 23 | Hi-Potion | [World table](https://www.khwiki.com/Game:Destiny_Islands) |
| Castle Oblivion | 26 | Hi-Potion | [World table](https://www.khwiki.com/Game:Castle_Oblivion) |

The non-attack item names above must be compared with the JSON and source images during validation; these are preset candidates, not independently confirmed native inventories. Corridor/boss-specific deck substitution remains a separate research gap.

Wonderland's attack sequence is **5, 2, 1, 5, 4, 3, 5, 2, 1**. It contains no zero and no value above five. Explaining that constraint is more useful than recommending Sora's Sonic Blade deck. Traverse Town likewise differs substantially from the five-attack-card GBA preset; importing the original tab would be wrong.

## Enemy cards and persistence

Ten world-deck enemy-card entries are represented, including Atlantica's additional Darkball. Twelve boss-card entries are retained acquisitions: Guard Armor, Parasite Cage, Trickmaster, Darkside, Hades, Jafar-Genie, Oogie Boogie, Ursula, Hook, Dragon Maleficent, Lexaeus and Zexion. Names shared with Sora do not imply shared player state. [Enemy Card — Reverse/Rebirth](https://www.khwiki.com/Enemy_Card).

Sora later obtains Ansem, Lexaeus and Zexion through clear-gated Bounties; that is not the same as copying Riku's inventory into Sora. Riku does not receive an enemy card from every humanoid boss he defeats: Vexen, the Replica and Ansem are specifically excluded by the source.

## Riku systems

Riku chooses **HP, AP or DP** at level-up rather than Sora's CP/sleight options. Only choosing HP restores HP on a Re:CoM level-up. [Level](https://www.khwiki.com/Level).

Dark Mode activates after the battle's DP buildup reaches the activation condition; the separate DP stat governs the form's duration budget. The source describes a 30-DP activation threshold, an automatic reload on transformation, and an extra five DP for Rapid Break. During Zexion's battle the form is forced. [Dark Mode](https://www.khwiki.com/Dark_Mode). Do not confuse the buildup threshold with the player's upgraded DP stat.

| Mode | Move family | Rule |
|---|---|---|
| Dark Mode | Dark Break / Dark Firaga / Dark Aura | Three Soul Eaters: 5–15 / 16–25 / 27 |
| Friend | MM Miracle Lv2/Lv3 | Two/three King cards |
| Normal / Dark | Holy Burst / Inverse Burst | King + two Soul Eaters; form selects the variant |
| Duel | Impulse / Maelstrom / Barrage | Win three/five/seven-card duel |
| Dark Duel | Dark Impulse / Dark Maelstrom / Dark Barrage | Corresponding duel in Dark Mode |

The [Sleight source](https://www.khwiki.com/Sleight) requires at least eight reloadable cards to initiate a duel and describes matching an enemy card followed by the duel prompt, or using Duel Trigger. Enemy-specific timers and practical boss strategies remain to be normalized. The 13 listed move names must not inflate Sora's Sleight Master goal.

## Product implications

Use **D-Report** terminology for Riku, retain campaign-specific checks and last-view state, and expose shared reference definitions with scoped acquisitions. A campaign toggle is a content/state boundary, not a cosmetic skin.

Riku world completion cannot be a duplicate Sora chest list. Track the finite Riku acquisitions/collection goals that actually exist, with story/character Report achievements in their own track. Modern D-Report exact card membership, character-entry conditions, native ordering, EXP/AP caps and full boss routes remain explicit gaps.
