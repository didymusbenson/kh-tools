import { useEffect, useState, type ReactNode } from "react";
import { guideLoaders } from "./registry";
import type { GameGuide } from "./types";
import GuideJournal from "./GuideJournal";
export default function GuideLoader({
  id,
  route,
  updateNotice,
}: {
  id: string;
  route: string;
  updateNotice: ReactNode;
}) {
  const [guide, setGuide] = useState<GameGuide | null>(null),
    [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    setGuide(null);
    setError("");
    guideLoaders[id]()
      .then((module) => {
        if (active) setGuide(module.default);
      })
      .catch(() => {
        if (active)
          setError("The journal could not be loaded. Reload to try again.");
      });
    return () => {
      active = false;
    };
  }, [id]);
  if (!guide)
    return (
      <div className="loading-page">
        <h1>{error ? "Journal unavailable" : "Opening your journal…"}</h1>
        {error && <p role="alert">{error}</p>}
        <a href="#/">Game selection</a>
      </div>
    );
  return (
    <GuideJournal
      key={id}
      guide={guide}
      route={route}
      updateNotice={updateNotice}
    />
  );
}
