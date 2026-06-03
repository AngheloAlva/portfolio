import { AppMockup, WireframeGlyph } from "@/components/app-mockup";
import { getProjectMockup } from "@/components/mockups/registry";
import { Reveal } from "@/components/reveal";
import { SectionCorners } from "@/components/section-corners";
import {
  CATEGORY_LABELS,
  type CaseStudyMilestoneIcon,
  type ParagraphBlock,
  type ProjectData,
} from "@/lib/portfolio-data";
import {
  CircleDot,
  Flag,
  FlaskConical,
  Hammer,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const MILESTONE_ICONS: Record<CaseStudyMilestoneIcon, LucideIcon> = {
  kickoff: Flag,
  build: Hammer,
  beta: FlaskConical,
  launch: Rocket,
  current: CircleDot,
};

function hasHeadline(
  block: ParagraphBlock,
): block is { headline: string; body: string } {
  return typeof block !== "string";
}

function ParagraphBlocks({
  blocks,
}: {
  blocks: ReadonlyArray<ParagraphBlock>;
}): ReactNode {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) =>
        hasHeadline(block) ? (
          <div key={i} className="space-y-2">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {block.headline}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {block.body}
            </p>
          </div>
        ) : (
          <p
            key={i}
            className="text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {block}
          </p>
        ),
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }): ReactNode {
  return (
    <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
      {children}
    </p>
  );
}

/** Editorial two-column section: sticky label on the left, content on the right. */
function EditorialSection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}): ReactNode {
  return (
    <Reveal>
      <section className="relative border-b border-border p-6 sm:p-10 lg:p-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14">
          <div>
            <div className="lg:sticky lg:top-28">
              <SectionLabel>{label}</SectionLabel>
            </div>
          </div>
          <div className="max-w-3xl">{children}</div>
        </div>
        <SectionCorners />
      </section>
    </Reveal>
  );
}

