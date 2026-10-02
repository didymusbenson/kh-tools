# KH3 / Re Mind gap closure — 2026-10-02

## Scope checkpoint

Target: currently shipped Steam KHIII + Re Mind. Preserve stable IDs, separate historical console entitlements, and leave Data Jiminy empty. No future release or mod behavior establishes current Steam behavior.

Starting ledger: 14 partial (KH3-001, 002, 004, 010, 011, 013, 014, 015, 020, 022, 024, 027, 029, 032), 3 conflicted (KH3-005, 018, 030), 18 resolved. This pass investigates all 17 residual findings, prioritizing obtainable source tables and firsthand evidence. Unverified edge conditions remain explicit; guide agreement alone cannot resolve tested-boundary disputes.

The initial checkpoint established scope. The completed pass below records inspected evidence, implemented corrections and unresolved boundaries without treating unavailable Steam experiments as established facts.

## Integration checkpoint 1

Added all 28 obtainable medal variants (7 Junior, 12 Master, 9 Star) from the complete individual KHWiki stat/activity/rank tables. Unused code-only medal variants are excluded. Five minigame entries now enumerate the alternative A/B reward pools; probabilities remain unknown. Added built-in map-marker flight directions to all nine spheres using Game8's illustrated instructions, and 12 exact sphere/material/quantity associations. Recovered omitted structured enemy drops from existing source clauses, retained full Gigas names, and replaced Gummi-region-as-enemy parser artifacts with asteroid source labels. Focused KH3 tests: 4/4 pass. All existing IDs retained; canonical count 1954 entries, 286 actions.

Sources inspected: https://www.khwiki.com/Junior_Medal, https://www.khwiki.com/Master_Medal, https://www.khwiki.com/Star_Medal, https://game8.jp/kh3/255107. Game8 describes marking the sphere before embarkation, then following the yellow flag and shooting the sphere. Its Japanese console button is not substituted for a Steam glyph. Independent Japanese firsthand https://blog.rebosoku.com/archives/kh3gummi_record3.html also explicitly describes sphere rewards as once only. No numerical coordinates inferred.

## Integration checkpoint 2

Recovered the complete 99-row TrueAchievements cost table through indexed retrieval, including its crucial combined Main + Teeny unit. Preserved it as attributed source data, not a main-ship calculator or Steam certification; per-ship/AP curves remain open. Added 21 landmark harvest routes across Parsley, Raspberry, Blackberry, Gooseberry, Miller Mushroom and Portobello, including each guide's world re-entry replenishment advice without inventing a universal timer. Corrected two copy-reward records that previously implied recovery was unavailable: a firsthand 2019-03-20 PS4 play diary explicitly describes the two pink portals, +5 at 222/333 and forced exit at 333. This establishes a recovery route, not repeatable HP farming. Added fresh official Dead of Night entitlement authority and SteamDB's public build reference 14790811 with explicit mirror provenance.

The first medal checkpoint exposed nullable world fields in shared schema validation. Removed absent world fields rather than inventing locations or weakening validation. Focused KH3 + multi-game checks now pass 12/12. Canonical lineage remains directly maintained JSON, with no separate KH3 generator.

## Final per-finding disposition

Current ledger: **13 partial, 19 resolved, 3 conflicted**. KH3-024 is newly resolved by actionable marker routes; all three exact-boundary conflicts remain explicit. Canonical content: **1954 entries and 286 recipe actions**. Added 151 exact-name acquisition/recipe associations across 104 equipment records, linking their existing chest, reward and synthesis directions without inventing extra sources.

### KH3-001 — partial

Inspected Neoseeker’s first-visit Arendelle narrative: it explicitly says the raised chest cannot be obtained then, and directs recovery after Sköll. This is stronger narrative evidence than a post-clear route, but does not test the exact Steam boundary. A 2025 player thread describes a different reachable forest chest and is not accepted as evidence for #24.

