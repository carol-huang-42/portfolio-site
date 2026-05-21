import { Link, useParams } from "react-router-dom";
import projectAgentableCover from "./assets/project-agentable-cover.png";
import AndroidTerminalKeyScreens from "./projects/android-terminal/AndroidTerminalKeyScreens.jsx";
import { aigcSitePreviewSrc } from "./projects/aigc-team/publicAssets.js";
import { smartBuildingSitePreviewSrc } from "./projects/smart-building/publicAssets.js";
import { umeSitePreviewSrc } from "./projects/ume/publicAssets.js";
import BackToTopButton from "./components/BackToTopButton.jsx";
import { usePageTitle } from "./hooks/usePageTitle.js";
import ProjectCaseSections from "./components/ProjectCaseSections.jsx";
import AgentableDetailScaffold from "./projects/agentable/AgentableDetailScaffold.jsx";
import AigcDetailScaffold from "./projects/aigc-team/AigcDetailScaffold.jsx";
import SmartBuildingDetailScaffold from "./projects/smart-building/SmartBuildingDetailScaffold.jsx";
import UmeDetailScaffold from "./projects/ume/UmeDetailScaffold.jsx";

const TAB_CASE_PROJECT_IDS = new Set(["aigc-team", "ume", "smart-building"]);

const HIDE_PREVIEW_PROJECT_IDS = new Set(["android-terminal"]);

/** @type {Record<string, () => string>} */
const sitePreviewSrcByProject = {
  "aigc-team": aigcSitePreviewSrc,
  ume: umeSitePreviewSrc,
  "smart-building": smartBuildingSitePreviewSrc,
};

const detailCopy = {
  back: "返回首页",
  metaRole: "角色",
  metaCycle: "周期",
  metaTeam: "团队",
  preview: "网站预览",
  previewHint: "这里可替换为项目首页截图、关键界面或在线演示链接。",
  sections: {
    overview: "项目概述",
  },
  placeholders: {
    overview:
      "这里放项目背景、业务场景与核心问题。建议 3-5 行，讲清楚为什么要做这个项目。",
  },
  notFound: "未找到该项目",
};

const projectMeta = {
  agentable: {
    title: "Agentable AI 协作平台",
    summary:
      "项目背景：本项目旨在重构 AI 时代的生产力范式，服务于知识工作者，致力于为他们提高生产力，也为更多专业人士开放构建智能体应用的平台，协作共赢。本项目中我主要负责执行端与资产端的需求整理和痛点拆解以及设计方案的输出，解决了 AI 协作中信息碎片化与任务黑盒化的核心挑战。",
    role: "高级交互设计师（主导）",
    cycle: "2025.03 - 2026.03",
    team: "交互1 · 视觉2 · 开发4",
    overview:
      "项目背景：本项目旨在重构 AI 时代的生产力范式，服务于知识工作者，致力于为他们提高生产力，也为更多专业人士开放构建智能体应用的平台，协作共赢。本项目中我主要负责执行端与资产端的需求整理和痛点拆解以及设计方案的输出，解决了 AI 协作中信息碎片化与任务黑盒化的核心挑战。",
    figureAlt: "Agentable AI 协作平台：案例长图",
  },
  ume: {
    title: "UME 协同软件改版",
    summary: "从聊天工具升级到协同办公平台，重构核心工作流。",
    role: "交互设计师（项目leader）",
    cycle: "2023.08 - 2023.10",
    team: "交互1 · 视觉2 · 研发5+",
    figureAlt: "UME 协同软件改版：案例长图",
  },
  "smart-building": {
    title: "智慧大楼梯控访客系统",
    summary:
      "面向企业园区到访场景，重构传统访客申请繁琐、信息不同步、接待响应滞后等核心问题。",
    role: "交互设计负责人",
    cycle: "2022.03 - 2024.03",
    team: "交互 · 视觉 · PM · 研发（PC / 移动端 / Web / 管理后台）",
    overview:
      "主导梯控与访客系统整体体验升级，覆盖访客预约、到访通知、会议协同与楼宇设备联动等关键环节，打通 PC 客户端、移动端、Web、管理后台，并与内部协作软件、梯控系统、会议系统互联。围绕「到访前—到访中—到访后」设计全链路流程，实现到访状态实时同步；结合会议场景触发会议室设备智能联动，并引入电梯提前派位能力，显著降低沟通成本、提升接待效率与信息透明度。",
    figureAlt: "智慧大楼梯控访客系统：案例长图",
  },
  "android-terminal": {
    title: "会议场景硬件终端",
    summary:
      "聚焦会议场景下的白板、投屏、会议控制等能力，适配触控与遥控操作，保障多端体验统一。",
    role: "交互设计师",
    cycle: "2023年以前",
    team: "交互1 · 设计1 · PM1 · 开发3+",
    overview:
      "本项目面向企业会议硬件终端，覆盖白板书写、无线投屏、会议控制等典型场景。交互方案兼顾大屏触控与遥控操作，并在手机、终端、会控等多端保持体验一致。设计时将系统层能力边界与软件层界面逻辑联合论证，从全局视角规避软硬件脱节带来的体验断点，提升会议协作的可用性与合理性。",
    figureAlt: "会议场景硬件终端：关键界面长图",
  },
  "aigc-team": {
    title: "AIGC 平台与腾讯体验合作",
    summary:
      "建设公司内部 AIGC 生图平台的体验治理机制；并长期为腾讯相关业务提供体验设计服务，保障多项目并行下的协作与交付质量，同时参与平台部分核心功能设计。",
    role: "高级交互设计师",
    cycle: "2024.03 - 2025.03",
    team: "交互 · 视觉 · 跨职能协作（产品 / 研发等）",
    overview:
      "并行负责两条业务线：一是公司内部 AIGC 生图平台，建立体验治理规范与跨团队协作机制，并参与部分核心功能的交互设计；二是与腾讯团队的长期体验设计合作，覆盖需求梳理、走查评估与方案交付，支撑多项目并行下的稳定产出。",
    figureAlt: "AIGC 平台与腾讯体验合作：案例长图",
  },
};

