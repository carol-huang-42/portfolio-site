import { useState } from "react";
import { IconDotsHorizontal } from "./TaskBoardIcons.jsx";
import TaskTag from "./TaskTag.jsx";

const COPY = {
  zh: {
    review: { reject: "Reject", improve: "Improve", accept: "Accept" },
    auth: { allow: "Allow", deny: "Deny", ask: "Ask" },
    action: { continue: "Continue", submit: "Submit" },
    connect: { connect: "Connect", cancel: "Cancel" },
  },
  en: {
    review: { reject: "Reject", improve: "Improve", accept: "Accept" },
    auth: { allow: "Allow", deny: "Deny", ask: "Ask" },
    action: { continue: "Continue", submit: "Submit" },
    connect: { connect: "Connect", cancel: "Cancel" },
  },
};

function IconPencil({ className = "h-4 w-4 shrink-0 text-neutral-500" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M10.9 2.6 13.4 5.1 5.9 12.6H3.4V10.1L10.9 2.6Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M9.2 4.3 11.7 6.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconProgressSpark({ className = "h-3.5 w-3.5 shrink-0 text-[#EC8B40]" }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 1.2v2.2M7 10.6v2.2M1.2 7h2.2M10.6 7h2.2M2.9 2.9l1.6 1.6M9.5 9.5l1.6 1.6M2.9 11.1l1.6-1.6M9.5 4.5l1.6-1.6"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <circle cx="7" cy="7" r="1.8" fill="currentColor" fillOpacity="0.35" />
    </svg>
  );
}

function btnStreamGhost() {
  return "rounded-md border border-transparent bg-transparent px-2 py-1 text-[11px] font-semibold text-neutral-600 transition hover:bg-neutral-100 hover:text-heading";
}

function btnStreamPrimary() {
  return "rounded-md bg-[#EC8B40] px-2.5 py-1 text-[11px] font-semibold text-white shadow-[0_6px_14px_-8px_rgba(236,139,64,0.55)] transition hover:brightness-105 active:scale-[0.98]";
}

function ChevronExpand({ open }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-neutral-400 transition ${open ? "rotate-180" : ""}`}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * 对话列表内横向任务栏（对齐对话视图参考稿：左标题区 + 右操作与进度）
 */
export default function TaskChatStreamRow({ task, lang, pulse = false, emphasis = false, onAction }) {
  const c = COPY[lang];
  const [expanded, setExpanded] = useState(false);
  const { current, total } = task.progress;

  const shell = [
    "flex w-full flex-col rounded-xl border border-neutral-200/90 bg-white shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_4px_16px_-10px_rgba(15,23,42,0.1)]",
    "transition-[box-shadow,border-color,ring] motion-reduce:transition-none [transition-duration:var(--task-status-transition-duration)] [transition-timing-function:var(--task-status-transition-ease)]",
    task.status === "input_required" ? "border-[rgba(236,139,64,0.4)]" : "",
    emphasis ? "ring-2 ring-[#EC8B40]/45 ring-offset-2 ring-offset-white/80" : "",
    pulse ? "animate-task-status-flow" : "",
  ].join(" ");

  const actions =
    task.status === "input_required" && task.subScenario === "review_required" ? (
      <>
        <button type="button" className={btnStreamGhost()} onClick={() => onAction(task.id, "reject")}>
          {c.review.reject}
        </button>
        <button type="button" className={btnStreamGhost()} onClick={() => onAction(task.id, "improve")}>
          {c.review.improve}
        </button>
        <button type="button" className={btnStreamPrimary()} onClick={() => onAction(task.id, "accept")}>
          {c.review.accept}
        </button>
      </>
    ) : task.status === "input_required" && task.subScenario === "authorize_required" ? (
      <>
        <button type="button" className={btnStreamPrimary()} onClick={() => onAction(task.id, "allow")}>
          {c.auth.allow}
        </button>
        <button type="button" className={btnStreamGhost()} onClick={() => onAction(task.id, "deny")}>
          {c.auth.deny}
        </button>
        <button type="button" className={btnStreamGhost()} onClick={() => onAction(task.id, "ask")}>
          {c.auth.ask}
        </button>
      </>
    ) : task.status === "input_required" && task.subScenario === "action_required" ? (
      <>
        <button type="button" className={btnStreamPrimary()} onClick={() => onAction(task.id, "continue")}>
          {c.action.continue}
        </button>
        <button type="button" className={btnStreamGhost()} onClick={() => onAction(task.id, "submit")}>
          {c.action.submit}
        </button>
      </>
    ) : task.status === "input_required" && task.subScenario === "connect_required" ? (
      <>
        <button type="button" className={btnStreamPrimary()} onClick={() => onAction(task.id, "connect")}>
          {c.connect.connect}
        </button>
        <button type="button" className={btnStreamGhost()} onClick={() => onAction(task.id, "cancel_connect")}>
          {c.connect.cancel}
        </button>
      </>
    ) : null;

  return (
    <article data-task-id={task.id} data-task-status={task.status} className={shell}>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 px-3 py-2 sm:px-3.5">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <IconPencil />
          <h3 className="min-w-0 truncate text-left text-sm font-semibold text-heading">{task.title}</h3>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-x-1 gap-y-1 sm:ml-auto">
          {actions}
          <div className="mx-0.5 flex items-center gap-1 rounded-md border border-neutral-200/80 bg-neutral-50/90 px-1.5 py-0.5">
            <IconProgressSpark className="h-3.5 w-3.5" />
            <span className="text-[11px] font-medium tabular-nums text-neutral-600">
              {current}/{total}
            </span>
          </div>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-100"
            aria-label="More"
          >
            <IconDotsHorizontal className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-100"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            <ChevronExpand open={expanded} />
          </button>
        </div>
      </div>
      {expanded ? (
        <div className="flex flex-wrap gap-1.5 border-t border-neutral-100 px-3 py-2 sm:px-3.5">
          {task.tags.map((tag, i) => (
            <TaskTag key={`${task.id}-exp-${i}`} label={tag} compact />
          ))}
        </div>
      ) : null}
    </article>
  );
}