Remaining boundary: Spatial pickup-direction coverage is complete, not a claim of 335 save-point narratives or a universal earliest-access graph. route-enrichment.json enumerates 316 IDs without proven minimum story gates and the specific Arendelle chest 24 disagreement (GamerGuides requires revisit; PowerPyx says easier). Original console guides align with current base identities but are not modern Steam capture authority; aliases remain KH3-002. No direction remains unresearched or area-only because a wiki cell was blank.

Inspected evidence: https://www.neoseeker.com/kingdom-hearts-iii/walkthrough/Arendelle, https://www.reddit.com/r/KingdomHearts/comments/1k2dfp8/

### KH3-002 — partial

Square Enix’s English Asia Steam product page directly confirms Dead of Night’s English name. The modern Steam keybind discussion and historical English item table do not supply a full captured regional ingredient/Strength label concordance; no bulk rename was applied.

Remaining boundary: The community tables establish aliases, not a captured modern English Steam label authority. Strength/Power and all regional ingredient aliases are not completely reconciled; no bulk rename was inferred.

Inspected evidence: https://www.square-enix.com/asia/newsportal/en/sg/kingdom-hearts-iii/, https://gamefaqs.gamespot.com/ps4/718920-kingdom-hearts-iii/faqs/76812/items-and-equipment

### KH3-004 — partial

Inspected a 2025 Steam key-remapping discussion and separately labeled PS4 Re Mind control guide. The Steam author provides a keyboard screenshot link but retrieval failed; neither text establishes alternate DLC-load keyboard glyphs. Retain the semantic alternate Load action and documented console mappings, without a guessed PC key.

Remaining boundary: GamerGuides describes console controls and episode overwrite boundaries; it does not establish every Steam keyboard/controller glyph, replay/overwrite edge or cloud-transfer interaction. Those exact save-control cases remain uncertified.

Inspected evidence: https://steamcommunity.com/app/2552450/discussions/0/604151281074875161/, https://steamcommunity.com/sharedfiles/filedetails/?id=3449383733, https://gamefaqs.gamespot.com/ps4/265933-kingdom-hearts-iii-re-mind/faqs/78287/controls

### KH3-005 — conflicted

Inspected underbuffed’s first-party upload description for the Forest Clasp demonstration: it says while Rapunzel is in the party/before the castle. The upload does not describe an omitted-activity attempt after Shore, so it cannot adjudicate the competing deadline. Conservative pre-Shore advice retained.

Remaining boundary: Item page says before first reaching Shore; Corona world reward description says before Rapunzel leaves. Neither reviewed page resolves the exact event flag or explicitly retracts the other cutoff. Conservative advice is not a resolved trigger.

Inspected evidence: https://www.youtube.com/watch?v=QcXvjm55UiY

### KH3-010 — partial

Integrated 12 exact sphere/material quantity associations with named navigable sphere records. Corrected Gummi region-as-enemy artifacts and recovered omitted structured enemy-drop clauses from canonical source evidence, preserving Gigas class prefixes. These are distinct from 52 existing numbered chest links.

Remaining boundary: Twelve sphere/material quantities and routes are now linked, alongside 52 numbered chest routes. Remaining alternatives, exact destructible-object yields, every enemy encounter unlock and optimized farm comparisons are incomplete.

Inspected evidence: https://www.trueachievements.com/game/Kingdom-Hearts-3/walkthrough/20, https://game8.jp/kh3/255107

### KH3-011 — partial

Japanese firsthand Eclipse battle guide explicitly calls sphere material rewards one-time. Added this to all nine spheres to prevent applying ordinary-asteroid respawn advice to fixed sphere loot. No source establishes a timed comparative fastest farm or the full colored-crystal reset matrix.

Remaining boundary: Ordinary asteroid world re-entry is guide-supported and sphere loot is explicitly one-time. Other colored-crystal reset conditions, timing and measured comparative farming efficiency remain unestablished.

Inspected evidence: https://blog.rebosoku.com/archives/kh3gummi_record3.html

### KH3-013 — partial

