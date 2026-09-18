# Decision Log

Record decisions that should survive individual planning conversations. Each entry should include the problem, decision, rationale, alternatives, and consequences.

## Decision template

### DEC-XXX: Title

- **Status:** Proposed | Accepted | Superseded
- **Date:** YYYY-MM-DD
- **Problem:** TBD
- **Decision:** TBD
- **Rationale:** TBD
- **Alternatives considered:** TBD
- **Consequences:** TBD
- **Supersedes / superseded by:** None

---

## DEC-001: Deliver as a React Progressive Web App

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** KH Tools needs a more maintainable, mobile-friendly delivery model that can work across common platforms and remain available offline.
- **Decision:** Rebuild the experience as a mobile-first React Progressive Web App.
- **Rationale:** A PWA provides broad reach, rapid web delivery, installability, and offline capabilities without requiring native app-store distribution for the initial product.
- **Alternatives considered:** Flutter; React Native with Expo; continued static HTML.
- **Consequences:** The project must define service-worker caching, installability, responsive behavior, browser compatibility, and update safety. Platform-native APIs and app-store presence are not initial assumptions.
- **Supersedes / superseded by:** None

## DEC-002: Name the project Ars Arcanum

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** The rebuilt product needs an identity distinct from the legacy KH Tools implementation.
- **Decision:** Name the product Ars Arcanum.
- **Rationale:** The name is recognizable within Kingdom Hearts, supports a magical compendium identity, and separates the new product from the old technical implementation.
- **Alternatives considered:** Continue using KH Tools.
- **Consequences:** Product copy, metadata, manifests, icons, repository documentation, and later deployment naming must be updated deliberately. The repository itself remains `kh-tools` unless separately renamed.
- **Supersedes / superseded by:** None

## DEC-003: Use a Jiminy's Journal interface metaphor

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** The original project directly mimicked KH1 home and pause menus, but the expanded cross-game guide needs a cohesive identity that supports dense reference material.
- **Decision:** Retain the fly-in home-menu concept for game selection, then present game content as Ars Arcanum's interpretation of Jiminy's Journal rather than recreating in-game pause menus.
- **Rationale:** A journal naturally accommodates entries, indexes, checklists, cross-references, sources, and completion tracking while allowing per-game visual variation.
- **Alternatives considered:** Continue mimicking KH1 menus; recreate each game's own pause menu; use a neutral documentation UI.
- **Consequences:** The design system needs a shared journal shell, per-game theme tokens, accessible motion alternatives, and purpose-built layouts for dense tools. It must avoid becoming a literal book simulation that obstructs navigation.
- **Supersedes / superseded by:** None

## DEC-004: Model games separately from release collections

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** Kingdom Hearts releases frequently bundle several games or media works under collection names, which can blur guide ownership.
- **Decision:** Canonical games and experiences own their specifications and completion data. Release collections are grouping and platform metadata, not standalone game guides by default.
- **Rationale:** This prevents duplicated data and keeps 0.2, DDD HD, and similar experiences attached to the correct gameplay model.
- **Alternatives considered:** Create a complete guide specification for every retail collection.
- **Consequences:** The data model must represent collection membership and platform releases while routing users to component guides.
- **Supersedes / superseded by:** None

## DEC-005: Design for screenshots but defer production media

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** Location screenshots and maps will materially improve future guides, but Ars Arcanum should reach MVP without delaying for a media library or adding unowned images.
- **Decision:** Include optional screenshot, map, annotation, accessibility, provenance, rights, and offline fields in the architecture from the start. Test media-capable UI with synthetic or project-owned fixtures, while shipping no production screenshot unless an approved asset already exists.
- **Rationale:** This prevents costly schema and layout retrofits while keeping MVP text-first and avoiding rights problems.
- **Alternatives considered:** Ignore media until after MVP; require screenshots for MVP; display empty placeholders.
- **Consequences:** Records and components must render cleanly with zero media. Production builds validate rights state and accessibility metadata. Media caching and bulk visual downloads remain post-MVP work.
- **Supersedes / superseded by:** None
