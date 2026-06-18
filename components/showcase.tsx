"use client"

import { AnimatePresence, motion, type Transition } from "motion/react"
import {
	ChevronLeft,
	ChevronRight,
	Plus,
	Factory,
	Boxes,
	Globe,
	ShoppingCart,
	LayoutDashboard,
	Building2,
	Gamepad2,
	type LucideIcon,
} from "lucide-react"
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { SectionCorners } from "@/components/section-corners"
import { AppMockup } from "@/components/app-mockup"
import { getProjectMockup } from "@/components/mockups/registry"

const MORPH_TRANSITION: Transition = {
	duration: 0.55,
	ease: [0.22, 1, 0.36, 1],
}

type ShowcaseCard = {
	id: string
	title: string
	Icon: LucideIcon
	body: string
	tags: string[]
	href?: string
	hrefLabel?: string
	/** Real screenshot shown instead of the wireframe mockup (public projects only). */
	image?: string
}

const CARDS: ReadonlyArray<ShowcaseCard> = [
	{
		id: "otc-360",
		title: "OTC 360\nControl operacional",
		Icon: Factory,
		body: "Plataforma que reemplazó papel, correos y Excel por un único sistema de órdenes de trabajo, permisos y planes de mantenimiento, con indicadores en vivo. Para OTC — Oleoducto Trasandino Chile.",
		tags: ["Next.js", "PostgreSQL", "Prisma", "Azure"],
		href: "https://is-360.vercel.app/",
		hrefLabel: "Ver demo",
	},
	{
		id: "busanc",
		title: "Busanc\nGestión industrial",
		Icon: Boxes,
		body: "ERP a medida que orquesta el flujo end-to-end de una empresa minera: de la solicitud comercial al despacho, con trabajo en paralelo entre áreas y trazabilidad total.",
		tags: ["Next.js 16", "NestJS", "Drizzle", "Turborepo"],
	},
	{
		id: "turismochiletours",
		title: "TurismoChileTours\nSitio multilingüe",
		Icon: Globe,
		body: "Sitio corporativo en cuatro idiomas para un tour operador en San Pedro de Atacama, con catálogo de programas y captación de tours privados.",
		tags: ["Next.js 14", "next-intl", "Resend", "Vercel"],
		href: "https://turismochiletours.com/es",
		hrefLabel: "Visitar sitio",
		image: "/projects/turismochiletours.png",
	},
	{
		id: "toursanpedroatacama",
		title: "San Pedro\nE-commerce",
		Icon: ShoppingCart,
		body: "Ecommerce multilingüe para reservar excursiones, con tres pasarelas de pago, conversión automática CLP/USD y panel administrativo completo.",
		tags: ["Next.js 15", "Drizzle", "Turso", "Webpay·PayPal·Flow"],
		href: "https://toursanpedroatacama.com/",
		hrefLabel: "Visitar sitio",
		image: "/projects/san-pedro-de-atacama.png",
	},
	{
		id: "dashboard-turismo",
		title: "Dashboard\nTurismoChileTours",
		Icon: LayoutDashboard,
		body: "Dashboard interno multi-rol que reemplazó una Power Apps heredada: ventas, calendario operativo, caja, comisiones y migración de 11 años de datos.",
		tags: ["Next.js 16", "Prisma", "Neon", "TanStack"],
	},
	{
		id: "bz-consulting",
		title: "BZ Consulting\nSitio institucional",
		Icon: Building2,
		body: "Sitio bilingüe ultra-liviano sobre Astro, con publicación de noticias semanales vía MDX y sin CMS. Más de 190 artículos y 2 años en producción.",
		tags: ["Astro 4", "MDX", "Cloudflare", "Resend"],
		href: "https://bzconsulting.cl",
		hrefLabel: "Visitar sitio",
		image: "/projects/bz-consulting.png",
	},
	{
		id: "aiep-pei",
		title: "Desafío PEI\nAIEP · tiempo real",
		Icon: Gamepad2,
		body: "Juego tipo Kahoot en tiempo real para evaluar el nuevo plan educativo de AIEP en un evento en vivo nacional, con 600-700 participantes simultáneos vía polling.",
		tags: ["Next.js 15", "PostgreSQL", "Polling", "Vercel"],
	},
	{
		id: "caemp",
		title: "Grupo CAEMP\nSitio corporativo",
		Icon: Building2,
		body: "Sitio de un holding con tres marcas: cada una vive en su propio dominio, color y logo, pero todas se sirven desde un único proyecto y un solo despliegue.",
		tags: ["TanStack Start", "React 19", "Tailwind v4", "Vercel"],
		href: "https://grupocaemp.cl",
		hrefLabel: "Visitar sitio",
		image: "/projects/caemp.png",
	},
]

