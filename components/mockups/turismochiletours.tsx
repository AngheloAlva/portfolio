import type { ReactNode } from "react"
import { WFBar, WFGlyphCard, WFPill } from "@/components/mockups/primitives"

/* ────────────────────────────────────────────────────────────────────────
 * TurismoChileTours — faithful black & white wireframes.
 *
 * Modelled after the real marketing site screens (catálogo de programas,
 * fichas de destinos, selector de idioma, formularios de contacto y RRHH,
 * páginas institucionales). Structure only — no client data.
 *
 * Every glyph fills its card via `h-full` / `flex-1` so the bento tiles read
 * as dense, recognisable screens rather than top-aligned sketches.
 * ──────────────────────────────────────────────────────────────────────── */

/** Catálogo de programas y excursiones — LEAD: a browsable tour-card grid. */
function CatalogoGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			{/* Toolbar: section title + filter chips */}
			<div className="flex items-center gap-2">
				<WFBar w={90} h={7} tone="strong" />
				<div className="ml-auto flex gap-1.5">
					<span className="border-border h-5 w-12 rounded-full border" />
					<span className="border-border h-5 w-12 rounded-full border" />
				</div>
			</div>

			{/* 2×2 grid of tour cards — image on top, title, price + days pill */}
			<div className="mt-3 grid flex-1 auto-rows-fr grid-cols-2 gap-2.5">
				{Array.from({ length: 4 }, (_, i) => (
					<div
						key={i}
						className="border-border flex flex-col overflow-hidden rounded-lg border"
					>
						<div className="bg-muted flex-1" />
						<div className="flex flex-col gap-1.5 p-2">
							<WFBar w={`${60 + ((i * 9) % 25)}%`} h={5} tone="mid" />
							<div className="flex items-center gap-2">
								<WFBar w={32} h={6} tone="strong" />
								<span className="ml-auto">
									<WFPill w={34} />
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

/** Fichas de destinos — destination detail page: hero image + meta + copy. */
function FichasGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			{/* Hero image with title overlay */}
			<div className="bg-muted relative flex-1 overflow-hidden rounded-lg">
				<div className="absolute bottom-2 left-2 flex flex-col gap-1.5">
					<WFBar w="6rem" h={8} tone="strong" />
					<WFBar w="4rem" h={4} tone="mid" />
				</div>
			</div>

			{/* Meta chips — "cómo llegar" / "qué esperar" */}
			<div className="mt-2 flex gap-1.5">
				{Array.from({ length: 3 }, (_, i) => (
					<span
						key={i}
						className="border-border flex items-center gap-1 rounded-full border px-2 py-1"
					>
						<span className="bg-foreground/40 h-1.5 w-1.5 rounded-full" />
						<span className="bg-muted h-1.5 w-7 rounded" />
					</span>
				))}
			</div>

			{/* Body copy */}
			<div className="mt-2 flex flex-col gap-1">
				<WFBar w="100%" h={4} tone="soft" />
				<WFBar w="78%" h={4} tone="soft" />
			</div>
		</WFGlyphCard>
	)
}

/** Sitio multilingüe (4 idiomas) — an open language selector with 4 locales. */
function MultilingueGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			{/* Selector field: globe + current locale + caret */}
			<div className="border-border flex items-center gap-2 rounded-md border px-2 py-1.5">
				<span className="border-border flex h-4 w-4 items-center justify-center rounded-full border">
					<span className="bg-foreground/50 h-2 w-2 rounded-full" />
				</span>
				<WFBar w={45} h={5} tone="mid" />
				<span className="ml-auto h-0 w-0 border-x-4 border-t-4 border-x-transparent border-t-foreground/40" />
			</div>

			{/* Open menu: 4 locale rows, first active + checked */}
			<div className="border-border mt-1.5 flex flex-1 flex-col overflow-hidden rounded-md border">
				{Array.from({ length: 4 }, (_, i) => (
					<div
						key={i}
						className={`flex flex-1 items-center gap-2 px-2 ${
							i === 0 ? "bg-foreground/10" : ""
						} ${i < 3 ? "border-border border-b" : ""}`}
					>
						<span
							className={`h-3.5 w-5 shrink-0 rounded-sm ${
								i === 0 ? "bg-foreground/40" : "bg-muted"
							}`}
						/>
						<WFBar
							w={`${40 + ((i * 13) % 30)}%`}
							h={4}
							tone={i === 0 ? "mid" : "soft"}
						/>
						{i === 0 ? (
							<span className="bg-foreground/55 ml-auto h-2.5 w-2.5 rounded-sm" />
						) : null}
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

/** Solicitud de tours privados — qualified lead form with a solid CTA. */
function SolicitudGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex h-full flex-col gap-2">
				{Array.from({ length: 3 }, (_, i) => (
					<div key={i} className="flex flex-1 flex-col justify-center gap-1">
						<WFBar w={`${28 + ((i * 9) % 18)}%`} h={3} tone="soft" />
						<div className="border-border h-5 w-full rounded border" />
					</div>
				))}
				<div className="bg-foreground/70 mt-1 h-7 w-full shrink-0 rounded" />
			</div>
		</WFGlyphCard>
	)
}

/** Postulaciones laborales — "Trabaja con nosotros" form with a CV drop zone. */
function PostulacionesGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex h-full flex-col gap-2">
				<div className="flex flex-col gap-1">
					<WFBar w="30%" h={3} tone="soft" />
					<div className="border-border h-5 w-full rounded border" />
				</div>

				{/* CV upload drop zone */}
				<div className="border-border flex flex-1 flex-col items-center justify-center gap-1.5 rounded-md border border-dashed">
					<span className="border-border bg-background flex h-7 w-6 items-center justify-center rounded-sm border">
						<span className="bg-foreground/45 h-2.5 w-3 rounded-sm" />
					</span>
					<WFBar w="48%" h={4} tone="soft" />
				</div>

				<div className="bg-foreground/70 h-7 w-full shrink-0 rounded" />
			</div>
		</WFGlyphCard>
	)
}

/** Páginas institucionales completas — institutional nav / sitemap list. */
function InstitucionalGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex h-full flex-col">
				{Array.from({ length: 5 }, (_, i) => (
					<div
						key={i}
						className={`flex flex-1 items-center gap-2.5 ${
							i < 4 ? "border-border border-b" : ""
						}`}
					>
						<span className="bg-foreground/40 h-3.5 w-3.5 shrink-0 rounded-sm" />
						<WFBar w={`${45 + ((i * 11) % 35)}%`} h={4} tone="mid" />
						<span className="border-border ml-auto h-2 w-2 shrink-0 rotate-45 border-t border-r" />
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

export const turismochiletoursFeatureGlyphs: Record<
	string,
	(props: { className?: string }) => ReactNode
> = {
	"Catálogo de programas y excursiones": CatalogoGlyph,
	"Fichas de destinos": FichasGlyph,
	"Sitio multilingüe (4 idiomas)": MultilingueGlyph,
	"Solicitud de tours privados": SolicitudGlyph,
	"Postulaciones laborales": PostulacionesGlyph,
	"Páginas institucionales completas": InstitucionalGlyph,
}
