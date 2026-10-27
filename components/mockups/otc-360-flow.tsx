"use client"

import { otc360FeatureGlyphs } from "@/components/mockups/otc-360"
import { WFBar, WFGlyphCard, WFPill } from "@/components/mockups/primitives"
import {
	SwimlaneFlow,
	swimlaneGeometry,
	type FlowEdge,
	type FlowLane,
	type FlowNode,
	type FlowScenario,
} from "@/components/mockups/swimlane-flow"
import type { ReactNode } from "react"

/**
 * Swimlane walkthrough of how a work order (OT) moves through OTC 360 between
 * OTC staff, maintenance, contractors and safety. The flow follows the real
 * process described by the client project; nothing here is real client data.
 */

type LaneId = "operator" | "maintenance" | "contractor" | "safety"

const LANES: ReadonlyArray<FlowLane> = [
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
		highlight: true,
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

const NODES: Record<NodeId, FlowNode<LaneId>> = {
	request: {
		title: "Solicitud de trabajo",
		lane: "operator",
		col: 1,
		Glyph: otc360FeatureGlyphs["Solicitudes de Trabajo"]!,
	},
	plan: {
		title: "Plan de mantenimiento",
		lane: "maintenance",
		col: 1,
		Glyph: otc360FeatureGlyphs["Planes de Mantenimiento"]!,
	},
	approve: {
		title: "Aprobación y OT",
		lane: "maintenance",
		col: 2,
		Glyph: otc360FeatureGlyphs["Órdenes de Trabajo"]!,
	},
	logbook: {
		title: "Libro de obras",
		lane: "contractor",
		col: 3,
		Glyph: LogbookGlyph,
	},
	permit: {
		title: "Permiso de trabajo",
		lane: "contractor",
		col: 4,
		Glyph: otc360FeatureGlyphs["Permisos de Trabajo"]!,
	},
	inspection: {
		title: "Inspección",
		lane: "safety",
		col: 4,
		Glyph: InspectionGlyph,
	},
	review: {
		title: "Aprobación de hitos",
		lane: "maintenance",
		col: 5,
		Glyph: ReviewGlyph,
	},
	closed: { title: "OT cerrada", lane: "maintenance", col: 6, Glyph: ClosedGlyph },
}

const { right, left, top, bottom, elbow, gap: GAP } = swimlaneGeometry(LANES, NODES)

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

const EDGES: Record<EdgeId, FlowEdge> = {
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

const SCENARIOS: ReadonlyArray<FlowScenario<NodeId, EdgeId>> = [
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
	return (
		<SwimlaneFlow
			config={{
				lanes: LANES,
				columns: 6,
				nodes: NODES,
				edges: EDGES,
				scenarios: SCENARIOS,
				scenarioLabel: "Cómo empieza la OT",
			}}
		>
			<Prerequisites />
		</SwimlaneFlow>
	)
}
