import ProjectTabScaffold from "../../components/ProjectTabScaffold.jsx";

const narrativeFigureSrc = () =>
  `${import.meta.env.BASE_URL}agentable/agentable-case-narrative-overview.png`;

const userInsightsFigureSrc = () =>
  `${import.meta.env.BASE_URL}agentable/agentable-case-user-insights.png`;

const knowledgeStrategyFigureSrc = () =>
  `${import.meta.env.BASE_URL}agentable/agentable-case-knowledge-strategy.png`;

const keyInterfaceFigureSrc = () =>
  `${import.meta.env.BASE_URL}agentable/agentable-case-key-strategy.png`;

const keyInterfaceComponentsFigureSrc = () =>
  `${import.meta.env.BASE_URL}agentable/agentable-case-key-components.png`;

const TABS = [
  { id: "insights", label: "用户与洞察" },
  { id: "chat", label: "聊天设计策略" },
  { id: "kb", label: "知识库设计策略" },
  { id: "key", label: "关键界面展示" },
];

const PANELS = [
  {
    id: "insights",
    figures: [{ src: userInsightsFigureSrc, alt: "用户与洞察：长图说明" }],
  },
  {
    id: "chat",
    figures: [
      {
        src: narrativeFigureSrc,
        alt: "聊天设计策略：项目背景、用户与洞察、方案策略与设计等信息图",
      },
    ],
  },
  {
    id: "kb",
    figures: [{ src: knowledgeStrategyFigureSrc, alt: "知识库设计策略：长图说明" }],
  },
  {
    id: "key",
    figures: [
      { src: keyInterfaceFigureSrc, alt: "关键界面展示：长图说明" },
      { src: keyInterfaceComponentsFigureSrc, alt: "关键界面展示：组件相关长图" },
    ],
  },
];

export default function AgentableDetailScaffold() {
  return (
    <ProjectTabScaffold
      scope="agentable"
      tabs={TABS}
      panels={PANELS}
      defaultTab="chat"
      canvasTone="cool"
    />
  );
}
