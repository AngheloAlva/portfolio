"use client"

import { busancFeatureGlyphs } from "@/components/mockups/busanc"
import { WFBar, WFGlyphCard, WFPill, WFTable } from "@/components/mockups/primitives"
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
 * Swimlane walkthrough of a Busanc project, from the commercial request to the
 * dispatch note. The flow follows the real process; nothing here is real
 * client data.
 */

type LaneId = "commercial" | "engineering" | "hispana" | "costing" | "production"

const LANES: ReadonlyArray<FlowLane> = [
	{ id: "commercial", label: "Comercial", detail: "Atiende al cliente, cotiza y revisa la OC" },
	{ id: "engineering", label: "Ingeniería", detail: "Diseña los componentes" },
	{ id: "hispana", label: "Hispana", detail: "Proveedor metálico interno" },
	{ id: "costing", label: "Evaluación y Costos", detail: "Costea cada componente" },
	{
		id: "production",
		label: "Planificación y producción",
		detail: "Del taller al despacho",
		highlight: true,
	},
]

type NodeId =
	| "request"
	| "components"
	| "hispana"
	| "costing"
	| "quote"
	| "order"
	| "workOrder"
	| "dispatch"

function ComponentsGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<WFBar w={55} h={14} tone="strong" />
			<div className="mt-3 space-y-2">
				{[0, 1, 2].map((i) => (
					<div key={i} className="border-border flex items-center gap-2 rounded border px-2 py-1.5">
						<span className="border-foreground/50 h-3 w-3 shrink-0 rounded-sm border" />
						<WFBar w={50} h={7} tone={i === 0 ? "mid" : "soft"} />
						<span
							className={`ml-auto h-3.5 w-12 rounded-full ${i < 2 ? "bg-foreground/70" : "border-border border"}`}
						/>
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

function HispanaGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<WFBar w={45} h={14} tone="strong" />
				<span className="ml-auto">
					<WFPill />
				</span>
			</div>
			<div className="mt-3 grid grid-cols-3 gap-2">
				{[0, 1, 2, 3, 4, 5].map((i) => (
					<div key={i} className="border-border space-y-1.5 rounded border p-1.5">
						<span
							className={`block h-5 rounded-sm ${i < 4 ? "bg-foreground/45" : "bg-foreground/10"}`}
						/>
						<WFBar w={70} h={5} />
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

function CostingGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<WFBar w={50} h={14} tone="strong" />
			<WFTable cols={[3, 2, 2]} rows={4} className="mt-3 flex-1" />
		</WFGlyphCard>
	)
}

function QuoteGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<WFBar w={40} h={14} tone="strong" />
				<span className="border-border ml-auto rounded border px-1.5 py-0.5">
					<WFBar w={20} h={6} tone="mid" className="min-w-6" />
				</span>
			</div>
			<div className="mt-3 space-y-2">
				{[80, 65, 72].map((w, i) => (
					<div key={i} className="flex items-center gap-2">
						<WFBar w={w} h={7} />
						<WFBar w={18} h={7} tone="mid" />
					</div>
				))}
			</div>
			<div className="border-border mt-auto flex items-center justify-between border-t pt-2">
				<WFBar w={25} h={8} tone="mid" />
				<WFBar w={30} h={12} tone="strong" />
			</div>
		</WFGlyphCard>
	)
}

function OrderReviewGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<WFBar w={50} h={14} tone="strong" />
			<div className="mt-3 flex items-center gap-2">
				{[0, 1].map((i) => (
					<div key={i} className="flex flex-1 items-center gap-2">
						<span className="bg-foreground/70 h-5 w-5 shrink-0 rounded-full" />
						<WFBar w={70} h={7} tone="mid" />
					</div>
				))}
			</div>
			<div className="border-border mt-3 space-y-2 rounded border p-2">
				<WFBar w={85} h={7} />
				<WFBar w={65} h={7} />
				<WFBar w={75} h={7} />
			</div>
		</WFGlyphCard>
	)
}

