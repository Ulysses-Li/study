# Naming Convention
# 命名規範

## HTML ID

使用 kebab-case：

```html
<section id="calendar-section"></section>
<div id="video-list"></div>
```

---

## JavaScript 函式

使用 camelCase：

```javascript
loadVideos()
saveVideo()
deleteVideo()
renderCalendar()
```

---

## 檔案名稱

使用 kebab-case 或明確功能名稱：

```text
firebase-config.js
firebase-videos.js
firebase-notes.js
calendar.js
admin.js
cache.js
```

---

## Firestore Collection

使用小寫複數：

```text
videos
notes
users
settings
```

---

## localStorage Key

使用 study 前綴：

```text
study_videos_cache
study_notes_cache
study_settings_cache
study_updated_at
```

---

## 禁止命名

禁止：

```text
test
new
final
abc
temp
data1
old
copy
```
