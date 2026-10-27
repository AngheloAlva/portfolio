"use client"

import { aiepFeatureGlyphs } from "@/components/mockups/aiep-pei"
import { WFBar, WFGlyphCard } from "@/components/mockups/primitives"
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
 * Swimlane walkthrough of the live "Desafío PEI" event: how one admin screen
 * drives hundreds of participants through polling. Nothing here is real
 * client data.
 */

type LaneId = "admin" | "platform" | "participants"

const LANES: ReadonlyArray<FlowLane> = [
	{ id: "admin", label: "Administrador", detail: "Una persona dirige todo el evento" },
	{ id: "platform", label: "Plataforma", detail: "Estado del juego en Postgres, sin WebSockets" },
	{
		id: "participants",
		label: "Participantes",
		detail: "600–700 trabajadores en 26 sedes",
		highlight: true,
	},
]

type NodeId = "login" | "activate" | "state" | "answer" | "ranking" | "raffle" | "bonus"

function LoginGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex flex-1 flex-col items-center justify-center gap-2.5">
				<span className="bg-foreground/70 h-6 w-6 rounded-md" />
				<WFBar w={55} h={8} tone="strong" />
				<div className="border-border flex h-6 w-4/5 items-center rounded-md border px-2">
					<WFBar w={60} h={5} />
				</div>
				<span className="bg-foreground/70 h-5 w-4/5 rounded-md" />
			</div>
		</WFGlyphCard>
	)
}

function BonusGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<span className="bg-foreground/70 h-4 w-12 rounded-full" />
				<WFBar w={30} h={6} className="ml-auto" />
			</div>
			<WFBar w="80%" h={8} tone="strong" className="mt-3" />
			<div className="mt-3 grid flex-1 grid-cols-2 gap-1.5">
				{[0, 1, 2, 3].map((i) => (
					<div key={i} className="border-border flex items-center rounded-md border px-2">
						<WFBar w={65} h={5} />
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

const NODES: Record<NodeId, FlowNode<LaneId>> = {
	login: { title: "Ingreso", lane: "participants", col: 1, Glyph: LoginGlyph },
	activate: {
		title: "Activa la pregunta",
		lane: "admin",
		col: 2,
		Glyph: aiepFeatureGlyphs["Admin con control narrativo del evento"]!,
	},
	state: {
		title: "Estado del juego",
		lane: "platform",
		col: 3,
		Glyph: aiepFeatureGlyphs["Polling vs WebSockets — y por qué ganó"]!,
	},
	answer: {
		title: "Respuesta",
		lane: "participants",
		col: 4,
		Glyph: aiepFeatureGlyphs["Sin feedback inmediato (anti-abandono)"]!,
	},
	ranking: {
		title: "Ranking por sede",
		lane: "admin",
		col: 5,
		Glyph: aiepFeatureGlyphs["Ranking por sede en pausas"]!,
	},
	raffle: {
		title: "Sorteo 10/10",
		lane: "admin",
		col: 6,
		Glyph: aiepFeatureGlyphs["Sorteo final + pregunta bonus"]!,
	},
	bonus: { title: "Pregunta bonus", lane: "participants", col: 6, Glyph: BonusGlyph },
}

const { right, left, top, bottom, elbow, gap: GAP } = swimlaneGeometry(LANES, NODES)

type EdgeId =
	| "login-state"
	| "activate-state"
	| "state-answer"
	| "answer-ranking"
	| "ranking-raffle"
	| "raffle-bonus"

const EDGES: Record<EdgeId, FlowEdge> = {
	"login-state": { points: elbow(right("login"), left("state"), right("login")[0] + GAP) },
	"activate-state": { points: elbow(right("activate"), left("state")) },
	"state-answer": { points: elbow(right("state"), left("answer")) },
	"answer-ranking": { points: elbow(right("answer"), left("ranking")) },
	"ranking-raffle": { points: [right("ranking"), left("raffle")] },
	"raffle-bonus": { points: [bottom("raffle"), top("bonus")] },
}

const SCENARIOS: ReadonlyArray<FlowScenario<NodeId, EdgeId>> = [
	{
		id: "live",
		label: "El evento en vivo",
		steps: [
			{
				node: "login",
				actor: "Participante",
				text: "Entra con su correo @aiep.cl y queda en espera.",
			},
			{
				node: "activate",
				actor: "Administrador",
				text: "Activa la pregunta cuando el evento lo indica.",
			},
			{
				node: "state",
				via: "activate-state",
				actor: "Plataforma",
				text: "Cada pantalla consulta el estado cada 2 a 4 segundos y muestra la pregunta. Sin WebSockets.",
			},
			{
				node: "answer",
				via: "state-answer",
				actor: "Participante",
				text: "Responde en 60 segundos sin saber si acertó. La base de datos impide responder dos veces. Así con cada una de las 10 preguntas.",
			},
			{
				node: "ranking",
				via: "answer-ranking",
				actor: "Administrador",
				text: "Después de la pregunta 4 y de la 8, pausa el juego y muestra el ranking de las 26 sedes.",
			},
			{
				node: "raffle",
				via: "ranking-raffle",
				actor: "Administrador",
				text: "Al final, quienes respondieron 10 de 10 entran al sorteo del premio.",
			},
			{
				node: "bonus",
				via: "raffle-bonus",
				actor: "Participantes",
				text: "El resto recibe una pregunta bonus, para que el juego no termine en derrota.",
			},
		],
	},
	{
		id: "late",
		label: "Llegada tardía",
		steps: [
			{
				node: "login",
				actor: "Participante",
				text: "Se conecta cuando ya va la pregunta 5.",
			},
			{
				node: "state",
				via: "login-state",
				actor: "Plataforma",
				text: "El estado del juego le indica cuál es la pregunta activa.",
			},
			{
				node: "answer",
				via: "state-answer",
				actor: "Participante",
				text: "Responde de la 1 a la 5 y queda al día con el resto.",
			},
			{
				node: "ranking",
				via: "answer-ranking",
				actor: "Administrador",
				text: "Sus respuestas cuentan para el ranking de su sede como las de cualquiera.",
			},
		],
	},
]

export function AiepPeiFlow(): ReactNode {
	return (
		<SwimlaneFlow
			config={{
				lanes: LANES,
				columns: 6,
				nodes: NODES,
				edges: EDGES,
				scenarios: SCENARIOS,
				scenarioLabel: "Escenario del evento",
			}}
		/>
	)
}
