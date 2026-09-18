# Roadmap and Backlog

This roadmap is intentionally phase-based. Dates and detailed estimates should wait until discovery is sufficiently complete.

## MVP scope rule

All user-requested features and specified games are MVP scope unless the user explicitly defers them. “Later” in a planning conversation is not a release deferral. The only current explicit exception is production screenshots/visual assets that still need to be obtained; media-support design and testing remain MVP. Unresolved implementation choices require planning, not automatic deferral. This does not add unrequested features or authorize implementation while discovery is ongoing.

Phases below describe work order, not separate releases. All non-deferred requirements must be complete for MVP.

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

- Deliver complete text-first workflows for every specified MVP game.
- Implement bundled-SLM, game-scoped Coppermind Q&A with grounded answers and source links.
- Validate zero-media entry presentation.
- Validate media-capable components with test fixtures.
- Do not source new production screenshots for MVP.
- TBD

## Phase 4: Offline hardening and installability

- Verify core text and search offline.
- Validate SLM packaging, offline Q&A, device compatibility, and clear unsupported-device behavior against agreed MVP targets.
- Test cached and uncached optional-media states.
- Version media and data caches safely.
- TBD

## Phase 5: MVP coverage and release

- Validate complete coverage of all specified games; do not treat later development order as release deferral.
- Establish approved screenshot-capture and map-production workflow.
- Add production media only when owned or permissioned.
- Consider optional per-game visual-guide downloads.
- TBD

## Backlog

| Item | Phase | Priority | Status | Dependencies | Notes |
|---|---|---|---|---|---|
| Detailed legacy content audit | Discovery | High | In progress | None | Drive audit complete; repository audit remains |
| Validate specified MVP game coverage | Discovery | High | Not started | Information dump | All specified games included unless explicitly deferred |
| Select React build stack | Discovery | High | Not started | Requirements | |
| Define content schema | Discovery | High | Not started | Content inventory | Include optional media relationships |
| Define media/annotation schema | Discovery | High | Spec drafted | Rights and content model | |
| Build no-media and fixture-media component tests | Foundation | High | Not started | React foundation | |
| Define offline core dataset | Discovery | High | Not started | Release scope | Text first |
| Establish screenshot rights/capture workflow | Expansion | Medium | Deferred | Ownership decision | No new MVP screenshots |
| Define map authoring approach | Discovery | Medium | Not started | Rights and annotation tooling | Support in MVP; unavailable production visual assets deferred |

## Risks and unknowns

- Screenshot and map reuse rights
- Storage cost of offline visual guides
- Canonical capture platform/resolution
- Maintaining annotations when images change
- Ensuring decorative journal treatments do not crowd media or text

## MVP requirement: per-game Coppermind

Include a bundled SLM in MVP that answers player questions from each game's stored guide data. See [the architecture direction](./05-technical-architecture.md#mvp-requirement-per-game-coppermind-with-a-bundled-slm).

Discovery should assess the existing WintersRain/coppermind project, grounding and source citations, game/edition boundaries, on-device offline feasibility, model licensing, download packaging, device resource limits, and privacy. Prototype only after these choices are scoped; preserve a complete model-free guide and checklist experience. This is an accepted MVP requirement. Continue specification now; implementation still waits for the end of the planning phase. Technical uncertainty must be resolved or raised with the user, not treated as an implicit deferral.
