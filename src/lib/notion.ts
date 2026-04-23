import type { Exam, ExamWithSchedules, Schedule } from "./types";

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const EXAM_DB_ID = process.env.NOTION_EXAM_DB_ID!;
const SCHEDULE_DB_ID = process.env.NOTION_SCHEDULE_DB_ID!;

const NOTION_VERSION = "2022-06-28";
const BASE = "https://api.notion.com/v1";

function headers() {
  return {
    Authorization: `Bearer ${NOTION_API_KEY}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

async function queryDatabase(
  dbId: string,
  filter?: object,
): Promise<NotionPage[]> {
  const pages: NotionPage[] = [];
  let cursor: string | undefined;

  do {
    const body: Record<string, unknown> = { page_size: 100 };
    if (filter) body.filter = filter;
    if (cursor) body.start_cursor = cursor;

    const res = await fetch(`${BASE}/databases/${dbId}/query`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(body),
      next: { revalidate: 3600 }, // 1時間キャッシュ
    });

    if (!res.ok) throw new Error(`Notion API error: ${res.status}`);
    const json = (await res.json()) as NotionQueryResult;
    pages.push(...json.results);
    cursor = json.has_more ? json.next_cursor : undefined;
  } while (cursor);

  return pages;
}

// ---- プロパティ取得ヘルパー ----

type NotionPage = {
  id: string;
  properties: Record<string, NotionProperty>;
};

type NotionQueryResult = {
  results: NotionPage[];
  has_more: boolean;
  next_cursor: string;
};

type NotionProperty =
  | { type: "title"; title: Array<{ plain_text: string }> }
  | { type: "rich_text"; rich_text: Array<{ plain_text: string }> }
  | { type: "select"; select: { name: string } | null }
  | { type: "url"; url: string | null }
  | { type: "checkbox"; checkbox: boolean }
  | { type: "date"; date: { start: string } | null }
  | { type: "relation"; relation: Array<{ id: string }> };

function getText(prop: NotionProperty | undefined): string {
  if (!prop) return "";
  if (prop.type === "title") return prop.title.map((t) => t.plain_text).join("");
  if (prop.type === "rich_text") return prop.rich_text.map((t) => t.plain_text).join("");
  return "";
}

function getSelect(prop: NotionProperty | undefined): string {
  if (!prop || prop.type !== "select") return "";
  return prop.select?.name ?? "";
}

function getUrl(prop: NotionProperty | undefined): string {
  if (!prop || prop.type !== "url") return "";
  return prop.url ?? "";
}

function getCheckbox(prop: NotionProperty | undefined): boolean {
  if (!prop || prop.type !== "checkbox") return false;
  return prop.checkbox;
}

function getDate(prop: NotionProperty | undefined): string {
  if (!prop || prop.type !== "date") return "";
  return prop.date?.start ?? "";
}

function getRelation(prop: NotionProperty | undefined): string[] {
  if (!prop || prop.type !== "relation") return [];
  return prop.relation.map((r) => r.id);
}

// ---- マッパー ----

import { affiliateConfigs } from "./affiliates";

function pageToExam(page: NotionPage): Exam | null {
  const slug = getText(page.properties["スラッグ"]);
  if (!slug) return null;
  return {
    id: slug,
    name: getText(page.properties["資格名"]),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    category: getSelect(page.properties["カテゴリ"]) as any,
    description: getText(page.properties["概要"]),
    official_url: getUrl(page.properties["公式URL"]) || "#",
    affiliate_config: affiliateConfigs[slug] ?? { items: [] },
  };
}

/** Notion の試験日程ページID → Exam NotionページID のルックアップ用 */
let _notionIdToSlug: Map<string, string> | null = null;

async function getNotionIdToSlugMap(): Promise<Map<string, string>> {
  if (_notionIdToSlug) return _notionIdToSlug;
  const pages = await queryDatabase(EXAM_DB_ID, {
    property: "有効",
    checkbox: { equals: true },
  });
  _notionIdToSlug = new Map(
    pages
      .map((p): [string, string] => [p.id, getText(p.properties["スラッグ"])])
      .filter(([, slug]) => slug),
  );
  return _notionIdToSlug;
}

function pageToSchedule(
  page: NotionPage,
  notionIdToSlug: Map<string, string>,
): Schedule | null {
  const relIds = getRelation(page.properties["資格"]);
  const examSlug = relIds.length ? notionIdToSlug.get(relIds[0]) : undefined;
  if (!examSlug) return null;

  const examDate = getDate(page.properties["試験日"]);
  const appEnd = getDate(page.properties["申込締切日"]);
  if (!examDate || !appEnd) return null;

  return {
    id: page.id.replace(/-/g, ""),
    exam_id: examSlug,
    term_label: getText(page.properties["回次ラベル"]),
    app_start: getDate(page.properties["申込開始日"]),
    app_end: appEnd,
    exam_date: examDate,
    is_cbt: getCheckbox(page.properties["CBT"]),
  };
}

// ---- 公開API ----

export async function fetchAllExams(): Promise<Exam[]> {
  const pages = await queryDatabase(EXAM_DB_ID, {
    property: "有効",
    checkbox: { equals: true },
  });
  return pages.map(pageToExam).filter((e): e is Exam => e !== null);
}

export async function fetchAllSchedules(): Promise<Schedule[]> {
  const [pages, idToSlug] = await Promise.all([
    queryDatabase(SCHEDULE_DB_ID),
    getNotionIdToSlugMap(),
  ]);
  return pages
    .map((p) => pageToSchedule(p, idToSlug))
    .filter((s): s is Schedule => s !== null)
    .sort((a, b) => a.exam_date.localeCompare(b.exam_date));
}

export async function fetchAllExamsWithSchedules(): Promise<ExamWithSchedules[]> {
  const [exams, schedules] = await Promise.all([
    fetchAllExams(),
    fetchAllSchedules(),
  ]);
  return exams.map((exam) => ({
    ...exam,
    schedules: schedules
      .filter((s) => s.exam_id === exam.id)
      .sort((a, b) => a.exam_date.localeCompare(b.exam_date)),
  }));
}

export async function fetchExamWithSchedules(
  slug: string,
): Promise<ExamWithSchedules | undefined> {
  const all = await fetchAllExamsWithSchedules();
  return all.find((e) => e.id === slug);
}
