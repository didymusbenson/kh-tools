# Jiminy's Journal Design Direction

## Status

Accepted product direction. Detailed visual design remains in discovery.

## Product identity

The project is named **Ars Arcanum**.

Ars Arcanum is presented as a comprehensive, living interpretation of Jiminy's Journal: a record of worlds visited, people and enemies encountered, treasures found, systems mastered, and completion still outstanding.

The interface should feel native to the Kingdom Hearts universe without directly reproducing any one game's copyrighted menu layout.

## Relationship to the original project

The original KH Tools site mimicked the KH1 home and pause menus. That concept established a useful sense of place and a memorable game-selection interaction.

The redesign keeps:

- An anchored game-selection menu with large game-specific artwork that flies in when the highlighted game changes
- A sense that each game is a distinct destination
- Strong motion and visual identity at the top level
- Immediate recognition for Kingdom Hearts players

The redesign changes:

- Game interiors no longer mimic pause menus.
- The persistent application metaphor becomes Jiminy's Journal.
- Reference material is organized as journal sections, indexes, entries, checklists, and linked discoveries.
- Each game's personality appears through its journal theme rather than an isolated menu recreation.

## Experience model

### The cover

The application entry establishes Ars Arcanum and presents an anchored game list with a prominent artwork stage. A cover/title-page treatment is a proposal, not a requirement to make every game a physical book.

### Main menu with flying artwork

Accepted clarification, 2026-09-18: the artwork flies in; game choices remain anchored. Preserve the original main-menu composition: branding and a compact readable game list on the left, with substantial game-specific illustration space alongside. Highlighting a game changes its artwork with a short entrance/exit transition. This is not a carousel of flying game cards.

The original home screen was inspected in-browser. Hovering KH:FM displays the large Sora-and-flag illustration; switching the highlighted game triggers artwork slide-in/slide-out styling while menu entries remain in their list. Pointer/selection feedback belongs to the menu; cinematic motion belongs to the illustration.

Keyboard focus must provide the corresponding artwork preview. Touch behavior must provide explicit, readable selection/entry without requiring hover; exact tap-to-preview versus direct-entry treatment remains a design proposal to evaluate. Reduced motion keeps the composition and usable game list with immediate artwork replacement or a restrained fade. Missing artwork never removes a game choice.

Requirements:

- Works with touch, pointer, keyboard, and screen reader navigation
- Has an equivalent reduced-motion transition
- Does not delay direct access through deep links
- Remembers the most recently opened game without trapping the user there
- Clearly distinguishes games, collections, and subentries

### Game journal

Selecting a game opens its journal. Shared structural sections may include:

- Contents
- Worlds and collectible locations
- Collections
- Treasures
- Character context where useful for acquisition
- Adversaries
- Synthesis or crafting
- Equipment and abilities
- Minigames and challenges
- Reports and records
- Completion summary

Section names and availability must adapt to the game's actual terminology.

### Navigation copy and page headers

Accepted human feedback, 2026-09-20: game-journal navigation pages should lead with their navigation and useful content. Remove SaaS-style marketing preambles, promotional titles, redundant subtitles, and decorative copy. Use at most a compact page title with useful statistics where appropriate. Captions must be descriptive or necessary; functional instructions and meaningful content remain.

This supersedes any earlier interpretation of the journal metaphor that adds promotional page headers, chapter slogans, or introductory marketing copy to navigation pages. Visual identity belongs in the journal design and content, without requiring an advertising-style introduction to each section.

Apply the change to KH1 Final Mix first, then reuse the pattern for other games. The existing main game-selection menu is explicitly unchanged by this feedback. See the [human feedback record](../implementation/human-feedback.md) for scope and acceptance checks.

### Entry pages

Accepted human feedback, 2026-09-20: collectible category views such as Trinities use single-column item rows with inline expandable details and category-level expand/collapse controls. Do not require another nested item page beyond the category. This supersedes earlier standalone-entry-page guidance for the collectible browsing flow; the information contract below still applies to the expanded item. Other reference flows are not automatically removed by this clarification.

