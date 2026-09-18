# Ars Arcanum Planning Documentation

This directory is the planning workspace for rebuilding KH Tools as **Ars Arcanum**, a mobile-first React Progressive Web App presented as a comprehensive interpretation of Jiminy's Journal.

## Current phase

Discovery and specification only. Application implementation should not begin until the requirements, content model, and first release scope are sufficiently understood.

## MVP scope rule

All user-requested features and specified games are MVP scope unless the user explicitly defers them. “Later” in a planning conversation is not a release deferral. The only current explicit exception is production screenshots/visual assets that still need to be obtained; media-support design and testing remain MVP. Unresolved implementation choices require planning, not automatic deferral. This does not add unrequested features or authorize implementation while discovery is ongoing.

## How to contribute information

Put unstructured notes, links, examples, feature ideas, and source material into [00-planning-inbox.md](./00-planning-inbox.md). Information can be reorganized into the focused documents as decisions become clearer. Preserve the original intent when consolidating notes, and record consequential choices in the decision log.

## Core planning documents

1. [Planning inbox](./00-planning-inbox.md) — raw information and unresolved input
2. [Product vision and scope](./01-product-vision-and-scope.md) — audience, goals, boundaries, and success criteria
3. [Content inventory](./02-content-inventory.md) — existing and proposed guides, tools, and data sources
4. [Information architecture](./03-information-architecture.md) — navigation, taxonomy, search, and content relationships
5. [Mobile UX and accessibility](./04-mobile-ux-and-accessibility.md) — responsive behavior and interaction requirements
6. [Technical architecture](./05-technical-architecture.md) — proposed React application structure and engineering constraints
7. [Offline PWA strategy](./06-offline-pwa-strategy.md) — installation, caching, updates, and offline guarantees
8. [Decision log](./07-decision-log.md) — durable architectural and product decisions
9. [Roadmap and backlog](./08-roadmap-and-backlog.md) — phased delivery plan and outstanding work

## Readiness

[Per-game readiness workbooks](./readiness/README.md) track what we have, what is missing, user questions, and release gates. Start with the [KH1FM assessment](./readiness/kingdom-hearts-final-mix.md).

## Detailed specifications

- [Data Jiminy: offline AI assistant and disclaimer](./data-jiminy.md)
- [First-class synthesis and optional inventory](./content/synthesis-and-inventory.md)
- [App testing and content validation](./testing-and-content-validation.md)

- [Jiminy's Journal design direction](./ui/jiminys-journal-design-direction.md)
- [Per-game specifications](./games/README.md)
- [Collectible compendium and linked collection views](./content/collectible-compendium-and-linked-views.md)
- [Parallel game research assignments](./research/parallel-game-research.md)
- [Screenshot, map, and visual location support](./content/screenshot-and-map-support.md)
- [KHTABLES Drive source audit](./sources/khtables-drive-audit.md)

## Working principles

- Mobile-first, but fully usable on larger screens.
- Core reference material should remain usable offline after initial installation.
- Content should be structured data where practical, rather than embedded in presentation markup.
- Search and quick answers are first-class experiences.
- The original anchored game menu is retained, with fly-in game artwork beside it; game choices do not fly in.
- Game interiors use a Jiminy's Journal metaphor rather than recreating pause menus.
- Each game has a distinct completion model and visual theme within a shared journal system.
- Shared UI and data primitives should not erase game-specific terminology or workflows.
- Existing useful content should be inventoried before it is migrated or replaced.
- Legacy data is discovery evidence until it has been verified and its reuse rights established.
- Proposals are not decisions until they appear in the decision log.

## Player progress

[Persistent checklists and player progress](./content/persistent-checklists-and-progress.md) is a shared MVP requirement for every game. Checkmarks must survive visits and offline use. Compact world indexes and expanded location rows share the same saved item records. World progress measures collectibles; narrative Journal flags are not collection requirements.
