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

- A fly-in home-menu presentation for selecting a game
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

The application entry establishes Ars Arcanum and leads into the retained fly-in game selector. A cover/title-page treatment is a proposal, not a requirement to make every game a physical book.

### Fly-in game selection

Game choices fly into view using a spatial, cinematic transition inspired by the original project's home-menu interaction.

Requirements:

- Works with touch, pointer, keyboard, and screen reader navigation
- Has an equivalent reduced-motion transition
- Does not delay direct access through deep links
- Remembers the most recently opened game without trapping the user there
- Clearly distinguishes games, collections, and subentries

### Game journal

Selecting a game opens its journal. Shared structural sections may include:

- Contents
- Story/world progress
- Collections
- Treasures
- Characters
- Adversaries
- Synthesis or crafting
- Equipment and abilities
- Minigames and challenges
- Reports and records
- Completion summary

Section names and availability must adapt to the game's actual terminology.

### Entry pages

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

- Is the home screen a journal cover, a world-map-like shelf of volumes, or a distinct fly-in carousel?
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