export function Showcase(): ReactNode {
	const [activeId, setActiveId] = useState<string | null>(null)
	const trackRef = useRef<HTMLDivElement | null>(null)
	const [page, setPage] = useState(0)
	const [pageCount, setPageCount] = useState(1)
	const headingId = useId()

	const recompute = useCallback(() => {
		const track = trackRef.current
		if (!track) return
		const firstCard = track.querySelector<HTMLElement>("[data-card]")
		if (!firstCard) return
		const cardWidth = firstCard.getBoundingClientRect().width
		const gap = parseFloat(getComputedStyle(track).columnGap || "0")
		const step = cardWidth + gap
		if (step <= 0) {
			setPage(0)
			setPageCount(1)
			return
		}
		const totalScrollable = track.scrollWidth - track.clientWidth
		const pages = Math.max(1, Math.round(totalScrollable / step) + 1)
		const current = Math.round(track.scrollLeft / step)
		setPageCount(pages)
		setPage(Math.min(pages - 1, Math.max(0, current)))
	}, [])

	useEffect(() => {
		const track = trackRef.current
		if (!track) return
		const onScroll = (): void => recompute()
		track.addEventListener("scroll", onScroll, { passive: true })
		const ro = new ResizeObserver(() => recompute())
		ro.observe(track)
		return () => {
			track.removeEventListener("scroll", onScroll)
			ro.disconnect()
		}
	}, [recompute])

	useEffect(() => {
		if (!activeId) return
		const onKey = (e: KeyboardEvent): void => {
			if (e.key === "Escape") setActiveId(null)
		}
		window.addEventListener("keydown", onKey)
		return () => window.removeEventListener("keydown", onKey)
	}, [activeId])

	useEffect(() => {
		if (!activeId) return
		const prev = document.body.style.overflow
		document.body.style.overflow = "hidden"
		return () => {
			document.body.style.overflow = prev
		}
	}, [activeId])

	const scrollByCards = useCallback((direction: 1 | -1): void => {
		const track = trackRef.current
		if (!track) return
		const firstCard = track.querySelector<HTMLElement>("[data-card]")
		if (!firstCard) return
		const cardWidth = firstCard.getBoundingClientRect().width
		const gap = parseFloat(getComputedStyle(track).columnGap || "0")
		track.scrollBy({ left: direction * (cardWidth + gap), behavior: "smooth" })
	}, [])

	const activeCard = activeId ? (CARDS.find((c) => c.id === activeId) ?? null) : null

	return (
		<section
			id="proyectos"
			aria-labelledby={headingId}
			className="border-border relative scroll-mt-20 border-b"
		>
			<div className="grid grid-cols-1 lg:grid-cols-3">
				<div className="lg:border-border flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:border-r lg:px-14 lg:py-24">
					<h2
						id={headingId}
						className="text-foreground text-4xl leading-[1.05] font-medium tracking-tighter sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
					>
						Sistemas reales,
						<br />
						en producción,
						<br />
						<span className="text-muted-foreground">para quien depende de ellos</span>
					</h2>
					<p className="text-muted-foreground mt-10 max-w-md text-sm leading-relaxed sm:text-base">
						Cada uno resolvió un problema operativo concreto. Abre una tarjeta para ver el caso.
					</p>
					<div className="mt-10">
						<a
							href="#contacto"
							className="focus-ring bg-foreground text-background inline-flex items-center gap-2 rounded-full px-5 py-4 text-xs font-semibold tracking-[0.12em] uppercase transition-opacity hover:opacity-90"
						>
							Hablemos
							<span aria-hidden="true">→</span>
						</a>
					</div>
				</div>

				<div className="relative flex flex-col overflow-hidden lg:col-span-2">
					<div
						ref={trackRef}
						className="flex snap-x snap-mandatory scroll-pl-6 scrollbar-none items-stretch gap-4 overflow-x-auto scroll-smooth px-6 py-16 [-ms-overflow-style:none] sm:scroll-pl-10 sm:gap-6 sm:px-10 sm:py-20 lg:scroll-pl-14 lg:px-14 lg:py-24 [&::-webkit-scrollbar]:hidden"
					>
						{CARDS.map((card) => (
							<Card
								key={card.id}
								card={card}
								hidden={activeId === card.id}
								onClick={() => setActiveId(card.id)}
							/>
						))}
						<div aria-hidden="true" className="shrink-0 basis-6 sm:basis-10 lg:basis-14" />
					</div>

					<div className="flex items-center justify-center gap-2 px-6 pb-10 sm:px-10 sm:pb-12 lg:px-14 lg:pb-14">
						<button
							type="button"
							onClick={() => scrollByCards(-1)}
							disabled={page === 0}
							aria-label="Proyecto anterior"
							className="focus-ring bg-muted text-foreground inline-flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-30"
						>
							<ChevronLeft className="h-4 w-4" />
						</button>
						<div
							aria-hidden="true"
							className="bg-muted flex h-8 items-center gap-2 rounded-full px-4"
						>
							{Array.from({ length: pageCount }).map((_, i) => (
								<span
									key={i}
									aria-hidden="true"
									className={`h-1.5 rounded-full transition-all duration-300 ${
										i === page ? "bg-foreground w-6" : "bg-muted-foreground/40 w-1.5"
									}`}
								/>
							))}
						</div>
						<button
							type="button"
							onClick={() => scrollByCards(1)}
							disabled={page >= pageCount - 1}
							aria-label="Proyecto siguiente"
							className="focus-ring bg-muted text-foreground inline-flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-30"
						>
							<ChevronRight className="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>

			<AnimatePresence>
				{activeCard ? (
					<ExpandedCard key="expanded" card={activeCard} onClose={() => setActiveId(null)} />
				) : null}
			</AnimatePresence>
			<SectionCorners />
		</section>
	)
}

