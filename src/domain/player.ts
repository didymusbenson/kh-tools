import type { GameData, PlayerState } from "./types";

export const MAX_QUANTITY = 999_999;
export const PROFILE_ID = "kh1fm-current";
export interface ImportPreview {
  game: "kh1fm";
  checked: number;
  inventoryItems: number;
  plannedRecipes: number;
  updatedAt: string;
  warnings: string[];
}
export function emptyPlayerState(): PlayerState {
  return {
    schemaVersion: 1,
    game: "kh1fm",
    checks: {},
    inventoryEnabled: false,
    inventory: {},
    plan: {},
    planMode: "selected",
    lastRoute: "#/kh1fm/contents",
    updatedAt: new Date(0).toISOString(),
  };
}
export function validQuantity(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isSafeInteger(value) &&
    value >= 0 &&
    value <= MAX_QUANTITY
  );
}
export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
export function validId(id: string): boolean {
  return (
    /^[A-Za-z0-9][A-Za-z0-9._:-]{0,199}$/.test(id) &&
    !["__proto__", "constructor", "prototype"].includes(id)
  );
}
export function inventoryIds(data: GameData): Set<string> {
  return new Set([
    ...data.entries.map((e) => e.id),
    ...data.recipes.flatMap((r) => [
      r.productId,
      ...r.ingredients.map((i) => i.itemId),
    ]),
  ]);
}
/** Only explicitly verified shared acquisitions are linked; prerequisite relationships never imply a shared check. */
export function acquisitionGroups(data: GameData): Map<string, string[]> {
  const groups = new Map<string, string[]>();
  for (const entry of data.entries) {
    const event = entry.facts?.acquisitionId;
    if (!entry.checkable || typeof event !== "string" || !event.trim())
      continue;
    const members = groups.get(event) ?? [];
    if (!members.includes(entry.id)) members.push(entry.id);
    groups.set(event, members);
  }
  return groups;
}
export function normalizeAcquisitionChecks(
  checks: Record<string, boolean>,
  data: GameData,
  rejectConflicts = false,
): Record<string, boolean> {
  const normalized = { ...checks };
  for (const [event, members] of acquisitionGroups(data)) {
    const recorded = members
      .filter((id) => Object.hasOwn(checks, id))
      .map((id) => checks[id]);
    if (!recorded.length) continue;
    if (rejectConflicts && recorded.includes(true) && recorded.includes(false))
      throw new Error(
        `The backup has conflicting checks for the shared acquisition ${event}. Set its linked entries to the same value before importing.`,
      );
    // Legacy partial history: a recorded acquisition confirms all rewards from that one event.
    const completed = recorded.includes(true);
    for (const id of members) normalized[id] = completed;
  }
  return normalized;
}
export function validRoute(route: unknown): route is string {
  return (
    typeof route === "string" &&
    route.length <= 4096 &&
    /^#\/kh1fm(?:[/?][^\u0000-\u001f]*)?$/.test(route)
  );
}
/** Strict schema checks apply even to recovery records. Unknown content IDs may be retained locally across content updates. */
export function validatePlayerState(
  value: unknown,
  data?: GameData,
): PlayerState {
  if (!isRecord(value) || value.schemaVersion !== 1 || value.game !== "kh1fm")
    throw new Error(
      "This backup is not a supported Kingdom Hearts Final Mix profile.",
    );
  if (
    typeof value.inventoryEnabled !== "boolean" ||
    !validRoute(value.lastRoute) ||
    typeof value.updatedAt !== "string" ||
    !Number.isFinite(Date.parse(value.updatedAt))
  )
    throw new Error("The backup profile metadata is invalid.");
  if (
    value.planMode !== undefined &&
    value.planMode !== "selected" &&
    value.planMode !== "first-craft"
  )
    throw new Error("The backup craft-plan mode is invalid.");
  const checks: Record<string, boolean> = {};
  const inventory: Record<string, number> = {};
  const plan: Record<string, number> = {};
  const checkIds =
    data && new Set(data.entries.filter((e) => e.checkable).map((e) => e.id));
  const stockIds = data && inventoryIds(data);
  const recipeIds = data && new Set(data.recipes.map((r) => r.id));
  for (const field of ["checks", "inventory", "plan"] as const) {
    if (!isRecord(value[field]) || Object.keys(value[field]).length > 30_000)
      throw new Error(`The backup ${field} map is invalid.`);
    for (const [id, item] of Object.entries(value[field])) {
      if (!validId(id))
        throw new Error(`Invalid ${field} identifier: ${id.slice(0, 60)}.`);
      const known =
        field === "checks"
          ? checkIds
          : field === "inventory"
            ? stockIds
            : recipeIds;
      if (known && !known.has(id))
        throw new Error(
          `Unknown ${field} identifier: ${id}. The backup was not applied.`,
        );
      if (field === "checks") {
        if (typeof item !== "boolean")
          throw new Error(`Completion for ${id} must be true or false.`);
        checks[id] = item;
      } else {
        if (!validQuantity(item))
          throw new Error(
            `Quantity for ${id} must be a whole number from 0 to ${MAX_QUANTITY}.`,
          );
        (field === "inventory" ? inventory : plan)[id] = item;
      }
    }
  }
  return {
    schemaVersion: 1,
    game: "kh1fm",
    checks: data ? normalizeAcquisitionChecks(checks, data, true) : checks,
    inventoryEnabled: value.inventoryEnabled,
    inventory,
    plan,
    planMode: value.planMode === "first-craft" ? "first-craft" : "selected",
    lastRoute: value.lastRoute,
    updatedAt: value.updatedAt,
  };
}
export function parseBackup(text: string, data: GameData): PlayerState {
  if (text.length > 5_000_000)
    throw new Error(
      "The backup is too large. Choose an Ars Arcanum progress JSON file.",
    );
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("This file is not valid JSON. No progress was changed.");
  }
  if (
    !isRecord(parsed) ||
    parsed.format !== "ars-arcanum-progress" ||
    parsed.version !== 1 ||
    parsed.profileId !== PROFILE_ID
  )
    throw new Error(
      "Choose a version 1 Ars Arcanum Kingdom Hearts Final Mix progress backup.",
    );
  return validatePlayerState(parsed.player, data);
}
export function makeBackup(state: PlayerState): string {
  return JSON.stringify(
    {
      format: "ars-arcanum-progress",
      version: 1,
      profileId: PROFILE_ID,
      exportedAt: new Date().toISOString(),
      player: state,
    },
    null,
    2,
  );
}
export function importPreview(state: PlayerState): ImportPreview {
  return {
    game: "kh1fm",
    checked: Object.values(state.checks).filter(Boolean).length,
    inventoryItems: Object.keys(state.inventory).length,
    plannedRecipes: Object.values(state.plan).filter((n) => n > 0).length,
    updatedAt: state.updatedAt,
    warnings: [
      "Replaces this device’s current Kingdom Hearts Final Mix profile, including checks, stock and craft plan. A recovery snapshot is kept.",
    ],
  };
}
