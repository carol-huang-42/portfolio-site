import { androidTerminalCaseKeyScreensSrc } from "./publicAssets.js";
import { projectTabFigureClass, projectTabImgClass } from "../../styles/projectTabUi.js";

/** 硬件终端详情：单块「关键界面展示」，内含会议场景长图 */
export default function AndroidTerminalKeyScreens() {
  return (
    <section className="mt-8" aria-label="关键界面展示">
      <article className="rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] md:p-8">
        <h2 className="text-xl font-semibold text-heading">关键界面展示</h2>
        <figure className={`mt-6 ${projectTabFigureClass}`}>
          <img
            src={androidTerminalCaseKeyScreensSrc()}
            alt="会议场景硬件终端：关键界面长图"
            className={projectTabImgClass}
            loading="eager"
            decoding="async"
          />
        </figure>
      </article>
    </section>
  );
}
