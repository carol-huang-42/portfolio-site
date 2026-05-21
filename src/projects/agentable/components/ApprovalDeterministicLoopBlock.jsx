const COPY = {
  zh: {
    sectionLabel: "SECTION 02",
    title: "确定性闭环：AI 任务审批工作流设计",
    body:
      "在 A2A 协议基础上，我细化了 Review、Accept、Reject、Improve 四大核心节点，确保复杂任务在人机协作中具备完整的逻辑链路。",
    diagramCaption: "输入需审批的框架 — 完整审批场景",
    diagramAlt: "Input-Required Approval Framework：四类人机协作审批场景总览",
  },
  en: {
    sectionLabel: "SECTION 02",
    title: "Deterministic loop: AI task-approval workflow",
    body:
      "On top of A2A, I tightened Review, Accept, Reject, and Improve as four core nodes so complex tasks keep a complete human–agent chain.",
    diagramCaption: "Input-required approval — full scenario map",
    diagramAlt: "Unified framework: Task review, Authorization, Action, Connection",
  },
};

const line = "border-[0.5px] border-slate-200/90";

const frameworkSrc = () => `${import.meta.env.BASE_URL}agentable/section02-input-required-framework.png`;

/**
 * @param {{ lang: 'zh' | 'en' }} props
 */
export default function ApprovalDeterministicLoopBlock({ lang }) {
  const t = COPY[lang];
  const src = frameworkSrc();

  return (
    <div className="mb-10 grid grid-cols-1 gap-8 border-b-[0.5px] border-slate-200/60 pb-10 lg:mb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-10 lg:pb-12">
      <div className="max-w-md lg:pt-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{t.sectionLabel}</p>
        <h2 className="mt-3 text-[1.45rem] font-semibold leading-snug tracking-tight text-slate-900 md:text-2xl md:leading-tight">{t.title}</h2>
        <p className="mt-4 text-[15px] leading-[1.85] text-slate-600 md:text-base md:leading-[1.9]">{t.body}</p>
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">{t.diagramCaption}</p>
        <figure
          className={`mt-2 overflow-hidden rounded-xl ${line} bg-[#F4F5F7] shadow-[0_14px_44px_-18px_rgba(15,23,42,0.12),0_4px_16px_-4px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/[0.04]`}
        >
          <img src={src} alt={t.diagramAlt} className="block w-full" loading="lazy" decoding="async" />
        </figure>
      </div>
    </div>
  );
}