/**
 * A 16:9 preview of the project's wireframe hero. The bespoke heroes are tall,
 * full-size dashboards, so we render them on a 2× canvas and `scale-50` it down,
 * top-anchored, letting the 16:9 frame crop the rest — like a cropped screenshot
 * of the top of the app. Projects without a bespoke hero fall back to AppMockup.
 */
function CardPreview({
	id,
	title,
	image,
	className,
}: {
	id: string
	title: string
	image?: string | undefined
	className?: string
}): ReactNode {
	const Hero = getProjectMockup(id)?.hero
	return (
		<div
			aria-hidden="true"
			className={`border-border bg-background pointer-events-none relative aspect-video w-full overflow-hidden rounded-xl border ${className ?? ""}`}
		>
			{image ? (
				<Image
					src={image}
					alt=""
					fill
					sizes="(max-width: 640px) 90vw, 360px"
					className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
				/>
			) : (
				<div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
					<div className="h-[200%] w-[200%] origin-top-left scale-50">
						{Hero ? <Hero label={title} /> : <AppMockup label={title} />}
					</div>
				</div>
			)}
		</div>
	)
}

function Card({
	card,
	hidden,
	onClick,
}: {
	card: ShowcaseCard
	hidden: boolean
	onClick: () => void
}): ReactNode {
	const { Icon } = card
	return (
		<motion.button
			type="button"
			data-card
			onClick={onClick}
			layoutId={`card-${card.id}`}
			transition={MORPH_TRANSITION}
			style={{ visibility: hidden ? "hidden" : "visible" }}
			className="focus-ring group bg-muted relative flex aspect-3/4 w-70 shrink-0 cursor-pointer snap-start flex-col justify-between rounded-2xl p-6 text-left sm:w-[320px] sm:p-7 lg:w-90 lg:p-8"
		>
			<motion.div
				layoutId={`card-icon-${card.id}`}
				transition={MORPH_TRANSITION}
				className="bg-background/60 text-foreground flex h-11 w-11 items-center justify-center rounded-full"
			>
				<Icon className="h-4 w-4" strokeWidth={1.5} />
			</motion.div>
			<CardPreview id={card.id} title={card.title} image={card.image} />
			<div className="space-y-5">
				<motion.h3
					layoutId={`card-title-${card.id}`}
					transition={MORPH_TRANSITION}
					className="text-foreground text-xl leading-tight font-medium tracking-tight whitespace-pre-line sm:text-2xl"
				>
					{card.title}
				</motion.h3>
				<motion.span
					layoutId={`card-plus-${card.id}`}
					aria-hidden="true"
					transition={MORPH_TRANSITION}
					className="bg-background/60 text-foreground inline-flex h-9 w-9 items-center justify-center rounded-full"
				>
					<motion.span
						className="inline-flex"
						animate={{ rotate: 0 }}
						transition={MORPH_TRANSITION}
					>
						<Plus className="h-4 w-4" strokeWidth={1.5} />
					</motion.span>
				</motion.span>
			</div>
		</motion.button>
	)
}

