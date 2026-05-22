# 国内托管部署指南（EdgeOne Pages）

Vercel（`*.vercel.app`）在国内常无法访问。**Gitee Pages 已下线**，菜单里不再有该服务。

推荐用 **腾讯 EdgeOne Pages** 作为给招聘官的主链接，国内访问更稳定。

---

## 一、本地构建（先做这步，不必注册）

在终端执行：

```bash
cd /Users/dadaizhi/Documents/UX/portfolio-site

npm run build:edgeone
```

会在项目里生成 **`dist/`** 文件夹（内含 `index.html`、`assets/`、`projects/` 等）。

若提示 `npm: command not found`，先执行：

```bash
export PATH="$HOME/.workbuddy/binaries/node/versions/22.12.0/bin:$PATH"
```

再运行 `npm run build:edgeone`。

---

## 二、从 GitHub 导入（推荐，不用浏览器传 100MB）

### 1. 先把代码推到 GitHub

```bash
cd /Users/dadaizhi/Documents/UX/portfolio-site
git add package.json DEPLOY-CN.md public/projects/aigc-team/*.png scripts/deploy-gitee-pages.sh
git commit -m "EdgeOne 部署：压缩大图、统一 build 脚本"
git push origin main
```

（不要 `git add` 任何 `.zip` 文件。）

### 2. EdgeOne 连接 GitHub

1. 打开 [EdgeOne Pages 控制台](https://console.tencentcloud.com/edgeone/pages)
2. **创建项目** → **导入 Git 仓库**
3. 点 **GitHub** → 授权 → 选仓库 **`carol-huang-42/portfolio-site`**
4. 构建配置：

| 项 | 填写 |
|----|------|
| 生产分支 | `main` |
| 框架 | Vite（自动识别即可） |
| 构建命令 | `npm run build` |
| 输出目录 | `dist` |
| Node 版本 | 20（或 18） |
| 加速区域 | 中国大陆可用区 |

5. 点 **开始部署**，等构建日志显示成功
6. 在项目里点 **预览**，复制访问链接

以后改代码：`git push` 到 `main` 会自动重新部署。

---

## 三、直接上传 dist（备选，易超时）

### 注册并上传（要写进简历必须注册）

1. 打开 [https://pages.edgeone.ai/zh](https://pages.edgeone.ai/zh)
2. **未注册**也可先拖放上传试看，但链接约 **1 小时** 后失效。
3. 用 **手机号 / 微信** 注册并登录（免费）→ 上传后的链接可**长期保留**。
4. 把 **`dist` 文件夹里的所有内容**拖进页面上传区（拖整个 `dist` 里的文件，不是拖 `dist` 文件夹本身）。
5. 等待部署完成，复制给你的地址，形如：

   **`https://xxxx.edgeone.app`**

这就是可发给国内面试官的链接。

---

## 三、以后更新作品集

改完代码后重复：

```bash
cd /Users/dadaizhi/Documents/UX/portfolio-site
npm run build:edgeone
```

再到 EdgeOne 控制台 **重新上传** `dist` 里的文件（或按平台提示「更新部署」）。

源码仍可同步到 GitHub / Gitee 做备份：

```bash
git add .
git commit -m "更新内容"
git push
```

---

## 四、双线路建议（简历怎么写）

| 用途 | 链接 |
|------|------|
| 国内面试官（主） | EdgeOne 给的 `https://xxxx.edgeone.app` |
| 海外 / 备用 | `https://portfolio-site-tau-topaz.vercel.app` |

简历可写：

> 作品集：https://xxxx.edgeone.app

---

## 五、绑定自己的域名（可选）

在 EdgeOne 控制台按提示添加自定义域名。`.cn` 等域名在国内通常需 **ICP 备案**；EdgeOne 默认子域名一般**无需备案**。

---

## 六、常见问题

**Q：必须先注册才能上传吗？**  
可以先上传试看；要**长期链接写进简历**，需要注册登录。

**Q：打开是空白页？**  
确认上传的是 `npm run build:edgeone` 生成的 `dist` 内容，且用的是根路径构建（不要用 `/portfolio-site/` 的 Gitee 旧构建）。

**Q：刷新子页面 404？**  
`build:edgeone` 已包含 `404.html` 复制，重新构建并上传即可。

**Q：Gitee 还能用吗？**  
可作代码备份；**Gitee Pages 已无法发布网站**。
