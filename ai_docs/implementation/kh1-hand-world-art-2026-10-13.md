# KH1 hand layering and world artwork cleanup

- Reproduced the reference-index glove beneath the notebook rings. The glove is a positioned pseudo-element in the spread's stacking context; the rings use layer 2. Its ancestor chain has no intervening stacking context or clipping boundary over the binding.
- Assigned only the glove layer 3 and disabled its pointer events. Paper, binding, native cursor, geometry, navigation, and existing phone suppression are unchanged.
- Omitted the speech bubble only when a world emblem replaces Jiminy. Other Jiminy pages and header help remain unchanged. World assets, credits, categories, counts, empty-category hiding, and pagination are preserved.
- Added hover/keyboard paint-order checks using the actual glove/ring overlap, unchanged book geometry, click/Enter navigation, phone behavior, and all 13 world images with bounds/credit checks and retained non-world speech.

Local validation: 301 unit tests passed; production build, content validation, and Coppermind pack verification passed. Desktop and phone screenshots were inspected. Full browser and GitHub CI results are recorded in the pull request.
