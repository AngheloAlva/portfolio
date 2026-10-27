"use client"

import {
	animate,
	motion,
	useInView,
	useMotionValue,
	useReducedMotion,
	useTransform,
} from "motion/react"
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

/**
 * Animated swimlane walkthrough shared by the case-study flows. Each project
 * supplies its lanes, nodes, edges and scenarios; this component owns layout,
 * autoplay, controls and the mobile step list.
 */

// Diagram coordinate system (viewBox units). Nodes and connectors share it.
const LABEL_W = 170
const LANE_H = 120
const COL_W = 172
const NODE_W = 144
const NODE_H = 96
const GAP = (COL_W - NODE_W) / 2

export type Point = [number, number]
type Glyph = (props: { className?: string }) => ReactNode

export interface FlowLane {
	id: string
	label: string
	detail: string
	/** Tints the lane, e.g. to set apart an external party. */
	highlight?: boolean
}

export interface FlowNode<L extends string = string> {
	title: string
	lane: L
	/** 1-based column. */
	col: number
	Glyph: Glyph
}

export interface FlowEdge {
	points: Point[]
	dashed?: boolean
}

export interface FlowStep<N extends string, E extends string> {
	/** Several nodes light up together when areas work in parallel. */
	node: N | ReadonlyArray<N>
	via?: E | ReadonlyArray<E>
	actor: string
	text: string
	/** Result shown on the node for approval steps. */
	outcome?: "approved" | "rejected"
}

export interface FlowScenario<N extends string, E extends string> {
	id: string
	label: string
	steps: ReadonlyArray<FlowStep<N, E>>
}

export interface SwimlaneConfig<N extends string, E extends string> {
	lanes: ReadonlyArray<FlowLane>
	columns: number
	nodes: Record<N, FlowNode>
	edges: Record<E, FlowEdge>
	scenarios: ReadonlyArray<FlowScenario<N, E>>
	/** Accessible name of the scenario tab group. */
	scenarioLabel: string
}

/** Anchor points and connector helpers for a given lane/column layout. */
export function swimlaneGeometry<N extends string>(
	lanes: ReadonlyArray<FlowLane>,
	nodes: Record<N, FlowNode>
) {
	const laneIndex = (lane: string): number => lanes.findIndex((l) => l.id === lane)
	const center = (id: N): Point => {
		const node = nodes[id]
		return [LABEL_W + (node.col - 0.5) * COL_W, (laneIndex(node.lane) + 0.5) * LANE_H]
	}
	const right = (id: N): Point => [center(id)[0] + NODE_W / 2, center(id)[1]]
	const left = (id: N): Point => [center(id)[0] - NODE_W / 2, center(id)[1]]
	const top = (id: N): Point => [center(id)[0], center(id)[1] - NODE_H / 2]
	const bottom = (id: N): Point => [center(id)[0], center(id)[1] + NODE_H / 2]
	/** Orthogonal connector: horizontal, vertical at `mx`, horizontal. */
	const elbow = (a: Point, b: Point, mx = (a[0] + b[0]) / 2): Point[] =>
		a[1] === b[1] ? [a, b] : [a, [mx, a[1]], [mx, b[1]], b]
	return { right, left, top, bottom, elbow, gap: GAP }
}

const STEP_MS = 3200
const pathOf = (points: Point[]): string =>
	points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ")
const pct = (value: number, total: number): string => `${(value / total) * 100}%`
const asList = <T,>(value: T | ReadonlyArray<T> | undefined): ReadonlyArray<T> =>
	value === undefined ? [] : Array.isArray(value) ? (value as ReadonlyArray<T>) : [value as T]

/** Point at `progress` (0–1) of the polyline's total length. */
function pointAt(points: Point[], progress: number): Point {
	const lengths = points
		.slice(1)
		.map(([x, y], i) => Math.hypot(x - points[i]![0], y - points[i]![1]))
	let remaining = progress * lengths.reduce((sum, l) => sum + l, 0)
	for (let i = 0; i < lengths.length; i++) {
		const length = lengths[i]!
		if (remaining <= length || i === lengths.length - 1) {
			const t = length ? Math.min(remaining / length, 1) : 1
			const [ax, ay] = points[i]!
			const [bx, by] = points[i + 1]!
			return [ax + (bx - ax) * t, ay + (by - ay) * t]
		}
		remaining -= length
	}
	return points[0]!
}

