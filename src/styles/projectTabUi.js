/** @typedef {"warm" | "cool"} ProjectTabCanvasTone */

const tabBtnBase = "rounded-full px-4 py-2.5 text-sm font-medium transition sm:px-5";

const tabBtnSelectedBase =
  "bg-white font-semibold text-[#6378DB] shadow-sm ring-2 ring-[#6378DB] ring-offset-2";

const tabBtnIdle =
  "bg-white/80 text-body ring-1 ring-neutral-200/90 hover:bg-white hover:text-heading";

/** 详情页 Tab 吸顶条：全站统一 sticky + 背景延展至 main 内边距 */
const tabBarBase =
  "sticky top-0 z-30 -mx-8 border-b border-neutral-200/80 px-8 py-3 backdrop-blur-md md:-mx-16 md:px-16 supports-[backdrop-filter]:backdrop-blur-md";

/** @type {Record<ProjectTabCanvasTone, { bar: string; ringOffset: string }>} */
export const PROJECT_TAB_CANVAS = {
  warm: {
    bar: `${tabBarBase} bg-[#F4EFE6]/95 supports-[backdrop-filter]:bg-[#F4EFE6]/88`,
    ringOffset: "ring-offset-[#F4EFE6]",
  },
  cool: {
    bar: `${tabBarBase} bg-[#F1EFF0]/95 supports-[backdrop-filter]:bg-[#F1EFF0]/88`,
    ringOffset: "ring-offset-[#F1EFF0]",
  },
};

/** @param {ProjectTabCanvasTone} [tone] */
export function projectTabBarClass(tone = "warm") {
  return PROJECT_TAB_CANVAS[tone].bar;
}

/** @param {ProjectTabCanvasTone} [tone] */
export function projectTabButtonClasses(tone = "warm") {
  const { ringOffset } = PROJECT_TAB_CANVAS[tone];
  return {
    base: tabBtnBase,
    selected: `${tabBtnSelectedBase} ${ringOffset}`,
    idle: tabBtnIdle,
  };
}

export const projectTabFigureClass =
  "overflow-hidden rounded-2xl border border-neutral-200 bg-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.04)]";

/** block + h-auto：高度随图片，避免 img 默认 inline 产生底部空隙 */
export const projectTabImgClass =
  "block h-auto w-full object-contain object-top [image-rendering:auto]";
