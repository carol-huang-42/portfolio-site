#!/usr/bin/env bash
# 构建并推送到 Gitee Pages 分支（仅含 dist 静态文件）
# 用法：GITEE_REMOTE=git@gitee.com:你的用户名/portfolio-site.git ./scripts/deploy-gitee-pages.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# 部分环境只有 ~/bin/node 符号链接，npm 在同目录但未加入 PATH
if ! command -v npm >/dev/null 2>&1 && command -v node >/dev/null 2>&1; then
  NODE_BIN_DIR="$(node -e "console.log(require('path').dirname(process.execPath))")"
  export PATH="${NODE_BIN_DIR}:${PATH}"
fi
if ! command -v npm >/dev/null 2>&1; then
  echo "错误：找不到 npm。请安装 Node.js，或将 npm 所在目录加入 PATH 后重试。"
  exit 1
fi

GITEE_BASE="${GITEE_BASE:-/portfolio-site/}"
GITEE_REMOTE="${GITEE_REMOTE:-}"
PAGES_BRANCH="${PAGES_BRANCH:-pages}"

echo "→ 构建（base=${GITEE_BASE}）..."
VITE_BASE_PATH="$GITEE_BASE" npm run build
cp dist/index.html dist/404.html

if [[ -z "$GITEE_REMOTE" ]]; then
  echo ""
  echo "构建完成。dist/ 已就绪。"
  echo "请设置 Gitee 远程地址后重新运行，例如："
  echo "  GITEE_REMOTE=git@gitee.com:你的用户名/portfolio-site.git ./scripts/deploy-gitee-pages.sh"
  echo ""
  echo "或在 Gitee 仓库 → 服务 → Gitee Pages → 选择分支 ${PAGES_BRANCH}、目录 /"
  exit 0
fi

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

cp -R dist/* "$WORK/"
cd "$WORK"
git init -q
git checkout -b "$PAGES_BRANCH" 2>/dev/null || git checkout "$PAGES_BRANCH"
git add -A
git commit -q -m "deploy: $(date '+%Y-%m-%d %H:%M')"

echo "→ 推送到 Gitee（分支 ${PAGES_BRANCH}）..."
git push -f "$GITEE_REMOTE" "${PAGES_BRANCH}:${PAGES_BRANCH}"

echo ""
echo "完成。请在 Gitee 仓库开启 Pages，并选用分支：${PAGES_BRANCH}，目录：/"