Fully normalized the obtainable medal tables: seven Junior, twelve Master and nine Star variants, each with STR/MAG/AP, ability, activity and rank. Excluded five unused code-only variants. Joined 104 equipment records to 151 exact existing chest/reward/synthesis records; all matching source routes are now named in instructions. Individual random weights remain unknown.

Remaining boundary: All 28 obtainable medal variants and their rank/activity pools are normalized, and 104 equipment records link 151 existing acquisition records. Random weights and acquisition paths absent from the represented chest/reward/recipe sources remain unverified.

Inspected evidence: https://www.khwiki.com/Junior_Medal, https://www.khwiki.com/Master_Medal, https://www.khwiki.com/Star_Medal, https://www.destinyislands.com/kh3/accessories/

### KH3-014 — partial

Fresh English Square Enix Asia product page explicitly identifies the Steam purchase bonus Dead of Night and possible later separate sale. Integrated that authority without imposing historical PS/Xbox preorder expiry rules on Steam. Other regions/accounts’ historical redemptions remain outside present Steam entitlement evidence.

Remaining boundary: Regional historical preorder/storefront entitlement availability is not established for every country/account. The forthcoming native editions are not shipped evidence. Do not fold all exclusive keys into Steam collection.

Inspected evidence: https://www.square-enix.com/asia/newsportal/en/sg/kingdom-hearts-iii/

### KH3-015 — partial

Inspected all 59 individual Destiny Islands ingredient pages, recovering Beef, Cloves and Orange after transient HTTP 406 responses. Integrated 172 landmark route groups across all 59 ingredients, including the eight reward-only ingredients and alternate Bistrot/100 Acre Wood sources. Preserved the original 298 source rows and 28 shop tiers; did not infer base yields from Harvest-boosted screenshots or adjudicate Flan score equality from guide wording.

Remaining boundary: All 59 linked individual ingredient pages are now inspected and their described approaches integrated. Remaining limits are exhaustive unique-node coordinates beyond those guides, controlled base yields and spawn probabilities, timed replenishment and exact minigame threshold boundaries. No unexamined page in this 59-page source index is classified as inaccessible.

Inspected evidence: https://www.destinyislands.com/kh3/items/ingredients/parsley/, https://www.destinyislands.com/kh3/items/ingredients/raspberry/, https://www.destinyislands.com/kh3/items/ingredients/blackberry/, https://www.destinyislands.com/kh3/items/ingredients/gooseberry/, https://www.destinyislands.com/kh3/items/ingredients/miller-mushroom/, https://www.destinyislands.com/kh3/items/ingredients/portobello/

### KH3-018 — conflicted

Inspected firsthand Neoseeker Flantastic narrative and Candid Gamer’s photographed minigames. Neoseeker reports a 22,200 successful score; Candid uses 20,000+ interval wording. Neither is an exact-equality trial, so all seven equality predicates remain disputed rather than settled by guide agreement.

Remaining boundary: KHWiki prints strict > thresholds while GameFAQs includes exact threshold equality, e.g. 20,000+. Neither is decisive boundary evidence; equality is still unresolved for all seven.

Inspected evidence: https://www.neoseeker.com/kingdom-hearts-iii/sidequests/Flantastic_Seven, https://www.thecandidgamer.com/2019/02/10/kingdom-hearts-3-the-flantastic-seven/

### KH3-020 — partial

Five minigame entries now show all 28 medal outcome variants grouped by A/B rank and explicitly describe alternatives, not a bundle. The illustrated Honey result source still supplies quantities without every displayed rank label. Weights and the remaining Honey label boundary remain unproven.

Remaining boundary: All medal variant stats/activity/rank pools are normalized. Individual roll weights and every displayed Honey rank label remain unsupported; known Honey quantities are retained.

Inspected evidence: https://www.khwiki.com/Junior_Medal, https://www.khwiki.com/Master_Medal, https://www.khwiki.com/Star_Medal, https://www.destinyislands.com/kh3/items/ingredients/honey/

### KH3-022 — partial

