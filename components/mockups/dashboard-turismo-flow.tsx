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
 * a cancellation that needs approval, a wholesale sale and passengers shared
 * with other tour-operating agencies. Wholesalers only sell tours; other
 * agencies operate them, so each one settles accounts differently. The flow
 * follows the real process; nothing here is real client data.
 */

type LaneId = "wholesalers" | "agencies" | "operators" | "admin"

const LANES: ReadonlyArray<FlowLane> = [
	{
		id: "wholesalers",
		label: "Agencias mayoristas",
		detail: "Solo venden tours, como Despegar",
		highlight: true,
	},
	{
		id: "agencies",
		label: "Otras agencias",
		detail: "También operan tours",
		highlight: true,
	},
	{ id: "operators", label: "Operadoras", detail: "Ventas, calendario y hojas de ruta" },
	{ id: "admin", label: "Administración", detail: "Aprobaciones, caja y análisis" },
]

type NodeId =
	| "wholesaler"
	| "reception"
	| "transfer"
	| "quote"
	| "sale"
	| "calendar"
	| "supplier"
	| "routeSheet"
	| "billing"
	| "approval"
	| "refund"
	| "payments"
	| "analysis"
	| "balance"

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

function TransferGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<WFBar w={45} h={14} tone="strong" />
				<span className="ml-auto">
					<WFPill />
				</span>
			</div>
			<div className="border-border mt-3 flex flex-1 items-center gap-2 rounded border border-dashed p-2">
				<div className="flex-1 space-y-1.5">
					<WFBar w={70} h={6} tone="mid" />
					<WFBar w={50} h={5} />
				</div>
				<span className="text-foreground/60 text-sm">→</span>
				<div className="flex-1 space-y-1.5">
					<WFBar w={70} h={6} tone="mid" />
					<WFBar w={50} h={5} />
				</div>
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

function PaymentsGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<WFBar w={50} h={14} tone="strong" />
			<WFTable cols={[3, 2, 2]} rows={4} pillCol={2} className="mt-3 flex-1" />
		</WFGlyphCard>
	)
}

function BalanceGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<WFBar w={50} h={14} tone="strong" />
			<div className="mt-3 grid grid-cols-2 gap-2">
				{["Recepciones", "Traspasos"].map((label) => (
					<div key={label} className="border-border space-y-1.5 rounded border p-1.5">
						<WFBar w={55} h={5} />
						<WFBar w={70} h={10} tone="mid" />
					</div>
				))}
			</div>
			<div className="border-border mt-auto flex items-center justify-between border-t pt-2">
				<WFBar w={30} h={8} tone="mid" />
				<WFBar w={25} h={12} tone="strong" />
			</div>
		</WFGlyphCard>
	)
}

const NODES: Record<NodeId, FlowNode<LaneId>> = {
	wholesaler: { title: "Mayorista", lane: "wholesalers", col: 1, Glyph: ContactGlyph },
	reception: {
		title: "Recepción",
		lane: "agencies",
		col: 2,
		Glyph: dashboardTurismoFeatureGlyphs["Recepciones y traspasos entre agencias"]!,
	},
	transfer: { title: "Traspaso", lane: "agencies", col: 4, Glyph: TransferGlyph },
	quote: { title: "Cotización", lane: "operators", col: 1, Glyph: QuoteGlyph },
	sale: { title: "Venta", lane: "operators", col: 2, Glyph: SaleGlyph },
	calendar: {
		title: "Calendario",
		lane: "operators",
		col: 3,
		Glyph: dashboardTurismoFeatureGlyphs["Calendario operativo con drag-and-drop"]!,
	},
	supplier: { title: "Proveedor", lane: "operators", col: 4, Glyph: ContactGlyph },
	routeSheet: { title: "Hoja de ruta", lane: "operators", col: 5, Glyph: RouteSheetGlyph },
	billing: {
		title: "Facturación",
		lane: "admin",
		col: 3,
		Glyph: dashboardTurismoFeatureGlyphs["Facturación mayorista con exportes"]!,
	},
	approval: { title: "Aprobación", lane: "admin", col: 4, Glyph: ApprovalGlyph },
	refund: { title: "Devolución", lane: "admin", col: 5, Glyph: RefundGlyph },
	payments: { title: "Pago a proveedores", lane: "admin", col: 6, Glyph: PaymentsGlyph },
	analysis: {
		title: "Análisis histórico",
		lane: "admin",
		col: 7,
		Glyph: dashboardTurismoFeatureGlyphs["Análisis y reportes con filtros"]!,
	},
	balance: { title: "Balance de agencias", lane: "admin", col: 8, Glyph: BalanceGlyph },
}

