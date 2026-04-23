import type { Schedule, ScheduleStatus } from "./types";

/** YYYY-MM-DD文字列を JST の Date オブジェクト（深夜0時基準）に変換。 */
export function parseDate(iso: string): Date {
  // "YYYY-MM-DD" は UTC 扱いされるため、ローカル(JST)の 00:00 に寄せる
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** 2つの日付（YYYY-MM-DD）間の日数差を計算（a より b が後なら正）。 */
export function diffDays(a: string, b: string): number {
  const MS = 24 * 60 * 60 * 1000;
  return Math.round((parseDate(b).getTime() - parseDate(a).getTime()) / MS);
}

/** YYYY-MM-DDを日本語表記（2026年4月21日）に整形。 */
export function formatJp(iso: string): string {
  const d = parseDate(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

/** YYYY-MM-DDを短い日本語表記（4/21）に整形。 */
export function formatJpShort(iso: string): string {
  const d = parseDate(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

/** 今日の日付を YYYY-MM-DD 形式で取得（ローカルタイムゾーン基準）。 */
export function todayIso(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** スケジュールの現在ステータスを判定。 */
export function getStatus(schedule: Schedule, today: string = todayIso()): ScheduleStatus {
  if (diffDays(today, schedule.exam_date) < 0) return "done";
  if (diffDays(today, schedule.app_start) > 0) return "upcoming";
  if (diffDays(today, schedule.app_end) < 0) return "closed";
  if (diffDays(today, schedule.app_end) <= 7) return "closing";
  return "open";
}

/** ステータスに対応するラベル。 */
export function statusLabel(status: ScheduleStatus): string {
  switch (status) {
    case "upcoming":
      return "受付開始前";
    case "open":
      return "受付中";
    case "closing":
      return "締切間近";
    case "closed":
      return "受付終了";
    case "done":
      return "試験終了";
  }
}

/** 締切までの日数（負の場合は締切後）。 */
export function daysUntilDeadline(schedule: Schedule, today: string = todayIso()): number {
  return diffDays(today, schedule.app_end);
}