A dated firsthand PS4 play diary explicitly describes revisiting via the pink Badlands portal and the second pink portal to restart copy collection, with +5 HP at 222 and 333 and automatic exit at 333. Corrected both runtime missability claims. This establishes recovery opportunity, not repeatable already-claimed HP or rescue/naval resets.

Remaining boundary: The two-portal copy recovery route is now documented and misleading missability removed. Already-claimed copy reward repetition, rescued-NPC repeat quantities and full naval fleet spawn/reset model remain unproven.

Inspected evidence: https://yogdog.blog.fc2.com/blog-entry-3805.html

### KH3-024 — resolved

Filled all nine sphere approaches using documented in-game map targeting: select sphere before embarkation, mark it, follow the yellow flag and shoot. Visually inspected Game8’s marker screenshot. All 45 fragment approaches were already populated. No invented numerical coordinates are needed for this actionable route method.

Remaining boundary: None for actionable sphere/fragment acquisition routes: nine spheres use the built-in target marker and all 45 fragments have approaches. Numerical coordinates and Steam-specific button glyphs are not claimed or necessary for these semantic directions.

Inspected evidence: https://game8.jp/kh3/255107, https://img.game8.jp/2651884/f77b6bc9412317d80657f352bd0ae5a4.jpeg/show

### KH3-027 — partial

Recovered and retained the entire indexed 99-level TrueAchievements cost table, previously called inaccessible. Its author explicitly defines total Main + Teeny cost (500 to 1,600); it must not overwrite the 1,000 base main-ship endpoint. Per-ship split, AP-cap curve and Steam validation remain absent. Direct page still returned 402.

Remaining boundary: The full published combined Main + Teeny cost table is recovered and attributed. Per-level separate main/teeny allowances, AP caps and controlled current-Steam confirmation remain unverified; no interpolated calculator is supplied.

Inspected evidence: https://www.trueachievements.com/game/Kingdom-Hearts-3/walkthrough/20

### KH3-029 — partial

Inspected additional 2025/2026 player discussions and Game8’s photographed Premium menu guide. They establish selection/unlock flow but no controlled Steam code-by-achievement matrix. One historical Master Chef success report does not identify current Steam or every enabled code. Do not universalize it.

Remaining boundary: Consulted Premium Menu and guide describe restrictions but do not establish a modern Steam per-achievement code eligibility matrix or persistence for every previously activated code. Community Steam replies contradict each other and even mention a nonexistent Critical achievement; those claims were rejected.

Inspected evidence: https://www.reddit.com/r/KingdomHearts/comments/1lhdq1u/, https://www.reddit.com/r/KingdomHearts/comments/1uc51ys/, https://www.reddit.com/r/KingdomHearts/comments/eub3sb/, https://game8.jp/kh3/315416

### KH3-030 — conflicted

Read firsthand score reports in Regarding PRO Code Merits: a player reports B at 363,500 and lists repeatable fights after Secret clear. That provides an upper observation, not the B minimum. The Japanese Premium table leaves B blank and disagrees elsewhere; rejected as boundary authority. B 320,000 versus 325,000 remains unadjudicated.

Remaining boundary: KHWiki annotates B at 320,000 with uncertainty, TrueAchievements indexed walkthrough says 325,000. Direct walkthrough 403. Best-score replay replacement/eligibility is not fully established; no calculator assumes disputed rank or unsupported overwrite logic. Rounding is not a gap for listed integer-star/base-score combinations.

Inspected evidence: https://gamefaqs.gamespot.com/boards/718920-kingdom-hearts-iii/78357176?page=3, https://wikiwiki.jp/kh-3/PREMIUM%20MENU

### KH3-032 — partial

Steam’s official store confirms 51 achievements and bundled DLC. SteamDB’s freshly readable public depot branch supplies build 14790811, built June 21 and published July 4, 2024, recorded with explicit mirror provenance. Current Steam build metadata is no longer wholly missing; future editions and Epic/console equivalence are not inferred.

Remaining boundary: Current public Steam build metadata is documented from SteamDB, not an installed executable or direct Steam API. Epic achievements, per-platform equivalence and future/cloud transfer procedures remain unverified and are not current Steam acquisition requirements.

