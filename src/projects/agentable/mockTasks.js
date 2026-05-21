/** 任务数据与泳道 — 对齐图1 状态机；卡片字段仅含设计稿中的标题 / 进度 / 标签 / 交互 */

/** @typedef {'pending' | 'in_progress' | 'input_required' | 'completed' | 'failed' | 'canceled'} TaskStatus */
/** @typedef {'review_required' | 'authorize_required' | 'action_required' | 'connect_required'} InputSubScenario */

export const COLUMN_ORDER = [
  "pending",
  "in_progress",
  "input_required",
  "completed",
  "failed",
  "canceled",
];

/** 泳道标题与参考稿英文一致 */
export const COLUMN_META = {
  zh: {
    pending: { title: "Pending" },
    in_progress: { title: "In-Progress" },
    input_required: { title: "Input-required" },
    completed: { title: "Complete" },
    failed: { title: "Failed" },
    canceled: { title: "Canceled" },
  },
  en: {
    pending: { title: "Pending" },
    in_progress: { title: "In-Progress" },
    input_required: { title: "Input-required" },
    completed: { title: "Complete" },
    failed: { title: "Failed" },
    canceled: { title: "Canceled" },
  },
};

/**
 * @type {Array<{
 *   id: string;
 *   title: string;
 *   status: TaskStatus;
 *   column: string;
 *   progress: { current: number; total: number };
 *   tags: string[];
 *   subScenario?: InputSubScenario;
 * }>}
 */
/** 同一列 + 同进度条样式最多保留两条，避免对话任务栏重复堆叠 */
export const MOCK_TASKS = [
  {
    id: "p-1",
    title: "Task Name",
    status: "pending",
    column: "pending",
    progress: { current: 0, total: 6 },
    tags: ["Event Tags", "Tags"],
  },
  {
    id: "p-2",
    title: "Task Name",
    status: "pending",
    column: "pending",
    progress: { current: 0, total: 6 },
    tags: ["Event Tags", "Tags"],
  },
  {
    id: "ip-1",
    title: "Task Name",
    status: "in_progress",
    column: "in_progress",
    progress: { current: 5, total: 6 },
    tags: ["Event Tags", "Tags"],
  },
  {
    id: "ip-2",
    title: "Task Name",
    status: "in_progress",
    column: "in_progress",
    progress: { current: 3, total: 6 },
    tags: ["Event Tags", "Tags"],
  },
  {
    id: "ir-1",
    title: "Task Name",
    status: "input_required",
    column: "input_required",
    subScenario: "review_required",
    progress: { current: 4, total: 6 },
    tags: ["Event Tags", "Tags"],
  },
  {
    id: "ir-2",
    title: "Task Name",
    status: "input_required",
    column: "input_required",
    subScenario: "authorize_required",
    progress: { current: 2, total: 6 },
    tags: ["Event Tags", "Tags"],
  },
  {
    id: "c-1",
    title: "Task Name",
    status: "completed",
    column: "completed",
    progress: { current: 6, total: 6 },
    tags: ["Event Tags", "Tags"],
  },
  {
    id: "f-1",
    title: "Task Name",
    status: "failed",
    column: "failed",
    progress: { current: 4, total: 6 },
    tags: ["Event Tags", "Tags"],
  },
  {
    id: "x-1",
    title: "Task Name",
    status: "canceled",
    column: "canceled",
    progress: { current: 0, total: 6 },
    tags: ["Event Tags", "Tags"],
  },
];
