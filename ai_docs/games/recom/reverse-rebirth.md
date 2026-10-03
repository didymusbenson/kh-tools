# Reverse/Rebirth — separate campaign, separate completion

Current reference, updated October 2, 2026. See the [complete 32-finding disposition](research-resolution-2026-10-01.md) for supported facts and precise remaining limits; the [September 28 closure](data-gap-audit-2026-09-28.md) remains historical provenance.

Research: updated 2026-10-01. [World preset decks](riku-decks.json) · [Enemy-card records](enemy-cards.json) · [Sleights](sleights.json).

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

These are source-backed remake world inventories, including non-attack items. All 12 retained boss-card identities and defeat conditions are separately structured in `riku-decks.json`. Castle exit-hall fights use the Castle Oblivion preset. Exact early Ansem tutorial inventory and ordered retained-card/state exceptions are optional research outside the agreed player-facing scope.

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

The [Sleight source](https://www.khwiki.com/Sleight) requires at least eight reloadable cards to initiate a duel and describes matching an enemy card followed by the duel prompt, or using Duel Trigger. The new [combat reference](combat-reference.json) supplies 43 explicit duel timers plus unmapped Replica alternatives; complete encounter tactics and frame behavior remain incomplete. The 13 listed move names must not inflate Sora's Sleight Master goal.

October 1: these form rules, early-story unlock context and duel initiation requirements now propagate to all 13 structured/runtime sleight entries. COM-019 is closed; only the encounter-specific timing ambiguities recorded under COM-014 remain open. See [resolution log](research-resolution-2026-10-01.md).

## Product implications

Use **D-Report** terminology for Riku, retain campaign-specific checks and last-view state, and expose shared reference definitions with scoped acquisitions. A campaign toggle is a content/state boundary, not a cosmetic skin.

Riku world completion cannot be a duplicate Sora chest list. Track the finite Riku acquisitions/collection goals that actually exist, with story/character Report achievements in their own track. The 59-card Riku roster and complete level 1–99 progression/caps are supplied. Riku caps are 560 HP, 30 AP and 99 DP; AP choices unlock at level 2 then every three levels through 59, and unchosen choices persist. Character-entry conditions, native order/percentage, full boss routes remain research work; scripted inventory exceptions are optional scope.

## October 1 encounter continuation

The Hollow Bastion deck reference now distinguishes the early Ansem card-break/duel tutorial from his final boss fight, using the [PS4 Beginner route](https://www.speedrun.com/de-DE/khrecom/guides/bzl3k). The Destiny Islands reference includes [Zexion’s remake card-stealing/book mechanics](https://www.khwiki.com/Game:Zexion). These additions do not certify every ordered corridor deck or a universal speedrun route.

October 2 follow-up: [remaining-gap outcomes](gap-closure-2026-10-02.md) records new Steam farm/Days guidance, bounded stock priority, Riku Report/duel observations and edition-qualified replay evidence. The overall register remains 18 closed, nine partial, two open and three non-factual limitations.

October 2 targeted COM-001–003 pass: [research results](research-com-001-003-2026-10-02.md). Shop and Riku player needs are met; remaining internal mechanics are optional research by user scope decision. COM-003 now supplies practical routes and fallbacks for all 30 targets. The Soldier Neverland summon footnote is disputed, not a confirmed farm.

Current COM-001–003 status: [practical coverage and scope closure](farm-coverage-closure-2026-10-02.md). No guaranteed drops or independent Steam gameplay test is claimed.
