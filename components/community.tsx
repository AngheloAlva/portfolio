"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { SectionCorners } from "@/components/section-corners";
import { DitherShader } from "@/components/dither-shader";

type ProjectEntry = { title: string; description: string; href: string };

const PROJECTS_TOP: ReadonlyArray<ProjectEntry> = [
  {
    title: "CAEMP",
    description: "Plataforma de capacitación y seguridad laboral.",
    href: "https://grupocaemp.cl",
  },
  {
    title: "Finance",
    description: "Aplicación de gestión financiera personal.",
    href: "https://finance-olive-tau.vercel.app",
  },
  {
    title: "Sistema GIS",
    description: "Información geográfica con capas interactivas.",
    href: "https://ing-simple-gis.vercel.app/",
  },
  {
    title: "PDF Viewer",
    description: "Visor de PDFs interactivo con efecto de libro.",
    href: "https://pdf-viewer-five-puce.vercel.app",
  },
  {
    title: "ASM — Monitoreo Ambiental",
    description: "Sistema de monitoreo ambiental multiidioma.",
    href: "https://asm-six.vercel.app/es/",
  },
  {
    title: "IS Dashboard",
    description: "Gestión documental y control de asistencia.",
    href: "https://documents-dashboard.vercel.app",
  },
  {
    title: "Report Dashboard",
    description: "Reportes con visualización geoespacial.",
    href: "https://report-dashboard-eta.vercel.app",
  },
];

const PROJECTS_BOTTOM: ReadonlyArray<ProjectEntry> = [
  {
    title: "Forma — Habit Tracker",
    description: "PWA de seguimiento de hábitos diarios.",
    href: "https://habit-tracker-rouge-one.vercel.app",
  },
  {
    title: "CorreosChile — Auditorías",
    description: "Maqueta de seguimiento de auditorías.",
    href: "https://correos-de-chile-mockup.vercel.app",
  },
  {
    title: "Inmobiliaria Ulloa Accardi",
    description: "Prototipo de sitio para proyecto inmobiliario andino.",
    href: "https://prototipo-inmobiliaria.vercel.app",
  },
  {
    title: "Monitoreo Ambiental — Raspberry Pi 5",
    description: "Dashboard IoT de monitoreo ambiental.",
    href: "https://raspberry-pi-5-mockup.vercel.app",
  },
  {
    title: "Emprende tu Vida",
    description: "Plataforma educativa de emprendimiento.",
    href: "https://maqueta-emprende-tu-vida.vercel.app",
  },
  {
    title: "Websil",
    description: "Versión de prueba del sitio Websil con Astro.",
    href: "https://websil-test.vercel.app",
  },
  {
    title: "DBJ — Landing Page",
    description: "Landing page para DBJ.",
    href: "https://dbj-prototipe.vercel.app",
  },
];

