# Coding Standard
# study.cwli.dev 程式碼規範

## 1. 核心原則

本專案主要維護者是 Louis。

所有程式碼必須以：

```text
Louis 看得懂
Louis 改得動
Louis 六個月後回來仍能維護
```

為最高原則。

---

## 2. JavaScript 註解規範

所有 JavaScript 函式都必須有繁體中文註解。

重要函式需說明：

- 用途
- 輸入
- 輸出
- 流程

範例：

```javascript
/**
 * 讀取所有影片資料
 *
 * 用途：
 * 前台月曆與後台影片列表共用
 *
 * 輸入：
 * 無
 *
 * 輸出：
 * videos array
 *
 * 流程：
 * 1. 從 Firestore videos collection 讀取資料
 * 2. 將每筆文件轉成 JavaScript object
 * 3. 回傳影片陣列
 */
async function loadVideos() {
}
```

---

## 3. 流程註解

重要流程必須用中文說明。

```javascript
// 先從 Firebase 讀取最新資料
const videos = await loadVideos();

// 將資料存入 localStorage，讓離線或 Firebase 失敗時可使用
saveVideosCache(videos);

// 使用最新資料更新畫面
renderVideoCards(videos);
```

---

## 4. Firebase CRUD 註解

所有 Firestore 操作必須標註用途。

```javascript
// 新增影片資料到 Firestore videos collection
await addDoc(collection(db, "videos"), payload);
```

```javascript
// 更新指定影片資料
await updateDoc(doc(db, "videos", id), payload);
```

```javascript
// 刪除指定影片
await deleteDoc(doc(db, "videos", id));
```

---

## 5. HTML 註解規範

主要區塊必須有中文註解。

```html
<!-- 月曆區域 -->
<section id="calendar-section">
</section>

<!-- 搜尋與篩選區域 -->
<section id="filter-section">
</section>

<!-- 影片卡片區域 -->
<section id="video-section">
</section>
```

---

## 6. CSS 註解規範

CSS 必須依照區塊分類。

```css
/* =========================
   月曆區域
========================= */

.calendar {
}

/* =========================
   影片卡片
========================= */

.video-card {
}
```

---

## 7. JS 檔案 Header

每個 JavaScript 檔案開頭必須加入：

```javascript
/**
 * 檔案名稱：
 * firebase-videos.js
 *
 * 功能：
 * 管理 Firestore videos collection
 *
 * 作者：
 * Louis + ChatGPT + Codex
 *
 * 最後更新：
 * YYYY-MM-DD
 */
```

---

## 8. 命名規範

禁止：

```javascript
a()
b()
x()
data1
temp
abc
```

必須使用明確名稱：

```javascript
loadVideos()
saveVideo()
deleteVideo()
renderCalendar()
updateProgress()
filterVideos()
getVideoByDate()
```

---

## 9. Console 規範

禁止：

```javascript
console.log(data);
```

必須：

```javascript
console.log("影片資料讀取成功", data);
```

正式版應盡量移除不必要 console。

---

## 10. 錯誤處理

所有 Firebase 讀寫都必須有 try / catch。

```javascript
try {
  await saveVideo(payload);
  showToast("影片儲存成功");
} catch (error) {
  console.error("影片儲存失敗", error);
  showToast("影片儲存失敗，請稍後再試");
}
```

---

## 11. UI 提示

不得只用 console 顯示錯誤。

必須在畫面上顯示：

- Toast
- Alert
- Modal
- Loading 狀態

---

## 12. 禁止行為

禁止：

- 無註解的大型函式
- 無意義變數名稱
- 把所有功能塞進同一個 JS
- 在 HTML 內寫大量 inline JavaScript
- 複製貼上重複邏輯但不封裝
- 修改功能卻不更新文件

---

## 13. 每次修改後的必要檢查

任何功能完成後，必須檢查：

### 程式碼品質

- 是否符合中文註解規範
- 是否有無意義命名
- 是否有重複程式碼
- 是否有大型函式未拆分
- 是否有未使用變數

### Firebase

- 是否有 try / catch
- 是否有錯誤訊息提示
- 是否有權限檢查
- 是否符合 Firestore Rules

### UI

- 是否有 Loading 狀態
- 是否有 Toast 提示
- 是否有錯誤提示
- 是否支援手機版

### 文件

若有以下異動必須同步更新文件：

- Firestore 結構變更：更新 docs/firestore-structure.md
- 系統流程變更：更新 docs/system-flow.md
- Firebase 設定變更：更新 docs/firebase-setup.md
- 部署流程變更：更新 docs/deployment.md

### Git

每次修改完成必須提供：

- 修改檔案清單
- 修改摘要
- Git Commit Message
- Firestore 是否異動
- 是否需要重新部署
- 風險說明

Louis 看得懂永遠優先於程式碼最短。
