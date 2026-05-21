import ProjectTabScaffold from "../../components/ProjectTabScaffold.jsx";
import {
  umeCaseDesignThinkingSrc,
  umeCaseKeyScreensSrc,
  umeCaseRequirementsSrc,
} from "./publicAssets.js";

const TABS = [
  { id: "thinking", label: "设计思路" },
  { id: "requirements", label: "需求分析拆解" },
  { id: "key", label: "关键界面" },
];

const PANELS = [
  {
    id: "thinking",
    figures: [
      {
        src: umeCaseDesignThinkingSrc,
        alt: "UME 企业办公协同软件：设计思路长图",
      },
    ],
  },
  {
    id: "requirements",
    figures: [
      {
        src: umeCaseRequirementsSrc,
        alt: "UME 企业办公协同软件：需求分析拆解长图",
      },
    ],
  },
  {
    id: "key",
    figures: [
      {
        src: umeCaseKeyScreensSrc,
        alt: "UME 企业办公协同软件：关键界面长图",
      },
    ],
  },
];

export default function UmeDetailScaffold() {
  return (
    <ProjectTabScaffold scope="ume" tabs={TABS} panels={PANELS} defaultTab="thinking" />
  );
}
