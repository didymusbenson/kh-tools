import type { GameData, PlayerState } from "../domain/types";
import {
  acquisitionGroups,
  emptyPlayerState,
  importPreview,
  inventoryIds,
  makeBackup,
  normalizeAcquisitionChecks,
  parseBackup,
  validQuantity,
  validRoute,
  validatePlayerState,
} from "../domain/player";
import type { ImportPreview } from "../domain/player";

export type SaveStatus = "loading" | "saved" | "saving" | "error" | "memory";
export interface PlayerSnapshot {
  state: PlayerState;
  ready: boolean;
  status: SaveStatus;
  error: string | null;
  canUndo: boolean;
}
type Field = "checks" | "inventory" | "plan";
type Patch =
  | { field: Field; key: string; value: boolean | number | undefined }
  | {
      field: "inventoryEnabled" | "lastRoute" | "planMode" | "plan";
      value: boolean | string | Record<string, number> | undefined;
    };
type Change = { patch: Patch; before: Patch };
type Action =
  | { kind: "patch"; patches: Patch[]; undoable: boolean; expected?: Change[] }
  | {
      kind: "replace";
      state: PlayerState;
      recovery: boolean;
      expectedRevision?: number;
    };
interface StoredRecord {
  revision: number;
  state: PlayerState;
}
interface UndoRecord {
  changes?: Change[];
  replacement?: PlayerState;
  revision: number;
}
interface Pending {
  action: Action;
  resolve: () => void;
  reject?: (error: Error) => void;
}
const DATABASE = "ars-arcanum-player";
const STORE = "profiles";
const CURRENT = "kh1fm-current";
const RECOVERY = "kh1fm-recovery";

