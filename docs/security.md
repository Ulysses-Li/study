# Security
# study.cwli.dev 安全規範

## 核心原則

```text
index.html 可以公開看
Admin.html 必須登入才可改
```

---

## Admin.html 保護

進入 Admin.html 時必須：

1. 檢查 Firebase Auth 是否登入
2. 檢查是否為管理員
3. 未登入跳轉 login.html
4. 非管理員跳轉 index.html

V1 可先使用 Email 白名單：

```javascript
const ADMIN_EMAIL = "louis962911@gmail.com";
```

---

## 禁止

禁止：

- Admin.html 無登入即可修改資料
- Firestore Rules 開放所有人寫入
- 在前端放私密密碼
- 使用 Admin Token 當作安全機制
- 使用 Apps Script URL 當後台 API
- 把 Google Sheet 當資料庫

---

## Firebase API Key 說明

Firebase Web API Key 不是傳統密碼。

真正安全性由以下控制：

- Firebase Auth
- Firestore Rules
- Storage Rules
- Authorized domains

---

## 使用者資料

目前不收集敏感個資。

資料內容主要為：

- 影片資料
- 學習筆記
- 觀看進度

---

## 最低安全要求

正式上線前必須確認：

- [ ] Email / Password 已啟用
- [ ] Authorized domain 包含 study.cwli.dev
- [ ] Admin.html 未登入會跳轉
- [ ] Firestore Rules 不允許公開寫入
- [ ] 無 Apps Script URL
- [ ] 無 Admin Token
