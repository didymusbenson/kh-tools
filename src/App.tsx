import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { GameData, GuideEntry, PlayerState, Recipe } from "./domain/types";
import { usePlayerState } from "./state/usePlayerState";
import {
  calculatePlan,
  recipeRequirements,
  getMaterialRoutes,
} from "./domain/planner";
import { collectibleProgress } from "./domain/progress";
import { Icon, type IconName } from "./components/Icon";
import { DataJiminy } from "./components/DataJiminy";
import { EntryMedia } from "./components/EntryMedia";
import "./styles.css";

const base = import.meta.env.BASE_URL;
const installation = { offline: false, update: false };
window.addEventListener("ars-offline-ready", () => {
  installation.offline = true;
});
window.addEventListener("ars-update-ready", () => {
  installation.update = true;
});
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
function worldReturnHref() {
  try {
    const saved = localStorage.getItem("ars-arcanum:world-route");
    return saved?.startsWith("kh1fm/worlds") ? `#/${saved}` : "#/kh1fm/worlds";
  } catch {
    return "#/kh1fm/worlds";
  }
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
const nav: { id: string; label: string; icon: IconName; chapter: string }[] = [
  { id: "contents", label: "Contents", icon: "book", chapter: "01" },
  { id: "worlds", label: "World collectibles", icon: "world", chapter: "02" },
  {
    id: "synthesis",
    label: "Synthesis workshop",
    icon: "spark",
    chapter: "03",
  },
  { id: "reference", label: "Reference library", icon: "sword", chapter: "04" },
  {
    id: "challenges",
    label: "Challenges & records",
    icon: "cup",
    chapter: "05",
  },
  {
    id: "progress",
    label: "Progress & settings",
    icon: "settings",
    chapter: "06",
  },
];
function routeTo(path: string) {
  window.location.hash = `/${path}`;
}
function entryHref(id: string) {
  return `#/kh1fm/entry/${encodeURIComponent(id)}`;
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
  eyebrow,
  title,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="page-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
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
    ready: false,
  },
  {
    id: "bbsfm",
    name: "Birth by Sleep",
    edition: "Final Mix",
    number: "BBS",
    art: "bbs.jpg",
    ready: false,
  },
  {
    id: "dddhd",
    name: "Dream Drop Distance",
    edition: "HD",
    number: "DDD",
    art: "ddd.png",
    ready: false,
  },
  {
    id: "kh02",
    name: "A fragmentary passage",
    edition: "Kingdom Hearts 0.2",
    number: "0.2",
    art: "",
    ready: false,
  },
  {
    id: "kh3",
    name: "Kingdom Hearts III",
    edition: "& Re Mind",
    number: "III",
    art: "",
    ready: false,
  },
];
function ResumeGame({ data }: { data: GameData }) {
  const player = usePlayerState(data);
  const route = player.state.lastRoute;
  if (
    !player.ready ||
    !/^#\/kh1fm\/(worlds|entry|synthesis|reference|challenges|progress)(?:\/|$)/.test(
      route,
    )
  )
    return null;
  return (
    <a className="cover-cta" href={route}>
      Resume last page <Icon name="arrow" size={16} />
    </a>
  );
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
                  if (g.ready) routeTo("kh1fm/contents");
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
            {previous === "kh1fm"
              ? "Welcome back. Your KH1 Final Mix journal is ready."
              : "Begin with Kingdom Hearts Final Mix. More volumes are in preparation."}
          </p>
          {data && <ResumeGame data={data} />}
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
            <span className="eyebrow gold">
              {game.ready ? "The first volume" : "A future volume"}
            </span>
            <h2>{game.name}</h2>
            <p>{game.edition}</p>
            {game.ready ? (
              <a href="#/kh1fm/contents" className="cover-cta">
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
  const parts = route.split("/");
  const section = parts[1] || "contents";
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
    if (section !== "search") {
      journalScroll().scrollTo({ top: 0, behavior: "instant" });
      requestAnimationFrame(() =>
        mainRef.current?.focus({ preventScroll: true }),
      );
    }
    if (player.ready) void player.rememberRoute(`#/${route}`);
    try {
      localStorage.setItem("ars-arcanum:last-game", "kh1fm");
    } catch {}
  }, [route, player.ready]);
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 4500);
    return () => clearTimeout(timer);
  }, [message]);
  async function toggle(id: string) {
    await player.toggleCheck(id);
  }
  const props = { data, state, onToggle: toggle };
  const title =
    nav.find((n) => n.id === section)?.label ||
    (section === "entry" ? "Journal entry" : "Search the journal");
  return (
    <div className="journal-app">
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
              {!player.ready ? (
                <div className="empty-state">Restoring your journal…</div>
              ) : section === "contents" ? (
                <Contents {...props} />
              ) : section === "worlds" ? (
                <Worlds
                  {...props}
                  world={parts[2] ? decodeURIComponent(parts[2]) : undefined}
                />
              ) : section === "synthesis" ? (
                <Synthesis {...props} player={player} initialTab={parts[2]} />
              ) : section === "reference" || section === "challenges" ? (
                <Reference {...props} challenges={section === "challenges"} />
              ) : section === "progress" ? (
                <Settings {...props} player={player} notify={setMessage} />
              ) : section === "entry" ? (
                <EntryPage
                  {...props}
                  id={decodeURIComponent(parts.slice(2).join("/"))}
                />
              ) : section === "search" ? (
                <Search {...props} query={search} />
              ) : (
                <Contents {...props} />
              )}
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
function Contents({ data, state }: Common) {
  const collectibles = data.entries.filter((e) => e.collectible && e.checkable);
  const worlds = uniq(collectibles.map((e) => e.world || "Other collections"));
  const count = formatCount(collectibles, state);
  const checkedRecipes = data.recipes.filter(
    (r) => state.checks[r.entryId],
  ).length;
  return (
    <>
      <PageTitle
        eyebrow="Volume I · The beginning of a journey"
        title="A record of your adventure."
        aside={
          <div className="chapter-stamp" aria-hidden="true">
            I<span>FINAL MIX</span>
          </div>
        }
      >
        Keep track of the things you find. Find the things you’re missing.
      </PageTitle>
      <div className="contents-feature">
        <div className="feature-copy">
          <span className="eyebrow">
            Your collection, one discovery at a time
          </span>
          <h2>
            There’s always something
            <br />
            left to find.
          </h2>
          <p>
            Treasure chests, lost puppies, hidden marks. Explore the world index
            for locations, prerequisites, and one-tap checks.
          </p>
          <a href="#/kh1fm/worlds" className="button button-cream">
            Explore the worlds <Icon name="arrow" size={17} />
          </a>
        </div>
        <div className="feature-chart">
          <span className="feature-count">
            {count.done}
            <span>/{count.total}</span>
          </span>
          <p>World collectible checks</p>
          <div className="feature-rule" />
          <span>{worlds.length} world & collection groups</span>
          <small>
            Counts cover the records in this guide,
            <br />
            not official Journal completion.
          </small>
        </div>
        <span className="feature-spark" aria-hidden="true">
          ✧
        </span>
      </div>
      <div className="section-heading">
        <h2>Turn to a chapter</h2>
        <span className="eyebrow">The useful things, all together</span>
      </div>
      <div className="chapter-grid">
        {[
          {
            id: "worlds",
            icon: "world" as IconName,
            title: "World collectibles",
            text: "Compact checks, complete locations, and everything in between.",
            meta: `${worlds.length} world & collection groups`,
          },
          {
            id: "synthesis",
            icon: "spark" as IconName,
            title: "Synthesis workshop",
            text: "Recipes, material sources, and a plan for your next creation.",
            meta: `${data.recipes.length} recipes · ${checkedRecipes} crafted`,
          },
          {
            id: "reference",
            icon: "sword" as IconName,
            title: "Reference library",
            text: "Weapons, accessories, magic, abilities, and adversaries.",
            meta: "Find it. Understand it. Get it.",
          },
          {
            id: "challenges",
            icon: "cup" as IconName,
            title: "Challenges & records",
            text: "Coliseum cups, optional encounters, minigames, and more.",
            meta: "Separate goals for the extra mile",
          },
        ].map((card, i) => (
          <a href={`#/kh1fm/${card.id}`} className="chapter-card" key={card.id}>
            <span className="chapter-card-icon">
              <Icon name={card.icon} size={25} />
            </span>
            <span className="chapter-card-number">0{i + 2}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <span className="chapter-card-meta">
              {card.meta}
              <Icon name="arrow" size={17} />
            </span>
          </a>
        ))}
      </div>
      <div className="journal-note">
        <Icon name="book" size={22} />
        <div>
          <strong>A living field guide</strong>
          <p>
            Checks save on this device. Follow journal links for locations,
            rewards, and related entries.{" "}
            <a href="#/kh1fm/progress">
              Review coverage and back up your progress.
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

function Filters({
  category,
  onCategory,
  options,
  status,
  onStatus,
}: {
  category: string;
  onCategory: (v: string) => void;
  options: string[];
  status: string;
  onStatus: (v: string) => void;
}) {
  return (
    <div className="filter-bar">
      <label className="select-field">
        <Icon name="filter" size={16} />
        <span className="sr-only">Filter by category</span>
        <select value={category} onChange={(e) => onCategory(e.target.value)}>
          <option value="all">All categories</option>
          {options.map((c) => (
            <option key={c} value={c}>
              {label(c)}
            </option>
          ))}
        </select>
      </label>
      <label className="select-field">
        <span className="sr-only">Filter by completion</span>
        <select value={status} onChange={(e) => onStatus(e.target.value)}>
          <option value="all">All records</option>
          <option value="remaining">Remaining only</option>
          <option value="completed">Completed only</option>
        </select>
      </label>
    </div>
  );
}
function Worlds({ data, state, onToggle, world }: Common & { world?: string }) {
  const [category, setCategory] = useStoredChoice<string>(
      "ars-arcanum:world-category",
      "all",
    ),
    [status, setStatus] = useStoredChoice<string>(
      "ars-arcanum:world-status",
      "all",
    ),
    [view, setView] = useStoredChoice<"compact" | "details">(
      "ars-arcanum:world-view",
      "compact",
    );
  useEffect(() => {
    const route =
      "kh1fm/worlds" + (world ? "/" + encodeURIComponent(world) : "");
    try {
      localStorage.setItem("ars-arcanum:world-route", route);
      const scroll = Number(
        sessionStorage.getItem("ars-arcanum:scroll:" + route) || 0,
      );
      requestAnimationFrame(() =>
        journalScroll().scrollTo({ top: scroll, behavior: "instant" }),
      );
    } catch {}
    return () => {
      try {
        sessionStorage.setItem(
          "ars-arcanum:scroll:" + route,
          String(journalScrollY()),
        );
      } catch {}
    };
  }, [world]);
  const entries = data.entries.filter((e) => e.collectible && e.checkable);
  const worlds = uniq(entries.map((e) => e.world || "Other collections"));
  const worldEntries = world
    ? entries.filter((e) => (e.world || "Other collections") === world)
    : entries;
  const count = formatCount(worldEntries, state);
  const filtered = worldEntries.filter(
    (e) =>
      (category === "all" || e.category === category) &&
      (status === "all" ||
        (status === "completed" ? !!state.checks[e.id] : !state.checks[e.id])),
  );
  return (
    <>
      <PageTitle
        eyebrow="Chapter 02 · A world of discoveries"
        title={world || "World collectibles"}
      >
        {world
          ? "Locations, conditions, and one shared check for every discovery."
          : "An index of things to find, grouped by the worlds they call home."}
      </PageTitle>
      <div className="world-tabs" aria-label="Worlds">
        <a href="#/kh1fm/worlds" className={!world ? "active" : ""}>
          All worlds
        </a>
        {worlds.map((w) => (
          <a
            href={`#/kh1fm/worlds/${encodeURIComponent(w)}`}
            key={w}
            className={world === w ? "active" : ""}
          >
            {w}
          </a>
        ))}
      </div>
      <div className="collection-tools">
        <div className="collection-progress">
          <Progress
            {...count}
            caption={
              world
                ? "World collectible checks"
                : "All recorded collectible checks"
            }
          />
          <small>
            Guide coverage may be incomplete.{" "}
            <a href="#/kh1fm/progress">View coverage</a>
          </small>
        </div>
        <div className="segmented" aria-label="Collection presentation">
          <button
            className={view === "compact" ? "active" : ""}
            onClick={() => setView("compact")}
            aria-pressed={view === "compact"}
          >
            Compact index
          </button>
          <button
            className={view === "details" ? "active" : ""}
            onClick={() => setView("details")}
            aria-pressed={view === "details"}
          >
            Location details
          </button>
        </div>
      </div>
      <Filters
        category={category}
        onCategory={setCategory}
        options={uniq(entries.map((e) => e.category))}
        status={status}
        onStatus={setStatus}
      />
      <div className="results-note">
        {filtered.length} matching{" "}
        {filtered.length === 1 ? "record" : "records"}{" "}
        <span>· Filters do not change collection totals.</span>
      </div>
      {!filtered.length ? (
        <Empty>Try a different category or choose “All records.”</Empty>
      ) : view === "details" ? (
        <div className="entry-list">
          {filtered.map((e) => (
            <EntryRow key={e.id} entry={e} state={state} onToggle={onToggle} />
          ))}
        </div>
      ) : (
        <div className="world-grid">
          {(world ? [world] : worlds).map((w) => {
            const list = filtered.filter(
              (e) => (e.world || "Other collections") === w,
            );
            if (!list.length) return null;
            const all = entries.filter(
              (e) => (e.world || "Other collections") === w,
            );
            const wc = formatCount(all, state);
            return (
              <section className="world-card" key={w}>
                <div className="world-card-heading">
                  <span className="world-emblem">
                    <Icon name="world" size={24} />
                  </span>
                  <div>
                    <span className="eyebrow">World collection</span>
                    <h2>
                      <a href={`#/kh1fm/worlds/${encodeURIComponent(w)}`}>
                        {w}
                      </a>
                    </h2>
                  </div>
                  <span className="world-count">
                    {wc.done}
                    <span>/{wc.total}</span>
                  </span>
                </div>
                {uniq(list.map((e) => e.category)).map((c) => (
                  <div className="compact-category" key={c}>
                    <div className="compact-category-heading">
                      <h3>{label(c)}</h3>
                      <span>
                        {
                          list.filter(
                            (e) => e.category === c && state.checks[e.id],
                          ).length
                        }
                        /{all.filter((e) => e.category === c).length}
                        {c === "dalmatian" ? " groups" : ""}
                      </span>
                    </div>
                    <div className="compact-marks">
                      {list
                        .filter((e) => e.category === c)
                        .map((e, i) => (
                          <div
                            className={`compact-item ${state.checks[e.id] ? "complete" : ""}`}
                            key={e.id}
                          >
                            <Check
                              compact
                              entry={e}
                              state={state}
                              onToggle={onToggle}
                            />
                            <a
                              href={entryHref(e.id)}
                              title={`Open ${e.name} location`}
                            >
                              <span>
                                {e.category === "dalmatian"
                                  ? e.name.replace(/Dalmatian(?:s)?\s*/i, "")
                                  : e.name}
                              </span>
                              <Icon name="arrow" size={12} />
                            </a>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
                <a
                  className="world-details-link"
                  href={`#/kh1fm/worlds/${encodeURIComponent(w)}`}
                  onClick={() => setView("details")}
                >
                  View location details <Icon name="arrow" size={15} />
                </a>
              </section>
            );
          })}
        </div>
      )}
      <p className="fine-print">
        Compact checks and location rows share the same saved record. Ordering
        is this app’s index unless the item itself has an official number. A
        Dalmatian group is one check, containing three puppies.
      </p>
    </>
  );
}
function EntryRow({
  entry: e,
  state,
  onToggle,
}: {
  entry: GuideEntry;
  state: PlayerState;
  onToggle: (id: string) => unknown;
}) {
  return (
    <article
      className={`entry-row ${state.checks[e.id] ? "recorded" : ""}`}
      id={`row-${e.id}`}
    >
      <div className="entry-row-top">
        <div>
          <span className="entry-kicker">
            {label(e.category)}
            {e.world && ` · ${e.world}`}
          </span>
          <h3>
            <a href={entryHref(e.id)}>{e.name}</a>
          </h3>
          {e.area && <p className="entry-area">{e.area}</p>}
        </div>
        {e.checkable && <Check entry={e} state={state} onToggle={onToggle} />}
      </div>
      <p>{e.instructions || e.summary}</p>
      {e.prerequisites && (
        <div className="prerequisite">
          <Icon name="info" size={15} />
          <span>
            <strong>Requires:</strong> {e.prerequisites}
          </span>
        </div>
      )}
      {e.reward && (
        <p className="entry-reward">
          <strong>Reward:</strong> {e.reward}
        </p>
      )}
      <div className="entry-row-footer">
        <a href={entryHref(e.id)}>
          Open entry <Icon name="arrow" size={14} />
        </a>
      </div>
    </article>
  );
}

function EntryPage({ data, state, onToggle, id }: Common & { id: string }) {
  const e = data.entries.find((e) => e.id === id);
  if (!e)
    return (
      <>
        <PageTitle eyebrow="Journal entry" title="This page wasn’t found." />
        <p>
          The link may refer to a different guide edition or an entry that has
          moved.
        </p>
        <a className="button" href="#/kh1fm/contents">
          Return to contents
        </a>
      </>
    );
  const related = data.entries.filter((item) => e.relatedIds.includes(item.id));
  const recipe = data.recipes.find((r) => r.entryId === id);
  const internalFacts = new Set([
    "countingUnit",
    "sourceRow",
    "acquisitionId",
    "recordGame",
    "recordType",
    "steamAppId",
    "platformApiId",
    "evidenceKind",
    "sourceCheckedAt",
    "source reconciliation",
    "legacy correction",
    "earliestUnlockStatus",
  ]);
  const visibleFacts = Object.entries(e.facts || {}).filter(
    ([key]) => !internalFacts.has(key),
  );
  return (
    <>
      <a
        className="text-back"
        href={
          e.collectible
            ? worldReturnHref()
            : e.category === "recipe"
              ? "#/kh1fm/synthesis"
              : "#/kh1fm/reference"
        }
      >
        <Icon name="back" size={16} />
        Back to{" "}
        {e.collectible
          ? "world collectibles"
          : e.category === "recipe"
            ? "synthesis"
            : "reference"}
      </a>
      <PageTitle
        eyebrow={`${label(e.category)} · Kingdom Hearts Final Mix`}
        title={e.name}
        aside={
          e.checkable && <Check entry={e} state={state} onToggle={onToggle} />
        }
      >
        {e.summary}
      </PageTitle>
      <div
        className={`entry-detail ${e.uncertainty ? "" : "entry-detail-full"}`}
      >
        <div className="entry-detail-main">
          <EntryMedia media={e.media} />
          {(e.world || e.area) && (
            <div className="location-banner">
              <Icon name="world" size={26} />
              <div>
                <span className="eyebrow">Location</span>
                <strong>
                  {e.world}
                  {e.world && e.area ? " · " : ""}
                  {e.area}
                </strong>
              </div>
            </div>
          )}
          <section>
            <h2>{e.collectible ? "How to find it" : "Journal notes"}</h2>
            <p className="readable-text">{e.instructions}</p>
          </section>
          {e.prerequisites && (
            <section className="detail-condition">
              <span className="eyebrow">Acquisition conditions</span>
              <p>{e.prerequisites}</p>
            </section>
          )}
          {e.reward && (
            <section>
              <h2>Reward / effect</h2>
              <p>{e.reward}</p>
            </section>
          )}
          {e.missability && (
            <section>
              <h2>Revisit & missability</h2>
              <p>{e.missability}</p>
            </section>
          )}
          {recipe && (
            <section>
              <h2>Ingredients</h2>
              <ul className="ingredient-list">
                {recipe.ingredients.map((ing) => (
                  <li key={ing.itemId}>
                    <a href={entryHref(ing.itemId)}>{ing.name}</a>
                    <strong>{ing.quantity}</strong>
                  </li>
                ))}
              </ul>
              <p className="fine-print">{recipe.unlock}</p>
              <a href="#/kh1fm/synthesis" className="button">
                Open synthesis planner <Icon name="arrow" size={16} />
              </a>
            </section>
          )}
          {visibleFacts.length > 0 && (
            <section>
              <h2>At a glance</h2>
              <dl className="facts-list">
                {visibleFacts.map(([key, value]) => (
                  <div key={key}>
                    <dt>
                      {key
                        .replace(/([a-z])([A-Z])/g, "$1 $2")
                        .replaceAll("_", " ")}
                    </dt>
                    <dd>{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
        {e.uncertainty && (
          <aside className="entry-source-panel">
            <span className="eyebrow">A detail to check</span>
            <h2>Entry note</h2>
            <p>{e.uncertainty}</p>
          </aside>
        )}
      </div>
      {related.length > 0 && (
        <section className="related-section">
          <div className="section-heading">
            <h2>Cross-references</h2>
            <span className="eyebrow">Keep following the thread</span>
          </div>
          <div className="related-grid">
            {related.map((r) => (
              <a href={entryHref(r.id)} key={r.id}>
                <span>
                  <small>{label(r.category)}</small>
                  <strong>{r.name}</strong>
                </span>
                <Icon name="arrow" size={17} />
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  );
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
      <PageTitle eyebrow="The journal index" title="Find your next discovery.">
        {normalized
          ? `${found.length} ${found.length === 1 ? "entry" : "entries"} matching “${query}” in Kingdom Hearts Final Mix.`
          : "Search by item, world, material, adversary, or anything you’re trying to find."}
      </PageTitle>
      {found.length ? (
        <div className="entry-list">
          {found.map((e) => (
            <EntryRow entry={e} key={e.id} state={state} onToggle={onToggle} />
          ))}
        </div>
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
  const [category, setCategory] = useState("all"),
    [status, setStatus] = useState("all");
  useEffect(() => {
    setCategory("all");
    setStatus("all");
  }, [challenges]);
  const entries = data.entries.filter((e) => permitted.includes(e.category));
  const filtered = entries.filter(
    (e) =>
      (category === "all" || e.category === category) &&
      (status === "all" ||
        (e.checkable &&
          (status === "completed"
            ? !!state.checks[e.id]
            : !state.checks[e.id]))),
  );
  return (
    <>
      <PageTitle
        eyebrow={
          challenges
            ? "Chapter 05 · The extra mile"
            : "Chapter 04 · Notes worth keeping"
        }
        title={challenges ? "Challenges & records" : "The reference library"}
      >
        {challenges
          ? "Optional encounters, records, and named goals. These checks are separate from world collectibles."
          : "Equipment, spells, abilities, adversaries, and the useful details behind them."}
      </PageTitle>
      <div className="category-tabs">
        <button
          className={category === "all" ? "active" : ""}
          onClick={() => setCategory("all")}
        >
          All entries <span>{entries.length}</span>
        </button>
        {permitted.map((c) => {
          const n = entries.filter((e) => e.category === c).length;
          return n > 0 ? (
            <button
              key={c}
              className={category === c ? "active" : ""}
              onClick={() => setCategory(c)}
            >
              {label(c)}
              <span>{n}</span>
            </button>
          ) : null;
        })}
      </div>
      <label className="select-field reference-remaining">
        <span className="sr-only">Filter reference entries by completion</span>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All reference entries</option>
          <option value="remaining">Remaining checkable goals</option>
          <option value="completed">Completed goals</option>
        </select>
      </label>
      <div className="results-note">{filtered.length} matching records</div>
      {filtered.length ? (
        <div className="entry-list">
          {filtered.map((e) => (
            <EntryRow key={e.id} entry={e} state={state} onToggle={onToggle} />
          ))}
        </div>
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
  useEffect(() => setDraft(value === undefined ? "" : String(value)), [value]);
  const commit = () => {
    if (draft === "" && unknown) {
      setError("");
      onChange(null);
      return;
    }
    const n = Number(draft);
    if (!Number.isInteger(n) || n < 0 || n > 9999) {
      setError("Use a whole number from 0 to 9,999.");
      return;
    }
    setError("");
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
        onChange={(e) => setDraft(e.target.value)}
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
  const tab = ["materials", "plan"].includes(initialTab || "")
    ? initialTab!
    : "recipes";
  const [setFilter, setSetFilter] = useState("all"),
    [query, setQuery] = useState(""),
    [remaining, setRemaining] = useState(false),
    [routes, setRoutes] = useState<Record<string, string>>({});
  const recipes = data.recipes.filter(
    (r) =>
      (setFilter === "all" || r.set === Number(setFilter)) &&
      r.name.toLowerCase().includes(query.toLowerCase()) &&
      (!remaining || !state.checks[r.entryId]),
  );
  const materials = data.entries.filter((e) => e.category === "material");
  const plan = useMemo(
    () =>
      calculatePlan(data.recipes, state.plan, state.inventory, {
        inventoryEnabled: state.inventoryEnabled,
        routeChoices: routes,
        mode: state.planMode ?? "selected",
      }),
    [
      data.recipes,
      state.plan,
      state.inventory,
      state.inventoryEnabled,
      state.planMode,
      routes,
    ],
  );
  const selected = data.recipes.filter((r) => state.plan[r.id] > 0);
  const planCount = Object.values(state.plan).reduce((sum, n) => sum + n, 0);
  return (
    <>
      <PageTitle
        eyebrow="Chapter 03 · Made of little discoveries"
        title="The synthesis workshop"
      >
        Find a recipe. Gather what you need. Make something worth keeping.
      </PageTitle>
      <div className="workshop-intro">
        <Icon name="spark" size={27} />
        <div>
          <strong>Catalog history and material stock are independent.</strong>
          <p>
            “Crafted” records a past achievement. It never deducts materials.
            Your plan calculates what to gather for the quantities you choose.
          </p>
        </div>
      </div>
      <div className="workshop-toolbar">
        <div
          className="segmented workshop-tabs"
          aria-label="Synthesis workspace"
        >
          {[
            ["recipes", "Recipes"],
            ["materials", "Materials"],
            ["plan", `Craft plan${planCount ? ` · ${planCount}` : ""}`],
          ].map(([id, text]) => (
            <a
              key={id}
              className={tab === id ? "active" : ""}
              href={`#/kh1fm/synthesis/${id}`}
            >
              {text}
            </a>
          ))}
        </div>
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={state.inventoryEnabled}
            onChange={(e) => player.setInventoryEnabled(e.target.checked)}
          />
          <span className="toggle-track" />
          Track owned materials
        </label>
      </div>
      {state.inventoryEnabled && (
        <div className="inventory-note">
          <strong>Owned / required</strong> compares manually entered stock with
          recipe needs. “?” means you haven’t entered a count. Edits save when
          you leave the field; clearing a field restores unknown.
        </div>
      )}
      {tab === "recipes" ? (
        <>
          <div className="recipe-filters">
            <label className="search-control">
              <Icon name="search" size={16} />
              <span className="sr-only">Find a synthesis recipe</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find a recipe…"
              />
            </label>
            <label className="select-field">
              <span>Set</span>
              <select
                value={setFilter}
                onChange={(e) => setSetFilter(e.target.value)}
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
                onChange={(e) => setRemaining(e.target.checked)}
              />
              <span className="toggle-track" />
              Not yet crafted
            </label>
          </div>
          <div className="catalog-actions">
            <div className="results-note">
              {recipes.length} recipes ·{" "}
              {data.recipes.filter((r) => state.checks[r.entryId]).length}/
              {data.recipes.length} historically crafted
            </div>
            <button
              className="button button-secondary"
              onClick={async () => {
                await player.setPlanGoals(
                  Object.fromEntries(
                    data.recipes
                      .filter((r) => !state.checks[r.entryId])
                      .map((r) => [r.id, 1]),
                  ),
                  "first-craft",
                );
                routeTo("kh1fm/synthesis/plan");
              }}
            >
              Plan all uncrafted recipes <Icon name="arrow" size={15} />
            </button>
          </div>
          <div className="recipe-grid">
            {recipes.map((recipe) => {
              const entry = data.entries.find((e) => e.id === recipe.entryId);
              const requirements = recipeRequirements(
                recipe,
                1,
                state.inventory,
                state.inventoryEnabled,
              );
              return (
                <article className="recipe-card" key={recipe.id}>
                  <div className="recipe-card-heading">
                    <span className="recipe-set">
                      SET {String(recipe.set).padStart(2, "0")}
                    </span>
                    {entry && (
                      <Check entry={entry} state={state} onToggle={onToggle} />
                    )}
                  </div>
                  <h2>
                    <a href={entryHref(recipe.entryId)}>{recipe.name}</a>
                  </h2>
                  <p className="recipe-unlock">{recipe.unlock}</p>
                  <ul className="ingredient-list">
                    {requirements.map((item) => (
                      <li key={item.itemId}>
                        <a href={entryHref(item.itemId)}>
                          {item.name}
                          <Icon name="arrow" size={12} />
                        </a>
                        <strong
                          className={
                            state.inventoryEnabled && item.missing === 0
                              ? "stock-enough"
                              : ""
                          }
                          aria-label={
                            state.inventoryEnabled
                              ? `${item.owned === null ? "Unknown" : item.owned} owned, ${item.required} required`
                              : `${item.required} required`
                          }
                        >
                          {state.inventoryEnabled ? (
                            <>
                              <span>
                                {item.owned === null ? "?" : item.owned}
                              </span>{" "}
                              / {item.required}
                            </>
                          ) : (
                            <>
                              <span>×</span> {item.required}
                            </>
                          )}
                        </strong>
                      </li>
                    ))}
                  </ul>
                  {recipe.uncertainty && (
                    <p className="uncertainty">{recipe.uncertainty}</p>
                  )}
                  <div className="recipe-plan-control">
                    <label>Craft plan quantity</label>
                    <div className="stepper">
                      <button
                        aria-label={`Remove one ${recipe.name} from plan`}
                        disabled={!state.plan[recipe.id]}
                        onClick={() =>
                          player.setPlan(
                            recipe.id,
                            Math.max(0, (state.plan[recipe.id] || 0) - 1),
                          )
                        }
                      >
                        <Icon name="minus" size={15} />
                      </button>
                      <Quantity
                        name={`${recipe.name} craft plan quantity`}
                        value={state.plan[recipe.id] || 0}
                        onChange={(n) => player.setPlan(recipe.id, n || 0)}
                      />
                      <button
                        aria-label={`Add one ${recipe.name} to plan`}
                        disabled={(state.plan[recipe.id] || 0) >= 9999}
                        onClick={() =>
                          player.setPlan(
                            recipe.id,
                            (state.plan[recipe.id] || 0) + 1,
                          )
                        }
                      >
                        <Icon name="plus" size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          {!recipes.length && <Empty>Try another recipe name or set.</Empty>}
        </>
      ) : tab === "materials" ? (
        <>
          <div className="section-heading">
            <h2>Your material field notes</h2>
            <span className="eyebrow">
              {materials.length} recorded materials
            </span>
          </div>
          <div className="material-list">
            {materials.map((e) => (
              <article className="material-card" key={e.id}>
                <div className="material-heading">
                  <div>
                    <span className="entry-kicker">
                      {e.world || "Synthesis material"}
                    </span>
                    <h3>
                      <a href={entryHref(e.id)}>{e.name}</a>
                    </h3>
                  </div>
                  {state.inventoryEnabled && (
                    <label className="stock-field">
                      <span>Owned</span>
                      <Quantity
                        unknown
                        value={state.inventory[e.id]}
                        name={`${e.name} owned stock; blank means unknown`}
                        onChange={(n) => player.setInventory(e.id, n)}
                      />
                    </label>
                  )}
                </div>
                <p>{e.instructions || e.summary}</p>
                {e.prerequisites && (
                  <p className="prerequisite">
                    <strong>Conditions:</strong> {e.prerequisites}
                  </p>
                )}
                <a className="material-source-link" href={entryHref(e.id)}>
                  Farming notes <Icon name="arrow" size={15} />
                </a>
              </article>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="section-heading">
            <h2>Your next creations</h2>
            <span className="eyebrow">{selected.length} selected recipes</span>
          </div>
          {selected.length === 0 ? (
            <div className="empty-state">
              <Icon name="spark" size={30} />
              <h3>A blank page, full of possibilities.</h3>
              <p>
                Add quantities from the recipe catalog to build your material
                plan.
              </p>
              <a href="#/kh1fm/synthesis/recipes" className="button">
                Browse recipes <Icon name="arrow" size={16} />
              </a>
            </div>
          ) : (
            <>
              <div className="plan-goals">
                {selected.map((r) => (
                  <div className="plan-goal" key={r.id}>
                    <a href={entryHref(r.entryId)}>{r.name}</a>
                    <label>
                      <span>Crafts</span>
                      <Quantity
                        value={state.plan[r.id]}
                        name={`${r.name} planned craft quantity`}
                        onChange={(n) => player.setPlan(r.id, n || 0)}
                      />
                    </label>
                    <button
                      className="icon-button"
                      onClick={() => player.setPlan(r.id, 0)}
                      aria-label={`Remove ${r.name} from craft plan`}
                    >
                      <Icon name="close" size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="plan-explanation">
                <Icon name="info" size={19} />
                <p>
                  {plan.allocationRule}{" "}
                  {state.inventoryEnabled
                    ? "Stock is allocated once across the complete plan."
                    : "Inventory is off: these are full material requirements."}
                </p>
              </div>
              {plan.issues.length > 0 && (
                <div className="plan-issues" role="status">
                  <strong>
                    {plan.valid ? "Calculation notes" : "Check this plan"}
                  </strong>
                  {plan.issues.map((issue, i) => (
                    <p key={i}>{issue.message}</p>
                  ))}
                </div>
              )}
              <div className="section-heading">
                <h2>
                  {state.inventoryEnabled
                    ? "Materials still needed"
                    : "Total materials required"}
                </h2>
                {plan.provisional && (
                  <span className="badge badge-unresolved">
                    Provisional · check unknown quantities
                  </span>
                )}
              </div>
              <div className="plan-materials">
                {plan.materials.map((m) => {
                  const options = getMaterialRoutes(data.recipes, m.itemId);
                  return (
                    <div className="plan-material" key={m.itemId}>
                      <div className="plan-material-name">
                        <a href={entryHref(m.itemId)}>
                          {m.name}
                          <Icon name="arrow" size={14} />
                        </a>
                        {options.length > 0 && (
                          <label className="route-choice">
                            <span>Acquire by</span>
                            <select
                              aria-label={`${m.name} acquisition route`}
                              value={
                                routes[m.itemId] ||
                                (options.length === 1 ? options[0].id : "")
                              }
                              onChange={(e) =>
                                setRoutes({
                                  ...routes,
                                  [m.itemId]: e.target.value,
                                })
                              }
                            >
                              {options.length > 1 && (
                                <option value="">Choose a route</option>
                              )}
                              <option value="gather">
                                Gather / already obtained
                              </option>
                              {options.map((r) => (
                                <option key={r.id} value={r.id}>
                                  Synthesize · {r.name}
                                </option>
                              ))}
                            </select>
                          </label>
                        )}
                      </div>
                      <div className="plan-material-figures">
                        <span>
                          <small>Required</small>
                          <strong>{m.required}</strong>
                        </span>
                        {state.inventoryEnabled && (
                          <label>
                            <small>Owned</small>
                            <Quantity
                              unknown
                              value={state.inventory[m.itemId]}
                              name={`${m.name} owned stock`}
                              onChange={(n) => player.setInventory(m.itemId, n)}
                            />
                          </label>
                        )}
                        {m.crafted > 0 && (
                          <span>
                            <small>Crafted in plan</small>
                            <strong>{m.crafted}</strong>
                          </span>
                        )}
                        <span
                          className={
                            m.missing === 0 ? "stock-enough" : "needed-count"
                          }
                        >
                          <small>
                            {state.inventoryEnabled ? "To gather" : "Gather"}
                          </small>
                          <strong>
                            {m.missing === null ? "?" : m.missing}
                          </strong>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {plan.crafts.some((c) => c.prerequisite > 0) && (
                <div className="dependency-note">
                  <h3>Included prerequisite crafts</h3>
                  {plan.crafts
                    .filter((c) => c.prerequisite > 0)
                    .map((c) => (
                      <p key={c.recipeId}>
                        {c.name} × {c.prerequisite}
                      </p>
                    ))}
                  <small>
                    Only the shortfall is synthesized. These crafts do not
                    automatically mark your catalog complete.
                  </small>
                </div>
              )}
            </>
          )}
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
    [offlineReady, setOfflineReady] = useState(installation.offline),
    [updateReady, setUpdateReady] = useState(installation.update),
    [recoveryReview, setRecoveryReview] = useState(false);
  useEffect(() => {
    const offline = () => setOfflineReady(true),
      update = () => setUpdateReady(true);
    window.addEventListener("ars-offline-ready", offline);
    window.addEventListener("ars-update-ready", update);
    return () => {
      window.removeEventListener("ars-offline-ready", offline);
      window.removeEventListener("ars-update-ready", update);
    };
  }, []);
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
      <PageTitle
        eyebrow="Chapter 06 · Keep your place"
        title="Your progress, safely kept."
      >
        This journal is yours. Review what’s recorded and keep a backup for
        another device.
      </PageTitle>
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
            Checks, material stock, and craft quantities save locally. Clearing
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
            and craft plan. A recovery snapshot is kept before the replacement.
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
              <dt>Planned recipes</dt>
              <dd>{preview.plannedRecipes}</dd>
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
          <h2>Optional material inventory</h2>
          <p>
            Enter your own material counts in the workshop. Turning this off
            preserves your quantities, and hides stock-adjusted calculations.
          </p>
        </div>
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={state.inventoryEnabled}
            onChange={(e) => player.setInventoryEnabled(e.target.checked)}
          />
          <span className="toggle-track" />
          {state.inventoryEnabled ? "Inventory enabled" : "Inventory disabled"}
        </label>
      </section>
      <section className="settings-section">
        <div>
          <h2>Offline journal & Data Jiminy</h2>
          <p>
            {offlineReady
              ? "The journal has finished caching for offline use."
              : "The journal caches guide pages for offline use when installation completes. Assistant models need their own one-time download in Data Jiminy."}{" "}
            Data Jiminy’s conversation stays in memory for this session and
            clears when you reload or leave the journal.
          </p>
          {updateReady && (
            <button
              className="button"
              onClick={() =>
                window.dispatchEvent(new Event("ars-apply-update"))
              }
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
        <PageTitle eyebrow="An honest record" title="Guide coverage">
          Entries included in this journal, grouped by collection or reference
          category.
        </PageTitle>
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
