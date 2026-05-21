const STEPS = {
  zh: [
    { code: "01", title: "Intent Recognition", sub: "意图识别" },
    { code: "02", title: "Auth Check", sub: "权限校验" },
    { code: "03", title: "Handshake", sub: "协议握手" },
  ],
  en: [
    { code: "01", title: "Intent Recognition", sub: "Intent" },
    { code: "02", title: "Auth Check", sub: "Authorization" },
    { code: "03", title: "Handshake", sub: "Negotiation" },
  ],
};

/**
 * 左栏：深色调协议逻辑框（矩阵感）
 */
export default function ProtocolMatrixPanel({ lang }) {
  const steps = STEPS[lang];
  const title = "A2A (Agent-to-Agent) 协议深度建模";

  return (
    <div className="relative overflow-hidden rounded-xl border-[0.5px] border-cyan-500/20 bg-zinc-950 text-cyan-100/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.12) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(34,211,238,0.08) 0.5px, transparent 0.5px)",
          backgroundSize: "100% 6px, 8px 100%",
        }}
      />
      <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative p-5 sm:p-6">
        <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/85">{title}</h3>
        <div className="mt-6 space-y-0">
          {steps.map((s, i) => (
            <div key={s.code} className="flex gap-3">
              <div className="flex w-8 flex-col items-center">
                <span className="font-mono text-[10px] text-cyan-400/90">{s.code}</span>
                {i < steps.length - 1 ? (
                  <div className="mt-1 flex-1 w-px min-h-[2.25rem] bg-gradient-to-b from-cyan-500/40 to-cyan-500/0" aria-hidden />
                ) : null}
              </div>
              <div className="min-w-0 flex-1 pb-5">
                <div className="rounded-lg border-[0.5px] border-cyan-500/25 bg-black/30 px-3 py-2.5 backdrop-blur-sm">
                  <p className="font-mono text-[13px] font-medium tracking-wide text-cyan-50">{s.title}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-cyan-300/70">{s.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="relative mt-2 pl-11 font-mono text-[9px] leading-relaxed text-cyan-500/55">
          {lang === "zh" ? "// state: NEGOTIATING → AWAIT_HUMAN" : "// state: NEGOTIATING → AWAIT_HUMAN"}
        </p>
      </div>
    </div>
  );
}
