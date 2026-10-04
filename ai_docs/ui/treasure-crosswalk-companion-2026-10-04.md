# Companion treasure/reward crosswalks

Implementation metadata · 2026-10-04

This records the finite Re:CoM and KH0.2 companion boards approved in the [treasure-grid research](treasure-grid-redesign-research-2026-10-04.md). It is presentation metadata only: the runtime catalogues, acquisition instructions, saved check IDs, and progress formats remain unchanged.

## Contract and evidence limits

- `companionOrder` is a frozen, one-based order within `(scope, character, world)`. A group is a semantic label/facet within the board, not another counted acquisition or a numbering reset.
- Every record uses `orderEvidence: app-defined`. Neither game has a supported native treasure slot sequence in the reference package; no record gets `journalSlot`.
- Re:CoM `sourceNumber` is populated only for Bounty records and means the checked-in priority among eligible unique Bounty rewards in that world. It never means a native journal number.
- Every square resolves directly to its preexisting runtime ID. Completion/search filters must retain its board position; reorderings cannot remap checks by array index.

## Re:CoM: 41 finite Sora claims

Metadata: [`recom.json`](../../src/games/treasure-data/recom.json). Identity/priority source: [`worlds-and-rewards.json`](../games/recom/worlds-and-rewards.json).

Per world, the guide presents Base, Days bonus, then Bounty in ascending priority. There are 12 Base claims, 12 Days bonus claims, and 17 Bounty claims across twelve worlds. Riku has no World Rewards board and 100 Acre Wood has no claim in this finite set. This does not attempt to track every generated room, random chest, repeat reward, or story reward.

The source array places Atlantica Homing Blizzara (Bounty priority 2) before Shock Impact (priority 1). The explicit crosswalk corrects presentation to Shock Impact → Homing Blizzara while retaining both IDs. A player may receive a later reward first if earlier rewards are not eligible; the priority is conditional, as the existing acquisition text explains.

Reward claims and Card Collection discoveries stay independent. Receiving a reward does not automatically check its card entry; Sora’s 152 and Riku’s 59 card identities are unchanged. Days prerequisites and room door costs remain in the original detail record.

### Complete Re:CoM crosswalk

