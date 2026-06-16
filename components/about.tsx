import Image from "next/image"
import { Reveal } from "@/components/reveal"
import { SectionCorners } from "@/components/section-corners"
import type { ReactNode } from "react"

const VALUES: ReadonlyArray<{ title: string; body: string }> = [
	{
		title: "Entender el negocio antes que el código.",
		body: "Si no resuelve el problema real, no sirve por más lindo que sea.",
	},
	{
		title: "El stack lo decide el problema, no la moda.",
		body: "Elijo las herramientas según lo que necesita el proyecto.",
	},
	{
		title: "Simple y mantenible le gana a brillante.",
		body: "Prefiero algo sólido que algo imposible de sostener.",
	},
	{
		title: "La lógica crítica va con tests.",
		body: "Me da la confianza para cambiar sin romper nada.",
	},
]

export function About(): ReactNode {
	return (
		<Reveal>
			<section
				id="sobre-mi"
				aria-labelledby="about-heading"
				className="border-border relative scroll-mt-20 border-b p-6 sm:p-10 lg:p-14"
			>
				<h2
					id="about-heading"
					className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase"
				>
					Sobre mí
				</h2>

				<div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
					{/* Bio — 2/3 */}
					<div className="lg:col-span-2">
						<div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-[auto_1fr] sm:gap-10">
							<Image
								src="/me.jpeg"
								alt="Anghelo Alva"
								width={160}
								height={160}
								className="size-36 shrink-0 rounded-2xl object-cover sm:size-40"
							/>

							<div className="max-w-prose space-y-5">
								<p className="text-foreground text-base leading-relaxed sm:text-lg">
									Soy desarrollador full stack autodidacta, y desde el primer año me tocó construir
									software para empresas reales: ERPs, e-commerce y sistemas de gestión que hoy
									están en producción, con gente que depende de ellos todos los días.
								</p>
								<p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
									Eso me marcó la forma de trabajar. Me gusta hacerme cargo del problema completo,
									no solo de mi parte: me siento con el cliente —muchas veces en su planta— para
									entender qué necesita, modelo los datos, desarrollo front y back, despliego y me
									quedo dando soporte.
								</p>
								<p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
									Soy curioso y medio obsesivo con entender cómo funcionan las cosas por dentro:
									cuando algo me interesa, lo construyo desde cero para entenderlo de verdad. Hoy
									estoy reforzando el lado de arquitectura cloud, certificándome como AWS Solutions
									Architect Associate.
								</p>
							</div>
						</div>
					</div>

					{/* Qué me importa — 1/3 */}
					<div className="border-border lg:border-l lg:pl-12">
						<h3 className="text-foreground text-sm font-semibold tracking-tight">
							Qué me importa al construir
						</h3>
						<ul className="mt-6 space-y-5">
							{VALUES.map((value) => (
								<li key={value.title}>
									<p className="text-foreground text-sm leading-snug font-medium">{value.title}</p>
									<p className="text-muted-foreground mt-1 text-sm leading-relaxed">{value.body}</p>
								</li>
							))}
						</ul>
					</div>
				</div>

				<SectionCorners />
			</section>
		</Reveal>
	)
}
