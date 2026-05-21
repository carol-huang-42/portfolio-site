import TaskClosedLoopModule from "./TaskClosedLoopModule.jsx";
import TaskDesignThinkingSplit from "./TaskDesignThinkingSplit.jsx";

const COPY = {
  zh: {
    sectionLabel: "SECTION 01",
    title: "任务状态的全局闭环设计",
    subtitle: "从并发协作的失控边缘，拉回可预判、可编排、可审计的任务对象。",
    painTitle: "场景痛点",
    painBody:
      "当多个智能体在同一工作流里并行推进时，任务状态不再是静态标签，而是协作的「共同语言」：一次分支推理、一条待确认输出，都会在极短时间内改变其他人的可行域。若不能在发起、执行与裁决之间建立可预判的状态机，闭环就会退化成碎片化的私聊与不可追溯的口头约定。设计上的关键，是把状态前置为一等公民——用户始终面对同一任务对象，系统背后则是可对齐、可编排、可审计的全链路流转。",
  },
  en: {
    sectionLabel: "SECTION 01",
    title: "Global closed-loop design for task states",
    subtitle: "Pulling multi-agent collaboration back from chaos toward predictable, orchestratable, auditable work objects.",
    painTitle: "Why this matters",
    painBody:
      "When several agents advance the same workflow in parallel, task state is not a static badge—it is the shared language of collaboration. Each branch, each pending artifact shifts what others can do next, often within seconds. Without a predictable state machine between initiation, execution, and judgment, the loop collapses into fragmented chat and tacit agreements. The design move is to elevate state to a first-class citizen: one task object in the UI, with an orchestrated, alignable, auditable backbone underneath.",
  },
};

/**
 * @param {{ lang: 'zh' | 'en' }} props
 */
export default function TaskGlobalClosedLoopSection({ lang }) {
  const t = COPY[lang];

  return (
    <section
      id="agentable-task-closed-loop"
      className="mt-12 rounded-[20px] border border-neutral-200/55 bg-[rgba(248,247,248,0.92)] px-5 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] md:mt-16 md:px-10 md:py-12"
    >
      <header className="max-w-4xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">{t.sectionLabel}</p>
        <h2 className="mt-3 text-[1.65rem] font-semibold leading-tight tracking-tight text-heading md:text-4xl md:leading-[1.15]">
          {t.title}
        </h2>
        <p className="mt-4 text-base font-medium leading-relaxed text-neutral-600 md:text-lg md:leading-8">
          {t.subtitle}
        </p>
      </header>

      <div className="mt-12 space-y-12 md:space-y-14">
        <div className="rounded-2xl border border-neutral-200/40 bg-white/35 px-5 py-8 md:px-8 md:py-9">
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">{t.painTitle}</h3>
          <p className="mt-4 max-w-[46rem] text-[15px] leading-[1.85] text-body md:text-base md:leading-[1.9]">
            {t.painBody}
          </p>
        </div>

        <TaskDesignThinkingSplit lang={lang} />
      </div>

      <div className="mt-14 border-t border-neutral-200/60 pt-10 md:mt-16 md:pt-12">
        <TaskClosedLoopModule lang={lang} embedded />
      </div>
    </section>
  );
}