| World | Guide position | Group | Bounty priority | Existing saved ID | Reward |
|---|---:|---|---:|---|---|
| Traverse Town | 1 | Base | — | `recom-sora-traverse-town-room-of-rewards-base-lionheart` | Lionheart |
| Traverse Town | 2 | Days bonus | — | `recom-sora-traverse-town-room-of-rewards-days-saix` | Saïx |
| Traverse Town | 3 | Bounty | 1 | `recom-sora-traverse-town-bounty-maverick-flare` | Maverick Flare |
| Wonderland | 1 | Base | — | `recom-sora-wonderland-room-of-rewards-base-synchro` | Synchro |
| Wonderland | 2 | Days bonus | — | `recom-sora-wonderland-room-of-rewards-days-xemnas` | Xemnas |
| Wonderland | 3 | Bounty | 1 | `recom-sora-wonderland-bounty-stop` | Stop |
| Olympus Coliseum | 1 | Base | — | `recom-sora-olympus-coliseum-room-of-rewards-base-metal-chocobo` | Metal Chocobo |
| Olympus Coliseum | 2 | Days bonus | — | `recom-sora-olympus-coliseum-room-of-rewards-days-total-eclipse` | Total Eclipse |
| Olympus Coliseum | 3 | Bounty | 1 | `recom-sora-olympus-coliseum-bounty-blizzard-raid` | Blizzard Raid |
| Agrabah | 1 | Base | — | `recom-sora-agrabah-room-of-rewards-base-warp` | Warp |
| Agrabah | 2 | Days bonus | — | `recom-sora-agrabah-room-of-rewards-days-luxord` | Luxord |
| Agrabah | 3 | Bounty | 1 | `recom-sora-agrabah-bounty-gravity` | Gravity |
| Halloween Town | 1 | Base | — | `recom-sora-halloween-town-room-of-rewards-base-bind` | Bind |
| Halloween Town | 2 | Days bonus | — | `recom-sora-halloween-town-room-of-rewards-days-bond-of-flame` | Bond of Flame |
| Halloween Town | 3 | Bounty | 1 | `recom-sora-halloween-town-bounty-gifted-miracle` | Gifted Miracle |
| Monstro | 1 | Base | — | `recom-sora-monstro-room-of-rewards-base-aqua-splash` | Aqua Splash |
| Monstro | 2 | Days bonus | — | `recom-sora-monstro-room-of-rewards-days-xaldin` | Xaldin |
| Monstro | 3 | Bounty | 1 | `recom-sora-monstro-bounty-fire-raid` | Fire Raid |
| Atlantica | 1 | Base | — | `recom-sora-atlantica-room-of-rewards-base-quake` | Quake |
| Atlantica | 2 | Days bonus | — | `recom-sora-atlantica-room-of-rewards-days-demyx` | Demyx |
| Atlantica | 3 | Bounty | 1 | `recom-sora-atlantica-bounty-shock-impact` | Shock Impact |
| Atlantica | 4 | Bounty | 2 | `recom-sora-atlantica-bounty-homing-blizzara` | Homing Blizzara |
| Neverland | 1 | Base | — | `recom-sora-neverland-room-of-rewards-base-thunder-raid` | Thunder Raid |
| Neverland | 2 | Days bonus | — | `recom-sora-neverland-room-of-rewards-days-midnight-roar` | Midnight Roar |
| Neverland | 3 | Bounty | 1 | `recom-sora-neverland-bounty-teleport` | Teleport |
| Hollow Bastion | 1 | Base | — | `recom-sora-hollow-bastion-room-of-rewards-base-mushu` | Mushu |
| Hollow Bastion | 2 | Days bonus | — | `recom-sora-hollow-bastion-room-of-rewards-days-xigbar` | Xigbar |
| Hollow Bastion | 3 | Bounty | 1 | `recom-sora-hollow-bastion-bounty-reflect-raid` | Reflect Raid |
| Twilight Town | 1 | Base | — | `recom-sora-twilight-town-room-of-rewards-base-stardust-blitz` | Stardust Blitz |
| Twilight Town | 2 | Days bonus | — | `recom-sora-twilight-town-room-of-rewards-days-roxas` | Roxas |
| Twilight Town | 3 | Bounty | 1 | `recom-sora-twilight-town-bounty-warpinator` | Warpinator |
| Twilight Town | 4 | Bounty | 2 | `recom-sora-twilight-town-bounty-ansem` | Ansem |
| Destiny Islands | 1 | Base | — | `recom-sora-destiny-islands-room-of-rewards-base-megalixir` | Megalixir |
| Destiny Islands | 2 | Days bonus | — | `recom-sora-destiny-islands-room-of-rewards-days-two-become-one` | Two Become One |
| Destiny Islands | 3 | Bounty | 1 | `recom-sora-destiny-islands-bounty-judgment` | Judgment |
| Destiny Islands | 4 | Bounty | 2 | `recom-sora-destiny-islands-bounty-zexion` | Zexion |
| Castle Oblivion | 1 | Base | — | `recom-sora-castle-oblivion-room-of-rewards-base-super-glide` | Super Glide |
| Castle Oblivion | 2 | Days bonus | — | `recom-sora-castle-oblivion-room-of-rewards-days-star-seeker` | Star Seeker |
| Castle Oblivion | 3 | Bounty | 1 | `recom-sora-castle-oblivion-bounty-raging-storm` | Raging Storm |
| Castle Oblivion | 4 | Bounty | 2 | `recom-sora-castle-oblivion-bounty-ultima-weapon` | Ultima Weapon |
| Castle Oblivion | 5 | Bounty | 3 | `recom-sora-castle-oblivion-bounty-lexaeus` | Lexaeus |

## KH0.2: 41 chests, with Zodiac facets

Metadata: [`kh02.json`](../../src/games/treasure-data/kh02.json). Identity/route source: [collectible inventory](../games/kh02/collectibles.md) and [runtime catalogue](../../src/games/kh02/catalog.ts).

Each world has one Aqua/main chest board. Guide order freezes the existing ordinary chest subsequence followed by that world’s existing Zodiac subsequence. This preserves familiar guide locations and the distinction between ordinary and post-clear finds without asserting a route-optimal or native journal sequence. Area/landmark names remain in the detail entry; the board does not sort by reward text.

