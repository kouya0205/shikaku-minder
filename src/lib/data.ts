import type { Exam, ExamWithSchedules, Schedule } from "./types";

/**
 * 国内主要資格トップ30のシードデータ。
 * 日付は 2026-04-21 時点の想定値。実際の申込前には公式サイトを要確認。
 */

export const exams: Exam[] = [
  {
    id: "toeic",
    name: "TOEIC Listening & Reading",
    category: "語学",
    description:
      "ビジネス・日常英語コミュニケーション能力を測る世界的指標。年10回実施。",
    official_url: "https://www.iibc-global.org/toeic.html",
    affiliate_config: {
      items: [
        { title: "公式TOEIC L&R 問題集", vendor: "IIBC", url: "#", kind: "book" },
        { title: "スタディサプリENGLISH TOEIC対策", vendor: "リクルート", url: "#", kind: "course" },
      ],
    },
  },
  {
    id: "eiken",
    name: "実用英語技能検定 (英検)",
    category: "語学",
    description:
      "国内で最も受験者が多い英語検定。1〜5級まで段階的にレベル評価。",
    official_url: "https://www.eiken.or.jp/eiken/",
    affiliate_config: {
      items: [
        { title: "英検 過去問集", vendor: "旺文社", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "boki",
    name: "日商簿記検定",
    category: "ビジネス",
    description:
      "経理・会計の登竜門。3級・2級・1級の段階構成で年3回実施（ネット試験は通年）。",
    official_url: "https://www.kentei.ne.jp/bookkeeping",
    affiliate_config: {
      items: [
        { title: "スッキリわかる 日商簿記", vendor: "TAC出版", url: "#", kind: "book" },
        { title: "クレアール 簿記講座", vendor: "クレアール", url: "#", kind: "course" },
      ],
    },
  },
  {
    id: "fe",
    name: "基本情報技術者試験 (FE)",
    category: "IT",
    description:
      "ITエンジニアの基礎知識を問う国家試験。CBT方式で通年受験可能。",
    official_url: "https://www.ipa.go.jp/shiken/kubun/fe.html",
    affiliate_config: {
      items: [
        { title: "キタミ式イラストIT塾 基本情報技術者", vendor: "技術評論社", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "ap",
    name: "応用情報技術者試験 (AP)",
    category: "IT",
    description:
      "ワンランク上のITエンジニア向け国家試験。年2回（春・秋）。",
    official_url: "https://www.ipa.go.jp/shiken/kubun/ap.html",
    affiliate_config: {
      items: [
        { title: "応用情報技術者 合格教本", vendor: "技術評論社", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "ipass",
    name: "ITパスポート試験",
    category: "IT",
    description:
      "ITを活用する社会人の入門国家資格。CBTで通年受験可能。",
    official_url: "https://www3.jitec.ipa.go.jp/JitesCbt/index.html",
    affiliate_config: {
      items: [
        { title: "いちばんやさしい ITパスポート", vendor: "インプレス", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "takken",
    name: "宅地建物取引士 (宅建士)",
    category: "不動産",
    description:
      "不動産取引の専門家として必要な法律・知識を問う国家資格。年1回10月実施。",
    official_url: "https://www.retio.or.jp/exam/takken_shiken.html",
    affiliate_config: {
      items: [
        { title: "みんなが欲しかった！宅建士の教科書", vendor: "TAC出版", url: "#", kind: "book" },
        { title: "フォーサイト 宅建士講座", vendor: "フォーサイト", url: "#", kind: "course" },
      ],
    },
  },
  {
    id: "gyosei",
    name: "行政書士",
    category: "法律",
    description:
      "官公署への書類作成・許認可手続を扱う法律系国家資格。年1回11月。",
    official_url: "https://gyosei-shiken.or.jp/",
    affiliate_config: {
      items: [
        { title: "合格革命 行政書士 基本テキスト", vendor: "早稲田経営出版", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "sharoshi",
    name: "社会保険労務士 (社労士)",
    category: "ビジネス",
    description:
      "労務・年金・社会保険のスペシャリスト国家資格。年1回8月実施。",
    official_url: "https://www.sharosi-siken.or.jp/",
    affiliate_config: {
      items: [
        { title: "うかる！社労士 テキスト", vendor: "日本経済新聞出版", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "chusho",
    name: "中小企業診断士",
    category: "ビジネス",
    description:
      "経営コンサルティングの国家資格。一次試験は8月、二次試験は10〜12月。",
    official_url: "https://www.j-smeca.jp/",
    affiliate_config: {
      items: [
        { title: "スピードテキスト 中小企業診断士", vendor: "TAC出版", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "fp2",
    name: "FP技能検定 (2級)",
    category: "金融",
    description:
      "ライフプラン・資産設計の知識を問う国家検定。年3回（5月・9月・1月）実施。",
    official_url: "https://www.jafp.or.jp/exam/",
    affiliate_config: {
      items: [
        { title: "みんなが欲しかった！FPの教科書 2級", vendor: "TAC出版", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "kikenbutsu-otsu4",
    name: "危険物取扱者 乙種第4類",
    category: "技術",
    description:
      "ガソリン・灯油等の引火性液体を扱うための国家資格。各都道府県で年複数回実施。",
    official_url: "https://www.shoubo-shiken.or.jp/",
    affiliate_config: {
      items: [
        { title: "乙4類危険物取扱者試験 2026年版", vendor: "弘文社", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "denki2",
    name: "第二種電気工事士",
    category: "技術",
    description:
      "一般住宅・小規模店舗の電気工事に従事するための国家資格。筆記＋技能試験。",
    official_url: "https://www.shiken.or.jp/",
    affiliate_config: {
      items: [
        { title: "ぜんぶ絵で見て覚える 第二種電気工事士", vendor: "リックテレコム", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "hisho2",
    name: "秘書検定 2級",
    category: "ビジネス",
    description:
      "ビジネスマナー・一般常識の基礎を問う実用的な検定。年3回実施。",
    official_url: "https://jitsumu-kentei.jp/HS/",
    affiliate_config: {
      items: [
        { title: "秘書検定2級 パーフェクトマスター", vendor: "早稲田教育出版", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "hanbaishi",
    name: "リテールマーケティング (販売士) 2級",
    category: "ビジネス",
    description:
      "小売・流通の専門知識を問う検定。CBT方式で通年受験可能。",
    official_url: "https://www.kentei.ne.jp/retailsales",
    affiliate_config: {
      items: [
        { title: "販売士2級 ハンドブック", vendor: "カリアック", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "iryojimu",
    name: "医療事務技能審査試験 (メディカルクラーク)",
    category: "医療",
    description:
      "医療機関における窓口対応・レセプト業務能力を測る民間検定。毎月実施。",
    official_url: "https://www.ginou.co.jp/qualifications/medical_clerk.html",
    affiliate_config: {
      items: [
        { title: "医療事務 入門テキスト", vendor: "日本医療事務協会", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "toroku-hanbai",
    name: "登録販売者",
    category: "医療",
    description:
      "一般用医薬品（第2・3類）の販売を担える国家資格。都道府県ごと年1回。",
    official_url:
      "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iyakuhin/ippanyou/index.html",
    affiliate_config: {
      items: [
        { title: "7日間でうかる 登録販売者", vendor: "翔泳社", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "sc",
    name: "情報処理安全確保支援士 (SC)",
    category: "IT",
    description:
      "サイバーセキュリティ分野の国家資格。年2回（春・秋）実施。",
    official_url: "https://www.ipa.go.jp/shiken/kubun/sc.html",
    affiliate_config: {
      items: [
        { title: "情報処理安全確保支援士 合格教本", vendor: "技術評論社", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "aws-saa",
    name: "AWS Certified Solutions Architect – Associate",
    category: "IT",
    description:
      "AWSクラウド上でのシステム設計能力を評価する認定資格。通年オンライン受験可。",
    official_url:
      "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    affiliate_config: {
      items: [
        { title: "AWS認定 SAA-C03 対策テキスト", vendor: "SBクリエイティブ", url: "#", kind: "book" },
        { title: "Udemy AWS SAA 講座", vendor: "Udemy", url: "#", kind: "course" },
      ],
    },
  },
  {
    id: "gcp-pca",
    name: "Google Cloud Professional Cloud Architect",
    category: "IT",
    description:
      "Google Cloud上でのソリューション設計力を測る上位認定。オンラインで通年受験可能。",
    official_url:
      "https://cloud.google.com/certification/cloud-architect",
    affiliate_config: {
      items: [
        { title: "Google Cloud認定資格 本番対策", vendor: "インプレス", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "cpa",
    name: "公認会計士",
    category: "金融",
    description:
      "会計監査の最高峰国家資格。短答式（年2回）・論文式（年1回8月）の構成。",
    official_url: "https://www.fsa.go.jp/cpaaob/kouninkaikeishi-shiken/",
    affiliate_config: {
      items: [
        { title: "公認会計士 試験対策ハンドブック", vendor: "TAC出版", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "zeirishi",
    name: "税理士",
    category: "金融",
    description:
      "税務のスペシャリスト国家資格。科目合格制で年1回8月実施。",
    official_url: "https://www.nta.go.jp/taxes/shiraberu/shikaku/zeirishi/index.htm",
    affiliate_config: {
      items: [
        { title: "みんなが欲しかった！税理士 簿記論", vendor: "TAC出版", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "shihoshoshi",
    name: "司法書士",
    category: "法律",
    description:
      "登記・裁判所提出書類の作成を行う法律系国家資格。年1回7月筆記試験。",
    official_url: "https://www.moj.go.jp/shikaku_saiyo_index1.html",
    affiliate_config: {
      items: [
        { title: "オートマシステム 司法書士", vendor: "日本実業出版社", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "nihongo-kyoiku",
    name: "日本語教育能力検定試験",
    category: "教育",
    description:
      "日本語教師を目指す人向けの検定。年1回10月実施。",
    official_url: "https://www.jees.or.jp/jltct/",
    affiliate_config: {
      items: [
        { title: "日本語教育能力検定試験 試験問題", vendor: "凡人社", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "mos-excel",
    name: "MOS Excel (Microsoft Office Specialist)",
    category: "IT",
    description:
      "Microsoft Officeのスキルを国際認定する資格。CBTで通年受験可能。",
    official_url: "https://mos.odyssey-com.co.jp/",
    affiliate_config: {
      items: [
        { title: "MOS Excel 365 対策テキスト", vendor: "FOM出版", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "hsk4",
    name: "HSK (漢語水平考試) 4級",
    category: "語学",
    description:
      "中国政府公認の中国語能力試験。毎月1回実施。",
    official_url: "https://www.hskj.jp/",
    affiliate_config: {
      items: [
        { title: "合格奪取！ HSK 4級 トレーニングブック", vendor: "スリーエーネットワーク", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "nihongo-kentei",
    name: "日本語検定",
    category: "語学",
    description:
      "日本語運用能力を総合的に測る検定。年2回（6月・11月）。",
    official_url: "https://www.nihongokentei.jp/",
    affiliate_config: {
      items: [
        { title: "日本語検定 公式過去問題集", vendor: "東京書籍", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "shikisai2",
    name: "色彩検定 2級",
    category: "デザイン",
    description:
      "色彩の理論・応用を問う文部科学省後援の検定。年2回（6月・11月）。",
    official_url: "https://www.aft.or.jp/",
    affiliate_config: {
      items: [
        { title: "色彩検定 公式テキスト 2級", vendor: "AFT", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "color-coordinator",
    name: "カラーコーディネーター検定 スタンダード",
    category: "デザイン",
    description:
      "東商主催、色彩設計・配色実務に強みを持つ検定。CBTで通年受験可能。",
    official_url: "https://www.kentei.org/color/",
    affiliate_config: {
      items: [
        { title: "カラーコーディネーター検定 公式テキスト", vendor: "東商", url: "#", kind: "book" },
      ],
    },
  },
  {
    id: "biz-homu2",
    name: "ビジネス実務法務検定 2級",
    category: "法律",
    description:
      "社会人が押さえるべき企業法務の基礎力を測る検定。CBTで通年受験可能。",
    official_url: "https://www.kentei.org/houmu/",
    affiliate_config: {
      items: [
        { title: "ビジネス実務法務検定 公式テキスト 2級", vendor: "東商", url: "#", kind: "book" },
      ],
    },
  },
];

/** 各資格のスケジュール。日付は 2026-04-21 時点の想定値。 */
export const schedules: Schedule[] = [
  // TOEIC – 年10回、CBT+IP
  { id: "toeic-2026-06", exam_id: "toeic", term_label: "2026年6月公開テスト", app_start: "2026-04-10", app_end: "2026-05-10", exam_date: "2026-06-14", is_cbt: false },
  { id: "toeic-2026-07", exam_id: "toeic", term_label: "2026年7月公開テスト", app_start: "2026-05-15", app_end: "2026-06-14", exam_date: "2026-07-19", is_cbt: false },
  { id: "toeic-2026-09", exam_id: "toeic", term_label: "2026年9月公開テスト", app_start: "2026-07-15", app_end: "2026-08-15", exam_date: "2026-09-13", is_cbt: false },

  // 英検
  { id: "eiken-2026-2", exam_id: "eiken", term_label: "2026年度 第2回", app_start: "2026-07-01", app_end: "2026-09-04", exam_date: "2026-10-11", is_cbt: false },
  { id: "eiken-2026-3", exam_id: "eiken", term_label: "2026年度 第3回", app_start: "2026-11-01", app_end: "2026-12-11", exam_date: "2027-01-24", is_cbt: false },

  // 日商簿記 3級/2級 (統一試験)
  { id: "boki-2026-06", exam_id: "boki", term_label: "第173回 統一試験", app_start: "2026-04-20", app_end: "2026-05-08", exam_date: "2026-06-14", is_cbt: false },
  { id: "boki-2026-11", exam_id: "boki", term_label: "第174回 統一試験", app_start: "2026-09-20", app_end: "2026-10-09", exam_date: "2026-11-15", is_cbt: false },

  // 基本情報 (CBT通年)
  { id: "fe-2026-q2", exam_id: "fe", term_label: "2026年度 第1四半期", app_start: "2026-04-01", app_end: "2026-06-30", exam_date: "2026-06-30", is_cbt: true },
  { id: "fe-2026-q3", exam_id: "fe", term_label: "2026年度 第2四半期", app_start: "2026-07-01", app_end: "2026-09-30", exam_date: "2026-09-30", is_cbt: true },

  // 応用情報
  { id: "ap-2026-autumn", exam_id: "ap", term_label: "2026年度 秋期", app_start: "2026-07-07", app_end: "2026-07-31", exam_date: "2026-10-18", is_cbt: false },

  // ITパスポート (CBT通年)
  { id: "ipass-2026-may", exam_id: "ipass", term_label: "2026年5月度", app_start: "2026-04-01", app_end: "2026-05-25", exam_date: "2026-05-30", is_cbt: true },
  { id: "ipass-2026-jun", exam_id: "ipass", term_label: "2026年6月度", app_start: "2026-05-01", app_end: "2026-06-25", exam_date: "2026-06-27", is_cbt: true },

  // 宅建士
  { id: "takken-2026", exam_id: "takken", term_label: "2026年度 本試験", app_start: "2026-07-01", app_end: "2026-07-31", exam_date: "2026-10-18", is_cbt: false },

  // 行政書士
  { id: "gyosei-2026", exam_id: "gyosei", term_label: "2026年度 本試験", app_start: "2026-07-27", app_end: "2026-08-28", exam_date: "2026-11-08", is_cbt: false },

  // 社労士
  { id: "sharoshi-2026", exam_id: "sharoshi", term_label: "2026年度 本試験", app_start: "2026-04-14", app_end: "2026-05-31", exam_date: "2026-08-23", is_cbt: false },

  // 中小企業診断士
  { id: "chusho-2026-1", exam_id: "chusho", term_label: "2026年度 一次試験", app_start: "2026-04-23", app_end: "2026-05-30", exam_date: "2026-08-01", is_cbt: false },
  { id: "chusho-2026-2", exam_id: "chusho", term_label: "2026年度 二次筆記", app_start: "2026-08-20", app_end: "2026-09-18", exam_date: "2026-10-25", is_cbt: false },

  // FP2級
  { id: "fp2-2026-09", exam_id: "fp2", term_label: "2026年9月試験", app_start: "2026-07-05", app_end: "2026-07-26", exam_date: "2026-09-13", is_cbt: false },
  { id: "fp2-2027-01", exam_id: "fp2", term_label: "2027年1月試験", app_start: "2026-11-10", app_end: "2026-12-01", exam_date: "2027-01-24", is_cbt: false },

  // 危険物乙4（地域ごと、代表例）
  { id: "kikenbutsu-2026-06", exam_id: "kikenbutsu-otsu4", term_label: "東京 2026年6月", app_start: "2026-04-25", app_end: "2026-05-15", exam_date: "2026-06-07", is_cbt: false },
  { id: "kikenbutsu-2026-09", exam_id: "kikenbutsu-otsu4", term_label: "東京 2026年9月", app_start: "2026-07-20", app_end: "2026-08-10", exam_date: "2026-09-06", is_cbt: false },

  // 第二種電気工事士
  { id: "denki2-2026-upper", exam_id: "denki2", term_label: "2026年度 上期", app_start: "2026-03-17", app_end: "2026-04-07", exam_date: "2026-05-30", is_cbt: false },
  { id: "denki2-2026-lower", exam_id: "denki2", term_label: "2026年度 下期", app_start: "2026-08-17", app_end: "2026-09-04", exam_date: "2026-10-24", is_cbt: false },

  // 秘書検定
  { id: "hisho2-2026-11", exam_id: "hisho2", term_label: "2026年11月試験", app_start: "2026-09-07", app_end: "2026-10-13", exam_date: "2026-11-08", is_cbt: false },

  // 販売士 (CBT通年)
  { id: "hanbaishi-2026", exam_id: "hanbaishi", term_label: "2026年度 CBT", app_start: "2026-04-01", app_end: "2027-03-31", exam_date: "2026-12-15", is_cbt: true },

  // 医療事務
  { id: "iryojimu-2026-05", exam_id: "iryojimu", term_label: "2026年5月試験", app_start: "2026-03-15", app_end: "2026-04-23", exam_date: "2026-05-24", is_cbt: false },
  { id: "iryojimu-2026-06", exam_id: "iryojimu", term_label: "2026年6月試験", app_start: "2026-04-15", app_end: "2026-05-25", exam_date: "2026-06-28", is_cbt: false },

  // 登録販売者（代表例：東京）
  { id: "toroku-hanbai-2026-tokyo", exam_id: "toroku-hanbai", term_label: "2026年度 東京都試験", app_start: "2026-05-20", app_end: "2026-06-05", exam_date: "2026-09-06", is_cbt: false },

  // 情報処理安全確保支援士
  { id: "sc-2026-autumn", exam_id: "sc", term_label: "2026年度 秋期", app_start: "2026-07-07", app_end: "2026-07-31", exam_date: "2026-10-18", is_cbt: false },

  // AWS SAA (通年)
  { id: "aws-saa-any", exam_id: "aws-saa", term_label: "通年オンライン受験", app_start: "2026-04-01", app_end: "2027-03-31", exam_date: "2026-06-30", is_cbt: true },

  // GCP PCA (通年)
  { id: "gcp-pca-any", exam_id: "gcp-pca", term_label: "通年オンライン受験", app_start: "2026-04-01", app_end: "2027-03-31", exam_date: "2026-07-15", is_cbt: true },

  // 公認会計士
  { id: "cpa-2026-12", exam_id: "cpa", term_label: "2026年第II回 短答式", app_start: "2026-08-21", app_end: "2026-09-15", exam_date: "2026-12-13", is_cbt: false },

  // 税理士
  { id: "zeirishi-2026", exam_id: "zeirishi", term_label: "2026年度 本試験", app_start: "2026-04-28", app_end: "2026-05-15", exam_date: "2026-08-04", is_cbt: false },

  // 司法書士
  { id: "shihoshoshi-2026", exam_id: "shihoshoshi", term_label: "2026年度 筆記試験", app_start: "2026-05-01", app_end: "2026-05-15", exam_date: "2026-07-05", is_cbt: false },

  // 日本語教育能力検定
  { id: "nihongo-kyoiku-2026", exam_id: "nihongo-kyoiku", term_label: "2026年度 本試験", app_start: "2026-06-22", app_end: "2026-08-03", exam_date: "2026-10-25", is_cbt: false },

  // MOS (通年)
  { id: "mos-excel-any", exam_id: "mos-excel", term_label: "通年CBT受験", app_start: "2026-04-01", app_end: "2027-03-31", exam_date: "2026-05-15", is_cbt: true },

  // HSK 4級
  { id: "hsk4-2026-06", exam_id: "hsk4", term_label: "2026年6月試験", app_start: "2026-04-01", app_end: "2026-05-10", exam_date: "2026-06-06", is_cbt: false },
  { id: "hsk4-2026-07", exam_id: "hsk4", term_label: "2026年7月試験", app_start: "2026-05-01", app_end: "2026-06-10", exam_date: "2026-07-11", is_cbt: false },

  // 日本語検定
  { id: "nihongo-kentei-2026-06", exam_id: "nihongo-kentei", term_label: "2026年6月試験", app_start: "2026-03-02", app_end: "2026-05-08", exam_date: "2026-06-13", is_cbt: false },
  { id: "nihongo-kentei-2026-11", exam_id: "nihongo-kentei", term_label: "2026年11月試験", app_start: "2026-08-03", app_end: "2026-10-06", exam_date: "2026-11-14", is_cbt: false },

  // 色彩検定 2級
  { id: "shikisai2-2026-06", exam_id: "shikisai2", term_label: "2026年度 夏期検定", app_start: "2026-04-01", app_end: "2026-05-22", exam_date: "2026-06-28", is_cbt: false },
  { id: "shikisai2-2026-11", exam_id: "shikisai2", term_label: "2026年度 冬期検定", app_start: "2026-08-03", app_end: "2026-10-08", exam_date: "2026-11-08", is_cbt: false },

  // カラーコーディネーター (CBT通年)
  { id: "color-coord-any", exam_id: "color-coordinator", term_label: "通年IBT/CBT", app_start: "2026-04-01", app_end: "2027-03-31", exam_date: "2026-06-30", is_cbt: true },

  // ビジネス実務法務 2級 (CBT)
  { id: "biz-homu2-2026-summer", exam_id: "biz-homu2", term_label: "2026年度 第1シーズン", app_start: "2026-05-16", app_end: "2026-06-20", exam_date: "2026-06-30", is_cbt: true },
  { id: "biz-homu2-2026-winter", exam_id: "biz-homu2", term_label: "2026年度 第2シーズン", app_start: "2026-09-16", app_end: "2026-10-20", exam_date: "2026-10-31", is_cbt: true },
];

/** 指定IDの資格情報を返す（undefinedの場合は未登録）。 */
export function getExam(id: string): Exam | undefined {
  return exams.find((e) => e.id === id);
}

/** 指定資格に紐づくスケジュールを試験日昇順で返す。 */
export function getSchedulesByExamId(examId: string): Schedule[] {
  return schedules
    .filter((s) => s.exam_id === examId)
    .sort((a, b) => a.exam_date.localeCompare(b.exam_date));
}

/** 資格 + そのスケジュール一覧をまとめて返す。 */
export function getExamWithSchedules(
  id: string,
): ExamWithSchedules | undefined {
  const exam = getExam(id);
  if (!exam) return undefined;
  return { ...exam, schedules: getSchedulesByExamId(id) };
}

/** 全資格 + スケジュール（検索画面用）。 */
export function getAllExamsWithSchedules(): ExamWithSchedules[] {
  return exams.map((exam) => ({
    ...exam,
    schedules: getSchedulesByExamId(exam.id),
  }));
}
