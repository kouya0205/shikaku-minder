# Amazon アフィリエイトリンク取得スキル

`src/lib/affiliates.ts` の `url: "#"` になっている書籍・コースのエントリに対して、
Amazon SiteStripe からアフィリエイトリンクを取得して置き換える。

## 前提条件

- Amazonアソシエイト StoreID: `shikakuminder-22`
- ブラウザ（Playwright MCP）でAmazonにログイン済みであること
- SiteStripeバーが表示される状態であること

## 手順

### 1. 対象リストの取得

`src/lib/affiliates.ts` を読み込み、`url: "#"` になっているすべての `book` / `course` エントリを列挙する。

### 2. ブラウザでAmazonを開く

`https://www.amazon.co.jp` を開く。
SiteStripeバーが表示されていない場合はユーザーにAmazonアソシエイトアカウントでのログインを求める。

### 3. 書籍ごとにリンクを生成する（繰り返し）

各エントリについて以下を実行する：

1. Amazon検索ボックスに `{title} {vendor}` で検索する
2. 検索結果から最も関連性の高い商品ページを開く
   - 書名・著者・出版社が一致するものを優先
   - 見つからない場合はタイトルのみで再検索する
3. SiteStripeバー内の「テキスト」タブを選択する
4. `#amzn-ss-get-link-button`（「リンク生成」ボタン）をクリックする
5. `#amzn-ss-text-shortlink-textarea` に生成されたURLを取得する
6. 取得したURLを記録する

### 4. affiliates.ts を更新する

取得したURLで `src/lib/affiliates.ts` の対応する `url: "#"` を置き換える。

- 取得できなかったエントリは `url: "#"` のまま残し、最後にユーザーに報告する
- 1エントリずつ確実に更新し、完了したらその旨を表示する

### 5. 完了報告

更新件数・スキップ件数をまとめて報告する。
