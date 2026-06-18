import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/metadata"
import { portfolioProjects } from "@/lib/portfolio-data"

// Stable build-time constant — avoids cache-busting on every deploy.
// `inProductionSince` reflects when a project shipped, not when its page
// changed, so it isn't a valid lastModified; bump this manually on edits.
const LAST_MODIFIED = new Date("2025-04-01")

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = siteConfig.url

	const projectEntries: MetadataRoute.Sitemap = portfolioProjects
		.filter((project) => project.caseStudy)
		.map((project) => ({
			url: `${baseUrl}/proyectos/${project.id}`,
			lastModified: LAST_MODIFIED,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		}))

	return [
		{
			url: baseUrl,
			lastModified: LAST_MODIFIED,
			changeFrequency: "weekly",
			priority: 1,
		},
		...projectEntries,
	]
}
