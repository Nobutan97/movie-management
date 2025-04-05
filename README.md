# 動画視聴管理システム

動画コンテンツの視聴状況を管理するためのWebアプリケーションです。管理者向けのダッシュボードを通じて、ユーザー、コース、動画の管理が可能です。

## デモ

[GitHub Pages](https://nobutan97.github.io/movie-management/)で動作するデモをご覧いただけます。

## 機能

- **ダッシュボード**
  - ユーザー数、コース数、動画数の統計情報
  - アクティビティフィード
  - グラフによるデータ可視化

- **ユーザー管理**
  - ユーザー一覧の表示
  - ユーザー情報の編集
  - アクセス権限の管理

- **コース管理**
  - コース一覧の表示と検索
  - コースの作成・編集・削除
  - コース進捗の管理

- **動画管理**
  - 動画一覧の表示と検索
  - 動画のアップロード・編集・削除
  - 視聴状況の追跡

## 技術スタック

- **フロントエンド**
  - React
  - React Router
  - Tailwind CSS
  - Lucide React（アイコン）

- **状態管理**
  - React Hooks
  - Context API

- **国際化**
  - react-i18next

## 開発環境のセットアップ

1. リポジトリのクローン
```bash
git clone https://github.com/Nobutan97/movie-management.git
cd movie-management
```

2. 依存関係のインストール
```bash
npm install
```

3. 開発サーバーの起動
```bash
npm start
```

4. ビルド
```bash
npm run build
```

5. デプロイ
```bash
npm run deploy
```

## 環境変数

`.env`ファイルを作成し、以下の環境変数を設定してください：

```env
REACT_APP_API_URL=APIのベースURL
```

## ブラウザサポート

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

## コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成（`git checkout -b feature/amazing-feature`）
3. 変更をコミット（`git commit -m '新機能を追加'`）
4. ブランチにプッシュ（`git push origin feature/amazing-feature`）
5. プルリクエストを作成

## ライセンス

[MIT License](LICENSE)

## 作者

- Nobutan97
- GitHub: [@Nobutan97](https://github.com/Nobutan97)

## 謝辞

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide](https://lucide.dev/) 