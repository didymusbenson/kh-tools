import { useSyncExternalStore } from "react";
import type { GameData } from "../domain/types";
import { createPlayerStore } from "./playerStore";
import type { PlayerStore } from "./playerStore";

const stores = new WeakMap<GameData, PlayerStore>();
export function usePlayerState(data: GameData) {
  let store = stores.get(data);
  if (!store) {
    store = createPlayerStore(data);
    stores.set(data, store);
  }
  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot,
  );
  return {
    ...snapshot,
    setCheck: store.setCheck,
    toggleCheck: store.toggleCheck,
    setInventory: store.setInventory,
    setInventoryEnabled: store.setInventoryEnabled,
    setFarmTarget: store.setFarmTarget,
    addRecipeToFarmPlan: store.addRecipeToFarmPlan,
    addMaterialToFarmPlan: store.addMaterialToFarmPlan,
    setPlan: store.setPlan,
    setPlanGoals: store.setPlanGoals,
    setPlanMode: store.setPlanMode,
    rememberRoute: store.rememberRoute,
    undo: store.undo,
    retry: store.retry,
    exportBackup: store.exportBackup,
    previewImport: store.previewImport,
    importBackup: store.importBackup,
    restoreRecovery: store.restoreRecovery,
  };
}
export type PlayerController = ReturnType<typeof usePlayerState>;
