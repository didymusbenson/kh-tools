import type { Recipe } from "./types";
import { MAX_QUANTITY, validQuantity } from "./player";

export interface MaterialRequirement {
  itemId: string;
  name: string;
  required: number;
  owned: number | null;
  used: number;
  missing: number | null;
  crafted: number;
}
export interface CraftRequirement {
  recipeId: string;
  name: string;
  quantity: number;
  planned: number;
  prerequisite: number;
}
export interface PlanIssue {
  code: string;
  message: string;
  itemId?: string;
  recipeId?: string;
}
export interface PlannerOptions {
  inventoryEnabled: boolean;
  routeChoices?: Record<string, string>;
  mode?: "selected" | "first-craft";
}
export interface CraftPlan {
  materials: MaterialRequirement[];
  crafts: CraftRequirement[];
  issues: PlanIssue[];
  valid: boolean;
  inventoryEnabled: boolean;
  provisional: boolean;
  allocationRule: string;
}
export function getMaterialRoutes(recipes: Recipe[], itemId: string): Recipe[] {
  return recipes
    .filter((recipe) => recipe.productId === itemId)
    .sort((a, b) => a.id.localeCompare(b.id));
}
export function recipeRequirements(
  recipe: Recipe,
  quantity: number,
  inventory: Record<string, number>,
  inventoryEnabled: boolean,
): MaterialRequirement[] {
  if (!validQuantity(quantity))
    throw new Error(
      `Craft quantity must be a whole number from 0 to ${MAX_QUANTITY}.`,
    );
  const aggregate = new Map<string, { name: string; required: number }>();
  for (const ingredient of recipe.ingredients) {
    const required =
      ingredient.quantity * quantity +
      (aggregate.get(ingredient.itemId)?.required ?? 0);
    if (!Number.isSafeInteger(required) || ingredient.quantity < 1)
      throw new Error(
        "The recipe contains an invalid or overflowing quantity.",
      );
    aggregate.set(ingredient.itemId, { name: ingredient.name, required });
  }
  return [...aggregate].map(([itemId, value]) => {
    const owned =
      inventoryEnabled &&
      Object.hasOwn(inventory, itemId) &&
      validQuantity(inventory[itemId])
        ? inventory[itemId]
        : null;
    return {
      itemId,
      ...value,
      owned,
      used: owned === null ? 0 : Math.min(owned, value.required),
      missing:
        owned === null
          ? inventoryEnabled
            ? null
            : value.required
          : Math.max(value.required - owned, 0),
      crafted: 0,
    };
  });
}

