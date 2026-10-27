"use client"

import { dashboardTurismoFeatureGlyphs } from "@/components/mockups/dashboard-turismo"
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
 * Swimlane walkthrough of the TurismoChileTours operations dashboard: a sale,
 * a cancellation that needs approval, and passengers shared between agencies.
 * The flow follows the real process; nothing here is real client data.
 */

type LaneId = "partners" | "operators" | "admin"

const LANES: ReadonlyArray<FlowLane> = [
	{
		id: "partners",
		label: "Agencias y proveedores",
		detail: "Otras agencias, mayoristas y proveedores",
		highlight: true,
	},
	{ id: "operators", label: "Operadoras", detail: "Ventas, calendario y hojas de ruta" },
	{ id: "admin", label: "Administración", detail: "Aprobaciones, caja y análisis" },
]

type NodeId =
	| "agency"
	| "quote"
	| "sale"
	| "calendar"
	| "supplier"
	| "routeSheet"
	| "approval"
	| "refund"
	| "payments"
	| "analysis"

function ContactGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			{[0, 1, 2].map((i) => (
				<div
					key={i}
					className="border-border mb-2 flex items-center gap-2 rounded border px-2 py-1.5 last:mb-0"
				>
					<span className="bg-foreground/20 h-5 w-5 shrink-0 rounded-full" />
					<div className="flex-1 space-y-1">
						<WFBar w={60} h={6} tone={i === 0 ? "mid" : "soft"} />
						<WFBar w={40} h={5} />
					</div>
					<WFPill w={30} />
				</div>
			))}
		</WFGlyphCard>
	)
}

function QuoteGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<WFBar w={45} h={14} tone="strong" />
			<div className="mt-3 space-y-2">
				{[75, 60, 68].map((w, i) => (
					<div key={i} className="flex items-center gap-2">
						<WFBar w={w} h={7} />
						<WFBar w={18} h={7} tone="mid" />
					</div>
				))}
			</div>
			<div className="border-border mt-auto flex items-center justify-between border-t pt-2">
				<WFBar w={25} h={8} tone="mid" />
				<span className="bg-foreground/70 h-4 w-14 rounded-full" />
			</div>
		</WFGlyphCard>
	)
}

function SaleGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<WFBar w={40} h={14} tone="strong" />
				<span className="ml-auto">
					<WFPill />
				</span>
			</div>
			<div className="mt-3 grid grid-cols-2 gap-2">
				{[0, 1, 2, 3].map((i) => (
					<div key={i} className="border-border space-y-1 rounded border p-1.5">
						<WFBar w={45} h={5} />
						<WFBar w={80} h={7} tone="mid" />
					</div>
				))}
			</div>
			<WFTable cols={[3, 2, 1]} rows={2} className="mt-2 flex-1" />
		</WFGlyphCard>
	)
}

function RouteSheetGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<span className="border-foreground/60 rounded border px-1 text-[0.5rem] font-bold">
					PDF
				</span>
				<WFBar w={50} h={12} tone="strong" />
			</div>
			<div className="mt-3 space-y-2">
				{[0, 1, 2, 3].map((i) => (
					<div key={i} className="flex items-center gap-2">
						<WFBar w={14} h={7} tone="mid" />
						<WFBar w={55} h={7} />
						<WFBar w={20} h={7} />
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

function ApprovalGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<WFBar w={50} h={14} tone="strong" />
			<div className="border-border mt-3 space-y-2 rounded border p-2">
				<WFBar w={80} h={7} tone="mid" />
				<WFBar w={65} h={6} />
				<WFBar w={55} h={6} />
			</div>
			<div className="mt-auto flex justify-end gap-2 pt-2">
				<span className="border-border h-4 w-14 rounded-full border" />
				<span className="bg-foreground/70 h-4 w-14 rounded-full" />
			</div>
		</WFGlyphCard>
	)
}

function RefundGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<WFBar w={45} h={14} tone="strong" />
			<div className="mt-3 grid grid-cols-2 gap-2">
				{[0, 1].map((i) => (
					<div key={i} className="border-border space-y-1.5 rounded border p-1.5">
						<WFBar w={50} h={5} />
						<WFBar w={75} h={10} tone={i === 0 ? "strong" : "mid"} />
					</div>
				))}
			</div>
			<WFTable cols={[3, 2]} rows={2} className="mt-2 flex-1" />
		</WFGlyphCard>
	)
}

const NODES: Record<NodeId, FlowNode<LaneId>> = {
	agency: { title: "Agencia o mayorista", lane: "partners", col: 1, Glyph: ContactGlyph },
	quote: { title: "Cotización", lane: "operators", col: 1, Glyph: QuoteGlyph },
	sale: { title: "Venta o recepción", lane: "operators", col: 2, Glyph: SaleGlyph },
	calendar: {
		title: "Calendario",
		lane: "operators",
		col: 3,
		Glyph: dashboardTurismoFeatureGlyphs["Calendario operativo con drag-and-drop"]!,
	},
	supplier: { title: "Proveedor", lane: "partners", col: 4, Glyph: ContactGlyph },
	routeSheet: { title: "Hoja de ruta", lane: "operators", col: 5, Glyph: RouteSheetGlyph },
	approval: { title: "Aprobación", lane: "admin", col: 4, Glyph: ApprovalGlyph },
	refund: { title: "Devolución", lane: "admin", col: 5, Glyph: RefundGlyph },
	payments: {
		title: "Pagos y cobros",
		lane: "admin",
		col: 6,
		Glyph: dashboardTurismoFeatureGlyphs["Facturación mayorista con exportes"]!,
	},
	analysis: {
		title: "Análisis histórico",
		lane: "admin",
		col: 7,
		Glyph: dashboardTurismoFeatureGlyphs["Análisis y reportes con filtros"]!,
	},
}

