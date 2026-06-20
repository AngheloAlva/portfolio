import type { ReactNode } from "react"
import {
	WFBar,
	WFComboChart,
	WFDonut,
	WFGlyphCard,
	WFHBars,
	WFKpiChip,
	WFPill,
	WFStatCard,
	WFTable,
} from "@/components/mockups/primitives"

/* ────────────────────────────────────────────────────────────────────────
 * OTC 360 — faithful black & white wireframes.
 *
 * Modelled after the real ERP screens (Inicio, Órdenes de Trabajo, Carpetas
 * de Arranque, Permisos de Trabajo, Indicadores). Structure only — no client
 * data — honouring the `confidential-ui` privacy setting of this case study.
 *
 * `Planes de Mantenimiento` and `Solicitudes de Trabajo` are inferred from the
 * product's domain (no reference screenshot yet) — refine when captures land.
 * ──────────────────────────────────────────────────────────────────────── */

const NAV_ITEMS = 9

/** HERO — the "Inicio" dashboard: app shell + banner + stat grid + charts. */
export function Otc360Hero({ label }: { label?: string }): ReactNode {
	return (
		<div
			aria-hidden="true"
			className="border-border bg-background flex h-full min-h-[22rem] w-full overflow-hidden rounded-2xl border"
		>
			{/* Sidebar */}
			<aside className="border-border hidden w-1/5 min-w-[8rem] flex-col gap-3 border-r p-3 sm:flex">
				<div className="flex items-center gap-2">
					<span className="bg-foreground/70 h-6 w-6 rounded" />
					<div className="flex flex-col gap-1">
						<WFBar w={36} h={5} tone="strong" />
						<WFBar w={24} h={3} tone="soft" />
					</div>
				</div>
				<WFBar w={50} h={4} tone="soft" className="mt-1" />
				<nav className="flex flex-col gap-1.5">
					{Array.from({ length: NAV_ITEMS }).map((_, i) =>
						i === 0 ? (
							<div
								key={i}
								className="bg-foreground/10 flex items-center gap-2 rounded-md px-2 py-1.5"
							>
								<span className="bg-foreground/70 h-2.5 w-2.5 rounded" />
								<WFBar w={60} h={5} tone="strong" />
							</div>
						) : (
							<div key={i} className="flex items-center gap-2 px-2 py-1">
								<span className="bg-foreground/10 h-2.5 w-2.5 rounded" />
								<WFBar w={`${50 + ((i * 7) % 35)}%`} h={4} tone="soft" />
							</div>
						)
					)}
				</nav>
				<div className="border-border mt-auto flex items-center gap-2 rounded-md border p-2">
					<span className="bg-foreground/10 h-6 w-6 rounded-full" />
					<div className="flex flex-1 flex-col gap-1">
						<WFBar w={50} h={4} tone="mid" />
						<WFBar w={75} h={3} tone="soft" />
					</div>
				</div>
			</aside>

			{/* Main column */}
			<div className="flex flex-1 flex-col">
				{/* Topbar */}
				<div className="border-border flex items-center gap-2 border-b px-3 py-2.5">
					<span className="bg-foreground/10 h-4 w-4 rounded" />
					<WFBar w={64} h={5} tone="mid" />
					{label ? (
						<span className="text-muted-foreground ml-3 hidden truncate font-mono text-[0.625rem] tracking-[0.14em] uppercase md:inline">
							{label}
						</span>
					) : null}
					<span className="bg-foreground/10 ml-auto h-3.5 w-3.5 rounded-full" />
				</div>

				{/* Content */}
				<div className="flex flex-1 flex-col gap-3 p-3">
					{/* Welcome banner */}
					<div className="border-border from-muted via-background to-muted/40 relative flex min-h-[4.5rem] flex-1 items-end overflow-hidden rounded-lg border bg-gradient-to-tr p-3">
						<div className="ml-auto flex flex-col items-end gap-1.5 self-end text-right">
							<WFBar w="8rem" h={9} tone="strong" />
							<WFBar w="6rem" h={4} tone="soft" />
						</div>
					</div>

					{/* 4 stat cards */}
					<div className="grid grid-cols-4 gap-2">
						{Array.from({ length: 4 }).map((_, i) => (
							<WFStatCard key={i} />
						))}
					</div>

					{/* 3 cards */}
					<div className="grid grid-cols-3 gap-2">
						{Array.from({ length: 3 }).map((_, i) => (
							<WFStatCard key={i} />
						))}
					</div>

					{/* 2 chart panels */}
					<div className="grid flex-1 grid-cols-2 gap-2">
						<div className="border-border flex flex-col gap-2 rounded-lg border p-2.5">
							<WFBar w={55} h={5} tone="mid" />
							<WFHBars bars={[80, 55, 95, 40]} className="flex-1" />
						</div>
						<div className="border-border flex flex-col gap-2 rounded-lg border p-2.5">
							<WFBar w={55} h={5} tone="mid" />
							<div className="flex flex-1 items-center justify-center">
								<WFDonut pct={68} className="h-20 w-20" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

/* ── Feature glyphs (one per highlighted module) ───────────────────────── */

/** Órdenes de Trabajo — lead card: header + KPI chips + data table. */
function OrdenesGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<WFBar w={90} h={30} tone="strong" />
				<div className="ml-auto flex gap-1.5">
					<span className="border-border h-5 w-14 rounded border" />
					<span className="border-border h-5 w-14 rounded border" />
				</div>
			</div>
			<div className="mt-2.5 flex gap-1.5">
				<WFKpiChip />
				<WFKpiChip />
				<WFKpiChip />
				<WFKpiChip />
			</div>
			<WFTable cols={[1.6, 1.4, 1, 1.2]} rows={10} pillCol={3} className="mt-2.5 flex-1" />
		</WFGlyphCard>
	)
}

