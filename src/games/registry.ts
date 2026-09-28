import type { GameGuide } from "./types";
export const guideLoaders: Record<
  string,
  () => Promise<{ default: GameGuide }>
> = {
  kh2fm: () => import("./kh2fm"),
  bbsfm: () => import("./bbsfm"),
  dddhd: () => import("./dddhd"),
  kh02: () => import("./kh02"),
  kh3: () => import("./kh3"),
};
