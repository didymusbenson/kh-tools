# Farming source tabs

The shared Farming Plan world route has two local tabs: **Enemy drops** (the
initial view) and **Other sources**. KH1FM, KH2FM, BBSFM, DDDHD and KH3 use the
same partition and controls inside their existing journal layouts. Material
rows, including compact KH1 name/Owned/Target rows, remain unchanged.

Each adapter supplies a structured `sourceKind`. Enemy drops keep their literal
rates and conditions, including conditional enemy rewards and rare encounters.
Other sources include Bambi checkpoints, chests and finite rewards, shops,
synthesis/melding, pickups, portal completion rewards and treasure spheres.
Legacy non-enemy records stored in catalog `drops` fields are identified by
explicit per-game source metadata, rather than matching UI text or guessing
repeatability from a percentage.

Filtering preserves source identities, source notes, citations, material
alternatives, world ordering and character scope. Empty world groups are omitted;
an empty category explains where to look next. The source type does not change
Owned/Target/Remaining semantics or the pending/satisfied/unknown stock counts.

The tablist supports Left/Right, Home and End with roving focus and automatic
activation. Switching tabs starts at the first route page and keeps source
expansion state while the plan remains open. Tab state is local presentation
state: no persisted schema, inventory logic, checklist links or save transaction
changes. Existing pagination and disclosure focus restoration remain in use.

Validation covers complete-catalog source partitioning, legacy exceptions,
conditional enemy sources, shared five-game browser behavior, keyboard switching,
disclosure restoration, empty categories, stock edits and reload, saved checks,
Undo and compact desktop/phone layouts. Exact final run counts are recorded in
the pull request and task handoff.
