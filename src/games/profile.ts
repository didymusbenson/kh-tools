import type { GameGuide } from "./types";
export interface GuideProfile {
  version: 1;
  game: string;
  checks: Record<string, boolean>;
  owned: Record<string, number>;
  targets: Record<string, number>;
  route: string;
}
export const emptyProfile = (game: string): GuideProfile => ({
  version: 1,
  game,
  checks: {},
  owned: {},
  targets: {},
  route: `${game}/worlds`,
});
export function parseProfile(value: unknown, guide: GameGuide): GuideProfile {
  if (!value || typeof value !== "object")
    throw new Error("This is not a journal backup.");
  const p = value as GuideProfile;
  if (p.version !== 1 || p.game !== guide.id)
    throw new Error("Choose a backup for this game.");
  const ids = new Set([
    ...guide.entries.map((e) => e.id),
    ...(guide.recipes || []).map((r) => r.id),
  ]);
  const result = emptyProfile(guide.id);
  for (const field of ["checks", "owned", "targets"] as const) {
    const map = p[field];
    if (!map || typeof map !== "object" || Array.isArray(map))
      throw new Error(`Invalid ${field} in backup.`);
    for (const [id, n] of Object.entries(map)) {
      if (!ids.has(id)) throw new Error(`Unknown entry in backup: ${id}`);
      if (field === "checks") {
        if (typeof n !== "boolean")
          throw new Error("Invalid completion value.");
        result.checks[id] = n;
      } else {
        if (
          typeof n !== "number" ||
          !Number.isInteger(n) ||
          n < 0 ||
          n > 999999
        )
          throw new Error("Quantities must be whole numbers from 0 to 999999.");
        result[field][id] = n;
      }
    }
  }
  if (typeof p.route === "string" && p.route.startsWith(`${guide.id}/`))
    result.route = p.route;
  return result;
}
export function addTargets(
  profile: GuideProfile,
  ingredients: { id: string; quantity: number }[],
): GuideProfile {
  const targets = { ...profile.targets };
  for (const ingredient of ingredients) {
    const next = (targets[ingredient.id] || 0) + ingredient.quantity;
    if (!Number.isInteger(next) || next < 1 || next > 999999)
      throw new Error("The farming target is too large.");
    targets[ingredient.id] = next;
  }
  return { ...profile, targets };
}
let connection: Promise<IDBDatabase> | undefined;
function database() {
  return (connection ||= new Promise((resolve, reject) => {
    const request = indexedDB.open("ars-arcanum-guides", 1);
    request.onupgradeneeded = () =>
      request.result.createObjectStore("profiles");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      connection = undefined;
      reject(request.error);
    };
  }));
}
export async function loadProfile(guide: GameGuide): Promise<GuideProfile> {
  const db = await database();
  return new Promise((resolve, reject) => {
    const req = db
      .transaction("profiles")
      .objectStore("profiles")
      .get(guide.id);
    req.onsuccess = () => {
      try {
        resolve(
          req.result ? parseProfile(req.result, guide) : emptyProfile(guide.id),
        );
      } catch (e) {
        reject(e);
      }
    };
    req.onerror = () => reject(req.error);
  });
}
export async function mutateProfile(
  guide: GameGuide,
  change: (p: GuideProfile) => GuideProfile,
  recovery = false,
): Promise<GuideProfile> {
  const db = await database();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("profiles", "readwrite"),
      store = tx.objectStore("profiles");
    const req = store.get(guide.id);
    let next: GuideProfile;
    req.onsuccess = () => {
      try {
        const prior = req.result
          ? parseProfile(req.result, guide)
          : emptyProfile(guide.id);
        next = parseProfile(change(prior), guide);
        if (recovery) store.put(prior, `${guide.id}:recovery`);
        store.put(next, guide.id);
      } catch (e) {
        reject(e);
        tx.abort();
      }
    };
    tx.oncomplete = () => resolve(next);
    tx.onerror = () => reject(tx.error);
    tx.onabort = () =>
      reject(tx.error || new Error("Progress could not be saved."));
  });
}
export async function loadRecovery(guide: GameGuide): Promise<GuideProfile> {
  const db = await database();
  return new Promise((resolve, reject) => {
    const req = db
      .transaction("profiles")
      .objectStore("profiles")
      .get(`${guide.id}:recovery`);
    req.onsuccess = () => {
      try {
        resolve(parseProfile(req.result, guide));
      } catch {
        reject(new Error("No pre-import recovery is saved for this game."));
      }
    };
    req.onerror = () => reject(req.error);
  });
}
