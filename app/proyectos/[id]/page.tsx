import { CaseStudyView } from "@/components/case-study"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { createMetadata, siteConfig } from "@/lib/metadata"
import { portfolioProjects } from "@/lib/portfolio-data"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { ReactNode } from "react"

export const dynamicParams = false

export function generateStaticParams(): Array<{ id: string }> {
	return portfolioProjects
		.filter((project) => project.caseStudy)
		.map((project) => ({ id: project.id }))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>
}): Promise<Metadata> {
	const { id } = await params
	const project = portfolioProjects.find((p) => p.id === id && p.caseStudy)
	if (!project) return {}
	return createMetadata({
		title: project.title,
		description: project.caseStudy?.pitch ?? project.shortDescription,
		path: `/proyectos/${project.id}`,
		image: project.imageUrl,
	})
}

export default async function ProjectCaseStudyPage({
	params,
}: {
	params: Promise<{ id: string }>
}): Promise<ReactNode> {
	const { id } = await params
	const project = portfolioProjects.find((p) => p.id === id && p.caseStudy)
	if (!project) notFound()

	const projectUrl = `${siteConfig.url}/proyectos/${project.id}`
	const hasRealImage = project.imageUrl?.startsWith("/projects/")

	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Inicio",
				item: siteConfig.url,
			},
			{
				"@type": "ListItem",
				position: 2,
				name: project.title,
				item: projectUrl,
			},
		],
	}

	const creativeWorkSchema = {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name: project.title,
		description: project.caseStudy?.pitch ?? project.shortDescription,
		url: projectUrl,
		author: { "@id": `${siteConfig.url}/#person` },
		...(hasRealImage && {
			image: `${siteConfig.url}${project.imageUrl}`,
		}),
	}

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
			/>
			<Header />
			<CaseStudyView project={project} />
			<Footer />
		</>
	)
}
