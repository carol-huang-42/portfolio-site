import { useCallback, useMemo, useState } from "react";
import { COLUMN_META, COLUMN_ORDER, MOCK_TASKS } from "../mockTasks.js";
import { columnHeaderIcon, IconDotsHorizontal } from "./TaskBoardIcons.jsx";
import AgentableConversationShell from "./AgentableConversationShell.jsx";
import TaskCard from "./TaskCard.jsx";
import TaskChatStreamRow from "./TaskChatStreamRow.jsx";

const MODULE_COPY = {
  zh: {
    eyebrow: "MODULE 01 · 任务闭环",
    eyebrowEmbedded: "演示区",
    title: "任务状态闭环",
    titleEmbedded: "全量状态与多视图映射",
    lead: "图1 状态与交互为准；同一 TaskCard 在列表、卡片（看板）、对话三种视图下保持一致结构与动效接口。",
    leadEmbedded: "切换视图即可对照同一套数据模型在不同容器中的呈现与操作密度。",
    views: { list: "列表视图", board: "卡片视图", chat: "对话视图" },
    chatLead:
      "对话列表内嵌横向任务栏；底部为输入框与「输出」预览条（与参考稿一致）。",
  },
  en: {
    eyebrow: "MODULE 01 · Closed loop",
    eyebrowEmbedded: "Prototype",
    title: "Task status closed loop",
    titleEmbedded: "Full state map & multi-surface",
    lead: "States and actions follow Figure 1; one TaskCard across list, board, and conversation shells.",
    leadEmbedded: "Switch surfaces to compare density and affordances while the data model stays identical.",
    views: { list: "List", board: "Board", chat: "Conversation" },
    chatLead:
      "Horizontal task bars live in the chat stream; composer includes the staged output strip like the reference.",
  },
};

function applyAction(task, action) {
  const next = { ...task };
  if (next.status !== "input_required") return next;

  const leaveInput = (status, column) => {
    next.status = status;
    next.column = column;
    delete next.subScenario;
  };

  switch (action) {
    case "accept":
    case "submit":
      leaveInput("completed", "completed");
      break;
    case "reject":
    case "deny":
      leaveInput("failed", "failed");
      break;
    case "allow":
    case "allow_room":
    case "allow_app":
    case "allow_workspace":
    case "continue":
    case "connect":
      leaveInput("in_progress", "in_progress");
      break;
    case "ask":
      leaveInput("pending", "pending");
      break;
    case "cancel_connect":
      leaveInput("canceled", "canceled");
      break;
    case "improve":
    case "regenerate":
    default:
      break;
  }
  return next;
}

function ChevronList({ expanded }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 ease-out ${expanded ? "rotate-0" : "-rotate-90"}`}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ListCollapsibleColumn({ colId, title, count, expanded, onToggle, children }) {
  const Icon = columnHeaderIcon(colId);
  return (
    <div className="w-full rounded-3xl border border-neutral-200/70 bg-[#F1EFF0]/85 p-3 shadow-sm sm:p-4">
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={onToggle}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-xl py-1 text-left transition hover:bg-white/40"
          aria-expanded={expanded}
        >
          <ChevronList expanded={expanded} />
          <Icon className="h-5 w-5 shrink-0" />
          <h3 className="min-w-0 flex-1 text-base font-semibold leading-none text-heading">
            {title}
            <span className="ml-1.5 text-sm font-normal text-neutral-400">{count}</span>
          </h3>
        </button>
        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-white/60 hover:text-neutral-600"
          aria-label="Column actions"
        >
          <IconDotsHorizontal />
        </button>
      </div>
      {expanded ? <div className="mt-3 space-y-1.5">{children}</div> : null}
    </div>
  );
}

function BoardColumnShell({ colId, title, count, children }) {
  const Icon = columnHeaderIcon(colId);
  const shell = "flex w-[min(100%,300px)] shrink-0 snap-start flex-col";
  return (
    <div
      className={`${shell} rounded-3xl border border-neutral-200/70 bg-[#F1EFF0]/85 p-3.5 shadow-sm transition-[box-shadow,background-color] [transition-duration:var(--task-status-transition-duration)] [transition-timing-function:var(--task-status-transition-ease)] sm:p-4`}
    >
      <div className="flex items-center gap-2 border-b border-neutral-200/60 pb-3">
        <Icon className="h-5 w-5 shrink-0" />
        <h3 className="min-w-0 flex-1 text-base font-semibold leading-none text-heading">
          {title}
          <span className="ml-1.5 text-sm font-normal text-neutral-400">{count}</span>
        </h3>
        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-white/60 hover:text-neutral-600"
          aria-label="Column actions"
        >
          <IconDotsHorizontal />
        </button>
      </div>
      <div className="mt-3 flex min-h-[80px] flex-col gap-2.5">{children}</div>
    </div>
  );
}

/**
 * @param {{ lang: 'zh' | 'en'; embedded?: boolean }} props
 */
