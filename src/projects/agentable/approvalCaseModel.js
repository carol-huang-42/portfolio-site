/** 多维视图适配 — Tab 与 public/agentable/ 下切图文件名对应（自行替换 PNG） */

/** @typedef {'chat' | 'board' | 'list' | 'detail'} MultiviewTabId */

/** @type {readonly MultiviewTabId[]} */
export const MULTIVIEW_TAB_ORDER = ["chat", "board", "list", "detail"];

/** @type {Record<MultiviewTabId, { zh: { label: string; file: string }; en: { label: string; file: string } }>} */
export const MULTIVIEW_TAB_ASSETS = {
  chat: {
    zh: { label: "[对话视图]", file: "multiview-chat.png" },
    en: { label: "[Chat view]", file: "multiview-chat.png" },
  },
  board: {
    zh: { label: "[看板视图]", file: "multiview-board.png" },
    en: { label: "[Board view]", file: "multiview-board.png" },
  },
  list: {
    zh: { label: "[列表视图]", file: "multiview-list.png" },
    en: { label: "[List view]", file: "multiview-list.png" },
  },
  detail: {
    zh: { label: "[详情侧边栏]", file: "multiview-detail-sidebar.png" },
    en: { label: "[Detail sidebar]", file: "multiview-detail-sidebar.png" },
  },
};

export const MULTIVIEW_FIG_CAPTION = {
  zh: "Fig 1.2 - 不同视图下的信息密度折叠逻辑",
  en: "Fig 1.2 — Information density folding across views",
};

export const MULTIVIEW_NARRATIVE = {
  zh: {
    eyebrow: "多维视图适配",
    title: "原子化组件契约",
    body:
      "为了降低 40% 的开发成本并确保交互一致性，我定义了一套统一的底层数据契约。无论是对话、看板还是列表视图，核心组件仅做排版自适应，保持业务逻辑的黑盒确定性。",
  },
  en: {
    eyebrow: "Multiview adaptation",
    title: "Atomic component contract",
    body:
      "To cut development cost by roughly 40% while keeping interaction consistent, I defined one underlying data contract. Chat, board, or list—core components only reflow; business logic stays a deterministic black box.",
  },
};
