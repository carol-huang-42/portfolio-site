import { useEffect, useRef, useState } from "react";
import { IconDotsHorizontal } from "./TaskBoardIcons.jsx";
import TaskProgressPill from "./TaskProgressPill.jsx";
import TaskTag from "./TaskTag.jsx";

const COPY = {
  zh: {
    quickTooltip: {
      review_required: "Accept",
      authorize_required: "Allow",
      connect_required: "Connect",
    },
    review: { accept: "Accept", improve: "Improve", regenerate: "Regenerate", reject: "Reject" },
    auth: {
      allow: "Allow",
      allowRoom: "Allow in this room",
      allowApp: "Allow in this app",
      allowWs: "Allow in this Workspace",
      deny: "Deny",
      ask: "Ask",
    },
    action: { continue: "Continue", submit: "Submit" },
    connect: { connect: "Connect", cancel: "Cancel" },
    actionsMenu: "操作",
  },
  en: {
    quickTooltip: {
      review_required: "Accept",
      authorize_required: "Allow",
      connect_required: "Connect",
    },
    review: { accept: "Accept", improve: "Improve", regenerate: "Regenerate", reject: "Reject" },
    auth: {
      allow: "Allow",
      allowRoom: "Allow in this room",
      allowApp: "Allow in this app",
      allowWs: "Allow in this Workspace",
      deny: "Deny",
      ask: "Ask",
    },
    action: { continue: "Continue", submit: "Submit" },
    connect: { connect: "Connect", cancel: "Cancel" },
    actionsMenu: "Actions",
  },
};

