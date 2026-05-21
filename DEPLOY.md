# 部署说明

## 本地预览生产版本

```bash
npm install
npm run build
npm run preview
```

浏览器打开终端提示的地址（一般为 `http://localhost:4173`）。

## 推荐：Vercel（免费、支持自定义域名）

1. 将本项目推送到 GitHub 仓库。
2. 打开 [vercel.com](https://vercel.com)，用 GitHub 登录。
3. **Add New Project** → 选择该仓库。
4. 框架自动识别为 Vite，保持默认：
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. 点击 Deploy，完成后获得 `https://xxx.vercel.app` 链接，可直接发给招聘官。

项目已包含 `vercel.json`，子路径（如 `/projects/agentable`）刷新不会 404。

## 备选：Netlify

1. 同样先推到 GitHub。
2. [netlify.com](https://www.netlify.com) → Import from Git。
3. Build: `npm run build`，Publish directory: `dist`。
4. 已包含 `public/_redirects`，支持 SPA 路由。

## 备选：Cloudflare Pages

Build command: `npm run build`，Build output: `dist`。

---

## 发链接前自检

- [ ] 首页与各项目详情页图片均能加载
- [ ] 直接打开子路径并刷新（如 `/projects/ume`）页面正常
- [ ] 手机浏览器浏览排版正常
- [ ] 页脚邮箱、电话可复制

## 可选优化

- 将 `src/assets/hero-first-screen.png` 压缩（约 800KB+），可明显加快首屏加载
- 在 Vercel / Netlify 绑定自己的域名（如 `portfolio.yourname.com`）
