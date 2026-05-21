const SHELL_COPY = {
  zh: {
    agent: "Agent",
    newRoom: "New Room",
    favorites: "Favorites",
    first7: "First 7 days",
    history: "History",
    roomA: "Design sync",
    roomB: "Weekly review",
    roomC: "Backlog grooming",
    tabs: ["Chat", "Files", "Tasks", "Dashboard", "Board", "Gantt"],
    askPlaceholder: "Ask anything, @ to mention others",
    general: "General",
    addContext: "Add context",
    attach: "Attachments",
    voice: "Voice",
    send: "Send",
    stagedReject: "拒绝",
    stagedImprove: "改进",
    stagedAccept: "接受",
  },
  en: {
    agent: "Agent",
    newRoom: "New Room",
    favorites: "Favorites",
    first7: "First 7 days",
    history: "History",
    roomA: "Design sync",
    roomB: "Weekly review",
    roomC: "Backlog grooming",
    tabs: ["Chat", "Files", "Tasks", "Dashboard", "Board", "Gantt"],
    askPlaceholder: "Ask anything, @ to mention others",
    general: "General",
    addContext: "Add context",
    attach: "Attachments",
    voice: "Voice",
    send: "Send",
    stagedReject: "Reject",
    stagedImprove: "Improve",
    stagedAccept: "Accept",
  },
};

function NavIcon({ children }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200">
      {children}
    </div>
  );
}

