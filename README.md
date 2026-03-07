# DropView

JSX / TSX / JS / HTML / Vue / Svelte ファイルをブラウザ上でプレビューできるシングルページツール。
AI が生成したコンポーネントをその場で確認・比較するのに便利です。

## 特徴

- **ドラッグ&ドロップ / 貼り付け** で JSX / TSX / JS / HTML / Vue / Svelte ファイルを即座にプレビュー
- **複数ファイルの並列比較** に対応
- **完全ローカル処理** — ファイルはインターネットに送信されず、すべてブラウザ内で処理されます
- 単一 HTML ファイルで動作（`index.html` のみ）
- localStorage によるセッション間の保持

## 使い方

### GitHub Pages で使う

https://t-suzuki.github.io/dropview/ にアクセスするだけで利用できます。

### ローカルで使う

`index.html` をダウンロードしてブラウザで開くだけで動作します。
ページ内の「このページをダウンロードしてローカルで使う」ボタンからも取得できます。

## 対応ファイル形式

| 拡張子 | 処理方式 |
|--------|----------|
| `.jsx` / `.tsx` / `.js` / `.ts` / `.mjs` / `.cjs` | Babel で変換 → React 18 でレンダリング |
| `.html` / `.htm` | そのまま iframe にレンダリング |
| `.vue` | SFC を解析 → Vue 3 でレンダリング（`<script setup>` 対応） |
| `.svelte` | Svelte 4 コンパイラでブラウザ内コンパイル → レンダリング |

## デモファイル

`demo/` ディレクトリにサンプルが入っています。ドロップして試してみてください。

- `cafe.*` — カフェサイト（JSX / JS / TSX / HTML / Vue / Svelte の 6 種）
- `visualize.*` — スギ花粉データの可視化（JSX / HTML / Vue の 3 種）

## 競合分析

類似ツールとの比較やポジショニングについては [docs/competitive-analysis.html](https://t-suzuki.github.io/dropview/docs/competitive-analysis.html) を参照してください。

## 技術構成

- React 18 (CDN)
- Vue 3 (CDN)
- Svelte 4 Compiler (CDN, esm.sh)
- Babel Standalone (JSX / TSX / TypeScript → JS 変換)
- Vanilla JS による UI 構築（ビルドツール不要）
