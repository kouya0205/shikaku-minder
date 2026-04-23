"use client";

import { useSyncExternalStore } from "react";
import {
  getServerSnapshot,
  getTrackedSnapshot,
  subscribeTracked,
} from "./storage";
import type { TrackedItem } from "./types";

/** マイリストの最新状態を購読するフック。SSR時は空配列を返す。 */
export function useTracked(): TrackedItem[] {
  return useSyncExternalStore(
    subscribeTracked,
    getTrackedSnapshot,
    getServerSnapshot,
  );
}

/** 指定スケジュールがマイリストに登録されているかを購読するフック。 */
export function useIsTracked(examId: string, scheduleId: string): boolean {
  const items = useTracked();
  return items.some(
    (i) => i.examId === examId && i.scheduleId === scheduleId,
  );
}