/** Stable recipe-ID order, depth-first dependencies, and a single shared stock pool. No player state is mutated. */
export function calculatePlan(
  recipes: Recipe[],
  goals: Record<string, number>,
  inventory: Record<string, number>,
  options: PlannerOptions,
): CraftPlan {
  const issues: PlanIssue[] = [];
  const seenIssues = new Set<string>();
  const addIssue = (issue: PlanIssue) => {
    const key = `${issue.code}:${issue.itemId ?? ""}:${issue.recipeId ?? ""}`;
    if (!seenIssues.has(key)) {
      issues.push(issue);
      seenIssues.add(key);
    }
  };
  const byId = new Map<string, Recipe>();
  for (const recipe of recipes) {
    if (byId.has(recipe.id))
      addIssue({
        code: "duplicate-recipe",
        recipeId: recipe.id,
        message: `Duplicate recipe identifier ${recipe.id}.`,
      });
    byId.set(recipe.id, recipe);
  }
  const stock = new Map<string, number>();
  if (options.inventoryEnabled)
    for (const [id, value] of Object.entries(inventory)) {
      if (!validQuantity(value))
        addIssue({
          code: "invalid-stock",
          itemId: id,
          message: `Invalid stock quantity for ${id}.`,
        });
      else stock.set(id, value);
    }
  const materials = new Map<string, MaterialRequirement>();
  const produced = new Map<string, number>();
  const craftCounts = new Map<string, number>();
  let provisional = false;
  const checkedAdd = (a: number, b: number): number => {
    const sum = a + b;
    if (!Number.isSafeInteger(sum) || sum < 0)
      throw new Error("The requested plan exceeds safe calculation bounds.");
    return sum;
  };
  const rowFor = (itemId: string, name: string): MaterialRequirement => {
    let row = materials.get(itemId);
    if (!row) {
      const owned =
        options.inventoryEnabled && stock.has(itemId)
          ? inventory[itemId]
          : null;
      row = {
        itemId,
        name,
        required: 0,
        owned,
        used: 0,
        crafted: 0,
        missing: 0,
      };
      materials.set(itemId, row);
      if (options.inventoryEnabled && owned === null) provisional = true;
    }
    return row;
  };
  const selectedRoute = (itemId: string): Recipe | undefined => {
    const candidates = getMaterialRoutes(recipes, itemId);
    const choice = options.routeChoices?.[itemId];
    if (choice === "gather") return undefined;
    if (choice) {
      const selected = candidates.find((r) => r.id === choice);
      if (!selected)
        addIssue({
          code: "invalid-route",
          itemId,
          message: `The selected synthesis route for ${itemId} is not available.`,
        });
      return selected;
    }
    if (candidates.length > 1) {
      addIssue({
        code: "choose-route",
        itemId,
        message: `Choose one synthesis route for ${itemId}, or choose to gather it. Alternative recipes are not added together.`,
      });
      return undefined;
    }
    return candidates[0];
  };
  const consumeProduced = (
    itemId: string,
    demand: number,
    row: MaterialRequirement,
  ): number => {
    const used = Math.min(demand, produced.get(itemId) ?? 0);
    produced.set(itemId, (produced.get(itemId) ?? 0) - used);
    row.crafted = checkedAdd(row.crafted, used);
    return demand - used;
  };
  const execute = (
    recipe: Recipe,
    quantity: number,
    path: string[],
    reserveOutput = false,
  ): boolean => {
    if (path.includes(recipe.id)) {
      addIssue({
        code: "cycle",
        recipeId: recipe.id,
        message: `Synthesis dependency cycle: ${[...path, recipe.id].join(" → ")}.`,
      });
      return false;
    }
    if (path.length > 100) {
      addIssue({
        code: "depth",
        recipeId: recipe.id,
        message:
          "This synthesis dependency chain is too deep to calculate safely.",
      });
      return false;
    }
    if (
      !Number.isSafeInteger(quantity) ||
      quantity < 1 ||
      !Number.isSafeInteger(recipe.outputQuantity) ||
      recipe.outputQuantity < 1 ||
      !recipe.ingredients.length ||
      recipe.ingredients.some(
        (i) => !Number.isSafeInteger(i.quantity) || i.quantity < 1,
      )
    ) {
      addIssue({
        code: "invalid-recipe",
        recipeId: recipe.id,
        message: `Recipe ${recipe.name} has invalid quantities or no ingredients.`,
      });
      return false;
    }
    if (recipe.verification === "unresolved" || recipe.uncertainty) {
      provisional = true;
      addIssue({
        code: "uncertain-recipe",
        recipeId: recipe.id,
        message: `${recipe.name}: ${recipe.uncertainty ?? "The recipe has unresolved source evidence."}`,
      });
    }
    const nextPath = [...path, recipe.id];
    for (const ingredient of [...recipe.ingredients].sort((a, b) =>
      a.itemId.localeCompare(b.itemId),
    )) {
      const required = ingredient.quantity * quantity;
      if (!Number.isSafeInteger(required))
        throw new Error("The requested plan exceeds safe calculation bounds.");
      const row = rowFor(ingredient.itemId, ingredient.name);
      row.required = checkedAdd(row.required, required);
      const fromStock = Math.min(stock.get(ingredient.itemId) ?? 0, required);
      stock.set(
        ingredient.itemId,
        (stock.get(ingredient.itemId) ?? 0) - fromStock,
      );
      row.used = checkedAdd(row.used, fromStock);
      let remaining = consumeProduced(
        ingredient.itemId,
        required - fromStock,
        row,
      );
      if (remaining > 0) {
        const route = selectedRoute(ingredient.itemId);
        if (
          route &&
          execute(route, Math.ceil(remaining / route.outputQuantity), nextPath)
        )
          remaining = consumeProduced(ingredient.itemId, remaining, row);
      }
      // A missing value is finalized after every demand has used the shared pool.
    }
    craftCounts.set(
      recipe.id,
      checkedAdd(craftCounts.get(recipe.id) ?? 0, quantity),
    );
    if (!reserveOutput)
      produced.set(
        recipe.productId,
        checkedAdd(
          produced.get(recipe.productId) ?? 0,
          recipe.outputQuantity * quantity,
        ),
      );
    return true;
  };
  try {
    for (const id of Object.keys(goals).sort()) {
      const quantity = goals[id];
      if (!validQuantity(quantity)) {
        addIssue({
          code: "invalid-goal",
          recipeId: id,
          message: `Craft quantity for ${id} must be a whole number from 0 to ${MAX_QUANTITY}.`,
        });
        continue;
      }
      if (!quantity) continue;
      const recipe = byId.get(id);
      if (!recipe) {
        addIssue({
          code: "unknown-recipe",
          recipeId: id,
          message: `Unknown recipe ${id}.`,
        });
        continue;
      }
      // Catalog goals need one historical craft; selected-output goals retain their requested products.
      const remaining =
        quantity -
        (options.mode === "first-craft" ? (craftCounts.get(id) ?? 0) : 0);
      if (remaining > 0)
        execute(recipe, remaining, [], options.mode !== "first-craft");
    }
  } catch (error) {
    addIssue({
      code: "overflow",
      message:
        error instanceof Error
          ? error.message
          : "The plan could not be calculated safely.",
    });
  }
  for (const row of materials.values())
    row.missing =
      options.inventoryEnabled && row.owned === null
        ? null
        : Math.max(row.required - row.used - row.crafted, 0);
  const valid = issues.length === 0;
  return {
    materials: [...materials.values()].sort((a, b) =>
      a.name.localeCompare(b.name),
    ),
    crafts: [...craftCounts]
      .map(([recipeId, quantity]) => ({
        recipeId,
        name: byId.get(recipeId)!.name,
        quantity,
        planned: Math.min(
          quantity,
          validQuantity(goals[recipeId]) ? goals[recipeId] : 0,
        ),
        prerequisite: Math.max(
          quantity - (validQuantity(goals[recipeId]) ? goals[recipeId] : 0),
          0,
        ),
      }))
      .sort((a, b) => a.recipeId.localeCompare(b.recipeId)),
    issues,
    valid,
    inventoryEnabled: options.inventoryEnabled,
    provisional: provisional || !valid,
    allocationRule: `Recipe IDs are processed in stable order, dependencies first. Each owned unit is allocated once. ${options.mode === "first-craft" ? "Prerequisite crafts count toward the same first-craft catalog goal." : "Selected goal outputs are retained; prerequisite crafts are additional."} Unknown stock is not assumed owned; expanded totals remain provisional. A single synthesis route is used automatically; multiple routes require a choice.`,
  };
}
