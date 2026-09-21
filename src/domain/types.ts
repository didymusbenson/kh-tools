export type Verification = "verified" | "source-backed" | "unresolved";
export interface Source {
  label: string;
  url: string;
  checkedAt: string;
}
export interface MediaAsset {
  id: string;
  kind: "screenshot" | "map";
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  ruleset: string;
  provenance: string;
  rights: "approved";
  platform?: string;
  credit?: string;
  sourceUrl?: string;
  offlinePriority?: "core" | "optional";
  annotations?: { id: string; x: number; y: number; label: string }[];
}
export interface GuideEntry {
  id: string;
  game: "kh1fm";
  category: string;
  name: string;
  aliases?: string[];
  world?: string;
  area?: string;
  summary: string;
  instructions: string;
  prerequisites?: string;
  missability?: string;
  reward?: string;
  tags: string[];
  relatedIds: string[];
  sources: Source[];
  verification: Verification;
  uncertainty?: string;
  checkable: boolean;
  collectible: boolean;
  count?: number;
  order?: number;
  facts?: Record<string, string | number>;
  media?: MediaAsset[];
}
export interface Ingredient {
  itemId: string;
  name: string;
  quantity: number;
}
export interface Recipe {
  id: string;
  entryId: string;
  productId: string;
  name: string;
  set: number;
  unlock: string;
  ingredients: Ingredient[];
  outputQuantity: number;
  verification: Verification;
  uncertainty?: string;
}
export interface Coverage {
  category: string;
  label: string;
  expected: number | null;
  actual: number;
  complete: boolean;
  notes: string;
}
export interface GameData {
  schemaVersion: 1;
  game: "kh1fm";
  version: string;
  entries: GuideEntry[];
  recipes: Recipe[];
  coverage: Coverage[];
}
export interface PlayerState {
  schemaVersion: 1;
  game: "kh1fm";
  checks: Record<string, boolean>;
  /** Retained for version 1 backup compatibility; restored and live profiles use true. */
  inventoryEnabled: boolean;
  inventory: Record<string, number>;
  plan: Record<string, number>;
  planMode?: "selected" | "first-craft";
  lastRoute: string;
  updatedAt: string;
}
