import ProjectTabScaffold from "../../components/ProjectTabScaffold.jsx";
import {
  aigcCaseKeyGenPlatformSrc,
  aigcCaseKeyOutsourcedMobileSrc,
  aigcCaseMobileSsvSrc,
  aigcCaseMobileTencentGameSrc,
  aigcCaseProjectContentSrc,
} from "./publicAssets.js";

const TABS = [
  { id: "content", label: "项目内容" },
  { id: "key", label: "关键界面" },
  { id: "mobile", label: "移动端项目" },
];

const PANELS = [
  {
    id: "content",
    figures: [
      {
        src: aigcCaseProjectContentSrc,
        alt: "项目内容：设计过程与协作介绍长图",
      },
    ],
  },
  {
    id: "key",
    figures: [
      {
        src: aigcCaseKeyGenPlatformSrc,
        alt: "关键界面：图像生成平台长图",
        caption: "图像生成平台",
      },
      {
        src: aigcCaseKeyOutsourcedMobileSrc,
        alt: "关键界面：腾讯合作移动端项目长图",
        caption: "腾讯合作 · 移动端",
      },
    ],
  },
  {
    id: "mobile",
    figures: [
      {
        src: aigcCaseMobileSsvSrc,
        alt: "腾讯 SSV 公益项目：移动端案例长图",
        caption: "腾讯 SSV 公益项目",
      },
      {
        src: aigcCaseMobileTencentGameSrc,
        alt: "腾讯游戏项目：移动端案例长图",
        caption: "腾讯游戏项目",
      },
    ],
  },
];

export default function AigcDetailScaffold() {
  return (
    <ProjectTabScaffold scope="aigc" tabs={TABS} panels={PANELS} defaultTab="content" canvasTone="warm" />
  );
}
