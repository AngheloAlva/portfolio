import { About } from "@/components/about"
import { Certifications } from "@/components/certifications"
import { Community } from "@/components/community"
import { DitherShader } from "@/components/dither-shader"
import { Experience } from "@/components/experience"
import { Faq } from "@/components/faq"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { LogoMarquee } from "@/components/logo-marquee"
import { Stack } from "@/components/stack"
import { Reveal } from "@/components/reveal"
import { SectionCorners } from "@/components/section-corners"
import { Showcase } from "@/components/showcase"
import { Download } from "lucide-react"
import type { ReactNode } from "react"

export default function HomePage(): ReactNode {
	return (
		<>
			<Header />

			<main id="main-content" className="flex-1">
				<section className="border-border relative border-b">
					<div className="grid grid-cols-1 lg:grid-cols-2">
						<div className="lg:border-border flex min-h-130 flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:min-h-160 lg:border-r lg:px-14 lg:py-24">
							<p
								style={{ ["--enter-delay" as string]: "300ms" }}
								className="enter text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase"
							>
								Hola, soy Anghelo 👋
							</p>
							<h1
								style={{ ["--enter-delay" as string]: "380ms" }}
								className="enter text-foreground mt-6 text-4xl leading-[1.05] font-medium tracking-tighter sm:text-5xl lg:text-[3.5rem] xl:text-[4.5rem]"
							>
								Construyo software que las empresas usan todos los días.
								<br />
								<span className="text-muted-foreground">Y me quedo a sostenerlo.</span>
							</h1>
							<div
								style={{ ["--enter-delay" as string]: "520ms" }}
								className="enter mt-10 flex flex-wrap items-center gap-6"
							>
								<a
									href="#proyectos"
									className="focus-ring bg-foreground text-background inline-flex items-center gap-2 rounded-full px-5 py-4 text-xs font-semibold tracking-[0.12em] uppercase transition-opacity hover:opacity-90"
								>
									Ver proyectos
								</a>
								<a
									href="/cv-anghelo-alva.pdf"
									download
									className="focus-ring text-foreground hover:text-muted-foreground inline-flex items-center gap-2 rounded-full px-2 py-3 text-xs font-semibold tracking-[0.12em] uppercase transition-colors hover:underline"
								>
									Descargar CV
									<span
										className="bg-foreground inline-flex size-6 items-center justify-center rounded-full"
										aria-hidden="true"
									>
										<Download className="text-background size-4" />
									</span>
								</a>
							</div>
						</div>

						<div
							style={{ ["--enter-delay" as string]: "200ms" }}
							className="enter-fade relative min-h-80 overflow-hidden lg:min-h-160"
						>
							<DitherShader />
						</div>
					</div>

					<div className="border-border grid grid-cols-1 border-t lg:grid-cols-2">
						<div className="border-border border-b px-6 py-10 sm:px-10 lg:border-r lg:border-b-0 lg:px-14">
							<p
								style={{ ["--enter-delay" as string]: "680ms" }}
								className="enter text-muted-foreground max-w-md text-base leading-relaxed sm:text-lg"
							>
								Desarrollador full stack autodidacta. Aprendí construyendo sistemas reales en
								producción: levanto requerimientos con el cliente, diseño, desarrollo, despliego y
								doy soporte.
							</p>
						</div>
						<div className="grid grid-cols-3 px-6 py-10 sm:px-10 lg:px-14">
							{[
								{ label: "En producción", value: "7+" },
								{ label: "Rubros", value: "4" },
								{ label: "Ciclo completo", value: "E2E" },
							].map((stat, i) => (
								<div
									key={stat.label}
									style={{ ["--enter-delay" as string]: `${740 + i * 80}ms` }}
									className="enter"
								>
									<p className="text-muted-foreground text-xs font-medium tracking-wide sm:text-sm">
										{stat.label}
									</p>
									<p className="text-foreground mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
										{stat.value}
									</p>
								</div>
							))}
						</div>
					</div>
					<SectionCorners />
				</section>

				<Reveal>
					<section className="border-border relative border-b p-6 sm:p-10 lg:p-14">
						<div className="relative grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
							<article className="border-border bg-background flex min-h-90 flex-col justify-between rounded-2xl border p-6 sm:p-8 lg:min-h-120">
								<h2 className="text-foreground max-w-md text-2xl leading-[1.15] font-semibold tracking-tight sm:text-3xl lg:text-[2rem]">
									<span className="text-muted-foreground">Con quiénes</span> trabajé
								</h2>
								<p className="text-muted-foreground mt-12 max-w-md text-sm leading-relaxed sm:text-base">
									Trabajé en energía, minería, turismo, educación, salud y retail, con sus equipos y
									operaciones reales —de forma directa o a través de Ingeniería Simple.
								</p>
							</article>
							<div className="bg-muted relative min-h-90 overflow-hidden rounded-2xl lg:min-h-120">
								<LogoMarquee />
							</div>
							<div
								aria-hidden="true"
								className="bg-border pointer-events-none absolute top-0 bottom-0 hidden w-px -translate-x-1/2 lg:block"
								style={{ left: "50%" }}
							/>
						</div>
						<SectionCorners />
					</section>
				</Reveal>

				<Reveal>
					<Showcase />
				</Reveal>
				<Reveal>
					<Experience />
				</Reveal>

				<About />

				<Reveal>
					<section className="border-border relative border-b">
						<div className="px-6 pt-6 sm:px-10 sm:pt-10 lg:px-14 lg:pt-14">
							<h2 className="text-foreground text-2xl leading-[1.1] font-semibold tracking-tight sm:text-3xl lg:text-[2.5rem]">
								Así trabajo
							</h2>
							<p className="text-muted-foreground mt-5 max-w-xl text-sm leading-relaxed sm:text-base">
								Tomo cada proyecto de punta a punta y me quedo como responsable: del primer
								requerimiento al soporte en producción.
							</p>
						</div>

						<div className="border-border mt-12 border-t lg:mt-16">
							{[
								{
									title: "Levantamiento en terreno",
									body: "Me reúno con el cliente —muchas veces en su planta u oficina— para entender la operación real, los dolores del día a día y lo que de verdad necesita el negocio.",
								},
								{
									title: "Diseño y arquitectura",
									body: "Modelo los datos, defino la arquitectura y elijo el stack según el problema, no según la moda. Prototipo los flujos antes de escribir el sistema.",
								},
								{
									title: "Desarrollo end-to-end",
									body: "Construyo front, back, base de datos e integraciones, con iteraciones frecuentes y validación constante contra la operación real del cliente.",
								},
								{
									title: "Despliegue y soporte",
									body: "Pongo el sistema en producción y me quedo: mejoras continuas, soporte y evolución a medida que el negocio crece.",
								},
							].map((step, i) => (
								<div
									key={step.title}
									className="border-border grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-3 border-b px-6 py-6 sm:grid-cols-[auto_minmax(0,18rem)_minmax(0,1fr)] sm:gap-x-10 sm:px-10 sm:py-8 lg:px-14"
								>
									<div className="border-border text-foreground row-span-2 flex h-10 w-10 items-center justify-center self-center rounded-md border font-mono text-sm sm:row-span-1">
										{i + 1}
									</div>
									<h3 className="text-foreground text-lg leading-tight font-semibold tracking-tight sm:text-xl">
										{step.title}
									</h3>
									<p className="text-muted-foreground col-start-2 max-w-prose text-sm leading-relaxed sm:col-start-3 sm:text-base">
										{step.body}
									</p>
								</div>
							))}
						</div>

						<div className="px-6 pt-10 pb-6 sm:px-10 sm:pt-12 sm:pb-10 lg:px-14 lg:pb-14">
							<a
								href="#contacto"
								className="focus-ring bg-foreground text-background inline-flex items-center gap-2 rounded-full px-5 py-3.5 font-mono text-xs font-medium tracking-[0.12em] uppercase transition-opacity hover:opacity-90"
							>
								Hablemos
								<span aria-hidden="true">→</span>
							</a>
						</div>
						<SectionCorners />
					</section>
				</Reveal>

				<Reveal>
					<Stack />
				</Reveal>
				<Community />
				<Reveal>
					<Certifications />
				</Reveal>
				<Reveal>
					<Faq />
				</Reveal>
			</main>
			<Reveal>
				<FinalCTA />
			</Reveal>
			<Footer />
		</>
	)
}
