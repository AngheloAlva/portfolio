"use client"

import { useId } from "react"
import { useTheme } from "next-themes"
import { Cloud, ExternalLink, Layers } from "lucide-react"
import { LazyDither } from "@/components/lazy-dither"
import { SectionCorners } from "@/components/section-corners"
import { certifications, type Certification } from "@/lib/portfolio-data"

function TechChip({ label }: { label: string }) {
	return (
		<span className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs font-medium">
			{label}
		</span>
	)
}

function CertIcon({ cert }: { cert: Certification }) {
	if (cert.issuer.includes("AWS")) {
		return <Cloud className="text-muted-foreground h-4 w-4" />
	}
	return <Layers className="text-muted-foreground h-4 w-4" />
}

export function Certifications() {
	const sectionId = useId()
	const { resolvedTheme } = useTheme()
	const tone = resolvedTheme === "dark" ? { r: 0.22, g: 0.22, b: 0.24 } : { r: 0.8, g: 0.8, b: 0.8 }

	const featured = certifications.filter((c) => c.tier === "featured")
	const foundation = certifications.filter((c) => c.tier === "foundation")

	return (
		<section
			id="certificados"
			aria-labelledby={`${sectionId}-heading`}
			className="border-border relative scroll-mt-20 border-b p-6 sm:p-10 lg:p-14"
		>
			<div className="max-w-xl">
				<h2
					id={`${sectionId}-heading`}
					className="text-foreground text-2xl leading-[1.1] font-semibold tracking-tight sm:text-3xl lg:text-[2.5rem]"
				>
					Formación & certificados
				</h2>
				<p className="text-muted-foreground mt-5 max-w-md text-sm leading-relaxed sm:text-base">
					Formación que respalda lo que construyo: de los fundamentos a cloud y arquitectura.
				</p>
			</div>

			{/* Featured certifications */}
			<div className="relative mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-6">
				{featured.map((cert) => (
					<div
						key={cert.id}
						className="border-border bg-background relative overflow-hidden rounded-2xl border p-6 shadow-[0_12px_32px_-18px_hsl(var(--foreground)/0.08)]"
					>
						<LazyDither tone={tone} className="pointer-events-none absolute inset-0 opacity-40" />

						<div className="relative flex h-full flex-col">
							<div className="mb-3">
								<CertIcon cert={cert} />
							</div>

							<h3 className="text-sm leading-snug font-semibold">{cert.title}</h3>
							<p className="text-muted-foreground mt-1 text-xs">{cert.issuer}</p>
							<p className="text-muted-foreground mt-0.5 text-xs">{cert.date}</p>

							{cert.skills && cert.skills.length > 0 && (
								<div className="mt-4 flex flex-wrap gap-1.5">
									{cert.skills.map((skill) => (
										<TechChip key={skill} label={skill} />
									))}
								</div>
							)}

							{cert.credentialUrl && (
								<a
									href={cert.credentialUrl}
									target="_blank"
									rel="noreferrer"
									aria-label={`Ver credencial: ${cert.title}`}
									className="text-muted-foreground hover:text-foreground mt-4 inline-flex items-center gap-1.5 text-xs transition-colors"
								>
									Ver credencial
									<ExternalLink className="h-3 w-3" />
								</a>
							)}
						</div>
					</div>
				))}
			</div>

			{/* Foundation certifications */}
			<h3 className="mt-10 mb-4 text-sm font-semibold">Fundamentos</h3>
			<div className="flex flex-wrap gap-2">
				{foundation.map((cert) =>
					cert.credentialUrl ? (
						<a
							key={cert.id}
							href={cert.credentialUrl}
							target="_blank"
							rel="noreferrer"
							aria-label={`Ver credencial: ${cert.title}`}
							className="bg-muted text-muted-foreground hover:text-foreground rounded-full px-2.5 py-1 text-xs font-medium transition-colors"
						>
							{cert.title}
						</a>
					) : (
						<span
							key={cert.id}
							className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs font-medium"
						>
							{cert.title}
						</span>
					)
				)}
			</div>
			<p className="text-muted-foreground mt-3 text-xs">Emitidos por DevTalles.</p>
			<SectionCorners />
		</section>
	)
}
