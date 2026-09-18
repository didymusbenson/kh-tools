# Screenshot, Map, and Visual Location Support

## Status

Architectural requirement; production content deferred beyond MVP.

## Objective

Ars Arcanum should eventually show in-game screenshots and map references that help users recognize and find collectibles, enemies, objectives, entrances, and other location-specific content.

The MVP must be designed and tested so this media can be added later without restructuring records or redesigning entry pages. The MVP will not add screenshots or maps that the project does not already possess and have permission to use.

## MVP boundary

### Included in MVP

- Media-ready content schema
- Image-aware entry layout
- Conditional rendering when no media exists
- Accessible captions and alternative-text support
- Test coverage using non-production fixtures
- Asset validation rules
- Offline/cache strategy hooks
- Provenance and rights metadata fields

### Deferred beyond MVP

- Sourcing a complete screenshot library
- Capturing or importing screenshots
- Annotating every map
- Image galleries in production content
- Bulk image optimization and migration
- Download-all-media offline packs

Production entries with no approved images must render as complete entries without empty frames, broken placeholders, or “coming soon” clutter.

## Media model

A media asset should support:

- Stable asset ID
- Media type: screenshot, map, map crop, diagram, icon, or other
- Game, edition, platform, and region applicability
- Associated world, area, entry, and optional sub-location
- Source file and optimized variants
- Width, height, aspect ratio, and MIME type
- Caption
- Alternative text
- Credit
- Source/provenance
- Rights or permission status
- Capture platform and display settings where relevant
- No spoiler classification or concealment requirement
- Sort order
- Optional annotations
- Offline priority
- Verification status

## Location annotations

Future media should be able to express:

- Point marker
- Bounding box
- Directional arrow
- Highlighted path or region
- Entrance/exit marker
- Player/camera orientation note
- Ordered multi-image steps

Annotations should be stored separately from the original image so the same source can support revised overlays, accessible descriptions, and different responsive crops.

## Entry relationships

A record may have:

- No media
- One primary location image
- A small ordered gallery
- A map plus one or more screenshots
- Images scoped to different editions/platforms
- Available images displayed without spoiler concealment
- The same approved asset referenced by multiple entries

Media should be linked to records by stable IDs, not embedded directly in prose.

## Presentation requirements

- Text instructions remain sufficient without images.
- The primary answer and location text appear before or alongside media.
- Phone layouts prioritize one clear image at a time.
- Users can open an enlarged view without losing journal position.
- Captions distinguish map context from exact in-game view.
- Edition/platform labels appear when imagery differs.
- Display available images openly; no spoiler warnings or reveal controls.
- Missing or offline-uncached optional media has a clear, non-blocking state.

## Accessibility requirements

- Informational images require useful alternative text.
- Complex annotated maps require a textual equivalent.
- Decorative images use empty alternative text.
- Markers cannot rely on color alone.
- Zoom and pan controls are keyboard accessible.
- The media viewer respects reduced motion.
- Captions and credits remain available at enlarged sizes.

## Rights and provenance policy

Do not add production screenshots merely because they can be found online.

Before publishing an asset, record:

- Who created or captured it
- Where it came from
- What permission or reuse basis applies
- Whether attribution is required
- Whether modification/annotation is permitted

Assets with unknown rights remain excluded from production.

## Offline strategy

- Core text never depends on media.
- Small essential location images may be selectively precached later.
- Larger galleries default to cache-on-use.
- A future per-game “download visual guide” option may prefetch approved media.
- Asset manifests must be versioned independently enough to avoid invalidating all text content for one changed image.

## Testing strategy

MVP tests may use synthetic fixtures or project-owned test assets that are not published as game-guide content.

Test cases:

- Entry with no media
- Entry with one responsive screenshot
- Entry with map plus screenshot
- Edition-specific media selection
- Missing asset validation failure
- Missing alt text validation failure
- Media shown without spoiler warnings or reveal controls
- Offline text with uncached optional media
- Cached media available offline
- Responsive enlargement and keyboard controls
- Annotation data rendering
- Invalid rights/provenance status rejected from production builds

## Open questions

- Which screenshot capture platforms and resolutions become canonical?
- Will the project capture its own gameplay images?
- Should maps be original diagrams, licensed images, or both?
- Which assets qualify as essential offline media?
- What annotation authoring workflow will maintainers use?
