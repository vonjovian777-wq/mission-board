# Mission Board

ゲーム風ミッション管理アプリ

## リポジトリ

* GitHub: https://github.com/vonjovian777-wq/mission-board

## 概要

日常の目標や活動をゲームのミッションのように管理するWebアプリです。

ミッションの達成によってEXPを獲得し、
レベルアップしながら日々の目標達成を続けられる仕組みを目指します。

## 開発目的

趣味・独学を目的として、興味のある技術や開発手法を実際に試すための長期個人開発プロジェクトです。

完成を急ぐのではなく、機能追加や構成変更を行いながら継続的に育てていきます。

## 現在の開発方針

最初からすべての機能を作るのではなく、
まずはミッション管理機能を中心とした小規模なアプリを作成します。

その後、予算管理・配信目標・健康管理などの機能を段階的に追加する予定です。

## 初期開発範囲

* ミッション一覧表示
* ミッション追加
* ミッション編集
* ミッション削除
* 達成状態の切り替え
* EXP・レベル表示

## 技術構成

### 開発環境

* Visual Studio Code
* IntelliJ IDEA Community Edition
* Node.js
* npm
* JDK 25

### フロントエンド

* React
* TypeScript

### バックエンド

* Java
* Spring Boot
* Spring Data JPA
* H2 Database

### ビルドツール

* Vite
* Maven Wrapper

### バージョン管理

* Git
* GitHub

## 開発状況

基本設計とDB設計を作成済みです。

フロントエンドはReact + TypeScript + Vite、
バックエンドはJava + Spring Bootで構築しています。

現在は以下の機能まで実装済みです。

### フロントエンド

* ミッション一覧表示
* ミッションの追加・編集・削除
* 達成状態の切り替え
* 達成状況に応じたEXP計算
* レベルとEXPゲージの表示
* 追加・編集・削除前の確認ダイアログ
* フォームの開閉アニメーション
* レスポンシブ対応
* コンポーネントと型定義の分離
* API通信処理を`services/missionApi.ts`へ分離
* 読み込み中・0件・通信エラーの表示と再読み込み機能
* API操作失敗時のエラーメッセージ表示
* ミッション追加失敗時の入力保持と、成功時のみ行うフォームリセット

### バックエンド・API通信

* Spring Bootバックエンドの構築
* ヘルスチェックAPIの作成
* ミッション一覧取得APIの作成
* ミッション追加APIの作成
* ミッション編集APIの作成
* ミッション削除APIの作成
* ミッション達成状態切り替えAPIの作成
* Reactから`fetch`を使用したGET・POST・PUT・PATCH・DELETE通信
* APIから取得したミッションの初期表示
* Reactからのアクセスを許可するCORS設定
* HTTPエラーと通信エラーの基本的な処理
* `ResponseEntity`を使用したHTTPレスポンス制御
* PUT・PATCHで対象が存在しない場合に`404 Not Found`を返す処理
* DELETE成功時に`204 No Content`、対象が存在しない場合に`404 Not Found`を返す処理
* Spring Data JPAによるデータベース操作
* `Mission`のEntity化
* `MissionRepository`によるCRUD処理
* H2 Databaseを使用したミッションデータの永続化
* データベース側でのID自動採番
* H2コンソールからのデータ確認
* DBファイルのGit除外設定
* API移行前の`localStorage`関連処理を削除

ミッションの一覧取得・追加・編集・削除・達成状態切り替えは、
すべてSpring Boot APIへ接続しています。

ミッションデータはH2 Databaseへ保存されるため、
画面の再読み込みだけでなく、Spring Bootを停止・再起動しても保持されます。

開発用のDBファイルは`backend/data/missiondb.mv.db`へ作成され、
`backend/data/`はGitの管理対象から除外しています。

開発中はH2コンソールを使用して、
ブラウザからデータベースのテーブルやレコードを確認できます。

## 現在のAPI

| メソッド   | エンドポイント                     | 内容                   |
| ------ | --------------------------- | -------------------- |
| GET    | `/api/health`               | バックエンドの起動状態を確認する     |
| GET    | `/api/missions`             | ミッション一覧を取得する         |
| POST   | `/api/missions`             | 新しいミッションを追加する        |
| PUT    | `/api/missions/{id}`        | 指定したミッションを更新する       |
| PATCH  | `/api/missions/{id}/toggle` | 指定したミッションの達成状態を切り替える |
| DELETE | `/api/missions/{id}`        | 指定したミッションを削除する       |

## ドキュメント

* [基本設計](docs/basic-design.md)
* [DB設計](docs/db-design.md)
