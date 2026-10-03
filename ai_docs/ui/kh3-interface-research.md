# Kingdom Hearts III — Gummiphone interface research

**Research date:** 2026-10-03  
**Status:** Research and proposed requirements only. No KH3 application implementation is authorized or included in this pass.  
**Baseline:** `619adc7` on the pushed DDD interface branch, which includes the non-CoM research integration at `2cfc0ff`. `master` remains `e56ccb9`; this research does not merge, deploy, rewrite DDD or change CoM.

[Original five references](references/kh3/README.md) · [Evidence ledger](references/kh3/interface-evidence-2026-10-03.json) · [Existing KH3 content specification](../games/kingdom-hearts-iii.md) · [Proposed implementation contract](kh3-new-ui-plan.md)

## 1. Direction in one paragraph

Build a **Gummiphone**, not another ring-bound Reports book. Its home is an icon-led digital launcher; its applications have recognizably different native compositions. Treasures and Game Records share a dark geometric record frame, Lucky Emblems has a bright gold photo-board, Classic Kingdom has a filmstrip-like catalogue, and Story/Glossary use dark readers. The green **Moogle Workshop** and amber **Premium Menu** are separate systems, not alternative skins for every Gummiphone page. Recreate the hierarchy, proportions, selection treatment, compact rhythm and screen changes closely, while retaining Ars Arcanum's location instructions, manual checks, fixed-stage pagination, accessibility and offline state. This is more specific than “navy background and cyan cards.”

The user's existing references are the starting authority for composition. New public screenshots extend them. Still images establish visible structure; they do not establish animation duration, input timing, list wrapping or menu transition behavior. The [video leads below](#8-video-research-and-remaining-capture-brief) were found but playback could not be inspected in the cloud browser. No video timestamps are certified.

## 2. What was actually inspected

### Supplied originals

All five original 1920 × 1080 JPGs were opened and visually inspected again. Original bytes, names, dimensions and hashes are preserved in the existing [source manifest](references/kh3/source-manifest.json). Its Game UI Database URLs were reconstructed previously from filenames; this pass does not upgrade them to independently fetched provenance. Exact capture platform/build is still unknown.

| ID | Local image | Evidence from pixels | Limits |
|---|---|---|---|
| U01 | [Characters](references/kh3/Kingdom-Hearts-III04022021-124325-2018.jpg) | Pale gray surface; large black diagonal title corner; two columns of green text; blue/cyan selection; right scrollbar; orange `!` markers; gold Mickey-like seals; explicit Re Mind/DLC row | Category/list state only, no selected character model/detail or transition |
| U02 | [Glossary](references/kh3/Kingdom-Hearts-III04022021-124325-22843.jpg) | Black/green reader; centered green title; narrow top rules; repeating dark symbols; left topic list/right prose; independent visible scrollbars; green horizontal selection and warm point of light | Native scrolling visible as controls, not observed in motion; precise Previous/Next behavior unverified |
| U03 | [Story](references/kh3/Kingdom-Hearts-III04022021-124325-70928.jpg) | Full-bleed scene under strong dark scrim; violet heading; blue selected world; two columns; separate unread/seal markers; Hide/Show Text and Previous/Next prompts | Does not authorize narrative tracking or reproduction of native story text/art |
| U04 | [Treasures](references/kh3/Kingdom-Hearts-III04022021-124325-74189.jpg) | Gray beveled header/footer; black diamond-pattern side rails; left world labels/totals aligned to groups of eight-column chest slots on right; cyan outlined selected chest; item label above grid; yellow totals | A vertically grouped all-world collection, **not proof of an independent equal-height world-navigation list**; no opened detail or missing-chest interaction shown |
| U05 | [Game Records](references/kh3/Kingdom-Hearts-III04022021-124350-43830.jpg) | Same geometric record frame; dark left grouped index; blue right statistics panel; gray subsection strips; right-aligned yellow values; fixed help footer | Snapshot is partway through the catalogue; not the full hierarchy, and values belong to the captured player's save |

### Additional visual evidence

These public images were inspected directly in the cloud browser. They remain research links; no downloaded sprite, portrait, world logo or screenshot has been promoted to production artwork. The machine-readable ledger records source pages, image URLs, dimensions and evidence limits.

