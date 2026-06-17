# AGENT.md
# Project: study.cwli.dev 學習月曆系統（Firebase Edition）

## IMPORTANT

本專案由 Louis 維護。

所有 AI Agent（Codex、ChatGPT、Claude、Gemini、Cursor、Windsurf 等）進行任何修改前，必須先閱讀：

1. AGENT.md
2. docs/coding-standard.md
3. docs/git-rules.md
4. docs/firestore-structure.md
5. docs/system-flow.md
6. docs/security.md
7. docs/firebase-rules.md

未閱讀視同未遵守專案規範。

---

## Louis First Rule（最高優先規則）

本專案第一優先不是程式碼最短、不是程式碼最炫、不是功能一次做最多，而是：

> Louis 六個月後回來仍然看得懂、改得動、維護得下去。

因此：

- 所有重要程式碼必須有繁體中文註解。
- 所有 Firebase 操作必須有繁體中文註解。
- 所有複雜流程必須用中文說明。
- 所有檔案必須能看出用途。
- 不可為了簡潔而刪除註解。
- 可讀性優先於炫技。
- 可維護性優先於短期完成。
- 不要過度工程化。

---

## Louis Readability Rule（強制）

Louis 並非專職軟體工程師。

因此本專案遵守：

```text
可讀性 > 效能 > 炫技
```

除非有明確效能問題，否則不得為了縮短程式碼而降低可讀性。

禁止：

- 一行式複雜寫法
- 過度使用箭頭函式
- 過度鏈式呼叫
- 難以閱讀的縮寫變數名稱
- 無註解的大型函式
- 未說明原因的大幅重構

允許：

- 多寫幾行
- 多寫註解
- 多拆函式
- 多建立檔案
- 用較直覺的寫法取代炫技寫法

---

## Teaching First Rule（強制）

所有 AI Agent 產生程式碼時，不只要能運作，還要讓 Louis 能學習。

每個重要函式必須說明：

1. 用途
2. 輸入
3. 輸出
4. 執行流程

範例：

```javascript
/**
 * 讀取 Firestore 所有影片資料
 *
 * 用途：
 * 提供前台月曆與影片列表使用
 *
 * 輸入：
 * 無
 *
 * 輸出：
 * Array<Video>
 *
 * 流程：
 * 1. 連線 Firestore
 * 2. 取得 videos collection
 * 3. 轉成陣列
 * 4. 回傳資料
 */
async function loadVideos() {
}
```

---

## Explain Before Refactor Rule（強制）

如果 AI Agent 要重構程式碼，必須先說明：

- 為什麼要改
- 改了什麼
- 舊版與新版差異
- 有什麼好處
- 有什麼風險

不得直接大幅重構而不解釋。

---

## 專案核心任務

目前任務先聚焦兩個主要頁面：

```text
https://study.cwli.dev/index.html
https://study.cwli.dev/Admin.html
```

一句話目標：

> Admin 管資料，Index 看資料，Firebase 當資料庫，Admin 必須登入才可修改。

---

## 第一優先工作

1. 建立 Firebase Auth
2. 建立 login.html
3. 保護 Admin.html
4. 建立 Firestore collections
5. Admin.html 可新增、修改、刪除資料
6. index.html 可讀取並顯示資料
7. 移除 Google Sheet / Apps Script / GWS
8. 加入 localStorage fallback

其他功能先暫緩。

---

## 技術限制

### 允許使用

- HTML5
- CSS3
- JavaScript ES Module
- Bootstrap 5
- Firebase Web SDK v10+
- Firebase Authentication
- Firestore Database
- Firebase Storage（V2 後再做）
- localStorage

### 禁止使用

- React
- Vue
- Angular
- Node.js Server
- Apps Script
- Google Sheet API
- 任何前端框架
- 任何後端伺服器

---

## 網站架構

### index.html

公開頁面，所有人可看。

功能：

- 學習月曆
- 每日影片
- 每日筆記
- 觀看進度
- 搜尋
- 篩選
- localStorage fallback

### Admin.html

管理頁面，只有管理員登入後可進入。

功能：

- 新增影片
- 編輯影片
- 刪除影片
- 新增筆記
- 編輯筆記
- 刪除筆記
- JSON 匯入
- JSON 匯出

### login.html

登入頁面。

功能：

- Email / Password 登入
- 忘記密碼
- 登出
- 登入後導向 Admin.html

---

## Firebase Project 規範

建議建立獨立 Firebase Project：

```text
Project Name: Study Tracker
Project ID: study-tracker
Region: asia-east1
```

不得與以下專案共用：

```text
jic-business-cards
```

原因：

- 避免 Auth 使用者混在一起
- 避免 Firestore Rules 互相污染
- 避免資料表混亂
- 方便未來維護與停用

---

## Firestore Collections

V1 主要使用：

```text
videos
notes
users
settings
```

詳細欄位請見：

```text
docs/firestore-structure.md
```

---

## 權限設計

V1 先使用簡單 Admin Email 白名單或 users collection role。

建議 V1：

```javascript
const ADMIN_EMAIL = "louis962911@gmail.com";
```

未登入進入 Admin.html：

```text
跳轉 login.html
```

登入但不是 Admin：

```text
跳轉 index.html
```

V2 再擴充：

```text
users collection
role: admin / editor / viewer
```

---

## 建議檔案結構

```text
Study/
│
├─ AGENT.md
│
├─ index.html
├─ Admin.html
├─ login.html
│
├─ css/
│   ├─ style.css
│   └─ admin.css
│
├─ js/
│   ├─ firebase-config.js
│   ├─ firebase-auth.js
│   ├─ firebase-videos.js
│   ├─ firebase-notes.js
│   ├─ firebase-users.js
│   ├─ calendar.js
│   ├─ cache.js
│   ├─ admin.js
│   └─ ui.js
│
├─ assets/
│   ├─ img/
│   ├─ icons/
│   └─ logo/
│
├─ data/
│   └─ sample-import.json
│
└─ docs/
    ├─ coding-standard.md
    ├─ git-rules.md
    ├─ firestore-structure.md
    ├─ system-flow.md
    ├─ deployment.md
    ├─ firebase-setup.md
    ├─ firebase-rules.md
    ├─ roadmap.md
    ├─ security.md
    ├─ devops.md
    ├─ ui-guideline.md
    └─ naming-convention.md
```

---

## 必須移除

專案完成後不得留下：

- Google Sheet API
- Apps Script URL
- Admin Token
- GWS 相關程式碼
- 無意義 console.log(data)
- 無中文註解的重要函式

---

## AI Agent 工作流程（強制）

任何 AI Agent 完成修改後，必須輸出：

```text
## 修改檔案
- xxx

## 修改摘要
1. xxx

## Git Commit Message
Feat: xxx

## Firestore 是否異動
是 / 否

若有異動：
- Collection
- 欄位
- Rules

## 是否需要重新部署
是 / 否

## 風險說明
- xxx
```

若未輸出以上內容，視為任務未完成。


## Git 操作規範

AI Agent 不得假設已完成 Git Commit。

完成修改後必須：

1. 提供建議 Commit Message
2. 提供建議 Branch
3. 提供建議 Push 指令

由 Louis 自行決定是否提交。