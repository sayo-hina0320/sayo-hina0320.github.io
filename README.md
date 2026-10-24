# 個人サイト（GitHub Pages）

## ファイル構成

```
index.html           … ホーム（自己紹介・学位・資格）
research.html        … 研究実績
portfolio.html       … ポートフォリオ
assets/
  css/style.css      … デザイン（色・余白など）
  js/profile.js      … ★ プロフィール（名前・所属・出身・Email・写真）
  js/main.js         … サイドバー・メニューの動き（通常は編集不要）
  img/               … 写真などの画像を置く場所
```

---

## 1. GitHub Pages で公開する手順（ブラウザだけでできます）

1. GitHub にログインし、右上の「＋」から **New repository** を選びます。
2. **Repository name** に `ユーザー名.github.io` と入力します。
   - 例：ユーザー名が `taro-yamada` なら `taro-yamada.github.io`
   - この名前にすると、サイトのURLが `https://ユーザー名.github.io/` になります。
3. **Public** を選び、**Create repository** を押します。
4. 作成後の画面で **uploading an existing file** のリンクを押します。
5. このフォルダの**中身**（`index.html`・`research.html`・`portfolio.html`・`assets` フォルダ・`README.md`）をまとめてドラッグ＆ドロップします。
   - フォルダ自体ではなく、フォルダの中身を入れてください。
6. 下の **Commit changes** を押します。
7. リポジトリの **Settings → Pages** を開きます。
   - **Source**：`Deploy from a branch`
   - **Branch**：`main`、フォルダは `/ (root)`
   - 設定したら **Save** を押します。
8. 1〜2分待ってから `https://ユーザー名.github.io/` を開くと、サイトが表示されます。

> 以降は、ファイルを編集して Commit するたびに、数分でサイトに反映されます。

---

## 2. 内容の編集方法

GitHub上で直接編集できます。ファイルを開き、右上の鉛筆アイコン（Edit）で書き換えて **Commit changes** を押します。

### プロフィール（全ページ共通）
`assets/js/profile.js` を書き換えます。`" "` の中だけを変更してください。

### 顔写真
1. 画像を `assets/img/` にアップロードします（例：`photo.jpg`）。
   - 正方形の画像がきれいに表示されます。
2. `profile.js` の `photo: ""` を `photo: "assets/img/photo.jpg"` に変更します。

### 学位・資格・業績・活動
各HTMLの `[ ]` で囲まれた仮の文言を書き換えます。

- **項目を増やす**：同じまとまりを丸ごとコピーして貼り付けます。
  - 業績は `<li class="pub">` 〜 `</li>`
  - 資格は `<li>` 〜 `</li>`
- **項目を消す**：同じまとまりを丸ごと削除します。
- **自分の名前を強調する**：`<span class="me">名前</span>` で囲みます。
- **タグを付ける**：`<span class="tag">Oral</span>` のように書きます。
  - 受賞タグは `<span class="tag award">Best Paper Award</span>` と書きます。
- **セクションを丸ごと消す**：`<section ...>` 〜 `</section>` を削除します。サイドバーの見出しリンクからも自動で消えます。

### アクセントカラーを変える
`assets/css/style.css` の先頭で、次の3つを変更します。
- `--accent`
- `--accent-hover`
- `--accent-soft`

例：青系にしたい場合は `#93C5FD` など。

---

## 3. 仕組みのメモ

- **PC表示**：左のサイドバー（プロフィールとメニュー）がスクロールについてきます。
- **現在のページの見出し**：サイドバーに表示され、読んでいる位置に合わせて自動でハイライトされます。
  - 見出しには、各 `<section>` の `data-nav="..."` に書いた名前が使われます。
- **スマホ表示（幅880px以下）**：画面上部に、常に表示されるメニューバーが出ます。プロフィールは本文の上に表示されます。

## 4. 公開前のチェック

- サイトは誰でも見られます。メールアドレスは、迷惑メールが増えにくい大学のアドレスなどがおすすめです。
- `[ ]` の仮の文言が残っていないか、ページ内検索（Ctrl+F / ⌘+F）で `[` を探して確認しましょう。
