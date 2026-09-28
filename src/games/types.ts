export interface CollectionEntry {
  id: string;
  category: string;
  categories?: string[];
  name: string;
  world?: string;
  area?: string;
  character?: string;
  summary: string;
  instructions?: string;
  prerequisites?: string;
  reward?: string;
  missability?: string;
  uncertainty?: string;
  sources?: string[];
  checkable?: boolean;
  collectible?: boolean;
  order?: number;
  drops?: { enemy: string; rate: string; location: string; details?: string }[];
}
export interface CollectionRecipe {
  id: string;
  name: string;
  group?: string;
  character?: string;
  instructions?: string;
  ingredients: { id: string; quantity: number }[];
}
export interface GameGuide {
  id: string;
  name: string;
  edition: string;
  accent: string;
  categories: { id: string; label: string; icon: string }[];
  worlds: { name: string; summary: string }[];
  entries: CollectionEntry[];
  recipes?: CollectionRecipe[];
  craftingLabel?: string;
  coverage: string;
}
