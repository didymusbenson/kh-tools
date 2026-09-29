# BBS Final Mix: shared reference versus character progress

Researched 2026-09-28 for the user's category/navigation decision. Baseline: modern HD Final Mix, initially Steam. This is a source-backed scope recommendation, not implemented navigation or a complete enemy/encounter transcription. Community sources are identified as such; no gameplay certification is claimed.

## Main finding

Most categories are **hybrid**: shared definitions, character-specific availability or acquisition, and independently saved character results. “All three can do this” does not mean “do it once for all three.” The Unversed is the strongest candidate for an easily accessible shared reference catalog. Mirage Arena and Unversed Missions can share explanatory pages, but their progress belongs to each character.

The [BBS Reports description](https://www.khwiki.com/Report#Kingdom_Hearts_Birth_by_Sleep) explicitly distinguishes each protagonist's Reports from the aggregated Trinity Archives. Arena, minigames and Unversed Missions belong to individual Game Records. Enemy encounters and collected commands likewise belong to individual Reports. Trinity aggregation is a separate view, not evidence that individual checklists share saved values.

## Category matrix

“Separate state” below means the app must keep character/episode results independent when it tracks that category. It does not add a new requirement to track every statistic appearing in the game.

| Category | Shared reference | Character-specific information/state | Navigation recommendation | Evidence confidence |
|---|---|---|---|---|
| Treasures | Item definitions, related acquisition links | Different chest lists, rooms, rewards; individual collection and world counts | Character Reports; universal command details link the correct character chest | Existing source inventory T122/V130/A122; exact directions/order still partial |
| Stickers / album | Pickup/placement mechanics and reward-tier framework | Different stickers and placement layouts; pickups, points and rewards separate per character | Character Reports; shared explanation accessible | [Sticker Album](https://www.khwiki.com/Sticker_Album); candidate inventory 20 each |
| Keyblades | Stats/description for shared weapon forms | Exclusive forms, acquisition conditions and possession; episode-only forms | Character list by default; accessible cross-character comparison | [Keyblade CSV](../games/bbsfm/keyblades.csv), examples below; modern full roster still not independently certified |
| The Unversed / bestiary | Enemy identity, behavior and common combat guidance | Encounter routes, character/world variants, difficulty/story-scaled stats, shop-level and Arena drop differences; encounter completion if tracked | Shared bestiary with character-aware location/stat/drop views; character Reports link to the scoped view | Per-enemy tables support variants; complete per-character Reports roster remains unaudited |
| Mirage Arena | Same FM match definitions, rounds/bosses and HD bonus rules | Access conditions, rewards, character clear records, Arena level, medals and best results | Shared reference reachable directly; character Game Records own completion | Strong on shared catalog and exceptions; some exact gate/reward data conflicted |
| Unversed Missions | Same nine mission identities, base objectives and rank tables | Three room differences, one command-reward split, character-dependent strategy and individual records | Character Game Records; shared guide or comparison accessible | Explicit character locations/reward distinction; numerical boundaries need final reconciliation |
| Commands / Shotlocks | Canonical definitions and recipe graph | Usability, all acquisition routes, mastery/obtained state and character probabilities | Root **Command Melding** for discovery/planning; scoped Command Collection links | Structured reference useful but full catalog and route coverage incomplete |
| Abilities | Effects, stack caps, crystal/type mapping | Learned/equipped progress per character; recipe route eligibility | Shared reference through Command Melding; character learned state only | Existing ability audit; random crystal mechanics remain partial |
| D-Links / Styles / Finish Commands | Common mechanics and some shared definitions | Available partners/styles, finish-tree branches, unlocks and use records | Character Command Collection; shared mechanics linked | Existing partial source pack; do not assume identical rosters |
| Ice cream / flavors | Recipe/flavor definitions and production mechanics | Eight eligible recipes per character, exclusive styles, ingredient routes and manufacturing progress | Shared reference with character choice; character collection links | [Ice Cream](https://www.khwiki.com/Ice_cream), existing 14-recipe/42-flavor data |
| Materials / shops | Crystal effects, some shared stock definitions | Munny/medal gates, character-only stock, conditional enemy routes; balances if tracked | Shared reference integrated into root tool, active character explicit | Existing sources partial; purchase routes cannot be one global price field |
| Command Board / racing / rhythm / Fruitball | Common rules, maps/songs/courses | Opponents/panels/rewards can differ; wins/scores/collected rewards belong to character; Arena/menu modes differ | Character Game Records plus shared rules | Existing challenge pack; full panel inventory remains open |
| Secret Reports | One narrative set and combined unlock condition | Individual report sources; chest report uses canonical chest state | Shared reading/reference; character acquisition links | Existing Letter + I–XII source map |
| Optional bosses | Boss definitions and shared strategy principles | Character access/loadouts, independent clears and reward acquisitions; some episode bosses | Character challenges; shared boss details with scope | Existing boss leads, not full encounter certification |
| Story / Character Files | Shared lore | Character narrative/encounter records differ | Context only under existing compendium scope; not world completion | No new narrative checklist inferred from screenshots |
| Trinity Archives / in-game trophies | Explicit cross-character overview/aggregate requirements | Derived from individual saves; not a substitute for individual state | Shared reference/overview if included | [Report](https://www.khwiki.com/Report#Trinity_Archives); exact modern aggregation edge cases open |
| Steam achievements | Platform-level goal definitions | Some require one character, others named characters/all three; predicates must be explicit | Independent shared platform overlay, links to scoped goals | Current 34-goal subset is incomplete; do not equate with Trinity trophies |
| Final / Secret Episode | Aqua mechanics inherited where applicable | Separate scenario/save contexts, restricted geography, exclusive weapons and Secret chests | Separate **Final Chapter** section, distinguish both episodes inside it | Episode boundaries source-supported; final internal navigation still a design choice |

This matrix recommends accessible shared reference pages, not another all-character checklist whose toggles affect everyone. A shared page may display three clearly labeled progress values; opening it from Aqua should retain Aqua context.

## Mirage Arena: shared battles, different paths and rewards

HD removes multiplayer and uses solo bonus challenges. The FM catalog has 16 battles. The character variation is chiefly access/reward/progress, rather than three separate sets of match names. [Arena Mode](https://www.khwiki.com/Arena_Mode).

| Match | Character-specific access or reward | Shared encounter example |
|---|---|---|
| Wheels of Misfortune | Aqua initially; Terra/Ventus need Aqua clear data. Aqua receives HP +5 | Cursed Coach finale. [Match](https://www.khwiki.com/Wheels_of_Misfortune) |
| Weaver Fever | Terra initially; Ventus/Aqua need Terra clear data. Terra receives HP +5 | Wheel Master finale. [Match](https://www.khwiki.com/Weaver_Fever) |
| A Time to Chill | T/V require Aqua clear data; Aqua has Olympus/ticket conditions | Hades/Zack and Ice Colossus; see conflict below. [Match](https://www.khwiki.com/A_Time_to_Chill) |
| Sinister Sentinel | Terra: Report V; Ventus: Sky Climber | Same named match; reward is not universal |
| Dead Ringer | Terra: Darkgnaw; Ventus: HP bonus | A shared battle definition does not justify granting all rewards to Aqua |
| Keepers of the Arena | Terra Ultima Cannon, Ventus Multivortex, Aqua Lightbloom | Character-specific ultimate Shotlocks |
| Villains' Vendetta / Peering into Darkness | Ultima Weapon / Royal Radiance for each character who earns it | Shared item identity, separate acquisition |

Reward cross-check: [Mirage Arena game tables](https://www.khwiki.com/Game:Mirage_Arena). The existing generated Arena rows omit some character bonus rewards and remain incomplete reference, not a reason to merge progress.

**New source conflict:** A Time to Chill's individual page lists Ventus/Aqua HP +5; the world bonus table lists +10. Its individual page also displays Arena Level 13 while the aggregate access table emphasizes character story/clear-file conditions. Keep precise HP amount and unlock logic unresolved; do not silently choose one table. These conflicts do not undermine the established conclusion that rewards/access are character-specific. Ticket versus clear-file AND/OR rules still need modern reconciliation.

Cross-character clear data can unlock a battle for someone else; it does **not** mean that other character has cleared the battle. Boss access through Arena also means “absent from this character's story” is insufficient grounds to omit that enemy from all of their possible encounters.

## Unversed Missions: nine shared definitions, three record sets

All nine mission identities are available to T/V/A after their relevant world episodes. Sources explicitly vary these locations/rewards:

| Mission | Terra | Ventus | Aqua |
|---|---|---|---|
| Lone Runner / Castle of Dreams | Ballroom | Wardrobe Room | Ballroom |
| Vitality Vial / Dwarf Woodlands | Underground Waterway | The Mine | Underground Waterway |
| Belly Balloon / Radiant Garden | Outer Gardens | Outer Gardens | Central Square |
| Gluttonous Goo / Deep Space reward | Stun Block | Stun Block | Confuse Barrier |

The other five missions are Flame Box, Ringer, Element Cluster, Jellyshade and Floating Flora. Objective/rank definitions are shared; available combat tools and strategy vary. Preserve best score/time, rank and reward acquisition independently if tracked. A three-star result for Terra does not complete Aqua's record. [Unversed Mission](https://www.khwiki.com/Unversed_Mission); individual-record placement is also corroborated by [Reports](https://www.khwiki.com/Report).

The supplied lined-paper screenshot is strong layout evidence for these records, not proof that all three use identical locations. Existing rank-table versus prose boundary conflicts remain open; this pass does not recertify numerical thresholds.

## Bestiary: universal species facts are not universal stats or completion

Use one canonical enemy identity with related encounter variants. Keep at least character, world/room or Arena battle, story/world-level condition, edition and drop conditions on the variant. Where stats are truly identical they can reference one shared record; where unknown do not fill another character's values by assumption.

[Sonic Blaster](https://www.khwiki.com/Sonic_Blaster) is a concrete example: location/story conditions alter stats, Shop Levels 5–6 drop Quick Blitz while 7–8 drop Blitz, and Arena rewards differ. [Spiderchest](https://www.khwiki.com/Spiderchest) similarly separates character/location stat blocks and conditional drops. Neither supports a flat species-wide universal farming row.

Reports' “The Unversed” records encountered enemies; a general bestiary may need other enemy types, including Secret Episode Heartless. Do not label Dark Hide or the Realm of Darkness Heartless as Unversed merely to fit the familiar Reports category. Full per-character bestiary entry counts, which Arena encounters populate each Reports entry, and exact stats normalization remain unverified. The present 16-entry app bestiary is only a crystal-source reference subset.

## Treasures and Keyblades demonstrate why shared names are insufficient

Existing chest candidates already have separate IDs by character/episode: 122 Terra, 130 Ventus, 122 Aqua main-story entries. Repeated item names are not repeated views of one chest. A command-detail chest link shares that specific character chest's state; another character's same reward remains separate. [Existing inventory audit](../games/bbsfm/collectibles-and-reports.md).

Treasure Trove is obtainable by all three, with one common weapon definition; each earns their own through their Dwarf Woodlands progression. Darkgnaw belongs to Terra and the Dead Ringer reward route. [Treasure Trove](https://www.khwiki.com/Treasure_Trove), [Darkgnaw](https://www.khwiki.com/Darkgnaw). Starting weapons and late exclusive forms also require character scoping; the [24-form candidate table](../games/bbsfm/keyblades.csv) preserves this. Do not duplicate stat prose to obtain independent ownership.

## Episodes and current visual contract

Final Episode imports Aqua's completed save but has its own scenario, Brightcrest and world-access exceptions. Secret Episode is the Realm of Darkness scenario with Master's Defender, eight separate candidate chests and no world map. They remain distinct from Aqua's main campaign and from the separate 0.2 game. [Final Episode](https://www.khwiki.com/Final_Episode), [A Fragmentary Passage](https://www.khwiki.com/A_Fragmentary_Passage). Inherited starting state should not be treated as ongoing bidirectional synchronization between save contexts without evidence.

Apply the [five supplied screenshots and notes](../ui/references/bbsfm/README.md): Terra orange, Ventus green, Aqua blue outer frames; shared navy binder/violet list treatment. Pale lined interiors with red tabs guide Game Records layouts. **Command Melding uses the player-menu melding UI, not Reports.** This supersedes the earlier supplement's journal-styled melding and shared-blue framing assumptions. The screenshot's incidental controls are not added feature requirements.

## Evidence limits / next work

The practical split is sufficiently grounded for navigation design: character-owned progress, reusable shared reference, and independent root Command Melding. Remaining research is a full encounter/Reports roster audit, modern Arena gate/HP conflict resolution, complete command availability/acquisition data, and exact achievement/Trinity aggregation predicates. The official HD 2.5 manual was located by search but its PDF failed to open in this pass; no unseen manual content is asserted. No app code or parent-owned specification/decision log was edited.

## Finish Commands follow-up: character trees, shared mechanics

The user supplied a [third-party Finish Commands Unlock Guide infographic](../ui/references/bbsfm/finish-commands-unlock-guide.png), visually inspected in this pass. It is a guide diagram, **not an actual game-menu screenshot**. Mimicking the native Finish Commands menu or showing a per-character menu/popup remains a tentative presentation idea, not an approved final UI choice. Search results in this pass did not yield a verified native Finish Commands screen; do not claim exact menu fidelity from this diagram.

The local acquisition table normalizes 42 predicate rows into 46 character entries: Terra 15, Ventus 15, Aqua 16 (including initial Finish). These are tree records, not 46 globally distinct abilities. One generic tree would hide meaningful branches: Aqua has Heat Slash 2 and Ice Burst, Ventus has Celebration, Terra has Dark Star/Random End branches. D-Link, Style and Illusion finishers are separate systems, not extra ordinary-tree nodes. [Finish command mechanics/table](https://www.khwiki.com/Finish_command_(KHBBS)).

Confirmed: unlock progress is cumulative **while an eligible preceding finisher is equipped**. Having unlocked that parent is insufficient. Surprise! 1, for example, requires 1,400 collected munny with Gold Rush equipped; it is not the current wallet balance. The prerequisite can be an OR: Twisted Hours accepts the character's first ordinary upgraded finisher or Gold Rush; Surprise! 2 accepts Twisted Hours or Surprise! 1. The existing model stores these alternatives in text strings, so a functional graph needs explicit alternative parent IDs. See [KHWiki](https://www.khwiki.com/Finish_command_(KHBBS)) and the separately published [Destiny Islands tree guide](https://www.destinyislands.com/bbs-fm/finish-commands/).

Counters are typed: CP earned, collected munny, steps, enemies defeated, specified Style activations, or lethal hits survived. Ordinary character level and repeatedly executing the desired finisher are not interchangeable with those metrics. Existing source data preserves the metric/target/equipped-parent fields and Style qualifiers; keep that work.

**Reset distinction remains important:** the infographic says each command's counter starts from zero. This supports treating a child's requirement as a new target rather than reusing lifetime munny/CP totals. A comment on the [guide's public thread](https://www.reddit.com/r/KingdomHearts/comments/154ixos/finish_commands_unlock_guide_birth_by_sleep/) likewise distinguishes the later 1,400 munny from the earlier 1,000. Neither establishes that switching away from a parent erases already accumulated partial progress. This pass found no sufficiently clear modern source for switch-away/reset behavior or how partial counters combine across alternative parents; mark those exact details unresolved rather than inventing automatic resets.

Navigation implication: Finish Commands belong to the selected character's tree/progress with shared mechanics easily reachable. Clicking a node can explain eligible equipped parent(s), metric, target, character and downstream branches. This does not require or authorize a new automatic gameplay-counter tracker. The infographic's colored horizontal branches can inform a draft, but native menu visuals still need independent evidence.