export default function TaskClosedLoopModule({ lang, embedded = false }) {
  const copy = MODULE_COPY[lang];
  const colMeta = COLUMN_META[lang];

  const [tasks, setTasks] = useState(() => JSON.parse(JSON.stringify(MOCK_TASKS)));
  const [pulseId, setPulseId] = useState(null);
  const [view, setView] = useState(/** @type {'board'|'list'|'chat'} */ ("chat"));
  const [listOpen, setListOpen] = useState(() =>
    Object.fromEntries(COLUMN_ORDER.map((colId, i) => [colId, i === 0])),
  );

  const tasksByColumn = useMemo(() => {
    const map = Object.fromEntries(COLUMN_ORDER.map((k) => [k, []]));
    for (const t of tasks) {
      if (map[t.column]) map[t.column].push(t);
    }
    return map;
  }, [tasks]);

  /** 对话流：同一列 + 同进度 + 同 input 子场景最多 2 条，避免任务栏视觉重复 */
  const chatStreamTasks = useMemo(() => {
    const cap = 2;
    const seen = {};
    const out = [];
    for (const t of tasks) {
      const key = `${t.column}|${t.progress.current}/${t.progress.total}|${t.subScenario ?? ""}`;
      seen[key] = (seen[key] || 0) + 1;
      if (seen[key] <= cap) out.push(t);
    }
    return out;
  }, [tasks]);

  const stagedReviewTask = useMemo(
    () => tasks.find((x) => x.status === "input_required" && x.subScenario === "review_required"),
    [tasks],
  );

  const triggerPulse = useCallback((id) => {
    setPulseId(id);
    window.setTimeout(() => setPulseId((cur) => (cur === id ? null : cur)), 900);
  }, []);

  const onAction = useCallback(
    (taskId, action) => {
      setTasks((prev) => {
        const idx = prev.findIndex((x) => x.id === taskId);
        if (idx === -1) return prev;
        const updated = applyAction(prev[idx], action);
        const next = [...prev];
        next[idx] = updated;
        return next;
      });
      triggerPulse(taskId);
    },
    [triggerPulse],
  );

  const viewBtn = (id, label) => (
    <button
      key={id}
      type="button"
      onClick={() => setView(id)}
      className={[
        "rounded-full px-3.5 py-1.5 text-xs font-semibold transition [transition-duration:var(--task-status-transition-duration)] [transition-timing-function:var(--task-status-transition-ease)] sm:px-4 sm:text-sm",
        view === id
          ? "bg-white text-heading shadow-sm ring-1 ring-neutral-200/80"
          : "text-neutral-500 hover:text-heading",
      ].join(" ")}
    >
      {label}
    </button>
  );

  const renderCard = (task, variant) => (
    <TaskCard
      key={task.id}
      task={task}
      variant={variant}
      lang={lang}
      pulse={pulseId === task.id}
      onAction={onAction}
    />
  );

  return (
    <section
      className={
        embedded
          ? "rounded-2xl border border-neutral-200/70 bg-white/90 p-5 shadow-sm backdrop-blur-sm md:p-7"
          : "rounded-[14px] border border-neutral-200/90 bg-white/80 p-6 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_18px_50px_-28px_rgba(15,23,42,0.12)] backdrop-blur-sm md:p-8"
      }
    >
      <header className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
          {embedded ? copy.eyebrowEmbedded : copy.eyebrow}
        </p>
        <h2
          className={
            embedded
              ? "mt-2 text-xl font-semibold tracking-wide text-heading md:text-2xl"
              : "mt-2 text-2xl font-semibold tracking-wide text-heading md:text-3xl"
          }
        >
          {embedded ? copy.titleEmbedded : copy.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-body">{embedded ? copy.leadEmbedded : copy.lead}</p>
      </header>

      <div className="mt-8 flex flex-wrap items-center justify-start gap-2">
        <div className="inline-flex max-w-full rounded-full bg-neutral-100/90 p-1 ring-1 ring-neutral-200/60">
          {viewBtn("chat", copy.views.chat)}
          {viewBtn("list", copy.views.list)}
          {viewBtn("board", copy.views.board)}
        </div>
      </div>

      {view === "board" ? (
        <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {COLUMN_ORDER.map((colId) => (
            <BoardColumnShell
              key={colId}
              colId={colId}
              title={colMeta[colId].title}
              count={tasksByColumn[colId].length}
            >
              {tasksByColumn[colId].map((task) => renderCard(task, "board"))}
            </BoardColumnShell>
          ))}
        </div>
      ) : null}

      {view === "list" ? (
        <div className="mt-6 space-y-3">
          {COLUMN_ORDER.map((colId) => (
            <ListCollapsibleColumn
              key={colId}
              colId={colId}
              title={colMeta[colId].title}
              count={tasksByColumn[colId].length}
              expanded={listOpen[colId]}
              onToggle={() => setListOpen((o) => ({ ...o, [colId]: !o[colId] }))}
            >
              {tasksByColumn[colId].map((task) => renderCard(task, "list"))}
            </ListCollapsibleColumn>
          ))}
        </div>
      ) : null}

      {view === "chat" ? (
        <div className="mt-6 space-y-2 overflow-x-auto">
          <p className="text-xs text-neutral-500">{copy.chatLead}</p>
          <AgentableConversationShell
            lang={lang}
            stagedFileName={stagedReviewTask ? "Output name name name name.txt" : null}
            stagedTaskId={stagedReviewTask?.id ?? null}
            onStagedAction={onAction}
          >
            <div className="rounded-2xl rounded-tl-sm border border-neutral-200/70 bg-white px-3 py-2 text-[11px] leading-relaxed text-body shadow-sm">
              {lang === "zh"
                ? "以下为当前房间对话列表中的任务栏，与输入区上方预览条联动同一任务状态。"
                : "Task bars below sit in the room chat list; the staged bar targets the same review task when present."}
            </div>
            {chatStreamTasks.map((task) => (
              <TaskChatStreamRow
                key={task.id}
                task={task}
                lang={lang}
                pulse={pulseId === task.id}
                onAction={onAction}
              />
            ))}
          </AgentableConversationShell>
        </div>
      ) : null}
    </section>
  );
}
