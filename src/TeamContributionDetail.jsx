import { Link } from "react-router-dom";
import BackToTopButton from "./components/BackToTopButton.jsx";
import { usePageTitle } from "./hooks/usePageTitle.js";
import TeamContributionDetailScaffold from "./projects/team-contribution/TeamContributionDetailScaffold.jsx";

const copy = {
  back: "返回首页",
  eyebrow: "Beyond Projects",
  title: "综合贡献 · 团队与产品",
  intro:
    "除项目交付外，我持续推动设计流程共建、业务规范搭建与跨部门协作，组织设计分享、用户研究分享与定期复盘；同时具备需求拆解与产品分析能力，用案例沉淀方法，帮助团队提效、对齐共识。",
  traits: [
    "设计贡献",
    "用研分享",
    "业务规范搭建",
    "需求分析能力",
  ],
};

export default function TeamContributionDetail() {
  const t = copy;
  usePageTitle(t.title);

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-heading">
      <main className="mx-auto max-w-6xl px-8 pb-20 pt-12 md:px-16 md:pt-16">
        <Link to="/" className="inline-flex text-sm text-body transition hover:text-[#6378DB]">
          {t.back}
        </Link>

        <section className="mt-8 rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] md:p-8">
          <p className="text-sm uppercase tracking-[0.16em] text-body">{t.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">{t.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-body">{t.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {t.traits.map((trait) => (
              <span
                key={trait}
                className="rounded-full border border-[#6378DB]/25 bg-[#F5F4FA] px-4 py-2 text-[13px] font-medium text-[#4A4A4A]"
              >
                {trait}
              </span>
            ))}
          </div>
        </section>

        <TeamContributionDetailScaffold />
      </main>

      <BackToTopButton />
    </div>
  );
}
