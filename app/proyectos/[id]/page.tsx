import { CaseStudyView } from "@/components/case-study"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { createMetadata } from "@/lib/metadata"
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

	return (
		<>
			<Header />
			<CaseStudyView project={project} />
			<Footer />
		</>
	)
}
