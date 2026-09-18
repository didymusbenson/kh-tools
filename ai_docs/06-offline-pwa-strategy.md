# Offline PWA Strategy

## Desired guarantee

After a successful first load and installation, the application should provide its core guides, reference data, navigation, and search without a network connection.

Core text must remain useful without optional screenshots or map images.

## Cache categories

| Category | Proposed behavior | Notes |
|---|---|---|
| Application shell | Precache with the release | HTML, JavaScript, CSS, icons, and fonts |
| Core structured content | Precache or bundle with the release | Keeps key reference material reliably offline |
| Essential approved images | Precache selectively after MVP | Keep list small and explicit |
| Optional screenshots/maps | Cache on use | Never block text instructions |
| Future per-game visual pack | User-initiated prefetch | Post-MVP possibility |
| User preferences/progress | Store locally | Migration/versioning required |

## Media behavior

- MVP contains media support but does not require production screenshots.
- Entries without media have no empty placeholder.
- Uncached optional media shows a non-blocking offline state.
- Cached images remain available with their captions and textual alternatives.
- Text instructions must not say only “see image.”
- Media manifests and image caches should be independently versioned where practical.
- A later visual-guide download must report estimated size and completion.

See [Screenshot, Map, and Visual Location Support](./content/screenshot-and-map-support.md).

## Update behavior

1. Continue running the known-good installed version.
2. Download a complete compatible update in the background.
3. Notify the user that an update is ready.
4. Activate the new version at a safe boundary, normally after confirmation or restart.
5. Preserve compatible local preferences and saved items.
6. Avoid purging still-referenced media before new content becomes active.

## Offline UX requirements

- Clearly distinguish unavailable optional media from unavailable core content.
- Never present an empty page when cached core content exists.
- Show when content was last updated if freshness matters.
- Provide a way to retry failed downloads.
- Preserve captions/alt text even when a binary asset is unavailable when practical.

## Storage and resilience

- Evaluate persistent storage requests where supported.
- Handle browser storage eviction gracefully.
- Version persisted schemas.
- Track optional-media cache size separately.
- Initial smoke/acceptance: browser on Apple computer, iPhone Safari/Home Screen and iPad browser/Home Screen. Android installation/browser testing follows when the test device is used. Record exact versions during execution; see [shared testing policy](./testing-and-content-validation.md).

## Validation scenarios

- First visit while offline
- Installed app launched offline
- Connection lost during navigation
- Entry with no media
- Entry with uncached optional screenshot while offline
- Entry with cached screenshot while offline
- Partial future visual-pack download
- Update downloaded while old version is open
- Stale cache after a schema change
- Storage cleared or evicted

## Optional synthesis inventory offline

When enabled, [inventory](./content/synthesis-and-inventory.md) and owned/required recipe reminders work offline using the same persisted stock as planner calculations. Disabling reminders preserves quantities. Updates, interrupted writes and export/import must preserve both stock and crafted-history state. Validate these flows on the initial Apple matrix.
