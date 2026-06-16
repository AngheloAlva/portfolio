"use client"

import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion, type Transition } from "motion/react"
import { useId, useState, type ReactNode } from "react"
import { SectionCorners } from "@/components/section-corners"

const PANEL_TRANSITION: Transition = {
	duration: 0.4,
	ease: [0.22, 1, 0.36, 1],
}

const CHEVRON_TRANSITION: Transition = {
	duration: 0.3,
	ease: [0.22, 1, 0.36, 1],
}

type FAQ = {
	q: string
	a: ReadonlyArray<string>
}

const FAQS: ReadonlyArray<FAQ> = [
	{
		q: "¿Cómo trabajas un proyecto?",
		a: [
			"De punta a punta. Empiezo levantando requerimientos con el cliente, muchas veces en terreno; modelo los datos y la arquitectura; desarrollo front y back; despliego a producción y me quedo dando soporte y mejoras continuas. Un solo responsable para todo el ciclo.",
		],
	},
	{
		q: "¿Por qué la mayoría de los proyectos son demos y no los sistemas reales?",
		a: [
			"Casi todos mis sistemas son privados por acuerdo con el cliente. Para mostrarlos sin comprometer datos sensibles trabajo con copias de diseño modificado y datos ficticios, y mantengo los repositorios de esos demos públicos en mi GitHub.",
			"Así quien me evalúa ve el código real y limpio, y el sistema productivo del cliente queda protegido.",
		],
	},
	{
		q: "¿Qué tipo de proyectos haces?",
		a: [
			"Sistemas de gestión y ERPs a medida, e-commerce con pasarelas de pago, sitios institucionales multilingües, dashboards operativos y plataformas en tiempo real. He trabajado para empresas de energía, minería, turismo y educación.",
		],
	},
	{
		q: "¿Trabajas de forma remota?",
		a: [
			"Sí. Varios de mis proyectos se coordinaron 100% en remoto, y otros combinaron trabajo remoto con visitas a planta para el levantamiento de requerimientos. Me adapto a lo que el proyecto necesite.",
		],
	},
	{
		q: "¿Estás certificándote en algo?",
		a: [
			"Sí, actualmente me estoy certificando como AWS Solutions Architect Associate, para reforzar el lado de arquitectura cloud de lo que ya construyo y opero en producción.",
		],
	},
	{
		q: "¿Estás disponible para nuevos proyectos?",
		a: [
			"Estoy abierto a nuevas oportunidades. Si tienes un proyecto o una posición en mente, escríbeme y lo conversamos — respondo rápido.",
		],
	},
]

export function Faq(): ReactNode {
	const [openIndex, setOpenIndex] = useState<number>(0)
	const headingId = useId()

	return (
		<section
			id="faq"
			aria-labelledby={headingId}
			className="border-border relative scroll-mt-20 border-b p-6 sm:p-10 lg:p-14"
		>
			<h2
				id={headingId}
				className="text-foreground text-3xl leading-[1.05] font-medium tracking-tighter sm:text-4xl lg:text-[3.5rem]"
			>
				Preguntas frecuentes
			</h2>

			<div className="border-border mt-6 border-t sm:mt-10 lg:mt-14">
				<ul className="divide-border divide-y">
					{FAQS.map((faq, i) => (
						<FaqRow
							key={faq.q}
							faq={faq}
							isOpen={openIndex === i}
							onToggle={() => setOpenIndex((prev) => (prev === i ? -1 : i))}
						/>
					))}
				</ul>
			</div>
			<SectionCorners />
		</section>
	)
}

function FaqRow({
	faq,
	isOpen,
	onToggle,
}: {
	faq: FAQ
	isOpen: boolean
	onToggle: () => void
}): ReactNode {
	const triggerId = useId()
	const panelId = useId()

	return (
		<li>
			<button
				id={triggerId}
				type="button"
				onClick={onToggle}
				aria-expanded={isOpen}
				aria-controls={panelId}
				className="focus-ring flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left sm:py-7"
			>
				<span className="text-foreground text-base leading-snug font-medium tracking-tight sm:text-lg">
					{faq.q}
				</span>

				{/* Chevron capsule. Cross-fades two background layers so the closed
				 * state shows a filled muted chip and the open state shows a hairline
				 * border ring. Animating the layers' opacities sidesteps Motion's
				 * inability to interpolate between CSS-variable colors. */}
				<motion.span
					aria-hidden="true"
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={CHEVRON_TRANSITION}
					className="text-foreground relative inline-flex h-9 w-9 shrink-0 items-center justify-center"
				>
					<motion.span
						className="bg-muted absolute inset-0 rounded-full"
						animate={{ opacity: isOpen ? 0 : 1 }}
						transition={CHEVRON_TRANSITION}
					/>
					<motion.span
						className="border-border absolute inset-0 rounded-full border"
						animate={{ opacity: isOpen ? 1 : 0 }}
						transition={CHEVRON_TRANSITION}
					/>
					<ChevronDown className="relative h-4 w-4" />
				</motion.span>
			</button>

			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.section
						id={panelId}
						role="region"
						aria-labelledby={triggerId}
						key="content"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={PANEL_TRANSITION}
						style={{ overflow: "hidden" }}
					>
						<motion.div
							initial={{ y: -6 }}
							animate={{ y: 0 }}
							exit={{ y: -6 }}
							transition={PANEL_TRANSITION}
							className="text-muted-foreground max-w-3xl space-y-4 pr-12 pb-7 text-sm leading-relaxed sm:text-base"
						>
							{faq.a.map((para, i) => (
								<p key={i}>{para}</p>
							))}
						</motion.div>
					</motion.section>
				)}
			</AnimatePresence>
		</li>
	)
}
