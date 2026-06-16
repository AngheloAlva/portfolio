"use client"

import { motion, useReducedMotion, type Transition } from "motion/react"
import Image from "next/image"
import { useEffect, useState, type ReactNode } from "react"
import { LazyDither } from "@/components/lazy-dither"
import { SectionCorners } from "@/components/section-corners"
import { miniProjects, type MiniProject } from "@/lib/portfolio-data"
import { Github } from "lucide-react"

export function Community(): ReactNode {
	const [openId, setOpenId] = useState<string | null>(null)
	const reduce = useReducedMotion()

	// Close the expanded card with Escape.
	useEffect(() => {
		if (!openId) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpenId(null)
		}
		window.addEventListener("keydown", onKey)
		return () => window.removeEventListener("keydown", onKey)
	}, [openId])

	const transition: Transition = reduce
		? { duration: 0 }
		: { type: "spring", stiffness: 320, damping: 34, mass: 0.8 }

	return (
		<section
			id="mas-proyectos"
			aria-labelledby="community-heading"
			className="border-border relative overflow-hidden border-b"
		>
			<ShaderBackdrop />

			<div className="relative z-10 flex w-full flex-col gap-8 px-6 py-16 sm:gap-10 sm:px-10 sm:py-20 lg:px-14">
				<div className="max-w-2xl">
					<h2
						id="community-heading"
						className="text-foreground text-2xl leading-[1.05] font-medium tracking-tighter sm:text-3xl lg:text-[2.5rem]"
					>
						Más proyectos
					</h2>
					<p className="text-muted-foreground mt-3 max-w-lg text-sm leading-relaxed sm:text-base">
						Prototipos, demos y trabajos más chicos. Abre una tarjeta para ver el detalle, las
						tecnologías y la demo en vivo.
					</p>
				</div>

				<motion.ul
					layout
					transition={transition}
					className="grid list-none grid-flow-row-dense grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
				>
					{miniProjects.map((project) => {
						const open = openId === project.id
						return (
							<motion.li
								key={project.id}
								layout
								transition={transition}
								className={open ? "col-span-full" : ""}
							>
								{open ? (
									<ExpandedCard project={project} reduce={reduce} onClose={() => setOpenId(null)} />
								) : (
									<CollapsedCard project={project} onOpen={() => setOpenId(project.id)} />
								)}
							</motion.li>
						)
					})}
				</motion.ul>
			</div>
			<SectionCorners />
		</section>
	)
}

// WebGL dither backdrop. LazyDither only mounts the shader while the section is
// near the viewport (the shader runs a continuous rAF loop, so we don't keep it
// alive offscreen) and never under prefers-reduced-motion.
function ShaderBackdrop(): ReactNode {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.18]"
			style={{
				WebkitMaskImage:
					"linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
				maskImage:
					"linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
			}}
		>
			<LazyDither variant="hero" className="absolute inset-0" />
		</div>
	)
}

function CollapsedCard({
	project,
	onOpen,
}: {
	project: MiniProject
	onOpen: () => void
}): ReactNode {
	const visibleTech = project.technologies.slice(0, 3)
	const extraTech = project.technologies.length - visibleTech.length

	return (
		<button
			type="button"
			onClick={onOpen}
			aria-expanded={false}
			className="focus-ring group border-border bg-background hover:border-foreground/30 flex h-full min-h-44 w-full flex-col justify-start gap-6 rounded-2xl border p-5 text-left transition-colors sm:p-6"
		>
			<div className="flex flex-wrap gap-1.5">
				{visibleTech.map((tech) => (
					<TechChip key={tech} label={tech} />
				))}
				{extraTech > 0 ? (
					<span
						className="bg-muted/60 text-muted-foreground/80 rounded-full px-2.5 py-1 text-xs font-medium"
						aria-label={`${extraTech} tecnologías más`}
					>
						+{extraTech}
					</span>
				) : null}
			</div>
			<div>
				<h3 className="text-foreground text-base leading-tight font-medium tracking-tight">
					{project.title}
				</h3>
				<p className="text-muted-foreground mt-1 text-sm leading-relaxed">
					{project.shortDescription}
				</p>
				<span className="text-muted-foreground/80 group-hover:text-foreground mt-3 inline-flex items-center gap-1 text-xs font-medium transition-colors">
					Ver más
					<span
						aria-hidden="true"
						className="transition-transform duration-300 ease-out group-hover:translate-y-0.5"
					>
						↓
					</span>
				</span>
			</div>
		</button>
	)
}

