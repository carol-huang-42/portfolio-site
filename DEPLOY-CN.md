# 国内托管部署指南（Gitee Pages）

Vercel（`*.vercel.app`）在国内常无法访问。推荐用 **Gitee Pages** 作为给招聘官的主链接，国内打开更稳定。

---

## 一、注册 Gitee 并创建仓库

1. 打开 [https://gitee.com](https://gitee.com) 注册并登录（建议实名认证，Pages 更稳定）。
2. 右上角 **+** → **新建仓库**。
3. 仓库名填 **`portfolio-site`**（与脚本默认路径一致）。
4. 选 **私有** 或 **公开** 均可 → **创建**。

---

## 二、把代码同步到 Gitee（只需做一次）

在 Mac 终端执行（把 `你的Gitee用户名` 换成真实用户名）：

```bash
cd /Users/dadaizhi/Documents/UX/portfolio-site

git remote add gitee https://gitee.com/你的Gitee用户名/portfolio-site.git

git push gitee main
```

若提示 `remote gitee already exists`，改用：

```bash
git push gitee main
```

---

## 三、构建并部署到 Gitee Pages

```bash
cd /Users/dadaizhi/Documents/UX/portfolio-site

chmod +x scripts/deploy-gitee-pages.sh

GITEE_REMOTE=https://gitee.com/你的Gitee用户名/portfolio-site.git ./scripts/deploy-gitee-pages.sh
```

脚本会：

- 按子路径 `/portfolio-site/` 构建（适配 Gitee 默认网址）
- 生成 `pages` 分支并推送静态文件

---

## 四、开启 Gitee Pages

1. 打开 Gitee 仓库 → 左侧 **服务** → **Gitee Pages**。
2. 分支选择 **`pages`**，目录选择 **`/`**（根目录）。
3. 点击 **启动** / **更新**。
4. 等待 1～2 分钟，获得访问地址，一般为：

   **`https://你的Gitee用户名.gitee.io/portfolio-site/`**

这就是可发给国内面试官的链接。

---

## 五、以后更新网站

改完本地内容后：

```bash
cd /Users/dadaizhi/Documents/UX/portfolio-site
git add .
git commit -m "更新内容"
git push          # 同步源码到 GitHub（可选）
git push gitee main   # 同步源码到 Gitee（可选）

GITEE_REMOTE=https://gitee.com/你的Gitee用户名/portfolio-site.git ./scripts/deploy-gitee-pages.sh
```

然后在 Gitee → **Gitee Pages** 点 **更新**（若未自动刷新）。

---

## 六、双线路建议（简历怎么写）

| 用途 | 链接 |
|------|------|
| 国内面试官（主） | `https://你的用户名.gitee.io/portfolio-site/` |
| 海外 / 备用 | `https://portfolio-site-tau-topaz.vercel.app` |

简历可写：

> 作品集（国内）：https://xxx.gitee.io/portfolio-site/

---

## 七、绑定自己的域名（可选）

若已有域名并做 CNAME 解析，可把 `vite` 的 base 改为根路径：

```bash
VITE_BASE_PATH=/ npm run build:cn
```

再按 Gitee Pages 文档绑定自定义域名。`.cn` 域名通常需 **ICP 备案**。

---

## 八、常见问题

**Q：打开是空白页？**  
确认访问地址末尾有路径 `/portfolio-site/`，且 Pages 分支为 `pages`、目录为 `/`。

**Q：刷新子页面 404？**  
部署脚本已复制 `404.html`，重新运行 `./scripts/deploy-gitee-pages.sh` 后再更新 Pages。

**Q：Gitee Pages 要收费吗？**  
个人仓库一般有免费 Pages 额度，以 Gitee 当前政策为准。
