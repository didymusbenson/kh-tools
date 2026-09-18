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

The application entry should read as the cover or title page of Ars Arcanum. It establishes the project identity and leads into game selection.

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

Theme differences must not change fundamental navigation, accessibility, or data meaning.

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
