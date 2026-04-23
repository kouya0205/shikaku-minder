"use client";

import type { TrackedItem } from "./types";

const KEY = "shikaku-minder:tracked:v1";
const EVENT = "shikaku-minder:tracked-changed";

const EMPTY: TrackedItem[] = [];
let cachedSnapshot: TrackedItem[] | null = null;

function readRaw(): TrackedItem[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return EMPTY;
    const cleaned = parsed.filter(
      (item): item is TrackedItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as TrackedItem).examId === "string" &&
        typeof (item as TrackedItem).scheduleId === "string",
    );
    return cleaned.length ? cleaned : EMPTY;
  } catch {
    return EMPTY;
  }
}

function writeRaw(items: TrackedItem[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
  cachedSnapshot = null;
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** 参照安定なスナップショット（useSyncExternalStore 用）。 */
export function getTrackedSnapshot(): TrackedItem[] {
  if (cachedSnapshot) return cachedSnapshot;
  cachedSnapshot = readRaw();
  return cachedSnapshot;
}

/** サーバー側用の空スナップショット。 */
export function getServerSnapshot(): TrackedItem[] {
  return EMPTY;
}

export function getTracked(): TrackedItem[] {
  return getTrackedSnapshot();
}

export function isTracked(examId: string, scheduleId: string): boolean {
  return readRaw().some(
    (item) => item.examId === examId && item.scheduleId === scheduleId,
  );
}

export function addTracked(examId: string, scheduleId: string): void {
  const current = readRaw();
  if (current.some((i) => i.examId === examId && i.scheduleId === scheduleId)) {
    return;
  }
  current.push({ examId, scheduleId, addedAt: new Date().toISOString() });
  writeRaw(current);
}

export function removeTracked(examId: string, scheduleId: string): void {
  const current = readRaw().filter(
    (i) => !(i.examId === examId && i.scheduleId === scheduleId),
  );
  writeRaw(current);
}

export function toggleTracked(examId: string, scheduleId: string): boolean {
  if (isTracked(examId, scheduleId)) {
    removeTracked(examId, scheduleId);
    return false;
  }
  addTracked(examId, scheduleId);
  return true;
}

/** マイリストの変更を購読する。cleanup関数を返す。 */
export function subscribeTracked(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => {
    cachedSnapshot = null;
    cb();
  };
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
