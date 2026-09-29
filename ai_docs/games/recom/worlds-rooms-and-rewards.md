# Worlds, Room Synthesis and acquisition goals

Research: 2026-09-28. All tables below select Re:CoM/HD rules. [World records](worlds.json) · [41 acquisition records](worlds-and-rewards.json).

## World order is partly chosen

| World | Sora floor | Riku floor |
|---|---|---|
| Traverse Town | 1F | B11F–B8F |
| Wonderland | 2F–6F | B7F–B4F |
| Olympus Coliseum | 2F–6F | B7F–B4F |
| Agrabah | 2F–6F | B11F–B8F |
| Halloween Town | 2F–6F | B7F–B4F |
| Monstro | 2F–6F | B11F–B8F |
| Atlantica | 7F–10F | B7F–B4F |
| Neverland | 7F–10F | B11F–B8F |
| Hollow Bastion | 7F–10F | B12F |
| 100 Acre Wood | 7F–10F | Not visited |
| Twilight Town | 11F | B2F |
| Destiny Islands | 12F | B3F |
| Castle Oblivion | 13F | B1F |

Ranges are selectable groups, not required visit sequences. Save a world identity independently of the floor assigned in a playthrough. There are 13 Sora world visits, but Sora does not use a Castle Oblivion World Card for 13F; “worlds visited” and “World Cards collected” are different inventories. [World Cards](https://www.khwiki.com/World_Cards).

## Base and Days reward chests

| World | Base chest | Days bonus chest |
|---|---|---|
| Traverse Town | Lionheart | Saïx |
| Wonderland | Synchro | Xemnas |
| Olympus Coliseum | Metal Chocobo | Total Eclipse |
| Agrabah | Warp | Luxord |
| Halloween Town | Bind | Bond of Flame |
| Monstro | Aqua Splash | Xaldin |
| Atlantica | Quake | Demyx |
| Neverland | Thunder Raid | Midnight Roar |
| Hollow Bastion | Mushu | Xigbar |
| Twilight Town | Stardust Blitz | Roxas |
| Destiny Islands | Megalixir | Two Become One |
| Castle Oblivion | Super Glide | Star Seeker |

These are **24 distinct reward claims**, not 24 reward rooms. 100 Acre Wood has none. If the bonus flag was absent during the first visit, reopening for the second chest consumes another Key to Rewards; after both rewards are claimed the room is no longer accessible. [Map Card — Room of Rewards](https://www.khwiki.com/Map_Card#Room_of_Rewards).

## Bounty inventory

| World | Ordinary Bounty | Additional condition |
|---|---|---|
| Traverse Town | — | Maverick Flare: Days flag |
| Wonderland | Stop | — |
| Olympus Coliseum | Blizzard Raid | — |
| Agrabah | Gravity | — |
| Halloween Town | Gifted Miracle | — |
| Monstro | Fire Raid | — |
| Atlantica | Homing Blizzara; Shock Impact | — |
| Neverland | Teleport | — |
| Hollow Bastion | Reflect Raid | — |
| Twilight Town | Warpinator | Ansem: Riku clear + first Marluxia |
| Destiny Islands | Judgment | Zexion: Riku clear + first Marluxia |
| Castle Oblivion | Raging Storm | Ultima Weapon; Lexaeus: Riku clear + first Marluxia |

The 17 rows in the structured inventory expand each named reward separately. This table does not include universal Gold/Platinum follow-up chests or ordinary random card repeats. Calm Bounty, Guarded Trove and False Bounty are room mechanisms, not three independent discoveries of the same reward. [World Cards](https://www.khwiki.com/World_Cards); individual sleight/card pages remain the next independent check for precedence.

## Room-use reference

Room cards affect encounters, battle conditions or services. The [29-card inventory](map-cards.json) preserves which cards Riku can use. Important rules from [Map Card](https://www.khwiki.com/Map_Card):

- Doors may require a color, exact number, higher/lower value, point total, or named keycard. Store these predicates separately.
- A zero satisfies higher/lower comparisons; it is not a wildcard for every exact-number requirement. Random Joker cannot replace a required keycard.
- Only one Key to Rewards can be held at once. The 7F-onward acquisition lead is corroborated in the [modern walkthrough](https://www.truetrophies.com/game/KINGDOM-HEARTS-ReChain-of-Memories/walkthrough/2).
- Leaving a floor resets generated rooms. A previously collected reward remains a historical acquisition in the app; regeneration must not clear its checkmark.
- 100 Acre Wood uses fixed minigame areas instead of Room Synthesis.

Exact per-world reward-door costs, Bounty reward precedence, and the complete world/difficulty card-drop matrices are **not yet transcribed**. No precise door-cost claim should be inferred from the world tables.

## Completion model — proposed implementation contract

Use one acquisition ID for a named world reward and link its output to the card/sleight definition. Keep a separate “card type discovered” flag and optional current quantity. Finding Lionheart once can satisfy both the chest goal and card collection membership, but never adds two units to a world reward denominator.

Count finite acquisition goals; do not attempt “all randomly generated chests.” Floor choice, rooms opened, keycards spent and story completion remain distinct from world collectible completion. The 10-hidden-chest Steam achievement is a threshold, not the complete treasure denominator.

Compact world marks, expanded directions, search and Data Jiminy must open the same acquisition record. An incomplete catalog displays coverage as partial rather than a misleading full-world 100%. No Available Now tracker is introduced; prerequisites remain readable text.
