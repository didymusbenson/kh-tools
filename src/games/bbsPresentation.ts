export const bbsCampaigns = [
  "Terra",
  "Ventus",
  "Aqua",
  "Aqua · Final Episode",
  "Aqua · Secret Episode",
];
export function bbsScope(character: string | undefined, selected: string) {
  return (
    selected === "all" ||
    !character ||
    character === "Both" ||
    character.replace(": ", " · ") === selected
  );
}
export function bbsRecipeSummary(instructions?: string) {
  const inputs = instructions?.split(". ")[0] || "";
  const outcomes = instructions?.match(/Outcomes:\s*(.*?%)(?:\.\s|$)/)?.[1];
  return { inputs, outcomes };
}
