import type { ReactNode } from "react"
import { WFBar, WFGlyphCard } from "@/components/mockups/primitives"

/* ────────────────────────────────────────────────────────────────────────
 * Grupo CAEMP (grupocaemp.cl) — black & white wireframes.
 *
 * Modelled after the real multi-domain platform: one codebase serving four
 * domains, three differentiated brands, per-domain SEO, business catalogues,
 * shared-vs-specific content and transactional contact/quote forms. Structure
 * only — no client data.
 *
 * Every glyph fills its card via `h-full` / `flex-1` so the bento tiles read
 * as dense, recognisable screens rather than top-aligned sketches.
 * ──────────────────────────────────────────────────────────────────────── */

/** A browser chrome bar: traffic dot + brand favicon + an address bar. */
function BrowserBar({ tone = "soft" }: { tone?: "mid" | "soft" }): ReactNode {
	return (
		<div className="border-border flex items-center gap-1.5 rounded-md border px-2 py-1.5">
			<span className="bg-border h-1.5 w-1.5 shrink-0 rounded-full" />
			<span className="bg-foreground/35 h-3 w-3 shrink-0 rounded-sm" />
			<div className="border-border bg-muted/40 flex-1 rounded-full px-2 py-1">
				<WFBar w="70%" h={3} tone={tone} />
			</div>
		</div>
	)
}

/** Arquitectura multi-dominio — LEAD: 3 domains converge into 1 deploy. */
function MultiDominioGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex h-full flex-col">
				{/* 3 brand domains */}
				<div className="flex flex-1 flex-col justify-center gap-2.5">
					{Array.from({ length: 3 }, (_, i) => (
						<BrowserBar key={i} tone={i === 0 ? "mid" : "soft"} />
					))}
				</div>

				{/* Converging connector: 3 domains → 1 build */}
				<svg
					viewBox="0 0 100 36"
					preserveAspectRatio="none"
					className="text-foreground/40 h-7 w-full shrink-0"
					aria-hidden="true"
				>
					<path
						d="M16 0 V10 Q16 22 50 22 M50 0 V22 M84 0 V10 Q84 22 50 22 M50 22 V36"
						fill="none"
						stroke="currentColor"
						strokeWidth={1.5}
						vectorEffect="non-scaling-stroke"
					/>
				</svg>

				{/* Single deployment serving every brand */}
				<div className="border-border bg-background/60 flex flex-1 flex-col overflow-hidden rounded-lg border">
					<span className="bg-foreground/60 h-1.5 w-full shrink-0" />
					<div className="flex flex-1 gap-2 p-2.5">
						<div className="bg-muted w-1/5 shrink-0 rounded" />
						<div className="flex flex-1 flex-col gap-2">
							<div className="flex items-center gap-2">
								<span className="bg-foreground/55 h-6 w-6 shrink-0 rounded-md" />
								<WFBar w="50%" h={5} tone="strong" />
							</div>
							<WFBar w="100%" h={3} tone="soft" />
							<WFBar w="82%" h={3} tone="soft" />
							<div className="grid flex-1 grid-cols-3 items-end gap-1.5">
								{Array.from({ length: 3 }, (_, i) => (
									<span
										key={i}
										className="border-border flex items-center justify-center rounded border py-1"
									>
										<span className="bg-foreground/35 h-1.5 w-6 rounded" />
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</WFGlyphCard>
	)
}

/** Tres líneas de negocio diferenciadas — 3 branded cards. */
function TresLineasGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex h-full gap-2">
				{Array.from({ length: 3 }, (_, i) => (
					<div
						key={i}
						className="border-border flex flex-1 flex-col overflow-hidden rounded-lg border"
					>
						<span
							className={`h-1 w-full ${
								i === 0 ? "bg-foreground/70" : i === 1 ? "bg-foreground/45" : "bg-foreground/25"
							}`}
						/>
						<div className="flex flex-1 flex-col items-center justify-center gap-2 p-2">
							<span className="bg-muted h-7 w-7 rounded-md" />
							<WFBar w="70%" h={4} tone="mid" />
							<WFBar w="50%" h={3} tone="soft" />
						</div>
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

/** SEO independiente por dominio — address bar + per-domain metadata. */
function SeoPorDominioGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex h-full flex-col gap-2">
				<BrowserBar tone="mid" />
				{/* Meta head: title, description, og:image */}
				<div className="border-border flex flex-1 gap-2 rounded-md border p-2">
					<div className="flex flex-1 flex-col justify-center gap-1.5">
						<WFBar w="80%" h={4} tone="mid" />
						<WFBar w="100%" h={3} tone="soft" />
						<WFBar w="90%" h={3} tone="soft" />
						<WFBar w="55%" h={3} tone="soft" />
					</div>
					<span className="bg-muted h-full w-12 shrink-0 rounded" />
				</div>
			</div>
		</WFGlyphCard>
	)
}

/** Catálogos y detalle por negocio — list + detail pane. */
function CatalogosGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex h-full gap-2">
				{/* List */}
				<div className="flex w-2/5 flex-col gap-1.5">
					{Array.from({ length: 4 }, (_, i) => (
						<div
							key={i}
							className={`flex flex-1 items-center gap-1.5 rounded-md px-1.5 ${
								i === 0 ? "bg-foreground/10" : ""
							}`}
						>
							<span className="bg-muted h-4 w-4 shrink-0 rounded-sm" />
							<WFBar w={`${50 + ((i * 9) % 30)}%`} h={3} tone={i === 0 ? "mid" : "soft"} />
						</div>
					))}
				</div>
				{/* Detail */}
				<div className="border-border flex flex-1 flex-col gap-2 rounded-md border p-2">
					<span className="bg-muted h-10 w-full rounded" />
					<WFBar w="70%" h={4} tone="mid" />
					<WFBar w="100%" h={3} tone="soft" />
					<WFBar w="85%" h={3} tone="soft" />
				</div>
			</div>
		</WFGlyphCard>
	)
}