| ID | Source and direct inspected image | What it establishes |
|---|---|---|
| X01 | [Vandal Gummiphone root](https://media.vandal.net/master/2-2019/20192821195540_1.jpg), 1920 × 1088, Spanish labels | Three-column/four-row app grid, navy/violet tiles, pale icons, label strips, cyan selected tile, independent orange unread/gold completion marks; starfield line art; large right-side world logo/Jiminy composition and lower help strip |
| X02 | [Lucky Emblems world index](https://www.trueachievements.com/customimages/116277.jpg), 1920 × 1080, from [the walkthrough](https://www.trueachievements.com/game/kingdom-hearts-3/walkthrough/18) | Light diamond-pattern background; ornate gold title/world/completion plaques; nine world cards in a 5+4 arrangement; gold selected-card illumination |
| X03 | [Lucky Emblems world board](https://www.trueachievements.com/customimages/116276.jpg), 1920 × 1080, from the same Gummiphone walkthrough (verified image link) | Gold-framed ochre board; pinned photos in rows of five; selected photo gets a yellow border; world name and completion pips remain above; no text-heavy side panel in this captured state |
| X04 | [Moogle Workshop synthesis list](https://assets.rpgsite.net/images/images/000/073/758/original/kingdom_hearts_3_synthesis_items_materials_guide.png), 1620 × 909 | Green gradient field, vertical WORKSHOP rail, category icon strip; left product/quantity/stock list; cyan selected row; right product explanation and separate materials-needed/quantity/stock panel; insufficient stock in red; footer help |
| X06 | [English Gummiphone root](https://www.trueachievements.com/customimages/116278.jpg), 1920 × 1080, from the TrueAchievements walkthrough | Exact English tile labels/order; same 3×4 launcher; San Fransokyo logo and another Jiminy pose |
| X07 | [Workshop hub](https://assets.rpgsite.net/images/images/000/073/748/original/kingdom_hearts_3_synthesis.jpg), 1109 × 625, linked from the [RPG Site materials article](https://www.rpgsite.net/feature/8236-kingdom-hearts-3-synthesis-material-list-adamantite-orichalcum-damascus-fluorite-and-other-synthesis-material-farming-locations) | Five native Workshop options, selected icon/crown/underline treatment, right SYNTH LOG statistics card |
| X08 | [Classic Kingdom catalogue](https://www.trueachievements.com/customimages/116186.jpg), 1920 × 1080 | Monochrome filmstrip catalogue, selected-game objective and ranked stage fields, 2×6 visible cards, page 1/2 indicators and Game Help/Previous/Next prompts |
| X09 | [Gummi Main Ship selection](https://cdn.mos.cms.futurecdn.net/bvR9gxGvU8DihwPUcxG7rh.jpg), 3840 × 2160, from [GamesRadar](https://www.gamesradar.com/kingdom-hearts-3-schwarzgeist-guide/) | Luminous cyan beveled panels, gold selected ship row, central model and right cost/stat/ability panels, separate Teeny indicator |
| X05 | [Official Square Enix Premium Menu](https://www.jp.square-enix.com/kingdom/kh3/dlc/_img/c6/pic01.jpg), 600 × 338, from [the official DLC page](https://www.jp.square-enix.com/kingdom/kh3/dlc/) | Angular white header/footer rules, black technical grid, amber BLACK CODE list/ON column, yellow focused row; separate gray achievement/history/rank/total panel; help and score-star footer |

X05 is a Japanese promotional, in-development screenshot. It establishes a screen family, not final English labels, Steam button prompts or every released Premium state. The official [English DLC page](https://www.square-enix.com/kingdomhearts/3/us/dlc/) independently distinguishes Re Mind, Limitcut, Secret Episode, Data Greeting, Slideshow and Premium Menu. They must not be merged into one purported native journal subsection.

The [tentative translation of interface director Naomi Sanada's Ultimania interview](https://www.kh13.com/news/kingdom-hearts-iii-ultimania-visual-effects-and-interface-directors-interviews-r2963/) says icons were used to make a word-heavy menu feel less complicated. This supports icon-plus-label hierarchy; it is contextual testimony, not a pixel or animation specification.

## 3. Native visual grammar and screen families

### 3.1 Gummiphone home

X01/X06 establish a launcher rather than a chapter menu. The native grid's relative order is:

1. Photo Album · Lucky Emblems · Classic Kingdom
2. Story · Glossary · Secret Reports
3. Character Files · Adversaries · Treasures
4. Recipe Collection · Synthesis · Game Records

X06 directly verifies the English labels and order; X01 provides a Spanish comparison. The [Gummiphone transcript](https://gamefaqs.gamespot.com/ps4/718920-kingdom-hearts-iii/faqs/78580) and [walkthrough](https://www.trueachievements.com/game/kingdom-hearts-3/walkthrough/18) offer additional textual context. The two stills show different world logos/Jiminy poses; they do not establish what input changes that panel or how it animates.

The grid occupies roughly the left two-thirds of the active composition, with a generous right character/world area. Tiles are rectangular and compact, with pale pictograms above narrow label bands. They are neither rounded mobile OS icons nor oversized dashboard cards containing paragraphs. Most tiles are deep violet/navy; the selected tile has a brighter blue face and cyan label strip. A small warm light sits near the selected control. Gold completion seals and orange unread circles are separate overlays.

The right panel's Jiminy is decorative/contextual art in this screenshot. It is not evidence that each tile updates a world-progress sidebar, or that selecting a world changes the root. Do not fabricate those interactions. Use permitted art only; the existing user-provided Jiminy asset may be evaluated separately from extracted screenshot artwork. If adequate art is unavailable, rebalance the composition with a concise app-owned context/selection panel rather than leaving a blank half-screen.

### 3.2 Treasures and Game Records: geometric record frame

At the supplied 1920 × 1080 reference size, the active central surface runs approximately x=128–1784; the top band is y=28–119, content y=145–868 and footer y=892–1035. Decorative diamond rails occupy the outside edges. In both screens the main split is near x=960, roughly halfway across the framed content, although semantic columns differ. These measurements guide relative composition at landscape reference size, not mandatory browser pixels.

- Header: small mint/cyan section pictogram and compact squared label aligned upper left.
- Body: nearly black left field; muted teal or blue gradient on right; thin cool-gray rules and a restrained bevel.
- Selection: horizontal saturated blue gradient for lists, bright cyan/blue inset square for a chest. A faint crown and warm cursor light supplement it.
- Counts and recorded values: yellow; descriptions/names: white. The native values are not available from game saves in this app.
- Footer: fixed-height dark help band with centered short technical-font description and a faint heart motif. It must not resize on focus changes.

**Treasures is a grouped collection grid.** U04 shows Olympus 24/32 aligned beside four rows of eight chest slots, Twilight Town 9/10 beside two rows, and the beginning of Toy Box below. A vertical scrollbar spans the collection. Do not turn this observation into “click the left world to load its independent grid” without labeling that as an app adaptation. The selected chest's item text appears above the slots; the specimen happens to be a map item. This does not establish a map viewer.

**Game Records is an index/detail workspace.** U05 separates Combat and Missions headings in the left list, with Shotlocks, Attractions, Links and The Flantastic Seven visible. The selected Attractions page presents repeated compact statistic blocks, not one generic checklist card per row. Additional minigame groups come from text research/current data, not the visible cropped list. The [first-hand Game Records guide](https://www.powerpyx.com/kingdom-hearts-3-all-game-records-list/) supports the combat/mission/minigame grouping and completion-seal purpose, but cannot establish unpictured layouts.

### 3.3 Lucky Emblems: a gold collection board

X02/X03 establish a substantial change of screen: cream/gray diamonds, sculptural side supports, gold plaques and frames, with an ochre board and pinned photographic tiles. This should not be implemented as the Treasure grid with a different icon. The native path includes a world-card selector and a per-world photo-board state; the transition itself was not observed.

Reference details worth retaining:

- A centered title plaque, selected world plaque at upper left and scoped completion plaque upper right
- Nine visually distinct world cards in the world index, with a clear warm selected treatment
- Five photo columns at the captured landscape size; San Fransokyo's eleven images use 5+5+1
- Consistent thumbnail bounds; pinned-top accent; yellow focus outline separate from collection state
- Reserved, dark translucent lower help strip

Production location photos are still deferred. A coded, numbered emblem tile with an intentional location caption is an **app substitute**, not a claim to reproduce a native unphotographed slot. Do not use fabricated screenshots or empty photo placeholders. Near-parity photo-board completeness remains conditional on authorized usable images and missing-slot evidence.

### 3.4 Classic Kingdom: filmstrip catalogue

X08 directly establishes a monochrome textured screen with a large playful title, selected-game name/objective above two horizontal filmstrip rows, six illustrated cards per row, and a selected-card blue-white glow. A small warm pointer light and gold completion seal are independent accents. The upper-right selected-game fields show three ranked **stage** results for Giantland; do not assume all games score in the same unit. Bottom indicators show pages 1 and 2, with a pointing hand and explicit Previous/Next controls elsewhere. Paging affordances are verified; the animation, wrap behavior and effects of opening a card are not.

The companion should retain the filmstrip catalogue and use measured card capacity. Show acquisition and recorded-score goals as separate labeled tracks. Existing card illustrations are not production assets; intentional numbered/title cards are the text-first fallback. A detail view explains the real game's controls and objective; it does not pretend to launch or emulate it.

### 3.5 Reader family: Story, Glossary and Secret Reports

Story and Glossary are digital readers, not paper. They share two broad columns, a thin centered section header, a colored line underneath, visible vertical scroll tracks and a dark bottom help region. Story uses a dim scene backdrop and blue/violet accents; Glossary uses a repeated emblem field and green selection. White, round handwritten-like body lettering contrasts with the squared technical chrome.

Their native scrollbars conflict with the app's already-established fixed-stage/numbered-pages behavior. Preserve the composition, but paginate long notes intentionally; document that departure. A fixed canvas must not clip text or defeat zoom. The visible Previous/Next labels are not sufficient evidence for the exact switched object, order or wrap behavior.

Secret Reports can use this reading-family grammar provisionally, but their actual interior screenshot is still missing. Existing report acquisition guidance belongs here; no story transcript or biography library should be fabricated merely to fill authentic-looking tiles.

### 3.6 Characters/Adversaries

U01's Characters screen is pale gray with black diagonal title/footer cutouts, green names, two related lists and blue/cyan selection. It is not proof that Adversaries uses the identical view. Adversaries needs a verified category index and entry detail before near-parity visual sign-off. In the interim, the two-level catalogue and stable selected-entry panel can be specified from product needs, with the exact native skin marked unresolved.

There is no reason to add a giant generic monster grid or permanent party portrait sidebar merely because KH3 is a modern game. The existing 81 adversary records must retain useful combat/farming/acquisition cross-links regardless of the final list/detail composition.

### 3.7 Moogle Workshop, equipment and Cuisine

X04 is actual crafting. It is not the Gummiphone Synthesis history application. Preserve that distinction in labels, route hierarchy and completion semantics. The [Gummiphone walkthrough](https://www.trueachievements.com/game/kingdom-hearts-3/walkthrough/18) distinguishes the journal's synthesis-item record from the craft menu's made-once indication.

X07 additionally verifies the Workshop hub order: Synthesize Items → Keyblade Forge → Photo Missions → Collector’s Goals → Material List. Its selected option is larger with a cyan underline/icon/crown, explanatory line and warm light; a separate right-side SYNTH LOG card summarizes three tracks. Selection enlargement is a visible native state, but the app must reserve that size so moving focus does not reflow the screen. Those three captured numeric values are not values to seed into the app.

For the app Workshop, keep the green native field and product-list/material-panel relationship, but use real web controls, source links and manual inventory. Synthesis, Keyblade Forge and Cuisine must not be presented as 286 indistinguishable recipe rows. Their mechanics and native source screens differ. X04/X07 certify the synthesis list and hub, but not forge, shop-buy/sell, Collector Goals, Photo Missions or Little Chef detail layouts. A shared code primitive may support them; a single asserted authentic visual screen cannot.

Equipment and shops belong to their own player-menu/workshop context. “Paused menu” is also distinct from the in-game combat command HUD and from the title/opening menu. Neither a stylized command-menu screenshot nor a fan menu concept establishes the pause screen.

### 3.8 Re Mind/Premium and Gummi

Premium uses technological black/white rails, an amber code panel, state columns, and achievement/rank summaries. A web code reference is not a functional switch inside the game. If the app displays code selections for planning, that needs an explicit new persistence/meaning contract; current manual completion must not masquerade as native code activation.

Re Mind episode scopes, base-game collectibles, Limitcut/Secret Episode encounters and platform achievements remain separate. A DLC badge is a scope label, not a new world-completion denominator. Data Greeting/Slideshow are distinct native features; the requested companion does not need to become a photo editor.

X09 verifies a distinct Gummi Main Ship selection family: blue cloud/space field, bright cyan clipped-corner frames, dark blue list/stat panels, a gold selected row, a central ship model, and right-side cost/radar-stat/ability modules. This supports a more technical catalogue treatment and a separate focus color; it does not support copying a cockpit HUD onto every mission list.

Gummi is a separate navigation/building/mission system. Do not place its hundreds of parts alongside world chests or import its visual treatment from the Gummiphone root. Ship-selection evidence can inform a catalogue, but cannot certify mission maps, zone lists, rank rewards or editor interactions. Naval/Leviathan material belongs to The Caribbean, not Gummi.

## 4. Proposed application structure

This structure is a **design proposal**, not a recorded user decision. It keeps native composition while making all existing functions reachable.

### Home and navigation

Use a three-column/four-row **Gummiphone launcher on roomy landscape screens**, with meaningful labels and the native icon/selection hierarchy. Keep the native relative positions of the eight applications supported by current content. Four unsupported native apps should not be empty promises: use clearly named companion replacements for Photo Album, Story, Glossary and Character Files.

One concrete reviewable arrangement is:

| Row | Left | Center | Right |
|---|---|---|---|
| 1 | Worlds *(app)* | Lucky Emblems | Classic Kingdom |
| 2 | Equipment *(app)* | Gummi Ship *(app)* | Secret Reports |
| 3 | Re Mind *(app)* | Adversaries | Treasures |
| 4 | Recipe Collection | Synthesis | Game Records |

The replacements are deliberately app-specific. They must not inherit false native completion seals. Keep compact utility access to **Workshop**, **Steam Achievements**, **Search**, and **Progress & Backups** without adding 44 equal-weight root tiles. Workshop remains first-class and one activation away, with a visible link from Synthesis history. It should not be hidden under an ambiguous “More” list.

An alternative is a native-backed Gummiphone tile page plus a clearly named companion-tools page; choose during design review if the four substitutions reduce recognition too far. Either option must expose all useful existing functions and retain saved direct links. Do not add a new required choice or intro sequence before a saved Resume link.

### Screen map and route coverage

The existing module declares **44 categories and 17 world/zone/episode hubs**. A visual redesign must organize these rather than delete them. The following maps all categories; route IDs remain stable even if visible labels improve.

| Destination | Existing categories / functions | Presentation and scope |
|---|---|---|
| Worlds | `worlds`, `worlds/<name>`, `herc`, `rewards`, `naval`, `naval-rewards` | App companion world index/detail using KH3 digital chrome; acquisition categories and counts first. Group Gummi zones and DLC episodes separately from ordinary worlds. Leviathan stays under Caribbean. |
| Treasures | `treasures`; context links to aliases | Native-framed world-grouped chest grid and selected reward strip; acquisition Notes mode is an app extension. Numbering/order remain stable. |
| Lucky Emblems | `emblems`, linked reward thresholds | Gold world-card index → world board → location notes. Explicit recorded-photograph checks, world/90 totals, camera-position text. |
| Classic Kingdom | `classic-kingdom`, `classic-records` | Separate acquisition and recorded-score tracks within one catalogue; no emulator/game-launch button. |
| Adversaries / optional battles | `adversaries`, `battlegates` | Enemy catalogue with linked materials/areas; named Battlegates subsection and clear encounter completion. Exact adversary-native layout still needs evidence. |
| Secret Reports | `reports` | Report acquisition/reading reference; thirteen report identities link to their existing Battlegate records. No second independent physical pickup. |
| Game Records | `game-records`, `challenges`, `slider-prizes` | Native grouped index/stat-style details; practical goals, rewards and controls. Frozen Slider prizes remain ten separate acquisition actions. |
| Synthesis record | `synthesis-history` | Made-once catalogue within Gummiphone. Prominent “Open Workshop” link. Native history layout still unverified. |
| Workshop | `workshop/recipes`, `/materials`, `/plan`; `material`, `material-reference`, `photos`, `collector-goals` | Green Moogle tool context; separate Synthesis/Forge views and a clearly labeled link to Little Chef, not a native Moogle cooking option; Recipes → Materials → Farming Plan order. Photo Missions and ordered Collector Goals belong here, not the Photo Album. |
| Equipment | `keyblades`, `equipment`, `party-equipment`, `platform-keyblades` | Keyblade properties/forge transitions/acquisition; armor/accessories and temporary party references. Other-platform items labeled reference-only. No fake player stats/equipped state. |
| Recipe Collection / Little Chef | `ingredients`, `cuisine`, `cuisine-reference`, cuisine recipe actions | Distinguish recipe, Excellent result, ingredients, meal effects and preparation controls; link into dedicated cooking view. Exact native screen remains a capture need. |
| Gummi Ship | `gummi`, `gummi-missions`, `gummi-battles`, `gummi-treasures`, `gummi-spheres`, `gummi-fragments`, `gummi-parts`, `gummi-blueprints`, `gummi-abilities`, `gummi-reference` | Zone → mission/treasure/battle and catalogue/tool subsections, each with truthful units. No fake ship editor, navigation telemetry or auto-awarded parts. |
| Re Mind | `remind-treasures`, `remind`, `premium-codes`, `premium-merits`, `premium-reference`, `pro-bosses`, `edition-reference` | Episode/encounter scope, nine DLC treasures, Premium reference/merits/PRO scores and save rules. Amber Premium treatment only for Premium sections. |
| Steam Achievements | `achievements` | Platform overlay with base/add-on grouping and source-backed conditions; do not call its count native Gummiphone completion. |
| Search / Progress & Backups | Existing `search` / `progress` routes | App utilities integrated into KH3 chrome, canonical entry links, preserved export/import/recovery and storage-status controls. |

### Detail information order

Selected item identity and its scope remain visible. The first note page answers the immediate player question: **where / how / requirement**. Subsequent numbered pages may contain route details, prerequisites, rewards, variants, uncertainty and sources. Link directly to material, enemy, recipe, world or acquisition target while retaining return context. Do not replace concrete guidance with a visual-only native replica.

On a desktop treasure grid, selecting changes the reward strip; opening Notes shows the full acquisition instructions in the same stable frame. Checking is a separate one-action control and never secretly follows from selection. Narrow screens may use World / Collection / Notes modes with explicit labeled controls and Back; those modes are web adaptations.

## 5. Truthful completion and inventory

Current content: **1,954 entries and 286 recipe actions**. The data is substantive; the redesign is not an excuse to recreate blank native menus. See [`src/games/kh3.ts`](../../src/games/kh3.ts), [`content.json`](../../src/games/kh3/content.json) and [the current research assessment](../games/kh3/README.md).

| Meaning | Required treatment |
|---|---|
| Base treasures | 245, independent of 90 emblems and the nine Re Mind chests |
| World physical progress | Category counts first; preserve explicit membership. Current generic `collectible:true` includes 245 chests, 90 emblems and five Herc figures; it does not establish an official native world percentage. |
| Re Mind / Slider | Nine Re Mind chests and ten Slider prizes have separate denominators and identities |
| Classic Kingdom | 23 acquisitions = five standalone unlock entries plus eighteen existing chest aliases; 23 score records are independent |
| Secret Reports | Thirteen report aliases on Battlegates 1–13; do not create duplicate physical checks |
| Crafted history | Historical made-once state is independent of owned stock, target quantities and recipe unlock conditions |
| Cuisine | Recipe preparation, Excellent result and consumable dish ownership are distinct |
| Equipment references | Temporary party/other-platform facts must not imply attainable Steam checklist goals |
| Native-looking seal | Only represent a defined, verified app scope. Do not imply all native narrative/record conditions are satisfied merely because the visible checklist is checked. |
| Unread marker | Separate from completion/focus. The app currently has no unread model; omit rather than add decorative orange `!` marks. |
| Missing / unknown | Missing media, unentered stock and uncollected item are different states. Never use one gray placeholder to mean all three. |

**Linked-state implementation gap:** current synthesis recipe checks and `synthesis-history` entries use different IDs and are not synchronized. Before implementing a unified made-once mark, create an explicit relationship/migration policy with conflict handling and tests. Preserve existing saved answers; do not silently OR, overwrite or discard conflicting values during a cosmetic refactor.

**Inventory precedence correction:** older KH3 prose says opt-in inventory. The later [shared synthesis contract](../content/synthesis-and-inventory.md) explicitly supersedes that: inventory controls are always available, with blank = unknown and zero = confirmed zero. Show actual owned/required, including surplus. Farm targets aggregate direct ingredients additively; stock counts once. Removing a target preserves stock. Historical crafted checks do not consume anything. Cuisine remains its own system; forging needs its own verified ladder, including new Ultima at level 10 versus NG+ Ultima starting at level 0.

No story-progress tracker, Available Now filter, spoiler concealment, automatic save reading, invented playtime, game currency, character level, best score or aggregate “official 100%” should be added. Existing score-threshold guides are not the player's actual recorded scores. Keep thresholds and manually achieved goals visibly distinct from native numeric-stat screenshots.

## 6. Shared behavior without a shared book

The accepted lessons from [KH1](kh1fm-new-ui-plan.md), [KH2](kh2fm-new-ui-plan.md) and [DDD](dddhd-new-ui-plan.md) concern behavior. They do not authorize rings, paper, magenta Reports plaques, Sora/Riku tabs or a compulsory two-leaf metaphor in KH3.

- **Stable stage:** available viewport owns the frame; home/list/notes/workshop/search/settings must not change outside bounds. Decorative rails can collapse on narrow screens. Avoid scaling a whole 1920px screenshot into unreadable controls.
- **Measured capacity:** fit compact rows/tiles to usable height after titles, filters and footer. More height yields more entries, not stretched rows. Recompute after resize/fonts/wrapping; keep selected item visible. A source's eight treasure columns or five photo columns is a landscape reference, not a universal count.
- **Pagination:** native lists visibly scroll, but the established app uses numbered index and continuation pages. Explicitly name List page, Notes page and Previous/Next entry; do not overload one control. When exceptional zoom/text reflow cannot fit, accessible content takes precedence over clipping in the name of fixed stage.
- **Geometry stability:** selected/focused/checked styles never change border allocation, weight, padding or row height. Reserve cursor, status and help space.
- **Navigation:** preserve current route IDs and old saved Resume links. Add canonical selected-entry/world/area/category/filter/page URL state deliberately. Back/Forward and return from an ingredient must restore scope, page, selection and focus. Paging itself must not edit completion.
- **Touch/keyboard:** labels and visible focus; real semantic links/buttons/checkboxes; reliable 44px primary targets at ordinary scale. No hover-only explanation, swipe-only page change, fake controller-only instruction or keyboard trap.
- **Phone:** one usable panel/mode at a time; explicit Index/Notes or World/Board controls; readable text and normal controls. This is a web adaptation, not a discovered native mobile KH3 layout.
- **State feedback:** announce successful checks and storage errors; offer recent-action undo under the existing progress requirement. A Remaining-filter check must retain predictable focus even when its row leaves the visible results.
- **Motion:** a restrained highlight/glow and short transition may be proposed; exact native motion/sound is unverified. Reduced motion uses immediate state changes or restrained fades, without blocking navigation.
- **Persistence/offline:** retain transactional IndexedDB writes, cross-tab refresh, blank/zero distinction, validated import/export, pre-import recovery, update/installation messages and real cold-offline resume. A theme refactor cannot clear saved progress or cache-dependent facts.
- **Data Jiminy:** retain existing feature boundary and under-construction/empty-pack truth. No reseeding or fabricated working answers. Place functional app utilities without obscuring the footer, checks or safe areas; do not mistake decorative Jiminy art for a working chat control.

## 7. Engineering seam and later acceptance

Current KH3 falls through to the generic `GuideJournal` dashboard. It has no dedicated KH3 renderer, no measured paging and no selected-entry URL handling. That is the primary presentation gap. The module's 44 categories already exist; a new screen map must keep their content reachable.

Use a future dedicated `Kh3Journal` at the existing renderer seam in [`GuideJournal.tsx`](../../src/games/GuideJournal.tsx), keeping profile load/save, quantity validation, import/recovery and stable IDs. Reuse behavior from [`useIndexCapacity.ts`](../../src/journal/useIndexCapacity.ts), [`JournalNotePages.tsx`](../../src/journal/JournalNotePages.tsx) and DDD's route/focus handling where appropriate, not its visual CSS. Raw KH3 records contain richer acquisition/forge/meal/Gummi relationships than the shared [`CollectionEntry` type](../../src/games/types.ts); any adapter must expose these deliberately and retain uncertainties rather than infer missing facts.

The current profile is one game-keyed version-1 record (`checks`, `owned`, `targets`, `route`) in [`profile.ts`](../../src/games/profile.ts). Separate base/DLC IDs are implemented; full save-lineage/multiple-playthrough UI is not. Do not add a pretend profile selector for fidelity.

Later acceptance must cover:

1. Reference comparisons at 1920 × 1080/16:9 and ordinary desktop sizes for root, Treasures, Records, Lucky Emblems and Workshop, with documented asset substitutions.
2. Stable frame/selection and measured capacity at 390 × 844, 360 × 740, tablet, short landscape and browser zoom; real Safari/iPhone/iPad remains separate from Chromium emulation.
3. Treasure selection, notes, checks, world alias, search result and return all address one ID; filters keep full denominators.
4. Classic chest alias versus independent score; report alias; nine DLC chests versus 245 base; Slider prize versus challenge goal; cuisine result versus inventory.
5. Unknown/zero/partial/exact/surplus stock, direct additive targets, no recipe dependency double-counting and no history-driven consumption.
6. Recipe/history relationship and imported conflicting states, if that gap is resolved in the authorized implementation.
7. Back/Forward, deep-link reload, restored query/world/area/category/page/focus, resize during selected detail, missing/invalid entry and keyboard operation.
8. Storage failure rollback/retry, two-tab edits, valid/invalid backup, pre-import recovery, recent-change undo and service-worker cold-offline launch.
9. Long names/notes, missing art/media, insufficient contrast and reduced motion without hidden functionality.
10. No cross-game visual/data regression; no changes to empty Data Jiminy; no merge or deployment without authorization.

Current tests such as [`kh3-content.test.ts`](../../tests/kh3-content.test.ts), [`kh3-practical-review.test.ts`](../../tests/kh3-practical-review.test.ts) and [`kh3-value-reaudit.test.ts`](../../tests/kh3-value-reaudit.test.ts) establish useful data fixtures, not KH3-native layout acceptance. Adapt the dedicated DDD layout/history regression approach and add KH3-specific cases.

## 8. Video research and remaining capture brief

### Videos found, not visually certified

- [Kingdom Hearts 3 — All Gummiphone Entries](https://www.youtube.com/watch?v=u_xyQJ83cO4)
- [Gummiphone tutorial lead](https://www.youtube.com/watch?v=Vm8iz6uuP7s)
- [Adversaries showcase lead](https://www.youtube.com/watch?v=rFClZ4o-a5w)

The cloud browser encountered an unusual-traffic/reCAPTCHA challenge. Playback was not inspected; no menu order, transition, animation, sound or timestamp was inferred from a title/thumbnail. These are useful candidates to inspect later, not completed visual evidence. No production screenshot extraction is requested.

### Prioritized missing evidence

| Priority | Capture needed | What it must settle | Current safe handling |
|---|---|---|---|
| P1 | Continuous Gummiphone root → Treasures → several worlds/chests → Back, including missing/found/complete states | Entry transition, focus ownership, world grouping/scrolling, missing chest label and exact completion state | Use U04 composition; app paging/notes explicitly adapted |
| P1 | Lucky Emblems incomplete world index and partial photo board → selected photo → Back | Empty slots, numbering, undiscovered photo handling, completion pips/seals and focus return | Use gold shell; numbered text-first app tiles, no invented native empty-photo state |
| P1 | Gummiphone Synthesis history list and item detail beside actual Workshop history marks | Native history layout and links/markers; separate made-once record from active crafting | Maintain distinction and show existing states honestly |
| P1 | Adversaries group/index and two contrasting entry details | Correct family, grouping, portrait/model/details and selection rhythm | Exact skin unresolved; useful data stays accessible |
| P1 | Separate captures: released English/Steam player pause menu; Moogle Shop → Workshop → Forge/Photo Missions/Collector Goals | Native system hierarchy, confirm/back prompts, forge and mission detail panels | Green Workshop hub/list are verified; secondary details remain explicit adaptations |
| P2 | Recipe Collection, ingredient list, Little Chef recipe/preparation/result and Cuisine menu | Which distinct layouts map to record versus cooking versus consuming; normal/Excellent display | Separate systems/data; do not extrapolate from Synthesis |
| P2 | Gummi zone/menu → Missions/Treasures/Blueprints/Parts and rank-result screen | Route hierarchy, scope, world versus zone language, exact list/detail and completion states | Companion groups with truthful units; no fake interactive map/editor |
| P2 | Released EZ/PRO list, merits, PRO rank/history, and Re Mind treasure view | Final labels/colors; native versus platform achievements; DLC mode indicators | Official amber Premium reference is provisional and isolated |
| P2 | Secret Report reader and Classic Kingdom acquired/unacquired/unplayed/played states | Reading treatment, per-game score distinction and catalogue state marks | Current data and accessible text; do not infer completion from acquisition |
| P3 | Short high-quality menu-motion clip, keyboard/mouse and controller captures | Cursor pulse, crossfade/slide, easing, audio, wrap behavior, input-specific prompts | Optional polish; avoid claims of native timing and offer reduced motion |

The supplied images plus inspected public stills are enough to define a substantial, faithful screen-family specification and begin an authorized layout prototype. They are **not enough to certify near-parity interactions or every secondary subsystem**. Missing evidence is a focused fidelity backlog, not permission to defer useful existing functionality. No user playthrough is required; a public menu tour or targeted captures can satisfy it.

## 9. Scope and verification of this research checkpoint

This pass changes documentation only. It does not alter source code, data, profile schemas, assets, content facts or runtime behavior. Repository-relative links and the JSON evidence ledger are checked; application tests/build are not rerun for a documentation-only diff. The report intentionally separates observed pixels, corroborating text, proposed app adaptations and unresolved evidence.

The current KH3 gameplay research assessment remains **20 resolved / 13 deferred / 2 open**. Older lower sections of historical KH3 documents retain earlier counts/conflicts; they are not revived as UI blockers. This interface research is a different evidence question and leaves all gameplay-research decisions intact.
