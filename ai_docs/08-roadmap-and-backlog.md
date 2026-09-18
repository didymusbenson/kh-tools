# Roadmap and Backlog

This roadmap is intentionally phase-based. Dates and detailed estimates should wait until discovery is sufficiently complete.

## Phase 0: Discovery and specification

- Collect raw information in the planning inbox.
- Audit existing repository content and behavior.
- Define audiences, core use cases, and first-release scope.
- Build the content catalog and identify authoritative sources.
- Define navigation, search, and mobile interaction expectations.
- Define screenshot, map, provenance, and rights requirements.
- Resolve foundational architecture and hosting decisions.
- Define offline guarantees.
- Record accepted decisions.

## Phase 1: Technical foundation

- Establish React/PWA shell and routing.
- Implement design tokens and journal shell primitives.
- Define content and media schemas.
- Implement build-time validation.
- Create media-aware entry components that work with no media.
- Add synthetic/test-only image fixtures.
- TBD

## Phase 2: Content model and migration tooling

- Normalize legacy content.
- Track record-level provenance.
- Support optional media references without importing unapproved assets.
- Add annotation schema validation.
- TBD

## Phase 3: First usable guide experience

- Deliver complete text-first workflows for selected MVP game.
- Validate zero-media entry presentation.
- Validate media-capable components with test fixtures.
- Do not source new production screenshots for MVP.
- TBD

## Phase 4: Offline hardening and installability

- Verify core text and search offline.
- Test cached and uncached optional-media states.
- Version media and data caches safely.
- TBD

## Phase 5: Expansion and release

- Expand game coverage.
- Establish approved screenshot-capture and map-production workflow.
- Add production media only when owned or permissioned.
- Consider optional per-game visual-guide downloads.
- TBD

## Backlog

| Item | Phase | Priority | Status | Dependencies | Notes |
|---|---|---|---|---|---|
| Detailed legacy content audit | Discovery | High | In progress | None | Drive audit complete; repository audit remains |
| Define first-release game coverage | Discovery | High | Not started | Information dump | |
| Select React build stack | Discovery | High | Not started | Requirements | |
| Define content schema | Discovery | High | Not started | Content inventory | Include optional media relationships |
| Define media/annotation schema | Discovery | High | Spec drafted | Rights and content model | |
| Build no-media and fixture-media component tests | Foundation | High | Not started | React foundation | |
| Define offline core dataset | Discovery | High | Not started | Release scope | Text first |
| Establish screenshot rights/capture workflow | Expansion | Medium | Deferred | Ownership decision | No new MVP screenshots |
| Define map authoring approach | Expansion | Medium | Deferred | Rights and annotation tooling | |

## Risks and unknowns

- Screenshot and map reuse rights
- Storage cost of offline visual guides
- Canonical capture platform/resolution
- Maintaining annotations when images change
- Ensuring decorative journal treatments do not crowd media or text
