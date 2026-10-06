# / :: slash — friend battle edition

npm不要のブラウザ版です。

## 起動方法（Windows）

`start.bat` をダブルクリックしてください。

自動的にローカルHTTPサーバーを起動し、ブラウザで `http://127.0.0.1:8080/` を開きます。

### Pythonがある場合
Pythonが優先されます。Node.jsしかない場合は簡易HTTPサーバーを起動します。

## 重要

`index.html` を直接ダブルクリックするのではなく、必ず `start.bat` を使ってください。
Supabase / Realtime を利用するため、HTTP(S) originで実行する必要があります。

## オンライン対戦

- Supabase Authでアカウントを作成/ログイン
- フレンドを追加
- オンラインのフレンドへ対戦招待
- 相手が承認すると1v1対戦開始
- ランダムマッチングはありません

## ファイル構成

- `index.html` — エントリーポイント
- `app.js` — ゲーム本体
- `styles.css` — UI
- `manifest.webmanifest` — PWA設定
- `start.bat` — HTTPサーバー起動用
- `server.js` — Node.js用静的ファイルサーバー（CSS/JS/画像/フォント等に対応）
- `public/concept-sheet.png` — コンセプト画像
