"use client"

import { useId } from "react"
import { useTheme } from "next-themes"
import { Check } from "lucide-react"
import { LazyDither } from "@/components/lazy-dither"
import { SectionCorners } from "@/components/section-corners"
import { workExperience } from "@/lib/portfolio-data"

export function Experience() {
	const sectionId = useId()
	const { resolvedTheme } = useTheme()
	const tone = resolvedTheme === "dark" ? { r: 0.22, g: 0.22, b: 0.24 } : { r: 0.9, g: 0.9, b: 0.9 }

	return (
		<section
			id="experiencia"
			aria-labelledby={`${sectionId}-heading`}
			className="border-border relative scroll-mt-20 border-b p-6 sm:p-10 lg:p-14"
		>
			<div className="max-w-xl">
				<h2
					id={`${sectionId}-heading`}
					className="text-foreground text-2xl leading-[1.1] font-semibold tracking-tight sm:text-3xl lg:text-[2.5rem]"
				>
					Experiencia
				</h2>
				<p className="text-muted-foreground mt-5 max-w-md text-sm leading-relaxed sm:text-base">
					Una relación de trabajo continua: de freelance a desarrollador full stack.
				</p>
			</div>

			<div className="relative mt-12 lg:mt-16">
				{workExperience.map((job) => (
					<article
						key={job.id}
						className="border-border bg-background relative overflow-hidden rounded-2xl border p-6 shadow-[0_12px_32px_-18px_hsl(var(--foreground)/0.08)] sm:p-8"
					>
						<LazyDither tone={tone} className="pointer-events-none absolute inset-0 opacity-30" />

						<div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-14">
							{/* Identity + summary */}
							<div>
								{job.companyLogo && (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={job.companyLogo}
										alt=""
										className="mb-5 h-auto w-24 brightness-0 dark:brightness-0 dark:invert"
									/>
								)}
								<h3 className="text-foreground text-lg font-semibold tracking-tight">
									{job.company}
								</h3>
								<p className="text-muted-foreground mt-0.5 text-sm">{job.role}</p>
								<p className="text-muted-foreground mt-0.5 text-xs">{job.period}</p>
								<p className="text-muted-foreground mt-4 text-sm leading-relaxed">{job.summary}</p>
							</div>

							{/* Milestones + highlights */}
							<div className="flex flex-col gap-8">
								{job.milestones.length > 0 && (
									<div>
										<p className="text-muted-foreground/70 mb-4 text-xs font-semibold tracking-wider uppercase">
											Hitos
										</p>
										<ol className="border-border relative space-y-5 border-l pl-6">
											{job.milestones.map((milestone) => (
												<li key={milestone.title} className="relative">
													<span
														aria-hidden="true"
														className="border-border bg-foreground/40 absolute top-1.5 -left-6 h-2 w-2 -translate-x-1/2 rounded-full border"
													/>
													<p className="text-muted-foreground text-xs">{milestone.date}</p>
													<p className="text-foreground mt-0.5 text-sm font-semibold">
														{milestone.title}
													</p>
													<p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
														{milestone.description}
													</p>
												</li>
											))}
										</ol>
									</div>
								)}

								{job.highlights.length > 0 && (
									<div>
										<p className="text-muted-foreground/70 mb-4 text-xs font-semibold tracking-wider uppercase">
											Logros
										</p>
										<ul className="space-y-3">
											{job.highlights.map((highlight) => (
												<li key={highlight} className="flex items-start gap-3 text-sm">
													<span className="bg-muted text-foreground mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
														<Check className="h-3 w-3" strokeWidth={2} />
													</span>
													<span className="text-muted-foreground leading-relaxed">{highlight}</span>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</div>
					</article>
				))}
			</div>
			<SectionCorners />
		</section>
	)
}
