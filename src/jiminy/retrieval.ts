import { collectibleProgress } from "../domain/progress";
import {
  calculatePlan,
  recipeRequirements,
  type MaterialRequirement,
} from "../domain/planner";
import type { GameData, GuideEntry, PlayerState } from "../domain/types";
import type { CoppermindPack, JiminyAnswer, Thought } from "./types";
const stop = new Set(
  "a an the of in at to for from on is are do does i my me get find where how what which can it this that have need please tell about and with".split(
    " ",
  ),
);
export const words = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((x) => x && !stop.has(x));
export function citation(e: GuideEntry) {
  return { entryId: e.id, name: e.name, href: `#/kh1fm/entry/${e.id}` };
}
export function scopedQuestion(question: string): JiminyAnswer | null {
  if (
    /\b(birth by sleep|bbs|terra|aqua|ventus|command meld|kh2|kh3|kingdom hearts (?:ii|iii|2|3)|dream drop|re mind)\b/i.test(
      question,
    )
  )
    return {
      text: "Open the matching game journal for that question.",
      citations: [],
      mode: "scope",
    };
  if (
    /\b(ignore (?:all|previous)|system prompt|pretend|roleplay|write (?:a |me )?(?:poem|code|story)|weather|president|politics)\b/i.test(
      question,
    )
  )
    return {
      text: "Ask a question about this game's guide.",
      citations: [],
      mode: "scope",
    };
  return null;
}
function materialText(i: MaterialRequirement, enabled: boolean) {
  return `${i.required} × ${i.name}${enabled ? (i.owned === null ? " (stock unknown; remaining unknown)" : ` (${i.owned} owned; ${i.missing} needed)`) : ""}`;
}
export function exactAnswer(
  question: string,
  data: GameData,
  player?: PlayerState,
): JiminyAnswer | null {
  const q = question.toLowerCase();
  if (
    player &&
    /\b(plan|all uncrafted|all remaining recipes)\b/.test(q) &&
    /material|need|required|remaining/.test(q)
  ) {
    const firstCraft = /all uncrafted|all remaining recipes/.test(q);
    const goals = firstCraft
      ? Object.fromEntries(
          data.recipes
            .filter((r) => !player.checks[r.entryId])
            .map((r) => [r.id, 1]),
        )
      : player.plan;
    const plan = calculatePlan(data.recipes, goals, player.inventory, {
      inventoryEnabled: player.inventoryEnabled,
      mode: firstCraft ? "first-craft" : (player.planMode ?? "selected"),
    });
    if (!plan.materials.length)
      return {
        text: "No recipes are selected in this plan.",
        citations: [],
        mode: "exact",
      };
    return {
      text:
        plan.materials
          .map((i) => materialText(i, player.inventoryEnabled))
          .join("; ") +
        ". " +
        plan.issues.map((i) => i.message).join(" ") +
        (plan.provisional
          ? " Totals are provisional where stock or recipe evidence is unknown."
          : ""),
      citations: data.entries
        .filter((e) =>
          data.recipes.some((r) => r.entryId === e.id && goals[r.id] > 0),
        )
        .map(citation),
      mode: "exact",
    };
  }
  if (
    player &&
    /\b(progress|collected|remaining|missing|completion|complete)\b/.test(q) &&
    !/\b(recipe|synthesi[sz]|material)\b/.test(q)
  ) {
    const world = [
      ...new Set(data.entries.map((e) => e.world).filter(Boolean)),
    ].find((w) => q.includes(w!.toLowerCase()));
    let entries = data.entries.filter(
      (e) => e.collectible && (!world || e.world === world),
    );
    const categories: [RegExp, string][] = [
      [/dalmatian|pupp/, "dalmatian"],
      [/trinit/, "trinity"],
      [/postcard/, "postcard"],
      [/treasure|chest/, "treasure"],
      [/torn page/, "torn-page"],
      [/report/, "report"],
    ];
    const category = categories.find(([pattern]) => pattern.test(q));
    if (category) entries = entries.filter((e) => e.category === category[1]);
    const progress = collectibleProgress(entries, player.checks, {
      completeCoverage: data.coverage.every((c) => c.complete),
    });
    const total = progress.total,
      checked = progress.completed;
    return {
      text: `${world || "This journal"}: ${checked} of ${total} recorded collectibles checked; ${total - checked} remaining. This counts the entries currently documented in this journal.`,
      citations: [],
      mode: "exact",
    };
  }
  if (
    /\b(where|locations|find)\b/.test(q) &&
    /\b(torn pages|postcards|trinity marks|ansem reports)\b/.test(q)
  ) {
    const category = /torn pages/.test(q)
      ? "torn-page"
      : /postcards/.test(q)
        ? "postcard"
        : /trinity marks/.test(q)
          ? "trinity"
          : "report";
    const entries = data.entries.filter(
      (e) => e.category === category && e.verification !== "unresolved",
    );
    if (entries.length)
      return {
        text: entries
          .map(
            (e) =>
              `${e.name}: ${[e.world, e.area].filter(Boolean).join(" — ")}. ${e.instructions || e.summary}${e.prerequisites ? ` ${e.prerequisites}` : ""}${e.uncertainty ? ` Qualification: ${e.uncertainty}` : ""}`,
          )
          .join("\n"),
        citations: entries.map(citation),
        mode: "exact",
      };
  }
  const candidates = data.entries
    .filter((e) =>
      [e.name, ...(e.aliases ?? [])].some(
        (name) => name.length >= 4 && q.includes(name.toLowerCase()),
      ),
    )
    .sort((a, b) => b.name.length - a.name.length);
  if (!candidates.length) return null;
  const entry = candidates[0];
  if (entry.verification === "unresolved")
    return {
      text: entry.uncertainty || "This entry still needs verification.",
      citations: [citation(entry)],
      mode: "missing",
    };
  const recipe = data.recipes.find(
    (r) =>
      r.entryId === entry.id ||
      r.productId === entry.id ||
      r.name.toLowerCase() === entry.name.toLowerCase(),
  );
  if (
    recipe &&
    /\b(recipe|make|craft|synthesi[sz]e|ingredients|need|materials)\b/.test(q)
  ) {
    if (recipe.verification === "unresolved")
      return {
        text: recipe.uncertainty || "This recipe still needs verification.",
        citations: [citation(entry)],
        mode: "missing",
      };
    const quantityMatch =
      q.match(/\b(?:make|craft|synthesi[sz]e|for)\s+(-?\d+(?:\.\d+)?)/) ||
      q.match(/(-?\d+(?:\.\d+)?)\s+(?:copies|of)\b/);
    const written = q.match(
      /\b(?:make|craft|synthesi[sz]e|for)\s+(one|two|three|four|five|six|seven|eight|nine|ten)\b/,
    );
    const quantity = quantityMatch
      ? Number(quantityMatch[1])
      : written
        ? [
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine",
            "ten",
          ].indexOf(written[1]) + 1
        : 1;
    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 9999 ||
      (!quantityMatch && !written && /\d/.test(q))
    )
      return {
        text: "Specify a whole-number craft quantity from 1 to 9,999.",
        citations: [citation(entry)],
        mode: "missing",
      };
    const ingredients = recipeRequirements(
      recipe,
      quantity,
      player?.inventory ?? {},
      player?.inventoryEnabled ?? false,
    ).map((i) => materialText(i, player?.inventoryEnabled ?? false));
    return {
      text: `${recipe.name}${quantity > 1 ? ` × ${quantity}` : ""}: ${ingredients.join("; ")}. ${recipe.unlock}${[
        recipe.uncertainty,
        entry.uncertainty,
      ]
        .filter((v, i, a) => v && a.indexOf(v) === i)
        .map((v) => ` Qualification: ${v}`)
        .join("")}`,
      citations: [citation(entry)],
      mode: "exact",
    };
  }
  if (/\b(where|location|get|find|obtain|unlock)\b/.test(q)) {
    const location = [entry.world, entry.area].filter(Boolean).join(" — ");
    return {
      text:
        (location ? `${location}: ` : "") +
        [
          entry.instructions || entry.summary,
          entry.prerequisites,
          entry.uncertainty,
        ]
          .filter(Boolean)
          .join(" "),
      citations: [citation(entry)],
      mode: "exact",
    };
  }
  return null;
}
export function rankThoughts(
  query: string,
  vector: number[],
  pack: CoppermindPack,
  data: GameData,
): Thought[] {
  if (pack.game !== data.game || pack.contentVersion !== data.version)
    throw new Error("This Coppermind pack does not match the active journal.");
  const tokens = words(query),
    ids = new Set(
      data.entries
        .filter((e) => e.verification !== "unresolved")
        .map((e) => e.id),
    );
  return pack.thoughts
    .filter((t) => t.metadata.game === data.game && ids.has(t.metadata.entryId))
    .map((t) => {
      const hay = new Set(
        words(`${t.metadata.name} ${t.metadata.tags} ${t.text}`),
      );
      const lexical =
        tokens.filter((x) => hay.has(x)).length / Math.max(1, tokens.length);
      const semantic = t.vector.reduce(
        (sum, x, i) => sum + x * (vector[i] ?? 0),
        0,
      );
      return { t, semantic, lexical, score: semantic + lexical * 0.22 };
    })
    .filter((x) => x.semantic >= 0.42 && x.lexical >= 0.8)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => x.t);
}