export function CaseStudyView({ project }: { project: ProjectData }): ReactNode {
  const cs = project.caseStudy;
  if (!cs) return null;

  const meta = [
    { label: "Cliente", value: cs.clientName },
    { label: "Duración", value: cs.duration },
    { label: "En producción", value: cs.inProductionSince },
    ...(cs.team ? [{ label: "Mi rol", value: cs.team }] : []),
  ];
  const metaColsClass = meta.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  const mockup = getProjectMockup(project.id);
  const Hero = mockup?.hero;

  return (
    <main id="main-content" className="flex-1">
      {/* Hero */}
      <section className="relative border-b border-border">
        <div className="px-6 pt-8 sm:px-10 sm:pt-10 lg:px-14">
          <Link
            href="/#proyectos"
            className="focus-ring inline-flex items-center gap-2 rounded-sm font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <span aria-hidden="true">←</span> Proyectos
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16 lg:border-r lg:border-border lg:px-14 lg:py-20">
            <SectionLabel>
              {cs.clientIndustry} · {CATEGORY_LABELS[project.category]}
            </SectionLabel>
            <h1 className="mt-6 text-4xl font-medium leading-[1.05] tracking-tighter text-foreground sm:text-5xl lg:text-[4rem]">
              {project.title}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {cs.pitch}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-background transition-opacity hover:opacity-90"
                >
                  Visitar sitio
                  <span aria-hidden="true">↗</span>
                </a>
              ) : null}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-muted-foreground"
                >
                  GitHub
                  <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center bg-muted p-6 sm:p-10 lg:p-14">
            {Hero ? (
              <Hero label={project.title} />
            ) : (
              <AppMockup label={project.title} />
            )}
          </div>
        </div>

        <div className={`grid grid-cols-2 border-t border-border ${metaColsClass}`}>
          {meta.map((item) => (
            <div
              key={item.label}
              className="border-border px-6 py-8 sm:px-10 lg:border-l lg:px-14 lg:first:border-l-0"
            >
              <SectionLabel>{item.label}</SectionLabel>
              <p className="mt-3 text-sm leading-snug text-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {cs.userBreakdown ? (
          <div className="border-t border-border px-6 py-6 sm:px-10 lg:px-14">
            <SectionLabel>Usuarios</SectionLabel>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {cs.userBreakdown}
            </p>
          </div>
        ) : null}

        {cs.visualPrivacy === "confidential-ui" ? (
          <div className="border-t border-border bg-muted px-6 py-5 sm:px-10 lg:px-14">
            <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Mockup ilustrativo. El sistema real es privado por acuerdo con el
              cliente — sin capturas ni datos reales.
            </p>
          </div>
        ) : null}
        <SectionCorners />
      </section>

      {/* Problema */}
      <EditorialSection label="El problema">
        <ParagraphBlocks blocks={cs.problem} />
      </EditorialSection>

      {/* Solución */}
      <EditorialSection label="La solución">
        <ParagraphBlocks blocks={cs.solution} />
      </EditorialSection>

      {/* Métricas */}
      {cs.metrics.length > 0 ? (
        <Reveal>
          <section className="relative border-b border-border p-6 sm:p-10 lg:p-14">
            <SectionLabel>En números</SectionLabel>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {cs.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    {metric.value}
                  </p>
                  <p className="mt-3 text-sm font-medium text-foreground">
                    {metric.label}
                  </p>
                  {metric.caption ? (
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {metric.caption}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
            <SectionCorners />
          </section>
        </Reveal>
      ) : null}

      {/* Arquitectura */}
      <EditorialSection label="Arquitectura">
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {cs.architectureDescription}
        </p>
        {cs.techStackIntro ? (
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {cs.techStackIntro}
          </p>
        ) : null}
      </EditorialSection>

      {/* Decisiones técnicas */}
      {cs.techStackDetailed.length > 0 ? (
        <Reveal>
          <section className="relative border-b border-border">
            <div className="px-6 pt-6 sm:px-10 sm:pt-10 lg:px-14 lg:pt-14">
              <SectionLabel>Decisiones técnicas</SectionLabel>
            </div>
            <div className="mt-10 border-t border-border lg:mt-14">
              {cs.techStackDetailed.map((item) => (
                <div
                  key={item.name}
                  className="grid grid-cols-1 gap-x-14 gap-y-3 border-b border-border px-6 py-7 sm:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] sm:px-10 sm:py-8 lg:px-14"
                >
                  <div className="flex flex-wrap items-start gap-2">
                    <h3 className="text-lg font-semibold leading-tight tracking-tight text-foreground">
                      {item.name}
                    </h3>
                    {item.tag ? (
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                        {item.tag}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>
            <SectionCorners />
          </section>
        </Reveal>
      ) : null}

      {/* Funcionalidades — bento */}
      {cs.features.length > 0 ? (
        <Reveal>
          <section className="relative border-b border-border p-6 sm:p-10 lg:p-14">
            <SectionLabel>Funcionalidades</SectionLabel>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr lg:gap-6">
              {cs.features.map((feature, i) => {
                const isLead = i === 0;
                const FeatureGlyph = mockup?.features?.[feature.title];
                const glyphClass = isLead
                  ? "flex-1 min-h-40 sm:min-h-52"
                  : "flex-1 min-h-24";
                return (
                  <article
                    key={feature.title}
                    className={`flex flex-col rounded-2xl bg-muted p-6 sm:p-7 ${
                      isLead
                        ? "sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2"
                        : ""
                    }`}
                  >
                    {FeatureGlyph ? (
                      <FeatureGlyph className={glyphClass} />
                    ) : (
                      <WireframeGlyph variant={i} className={glyphClass} />
                    )}
                    <div className="mt-5 flex shrink-0 flex-col">
                      <h3
                        className={`font-semibold leading-tight tracking-tight text-foreground ${
                          isLead ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
            <SectionCorners />
          </section>
        </Reveal>
      ) : null}

      {/* Línea de tiempo */}
      {cs.timeline && cs.timeline.length > 0 ? (
        <Reveal>
          <section className="relative border-b border-border p-6 sm:p-10 lg:p-14">
            <SectionLabel>Línea de tiempo</SectionLabel>
            <ol className="mt-10 space-y-0">
              {cs.timeline.map((milestone, i) => {
                const Icon = MILESTONE_ICONS[milestone.icon];
                const isLast = i === cs.timeline!.length - 1;
                return (
                  <li
                    key={milestone.title}
                    className="relative flex gap-5 pb-10 last:pb-0"
                  >
                    {!isLast ? (
                      <span
                        aria-hidden="true"
                        className="absolute top-11 bottom-0 left-5 w-px bg-border"
                      />
                    ) : null}
                    <span
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
                        milestone.isCurrent
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <div className="pt-1.5">
                      <SectionLabel>{milestone.date}</SectionLabel>
                      <h3 className="mt-2 text-base font-semibold leading-tight tracking-tight text-foreground sm:text-lg">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <SectionCorners />
          </section>
        </Reveal>
      ) : null}

      {/* Cierre */}
      <section className="bg-background p-6 sm:p-10 lg:p-14">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-border bg-muted px-8 py-12 sm:flex-row sm:items-center sm:px-12 lg:px-14">
          <div className="max-w-md">
            <h2 className="text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl">
              ¿Tienes un proyecto similar?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Construyo sistemas a medida de extremo a extremo. Conversemos.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/#contacto"
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-background transition-opacity hover:opacity-90"
            >
              Escríbeme
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/#proyectos"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-muted-foreground"
            >
              Ver más proyectos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