export default function ProjectDetail() {
  const { projectId } = useParams();
  const t = detailCopy;
  const project = projectMeta[projectId];

  if (!project) {
    return (
      <div className="mx-auto max-w-5xl px-8 py-20 text-heading">
        <p className="text-xl font-semibold">{t.notFound}</p>
        <Link to="/" className="mt-6 inline-flex text-sm text-accent hover:underline">
          {t.back}
        </Link>
      </div>
    );
  }

  usePageTitle(project.title);

  const overviewText = project.overview ?? project.summary ?? t.placeholders.overview;
  const usesTabCase = TAB_CASE_PROJECT_IDS.has(projectId);
  const hidePreview = HIDE_PREVIEW_PROJECT_IDS.has(projectId);
  const sitePreviewSrc = sitePreviewSrcByProject[projectId];

  return (
    <div className={`min-h-screen text-heading ${projectId === "agentable" ? "bg-[#F1EFF0]" : "bg-[#F4EFE6]"}`}>
      <main className="mx-auto max-w-6xl px-8 pb-20 pt-12 md:px-16 md:pt-16">
        <Link to="/" className="inline-flex text-sm text-body hover:text-accent">
          {t.back}
        </Link>

        <section className="mt-8 rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] md:p-8">
          <div
            className={`grid grid-cols-1 gap-6 ${hidePreview ? "" : "lg:grid-cols-[1.15fr_0.85fr]"}`}
          >
            <div>
              <h1 className="text-3xl font-semibold md:text-4xl">{project.title}</h1>
              <div className="mt-4 max-w-3xl space-y-3 text-base leading-7 text-body">
                <p>{project.summary}</p>
                {project.overview ? <p>{project.overview}</p> : null}
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 text-sm text-body sm:grid-cols-3">
                <div className="rounded-lg border border-neutral-200 bg-white px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em]">{t.metaRole}</p>
                  <p className="mt-1 font-medium text-heading">{project.role}</p>
                </div>
                <div className="rounded-lg border border-neutral-200 bg-white px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em]">{t.metaCycle}</p>
                  <p className="mt-1 font-medium text-heading">{project.cycle}</p>
                </div>
                <div className="rounded-lg border border-neutral-200 bg-white px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em]">{t.metaTeam}</p>
                  <p className="mt-1 font-medium leading-relaxed text-heading">{project.team}</p>
                </div>
              </div>
            </div>

            {!hidePreview ? (
              <div
                className={
                  projectId === "agentable" || sitePreviewSrc
                    ? "overflow-hidden rounded-xl border border-neutral-200 bg-white"
                    : "rounded-xl border border-neutral-200 bg-white p-4"
                }
              >
                <p
                  className={`text-xs uppercase tracking-[0.14em] text-body ${
                    projectId === "agentable" || sitePreviewSrc ? "px-3 pt-3" : ""
                  }`}
                >
                  {t.preview}
                </p>
                <div
                  className={
                    projectId === "agentable" || sitePreviewSrc
                      ? "aspect-[16/10] w-full overflow-hidden"
                      : "mt-3 aspect-[16/10] overflow-hidden rounded-lg border border-neutral-200 bg-[linear-gradient(135deg,#F5F5F5,#EDEDED)] p-4"
                  }
                >
                  {projectId === "agentable" ? (
                    <img
                      src={projectAgentableCover}
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  ) : sitePreviewSrc ? (
                    <img
                      src={sitePreviewSrc()}
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div className="h-full w-full rounded-md border border-dashed border-neutral-300 bg-white/70 px-4 py-3">
                      <p className="text-sm font-medium text-heading">{project.title}</p>
                      <p className="mt-2 text-xs leading-6 text-body">{t.previewHint}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {projectId === "android-terminal" ? (
          <AndroidTerminalKeyScreens />
        ) : !usesTabCase ? (
          <ProjectCaseSections
            projectId={projectId}
            overviewTitle={t.sections.overview}
            overviewText={overviewText}
            figureAlt={project.figureAlt ?? `${project.title}：案例长图`}
          />
        ) : null}

        {projectId === "agentable" ? <AgentableDetailScaffold /> : null}
        {projectId === "aigc-team" ? <AigcDetailScaffold /> : null}
        {projectId === "ume" ? <UmeDetailScaffold /> : null}
        {projectId === "smart-building" ? <SmartBuildingDetailScaffold /> : null}
      </main>

      <BackToTopButton />
    </div>
  );
}
