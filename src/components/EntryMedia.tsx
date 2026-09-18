import { useEffect, useRef, useState } from "react";
import type { MediaAsset } from "../domain/types";
import "./EntryMedia.css";

/** Optional media never substitutes for the canonical acquisition instructions. */
export function EntryMedia({ media }: { media?: MediaAsset[] }) {
  const [expanded, setExpanded] = useState<MediaAsset | null>(null);
  const [zoom, setZoom] = useState(1);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (expanded) {
      setZoom(1);
      dialog.current?.showModal();
    }
  }, [expanded]);
  if (!media?.length) return null;
  const close = () => {
    setExpanded(null);
    trigger.current?.focus({ preventScroll: true });
  };
  return (
    <section className="entry-media" aria-label="Location images and maps">
      {media.map((asset) => (
        <figure key={asset.id}>
          <button
            className="media-open"
            type="button"
            onClick={(event) => {
              trigger.current = event.currentTarget;
              setExpanded(asset);
            }}
            aria-label={`Enlarge ${asset.kind}: ${asset.alt}`}
          >
            <MediaImage asset={asset} />
          </button>
          <figcaption>
            <strong>{asset.kind === "map" ? "Map" : "In-game view"}</strong> ·{" "}
            {asset.caption || asset.alt}
            <MediaContext asset={asset} />
          </figcaption>
          <Annotations asset={asset} />
        </figure>
      ))}
      <dialog
        className="media-dialog"
        ref={dialog}
        onClose={close}
        aria-label={
          expanded
            ? `Enlarged ${expanded.kind}: ${expanded.alt}`
            : "Enlarged image"
        }
      >
        {expanded && (
          <>
            <div className="media-viewer-controls">
              <button
                type="button"
                className="button"
                autoFocus
                onClick={() => dialog.current?.close()}
              >
                Close image
              </button>
              <label>
                Zoom{" "}
                <input
                  aria-label="Image zoom"
                  type="range"
                  min={1}
                  max={3}
                  step={0.25}
                  value={zoom}
                  onChange={(event) => setZoom(Number(event.target.value))}
                />
                <output>{Math.round(zoom * 100)}%</output>
              </label>
            </div>
            <div
              className="media-pan"
              tabIndex={0}
              aria-label="Image viewport; use arrow keys to scroll when enlarged"
            >
              <div style={{ width: `${zoom * 100}%` }}>
                <MediaImage key={expanded.id} asset={expanded} />
              </div>
            </div>
            <p className="media-viewer-caption">
              <strong>
                {expanded.kind === "map" ? "Map" : "In-game view"}
              </strong>{" "}
              · {expanded.caption || expanded.alt}
              <MediaContext asset={expanded} />
            </p>
            <Annotations asset={expanded} />
          </>
        )}
      </dialog>
    </section>
  );
}
function MediaContext({ asset }: { asset: MediaAsset }) {
  return (
    <small className="media-context">
      {[asset.ruleset, asset.platform, asset.credit || asset.provenance]
        .filter(Boolean)
        .join(" · ")}
      {asset.sourceUrl && (
        <>
          {" "}
          ·{" "}
          <a href={asset.sourceUrl} target="_blank" rel="noreferrer">
            Image source
          </a>
        </>
      )}
    </small>
  );
}
function Annotations({ asset }: { asset: MediaAsset }) {
  return asset.annotations?.length ? (
    <ol className="media-annotation-text">
      {asset.annotations.map((note) => (
        <li key={note.id}>{note.label}</li>
      ))}
    </ol>
  ) : null;
}
function MediaImage({ asset }: { asset: MediaAsset }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <span className="media-unavailable">
        Image unavailable. If you’re offline, this image may not be cached. Use
        the written location instructions.
      </span>
    );
  return (
    <span className="media-frame">
      <img
        src={`${import.meta.env.BASE_URL}${asset.src}`}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        loading="lazy"
        onError={() => setFailed(true)}
      />
      {asset.annotations?.map((note, index) => (
        <span
          className="media-pin"
          key={note.id}
          style={{ left: `${note.x}%`, top: `${note.y}%` }}
          aria-hidden="true"
        >
          {index + 1}
        </span>
      ))}
    </span>
  );
}
