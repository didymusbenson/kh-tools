# Melding and ability audit

## Existing evidence reused

The full KHBBS workbook was read, including blank tails: `command_melding!A1:Y990`, `Synthesis!A1:Z999`, `Sheet3!A1:B1000`. Actual occupied counts are 298, 10 and 151 rows. The first tab contains **296 outcome rows**, not 297; its other two rows are headings. The catalog has 150 entries; synthesis has nine materials and no filled location cells.

The existing `khbbs_command_melding_reference.json` was read in full (8,669 lines / 249,601 bytes). Its 296 outcome rows and 16×7 matrix are reused in [the audited copy](melding-reference.json). No Library original was changed. The repository seed/UI were also read: the seed reproduces the old wide model; the script builds source-command lists, and the page is an unfinished melding mockup. Neither proves a working solver.

## Source conflicts that block trustworthy answers

| ID | Finding | Required treatment |
|---|---|---|
| BBS-MELD-01 | Legacy recipe letters differ from the current reference. Legacy B maps to current M; legacy E maps to current B. Legacy G uses “Luck Boost.” | Treat type labels as source-local IDs. Never mix the old recipe rows with the new ability matrix. Preserve original labels for provenance. |
| BBS-MELD-02 | [Command Meld](https://www.khwiki.com/Command_Meld) and the user reference claim Aerora 3 + Aerora 3 → Mine Square, alongside Aeroga/Tornado outcomes. That yields 200% per character. [Mine Square](https://www.khwiki.com/Mine_Square) instead lists Aerora 3 + Ignite 3, matching the legacy sheet. | Quarantine zero-based row 90. Candidate correction is the Ignite ingredient; confirm against an independent modern source before certification. |
| BBS-MELD-03 | Stun Edge 3 + Magnera 3 has Collision Magnet twice, at 80% and 20%, in the current aggregate source/reference. [Collision Magnet](https://www.khwiki.com/Collision_Magnet) lists 80%; [Magnet Spiral](https://www.khwiki.com/Magnet_Spiral) lists the 20% alternative. | Quarantine row 182. Preserve the likely Magnet Spiral correction as evidence, rather than silently replacing source data. |
| BBS-MELD-04 | Crystal source sheet lists Spiderchest under Fleeting; the inspected [Fleeting page](https://www.khwiki.com/Fleeting) omits it. | Resolve from enemy drop table before including that farm. |

The mechanical audit grouped by character plus unordered ingredient+level pairs: **465 groups, three 200% groups**, all from BBS-MELD-02. Other base-rate groups sum to 100%, which does not prove their output names are correct (BBS-MELD-03 demonstrates this). There are 99 distinct result names, not a complete command catalog.

## Solver contract

Inputs: character; two command IDs and current levels; owned copies of movement/defense commands; optional crystal; already-obtained rare Shotlocks. Outputs: all eligible outcomes, probability, attached ability, consumed copies and unmet conditions. Preserve minimum ingredient levels per recipe; do not use blanket “master both.” The reference says ingredient order is interchangeable. Movement/defense ingredients require retaining another copy. Recipe items reveal menu results but are not crafting permission gates. Basic/Advanced/Ultimate command classes and A–P ability mappings are different dimensions; BBS does not use DDD Spirit ranks.

Shotlock results cannot receive abilities. Once Bio Barrage, Lightning Ray or Meteor Shower has been obtained, the corresponding rare-result footnotes set that Shotlock outcome to zero and promote the normal result to 100%. Model the ownership condition explicitly; do not drop it when normalizing percentages. No-crystal random ability chances by combined level are 10% (≤4), 20% (5), 30% (6), 40% (7), 50% (≥8). Source rules: [Command Meld](https://www.khwiki.com/Command_Meld) and the preserved user artifact.

The 112 standard crystal/type mappings are in the JSON. [ability-stacks.csv](ability-stacks.csv) records 30 ability entries: 28 meldable types plus Scan and Zero EXP. Level the command carrying an ability to maximum to keep the ability after removing the command. Stack caps are ability-specific; ownership, attached ability, learned permanent ability and enabled stacks need distinct fields. [Abilities](https://www.khwiki.com/Abilities_(KHBBS)).

## Grounded evaluation cases

| Question / input | Expected behavior |
|---|---|
| Fire 2 + Fire 2 + Fleeting, any character | Fira, 100%, Magic Haste; type A in the reused reference |
| Fire 3 + Fira 3, Terra vs Aqua | Terra: Firaga 100%; Aqua: Firaga 90%, Raging Storm 10% |
| Aero 2 + Aero 2, Ventus | Aerora 95%, Tornado 5%; do not promise Aerora |
| Which crystal attaches Second Chance? | Pulsing with type N or P; select an eligible character recipe, then check level/copies |
| Which crystal attaches Once More? | Wellspring with type M or O |
| Can a crystal attach an ability to a rare Shotlock? | No |
| Why is Aerora + Aerora inconsistent? | Explain the quarantined Mine Square row; do not combine it into a 200% answer |
| I only have one Block | Explain the retained-copy requirement before allowing a meld |

Remaining acquisition work: modern HD command catalog, every chest/shop/board/event/drop route, command shop levels and unlocks, D-Links, Shotlocks, complete CP curves, Chaos/Secret Gem random ability distribution, and all character/version exceptions. A 296-row recipe list does not close those gates.