export function Community(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackTopRef = useRef<HTMLDivElement>(null);
  const trackBottomRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const overflowTop = useMotionValue(0);
  const overflowBottom = useMotionValue(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stageEl = stageRef.current;
    const topEl = trackTopRef.current;
    const bottomEl = trackBottomRef.current;
    if (!stageEl || !topEl || !bottomEl) return;

    const measure = () => {
      const stageWidth = stageEl.clientWidth;
      overflowTop.set(Math.max(0, topEl.scrollWidth - stageWidth));
      overflowBottom.set(Math.max(0, bottomEl.scrollWidth - stageWidth));
      setReady(true);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stageEl);
    ro.observe(topEl);
    ro.observe(bottomEl);
    return () => ro.disconnect();
  }, [overflowTop, overflowBottom]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.6,
    restDelta: 0.0005,
  });

  const xTop = useTransform([progress, overflowTop], (values) => {
    const [p, o] = values as [number, number];
    const clamped = Math.min(Math.max(p / 0.92, 0), 1);
    return -o * clamped;
  });

  const xBottom = useTransform([progress, overflowBottom], (values) => {
    const [p, o] = values as [number, number];
    const clamped = Math.min(Math.max(p / 0.92, 0), 1);
    return -o * (1 - clamped);
  });

  const backdropOpacity = useTransform(progress, [0, 0.85, 1], [0.22, 0.22, 0]);

  return (
    <section
      ref={sectionRef}
      id="mas-proyectos"
      aria-labelledby="community-heading"
      className="relative border-b border-border"
    >
      <div className="relative h-[180vh]">
        <div
          aria-hidden="true"
          className="pointer-events-none sticky top-16 h-[calc(100vh-4rem)] w-full sm:top-20 sm:h-[calc(100vh-5rem)]"
        >
          <Backdrop opacity={backdropOpacity} />
        </div>

        <div className="sticky top-16 z-10 -mt-[calc(100vh-4rem)] flex w-full flex-col gap-6 overflow-hidden py-6 sm:top-20 sm:-mt-[calc(100vh-5rem)] sm:gap-8 sm:py-10">
          <div className="relative z-10 flex flex-col gap-4 px-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:px-10 lg:px-14">
            <div className="max-w-2xl">
              <h2
                id="community-heading"
                className="text-2xl font-medium leading-[1.05] tracking-tighter text-foreground sm:text-3xl lg:text-[2.5rem]"
              >
                Más proyectos
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                Prototipos, demos y trabajos más chicos. Casi todos con demo en
                vivo — abre una tarjeta para verla.
              </p>
            </div>
          </div>

          <div
            ref={stageRef}
            className="relative z-10 flex flex-col gap-4 overflow-hidden sm:gap-6"
          >
            {reduce ? (
              <>
                <ReducedRow entries={PROJECTS_TOP} />
                <ReducedRow entries={PROJECTS_BOTTOM} />
              </>
            ) : (
              <>
                <Row
                  ref={trackTopRef}
                  entries={PROJECTS_TOP}
                  x={xTop}
                  ready={ready}
                />
                <Row
                  ref={trackBottomRef}
                  entries={PROJECTS_BOTTOM}
                  x={xBottom}
                  ready={ready}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <SectionCorners />
    </section>
  );
}

function Backdrop({
  opacity,
}: {
  opacity: MotionValue<number>;
}): ReactNode {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[55vh]"
      style={{
        opacity,
        WebkitMaskImage:
          "linear-gradient(to top, black 0%, black 25%, transparent 100%)",
        maskImage:
          "linear-gradient(to top, black 0%, black 25%, transparent 100%)",
      }}
    >
      <DitherShader variant="hero" />
    </motion.div>
  );
}

function Row({
  ref,
  entries,
  x,
  ready,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
  entries: ReadonlyArray<ProjectEntry>;
  x: MotionValue<number>;
  ready: boolean;
}): ReactNode {
  return (
    <div
      className="relative"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
      }}
    >
      <motion.div
        ref={ref}
        className="flex shrink-0 gap-6 px-6 sm:gap-8 sm:px-10 lg:px-14"
        style={{ x, opacity: ready ? 1 : 0 }}
      >
        {entries.map((entry) => (
          <ProjectCard key={entry.href} entry={entry} />
        ))}
      </motion.div>
    </div>
  );
}

function ReducedRow({
  entries,
}: {
  entries: ReadonlyArray<ProjectEntry>;
}): ReactNode {
  return (
    <div className="flex w-full gap-6 overflow-x-auto px-6 sm:gap-8 sm:px-10 lg:px-14">
      {entries.map((entry) => (
        <ProjectCard key={entry.href} entry={entry} />
      ))}
    </div>
  );
}

function ProjectCard({ entry }: { entry: ProjectEntry }): ReactNode {
  return (
    <a
      href={entry.href}
      target="_blank"
      rel="noreferrer"
      className="focus-ring group relative flex aspect-5/6 w-75 shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background p-5 transition-colors hover:border-foreground/30 sm:w-90 sm:p-6"
    >
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
        Ver demo
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
        >
          ↗
        </span>
      </span>
      <div>
        <h3 className="text-base font-medium leading-tight tracking-tight text-foreground">
          {entry.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {entry.description}
        </p>
      </div>
    </a>
  );
}
