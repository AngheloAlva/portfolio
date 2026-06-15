import { DitherShader } from "@/components/dither-shader"
import type { ReactNode } from "react"

export function FinalCTA(): ReactNode {
	return (
		<section id="contacto" className="bg-background scroll-mt-20 p-6 sm:p-10 lg:p-14">
			<div className="border-border overflow-hidden rounded-3xl border bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,420px)]">
					<div className="flex min-h-80 flex-col justify-center px-8 py-12 sm:px-12 sm:py-16 lg:border-r lg:border-neutral-200 lg:px-14 lg:py-20 dark:lg:border-neutral-800">
						<h2 className="max-w-md text-3xl leading-[1.1] font-medium tracking-tight sm:text-4xl lg:text-[2.5rem]">
							¿Construimos algo juntos?
						</h2>
						<p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-400">
							Desarrollador full stack, responsable del ciclo completo —del levantamiento al soporte
							en producción. Abierto a nuevas oportunidades y proyectos.
						</p>
						<div className="mt-10 flex flex-wrap items-center gap-3">
							<a
								href="mailto:anghelo.alva.q@gmail.com"
								className="focus-ring inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-3.5 font-mono text-xs font-medium tracking-[0.12em] text-neutral-50 uppercase transition-opacity hover:opacity-90 dark:bg-neutral-50 dark:text-neutral-950"
							>
								Escríbeme
								<span aria-hidden="true">→</span>
							</a>
							<a
								href="https://www.linkedin.com/in/anghelo-alva/"
								className="focus-ring inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-3.5 font-mono text-xs font-medium tracking-[0.12em] text-neutral-950 uppercase transition-colors hover:border-neutral-500 dark:border-neutral-700 dark:text-neutral-50 dark:hover:border-neutral-500"
							>
								LinkedIn
							</a>
							<a
								href="https://github.com/AngheloAlva"
								className="focus-ring inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-3.5 font-mono text-xs font-medium tracking-[0.12em] text-neutral-950 uppercase transition-colors hover:border-neutral-500 dark:border-neutral-700 dark:text-neutral-50 dark:hover:border-neutral-500"
							>
								GitHub
							</a>
							<a
								href="/cv-anghelo-alva.pdf"
								download
								className="focus-ring inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-3.5 font-mono text-xs font-medium tracking-[0.12em] text-neutral-950 uppercase transition-colors hover:border-neutral-500 dark:border-neutral-700 dark:text-neutral-50 dark:hover:border-neutral-500"
							>
								Descargar CV
							</a>
						</div>
					</div>

					<div className="relative min-h-80 p-2 lg:min-h-90">
						<div className="relative h-full w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
							<DitherShader variant="cta" />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
