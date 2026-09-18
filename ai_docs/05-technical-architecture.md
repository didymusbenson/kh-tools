# Technical Architecture

## Confirmed direction

- React
- Progressive Web App
- Mobile-first responsive interface
- Offline availability for core reference content
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
