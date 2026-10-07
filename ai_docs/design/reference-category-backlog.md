# Reference category selection backlog

Status: intentionally deferred by the user on 2026-10-07; design decision pending.

## REF-01: Category selection and retention

- [ ] Decide whether and how the native Reference index should expose categories such as Weapons, and how category selection should persist across entry visits and bare-route revisits.

The user approved removing `reference category selection survives entry visits and a bare-route revisit` from `tests/e2e/journal-regressions.spec.ts`. This is one scenario definition, formerly executed on desktop and phone. It is not a passing check, a skipped test, or a decision to implement or permanently discard category filters.

The retired journey selected Weapons and Remaining, asserted that every visible entry was a weapon, opened an entry and returned, verified category/status retention, visited Challenges with its own Remaining filter and reload, then revisited the bare Reference route and checked that Weapons remained selected.

Existing Reference world/status filtering, entry-return retention and same-route reload tests remain active. Challenge and Synthesis filter tests remain independent and unchanged.

Resolve this separately from the [synthesis lab design session](synthesis-lab-design-session.md). After agreeing the intended behavior, implement it and restore appropriate desktop/phone acceptance coverage. See the [migration record](../implementation/native-journal-test-migration-2026-10-06.md) for the historical scenario mapping and approved scope of deferral.
