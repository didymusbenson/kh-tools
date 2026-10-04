# Treasure grids: cross-game design and ordering investigation

**Research proposal · 2026-10-04 · baseline `9f5b5e1550483cc5c8c9ded2ba98f9a8ee19b950`**

This responds to the request for per-world treasure squares, matching the game's journal order where possible, with the grid beside acquisition details. The follow-up asks for the design to be rooted in in-game reference images. The user subsequently endorsed pursuing this direction. Detailed interaction choices remain proposals. This pass changes documentation only: it does not implement a grid, change checks/content IDs, merge, or deploy.

## Recommendation

Adopt **one stable slot-to-acquisition contract, with different game-native presentations**. The main screen should answer “which box am I missing?”; selecting a box should answer “where is it, and how do I get it?” Item names and directions move out of the dense overview and remain fully available in the selected detail.

Use the proposed facing-page composition for KH1/KH2, a broad-leaf grid/detail composition for BBS, a single-leaf grid and Notes view for DDD/Re:CoM, and a Gummiphone grid and Notes view for KH3. KH0.2 needs an expressly app-owned chest index within its blue system-menu language. A universal open-book component would contradict several of the references.

The largest dependency is **identity-to-journal-slot mapping**, not drawing squares. The existing `order` field, a number in a name, and a numeric ID suffix have different meanings in different games. An inventory can be complete while its journal positions remain unverified. Conversely, KH1/Re:CoM/0.2 must not be held indefinitely for a native treasure grid that is not established for those games.

Recommended first implementation slice, if separately authorized: **KH2 per-world grid + selected acquisition notes**, with the final-Mix mapping gaps resolved first; then reuse its behavior in BBS/DDD, and apply KH3's already strong numbered source evidence in the Gummiphone skin. App-defined KH1/Re:CoM/0.2 grids follow their explicit scope decisions below. This is seven adapters and a shared interaction contract, not seven unrelated rewrites.

## 1. What was inspected, and what “verified” means

The audit read the seven runtime catalogues/generators and journal renderers, source inventories and prior research dispositions, stable-ID progress stores, and the reference images linked below. Referenced screenshots were inspected as pixels; a file name or an old design description was not treated as proof. Targeted external source checks were used for ordering claims. No new playthrough or exhaustive frame-by-frame video transcription was performed.

The companion [mapping inventory](treasure-grid-mapping-inventory-2026-10-04.json) records the baseline, counts, partitions, ordering fields, and evidence limits. Counts describe this repository's current records, not automatically official completion percentages.

Use these evidence labels per mapping field, not per whole game:

- **Directly corroborated:** an inspected native screen identifies the selected reward and its position in the grid. This certifies only that observed pair/state, not every other square.
- **Source-supported:** a source explicitly numbers journal/Gummiphone entries, and the runtime record can be matched by world, character/episode, reward and location. A first-hand guide is good usable evidence, but is not this project's gameplay verification.
- **Unconfirmed:** extraction/route order, an unexplained source number, or an ambiguous duplicate. Do not label it “Journal #”.
- **App-defined / not applicable:** no equivalent native treasure inventory is established. Use a documented stable companion order rather than inventing official slots.

Roster completeness, slot order, screen geometry, and icon-state fidelity are four separate checks. A complete row-major grid in a completed save does not reveal what uncollected cells look like.

## 2. Current runtime: why the experience is inconsistent

| App | Current treasure path | Ordering/selection behavior relevant to this work |
|---|---|---|
| KH1FM | `Kh1Journal.tsx`, canonical `data/kh1fm` and exported game data | Uses the KH1-specific data/progress model. “Treasure” includes more than physical chests; acquisition grouping already links verified shared rewards. |
| Re:CoM | `RecomJournal.tsx`, `src/games/recom/ui-data.json` | Card Collection is already a grid; World Rewards remains a list. Reward claim IDs and card discovery IDs are intentionally separate. |
| KH2FM | `Kh2Journal.tsx`, `src/games/kh2fm/catalog.ts` | Array-backed list/index and facing notes; filtering compacts the index. `entryTitle` removes chest-number prefixes from the primary item label. |
| BBSFM | `BbsJournal.tsx`, `src/games/bbsfm/content.json` | Character-scoped list sorted by `order`, then name. Existing scope helpers distinguish main campaigns and episodes. |
| DDDHD | `DddJournal.tsx`, `src/games/dddhd/content.json` | Recently implemented single-leaf Reports index/detail routes. Character filter supports an aggregate view, but a journal grid must retain separate Sora/Riku boards. |
| KH0.2 | Generic `GuideJournal.tsx`, `src/games/kh02/catalog.ts` | World/category filters and expandable content rows; no dedicated native treasure renderer. |
| KH3 | Generic `GuideJournal.tsx`, `src/games/kh3/content.json` | Research for a Gummiphone renderer exists; current runtime still uses the generic guide. This proposal does not require rebuilding every KH3 menu first. |

