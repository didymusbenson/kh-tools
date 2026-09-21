import type { GameData, GuideEntry, PlayerState } from "../domain/types";
import { recipeRequirements } from "../domain/planner";
import { entryHref } from "../domain/entryNavigation";
import { materialDetailEntry } from "../domain/materialPresentation";
import { EntryMedia } from "./EntryMedia";
import "./EntryDetails.css";

const internalFacts = new Set([
  "countingUnit", "sourceRow", "acquisitionId", "recordGame", "recordType",
  "steamAppId", "platformApiId", "evidenceKind", "sourceCheckedAt",
  "source reconciliation", "legacy correction", "earliestUnlockStatus", "ruleset",
]);

/** The complete entry content, shared by inline lists and linked destinations. */
export function EntryDetails({ data, state, entry: originalEntry, compactMaterial = false }: {
  data: GameData;
  state: PlayerState;
  entry: GuideEntry;
  compactMaterial?: boolean;
}) {
  const cleaned = originalEntry.category === "material" ? materialDetailEntry(originalEntry) : originalEntry;
  const entry = originalEntry.category === "material" && !compactMaterial ? {...cleaned, summary: originalEntry.summary} : cleaned;
  const recipe = data.recipes.find((r) => r.entryId === entry.id);
  const related = data.entries.filter((e) => entry.relatedIds.includes(e.id));
  const facts = Object.entries(entry.facts || {}).filter(([key, value]) => !internalFacts.has(key) && !(key === "color" && entry.name.toLowerCase().includes(String(value).toLowerCase())));
  const location = compactMaterial ? "" : [entry.world, entry.area].filter(Boolean).join(" · ");
  const fields = [
    ["Location", location],
    ["Requires", entry.prerequisites],
    ["Reward / effect", entry.reward],
    ["Missability", entry.missability === "Revisitable after the relevant access requirements are met." ? "" : entry.missability],
  ].filter(([, value]) => Boolean(value));
  return (
    <div className="entry-details-content">
      {!entry.collectible && entry.summary && entry.summary !== entry.instructions && <p>{entry.summary}</p>}
      {entry.instructions && <p>{entry.instructions}</p>}
      {fields.length > 0 && (
        <dl className="entry-details-facts">
          {fields.map(([name, value]) => <div key={name} data-field={name}><dt>{name}</dt><dd>{value}</dd></div>)}
        </dl>
      )}
      <EntryMedia media={entry.media} />
      {recipe && (
        <section className="entry-details-ingredients" aria-label={`${entry.name} ingredients`}>
          <strong>Ingredients</strong>
          {state.inventoryEnabled && <p>Owned / required for one craft. “?” means your stock is unknown.</p>}
          <ul className="entry-details-ingredient-list">
            {recipeRequirements(recipe, 1, state.inventory, state.inventoryEnabled).map((ingredient) => {
              const target = data.entries.find((e) => e.id === ingredient.itemId);
              return <li key={ingredient.itemId}>
                {target ? <a href={entryHref(target)}>{ingredient.name}</a> : <span>{ingredient.name}</span>}
                <span aria-label={state.inventoryEnabled
                  ? `${ingredient.owned === null ? "Unknown" : ingredient.owned} owned, ${ingredient.required} required; ${ingredient.missing === null ? "unknown" : ingredient.missing} remaining`
                  : `${ingredient.required} required`}>
                  {state.inventoryEnabled
                    ? `${ingredient.owned === null ? "?" : ingredient.owned} / ${ingredient.required} · ${ingredient.missing === null ? "?" : ingredient.missing} remaining`
                    : `× ${ingredient.required}`}
                </span>
              </li>;
            })}
          </ul>
          {recipe.unlock && <p><strong>Unlock:</strong> {recipe.unlock}</p>}
          {recipe.uncertainty && recipe.uncertainty !== entry.uncertainty && <p><strong>Recipe note:</strong> {recipe.uncertainty}</p>}
          <a href="#/kh1fm/synthesis/plan">Planning</a>
        </section>
      )}
      {facts.length > 0 && (
        <dl className="entry-details-facts">
          {facts.map(([key, value]) => <div key={key}>
            <dt>{key.replace(/([a-z])([A-Z])/g, "$1 $2").replaceAll("_", " ")}</dt>
            <dd>{String(value)}</dd>
          </div>)}
        </dl>
      )}
      {entry.uncertainty && <p><strong>Entry note:</strong> {entry.uncertainty}</p>}
      {related.length > 0 && (
        <div className="entry-details-related">
          <strong>Related</strong>
          <ul>{related.map((target) => <li key={target.id}><a href={entryHref(target)}>{target.name}</a></li>)}</ul>
        </div>
      )}
    </div>
  );
}
