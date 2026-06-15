"use client";

import type { ReactNode } from "react";

type ClientLogo = { id: string; src: string; alt: string };

const logos: ClientLogo[] = [
  { id: "otc", src: "/logos/otc.svg", alt: "OTC" },
  { id: "busanc", src: "/logos/busanc.avif", alt: "Busanc" },
  {
    id: "turismochiletours",
    src: "/logos/turismochiletours.svg",
    alt: "TurismoChileTours",
  },
  { id: "aiep", src: "/logos/aiep.svg", alt: "AIEP" },
  { id: "aiep", src: "/logos/caemp.png", alt: "Caemp" },
  { id: "bzconsulting", src: "/logos/bzconsulting.png", alt: "BZ Consulting" },
];

function LogoChip({ logo }: { logo: ClientLogo }): ReactNode {
  return (
    <div className="bg-background flex h-20 w-20 shrink-0 items-center justify-center rounded-full sm:h-24 sm:w-24">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.alt}
        loading="lazy"
        className="h-9 w-12 object-contain opacity-80 brightness-0 sm:h-10 sm:w-14 dark:opacity-90 dark:invert"
      />
    </div>
  );
}

// Two stacked copies of the logo list ensure -50% translation lands on the
// start of the duplicate, making the loop seamless.
function MarqueeColumn({
  direction,
  duration,
  logoSet,
}: {
  direction: "up" | "down";
  duration: string;
  logoSet: ClientLogo[];
}): ReactNode {
  const animation = direction === "up" ? "marquee-up" : "marquee-down";

  const renderCopy = (key: string): ReactNode => (
    <div key={key} className="flex shrink-0 flex-col items-center gap-4">
      {logoSet.map((l) => (
        <LogoChip key={l.id} logo={l} />
      ))}
    </div>
  );

  return (
    <div
      className="flex flex-col items-center gap-4"
      style={{ animation: `${animation} ${duration} linear infinite` }}
    >
      {renderCopy("a")}
      {renderCopy("b")}
    </div>
  );
}

export function LogoMarquee(): ReactNode {
  const colA = logos.filter((_, i) => i % 2 === 0);
  const colB = logos.filter((_, i) => i % 2 === 1);

  return (
    <div
      className="relative h-full min-h-90 w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
      }}
    >
      <div className="absolute inset-0 mx-auto grid max-w-55 grid-cols-2 place-items-center gap-1 sm:max-w-65">
        <MarqueeColumn direction="up" duration="22s" logoSet={colA} />
        <MarqueeColumn direction="down" duration="26s" logoSet={colB} />
      </div>
    </div>
  );
}
