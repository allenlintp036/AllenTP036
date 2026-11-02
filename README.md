# 個人網站：無話不談，無思不想

用 [Astro](https://astro.build) 做的個人網站，推到 `main` 後會自動部署到 GitHub Pages：
https://allenlintp036.github.io/AllenTP036/

## 想改內容，改這些地方就好

| 想改的東西 | 檔案 |
|---|---|
| 名字、自我介紹、LINE 連結、標語 | `src/site.ts` |
| 保險文章 | `src/content/insurance/` 裡的 `.md` 檔 |
| 想法文章（哲學、法律、政治） | `src/content/thoughts/` 裡的 `.md` 檔 |
| 最近在看的影片 | `src/data/videos.json` |
| 首頁的思考題 | `src/data/questions.json`（日期最新的那題會出現在首頁） |
| 認識我頁面 | `src/pages/about.astro` |
| 照片 | 放進 `public/`，例如 `public/me.jpg`，再照首頁 `src/pages/index.astro` 裡的註解換上 |

### 新增一篇文章

在 `src/content/insurance/` 或 `src/content/thoughts/` 新增一個 `.md` 檔，檔名就是網址（用英文和 `-`），開頭照這個格式：

```markdown
---
title: 文章標題
description: 一句話說明這篇在講什麼
date: 2026-11-10
tag: 朋友問過我
readingMinutes: 5
draft: false
---

內文從這裡開始，用 `## 小標` 分段，文章頁會自動產生目錄。
```

- `draft: true` 的文章不會出現在網站上，適合還沒寫完的稿子。
- 想指定文章結尾的「接著讀」，加上 `related: [另一篇的檔名]`，沒寫就自動挑。

## 在自己電腦上預覽

需要 Node.js 22 以上：

```bash
npm install
npm run dev
```

打開 http://localhost:4321/AllenTP036/ 就能看到。

## 之後換成自己的網域

把 `astro.config.mjs` 裡的 `site` 改成你的網域、刪掉 `base` 那一行，再到 GitHub 的 Settings → Pages 設定 Custom domain。
