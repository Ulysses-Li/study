/**
 * Firestore data service for Study Tracker.
 *
 * Reads Firestore first, writes successful reads to localStorage, and falls
 * back to local cache or data/sample-import.json when Firestore is unavailable.
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

const DEFAULT_SETTINGS = [
  {
    id: "main",
    siteName: "Louis Study Tracker",
    theme: "light",
    calendarStartDay: 1
  }
];

function readCache(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error("Failed to read localStorage cache.", error);
    return fallback;
  }
}

function writeCache(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to write localStorage cache.", error);
  }
}

async function loadImportFallback() {
  try {
    const response = await fetch("./data/sample-import.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    return {
      videos: Array.isArray(data?.videos) ? data.videos : [],
      notes: Array.isArray(data?.notes) ? data.notes : []
    };
  } catch (error) {
    console.error("Failed to load data/sample-import.json fallback.", error);
    return { videos: [], notes: [] };
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
    console.error("Failed to load Firestore videos. Falling back to local data.", error);
    const fallback = await loadImportFallback();
    return { data: readCache(VIDEO_CACHE_KEY, fallback.videos), fromCache: true };
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
    console.error("Failed to load Firestore notes. Falling back to local data.", error);
    const fallback = await loadImportFallback();
    return { data: readCache(NOTE_CACHE_KEY, fallback.notes), fromCache: true };
  }
}

export async function loadSettings() {
  try {
    const snapshot = await getDocs(collection(db, "settings"));
    const settings = snapshotToRows(snapshot);
    writeCache(SETTINGS_CACHE_KEY, settings);
    return { data: settings, fromCache: false };
  } catch (error) {
    console.error("Failed to load Firestore settings. Falling back to local cache.", error);
    return { data: readCache(SETTINGS_CACHE_KEY, DEFAULT_SETTINGS), fromCache: true };
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
      date: normalizeImportedDate(video.date),
      status: video.status || "planned",
      progress: video.progress || 0,
      duration: video.duration || 0,
      tags: video.tags || [],
      note: video.note || ""
    });
  }

  for (const note of notes) {
    await saveNote({
      date: normalizeImportedDate(note.date),
      title: note.title || "",
      content: note.content || note.note || ""
    });
  }

  for (const [date, content] of Object.entries(legacyNotes)) {
    await saveNote({
      date: normalizeImportedDate(date),
      title: "Calendar Note",
      content: Array.isArray(content) ? content.join("\n") : String(content || "")
    });
  }
}

function normalizeImportedDate(value) {
  if (!value) return "";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
