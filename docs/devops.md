# DevOps
# GitHub Pages / Cloudflare / Git 管理

## 主要流程

```text
本機修改
↓
Git commit
↓
Push GitHub
↓
GitHub Pages 部署
↓
Cloudflare 指向 study.cwli.dev
```

---

## 每次部署前

必須確認：

```bash
git status
```

確認沒有不應該提交的檔案。

---

## 建議流程

```bash
git add .
git commit -m "Feat: 新增 Firebase Login 功能"
git push
```

---

## 不要提交

`.gitignore` 建議忽略：

```text
.env
.DS_Store
node_modules/
*.log
```

---

## Firebase 設定

Firebase config 可放前端，但 Firestore Rules 必須正確。

不要把真正私密金鑰放進前端。
