import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Agentable AI 协作平台",
    summary:
      "负责对话与知识库两大核心模块设计，围绕人机协作闭环、元数据驱动与灵活组件展示，构建清晰可执行的信息交互体系，持续提升平台协作效率与整体体验。",
    tags: ["Multi-Agent", "HITL", "元数据驱动", "灵活小组件"],
    featured: true,
  },
  {
    title: "UME 协同软件改版",
    summary: "将产品从聊天工具升级为协同办公平台，重构多端流程并强化会议协作体验。",
    tags: ["改版重构", "协同办公", "信息架构"],
  },
  {
    title: "智慧大楼梯控访客系统",
    summary: "打通访客预约、到访通知、会议联动与梯控派位，优化企业接待全流程体验。",
    tags: ["智慧园区", "全链路流程", "设备联动"],
  },
  {
    title: "安卓硬件终端系列",
    summary: "主导高端话机改版与 IWB 新品设计，统一软硬件交互模式，保障系列化一致性。",
    tags: ["软硬件一体", "终端交互", "系列化规范"],
  },
  {
    title: "AIGC 平台与服务团队",
    summary: "构建设计治理机制与跨团队协作流程，提升多项目并行阶段的交付稳定性。",
    tags: ["体验治理", "跨团队协作", "AIGC 平台"],
  },
];

function App() {
  /** @type {'email' | 'phone' | null} */
  const [copiedField, setCopiedField] = useState(null);
  const copyTimerRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight * 0.85);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    };
  }, []);

  const copyContact = async (field, text) => {
    try {
      await navigator.clipboard.writeText(text);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      setCopiedField(field);
      copyTimerRef.current = window.setTimeout(() => {
        setCopiedField(null);
        copyTimerRef.current = null;
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const CopiedInline = () => (
    <span className="inline-flex items-center gap-1">
      <svg
        className="h-3.5 w-3.5 shrink-0 text-accent"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M13.5 4L6 11.5L2.5 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-xs font-medium text-accent">已复制</span>
    </span>
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-bg-site text-heading">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute right-[-80px] top-[180px] h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-20 border-b border-neutral-200/70 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8 md:px-16">
          <p className="text-sm font-medium tracking-wide text-heading">HUANG SUZHI · UX PORTFOLIO</p>
          <div className="flex items-center gap-6 text-sm text-body">
            <a href="#projects" className="transition hover:text-heading">
              项目
            </a>
            <a href="mailto:425431656@qq.com" className="transition hover:text-heading">
              邮箱
            </a>
            <a href="tel:15705924685" className="transition hover:text-heading">
              电话
            </a>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-8 pb-12 pt-20 md:px-16 md:pb-16 md:pt-24">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_240px] md:gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
          <div>
            <p className="mb-6 inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-body">
              10年资深交互设计师 · B端复杂系统 · AI协作产品
            </p>
            <h1 className="max-w-5xl text-4xl font-semibold leading-[1.28] tracking-tight md:text-6xl md:leading-[1.22]">
              10年交互设计经验，
              <br />
              聚焦<span className="text-accent">B端复杂业务与AI协作场景</span>
            </h1>
            <p className="mt-10 max-w-4xl text-base leading-8 text-body md:text-lg">
              长期参与企业级产品设计，覆盖 AI 协作平台、协同办公软件与软硬件终端项目。
              工作重点是将业务需求转化为清晰可执行的交互方案，涵盖功能梳理、信息架构与关键页面设计。
            </p>
          </div>

          <div className="mx-auto w-full max-w-[280px] md:mx-0">
            <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-50">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <p className="text-[11px] tracking-[0.14em] text-body">PROFILE PHOTO</p>
                  <p className="text-sm font-medium text-heading">600 × 750</p>
                </div>
              </div>
              <div className="mt-3 rounded-lg bg-neutral-50 px-3 py-2">
                <p className="text-xs text-body">Product / Interaction Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main id="projects" className="mx-auto max-w-7xl px-8 pb-24 md:px-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.16em] text-body">Selected Works</p>
            <h2 className="mt-3 text-3xl font-semibold text-body md:text-4xl">项目作品</h2>
          </div>
        </div>

        <div className="mb-8">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <article
                key={project.title}
                className="group grid grid-cols-1 gap-6 rounded-card border border-neutral-200 bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] md:grid-cols-2 md:p-7"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-50">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <p className="text-xs tracking-[0.12em] text-body">FIGMA COVER PLACEHOLDER</p>
                    <p className="text-sm font-medium text-heading">1600 × 1000</p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-semibold text-heading">
                      {project.title}
                    </h3>
                    <span className="shrink-0 rounded-md bg-accent px-2 py-1 text-[10px] font-semibold text-white">
                      FOCUS
                    </span>
                  </div>

                  <p className="min-h-[72px] text-sm leading-6 text-body md:min-h-[96px]">
                    {project.summary}
                  </p>

                  <div className="mt-auto pt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[11px] text-body"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            !project.featured &&
            <article
              key={project.title}
              className="group flex h-full flex-col rounded-card border border-neutral-200 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-50">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <p className="text-xs tracking-[0.12em] text-body">FIGMA COVER PLACEHOLDER</p>
                  <p className="text-sm font-medium text-heading">1600 × 1000</p>
                </div>
              </div>

              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[17px] font-semibold text-heading">
                  {project.title}
                </h3>
              </div>

              <p className="min-h-[72px] text-sm leading-6 text-body">{project.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[11px] text-body"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="relative overflow-hidden border-t border-neutral-200 bg-white">
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-8 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-8 pb-8 pt-16 md:px-16 md:pb-10 md:pt-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-body">Let&apos;s Connect</p>
              <h3 className="mt-4 text-3xl font-semibold leading-tight text-heading md:text-4xl">
                Thanks for watching
              </h3>
              <p className="mt-4 max-w-xl text-base leading-8 text-body">
                欢迎联系我交流 B 端复杂系统与 AI 协作产品设计，
                也欢迎沟通更多关于作品集与项目落地的合作机会。
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 md:p-6">
              <div className="grid grid-cols-1 gap-4 text-sm text-body">
                <button
                  type="button"
                  onClick={() => copyContact("email", "425431656@qq.com")}
                  className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left transition hover:border-accent/50"
                >
                  <span className="shrink-0 text-body">Email</span>
                  <span className="flex min-h-[18px] justify-center">{copiedField === "email" ? <CopiedInline /> : null}</span>
                  <span className="truncate font-medium text-heading group-hover:text-accent">
                    425431656@qq.com
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => copyContact("phone", "157 0592 4685")}
                  className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left transition hover:border-accent/50"
                >
                  <span className="shrink-0 text-body">Phone</span>
                  <span className="flex min-h-[18px] justify-center">{copiedField === "phone" ? <CopiedInline /> : null}</span>
                  <span className="truncate font-medium text-heading group-hover:text-accent">
                    157 0592 4685
                  </span>
                </button>
              </div>
              <p className="mt-4 text-xs text-body">点击联系方式即可复制</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-neutral-200 pt-5 text-xs text-body md:mt-14 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Huang Suzhi Portfolio</p>
            <p>Designed for clarity, crafted for collaboration.</p>
          </div>
        </div>
      </footer>

      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-heading shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
        >
          回到顶部
        </button>
      )}
    </div>
  );
}

export default App;
