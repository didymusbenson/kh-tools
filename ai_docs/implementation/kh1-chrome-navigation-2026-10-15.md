# KH1 journal frame and return navigation

Scope: KH1 only. Preserve the game’s green frame, burgundy Journal plaque, book/binding, native guidance strip, and normal desktop frame dimensions. The title marker is drawn as two gold strokes rather than a Roman numeral. Mobile frame allocation is compacted without changing the index/note pagination architecture or disabling browser zoom.

- Return destinations are stored in the hash route as `returnTo`, constrained to local KH1 routes. A detail, related entry, Search, or Save & Settings visit can return to its originating query, filters and page after reload. Deep links retain canonical parent fallbacks; browser history is never used for the Back action.
- Gummi search results still open canonical Parts/Missions/Blueprints pages, with the original search retained separately. Synthesis treats both `entry` and `item` as selections and returns to the filtered index.
- The footer names the return destination and keeps a quiet page/progress label. Redundant Contents self-links are removed; the native Journal plaque remains.
- Guidance describes the focused/hovered link and is associated through `aria-describedby`; it resets when the pointer or focus leaves the index. Entry summaries no longer remain stuck in the header.
- In short landscape viewports, Search, Save & Settings and Ask Jiminy move into the existing footer Tools menu. The native title/plaque stay in the green header; opening/closing Jiminy preserves its mounted state and returns focus to Tools. Normal desktop controls remain unchanged.
- The leaf picker is not rendered for index/contents/tool pages where it has no function. Overview/Notes and synthesis page controls remain.

## Validation

Local: application tests (33 files / 323 tests), TypeScript, production build/content/pack validation, and seven Python pack tests pass. Python seed integration cannot run locally because ChromaDB is absent; CI installs the pinned dependency. Existing local headless-browser restrictions prevent browser execution here; no mobile visual validation is claimed. Added navigation and frame geometry browser regression coverage runs before the full desktop/mobile GitHub Actions suite, with PNG captures retained for reference review. Initial CI caught a world-context header gap, short-landscape title line box and farming-space regression; these were corrected before publication. Desktop, portrait and landscape captures are visually compared with `ai_docs/ui/references/kh1fm`; automated viewport testing is not physical-device testing. Final CI/deployment results are recorded on the pull request.
