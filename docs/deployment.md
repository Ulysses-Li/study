# Deployment
# study.cwli.dev 部署說明

## 部署方式

本專案使用：

- GitHub Pages
- Cloudflare
- Custom Domain

---

## Repository

建議：

```text
Repository: Louis
Branch: main
Folder: /Study
```

---

## GitHub Pages

設定：

```text
Source: Deploy from a branch
Branch: main
Folder: /Study
```

---

## Custom Domain

```text
study.cwli.dev
```

---

## Cloudflare DNS

新增 CNAME：

```text
Type: CNAME
Name: study
Target: <GitHub Pages 網址>
Proxy: DNS only 或 Proxied
```

若使用 GitHub Pages，建議先用 DNS only 確認成功，再改 Proxied。

---

## Cloudflare SSL

建議：

```text
SSL/TLS: Full
Always Use HTTPS: On
Automatic HTTPS Rewrites: On
Brotli: On
Auto Minify: HTML / CSS / JS
```

---

## Firebase Authorized Domains

Firebase Console 需加入：

```text
study.cwli.dev
localhost
```

位置：

```text
Authentication
→ Settings
→ Authorized domains
```

---

## 部署檢查清單

- [ ] index.html 可正常開啟
- [ ] Admin.html 未登入會跳 login.html
- [ ] login.html 可登入
- [ ] Firestore 可讀取
- [ ] Firestore 可寫入
- [ ] localStorage fallback 正常
- [ ] 無 Apps Script URL
- [ ] 無 Google Sheet API
- [ ] 無 Admin Token
- [ ] Firebase Rules 已設定
- [ ] Console 無重大錯誤
