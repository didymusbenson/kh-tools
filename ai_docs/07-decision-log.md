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
