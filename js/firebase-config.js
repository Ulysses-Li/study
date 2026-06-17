/**
 * 檔案名稱：firebase-config.js
 *
 * 功能：
 * 初始化 Firebase App、Firestore、Authentication。
 *
 * 輸入：
 * 無
 *
 * 輸出：
 * app、db、auth
 *
 * 流程：
 * 1. 載入 Firebase Web SDK
 * 2. 建立 Firebase App
 * 3. 匯出 Firestore 與 Auth 實例
 *
 * 建立日期：
 * 2026-06-17
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "請填入 Firebase Web App apiKey",
  authDomain: "study-tracker.firebaseapp.com",
  projectId: "study-tracker",
  storageBucket: "study-tracker.appspot.com",
  messagingSenderId: "請填入 messagingSenderId",
  appId: "請填入 Firebase Web App appId"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
