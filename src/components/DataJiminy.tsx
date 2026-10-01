import { useEffect, useRef, useState, type FormEvent } from "react";
import type { GameData, PlayerState } from "../domain/types";
import { resolveEntryHref } from "../domain/entryNavigation";
import { jiminy } from "../jiminy";
import {
  AI_DISCLAIMER,
  AI_LIMITATIONS,
  MODEL_NAME,
  CONSTRUCTION_MESSAGE,
  type JiminyAnswer,
  type JiminyProgress,
} from "../jiminy/types";
import { Icon } from "./Icon";

const base = import.meta.env.BASE_URL;
type Exchange = {
  id: number;
  question: string;
  answer?: JiminyAnswer;
  error?: string;
};
export function DataJiminy({
  data,
  state,
  compactLauncher = false,
}: {
  data: GameData;
  state: PlayerState;
  compactLauncher?: boolean;
}) {
  const [open, setOpen] = useState(false),
    [question, setQuestion] = useState(""),
    [history, setHistory] = useState<Exchange[]>([]),
    [busy, setBusy] = useState(false),
    [progress, setProgress] = useState<JiminyProgress>(jiminy.status());
  const dialog = useRef<HTMLDialogElement>(null),
    aboutDialog = useRef<HTMLDialogElement>(null),
    aboutButton = useRef<HTMLButtonElement>(null),
    launcher = useRef<HTMLButtonElement>(null),
    questionRef = useRef<HTMLTextAreaElement>(null),
    threadRef = useRef<HTMLDivElement>(null),
    alive = useRef(true),
    serial = useRef(0);
  useEffect(() => {
    alive.current = true;
    jiminy.activateGame("kh1fm");
    const unsubscribe = jiminy.subscribe(setProgress);
    return () => {
      unsubscribe();
      alive.current = false;
      serial.current++;
      jiminy.activateGame(null);
      jiminy.clearSession();
    };
  }, []);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      void jiminy.restore(data);
    } else if (dialog.current?.open) {
      dialog.current.close();
      launcher.current?.focus();
    }
  }, [open]);
  useEffect(() => {
    threadRef.current?.scrollTo({
      top: threadRef.current.scrollHeight,
      behavior: "instant",
    });
  }, [history, busy]);
  async function setup() {
    // The engine publishes errors and readiness only to the active panel.
    await jiminy.setup().catch(() => undefined);
  }
  async function ask(event?: FormEvent, provided?: string) {
    event?.preventDefault();
    const text = (provided || question).trim();
    if (!text || busy) return;
    const id = ++serial.current;
    setHistory((h) => [...h, { id, question: text }]);
    setQuestion("");
    setBusy(true);
    try {
      const answer = await jiminy.ask(text, data, state);
      if (alive.current && id === serial.current)
        setHistory((h) => h.map((x) => (x.id === id ? { ...x, answer } : x)));
    } catch (error) {
      if (alive.current && id === serial.current)
        setHistory((h) =>
          h.map((x) =>
            x.id === id
              ? {
                  ...x,
                  error:
                    error instanceof Error
                      ? error.message
                      : "This question could not be answered. Try a specific item name.",
                }
              : x,
          ),
        );
    } finally {
      if (alive.current && id === serial.current) {
        setBusy(false);
        questionRef.current?.focus();
      }
    }
  }
  function close() {
    aboutDialog.current?.close();
    setOpen(false);
  }
  function clear() {
    serial.current++;
    jiminy.clearSession();
    setHistory([]);
    setBusy(false);
  }
  return (
    <>
      <div className={`jiminy-launcher ${compactLauncher ? "compact-launcher" : ""} ${open ? "launcher-hidden" : ""}`}>
        {!compactLauncher && <img src={`${base}assets/data-jiminy/data-jiminy-full.png`} alt="" />}
        <button
          ref={launcher}
          className="jiminy-bubble"
          aria-label="Open Data Jiminy for Kingdom Hearts Final Mix"
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
        >
          {compactLauncher ? "Ask Jiminy" : "…"}
        </button>
        {!compactLauncher && <span className="jiminy-label">DATA JIMINY</span>}
      </div>
      <dialog
        ref={dialog}
        className="jiminy-dialog"
        aria-labelledby="jiminy-title"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="jiminy-dialog-inner">
          <header className="jiminy-header">
            <img
              src={`${base}assets/data-jiminy/data-jiminy-chat-icon.png`}
              alt=""
            />
            <div>
              <span className="eyebrow">Under construction</span>
              <h2 id="jiminy-title">Data Jiminy</h2>
              <p>Kingdom Hearts · Final Mix</p>
            </div>
            <button
              className="icon-button"
              aria-label="Close Data Jiminy"
              onClick={close}
              autoFocus
            >
              <Icon name="close" />
            </button>
          </header>
          <div className="jiminy-scroll" ref={threadRef}>
            <p className="jiminy-construction">{CONSTRUCTION_MESSAGE}</p>
            <button
              ref={aboutButton}
              type="button"
              className="jiminy-about-link"
              aria-haspopup="dialog"
              onClick={() => aboutDialog.current?.showModal()}
            >
              <Icon name="info" size={16} /> About Data Jiminy
            </button>
            <section
              className={`model-status model-${progress.phase}`}
              aria-label="Local assistant readiness"
            >
              <div>
                <span className="status-dot" />
                <strong>
                  {progress.phase === "ready"
                    ? "Local models ready"
                    : progress.phase === "idle"
                      ? "Prepare the local assistant"
                      : progress.phase === "error"
                        ? "Local model unavailable"
                        : "Preparing local models"}
                </strong>
              </div>
              <p>
                {progress.message ||
                  `Download ${MODEL_NAME} and its search model once. Game knowledge is being rebuilt separately.`}
              </p>
              {typeof progress.percent === "number" && (
                <>
                  <progress
                    max={100}
                    value={progress.percent}
                    aria-label="Local assistant download progress"
                  />
                  <span className="download-percent">
                    {Math.round(progress.percent)}%
                  </span>
                </>
              )}
              {(progress.phase === "idle" || progress.phase === "error") && (
                <button className="button button-secondary" onClick={setup}>
                  <Icon name="download" size={16} />
                  {progress.phase === "error"
                    ? "Retry local setup"
                    : "Download local models"}
                </button>
              )}
              <small>
                Questions stay on this device. Conversation is never saved
                across reloads.
              </small>
            </section>
            {history.length === 0 && (
              <div className="jiminy-start">
                <h3>A fresh start for Jiminy</h3>
                <p>His previous memories have been cleared while we check the facts. There are no game facts in his knowledge base yet.</p>
              </div>
            )}
            <div
              className="jiminy-thread"
              aria-live="polite"
              aria-relevant="additions text"
            >
              {history.map((x) => (
                <article className="jiminy-exchange" key={x.id}>
                  <div className="user-question">
                    <span className="sr-only">Your question: </span>
                    {x.question}
                  </div>
                  <div className="jiminy-answer">
                    <img
                      src={`${base}assets/data-jiminy/data-jiminy-chat-icon.png`}
                      alt="Data Jiminy"
                    />
                    <div>
                      {x.answer ? (
                        <>
                          <p className="answer-text">{x.answer.text}</p>
                          {x.answer.citations.length > 0 && (
                            <div className="answer-citations">
                              <span>In the journal</span>
                              {x.answer.citations.map((c) => (
                                <a
                                  key={c.entryId}
                                  href={resolveEntryHref(data, c.entryId)}
                                  onClick={close}
                                >
                                  {c.name}
                                  <Icon name="arrow" size={13} />
                                </a>
                              ))}
                            </div>
                          )}
                        </>
                      ) : x.error ? (
                        <p className="answer-error">{x.error}</p>
                      ) : (
                        <p className="answer-waiting">
                          Looking through this journal
                          <span aria-hidden="true">…</span>
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="jiminy-compose">
            <form onSubmit={ask}>
              <label className="sr-only" htmlFor="jiminy-question">
                Ask about Kingdom Hearts Final Mix
              </label>
              <textarea
                ref={questionRef}
                id="jiminy-question"
                rows={2}
                maxLength={1000}
                placeholder="Game knowledge is being rebuilt…"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey &&
                    !e.nativeEvent.isComposing
                  ) {
                    e.preventDefault();
                    void ask();
                  }
                }}
              />
              <button
                type="submit"
                className="send-question"
                disabled={busy || !question.trim()}
                aria-label="Ask Data Jiminy"
              >
                <Icon name="arrow" size={20} />
              </button>
            </form>
            <div className="jiminy-compose-footer">
              <span>KH1 Final Mix only · {MODEL_NAME}</span>
              {history.length > 0 && (
                <button type="button" onClick={clear}>
                  Clear session
                </button>
              )}
            </div>
          </div>
        </div>
      </dialog>
      <dialog
        ref={aboutDialog}
        className="jiminy-about-dialog"
        aria-labelledby="jiminy-about-title"
        onClose={() => aboutButton.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) aboutDialog.current?.close();
        }}
      >
        <div className="jiminy-about-inner">
          <header>
            <h2 id="jiminy-about-title">About Data Jiminy</h2>
            <button type="button" className="icon-button" aria-label="Close About Data Jiminy" onClick={() => aboutDialog.current?.close()} autoFocus>
              <Icon name="close" />
            </button>
          </header>
          <div className="jiminy-about-copy">
            <p>{CONSTRUCTION_MESSAGE}</p>
            <p>{AI_DISCLAIMER}</p>
            <p>{AI_LIMITATIONS}</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
