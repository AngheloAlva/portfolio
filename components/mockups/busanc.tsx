import { Fragment, type ReactNode } from "react"
import { WFBar, WFGlyphCard, WFPill, WFStatCard } from "@/components/mockups/primitives"

/* ────────────────────────────────────────────────────────────────────────
 * Busanc — Plataforma de Gestión Comercial e Industrial — B&W wireframes.
 *
 * A broad multi-area ERP (Comercial, Ingeniería, Hispana, Evaluación & Costos,
 * Planificación, Calidad). The case-study "features" are product capabilities,
 * each rendered through its real screen: management dashboard, commercial-
 * request table, parallel component validation, component-centric production
 * steppers, immutable activity log, capacity heatmap and dispatch guide.
 *
 * Structure only — no real data — honouring `confidential-ui`.
 * ──────────────────────────────────────────────────────────────────────── */

/** Process stepper — connected dots, the first `done` filled. */
function Stepper({ steps, done }: { steps: number; done: number }): ReactNode {
	return (
		<div className="flex items-center">
			{Array.from({ length: steps }).map((_, i) => (
				<Fragment key={i}>
					<span
						className={`h-2 w-2 shrink-0 rounded-full ${
							i < done ? "bg-foreground/60" : "bg-foreground/10"
						}`}
					/>
					{i < steps - 1 ? (
						<span className={`h-px flex-1 ${i < done - 1 ? "bg-foreground/40" : "bg-foreground/10"}`} />
					) : null}
				</Fragment>
			))}
		</div>
	)
}

