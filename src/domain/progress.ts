import type { GuideEntry } from "./types";

export interface ProgressOptions {
  world?: string;
  category?: string;
  completeCoverage?: boolean;
}
export interface CollectionProgress {
  completed: number;
  total: number;
  remaining: number;
  percentage: number | null;
  state: "none" | "mixed" | "complete";
  unit: "collection actions";
  verifiedComplete: boolean;
  recoveredUnits: number;
  totalUnits: number;
}
/** Filters describe a complete declared collection set, never a currently visible search result. */
export function collectibleProgress(
  entries: GuideEntry[],
  checks: Record<string, boolean>,
  options: ProgressOptions = {},
): CollectionProgress {
  const members = entries.filter(
    (e) =>
      e.collectible &&
      e.checkable &&
      (!options.world || e.world === options.world) &&
      (!options.category || e.category === options.category),
  );
  const actions = new Map<string, GuideEntry[]>();
  for (const entry of members) {
    const acquisitionId =
      typeof entry.facts?.acquisitionId === "string"
        ? entry.facts.acquisitionId
        : entry.id;
    const group = actions.get(acquisitionId) ?? [];
    if (!group.some((e) => e.id === entry.id)) group.push(entry);
    actions.set(acquisitionId, group);
  }
  let completed = 0,
    recoveredUnits = 0,
    totalUnits = 0;
  for (const [id, group] of actions) {
    const checked =
      checks[id] === true || group.some((entry) => checks[entry.id] === true);
    // A three-puppy chest is one acquisition action and three recovered units, never four actions.
    const units = Math.max(
      ...group.map((e) =>
        Number.isSafeInteger(e.count) && e.count! > 0 ? e.count! : 1,
      ),
    );
    totalUnits += units;
    if (checked) {
      completed++;
      recoveredUnits += units;
    }
  }
  const total = actions.size;
  const incompleteEvidence =
    options.completeCoverage === false ||
    members.some((e) => e.verification === "unresolved");
  return {
    completed,
    total,
    remaining: total - completed,
    percentage:
      total && !incompleteEvidence
        ? Math.round((completed / total) * 100)
        : null,
    state:
      completed === 0 ? "none" : completed === total ? "complete" : "mixed",
    unit: "collection actions",
    verifiedComplete: total > 0 && completed === total && !incompleteEvidence,
    recoveredUnits,
    totalUnits,
  };
}
