/**
 * 檔案名稱：firebase-auth.js
 *
 * 功能：
 * 管理 Firebase Authentication 登入、登出與 Admin 權限檢查。
 *
 * 輸入：
 * Firebase Auth user、Email、Password
 *
 * 輸出：
 * 登入結果、Admin 檢查結果、頁面導向
 *
 * 流程：
 * 1. 等待 Firebase Auth 狀態
 * 2. 檢查使用者是否登入
 * 3. 檢查 Email 是否為指定 Admin
 * 4. 未通過時導向 login.html 或 index.html
 *
 * 建立日期：
 * 2026-06-17
 */
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "./firebase-config.js";

export const ADMIN_EMAIL = "louis962911@gmail.com";

export function waitForAuthUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

export function isAdminUser(user) {
  return Boolean(user?.email && user.email.toLowerCase() === ADMIN_EMAIL);
}

export async function requireAdmin() {
  const user = await waitForAuthUser();

  if (!user) {
    window.location.href = "login.html";
    return null;
  }

  if (!isAdminUser(user)) {
    window.location.href = "index.html";
    return null;
  }

  return user;
}

export async function loginWithEmail(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function logout() {
  await signOut(auth);
}
