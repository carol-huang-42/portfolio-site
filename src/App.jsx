import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import profileHome from "./assets/profile-home.png";
import heroFirstScreen from "./assets/hero-first-screen.png";
import sectionBgPattern from "./assets/section-bg-pattern.png";
import projectAgentableCover from "./assets/project-agentable-cover.png";
import { aigcProjectCoverSrc } from "./projects/aigc-team/publicAssets.js";
import { androidTerminalProjectCoverSrc } from "./projects/android-terminal/publicAssets.js";
import { smartBuildingProjectCoverSrc } from "./projects/smart-building/publicAssets.js";
import { umeProjectCoverSrc } from "./projects/ume/publicAssets.js";
import { HeroIntroParagraphs } from "./HeroIntro.jsx";
import BackToTopButton from "./components/BackToTopButton.jsx";
import { usePageTitle } from "./hooks/usePageTitle.js";
import {
  projectCardCoverPlaceholderHoverClass,
  projectCardFeaturedHoverClass,
  projectCardHoverClass,
} from "./styles/projectCardUi.js";

/** @param {string} projectId */
function projectCoverSrc(projectId) {
  if (projectId === "agentable") return projectAgentableCover;
  if (projectId === "aigc-team") return aigcProjectCoverSrc();
  if (projectId === "ume") return umeProjectCoverSrc();
  if (projectId === "android-terminal") return androidTerminalProjectCoverSrc();
  if (projectId === "smart-building") return smartBuildingProjectCoverSrc();
  return null;
}

const copy = {
    siteTitle: "黄素知 · 交互设计作品集",
    navProjects: "项目",
    navEmail: "邮箱",
    navPhone: "电话",
    pageEyebrow: "",
    heroTitle: "交互设计作品集",
    introEyebrow: "Introduction",
    introBadges: ["产品设计师（交互）", "10年经验"],
    introEducation: "学历：本科 | 厦门理工 | 计算机软件服务工程",
    introTags: ["B端复杂流程", "AI 协作体验", "软硬件系统设计"],
    heroName: "黄素知",
    profilePlaceholder: "个人形象照占位",
    role: "产品 / 交互设计师",
    sectionEyebrow: "Featured Projects",
    sectionTitle: "项目作品",
    teamContributionLink: "综合贡献 · 团队与产品",
    teamContributionHint: "设计贡献、用研分享、业务规范、需求分析",
    coverPlaceholder: "Cover placeholder (Figma)",
    focus: "Featured",
    footerEyebrow: "Get in Touch",
    footerTitle: "感谢您的观看",
    footerP1: "希望有机会能与贵公司交流项目落地情况。",
    emailLabel: "邮箱",
    phoneLabel: "电话",
    copied: "已复制",
    clickToCopy: "点击联系方式即可复制",
    footerLine: "为清晰协作而设计",
    watermark: "黄素知",
    projects: [
      {
        id: "agentable",
        title: "Agentable AI 协作平台",
        summary:
          "项目背景：本项目旨在重构 AI 时代的生产力范式，服务于知识工作者，致力于为他们提高生产力，也为更多专业人士开放构建智能体应用的平台，协作共赢。本项目中我主要负责执行端与资产端的需求整理和痛点拆解以及设计方案的输出，解决了 AI 协作中信息碎片化与任务黑盒化的核心挑战。",
        tags: ["Multi-Agent", "HITL", "元数据驱动", "灵活小组件"],
        featured: true,
      },
      {
        id: "aigc-team",
        title: "AI图像生成平台与腾讯体验合作",
        summary:
          "建设公司内部 AI图像生成平台的体验治理机制；并长期为腾讯相关业务提供体验设计服务，保障多项目并行下的协作与交付质量，同时参与平台部分核心功能设计。",
        tags: ["体验治理", "跨团队协作", "AI图像生成平台", "腾讯合作"],
      },
      {
        id: "ume",
        title: "UME 企业办公协同软件",
        summary:
          "自主主导产品由聊天工具升级为企业办公协同平台，重构 PC 与移动端核心流程、信息架构与会议协作体验。",
        tags: ["改版重构", "多端协同", "信息架构", "会议体验"],
      },
      {
        id: "smart-building",
        title: "智慧大楼梯控访客系统",
        summary:
          "面向企业园区到访场景，重构访客申请繁琐、信息不同步、接待滞后等问题，打通预约、通知、会议协同与梯控派位全链路。",
        tags: ["智慧园区", "全链路重构", "多端协同", "设备联动"],
      },
      {
        id: "android-terminal",
        title: "会议场景硬件终端",
        summary:
          "聚焦会议场景下的白板、投屏、会议控制等能力，适配触控与遥控操作，保障多端体验统一；交互设计统筹系统层与软件层，全局提升体验合理性。",
        tags: ["会议场景", "触控与遥控", "多端一致", "系统+软件交互"],
      },
    ],
};

