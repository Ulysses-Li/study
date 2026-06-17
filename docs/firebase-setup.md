# Firebase Setup
# study.cwli.dev Firebase 設定

## 1. Firebase Project

建立新專案：

```text
Project Name: Study Tracker
Project ID: study-tracker
Region: asia-east1
```

不得與 `jic-business-cards` 共用。

---

## 2. Authentication

啟用登入方式：

```text
Email / Password
```

設定 Authorized domains：

```text
localhost
study.cwli.dev
```

---

## 3. Firestore Database

建立 Firestore Database。

建議：

```text
Mode: Production mode
Region: asia-east1
```

---

## 4. 建立第一個 Admin

V1 可先用 ADMIN_EMAIL 白名單。

```javascript
const ADMIN_EMAIL = "louis962911@gmail.com";
```

V2 可建立 users collection。

步驟：

1. Firebase Authentication 建立使用者
2. 複製該使用者 UID
3. 到 Firestore 建立：

```text
collection: users
document id: 使用者 UID
```

資料：

```json
{
  "email": "louis962911@gmail.com",
  "displayName": "Louis",
  "role": "admin",
  "createdAt": "serverTimestamp"
}
```

---

## 5. Firebase Config

到：

```text
Project Settings
→ General
→ Your apps
→ Web app
```

取得 firebaseConfig。

填入：

```text
js/firebase-config.js
```

範例：

```javascript
/**
 * 檔案名稱：
 * firebase-config.js
 *
 * 功能：
 * 初始化 Firebase App、Firestore、Auth
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```
