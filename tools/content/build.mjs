import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { createHash } from "node:crypto";
const root = new URL("../../", import.meta.url);
const read = async (path) =>
  JSON.parse(await readFile(new URL(path, root), "utf8"));
const collections = await read("data/kh1fm/collectibles.json");
const reference = await read("data/kh1fm/reference.json");
const recipes = await read("data/kh1fm/recipes.json");
const entries = [...collections, ...reference];
const ids = new Set();
const failures = [];
for (const entry of entries) {
  if (!entry.id || ids.has(entry.id))
    failures.push(`Duplicate/missing entry ID: ${entry.id}`);
  ids.add(entry.id);
  for (const key of ["name", "category", "summary", "instructions"])
    if (typeof entry[key] !== "string" || !entry[key].trim())
      failures.push(`${entry.id}: missing ${key}`);
  if (entry.game !== "kh1fm") failures.push(`${entry.id}: wrong game scope`);
  if (!Array.isArray(entry.sources) || !entry.sources.length)
    failures.push(`${entry.id}: missing sources`);
  if (!["verified", "source-backed", "unresolved"].includes(entry.verification))
    failures.push(`${entry.id}: invalid verification`);
  if (entry.verification === "unresolved" && !entry.uncertainty)
    failures.push(`${entry.id}: missing uncertainty`);
  for (const source of entry.sources || [])
    if (!/^https:\/\//.test(source.url) || !source.checkedAt || !source.label)
      failures.push(`${entry.id}: invalid source`);
  for (const asset of entry.media || []) {
    if (
      !asset.id ||
      !asset.alt?.trim() ||
      !asset.provenance ||
      !asset.ruleset ||
      asset.rights !== "approved"
    )
      failures.push(
        `${entry.id}: media missing identity, alt, provenance or approved rights`,
      );
    if (
      !["screenshot", "map"].includes(asset.kind) ||
      !(asset.width > 0) ||
      !(asset.height > 0)
    )
      failures.push(`${entry.id}: invalid media geometry`);
    if (
      !/^(assets|media)\/[a-zA-Z0-9/_\-.]+$/.test(asset.src) ||
      asset.src.includes("..")
    )
      failures.push(`${entry.id}: media must use a safe local asset path`);
    else
      try {
        await access(new URL(`public/${asset.src}`, root));
      } catch {
        failures.push(`${entry.id}: missing media ${asset.src}`);
      }
    for (const point of asset.annotations || [])
      if (
        !point.id ||
        !point.label?.trim() ||
        !Number.isFinite(point.x) ||
        !Number.isFinite(point.y) ||
        point.x < 0 ||
        point.x > 100 ||
        point.y < 0 ||
        point.y > 100
      )
        failures.push(`${entry.id}: invalid map annotation`);
  }
}
for (const entry of entries)
  for (const related of entry.relatedIds || [])
    if (!ids.has(related))
      failures.push(`${entry.id}: unresolved relation ${related}`);
const recipeIds = new Set();
for (const recipe of recipes) {
  if (recipeIds.has(recipe.id)) failures.push(`Duplicate recipe ${recipe.id}`);
  recipeIds.add(recipe.id);
  if (!ids.has(recipe.entryId) || !ids.has(recipe.productId))
    failures.push(`${recipe.id}: missing entry/product`);
  if (!Number.isSafeInteger(recipe.outputQuantity) || recipe.outputQuantity < 1)
    failures.push(`${recipe.id}: invalid output quantity`);
  for (const ingredient of recipe.ingredients) {
    if (!ids.has(ingredient.itemId))
      failures.push(`${recipe.id}: missing ingredient ${ingredient.itemId}`);
    if (!Number.isSafeInteger(ingredient.quantity) || ingredient.quantity < 1)
      failures.push(`${recipe.id}: invalid ingredient quantity`);
  }
}
if (failures.length) throw new Error(failures.join("\n"));
const coverage = [
  ...(await read("data/kh1fm/collectibles-coverage.json")),
  ...(await read("data/kh1fm/reference-coverage.json")),
];
const digest = createHash("sha256")
  .update(JSON.stringify({ entries, recipes, coverage }))
  .digest("hex")
  .slice(0, 12);
const data = {
  schemaVersion: 1,
  game: "kh1fm",
  version: `2026.09.18.${digest}`,
  entries,
  recipes,
  coverage,
};
await mkdir(new URL("public/data/", root), { recursive: true });
await writeFile(new URL("public/data/kh1fm.json", root), JSON.stringify(data));
console.log(
  `Validated ${entries.length} entries, ${recipes.length} recipes, ${coverage.length} coverage groups.`,
);
