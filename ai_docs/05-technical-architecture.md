# Technical Architecture

## Confirmed direction

- React
- Progressive Web App
- Mobile-first responsive interface
- Offline availability for core reference content

## Candidate implementation choices

These remain proposals until recorded in the decision log:

- TypeScript
- Vite-based application
- React Router or an equivalent route layer
- Structured local content stored as JSON, Markdown/MDX, or generated artifacts
- A service-worker toolchain such as Workbox through the selected build integration
- Automated unit, component, end-to-end, accessibility, and PWA checks

## Architectural priorities

- Separate source content and domain data from UI components.
- Keep content migration testable.
- Use stable content identifiers and routes.
- Avoid requiring a backend for read-only core functionality.
- Make static hosting straightforward.
- Ensure deploys cannot leave incompatible cached code and data active together.

## Proposed application layers

- Presentation and responsive components
- Routing and navigation
- Search and filtering
- Domain/content model
- Local persistence
- PWA installation, caching, and updates
- Build-time content validation

## Data model

- TBD

## Hosting and deployment

- TBD

## Testing strategy

- TBD

## Migration approach

- TBD

## Open technical decisions

- Framework/build stack
- Content authoring format
- Search implementation
- Hosting target
- Analytics and privacy posture
- Whether any user state requires cloud synchronization
