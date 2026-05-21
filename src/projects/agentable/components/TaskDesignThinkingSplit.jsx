import stateMachineDiagram from "../../../assets/agentable-task-approval-state-machine.png";

const COPY = {
  zh: {
    moduleTitle: "设计思考与状态预判",
    p1:
      "交互闭环的起点不是按钮样式，而是「下一状态是否可被用户预判」。在多 Agent 场景里，我把状态机当作产品契约：系统在什么时候必须停下来等人、什么时候可以静默推进、异常从哪条边退出——这些规则先于界面存在。",
    p2:
      "全局平衡上，我在三条张力之间找稳定点：对话里要轻、列表里要扫读、看板里要定位泳道；同一任务对象不能在三种容器里长成三套心智模型。预判式状态把主操作收敛到「当前唯一合理动作」，其余折叠为次级路径，从而降低并发下的认知抖动。",
    p3:
      "下图将主干路径与失败 / 取消分支并置，提醒设计不仅服务「 happy path」，也要让异常状态在系统里可定位、可恢复。",
    diagramAlt: "任务审批系统状态流转逻辑：产品思考与状态机设计",
  },
  en: {
    moduleTitle: "Design thinking & predictable states",
    p1:
      "A closed interaction loop starts with whether the next state is predictable—not with button chrome. In multi-agent settings, the state machine is the product contract: when the system must pause for a human, when it may advance silently, and which edges carry exceptions.",
    p2:
      "Globally, I balance three tensions: chat should feel light, lists scannable, boards lane-oriented—the same task object must not become three mental models. Predictable states converge the primary action to the one reasonable move now, tucking the rest into secondary paths to reduce cognitive jitter under concurrency.",
    p3:
      "The diagram below keeps the happy path alongside failure and cancel exits—design must serve recovery, not only the golden path.",
    diagramAlt: "Task approval state machine — product thinking",
  },
};

/**
 * @param {{ lang: 'zh' | 'en' }} props
 */
export default function TaskDesignThinkingSplit({ lang }) {
  const t = COPY[lang];

  return (
    <div className="rounded-2xl border border-neutral-200/50 bg-white/60 p-5 shadow-sm backdrop-blur-sm md:p-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 lg:items-start">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-heading md:text-2xl">{t.moduleTitle}</h3>
          <div className="mt-5 space-y-4 text-[15px] leading-[1.82] text-body md:text-base md:leading-[1.88]">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <p className="text-[14px] text-neutral-600 md:text-[15px]">{t.p3}</p>
          </div>
        </div>

        <div className="min-w-0 lg:pt-1">
          <figure className="overflow-hidden rounded-xl border border-neutral-200/70 bg-white shadow-[0_8px_28px_-12px_rgba(15,23,42,0.1)] ring-1 ring-neutral-900/[0.03]">
            <img src={stateMachineDiagram} alt={t.diagramAlt} className="block w-full" loading="lazy" decoding="async" />
          </figure>
        </div>
      </div>
    </div>
  );
}