function ExpandedCard({ card, onClose }: { card: ShowcaseCard; onClose: () => void }): ReactNode {
	const { Icon } = card
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-10">
			<motion.button
				type="button"
				aria-label="Cerrar"
				onClick={onClose}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
				className="bg-background/60 absolute inset-0 cursor-default backdrop-blur-xl"
			/>

			<motion.div
				layoutId={`card-${card.id}`}
				transition={MORPH_TRANSITION}
				className="bg-muted relative z-10 flex aspect-3/4 w-full max-w-105 flex-col justify-between rounded-2xl p-8 sm:aspect-auto sm:max-w-2xl sm:p-10 lg:p-12"
			>
				<motion.div
					layoutId={`card-icon-${card.id}`}
					transition={MORPH_TRANSITION}
					className="bg-background/60 text-foreground flex h-11 w-11 items-center justify-center rounded-full"
				>
					<Icon className="h-4 w-4" strokeWidth={1.5} />
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
					className="mt-8 hidden sm:block"
				>
					<CardPreview id={card.id} title={card.title} image={card.image} />
				</motion.div>

				<div className="mt-8 space-y-6 sm:mt-12">
					<motion.h3
						layoutId={`card-title-${card.id}`}
						transition={MORPH_TRANSITION}
						className="text-foreground text-2xl leading-tight font-medium tracking-tight whitespace-pre-line sm:text-3xl lg:text-4xl"
					>
						{card.title}
					</motion.h3>
					<motion.p
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 8 }}
						transition={{
							duration: 0.35,
							delay: 0.18,
							ease: [0.22, 1, 0.36, 1],
						}}
						className="text-muted-foreground max-w-prose text-sm leading-relaxed sm:text-base"
					>
						{card.body}
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 8 }}
						transition={{
							duration: 0.35,
							delay: 0.24,
							ease: [0.22, 1, 0.36, 1],
						}}
						className="flex flex-wrap gap-2"
					>
						{card.tags.map((tag) => (
							<span
								key={tag}
								className="bg-background/60 text-muted-foreground rounded-full px-3 py-1 text-xs font-medium"
							>
								{tag}
							</span>
						))}
					</motion.div>

					<div className="flex flex-wrap items-center gap-3">
						<Link
							href={`/proyectos/${card.id}`}
							className="focus-ring bg-foreground text-background inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold tracking-[0.12em] uppercase transition-opacity hover:opacity-90"
						>
							Ver caso
							<span aria-hidden="true">→</span>
						</Link>
						{card.href ? (
							<a
								href={card.href}
								target="_blank"
								rel="noreferrer"
								className="focus-ring border-border text-foreground hover:border-muted-foreground inline-flex items-center gap-2 rounded-full border px-5 py-3 text-xs font-semibold tracking-[0.12em] uppercase transition-colors"
							>
								{card.hrefLabel ?? "Visitar"}
								<span aria-hidden="true">↗</span>
							</a>
						) : null}
						<motion.button
							type="button"
							onClick={onClose}
							layoutId={`card-plus-${card.id}`}
							transition={MORPH_TRANSITION}
							aria-label="Cerrar"
							className="focus-ring bg-background/60 text-foreground inline-flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-80"
						>
							<motion.span
								className="inline-flex"
								animate={{ rotate: 45 }}
								transition={MORPH_TRANSITION}
							>
								<Plus className="h-4 w-4" strokeWidth={1.5} />
							</motion.span>
						</motion.button>
					</div>
				</div>
			</motion.div>
		</div>
	)
}
