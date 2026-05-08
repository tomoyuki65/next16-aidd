# Next.jsとAI駆動開発によるGitHubリポジトリの検索アプリ

Next.js v16 × AI駆動開発 × SDD（Storybook Driven Development）× TDD  
を採用したGitHubリポジトリを検索できるアプリケーションです。

## 動作要件

本プロジェクトの動作および開発には、以下の環境・ツールを使用します。

### 実行環境

- node: v24.15.0
  - ※ .npmrc と package.json の engines でバージョン固定
- corepack: 0.34.7
  - パッケージマネージャー管理ツール
- pnpm: 10.33.2
  - パッケージマネージャー
  - corepack でバージョン固定（ package.json の packageManager ）
  - .npmrc と package.json の engines でもバージョン固定
- next: 16.2.4
  - TypeScript、Tailwind CSS、Biome（format・lintツール）
- lefthook: 2.1.6
  - Gitフック管理ツール（フォーマット修正、lintなどの自動化）
- storybook: 10.3.6
  - UIカタログ
  - ※ vite、vitest、playwright を含む
- msw: 2.14.2
  - APIのモックライブラリ
- react-hook-form: 7.75.0
  - フォームライブラリ
- zod: 4.4.2
  - バリデーションライブラリ
- swr: 2.4.1
  - React向けのデータ取得・キャッシュ管理ライブラリ

### 開発ツール

- Codexアプリを活用したAI駆動開発
  - 公式ドキュメント「https://developers.openai.com/codex/app 」

<br/>

## ローカル開発環境の構築方法

### 1. nodeのインストール

nodeのインストールが必要な場合は、バージョン管理ライブラリを利用するのがおすすめです。  
ライブラリ「`volta`」を利用する場合は、以下のコマンドでインストール可能です。  
  
```
curl https://get.volta.sh | bash
```
  
> ※voltaのバージョンアップしたい場合は、コマンド再実行で可能です。
  
<br/>
  
次に以下のコマンドを実行し、nodeをインストールできます。
  
```
volta install node@24.15.0
```
  
---

### 2. corepackのインストールと有効化

本プロジェクトではパッケージマネージャー管理ツール「corepack」を利用しています。  
voltaにインストールするには、以下のコマンドを実行して下さい。  
  
```
volta install corepack
```
  
<br/>
  
次に以下のコマンドを実行し、corepackの有効化をします。  
  
```
corepack enable
```
  
---
  
### 3. pnpmと依存関係のインストール

次に以下のコマンドを実行し、パッケージマネージャー「pnpm」と依存関係のインストーをして下さい。

```
pnpm install --frozen-lockfile
```
  
<br/>
  
## 各種コマンド一覧

### ・Storybookの起動（UIカタログ）

```
pnpm storybook
```

<br/>

### ・ローカルサーバー起動（Next.jsアプリ）

```
pnpm dev
```

<br/>

### ・biome check（フォーマット修正・import整理・lint）実行

```
pnpm check
```

<br/>

### ・テスト「unit/integration」実行

```
pnpm test
```

<br/>

### ・テスト「e2e」実行

- 通常

```
pnpm test:e2e
```
  
<br/>
  
- UIあり

```
pnpm test:e2e:ui
```
  
<br/>
  
> ※ playwrightのブラウザのインストールが必要なら「pnpm exec playwright install」を実行して下さい。
  
<br/>
  
### ・Next.jsのアップデート
```
pnpm next upgrade
```
  
<br/>
  
## AIツールを利用した開発手順

Codexアプリを利用し、主に以下の手順で開発：

1. プランモードで開発計画を立てる
2. スキル「plan-to-issue」を使ってGitHub Issueを自動登録
3. 通常モードでタスク実行
4. タスク完了後にレビュー（必要に応じて修正を繰り返す）
5. レビュー完了後にスキル「auto-commit」を使って自動コミット
6. スキル「auto-pr」を使って自動PR作成
7. PRレビュー
8. PRレビュー完了後にmainにマージ
9. 対象のIssueクローズ
  
<br/>
  
## 参考記事  
  
[・Next.js v16でAI駆動開発を実践！モダンフロントエンド開発におけるSDD・TDD・Codex・ハーネスエンジニアリング](https://tomoyuki65.com/nextjs-v16-ai-driven-frontend-development)  
  
