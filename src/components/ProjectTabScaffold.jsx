import { useState } from "react";
import {
  projectTabBarClass,
  projectTabButtonClasses,
  projectTabFigureClass,
  projectTabImgClass,
} from "../styles/projectTabUi.js";

/** @typedef {"warm" | "cool"} ProjectTabCanvasTone */
/** @typedef {{ id: string; label: string }} TabSpec */
/** @typedef {{ src: () => string; alt: string; caption?: string }} FigureSpec */
/** @typedef {{ id: string; figures: FigureSpec[] }} PanelSpec */

/**
 * @param {{
 *   scope: string;
 *   tabs: TabSpec[];
 *   panels: PanelSpec[];
 *   defaultTab?: string;
 *   canvasTone?: ProjectTabCanvasTone;
 * }} props
 */
export default function ProjectTabScaffold({
  scope,
  tabs,
  panels,
  defaultTab,
  canvasTone = "warm",
}) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id ?? "");
  const tabBarClass = projectTabBarClass(canvasTone);
  const tabBtn = projectTabButtonClasses(canvasTone);

  const selectTab = (id) => {
    setActive(id);
  };

  return (
    <section className="mt-10" aria-label="案例呈现">
      <div className={tabBarClass}>
        <div role="tablist" aria-label="案例内容切换" className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const selected = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`${scope}-tab-${tab.id}`}
                aria-controls={`${scope}-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectTab(tab.id)}
                className={`${tabBtn.base} ${selected ? tabBtn.selected : tabBtn.idle}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 仅渲染当前 Tab：避免多面板叠放导致容器被最长图撑高 */}
      <div className="mt-6">
        {panels.map((panel) => {
          const selected = active === panel.id;
          if (!selected) return null;
          return (
            <div
              key={panel.id}
              role="tabpanel"
              id={`${scope}-panel-${panel.id}`}
              aria-labelledby={`${scope}-tab-${panel.id}`}
              className="min-w-0"
            >
              <div className="space-y-6">
                {panel.figures.map((figure, index) => (
                  <div key={`${panel.id}-${index}`} className="space-y-3">
                    {figure.caption ? (
                      <h3 className="text-lg font-semibold text-heading">{figure.caption}</h3>
                    ) : null}
                    <figure className={projectTabFigureClass}>
                      <img
                        src={figure.src()}
                        alt={figure.alt}
                        className={projectTabImgClass}
                        loading="eager"
                        decoding="async"
                      />
                    </figure>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
