# KH1FM category navigation research and plan

Date: 2026-09-20. Status: researched implementation plan; this document does not claim implementation or human acceptance.

## Accepted direction

The world hub replaces Contents. Each world opens a general-information overview with quick links to the per-type collectible lists, already filtered to that world. Collection types are primary browsing destinations. Their lists group records by world and use full-width inline expandable rows, preserving category expand/collapse controls and independent completion actions. There are no nested item pages. Reference remains unchanged and accessible through a secondary link pending later review. The main game-selection screen remains outside this change.

Primary menu, in order: Worlds; Synthesis Workshop; Bestiary; Treasures; Trinities; Dalmatians; Magic Upgrades; Torn Pages; Ansem Reports; Challenges and Minigames; Steam Achievements. Secondary sidebar links: Reference library; Progress & backups. Other relevant guide records and summons remain inline World notes.

Exact primary menu wording and order are recorded in `ai_docs/implementation/human-feedback.md` as the authoritative human decision. This navigation change preserves the earlier request for compact factual headers, larger readable text, and reduced padding.

## Existing world overview content

Canonical source: `data/kh1fm/collectibles.json`, assembled into `public/data/kh1fm.json`. Thirteen existing guide records contain useful world area connections, access requirements, acquisition routes and return reminders. Their generic shared summary is not useful overview copy; use their distinct `instructions` content. These are existing researched facts, not freshly reverified findings. Preserve source metadata internally and any specific uncertainty attached to the record.

### Destiny Islands

Canonical ID: `kh1fm-guide-destiny-islands-collectibles`.

The playable island visit ends when the storm begins. On day two, pass through the door beside Kairi to the Cove. Check the tower alcove before turning in the final supplies. Raft materials, provisions and the Empty Bottle are temporary story objects, so they are not world-collection checks. The two Kairi supply bonuses are distinct opportunities; their item varies with hints.

### Traverse Town

Canonical ID: `kh1fm-guide-traverse-town-collectibles`.

First District connects the shops and world exit; the door behind the Accessory Shop leads to Second District. Second District contains the hotel, Dalmatians' House and Gizmo Shop. The upper Gizmo route crosses the roofs to a Third District balcony. Cast Fire on the flame-marked Third District door, cross the moving stones and circle Merlin's house to its entrance. Red Trinity opens the Alleyway sewer route; Green Trinity in the Accessory Shop lowers the Item Workshop ladder. Geppetto's House opens after Monstro. Revisit Pongo and Perdita to claim rescued-puppy milestones.

### Wonderland

Canonical ID: `kh1fm-guide-wonderland-collectibles`.

Use the Bizarre Room drink to change size. As a giant, push the bed aside; as small Sora, its opening leads to the Queen's Castle. Lotus Forest has elevated doors into different Bizarre Room orientations, and exits onto the castle hedges and Tea Party Garden. Light the two lamps beside the sideways room's painting to activate its route into the isolated Lotus Forest. Thunder on the hanging bell flowers there reveals puppies 58–60. Green/White Trinities and Glide rewards need a later return. Rabbit Hole battle rewards change at the trial and Kairi rescue; collect each phase before advancing.

### Olympus Coliseum

Canonical ID: `kh1fm-guide-olympus-coliseum-collectibles`.

The Gates lead to the Lobby and tournament registration with Phil. Check behind the exterior columns, both statue feet, and the center of the plaza. The left torch reward requires Blizzara; return with Blizzaga for the right torch reward. Winning the Hercules Cup unlocks Yellow Trinity; use it on Phil's stone in the Lobby for the Keyhole. Cup victories and variants have their own challenge records.

### Deep Jungle

Canonical ID: `kh1fm-guide-deep-jungle-collectibles`.

Camp connects to Hippos' Lagoon and Bamboo Thicket. Cross the hippos to reach the far bank, or climb the vines to the elevated Vines/Vines 2 route. Tree House and Climbing Trees are above the Tunnel/Treetop area. Beyond the Cliff after Clayton, climb the Waterfall Cavern ledges to the Cavern of Hearts. Final Mix puppies 31–33 are in Waterfall Cavern; the old Climbing Trees Blue Trinity now gives Thundara-G. Return with movement abilities for the highest tree chests.

### Agrabah

Canonical ID: `kh1fm-guide-agrabah-collectibles`.

Climb crates and awnings to travel above the Plaza, Alley, Main Street, Bazaar and Palace Gates. Aladdin's House is reached by the pole from Main Street. In the Cave of Wonders, dropping from the upper halls enters the water chambers. Relic Chamber and Dark Chamber connect by the waterways; use the stairs to regain Cave: Hall. Yellow Trinity in Cave: Hall moves the pillar to expose the Hidden Room's other section. Move the stone block from Bottomless Hall to make the Relic Chamber crossing. Bring Aladdin for Abu statue interactions, then switch to Donald and Goofy for Trinities.

### Monstro

Canonical ID: `kh1fm-guide-monstro-collectibles`.

After the first Parasite Cage fight, open Geppetto's chest and equip High Jump; the lower water level exposes the Mouth platforms. A useful interior route is Mouth → Chamber 1 → Chamber 2 → Chamber 3; use the upper return doorway to Chamber 2 to reach Chamber 5, then Chamber 6. Door height matters: the same chamber has several disconnected entrances. Search both upper ledges and the floor before moving on. Chamber 5's low entrance from Chamber 6 is beside its Blue Trinity. Final Mix puppies 76–78 are in Chamber 6, while 55–57 are on Chamber 3's highest ledge.

### Atlantica

Canonical ID: `kh1fm-guide-atlantica-collectibles`.

