# Firestore Structure
# study.cwli.dev 資料結構

## Collections

V1 使用：

```text
videos
notes
users
settings
```

---

## videos

用途：儲存學習影片、課程影片、觀看進度。

| 欄位 | 型別 | 必填 | 說明 |
|---|---|---|---|
| title | string | 是 | 影片標題 |
| series | string | 否 | 課程系列 |
| category | string | 否 | 分類 |
| url | string | 否 | 影片網址 |
| date | string | 否 | 安排日期，YYYY-MM-DD |
| status | string | 是 | planned / watching / completed |
| progress | number | 是 | 進度 0-100 |
| duration | number | 否 | 影片分鐘數 |
| tags | array | 否 | 標籤 |
| note | string | 否 | 影片備註 |
| createdAt | timestamp | 是 | 建立時間 |
| updatedAt | timestamp | 是 | 更新時間 |

範例：

```json
{
  "title": "Bootstrap Grid 教學",
  "series": "Bootstrap",
  "category": "Frontend",
  "url": "https://youtube.com/xxxxx",
  "date": "2026-06-17",
  "status": "planned",
  "progress": 0,
  "duration": 30,
  "tags": ["Bootstrap", "Grid"],
  "note": "",
  "createdAt": "serverTimestamp",
  "updatedAt": "serverTimestamp"
}
```

---

## notes

用途：儲存每日學習筆記。

| 欄位 | 型別 | 必填 | 說明 |
|---|---|---|---|
| date | string | 是 | 筆記日期，YYYY-MM-DD |
| title | string | 是 | 筆記標題 |
| content | string | 是 | 筆記內容 |
| createdAt | timestamp | 是 | 建立時間 |
| updatedAt | timestamp | 是 | 更新時間 |

範例：

```json
{
  "date": "2026-06-17",
  "title": "Firebase 學習",
  "content": "完成 Firestore CRUD",
  "createdAt": "serverTimestamp",
  "updatedAt": "serverTimestamp"
}
```

---

## users

用途：儲存使用者權限。

文件 ID 建議使用 Firebase Auth uid。

| 欄位 | 型別 | 必填 | 說明 |
|---|---|---|---|
| email | string | 是 | 使用者 Email |
| displayName | string | 否 | 顯示名稱 |
| role | string | 是 | admin / editor / viewer |
| createdAt | timestamp | 是 | 建立時間 |

範例：

```json
{
  "email": "louis962911@gmail.com",
  "displayName": "Louis",
  "role": "admin",
  "createdAt": "serverTimestamp"
}
```

---

## settings

用途：儲存網站設定。

| 欄位 | 型別 | 說明 |
|---|---|---|
| siteName | string | 網站名稱 |
| theme | string | light / dark |
| calendarStartDay | number | 0=Sunday, 1=Monday |
| updatedAt | timestamp | 更新時間 |

範例：

```json
{
  "siteName": "Louis Study Tracker",
  "theme": "light",
  "calendarStartDay": 1,
  "updatedAt": "serverTimestamp"
}
```

---

## status 規範

videos.status 可用值：

```text
planned
watching
completed
```

說明：

- planned：已安排但尚未觀看
- watching：觀看中
- completed：已完成