The general `CollectionEntry` schema has only an optional `order`; it has no typed journal slot, order provenance, native grid coordinates, or explicit chest/acquisition kind. `chestReference()` parses display names; it is not evidence validation. Some lists retain the selected item through a Remaining filter, others remove it and choose another row. A grid must stop those differences from moving or changing the identity of the box the player is comparing.

Relevant inspected contracts: [collection views](../content/collectible-compendium-and-linked-views.md), [progress](../content/persistent-checklists-and-progress.md), [KH2 plan](kh2fm-new-ui-plan.md), [DDD plan](dddhd-new-ui-plan.md), [KH3 plan](kh3-new-ui-plan.md). Earlier generic “inline rows” wording is historical where later game-specific fixed-stage journal plans supersede it; this document proposes a treasure-specific revision, not a redesign of every list.

## 3. Per-game evidence, scope and proposed view

### Audit at a glance

| Game | Current scoped inventory | Order evidence and readiness |
|---|---|---|
| KH1FM | 306 “treasure” acquisitions, not 306 proven chests | No native treasure journal sequence. Classify physical chests vs other rewards; use companion order. |
| Re:CoM | 41 Sora finite claims: 12 base + 12 Days + 17 Bounty | No native treasure-slot sequence. Bounty priority is supported; world reward board is an adaptation. |
| KH2FM | 301 Sora + 16 separate Roxas prologue | All Sora world numbers contiguous; 188 independently cross-matched to explicit Journal-order source, 1 resolved source contradiction, 112 other prior source-supported rows. No treasure-grid pixels verified here. |
| BBSFM | 374 main + 8 Secret Episode; 1 tutorial record excluded from chest totals | 382 source-number candidates; global extraction `order` is not journal order. Target-edition slot crosswalk remains open. |
| DDDHD | 438: Sora 225 + Riku 213 | Source-number candidates and route joins exist; HD-native mapping not certified. Current array order is not even numeric order. |
| KH0.2 | 41: 29 ordinary + 12 Zodiac | Companion order; no native chest journal established. Zodiac is a facet on the same 12 chest IDs. |
| KH3 | 245 base + 9 Re Mind | All 254 match a first-hand numbered Gummiphone transcript; Olympus #9 also directly corroborated in pixels. Best source-supported starting map. |

Zero “directly corroborated” for a game means no exact native item/slot pair was established in this bounded pass; it does not erase useful prior sourced acquisition research.

### KH1FM: a faithful-looking companion index, not a native treasure page

The actual [HD report index](references/kh1fm/kh-hd-report-index.jpg) has an indigo Jiminy/help leaf, cream ruled index leaf, central spiral, glove selector and green frame. The [detail screen](references/kh1fm/kh-hd-journal-detail.jpg) has two cream facing pages. Those pixels support the requested left-grid/right-directions arrangement as an extension of KH1's visual language. Neither is a treasure screen. The [native section roster](https://www.khwiki.com/Jiminy%27s_Journal) and [existing KH1 plan](kh1fm-new-ui-plan.md) do not establish a native Treasures journal.

The current 306 entries split into 238 `container-or-once-only-reward` and 68 `one-time-reward`. Even the 238 include 16 explicitly described clams, a shell/sea-urchin acquisition and 12 timed Clock Tower doors. The remaining 209 were not physically classified here. A [separate source snapshot](../../tools/content/import-collectibles.sources.json) lists 216 physical locations, but has no runtime-ID crosswalk and a different specialist/temporary-story scope. **None of 306, 238 or 216 is ready to label “all chest slots.”** See [world/coverage audit](../games/kh1fm/world-and-coverage-audit.md) and [canonical acquisitions](../../data/kh1fm/collectibles.json).

Proposed two groups per world: **Chests & containers** and **Other rewards**, with accurate symbols/count labels. If strict chest-only boxes are preferred, classify the physical subset first and keep all other rewards reachable separately. Puppy-group/postcard/torn-page acquisitions already have specialist identities; link their existing acquisition IDs and avoid duplicate cells/counts. Preserve the timed/revisit/missability directions. Use a documented **Guide order**, never fabricated Journal #. This decision prevents a visual redesign from silently deleting useful content.

### KH2FM: closest fit to the requested facing-page design

Current [catalogue](../../src/games/kh2fm/catalog.ts) has **301 Sora treasures** over 14 worlds, with contiguous per-world `order` ranges. It also retains **16 Roxas prologue chests** in a separate scope. The 301 include Radiant Garden's **24 Cavern chests, #23–46**; Cavern is not another counted world. Atlantica has no numbered chest board. Forty-three treasure records also serve other category views; aliases do not add acquisitions.