const { right, left, elbow } = swimlaneGeometry(LANES, NODES)

type EdgeId =
	| "quote-sale"
	| "agency-sale"
	| "sale-calendar"
	| "calendar-supplier"
	| "supplier-routeSheet"
	| "calendar-routeSheet"
	| "calendar-approval"
	| "approval-refund"
	| "routeSheet-payments"
	| "payments-analysis"

const EDGES: Record<EdgeId, FlowEdge> = {
	"quote-sale": { points: [right("quote"), left("sale")] },
	"agency-sale": { points: elbow(right("agency"), left("sale")) },
	"sale-calendar": { points: [right("sale"), left("calendar")] },
	"calendar-supplier": { points: elbow(right("calendar"), left("supplier")) },
	"supplier-routeSheet": { points: elbow(right("supplier"), left("routeSheet")) },
	"calendar-routeSheet": { points: [right("calendar"), left("routeSheet")] },
	"calendar-approval": { points: elbow(right("calendar"), left("approval")) },
	"approval-refund": { points: [right("approval"), left("refund")] },
	"routeSheet-payments": { points: elbow(right("routeSheet"), left("payments")) },
	"payments-analysis": { points: [right("payments"), left("analysis")] },
}

const SCENARIOS: ReadonlyArray<FlowScenario<NodeId, EdgeId>> = [
	{
		id: "sale",
		label: "Una venta",
		steps: [
			{
				node: "quote",
				actor: "Operadora",
				text: "Arma una cotización para el cliente. Una venta también puede hacerse directo, sin cotización.",
			},
			{
				node: "sale",
				via: "quote-sale",
				actor: "Operadora",
				text: "La cotización se convierte en venta, con sus pasajeros y tours.",
			},
			{
				node: "calendar",
				via: "sale-calendar",
				actor: "Operadora",
				text: "Cada tour queda como evento en el calendario. Si alguien lo mueve, el servidor revisa choques de disponibilidad y pide el motivo.",
			},
			{
				node: "supplier",
				via: "calendar-supplier",
				actor: "Operadora",
				text: "Asigna el proveedor que presta el servicio.",
			},
			{
				node: "routeSheet",
				via: "supplier-routeSheet",
				actor: "Operadora",
				text: "Sale la hoja de ruta del día en PDF.",
			},
			{
				node: "payments",
				via: "routeSheet-payments",
				actor: "Administración",
				text: "Registra los pagos a los proveedores por los servicios prestados.",
			},
			{
				node: "analysis",
				via: "payments-analysis",
				actor: "Administración",
				text: "Cada venta suma al historial que alimenta el análisis: ventas, ocupación y países atendidos desde 2023.",
			},
		],
	},
	{
		id: "cancel",
		label: "Una cancelación",
		steps: [
			{
				node: "sale",
				actor: "Cliente",
				text: "Un cliente cancela un tour que ya pagó.",
			},
			{
				node: "calendar",
				via: "sale-calendar",
				actor: "Operadora",
				text: "Pide anular el evento. Es una operación sensible, así que no se aplica sin aprobación.",
			},
			{
				node: "approval",
				via: "calendar-approval",
				actor: "Administración",
				text: "Revisa la solicitud y aprueba la anulación.",
				outcome: "approved",
			},
			{
				node: "refund",
				via: "approval-refund",
				actor: "Administración",
				text: "La devolución del dinero queda registrada en caja, con quién la aprobó y por qué.",
			},
		],
	},
	{
		id: "agencies",
		label: "Entre agencias",
		steps: [
			{
				node: "agency",
				actor: "Otra agencia o mayorista",
				text: "Envía pasajeros a la agencia. También pasa al revés: la operadora puede traspasar pasajeros propios a otra agencia.",
			},
			{
				node: "sale",
				via: "agency-sale",
				actor: "Operadora",
				text: "Los registra como recepción y entran igual que una venta, con voucher y evento.",
			},
			{
				node: "calendar",
				via: "sale-calendar",
				actor: "Operadora",
				text: "El evento aparece en el calendario junto al resto de la operación.",
			},
			{
				node: "routeSheet",
				via: "calendar-routeSheet",
				actor: "Operadora",
				text: "Los pasajeros quedan en la hoja de ruta del día.",
			},
			{
				node: "payments",
				via: "routeSheet-payments",
				actor: "Administración",
				text: "Al cierre del período agrupa las ventas de cada mayorista y genera un solo PDF de cobro.",
			},
		],
	},
]

export function DashboardTurismoFlow(): ReactNode {
	return (
		<SwimlaneFlow
			config={{
				lanes: LANES,
				columns: 7,
				nodes: NODES,
				edges: EDGES,
				scenarios: SCENARIOS,
				scenarioLabel: "Qué pasa en la operación",
			}}
		/>
	)
}
