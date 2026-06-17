# Git Commit Message 規範

## 1. 目的

本專案所有修改必須透過 Git 管理。

每次 Commit 必須清楚說明：

- 修改類型
- 修改內容
- 修改目的

禁止無意義 commit。

---

## 2. Commit Message 格式

```text
<Type>: <Description>
```

範例：

```text
Feat: 新增 Firebase Email Login 功能
Modify: 調整月曆顯示邏輯
Fix: 修正影片搜尋失效問題
Docs: 更新 Firestore 文件
Refactor: 重構 Firebase Service
```

---

## 3. Commit 類型

| 類型 | 說明 | 程式碼改動 |
|---|---|---|
| Feat | 新增/修改功能 feature | 有 |
| Modify | 既有功能需求調整的修改 | 有 |
| Fix | 修補 bug | 有 |
| Docs | 文件 documentation | 沒有 |
| Style | 格式，不影響程式碼運行，例如 white-space、formatting、missing semicolons | 沒有 |
| Refactor | 重構，既不是新增功能，也不是修補 bug 的程式碼變動 | 有 |
| Test | 增加測試 when adding missing tests | 沒有 |
| Chore | 建構程序或輔助工具的變動 maintain | 沒有 |
| Revert | 撤銷回覆先前的 commit | 有 |

---

## 4. 禁止 Commit Message

禁止：

```text
update
test
123
aaa
修改
fix
temp
new
final
```

---

## 5. 常用範例

```text
Feat: 新增 Firebase Authentication 登入功能
Feat: 新增 Admin 影片管理功能
Feat: 新增 localStorage 快取機制

Modify: 調整月曆顏色規則
Modify: 調整影片卡片欄位
Modify: 修改 Admin Dashboard 版面

Fix: 修正日期格式錯誤
Fix: 修正 Firebase 寫入失敗問題
Fix: 修正搜尋結果不更新問題

Docs: 更新 Firestore 資料結構文件
Docs: 補充 Firebase 建置流程
Docs: 更新部署說明

Style: 統一 HTML 縮排格式
Style: 調整 CSS 排版格式

Refactor: 拆分 Firebase Service 模組
Refactor: 重構月曆渲染流程
Refactor: 優化 Cache 管理邏輯

Chore: 更新 Firebase SDK 版本
Chore: 調整 GitHub Pages 設定

Revert: 回復 Firebase Login 修改
```

---

## 6. Commit 頻率

以下狀況必須 commit：

1. 完成一項功能
2. 修正一個 bug
3. 完成一個頁面
4. 完成一個模組
5. 完成文件更新
6. 完成 Firebase Rules 修改

不得累積大量修改後才 commit。

---

## 7. Branch 規範

主分支：

```text
main
```

功能開發：

```text
feature/login
feature/calendar
feature/dashboard
feature/firebase-auth
```

Bug 修正：

```text
fix/calendar-date
fix/search
fix/firebase
```

重構：

```text
refactor/cache
refactor/firestore-service
```

---

## 8. 每次修改完成後必須輸出

```text
## 修改檔案
- js/firebase-auth.js
- Admin.html

## 修改摘要
1. 新增 Firebase 登入功能
2. Admin 加入登入檢查

## Git Commit Message
Feat: 新增 Firebase Email Login 功能

## Firestore 是否異動
否

## 是否需要重新部署
是

## 風險說明
- 需確認 Firebase Auth 已啟用 Email / Password
```
