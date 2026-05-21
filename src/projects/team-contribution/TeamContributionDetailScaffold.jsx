import ProjectTabScaffold from "../../components/ProjectTabScaffold.jsx";
import {
  teamCaseBusinessStandardsSrc,
  teamCaseDesignContributionSrc,
  teamCaseRequirementsAnalysisSrc,
  teamCaseResearchSharingSrc,
} from "./publicAssets.js";

const TABS = [
  { id: "design", label: "设计贡献" },
  { id: "research", label: "用研分享" },
  { id: "standards", label: "业务规范搭建" },
  { id: "requirements", label: "需求分析能力" },
];

const PANELS = [
  {
    id: "design",
    figures: [
      {
        src: teamCaseDesignContributionSrc,
        alt: "综合贡献：设计贡献长图",
      },
    ],
  },
  {
    id: "research",
    figures: [
      {
        src: teamCaseResearchSharingSrc,
        alt: "综合贡献：用研分享长图",
      },
    ],
  },
  {
    id: "standards",
    figures: [
      {
        src: teamCaseBusinessStandardsSrc,
        alt: "综合贡献：业务规范搭建长图",
      },
    ],
  },
  {
    id: "requirements",
    figures: [
      {
        src: teamCaseRequirementsAnalysisSrc,
        alt: "综合贡献：需求分析能力长图",
      },
    ],
  },
];

export default function TeamContributionDetailScaffold() {
  return (
    <ProjectTabScaffold
      scope="team-contribution"
      tabs={TABS}
      panels={PANELS}
      defaultTab="design"
      canvasTone="warm"
    />
  );
}