function ExpandedCard({
	project,
	reduce,
	onClose,
}: {
	project: MiniProject
	reduce: boolean | null
	onClose: () => void
}): ReactNode {
	const description = project.longDescription ?? project.shortDescription
	return (
		<motion.div
			initial={reduce ? false : { opacity: 0 }}
			animate={{ opacity: 1 }}
			className="border-foreground/20 bg-background relative grid gap-6 overflow-hidden rounded-2xl border p-5 sm:p-6 lg:grid-cols-2 lg:gap-8"
		>
			<ProjectMedia project={project} />

			<div className="flex flex-col">
				<div className="flex items-start justify-between gap-4">
					<h3 className="text-foreground text-lg leading-tight font-medium tracking-tight sm:text-xl">
						{project.title}
					</h3>
					<button
						type="button"
						onClick={onClose}
						aria-expanded={true}
						aria-label="Cerrar detalle"
						className="focus-ring text-muted-foreground hover:text-foreground hover:bg-muted -mt-1 -mr-1 grid size-8 shrink-0 place-items-center rounded-full transition-colors"
					>
						<span aria-hidden="true" className="text-lg leading-none">
							×
						</span>
					</button>
				</div>

				<p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
					{description}
				</p>

				<div className="mt-5 flex flex-wrap gap-1.5">
					{project.technologies.map((tech) => (
						<TechChip key={tech} label={tech} />
					))}
				</div>

				{project.why ? <DetailBlock label="Por qué" body={project.why} /> : null}
				{project.learnings ? <DetailBlock label="Aprendizaje" body={project.learnings} /> : null}

				<div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
					<a
						href={project.href}
						target="_blank"
						rel="noreferrer"
						className="focus-ring bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors"
					>
						Ver demo
						<span aria-hidden="true">↗</span>
					</a>
					{project.repoUrl ? (
						<a
							href={project.repoUrl}
							target="_blank"
							rel="noreferrer"
							className="focus-ring border-border text-foreground hover:bg-muted inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
						>
							Código
							<Github className="size-4.5" />
						</a>
					) : null}
				</div>
			</div>
		</motion.div>
	)
}

function ProjectMedia({ project }: { project: MiniProject }): ReactNode {
	return (
		<div className="bg-muted relative h-full min-h-96 overflow-hidden rounded-xl">
			{project.image ? (
				<Image
					src={project.image}
					alt={`Captura de ${project.title}`}
					fill
					sizes="(min-width: 1024px) 45vw, 100vw"
					className="object-cover object-center"
				/>
			) : (
				<div
					aria-hidden="true"
					className="from-primary/15 via-background to-background grid h-full w-full place-items-center bg-linear-to-br"
				>
					<span className="text-foreground/40 text-4xl font-semibold tracking-tighter">
						{project.title.charAt(0)}
					</span>
				</div>
			)}
		</div>
	)
}

function TechChip({ label }: { label: string }): ReactNode {
	return (
		<span className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs font-medium">
			{label}
		</span>
	)
}

function DetailBlock({ label, body }: { label: string; body: string }): ReactNode {
	return (
		<div className="mt-5">
			<h4 className="text-foreground/70 text-xs font-semibold tracking-wide uppercase">{label}</h4>
			<p className="text-muted-foreground mt-1 text-sm leading-relaxed">{body}</p>
		</div>
	)
}
