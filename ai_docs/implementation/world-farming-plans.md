# World-based farming plans

The existing material plans in KH1FM, KH2FM, BBSFM, DDDHD and KH3 now keep Owned,
Target and Remaining beside each material. The opposite page groups source
options by world, rather than displaying only the selected material. Source
lines expand in place into their locations, prerequisites, reset/instruction
prose, conditional rates and citations. Long notes use the existing continuation
page mechanism. CoM and 0.2 have no analogous material plan and are unchanged.

## Semantics and compatibility

- Targets remain total stock to have. Unknown Owned is different from zero.
- Met targets stay editable on the left and disappear from the route. Clearing
  or zeroing a target removes it from the plan without deleting owned stock.
- Search filters only the material list; the route includes the full plan in the
  selected character scope. Stale world/status filters do not silently drop plan
  materials or source options.
- Destinations and sources are alternatives, not a computed optimal itinerary or
  mandatory trips. Worlds and rows have stable ordering. Repeated rooms for the
  same material/source/rate merge under one source row.
- Enemy names and literal source rates come from the existing game catalog.
  Conditional values, difficulty/shop bands, rare/portal distinctions, story
  prerequisites and Lucky Lucky qualifications are retained in the notes.
- Chests, shops, ingredient pickups, synthesis, rewards and minigames retain their
  actual source type. A one-time source is not presented as a repeatable drop.
- BBS retains per-character target IDs and episode boundaries. Unscoped BBS
  enemy-table examples stay under Location not specified, with their uncertainty.
  Authored character-specific routes receive real world headings.
- DDD separates named Sora/Riku portal sources. Ordinary encounter access that
  is not completely indexed remains explicit rather than inferred.
- KH1 only joins additional named rooms when existing authored material notes
  explicitly identify the matching enemy there. Broad enemy-world prose is not
  treated as universal farming access.
- No profile schema, inventory identifier, backup format or save transaction was
  changed. The shared row reports save failures without claiming a saved count.

## Presentation

KH1 and KH2 keep their native bound-book pages. BBS and DDD keep their existing
Reports framing and character selectors. On phones the material and route
panes switch with explicit controls. Short landscape views use compact native
chrome. KH3 keeps the existing generic guide framing and natural page scroll,
with an internally paginated two-column plan rather than a new Gummiphone design.

## Validation

Source-model tests cover all active material catalogs, shared worlds/enemies,
conditional and unknown rates, unknown/zero/satisfied counts, source IDs,
citations, character/episode scope and non-enemy options. The focused browser
suite exercises source expansion/pagination, quantity editing and validation,
search scope, reload/cross-tab/offline/failed-save behavior and compact layouts.
Final run counts and deployment revision are recorded with the task handoff.