function cloneState(state: PlayerState): PlayerState {
  return {
    ...state,
    checks: { ...state.checks },
    inventory: { ...state.inventory },
    plan: { ...state.plan },
  };
}
function readPatch(state: PlayerState, patch: Patch): Patch {
  if ("key" in patch)
    return {
      field: patch.field,
      key: patch.key,
      value: state[patch.field][patch.key],
    };
  return { field: patch.field, value: state[patch.field] };
}
function applyPatch(state: PlayerState, patch: Patch): void {
  if ("key" in patch) {
    if (patch.value === undefined) delete state[patch.field][patch.key];
    else if (patch.field === "checks")
      state.checks[patch.key] = patch.value as boolean;
    else state[patch.field][patch.key] = patch.value as number;
  } else if (patch.field === "inventoryEnabled")
    state.inventoryEnabled = patch.value as boolean;
  else if (patch.field === "planMode")
    state.planMode = patch.value as "selected" | "first-craft";
  else if (patch.field === "plan")
    state.plan = { ...(patch.value as Record<string, number>) };
  else state.lastRoute = patch.value as string;
}
function sameValue(a: Patch["value"], b: Patch["value"]): boolean {
  if (a === b) return true;
  if (!a || !b || typeof a !== "object" || typeof b !== "object") return false;
  const keys = Object.keys(a);
  return (
    keys.length === Object.keys(b).length &&
    keys.every((key) => a[key] === b[key])
  );
}
function applyAction(state: PlayerState, action: Action): PlayerState {
  if (action.kind === "replace") return cloneState(action.state);
  const next = cloneState(state);
  for (const patch of action.patches) applyPatch(next, patch);
  return next;
}
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("Persistent browser storage is unavailable."));
      return;
    }
    const request = indexedDB.open(DATABASE, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE))
        request.result.createObjectStore(STORE);
    };
    request.onerror = () =>
      reject(request.error ?? new Error("Could not open saved progress."));
    request.onblocked = () =>
      reject(
        new Error(
          "Another tab is blocking the progress database. Close older Ars Arcanum tabs and retry.",
        ),
      );
    request.onsuccess = () => resolve(request.result);
  });
}
function readRecord(
  db: IDBDatabase,
  data: GameData,
  key = CURRENT,
): Promise<StoredRecord | undefined> {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction(STORE, "readonly")
      .objectStore(STORE)
      .get(key);
    request.onsuccess = () => {
      try {
        const raw = request.result as StoredRecord | undefined;
        if (!raw) {
          resolve(undefined);
          return;
        }
        const state = validatePlayerState(raw.state);
        state.checks = normalizeAcquisitionChecks(state.checks, data);
        resolve({
          revision: Number.isSafeInteger(raw.revision) ? raw.revision : 0,
          state,
        });
      } catch (error) {
        reject(error);
      }
    };
    request.onerror = () =>
      reject(request.error ?? new Error("Could not read saved progress."));
  });
}
/** Every mutation reads and writes inside one IndexedDB transaction: unrelated tab edits are merged safely. */
function transact(
  db: IDBDatabase,
  action: Action,
  data: GameData,
): Promise<{ record: StoredRecord; undo: UndoRecord }> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    let result: { record: StoredRecord; undo: UndoRecord } | undefined;
    let failure: Error | undefined;
    const request = store.get(CURRENT);
    request.onsuccess = () => {
      try {
        const raw = request.result as StoredRecord | undefined;
        const current = raw
          ? { revision: raw.revision, state: validatePlayerState(raw.state) }
          : { revision: 0, state: emptyPlayerState() };
        current.state.checks = normalizeAcquisitionChecks(
          current.state.checks,
          data,
        );
        if (!Number.isSafeInteger(current.revision) || current.revision < 0)
          throw new Error(
            "The saved progress revision is invalid. Export a backup before making changes.",
          );
        if (
          action.kind === "replace" &&
          action.expectedRevision !== undefined &&
          current.revision !== action.expectedRevision
        )
          throw new Error(
            "Progress changed in another tab. This replacement cannot be undone without overwriting newer changes.",
          );
        if (
          action.kind === "patch" &&
          action.expected?.some(
            (change) =>
              !sameValue(
                readPatch(current.state, change.patch).value,
                change.patch.value,
              ),
          )
        )
          throw new Error(
            "This value changed again in another tab. Undo was not applied.",
          );
        const next = applyAction(current.state, action);
        next.updatedAt = new Date().toISOString();
        const revision = current.revision + 1;
        if (!Number.isSafeInteger(revision))
          throw new Error("The saved progress revision exceeds safe bounds.");
        const changes =
          action.kind === "patch"
            ? action.patches.map((patch) => ({
                patch,
                before: readPatch(current.state, patch),
              }))
            : undefined;
        const undo = {
          changes,
          replacement: action.kind === "replace" ? current.state : undefined,
          revision,
        };
        const record = { revision, state: next };
        if (action.kind === "replace" && action.recovery)
          store.put(current, RECOVERY);
        store.put(record, CURRENT);
        result = { record, undo };
      } catch (error) {
        failure =
          error instanceof Error
            ? error
            : new Error("Could not save progress.");
        tx.abort();
      }
    };
    tx.oncomplete = () =>
      result
        ? resolve(result)
        : reject(
            new Error("The progress transaction did not produce a record."),
          );
    tx.onerror = () => {
      /* onabort reports the final transaction outcome */
    };
    tx.onabort = () =>
      reject(
        failure ??
          tx.error ??
          new Error("The browser could not save your change."),
      );
  });
}

