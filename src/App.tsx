import { entryTitle, isTreasure } from "./domain/entryPresentation";
import { loadProfile } from './games/profile';
import GuideLoader from './games/GuideLoader';
import { guideLoaders } from './games/registry';
import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import type { GameData, GuideEntry, PlayerState } from "./domain/types";
import { usePlayerState } from "./state/usePlayerState";
import { collectibleProgress } from "./domain/progress";
import { Icon, type IconName } from "./components/Icon";
import { DataJiminy } from "./components/DataJiminy";
import { EntryDetails } from "./components/EntryDetails";
import { compareMaterials, materialFamily, materialDropLines, materialDropLocation } from "./domain/materialPresentation";
import { cataloguePages, resolveEntryHref } from "./domain/entryNavigation";
import "./styles.css";
import "./ui-polish.css";
import { BUILD_REVISION, getInstallationState, subscribeInstallation, checkForAppUpdate, applyAppUpdate } from "./pwa";

const base = import.meta.env.BASE_URL;
function useStoredChoice<T extends string>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      return (localStorage.getItem(key) as T) || fallback;
    } catch {
      return fallback;
    }
  });
  function update(next: T) {
    setValue(next);
    try {
      localStorage.setItem(key, next);
    } catch {}
  }
  return [value, update] as const;
}
function journalScroll() {
  const shell = document.querySelector<HTMLElement>(".journal-shell");
  return matchMedia("(max-width:650px)").matches && shell ? shell : window;
}
function journalScrollY() {
  const target = journalScroll();
  return target instanceof Window ? target.scrollY : target.scrollTop;
}