function IconCheckBlue({ className = "h-4 w-4 text-[#2563EB]" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8.2 6.4 11 12.5 4.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown({ className = "h-3.5 w-3.5 text-neutral-500" }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 4.25 6 7.75 9.5 4.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function btnPrimaryClass() {
  return "rounded-lg bg-[#EC8B40] px-3 py-1.5 text-center text-xs font-semibold text-white shadow-[0_8px_20px_-10px_rgba(236,139,64,0.55)] transition [transition-duration:var(--task-status-transition-duration)] [transition-timing-function:var(--task-status-transition-ease)] hover:brightness-105 active:scale-[0.98]";
}

function btnGhostClass() {
  return "rounded-lg border border-neutral-200/90 bg-white px-3 py-1.5 text-center text-xs font-semibold text-heading transition [transition-duration:var(--task-status-transition-duration)] [transition-timing-function:var(--task-status-transition-ease)] hover:border-neutral-300 hover:bg-neutral-50/80 active:scale-[0.98]";
}

function InlineMenu({ open, onClose, children, align = "left" }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const h = (e) => {
      if (!ref.current?.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <ul
      ref={ref}
      className={[
        "absolute top-full z-30 mt-1 max-h-[min(70vh,20rem)] min-w-[11rem] overflow-y-auto rounded-lg border border-neutral-200/90 bg-white py-1 text-left text-xs shadow-lg ring-1 ring-black/5",
        align === "right" ? "right-0" : "left-0",
      ].join(" ")}
      role="listbox"
    >
      {children}
    </ul>
  );
}

function MenuItem({ onClick, children }) {
  return (
    <li>
      <button
        type="button"
        className="w-full px-3 py-2 text-left font-medium text-heading hover:bg-neutral-50"
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
}

function CompactInputMenuItems({ task, c, onAction, onClose }) {
  if (task.status !== "input_required" || !task.subScenario) return null;
  const wrap = (action, label) => (
    <MenuItem
      key={action}
      onClick={() => {
        onClose();
        onAction(task.id, action);
      }}
    >
      {label}
    </MenuItem>
  );

  switch (task.subScenario) {
    case "review_required":
      return (
        <>
          {wrap("accept", c.review.accept)}
          {wrap("improve", c.review.improve)}
          {wrap("regenerate", c.review.regenerate)}
          {wrap("reject", c.review.reject)}
        </>
      );
    case "authorize_required":
      return (
        <>
          {wrap("allow", c.auth.allow)}
          {wrap("allow_room", c.auth.allowRoom)}
          {wrap("allow_app", c.auth.allowApp)}
          {wrap("allow_workspace", c.auth.allowWs)}
          {wrap("deny", c.auth.deny)}
          {wrap("ask", c.auth.ask)}
        </>
      );
    case "action_required":
      return (
        <>
          {wrap("continue", c.action.continue)}
          {wrap("submit", c.action.submit)}
        </>
      );
    case "connect_required":
      return (
        <>
          {wrap("connect", c.connect.connect)}
          {wrap("cancel_connect", c.connect.cancel)}
        </>
      );
    default:
      return null;
  }
}

export default function TaskCard({ task, variant, lang, pulse = false, emphasis = false, onAction }) {
  const c = COPY[lang];
  const isCompact = variant === "list" || variant === "chat";
  const [improveOpen, setImproveOpen] = useState(false);
  const [allowOpen, setAllowOpen] = useState(false);
  const [compactMenuOpen, setCompactMenuOpen] = useState(false);

  const density = variant === "board" ? "p-4" : "px-2.5 py-1.5 sm:px-3";
  const titleBoard = "min-w-0 flex-1 text-left text-base font-semibold leading-snug text-heading";

  const borderCls =
    task.status === "input_required"
      ? "border-[rgba(236,139,64,0.45)]"
      : "border-neutral-200/90";

  const showQuickMark =
    task.status === "input_required" &&
    (task.subScenario === "review_required" ||
      task.subScenario === "authorize_required" ||
      task.subScenario === "connect_required");

  const quickAction =
    task.subScenario === "review_required"
      ? "accept"
      : task.subScenario === "authorize_required"
        ? "allow"
        : task.subScenario === "connect_required"
          ? "connect"
          : null;

  const quickTooltip = task.subScenario ? c.quickTooltip[task.subScenario] : "";

  const showCompactInputMenu = task.status === "input_required" && task.subScenario;

  const emphasisCls = emphasis ? "ring-2 ring-[#EC8B40]/45 ring-offset-2 ring-offset-white" : "";

  const compactShell = [
    "group relative flex flex-row items-center gap-1.5 rounded-lg border bg-white shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_4px_14px_-8px_rgba(15,23,42,0.12)]",
    "transition-[transform,box-shadow,border-color,ring] motion-reduce:transition-none [transition-duration:var(--task-status-transition-duration)] [transition-timing-function:var(--task-status-transition-ease)]",
    borderCls,
    density,
    emphasisCls,
    pulse ? "animate-task-status-flow" : "",
    variant === "chat"
      ? "min-h-[2.25rem] flex-[1_1_auto] min-w-[min(100%,14rem)] max-w-[min(100%,20rem)] sm:min-w-[16rem]"
      : "min-h-[2.25rem] w-full max-w-full",
  ].join(" ");

  if (isCompact) {
    return (
      <article
        data-task-id={task.id}
        data-task-status={task.status}
        data-task-sub={task.subScenario ?? ""}
        data-task-layout="compact"
        className={compactShell}
      >
        <h3 className="max-w-[7rem] shrink-0 truncate text-left text-sm font-semibold leading-none text-heading sm:max-w-[9rem]">
          {task.title}
        </h3>
        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <TaskProgressPill
            status={task.status}
            current={task.progress.current}
            total={task.progress.total}
            compact
          />
          {task.tags.map((tag, i) => (
            <TaskTag key={`${task.id}-tag-${i}`} label={tag} compact />
          ))}
        </div>
        <div className="relative flex shrink-0 items-center gap-0.5">
          {showQuickMark && quickAction ? (
            <button
              type="button"
              title={quickTooltip}
              aria-label={quickTooltip}
              onClick={() => onAction(task.id, quickAction)}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-neutral-200/90 bg-neutral-100/90 text-[#2563EB] transition hover:bg-white"
            >
              <IconCheckBlue className="h-3.5 w-3.5" />
            </button>
          ) : null}
          {showCompactInputMenu ? (
            <>
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-600"
                aria-expanded={compactMenuOpen}
                aria-haspopup="listbox"
                aria-label={c.actionsMenu}
                onClick={() => setCompactMenuOpen((v) => !v)}
              >
                <IconDotsHorizontal className="h-4 w-4" />
              </button>
              <InlineMenu open={compactMenuOpen} onClose={() => setCompactMenuOpen(false)} align="right">
                <CompactInputMenuItems
                  task={task}
                  c={c}
                  onAction={onAction}
                  onClose={() => setCompactMenuOpen(false)}
                />
              </InlineMenu>
            </>
          ) : (
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-600"
              aria-label="More"
            >
              <IconDotsHorizontal className="h-4 w-4" />
            </button>
          )}
        </div>
      </article>
    );
  }

  return (
    <article
      data-task-id={task.id}
      data-task-status={task.status}
      data-task-sub={task.subScenario ?? ""}
      data-task-layout="board"
      className={[
        "group relative flex flex-col rounded-xl border bg-white shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_6px_20px_-12px_rgba(15,23,42,0.1)]",
        "transition-[transform,box-shadow,border-color,opacity,max-height,ring] motion-reduce:transition-none [transition-duration:var(--task-status-transition-duration)] [transition-timing-function:var(--task-status-transition-ease)]",
        "hover:shadow-[0_1px_0_rgba(255,255,255,0.95)_inset,0_10px_28px_-14px_rgba(15,23,42,0.12)]",
        borderCls,
        density,
        emphasisCls,
        pulse ? "animate-task-status-flow" : "",
      ].join(" ")}
    >
      <div className="flex items-start gap-2">
        <h3 className={titleBoard}>{task.title}</h3>
        <div className="flex shrink-0 items-center gap-1">
          {showQuickMark && quickAction ? (
            <button
              type="button"
              title={quickTooltip}
              aria-label={quickTooltip}
              onClick={() => onAction(task.id, quickAction)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200/90 bg-neutral-100/90 text-[#2563EB] transition hover:bg-neutral-50"
            >
              <IconCheckBlue />
            </button>
          ) : null}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-600"
            aria-label="More"
          >
            <IconDotsHorizontal />
          </button>
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
        <TaskProgressPill status={task.status} current={task.progress.current} total={task.progress.total} />
        {task.tags.map((tag, i) => (
          <TaskTag key={`${task.id}-tag-${i}`} label={tag} />
        ))}
      </div>

      {task.status === "input_required" ? (
        <div className="mt-3 flex min-h-0 flex-col gap-2 transition-[opacity,transform] duration-200 ease-out">
          {task.subScenario === "review_required" ? (
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" className={btnPrimaryClass()} onClick={() => onAction(task.id, "accept")}>
                {c.review.accept}
              </button>
              <div className="relative inline-flex">
                <button
                  type="button"
                  className="rounded-l-lg border border-r-0 border-neutral-200/90 bg-white px-3 py-1.5 text-xs font-semibold text-heading transition hover:bg-neutral-50"
                  onClick={() => onAction(task.id, "improve")}
                >
                  {c.review.improve}
                </button>
                <button
                  type="button"
                  className="flex items-center rounded-r-lg border border-neutral-200/90 bg-white px-1.5 transition hover:bg-neutral-50"
                  aria-expanded={improveOpen}
                  aria-haspopup="listbox"
                  onClick={() => setImproveOpen((v) => !v)}
                >
                  <ChevronDown />
                </button>
                <InlineMenu open={improveOpen} onClose={() => setImproveOpen(false)}>
                  <MenuItem
                    onClick={() => {
                      setImproveOpen(false);
                      onAction(task.id, "regenerate");
                    }}
                  >
                    {c.review.regenerate}
                  </MenuItem>
                </InlineMenu>
              </div>
              <button type="button" className={btnGhostClass()} onClick={() => onAction(task.id, "reject")}>
                {c.review.reject}
              </button>
            </div>
          ) : null}

          {task.subScenario === "authorize_required" ? (
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative inline-flex shadow-[0_8px_20px_-10px_rgba(236,139,64,0.45)]">
                <button
                  type="button"
                  className="rounded-l-lg bg-[#EC8B40] px-3 py-1.5 text-xs font-semibold text-white transition hover:brightness-105"
                  onClick={() => onAction(task.id, "allow")}
                >
                  {c.auth.allow}
                </button>
                <button
                  type="button"
                  className="flex items-center rounded-r-lg border-l border-l-white/25 bg-[#EC8B40] px-1.5 text-white transition hover:brightness-105"
                  aria-expanded={allowOpen}
                  onClick={() => setAllowOpen((v) => !v)}
                >
                  <ChevronDown className="text-white/95" />
                </button>
                <InlineMenu open={allowOpen} onClose={() => setAllowOpen(false)} align="left">
                  <MenuItem
                    onClick={() => {
                      setAllowOpen(false);
                      onAction(task.id, "allow_room");
                    }}
                  >
                    {c.auth.allowRoom}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAllowOpen(false);
                      onAction(task.id, "allow_app");
                    }}
                  >
                    {c.auth.allowApp}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAllowOpen(false);
                      onAction(task.id, "allow_workspace");
                    }}
                  >
                    {c.auth.allowWs}
                  </MenuItem>
                </InlineMenu>
              </div>
              <button type="button" className={btnGhostClass()} onClick={() => onAction(task.id, "deny")}>
                {c.auth.deny}
              </button>
              <button type="button" className={btnGhostClass()} onClick={() => onAction(task.id, "ask")}>
                {c.auth.ask}
              </button>
            </div>
          ) : null}

          {task.subScenario === "action_required" ? (
            <div className="flex flex-wrap gap-2">
              <button type="button" className={btnPrimaryClass()} onClick={() => onAction(task.id, "continue")}>
                {c.action.continue}
              </button>
              <button type="button" className={btnGhostClass()} onClick={() => onAction(task.id, "submit")}>
                {c.action.submit}
              </button>
            </div>
          ) : null}

          {task.subScenario === "connect_required" ? (
            <div className="flex flex-wrap gap-2">
              <button type="button" className={btnPrimaryClass()} onClick={() => onAction(task.id, "connect")}>
                {c.connect.connect}
              </button>
              <button type="button" className={btnGhostClass()} onClick={() => onAction(task.id, "cancel_connect")}>
                {c.connect.cancel}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
