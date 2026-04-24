import type { AffiliateConfig } from "./types";

/**
 * 資格スラッグ → アフィリエイト設定のマップ。
 * Notionに載せにくい複雑な設定はここで管理する。
 * URL の "#" を実際のアフィリエイトリンクに差し替えること。
 */
export const affiliateConfigs: Record<string, AffiliateConfig> = {
  toeic: {
    items: [
      { title: "公式TOEIC L&R 問題集", vendor: "IIBC", url: "#", kind: "book" },
      { title: "スタディサプリENGLISH TOEIC対策", vendor: "リクルート", url: "#", kind: "course" },
    ],
  },
  eiken: {
    items: [
      { title: "英検 過去問集", vendor: "旺文社", url: "#", kind: "book" },
    ],
  },
  boki: {
    items: [
      { title: "スッキリわかる 日商簿記", vendor: "TAC出版", url: "#", kind: "book" },
      { title: "クレアール 簿記講座", vendor: "クレアール", url: "#", kind: "course" },
    ],
  },
  fe: {
    items: [
      { title: "キタミ式イラストIT塾 基本情報技術者", vendor: "技術評論社", url: "#", kind: "book" },
    ],
  },
  ap: {
    items: [
      { title: "応用情報技術者 合格教本", vendor: "技術評論社", url: "#", kind: "book" },
    ],
  },
  ipass: {
    items: [
      { title: "いちばんやさしい ITパスポート", vendor: "インプレス", url: "#", kind: "book" },
    ],
  },
  takken: {
    items: [
      { title: "みんなが欲しかった！宅建士の教科書", vendor: "TAC出版", url: "#", kind: "book" },
      { title: "フォーサイト 宅建士講座", vendor: "フォーサイト", url: "#", kind: "course" },
    ],
    banner: {
      linkUrl: "https://px.a8.net/svt/ejp?a8mat=4B1SPS+FM17UA+373C+614CX",
      imgSrc: "https://www27.a8.net/svt/bgt?aid=260424352944&wid=001&eno=01&mid=s00000014916001013000&mc=1",
      trackingSrc: "https://www15.a8.net/0.gif?a8mat=4B1SPS+FM17UA+373C+614CX",
      width: 468,
      height: 60,
    },
  },
  gyosei: {
    items: [
      { title: "合格革命 行政書士 基本テキスト", vendor: "早稲田経営出版", url: "#", kind: "book" },
    ],
    banner: {
      linkUrl: "https://px.a8.net/svt/ejp?a8mat=4B1SPS+FM17UA+373C+6CHB5",
      imgSrc: "https://www24.a8.net/svt/bgt?aid=260424352944&wid=001&eno=01&mid=s00000014916001066000&mc=1",
      trackingSrc: "https://www11.a8.net/0.gif?a8mat=4B1SPS+FM17UA+373C+6CHB5",
      width: 300,
      height: 250,
    },
  },
  sharoshi: {
    items: [
      { title: "うかる！社労士 テキスト", vendor: "日本経済新聞出版", url: "#", kind: "book" },
    ],
  },
  chusho: {
    items: [
      { title: "スピードテキスト 中小企業診断士", vendor: "TAC出版", url: "#", kind: "book" },
    ],
  },
  fp2: {
    items: [
      { title: "みんなが欲しかった！FPの教科書 2級", vendor: "TAC出版", url: "#", kind: "book" },
    ],
  },
  "kikenbutsu-otsu4": {
    items: [
      { title: "乙4類危険物取扱者試験 2026年版", vendor: "弘文社", url: "#", kind: "book" },
    ],
  },
  denki2: {
    items: [
      { title: "ぜんぶ絵で見て覚える 第二種電気工事士", vendor: "リックテレコム", url: "#", kind: "book" },
    ],
  },
  hisho2: {
    items: [
      { title: "秘書検定2級 パーフェクトマスター", vendor: "早稲田教育出版", url: "#", kind: "book" },
    ],
  },
  hanbaishi: {
    items: [
      { title: "販売士2級 ハンドブック", vendor: "カリアック", url: "#", kind: "book" },
    ],
  },
  iryojimu: {
    items: [
      { title: "医療事務 入門テキスト", vendor: "日本医療事務協会", url: "#", kind: "book" },
    ],
  },
  "toroku-hanbai": {
    items: [
      { title: "7日間でうかる 登録販売者", vendor: "翔泳社", url: "#", kind: "book" },
    ],
  },
  sc: {
    items: [
      { title: "情報処理安全確保支援士 合格教本", vendor: "技術評論社", url: "#", kind: "book" },
    ],
  },
  "aws-saa": {
    items: [
      { title: "AWS認定 SAA-C03 対策テキスト", vendor: "SBクリエイティブ", url: "#", kind: "book" },
      { title: "Udemy AWS SAA 講座", vendor: "Udemy", url: "#", kind: "course" },
    ],
  },
  "gcp-pca": {
    items: [
      { title: "Google Cloud認定資格 本番対策", vendor: "インプレス", url: "#", kind: "book" },
    ],
  },
  cpa: {
    items: [
      { title: "公認会計士 試験対策ハンドブック", vendor: "TAC出版", url: "#", kind: "book" },
    ],
  },
  zeirishi: {
    items: [
      { title: "みんなが欲しかった！税理士 簿記論", vendor: "TAC出版", url: "#", kind: "book" },
    ],
  },
  shihoshoshi: {
    items: [
      { title: "オートマシステム 司法書士", vendor: "日本実業出版社", url: "#", kind: "book" },
    ],
  },
  "nihongo-kyoiku": {
    items: [
      { title: "日本語教育能力検定試験 試験問題", vendor: "凡人社", url: "#", kind: "book" },
    ],
  },
  "mos-excel": {
    items: [
      { title: "MOS Excel 365 対策テキスト", vendor: "FOM出版", url: "#", kind: "book" },
    ],
  },
  hsk4: {
    items: [
      { title: "合格奪取！ HSK 4級 トレーニングブック", vendor: "スリーエーネットワーク", url: "#", kind: "book" },
    ],
  },
  "nihongo-kentei": {
    items: [
      { title: "日本語検定 公式過去問題集", vendor: "東京書籍", url: "#", kind: "book" },
    ],
  },
  shikisai2: {
    items: [
      { title: "色彩検定 公式テキスト 2級", vendor: "AFT", url: "#", kind: "book" },
    ],
  },
  "color-coordinator": {
    items: [
      { title: "カラーコーディネーター検定 公式テキスト", vendor: "東商", url: "#", kind: "book" },
    ],
  },
  "biz-homu2": {
    items: [
      { title: "ビジネス実務法務検定 公式テキスト 2級", vendor: "東商", url: "#", kind: "book" },
    ],
  },
};