const categories: Record<string, string> = {
  treasure: "Treasures",
  dalmatian: "Dalmatian groups",
  trinity: "Trinity marks",
  postcard: "Postcards",
  "torn-page": "Torn pages",
  report: "Ansem reports",
  magic: "Magic",
  summon: "Summons",
  recipe: "Synthesis recipes",
  material: "Materials",
  weapon: "Weapons",
  accessory: "Accessories",
  enemy: "Adversaries",
  ability: "Abilities",
  cup: "Coliseum cups",
  boss: "Optional bosses",
  minigame: "Minigames",
  gummi: "Gummi missions",
  achievement: "Achievements",
  guide: "Field notes",
};
const catalogueIcons: Record<string, IconName> = {
  bestiary: "monster", treasures: "chest", trinities: "trinity",
  dalmatians: "paw", "magic-upgrades": "wand", "torn-pages": "torn-page",
  "ansem-reports": "scroll", challenges: "cup", achievements: "medal",
};
const nav: { id: string; label: string; icon: IconName; chapter: string }[] = [
  {id:"worlds", label:"Worlds", icon:"world", chapter:""},
  {id:"synthesis", label:"Synthesis Workshop", icon:"flask", chapter:""},
  ...cataloguePages.map(page=>({id:page.id, label:page.title, icon:catalogueIcons[page.id] || "book", chapter:""})),
];
function routeTo(path: string) {
  window.location.hash = `/${path}`;
}
function label(category: string) {
  return categories[category] || category.replaceAll("-", " ");
}
function uniq<T>(list: T[]) {
  return [...new Set(list)];
}
function useRoute() {
  const [route, setRoute] = useState(location.hash.slice(2) || "");
  useEffect(() => {
    const update = () => setRoute(location.hash.slice(2) || "");
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return route;
}
function formatCount(entries: GuideEntry[], state: PlayerState) {
  const result = collectibleProgress(entries, state.checks);
  return { total: result.total, done: result.completed };
}
function Progress({
  done,
  total,
  caption,
}: {
  done: number;
  total: number;
  caption?: string;
}) {
  return (
    <div className="progress">
      <div className="progress-label">
        <span>{caption || "Recorded collection checks"}</span>
        <strong>
          {done}
          <span> / {total}</span>
        </strong>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label={caption || "Recorded collection checks"}
        aria-valuenow={done}
        aria-valuemin={0}
        aria-valuemax={total || 1}
      >
        <span
          style={{ width: `${total ? Math.round((done / total) * 100) : 0}%` }}
        />
      </div>
    </div>
  );
}
function PageTitle({
  title,
  children,
  aside,
}: {
  title: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="page-heading">
      <div>
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
      {aside}
    </header>
  );
}
function Check({
  entry,
  state,
  onToggle,
  compact = false,
}: {
  entry: GuideEntry;
  state: PlayerState;
  onToggle: (id: string) => unknown;
  compact?: boolean;
}) {
  const checked = !!state.checks[entry.id];
  return (
    <button
      type="button"
      className={`check-control ${checked ? "is-checked" : ""} ${compact ? "compact-check" : ""}`}
      role="checkbox"
      aria-checked={checked}
      aria-label={`${checked ? "Unmark" : "Mark"} ${entry.name} ${entry.category === "recipe" ? "as crafted" : "as collected"}`}
      onClick={() => onToggle(entry.id)}
    >
      <span className="check-box">
        {checked && <Icon name="check" size={14} />}
      </span>
      {!compact && (
        <span>
          {checked
            ? entry.category === "recipe"
              ? "Crafted"
              : "Recorded"
            : entry.category === "recipe"
              ? "Mark crafted"
              : "Mark complete"}
        </span>
      )}
    </button>
  );
}
function Empty({ children }: { children: ReactNode }) {
  return (
    <div className="empty-state">
      <Icon name="search" size={30} />
      <h3>No matching entries</h3>
      <p>{children}</p>
    </div>
  );
}

function UpdateNotice() {
  const installation = useSyncExternalStore(subscribeInstallation, getInstallationState);
  if (!installation.update) return null;
  return <div className="save-alert app-update-notice" role="status">
    <p>{installation.message || "A new journal version is ready."}</p>
    <button onClick={() => void applyAppUpdate()}>Load available update</button>
  </div>;
}

export default function App() {
  const [data, setData] = useState<GameData | null>(null),
    [error, setError] = useState("");
  const route = useRoute();
  useEffect(() => {
    let alive = true;
    fetch(`${base}data/kh1fm.json`)
      .then((r) => {
        if (!r.ok) throw new Error("The journal data could not be loaded.");
        return r.json();
      })
      .then((d) => {
        if (alive) setData(d);
      })
      .catch((e) => {
        if (alive) setError(String(e.message));
      });
    return () => {
      alive = false;
    };
  }, []);
  if (guideLoaders[route.split("/")[0]]) return <GuideLoader id={route.split("/")[0]} route={route} updateNotice={<UpdateNotice />} />;
  if (!route.startsWith("kh1fm")) return <Cover data={data} />;
  if (!data)
    return (
      <div className="loading-page">
        <Icon name="book" size={40} />
        <h1>
          {error ? "The journal is unavailable" : "Opening your journal…"}
        </h1>
        <p>{error || "Loading Kingdom Hearts Final Mix."}</p>
        {error && <button onClick={() => location.reload()}>Try again</button>}
        <a href="#/">Return to game selection</a>
      </div>
    );
  return <Journal data={data} route={route} />;
}

const games = [
  {
    id: "kh1fm",
    name: "Kingdom Hearts",
    edition: "Final Mix",
    number: "I",
    art: "khfm.jpg",
    ready: true,
  },
  {
    id: "kh2fm",
    name: "Kingdom Hearts II",
    edition: "Final Mix",
    number: "II",
    art: "kh2fm.png",
    ready: true,
  },
  {
    id: "bbsfm",
    name: "Birth by Sleep",
    edition: "Final Mix",
    number: "BBS",
    art: "bbs.jpg",
    ready: true,
  },
  {
    id: "dddhd",
    name: "Dream Drop Distance",
    edition: "HD",
    number: "DDD",
    art: "ddd.png",
    ready: true,
  },
  {
    id: "kh02",
    name: "A fragmentary passage",
    edition: "Kingdom Hearts 0.2",
    number: "0.2",
    art: "",
    ready: true,
  },
  {
    id: "kh3",
    name: "Kingdom Hearts III",
    edition: "& Re Mind",
    number: "III",
    art: "",
    ready: true,
  },
];
function ResumeGame({ data }: { data: GameData }) {
  const player = usePlayerState(data);
  const route = player.state.lastRoute;
  const section = route.split("?")[0].split("/")[2];
  if (!player.ready || !route.startsWith("#/kh1fm/") || ![...nav.map(item=>item.id), "contents", "entry", "reference", "progress"].includes(section)) return null;
  return (
    <a className="cover-cta" href={route}>
      Resume last page <Icon name="arrow" size={16} />
    </a>
  );
}

function ResumeOtherGame({id}:{id:string}) {
  const [saved,setSaved]=useState<{route:string;name:string}|null>(null);
  useEffect(()=>{let active=true;setSaved(null);if(guideLoaders[id])void guideLoaders[id]().then(async module=>{const state=await loadProfile(module.default);if(active)setSaved({route:state.route,name:module.default.name})}).catch(()=>{});return()=>{active=false}},[id]);
  return saved?<a className="cover-cta" href={`#/${saved.route}`}>Resume {saved.name}<Icon name="arrow" size={16}/></a>:null;
}

function Cover({ data }: { data: GameData | null }) {
  const [selected, setSelected] = useState("kh1fm");
  const game = games.find((g) => g.id === selected)!;
  let previous = "";
  try {
    previous = localStorage.getItem("ars-arcanum:last-game") || "";
  } catch {
    /* Storage optional for selection. */
  }
  return (
    <div className="cover">
      <UpdateNotice />
      <a
        className="skip-link"
        href="#game-list"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("game-list")?.focus();
        }}
      >
        Skip to game selection
      </a>
      <div className="cover-grain" aria-hidden="true" />
      <header className="cover-masthead">
        <a className="brand" href="#/">
          <span className="brand-seal">
            <Icon name="spark" size={25} />
          </span>
          <span>
            ARS ARCANUM<small>A KINGDOM HEARTS COMPANION</small>
          </span>
        </a>
        <span className="cover-volume">
          THE JOURNALS <span>✦</span>
        </span>
      </header>
      <main className="cover-main">
        <section className="cover-copy">
          <div className="eyebrow gold">Every world. Every discovery.</div>
          <h1>
            A little guidance.
            <br />
            <em>A grand adventure.</em>
          </h1>
          <p className="cover-intro">
            Your worlds, discoveries, and unfinished business.
            <br className="desktop-break" /> All in one well-kept journal.
          </p>
          <nav
            className="game-list"
            id="game-list"
            tabIndex={-1}
            aria-label="Choose a game"
          >
            {games.map((g, index) => (
              <button
                key={g.id}
                className={`game-option ${selected === g.id ? "selected" : ""}`}
                onPointerEnter={() => setSelected(g.id)}
                onFocus={() => setSelected(g.id)}
                onClick={() => {
                  setSelected(g.id);
                  if (g.ready) routeTo(`${g.id}/worlds`);
                }}
                aria-label={`${g.name} ${g.edition}${g.ready ? ", open journal" : ", journal not yet available"}`}
              >
                <span className="game-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="game-title">
                  {g.name}
                  <small>{g.edition}</small>
                </span>
                {g.ready ? (
                  <Icon name="arrow" />
                ) : (
                  <span className="soon">Coming later</span>
                )}
              </button>
            ))}
          </nav>
          <p className="cover-note">
            {previous ? "Choose a journal to continue." : "Choose a game."}
          </p>
          {previous && previous!=="kh1fm" ? <ResumeOtherGame id={previous}/> : data && <ResumeGame data={data} />}
        </section>
        <section
          className="artwork-stage"
          aria-label={`${game.name} artwork preview`}
        >
          <div className="artwork-orbit orbit-one" />
          <div className="artwork-orbit orbit-two" />
          <span className="artwork-star star-a">✦</span>
          <span className="artwork-star star-b">✧</span>
          <span className="artwork-roman" aria-hidden="true">
            {game.number}
          </span>
          {game.art && (
            <img
              key={game.art}
              className="game-artwork"
              src={`${base}assets/${game.art}`}
              alt=""
            />
          )}
          <div className="artwork-caption">
            <h2>{game.name}</h2>
            <p>{game.edition}</p>
            {game.ready ? (
              <a href={`#/${game.id}/worlds`} className="cover-cta">
                Open the journal <Icon name="arrow" size={18} />
              </a>
            ) : (
              <p className="unavailable-note">
                This journal is not yet implemented.
              </p>
            )}
          </div>
        </section>
      </main>
      <footer className="cover-footer">
        <span>An unofficial companion, made for the journey.</span>
        <span>
          May your heart be your guiding key. <span aria-hidden="true">✧</span>
        </span>
      </footer>
    </div>
  );
}

