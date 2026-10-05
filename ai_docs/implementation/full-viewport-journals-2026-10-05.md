# Full-viewport journals — 2026-10-05

Work in progress. Requested for all seven games: Ars Arcanum is the game interface, without a detached website frame consuming journal space.

- Native KH1/KH2/Re:CoM/BBS/DDD volumes own the full dynamic viewport. Book leaf ratios, bindings, original navigation, and adaptive page capacity remain unchanged.
- Companion controls are in a footer Tools disclosure; Home returns to Ars Arcanum. Search/settings remain available, including existing KH1 header tools. DDD character filtering and CoM companion links remain available inside Tools.
- Save status is an internal live region. App update notices overlay the frame rather than adding an unexpected grid row.
- KH3/0.2 treasure interfaces integrate utilities into the footer. Their remaining guide pages use internal paper toolbar/side navigation, without exterior padding/header.
- Safe-area insets are owned by the active interface. Short screens retain internal scrolling and pagination.

Initial validation: TypeScript/build and 261 unit tests passed; 36 route/viewport captures showed no horizontal document overflow. Targeted interaction and independent review are in progress. This is not a claim that the pre-existing full browser suite is green.
