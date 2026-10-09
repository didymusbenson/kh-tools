# KH1 world groups and inline Trinity marks

- Ansem’s Reports and Dalmatians now use one alphabetical world heading above compact rows. Report labels are `Report N`; puppy rows retain their canonical group numbers and location. Canonical names remain in detail views and checkbox accessible names.
- Grouping is a presentation projection: source records, IDs, acquisition aliases, instructions and saved checks are unchanged. All 13 reports still represent 10 collection actions because the Library reports share an acquisition.
- Pagination budgets one measured row slot per heading and per entry. A heading always has a row; long groups continue with a repeated world heading on the next page. An exceptionally short leaf scrolls its minimum heading + entry chunk instead of hiding content. Hidden full-catalogue measurement stabilizes capacity as later location names wrap.
- Trinity rows use the five original transparent Re:Collection Minimal PNGs inline before world and location, with no color subtitle. Link and checkbox accessible names and image tooltips retain color. The White mark alone has a subtle CSS drop shadow after desktop/phone contrast review. The original files are unchanged; provenance is in the asset README. The existing service-worker asset glob precaches them.
- Book leaves, bindings, native fonts, filters, collection accounting, Undo and persistence retain their existing behavior.

## Coverage

- Five world-group unit cases cover canonical identity, numeric order, unknown metadata, empty and filtered groups, capacities 0–100, and exact-once pagination.
- New browser coverage crawls all 13 reports and 33 puppy groups without deduplication at 320×568, 390×844, 844×390 and 1440×900. It checks world membership/order, no orphan headers or clipping, equal facing leaves, filter counts, shared acquisition behavior, empty worlds, Undo/reload and keyboard return focus.
- Existing Trinity browser coverage retains exact-once checks for all 46 marks under all sort modes, combined filtering, independent saved checks and Undo. Added coverage verifies loaded original icons, accessible color names, absence of subtitles, compact inline geometry, hover/focus/selection, and five-color desktop/phone visual captures.
- Validation: production content/type/build checks, application unit suite, Python pack/seed tests, full desktop/mobile browser suite, GitHub CI, and exact-revision Pages verification are the release gates. Heavy model acceptance remains the existing separate opt-in check.