Attack white clams; cast Fire, Blizzard or Thunder on red, blue or yellow clams respectively. The trident signs point from Undersea Valley through Calm Depths and Undersea Cave to Undersea Gorge and Triton's Palace. Ariel's Grotto is the low entrance in the Gorge. Clear enemies before grabbing the dolphin; it carries you against the Calm Depths current to Sunken Ship. Later, Mermaid Kick lets you fight the current directly. Push the seabed geyser reached from Sunken Ship to dislodge the Gorge treasure. Swim upward as well as around walls when searching shelves.

### Halloween Town

Canonical ID: `kh1fm-guide-halloween-town-collectibles`.

Guillotine Square contains the lab and Jack's house. Graveyard leads toward Moonlight Hill, Bridge and the manor. After the manor falls, return to Manor Ruins for unopened manor chests; Final Mix preserves the red mark under the manor arch. The new Moonlight Hill doorway leads to Cemetery and its four chests. Use High Jump and Glide from high ground in Guillotine Square to reach the pumpkin-mouth tower and its opposite platform. Puppies 67–69 are the White Trinity reward on Moonlight Hill.

### Neverland

Canonical ID: `kh1fm-guide-neverland-collectibles`.

The Hold leads through the Galley/Cabin to Captain's Cabin; the Cabin Green Trinity opens the upper route. Flight becomes available during the ship events and reaches the Hold beams and the mast chest. After winning Hercules Cup, bring Donald and Goofy to the yellow mark on the Hold's upper locked door. The deck White Trinity gives puppies 43–45 in Final Mix. Clock Tower doors follow total playtime in repeating twelve-hour cycles; the tower is occupied by Phantom late in the game until you defeat it.

### 100 Acre Wood

Canonical ID: `kh1fm-guide-100-acre-wood-collectibles`.

Take Cid's Old Book to Merlin and examine it in his study. Five Torn Pages unlock episodes in a fixed sequence, whichever source page you find first. Explore Meadow and Pooh's House, then the Hunny Tree, Rabbit's House, Hill, Bouncing Spot and Muddy Path. Bouncing Spot opens the chest, tree and Rare Nut activities; only carry one Rare Nut at a time and return it to Owl before taking another. Episode completion rewards and score targets are separate from merely finding a page.

### Hollow Bastion

Canonical ID: `kh1fm-guide-hollow-bastion-collectibles`.

Rising Falls leads by floating rocks to Castle Gates. The gate-side lifts descend to Base Level and Waterway; Beast breaks the barred walls there. Bubble and switch routes reach Dungeon and the castle door controls. Complete the Library's book placements to open hidden Lift Stop sections. Cast Gravity on the floating treasure platforms to lower them. Great Crest connects to the two sides of High Tower; its moving stairs conceal another Lift Stop door. Grand Hall chests are collectible on the return after Kairi's rescue. Revisit Belle, Aerith and the princesses for their separate rewards.

### End of the World

Canonical ID: `kh1fm-guide-end-of-the-world-collectibles`.

In Final Dimension, follow the connected invisible paths between ten treasure markers; several trigger battles before granting the item. Giant Crevasse has five chests at different heights; keep checking side platforms before entering the portal. World Terminus has one container in each replica listed here. The Hollow Bastion laboratory Elixir must be opened during that visit before continuing through the final portal. Save at Final Rest and open its chest before entering the last battle sequence; reload that save to finish other collections.

## Implementation plan

1. Replace Contents with the world hub and introduce the accepted ordered category menu. Preserve legacy contents links through a redirect or equivalent compatibility route. Keep Reference available without inserting it into the new primary menu.
2. Derive worlds and per-type quick links from canonical membership rather than maintaining a second collectible inventory. World overview guide records remain reference content, not additional checkable items or denominator units.
3. Render world overviews using the existing guide instructions above. Keep useful category counts and links directly accessible. Link absent categories only when they have actual applicable records; do not invent collection content for a world.
4. Route each collection entry to its owning type list with world and target item encoded. The world shortcut, search, related links, Jiminy citations and legacy bookmarks must converge on that same inline record. Material and recipe links keep their synthesis destinations; challenges and Reference retain their existing functionality.
5. Apply a world filter without changing completion identities. A targeted deep link must reveal its item despite stored conflicting filters. Explicit later filter changes take effect. Expansion does not check items; checking does not collapse the currently read item.
6. Keep the full-width row implementation and complete inline facts, including acquisition conditions, rewards, missability where meaningful, media, recipe quantities, uncertainty and related links. Do not restore nested entry pages.
7. Keep progress calculations based on complete declared world/category membership. Filtered visible counts remain distinct from full counts. World overviews and links never inflate the collectible denominator.

## Verification

- Check exact menu labels and order against the human-feedback record on desktop and phone.
- Enter each world from the new hub; verify its overview matches the canonical world record and its quick links carry the right world filter.
- Open each primary collection type directly and through a world shortcut. Verify world grouping, full-width rows and expand/collapse controls.
- Open an old entry URL and a Jiminy citation; verify the correct category/world target opens, including with conflicting saved filters.
- Confirm check state and counts persist across category/world views and reload. Confirm expanded details stay visible after a check and explicit filter changes are respected.
- Verify synthesis, challenges, Reference, search, backups and existing media interactions remain reachable and functional.
- Keep actual browser/device verification separate from emulation; record executed results after implementation.

## Implementation result
Implemented the plan with existing world instructions and inline residual world notes. Added canonical type destinations and compatibility redirects; updated cover resume handling for new routes and query suffixes. Build and 57 unit tests passed; browser verification covers 48 standard cases across full and affected reruns, with two optional heavyweight model tests skipped. Shared preview updated and visually reviewed.
