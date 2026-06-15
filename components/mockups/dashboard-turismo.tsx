import { Fragment, type ReactNode } from "react"
import { WFBar, WFGlyphCard, WFPill } from "@/components/mockups/primitives"

/* ────────────────────────────────────────────────────────────────────────
 * Dashboard TurismoChileTours — operación interna de un tour operador en San
 * Pedro de Atacama — B&W wireframes faithful to the real product.
 *
 * Modelado sobre las pantallas reales: Inicio (8 KPIs + resumen de ventas +
 * próximos eventos), Calendario de Operaciones (grilla mensual con chips por
 * categoría), Análisis de Datos (filtros + evolución de ventas + top tours),
 * Facturación mayorista, Roles/permisos, Traspasos/Recepción y la migración
 * ETL. El producto real usa naranja/azul/verde; aquí se traduce a la escala de
 * tinta del sistema de wireframes (strong / mid / soft) para respetar
 * `confidential-ui` — estructura fiel, sin datos ni branding reales.
 * ──────────────────────────────────────────────────────────────────────── */

/* ── Local building blocks ─────────────────────────────────────────────── */

/** Right chevron (collapsible nav / breadcrumb separator). */
function Chevron({ className }: { className?: string }): ReactNode {
	return (
		<span
			className={`border-foreground/30 h-1.5 w-1.5 rotate-45 border-t border-r ${className ?? ""}`}
		/>
	)
}

/** Pill toggle switch (the "Activo" / "Vouchers activos" controls). */
function Toggle({ on }: { on?: boolean }): ReactNode {
	return (
		<span
			className={`flex h-3.5 w-6 shrink-0 items-center rounded-full p-0.5 ${
				on ? "bg-foreground/70 justify-end" : "bg-muted justify-start"
			}`}
		>
			<span className="bg-background h-2.5 w-2.5 rounded-full" />
		</span>
	)
}

/** A select / dropdown chip — a label with a down caret inside a border. */
function SelectChip({ className, w }: { className?: string; w?: number }): ReactNode {
	return (
		<span
			className={`border-border flex h-5 items-center gap-1 rounded-md border px-1.5 ${className ?? ""}`}
			style={w ? { width: w } : undefined}
		>
			<WFBar w="68%" h={3} tone="soft" />
			<span className="border-foreground/30 ml-auto h-1 w-1 rotate-45 border-r border-b" />
		</span>
	)
}

/**
 * KPI card faithful to the real ones: label top-left, icon disc top-right, a
 * big number and a caption — no accent strip.
 */
function KpiCard(): ReactNode {
	return (
		<div className="border-border bg-background flex flex-col gap-1.5 rounded-xl border p-2.5">
			<div className="flex items-start justify-between gap-2">
				<WFBar w={62} h={4} tone="soft" />
				<span className="bg-muted h-5 w-5 shrink-0 rounded-full" />
			</div>
			<WFBar w={48} h={12} tone="strong" />
			<WFBar w={78} h={3} tone="soft" />
		</div>
	)
}

/** Area chart (filled) drawn with SVG — the signature sales-trend panel. */
function AreaChart({
	points,
	className,
}: {
	points: readonly number[]
	className?: string
}): ReactNode {
	const n = points.length
	const line = points.map((y, i) => `${(i / (n - 1)) * 100},${100 - y}`)
	const area = `0,100 ${line.join(" ")} 100,100`
	return (
		<svg
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
			className={`text-foreground ${className ?? ""}`}
			aria-hidden="true"
		>
			<polygon points={area} fill="currentColor" fillOpacity={0.1} />
			<polyline
				points={line.join(" ")}
				fill="none"
				stroke="currentColor"
				strokeOpacity={0.55}
				strokeWidth={1.5}
				vectorEffect="non-scaling-stroke"
			/>
		</svg>
	)
}

/* ── HERO — "Inicio" / Dashboard de gestión ────────────────────────────── */

/** Smooth 12-month sales hills that climb to a peak then drop (like the real). */
const SALES_HILLS = [20, 18, 27, 23, 39, 33, 47, 41, 37, 60, 84, 92, 14] as const

