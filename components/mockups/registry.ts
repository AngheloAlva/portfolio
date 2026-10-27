import { AiepHero, aiepFeatureGlyphs } from "@/components/mockups/aiep-pei"
import { AiepPeiFlow } from "@/components/mockups/aiep-pei-flow"
import { BusancHero, busancFeatureGlyphs } from "@/components/mockups/busanc"
import { BusancFlow } from "@/components/mockups/busanc-flow"
import { bzConsultingFeatureGlyphs } from "@/components/mockups/bz-consulting"
import { caempFeatureGlyphs } from "@/components/mockups/caemp"
import {
	DashboardTurismoHero,
	dashboardTurismoFeatureGlyphs,
} from "@/components/mockups/dashboard-turismo"
import { DashboardTurismoFlow } from "@/components/mockups/dashboard-turismo-flow"
import { Otc360Hero, otc360FeatureGlyphs } from "@/components/mockups/otc-360"
import { Otc360Flow } from "@/components/mockups/otc-360-flow"
import { turismochiletoursFeatureGlyphs } from "@/components/mockups/turismochiletours"
import { toursanpedroatacamaFeatureGlyphs } from "@/components/mockups/toursanpedroatacama"
import type { ReactNode } from "react"

/**
 * Per-project wireframe registry.
 *
 * Maps a `ProjectData.id` to its bespoke, product-faithful mockups. A project
 * without an entry falls back to the generic `AppMockup` / `WireframeGlyph` in
 * the case-study view — so custom mockups can be added one project at a time
 * without touching the others.
 */
export interface ProjectMockup {
	/** Big hero mockup replacing the generic `AppMockup`. */
	hero?: (props: { label?: string }) => ReactNode
	/** Feature glyphs keyed by the exact `feature.title`. */
	features?: Record<string, (props: { className?: string }) => ReactNode>
	/** Optional walkthrough of how work moves through the system, shown after "La solución". */
	flow?: { title: string; intro: string; Component: () => ReactNode }
}

const PROJECT_MOCKUPS: Record<string, ProjectMockup> = {
	"otc-360": {
		hero: Otc360Hero,
		features: otc360FeatureGlyphs,
		flow: {
			title: "Cómo fluye una OT",
			intro:
				"OTC 360 conecta al equipo de OTC con las empresas contratistas en un mismo flujo. Así avanza una orden de trabajo, desde que nace hasta que se cierra.",
			Component: Otc360Flow,
		},
	},
	"aiep-pei": {
		hero: AiepHero,
		features: aiepFeatureGlyphs,
		flow: {
			title: "Cómo corre el evento",
			intro:
				"Un solo administrador dirige el evento y cientos de pantallas lo siguen consultando el estado cada pocos segundos. Así avanza una sesión del Desafío PEI.",
			Component: AiepPeiFlow,
		},
	},
	"busanc": {
		hero: BusancHero,
		features: busancFeatureGlyphs,
		flow: {
			title: "Cómo avanza un proyecto",
			intro:
				"Antes, cada área esperaba a que la anterior terminara y todo se coordinaba por correo. Ahora un proyecto avanza por componente y las áreas trabajan en paralelo. Así llega un pedido desde Comercial hasta el despacho.",
			Component: BusancFlow,
		},
	},
	"dashboard-turismo": {
		hero: DashboardTurismoHero,
		features: dashboardTurismoFeatureGlyphs,
		flow: {
			title: "Cómo se mueve la operación",
			intro:
				"Ventas, operación y administración trabajan sobre los mismos datos. Así pasa una venta por el sistema, qué ocurre cuando se cancela y cómo se trabaja con mayoristas y con otras agencias.",
			Component: DashboardTurismoFlow,
		},
	},
	"bz-consulting": {
		features: bzConsultingFeatureGlyphs,
	},
	"caemp": {
		features: caempFeatureGlyphs,
	},
	"turismochiletours": {
		features: turismochiletoursFeatureGlyphs,
	},
	"toursanpedroatacama": {
		features: toursanpedroatacamaFeatureGlyphs,
	},
}

export function getProjectMockup(id: string): ProjectMockup | undefined {
	return PROJECT_MOCKUPS[id]
}
