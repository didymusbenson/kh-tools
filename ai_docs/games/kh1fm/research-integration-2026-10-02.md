# KH1 practical research integration — 2026-10-02

User requested integration of the background findings. Practical guidance is now supplied; residual precision/provenance is retained in [future improvements](future-improvements.md). Evidence totals: **14 closed, 6 partial, 0 unresolved**. Of the six partial families, five are deferred (003, 010, 014, 018, 020) and 005 is dropped from scope. No active family remains in this reviewed research scope. This is not a claim of exhaustive verification or completed app release acceptance.

## Unknown and Report 13 (002)

Use the first End of the World cutscene: exit the arrival tunnel, then return to Castle Chapel. [KHGuides](https://www.khguides.com/kh/combat/bosses/unknown/) states the cutscene trigger; [HD troubleshooting posts 6–9](https://gamefaqs.gamespot.com/boards/684080-kingdom-hearts-hd-15-remix/68885972) distinguish landing from exiting the tunnel. Focused guide and troubleshooting evidence supersede broad sealing-Hollow-Bastion/Final-Rest claims. Boss and report entries now agree. No binary testing claimed.

## Vine courses (014)

Integrated the shared platform route: first chain; left; straight; right into Vines 2; cross ahead; turn around/remount the last vine and continue to the finish ivy. [ElectroSpecter FAQ](https://gamefaqs.gamespot.com/ps4/200737-kingdom-hearts-hd-i5-plus-ii5-remix/faqs/19404) is a 2009 original PS2 guide despite its PS4 listing, recovered through indexed text. [HD video description](https://www.youtube.com/watch?v=SLc6wruUjAk) covers all four courses at 28:09, 29:34, 31:25 and 32:52; earlier research incorrectly described it as first-course-only evidence. Description inspected, not frames. [HD discussion](https://gamefaqs.gamespot.com/boards/684080-kingdom-hearts-hd-15-remix/67313767) identifies the ivy finish and Glide bypass. No independently checked modern per-vine layout claimed.

## Berserk and MP Haste (018)

Berserk retains +4 Strength and adds reported max-HP-dependent thresholds. [HD mechanics research](https://www.reddit.com/r/KingdomHearts/comments/1l959or/i_casually_changed_the_way_we_understand_khfm/) attributes the rule to Ultimania without a scan/page: max HP above 40 uses below 20%; below 40 uses 8 HP or less; exactly 40 is omitted. [Rinoa’s Diary](https://www.rinoadiary.it/soluzione/kingdom_hearts/index.php?page=testo_menu_comando) independently describes the flashing red HP warning and alarm below 20%, but does not establish the low-max-HP exception or prove the exact Berserk predicate. Numeric copy is explicitly reported; unresolved max-40 behavior remains explicit. MP Haste stays qualitative under the user's documented judgement call.

## Trinity qualifiers (020)

| Legacy clause | Resolution | Evidence |
|---|---|---|
| Merlin near save point | Accept; Magician’s Study near save station | [KHGuides](https://www.khguides.com/kh/collectibles/trinities/) |
| Wonderland after defeating Queen | Supersede with after trial and tower battle | [HD/FM Trinity guide](https://www.destinyislands.com/kh-fm/collectables/trinity-marks/), [Wonderland walkthrough](https://www.khguides.com/kh/wonderland/) |
| Grand Hall to Dungeon; Beast alternative | Start at Entrance Hall via Emblem door; red direction selector for descent, separate blue activation crystal; Waterway platform to Dungeon. Beast wall alternative valid; return with Donald and Goofy. | [HD Prima guide, steps 3 and 6–7](https://primagames.com/eguides/kingdom-hearts-hd-15-remix-eguide/khfm-walkthrough/hollow-bastion/hollow-bastion), [HD guide, Lift Stop visit 2](https://gamefaqs.gamespot.com/ps3/684080-kingdom-hearts-hd-15-remix/faqs/77742/hollow-bastion) |

The reproducible semantic audit now contains 467 accepted, 279 superseded and 41 rejected clauses; no unverifiable Trinity qualifier remains. Exact Steam executable provenance remains optional future work.

## Validation

Collectible and reference importers, content generation and both legacy audits passed. All 1,259 entry IDs and 33 recipes are unchanged; exactly ten intended entries changed. Three content tests passed. The refreshed empty Jiminy pack validates against the current data hash with zero thoughts; existing SQLite bytes were preserved. Whitespace checks passed. No full UI/device acceptance run was performed for these content changes.
