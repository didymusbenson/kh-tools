# Practical farm coverage and research scope — October 2, 2026

COM-001 and COM-002 are closed for the journal's product scope following the user's direction. COM-003 is now closed for practical farming coverage. This supersedes the three partial statuses in the earlier [research pass](research-com-001-003-2026-10-02.md); it does not claim that the remaining internal mechanics were discovered.

| Item | Why we need this | What we have already | Closure decision |
|---|---|---|---|
| COM-001 | Help players choose a pack for an unlocked card and useful values. | Prices, stock, identity/value distributions, conditional Premium odds and assorted selection. | Product need met. Exact locked-pool selection code is optional research. Do not display conditional odds we cannot calculate. |
| COM-002 | Help players understand Riku's current preset and temporary card availability. | Twelve ordered presets, corridor applicability, retained boss acquisitions and Dark Mode item removal. | Product need met. Exact scripted tutorial inventory and retained-card insertion order are optional research. Preserve existing tutorial guidance. |
| COM-003 | Give every farmable card a place to go, an encounter to enter, a finish condition and a way to try again. | All 30 targets now have complete `farmRoute` records and runtime guidance, including fallbacks. | Practical coverage closed. Complete formation databases and optional RNG determinism are not required to collect the cards. |

Current register: **18 closed (15 supported, one false gap, two product-scope decisions), nine partial, two open, three non-factual limitations**. COM-005 remains the separate question of independent rate corroboration.

## What changed for players

Every Sora random enemy-card entry now offers a suggested world and room, an encounter hint, instructions for leaving the intended species until last, a retry method, and an alternative when the generated encounter does not match. The source of a field encounter is distinguished from the species being farmed: a Shadow, for example, can start a battle containing another target.

The routes use ordinary combat. They do not require Warp, a postgame enemy card, a precise deck, or a dodge-roll recipe. The three existing optional manipulation recipes remain separate. Sleeping Darkness supplies the published encounter leads; ordinary grinding alternatives use eligible Darkness rooms in the same known world. A Darkness multiplier is never attributed to Sleeping Darkness itself.

If a target is absent, finish that battle and try another; create a new room when exhausted. This avoids advising Escape on a No Escape run. Saving beside the farming room preserves a retry point. A repeated outcome after reloading is a reason to change actions or use another encounter, not evidence that another identical reload must eventually work. Save successful drops before further resets.

Special cases are handled explicitly:

- White Mushroom and Black Fungus use White Room and Black Room with their own success conditions. Neither is routed to a Darkness room for a multiplier.
- Barrel Spider retries preserve intact props; merely leaving and re-entering does not restore destroyed barrels. Defeat it before self-destruction.
- Soldier uses Traverse Town. No route depends on the disputed Neverland/Crescendo footnote.
- Defender/Wyvern advice warns that the reported encounter varies; Neoshadow advice accounts for its later wave.
- Crescendo summons must be removed before finishing Crescendo. Aquatank advice avoids Thunder because its remake resistance table lists absorption.
- The source gives only a positional encounter hint for Screwdiver, Aquatank, Wight Knight and Gargoyle. Their `fieldEnemy` values are deliberately null rather than invented.

## Evidence and limits

The [BlankRange guide](https://gamefaqs.gamespot.com/ps2/954016-kingdom-hearts-rechain-of-memories/faqs/81607), version 1.02, was reread in full for encounter destinations. It transcribes DERIKUF's videos, so those are one source lineage. Only destination hints are used for the new manual routes; the guide's recipes are not copied wholesale. The source's “Screwdriver” and “Neo Shadow” labels are normalized to the journal's Screwdiver and Neoshadow identities.

Each chosen world is checked against that enemy's existing edition-selected world list. Existing [Enemy Card](https://www.khwiki.com/Enemy_Card) rules supply the final-enemy and eligible room principles. [Steam players](https://steamcommunity.com/app/2552430/discussions/0/4515505458306858761/) report both manual farming and successful manipulation, with failures and retries. The latest single report recommending 60 FPS is not promoted to a universal verified requirement. [Barrel Spider](https://www.khwiki.com/Barrel_Spider), [White Mushroom](https://www.khwiki.com/White_Mushroom), and [Aquatank](https://www.khwiki.com/Aquatank) were reread for their special behavior. Black Fungus's previously sourced success rule is preserved.

The exact named encounter in a recipe may not appear in every generated layout. Player entries say so and provide ordinary grinding alternatives. Suggestions for choosing rooms and varying a failed manual attempt are practical synthesis of the cited rules, not a newly measured optimal route. There is no guaranteed number of attempts, no claim of independent Steam execution, and no silent upgrade of the base drop-rate evidence.

An exhaustive formation table, exact spawn probabilities, and resolution of an unused Soldier route remain optional research notes. They do not block the supported route for any of the 30 required targets.

## Validation

The builder preserves all 431 journal entries and both collection denominators. The focused test covers all 30 routes, source propagation, campaign isolation, special mushroom rooms, intact-barrel resets, safe Soldier routing and unknown field species. Validation passed: all 20 Re:CoM tests, `npx tsc -b`, the 431-entry content build and `git diff --check`.
