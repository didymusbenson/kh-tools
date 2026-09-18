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
- **Decision:** Retain the anchored home-menu game list and fly-in game-specific artwork, then present game content as Ars Arcanum's interpretation of Jiminy's Journal rather than recreating in-game pause menus.
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
- **Consequences:** Records and components must render cleanly with zero media. Production builds validate rights state and accessibility metadata. Media-support design and testing remain MVP. Only production visual assets awaiting acquisition are explicitly deferred; no blanket deferral of media functionality is implied (clarified by DEC-008).
- **Supersedes / superseded by:** None

## DEC-006: Use game-specific journal presentations

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** A single physical-book skin would miss the distinct journal identities shown in the user's references.
- **Decision:** KH1–2 use green journal theming; BBS uses blue Reports theming; KH3 uses a dark, menu-like digital journal. Preserve the anchored game menu with fly-in artwork and shared navigation semantics.
- **Rationale:** The user selected these directions from supplied journal screenshots.
- **Alternatives considered:** Earlier speculative game palettes; one literal book treatment for all games.
- **Consequences:** Theme support must cover layout variants as well as color tokens. DDD and a distinct 0.2 treatment await further inspiration. Reference images are not production screenshot assets; text-first MVP remains unchanged.
- **Supersedes / superseded by:** Replaces earlier speculative KH1/KH2/KH3 palette proposals and refines DEC-003; does not replace the journal concept.

## DEC-007: Persistent checklists for every game

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** Players need to track completion across sessions without losing their place.
- **Decision:** Every game has checkable completion items with automatically saved state, offline persistence, Remaining filters, progress counts, and resume context in MVP.
- **Rationale:** Explicit user requirement that players can check things off as they go and return reliably.
- **Consequences:** Stable identifiers, game/character scope, migrations, failure handling, and accessible completion controls are required. Local-first storage and export/import are proposed safeguards; cloud sync is not implied.
- **Alternatives considered:** Session-only checklists; reference-only guides.
- **Supersedes / superseded by:** Makes persistent checklist behavior mandatory rather than a generic future planning item.

## DEC-008: MVP by default; Coppermind included

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** “Later” was incorrectly interpreted as permission to defer the SLM/Coppermind feature beyond MVP.
- **Decision:** All user-requested features and specified games are MVP scope unless the user explicitly defers them. “Later” in a planning conversation is not a release deferral. The only current explicit exception is production screenshots/visual assets that still need to be obtained; media-support design and testing remain MVP. Unresolved implementation choices require planning, not automatic deferral. This does not add unrequested features or authorize implementation while discovery is ongoing.
- **Rationale:** The user explicitly clarified that later refers to their planning sequence, not the project's release scope.
- **Consequences:** Bundled SLM and per-game, data-grounded Coppermind Q&A are required for MVP. Model/runtime selection, packaging, offline compatibility, and integration with WintersRain/coppermind remain engineering decisions to resolve for MVP. Escalate feasibility constraints rather than silently moving requirements to another release.
- **Alternatives considered:** Automatically classifying unimplemented or technically unresolved requirements as future features; rejected.
- **Supersedes / superseded by:** Supersedes prior outside-MVP Coppermind wording and any unapproved release deferrals; clarifies DEC-005 without removing the production screenshot asset exception.

## DEC-009: Data Jiminy identity and offline AI disclosure

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** The MVP assistant needs a settled user-facing identity and a clear, prominent AI disclaimer.
- **Decision:** Represent the chatbot as Jiminy Cricket and name him **Data Jiminy**. Preserve the user's initial disclaimer verbatim in [data-jiminy.md](./data-jiminy.md), with final technical wording reviewed during implementation. Chat runs locally after setup without user credentials, external account connections, or model configuration.
- **Rationale:** Explicit user direction; integrates conversational help with the journal presentation.
- **Consequences:** Bundled embedding and conversational models support game-scoped browser-local retrieval. SmolLM2 is the candidate family; exact model/runtime selection remains an implementation decision. Final copy must match actual download, offline, and data-access behavior while retaining the intended playful tone.
- **Alternatives considered:** Generic chatbot branding; user-configured external assistants.
- **Supersedes / superseded by:** Refines DEC-008 and resolves prior uncertainty about hosted inference and user setup; no cloud inference fallback is included.