export function DashboardTurismoHero({ label }: { label?: string }): ReactNode {
	const mainNav = [
		{ active: true, chevron: false },
		{ active: false, chevron: true },
		{ active: false, chevron: true },
		{ active: false, chevron: true },
		{ active: false, chevron: true },
		{ active: false, chevron: false },
		{ active: false, chevron: false },
	]
	const adminNav = [62, 58, 70, 54, 40, 36]

	return (
		<div
			aria-hidden="true"
			className="border-border bg-background flex h-full min-h-120 w-full overflow-hidden rounded-2xl border"
		>
			{/* Sidebar */}
			<aside className="border-border hidden w-1/5 min-w-40 flex-col gap-2 border-r p-2.5 sm:flex">
				{/* brand */}
				<div className="flex items-center gap-2 px-1">
					<span className="bg-foreground/70 h-7 w-7 shrink-0 rounded-lg" />
					<div className="flex flex-col gap-1">
						<WFBar w={70} h={6} tone="strong" />
						<WFBar w={50} h={3} tone="soft" />
					</div>
				</div>

				{/* Menú principal */}
				<WFBar w={42} h={3} tone="soft" className="mt-1 ml-1" />
				<nav className="flex flex-col gap-0.5">
					{mainNav.map((item, i) => (
						<div
							key={i}
							className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${
								item.active ? "bg-foreground/10" : ""
							}`}
						>
							<span
								className={`h-3 w-3 shrink-0 rounded ${
									item.active ? "bg-foreground/70" : "bg-muted"
								}`}
							/>
							<WFBar w={`${52 + ((i * 13) % 30)}%`} h={4} tone={item.active ? "strong" : "soft"} />
							{item.chevron ? <Chevron className="ml-auto" /> : null}
						</div>
					))}
				</nav>

				{/* Administración */}
				<WFBar w={48} h={3} tone="soft" className="mt-1 ml-1" />
				<nav className="flex flex-col gap-0.5">
					{adminNav.map((w, i) => (
						<div key={i} className="flex items-center gap-2 px-2 py-1.5">
							<span className="bg-muted h-3 w-3 shrink-0 rounded" />
							<WFBar w={`${w}%`} h={4} tone="soft" />
						</div>
					))}
				</nav>

				{/* user card */}
				<div className="border-border mt-auto flex items-center gap-2 rounded-lg border p-2">
					<span className="bg-foreground/15 h-6 w-6 shrink-0 rounded-full" />
					<div className="flex flex-1 flex-col gap-1">
						<WFBar w={58} h={4} tone="mid" />
						<WFBar w={82} h={3} tone="soft" />
					</div>
					<Chevron className="-rotate-45" />
				</div>
			</aside>

			{/* Main column */}
			<div className="flex min-w-0 flex-1 flex-col">
				{/* Topbar */}
				<div className="border-border flex items-center gap-2 border-b px-3 py-2.5">
					<span className="border-border h-4 w-4 rounded border" />
					<WFBar w={44} h={4} tone="soft" />
					<Chevron />
					<WFBar w={26} h={4} tone="mid" />
					{label ? (
						<span className="text-muted-foreground ml-3 hidden max-w-[30%] min-w-0 truncate font-mono text-[0.625rem] tracking-[0.14em] uppercase lg:inline">
							{label}
						</span>
					) : null}
					<span className="bg-muted ml-auto h-4 w-4 rounded-full" />
				</div>

				{/* Content */}
				<div className="flex flex-1 flex-col gap-3 p-3">
					{/* Tutorial button */}
					<span className="border-border ml-auto flex h-5 items-center gap-1 rounded-md border px-2">
						<span className="bg-muted h-2 w-2 rounded-full" />
						<WFBar w={40} h={3} tone="soft" />
					</span>

					{/* 8 KPI cards (2 × 4) */}
					<div className="grid grid-cols-4 gap-2">
						{Array.from({ length: 8 }).map((_, i) => (
							<KpiCard key={i} />
						))}
					</div>

					{/* Resumen de Ventas + Próximos Eventos */}
					<div className="grid flex-1 grid-cols-3 gap-2">
						{/* sales summary (area chart) */}
						<div className="border-border col-span-2 flex flex-col gap-2 rounded-xl border p-3">
							<div className="flex flex-col gap-1">
								<WFBar w={34} h={6} tone="strong" />
								<WFBar w={52} h={3} tone="soft" />
							</div>
							<div className="relative min-h-20 flex-1">
								<AreaChart points={SALES_HILLS} className="absolute inset-0 h-full w-full" />
							</div>
							{/* month ticks */}
							<div className="flex gap-1">
								{Array.from({ length: 12 }).map((_, i) => (
									<WFBar key={i} w="100%" h={3} tone="soft" className="flex-1" />
								))}
							</div>
							{/* legend */}
							<div className="flex items-center justify-center gap-3">
								{[0, 1].map((i) => (
									<span key={i} className="flex items-center gap-1">
										<span
											className={`h-2 w-2 rounded-full ${
												i === 0 ? "bg-foreground/40" : "bg-foreground/70"
											}`}
										/>
										<WFBar w={28} h={3} tone="soft" />
									</span>
								))}
							</div>
						</div>

						{/* upcoming events list */}
						<div className="border-border flex flex-col gap-2 rounded-xl border p-3">
							<WFBar w={62} h={6} tone="strong" />
							<div className="flex flex-1 flex-col justify-between gap-2">
								{Array.from({ length: 9 }).map((_, i) => (
									<div key={i} className="flex items-center gap-2">
										<span className="border-border h-6 w-6 shrink-0 rounded-md border" />
										<div className="flex flex-1 flex-col gap-1">
											<WFBar w={`${64 + ((i * 7) % 24)}%`} h={4} tone="mid" />
											<WFBar w={`${40 + ((i * 5) % 18)}%`} h={3} tone="soft" />
										</div>
										<div className="flex shrink-0 items-center gap-1">
											<span className="bg-muted h-2.5 w-2.5 rounded-full" />
											<WFBar w={8} h={3} tone="soft" />
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

/* ── Feature glyphs ────────────────────────────────────────────────────── */

/** Calendar event chip — a category accent bar + a title run. */
function CalChip({ accent }: { accent: string }): ReactNode {
	return (
		<div className="border-border bg-background/70 flex items-center gap-0.5 rounded-[2px] border px-0.5 py-[1px]">
			<span className={`h-2 w-0.5 shrink-0 rounded ${accent}`} />
			<WFBar w="85%" h={2} tone="soft" />
		</div>
	)
}

const CAT_ACCENT = {
	regular: "bg-foreground/25",
	privado: "bg-foreground/50",
	transfer: "bg-foreground/65",
} as const

type Cat = keyof typeof CAT_ACCENT

/**
 * Calendario operativo con drag-and-drop — the monthly operations board with
 * stat row, view switcher, category legend and a grid of colour-coded events.
 * The lead (2×2) card.
 */
function CalendarioGlyph({ className }: { className?: string }): ReactNode {
	const weeks: Cat[][] = [
		["regular", "privado", "regular"],
		["transfer", "regular", "privado"],
		["regular", "regular"],
		["privado", "regular", "transfer"],
		["regular", "privado"],
		["transfer", "regular"],
		["regular", "privado", "regular"],
		["regular", "transfer"],
		["privado", "regular", "privado"],
		["regular", "transfer"],
		["transfer", "privado"],
		["regular", "privado", "regular"],
		["regular", "transfer"],
		["privado", "regular"],
		["regular", "privado"],
		["transfer", "regular", "privado"],
		["regular", "transfer"],
		["privado", "regular"],
		["regular", "privado", "regular"],
		["transfer", "regular"],
		["regular", "privado"],
	]
	const legend: Cat[] = ["regular", "privado", "transfer"]

	return (
		<WFGlyphCard className={className}>
			{/* header: title + filters */}
			<div className="flex items-center gap-2">
				<div className="flex flex-col gap-1">
					<WFBar w={130} h={9} tone="strong" />
					<WFBar w={96} h={3} tone="soft" />
				</div>
				<div className="ml-auto flex items-center gap-1.5">
					<Toggle on />
					<SelectChip w={56} />
					<span className="border-border flex h-5 items-center gap-1 rounded-md border px-2">
						<span className="bg-muted h-2 w-2 rounded" />
						<WFBar w={20} h={3} tone="soft" />
					</span>
				</div>
			</div>

			{/* 4 stat mini-cards */}
			<div className="mt-2 grid grid-cols-4 gap-1.5">
				{Array.from({ length: 4 }).map((_, i) => (
					<div
						key={i}
						className="border-border bg-background flex flex-col gap-1 rounded-lg border p-1.5"
					>
						<div className="flex items-center justify-between">
							<WFBar w={52} h={3} tone="soft" />
							<span className="bg-muted h-3 w-3 rounded-full" />
						</div>
						<WFBar w={42} h={9} tone="strong" />
						<WFBar w={72} h={2} tone="soft" />
					</div>
				))}
			</div>

			{/* month toolbar */}
			<div className="mt-2 flex items-center gap-2">
				<WFBar w={64} h={8} tone="strong" />
				<div className="ml-auto flex items-center gap-1">
					<span className="border-border h-4 w-11 rounded border" />
					<span className="border-border h-4 w-11 rounded border" />
					<div className="border-border flex items-center gap-0.5 rounded-md border p-0.5">
						{[0, 1, 2, 3].map((i) => (
							<span
								key={i}
								className={`h-3 w-5 rounded ${i === 2 ? "bg-foreground/70" : "bg-muted"}`}
							/>
						))}
					</div>
				</div>
			</div>

			{/* legend */}
			<div className="mt-1.5 flex items-center gap-3">
				{legend.map((c) => (
					<span key={c} className="flex items-center gap-1">
						<span className={`h-2 w-2 rounded-full ${CAT_ACCENT[c]}`} />
						<WFBar w={22} h={2} tone="soft" />
					</span>
				))}
				<span className="flex items-center gap-1">
					<span className="border-border h-2 w-2 rounded-full border" />
					<WFBar w={18} h={2} tone="soft" />
				</span>
			</div>

			{/* month grid */}
			<div className="border-border mt-1.5 flex flex-1 flex-col overflow-hidden rounded-md border">
				<div className="border-border bg-muted/40 grid grid-cols-7 border-b">
					{Array.from({ length: 7 }).map((_, i) => (
						<div key={i} className="flex justify-center py-1">
							<WFBar w={40} h={3} tone="mid" />
						</div>
					))}
				</div>
				<div className="grid flex-1 grid-cols-7 grid-rows-3">
					{weeks.map((chips, i) => (
						<div
							key={i}
							className="border-border/60 flex flex-col gap-0.5 border-r border-b p-0.5 [&:nth-child(7n)]:border-r-0"
						>
							<div className="flex items-center justify-between px-0.5">
								<span className="bg-muted h-1.5 w-1.5 rounded-full" />
								{i === 1 ? (
									<span className="bg-foreground/70 flex h-3 w-3 items-center justify-center rounded-full">
										<span className="bg-background h-1 w-1 rounded-full" />
									</span>
								) : (
									<WFBar w={7} h={3} tone="mid" />
								)}
							</div>
							{chips.map((c, ci) => (
								<CalChip key={ci} accent={CAT_ACCENT[c]} />
							))}
						</div>
					))}
				</div>
			</div>
		</WFGlyphCard>
	)
}

/** Many-point spiky daily revenue line (amplitude fills the chart height). */
const SPIKY = [
	18, 34, 14, 48, 24, 90, 28, 16, 62, 22, 40, 18, 56, 26, 82, 24, 34, 16, 50, 28, 74, 20, 94, 12,
] as const

/**
 * Análisis y reportes con filtros — filter bar, the spiky "Evolución de
 * Ventas" area chart and the "Top 5 Tours" grouped bars + Exportar Excel.
 */
function AnalisisGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			{/* header + Exportar Excel */}
			<div className="flex items-center gap-2">
				<WFBar w={54} h={9} tone="strong" />
				<span className="border-border ml-auto flex h-5 items-center gap-1 rounded-md border px-2">
					<span className="bg-foreground/50 h-2.5 w-2 rounded-[1px]" />
					<WFBar w={30} h={3} tone="soft" />
				</span>
			</div>

			{/* filter chips */}
			<div className="mt-2 flex gap-1">
				{Array.from({ length: 5 }).map((_, i) => (
					<SelectChip key={i} className="flex-1" />
				))}
			</div>

			{/* Evolución de Ventas (spiky) */}
			<div className="relative mt-2 flex-1">
				<div className="border-border absolute top-0 right-0 z-10 flex items-center gap-0.5 rounded-md border p-0.5">
					<span className="bg-foreground/70 h-3 w-7 rounded" />
					<span className="bg-muted h-3 w-7 rounded" />
				</div>
				<AreaChart points={SPIKY} className="absolute inset-x-0 top-5 bottom-0 w-full" />
			</div>

			{/* Top 5 Tours por Mes (grouped bars) */}
			<div className="mt-2 flex h-9 items-end gap-1.5">
				{Array.from({ length: 5 }).map((_, g) => (
					<div key={g} className="flex flex-1 items-end gap-0.5">
						{[82, 66, 54, 38, 28].map((h, b) => (
							<div
								key={b}
								className="bg-foreground/45 flex-1 rounded-t"
								style={{ height: `${h}%` }}
							/>
						))}
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

/**
 * Facturación mayorista con exportes — pick a wholesaler + date range,
 * multiselect sales, see the consolidated total and export PDF / Excel.
 */
function FacturacionGlyph({ className }: { className?: string }): ReactNode {
	const selected = [1, 3, 4]
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<SelectChip w={84} />
				<span className="border-border ml-auto h-5 w-20 rounded-md border" />
			</div>

			{/* selectable sales table */}
			<div className="border-border mt-2 flex flex-1 flex-col overflow-hidden rounded-md border">
				<div className="border-border bg-muted/40 flex items-center gap-2 border-b px-2 py-1.5">
					<span className="border-border h-3 w-3 shrink-0 rounded-[3px] border" />
					<div className="flex-[1.3]">
						<WFBar w="60%" h={3} tone="mid" />
					</div>
					<div className="flex-1">
						<WFBar w="70%" h={3} tone="mid" />
					</div>
					<div className="flex flex-1 justify-end">
						<WFBar w="50%" h={3} tone="mid" />
					</div>
				</div>
				{Array.from({ length: 6 }).map((_, r) => {
					const sel = selected.includes(r)
					return (
						<div
							key={r}
							className={`border-border/60 flex flex-1 items-center gap-2 border-b px-2 last:border-b-0 ${
								sel ? "bg-foreground/8" : ""
							}`}
						>
							<span
								className={`h-3 w-3 shrink-0 rounded-[3px] border ${
									sel ? "bg-foreground/70 border-foreground/70" : "border-border"
								}`}
							/>
							<div className="flex-[1.3]">
								<WFBar w="55%" h={4} tone={sel ? "mid" : "soft"} />
							</div>
							<div className="flex-1">
								<WFPill w={40} />
							</div>
							<div className="flex flex-1 justify-end">
								<WFBar w="48%" h={4} tone="soft" />
							</div>
						</div>
					)
				})}
			</div>

			{/* total + export actions */}
			<div className="mt-2 flex items-center gap-2">
				<WFBar w={24} h={4} tone="soft" />
				<WFBar w={56} h={11} tone="strong" />
				<div className="ml-auto flex gap-1.5">
					<span className="border-border h-6 w-16 rounded-md border" />
					<span className="bg-foreground/70 h-6 w-16 rounded-md" />
				</div>
			</div>
		</WFGlyphCard>
	)
}

/** A short flow connector: a hairline with a chevron head. */
function FlowArrow(): ReactNode {
	return (
		<span className="flex shrink-0 items-center" aria-hidden="true">
			<span className="bg-foreground/30 h-px w-3" />
			<span className="border-foreground/30 -ml-1 h-1.5 w-1.5 rotate-45 border-t border-r" />
		</span>
	)
}

/**
 * Recepciones y traspasos entre agencias — sibling B2B modules: a tab switcher
 * over a table of agency-to-agency movements with pax and status.
 */
function RecepcionesGlyph({ className }: { className?: string }): ReactNode {
	const rows = 4
	return (
		<WFGlyphCard className={className}>
			{/* module tabs */}
			<div className="flex items-center gap-1.5">
				<span className="bg-foreground/10 rounded-md px-2 py-1">
					<WFBar w={44} h={4} tone="mid" />
				</span>
				<span className="border-border rounded-md border px-2 py-1">
					<WFBar w={44} h={4} tone="soft" />
				</span>
				<span className="border-border ml-auto h-5 w-14 rounded-md border" />
			</div>

			{/* agency-to-agency movements table */}
			<div className="border-border mt-2 flex flex-1 flex-col overflow-hidden rounded-md border">
				{Array.from({ length: rows }).map((_, r) => (
					<div
						key={r}
						className="border-border/60 flex flex-1 items-center gap-1.5 border-b px-2 last:border-b-0"
					>
						<span className="bg-muted h-4 w-4 shrink-0 rounded" />
						<WFBar w={40} h={4} tone="soft" />
						<FlowArrow />
						<span className="bg-foreground/55 h-4 w-4 shrink-0 rounded" />
						<WFBar w={40} h={4} tone="soft" />
						<span className="bg-muted ml-2 h-3 w-7 shrink-0 rounded" />
						<span className="ml-auto">
							<WFPill w={36} />
						</span>
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

/**
 * Migración de 11 años — ETL pipeline (Microsoft Lists → Excel maestro → Excel
 * derivado → Postgres) with per-period import batches validated against the
 * shared schema.
 */
function MigracionGlyph({ className }: { className?: string }): ReactNode {
	const batches = [100, 100, 100, 100, 88, 100, 72]
	return (
		<WFGlyphCard className={className}>
			{/* header: title + 2015–2026 range chip */}
			<div className="flex items-center gap-2">
				<WFBar w={56} h={9} tone="strong" />
				<span className="border-border ml-auto flex h-5 items-center gap-1 rounded-md border px-2">
					<span className="bg-muted h-2 w-2 rounded-full" />
					<WFBar w={36} h={3} tone="soft" />
				</span>
			</div>

			{/* pipeline: Lists → Excel maestro → Excel derivado → Postgres */}
			<div className="border-border bg-background/50 mt-2.5 flex items-center rounded-lg border p-2.5">
				{Array.from({ length: 4 }).map((_, i) => (
					<Fragment key={i}>
						<div className="flex flex-col items-center gap-1">
							<span
								className={`flex h-8 w-8 items-center justify-center rounded-md ${
									i === 3 ? "bg-foreground/70" : "border-border bg-background border"
								}`}
							>
								<span
									className={`h-3 w-3 rounded-sm ${i === 3 ? "bg-background/70" : "bg-muted"}`}
								/>
							</span>
							<WFBar w={26} h={3} tone="soft" />
						</div>
						{i < 3 ? (
							<div className="mx-1 flex flex-1 items-center">
								<span className="bg-foreground/25 h-px flex-1" />
								<span className="border-foreground/30 -ml-px h-1.5 w-1.5 rotate-45 border-t border-r" />
							</div>
						) : null}
					</Fragment>
				))}
			</div>

			{/* batches subheader: "Lotes por período" + validated count */}
			<div className="mt-2.5 flex items-center gap-2">
				<WFBar w={72} h={4} tone="mid" />
				<span className="ml-auto flex items-center gap-1">
					<span className="bg-foreground/60 h-2.5 w-2.5 rounded-full" />
					<WFBar w={30} h={3} tone="soft" />
				</span>
			</div>

			{/* per-period import batches validated against the shared Zod schema */}
			<div className="mt-2 flex flex-1 flex-col justify-between gap-1.5">
				{batches.map((w, i) => (
					<div key={i} className="flex items-center gap-2">
						<span className="bg-muted h-2.5 w-10 shrink-0 rounded" />
						<div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
							<div className="bg-foreground/55 h-full rounded-full" style={{ width: `${w}%` }} />
						</div>
						<span
							className={`h-3 w-3 shrink-0 rounded-full ${
								w === 100 ? "bg-foreground/70" : "border-border border"
							}`}
						/>
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

/**
 * Feature wireframes keyed by the exact `feature.title` in portfolio-data.ts.
 */
export const dashboardTurismoFeatureGlyphs: Record<
	string,
	(props: { className?: string }) => ReactNode
> = {
	"Calendario operativo con drag-and-drop": CalendarioGlyph,
	"Análisis y reportes con filtros": AnalisisGlyph,
	"Facturación mayorista con exportes": FacturacionGlyph,
	"Recepciones y traspasos entre agencias": RecepcionesGlyph,
	"Migración de 11 años de data": MigracionGlyph,
}
