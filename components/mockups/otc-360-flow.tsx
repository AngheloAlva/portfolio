"use client"

import { otc360FeatureGlyphs } from "@/components/mockups/otc-360"
import { WFBar, WFGlyphCard, WFPill } from "@/components/mockups/primitives"
import { motion, useInView, useReducedMotion } from "motion/react"
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

/**
 * Swimlane walkthrough of how a work order (OT) moves through OTC 360 between
 * OTC staff, maintenance, contractors and safety. The flow follows the real
 * process described by the client project; nothing here is real client data.
 */

// Diagram coordinate system (viewBox units). Nodes and connectors share it.
const W = 1200
const H = 480
const LABEL_W = 170
const LANE_H = H / 4
const COL_W = (W - LABEL_W) / 6
const NODE_W = 144
const NODE_H = 96

type LaneId = "operator" | "maintenance" | "contractor" | "safety"

const LANES: ReadonlyArray<{ id: LaneId; label: string; detail: string }> = [
	{ id: "operator", label: "Operador OTC", detail: "Equipo de planta" },
	{
		id: "maintenance",
		label: "Operaciones y mantenimiento",
		detail: "Jefe de operaciones y área de mantenimiento",
	},
	{
		id: "contractor",
		label: "Contratista",
		detail: "Empresa externa, con sus requisitos aprobados",
	},
	{ id: "safety", label: "Seguridad", detail: "Prevención de riesgos" },
]

type NodeId =
	| "request"
	| "plan"
	| "approve"
	| "logbook"
	| "permit"
	| "inspection"
	| "review"
	| "closed"

interface FlowNode {
	id: NodeId
	title: string
	lane: LaneId
	col: number
	Glyph: (props: { className?: string }) => ReactNode
}

function LogbookGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<WFBar w={55} h={14} tone="strong" />
			<div className="mt-3 space-y-2.5">
				{[70, 85, 60, 75].map((w, i) => (
					<div key={i} className="flex items-center gap-2">
						<span className="border-foreground/50 h-3 w-3 shrink-0 rounded-full border" />
						<WFBar w={w} h={8} tone={i === 0 ? "mid" : "soft"} />
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

function InspectionGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<WFBar w={45} h={14} tone="strong" />
				<span className="ml-auto">
					<WFPill />
				</span>
			</div>
			<div className="mt-3 grid grid-cols-2 gap-2">
				{[0, 1, 2, 3].map((i) => (
					<div key={i} className="border-border flex items-center gap-1.5 rounded border p-1.5">
						<span
							className={`h-2.5 w-2.5 rounded-sm ${i < 3 ? "bg-foreground/60" : "bg-foreground/10"}`}
						/>
						<WFBar w={70} h={6} />
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

function ReviewGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<WFBar w={50} h={14} tone="strong" />
			<div className="mt-3 space-y-2">
				{[0, 1, 2].map((i) => (
					<div key={i} className="border-border flex items-center gap-2 rounded border px-2 py-1.5">
						<WFBar w={45} h={7} tone={i === 0 ? "mid" : "soft"} />
						<span className="bg-foreground/70 ml-auto h-3.5 w-10 rounded-full" />
						<span className="border-border h-3.5 w-10 rounded-full border" />
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

function ClosedGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<WFBar w={40} h={14} tone="strong" />
				<span className="bg-foreground/70 ml-auto h-4 w-16 rounded-full" />
			</div>
			<div className="mt-3 grid grid-cols-3 gap-2">
				{[0, 1, 2].map((i) => (
					<div key={i} className="border-border space-y-1.5 rounded border p-1.5">
						<WFBar w={60} h={6} />
						<WFBar w={85} h={10} tone="mid" />
					</div>
				))}
			</div>
			<WFBar w={100} h={26} className="mt-2.5" />
		</WFGlyphCard>
	)
}

const NODES: Record<NodeId, FlowNode> = {
	request: {
		id: "request",
		title: "Solicitud de trabajo",
		lane: "operator",
		col: 1,
		Glyph: otc360FeatureGlyphs["Solicitudes de Trabajo"]!,
	},
	plan: {
		id: "plan",
		title: "Plan de mantenimiento",
		lane: "maintenance",
		col: 1,
		Glyph: otc360FeatureGlyphs["Planes de Mantenimiento"]!,
	},
	approve: {
		id: "approve",
		title: "Aprobación y OT",
		lane: "maintenance",
		col: 2,
		Glyph: otc360FeatureGlyphs["Órdenes de Trabajo"]!,
	},
	logbook: {
		id: "logbook",
		title: "Libro de obras",
		lane: "contractor",
		col: 3,
		Glyph: LogbookGlyph,
	},
	permit: {
		id: "permit",
		title: "Permiso de trabajo",
		lane: "contractor",
		col: 4,
		Glyph: otc360FeatureGlyphs["Permisos de Trabajo"]!,
	},
	inspection: {
		id: "inspection",
		title: "Inspección",
		lane: "safety",
		col: 4,
		Glyph: InspectionGlyph,
	},
	review: {
		id: "review",
		title: "Aprobación de hitos",
		lane: "maintenance",
		col: 5,
		Glyph: ReviewGlyph,
	},
	closed: { id: "closed", title: "OT cerrada", lane: "maintenance", col: 6, Glyph: ClosedGlyph },
}

const laneIndex = (lane: LaneId): number => LANES.findIndex((l) => l.id === lane)
const centerOf = (id: NodeId): [number, number] => {
	const node = NODES[id]
	return [LABEL_W + (node.col - 0.5) * COL_W, (laneIndex(node.lane) + 0.5) * LANE_H]
}
const right = (id: NodeId): [number, number] => {
	const [x, y] = centerOf(id)
	return [x + NODE_W / 2, y]
}
const left = (id: NodeId): [number, number] => {
	const [x, y] = centerOf(id)
	return [x - NODE_W / 2, y]
}
const top = (id: NodeId): [number, number] => {
	const [x, y] = centerOf(id)
	return [x, y - NODE_H / 2]
}
const bottom = (id: NodeId): [number, number] => {
	const [x, y] = centerOf(id)
	return [x, y + NODE_H / 2]
}

type Point = [number, number]

/** Orthogonal connector: horizontal, vertical at `mx`, horizontal. */
function elbow(a: Point, b: Point, mx = (a[0] + b[0]) / 2): Point[] {
	if (a[1] === b[1]) return [a, b]
	return [a, [mx, a[1]], [mx, b[1]], b]
}

type EdgeId =
	| "request-approve"
	| "approve-logbook"
	| "plan-logbook"
	| "logbook-permit"
	| "permit-inspection"
	| "permit-review"
	| "inspection-review"
	| "logbook-review"
	| "review-logbook"
	| "review-closed"

const GAP = (COL_W - NODE_W) / 2

const EDGES: Record<EdgeId, { points: Point[]; dashed?: boolean }> = {
	"request-approve": { points: elbow(right("request"), left("approve")) },
	"approve-logbook": { points: elbow(right("approve"), left("logbook")) },
	"plan-logbook": { points: elbow(right("plan"), left("logbook"), right("plan")[0] + GAP) },
	"logbook-permit": { points: [right("logbook"), left("permit")] },
	"permit-inspection": { points: [bottom("permit"), top("inspection")] },
	"permit-review": { points: elbow(right("permit"), left("review")) },
	"inspection-review": { points: elbow(right("inspection"), left("review")) },
	"logbook-review": { points: elbow(right("logbook"), left("review"), right("logbook")[0] + GAP) },
	"review-logbook": {
		points: [
			bottom("review"),
			[bottom("review")[0], bottom("logbook")[1] + 10],
			[bottom("logbook")[0], bottom("logbook")[1] + 10],
			bottom("logbook"),
		],
		dashed: true,
	},
	"review-closed": { points: [right("review"), left("closed")] },
}

interface Step {
	node: NodeId
	via?: EdgeId
	actor: string
	text: string
	/** Result shown on the node for approval steps. */
	outcome?: "approved" | "rejected"
}

function OutcomeBadge({ outcome }: { outcome: NonNullable<Step["outcome"]> }): ReactNode {
	return outcome === "approved" ? (
		<span className="bg-foreground text-background rounded-full px-2 py-0.5 text-[0.625rem] font-semibold tracking-[0.06em] uppercase">
			Aprobado
		</span>
	) : (
		<span className="border-foreground text-foreground bg-background rounded-full border border-dashed px-2 py-0.5 text-[0.625rem] font-semibold tracking-[0.06em] uppercase">
			Rechazado
		</span>
	)
}

interface Scenario {
	id: string
	label: string
	steps: ReadonlyArray<Step>
}

const SCENARIOS: ReadonlyArray<Scenario> = [
	{
		id: "request",
		label: "Desde una solicitud",
		steps: [
			{ node: "request", actor: "Operador OTC", text: "Levanta la solicitud de trabajo." },
			{
				node: "approve",
				via: "request-approve",
				actor: "Jefe de operaciones o mantenimiento",
				text: "Aprueba la solicitud y crea la OT, asignada a una empresa contratista.",
				outcome: "approved",
			},
			{
				node: "logbook",
				via: "approve-logbook",
				actor: "Contratista",
				text: "Crea su libro de obras y agrega los hitos y actividades.",
			},
			{
				node: "permit",
				via: "logbook-permit",
				actor: "Contratista",
				text: "Genera el permiso de trabajo asociado a la OT.",
			},
			{
				node: "review",
				via: "permit-review",
				actor: "Responsable de la OT",
				text: "Al terminar, el contratista envía los hitos y el responsable de la OT los aprueba.",
				outcome: "approved",
			},
			{
				node: "closed",
				via: "review-closed",
				actor: "Responsable de la OT",
				text: "La OT queda cerrada.",
			},
		],
	},
	{
		id: "plan",
		label: "Desde un plan de mantenimiento",
		steps: [
			{
				node: "plan",
				actor: "Mantenimiento",
				text: "Un plan preventivo origina la OT. Puede crearse automáticamente, aunque normalmente se crea a mano.",
			},
			{
				node: "logbook",
				via: "plan-logbook",
				actor: "Contratista",
				text: "Crea su libro de obras y agrega los hitos y actividades.",
			},
			{
				node: "permit",
				via: "logbook-permit",
				actor: "Contratista",
				text: "Genera el permiso de trabajo asociado a la OT.",
			},
			{
				node: "inspection",
				via: "permit-inspection",
				actor: "Seguridad",
				text: "En medio del trabajo, seguridad agrega una inspección a la OT.",
			},
			{
				node: "review",
				via: "inspection-review",
				actor: "Responsable de la OT",
				text: "Rechaza un hito por falta de información o trabajo mal hecho.",
				outcome: "rejected",
			},
			{
				node: "logbook",
				via: "review-logbook",
				actor: "Contratista",
				text: "Corrige el hito y lo vuelve a enviar.",
			},
			{
				node: "review",
				via: "logbook-review",
				actor: "Responsable de la OT",
				text: "Aprueba los hitos.",
				outcome: "approved",
			},
			{
				node: "closed",
				via: "review-closed",
				actor: "Responsable de la OT",
				text: "La OT queda cerrada.",
			},
		],
	},
]

const STEP_MS = 3200
const pathOf = (points: Point[]): string =>
	points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ")
const pct = (value: number, total: number): string => `${(value / total) * 100}%`

/** Times (0–1) at which a token reaches each vertex, proportional to segment length. */
function vertexTimes(points: Point[]): number[] {
	const lengths = points
		.slice(1)
		.map(([x, y], i) => Math.hypot(x - points[i]![0], y - points[i]![1]))
	const total = lengths.reduce((sum, l) => sum + l, 0) || 1
	let run = 0
	return [0, ...lengths.map((l) => (run += l) / total)]
}

function TalkGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="border-border bg-muted relative flex h-16 items-center justify-center rounded border">
				<span className="border-foreground/60 ml-1 h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent" />
				<WFBar w={100} h={3} tone="mid" className="absolute bottom-1.5 left-1.5 max-w-[45%]" />
			</div>
			<div className="mt-2.5 space-y-1.5">
				{[0, 1, 2].map((i) => (
					<div key={i} className="flex items-center gap-2">
						<span
							className={`h-2.5 w-2.5 shrink-0 rounded-full border ${i === 1 ? "bg-foreground/70 border-foreground/70" : "border-foreground/40"}`}
						/>
						<WFBar w={60 + i * 10} h={6} />
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

/** Contractor requirements approved before any work order; not part of the OT itself. */
const PREREQUISITES: ReadonlyArray<{
	title: string
	text: string
	Glyph: (props: { className?: string }) => ReactNode
}> = [
	{
		title: "Charlas de seguridad",
		text: "Un mini curso con video y examen que cada contratista rinde en la app.",
		Glyph: TalkGlyph,
	},
	{
		title: "Carpeta de arranque",
		text: "Un supervisor sube la documentación de la empresa (seguridad y salud operacional, medio ambiente), de sus vehículos y de sus trabajadores. Cada documento lo aprueba OTC: legal, medio ambiente y seguridad.",
		Glyph: otc360FeatureGlyphs["Carpetas de Arranque"]!,
	},
]

function Prerequisites(): ReactNode {
	return (
		<div className="mb-10">
			<p className="text-muted-foreground font-mono text-xs tracking-[0.12em] uppercase">
				Antes de cualquier OT · requisitos del contratista
			</p>
			<ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
				{PREREQUISITES.map(({ title, text, Glyph }) => (
					<li key={title} className="border-border bg-background flex gap-4 rounded-2xl border p-4">
						<div
							className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md"
							aria-hidden="true"
						>
							<div className="absolute top-0 left-0 h-[200%] w-[200%] origin-top-left scale-50">
								<Glyph className="h-full" />
							</div>
						</div>
						<div className="min-w-0">
							<div className="flex flex-wrap items-center gap-2">
								<p className="text-foreground text-sm font-semibold">{title}</p>
								<span className="border-border text-muted-foreground rounded-full border px-2 py-0.5 text-[0.625rem] font-semibold tracking-[0.06em] uppercase">
									Requisito
								</span>
							</div>
							<p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{text}</p>
						</div>
					</li>
				))}
			</ul>
			<p className="text-muted-foreground mt-4 text-sm leading-relaxed">
				No son parte de la OT: son la condición para que el contratista pueda trabajar.
			</p>
		</div>
	)
}

export function Otc360Flow(): ReactNode {
	const [scenarioIndex, setScenarioIndex] = useState(0)
	const [stepIndex, setStepIndex] = useState(0)
	const reduceMotion = useReducedMotion()
	const [playing, setPlaying] = useState(true)
	const rootRef = useRef<HTMLDivElement | null>(null)
	const inView = useInView(rootRef, { amount: 0.4 })

	const scenario = SCENARIOS[scenarioIndex]!
	const step = scenario.steps[stepIndex]!
	const autoplay = playing && !reduceMotion && inView

	useEffect(() => {
		if (!autoplay) return
		const id = setTimeout(() => {
			setStepIndex((i) => (i + 1) % scenario.steps.length)
		}, STEP_MS)
		return () => clearTimeout(id)
	}, [autoplay, stepIndex, scenario.steps.length])

	const visitedNodes = new Set(scenario.steps.slice(0, stepIndex + 1).map((s) => s.node))
	const visitedEdges = new Set(
		scenario.steps.slice(0, stepIndex).flatMap((s) => (s.via ? [s.via] : []))
	)
	const scenarioNodes = new Set(scenario.steps.map((s) => s.node))
	const scenarioEdges = new Set(scenario.steps.flatMap((s) => (s.via ? [s.via] : [])))

	const go = (delta: number): void => {
		setPlaying(false)
		setStepIndex((i) => (i + delta + scenario.steps.length) % scenario.steps.length)
	}
	const pickScenario = (index: number): void => {
		setScenarioIndex(index)
		setStepIndex(0)
	}

	const activeEdge = step.via ? EDGES[step.via] : null

	return (
		<div ref={rootRef}>
			<Prerequisites />

			{/* Scenario tabs */}
			<div className="flex flex-wrap gap-2" role="group" aria-label="Cómo empieza la OT">
				{SCENARIOS.map((s, i) => (
					<button
						key={s.id}
						type="button"
						aria-pressed={i === scenarioIndex}
						onClick={() => pickScenario(i)}
						className={`focus-ring rounded-full px-4 py-2 text-xs font-semibold tracking-[0.08em] uppercase transition-colors ${
							i === scenarioIndex
								? "bg-foreground text-background"
								: "border-border text-muted-foreground hover:text-foreground border"
						}`}
					>
						{s.label}
					</button>
				))}
			</div>

			{/* Desktop swimlanes */}
			<div
				aria-hidden="true"
				className="border-border bg-background relative mt-8 hidden overflow-hidden rounded-2xl border lg:block"
				style={{ aspectRatio: `${W} / ${H}` }}
			>
				{LANES.map((lane, i) => (
					<div
						key={lane.id}
						className={`absolute inset-x-0 flex items-center ${i > 0 ? "border-border border-t" : ""} ${
							lane.id === "contractor" ? "bg-muted/60" : ""
						}`}
						style={{ top: pct(i * LANE_H, H), height: pct(LANE_H, H) }}
					>
						<div
							className="border-border flex h-full flex-col justify-center border-r px-5"
							style={{ width: pct(LABEL_W, W) }}
						>
							<p className="text-foreground text-sm leading-tight font-semibold">{lane.label}</p>
							<p className="text-muted-foreground mt-1 text-xs leading-snug">{lane.detail}</p>
						</div>
					</div>
				))}

				<svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none">
					{(Object.keys(EDGES) as EdgeId[]).map((id) => {
						const edge = EDGES[id]
						if (!scenarioEdges.has(id)) return null
						return (
							<path
								key={id}
								d={pathOf(edge.points)}
								className={visitedEdges.has(id) ? "stroke-foreground/45" : "stroke-foreground/15"}
								strokeWidth={1.5}
								strokeDasharray={edge.dashed ? "5 5" : undefined}
							/>
						)
					})}
					{activeEdge ? (
						<g key={`${scenario.id}-${stepIndex}`}>
							<motion.path
								d={pathOf(activeEdge.points)}
								className="stroke-foreground"
								strokeWidth={2}
								strokeDasharray={activeEdge.dashed ? "5 5" : undefined}
								// pathLength drives stroke-dasharray, so a dashed edge fades in instead of drawing.
								initial={
									activeEdge.dashed
										? { opacity: reduceMotion ? 1 : 0 }
										: { pathLength: reduceMotion ? 1 : 0 }
								}
								animate={activeEdge.dashed ? { opacity: 1 } : { pathLength: 1 }}
								transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
							/>
							{reduceMotion ? null : (
								<motion.circle
									r={5}
									className="fill-foreground"
									initial={{ cx: activeEdge.points[0]![0], cy: activeEdge.points[0]![1] }}
									animate={{
										cx: activeEdge.points.map((p) => p[0]),
										cy: activeEdge.points.map((p) => p[1]),
									}}
									transition={{
										duration: 0.9,
										ease: "easeInOut",
										times: vertexTimes(activeEdge.points),
									}}
								/>
							)}
						</g>
					) : null}
				</svg>

				{(Object.keys(NODES) as NodeId[]).map((id) => {
					const node = NODES[id]
					const [cx, cy] = centerOf(id)
					const isActive = step.node === id
					const inScenario = scenarioNodes.has(id)
					return (
						<div
							key={id}
							className={`bg-background absolute flex flex-col overflow-hidden rounded-xl border p-2 transition-all duration-500 ${
								isActive
									? `border-foreground shadow-lg ${step.outcome === "rejected" ? "border-dashed" : ""}`
									: visitedNodes.has(id)
										? "border-foreground/40"
										: "border-border"
							} ${inScenario ? "opacity-100" : "opacity-30"}`}
							style={{
								left: pct(cx - NODE_W / 2, W),
								top: pct(cy - NODE_H / 2, H),
								width: pct(NODE_W, W),
								height: pct(NODE_H, H),
							}}
						>
							<div className="relative min-h-0 flex-1 overflow-hidden rounded-md">
								<div className="absolute top-0 left-0 h-[300%] w-[300%] origin-top-left scale-[0.3333]">
									<node.Glyph className="h-full" />
								</div>
							</div>
							<p className="text-foreground mt-1.5 truncate text-[0.6875rem] leading-tight font-semibold">
								{node.title}
							</p>
							{isActive && step.outcome ? (
								<span className="absolute top-1.5 right-1.5">
									<OutcomeBadge outcome={step.outcome} />
								</span>
							) : null}
						</div>
					)
				})}
			</div>

			{/* Mobile: the same steps as a list */}
			<ol className="mt-8 space-y-2 lg:hidden">
				{scenario.steps.map((s, i) => (
					<li
						key={`${s.node}-${i}`}
						aria-current={i === stepIndex ? "step" : undefined}
						className={`rounded-xl border px-4 py-3 transition-colors ${
							i === stepIndex ? "border-foreground bg-muted" : "border-border"
						}`}
					>
						<p className="text-muted-foreground font-mono text-[0.6875rem] tracking-[0.12em] uppercase">
							{i + 1}. {s.actor}
						</p>
						<div className="mt-1 flex items-center gap-2">
							<p className="text-foreground text-sm font-semibold">{NODES[s.node].title}</p>
							{s.outcome ? <OutcomeBadge outcome={s.outcome} /> : null}
						</div>
						{i === stepIndex ? (
							<p className="text-muted-foreground mt-1 text-sm leading-relaxed">{s.text}</p>
						) : null}
					</li>
				))}
			</ol>

			{/* Caption + controls */}
			<div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				{/* Below lg the active list item shows this text, so it stays for screen readers only. */}
				<div aria-live="polite" className="sr-only max-w-2xl lg:not-sr-only">
					<p className="text-muted-foreground font-mono text-xs tracking-[0.12em] uppercase">
						Paso {stepIndex + 1} de {scenario.steps.length} · {step.actor}
					</p>
					<p className="text-foreground mt-2 text-base leading-relaxed">{step.text}</p>
				</div>
				<div className="flex shrink-0 items-center gap-2">
					<button
						type="button"
						onClick={() => go(-1)}
						aria-label="Paso anterior"
						className="focus-ring bg-muted text-foreground inline-flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
					>
						<ChevronLeft className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={() => setPlaying((p) => !p)}
						aria-label={playing ? "Pausar" : "Reproducir"}
						className="focus-ring bg-muted text-foreground inline-flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
					>
						{playing && !reduceMotion ? (
							<Pause className="h-4 w-4" />
						) : (
							<Play className="h-4 w-4" />
						)}
					</button>
					<button
						type="button"
						onClick={() => go(1)}
						aria-label="Paso siguiente"
						className="focus-ring bg-muted text-foreground inline-flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
					>
						<ChevronRight className="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	)
}
