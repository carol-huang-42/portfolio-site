/** @typedef {"warm" | "cool"} ProjectTabCanvasTone */

/** @type {Record<ProjectTabCanvasTone, { bar: string; ringOffset: string }>} */
export const PROJECT_TAB_CANVAS = {
  warm: {
    bar: "sticky top-0 z-30 border-b border-neutral-200/80 bg-[#F4EFE6]/95 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-[#F4EFE6]/88",
    ringOffset: "ring-offset-[#F4EFE6]",
  },
  cool: {
    bar: "sticky top-0 z-30 border-b border-neutral-200/80 bg-[#F1EFF0]/95 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-[#F1EFF0]/88",
    ringOffset: "ring-offset-[#F1EFF0]",
  },
};

export const projectTabBtnBase = "rounded-full px-4 py-2.5 text-sm font-medium transition sm:px-5";

/** @param {ProjectTabCanvasTone} tone */
export function projectTabBtnSelected(tone) {
  const { ringOffset } = PROJECT_TAB_CANVAS[tone];
  return `bg-white font-semibold text-[#6378DB] shadow-sm ring-2 ring-[#6378DB] ring-offset-2 ${ringOffset}`;
}

export const projectTabBtnIdle =
  "bg-white/80 text-body ring-1 ring-neutral-200/90 hover:bg-white hover:text-heading";

export const projectTabFigureClass =
  "overflow-hidden rounded-2xl border border-neutral-200 bg-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.04)]";

export const projectTabImgClass = "w-full object-contain object-top [image-rendering:auto]";