const NODES: Record<NodeId, FlowNode<LaneId>> = {
	request: {
		title: "Solicitud comercial",
		lane: "commercial",
		col: 1,
		Glyph: busancFeatureGlyphs["Flujo Comercial Unificado"]!,
	},
	components: { title: "Componentes", lane: "engineering", col: 2, Glyph: ComponentsGlyph },
	hispana: { title: "Revisión Hispana", lane: "hispana", col: 3, Glyph: HispanaGlyph },
	costing: { title: "Costos", lane: "costing", col: 3, Glyph: CostingGlyph },
	quote: { title: "Cotización", lane: "commercial", col: 4, Glyph: QuoteGlyph },
	order: { title: "Revisión de OC", lane: "commercial", col: 5, Glyph: OrderReviewGlyph },
	workOrder: {
		title: "OT por componente",
		lane: "production",
		col: 6,
		Glyph: busancFeatureGlyphs["Modelo Componente-Céntrico de Producción"]!,
	},
	dispatch: {
		title: "Guía de despacho",
		lane: "production",
		col: 7,
		Glyph: busancFeatureGlyphs["Guía de Despacho Enriquecida"]!,
	},
}

const { right, left, elbow, gap: GAP } = swimlaneGeometry(LANES, NODES)

type EdgeId =
	| "request-components"
	| "components-hispana"
	| "components-costing"
	| "request-costing"
	| "hispana-quote"
	| "costing-quote"
	| "quote-order"
	| "order-workOrder"
	| "workOrder-dispatch"

const EDGES: Record<EdgeId, FlowEdge> = {
	"request-components": { points: elbow(right("request"), left("components")) },
	"components-hispana": { points: elbow(right("components"), left("hispana")) },
	"components-costing": { points: elbow(right("components"), left("costing")) },
	"request-costing": {
		points: elbow(right("request"), left("costing"), right("request")[0] + GAP),
	},
	"hispana-quote": { points: elbow(right("hispana"), left("quote")) },
	"costing-quote": { points: elbow(right("costing"), left("quote")) },
	"quote-order": { points: [right("quote"), left("order")] },
	"order-workOrder": { points: elbow(right("order"), left("workOrder")) },
	"workOrder-dispatch": { points: [right("workOrder"), left("dispatch")] },
}

const FROM_ORDER = [
	{
		node: "order",
		via: "quote-order",
		actor: "Comercial",
		text: "Llega la orden de compra del cliente y Comercial la revisa en dos pasos.",
		outcome: "approved",
	},
	{
		node: "workOrder",
		via: "order-workOrder",
		actor: "Planificación",
		text: "Cada componente comprado recibe su propia OT y avanza por su plantilla: Metálico → Goma → Pintura → Calidad.",
	},
	{
		node: "dispatch",
		via: "workOrder-dispatch",
		actor: "Despacho",
		text: "Se genera la guía de despacho, parcial o total, con los planos y la etiqueta del componente.",
	},
] as const

const SCENARIOS: ReadonlyArray<FlowScenario<NodeId, EdgeId>> = [
	{
		id: "new",
		label: "Proyecto nuevo",
		steps: [
			{
				node: "request",
				actor: "Comercial",
				text: "Recibe el requerimiento del cliente y crea la solicitud comercial, con uno o varios proyectos. A veces parte con una visita de levantamiento.",
			},
			{
				node: "components",
				via: "request-components",
				actor: "Ingeniería",
				text: "Define los componentes y los va guardando uno a uno, sin esperar a terminar todo el proyecto.",
			},
			{
				node: ["hispana", "costing"],
				via: ["components-hispana", "components-costing"],
				actor: "Hispana y Evaluación y Costos",
				text: "Trabajan en paralelo sobre cada componente guardado. Cada área cierra su etapa y el sistema impide cerrarla antes de tiempo.",
			},
			{
				node: "quote",
				via: ["hispana-quote", "costing-quote"],
				actor: "Comercial",
				text: "Con los costos listos, Comercial envía la cotización al cliente en CLP, UF o USD.",
			},
			...FROM_ORDER,
		],
	},
	{
		id: "repeat",
		label: "Proyecto repetitivo",
		steps: [
			{
				node: "request",
				actor: "Comercial",
				text: "Llega el pedido de un producto que ya se fabricó antes.",
			},
			{
				node: "costing",
				via: "request-costing",
				actor: "Evaluación y Costos",
				text: "Como no necesita ingeniería nueva, pasa directo a costos.",
			},
			{
				node: "quote",
				via: "costing-quote",
				actor: "Comercial",
				text: "Comercial envía la cotización al cliente.",
			},
			...FROM_ORDER,
		],
	},
]

export function BusancFlow(): ReactNode {
	return (
		<SwimlaneFlow
			config={{
				lanes: LANES,
				columns: 7,
				nodes: NODES,
				edges: EDGES,
				scenarios: SCENARIOS,
				scenarioLabel: "Tipo de proyecto",
			}}
		/>
	)
}
