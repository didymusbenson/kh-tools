# KH1FM challenges, Gummi and run-goal research

Researched 2026-09-18. Modern Final Mix rules; all systems below remain MVP. Sources describe game behavior; app counting and route recommendations are identified separately.

## Olympus cups and variants

Each main cup needs three independent clear records: party, solo and time trial. Unlock the next variant after the preceding clear. Store round lists and individual boss rewards separately from cup completion rewards.

| Cup / source | Unlock | Rounds / time trial | Party reward | Solo reward | Timed reward |
|---|---|---|---|---|---|
| [Phil](https://www.khwiki.com/Phil_Cup) | Seal Traverse Town | 9 / 3 minutes | Gravity upgrade | Combo Plus | Tech Boost |
| [Pegasus](https://www.khwiki.com/Pegasus_Cup) | Complete Monstro | 9 / 3 minutes | Strike Raid | Orichalcum | Dark Matter |
| [Hercules](https://www.khwiki.com/Hercules_Cup) | Seal Halloween Town and Neverland | 9 / 3 minutes | Herc's Shield | Critical Plus | Gravity Break |
| [Hades](https://www.khwiki.com/Hades_Cup) | Unlock first three cups; seal Hollow Bastion | 49 / 20 minutes | Trinity Limit | Save the Queen | Save the King |

Hercules Cup also grants Yellow Trinity; clearing the first three cups opens the Olympia chest. Cloud's Hercules Cup encounter supplies Metal Chocobo. Hades Cup contains additional rewards at named boss rounds; don't collapse these into the final cup reward. The linked cup pages provide the full seed/opponent lists for importing.

Practical notes: defeat Yuffie before Leon to remove her healing in their paired encounter; throw a barrel to remove Hercules's invulnerability. Hades Cup checkpoints and variant unlock behavior need explicit fields in the normalized tournament data. [Pegasus strategy](https://www.khwiki.com/Pegasus_Cup), [Hercules strategy](https://www.khwiki.com/Hercules_Cup)

## Optional endgame encounters

| Encounter / source | Access and reward | Core guidance |
|---|---|---|
| [Ice Titan / Gold Match](https://www.khwiki.com/Gold_Match) | Clear four main cups; solo; Diamond Dust | Return ice projectiles with Guard, then attack during openings. Aero changes projectiles into a form that defeats this approach; do not recommend it here. |
| [Sephiroth / Platinum Match](https://www.khwiki.com/Platinum_Match) | Unlock first three cups and seal Hollow Bastion; solo; One-Winged Angel and Report 12 | Prepare healing items and defensive abilities; watch Heartless Angel. |
| [Kurt Zisa](https://www.khwiki.com/Kurt_Zisa) | Carpet in Aladdin's House after the Hollow Bastion rescue events; Zantetsuken and Report 11 | Break hand orbs physically during the magic seal, then attack exposed head. During barrier phase, use magic; physical hits can supply MP. Summon before magic is sealed if using a summon. |
| [Phantom](https://www.khwiki.com/Phantom) | Speak to Tinker Bell in the ship cabin with Peter Pan after rescue; Stop upgrade | Stop the clock hands to delay Doom. Match the exposed orb: red Fire, blue Blizzard, yellow Thunder, white physical. Bring MP recovery. |
| [Unknown](https://www.khwiki.com/Game:Xemnas) | Hollow Bastion Chapel portal; EXP Necklace and Report 13 | Use Gravity openings and brief combos. When commands change, select Release rather than Shock. Save recovery resources for the faster final phase. |

Unknown's exact earliest portal-spawn flag remains a targeted verification item; do not encode “available now” from an assumed Keyhole flag. The source establishes the encounter and rewards but does not establish that exact boundary.

For Sephiroth, Heartless Angel reduces HP to 1 and MP to 0; interrupt it before it lands or recover immediately with an item. Leaf Bracer, Second Chance and MP recovery help. Final Mix Sonic Blade does not retain invulnerability throughout all follow-up thrusts, so older advice about that tactic needs correction. [KH1 battle mechanics](https://www.khwiki.com/Game:Sephiroth)

“Optional boss” is broader than these five endgame encounters: retain Destiny Islands sparring, Coliseum story/round opponents, and world bosses in the encounter catalog with their own required/optional status. Do not confuse an endgame checklist with a complete enemy/Journal inventory.

## Minigames and reward interactions

| Activity / source | Rules established for planning |
|---|---|
| [Phil's Training](https://www.khwiki.com/Phil%27s_Training) | Initial barrel tests: 20 in 30 seconds, then 25 in 60 seconds; grants Thunder. Keep repeat records separate from first reward. |
| [Jungle Slider](https://www.khwiki.com/Jungle_Slider) | Fruit challenge starts after Deep Jungle's Keyhole. Five courses, ten fruit each; complete a course's fruit collection to open the next course on a later attempt. |
| [Vine Swinging](https://www.khwiki.com/Vine_Swinging) | Four courses: Jump, Trap, Acrobat, Expert; activate the flower in Vines. Record course and best time separately. |
| [Hundred Acre Wood](collectibles-and-progression.md#torn-pages-and-hundred-acre-wood) | Five story activities plus Cheer targets, Rare Nuts and incidental rewards. |
| [Clock Tower](https://www.khwiki.com/Game:Neverland) | Twelve hourly doors; game-time availability, not real-world appointment reminders. Access is interrupted while Phantom occupies the tower. |
| [Mushroom challenges](synthesis-farming-and-equipment.md#mushroom-challenges-and-rare-rewards) | Spell Arts, juggling ranks, Mystery Mold and Prime Cap belong in the comprehensive item/challenge catalog. |

Jungle Slider course order and Final Mix rewards: Green Serpent → Elixir; Splash Tunnel → AP Up; Jade Spiral → Dark Matter; Panic Fall → Defense Up; Shadow Cavern → Power Up. Exit choices leading onward are left, left, right, left. The complete run collects 50 fruit. [Course table](https://www.khwiki.com/Jungle_Slider)

Clock Tower doors 1–12 award: Orichalcum, Power Up, Mythril Shard, Power Up, AP Up, Mythril, AP Up, Defense Up, Orichalcum, Defense Up, Mythril Shard, Megalixir. Track each door's claimed state independently; waiting for a door is not completion. [Neverland treasure table](https://www.khwiki.com/Game:Neverland)

## Gummi mission objective matrix

There are 30 missions: three for each destination below. This compact planning matrix retains the constraints needed by the future checklist. `S` = score, `E` = enemy ships destroyed, `O` = obstacles destroyed, `B` = blocks collected, `build` = installed block count, `ND` = no damage, `NB` = no braking. An arrow specifies departure; the row is the destination. `noShield` prohibits Shield-G/Shield2-G; `only` restricts weapons.

| Destination | Mission 1 | Mission 2 | Mission 3 |
|---|---|---|---|
| Traverse | S≥80 | Olympus→; shield-blocks≥30 | Hollow-Bastion→; S=0; ND; noShield |
| Wonderland | S≥120 | Haste/Haste2 uses≥5; ND | Traverse→; B≥40 |
| Olympus | S≥180 | Deep-Jungle→; Thundara-only; E≥70 | Traverse→; O=140 |
| Deep Jungle | S≥200 | Agrabah→; special-blocks≥10 | Wonderland→; Thundaga-only; E≥55 |
| Agrabah | S≥330 | Wonderland→; Comet-only; E≥130 | B≥130; noDrain/Osmose |
| Atlantica | armor-blocks≥10 | O=0; S≥240 | items=0; S≥260 |
| Halloween | power-blocks≥20 | E≥220; NB | Neverland→; Meteor-only; S≥550 |
| Neverland | Atlantica→; Thunder-only; E≥150 | Olympus→; build≥100; ND | Olympus→; build≤10; O≥777 |
| Hollow Bastion | Neverland→; Ultima-only; E≥130 | S≥1600 | Haste2 uses≥10; ND; noShield |
| End of World | build≤2; ND; NB | build≤5; S≥350 | S≥600 |

Source: [Final Mix Gummi Missions](https://www.khwiki.com/Gummi_Missions). Verify Wonderland's wording about Haste use against the game before turning it into a machine-evaluated rule. Do not confuse blocks installed with blocks collected.

## Blueprint collection

The source roster yields 48 KH1FM blueprints: 9 default/NPC, 28 enemy drops, 11 mission rewards. This is a count derived from the table, not the achievement threshold. [Blueprint roster](https://www.khwiki.com/Blueprint)

| NPC blueprint | Condition |
|---|---|
| Kingdom | Default |
| Geppetto | Speak to Geppetto |
| Cid | 500 Heartless |
| Cactuar | 1,000 Heartless |
| Yuffie | 1,500 Heartless |
| Aerith | 3,000 Heartless |
| Leon | 4,000 Heartless |
| Hyperion | 5,000 Heartless and six summons |
| Chocobo | Enter Geppetto's House 30 times; speak to Pinocchio |

Enemy-drop roster: Cindy, Shiva, Lamia, Sandy, Sylph, Carbuncle, Mindy, Goblin, Bomb, Remora, Ahriman, Imp, Siren, Stingray, Catoblepas, Adamant, Serpent, Ifrit, Odin, Atomos, Golem, Diablos, Deathguise, Typhoon, Alexander, Leviathan, Ramuh, Omega.

Mission-3 rewards in the destination order above: Moogles, Valefor, PuPu, Cerberus, Tonberry, Pandaemonium, Ixion, Gilgamesh, Phoenix, Eden. All missions award Bahamut. Track blueprint ownership separately from assembling a ship.

The parts catalog must include shapes, stats, purchase/drop/treasure/mission sources, functional restrictions and the player's stock. Mission-exclusive cosmetic parts also belong in full collection. Provide practical builds for no-damage, small-build, collection and weapon-restricted missions. [KH1 parts catalog](https://www.khwiki.com/Gummi_Blocks_(KH))

## Modern achievements and restricted runs

Use **HD 1.5 + 2.5 ReMIX's Final Mix rules** as the researched baseline. The official Steam package includes several games; its collection-wide achievement total must never become KH1's denominator. [Official package](https://store.steampowered.com/app/2552430/KINGDOM_HEARTS_HD_15_25_ReMIX/)

| Requirement | Planning implication |
|---|---|
| Clear on Proud; lower-difficulty clear conditions allow higher difficulty | Modern difficulty achievements stack; do not prescribe three runs from PS3 guides |
| Unchanging Armor | Preserve the restricted run's equipment history |
| Undefeated | Track use of Continue, not merely deaths |
| Speedster | Defeat World of Chaos within 15 hours; track game time |
| Treasure Hunter | 100 chests is an achievement threshold, not all treasures |
| Gummi Ship Collector | 30 blueprints is an achievement threshold, not all 48 |
| Synthesis milestones | 1/3/15/30 unique crafts are milestones, not the whole 33-recipe catalog |

Sources: [modern conditions and edition annotations](https://www.khwiki.com/Trophies), [official Steam achievement descriptions](https://steamcommunity.com/stats/2552430/achievements/).

Other achievement families cover Journal sections, weapons, magic/summons, level 100, enemy/munny counters, bosses/cups, solo/time clears and Gummi routes/missions. Import exact platform IDs, names and requirement memberships; separate the PlayStation platinum from ordinary achievements. The official list contains repeated names across games, so name alone is not an ID.

**App route recommendation, not a game requirement:** offer a thorough completion run and a separate fast restricted run. This reduces tension between exploration/farming and time/equipment restrictions. Do not assert the goals are mechanically incompatible or require two runs. Preserve user choice.

Before publishing restricted-run guidance, validate which party equipment changes invalidate Unchanging Armor, scripted equipment exceptions, Continue/reload handling, timer behavior and achievement persistence after returning to a pre-final-boss save. Those details are not established by the terse achievement descriptions and must not be guessed.
