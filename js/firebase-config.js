/**
 * 檔案名稱：firebase-config.js
 *
 * 功能：
 * 初始化 Firebase App、Authentication、Firestore。
 *
 * 輸入：
 * Firebase Web App 設定
 *
 * 輸出：
 * app、auth、db
 *
 * 流程：
 * 1. 載入 Firebase Web SDK CDN 模組
 * 2. 使用 firebaseConfig 初始化 Firebase App
 * 3. 匯出 Authentication 與 Firestore 實例
 *
 * 建立日期：
 * 2026-06-17
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBwEi09oppeu1SR8lLfZWRY42I9OxLE8wM",
  authDomain: "jic-study-tracker.firebaseapp.com",
  projectId: "jic-study-tracker",
  storageBucket: "jic-study-tracker.firebasestorage.app",
  messagingSenderId: "845030377923",
  appId: "1:845030377923:web:7fc09c929bd319a5315576"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