function OutcomeBadge({ outcome }: { outcome: "approved" | "rejected" }): ReactNode {
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

function ActiveEdge({ edge, reduceMotion }: { edge: FlowEdge; reduceMotion: boolean }): ReactNode {
	// One progress value drives both the stroke and the token, so they stay in step.
	const progress = useMotionValue(reduceMotion ? 1 : 0)
	const cx = useTransform(progress, (p) => pointAt(edge.points, p)[0])
	const cy = useTransform(progress, (p) => pointAt(edge.points, p)[1])

	useEffect(() => {
		if (reduceMotion) return
		const controls = animate(progress, 1, { duration: 0.9, ease: "easeInOut" })
		return () => controls.stop()
	}, [progress, reduceMotion])

	return (
		<g>
			<motion.path
				d={pathOf(edge.points)}
				className="stroke-foreground"
				strokeWidth={2}
				strokeDasharray={edge.dashed ? "5 5" : undefined}
				// pathLength drives stroke-dasharray, so a dashed edge fades in instead of drawing.
				style={edge.dashed ? { opacity: progress } : { pathLength: progress }}
			/>
			{reduceMotion ? null : <motion.circle r={5} className="fill-foreground" cx={cx} cy={cy} />}
		</g>
	)
}

export function SwimlaneFlow<N extends string, E extends string>({
	config,
	children,
}: {
	config: SwimlaneConfig<N, E>
	/** Content rendered above the scenario tabs (e.g. prerequisites). */
	children?: ReactNode
}): ReactNode {
	const { lanes, columns, nodes, edges, scenarios, scenarioLabel } = config
	const W = LABEL_W + columns * COL_W
	const H = lanes.length * LANE_H
	const geometry = swimlaneGeometry(lanes, nodes)

	const [scenarioIndex, setScenarioIndex] = useState(0)
	const [stepIndex, setStepIndex] = useState(0)
	const reduceMotion = useReducedMotion() ?? false
	const [playing, setPlaying] = useState(true)
	const rootRef = useRef<HTMLDivElement | null>(null)
	const inView = useInView(rootRef, { amount: 0.4 })

	const scenario = scenarios[scenarioIndex]!
	const step = scenario.steps[stepIndex]!
	const autoplay = playing && !reduceMotion && inView

	useEffect(() => {
		if (!autoplay) return
		const id = setTimeout(() => {
			setStepIndex((i) => (i + 1) % scenario.steps.length)
		}, STEP_MS)
		return () => clearTimeout(id)
	}, [autoplay, stepIndex, scenario.steps.length])

	const activeNodes = new Set(asList(step.node))
	const activeEdges = asList(step.via)
	const visitedNodes = new Set(
		scenario.steps.slice(0, stepIndex + 1).flatMap((s) => asList(s.node))
	)
	const visitedEdges = new Set(scenario.steps.slice(0, stepIndex).flatMap((s) => asList(s.via)))
	const scenarioNodes = new Set(scenario.steps.flatMap((s) => asList(s.node)))
	const scenarioEdges = new Set(scenario.steps.flatMap((s) => asList(s.via)))
	const stepTitle = (s: FlowStep<N, E>): string =>
		asList(s.node)
			.map((n) => nodes[n].title)
			.join(" + ")

	const go = (delta: number): void => {
		setPlaying(false)
		setStepIndex((i) => (i + delta + scenario.steps.length) % scenario.steps.length)
	}
	const pickScenario = (index: number): void => {
		setScenarioIndex(index)
		setStepIndex(0)
	}

	return (
		<div ref={rootRef}>
			{children}

			{/* Scenario tabs */}
			{scenarios.length > 1 ? (
				<div className="flex flex-wrap gap-2" role="group" aria-label={scenarioLabel}>
					{scenarios.map((s, i) => (
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
			) : null}

			{/* Desktop swimlanes */}
			<div
				aria-hidden="true"
				className="border-border bg-background relative mt-8 hidden overflow-hidden rounded-2xl border lg:block"
				style={{ aspectRatio: `${W} / ${H}` }}
			>
				{lanes.map((lane, i) => (
					<div
						key={lane.id}
						className={`absolute inset-x-0 flex items-center ${i > 0 ? "border-border border-t" : ""} ${
							lane.highlight ? "bg-muted/60" : ""
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
					{(Object.keys(edges) as E[]).map((id) => {
						if (!scenarioEdges.has(id)) return null
						const edge = edges[id]
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
					{activeEdges.map((id) => (
						<ActiveEdge
							key={`${scenario.id}-${stepIndex}-${id}`}
							edge={edges[id]}
							reduceMotion={reduceMotion}
						/>
					))}
				</svg>

				{(Object.keys(nodes) as N[]).map((id) => {
					const node = nodes[id]
					const [x, y] = geometry.left(id)
					const isActive = activeNodes.has(id)
					return (
						<div
							key={id}
							className={`bg-background absolute flex flex-col overflow-hidden rounded-xl border p-2 transition-all duration-500 ${
								isActive
									? `border-foreground shadow-lg ${step.outcome === "rejected" ? "border-dashed" : ""}`
									: visitedNodes.has(id)
										? "border-foreground/40"
										: "border-border"
							} ${scenarioNodes.has(id) ? "opacity-100" : "opacity-30"}`}
							style={{
								left: pct(x, W),
								top: pct(y - NODE_H / 2, H),
								width: pct(NODE_W, W),
								height: pct(NODE_H, H),
							}}
						>
							<div className="relative min-h-0 flex-1 overflow-hidden rounded-md">
								<div className="absolute top-0 left-0 h-[300%] w-[300%] origin-top-left scale-[0.3333]">
									<node.Glyph className="h-full" />
								</div>
							</div>
							<p className="text-foreground mt-1.5 line-clamp-2 text-[0.6875rem] leading-tight font-semibold">
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
						key={i}
						aria-current={i === stepIndex ? "step" : undefined}
						className={`rounded-xl border px-4 py-3 transition-colors ${
							i === stepIndex ? "border-foreground bg-muted" : "border-border"
						}`}
					>
						<p className="text-muted-foreground font-mono text-[0.6875rem] tracking-[0.12em] uppercase">
							{i + 1}. {s.actor}
						</p>
						<div className="mt-1 flex items-center gap-2">
							<p className="text-foreground text-sm font-semibold">{stepTitle(s)}</p>
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