| World | Ordinary | Zodiac | Board total | Boundary |
|---|---:|---:|---:|---|
| Castle Town | 6 | 4 | 10 | Includes Main Road. Objective 37 counts the other 9. |
| The World Within | 8 | 5 | 13 | Seven mine gems are separate. |
| Forest of Thorns | 10 | 2 | 12 | Three flowers are separate. |
| Depths of Darkness | 5 | 1 | 6 | The memory is separate. |
| Total | 29 | 12 | 41 | Four memories are separate across the four worlds. |

The Zodiac group uses exactly the existing twelve chest IDs carrying the `zodiac` category. A Zodiac facet is another view of those same squares/checks, not a second twelve-entry collection. Keep first-clear/seeded-NG+ prerequisites visible. Do not hide or renumber later-available boxes. Homecoming has no chest records.

The two existing Forest reward-label caveats remain attached to `kh02:ft-north-potion` and `kh02:ft-save-ether`. No acquisition text or uncertainty was overwritten by this metadata.

### Complete KH0.2 crosswalk

| World | Guide position | Group | Existing saved ID | Area | Reward |
|---|---:|---|---|---|---|
| Castle Town | 1 | Ordinary | `kh02:ct-main-road` | Main Road | Potion |
| Castle Town | 2 | Ordinary | `kh02:ct-map` | Castle Town gate | Castle Town Area Map |
| Castle Town | 3 | Ordinary | `kh02:ct-alley-potion` | Castle Town | Potion |
| Castle Town | 4 | Ordinary | `kh02:ct-rooftop-potion` | Castle Town | Potion |
| Castle Town | 5 | Ordinary | `kh02:ct-house-ether` | Castle Town | Ether |
| Castle Town | 6 | Ordinary | `kh02:ct-lower-ether` | Castle Town lower passage | Ether |
| Castle Town | 7 | Zodiac | `kh02:ct-aquarius` | Castle Town | Aquarius relic |
| Castle Town | 8 | Zodiac | `kh02:ct-aries` | Castle Town | Aries relic |
| Castle Town | 9 | Zodiac | `kh02:ct-sagittarius` | Castle Town | Sagittarius relic |
| Castle Town | 10 | Zodiac | `kh02:ct-virgo` | Castle Town | Virgo relic |
| The World Within | 1 | Ordinary | `kh02:ww-map` | World Within hub | The World Within Area Map |
| The World Within | 2 | Ordinary | `kh02:ww-pillar-potion` | Mirror-floor / pillar labyrinth | Potion |
| The World Within | 3 | Ordinary | `kh02:ww-pillar-hi-potion` | Mirror-floor / pillar labyrinth | Hi-Potion |
| The World Within | 4 | Ordinary | `kh02:ww-stairs-hi-potion` | Northern / endless-staircase mirror | Hi-Potion |
| The World Within | 5 | Ordinary | `kh02:ww-mines-hi-potion` | Western / mines mirror | Hi-Potion |
| The World Within | 6 | Ordinary | `kh02:ww-hub-mega-potion` | World Within hub | Mega-Potion |
| The World Within | 7 | Ordinary | `kh02:ww-mirror-mega-ether` | Eastern chest-room mirror | Mega-Ether |
| The World Within | 8 | Ordinary | `kh02:ww-mines-megalixir` | Western / mines mirror | Megalixir |
| The World Within | 9 | Zodiac | `kh02:ww-cancer` | World Within hub | Cancer relic |
| The World Within | 10 | Zodiac | `kh02:ww-gemini` | Pillar labyrinth | Gemini relic |
| The World Within | 11 | Zodiac | `kh02:ww-leo` | Mines | Leo relic |
| The World Within | 12 | Zodiac | `kh02:ww-libra` | Mines | Libra relic |
| The World Within | 13 | Zodiac | `kh02:ww-pisces` | Endless staircase | Pisces relic |
| Forest of Thorns | 1 | Ordinary | `kh02:ft-map` | Uncertain Path | Forest of Thorns Area Map |
| Forest of Thorns | 2 | Ordinary | `kh02:ft-start-ledge-potion` | Rocky Path | Potion |
| Forest of Thorns | 3 | Ordinary | `kh02:ft-north-potion` | Forest of Thorns | Potion |
| Forest of Thorns | 4 | Ordinary | `kh02:ft-ring-potion` | Rocky Path circular section | Potion |
| Forest of Thorns | 5 | Ordinary | `kh02:ft-gap-hi-potion` | Rocky Path | Hi-Potion |
| Forest of Thorns | 6 | Ordinary | `kh02:ft-left-hi-potion` | Rocky Path | Hi-Potion |
| Forest of Thorns | 7 | Ordinary | `kh02:ft-spiral-mega-potion` | Uncertain Path spiral tree | Mega-Potion |
| Forest of Thorns | 8 | Ordinary | `kh02:ft-ring-mega-potion` | Rocky Path | Mega-Potion |
| Forest of Thorns | 9 | Ordinary | `kh02:ft-save-ether` | Rocky Path save point | Ether |
| Forest of Thorns | 10 | Ordinary | `kh02:ft-steps-ether` | Rocky Path stone steps | Ether |
| Forest of Thorns | 11 | Zodiac | `kh02:ft-taurus` | Uncertain Path | Taurus relic |
| Forest of Thorns | 12 | Zodiac | `kh02:ft-scorpio` | Uncertain Path | Scorpio relic |
| Depths of Darkness | 1 | Ordinary | `kh02:dd-map` | Depths entrance | Depths of Darkness Area Map |
| Depths of Darkness | 2 | Ordinary | `kh02:dd-wide-hi-potion` | Depths main route | Hi-Potion |
| Depths of Darkness | 3 | Ordinary | `kh02:dd-low-mega-ether` | Depths lower cavern | Mega-Ether |
| Depths of Darkness | 4 | Ordinary | `kh02:dd-before-arena-mega-ether` | Depths main route | Mega-Ether |
| Depths of Darkness | 5 | Ordinary | `kh02:dd-end-elixir` | Depths final sandy area | Elixir |
| Depths of Darkness | 6 | Zodiac | `kh02:dd-capricorn` | Depths sandy end | Capricorn relic |

