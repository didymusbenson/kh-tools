# KH Tools Planning Documentation

This directory is the planning workspace for rebuilding KH Tools as a mobile-first React Progressive Web App.

## Current phase

Discovery and specification only. Application implementation should not begin until the requirements, content model, and first release scope are sufficiently understood.

## How to contribute information

Put unstructured notes, links, examples, feature ideas, and source material into [00-planning-inbox.md](./00-planning-inbox.md). Information can be reorganized into the focused documents as decisions become clearer. Preserve the original intent when consolidating notes, and record consequential choices in the decision log.

## Documents

1. [Planning inbox](./00-planning-inbox.md) — raw information and unresolved input
2. [Product vision and scope](./01-product-vision-and-scope.md) — audience, goals, boundaries, and success criteria
3. [Content inventory](./02-content-inventory.md) — existing and proposed guides, tools, and data sources
4. [Information architecture](./03-information-architecture.md) — navigation, taxonomy, search, and content relationships
5. [Mobile UX and accessibility](./04-mobile-ux-and-accessibility.md) — responsive behavior and interaction requirements
6. [Technical architecture](./05-technical-architecture.md) — proposed React application structure and engineering constraints
7. [Offline PWA strategy](./06-offline-pwa-strategy.md) — installation, caching, updates, and offline guarantees
8. [Decision log](./07-decision-log.md) — durable architectural and product decisions
9. [Roadmap and backlog](./08-roadmap-and-backlog.md) — phased delivery plan and outstanding work

## Working principles

- Mobile-first, but fully usable on larger screens.
- Core reference material should remain usable offline after initial installation.
- Content should be structured data where practical, rather than embedded in presentation markup.
- Search and quick answers are first-class experiences.
- Existing useful content should be inventoried before it is migrated or replaced.
- Proposals are not decisions until they appear in the decision log.
