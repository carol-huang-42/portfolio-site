/** 泳道表头与卡片内进度图标 — 对齐看板参考稿 */

export function IconDotsHorizontal({ className = "h-4 w-4 text-neutral-400" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <circle cx="3" cy="8" r="1.5" />
      <circle cx="8" cy="8" r="1.5" />
      <circle cx="13" cy="8" r="1.5" />
    </svg>
  );
}

/** 泳道：Pending — 细线空心圆 */
export function IconColumnPending({ className = "h-5 w-5 text-neutral-500" }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

/** 泳道：In-Progress — 橙色进度环感 */
export function IconColumnInProgress({ className = "h-5 w-5 text-[#EC8B40]" }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeOpacity="0.22" strokeWidth="2" />
      <path
        d="M10 3a7 7 0 0 1 7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** 泳道：Input-required — 文档/清单 */
export function IconColumnInputRequired({ className = "h-5 w-5 text-[#EC8B40]" }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M6 3.5h5.2L15.5 7.6V16.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M11 3.7V8h3.8" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M7.5 11h5M7.5 13.2h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/** 泳道：Complete */
export function IconColumnComplete({ className = "h-5 w-5 text-emerald-500" }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7" fill="currentColor" />
      <path
        d="M6.2 10.1 8.6 12.5 13.8 7.3"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 泳道：Failed */
export function IconColumnFailed({ className = "h-5 w-5 text-red-500" }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7" fill="currentColor" />
      <path
        d="M10 6.2v4.2M10 13.5v.1"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** 泳道：Canceled */
export function IconColumnCanceled({ className = "h-5 w-5 text-neutral-400" }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7" fill="currentColor" />
      <path d="M6.8 6.8 13.2 13.2M13.2 6.8 6.8 13.2" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function columnHeaderIcon(columnId) {
  switch (columnId) {
    case "pending":
      return IconColumnPending;
    case "in_progress":
      return IconColumnInProgress;
    case "input_required":
      return IconColumnInputRequired;
    case "completed":
      return IconColumnComplete;
    case "failed":
      return IconColumnFailed;
    case "canceled":
      return IconColumnCanceled;
    default:
      return IconColumnPending;
  }
}

/** 卡片内进度条左侧小图标（与状态色一致） */
export function IconProgressGlyph({ status, className = "h-3.5 w-3.5 shrink-0" }) {
  const wrap = (node) => (
    <span className={`inline-flex items-center justify-center ${className}`}>{node}</span>
  );
  switch (status) {
    case "pending":
      return wrap(
        <svg viewBox="0 0 14 14" fill="none" className="block h-full w-full text-neutral-400" aria-hidden>
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.1" />
        </svg>,
      );
    case "in_progress":
      return wrap(
        <svg viewBox="0 0 14 14" fill="none" className="block h-full w-full text-[#EC8B40]" aria-hidden>
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
          <path d="M7 2a5 5 0 0 1 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>,
      );
    case "input_required":
      return wrap(
        <svg viewBox="0 0 14 14" fill="none" className="block h-full w-full text-[#EC8B40]" aria-hidden>
          <path
            d="M3.5 2.5h3.5l3 2.8v6.2a.6.6 0 0 1-.6.6H3.5a.6.6 0 0 1-.6-.6V3.1a.6.6 0 0 1 .6-.6Z"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path d="M7 2.6V6h2.9" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        </svg>,
      );
    case "completed":
      return wrap(
        <svg viewBox="0 0 14 14" fill="none" className="block h-full w-full text-emerald-500" aria-hidden>
          <circle cx="7" cy="7" r="4.8" fill="currentColor" />
          <path d="M4.2 7 6 8.8 9.8 5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>,
      );
    case "failed":
      return wrap(
        <svg viewBox="0 0 14 14" fill="none" className="block h-full w-full text-red-500" aria-hidden>
          <circle cx="7" cy="7" r="4.8" fill="currentColor" />
          <path d="M7 4.2V7M7 9.2v.1" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        </svg>,
      );
    case "canceled":
      return wrap(
        <svg viewBox="0 0 14 14" fill="none" className="block h-full w-full text-neutral-400" aria-hidden>
          <circle cx="7" cy="7" r="4.8" fill="currentColor" />
          <path d="M4.5 4.5 9.5 9.5M9.5 4.5 4.5 9.5" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
        </svg>,
      );
    default:
      return wrap(
        <svg viewBox="0 0 14 14" fill="none" className="block h-full w-full text-neutral-400" aria-hidden>
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.1" />
        </svg>,
      );
  }
}
