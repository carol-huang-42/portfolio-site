const caseFigureSrc = (projectId) =>
  `${import.meta.env.BASE_URL}projects/${projectId}/case-overview.png`;

const figureWrapClass =
  "overflow-hidden rounded-2xl border border-neutral-200 bg-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.04)]";

/**
 * @param {{
 *   projectId: string;
 *   overviewTitle: string;
 *   overviewText: string;
 *   figureAlt: string;
 * }} props
 */
export default function ProjectCaseSections({
  projectId,
  overviewTitle,
  overviewText,
  figureAlt,
}) {
  return (
    <section className="mt-8 space-y-6" aria-label="案例正文">
      <article className="rounded-2xl border border-neutral-200 bg-white/70 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-heading">{overviewTitle}</h2>
        <p className="mt-3 text-sm leading-7 text-body md:text-base md:leading-8">
          {overviewText}
        </p>
      </article>

      <figure className={figureWrapClass}>
        <img
          src={caseFigureSrc(projectId)}
          alt={figureAlt}
          className="w-full object-contain object-top [image-rendering:auto]"
          loading="lazy"
          decoding="async"
        />
      </figure>
    </section>
  );
}