function IconDoc({ className = "h-4 w-4 shrink-0 text-[#EC8B40]" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 2.5h5l4 4v7a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path d="M8.5 2.7V7H12" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}

function StagedOutputBar({ fileName, labels, onReject, onImprove, onAccept }) {
  return (
    <div className="mb-0 flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-[rgba(236,139,64,0.35)] bg-[rgba(236,139,64,0.1)] px-3 py-2 sm:gap-3">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <IconDoc />
        <span className="min-w-0 truncate text-xs font-medium text-heading">{fileName}</span>
      </div>
      <div className="flex flex-wrap items-center gap-1">
        <button
          type="button"
          onClick={onReject}
          className="rounded-md px-2 py-1 text-[11px] font-semibold text-neutral-600 transition hover:bg-white/60"
        >
          {labels.reject}
        </button>
        <button
          type="button"
          onClick={onImprove}
          className="rounded-md px-2 py-1 text-[11px] font-semibold text-neutral-600 transition hover:bg-white/60"
        >
          {labels.improve}
        </button>
        <button
          type="button"
          onClick={onAccept}
          className="rounded-md bg-[#EC8B40] px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm transition hover:brightness-105"
        >
          {labels.accept}
        </button>
      </div>
    </div>
  );
}

/**
 * @param {{
 *  lang: 'zh' | 'en';
 *  children: import('react').ReactNode;
 *  stagedFileName?: string | null;
 *  stagedTaskId?: string | null;
 *  onStagedAction?: (taskId: string, action: string) => void;
 * }} props
 */
export default function AgentableConversationShell({
  lang,
  children,
  stagedFileName = null,
  stagedTaskId = null,
  onStagedAction,
}) {
  const t = SHELL_COPY[lang];
  const chatIdx = 0;

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-[0_8px_30px_-18px_rgba(0,0,0,0.12)]">
      <div className="flex min-h-[min(520px,72vh)] w-full min-w-0 flex-row">
        {/* Global nav rail — always left sidebar (never top bar) */}
        <aside className="flex w-[52px] shrink-0 flex-col items-center gap-1 border-r border-zinc-800 bg-zinc-900 py-3">
          <NavIcon>
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M3 14V6l5-4 5 4v8H3Z" opacity="0.9" />
            </svg>
          </NavIcon>
          <NavIcon>
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden>
              <rect x="2.5" y="3" width="11" height="10" rx="1.5" strokeWidth="1.2" />
              <path d="M5 7h6M5 10h4" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </NavIcon>
          <NavIcon>
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden>
              <path d="M3 13V4l5 3 5-3v9" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
          </NavIcon>
          <NavIcon>
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" aria-hidden>
              <path d="M4 4h8v8H4z" strokeWidth="1.2" />
              <path d="M4 7h8M7 4v8" strokeWidth="1.2" />
            </svg>
          </NavIcon>
          <NavIcon>
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <circle cx="8" cy="5" r="1.8" />
              <circle cx="5" cy="11" r="1.5" />
              <circle cx="11" cy="11" r="1.5" />
            </svg>
          </NavIcon>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col md:flex-row">
          {/* Room list */}
          <aside className="w-full shrink-0 border-b border-neutral-200/80 bg-[#F6F5F7] md:w-[200px] md:border-b-0 md:border-r">
            <div className="flex items-center gap-2 border-b border-neutral-200/60 px-3 py-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                A
              </span>
              <span className="text-sm font-semibold text-heading">{t.agent}</span>
            </div>
            <div className="p-2">
              <button
                type="button"
                className="w-full rounded-lg bg-violet-600 py-2 text-center text-xs font-semibold text-white shadow-sm transition hover:bg-violet-700"
              >
                {t.newRoom}
              </button>
            </div>
            <div className="space-y-3 px-2 pb-4 text-[11px] text-neutral-500">
              <div>
                <p className="px-1 font-semibold uppercase tracking-wide text-neutral-400">{t.favorites}</p>
                <p className="mt-1 truncate rounded-md px-2 py-1.5 text-neutral-700 hover:bg-white/70">{t.roomA}</p>
              </div>
              <div>
                <p className="px-1 font-semibold uppercase tracking-wide text-neutral-400">{t.first7}</p>
                <p className="mt-1 truncate rounded-md px-2 py-1.5 text-neutral-700 hover:bg-white/70">{t.roomB}</p>
              </div>
              <div>
                <p className="px-1 font-semibold uppercase tracking-wide text-neutral-400">{t.history}</p>
                <p className="mt-1 truncate rounded-md px-2 py-1.5 text-neutral-700 hover:bg-white/70">{t.roomC}</p>
              </div>
            </div>
          </aside>

          {/* Main chat */}
          <div className="flex min-h-[320px] min-w-0 flex-1 flex-col bg-white">
            <div className="flex items-center gap-1 overflow-x-auto border-b border-neutral-200/80 px-2 py-2">
              {t.tabs.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  className={[
                    "shrink-0 rounded-md px-2.5 py-1.5 text-xs font-semibold transition",
                    i === chatIdx
                      ? "text-violet-700 ring-1 ring-violet-200/80 bg-violet-50/80"
                      : "text-neutral-500 hover:bg-neutral-50 hover:text-heading",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto bg-[#FAFAFA] p-3">
              <div className="mx-auto max-w-3xl space-y-2.5">{children}</div>
            </div>

            <div className="border-t border-neutral-200/80 bg-[#F6F5F7] p-2">
              {stagedFileName && stagedTaskId && onStagedAction ? (
                <StagedOutputBar
                  fileName={stagedFileName}
                  labels={{
                    reject: t.stagedReject,
                    improve: t.stagedImprove,
                    accept: t.stagedAccept,
                  }}
                  onReject={() => onStagedAction(stagedTaskId, "reject")}
                  onImprove={() => onStagedAction(stagedTaskId, "improve")}
                  onAccept={() => onStagedAction(stagedTaskId, "accept")}
                />
              ) : null}
              <div
                className={[
                  "rounded-xl border border-neutral-200/90 bg-white shadow-sm",
                  stagedFileName && stagedTaskId ? "rounded-t-none border-t-0" : "",
                ].join(" ")}
              >
                <div className="px-3 py-2.5">
                  <p className="text-xs text-neutral-400">{t.askPlaceholder}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-neutral-100 px-2 py-1.5">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-[10px] font-medium text-neutral-600"
                    >
                      {t.general} ▾
                    </button>
                    <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500">
                      gpt-4o
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5 text-neutral-400">
                    <button type="button" className="rounded-md p-1.5 hover:bg-neutral-100" title={t.addContext}>
                      +
                    </button>
                    <button type="button" className="rounded-md p-1.5 hover:bg-neutral-100" title={t.attach}>
                      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path
                          d="M9.5 4.5v5.2a2.2 2.2 0 1 1-4.4 0V4a2.7 2.7 0 0 1 5.4 0v6"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <button type="button" className="rounded-md p-1.5 hover:bg-neutral-100" title={t.voice}>
                      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                        <path d="M8 10a2 2 0 0 0 2-2V5a2 2 0 1 0-4 0v3a2 2 0 0 0 2 2Zm-3.5 1V11a3.5 3.5 0 0 0 7 0v-1" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="ml-1 flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white hover:bg-violet-700"
                      title={t.send}
                    >
                      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                        <path d="M3 13 13 8 3 3l2 5-2 5Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
