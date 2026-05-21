const COPY = {
  zh: {
    caption: "全局状态流（抽象）",
    nodes: ["发起", "执行", "节点判断", "完结"],
    hint: "「节点判断」聚合输入审批、授权、补充信息与连接确认等分支，再收敛为单一出口。",
  },
  en: {
    caption: "Global state flow (abstract)",
    nodes: ["Initiate", "Execute", "Decision", "Close"],
    hint: "The decision stage folds review, auth, input, and connect paths into one convergent gate before closure.",
  },
};

function Arrow() {
  return (
    <div className="flex shrink-0 items-center px-0.5 text-neutral-300" aria-hidden>
      <svg className="h-4 w-6" viewBox="0 0 24 16" fill="none">
        <path d="M2 8h14M14 4l6 4-6 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/**
 * @param {{ lang: 'zh' | 'en' }} props
 */
export default function StateFlowDiagram({ lang }) {
  const t = COPY[lang];
  const nodes = t.nodes;

  return (
    <figure className="relative overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-white/55 via-white/35 to-neutral-100/40 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_12px_40px_-24px_rgba(15,23,42,0.12)] backdrop-blur-md md:p-6">
      <div className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full bg-[rgba(236,139,64,0.07)] blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-[rgba(139,92,246,0.06)] blur-2xl" />

      <figcaption className="relative text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
        {t.caption}
      </figcaption>

      <div className="relative mt-4 flex flex-wrap items-center justify-center gap-y-2 md:flex-nowrap md:justify-between">
        {nodes.map((label, i) => (
          <div key={label} className="flex items-center">
            {i > 0 ? <Arrow /> : null}
            <div
              className={[
                "min-w-[5.5rem] rounded-xl border px-3 py-2.5 text-center text-xs font-semibold shadow-sm backdrop-blur-sm transition md:min-w-[6.25rem] md:text-[13px]",
                i === 2
                  ? "border-[#EC8B40]/35 bg-[rgba(236,139,64,0.11)] text-[#9a5410]"
                  : "border-white/70 bg-white/50 text-heading",
              ].join(" ")}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      <p className="relative mt-4 max-w-2xl text-[12px] leading-relaxed text-neutral-500 md:text-[13px]">{t.hint}</p>
    </figure>
  );
}
