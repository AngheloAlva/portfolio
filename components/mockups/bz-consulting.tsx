import type { ReactNode } from "react"
import { WFBar, WFDonut, WFGlyphCard } from "@/components/mockups/primitives"

/* ────────────────────────────────────────────────────────────────────────
 * BZ Consulting (bzconsulting.cl) — black & white wireframes.
 *
 * Modelled after the real Astro institutional site: bilingual translated
 * routes, weekly MDX news feed, serverless contact form, measured Core Web
 * Vitals and technical SEO. Structure only — no client data.
 *
 * Every glyph fills its card via `h-full` / `flex-1` so the bento tiles read
 * as dense, recognisable screens rather than top-aligned sketches.
 * ──────────────────────────────────────────────────────────────────────── */

/** A single route "pill" — a leading slash mark plus a path bar. */
function RoutePill({ w, tone }: { w: string; tone: "mid" | "soft" }): ReactNode {
	return (
		<div className="border-border flex items-center gap-1.5 rounded-md border px-2 py-1.5">
			<span className="bg-foreground/40 h-2.5 w-1 shrink-0 rounded-full" />
			<WFBar w={w} h={4} tone={tone} />
		</div>
	)
}

/** Sitio bilingüe (ES/EN) — LEAD: language toggle + paired translated routes. */
function BilingueGlyph({ className }: { className?: string }): ReactNode {
	const routesEs = ["72%", "84%", "60%"]
	const routesEn = ["60%", "72%", "84%"]
	return (
		<WFGlyphCard className={className}>
			<div className="flex h-full flex-col">
				{/* Language toggle: ES active / EN */}
				<div className="flex items-center gap-2">
					<div className="border-border flex items-center gap-0.5 rounded-full border p-0.5">
						<span className="bg-foreground/70 h-4 w-8 rounded-full" />
						<span className="h-4 w-8 rounded-full" />
					</div>
					<WFBar w={50} h={4} tone="soft" className="ml-1" />
				</div>

				{/* Paired translated routes: ES ↔ EN */}
				<div className="mt-3 flex flex-1 items-center gap-2">
					<div className="flex flex-1 flex-col justify-center gap-2">
						{routesEs.map((w, i) => (
							<RoutePill key={i} w={w} tone="mid" />
						))}
					</div>
					<div className="flex flex-col items-center justify-center gap-[1.35rem]">
						{routesEs.map((_, i) => (
							<span key={i} className="bg-foreground/25 h-0.5 w-4 rounded-full" />
						))}
					</div>
					<div className="flex flex-1 flex-col justify-center gap-2">
						{routesEn.map((w, i) => (
							<RoutePill key={i} w={w} tone="soft" />
						))}
					</div>
				</div>
			</div>
		</WFGlyphCard>
	)
}

/** Publicación semanal de noticias sin CMS — MDX news feed. */
function NoticiasGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<WFBar w={50} h={6} tone="mid" />
				<span className="border-border ml-auto flex h-5 items-center gap-1 rounded-full border px-1.5">
					<span className="bg-foreground/50 h-1.5 w-1.5 rounded-full" />
					<span className="bg-muted h-1.5 w-6 rounded" />
				</span>
			</div>
			<div className="mt-2 flex flex-1 flex-col">
				{Array.from({ length: 3 }, (_, i) => (
					<div
						key={i}
						className={`flex flex-1 items-center gap-2 ${
							i < 2 ? "border-border border-b" : ""
						}`}
					>
						<span className="bg-muted h-9 w-12 shrink-0 rounded" />
						<div className="flex flex-1 flex-col gap-1.5">
							<WFBar w={`${65 + ((i * 9) % 25)}%`} h={4} tone="mid" />
							<WFBar w="32%" h={3} tone="soft" />
						</div>
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

/** Formulario de contacto serverless — form + worker→mail pipeline. */
function ContactoServerlessGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex h-full flex-col gap-2">
				{Array.from({ length: 2 }, (_, i) => (
					<div key={i} className="flex flex-1 flex-col justify-center gap-1">
						<WFBar w={`${28 + ((i * 9) % 16)}%`} h={3} tone="soft" />
						<div className="border-border h-5 w-full rounded border" />
					</div>
				))}

				{/* Serverless pipeline: form → worker → mail */}
				<div className="border-border mt-1 flex items-center justify-center gap-2 rounded-md border border-dashed py-2">
					<span className="bg-foreground/45 h-5 w-5 rounded" />
					<span className="bg-foreground/25 h-0.5 w-3 rounded-full" />
					<span className="border-border flex h-5 w-5 items-center justify-center rounded-full border">
						<span className="bg-foreground/50 h-2 w-2 rounded-sm" />
					</span>
					<span className="bg-foreground/25 h-0.5 w-3 rounded-full" />
					<span className="border-border h-5 w-6 rounded-sm border" />
				</div>
			</div>
		</WFGlyphCard>
	)
}

/** Performance medida y validada — Core Web Vitals gauges in the green zone. */
function PerformanceGlyph({ className }: { className?: string }): ReactNode {
	const gauges = [92, 96, 88]
	return (
		<WFGlyphCard className={className}>
			<WFBar w={55} h={5} tone="mid" />
			<div className="flex flex-1 items-center justify-around gap-2">
				{gauges.map((pct, i) => (
					<div key={i} className="flex flex-col items-center gap-1.5">
						<WFDonut pct={pct} className="h-11 w-11" />
						<WFBar w="2.2rem" h={3} tone="soft" />
					</div>
				))}
			</div>
			<div className="border-border flex items-center justify-between border-t pt-2">
				<WFBar w={40} h={4} tone="soft" />
				<WFBar w={56} h={8} tone="strong" />
			</div>
		</WFGlyphCard>
	)
}

/** SEO técnico cuidado — sitemap tree + meta/robots chips. */
function SeoGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex h-full flex-col">
				{/* Sitemap tree */}
				<div className="flex flex-1 flex-col justify-center gap-1.5">
					<div className="flex items-center gap-2">
						<span className="bg-foreground/45 h-3.5 w-3.5 rounded-sm" />
						<WFBar w={40} h={4} tone="mid" />
					</div>
					{Array.from({ length: 3 }, (_, i) => (
						<div key={i} className="flex items-center gap-2 pl-4">
							<span className="border-border h-2 w-2 shrink-0 rounded-sm border" />
							<WFBar w={`${40 + ((i * 11) % 30)}%`} h={3} tone="soft" />
						</div>
					))}
				</div>

				{/* Technical SEO chips: sitemap.xml / robots.txt / OG */}
				<div className="mt-2 flex gap-1.5">
					{Array.from({ length: 3 }, (_, i) => (
						<span
							key={i}
							className="border-border flex flex-1 items-center justify-center rounded-full border py-1"
						>
							<span className="bg-muted h-1.5 w-8 rounded" />
						</span>
					))}
				</div>
			</div>
		</WFGlyphCard>
	)
}

export const bzConsultingFeatureGlyphs: Record<
	string,
	(props: { className?: string }) => ReactNode
> = {
	"Sitio bilingüe (ES/EN) con URLs traducidas": BilingueGlyph,
	"Publicación semanal de noticias sin CMS": NoticiasGlyph,
	"Formulario de contacto serverless": ContactoServerlessGlyph,
	"Performance medida y validada": PerformanceGlyph,
	"SEO técnico cuidado": SeoGlyph,
}