## DEC-010: Direct Coppermind answers without conversational personality

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** Chatbot framing suggests personality and elaboration that the user does not want.
- **Decision:** Data Jiminy is a natural-language interface to the per-game Copperminds. Return fast, concise, factual answers with compact source links. No roleplay, personality, filler, or unsolicited elaboration. Preserve necessary conditions and ask only essential clarifications.
- **Rationale:** Explicit user direction to prioritize direct answers.
- **Consequences:** Jiminy remains the visual identity; the existing user-authored disclaimer remains intact. Prefer direct structured results and application-controlled retrieval. Standing model instructions support the behavior but do not guarantee output correctness or enforce access controls.
- **Alternatives considered:** General conversational assistant; character-driven chat.
- **Supersedes / superseded by:** Refines DEC-009. Any earlier chatbot/conversational wording describes the input mechanism or model technology, not a personality-driven product experience. See [Data Jiminy](./data-jiminy.md#direct-answer-contract).

## DEC-011: Collectible compendium and world progress

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** Treating every in-game Journal flag as required content expanded the app into a narrative walkthrough and obscured collectible progress.
- **Decision:** Focus on finding and acquiring collectibles and completion items. World percentages count explicitly scoped collectible records, excluding routine story progression, conversations and character-biography updates. Keep necessary acquisition/access conditions. Crafting, equipment, optional challenges, Gummi, records, unlocks and achievements retain distinct goal tracks.
- **Rationale:** The user wants direct “where is this thing?” answers and collection tracking.
- **Alternatives considered:** Recreating every narrative Journal flag; a full sequential story walkthrough.
- **Consequences:** Full narrative Journal manifests are not release blockers. An actual achievement or secret unlock may reference Journal completion accurately without implying that the app's collectible percentage proves it.
- **Supersedes / superseded by:** Supersedes broader planning assumptions requiring exhaustive Chronicles/character-update manifests; refines DEC-003 and DEC-007. Does not defer other accepted MVP features.

## DEC-012: One saved collectible across compact and expanded lists

- **Status:** Accepted
- **Date:** 2026-09-18
- **Problem:** Journal-style compact lists and practical location guides must not create duplicate progress states.
- **Decision:** Group collectible slots by world in a compact index. World details expand those same records into location/acquisition rows. Both surfaces check/uncheck the same stable item ID in both directions. Apply this to every checklist with collection details.
- **Rationale:** Players can match the familiar overview and immediately find the missing item without losing their checks.
- **Alternatives considered:** Independent checks in each presentation; aggregate-only world lists without item mapping.
- **Consequences:** Derived parent summaries, explicit counting units, stable ordering metadata, deduplication, offline persistence and accessible separate open/toggle actions are required. See the [shared contract](./content/collectible-compendium-and-linked-views.md).
- **Supersedes / superseded by:** Refines DEC-007; does not change persistent progress requirements.

## DEC-013: Spoilerful compendium without progress-gate tracking

- **Status:** Accepted
- **Date:** 2026-09-18
- **Decision:** Show content openly with no spoiler warnings, hiding or reveal controls. Omit Available Now filters and manual story/ability milestone tracking. Keep required abilities and access conditions in acquisition guidance.
- **Rationale:** Explicit user direction; the app provides direct reference answers.
- **Consequences:** Remove prior spoiler and optional availability-tracker proposals across all games, search, media and Data Jiminy. World collectible progress remains unaffected by narrative gates.
- **Supersedes:** Prior unresolved spoiler/Available Now questions and proposed hidden-media behavior.

## DEC-014: Steam context and Apple-first app acceptance

- **Status:** Accepted
- **Date:** 2026-09-18
- **Decision:** User plays Steam. Initial app smoke and acceptance use Apple browser, iPhone and iPad; Android is a follow-up test target. Validate app functionality without requiring user gameplay or a completion playthrough.
- **Rationale:** Explicit user testing plan.
- **Consequences:** Record actual device/browser versions during execution. Source reconciliation and structured-data validation still establish content accuracy; they do not depend on the user's game progress. See [testing policy](./testing-and-content-validation.md).
- **Supersedes:** User-device question and mandatory gameplay/modern-save verification gates.

## DEC-015: First-class synthesis with optional inventory

- **Status:** Accepted
- **Date:** 2026-09-18
- **Decision:** Make synthesis a first-class feature. Optional player inventory displays owned/required (x/y) reminders on recipe ingredients and supports accurate remaining-material calculations.
- **Rationale:** The user identifies synthesis as the least enjoyable part of collection and wants strong functional support.
- **Consequences:** Prioritize recipe/source navigation, persistent optional stock, deterministic calculations and independent acceptance fixtures. Keep crafted history separate from current stock and avoid double-allocating inventory. Propagate applicable lessons to KH2/KH3 synthesis, BBS melding and DDD creation without inventing crafting in 0.2. See [shared contract](./content/synthesis-and-inventory.md).
- **Supersedes:** Unresolved KH1 inventory question; strengthens existing crafting MVP priority.

## DEC-016: Main-menu artwork flies in; game choices stay anchored

- **Status:** Accepted
- **Date:** 2026-09-18
- **Decision:** Preserve the original main menu's anchored game list and large game-specific artwork transitions. Highlighted-game artwork flies in/out; the games themselves are not flying cards. The journal UI begins inside the selected game.
- **Rationale:** Explicit user correction, corroborated by browser exploration of the original site.
- **Consequences:** Adapt list/artwork composition to phones/tablets, support keyboard/touch and reduced motion, and keep direct game access independent of art loading. Preserve the original KHFM tool's direct-reference intent while replacing its pause-menu interior with journal views.
- **Supersedes:** The design document's incorrect “Game choices fly into view” statement and ambiguous fly-in-selector wording. Refines DEC-003/006.
