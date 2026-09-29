# Minigames, completion goals and Steam achievements

Research: 2026-09-28. [47 Steam goal candidates](steam-achievements.json).

## 100 Acre Wood: rewards are not score thresholds

| Activity / area | First clear or discovery | Recorded replay reward | Steam target |
|---|---|---|---|
| Piglet / Pooh Bear's House | Confuse | — | No separate Piglet score target |
| Veggie Panic / Rabbit's House | Cross-slash+ | Fire 8, second clear | 150+ points |
| Balloon Glider / Hunny Tree | Firaga Burst | Stop 0, second clear | 500+ points |
| Tigger's Jump-a-Thon / Playground | Idyll Romp | Ether 9, second clear | 120+ points |
| Whirlwind Plunge / Muddy Road | Mega-Ether 5 | Gravity 9, second clear | 2,000+ points |
| Bumble-Rumble / Muddy Road | Elixir 1 | Hi-Potion 7, second clear | 70 bees within 100 seconds |
| Tigger's Playground chest | Spellbinder; Glide/Super Glide needed | — | Card collection membership |
| Complete the world | Bambi | — | Card collection membership |

Reward locations/values: [Game:100 Acre Wood](https://www.khwiki.com/Game:100_Acre_Wood). Bambi: [Summon Card](https://www.khwiki.com/Summon_Card). Score requirements: [Steam's public achievement list](https://steamcommunity.com/stats/2552430/achievements/).

The first-clear and second-clear columns do not promise every later replay repeats the same fixed reward. Preserve card value as a property of the reward copy, not a new card identity. No Torn Page hunt from KH1/KH2 belongs here.

Practical rules from individual minigame pages:

- [Veggie Panic](https://www.khwiki.com/Veggie_Panic): sort cabbage left and pumpkins right; special reactions handle large pumpkins/Pooh interference. The basic clear is 30 vegetables, far below the 150-point achievement.
- [Balloon Glider](https://www.khwiki.com/Balloon_Glider): reaching the top gives the first reward; collecting honey while preserving balloons is the separate score task.
- [Tigger's Jump-a-Thon](https://www.khwiki.com/Tigger%27s_Jump-a-Thon): repeat the stump sequence. The ordinary clear requires 25 successful jumps; achievement score is 120.
- [Whirlwind Plunge](https://www.khwiki.com/Whirlwind_Plunge): collect honey and recover Pooh after collisions; first completion grants Mega-Ether.
- [Bumble-Rumble](https://www.khwiki.com/Bumble-Rumble): protect Pooh's honey with a special Keyblade/Wind/Honey deck. Honey Storm and Honey Pot are minigame-only sleights. The source's initial 50-bee objective must not replace the platform's 70-bee timed condition.

Monstro's Shadow-clearing event is also recorded as a minigame in Re:CoM. It belongs in the Journal-entry audit even though it has no matching Pooh score achievement. [Remake overview](https://www.khwiki.com/Kingdom_Hearts_Re:Chain_of_Memories).

## Steam partition

The primary [Steam list](https://steamcommunity.com/stats/2552430/achievements/) contains **197 compilation goals**. The [Exophase Steam partition](https://www.exophase.com/game/kingdom-hearts-hd-1-5-2-5-remix-steam/achievements/) identifies **47 Re:CoM goals**; the JSON contains all 47 names and paraphrased requirements. The PlayStation list has a separate platinum, which is not imported.

Visible names were matched to Steam. Hidden descriptions were checked against the secondary partition. Duplicate display names cannot be global keys: **Ace Pilot** here means Balloon Glider, while the compilation also uses that name for Gummi goals. **Undefeated** likewise has more than one compilation entry. Steam API identifiers are not yet mapped, and app IDs are explicitly labeled as app IDs.

## Completion categories

| Track | Concrete goals / important boundary |
|---|---|
| Difficulty | Beginner-or-higher, Standard-or-higher and Proud, separately for Sora and Riku; the modern text supports stacking |
| Campaign events | 1F, 5F, 13F and Sora ending; B12F, B8F, B1F and Riku ending |
| Journal / D-Report | Whole report plus story, character and card components; Sora additionally has minigame entries |
| Collection | All required Sora sleights; ordinary Card Collections; not every card value or Premium duplicate |
| Leveling | Both maximum levels; all Riku attack bonuses |
| Counters | 500 deck edits, 20 Premium conversions, 1,500 breaks, 150 field first strikes, 100 duels, 300 rooms, 10 hidden chests |
| Economy | More than 300 battle cards, more than 10,000 Moogle Points, more than 20,000 points spent; exact cumulative/held boundaries still need validation |
| Combat / run | Heal below 5% HP; hit with an object; finish without Continue; finish without fleeing |

The actual member list is in JSON, with each goal's source. Preserve “more than” versus “at least” and do not invent a hidden exact comparison from shorthand guide wording.

## Run restrictions and remaining ambiguities

No Escape and Undefeated can be invalidated during a run; they belong in run goals, not world collectibles. The public requirement says no Continue, not “never reach a Game Over screen.” Save/reload recovery, whether a particular forced escape counts, and cross-campaign counter aggregation have not been validated for a pinned Steam build. Do not certify a run from ordinary chest checks.

Ordinary Card Master completion and Gold/Platinum follow-up collection must remain separate until modern Card Index membership is audited. The [PS3 Journal guide](https://www.truetrophies.com/game/KINGDOM-HEARTS-ReChain-of-Memories-PS3/walkthrough/5) explicitly excludes Special Cards from its Card Master trophy requirement; this is useful HD lineage evidence, not independently confirmed Steam trigger code.

A complete platform Report achievement can include narrative/character entries even though the app's world collectible denominator excludes them. Preserve the achievement's full requirement without turning story flags into world treasures. Exact missing-character triggers (including friend-card appearances) and native completion stamps are next-pass work.