/** HERO — "Dashboard Gerencia": app shell + banner + stat grid + panels. */
export function BusancHero({ label }: { label?: string }): ReactNode {
	const navRows = 8
	return (
		<div
			aria-hidden="true"
			className="border-border bg-background flex h-full min-h-88 w-full overflow-hidden rounded-2xl border"
		>
			{/* Sidebar */}
			<aside className="border-border hidden w-1/5 min-w-34 flex-col gap-2.5 border-r p-3 sm:flex">
				<div className="flex items-center gap-2">
					<span className="bg-foreground/70 h-6 w-6 rotate-45 rounded-sm" />
					<WFBar w={48} h={7} tone="strong" />
				</div>
				{/* search */}
				<div className="border-border flex items-center gap-2 rounded-md border px-2 py-1.5">
					<span className="border-border h-2.5 w-2.5 rounded-full border" />
					<WFBar w={40} h={4} tone="soft" />
					<span className="bg-foreground/10 ml-auto h-3 w-5 rounded" />
				</div>
				<WFBar w={36} h={3} tone="soft" />
				<nav className="flex flex-col gap-1">
					{Array.from({ length: navRows }).map((_, i) =>
						i === 0 ? (
							<div
								key={i}
								className="bg-foreground/10 flex items-center gap-2 rounded-md px-2 py-1.5"
							>
								<span className="bg-foreground/70 h-2.5 w-2.5 rounded" />
								<WFBar w={66} h={5} tone="strong" />
							</div>
						) : (
							<div key={i} className="flex items-center gap-2 px-2 py-1">
								<span className="bg-foreground/10 h-2.5 w-2.5 rounded" />
								<WFBar w={`${48 + ((i * 9) % 34)}%`} h={4} tone="soft" />
								{i < 6 ? (
									<span className="border-border ml-auto h-2.5 w-2.5 rounded-sm border" />
								) : null}
							</div>
						)
					)}
				</nav>
				<div className="border-border mt-auto flex items-center gap-2 rounded-md border p-2">
					<span className="bg-foreground/10 h-6 w-6 rounded-full" />
					<div className="flex flex-1 flex-col gap-1">
						<WFBar w={55} h={4} tone="mid" />
						<WFBar w={80} h={3} tone="soft" />
					</div>
				</div>
			</aside>

			{/* Main column */}
			<div className="flex min-w-0 flex-1 flex-col">
				{/* Topbar */}
				<div className="border-border flex items-center gap-2 border-b px-3 py-2.5">
					<span className="bg-foreground/10 h-4 w-4 rounded" />
					<WFBar w={44} h={4} tone="soft" />
					<span className="bg-border h-2 w-2 rounded-full" />
					<WFBar w={28} h={4} tone="mid" />
					{label ? (
						<span className="text-muted-foreground ml-3 hidden max-w-[30%] min-w-0 truncate font-mono text-[0.625rem] tracking-[0.14em] uppercase lg:inline">
							{label}
						</span>
					) : null}
					<div className="ml-auto flex items-center gap-2">
						<span className="border-border hidden h-5 w-28 rounded-md border md:block" />
						<span className="bg-foreground/10 h-3.5 w-3.5 rounded-full" />
						<span className="bg-foreground/10 h-3.5 w-3.5 rounded-full" />
					</div>
				</div>

				{/* Content */}
				<div className="flex flex-1 flex-col gap-3 p-3">
					{/* Banner */}
					<div className="border-border from-muted via-background to-muted/40 relative flex min-h-16 flex-1 items-end overflow-hidden rounded-xl border bg-linear-to-r p-3">
						<div className="flex flex-col gap-1.5">
							<WFBar w="7rem" h={4} tone="soft" />
							<WFBar w="9rem" h={9} tone="strong" />
						</div>
					</div>

					{/* 4 stat cards */}
					<div className="grid grid-cols-4 gap-2">
						{Array.from({ length: 4 }).map((_, i) => (
							<WFStatCard key={i} />
						))}
					</div>
					{/* 3 stat cards */}
					<div className="grid grid-cols-3 gap-2">
						{Array.from({ length: 3 }).map((_, i) => (
							<WFStatCard key={i} />
						))}
					</div>

					{/* chart + quick actions */}
					<div className="grid flex-1 grid-cols-3 gap-2">
						<div className="border-border col-span-2 flex flex-col gap-2 rounded-lg border p-2.5">
							<WFBar w={45} h={5} tone="mid" />
							<div className="flex flex-1 items-end gap-1.5">
								{[42, 70, 30, 88, 55, 64].map((h, i) => (
									<div
										key={i}
										className="bg-foreground/55 flex-1 rounded-t"
										style={{ height: `${h}%` }}
									/>
								))}
							</div>
						</div>
						<div className="border-border flex flex-col gap-2 rounded-lg border p-2.5">
							<WFBar w={60} h={5} tone="mid" />
							{Array.from({ length: 3 }).map((_, i) => (
								<div
									key={i}
									className="border-border flex items-center gap-2 rounded-md border p-1.5"
								>
									<WFBar w={50} h={4} tone="soft" />
									<span className="bg-foreground/10 ml-auto h-4 w-4 rounded" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

/* ── Feature glyphs ────────────────────────────────────────────────────── */

/** Flujo Comercial Unificado — the commercial-requests table (lead). */
function FlujoGlyph({ className }: { className?: string }): ReactNode {
	const cols = [1, 1.7, 1.4, 1.1, 1.1]
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<WFBar w={90} h={30} tone="strong" />
				<div className="bg-foreground/70 ml-auto h-5 w-20 rounded-md" />
			</div>
			<div className="mt-2.5 flex gap-1.5">
				{Array.from({ length: 3 }).map((_, i) => (
					<div key={i} className="border-border flex flex-1 flex-col gap-1 rounded-md border p-1.5">
						<WFBar w={50} h={8} tone="soft" />
						<WFBar w={40} h={24} tone="strong" />
					</div>
				))}
			</div>
			{/* table with two status-pill columns */}
			<div className="border-border mt-2.5 flex flex-1 flex-col overflow-hidden rounded-md border">
				<div className="border-border bg-foreground/[0.06] flex items-center gap-2 border-b px-2 py-1.5">
					{cols.map((flex, c) => (
						<div key={c} style={{ flex }}>
							<WFBar w="70%" h={4} tone="mid" />
						</div>
					))}
				</div>
				<div className="flex flex-1 flex-col">
					{Array.from({ length: 10 }).map((_, r) => (
						<div
							key={r}
							className="border-border/60 flex flex-1 items-center gap-2 border-b px-2 last:border-b-0"
						>
							{cols.map((flex, c) => (
								<div key={c} style={{ flex }} className="flex items-center">
									{c === 3 || c === 4 ? (
										<WFPill w={34} />
									) : (
										<WFBar w={c === 0 ? "55%" : "85%"} h={4} tone="soft" />
									)}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</WFGlyphCard>
	)
}

/** Trabajo en Paralelo — component validation: areas + items + Guardar/Cerrar. */
function ParaleloGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<WFBar w={45} h={20} tone="mid" />
				<div className="ml-auto flex gap-1">
					{Array.from({ length: 3 }).map((_, i) => (
						<span key={i} className="border-border h-3 w-7 rounded-full border" />
					))}
				</div>
			</div>
			<div className="mt-2 flex flex-1 flex-col justify-center gap-1.5">
				{/* parent + sub rows */}
				{[{ indent: false }, { indent: true }, { indent: true }].map((row, i) => (
					<div key={i} className="flex items-center gap-2">
						<span className={`h-3 ${row.indent ? "ml-3 w-10" : "w-12"} bg-foreground/10 rounded`} />
						<WFBar w={row.indent ? "30%" : "40%"} h={4} tone="soft" />
						<span className="bg-foreground/40 ml-auto h-3 w-8 rounded" />
					</div>
				))}
				<div className="bg-foreground/6 mt-0.5 flex items-center rounded px-2 py-1">
					<WFBar w={40} h={4} tone="mid" />
					<span className="bg-foreground/45 ml-auto h-3 w-12 rounded" />
				</div>
			</div>
			{/* actions */}
			<div className="mt-2 flex gap-1.5">
				<span className="border-border h-5 flex-1 rounded-md border" />
				<span className="bg-foreground/70 h-5 flex-1 rounded-md" />
			</div>
		</WFGlyphCard>
	)
}

/** Modelo Componente-Céntrico — per-component OT with a process stepper. */
function ComponenteGlyph({ className }: { className?: string }): ReactNode {
	const rows = [5, 3, 4]
	return (
		<WFGlyphCard className={className}>
			<WFBar w={60} h={20} tone="mid" />
			<div className="mt-2 flex flex-1 flex-col justify-center gap-3">
				{rows.map((done, i) => (
					<div key={i} className="flex items-center gap-2">
						<span className="border-border h-3 w-12 shrink-0 rounded border" />
						<div className="flex-1">
							<Stepper steps={6} done={done} />
						</div>
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

/** Activity Log — immutable action history with entity tags. */
function ActivityGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<WFBar w={55} h={20} tone="mid" />
			<div className="mt-2 flex flex-1 flex-col justify-center gap-2">
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className="flex items-center gap-2">
						<span className="bg-foreground/10 h-2.5 w-10 shrink-0 rounded" />
						<span className="border-border h-3.5 w-12 shrink-0 rounded-full border" />
						<WFBar w={`${40 + ((i * 13) % 28)}%`} h={4} tone="soft" />
						<span className="bg-foreground/10 ml-auto h-3 w-3 rounded-full" />
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

/** Dashboard de Capacidad — calendar heatmap + utilization bars. (inferred) */
function CapacityGlyph({ className }: { className?: string }): ReactNode {
	// deterministic heatmap intensities (0..1)
	const heat = [
		0.15, 0.4, 0.7, 0.25, 0.9, 0.55, 0.1, 0.6, 0.3, 0.8, 0.45, 0.2, 0.95, 0.5, 0.35, 0.75, 0.15,
		0.65, 0.4, 0.85, 0.3,
	]
	return (
		<WFGlyphCard className={className}>
			<WFBar w={55} h={20} tone="mid" />
			<div className="mt-2 flex flex-1 flex-col justify-center gap-2">
				<div className="grid grid-cols-7 gap-1">
					{heat.map((v, i) => (
						<span
							key={i}
							className="bg-foreground h-3 rounded-sm"
							style={{ opacity: 0.12 + v * 0.6 }}
						/>
					))}
				</div>
				<div className="mt-1 flex flex-col gap-1.5">
					{[80, 55].map((w, i) => (
						<div key={i} className="flex items-center gap-2">
							<span className="bg-foreground/10 h-2 w-8 shrink-0 rounded" />
							<div className="bg-foreground/10 h-2 flex-1 overflow-hidden rounded-full">
								<div className="bg-foreground/50 h-full rounded-full" style={{ width: `${w}%` }} />
							</div>
						</div>
					))}
				</div>
			</div>
		</WFGlyphCard>
	)
}

/** Guía de Despacho — dispatch document with a Zebra barcode label. (inferred) */
function DispatchGlyph({ className }: { className?: string }): ReactNode {
	const bars = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 1, 2, 1, 3, 2]
	return (
		<WFGlyphCard className={className}>
			<div className="border-border bg-background/60 flex h-full flex-col rounded-md border p-2.5">
				{/* doc header */}
				<div className="flex items-center gap-2">
					<span className="bg-foreground/60 h-4 w-4 rotate-45 rounded-sm" />
					<WFBar w={50} h={10} tone="strong" />
					<WFBar w={28} h={4} tone="soft" className="ml-auto" />
				</div>
				<span className="bg-border mt-1.5 h-px w-full" />
				{/* line items */}
				<div className="mt-2 flex flex-1 flex-col justify-center gap-1.5">
					{Array.from({ length: 2 }).map((_, i) => (
						<div key={i} className="flex items-center gap-2">
							<WFBar w="35%" h={3} tone="soft" />
							<WFBar w="20%" h={3} tone="soft" className="ml-auto" />
						</div>
					))}
				</div>
				{/* Zebra barcode */}
				<div className="border-border bg-background mt-1.5 flex items-end justify-center gap-0.5 rounded border p-1.5">
					{bars.map((w, i) => (
						<span key={i} className="bg-foreground/75 h-5" style={{ width: w }} />
					))}
				</div>
			</div>
		</WFGlyphCard>
	)
}

/**
 * Feature wireframes keyed by the exact `feature.title` in portfolio-data.ts.
 */
export const busancFeatureGlyphs: Record<string, (props: { className?: string }) => ReactNode> = {
	"Flujo Comercial Unificado": FlujoGlyph,
	"Trabajo en Paralelo entre Áreas": ParaleloGlyph,
	"Modelo Componente-Céntrico de Producción": ComponenteGlyph,
	"Activity Log y Trazabilidad End-to-End": ActivityGlyph,
	"Dashboard de Capacidad por Área": CapacityGlyph,
	"Guía de Despacho Enriquecida": DispatchGlyph,
}
