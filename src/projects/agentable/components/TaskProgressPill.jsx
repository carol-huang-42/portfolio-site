import { IconProgressGlyph } from "./TaskBoardIcons.jsx";

/**
 * 进度药丸：图标 + current/total；Input-required 为略凹陷浅底（参考稿）
 * @param {{ status: string; current: number; total: number }} props
 */
export default function TaskProgressPill({ status, current, total, compact = false }) {
  const isInput = status === "input_required";
  const fractionCls =
    status === "in_progress" || status === "input_required"
      ? "text-[#EC8B40] tabular-nums"
      : status === "completed"
        ? "text-emerald-600 tabular-nums"
        : status === "failed"
          ? "text-red-600 tabular-nums"
          : status === "canceled"
            ? "text-neutral-500 tabular-nums"
            : "text-neutral-500 tabular-nums";

  const pad = compact ? "px-1.5 py-px" : "px-2 py-0.5";
  const text = compact ? "text-[10px]" : "text-[11px]";
  const glyphCls = compact ? "h-3 w-3 shrink-0" : "h-3.5 w-3.5 shrink-0";

  return (
    <span
      className={[
        "inline-flex shrink-0 items-center gap-0.5 rounded-md border",
        pad,
        isInput
          ? "border-neutral-200/80 bg-neutral-100/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
          : "border-neutral-200/90 bg-white",
      ].join(" ")}
    >
      <IconProgressGlyph status={status} className={glyphCls} />
      <span className={`${text} font-medium leading-none ${fractionCls}`}>
        {current}/{total}
      </span>
    </span>
  );
}
