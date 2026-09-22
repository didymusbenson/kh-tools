import { bbsCampaigns, bbsScope, bbsRecipeSummary } from "./bbsPresentation";
import { entryTitle, chestReference } from "../domain/entryPresentation";
import { materialFamily, sortMaterials, inWorld } from "./presentation";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import { Icon, type IconName } from "../components/Icon";
import type { CollectionEntry, GameGuide } from "./types";
import {
  addTargets,
  emptyProfile,
  loadProfile,
  loadRecovery,
  mutateProfile,
  parseProfile,
  type GuideProfile,
} from "./profile";
import "./guides.css";

export default function GuideJournal({
  guide,
  route,
  updateNotice,
}: {
  guide: GameGuide;
  route: string;
  updateNotice: ReactNode;
}) {
  const [profile, setProfile] = useState(() => emptyProfile(guide.id));
  const [ready, setReady] = useState(false),
    [error, setError] = useState(""),
    [notice, setNotice] = useState("");
  const [menu, setMenu] = useState(false),
    [query, setQuery] = useState(""),
    [status, setStatus] = useState("all"),
    [character, setCharacter] = useState(() => {
      if (guide.id !== "bbsfm") return "all";
      try {
        const saved = localStorage.getItem("ars-arcanum:bbsfm:campaign");
        if (saved && [...bbsCampaigns, "all"].includes(saved)) return saved;
      } catch {}
      return "Terra";
    });
  const isBbs = guide.id === "bbsfm";
  const [recipeGroup, setRecipeGroup] = useState("Command melding");
  const [materialKind, setMaterialKind] = useState("all");
  const commandInputs = new Set(
    guide.recipes
      ?.filter((r) => r.group === "Command melding")
      .flatMap((r) => r.ingredients.map((i) => i.id)) || [],
  );
  const bbsMaterialKind = (e: CollectionEntry) =>
    /Crystal$/.test(e.name)
      ? "Melding crystals"
      : commandInputs.has(e.id)
        ? "Commands"
        : "Ice cream flavors";
  const family = (e: CollectionEntry) =>
    isBbs ? bbsMaterialKind(e) : materialFamily(e);
  useEffect(() => {
    if (isBbs)
      try {
        localStorage.setItem("ars-arcanum:bbsfm:campaign", character);
      } catch {}
  }, [isBbs, character]);
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const main = useRef<HTMLElement>(null),
    channel = useRef<BroadcastChannel | null>(null);
  const [path, search = ""] = route.split("?"),
    parts = path.split("/");
  const section = parts[1] || "worlds",
    tab = parts[2] || "recipes";
  const world = new URLSearchParams(search).get("world") || "all";
  const selectedWorld =
    section === "worlds" && parts[2]
      ? decodeURIComponent(parts.slice(2).join("/"))
      : null;
  const href = (page: string) => `#/${guide.id}/${page}`;
  useEffect(() => {
    let alive = true;
    const read = () =>
      loadProfile(guide)
        .then((p) => {
          if (alive) {
            setProfile(p);
            setReady(true);
          }
        })
        .catch((e) => {
          if (alive) setError(String(e.message));
        });
    void read();
    if (typeof BroadcastChannel !== "undefined") {
      channel.current = new BroadcastChannel(`ars-guide-${guide.id}`);
      channel.current.onmessage = () => void read();
    }
    const focus = () => void read();
    window.addEventListener("focus", focus);
    try {
      localStorage.setItem("ars-arcanum:last-game", guide.id);
    } catch {}
    return () => {
      alive = false;
      channel.current?.close();
      window.removeEventListener("focus", focus);
    };
  }, [guide]);
  useEffect(() => {
    setMenu(false);
    setQuery("");
    setStatus("all");
    setOpen(new Set());
    main.current?.scrollTo(0, 0);
  }, [path]);
  useEffect(() => {
    setOpen(new Set());
  }, [query, status, character, world]);
  async function update(
    change: (p: GuideProfile) => GuideProfile,
    recovery = false,
  ) {
    if (!ready) return false;
    try {
      const next = await mutateProfile(guide, change, recovery);
      setProfile(next);
      setError("");
      channel.current?.postMessage("saved");
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Progress could not be saved.");
      try {
        setProfile(await loadProfile(guide));
      } catch {}
      return false;
    }
  }
  useEffect(() => {
    if (ready) void update((p) => ({ ...p, route }));
  }, [route, ready]);
  function toggle(id: string) {
    setProfile((p) => ({ ...p, checks: { ...p.checks, [id]: !p.checks[id] } }));
    void update((p) => ({
      ...p,
      checks: { ...p.checks, [id]: !p.checks[id] },
    }));
  }
  function expand(id: string) {
    setOpen((old) => {
      const n = new Set(old);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }
  function quantity(field: "owned" | "targets", id: string, value: string) {
    if (value !== "" && (!/^\d+$/.test(value) || Number(value) > 999999)) {
      setError("Enter a whole number from 0 to 999999.");
      return;
    }
    void update((p) => {
      const values = { ...p[field] };
      if (value === "") delete values[id];
      else values[id] = Number(value);
      return { ...p, [field]: values };
    });
  }
  const entries = guide.entries;
  const byId = new Map(entries.map((e) => [e.id, e]));
  function changeCampaign(value: string) {
    setCharacter(value);
    const locationFilter = selectedWorld || (world !== "all" ? world : null);
    if (
      locationFilter &&
      !entries.some(
        (e) => bbsScope(e.character, value) && inWorld(e, locationFilter),
      )
    ) {
      location.hash = href(
        selectedWorld ? "worlds" : `${section}${crafting ? `/${tab}` : ""}`,
      );
    }
  }

  const chars = [
    ...new Set(
      entries.flatMap((e) =>
        e.character && e.character !== "Both" ? [e.character] : [],
      ),
    ),
  ];
  const scope = (e: { character?: string }) =>
    isBbs
      ? bbsScope(e.character, character)
      : character === "all" ||
        !e.character ||
        e.character === "Both" ||
        e.character === character;
  const matches = (e: CollectionEntry) =>
    scope(e) &&
    inWorld(e, world) &&
    (status === "all" ||
      open.has(e.id) ||
      (status === "done" ? !!profile.checks[e.id] : !profile.checks[e.id])) &&
    `${e.name} ${e.world || ""} ${e.area || ""} ${e.summary}`
      .toLowerCase()
      .includes(query.toLowerCase());
  const category = guide.categories.find((c) => c.id === section);
  const crafting = section === "workshop";
  const title =
    section === "worlds"
      ? selectedWorld || "Worlds"
      : crafting
        ? guide.craftingLabel || "Synthesis Workshop"
        : section === "progress"
          ? "Progress & backups"
          : section === "search"
            ? "Search"
            : category?.label || "Page not found";
  const collectible = entries.filter(
    (e) => e.collectible && e.checkable !== false && scope(e),
  );
  const count = (list: CollectionEntry[]) => {
    const c = list.filter((e) => e.checkable !== false);
    if (isBbs && !c.length)
      return list.length ? `${list.length} entries` : "World guide";
    return `${c.filter((e) => profile.checks[e.id]).length}/${c.length}`;
  };
  const filtered = entries.filter(
    (e) =>
      (section === "search" ||
        e.category === section ||
        e.categories?.includes(section)) &&
      matches(e),
  );
  const visibleRecipes = (guide.recipes || []).filter(
    (r) =>
      scope(r) &&
      (!isBbs || r.group === recipeGroup) &&
      `${r.name} ${isBbs ? r.instructions || "" : ""}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  if (isBbs)
    visibleRecipes.sort(
      (a, b) =>
        a.name.localeCompare(b.name) ||
        (a.instructions || "").localeCompare(b.instructions || ""),
    );
  function field(label: string, text?: string) {
    return text ? (
      <div data-field={label}>
        <dt>{label}</dt>
        <dd>{text}</dd>
      </div>
    ) : null;
  }
  function details(e: CollectionEntry) {
    return (
      <div className="guide-details">
        {e.summary &&
          ![
            e.name,
            e.area,
            e.reward,
            e.instructions,
            `${entryTitle(e)} — ${e.area}`,
            `${entryTitle(e)} · ${e.area}`,
          ].some(
            (text) =>
              text?.replace(/[.\s]+$/, "") === e.summary.replace(/[.\s]+$/, ""),
          ) &&
          !e.instructions?.includes(e.summary) && <p>{e.summary}</p>}
        {e.instructions &&
          !(e.instructions === "Open the chest." && e.summary) &&
          e.instructions !== `Chest in ${e.area}.` && <p>{e.instructions}</p>}
        <dl>
          {field("Location", [e.world, e.area].filter(Boolean).join(" · "))}
          {field("Character", e.character)}
          {field("Chest reference", chestReference(e))}
          {field("Requires", e.prerequisites)}
          {field("Reward", e.reward)}
          {field("Missability", e.missability)}
          {field("Note", e.uncertainty)}
        </dl>
        {e.drops
          ?.filter((d) => d.details)
          .map((d, i) => (
            <p key={i}>
              <strong>{d.enemy}: </strong>
              {d.details}
            </p>
          ))}
      </div>
    );
  }
  function drops(e: CollectionEntry) {
    return e.drops?.length ? (
      <div className="guide-drops">
        {e.drops.map((d, i) => (
          <div key={i}>
            <strong>
              {d.enemy}: {/%/.test(d.rate) ? d.rate : "Conditional"}
            </strong>
            {d.location && ` — ${d.location}`}
          </div>
        ))}
      </div>
    ) : (
      <p className="guide-drops">{e.summary}</p>
    );
  }
  function stock(e: CollectionEntry) {
    return (
      <label className="guide-quantity">
        Owned
        <input
          aria-label={`Owned ${e.name}`}
          type="number"
          min="0"
          max="999999"
          placeholder="?"
          value={profile.owned[e.id] ?? ""}
          onChange={(event) => quantity("owned", e.id, event.target.value)}
          disabled={!ready}
        />
      </label>
    );
  }
  function row(e: CollectionEntry, material = false) {
    return (
      <article className="guide-row" key={e.id} id={`entry-${e.id}`}>
        <div className="guide-row-head">
          {!material && e.checkable !== false && (
            <label className="guide-check">
              <input
                type="checkbox"
                aria-label={`Complete ${e.name}${e.character ? ` (${e.character})` : ""}`}
                checked={!!profile.checks[e.id]}
                onChange={() => toggle(e.id)}
                disabled={!ready}
              />
            </label>
          )}
          <button
            className="guide-expand"
            onClick={() => expand(e.id)}
            aria-expanded={open.has(e.id)}
            aria-controls={`details-${e.id}`}
          >
            <span>
              <strong>{entryTitle(e)}</strong>
              {((!material && e.area) || (chars.length > 1 && (!isBbs || character === "all") && e.character)) && (
                <small className="entry-meta">
                  {[!material && e.area, chars.length > 1 && (!isBbs || character === "all") && e.character]
                    .filter(Boolean)
                    .join(" · ")}
                </small>
              )}
            </span>
            <Icon name={open.has(e.id) ? "minus" : "plus"} size={18} />
          </button>
          {material && stock(e)}
        </div>
        {material && (
          <>
            {drops(e)}
            <button
              className="guide-farm-add"
              onClick={() =>
                void update((p) => ({
                  ...p,
                  targets: { ...p.targets, [e.id]: p.targets[e.id] || 1 },
                }))
              }
              disabled={!ready}
            >
              {profile.targets[e.id]
                ? "In farming plan"
                : "Add to farming plan"}
            </button>
          </>
        )}
        <div id={`details-${e.id}`} hidden={!open.has(e.id)}>
          {open.has(e.id) && details(e)}
        </div>
      </article>
    );
  }
  function toolbar() {
    return (
      <div className="guide-filters">
        <label className="guide-search">
          <Icon name="search" />
          <input
            aria-label="Search entries"
            placeholder="Find an entry…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <select
          aria-label="Filter by world"
          value={world}
          onChange={(e) => {
            location.hash = href(
              `${section}${crafting ? `/${tab}` : ""}?world=${encodeURIComponent(e.target.value)}`,
            );
          }}
        >
          <option value="all">All worlds</option>
          {guide.worlds.map((w) => (
            <option key={w.name}>{w.name}</option>
          ))}
        </select>
        {!isBbs && chars.length > 1 && (
          <select
            aria-label="Filter by character"
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
          >
            <option value="all">All characters</option>
            {chars.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        )}
        {!crafting && (
          <select
            aria-label="Completion"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All entries</option>
            <option value="remaining">Remaining</option>
            <option value="done">Completed</option>
          </select>
        )}
      </div>
    );
  }
  function groupRows(list: CollectionEntry[], material = false) {
    const worldNames = [
      ...guide.worlds.map((w) => w.name),
      ...new Set(list.map((e) => e.world || "Other")),
    ];
    const ordered = [...new Set(worldNames)].filter((w) =>
      list.some((e) => (e.world || "Other") === w),
    );
    return (
      <>
        {!list.length && <p>No matching entries.</p>}
        <div className="guide-list-tools">
          <span>{list.length} entries</span>
          <button
            onClick={() =>
              setOpen((old) => {
                const n = new Set(old),
                  all = list.every((e) => n.has(e.id));
                list.forEach((e) => (all ? n.delete(e.id) : n.add(e.id)));
                return n;
              })
            }
          >
            {list.length > 0 && list.every((e) => open.has(e.id))
              ? "Collapse"
              : "Expand"}{" "}
            all
          </button>
        </div>
        {material
          ? [...new Set(list.map(family))].map((familyName) => (
              <section className="guide-group" key={familyName}>
                <h2>{familyName}</h2>
                {list
                  .filter((e) => family(e) === familyName)
                  .map((e) => row(e, true))}
              </section>
            ))
          : ordered.map((w) => (
              <section className="guide-group" key={w}>
                <h2>
                  {w}
                  <span>
                    {count(
                      entries.filter(
                        (e) =>
                          scope(e) &&
                          (section === "search" ||
                            e.category === section ||
                            e.categories?.includes(section)) &&
                          (e.world || "Other") === w,
                      ),
                    )}
                  </span>
                </h2>
                {list
                  .filter((e) => (e.world || "Other") === w)
                  .map((e) => row(e))}
              </section>
            ))}
      </>
    );
  }
  const materials = entries
    .filter((e) => ["material", "materials"].includes(e.category))
    .sort(sortMaterials);
  return (
    <div
      className="journal-app multi-guide" data-game={guide.id}
      style={{ "--guide-accent": guide.accent } as CSSProperties}
    >
      <a
        className="skip-link"
        href="#guide-main"
        onClick={(e) => {
          e.preventDefault();
          main.current?.focus();
        }}
      >
        Skip to journal content
      </a>
      <header className="journal-topbar">
        <a href="#/" className="brand journal-brand">
          <span className="brand-seal">
            <Icon name="spark" />
          </span>
          <span>
            ARS ARCANUM<small>THE JOURNALS</small>
          </span>
        </a>
        <div className="current-edition">
          <strong>
            {guide.name} <i>{guide.edition}</i>
          </strong>
        </div>
        <button
          className="icon-button mobile-menu"
          aria-label="Toggle journal navigation"
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
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
            <h2>{guide.name}</h2>
            <p>{guide.edition}</p>
          </div>
          <nav className="chapter-nav" aria-label="Journal chapters">
            {[
              { id: "worlds", label: "Worlds", icon: "world" },
              ...(guide.recipes?.length || materials.length
                ? [
                    {
                      id: "workshop",
                      label: guide.craftingLabel || "Synthesis Workshop",
                      icon: "flask",
                    },
                  ]
                : []),
              ...guide.categories.filter(
                (c) => !["material", "materials"].includes(c.id),
              ),
            ].map((c) => (
              <a
                key={c.id}
                href={href(c.id)}
                className={section === c.id ? "active" : ""}
                aria-current={section === c.id ? "page" : undefined}
              >
                <Icon name={c.icon as IconName} />
                <span>{c.label}</span>
              </a>
            ))}
          </nav>
          {collectible.length > 0 && (
            <div className="sidebar-progress">
              World collectibles <strong>{count(collectible)}</strong>
            </div>
          )}
          <div className="sidebar-bottom">
            <a href={href("search")}>Search this journal</a>
            <a href={href("progress")}>Progress & backups</a>
            <a href="#/">Change journal</a>
            <span role="status">
              {error
                ? "Progress needs attention"
                : ready
                  ? "Progress saved on this device"
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
        <main
          className="journal-page-wrap"
          id="guide-main"
          ref={main}
          tabIndex={-1}
        >
          <div className="binding" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} />
            ))}
          </div>
          <div className="journal-page">
            {updateNotice}
            {isBbs && (
              <div className="bbs-campaign">
                <label>
                  Campaign
                  <select
                    aria-label="Campaign"
                    value={character}
                    onChange={(e) => changeCampaign(e.target.value)}
                  >
                    {bbsCampaigns.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                    <option value="all">All campaigns</option>
                  </select>
                </label>
                <span>Checks, stock and plans stay with their character.</span>
              </div>
            )}
            <div className="guide-title">
              <h1>{title}</h1>
              {category && (
                <span>
                  {count(
                    entries.filter(
                      (e) =>
                        (e.category === section ||
                          e.categories?.includes(section)) &&
                        scope(e) &&
                        (!isBbs || inWorld(e, world)),
                    ),
                  )}
                </span>
              )}
            </div>
            {error && (
              <div role="alert" className="save-alert">
                {error}
                <button
                  onClick={() =>
                    loadProfile(guide)
                      .then((p) => {
                        setProfile(p);
                        setReady(true);
                        setError("");
                      })
                      .catch((e) => setError(e.message))
                  }
                >
                  Retry loading saved progress
                </button>
              </div>
            )}
            {notice && <p role="status">{notice}</p>}
            {section === "worlds" && (
              <>
                {selectedWorld ? (
                  <>
                    <a href={href("worlds")}>All worlds</a>
                    {(!isBbs ||
                      !guide.worlds
                        .find((w) => w.name === selectedWorld)
                        ?.summary.startsWith(
                          "Character-specific treasure",
                        )) && (
                      <p>
                        {
                          guide.worlds.find((w) => w.name === selectedWorld)
                            ?.summary
                        }
                      </p>
                    )}
                    <div className="guide-world-links">
                      {guide.categories
                        .filter((c) =>
                          entries.some(
                            (e) =>
                              (e.category === c.id ||
                                e.categories?.includes(c.id)) &&
                              e.world === selectedWorld &&
                              scope(e),
                          ),
                        )
                        .map((c) => (
                          <a
                            key={c.id}
                            href={href(
                              `${["material", "materials"].includes(c.id) ? "workshop/materials" : c.id}?world=${encodeURIComponent(selectedWorld)}`,
                            )}
                          >
                            <Icon name={c.icon as IconName} />
                            <strong>{c.label}</strong>
                            <span>
                              {count(
                                entries.filter(
                                  (e) =>
                                    (e.category === c.id ||
                                      e.categories?.includes(c.id)) &&
                                    e.world === selectedWorld &&
                                    scope(e),
                                ),
                              )}
                            </span>
                          </a>
                        ))}
                    </div>
                  </>
                ) : (
                  <div className="guide-world-links">
                    {guide.worlds
                      .filter(
                        (w) =>
                          !isBbs ||
                          entries.some((e) => e.world === w.name && scope(e)),
                      )
                      .map((w) => (
                        <a
                          key={w.name}
                          href={href(`worlds/${encodeURIComponent(w.name)}`)}
                        >
                          <strong>{w.name}</strong>
                          <span>
                            {count(
                              collectible.filter((e) => e.world === w.name),
                            )}
                          </span>
                          <Icon name="arrow" />
                        </a>
                      ))}
                  </div>
                )}
              </>
            )}
            {(category || section === "search") && (
              <>
                {toolbar()}
                {groupRows(filtered)}
              </>
            )}
            {crafting && (
              <>
                <nav
                  className="segmented workshop-tabs"
                  aria-label="Workshop sections"
                >
                  {[
                    ["recipes", "Recipes"],
                    ["materials", "Materials"],
                    ["plan", "Farming Plan"],
                  ].map(([id, label]) => (
                    <a
                      key={id}
                      href={href(`workshop/${id}`)}
                      className={tab === id ? "active" : ""}
                      aria-current={tab === id ? "page" : undefined}
                    >
                      {label}
                    </a>
                  ))}
                </nav>
                {tab === "recipes" && (
                  <>
                    <div className="guide-filters">
                      {isBbs && (
                        <select
                          aria-label="Recipe type"
                          value={recipeGroup}
                          onChange={(e) => {
                            setRecipeGroup(e.target.value);
                            setOpen(new Set());
                          }}
                        >
                          <option>Command melding</option>
                          <option>Ice cream</option>
                        </select>
                      )}
                      {!isBbs && chars.length > 1 && (
                        <select
                          aria-label="Recipe character"
                          value={character}
                          onChange={(e) => setCharacter(e.target.value)}
                        >
                          <option value="all">All characters</option>
                          {chars.map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                      )}
                      <input
                        aria-label="Find a recipe"
                        placeholder={
                          isBbs
                            ? "Find a command, input or ability…"
                            : "Find a recipe…"
                        }
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>
                    {!guide.recipes?.length && (
                      <p>
                        No fixed ingredient recipes are recorded in this guide.
                      </p>
                    )}
                    {!visibleRecipes.length && (
                      <p>No recipes match this campaign and search.</p>
                    )}
                    {visibleRecipes.map((r) => (
                      <article className="guide-row" key={r.id}>
                        <div className="guide-row-head">
                          <label className="guide-check">
                            <input
                              type="checkbox"
                              checked={!!profile.checks[r.id]}
                              aria-label={`Crafted ${r.name}`}
                              onChange={() => toggle(r.id)}
                              disabled={!ready}
                            />
                          </label>
                          <button
                            className="guide-expand"
                            aria-expanded={open.has(r.id)}
                            onClick={() => expand(r.id)}
                          >
                            <span>
                              <strong>{r.name}</strong>
                              {r.character && (!isBbs || character === "all") && <small>{r.character}</small>}
                              {!isBbs && r.group && <small>{r.group}</small>}
                              {isBbs && r.group === "Command melding" && (
                                <small className="bbs-meld-inputs">
                                  {bbsRecipeSummary(r.instructions).inputs}
                                </small>
                              )}
                            </span>
                            <Icon name={open.has(r.id) ? "minus" : "plus"} />
                          </button>
                          <button
                            className="guide-farm-add"
                            disabled={!ready}
                            onClick={() =>
                              void update((p) => addTargets(p, r.ingredients))
                            }
                          >
                            Add to farming plan
                          </button>
                        </div>
                        {isBbs &&
                          r.group === "Command melding" &&
                          bbsRecipeSummary(r.instructions).outcomes && (
                            <p className="bbs-meld-outcomes">
                              Results:{" "}
                              {bbsRecipeSummary(r.instructions).outcomes}
                            </p>
                          )}
                        {open.has(r.id) && (
                          <div className="guide-details">
                            {isBbs ? (
                              (r.instructions || "")
                                .split(/\.\s+/)
                                .filter(Boolean)
                                .map((text, index) => (
                                  <p key={index}>
                                    {text.replace(
                                      /; (?=[^;]+Crystal:)/g,
                                      ";\n",
                                    )}
                                    {text.endsWith(".") ? "" : "."}
                                  </p>
                                ))
                            ) : (
                              <p>{r.instructions}</p>
                            )}
                            {r.character && <p>{r.character}</p>}
                            {r.ingredients.map((i) => {
                              const e = byId.get(i.id);
                              return (
                                <div key={i.id} className="guide-ingredient">
                                  <strong>
                                    {e?.name || i.id} —{" "}
                                    {profile.owned[i.id] ?? "?"}/{i.quantity}
                                  </strong>
                                  {e && (
                                    <details>
                                      <summary>Source details</summary>
                                      {drops(e)}
                                      {details(e)}
                                    </details>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </article>
                    ))}
                  </>
                )}
                {tab === "materials" && (
                  <>
                    {toolbar()}
                    {isBbs && (
                      <div className="guide-filters">
                        <label>
                          Ingredient type{" "}
                          <select
                            aria-label="Ingredient type"
                            value={materialKind}
                            onChange={(e) => setMaterialKind(e.target.value)}
                          >
                            <option value="all">All ingredients</option>
                            {[
                              "Commands",
                              "Melding crystals",
                              "Ice cream flavors",
                            ].map((k) => (
                              <option key={k}>{k}</option>
                            ))}
                          </select>
                        </label>
                      </div>
                    )}
                    {groupRows(
                      materials.filter(
                        (e) =>
                          matches(e) &&
                          (!isBbs ||
                            materialKind === "all" ||
                            bbsMaterialKind(e) === materialKind),
                      ),
                      true,
                    )}
                  </>
                )}
                {tab === "plan" && (
                  <>
                    <p>
                      Targets are total stock to have. Blank owned stock means
                      unknown.
                    </p>
                    {!entries.some(
                      (e) =>
                        (profile.targets[e.id] || 0) > 0 &&
                        (!isBbs || scope(e)),
                    ) && (
                      <p>
                        Your farming plan is empty. Add materials or a recipe to
                        set targets.
                      </p>
                    )}
                    {entries
                      .filter(
                        (e) =>
                          (profile.targets[e.id] || 0) > 0 &&
                          (!isBbs || scope(e)),
                      )
                      .sort(sortMaterials)
                      .map((e) => (
                        <article className="guide-row" key={e.id}>
                          <div className="guide-row-head">
                            <h2>
                              {e.name}
                              {e.character && (
                                <small className="guide-character">
                                  {e.character}
                                </small>
                              )}
                            </h2>
                            <button
                              className="icon-button"
                              aria-label={`Remove ${e.name}`}
                              onClick={() =>
                                void update((p) => {
                                  const targets = { ...p.targets };
                                  delete targets[e.id];
                                  return { ...p, targets };
                                })
                              }
                            >
                              <Icon name="close" />
                            </button>
                          </div>
                          {drops(e)}
                          <div className="guide-farm-fields">
                            <label className="guide-quantity">
                              Target
                              <input
                                aria-label={`Target ${e.name}`}
                                type="number"
                                min="0"
                                max="999999"
                                value={profile.targets[e.id]}
                                onChange={(ev) =>
                                  quantity("targets", e.id, ev.target.value)
                                }
                              />
                            </label>
                            {stock(e)}
                            <span>
                              Remaining{" "}
                              <strong>
                                {profile.owned[e.id] === undefined
                                  ? "?"
                                  : Math.max(
                                      0,
                                      profile.targets[e.id] -
                                        profile.owned[e.id],
                                    )}
                              </strong>
                            </span>
                          </div>
                          <button
                            className="guide-expand more-info"
                            aria-expanded={open.has(e.id)}
                            onClick={() => expand(e.id)}
                          >
                            More info
                            <Icon name={open.has(e.id) ? "minus" : "plus"} />
                          </button>
                          {open.has(e.id) && details(e)}
                        </article>
                      ))}
                  </>
                )}
              </>
            )}
            {section === "progress" && (
              <>
                <h2>Guide coverage</h2>
                <p>{guide.coverage}</p>
                <dl className="guide-coverage">
                  {guide.categories.map((c) => (
                    <div key={c.id}>
                      <dt>{c.label}</dt>
                      <dd>
                        {count(
                          entries.filter(
                            (e) =>
                              e.category === c.id ||
                              e.categories?.includes(c.id),
                          ),
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
                <h2>Backups</h2>
                <p>
                  Backups contain this game's checks, owned stock and farming
                  targets.
                </p>
                <div className="guide-backup-actions">
                  <button
                    disabled={!ready}
                    onClick={() => {
                      const blob = new Blob(
                          [JSON.stringify(profile, null, 2)],
                          { type: "application/json" },
                        ),
                        url = URL.createObjectURL(blob),
                        a = document.createElement("a");
                      a.href = url;
                      a.download = `ars-arcanum-${guide.id}.json`;
                      a.click();
                      setTimeout(() => URL.revokeObjectURL(url), 1000);
                    }}
                  >
                    Export backup
                  </button>
                  <label className="guide-import">
                    Import backup
                    <input
                      type="file"
                      accept="application/json,.json"
                      disabled={!ready}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          if (file.size > 5000000)
                            throw new Error("Backup is too large.");
                          const next = parseProfile(
                            JSON.parse(await file.text()),
                            guide,
                          );
                          if (await update(() => next, true))
                            setNotice(
                              "Backup imported. The previous profile is available through recovery.",
                            );
                        } catch (err) {
                          setError(
                            err instanceof Error
                              ? err.message
                              : "Invalid backup",
                          );
                        }
                        e.target.value = "";
                      }}
                    />
                  </label>
                  <button
                    disabled={!ready}
                    onClick={async () => {
                      try {
                        const p = await loadRecovery(guide);
                        await update(() => p, true);
                      } catch (e) {
                        setError(
                          e instanceof Error
                            ? e.message
                            : "Recovery unavailable",
                        );
                      }
                    }}
                  >
                    Recover pre-import progress
                  </button>
                </div>
              </>
            )}
            {!category &&
              !["worlds", "workshop", "progress", "search"].includes(
                section,
              ) && <a href={href("worlds")}>Return to worlds</a>}
          </div>
        </main>
      </div>
    </div>
  );
}
