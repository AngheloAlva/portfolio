import Link from "next/link";
import type { ReactNode } from "react";

type FooterLink = { label: string; href: string };

/**
 * Renders an internal route (e.g. "/#contacto") with next/link and anything
 * else (mailto:, "#", static files) with a plain anchor.
 */
function FooterAnchor({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}): ReactNode {
  const isRoute = href.startsWith("/") && !href.includes(".");
  if (isRoute) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

const linkColumns: ReadonlyArray<{
  label: string;
  items: ReadonlyArray<FooterLink>;
}> = [
  {
    label: "Navegación",
    items: [
      { label: "Proyectos", href: "/#proyectos" },
      { label: "Más proyectos", href: "/#mas-proyectos" },
      { label: "Stack", href: "/#stack" },
      { label: "Preguntas frecuentes", href: "/#faq" },
      { label: "Contacto", href: "/#contacto" },
    ],
  },
  {
    label: "Contacto",
    items: [
      { label: "Email", href: "mailto:ance.anghelo@gmail.com" },
      { label: "LinkedIn", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Descargar CV", href: "/cv-anghelo-alva.pdf" },
    ],
  },
];

export function Footer(): ReactNode {
  return (
    <section className="bg-background p-3 sm:p-4 lg:p-6">
      <div className="rounded-3xl bg-neutral-950! px-5 py-8 text-neutral-100! sm:px-8 sm:py-10 lg:px-10 lg:py-12 dark:bg-neutral-50! dark:text-neutral-900!">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[auto_1fr_auto] lg:gap-16">
          <div>
            <a
              href="#main-content"
              className="focus-ring inline-flex items-center gap-2 rounded-sm text-sm text-neutral-100 transition-colors hover:text-white dark:text-neutral-900 dark:hover:text-black"
            >
              Volver arriba
              <span aria-hidden="true">↑</span>
            </a>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 lg:gap-x-12"
          >
            {linkColumns.map((column) => (
              <div key={column.label}>
                <p className="mb-5 text-sm text-neutral-500 dark:text-neutral-500">
                  {column.label}
                </p>
                <ul className="space-y-3">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <FooterAnchor
                        href={item.href}
                        className="focus-ring rounded-sm text-sm text-neutral-100 transition-colors hover:text-white dark:text-neutral-900 dark:hover:text-black"
                      >
                        {item.label}
                      </FooterAnchor>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:pt-px">
            <FooterAnchor
              href="/#contacto"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-neutral-700 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-100 transition-colors hover:border-neutral-500 dark:border-neutral-300 dark:text-neutral-900 dark:hover:border-neutral-500"
            >
              Escríbeme
              <span aria-hidden="true">→</span>
            </FooterAnchor>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 pt-8 sm:flex-row sm:items-center lg:mt-24">
          <div className="flex items-center gap-2">
            <span
              className="h-5 w-5 shrink-0 bg-neutral-100! dark:bg-neutral-900!"
              aria-hidden="true"
            />
            <span className="text-lg font-semibold leading-none tracking-tight">
              Anghelo Alva
            </span>
          </div>

          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            © {new Date().getFullYear()} Anghelo Alva. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </section>
  );
}
