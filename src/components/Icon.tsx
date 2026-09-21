import type { CSSProperties } from "react";

export type IconName =
  | "flask"
  | "monster"
  | "chest"
  | "trinity"
  | "paw"
  | "wand"
  | "torn-page"
  | "scroll"
  | "medal"
  | "book"
  | "world"
  | "spark"
  | "leaf"
  | "sword"
  | "cup"
  | "search"
  | "arrow"
  | "back"
  | "close"
  | "menu"
  | "check"
  | "download"
  | "upload"
  | "settings"
  | "undo"
  | "external"
  | "plus"
  | "minus"
  | "info"
  | "heart"
  | "filter";
const paths: Record<IconName, string> = {
  flask: "M9 3h6M10 3v6L4 19q-1 2 2 2h12q3 0 2-2L14 9V3M7 15h10m-7 3h.01",
  monster: "M6 8 4 3l6 3h4l6-3-2 5q3 3 2 7l-3 5H7l-3-5q-1-4 2-7Zm1 4 2 1m8-1-2 1m-6 4 3-1 3 1",
  chest: "M3 11V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v3M3 11h18v10H3V11Zm6 0v4h6v-4M7 4v7m10-7v7",
  trinity: "M15 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9 17a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM10 9l-2 5m6-5 2 5m-7 3h6",
  paw: "M8 15q4-6 8 0l2 3q1 4-3 3l-3-1-3 1q-4 1-3-3l2-3ZM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm14 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM11 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
  wand: "m4 20 11-11 3 3L7 23l-3-3Zm8-8 3 3M5 3v6M2 6h6m10-5v6m-3-3h6m-1 12v6m-3-3h6",
  "torn-page": "M5 3h10l4 4v14l-4-2-3 2-3-2-4 2V3Zm10 0v5h4M8 11h8m-8 4h5",
  scroll: "M7 3h12a2 2 0 0 1 2 2v3h-4V5a2 2 0 0 1 4 0M7 3a2 2 0 0 0-2 2v13H2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8M8 9h6m-6 4h6m-6 4h4",
  medal: "m5 3 4 7m10-7-4 7M5 3h5l2 4 2-4h5M18 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-6-3 .9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3L12 13Z",
  book: "M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1m0-15c3-2 6-2 9-1v15c-3-1-6-1-9 1V5Z",
  world:
    "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z",
  spark: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z",
  leaf: "M20 4C8 2 2 8 6 15c7 7 14 0 14-11ZM4 21 16 8",
  sword: "m4 20 5-5m-4-4 8 8m-3-6L18 3l3 3-10 10M3 18l3 3",
  cup: "M7 3h10v7a5 5 0 0 1-10 0V3Zm10 2h4v3c0 3-2 4-4 4M7 5H3v3c0 3 2 4 4 4m5 3v5m-5 1h10",
  search: "M16 16 21 21M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
  arrow: "M4 12h16m-6-6 6 6-6 6",
  back: "M20 12H4m6-6-6 6 6 6",
  close: "m6 6 12 12M6 18 18 6",
  menu: "M4 6h16M4 12h16M4 18h16",
  check: "m5 12 4 4L19 6",
  download: "M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4",
  upload: "M12 16V4m-5 5 5-5 5 5M4 17v4h16v-4",
  settings: "M4 7h16M4 17h16M8 4v6m8 4v6",
  undo: "M4 10h10a6 6 0 0 1 0 12M4 10l5-5M4 10l5 5",
  external: "M14 3h7v7m0-7L10 14M10 4H4v16h16v-6",
  plus: "M5 12h14M12 5v14",
  minus: "M5 12h14",
  info: "M12 11v6m0-10v.1M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  heart: "M12 21 3.5 12.5C-2 6 6 0 12 6c6-6 14 0 8.5 6.5L12 21Z",
  filter: "M3 5h18M6 12h12M10 19h4",
};
export function Icon({
  name,
  size = 20,
  style,
}: {
  name: IconName;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      <path d={paths[name]} />
    </svg>
  );
}