function App() {
  usePageTitle();
  /** @type {'email' | 'phone' | null} */
  const [copiedField, setCopiedField] = useState(null);
  const copyTimerRef = useRef(null);
  const [headerPinned, setHeaderPinned] = useState(false);
  const t = copy;
  const projects = t.projects;

  useEffect(() => {
    const handleScroll = () => {
      setHeaderPinned(window.scrollY > 20);
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
      <span className="text-xs font-medium text-accent">{t.copied}</span>
    </span>
  );

  return (
    <div className="min-h-screen bg-[#F6F5F1] text-heading">
      <header
        className={`sticky top-0 z-20 transition-all duration-300 ${
          headerPinned ? "border-b border-neutral-200/50 bg-[#F6F5F1]/92 backdrop-blur-md" : "px-6 pt-4"
        }`}
      >
        <div
          className={`mx-auto flex w-full items-center justify-between transition-all duration-300 ${
            headerPinned
              ? "h-16 max-w-7xl px-8 md:px-16"
              : "h-16 max-w-4xl rounded-full border border-neutral-200/80 bg-white/90 px-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] md:px-8"
          }`}
        >
          <p className="text-sm font-medium tracking-wide text-heading">{t.siteTitle}</p>
          <div className="flex items-center gap-6 text-sm text-body">
            <a href="#projects" className="transition hover:text-heading">
              {t.navProjects}
            </a>
            <a href="mailto:425431656@qq.com" className="transition hover:text-heading">
              {t.navEmail}
            </a>
            <a href="tel:15705924685" className="transition hover:text-heading">
              {t.navPhone}
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden pt-8 md:pt-10">
        <div className="absolute inset-0 bg-[#F1EFF0]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.55)_1px,transparent_1px)] bg-[size:38px_38px]" />
        <div className="relative z-[1] mx-auto max-w-[1400px] px-2 pb-6 md:px-4 md:pb-10">
          <img
            src={heroFirstScreen}
            alt="首屏视觉图"
            className="h-auto w-full object-contain [image-rendering:auto]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(246,245,241,0.12),rgba(246,245,241,0.34)_82%,rgba(243,241,235,0.48))]" />
      </section>

      <div className="relative isolate bg-[#F6F5F1]">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${sectionBgPattern})`,
            backgroundRepeat: "repeat-y",
            backgroundPosition: "top center",
            backgroundSize: "100% auto",
          }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-white/55" />

      <section className="bg-transparent">
        <div className="mx-auto max-w-6xl px-8 py-14 pb-16 md:px-14 md:py-16 md:pb-20 lg:py-20 lg:pb-24">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[35fr_65fr] md:items-center md:gap-x-14 lg:gap-x-20">
            <div className="mx-auto flex justify-center md:mx-0 md:justify-start">
              <div className="relative h-[min(280px,76vw)] w-[min(280px,76vw)] shrink-0 overflow-hidden rounded-full shadow-[0_12px_24px_-10px_rgba(15,23,42,0.08),0_28px_52px_-18px_rgba(30,41,59,0.14),0_46px_96px_-36px_rgba(30,41,59,0.12)] md:h-[min(300px,32vw)] md:w-[min(300px,32vw)]">
                <img
                  src={profileHome}
                  alt="黄素知形象照"
                  className="h-full w-full object-cover object-[58%_28%]"
                />
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-[12px] uppercase tracking-[0.14em] text-neutral-500">{t.introEyebrow}</p>
              <h2 className="mt-7 text-[40px] font-bold leading-[1.15] tracking-wide text-heading md:mt-9 md:text-[48px] md:leading-[1.1]">
                {t.heroName}
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {t.introBadges.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#F5F2ED] px-4 py-2 text-[13px] font-medium text-neutral-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <HeroIntroParagraphs />
              <p className="mt-10 text-[13px] leading-relaxed text-neutral-500">{t.introEducation}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {t.introTags.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-neutral-200/90 bg-white/80 px-4 py-1.5 text-xs text-body backdrop-blur-md transition-transform duration-200 ease-out hover:scale-[1.03]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-transparent px-8 py-10 md:px-14 md:py-12 lg:py-14" aria-hidden>
        <div className="mx-auto max-w-6xl md:px-0">
          <div
            className="h-px w-full bg-[repeating-linear-gradient(90deg,rgba(120,120,128,0.28)_0px,rgba(120,120,128,0.28)_7px,transparent_7px,transparent_16px)]"
          />
        </div>
      </div>

      <main
        id="projects"
        className="mx-auto max-w-7xl px-8 pb-24 pt-4 md:px-16 md:pt-6 lg:pt-8"
      >
        <div className="mb-12 flex items-end justify-between md:mb-14">
          <div>
            <p className="text-sm uppercase tracking-[0.16em] text-body">{t.sectionEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-body md:text-4xl">{t.sectionTitle}</h2>
          </div>
        </div>

        <div className="mb-10">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <article
                key={project.title}
                className={`group relative grid cursor-pointer grid-cols-1 gap-6 rounded-[14px] border border-white/50 bg-white/65 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] ring-1 ring-black/[0.05] backdrop-blur-xl ${projectCardFeaturedHoverClass} md:grid-cols-[1.1fr_0.9fr] md:p-8`}
              >
                <div className="relative z-0 block aspect-[16/10] w-full overflow-hidden rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-50 shadow-sm">
                  {projectCoverSrc(project.id) ? (
                    <>
                      <img
                        src={projectCoverSrc(project.id)}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
                      />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.06]" />
                    </>
                  ) : (
                    <>
                      <div className={projectCardCoverPlaceholderHoverClass} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <p className="text-xs tracking-[0.12em] text-body">{t.coverPlaceholder}</p>
                        <p className="text-sm font-medium text-heading">1600 × 1000</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="relative z-0 flex flex-col">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-semibold text-heading">
                      {project.title}
                    </h3>
                    <span className="shrink-0 rounded-md bg-[#B0BEFF] px-2 py-1 text-[10px] font-semibold text-heading">
                      {t.focus}
                    </span>
                  </div>

                  <p className="min-h-[72px] text-sm leading-6 text-body md:min-h-[104px]">
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
                <Link
                  to={`/projects/${project.id}`}
                  className="absolute inset-0 z-10 cursor-pointer rounded-[14px] outline-none ring-0 focus-visible:ring-2 focus-visible:ring-[#0F289D]/35"
                  aria-label={project.title}
                />
              </article>
            ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project) => (
            !project.featured &&
            <article
              key={project.title}
              className={`group relative flex h-full cursor-pointer flex-col rounded-[14px] border border-white/50 bg-white/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] ring-1 ring-black/[0.05] backdrop-blur-xl ${projectCardHoverClass}`}
            >
              <div className="relative z-0 mb-5 aspect-[16/10] w-full overflow-hidden rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-50">
                {projectCoverSrc(project.id) ? (
                  <img
                    src={projectCoverSrc(project.id)}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
                  />
                ) : (
                  <>
                    <div className={projectCardCoverPlaceholderHoverClass} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <p className="text-xs tracking-[0.12em] text-body">{t.coverPlaceholder}</p>
                      <p className="text-sm font-medium text-heading">1600 × 1000</p>
                    </div>
                  </>
                )}
              </div>

              <div className="relative z-0 mb-3 flex items-center justify-between gap-2">
                <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[17px] font-semibold text-heading">
                  {project.title}
                </h3>
              </div>

              <p className="relative z-0 min-h-[72px] text-sm leading-6 text-body">{project.summary}</p>

              <div className="relative z-0 mt-auto pt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[11px] text-body"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/projects/${project.id}`}
                className="absolute inset-0 z-10 cursor-pointer rounded-[14px] outline-none ring-0 focus-visible:ring-2 focus-visible:ring-[#0F289D]/35"
                aria-label={project.title}
              />
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-4 border-t border-dashed border-neutral-300/90 pt-10 md:mt-8">
          <p className="text-center text-sm text-body">{t.teamContributionHint}</p>
          <Link
            to="/team-contribution"
            className="group inline-flex items-center gap-2 border-b border-transparent pb-0.5 text-base font-medium text-heading transition hover:border-[#6378DB]/50 hover:text-[#6378DB]"
          >
            <span>{t.teamContributionLink}</span>
            <svg
              className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </main>

      <footer className="relative overflow-hidden border-t border-neutral-200/80 bg-[#EEF1F4]">
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-8 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-8 pb-8 pt-16 md:px-16 md:pb-10 md:pt-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
            <div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-body">{t.footerEyebrow}</p>
              <h3 className="mt-4 text-3xl font-semibold leading-tight text-heading md:text-4xl">{t.footerTitle}</h3>
              <p className="mt-4 max-w-xl text-base leading-8 text-body">
                {t.footerP1}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 md:p-6">
              <div className="grid grid-cols-1 gap-4 text-sm text-body">
                <button
                  type="button"
                  onClick={() => copyContact("email", "425431656@qq.com")}
                  className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left transition hover:border-accent/50"
                >
                  <span className="shrink-0 text-body">{t.emailLabel}</span>
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
                  <span className="shrink-0 text-body">{t.phoneLabel}</span>
                  <span className="flex min-h-[18px] justify-center">{copiedField === "phone" ? <CopiedInline /> : null}</span>
                  <span className="truncate font-medium text-heading group-hover:text-accent">
                    157 0592 4685
                  </span>
                </button>
              </div>
              <p className="mt-4 text-xs text-body">{t.clickToCopy}</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-neutral-200 pt-5 text-xs text-body md:mt-14 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Huang Suzhi Portfolio</p>
            <p>{t.footerLine}</p>
          </div>
        </div>
      </footer>
      </div>

      <BackToTopButton />
    </div>
  );
}

export default App;
