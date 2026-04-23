import type { Exam, Schedule } from "./types";

/** YYYY-MM-DD を ICS の日付（YYYYMMDD）に整形。 */
function toIcsDate(iso: string): string {
  return iso.replaceAll("-", "");
}

/** YYYY-MM-DD を1日加算して ICS 日付にする（終日イベントは終日翌日を指定する必要がある）。 */
function toIcsDatePlusOne(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d + 1);
  const yy = date.getFullYear();
  const mm = `${date.getMonth() + 1}`.padStart(2, "0");
  const dd = `${date.getDate()}`.padStart(2, "0");
  return `${yy}${mm}${dd}`;
}

/** Googleカレンダー「イベント追加」URLを生成。試験日を終日イベントで登録。 */
export function buildGoogleCalendarUrl(
  exam: Exam,
  schedule: Schedule,
  kind: "exam" | "deadline" = "exam",
): string {
  const isExam = kind === "exam";
  const title = isExam
    ? `${exam.name} 試験日 (${schedule.term_label})`
    : `${exam.name} 申込締切 (${schedule.term_label})`;
  const startIso = isExam ? schedule.exam_date : schedule.app_end;
  const dates = `${toIcsDate(startIso)}/${toIcsDatePlusOne(startIso)}`;
  const details = [
    `資格: ${exam.name}`,
    `回次: ${schedule.term_label}`,
    `申込期間: ${schedule.app_start} 〜 ${schedule.app_end}`,
    `試験日: ${schedule.exam_date}`,
    `公式サイト: ${exam.official_url}`,
    "",
    "Shikaku Minder から追加",
  ].join("\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates,
    details,
    location: exam.official_url,
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

/** ICS文字列の RFC5545 準拠のエスケープ。 */
function escapeIcs(text: string): string {
  return text
    .replaceAll("\\", "\\\\")
    .replaceAll("\n", "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
}

/** ICSファイルの中身を生成（試験日と申込締切を1ファイルにまとめる）。 */
export function buildIcsContent(exam: Exam, schedule: Schedule): string {
  const dtstamp =
    new Date().toISOString().replaceAll("-", "").replaceAll(":", "").split(".")[0] +
    "Z";

  const events = [
    {
      uid: `${schedule.id}-exam@shikaku-minder`,
      summary: `${exam.name} 試験日 (${schedule.term_label})`,
      dtstart: toIcsDate(schedule.exam_date),
      dtend: toIcsDatePlusOne(schedule.exam_date),
    },
    {
      uid: `${schedule.id}-deadline@shikaku-minder`,
      summary: `${exam.name} 申込締切 (${schedule.term_label})`,
      dtstart: toIcsDate(schedule.app_end),
      dtend: toIcsDatePlusOne(schedule.app_end),
    },
  ];

  const description = escapeIcs(
    [
      `資格: ${exam.name}`,
      `回次: ${schedule.term_label}`,
      `申込期間: ${schedule.app_start} 〜 ${schedule.app_end}`,
      `試験日: ${schedule.exam_date}`,
      `公式: ${exam.official_url}`,
    ].join("\n"),
  );

  const vevents = events
    .map((ev) =>
      [
        "BEGIN:VEVENT",
        `UID:${ev.uid}`,
        `DTSTAMP:${dtstamp}`,
        `DTSTART;VALUE=DATE:${ev.dtstart}`,
        `DTEND;VALUE=DATE:${ev.dtend}`,
        `SUMMARY:${escapeIcs(ev.summary)}`,
        `DESCRIPTION:${description}`,
        `URL:${escapeIcs(exam.official_url)}`,
        "END:VEVENT",
      ].join("\r\n"),
    )
    .join("\r\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Shikaku Minder//JP",
    "CALSCALE:GREGORIAN",
    vevents,
    "END:VCALENDAR",
  ].join("\r\n");
}

/** ブラウザでICSファイルをダウンロードさせる。 */
export function downloadIcs(exam: Exam, schedule: Schedule): void {
  if (typeof window === "undefined") return;
  const content = buildIcsContent(exam, schedule);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${exam.id}-${schedule.id}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