Retain two backup designs if human review rejects inline expansion: an individual compact detail-card modal, or a category detail page/table containing all relevant items for the world/category. These alternatives are recorded, not requested as simultaneous implementations. See [human feedback](../implementation/human-feedback.md#saved-backup-alternatives).

An entry should behave like an annotated journal page:

- Canonical title
- Completion state
- Illustration or icon where rights and assets permit
- Concise answer first
- Acquisition/location details
- Prerequisites
- Related entries
- Sources and verification status
- Notes and strategy
- Edition differences

Dense tools such as command melding and Spirit recipes may open as purpose-built journal inserts rather than forcing every interaction into literal page decoration.

## Shared visual language

Potential motifs:

- Bound-book structure
- Page tabs and index markers
- Handwritten annotations used sparingly
- Stamps, seals, bookmarks, marginalia, and completion marks
- Constellation or heart-path connective lines
- Ink, parchment, leather, cloth, and luminous magical accents
- Jiminy-style cataloguing and cross-references

The UI should not rely on fake parchment texture behind every dense table. Long reference views need quiet, high-contrast reading surfaces.

## Per-game theming

Every game receives theme tokens layered onto the shared journal shell:

- Cover treatment
- Accent palette
- Display typography
- Page ornament
- Icon family
- Transition treatment
- Section-divider motif
- Optional ambient texture

Theme differences must not change fundamental navigation, accessibility, or data meaning. They may change layout composition: a physical journal for KH1–2/BBS and a digital tile menu for KH3. Shared shell means shared behavior, not mandatory binder decoration.

## Interaction principles

- The journal metaphor organizes information; it must not conceal it.
- Search remains globally available.
- Users can jump directly to an entry from a URL.
- Back behavior follows browser expectations.
- Checklist actions are quick and reversible.
- Related content uses visible cross-references.
- The current game and edition are always evident.
- Decorative animation never blocks content.
- Offline state feels like an available saved journal, not an error page.

## Accessibility constraints

- Provide a complete reduced-motion mode for fly-in and page-turn effects.
- Never require page-turn gestures.
- Decorative handwriting must not be used for long body text.
- Page tabs and icons require text labels.
- Completion marks require text/status semantics.
- Maintain accessible contrast independently of parchment or texture.
- Preserve browser zoom and text reflow.
- Do not use sound as the only feedback mechanism.

## Open design questions

- How should the anchored game list and artwork stage adapt to narrow phones? The artwork-transition main-menu direction is settled; a flying game-card carousel is not the brief.
- Is each game one volume or one major tab inside a shared volume?
- How should the 1.5, 2.5, 2.8, and Integrum collection layers appear without confusing them with games?
- How literal should page turns be on phones?
- Does progress appear as inked checkmarks, stamps, filled emblems, or another motif?
- Which visual assets can be used safely and consistently?

## Accepted screenshot-led theme direction

The user supplied six journal screenshots on 2026-09-18. These are design references, not production guide media. The rendered attachments were visually reviewed; no screenshot binaries were imported into the repository.

| Game | Accepted direction | Reference-derived cues |
|---|---|---|
| KH1 and KH2 | Green Jiminy's Journal | Green frame, pale cream/lime pages, binder rings, burgundy tabs; purple contents panels |
| Birth by Sleep | Blue Reports journal | Cobalt/cyan frame, navy contents, blue-violet lists, icy-blue detail pages, aligned completion badges |
| KH3 | Digital, menu-like journal | Dark star field, blue/violet category tiles, white icons, cyan selection, contextual side panel |
| DDD | Await further inspiration | Earlier palette is a proposal only |
| 0.2 | BBS family; exact variation pending | Do not assume a confirmed 0.2-specific theme from BBS screenshots |

The user explicitly chose the green family for both KH1 and KH2. This is a design assignment, not a claim that every supplied green screenshot depicts KH1.

### Reference inventory

References are identified by attachment order and original filename so later inspiration can be compared without guessing game/edition provenance.

| Ref | Attachment filename | Visible composition | Design lesson |
|---|---|---|---|
| R1 | 4e4f7343-6d91-4fc8-a864-1346bd0adecb.png | Green Collection cover; Jiminy left, purple category list right | Distinguish contents surfaces from reading pages |
| R2 | 20e656d7-4556-49d5-af18-b45863fbe0b1.png | Green Character Files detail; pale lined page, binding and red tabs | Strong page hierarchy and contextual section labels |
| R3 | cefb5484-de2c-4e34-a507-5835e0e460b8.png | Green Beast's Castle character grid | Visual indexes with selected-entry labels |
| R4 | 345d3bec-7beb-4314-8624-8c848d8e10b3.png | Blue Reports contents with Aqua portrait | Character identity, compact section list, row-end progress marks |
| R5 | 79b376c0-c493-44ea-8128-4f9676883ce6.png | Blue Sticker Album reward table | Point summary, readable thresholds, repeated completion indicators |
| R6 | 0ac48c9d-3732-4ea1-a0e0-0e83bf9c63bf.png | Dark Gummiphone category tiles and context panel | Digital journal variant, icon-plus-label navigation, selected-state contrast |

### Adaptation requirements

- Preserve visual hierarchy and each theme's character without tracing the console layout pixel-for-pixel.
- Do not require a mouse-hover help bar: supporting descriptions must also work with touch and keyboard focus.
- Selection, newly available content, and completion are separate states with text/semantic equivalents.
- Use a single readable page on narrow screens; binding and margins become compact decoration.
- KH3 category tiles reflow rather than becoming miniature console tiles.
- Make portraits, background imagery, and large world illustrations optional; text-only MVP must look intentional.
- Do not extract Jiminy renders, portraits, logos, watermark-bearing screenshots, or other artwork into production from these references.
- Exact fonts, colors, ornament, animation timings, and icon designs remain open.
- Future inspiration refines these directions; record which decisions it changes.

## Original KHFM browser exploration

Inspected [original home](https://didymusbenson.github.io/kh-tools/) and [KHFM](https://didymusbenson.github.io/kh-tools/games/khfm.html) on 2026-09-18. This was a desktop browser interaction review, not a mobile acceptance test.

The original KHFM interior uses a dark pause-menu-inspired shell, category buttons, and hash-addressed table overlays with a close control, scrollable rows and contextual notes beneath. Explored Synthesis Sets (set/product/ingredients), Synthesis Items (material/total/source/world/strategy), Dalmatians (group/ability/world/location and reward notes) and Trinities (color/world/location/prize and unlock notes).

Retain the direct-reference intent and useful relationship between recipes, material sources and practical directions. The separate legacy recipe/material overlays suggest a stronger linked synthesis workspace in Ars Arcanum. These are interaction lessons, not a requirement to preserve modal tables, dark pause-menu colors or fixed-width desktop layout. New game interiors use the accepted per-game journal themes and persistent checklists. Legacy displayed quantities remain unverified source evidence.

## Data Jiminy placement — accepted

Inside every selected game, anchor Jiminy at the bottom right with a small visible “…” chat bubble that opens the game-scoped Data Jiminy interface. Preserve this location across green journals, blue Reports and KH3's digital treatment. The main game-selection screen has no unscoped Jiminy launcher.

The interface clearly labels its game and keeps the same concise factual behavior. One shared model serves separate game sessions. Adapt panel/sheet layout to phone, tablet and desktop, with safe-area/keyboard spacing and no obscured checklist or synthesis controls. See [Data Jiminy](../data-jiminy.md) for behavior, accessibility and disclaimer requirements.

## Supplied Data Jiminy character artwork

The user supplied `6a6444f0-2e49-4a3e-9cd2-13b0af30b59d.png`: a transparent 408 × 608 PNG of Jiminy with umbrella and raised finger. Use it as the launcher artwork reference across journals. Preserve proportions and keep the “…” bubble a separate accessible button, provisionally above/beside the raised finger. Test the silhouette and control spacing at actual phone/tablet sizes. The [Data Jiminy asset record](../data-jiminy.md#user-supplied-jiminy-asset) identifies the original attachment and checked-in PNG. The original bytes and transparency are preserved.

The compact Jiminy face supplied subsequently is the chat icon: [data-jiminy-chat-icon.png](../../assets/data-jiminy/data-jiminy-chat-icon.png), 512 × 512 with transparency. The [full-body original](../../assets/data-jiminy/data-jiminy-full.png) is also checked in. Use the compact icon for chat/avatar presentation while preserving the bottom-right Jiminy and accessible “…” interaction.

## KHFM navigation revision — September 20, 2026

Primary destinations now follow the collectible/activity type: Worlds, Synthesis Workshop, Bestiary, Treasures, Trinities, Dalmatians, Magic Upgrades, Torn Pages, Ansem Reports, Challenges and Minigames, Steam Achievements. Worlds replaces Contents and offers factual world overviews with filtered shortcuts into the type catalogues. Catalogues group full-width inline entries by world. Reference library and Progress & backups remain secondary links. See the durable human-feedback file for accepted scope and pending human review.
