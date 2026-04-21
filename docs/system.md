# 資格スケジュール管理サービス「シカクマインダー」システム仕様書

## 1. テクニカルスタック
- **Frontend**: Next.js (App Router), Tailwind CSS
- **UI Components**: shadcn/ui (ベースカラーにZincを使用)
- **Backend**: Next.js Route Handlers
- **Database**: PostgreSQL (Supabase) / Prisma ORM
- **Infrastructure**: Vercel

## 2. デザイン・カラー定義
- **Brand Color**: `Indigo-600` (#4F46E5) - メインのアクションボタン、バッジ、ロゴ。
- **Base Color**: `Zinc-50` (#FAFAFA) - 全体背景。
- **Text Color**: `Zinc-900` (#18181B) - メインテキスト。
- **Border/Sub**: `Zinc-200` (#E4E4E7) - カード境界線、セパレーター。

## 3. 画面仕様
1. **トップ（検索）画面**
   - 画面上部にインクリメンタルサーチ。
   - 資格カード：Indigoのバッジで「受付中」などのステータスを強調。
   - Zincの淡い背景でカードを区分けし、情報の視認性を最大化。
2. **資格詳細画面**
   - 申込期間と試験日を強調したタイムライン表示。
   - `Indigo-600` の「カレンダーに追加」ボタンを中央に配置。
   - 画面下部にZincベースのコンテナで「推奨学習テキスト」を提示。
3. **マイリスト画面**
   - localStorageからデータを読み出し、締切が近い順にソート。
   - 締切間近のものはIndigoのテキストで警告。

## 4. データ構造
- **Exam (資格)**: 
  - `id`, `name`, `category`, `description`, `official_url`, `affiliate_config(JSON)`
- **Schedule (日程)**: 
  - `id`, `exam_id`, `term_label` (回数など), `app_start`, `app_end`, `exam_date`, `is_cbt`

## 5. 連携仕様
- **Googleカレンダー**: `https://www.google.com/calendar/render?action=TEMPLATE` 形式のURLパラメータ生成。
- **Apple/その他**: `ics` ファイルをBlob生成し、ダウンロードを提供。