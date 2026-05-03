# エンジニア選考課題

## 概要

GitHubのリポジトリーを検索するwebアプリケーションをNext.jsで作成する。

### 指定環境

- Next.js v16以降で作成する
- app routerを使用する
- 使いたいコンポーネントライブラリがあれば、任意で使用しても良い

### 最低動作要件

1. 何かしらのキーワードを入力。
2. GitHub API (search/repositories)でリポジトリーを検索し、検索結果一覧表示。
3. 特定の結果を選択したら、該当リポジトリの詳細（リポジトリ名、オーナーアイコン、プロジェクト言語、Star 数、Watcher 数、Fork 数、Issue 数）を表示
4. 詳細画面はモーダルではなくページとして実装してください。
5. テストコードを記述してください。

> ※プロダクションを想定した実装を心がけてください。

> ※AIを利用した場合は利用方法のレポートをREADMEにまとめてください。

### 課題の取り組み方

- ご自身のgithubアカウントにリポジトリを作成し、課題をコミットしてください。
- また、READMEに工夫した点や拘ったポイントなどを文章でまとめてください。
- 課題が完成したら、リポジトリのアドレスを教えて下さい。

<br/>

## 開発したアプリ「next16-aidd」について

### 概要

AI駆動開発とSDD（Storybook Driven Development）を採用した開発フローにより、Next.js v16でGitHubリポジトリを検索できるアプリケーションです。

---

### 動作要件

本プロジェクトの動作および開発には、以下の環境・ツールを使用します。

#### 実行環境

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

#### 開発ツール

- Codexアプリを活用したAI駆動開発
  - 公式ドキュメント「https://developers.openai.com/codex/app 」

---

### ローカル開発環境の構築方法

#### 1. nodeのインストール

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

#### 2. corepackのインストールと有効化

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
  
#### 3. pnpmと依存関係のインストール

次に以下のコマンドを実行し、パッケージマネージャー「pnpm」と依存関係のインストーをして下さい。

```
pnpm install --frozen-lockfile
```
  
---
  
### 各種コマンド一覧

#### ・Storybookの起動（UIカタログ）

```
pnpm storybook
```

<br/>

#### ・ローカルサーバー起動（Next.jsアプリ）

```
pnpm dev
```

<br/>

#### ・biome check（フォーマット修正・import整理・lint）実行

```
pnpm check
```

<br/>

#### ・テスト「unit/integration」実行

```
pnpm test
```

<br/>

#### ・テスト「e2e」実行

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

---

<br/>

## 工夫した点や拘ったポイント

