# Firebase Rules
# Firestore 權限規則

## V1 開發測試版

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /videos/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /notes/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /settings/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /users/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid;
      allow write: if false;
    }
  }
}
```

---

## V2 正式版建議

使用 users collection 的 role 控制寫入權限。

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() {
      return request.auth != null;
    }

    function isAdmin() {
      return isSignedIn()
        && exists(/databases/$(database)/documents/users/$(request.auth.uid))
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }

    match /videos/{id} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    match /notes/{id} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    match /settings/{id} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    match /users/{uid} {
      allow read: if isSignedIn() && request.auth.uid == uid;
      allow create, update, delete: if false;
    }
  }
}
```

---

## 注意

- 前台 index.html 可以公開讀取資料。
- Admin.html 必須登入才可寫入。
- 不要把 Firestore Rules 設為全部開放寫入。
- 不要使用 `allow read, write: if true;`。
