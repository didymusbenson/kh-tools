# KH2FM faithful journal — new UI plan

**Revision:** 0.1 · 2026-09-24  
**Status:** Working local pass for revision; visual direction accepted, individual adaptations provisional.

The user requested the KH1 treatment for KH2, using KH2's own journal menu styles. This extends [DEC-020](../07-decision-log.md#dec-020-faithful-game-journals-replace-the-initial-ars-arcanum-ui). The earlier generic collection/workshop interface is superseded as KH2's presentation target. Existing content, acquisition IDs, checks, inventory, farming targets and backup behavior remain the foundation.

See the [reference workbook](references/kh2fm/README.md) and [implementation report](../implementation/kh2fm-faithful-journal-mvp.md).

## 1. Reference and composition

Use the user's [KH2 journal video](https://www.youtube.com/watch?v=rw8c9l0K1vU) and the accepted standalone KH2 study. The study supplies the Port Royal cover composition: green framing, red center ribbon, green Select World / Collection controls, burgundy chapter tabs, gold world plaque, burgundy cover, green illustration/summary panels and small Jiminy help portrait. Reading views use cream paper and metallic binding.

The supplied video was opened and inspected directly, including Story reading screens around 1:01 and 1:21. These support the framing, paper, tabs, binding and footer treatment. This is not a claim that every native subsection has been verified. Current screenshots attached in the conversation document KH1 corrections; do not treat those as KH2 visual evidence.

## 2. Rules carried over from KH1

- The journal occupies the available viewport height. Changing sections does not change the outside frame or book bounds.
- Facing content pages have equal widths, with the binding in the middle. The world cover retains its reference's outside-left binding; its content halves still share available width equally.
- Hover, focus, selection and completion may change color, outline or an absolutely positioned cursor. They must not change row dimensions, font weight, padding or book geometry. Help text fits a reserved footer region.
- Rows remain compact and top aligned. More height means more entries, not stretched rows. Measure the usable index height after filters and navigation; do not hard-code five entries everywhere.
- Long notes continue on numbered pages. Neither book leaves nor the outer journal should require vertical scrolling at supported desktop/phone sizes.
- Synthesis, search and settings continue the journal's visual language. Use index on the left, details on the right; avoid a sudden return to dashboard cards.
- Existing guide categories are directly available in Collection. No extra Guide Notes submenu.
- Narrow phones display one leaf at a time, with explicit Index / Notes or Sections / Overview controls. Opening an entry selects its notes. This is an app adaptation, not a reproduced game interaction.

## 3. Working screen map

| Screen | Current treatment | Data and behavior |
|---|---|---|
| Select World | Cream index and world preview | All 15 existing world overviews; collectible counts |
| World cover | Burgundy cover, gold world title, section index, green overview | Only sections with applicable existing records; filtered destination links |
| Collection | Facing-page category index | All 16 existing categories plus Synthesis directly accessible |
| Record category | Compact index / selected notes | World, text and completion filters; independent saved checkbox; existing acquisition details |
| Synthesis | Recipes / Materials / Farming Plan inside the same book | Crafted checks, linked ingredients, optional stock, total-stock targets and remaining amounts |
| Search | Search results / selected notes | Existing records across categories; canonical entry selection |
| Save & Settings | Category index / paged coverage and backup controls | Existing export, import and recovery handlers |

World collection counts include the catalog's 301 Sora treasures and 144 puzzle pieces. Aliases such as chest-contained Torn Pages and charms do not add duplicate units. Challenge goals remain separate. Neither these totals nor the cover crown certify official Journal completion.

Recipes preserve the existing catalog's assumptions and uncertainties. Historical Crafted checks never consume inventory. Adding recipe ingredients adds their quantities to existing farming targets. Blank owned stock means unknown, rather than zero.

## 4. Fidelity and content boundaries

Port Royal reuses the accepted study's world illustration and logo. Other worlds currently use a crown and their written name in the same composition. These are provisional covers pending matching artwork; they are not claimed to be faithful replicas of each world's native plaque.

Chakra Petch and Itim are the study's font substitutes. Native controller glyphs, unread/new markers and gold completion emblems are not simulated without matching behavior. Guide summaries are factual companion context, not invented native Story text. Characters, Album and Maps are not fabricated as empty native menu destinations. Existing bestiary and acquisition records remain accessible.

This pass changes presentation, not catalog completeness. The [KH2 rollout report](../implementation/kh2fm-rollout.md) retains the known data gaps and recipe limitations. Data Jiminy's broader per-game requirements remain in scope; this pass does not introduce a KH2 model/pack or claim that integration is complete.

## 5. Open questions for revision

| ID | Clarification | Current working choice |
|---|---|---|
| KH2-Q01 | Keep Select World as entry, or open Collection first? | Preserve the existing Worlds landing route. |
| KH2-Q02 | Match native Treasures / Pieces grids more closely, or retain the approved compact index/detail interaction? | Use index/detail for working acquisition tracking; native grids need focused references. |
| KH2-Q03 | Which native world sections should have full content beyond existing acquisition records? | No invented biographies, story transcription, album or map content. |
| KH2-Q04 | Should world covers retain this summary panel, or should collection progress dominate it? | Existing world summary plus clearly labeled treasures/pieces total. |
| KH2-Q05 | Exact world plaques, artwork and fonts? | Port Royal assets from the approved study; other covers and typography explicitly provisional. |
| KH2-Q06 | Synthesis labels and controls within the book? | Recipes / Materials / Farming Plan; compact controls above paged notes. |
| KH2-Q07 | Exact assistant placement in this journal? | Keep the existing KH2 feature boundary; do not add a nonfunctional Ask Jiminy button. |

No screenshot request blocks this pass. If revising native Treasure/Pieces grids, record screens or another world cover, request a focused screenshot or video timestamp when the supplied footage cannot establish that screen clearly.

## 6. Acceptance checks

Verify frame stability across worlds, cover, category, synthesis and settings; equal facing leaves; no horizontal/vertical overflow on phones; adaptive capacity on tall screens; geometry unchanged by help/selection; readable continuation pages; ingredient deep links; synced checks; persisted unknown/zero/positive stock; additive targets; and existing tests/build. Document untested release boundaries instead of equating a successful build with final visual acceptance.
