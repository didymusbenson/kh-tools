# KH2FM materials, equipment and progression acquisitions

Research snapshot: 2026-09-18. Synthesis is a first-class module. Follow [synthesis and opt-in inventory](../../content/synthesis-and-inventory.md): checklist completion works without inventory entry; when enabled, recipe ingredients show owned/required (`x/y`) and shortage quantities. There is no Available Now filter or plot-gate tracker. Display necessary prerequisites as text.

## Material coverage and meaningful farming rules

The material index contains **60 types**: fourteen four-tier families (Blazing, Frost, Lightning, Lucid, Power, Dark, Dense, Twilight, Mythril, Bright, Energy, Serenity, Remembrance, Tranquility), plus Orichalcum, Orichalcum+, Manifest Illusion and Lost Illusion. Legacy `Tranquil` names should normalize to `Tranquility`. The count is corroborated by the [material index](https://www.khwiki.com/Synthesis_material), but its Manifest Illusion rank conflicts with the item page. Do not derive recipes or rank rewards from that index alone.

These are base drop probabilities, not party-adjusted chances. Each cell lists enemy → chance in percent. Enemy area/spawn conditions remain a separate source relation; the legacy SQL generally records only worlds.

| Material family | Shard | Stone | Gem | Crystal |
|---|---|---|---|---|
| [Blazing](https://www.khwiki.com/Blazing) | Hammer Frame 10; Minute Bomb 6 | Cannon Gun 6; Tornado Step 8 | Fat Bandit 12; Fiery Globe 4 | Crescendo 6; Crimson Jazz 12 |
| [Frost](https://www.khwiki.com/Frost) | Hook Bat 6; Lance Soldier 10 | Aeroplane 8; Hot Rod 12 | Fortuneteller 8; Icy Cube 4 | Living Bone 12 |
| [Lightning](https://www.khwiki.com/Lightning) | Bolt Tower 10; Rapid Thruster 4 | Driller Mole 6; Emerald Blues 10 | Armored Knight 12; Surveillance Robot 8 | Devastator 4; Strafer 6 |
| [Lucid](https://www.khwiki.com/Lucid) | Rabid Dog 6; Trick Ghost 10 | Graveyard 12; Toy Soldier 12; Wight Knight 8 | Bookmaster 10; Magnum Loader 8 | Neoshadow 8 |
| [Power](https://www.khwiki.com/Pulsing) | Creeper Plant 8; Large Body 12 | Luna Bandit 8; Silver Rock 6 | Aerial Knocker 8; Shaman 10 | Morning Star 12 |
| [Dense](https://www.khwiki.com/Betwixt) | Creeper 8; Dragoon 12 | Sniper 12 | Samurai 12 | Berserker 12 |
| [Twilight](https://www.khwiki.com/Twilight) | Dusk 10; Gambler 12 | Dancer 12 | Assassin 12 | Sorcerer 12 |
| [Energy](https://www.khwiki.com/Wellspring) | Bolt Tower, Gargoyle Knight, Gargoyle Warrior, Nightwalker: 4 each | Hammer Frame, Lance Soldier, Trick Ghost: 4 each | Emerald Blues, Fortuneteller: 4 each | Bookmaster, Shaman: 4 each |
| [Remembrance](https://www.khwiki.com/Remembrance) | Beffudler 6; Iron Hammer 10; Camo Cannon 6 | Aerial Viking 6; Magic Phantom, Lance Warrior, Necromancer: 10 each | Spring Metal, Runemaster: 10; Mad Ride 12 | Reckless 12 |

Dark and the complete Bright source table remain extraction/normalization work. Sources often redirect family names to KHIII-era names (Power→Pulsing, Dense→Betwixt, Bright→Soothing, Energy→Wellspring, Serenity→Hungry); select the KHII section and retain KH2 display names. A redirect or disambiguation title must never silently rename the game's materials.

Final Mix's Serenity sources differ materially from the original game: the original Nobody Serenity drops are replaced. Crystals are available through Bulky Vendor, rewards and synthesis; higher-tier Cavern enemies provide Gems. The legacy source list must not recommend Assassin/Sorcerer as Serenity Crystal farms. [Serenity/Final Mix obtainment](https://www.khwiki.com/Hungry).

Mushroom XIII provides Tranquility tiers according to rank: Shard at E or better, Stone D+, Gem C+, Crystal B+; A/S yield two Crystals in the inspected summary. Keep rank reward tiers separate from the Journal target for appeasing a mushroom. [Tranquility](https://www.khwiki.com/Tranquility).

Bulky Vendor is an interaction source, not a normal enemy kill: trigger it by using/breaking scenery after the rare-Heartless message, then select the reaction command at the relevant HP tier. Candidate rooms are Agrabah Bazaar, Halloween Town Candy Cane Lane, Land of Dragons Checkpoint, Beast's Castle West Hall, and Olympus Cave of the Dead: Entrance. Room/edition-specific reported spawn bugs need independent validation before becoming route instructions. [Bulky Vendor](https://www.khwiki.com/Bulky_Vendor).

Lost Illusion is repeatably sourced from the five Castle Oblivion members' Data fights; the corresponding Absent Silhouettes, Garden chest and collector reward are distinct one-time sources. Manifest Illusion has Cavern chest, puzzle/collector, synthesis and Lingering Will routes. Treat one-time stock and repeatable farms separately. [Illusion](https://www.khwiki.com/Illusion).

## All seven Orichalcum+ acquisitions

| Source | Acquisition and linked state |
|---|---|
| Twilight Town, Sunset Terrace | Open its chest; link the treasure record |
| Space Paranoids, Central Computer Mesa | Open its chest; link the treasure record |
| The World That Never Was, Brink of Despair | Open its chest; link the treasure record |
| 100 Acre Wood, Starry Hill | Finish the final Torn Page activity |
| Atlantica | Finish A New Day is Dawning |
| Olympus Coliseum | Win Goddess of Fate Cup |
| Moogle collection reward | Obtain every material type and claim the reward |

The seven-source set is corroborated by [Orichalcum](https://www.khwiki.com/Orichalcum). Three are chest-linked, four are direct reward acquisitions. They must not be counted again merely because the material checklist links to them. Exact chest landmarks, musical access prerequisites, the collector threshold excluding its own reward, and claim timing still need explicit record-level verification.

## Moogle and recipe rules

Levels 2/3 enable Bright/Energy and Serenity respectively; level 4 permits two modifier types. Levels 5/6/7/9 reduce costs for C/B/A/S products, and level 8 opens the advanced Free Development group. Five collected material types unlock the initial equipment group; twenty unlock the second group and Mythril Shard/Stone. Bright affects EXP, Energy cost, Serenity output. [Synthesis](https://www.khwiki.com/Synthesis).

[The 30-base-recipe catalog](synthesis-recipes.md) supplies concrete ingredients, upgrades, unlocks and conflicts. Reject legacy aggregate `Needed` values. A useful undiscounted fixture, assuming Draw Ring's prerequisite creation is already satisfied: four Lucky Rings request Manifest Illusion 4, Remembrance Shard 12, Bright Gem 12, Bright Stone 20, Bright Shard 36 and Serenity Crystal 4. This is a multiplication fixture, not an optimized farming total; Energy/Moogle choices change the paid quantities. [Draw Ring](https://www.khwiki.com/Draw_Ring).

## Equipment acquisition inventory

[Equipment candidates](equipment-candidates.md) retain all 24 Keyblade, 12 staff, 12 shield, 34 armor and 33 accessory legacy names with row references. The 12 staff/12 shield lists omit Final Mix additions and cannot certify full inventories. Armor/accessory counts are candidates, not a substitute for acquisition/stat verification.

| Sora Keyblade | Acquisition | Evidence |
|---|---|---|
| Kingdom Key | Starting weapon | [Item](https://www.khwiki.com/Kingdom_Key) |
| Star Seeker | New clothes from the fairies | [Item](https://www.khwiki.com/Star_Seeker) |
| Hidden Dragon | Shan-Yu | [Item](https://www.khwiki.com/Hidden_Dragon) |
| Hero's Crest | Hydra | [Item](https://www.khwiki.com/Hero%27s_Crest) |
| Monochrome | Finish Timeless River | [Item](https://www.khwiki.com/Monochrome) |
| Follow the Wind | Barbossa | [Item](https://www.khwiki.com/Follow_the_Wind) |
| Circle of Life | Speak to Simba at Oasis | [Item](https://www.khwiki.com/Circle_of_Life) |
| Oathkeeper | Twilight Town's second-visit gate | [Item](https://www.khwiki.com/Oathkeeper) |
| Photon Debugger | Hostile Program | [Item](https://www.khwiki.com/Photon_Debugger) |
| Rumbling Rose | Reunite with Beast | [Item](https://www.khwiki.com/Rumbling_Rose) |
| Guardian Soul | Hades | [Item](https://www.khwiki.com/Guardian_Soul) |
| Wishing Lamp | Jafar | [Item](https://www.khwiki.com/Wishing_Lamp) |
| Decisive Pumpkin | The Experiment | [Item](https://www.khwiki.com/Decisive_Pumpkin) |
| Sleeping Lion | Leon before second Space Paranoids visit | [Item](https://www.khwiki.com/Sleeping_Lion) |
| Gull Wing | Gullwings after the 1,000 Heartless battle | [Item](https://www.khwiki.com/Gull_Wing) |
| Mysterious Abyss | Ursula's Revenge | [Item](https://www.khwiki.com/Mysterious_Abyss) |
| Sweet Memories | The Expotition | [Item](https://www.khwiki.com/Sweet_Memories) |
| Bond of Flame | Nobodies in Betwixt and Between | [Item](https://www.khwiki.com/Bond_of_Flame) |
| Two Become One | Roxas | [Item](https://www.khwiki.com/Two_Become_One) |
| Oblivion | Reunion with Riku | [Item](https://www.khwiki.com/Oblivion) |
| Fatal Crest | Goddess of Fate Cup | [Item](https://www.khwiki.com/Fatal_Crest) |
| Fenrir | Sephiroth, then Cloud's follow-up | [Item](https://www.khwiki.com/Fenrir) |
| Winner's Proof | Mushroom XIII's final reward | [Item](https://www.khwiki.com/Winner%27s_Proof) |
| Ultima Weapon | Synthesis; Ultimate Recipe | [Item](https://www.khwiki.com/Ultima_Weapon) |

Final Mix farming corrections: Sweet Memories grants Drive Converter and +4 Magic, Meteor Staff grants Thunder Boost, and Genji Shield grants Hyper Healing. Their original-game Lucky Lucky abilities in legacy equipment rows are wrong for this baseline. [Sweet Memories](https://www.khwiki.com/Sweet_Memories), [Meteor Staff](https://www.khwiki.com/Meteor_Staff), [Genji Shield](https://www.khwiki.com/Genji_Shield).

Do not automatically treat an equipment purchase/synthesis record as permanent current possession. Acquisition/crafted-once completion and optional inventory are different facts. The prologue Medal condition (lose to Setzer) and Champion Belt alternative require explicit scope and missability records; do not add a narrative Struggle walkthrough.

## Drive Forms, Growth and ability access

| Form | Acquisition | EXP unit while in form | Growth |
|---|---|---|---|
| [Valor](https://www.khwiki.com/Valor_Form) | New clothes | Successful strikes, not kills | High Jump |
| [Wisdom](https://www.khwiki.com/Wisdom_Form) | Timeless River clear | Heartless defeats | Quick Run |
| [Limit](https://www.khwiki.com/Limit_Form) | Second Twilight Town visit | Limit finish command uses, even a miss | Dodge Roll |
| [Master](https://www.khwiki.com/Master_Form) | Mickey reunion in Hollow Bastion | Small Drive orb 1; large 3 | Aerial Dodge |
| [Final](https://www.khwiki.com/Final_Form) | After Roxas; first random activation unlocks menu use | Nobody defeats | Glide |

Standard Sora gains Growth levels 1/2/3 at the corresponding Form levels 3/5/7; MAX Growth is a form's own ability, not standard Sora's level 4. The inspected [abilities table](https://www.khwiki.com/Abilities_(KHII)) contains 100 action rows, 20 Growth rows and 47 support rows, including form/party/version-specific variants. These 167 rows are not 167 independently collectible Sora abilities. Normalize character, form, level-choice, equipment and Critical-only grant conditions before counting. Ability AP costs and acquisition mapping remain partial; the legacy Abilities tab contains no values.

## Magic and summon acquisitions

Magic is granted as **element upgrades**; a fixed route does not prove which named tier a player receives at a particular event. Recover eighteen grant records, then derive the attained tier from their element count. A notable Final Mix correction: the final Magnet element comes from **Luxord**, whereas the legacy sheet says Xigbar. [Magnet](https://www.khwiki.com/Magnet).

| Element | Three grant sources |
|---|---|
| [Fire](https://www.khwiki.com/Fire) | Hollow Bastion gate defense; Scar; Genie Jafar |
| [Blizzard](https://www.khwiki.com/Blizzard) | Merlin meeting; Hollow Bastion Demyx; Atlantica completion |
| [Thunder](https://www.khwiki.com/Thunder) | Hydra; Storm Rider; Groundshaker |
| [Cure](https://www.khwiki.com/Cure) | Beast's Castle completion; Goofy reunion; 100 Acre Wood completion |
| [Magnet](https://www.khwiki.com/Magnet) | Oogie Boogie; Grim Reaper; Luxord in Final Mix |
| [Reflect](https://www.khwiki.com/Reflect) | Timeless River Pete; Xaldin; MCP |

Four summon charms: Baseball/Chicken Little from Merlin's explanation of Pooh's damaged book; Lamp/Genie after the first Agrabah visit; Ukulele/Stitch in Ansem's Study's chest; Feather/Peter Pan in Interceptor's Hold's chest. The two chest charms link existing treasure state. Peter Pan and Tinker Bell are one charm acquisition, not two. [Summon Charms](https://www.khwiki.com/Summon_Charms). Summon EXP/level thresholds and exact party-use restrictions remain research tasks for the separate progression tool.
