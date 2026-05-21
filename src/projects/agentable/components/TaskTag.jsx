/** 标签药丸：左侧小标签图标 + 文案（参考稿 Event Tags / Tags） */

function IconTagGlyph({ className = "h-3 w-3 shrink-0 text-neutral-400" }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.2 5.8 5.9 2.1h3.5v3.5L5.7 9.3a1 1 0 0 1-1.4 0L2.5 7.5a1 1 0 0 1 0-1.4Z"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <circle cx="7.6" cy="4.4" r="0.55" fill="currentColor" />
    </svg>
  );
}

export default function TaskTag({ label, compact = false }) {
  const pad = compact ? "px-1.5 py-px" : "px-2 py-0.5";
  const text = compact ? "text-[10px]" : "text-[11px]";
  const glyph = compact ? "h-2.5 w-2.5" : "h-3 w-3";
  return (
    <span
      className={`inline-flex max-w-full shrink-0 items-center gap-0.5 rounded-full border border-neutral-200/90 bg-white ${pad} ${text} text-neutral-500`}
    >
      <IconTagGlyph className={`${glyph} shrink-0 text-neutral-400`} />
      <span className="max-w-[7rem] truncate sm:max-w-[9rem]">{label}</span>
    </span>
  );
}
