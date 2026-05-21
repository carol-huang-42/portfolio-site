import { useState } from "react";
import { MULTIVIEW_FIG_CAPTION, MULTIVIEW_NARRATIVE, MULTIVIEW_TAB_ASSETS, MULTIVIEW_TAB_ORDER } from "../approvalCaseModel.js";

const base = () => `${import.meta.env.BASE_URL}agentable`;

/**
 * @param {{ lang: 'zh' | 'en' }} props
 */
export default function MultiviewAdaptationPanel({ lang }) {
  const n = MULTIVIEW_NARRATIVE[lang];
  const fig = MULTIVIEW_FIG_CAPTION[lang];
  const [tab, setTab] = useState(/** @type {import('../approvalCaseModel.js').MultiviewTabId} */ ("chat"));
  const [imgBroken, setImgBroken] = useState(false);
  const asset = MULTIVIEW_TAB_ASSETS[tab][lang];
  const src = `${base()}/${asset.file}`;

  return (
    <div className="mt-10 rounded-[20px] bg-gradient-to-br from-white/45 via-slate-50/35 to-blue-50/25 px-5 py-8 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.12)] backdrop-blur-xl md:mt-12 md:px-8 md:py-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)] lg:gap-12 lg:items-start">
        <header className="max-w-xl lg:sticky lg:top-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{n.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.65rem] md:leading-snug">
            {n.title}
          </h2>
          <p className="mt-4 text-[15px] leading-[1.85] text-slate-600 md:text-base md:leading-[1.9]">{n.body}</p>
        </header>

        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            {MULTIVIEW_TAB_ORDER.map((id) => {
              const { label } = MULTIVIEW_TAB_ASSETS[id][lang];
              const on = tab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setTab(id);
                    setImgBroken(false);
                  }}
                  className={[
                    "rounded-full px-3.5 py-2 text-left text-[12px] font-semibold transition [transition-duration:180ms]",
                    on
                      ? "bg-blue-600/[0.14] text-blue-950 shadow-sm ring-1 ring-blue-400/40"
                      : "bg-white/50 text-slate-600 ring-1 ring-transparent hover:bg-blue-50/85 hover:text-blue-950 hover:ring-blue-200/60",
                  ].join(" ")}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl bg-white/55 shadow-[0_18px_50px_-22px_rgba(30,58,138,0.18)] ring-1 ring-blue-950/[0.06] backdrop-blur-md">
            <div className="relative min-h-[220px] bg-gradient-to-b from-slate-50/90 to-white/80 md:min-h-[280px]">
              {!imgBroken ? (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="mx-auto block h-auto w-full max-h-[min(52vh,520px)] object-contain object-top px-2 pt-3 pb-2 md:px-4 md:pt-4"
                  onError={() => setImgBroken(true)}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 px-6 text-center md:min-h-[280px]">
                  <p className="text-[12px] font-medium text-slate-500">{asset.label}</p>
                  <p className="max-w-sm text-[11px] leading-relaxed text-slate-400">
                    {lang === "zh"
                      ? `将切图保存为 public/agentable/${asset.file} 后自动显示。`
                      : `Save your frame as public/agentable/${asset.file} to load it here.`}
                  </p>
                </div>
              )}
            </div>
            <div className="border-t border-emerald-200/55 bg-emerald-50/95 px-4 py-2.5 text-center backdrop-blur-sm">
              <p className="text-[11px] font-semibold tracking-wide text-emerald-950">{fig}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
