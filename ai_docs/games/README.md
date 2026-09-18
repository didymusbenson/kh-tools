# Per-Game Specifications

Each supported game gets its own product and content specification because completion systems, terminology, platform variants, and visual identity differ substantially across the series.

These documents define what Ars Arcanum must eventually cover. The imported KHTABLES material is treated as discovery evidence, not as verified final data.

## Current specifications

- [Kingdom Hearts Final Mix](./kingdom-hearts-final-mix.md)
- [Kingdom Hearts II Final Mix](./kingdom-hearts-ii-final-mix.md)
- [Kingdom Hearts Birth by Sleep Final Mix and 0.2](./birth-by-sleep-final-mix.md)
- [Kingdom Hearts Dream Drop Distance](./dream-drop-distance.md)
- [Kingdom Hearts III](./kingdom-hearts-iii.md)

Release collections are modeled separately from games and do not receive a standalone gameplay specification merely because they bundle multiple components.

## Specification contract

Every game specification should eventually define:

- Supported editions, platforms, and regional differences
- Completion categories and their exact completion rules
- Structured data entities and relationships
- User questions and workflows
- Checklist and progress-tracking requirements
- Search, filtering, sorting, and cross-linking requirements
- Spoiler handling
- Offline content requirements
- Source provenance and verification status
- Screenshot and map opportunities
- Game-specific Ars Arcanum journal theme
- Acceptance criteria for declaring the guide comprehensive

## Shared content standard

Every factual record should support:

- Stable internal ID
- Canonical display name and aliases
- Game and edition
- Category and subcategory
- Acquisition method
- World, area, and precise location where applicable
- Prerequisites and required movement/progression abilities
- Rewards or outputs
- Related entities
- Optional media references
- Source provenance
- Verification status
- Optional spoiler classification

## Screenshot and map policy

The content model and layouts must support location screenshots, maps, and annotations from the start. Production media is deferred beyond MVP and may be added only when the project possesses an approved asset and documented permission or ownership. Text instructions must always stand on their own.

See [Screenshot, Map, and Visual Location Support](../content/screenshot-and-map-support.md).

A source being present in the legacy material does not make it correct or complete.

## Mandatory persistent checklist behavior

Every game inherits [Persistent Checklists and Player Progress](../content/persistent-checklists-and-progress.md). Each specification must map its completion items to stable IDs, define counting rules, identify character/edition-specific versus shared state, and support saved checks, Remaining filters, counts, and resuming the last section. This is required for MVP. 0.2 has independent progress even though it sits within the BBS family.

## Readiness and supported releases

Use the [per-game readiness workbooks](../readiness/README.md) to resolve questions and track evidence. Modern/current releases are the target; KH1 and KH2 use modern Final Mix. Original/non-Final-Mix and PS2-era compatibility are excluded. Research relevant modern platform differences without expanding backward-compatibility scope.