export interface PlayerStore {
  getSnapshot(): PlayerSnapshot;
  subscribe(listener: () => void): () => void;
  setCheck(id: string, value: boolean): Promise<void>;
  toggleCheck(id: string): Promise<void>;
  setInventory(id: string, quantity: number | null): Promise<void>;
  setInventoryEnabled(enabled: boolean): Promise<void>;
  setPlan(id: string, quantity: number): Promise<void>;
  rememberRoute(route: string): Promise<void>;
  setPlanGoals(
    goals: Record<string, number>,
    mode?: "selected" | "first-craft",
  ): Promise<void>;
  setPlanMode(mode: "selected" | "first-craft"): Promise<void>;
  undo(): Promise<void>;
  retry(): Promise<void>;
  exportBackup(): string;
  previewImport(text: string): ImportPreview;
  importBackup(text: string): Promise<void>;
  restoreRecovery(): Promise<void>;
  dispose(): void;
}
export function createPlayerStore(data: GameData): PlayerStore {
  let base: StoredRecord = { revision: 0, state: emptyPlayerState() };
  let snapshot: PlayerSnapshot = {
    state: base.state,
    ready: false,
    status: "loading",
    error: null,
    canUndo: false,
  };
  let db: IDBDatabase | undefined;
  let pending: Pending[] = [];
  const listeners = new Set<() => void>();
  const undos: UndoRecord[] = [];
  let processing = false;
  let disposed = false;
  let failed: Action | null = null;
  const checkIds = new Set(
    data.entries.filter((e) => e.checkable).map((e) => e.id),
  );
  const linkedChecks = new Map<string, string[]>();
  for (const members of acquisitionGroups(data).values())
    for (const id of members) linkedChecks.set(id, members);
  const stockIds = inventoryIds(data);
  const recipeIds = new Set(data.recipes.map((recipe) => recipe.id));
  let channel: BroadcastChannel | undefined;
  try {
    if (typeof BroadcastChannel !== "undefined")
      channel = new BroadcastChannel("ars-arcanum-player-kh1fm");
  } catch {
    /* focus refresh is the fallback */
  }
  const emit = (
    status: SaveStatus = snapshot.status,
    error: string | null = snapshot.error,
  ) => {
    let state = base.state;
    for (const item of pending) state = applyAction(state, item.action);
    snapshot = {
      state,
      ready: snapshot.ready,
      status,
      error,
      canUndo: undos.length > 0 && !processing && !pending.length,
    };
    for (const listener of listeners) listener();
  };
  const refresh = async () => {
    if (!db || disposed) return;
    try {
      const record = await readRecord(db, data);
      if (record && record.revision > base.revision) {
        base = record;
        emit();
      }
    } catch (error) {
      emit(
        "error",
        `Saved progress could not be refreshed: ${error instanceof Error ? error.message : "storage error"}`,
      );
    }
  };
  if (channel)
    channel.onmessage = () => {
      void refresh();
    };
  const onFocus = () => {
    void refresh();
  };
  if (typeof window !== "undefined") window.addEventListener("focus", onFocus);
  const connect = async () => {
    try {
      db = await openDatabase();
      db.onversionchange = () => {
        db?.close();
        db = undefined;
        emit(
          "error",
          "Progress storage was updated in another tab. Reload this page before editing.",
        );
      };
      const record = await readRecord(db, data);
      if (record) base = record;
      snapshot = { ...snapshot, ready: true };
      emit(pending.length ? "saving" : "saved", null);
    } catch (error) {
      snapshot = { ...snapshot, ready: true };
      emit(
        "memory",
        `${error instanceof Error ? error.message : "Persistent storage is unavailable."} Changes cannot be saved until storage is available. Export a backup to keep your progress.`,
      );
    }
  };
  const ready = connect();
  const drain = async () => {
    if (processing) return;
    processing = true;
    await ready;
    while (pending.length) {
      const item = pending[0];
      try {
        if (!db)
          throw new Error(
            "Persistent browser storage is unavailable. The change was rolled back.",
          );
        const result = await transact(db, item.action, data);
        if (result.record.revision >= base.revision) base = result.record;
        if (
          (item.action.kind === "patch" && item.action.undoable) ||
          item.action.kind === "replace"
        ) {
          undos.push(result.undo);
          if (undos.length > 30) undos.shift();
        }
        pending.shift();
        channel?.postMessage({ revision: result.record.revision });
        emit(
          pending.length ? "saving" : failed ? "error" : "saved",
          failed ? snapshot.error : null,
        );
        item.resolve();
      } catch (error) {
        const err =
          error instanceof Error
            ? error
            : new Error("The change could not be saved.");
        failed = item.action;
        pending.shift();
        emit(
          "error",
          `${err.message} Your previous saved values are intact. Retry the change when storage is available.`,
        );
        if (item.reject) item.reject(err);
        else item.resolve();
      }
    }
    processing = false;
    emit(failed ? "error" : db ? "saved" : "memory");
  };
  const enqueue = (action: Action, rejectFailure = false): Promise<void> =>
    new Promise((resolve, reject) => {
      pending.push({
        action,
        resolve,
        reject: rejectFailure ? reject : undefined,
      });
      emit("saving", failed ? snapshot.error : null);
      void drain();
    });
  const patch = (patches: Patch[], undoable = true) =>
    enqueue({ kind: "patch", patches, undoable });
  const rejectInput = (message: string): Promise<void> => {
    emit("error", message);
    return Promise.resolve();
  };
  return {
    getSnapshot: () => snapshot,
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    setCheck(id, value) {
      if (!checkIds.has(id) || typeof value !== "boolean")
        return rejectInput("This entry cannot be checked.");
      return patch(
        (linkedChecks.get(id) ?? [id]).map((key) => ({
          field: "checks",
          key,
          value,
        })),
      );
    },
    toggleCheck(id) {
      if (!checkIds.has(id))
        return rejectInput("This entry cannot be checked.");
      const value = !snapshot.state.checks[id];
      return patch(
        (linkedChecks.get(id) ?? [id]).map((key) => ({
          field: "checks",
          key,
          value,
        })),
      );
    },
    setInventory(id, quantity) {
      if (!stockIds.has(id) || (quantity !== null && !validQuantity(quantity)))
        return rejectInput(
          "Stock must be a whole number from 0 to 999999, or blank for unknown.",
        );
      return patch([
        {
          field: "inventory",
          key: id,
          value: quantity === null ? undefined : quantity,
        },
      ]);
    },
    setInventoryEnabled(enabled) {
      if (typeof enabled !== "boolean")
        return rejectInput("Inventory preference is invalid.");
      return patch([{ field: "inventoryEnabled", value: enabled }]);
    },
    setPlan(id, quantity) {
      if (!recipeIds.has(id) || !validQuantity(quantity))
        return rejectInput(
          "Craft quantity must be a whole number from 0 to 999999.",
        );
      return patch([
        { field: "plan", key: id, value: quantity || undefined },
        { field: "planMode", value: "selected" },
      ]);
    },
    setPlanGoals(goals, mode = "selected") {
      if (
        (mode !== "selected" && mode !== "first-craft") ||
        Object.entries(goals).some(
          ([id, quantity]) => !recipeIds.has(id) || !validQuantity(quantity),
        )
      )
        return rejectInput(
          "The requested craft plan contains an invalid recipe or quantity.",
        );
      const plan = Object.fromEntries(
        Object.entries(goals).filter(([, quantity]) => quantity > 0),
      );
      return patch([
        { field: "plan", value: plan },
        { field: "planMode", value: mode },
      ]);
    },
    setPlanMode(mode) {
      if (mode !== "selected" && mode !== "first-craft")
        return rejectInput("Choose a selected-output or first-craft plan.");
      return patch([{ field: "planMode", value: mode }]);
    },
    rememberRoute(route) {
      if (!validRoute(route) || snapshot.state.lastRoute === route)
        return Promise.resolve();
      return patch([{ field: "lastRoute", value: route }], false);
    },
    async undo() {
      if (processing || pending.length) return;
      const previous = undos.pop();
      if (!previous) return;
      const action: Action = previous.replacement
        ? {
            kind: "replace",
            state: previous.replacement,
            expectedRevision: previous.revision,
            recovery: false,
          }
        : {
            kind: "patch",
            patches: previous.changes!.map((change) => change.before),
            expected: previous.changes,
            undoable: false,
          };
      try {
        await enqueue(action, true);
      } catch {
        undos.push(previous);
        emit();
      }
      // An import undo does not add a redo entry to the recent-change stack.
      if (
        previous.replacement &&
        undos.at(-1)?.replacement &&
        undos.at(-1)?.revision === base.revision
      )
        undos.pop();
      emit();
    },
    async retry() {
      if (!db) await connect();
      if (!failed) {
        if (db) emit("saved", null);
        return;
      }
      const action = failed;
      failed = null;
      await enqueue(action);
    },
    exportBackup: () => makeBackup(snapshot.state),
    previewImport: (text) => importPreview(parseBackup(text, data)),
    importBackup: (text) =>
      enqueue(
        { kind: "replace", state: parseBackup(text, data), recovery: true },
        true,
      ),
    async restoreRecovery() {
      await ready;
      if (!db) throw new Error("Persistent browser storage is unavailable.");
      const recovery = await readRecord(db, data, RECOVERY);
      if (!recovery)
        throw new Error("There is no recovery snapshot on this device.");
      await enqueue(
        { kind: "replace", state: recovery.state, recovery: true },
        true,
      );
    },
    dispose() {
      disposed = true;
      channel?.close();
      db?.close();
      listeners.clear();
      if (typeof window !== "undefined")
        window.removeEventListener("focus", onFocus);
    },
  };
}