[KHGuides](https://www.khguides.com/kh2/collectibles/treasures/) explicitly defines chest numbers as left-to-right, top-to-bottom Jiminy's Journal order. Its current table has only 189 Sora rows: 187 exact name matches, one Mega Recipe punctuation match, and Disney Castle #7's known Blazing Shard/Mythril Shard discrepancy. Keep the already researched Final Mix **Mythril Shard** result; do not undo a resolved correction to make a naive join pass. The other 112 rows have [checked-in numbered evidence](../games/kh2fm/treasure-candidates.md) and [route review](../games/kh2fm/treasure-locations.json), but are not newly pixel-certified here. The [Radiant Garden table](https://www.khwiki.com/Game:Radiant_Garden) includes the Cavern sequence.

Use a selected world, stable numbered boxes on the left and practical acquisition notes on the right inside KH2's established book. Keep Roxas as a separately labeled **Prologue guide**; his local order must not populate Sora's Twilight Town 39-slot board. Opening the Proof of Nonexistence chest stays distinct from clearing the Data battles.

The [KH2 workbook](references/kh2fm/README.md) has prior Story observations, not a verified Treasures capture. A fresh attempt at the [supplied video](https://www.youtube.com/watch?v=rw8c9l0K1vU) remained black/buffering. **Column count, uncollected/selected symbols and native treasure-detail geometry remain open.** Do not substitute concept mockups or isolated public assets as game-screen evidence. One focused partly collected Final Mix screen plus the relevant world transitions is the immediate visual need.

### BBSFM: character-owned grids within a broad Reports leaf

The inspected [Terra cover](references/bbsfm/terra-reports-root.png), [Unversed Missions interior](references/bbsfm/reports-unversed-missions.png) and [world index at 13:05](references/bbsfm/book-video-13-05.png) place the rings near the **left edge**, with one broad interior leaf. Preserve the character colors, red hierarchy tabs, ruled paper, glove selection and distinct completion/NEW marks. Grid-left/details-right may occupy two regions of that leaf; do not add a central spine merely because the app's current renderer calls them leaves. [Reference workbook](references/bbsfm/README.md).

There are **374 main-campaign chests**: Terra 122, Ventus 130, Aqua 122, in 32 chest-bearing character/world partitions. **Eight Aqua Secret Episode** chests are separate. The Ventus Land of Departure tutorial is an additional saved acquisition with `collectible=false`, deliberately outside Reports chest totals. There are no Final Episode chest records in this dataset. Sixty stickers stay separate; three Xehanort Report views alias existing chest IDs.

The [inventory CSV](../games/bbsfm/collectible-inventory.csv) carries source positions, while [the generator](../../src/games/bbsfm/generate.py) assigns `order` from the global CSV extraction index. Neither proves a native slot. A [first-hand original BBS Reports transcript](https://gamefaqs.gamespot.com/psp/943347-kingdom-hearts-birth-by-sleep/faqs/62875) explicitly preserves game order and nine-across rows; a [Japanese Terra FM table](https://wikiwiki.jp/kh_bbsfm/宝物リスト/テラ) also describes upper-left numbering but warns it copied original-version material. They are useful crosswalk sources, not Steam/HD pixel certification.

This request explicitly reopens the deferred slot-lookup boundary in [BBS-002](../games/bbsfm/critical-reaudit-2026-10-03.md). Prioritize nine repeated same-room/reward groups (18 records), corrected Aqua Mysterious Tower #4, and Secret Episode inclusion/order. A precise local count problem also needs correction in implementation: the category count's `checkableEntries()` includes the tutorial while world collectible counts exclude it. One shared counted-chest predicate must drive board and summaries. No progress ID should be removed to fix that denominator.

### DDDHD: one shared Reports shell, two separate chest boards

The inspected [Reports cover](references/dddhd/Kingdom-Hearts-Dream-Drop-Distance-HD03152021-105140-21456.jpg), [Character Files index](references/dddhd/Kingdom-Hearts-Dream-Drop-Distance-HD03152021-105142-62749.jpg) and [Glossary detail](references/dddhd/Kingdom-Hearts-Dream-Drop-Distance-HD03152021-105141-39332.jpg) confirm a wide single leaf with far-left rings, charcoal/silver frame, magenta plaques, gray section bands and handwritten ruled content. None shows Treasures. Preserve the [implemented single-leaf direction](dddhd-new-ui-plan.md); a grid with selected preview and Notes fits it without a fake facing-page book.

All **438 chests** are character-owned: Sora 225, Riku 213 across seven worlds each; there are **zero shared chest flags**. A “Both” overview may show two counts/boards, never one interleaved numbered sequence. Current [world facts](../../src/games/dddhd/world-facts.json) provide source numbers, and the [route join](../games/dddhd/chest-route-enrichment.json) accounts for 400 exact item/area/number matches, 20 quantity normalizations, 16 HD replacements and two remaps. That is acquisition evidence, not an HD-native ordering certificate.

A [first-hand 3DS Reports transcript](https://gamefaqs.gamespot.com/3ds/997779-kingdom-hearts-3d-dream-drop-distance/faqs/64967) preserves five-across rows. It supports current Riku/TWTNW Curaga #2 and Doubleflight #3 against a reversed older route list; HD parity still needs targeted verification. Prioritize the 16 replacements, two remaps and 12 repeated same-room/reward groups (25 records).

Important current behavior: `DddJournal.tsx` does **not sort** its matching entries. Riku/TWTNW begins source numbers 11, 23, 1, 2, 3 in the runtime array. A CSS grid over the existing `.map()` would be visibly wrong even before the native crosswalk is resolved. Introduce an explicit ordered projection; retain all saved IDs. Do not confuse treasure counts with the native Reports completion-rate formula.

### KH0.2: companion chest index in system-menu styling

The inspected [Objectives screen](references/kh02/Kingdom-Hearts-02-Birth-by-Sleep--A-Fragmentary-Passage08292021-071047-64098.jpg) provides blue technical framing, a red-orange tab, numbered rows, red selection outline, reward preview and an instruction footer. The other supplied screens are Story pages. A [contemporary first-hand editorial](https://www.khinsider.com/editorials/What-if-Kingdom-Hearts-3-kept-0-2-as-its-prologue-10949) explicitly reports no journal or treasure-chest guide. That supports an app-defined index; it does not claim an exhaustive current Steam menu inspection.

The [catalogue](../../src/games/kh02/catalog.ts) has **41 chests**, 29 ordinary and 12 Zodiac: Castle Town 10, World Within 13, Forest of Thorns 12, Depths of Darkness 6. Castle Town's companion total is **Main Road 1 + objective area 9**; objective 37's native denominator remains 9, not 10. Seven gems, three flowers and four memories make 55 physical finds but are not extra chest squares. Zodiac is an additional category on the same chest IDs, not another 12 checks. See [inventory boundaries](../games/kh02/collectibles.md).

Use area-grouped companion boxes and an adjacent blue acquisition panel, labeled Guide order. Keep the Zodiac first-clear/NG+ qualification and the two existing Forest reward warnings (`kh02:ft-north-potion`, `kh02:ft-save-ether`) in details. No native slot-mapping research is needed to invent numbers the game does not provide.

### KH3: the strongest supported native-grid match

The actual [Treasures image](references/kh3/Kingdom-Hearts-III04022021-124325-74189.jpg) shows **eight columns**, Olympus 4×8, Twilight Town 8+2 and the start of Toy Box, with world labels/counts aligned beside the groups and one collection scrollbar. Colored closed chests, gray chest silhouettes, cyan selection and yellow counts are visible. No visible slot-number labels or literal `?` establish a universal unknown-state icon. The selected Olympus row 2/column 1 reads **Map: Mount Olympus**, corroborating ordinal 9. Acquisition route text is not shown. [Existing research](kh3-interface-research.md) supplies the digital frame direction.

The runtime holds **245 base + 9 Re Mind** chests with no typed `order` or journal-slot field. All 254 world+number pairs match [Kalavinka's first-hand Gummiphone transcript](https://gamefaqs.gamespot.com/ps4/718920-kingdom-hearts-iii/faqs/78580), described as PS4 v1.10/DLC-inclusive: 248 exact reward strings and six harmless aliases (Petit/Petite Ribbon; five map-colon spacing differences). This pass records those proposed pairs in the inventory. One is also pixel-corroborated; 253 additional pairs remain source-supported. There are no source-number gaps or duplicates within the 11 partitions.

[PowerPyx's Olympus guide](https://www.powerpyx.com/kingdom-hearts-3-olympus-collectible-locations-treasures-lucky-emblems/) explicitly identifies its numbers as Gummiphone order; its route begins #1, #2, #9, #4, #5, #3. That is a concrete reason not to use guide paragraph order. Repeated rewards are also substantial: 136 of the 245 base rows belong to 23 repeated-name groups. Preserve world+slot+existing-ID joins, not reward-name joins.

Use the native grouped board, plus a practical world jump/focused view and digital Notes panel. These navigation/detail additions are app adaptations. Keep base 245 and Re Mind 9 separately labeled and counted. The transcript puts Scala's nine entries inside Treasures after Final World while retaining a 245/245 header; it does not certify how native DLC labels, saves or episode switches work. Obtain a targeted DLC screen rather than forcing 254 into the base total. **Do not require 254 new screenshots to use this strong source-supported map.** Normalize the explicit metadata and spot-check the remaining states.


### Re:Chain of Memories HD: finite reward claims, not a fixed chest journal

The inspected [Sora Journal root](references/recom/sora-journal-root-0010.png) lists Story, Card Collection, Card Index, Characters and Mini-games. The inspected [Card Collection](references/recom/sora-card-collection-0520.png) is a dense crown-shaped card mosaic on one cream leaf with outside-left rings, gray plaques and a green help footer. It is not a world treasure-chest grid. The [capture manifest](references/recom/source-manifest.json) links these to the [HD root at 0:10](https://www.youtube.com/watch?v=hb2RFXT5tDI&t=10s) and [collection at 5:20](https://www.youtube.com/watch?v=hb2RFXT5tDI&t=320s).

Runtime and canonical inventories match **41 Sora reward claims**: 12 base Room of Rewards, 12 Days-bonus and 17 Bounty rewards across 12 worlds. All 17 Bounty records have source `bountyOrder`, but the runtime exposes it as notes, not a typed slot. This is eligible unique-reward priority, **not journal cell order**. See [canonical claims](../games/recom/worlds-and-rewards.json), [generator](../../tools/content/build-recom.mjs), and the [world/room contract](../games/recom/worlds-rooms-and-rewards.md).

Proposed World Rewards view: per-world groups with two distinctly labeled Room of Rewards cells, **Base** and **Days bonus**, followed by Bounty claim cells in supported priority order. Use Sora's single-leaf journal styling and acquisition Notes, including the applicable floor's door requirements. Label this a companion reward index. Do not count generated rooms, random repeat chests or card quantities. Room regeneration does not clear historical acquisition. Riku has no corresponding reward collection; 100 Acre Wood's minigame rewards stay in their existing track. The [Map Card rules](https://www.khwiki.com/Map_Card#Room_of_Rewards) and [World Cards table](https://www.khwiki.com/World_Cards) support the distinction.

Keep the existing 152 Sora / 59 Riku Card Collection grids and their saved discovery flags intact. Marking a reward must not silently mark a card or sleight: current runtime deliberately states those are separate records. A future auto-linking rule would be a separate product/migration decision, not part of this presentation change.

## 4. Screen contract

### World summary

1. Enter Treasures to see a compact, paged world index using the game's existing header, binding/device frame, selection treatment and help strip. Each world shows **collected / total chests** in the chosen scope. Re:CoM says **reward claims**; KH1 says **acquisitions** until its chest subset is resolved.
2. Selecting a world previews its slot board and count. Opening it gives the detailed board. On desktop, the world index and preview can share existing page regions; do not squeeze seven full grids into a dashboard.
3. Keep game, edition, character and episode explicit above the board. BBS and DDD aggregate summaries may show multiple counts, but never interleave two characters' slot sequences. Switching character returns to that character's last world/slot rather than carrying an ambiguous `#12` across.
4. World completion is derived from applicable records; the world header is not a bulk-complete control. Other collectibles remain separate categories. A chest tab cannot silently inherit a world total containing puzzle pieces/stickers/emblems.
5. For KH3, preserve the native grouped-world overview option already evidenced, with world jump navigation as a companion convenience. Its observed all-world layout is not evidence for a native world-picker transition.

### Slot board and selected detail

- Slots remain in the canonical order of their **world + character + edition/episode** partition. Give a readable number where supported; do not make the reward name the dominant overview content.
- Selection displays: scoped slot reference; reward/content; area; precise landmark/approach; collection action; relevant prerequisite; revisit/missability facts; optional approved media; and the saved Collected checkbox. Text must work without images.
- Left-page boxes/right-page directions is the preferred wide KH1/KH2 arrangement. BBS uses adjacent grid/details regions within one broad leaf. Right-page notes are a companion expansion of the native screen, not a claim that the original game supplies route instructions.
- DDD/Re:CoM retain one leaf. Use Grid → Notes within the fixed stage, with a short selected-reward strip and explicit Return to grid. KH3 similarly uses its Gummiphone board → Notes; 0.2 uses blue system panels. A split region on a very wide device is permissible only without inventing a central book spine.
- Display number and page number are different. “Slots 25–48” / “Grid page 2 of 3” must not be confused with “Notes 2 of 3.” Previous/next treasure follows canonical partition order, not alphabetical reward order.

### Separate unknown, unchecked, collected, selected and focus

| State | Proposed meaning and treatment |
|---|---|
| Uncollected | `?` / game's verified empty-cell equivalent. Means **not marked collected by the player**, not inaccessible or spoiler-hidden. Details still disclose the reward and location. |
| Collected | Verified native chest/mark treatment for that game where available; otherwise a restrained chest symbol with a textual Collected state. Never rely on color alone. |
| Selected | Persistent selection outline/glove/bracket in a reserved gutter. Does not imply collected and never changes geometry. |
| Keyboard focus | Visible focus outline distinguishable from selection and completion. Moving focus alone never writes a check. |
| Order unresolved | Do not place an invented `?` in an asserted official position. Put the actual known record in a clearly labeled companion/unmapped group until its slot is established. |
| Known missing record | If a source establishes a real slot but the acquisition mapping is missing, retain the position with “Location details unavailable”; do not make it checkable against a fabricated ID. Flag incomplete coverage. |
| Not applicable | No board for Riku's CoM rewards or an absent character/world collection. Do not show a misleading 0/0 completion badge or missing-data warning. |
| Saving/error | Reserve a fixed status region, disable repeated submission for the affected control, announce saving/success/failure accurately, and restore or retain retryable state on failure. |

The requested `?`/chest design is a good shared interaction language. Exact native icons and missing-state artwork remain game-specific evidence, not assumptions inferred from completed-save screenshots. No additional spoiler mode or Available Now tracker is proposed.

### Marking versus opening

Recommended default: **tap/click a square to select and read; use the explicit Collected checkbox to mark/unmark**. It prevents an accidental comparison tap from changing progress. The same checkbox is present in the compact selected-preview strip and the detail panel; a change is one action once the slot is selected. Keyboard focus has a separately documented Mark/Unmark action, not an overloaded navigation key.

Preserve the established compact-check/direct-toggle requirement through a distinct check target if needed in the final mockup, never overlapping the selection target. The 44px touch minimum applies to both controls; do not hide a tiny check hotspot inside a 44px square. The visual density versus per-tile two-control tradeoff is one small interaction decision to review before implementation. Existing Re:CoM Card Collection direct-toggle behavior is outside this treasure-only change.

Unmark is equally direct and reversible. Keep the selected cell, note page, and focus in place after a change; show Undo. No automatic inventory consumption, reward-item discovery, achievement completion or parent-world tick follows a treasure check.

## 5. Filters, search and pagination without losing the journal

- **Default board is always positional.** All / Remaining / Collected and area/name search highlight matching slots, retaining the nonmatching slots as quiet context in their original positions. They must not pack survivors together or rename `#28` to `#6`.
- Show “6 matches · 12 / 32 collected” as two different values. The denominator is the full scoped collection, independent of filters and search.
- Provide Next match / Previous match or Jump to slot. No automatic page jump after a tick. If a selected Remaining slot becomes collected, keep it selected and explain that it no longer matches until the player navigates onward.
- Search results can remain a compact result list across worlds. Each result states character/episode, world and verified slot (or companion reference), and opens the original board with that cell selected. Results are not another saved record set.
- Preserve native column geometry when it is actually evidenced and readable. Fixed row-major coordinates are valuable for comparison; merely preserving order while changing eight columns to five makes “row 2, cell 1” a different number.
- Use the existing measured-capacity approach for the available board height. Paginate in whole canonical rows where native columns are known. Keep the page anchored to the selected **record ID**, not an old page number, after resize, font load or orientation change.
- When a native-width board cannot fit 44px targets on a phone, use a deliberate labeled compact layout with persistent slot numbers, or a row-range page/window. Do not claim that a rewrapped layout matches native row/column coordinates. No transform-scaled landscape screenshot, horizontal reading scroll or tiny targets.
- Stable outer stage, headers, utility controls, count, selection summary and save status remain reserved. Long notes use `JournalNotePages`-style numbered continuations. Ordinary supported phone/desktop sizes must not develop hidden clipped text or growing book geometry. Exceptional zoom/assistive-text settings need accessible reflow rather than clipping to preserve a decorative frame.

### Navigation and accessibility

Use real semantic controls, not a screenshot with click coordinates. A grid can use an ordered list of selection buttons with a clearly labeled Collected checkbox, or a fully implemented ARIA grid with documented arrow/Home/End behavior; do not add grid roles without implementing their keyboard contract. Announce, for example, “Aqua, Enchanted Dominion, treasure 7 of 8, not collected, selected.” Unknown order must be called a companion reference, not treasure 7 of an official journal.

On narrow screens, Grid and Details are two explicit views, with a persistent count and Back control. Return restores world, character, filters, selected ID, computed grid page and keyboard focus; browser Back/Forward and a link opened from search must work the same way. Remember only presentation state separately from progress. Do not add visited/unread tracking or game-save integration.

## 6. Data contract before implementation

Add **presentation metadata around existing IDs**, not a replacement ID system. The exact schema is an implementation decision; it needs these concepts:

| Concept | Required meaning |
|---|---|
| Stable entry/acquisition identity | Existing saved ID and, where already verified, existing shared acquisition group. Never a grid index. |
| Partition | Game/ruleset, character/campaign, main/episode/DLC, world. Area may filter but must not redefine a native world sequence. |
| Kind/counting unit | Physical chest, other one-time acquisition, tutorial/reference, finite CoM reward claim. Necessary especially for KH1. |
| Display order | Separate `journalSlot` from `companionOrder` and `sourceNumber`; no implicit fallback that calls all three Journal #. |
| Native geometry | Columns, row-major direction, group/pagination boundary and observed screen family, only where evidenced. |
| Evidence | Source URL + exact section/time/frame, edition/platform, mapping method, confidence and any normalization/exception. Maintainer data, not noisy journal-page badges. |
| Coverage | Expected scoped count where known, mapped count, unplaced records, missing positions, excluded records, and the reason for each exclusion. |

Build the mapping by **identity + world + character/episode + reward + area/landmark**. Repeat rewards are common; reward text alone is not a join key. The finite comparison should produce a disposition for every input row: mapped, app-defined, excluded with reason, or unresolved. Validate contiguous slots only within the source's declared sequence, and never infer absent cells solely because IDs skip numbers.

Required mapping checks: unique stable IDs; unique `(partition, journalSlot)`; no duplicate source rows silently merged; declared count equals included slots; no missing/unexpected positions in a certified partition; every checkable cell resolves to a real acquisition; every existing checkable acquisition is either represented or deliberately retained elsewhere. Duplicate reward names must remain distinct boxes.

## 7. Progress, migration and offline safety

Current stores are already ID keyed:

- KH1: [`playerStore.ts`](../../src/state/playerStore.ts), IndexedDB `ars-arcanum-player` / `profiles` / `kh1fm-current`, with checks and verified acquisition-group normalization. [`collectibleProgress`](../../src/domain/progress.ts) counts shared acquisitions once.
- Other six apps: [`profile.ts`](../../src/games/profile.ts), IndexedDB `ars-arcanum-guides` / `profiles`, profile key equal to game ID, `checks[entry.id]`. Character distinction is already carried by catalogue IDs/scopes; do not create new character-specific progress copies.

**Pure presentation metadata needs no completion migration.** Old IDs, check booleans, quantities, plans, backup formats and namespace boundaries remain unchanged. Reordering display data never remaps a saved bit by position. Preserve old entry deep links via ID-based resolution to the new board and selected cell.

There is an important implementation constraint: generic `parseProfile()` rejects unknown entry IDs, including during local load. Removing/renaming records for a “cleaner” grid can therefore make an existing profile fail to load. Keep excluded tutorial/other-reward records in the catalogue and accessible where appropriate. If a factual identity really must merge/split/retire, write an explicit reversible alias/migration and recovery/import test first; do not silently drop orphan checks. KH1's local retention and strict import validation also need separate tests.

Use explicit desired-state writes for checked/unchecked actions against the latest stored record, rather than deriving a new identity or relying on two toggles during a rerender. Grid and detail must share the same pending/error state. Retain cross-tab transaction behavior, recovery snapshots, truthful save status and offline persistence. Undo must not overwrite newer unrelated changes. Do not restructure storage merely to ship this grid.

Serve slot metadata, text and basic glyphs with the offline game bundle. Reference screenshots are research evidence, not licensed production assets; no new network call should be required to identify a chest. Cache updates must not touch player progress. Optional media failure must leave complete directions and working checks.

## 8. Finite work packages and release gates

### Priority 0: correctness gates, before a grid can claim journal order

| Work package | Finite deliverable | Blocked scope |
|---|---|---|
| KH1 acquisition taxonomy | Review the 306 current treasure entries plus existing specialist acquisition links; disposition each as chest/container, other reward or existing linked acquisition. Reconcile the 216-location snapshot without adopting its different scope blindly. | A chest-only denominator; companion grid order itself needs no native research. |
| KH2 explicit crosswalk | Materialize all 301 scoped slot→existing-ID pairs; retain the 188 current independent matches and resolved Disney exception; check evidence for the remaining 112 and prologue exclusion. | Claiming every FM slot matches the game. Existing source-backed guidance remains usable. |
| BBS native crosswalk | Reconcile 374 main candidates with report-order sources, including the 18 ambiguous duplicate records; establish how the eight Secret Episode chests are presented. Keep tutorial outside the counted set. | Per-character native position lookup and consistent counts. |
| DDD HD crosswalk | Reconcile 438 candidates against explicit report-order evidence with the 16 HD replacements, two remaps and 25 duplicate-group records called out. Define ordered projections separately from the raw array. | Reliable HD position lookup. |
| KH3 metadata normalization | Adopt the 254 already source-supported proposed pairs; retain six harmless normalization exceptions and separate 245/9 scope. | Typed, testable source-supported slot rendering, not another full research campaign. |
| Re:CoM / 0.2 companion order | Choose and document semantic reward groups / area order for the existing 41 + 41 records. Preserve Bounty priority, Zodiac facets and Main Road boundaries. | Honest guide labels and denominators; there is no asserted native order to certify. |
| Shared state/coverage | Resolve every cell to its old saved ID; define included/excluded sets; validate alias counting and backup compatibility. | All implementations. |

These are new presentation-order requirements. Do not reopen unrelated deferred enemy, Gummi, synthesis or story research; do not reinterpret prior “practical acquisition research complete” as an official journal-order certification.

### Priority 1: small, targeted reference package

- **KH2FM:** native Treasures world page with some collected and uncollected cells, focused known reward, and world selection; include Cavern/late Twilight Town boundary if the first page does not establish it. Current video buffering is an evidence limitation, not a reason to fabricate geometry.
- **BBSFM HD:** one partly complete main Reports treasure page and its character/world navigation; one Secret Episode treasure/collection screen if it exists. These settle target-edition rows, symbols and episode treatment.
- **DDDHD:** one partly complete treasure screen for each character, or a video segment showing the switch, plus one HD-replaced reward. Existing 3DS five-across text does not certify HD screen geometry.
- **KH3:** focus on an uncollected cell, a fully completed world and Re Mind's treasure presentation/episode context. The supplied partly collected base grid already establishes the main screen family and eight-column layout.
- **KH1/Re:CoM/0.2:** existing reference shells are enough for an honestly labeled companion design. Optional room/chest screenshots can enrich directions; no hunt for nonexistent native grids should block the work.

Treat these as a **focused evidence checklist**, not a demand that the user capture every chest. Use public primary footage where available; ask for a specific screenshot only when the remaining targeted public route fails. Native fonts, exact extracted art, animation timing and controller-specific glyphs are optional fidelity refinements, subject to rights/accessibility. They are not data blockers.

### Proposed implementation sequence and effort

1. **Data-only normalization and tests.** Establish the contracts above, preserving IDs and all current content. KH3's map can be prepared immediately; KH1 classification and BBS/DDD slot parity are the highest-uncertainty work.
2. **One reviewed interaction slice in KH2.** World summary → positional board → selected acquisition notes, fixed filters, page anchoring, keyboard/touch and a baseline-backup round trip. KH2 already has the facing-page renderer, so it is a lower integration risk than using the unimplemented full KH3 Gummiphone as the first UI trial.
3. **BBS + DDD adapters.** Reuse selection/filter/progress behavior, preserve their different leaf geometry and character boundaries. Correct BBS's tutorial count and DDD's raw-array presentation as part of the adapter, with regression tests.
4. **KH3 native-grid adapter.** Use the supported eight-column/grouped model and digital Notes; do not make this depend on rewriting Workshop, Photo Album or every unimplemented Gummiphone feature.
5. **KH1, Re:CoM and 0.2 companion boards.** Apply their approved labels/grouping while retaining other rewards and existing collection tools. This is not permission to restyle Re:CoM Card Collection or to add a book to 0.2.
6. **Cross-game regression and reference review.** Prove saved checks, denominators, existing links, responsive page bounds and offline behavior before each app's grid replaces its list.

Planning size: a **medium multi-game redesign**, rather than a quick CSS change. Allow roughly **2–4 focused engineering days for the shared grid/notes interaction and first game, 3–6 for the other six adapters, and 2–3 for cross-game migration/accessibility/offline regression**, after the applicable data mappings and focused references are available. These are planning estimates, not measured task durations or a delivery promise. The variable work is BBS/DDD parity and KH1 classification; this audit bounds the records and exceptions but does not pretend that every join is already done.

The endorsed direction can proceed with these working defaults: native composition variants, honestly labeled companion order where needed, and selection-first cells with a persistent mark control. The first interaction review should settle whether separate per-cell mark controls are preferable. Mapping gaps shape the per-game sequence; they are not a reason to abandon the design. Implementation still requires a subsequent instruction because the current request is explicitly research-only.


### Implementation acceptance, once authorized

1. Compare representative worlds against native screens: first/last slots, row transitions, repeated rewards, a partially collected board, and character/episode switches. Source-supported complete mappings still need targeted visual spot checks.
2. Open a cell from world summary, category, global search and an old deep link. Every route resolves to the same ID, detail and check.
3. Check/uncheck in grid preview and details; reload, relaunch offline, undo and open another tab. Counts and state agree; failed storage never announces success.
4. Keep position and selection under Remaining/search/area filters. Tick the current last match, then Back/Forward and resize. No cell disappears, shifts, renumbers or changes character.
5. Import a baseline backup including excluded/tutorial records and explicit false values. Reorder display metadata, keep old IDs, and verify an exact check-map round trip. Malformed imports leave saved state untouched.
6. Verify KH1 grouped rewards; KH2 prologue vs Sora; BBS tutorial/main/Final/Secret; DDD Sora vs Riku; CoM reward vs card; KH0.2 separate namespace; KH3 base vs Re Mind. No denominator or checkbox leakage.
7. Test mouse, keyboard, screen-reader labels, 44px touch targets, high text size, reduced motion, desktop, narrow portrait and short landscape. Native column fidelity cannot trump readable controls.
8. Confirm all preexisting useful acquisition text still exists without media; no giant static screenshot, clipped text, unexpected vertical book scroll, lost return focus or fabricated statistics.

### Verification of this research deliverable

This is a documentation-only change. Local checks validate the inventory JSON, audited counts, relative Markdown links and `git diff --check`; no runtime/UI acceptance is claimed from this pass. Existing application baseline findings and known full-suite limits remain in the [master consolidation report](../implementation/master-consolidation-2026-10-03.md). A feature-branch push does not deploy Pages; no runtime tests were made green by changing their expectations here.
