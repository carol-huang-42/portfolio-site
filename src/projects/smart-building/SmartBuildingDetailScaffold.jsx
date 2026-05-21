import ProjectTabScaffold from "../../components/ProjectTabScaffold.jsx";
import {
  smartBuildingCaseDesignStrategySrc,
  smartBuildingCaseKeyScreensSrc,
} from "./publicAssets.js";

const TABS = [
  { id: "strategy", label: "设计策略" },
  { id: "key", label: "关键界面" },
];

const PANELS = [
  {
    id: "strategy",
    figures: [
      {
        src: smartBuildingCaseDesignStrategySrc,
        alt: "智慧大楼梯控访客系统：设计策略长图",
      },
    ],
  },
  {
    id: "key",
    figures: [
      {
        src: smartBuildingCaseKeyScreensSrc,
        alt: "智慧大楼梯控访客系统：关键界面长图",
      },
    ],
  },
];

export default function SmartBuildingDetailScaffold() {
  return (
    <ProjectTabScaffold
      scope="smart-building"
      tabs={TABS}
      panels={PANELS}
      defaultTab="strategy"
    />
  );
}
