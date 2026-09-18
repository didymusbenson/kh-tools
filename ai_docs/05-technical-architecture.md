# Technical Architecture

## Confirmed direction

- React
- Progressive Web App
- Mobile-first responsive interface
- Offline availability for core reference content
- MVP bundled SLM and per-game Coppermind Q&A grounded in stored guide data
- Media-ready records and layouts, with production screenshots deferred beyond MVP

## Candidate implementation choices

These remain proposals until recorded in the decision log:

- TypeScript
- Vite-based application
- React Router or an equivalent route layer
- Structured local content stored as JSON, Markdown/MDX, or generated artifacts
- A service-worker toolchain such as Workbox through the selected build integration
- Automated unit, component, end-to-end, accessibility, content-schema, and PWA checks

## Architectural priorities

- Separate source content and domain data from UI components.
- Keep content migration testable.
- Use stable content identifiers and routes.
- Avoid requiring a backend for read-only core functionality.
- Make static hosting straightforward.
- Ensure deploys cannot leave incompatible cached code and data active together.
- Let approved screenshots and maps be added later without changing core record identity.
- Keep text instructions complete when media is absent.

## Proposed application layers

- Presentation and responsive components
- Routing and navigation
- Search and filtering
- Domain/content model
- Media manifest, relationships, and responsive asset delivery
- Local persistence
- PWA installation, caching, and updates
- Build-time content and asset validation

## Data model

Shared records should support optional media relationships by stable asset ID. Media metadata, annotations, provenance, rights state, edition applicability, accessibility text, and offline priority remain separate from the underlying guide record.

See [Screenshot, Map, and Visual Location Support](./content/screenshot-and-map-support.md).

## Media delivery constraints

- Do not ship production images without an approved source and rights status.
- Generate responsive variants rather than serving full-size captures everywhere.
- Reserve layout space only when an asset exists.
- Store annotation overlays separately from source pixels.
- Version media manifests and cached binaries deliberately.
- Allow multiple platform/edition images without duplicating the guide record.
- Production builds should reject missing assets, missing required alt text, and unapproved rights states.

## Hosting and deployment

- TBD

## Testing strategy

- Unit tests for domain logic and media selection
- Schema validation for guide records, asset manifests, annotations, and provenance
- Component tests for entries with zero, one, and multiple images
- Accessibility tests for captions, alt text, enlarged views, and annotated-map equivalents
- End-to-end tests for offline text with cached and uncached optional media
- Production-fixture separation so synthetic test images never become guide content
- PWA update and cache-version compatibility tests
- Additional strategy TBD

## Migration approach

- Migrate facts independently from screenshots.
- Do not preserve legacy embedded image paths without verification.
- Add approved media later through stable record relationships.
- TBD

## Open technical decisions

- Framework/build stack
- Content authoring format
- Search implementation
- Hosting target
- Image transformation/build pipeline
- Annotation format and authoring tool
- Analytics and privacy posture
- Whether any user state requires cloud synchronization

## Persistent checklist requirement

Every shipped game must implement [Persistent Checklists and Player Progress](./content/persistent-checklists-and-progress.md) for MVP. Persist changes offline, separate user progress from content/media caches, use stable record IDs, and preserve progress during updates and migrations. Local-first storage with IndexedDB and JSON export/import are proposed implementation choices; account/cloud sync remains undecided. Test restart persistence, character/game isolation, storage failure, content migrations, multi-tab changes, and recovery.

## MVP requirement: per-game Coppermind with a bundled SLM

User-facing identity: **Data Jiminy**, represented by Jiminy Cricket. [Data Jiminy specifications](./data-jiminy.md) define the accepted offline behavior, initial AI disclaimer, and model evaluation requirements.

Confirmed MVP requirement: bundle a small language model (SLM) with Ars Arcanum so players can ask natural-language questions and receive answers grounded in the guide data we store for the selected game.

- Treat each game's Coppermind as a game-scoped knowledge assistant; shared inference infrastructure is possible, and separate model weights per game are not assumed.
- Preserve edition, character, world, and DLC applicability when retrieving facts. Do not mix facts across games or incompatible editions.
- Return links to the underlying guide entries and their provenance. If stored data does not answer a question, say so rather than inventing a guide fact.
- Keep canonical structured content independent of the model. Use local retrieval over versioned game data; the browser storage/search implementation remains to be chosen.
- Keep normal browsing, search, and persistent checklists usable without the model. Do not make automatic checklist changes through chat; any separately approved progress-aware actions need explicit user confirmation.
- Provide on-device inference and offline Q&A once the required model and game data are downloaded. Validate and define the supported device matrix before release.
- Manage model/runtime downloads within the app with no user model selection or configuration. Final packaging and initial download flow remain implementation decisions.
- Measure mobile memory, download/storage size, startup time, response latency, battery impact, runtime/browser support, and model licensing before choosing a model or runtime.
- Version the model, retrieval index, and guide dataset compatibly; keep downloads and model-cache cleanup separate from player progress.
- Require no login, API keys, external connections, or separately installed services for chat. Run embedding, retrieval, and answer generation locally; no hosted inference fallback is part of the accepted design.
- Test factual grounding, citations, missing-data responses, game/edition isolation, offline behavior, unsupported devices, and content/index updates before release.

Related project: [WintersRain/coppermind](https://github.com/WintersRain/coppermind), identified by the user as a collaboration. Inspect its architecture and license before deciding whether to reuse code, integrate it, or borrow its approach. No integration or model selection has been committed to.

## First-class synthesis and validation policy

Implement [synthesis/inventory](./content/synthesis-and-inventory.md) as deterministic domain logic shared by UI and Data Jiminy. Optional owned-stock counters and historical crafted checks are separate state; multi-recipe calculations allocate stock once. Validate game-specific formulas and conflict status with independent fixtures.

Follow [testing/content validation](./testing-and-content-validation.md): Apple browser, iPhone and iPad initial app smoke/acceptance, Android follow-up. No mandatory user gameplay test. Do not implement spoiler concealment or a manual progress-gate/Available Now system.