## Pixel review performed for this implementation

- [Re:CoM Sora journal root](references/recom/sora-journal-root-0010.png): inspected actual pixels. Far-left rings, green outer frame, indigo root leaf, glove selection and Story/Card Collection/Card Index/Characters/Mini-games. The screen does not establish a World Rewards native grid.
- [Re:CoM Card Collection](references/recom/sora-card-collection-0520.png): inspected actual pixels. Broad light single leaf, far-left rings, burgundy title, gray completion panels and dense card icons. This is reference for shell language only; its card-discovery positions are not reused as reward positions.
- [KH0.2 Objectives](references/kh02/Kingdom-Hearts-02-Birth-by-Sleep--A-Fragmentary-Passage08292021-071047-64098.jpg): inspected actual pixels. Blue technical frame, orange-red Objectives tab, numbered horizontal rows, red selection outline, glove, reward preview on the right and a lower instruction area. This is a system menu, not a book or a treasure-slot reference.

No screenshot is copied into the production interface. No target-edition native chest-slot certification is claimed for either companion board.

## Regression checks

[`tests/treasure-mapping.test.ts`](../../tests/treasure-mapping.test.ts) validates the seven-game metadata independently of the rendering projection:

- Exact relevant-record coverage, unique old IDs, positive contiguous companion positions, partition boundaries, provenance references, unique native positions, and no native-slot assertion on app-defined/unconfirmed records
- Frozen catalogue-ID hashes from the pre-redesign baseline, including records outside treasure boards
- Re:CoM 12/12/17 groups, all Bounty priorities, Atlantica’s corrected priority projection, and independent card discoveries
- KH0.2 29/12 split, same-ID Zodiac aliases, 10/13/12/6 world totals, Main Road/objective distinction, non-chest exclusions and retained reward caveats
- KH2 Sora/prologue/Cavern boundaries; BBS tutorial/main/Secret Episode retention; DDD character partitions and repeated rewards; KH3’s 254 source-supported pairs and base/Re Mind boundary
- Immutable legacy parse/JSON round trips for all six shared profiles, explicit true/false BBS tutorial checks, every preexisting entry ID, quantities and routes
- KH1’s separate strict backup and local-retention behavior, verified acquisition aliases, explicit false values and reordered catalogue parsing

The tests distinguish metadata/evidence integrity from native pixel certification and UI acceptance. Existing content-validation tests remain the authority for the detailed acquisition text.