/** Carpetas de Arranque — folder rows with per-state document counts. */
function CarpetasGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<WFBar w={70} h={30} tone="mid" />
			<div className="mt-2 flex flex-1 flex-col justify-center gap-2">
				{Array.from({ length: 3 }).map((_, i) => (
					<div key={i} className="flex items-center gap-2">
						<span className="bg-foreground/10 h-4 w-4 shrink-0 rounded-sm" />
						<WFBar w="40%" h={4} tone="soft" />
						<div className="ml-auto flex gap-1">
							{Array.from({ length: 3 }).map((__, j) => (
								<span key={j} className="border-border h-3.5 w-5 rounded-full border" />
							))}
						</div>
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

/** Permisos de Trabajo — a generated PDF document with numbered sections. */
function PermisosGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="border-border bg-background/60 flex h-full flex-col rounded-md border p-2.5">
				{/* Document header */}
				<div className="flex items-center gap-2">
					<span className="bg-foreground/60 h-5 w-5 rounded" />
					<WFBar w={70} h={6} tone="strong" />
					<div className="ml-auto flex flex-col items-end gap-1">
						<WFBar w={40} h={3} tone="soft" />
						<WFBar w={32} h={3} tone="soft" />
					</div>
				</div>
				<span className="bg-border mt-1.5 h-px w-full" />
				{/* Section */}
				<div className="mt-2 flex flex-1 flex-col justify-center gap-1.5">
					<div className="flex items-center gap-1.5">
						<span className="bg-foreground/45 h-3 w-3 rounded-sm" />
						<WFBar w={55} h={4} tone="mid" />
					</div>
					<div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
						{Array.from({ length: 4 }).map((_, i) => (
							<div key={i} className="flex items-center gap-1.5">
								<WFBar w={28} h={3} tone="soft" />
								<WFBar w={36} h={3} tone="mid" />
							</div>
						))}
					</div>
					<div className="mt-0.5 flex items-center gap-1.5">
						<span className="border-border h-3 w-3 rounded-sm border" />
						<WFBar w={45} h={3} tone="soft" />
					</div>
				</div>
			</div>
		</WFGlyphCard>
	)
}

/** Planes de Mantenimiento — plan rows with health-percentage bars. (inferred) */
function PlanesGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<WFBar w={65} h={20} tone="mid" />
			<div className="mt-2 flex flex-1 flex-col justify-center gap-2.5">
				{[78, 54, 90].map((pct, i) => (
					<div key={i} className="flex items-center gap-2">
						<span className="bg-foreground/10 h-3.5 w-3.5 shrink-0 rounded" />
						<WFBar w="28%" h={4} tone="soft" />
						<div className="bg-foreground/10 ml-auto h-2 w-1/3 overflow-hidden rounded-full">
							<div className="bg-foreground/55 h-full rounded-full" style={{ width: `${pct}%` }} />
						</div>
						<WFBar w={16} h={4} tone="mid" />
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

/** Solicitudes de Trabajo — request inbox: rows with status pills. (inferred) */
function SolicitudesGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<WFBar w={55} h={20} tone="mid" />
				<span className="border-border ml-auto h-4 w-10 rounded border" />
			</div>
			<div className="mt-2 flex flex-1 flex-col justify-center gap-2">
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className="flex items-center gap-2">
						<span className="bg-foreground/45 h-2 w-2 shrink-0 rounded-full" />
						<WFBar w={`${45 + ((i * 11) % 30)}%`} h={4} tone="soft" />
						<span className="ml-auto">
							<WFPill w={32} />
						</span>
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

/** Indicadores — KPI combo chart (bars + line) beside a donut. */
function IndicadoresGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<WFBar w={60} h={20} tone="mid" />
				<span className="border-border ml-auto h-4 w-10 rounded border" />
			</div>
			<div className="mt-2 flex flex-1 items-stretch gap-3">
				<WFComboChart
					bars={[40, 62, 48, 80, 58, 90, 70]}
					line={[30, 55, 45, 70, 60, 85, 78]}
					className="flex-[2]"
				/>
				<div className="flex w-14 items-center justify-center">
					<WFDonut pct={72} className="h-12 w-12" />
				</div>
			</div>
		</WFGlyphCard>
	)
}

/**
 * Feature wireframes keyed by the exact `feature.title` in portfolio-data.ts.
 * The case-study view falls back to the generic glyph for any unmatched title.
 */
export const otc360FeatureGlyphs: Record<string, (props: { className?: string }) => ReactNode> = {
	"Órdenes de Trabajo": OrdenesGlyph,
	"Carpetas de Arranque": CarpetasGlyph,
	"Permisos de Trabajo": PermisosGlyph,
	"Planes de Mantenimiento": PlanesGlyph,
	"Solicitudes de Trabajo": SolicitudesGlyph,
	"Indicadores": IndicadoresGlyph,
}
