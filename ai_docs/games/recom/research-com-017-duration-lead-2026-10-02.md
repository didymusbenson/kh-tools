# COM-017 — Remake duration evidence recovered from Ultimania

Inspected 2026-10-02. Scope: the remaining basic-card/higher-tier duration questions encountered while researching COM-005–007. This is visual inspection of the Japanese PS2 **Re:Chain of Memories** section of *Kingdom Hearts II Final Mix+ Ultimania*, publicly hosted by KH13. It is primary remake guide evidence, **not a Steam timing measurement or an executed gameplay test**. The source's `約` means **approximately**; preserve that qualification in user-facing copy.

## Published duration table

| Technique / card | Guide duration, Lv1 / Lv2 / Lv3 | Additional qualification | Evidence |
|---|---|---|---|
| Stop / Stopra / Stopga | Approximately 3 / 5 / 7 seconds | These are the published technique durations; the page does not establish every enemy's resistance or modifier behavior. | [p.395](https://www.kh13.com/gallery/image/18631-kh2fm_ultimania_395/) |
| Splash / Dumbo | Approximately 5 / 10 / 10 seconds | Lv3 raises flight height and per-hit power to 2.0; its hit range is described as the same as Lv2. Do not imply that stacking a third Dumbo extends duration again. | [p.400](https://www.kh13.com/gallery/image/18624-kh2fm_ultimania_400/) |
| Twinkle / Tinker Bell | Approximately 3 / 4 / 5 seconds | Base recovery is approximately 7% / 13% / 22% of maximum HP. Each reaction-button press during the prompt adds approximately 0.5% / 1% / 1.5% of maximum HP, respectively. These are healing increases, not extensions to the timer. | [p.400](https://www.kh13.com/gallery/image/18624-kh2fm_ultimania_400/) |
| Flare Breath / Mushu | Approximately 11 seconds at each level | Ends earlier after 10 / 23 / 35 fireballs, respectively. Lv2 and Lv3 inherit Lv1's basic behavior while increasing shot allowance. The page's explanatory box explicitly warns that their timer can expire before all shots are fired. | [p.401](https://www.kh13.com/gallery/image/18622-kh2fm_ultimania_401/) |
| Goofy Tornado / Goofy | Approximately 3 / 5 / 7 seconds | Per-hit power is 1.5 / 2.0 / 2.5, respectively. The missing base and higher-tier durations now have a primary remake publication source. | [p.402](https://www.kh13.com/gallery/image/18621-kh2fm_ultimania_402/) |
| Hummingbird / Peter Pan | Approximately 7 / 9 / 11 seconds | Repeated reaction input speeds Peter Pan's actions and yields a small Moogle Point orb on each hit; this does not establish extra seconds. Japanese technique name is スラストラッシュ; recipe, character and effects identify the localized Hummingbird rows. | [p.404](https://www.kh13.com/gallery/image/18602-kh2fm_ultimania_404/) |

## Bambi is bounded by actions, not a published timer

[Page 401](https://www.kh13.com/gallery/image/18622-kh2fm_ultimania_401/) describes Paradise at every level as **three hops followed by a final landing**. Orbs appear at each hop and the final landing: four release events, three orbs per event, twelve total. Lv1 produces small HP orbs; Lv2 and Lv3 produce large HP orbs. Lv3 additionally stuns an enemy Bambi tramples. Each tier lists 0.1 power per hit. No duration in seconds is printed.

The existing base-card `orbOutput.jumps: 4` conflates release events with hops. Replace it with `hops: 3` and `releaseEvents: 4`, retaining `orbsPerJump` only if renamed to `orbsPerRelease`. The twelve-orb total is corroborated by this primary page. Its table does **not** state the number of HP restored per orb, so retain that separate claim's existing source rather than attributing it to this page.

## Suggested integration

- Add the appropriate page URL to each affected card and sleight's `sources` and duration evidence. A `durationSeconds` numeric field can hold the published number only with explicit approximate precision and source-edition metadata; prose should say “about.”
- Add Goofy base duration 3 and Goofy Tornado Lv2/Lv3 durations 5/7. Add Splash Lv3 duration 10. Qualify already-present Dumbo, Tinker Bell, Mushu, Peter Pan and Stop-family seconds as approximate guide values.
- Correct Mushu's basic `effect`: stacking increases the **shot allowance**, not the published time limit. Correct Dumbo copy so it does not imply Lv3 lasts longer than Lv2.
- Correct Bambi's hops/release-event representation; show its finite action sequence and orb output without inventing seconds. Higher-tier Paradise copy can state twelve large HP orbs.
- Replace the audit claim that exact Bambi/Goofy base and higher-tier durations remain unproved with the narrower outcome: published approximate remake durations recovered; Bambi's finite action sequence recovered, with no source-published second count.

## Remaining limits and disposition

This closes the practical **published-duration extraction** lead for the named cards. It does not establish exact engine frames, timing boundaries around summoning/ending animations, interruption behavior, every modifier, or whether a Steam port changed a value. Bambi's elapsed seconds remain unstated by this source; its three-hop/final-landing sequence is sufficient to describe the source-backed behavior. Do not turn these limits into a requirement that the user performs a playthrough: the shared testing policy permits cited research and honest remaining precision limits.

This note alone does not certify every field under the broader COM-017 basic-card-effects audit. Reconcile the current structured records before changing that entire audit item's disposition. No JSON files, shared audit files, game execution, commits or pushes were performed by the duration-lead subagent.

## Integration outcome

The parent pass integrated these findings into `other-cards.json`, `sleights.json` and generated runtime notes. All 18 base/tier durations carry approximate precision and original-remake edition metadata. Bambi's structure now distinguishes three hops from four release events. COM-017 remains partial only for exact timing boundaries and Bambi's unprinted elapsed seconds; no additional user gameplay is required.