const { right, left, top, bottom, elbow, gap: GAP } = swimlaneGeometry(LANES, NODES)

type EdgeId =
	| "quote-sale"
	| "wholesaler-sale"
	| "sale-calendar"
	| "reception-calendar"
	| "calendar-supplier"
	| "supplier-routeSheet"
	| "calendar-billing"
	| "calendar-approval"
	| "approval-refund"
	| "routeSheet-payments"
	| "payments-analysis"
	| "calendar-transfer"
	| "transfer-balance"

const EDGES: Record<EdgeId, FlowEdge> = {
	"quote-sale": { points: [right("quote"), left("sale")] },
	"wholesaler-sale": {
		points: elbow(right("wholesaler"), left("sale"), right("wholesaler")[0] + GAP),
	},
	"sale-calendar": { points: [right("sale"), left("calendar")] },
	"reception-calendar": { points: elbow(right("reception"), left("calendar")) },
	"calendar-supplier": { points: [right("calendar"), left("supplier")] },
	"supplier-routeSheet": { points: [right("supplier"), left("routeSheet")] },
	"calendar-billing": { points: [bottom("calendar"), top("billing")] },
	"calendar-approval": { points: elbow(right("calendar"), left("approval")) },
	"approval-refund": { points: [right("approval"), left("refund")] },
	"routeSheet-payments": { points: elbow(right("routeSheet"), left("payments")) },
	"payments-analysis": { points: [right("payments"), left("analysis")] },
	"calendar-transfer": { points: elbow(right("calendar"), left("transfer")) },
	"transfer-balance": {
		points: [right("transfer"), [top("balance")[0], right("transfer")[1]], top("balance")],
	},
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
		id: "wholesale",
		label: "Venta mayorista",
		steps: [
			{
				node: "wholesaler",
				actor: "Agencia mayorista",
				text: "Un mayorista vende el tour a su cliente. Vende, pero no opera tours.",
			},
			{
				node: "sale",
				via: "wholesaler-sale",
				actor: "Operadora",
				text: "La registra como una venta por canal mayorista.",
			},
			{
				node: "calendar",
				via: "sale-calendar",
				actor: "Operadora",
				text: "El tour entra al calendario y a la hoja de ruta como cualquier otro.",
			},
			{
				node: "billing",
				via: "calendar-billing",
				actor: "Administración",
				text: "En Facturación selecciona las ventas del mayorista en un rango de fechas y genera un solo PDF de cobro por el total vendido.",
			},
		],
	},
	{
		id: "agencies",
		label: "Entre agencias",
		steps: [
			{
				node: "reception",
				actor: "Otra agencia",
				text: "Una agencia que también opera tours le envía pasajeros. Se registran como recepción.",
			},
			{
				node: "calendar",
				via: "reception-calendar",
				actor: "Operadora",
				text: "Los pasajeros recibidos entran al calendario y a la hoja de ruta como cualquier venta.",
			},
			{
				node: "transfer",
				via: "calendar-transfer",
				actor: "Operadora",
				text: "También pasa al revés: traspasa pasajeros propios a otra agencia, con su voucher de traspaso.",
			},
			{
				node: "balance",
				via: "transfer-balance",
				actor: "Administración",
				text: "El balance de agencias cruza recepciones y traspasos con cada agencia. Según la diferencia, se cobra o se paga.",
			},
		],
	},
]

export function DashboardTurismoFlow(): ReactNode {
	return (
		<SwimlaneFlow
			config={{
				lanes: LANES,
				columns: 8,
				nodes: NODES,
				edges: EDGES,
				scenarios: SCENARIOS,
				scenarioLabel: "Qué pasa en la operación",
			}}
		/>
	)
}
