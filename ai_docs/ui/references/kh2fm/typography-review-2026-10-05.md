# KH2 journal typography review

Reviewed 2026-10-05. Research-only evidence; these PNGs are not runtime assets.

## Recommendation

Make two narrowly scoped type corrections, retaining the current layout and existing body/menu aliases:

1. Use the already-vendored **KHGummi** display face for `.kh2-watermark` only. The in-game `JIMINY'S JOURNAL` watermark has the same heavy, wide, forward-slanted construction visible in the specimen. Use regular/normal styling with no synthetic italic, bold, or added skew; the slant is in the glyphs. Check its ink height and available horizontal space at desktop/mobile sizes.
2. Use the existing **KH2Menu** (Chakra Petch) face for `.kh2-cover .kh2-world-summary .kh1-note-flow`. The Hollow Bastion cover's green Summary panel uses upright squared UI lettering, unlike the handwritten text on the cream paper pages. The implementation currently inherits KH2Hand/Itim there. This is a role correction using an existing approximate substitute, not a claim that Chakra is the exact game font. Set the family on the continuation flow without changing its columns, pagination, data, or geometry.

Keep the other KH2 font choices unchanged in this pass. Do not redefine KH2Menu or KH2Hand, and do not change controller/cursor icons or other game families.

## Component-specific observations

| Component | Evidence | Decision |
| --- | --- | --- |
| `.kh2-watermark` | Green display lettering in all three captures; heavy, low, built-in forward slant, squared geometric forms | KHGummi normal/400, isolated to this display label |
| `.kh2-header-controls > a`, `.kh2-header-controls > h1` | `Collection`, `Select World`, `Hollow Bastion` are compact, upright squared lettering | Retain KH2Menu/Chakra at current metrics; no italic/bold substitution |
| `.kh2-ribbons > a`, `.kh2-ribbons > span` | `Synthesis Notes` and `The Nobodies` use the same upright chrome role | Retain current family; KHMenu regular is a useful candidate, but broader/heavier at natural metrics |
| `.kh2-footer > span` | Both wide captures have squared upright white guidance text, distinct from paper | Retain KH2Menu; no body-font substitution |
| `.kh2-cover .kh2-index-row > a` | `Characters`, `Story`, `Album`, `Treasures`, `Maps`, `Character Links` on the burgundy cover are squared UI text | Existing menu family is the right role; keep it |
| `.kh2-cover .kh2-world-summary > h2`, `.kh2-world-objective`, its label | Hollow Bastion `Summary` and `Objective` labels and objective sentence are upright UI text | Existing menu family is the right role; keep it |
| `.kh2-cover .kh2-world-summary .kh1-note-flow` | Hollow Bastion's green panel paragraph is squared UI text, not handwriting | Override only this flow to KH2Menu |
| Cream `.kh2-leaf`, `.kh2-index-row`, `.kh1-note-flow`, paper headings and descriptions | Synthesis `Moogle Level 9`, counters, Dragoon name and descriptive prose are round handwritten lettering | Keep KH2Hand/Itim for now; do not spread chrome font onto paper |
| Form controls, farming controls, save utilities and other app-added UI | Not represented in these game captures | Leave unchanged |

The green world-summary exception is tied to the world-cover context. Do not globally change `.kh1-note-flow`, a shared continuation mechanism. The existing world-objective panel already uses KH2Menu. Do not change text contents or the component hierarchy to obtain these type changes.

## Candidate comparison

`kh2-font-specimens-2026-10-05.png` shows actual capture crops next to local font specimens. Candidate samples use approximately equal capital ink heights and retain natural widths, so a broader family is not silently condensed to appear closer.

- **KHGummi:** Strongest match for the display watermark. Its mixed-case/alphabet construction is not appropriate for paragraphs or normal chrome. The current italic Chakra watermark is visibly less specific.
- **KHMenu regular:** Squared character design is relevant to the chrome, but the natural sample is wider and heavier than the supplied `Collection`/`Synthesis Notes` pixels. A normalized `Collection` specimen has an approximately 7.44 width-to-ink-height ratio, versus 6.33 for the bright source pixels. The current Chakra specimen is approximately 6.31. These simple ratios support caution, not exact font identification; shadows, filtering, raster size, and capture scaling differ.
- **KHMenu italic/bold/bold italic:** Not supported for ordinary chrome. The reference chrome is upright. The heavier variants move farther from its light strokes; the italic variants introduce an absent slant.
- **Aldrich:** Squared and lighter than KHMenu, but still wider than the current compact chrome. No sufficiently clear overall improvement justifies another family in this restrained pass.
- **Coda / Titillium Web:** Compact, but more conventionally rounded and less specifically squared than the chrome. They do not improve the handwritten paper role.
- **Itim:** Existing rounded handwritten approximation is the correct paper-text role, though its strokes are visibly heavier and more playful than the game sample.
- **Comic Hearts:** The local specimen is visually closer to the light handwritten `Moogle Level 9` paper sample. Do not promote it to runtime based on that alone: the available font lacks curly apostrophes U+2018/U+2019, ellipsis U+2026, en/em dashes, middle dot, and accented e. Its redistribution terms also require separate verification. Leave body text unchanged rather than introducing coverage failures or mixing fallback glyphs in this pass.

## Source provenance

The user supplied these three PNG attachments on 2026-10-05 with the description, “here are a few grabs from the kh2 journal in-game,” during a request for restrained, game-accurate typography. They were materialized from those attachments and copied byte-for-byte here. No external source, edition, platform, capture method, or original capture date was asserted; the user identified them as KH2. Placement under the existing KH2FM research directory is organizational, not verification that a particular release produced the captures.

Game imagery remains the property of its respective rights holders. These files are retained as research references; do not package them as application assets.

| Saved file | Original attachment name | Dimensions | SHA-256 |
| --- | --- | --- | --- |
| `user-kh2-synthesis-notes-2026-10-05.png` | `image(10).png` | 754 × 424 | `f0fbc7277b6fb0072ce4a8ca97fbd9fd4531684835eb38b07231f3888596baae` |
| `user-kh2-nobody-dragoon-2026-10-05.png` | `image(20261005-180013).png` | 739 × 415 | `b16c68c79f2ca731d1f206c7f78d74385fa31d059b9342e6723bae19f1f22ffd` |
| `user-kh2-hollow-bastion-cover-2026-10-05.png` | `image(20261005-180014).png` | 480 × 640 | `1dde9ed5d5f45c1508000421a40372f3ca4f698d8b3c01b8dad63cb6d6c15720` |

The tall Hollow Bastion capture contains a central game viewport surrounded by blurred extensions. Judge the type from the sharp central viewport, not the blurred top/bottom areas. The two wider captures offer stronger paper/chrome comparisons at their native resolution.

The derived specimen PNG was created for this review from these captures and the existing local research fonts; its crops are enlarged for inspection. It is not a screenshot of a modified application and is not a claim of original font identity. SHA-256: `da82ac6e368db5b57dee5bf974d7ba973b0a2a7a54410a8c906a449ede48431d`.

KHGummi and KHMenu specimens: Televo / Kingdom Hearts Re:Collection. See the existing runtime font provenance in [`public/assets/journal-fonts/README.md`](../../../../public/assets/journal-fonts/README.md). The review used local research copies of Aldrich, Coda, Titillium Web, Comic Hearts, and existing Chakra/Itim files; it does not grant or assert new font licensing rights.
