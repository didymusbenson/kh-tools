# Cross-game synthesis refinements

## Scope

Apply the proven KH1 stock-ledger refinements to the existing KH2FM, BBSFM,
DDDHD and KH3 farming plans without changing their game-specific mechanics.

- Each planned material uses a compact Material / Owned / Target / remove row.
  Shared visual labels replace repeated labels and the displayed Remaining field.
  Per-input accessible names, unknown stock, validation, saved inventory and
  total-stock target semantics remain unchanged. Remaining stock is still computed
  by the route model; met targets disappear from route options, not the ledger.
- The shared layout inherits each journal's type and colors, retains 44px quantity
  and removal targets, and lets long names/character context wrap. Page capacity
  measures actual rows, including validation feedback, and retains the edited row.
- KH2 and DDD material indexes now show family headings and keep each family on
  one page. The heading consumes a row in the page budget; an oversized family
  gets a scrollable page rather than losing members. Search and world filters
  operate before grouping. Deep links select the page containing the material.
- KH3 already has a family-grouped scrolling catalog. BBS keeps its character
  scopes and native command/crystal/ability melding catalog, rather than imposing
  tiered synthesis families on commands or ice cream ingredients.
- World grouping, Enemy drops / Other sources tabs, source expansion and conditional
  rewards already existed across these journals and are retained.

No CoM/0.2 synthesis workflow is introduced. Recursive recipe quantities, material
notes redesign and collected-one-time-reward linkage remain outside this change.

## Verification

The regression suite covers saved Owned/Target values, removal preserving owned
stock, computed route omission, source tabs, keyboard interaction, per-game
conditional sources, compact rows and family-preserving pagination on desktop
and phone. See the pull request checks for the exact final validation run.