type Player = ReturnType<typeof usePlayerState>;
function Journal({ data, route }: { data: GameData; route: string }) {
  const player = usePlayerState(data),
    { state } = player;
  const [search, setSearch] = useState(""),
    [menu, setMenu] = useState(false),
    [message, setMessage] = useState("");
  const mainRef = useRef<HTMLElement>(null);
  const parts = route.split("?")[0].split("/");
  const focusId = new URLSearchParams(route.split("?")[1] || "").get("entry") || "";
  const [retained, setRetained] = useState(new Set<string>());
  const [suppressFocus, setSuppressFocus] = useState(false);
  const resetVisibility = () => { setRetained(new Set()); setSuppressFocus(true); };
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(sessionStorage.getItem("ars-arcanum:expanded") || "[]")); } catch { return new Set(); }
  });
  const setMany = (ids: string[], open: boolean) => setExpanded(previous => {
    const next = new Set(previous); ids.forEach(id => open ? next.add(id) : next.delete(id)); return next;
  });
  useEffect(() => { try { sessionStorage.setItem("ars-arcanum:expanded", JSON.stringify([...expanded])); } catch {} }, [expanded]);
  useEffect(() => {
    setRetained(new Set());
    setSuppressFocus(false);
    if (parts[1] === "contents" || !parts[1]) location.replace("#/kh1fm/worlds");
    if (parts[1] === "entry" || (parts[1] === "worlds" && focusId)) {
      const id = focusId || decodeURIComponent(parts.slice(2).join("/"));
      if (data.entries.some(e=>e.id === id)) location.replace(resolveEntryHref(data, id));
    }
    if (focusId) setMany([focusId], true);
  }, [route]);
  useEffect(() => {
    if (!focusId || !player.ready) return;
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => {
      const row = document.getElementById(`row-${focusId}`);
      row?.scrollIntoView({block:"center"});
      row?.querySelector<HTMLButtonElement>(".entry-toggle")?.focus({preventScroll:true});
    }));
    return () => cancelAnimationFrame(frame);
  }, [route, player.ready]);
  const section = !parts[1] || parts[1] === "contents" ? "worlds" : parts[1];
  const collection = data.entries.filter((e) => e.collectible && e.checkable);
  const count = formatCount(collection, state);
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const change = () => setOnline(navigator.onLine);
    window.addEventListener("online", change);
    window.addEventListener("offline", change);
    return () => {
      window.removeEventListener("online", change);
      window.removeEventListener("offline", change);
    };
  }, []);
  useEffect(() => {
    setMenu(false);
    if (!player.ready) return;
    const scrollKey = "ars-arcanum:scroll:" + route.split("?")[0];
    let scroll = 0;
    try { scroll = Number(sessionStorage.getItem(scrollKey) || 0); } catch {}
    const target = journalScroll();
    const frame = requestAnimationFrame(() => {
      if (section !== "search" && !focusId) target.scrollTo({top: scroll, behavior:"instant"});
      if (!focusId) mainRef.current?.focus({preventScroll:true});
    });
    const saveScroll = () => { try { sessionStorage.setItem(scrollKey, String(journalScrollY())); } catch {} };
    target.addEventListener("scroll", saveScroll, {passive:true});
    void player.rememberRoute(`#/${route}`);
    try { localStorage.setItem("ars-arcanum:last-game", "kh1fm"); } catch {}
    return () => { cancelAnimationFrame(frame); target.removeEventListener("scroll", saveScroll); };
  }, [route, player.ready]);
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 4500);
    return () => clearTimeout(timer);
  }, [message]);
  async function toggle(id: string) {
    if (expanded.has(id)) setRetained(previous => new Set([...previous, id]));
    await player.toggleCheck(id);
  }
  const props = { data, state, onToggle: toggle };
  const title =
    nav.find((n) => n.id === section)?.label ||
    (section === "entry" ? "Journal entry" : "Search the journal");
  return (
    <div className="journal-app" onClick={event => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!anchor || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || anchor.hash !== location.hash) return;
      const id = new URLSearchParams(anchor.hash.split("?")[1] || "").get("entry");
      if (!id) return;
      event.preventDefault(); setSuppressFocus(false); setMany([id], true);
      requestAnimationFrame(() => { const row = document.getElementById(`row-${id}`); row?.scrollIntoView({block:"center"}); row?.querySelector<HTMLButtonElement>(".entry-toggle")?.focus({preventScroll:true}); });
    }}>
      <a
        className="skip-link"
        href="#journal-main"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Skip to journal content
      </a>
      <header className="journal-topbar">
        <a
          href="#/"
          className="brand journal-brand"
          aria-label="Ars Arcanum game selection"
        >
          <span className="brand-seal">
            <Icon name="spark" size={23} />
          </span>
          <span>
            ARS ARCANUM<small>THE JOURNALS</small>
          </span>
        </a>
        <div className="current-edition">
          <span>VOLUME I</span>
          <strong>
            Kingdom Hearts <i>Final Mix</i>
          </strong>
        </div>
        <div className="topbar-status" role="status">
          <span className={`status-dot ${online ? "" : "offline"}`} />
          {online ? "Local journal" : "You’re offline"}
        </div>
        <button
          className="icon-button mobile-menu"
          onClick={() => setMenu(!menu)}
          aria-label={
            menu ? "Close journal navigation" : "Open journal navigation"
          }
          aria-expanded={menu}
        >
          <Icon name={menu ? "close" : "menu"} />
        </button>
      </header>
      <div className="journal-shell">
        <aside
          className={`journal-sidebar ${menu ? "mobile-open" : ""}`}
          aria-label="Journal navigation"
        >
          <div className="sidebar-volume">
            <span className="eyebrow">Jiminy’s Journal</span>
            <h2>Kingdom Hearts</h2>
            <p>FINAL MIX</p>
            <span className="volume-ornament" aria-hidden="true">
              ✦
            </span>
          </div>
          <nav className="chapter-nav" aria-label="Journal chapters">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#/kh1fm/${n.id}`}
                className={section === n.id ? "active" : ""}
                aria-current={section === n.id ? "page" : undefined}
              >
                <Icon name={n.icon} />
                <span>{n.label}</span>
                <small>{n.chapter}</small>
              </a>
            ))}
          </nav>
          <div className="sidebar-progress">
            <Progress {...count} caption="World collectibles" />
            <p>Recorded guide entries; coverage varies.</p>
          </div>
          <div className="sidebar-bottom">
            <a href="#/kh1fm/reference">Reference library</a>
            <a href="#/kh1fm/progress">Progress & backups</a>
            <a href="#/" className="back-games">
              <Icon name="back" size={16} /> Change journal
            </a>
            <span
              role="status"
              className={`save-status ${player.status === "error" ? "save-error" : ""}`}
            >
              <span className="status-dot" />
              {player.status === "saved"
                ? "Progress saved on this device"
                : player.status === "saving"
                  ? "Saving progress…"
                  : player.status === "error"
                    ? "Progress could not be saved"
                    : player.status === "memory"
                      ? "Progress is in memory only"
                      : "Loading saved progress…"}
            </span>
          </div>
        </aside>
        {menu && (
          <button
            className="nav-scrim"
            aria-label="Close navigation"
            onClick={() => setMenu(false)}
          />
        )}
        <div className="journal-page-wrap">
          <div className="binding" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} />
            ))}
          </div>
          <div className="journal-page">
            <UpdateNotice />
            <div className="page-toolbar">
              <div className="breadcrumb">
                <span>KH · FINAL MIX</span>
                <span>/</span>
                <span>{title}</span>
              </div>
              <label className="search-control">
                <Icon name="search" size={18} />
                <span className="sr-only">
                  Search the Kingdom Hearts Final Mix journal
                </span>
                <input
                  type="search"
                  placeholder="Search this journal…"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    if (e.target.value && section !== "search")
                      routeTo("kh1fm/search");
                  }}
                />
                {search && (
                  <button
                    type="button"
                    className="clear-search"
                    aria-label="Clear search"
                    onClick={() => setSearch("")}
                  >
                    <Icon name="close" size={14} />
                  </button>
                )}
              </label>
            </div>
            {player.error && (
              <div className="save-alert" role="alert">
                <Icon name="info" />
                <p>
                  {player.error}{" "}
                  <strong>
                    Your latest changes may not survive closing this page.
                  </strong>
                </p>
                <button onClick={() => player.retry()}>Retry save</button>
              </div>
            )}
            <main
              id="journal-main"
              className="journal-main"
              tabIndex={-1}
              ref={mainRef}
            >
              <ExpansionContext.Provider value={{data, expanded, retained, resetVisibility, focusId: suppressFocus ? "" : focusId, setMany, toggle: id => setMany([id], !expanded.has(id))}}>
              {!player.ready ? (
                <div className="empty-state">Restoring your journal…</div>
              ) : section === "worlds" ? (
                <Contents
                  {...props}
                  world={parts[2] ? decodeURIComponent(parts[2]) : undefined}
                />
              ) : cataloguePages.some(page => page.id === section) ? (
                <Catalogue key={section} {...props} page={cataloguePages.find(page=>page.id===section)!} route={route} />
              ) : section === "synthesis" ? (
                <Synthesis {...props} player={player} initialTab={parts[2]} />
              ) : section === "reference" ? (
                <Reference key={section} {...props} challenges={false} />
              ) : section === "progress" ? (
                <Settings {...props} player={player} notify={setMessage} />
              ) : section === "entry" ? (
                <MissingEntry />
              ) : section === "search" ? (
                <Search {...props} query={search} />
              ) : (
                <Contents {...props} />
              )}
              </ExpansionContext.Provider>
            </main>
            <footer className="page-footer">
              <span>
                ARS ARCANUM <span aria-hidden="true">✦</span> VOLUME I
              </span>
              <span>
                Final Mix · <a href="#/kh1fm/progress">Guide coverage</a>
              </span>
            </footer>
          </div>
        </div>
      </div>
      <DataJiminy data={data} state={state} />
      {message && player.status !== "error" && (
        <div className="toast" role="status">
          <Icon name="check" size={18} />
          <span>{message}</span>
          {player.canUndo && (
            <button
              onClick={async () => {
                await player.undo();
                setMessage("Last change undone.");
              }}
            >
              Undo
            </button>
          )}
          <button
            className="icon-button"
            aria-label="Dismiss notification"
            onClick={() => setMessage("")}
          >
            <Icon name="close" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
type Common = {
  data: GameData;
  state: PlayerState;
  onToggle: (id: string) => unknown;
};
function Contents({ data, state, onToggle, world }: Common & {world?:string}) {
  const overviewEntries = data.entries.filter(e=>e.category === "guide" && e.id.startsWith("kh1fm-guide-") && e.id.endsWith("-collectibles") && e.world);
  const worlds = overviewEntries.map(e=>e.world!);
  const overview = overviewEntries.find(e=>e.world === world);
  const worldEntries = data.entries.filter(e=>e.world === world);
  const shortcuts = cataloguePages.map(page=>({page, entries: worldEntries.filter(e=>page.categories.includes(e.category))})).filter(item=>item.entries.length);
  return <>
    {world && <a href="#/kh1fm/worlds" className="text-back">All worlds</a>}
    <PageTitle title={world || "Worlds"} />
    {!world ? <div className="world-hub-list">{worlds.map(name=> {
      const count = formatCount(data.entries.filter(e=>e.world === name && e.collectible && e.checkable),state);
      return <a href={`#/kh1fm/worlds/${encodeURIComponent(name)}`} key={name}><strong>{name}</strong><span>{count.done}/{count.total}<Icon name="arrow" size={16} /></span></a>;
    })}</div> : <>
      {overview && <section className="world-overview"><p>{overview.instructions}</p>{overview.uncertainty && <p>{overview.uncertainty}</p>}</section>}
      <div className="world-hub-list">{shortcuts.map(({page,entries})=> {
        const checkable = entries.filter(e=>e.checkable);
        return <a key={page.id} href={`#/kh1fm/${page.id}?world=${encodeURIComponent(world)}`}><strong>{page.title}</strong><span>{checkable.length ? `${checkable.filter(e=>state.checks[e.id]).length}/${checkable.length}` : `${entries.length} entries`}<Icon name="arrow" size={16} /></span></a>;
      })}</div>
      {worldEntries.some(e=>(e.category === "guide" || e.category === "summon") && e.id !== overview?.id) && <section className="world-notes"><h2>World notes</h2><GroupedEntries entries={worldEntries.filter(e=>(e.category === "guide" || e.category === "summon") && e.id !== overview?.id)} state={state} onToggle={onToggle} /></section>}

    </>}
  </>;
}
function Catalogue({data,state,onToggle,page,route}: Common & {page: {id:string;title:string;categories:string[]}; route:string}) {
  const {expanded,retained,resetVisibility,focusId} = useContext(ExpansionContext);
  const [world,setWorld] = useStoredChoice<string>(`ars-arcanum:${page.id}:world`, "all");
  const [status,setStatus] = useStoredChoice<string>(`ars-arcanum:${page.id}:status`, "all");
  const queryWorld = new URLSearchParams(route.split("?")[1] || "").get("world");
  useEffect(()=>{ if(queryWorld) setWorld(queryWorld); },[queryWorld]);
  const entries = data.entries.filter(e=>page.categories.includes(e.category));
  const worldOrder = data.entries.filter(e=>e.category === "guide" && e.id.startsWith("kh1fm-guide-") && e.id.endsWith("-collectibles")).map(e=>e.world!);
  const worlds = uniq([...worldOrder, ...entries.map(e=>e.world || "General")]).filter(w=>entries.some(e=>(e.world || "General") === w));
  const filtered = entries.filter(e=>e.id === focusId || ((world === "all" || (e.world || "General") === world) && ((expanded.has(e.id) && retained.has(e.id)) || status === "all" || (e.checkable && (status === "completed" ? !!state.checks[e.id] : !state.checks[e.id])))));
  const checkable = entries.filter(e=>e.checkable);
  return <>
    <PageTitle title={page.title} aside={<span className="heading-stat">{checkable.length ? `${checkable.filter(e=>state.checks[e.id]).length}/${checkable.length}` : `${entries.length} entries`}</span>} />
    <div className="filter-bar">
      {entries.some(e=>e.world) && <label className="select-field"><span className="sr-only">Filter by world</span><select value={world} onChange={event=>{resetVisibility();setWorld(event.target.value);routeTo(`kh1fm/${page.id}?world=${encodeURIComponent(event.target.value)}`);}}><option value="all">All worlds</option>{worlds.map(w=><option key={w}>{w}</option>)}</select></label>}
      {checkable.length > 0 && <label className="select-field"><span className="sr-only">Filter by completion</span><select value={status} onChange={event=>{resetVisibility();setStatus(event.target.value);}}><option value="all">All records</option><option value="remaining">Remaining only</option><option value="completed">Completed only</option></select></label>}
    </div>
    <div className="results-note">{filtered.length} matching records</div>
    <div className="world-grid">{worlds.map(w=> {
      const visible = filtered.filter(e=>(e.world || "General")===w);
      if (!visible.length) return null;
      const all = entries.filter(e=>(e.world || "General")===w && e.checkable);
      return <section className="world-card" key={w}><div className="world-card-heading"><h2>{worldOrder.includes(w) ? <a href={`#/kh1fm/worlds/${encodeURIComponent(w)}`}>{w}</a> : w}</h2><span className="world-count">{all.length ? `${all.filter(e=>state.checks[e.id]).length}/${all.length}` : `${visible.length} entries`}</span></div>
        {uniq(visible.map(e=>e.category)).map(c=> {
          const group = visible.filter(e=>e.category === c);
          const total = all.filter(e=>e.category === c);
          return <div className="compact-category" key={c}><div className="compact-category-heading"><h3>{label(c)}</h3><CategoryExpansion entries={group} /><span>{total.length ? `${total.filter(e=>state.checks[e.id]).length}/${total.length}${c === "dalmatian" ? " groups" : ""}` : ""}</span></div><div className="compact-marks">{group.map(e=><EntryRow key={e.id} entry={e} state={state} onToggle={onToggle} />)}</div></div>;
        })}
      </section>;
    })}</div>
    {!filtered.length && <Empty>No entries match these filters.</Empty>}
    {page.id === "dalmatians" && <p className="fine-print">A Dalmatian group counts as one check for three puppies.</p>}
  </>;
}
type ExpansionState = { data: GameData; expanded: Set<string>; retained: Set<string>; resetVisibility: () => void; focusId: string; toggle: (id: string) => void; setMany: (ids: string[], open: boolean) => void };
const ExpansionContext = createContext<ExpansionState>(null!);
function CategoryExpansion({ entries }: { entries: GuideEntry[] }) {
  const { expanded, setMany } = useContext(ExpansionContext);
  const allOpen = entries.length > 0 && entries.every(e => expanded.has(e.id));
  return <button className="category-expansion" onClick={() => setMany(entries.map(e => e.id), !allOpen)}>{allOpen ? "Collapse all" : "Expand all"}</button>;
}
function EntryToggle({ entry, children, ariaLabel }: { entry: GuideEntry; children?: ReactNode; ariaLabel?: string }) {
  const { data, expanded, toggle } = useContext(ExpansionContext);
  const duplicate = data.entries.some(e => e.id !== entry.id && e.name === entry.name && e.world === entry.world);
  const landmark = duplicate && entry.category === "trinity" ? entry.instructions.split(". ")[1] : "";
  return <button className="entry-toggle" aria-label={ariaLabel || entry.name} aria-expanded={expanded.has(entry.id)} aria-controls={`details-${entry.id}`} onClick={() => toggle(entry.id)}>
    <span>{children || entryTitle(entry)}{landmark && <span className="entry-landmark">{landmark.replace(/\.$/, "")}</span>}</span><span aria-hidden="true">{expanded.has(entry.id) ? "−" : "+"}</span>
  </button>;
}
function InlineDetails({entry, state, compactMaterial = false}: {entry: GuideEntry; state: PlayerState; compactMaterial?: boolean}) {
  const {data, expanded} = useContext(ExpansionContext);
  return <div className="entry-inline-details" id={`details-${entry.id}`} hidden={!expanded.has(entry.id)}>{expanded.has(entry.id) && <EntryDetails data={data} state={state} entry={entry} compactMaterial={compactMaterial} />}</div>;
}
function EntryRow({ entry: e, state, onToggle }: { entry: GuideEntry; state: PlayerState; onToggle: (id: string) => unknown }) {
  return <article className={`entry-row ${state.checks[e.id] ? "recorded" : ""}`} id={`row-${e.id}`}>
    <div className="entry-row-top">
      {e.checkable && <Check compact entry={e} state={state} onToggle={onToggle} />}
      <div className="entry-row-label"><h3><EntryToggle entry={e} /></h3>
        {e.area && (isTreasure(e) || !e.name.includes(e.area)) && <span className="entry-area">{e.area}</span>}
      </div>
    </div>
    <InlineDetails entry={e} state={state} />
  </article>;
}
function GroupedEntries({entries, state, onToggle}: {entries: GuideEntry[]; state: PlayerState; onToggle: (id: string) => unknown}) {
  return <div className="entry-list">{uniq(entries.map(e=>e.category)).map(category => {
    const group = entries.filter(e=>e.category === category);
    return <section className="entry-category" key={category}><div className="compact-category-heading"><h2>{label(category)}</h2><CategoryExpansion entries={group} /></div>{group.map(e=><EntryRow key={e.id} entry={e} state={state} onToggle={onToggle} />)}</section>;
  })}</div>;
}
function MissingEntry() {
  return <><PageTitle title="Entry not found" /><a href="#/kh1fm/contents">Return to contents</a></>;
}
function Search({ data, state, onToggle, query }: Common & { query: string }) {
  const normalized = query.trim().toLowerCase();
  const found = normalized
    ? data.entries.filter((e) =>
        [
          e.name,
          e.summary,
          e.world,
          e.area,
          e.instructions,
          ...e.tags,
          ...(e.aliases || []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized),
      )
    : [];
  return (
    <>
      <PageTitle title={normalized ? `Search: ${query}` : "Search"} aside={normalized ? <span className="heading-stat">{found.length} results</span> : undefined} />
      {found.length ? (
        <GroupedEntries entries={found} state={state} onToggle={onToggle} />
      ) : (
        <Empty>
          {normalized
            ? "Try an item name, a world, or a shorter phrase."
            : "Start typing in the search field above."}
        </Empty>
      )}
    </>
  );
}
function Reference({
  data,
  state,
  onToggle,
  challenges,
}: Common & { challenges: boolean }) {
  const {expanded, retained, resetVisibility, focusId} = useContext(ExpansionContext);
  const permitted = challenges
    ? ["cup", "boss", "minigame", "gummi", "achievement"]
    : [
        "weapon",
        "accessory",
        "magic",
        "summon",
        "ability",
        "enemy",
        "report",
        "guide",
      ];
  const scope = challenges ? "challenges" : "reference";
  const [category, setCategory] = useStoredChoice<string>(`ars-arcanum:kh1fm:${scope}:category`, "all"),
    [status, setStatus] = useStoredChoice<string>(`ars-arcanum:kh1fm:${scope}:status`, "all");
  const entries = data.entries.filter((e) => permitted.includes(e.category));
  const filtered = entries.filter(
    (e) =>
      (e.id === focusId || category === "all" || e.category === category) &&
      (e.id === focusId || (expanded.has(e.id) && retained.has(e.id)) || status === "all" ||
        (e.checkable &&
          (status === "completed"
            ? !!state.checks[e.id]
            : !state.checks[e.id]))),
  );
  return (
    <>
      <PageTitle title={challenges ? "Challenges & records" : "Reference"} aside={<span className="heading-stat">{filtered.length} entries</span>} />
      <div className="category-tabs">
        <button
          className={category === "all" ? "active" : ""}
          onClick={() => { resetVisibility(); setCategory("all"); }}
        >
          All entries <span>{entries.length}</span>
        </button>
        {permitted.map((c) => {
          const n = entries.filter((e) => e.category === c).length;
          return n > 0 ? (
            <button
              key={c}
              className={category === c ? "active" : ""}
              onClick={() => { resetVisibility(); setCategory(c); }}
            >
              {label(c)}
              <span>{n}</span>
            </button>
          ) : null;
        })}
      </div>
      <label className="select-field reference-remaining">
        <span className="sr-only">Filter reference entries by completion</span>
        <select value={status} onChange={(e) => { resetVisibility(); setStatus(e.target.value); }}>
          <option value="all">All reference entries</option>
          <option value="remaining">Remaining checkable goals</option>
          <option value="completed">Completed goals</option>
        </select>
      </label>
      {filtered.length ? (
        <GroupedEntries entries={filtered} state={state} onToggle={onToggle} />
      ) : (
        <Empty>
          No entries match this selection. Choose all reference entries to
          include records without completion checks.
        </Empty>
      )}
    </>
  );
}

function Quantity({
  value,
  onChange,
  name,
  unknown = false,
}: {
  value: number | undefined;
  onChange: (n: number | null) => void;
  name: string;
  unknown?: boolean;
}) {
  const [draft, setDraft] = useState(value === undefined ? "" : String(value));
  const [error, setError] = useState("");
  const dirty = useRef(false);
  useEffect(() => {
    setDraft(value === undefined ? "" : String(value));
    dirty.current = false;
  }, [value]);
  const commit = () => {
    if (!dirty.current) return;
    if (draft === "" && unknown) {
      setError("");
      dirty.current = false;
      onChange(null);
      return;
    }
    const n = Number(draft);
    if (!Number.isInteger(n) || n < 0 || n > 9999) {
      setError("Use a whole number from 0 to 9,999.");
      return;
    }
    setError("");
    dirty.current = false;
    onChange(n);
  };
  return (
    <span className="quantity-control">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label={name}
        aria-invalid={!!error}
        title={error || name}
        placeholder={unknown ? "?" : "0"}
        value={draft}
        onChange={(e) => { dirty.current = true; setDraft(e.target.value); }}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
      />
      {error && (
        <span className="quantity-error" role="alert">
          {error}
        </span>
      )}
    </span>
  );
}
function Synthesis({
  data,
  state,
  onToggle,
  player,
  initialTab,
}: Common & { player: Player; initialTab?: string }) {
  const {expanded, retained, resetVisibility, focusId} = useContext(ExpansionContext);
  const tab = ["materials", "plan"].includes(initialTab || "")
    ? initialTab!
    : "recipes";
  const [setFilter, setSetFilter] = useStoredChoice<string>("ars-arcanum:kh1fm:synthesis:set", "all"),
    [query, setQuery] = useStoredChoice<string>("ars-arcanum:kh1fm:synthesis:query", ""),
    [completion, setCompletion] = useStoredChoice<string>("ars-arcanum:kh1fm:synthesis:completion", "all");
  const remaining = completion === "remaining";
  const [farmNotice, setFarmNotice] = useState("");
  const [adding, setAdding] = useState(false);
  useEffect(() => { setFarmNotice(""); }, [initialTab]);
  async function addToFarm(action: () => Promise<void>, message: string) {
    setAdding(true);
    try { await action(); setFarmNotice(message); }
    catch(error) { setFarmNotice(error instanceof Error ? error.message : "Could not update the farming plan."); }
    finally { setAdding(false); }
  }
  const recipes = data.recipes.filter(
    (r) =>
      r.entryId === focusId || ((setFilter === "all" || r.set === Number(setFilter)) &&
      r.name.toLowerCase().includes(query.toLowerCase()) &&
      ((expanded.has(r.entryId) && retained.has(r.entryId)) || !remaining || !state.checks[r.entryId])),
  );
  const materials = data.entries.filter((e) => e.category === "material").sort(compareMaterials);
  const farmPlan = state.farmPlan || {};
  const plannedMaterials = materials.filter(e=>(farmPlan[e.id] || 0) > 0);
  const planCount = plannedMaterials.length;
  return (
    <>
      <PageTitle title="Synthesis" aside={<span className="heading-stat">{data.recipes.filter((r) => state.checks[r.entryId]).length}/{data.recipes.length} crafted</span>} />
      <div className="workshop-toolbar">
        <div
          className="segmented workshop-tabs"
          aria-label="Synthesis workspace"
        >
          {[
            ["recipes", "Recipes"],
            ["materials", "Materials"],
            ["plan", `Farming Plan${planCount ? ` · ${planCount}` : ""}`],
          ].map(([id, text]) => (
            <a
              key={id}
              className={tab === id ? "active" : ""}
              href={`#/kh1fm/synthesis/${id}`}
              aria-current={tab === id ? "page" : undefined}
            >
              {text}
            </a>
          ))}
        </div>

      </div>
      <p className="tool-note">{tab === "materials" ? "Enter owned stock; blank means unknown. Changes save when you leave the field." : tab === "plan" ? "Targets are total stock to have; remaining is target minus owned. Blank stock means unknown." : "Counts show owned / required; ? means unknown. Marking a recipe crafted does not deduct stock."}</p>
      {farmNotice && <p className="tool-note" role="status">{farmNotice}</p>}
      {tab === "recipes" ? (
        <>
          <div className="recipe-filters">
            <label className="search-control">
              <Icon name="search" size={16} />
              <span className="sr-only">Find a synthesis recipe</span>
              <input
                type="search"
                value={query}
                onChange={(e) => { resetVisibility(); setQuery(e.target.value); }}
                placeholder="Find a recipe…"
              />
            </label>
            <label className="select-field">
              <span>Set</span>
              <select
                value={setFilter}
                onChange={(e) => { resetVisibility(); setSetFilter(e.target.value); }}
              >
                <option value="all">All sets</option>
                {uniq(data.recipes.map((r) => r.set))
                  .sort((a, b) => a - b)
                  .map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
              </select>
            </label>
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={remaining}
                onChange={(e) => { resetVisibility(); setCompletion(e.target.checked ? "remaining" : "all"); }}
              />
              <span className="toggle-track" />
              Not yet crafted
            </label>
          </div>
          <div className="catalog-actions">
            <div className="results-note">{recipes.length} {recipes.length === 1 ? "recipe" : "recipes"}</div>
            <CategoryExpansion entries={recipes.flatMap(r => data.entries.filter(e=>e.id === r.entryId))} />
          </div>
          <div className="recipe-grid">
            {recipes.map((recipe) => {
              const entry = data.entries.find((e) => e.id === recipe.entryId);
              return (
                <article className="recipe-card" key={recipe.id} id={`row-${recipe.entryId}`}>
                  <div className="recipe-card-heading">
                    {entry && <Check compact entry={entry} state={state} onToggle={onToggle} />}
                    <span className="recipe-set">
                      SET {String(recipe.set).padStart(2, "0")}
                    </span>
                    <h2>{entry && <EntryToggle entry={entry} />}</h2>
                  </div>
                  <button className="button button-secondary farm-add-button" disabled={adding} aria-label={`Add ${recipe.name} ingredients to farming plan`} onClick={()=>addToFarm(()=>player.addRecipeToFarmPlan(recipe.id), `Added ingredients for one ${recipe.name} craft to the farming plan.`)}>Add to farming plan</button>
                  {entry && <InlineDetails entry={entry} state={state} />}
                </article>
              );
            })}
          </div>
          {!recipes.length && <Empty>Try another recipe name or set.</Empty>}
        </>
      ) : tab === "materials" ? (
        <>
          <div className="material-list">
            {uniq(materials.map(materialFamily)).map(family => {
              const group = materials.filter(e=>materialFamily(e) === family);
              return <section className="material-family" key={family}>
                <div className="compact-category-heading"><h2>{family}</h2><CategoryExpansion entries={group} /></div>
                {group.map(e=><article className="material-card" key={e.id} id={`row-${e.id}`}>
                  <div className="material-heading">
                    <div className="material-summary">
                      <h3><EntryToggle entry={e} /></h3>
                      <div className="material-drop-summary">{materialDropLines(e).map((line,i)=><p key={i}>{line.replace(/\.$/, "")}<span className="material-location">{materialDropLocation(e,line) && ` — ${materialDropLocation(e,line)}`}</span></p>)}
                      </div>
                    </div>
                    <label className="stock-field"><span>Owned</span><Quantity unknown value={state.inventory[e.id]} name={`${e.name} owned stock; blank means unknown`} onChange={n=>player.setInventory(e.id,n)} /></label>
                  </div>
                  <button className="button button-secondary farm-add-button" disabled={adding || (farmPlan[e.id] || 0) > 0} aria-label={`Add ${e.name} to farming plan`} onClick={()=>addToFarm(()=>player.addMaterialToFarmPlan(e.id), `${e.name} added with a target of 1. Edit the target in Farming Plan.`)}>{(farmPlan[e.id] || 0) > 0 ? "In farming plan" : "Add to farming plan"}</button>
                  <InlineDetails entry={e} state={state} compactMaterial />
                </article>)}
              </section>;
            })}
          </div>
        </>
      ) : (
        <>
          <div className="section-heading"><h2>Farming Plan</h2><span>{planCount} {planCount === 1 ? "material" : "materials"}</span></div>
          {plannedMaterials.length === 0 ? <Empty>Add materials or recipe ingredients to start a farming plan.</Empty> :
            <div className="material-list farm-plan-list">{uniq(plannedMaterials.map(materialFamily)).map(family => <section className="material-family" key={family}>
              <div className="compact-category-heading"><h2>{family}</h2></div>
              {plannedMaterials.filter(e=>materialFamily(e)===family).map(e=> {
                const target = farmPlan[e.id];
                const owned = state.inventory[e.id];
                const needed = owned === undefined ? null : Math.max(0,target-owned);
                return <article className="material-card farm-plan-row" id={`row-${e.id}`} key={e.id}>
                  <div className="farm-row-heading"><h3>{e.name}</h3><button className="icon-button" aria-label={`Remove ${e.name} from farming plan`} onClick={()=>player.setFarmTarget(e.id,0)}><Icon name="close" size={16} /></button></div>
                  <div className="material-drop-summary">{materialDropLines(e).map((line,i)=><p key={i}>{line.replace(/\.$/, "")}<span className="material-location">{materialDropLocation(e,line) && ` — ${materialDropLocation(e,line)}`}</span></p>)}</div>
                  <div className="farm-target-controls">
                    <label><span>Target</span><Quantity value={target} name={`${e.name} target stock`} onChange={n=>player.setFarmTarget(e.id,n || 0)} /></label>
                    <label><span>Owned</span><Quantity unknown value={owned} name={`${e.name} owned stock`} onChange={n=>player.setInventory(e.id,n)} /></label>
                    <div className={needed === 0 ? "stock-enough" : "needed-count"}><span>Remaining</span><strong aria-label={`${e.name}: ${needed === null ? "unknown" : needed} remaining`}>{needed === null ? "?" : needed}</strong></div>
                  </div>
                  <EntryToggle entry={e} ariaLabel={`More info about ${e.name}`}>More info</EntryToggle>
                  <InlineDetails entry={e} state={state} compactMaterial />
                </article>;
              })}
            </section>)}</div>}
        </>
      )}
    </>
  );
}
function Settings({
  data,
  state,
  player,
  notify,
}: Common & { player: Player; notify: (message: string) => void }) {
  const [importText, setImportText] = useState(""),
    [preview, setPreview] = useState<ReturnType<
      Player["previewImport"]
    > | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [recoveryReview, setRecoveryReview] = useState(false);
  const installation = useSyncExternalStore(subscribeInstallation, getInstallationState);
  async function readBackup(file: File | undefined) {
    if (!file) return;
    try {
      const text = await file.text();
      const next = player.previewImport(text);
      setImportText(text);
      setPreview(next);
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "This backup could not be read.",
      );
      setPreview(null);
    }
  }
  async function importNow() {
    setBusy(true);
    try {
      await player.importBackup(importText);
      setPreview(null);
      setImportText("");
      notify("Your backup was restored.");
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "The backup could not be saved.",
      );
    } finally {
      setBusy(false);
    }
  }
  function download() {
    const blob = new Blob([player.exportBackup()], {
        type: "application/json",
      }),
      url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = `ars-arcanum-kh1fm-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify("Backup prepared for download.");
  }
  const collections = data.entries.filter((e) => e.collectible && e.checkable);
  const count = formatCount(collections, state);
  const checks = data.entries.filter((e) => e.checkable);
  const referenceChecks = checks.filter(
    (e) => !e.collectible && e.category !== "recipe",
  );
  return (
    <>
      <PageTitle title="Progress & backups" />
      <div className="progress-summary-grid">
        <div>
          <span className="eyebrow">World collectibles</span>
          <strong>
            {count.done}
            <small> / {count.total}</small>
          </strong>
          <p>Recorded acquisition checks</p>
        </div>
        <div>
          <span className="eyebrow">Synthesis catalog</span>
          <strong>
            {data.recipes.filter((r) => state.checks[r.entryId]).length}
            <small> / {data.recipes.length}</small>
          </strong>
          <p>Historically crafted recipes</p>
        </div>
        <div>
          <span className="eyebrow">Other named goals</span>
          <strong>
            {referenceChecks.filter((e) => state.checks[e.id]).length}
            <small> / {referenceChecks.length}</small>
          </strong>
          <p>Separate reference & challenge checks</p>
        </div>
      </div>
      <section className="settings-section">
        <div>
          <h2>Saved on this device</h2>
          <p>
            Checks, material stock, and farming targets save locally. Clearing
            browser data can remove them. A backup lets you restore your
            journal.
          </p>
          <p className="fine-print">
            Last recorded change:{" "}
            {state.updatedAt
              ? new Date(state.updatedAt).toLocaleString()
              : "No changes yet"}
            . No game-save synchronization.
          </p>
        </div>
        <div className="settings-actions">
          <button className="button" onClick={download}>
            <Icon name="download" size={17} />
            Export backup
          </button>
          <label className="button button-secondary file-upload">
            <Icon name="upload" size={17} />
            Import backup
            <input
              type="file"
              accept="application/json,.json"
              onChange={(e) => {
                void readBackup(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </label>
          <button
            className="button button-secondary"
            disabled={!player.canUndo}
            onClick={() => player.undo()}
          >
            <Icon name="undo" size={17} />
            Undo last change
          </button>
          <button
            className="button button-secondary"
            onClick={() => setRecoveryReview(true)}
          >
            Restore pre-import snapshot
          </button>
        </div>
      </section>
      {recoveryReview && (
        <section
          className="import-preview"
          aria-label="Review recovery restore"
        >
          <span className="eyebrow">Recover a previous journal</span>
          <h2>Restore the last pre-import snapshot?</h2>
          <p>
            This replaces your current KH1FM progress with the recovery snapshot
            saved before the last import. If no snapshot exists, your journal
            remains unchanged.
          </p>
          <div className="button-row">
            <button
              className="button"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                try {
                  await player.restoreRecovery();
                  setRecoveryReview(false);
                  setError("");
                  notify("Recovery snapshot restored.");
                } catch (err) {
                  setError(
                    err instanceof Error ? err.message : "Recovery failed.",
                  );
                } finally {
                  setBusy(false);
                }
              }}
            >
              Restore snapshot
            </button>
            <button
              className="button button-secondary"
              onClick={() => setRecoveryReview(false)}
            >
              Cancel
            </button>
          </div>
        </section>
      )}
      {error && (
        <div className="save-alert" role="alert">
          {error}
        </div>
      )}
      {preview && (
        <section className="import-preview" aria-label="Review backup import">
          <span className="eyebrow">Review before replacing</span>
          <h2>Restore this Kingdom Hearts Final Mix backup?</h2>
          <p>
            This replaces this device’s current KH1FM checks, material stock,
            and farming targets. A recovery snapshot is kept before the replacement.
          </p>
          <dl className="facts-list">
            <div>
              <dt>Completed checks</dt>
              <dd>{preview.checked}</dd>
            </div>
            <div>
              <dt>Saved stock entries</dt>
              <dd>{preview.inventoryItems}</dd>
            </div>
            <div>
              <dt>Farming targets</dt>
              <dd>{preview.farmingTargets}</dd>
            </div>
          </dl>
          {preview.warnings.map((w, i) => (
            <p key={i} className="uncertainty">
              {w}
            </p>
          ))}
          <div className="button-row">
            <button className="button" disabled={busy} onClick={importNow}>
              {busy ? "Restoring…" : "Replace progress with backup"}
            </button>
            <button
              className="button button-secondary"
              onClick={() => setPreview(null)}
            >
              Cancel
            </button>
          </div>
        </section>
      )}
      <section className="settings-section">
        <div>
          <h2>Offline journal & Data Jiminy</h2>
          <p>
            {installation.offline
              ? "Saved journal files are available on this device."
              : "The journal caches guide pages for offline use when installation completes. Assistant models need their own one-time download in Data Jiminy."}{" "}
            Data Jiminy’s conversation stays in memory for this session and
            clears when you reload or leave the journal.
          </p>
          <button className="button button-secondary" disabled={installation.checking} onClick={() => void checkForAppUpdate()}>
            {installation.checking ? "Checking for updates…" : "Check for updates"}
          </button>
          <p className="fine-print" role="status">{installation.message} · App build {BUILD_REVISION}</p>
          {installation.update && (
            <button
              className="button"
              onClick={() => void applyAppUpdate()}
            >
              Load the available update
            </button>
          )}
        </div>
        <span className="subtle-seal">
          <Icon name="book" size={30} />
        </span>
      </section>
      <section className="coverage-section">
        <h2>Guide coverage</h2>
        <div className="coverage-list">
          {data.coverage.map((c, i) => (
            <article key={`${c.category}-${i}`} className="coverage-row">
              <div>
                <h3>{c.label || label(c.category)}</h3>
              </div>
              <div className="coverage-count">
                <strong>
                  {c.actual}
                  {c.expected !== null && <span> / {c.expected}</span>}
                </strong>
                <small>
                  {c.complete
                    ? "Declared set covered"
                    : "Partial / uncertain coverage"}
                </small>
              </div>
            </article>
          ))}
        </div>
        <p className="fine-print">
          Guide version {data.version}. This app is an unofficial fan companion
          and is not affiliated with Disney or Square Enix. World collectible
          counts do not certify official Journal completion, story completion,
          or achievement eligibility.
        </p>
      </section>
    </>
  );
}