Inspected evidence: https://steamdb.info/app/2552450/depots/, https://store.steampowered.com/app/2552450/KINGDOM_HEARTS_III__Re_Mind_DLC/

## Evidence access and remaining work

This pass did not have an installed Steam save or implementation dump for controlled boundary experiments. Exact Flan equality, Forest Clasp cutoff, PRO B threshold, medal weights, reset timers and achievement/code/save matrices therefore remain uncertified. Community guide agreement is not a substitute for those tests. Historical console observations are attributed and do not certify every Steam save edge.

The follow-up below exhausts the 59-page ingredient index that was still feasible at the earlier checkpoint. Exact coordinates beyond the published landmark routes remain unverified. First-visit chest gates still need item-specific evidence. The TrueAchievements direct page returned HTTP 402, but its complete indexed 99-row combined-cost table was obtainable and extracted. Its Xbox provenance and combined budget unit prevent using it as an exact Steam main-ship/AP calculator.

The Game8 sphere marker screenshot was visually inspected; it shows the gold sphere selected on the region embark map. Semantic targeting directions avoid inventing Steam button glyphs. Unused code-only medal variants are excluded; obtainable variants follow the existing equipment collection pattern and unknown roll probabilities remain explicit. All stable pre-existing IDs remain, and Data Jiminy is unchanged.

## Validation

Canonical JSON is directly maintained; there is no KH3 generator. Focused KH3 content and shared multi-game schema tests verify category/ID integrity, canonical recipe references, medal pool associations, one-time sphere quantities, copy recovery and the combined-budget unit boundary. Final results and checkpoint SHA are reported to the integration coordinator; the coordinator owns full build and integration.

Final focused validation: **14/14 tests passed** (six KH3 content tests and eight shared multi-game schema tests). Stable-ID comparison against initial scope checkpoint `4780580` retained all **1926** original entries and added **28**; recipe actions remain **286**. Ledger status counts were recomputed and match all 35 findings. `git diff --check` passed.

## Complete ingredient-page follow-up

The integration coordinator requested exhaustion of the accessible ingredient pages before merging. Inspected all **59** individual pages linked by the ingredient index; the earlier six are retained, and all remaining **53** were read. Beef, Cloves and Orange initially returned HTTP 406, then loaded successfully on direct retry. Added **151** further route groups (including Blackberry’s alternative minigame route), bringing the canonical total to **172 groups across all 59 ingredients**. Groups can describe several nearby nodes; this is not a count of physical harvest spots. No extra collection IDs or recipe actions were introduced.

The routes cover described cupboards, benches, rooftops, hidden rooms, vending machines, crates, herbs, mushrooms, water bubbles, submerged shells and fish shoals. Alternative sources include Filet Mignon from successful cooking and fruit/vegetable rewards in 100 Acre Wood. Eight reward-only ingredients now carry direct minigame approach routes. Existing quantity tables, shop tiers and Flan uncertainties remain; observed screenshot quantities and untested equality claims were not promoted to facts. Obvious guide location typos (such as calling Door Vault’s Lower Level the Power Plant) were not copied. The source roster and paraphrased route groups are in `ingredient-route-expansion-2026-10-02.json`; all 59 final ingredient IDs and totals are in `gap-integration-2026-10-02.json`.

This completes extraction of the named accessible ingredient source set. It does not certify a physical node census, timer, spawn distribution or Harvest-free base yield. KH3-015 remains partial for those exact boundaries, so overall disposition stays **13 partial / 19 resolved / 3 conflicted**.

Follow-up validation: **15/15 tests passed** (seven KH3 content and eight shared schema tests). The added regression checks all 59 ingredient routes have sources and valid directions, preserves the 172-group count, and covers hidden-room/rooftop and minigame alternatives. `git diff --check` passed. Canonical count remains 1954 entries / 286 recipe actions; ledger remains 13 partial / 19 resolved / 3 conflicted.
