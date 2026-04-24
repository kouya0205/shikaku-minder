export type ExamCategory =
  | "IT"
  | "ビジネス"
  | "語学"
  | "法律"
  | "金融"
  | "医療"
  | "技術"
  | "デザイン"
  | "教育"
  | "不動産";

export type AffiliateItem = {
  title: string;
  url: string;
  vendor: string;
  kind: "book" | "course" | "service";
};

export type AffiliateBanner = {
  linkUrl: string;
  imgSrc: string;
  trackingSrc: string;
  width: number;
  height: number;
};

export type AffiliateConfig = {
  items: AffiliateItem[];
  banner?: AffiliateBanner;
};

export type Exam = {
  id: string;
  name: string;
  category: ExamCategory;
  description: string;
  official_url: string;
  affiliate_config: AffiliateConfig;
};

export type Schedule = {
  id: string;
  exam_id: string;
  term_label: string;
  /** 申込開始日 (ISO: YYYY-MM-DD) */
  app_start: string;
  /** 申込締切日 (ISO: YYYY-MM-DD) */
  app_end: string;
  /** 試験日 (ISO: YYYY-MM-DD) */
  exam_date: string;
  is_cbt: boolean;
};

export type ExamWithSchedules = Exam & {
  schedules: Schedule[];
};

export type TrackedItem = {
  examId: string;
  scheduleId: string;
  addedAt: string;
};

export type ScheduleStatus =
  | "upcoming"    // 申込開始前
  | "open"        // 申込受付中
  | "closing"     // 申込締切間近（7日以内）
  | "closed"      // 申込終了・試験前
  | "done";       // 試験済
