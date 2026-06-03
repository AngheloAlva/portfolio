"use client";

import { DitherShader } from "@/components/dither-shader";
import { SectionCorners } from "@/components/section-corners";
import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useId, type ReactNode } from "react";

type StackGroup = {
  id: string;
  name: string;
  tagline: string;
  items: ReadonlyArray<string>;
};

const GROUPS: ReadonlyArray<StackGroup> = [
  {
    id: "frontend",
    name: "Frontend",
    tagline: "Interfaces tipadas, accesibles y rápidas.",
    items: [
      "TypeScript",
      "React 19 · Next.js (App Router)",
      "Tailwind CSS · shadcn/ui · Radix",
      "TanStack Query · Table · Form",
      "Zustand · Jotai",
      "Motion · GSAP",
    ],
  },
  {
    id: "backend",
    name: "Backend & Datos",
    tagline: "Lógica de negocio y datos de extremo a extremo.",
    items: [
      "Node.js · NestJS",
      "Server Actions · API Routes",
      "PostgreSQL · Turso (libSQL)",
      "Prisma · Drizzle ORM",
      "Better Auth · JWT + RBAC",
      "Zod · Astro (SSG/MDX)",
    ],
  },
  {
    id: "cloud",
    name: "Cloud & Herramientas",
    tagline: "Despliegue, infraestructura y entrega continua.",
    items: [
      "Vercel · Microsoft Azure",
      "Neon · Cloudflare Pages/Workers",
      "AWS (certificación SAA en curso)",
      "Turborepo · Git · CI/CD",
      "Resend · Cloudinary",
      "Vercel Blob · Azure Blob Storage",
    ],
  },
];

export function Pricing(): ReactNode {
  const headingId = useId();

  return (
    <section
      id="stack"
      aria-labelledby={headingId}
      className="relative scroll-mt-20 border-b border-border p-6 sm:p-10 lg:p-14"
    >
      <div className="max-w-xl">
        <h2
          id={headingId}
          className="text-2xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-3xl lg:text-[2.5rem]"
        >
          Mi stack
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          Las herramientas con las que construyo, elegidas según el problema y
          no según la moda. TypeScript de punta a punta.
        </p>
      </div>

      <div className="relative mt-12 grid grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-6">
        {GROUPS.map((group) => (
          <StackCard key={group.id} group={group} />
        ))}
      </div>
      <SectionCorners />
    </section>
  );
}

function StackCard({ group }: { group: StackGroup }): ReactNode {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return (
    <article className="relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-border bg-background p-6 text-foreground shadow-[0_12px_32px_-18px_rgba(0,0,0,0.18)] sm:p-8 lg:min-h-[400px] dark:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.45)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
      >
        <DitherShader
          variant="cta"
          tone={
            isDark
              ? { r: 0.18, g: 0.18, b: 0.18 }
              : { r: 0.83, g: 0.83, b: 0.83 }
          }
        />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <header>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {group.name}
          </h3>
        </header>

        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
          {group.tagline}
        </p>

        <ul className="mt-10 space-y-3">
          {group.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                <Check className="h-3 w-3" strokeWidth={2} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
