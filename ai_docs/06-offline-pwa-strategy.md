# Offline PWA Strategy

## Desired guarantee

After a successful first load and installation, the application should provide its core guides, reference data, navigation, and search without a network connection.

The precise definition of core content is TBD.

## Cache categories

| Category | Proposed behavior | Notes |
|---|---|---|
| Application shell | Precache with the release | HTML, JavaScript, CSS, icons, and fonts |
| Core structured content | Precache or bundle with the release | Keeps key reference material reliably offline |
| Essential images | Precache selectively | Control install size |
| Optional/large media | Cache on use | Provide visible offline state |
| User preferences | Store locally | Migration/versioning required |

## Update behavior

Proposed flow:

1. Continue running the known-good installed version.
2. Download a complete compatible update in the background.
3. Notify the user that an update is ready.
4. Activate the new version at a safe boundary, normally after confirmation or restart.
5. Preserve compatible local preferences and saved items.

## Offline UX requirements

- Clearly distinguish unavailable network-only content.
- Never present an empty page when cached core content exists.
- Show when content was last updated if freshness matters.
- Provide a way to retry failed downloads.
- TBD

## Storage and resilience

- Evaluate persistent storage requests where supported.
- Handle browser storage eviction gracefully.
- Version persisted schemas.
- Test iOS Safari/Home Screen, Android Chrome installation, and desktop browsers.
- TBD

## Validation scenarios

- First visit while offline
- Installed app launched offline
- Connection lost during navigation
- Update downloaded while old version is open
- Stale cache after a schema change
- Storage cleared or evicted
- Partial optional-media download
- TBD
