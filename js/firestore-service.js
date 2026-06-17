/**
 * 檔案名稱：firestore-service.js
 *
 * 功能：
 * 提供 videos、notes、settings、users 的 Firestore 讀寫服務。
 *
 * 輸入：
 * Video、Note、Settings 資料物件
 *
 * 輸出：
 * Firestore 文件陣列或 CRUD 執行結果
 *
 * 流程：
 * 1. 從 Firestore 讀取資料
 * 2. 成功時寫入 localStorage 快取
 * 3. 失敗時回傳 localStorage fallback
 * 4. Admin 操作時寫入 Firestore
 *
 * 建立日期：
 * 2026-06-17
 */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from "./firebase-config.js";

const VIDEO_CACHE_KEY = "studyVideosCache";
const NOTE_CACHE_KEY = "studyNotesCache";
const SETTINGS_CACHE_KEY = "studySettingsCache";

function readCache(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error("讀取 localStorage 快取失敗", error);
    return fallback;
  }
}

function writeCache(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("寫入 localStorage 快取失敗", error);
  }
}

function snapshotToRows(snapshot) {
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data()
  }));
}

export async function loadVideos() {
  try {
    const videosQuery = query(collection(db, "videos"), orderBy("date", "asc"));
    const snapshot = await getDocs(videosQuery);
    const videos = snapshotToRows(snapshot);
    writeCache(VIDEO_CACHE_KEY, videos);
    return { data: videos, fromCache: false };
  } catch (error) {
    console.error("Firestore videos 讀取失敗，改用 localStorage", error);
    return { data: readCache(VIDEO_CACHE_KEY, []), fromCache: true };
  }
}

export async function loadNotes() {
  try {
    const notesQuery = query(collection(db, "notes"), orderBy("date", "asc"));
    const snapshot = await getDocs(notesQuery);
    const notes = snapshotToRows(snapshot);
    writeCache(NOTE_CACHE_KEY, notes);
    return { data: notes, fromCache: false };
  } catch (error) {
    console.error("Firestore notes 讀取失敗，改用 localStorage", error);
    return { data: readCache(NOTE_CACHE_KEY, []), fromCache: true };
  }
}

export async function loadSettings() {
  try {
    const snapshot = await getDocs(collection(db, "settings"));
    const settings = snapshotToRows(snapshot);
    writeCache(SETTINGS_CACHE_KEY, settings);
    return { data: settings, fromCache: false };
  } catch (error) {
    console.error("Firestore settings 讀取失敗，改用 localStorage", error);
    return { data: readCache(SETTINGS_CACHE_KEY, []), fromCache: true };
  }
}

export async function saveVideo(video) {
  const payload = {
    title: video.title || "",
    series: video.series || "",
    category: video.category || "",
    url: video.url || "",
    date: video.date || "",
    status: video.status || "planned",
    progress: Number(video.progress || 0),
    duration: Number(video.duration || 0),
    tags: Array.isArray(video.tags) ? video.tags : [],
    note: video.note || "",
    updatedAt: serverTimestamp()
  };

  if (video.id) {
    await updateDoc(doc(db, "videos", video.id), payload);
    return video.id;
  }

  const created = await addDoc(collection(db, "videos"), {
    ...payload,
    createdAt: serverTimestamp()
  });
  return created.id;
}

export async function deleteVideo(id) {
  await deleteDoc(doc(db, "videos", id));
}

export async function saveNote(note) {
  const payload = {
    date: note.date || "",
    title: note.title || "",
    content: note.content || "",
    updatedAt: serverTimestamp()
  };

  if (note.id) {
    await updateDoc(doc(db, "notes", note.id), payload);
    return note.id;
  }

  const created = await addDoc(collection(db, "notes"), {
    ...payload,
    createdAt: serverTimestamp()
  });
  return created.id;
}

export async function deleteNote(id) {
  await deleteDoc(doc(db, "notes", id));
}

export async function saveSettings(settings) {
  await setDoc(doc(db, "settings", "main"), {
    siteName: settings.siteName || "Louis Study Tracker",
    theme: settings.theme || "light",
    calendarStartDay: Number(settings.calendarStartDay ?? 1),
    updatedAt: serverTimestamp()
  }, { merge: true });
}

export async function saveAdminUser(user) {
  if (!user?.uid) return;

  await setDoc(doc(db, "users", user.uid), {
    email: user.email || "",
    displayName: user.displayName || "Louis",
    role: "admin",
    createdAt: serverTimestamp()
  }, { merge: true });
}

export async function importJsonData(data) {
  const videos = Array.isArray(data?.videos) ? data.videos : Array.isArray(data?.VIDEO_DB) ? data.VIDEO_DB : [];
  const notes = Array.isArray(data?.notes) ? data.notes : [];
  const legacyNotes = data?.CALENDAR_NOTES && typeof data.CALENDAR_NOTES === "object" ? data.CALENDAR_NOTES : {};

  for (const video of videos) {
    await saveVideo({
      title: video.title || video.name || "",
      series: video.series || "",
      category: video.category || "",
      url: video.url || "",
      date: video.date || "",
      status: video.status || "planned",
      progress: video.progress || 0,
      duration: video.duration || 0,
      tags: video.tags || [],
      note: video.note || ""
    });
  }

  for (const note of notes) {
    await saveNote({
      date: note.date || "",
      title: note.title || "",
      content: note.content || note.note || ""
    });
  }

  for (const [date, content] of Object.entries(legacyNotes)) {
    await saveNote({
      date,
      title: "Calendar Note",
      content: Array.isArray(content) ? content.join("\n") : String(content || "")
    });
  }
}