/** Contenido compartido vs. específico — shared core + per-brand modules. */
function ContenidoGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex h-full flex-col gap-2">
				{/* Shared core */}
				<div className="border-border bg-foreground/[0.06] flex flex-1 items-center gap-2 rounded-md border px-2.5">
					<span className="bg-foreground/45 h-5 w-5 shrink-0 rounded" />
					<WFBar w="55%" h={4} tone="mid" />
				</div>
				{/* Per-brand specific modules */}
				<div className="grid flex-1 grid-cols-3 gap-2">
					{Array.from({ length: 3 }, (_, i) => (
						<div
							key={i}
							className="border-border flex flex-col items-center justify-center gap-1.5 rounded-md border border-dashed"
						>
							<span className="bg-muted h-4 w-4 rounded-sm" />
							<WFBar w="60%" h={3} tone="soft" />
						</div>
					))}
				</div>
			</div>
		</WFGlyphCard>
	)
}

/** Contacto y cotización con correo transaccional — form + email template. */
function ContactoGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex h-full gap-2">
				{/* Form */}
				<div className="flex flex-1 flex-col gap-1.5">
					{Array.from({ length: 3 }, (_, i) => (
						<div key={i} className="flex flex-1 flex-col justify-center gap-1">
							<WFBar w={`${28 + ((i * 9) % 16)}%`} h={3} tone="soft" />
							<div className="border-border h-4 w-full rounded border" />
						</div>
					))}
					<div className="bg-foreground/70 mt-0.5 h-5 w-full shrink-0 rounded" />
				</div>
				{/* Email template card */}
				<div className="border-border flex w-2/5 flex-col gap-1.5 rounded-md border p-2">
					<div className="flex items-center gap-1.5">
						<span className="border-border h-4 w-4 shrink-0 rounded-sm border" />
						<WFBar w="60%" h={3} tone="mid" />
					</div>
					<span className="bg-border h-px w-full" />
					<WFBar w="100%" h={3} tone="soft" />
					<WFBar w="80%" h={3} tone="soft" />
					<span className="bg-muted mt-auto h-4 w-12 self-end rounded" />
				</div>
			</div>
		</WFGlyphCard>
	)
}

export const caempFeatureGlyphs: Record<
	string,
	(props: { className?: string }) => ReactNode
> = {
	"Arquitectura multi-dominio de marca": MultiDominioGlyph,
	"Tres líneas de negocio diferenciadas": TresLineasGlyph,
	"SEO independiente por dominio": SeoPorDominioGlyph,
	"Catálogos y detalle por negocio": CatalogosGlyph,
	"Contenido compartido vs. específico": ContenidoGlyph,
	"Contacto y cotización con correo transaccional": ContactoGlyph,
}
