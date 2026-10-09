/** Keep an inventory family together, budgeting one row for its heading.
 * A family larger than the viewport gets its own scrollable page, never a split.
 * Input order (including rank order within each family) is preserved.
 */
export function materialFamilyPages<T>(items: readonly T[], capacity: number, familyOf: (item: T) => string): T[][] {
  const families = groupMaterialFamilies(items, familyOf);
  const pages: T[][] = [];
  let page: T[] = [], weight = 0;
  const limit = Math.max(1, capacity);
  for (const {items: group} of families) {
    const nextWeight = group.length + 1;
    if (page.length && weight + nextWeight > limit) {
      pages.push(page);
      page = [];
      weight = 0;
    }
    page.push(...group);
    weight += nextWeight;
  }
  if (page.length) pages.push(page);
  return pages.length ? pages : [[]];
}

export function groupMaterialFamilies<T>(items: readonly T[], familyOf: (item: T) => string): {family:string; items:T[]}[] {
  const families = new Map<string, T[]>();
  for (const item of items) {
    const family = familyOf(item);
    const group = families.get(family) || [];
    group.push(item);
    families.set(family, group);
  }
  return Array.from(families, ([family, items]) => ({family, items}));
}
