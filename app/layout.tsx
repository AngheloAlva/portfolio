import { Providers } from "@/components/providers"
import { SkipToContent } from "@/components/skip-to-content"
import { ThemeSwitch } from "@/components/theme-switch"
import { baseMetadata, siteConfig } from "@/lib/metadata"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import type { ReactNode } from "react"
import "./globals.css"

const personWebSiteSchema = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Person",
			"@id": `${siteConfig.url}/#person`,
			name: "Anghelo Alva",
			url: siteConfig.url,
			jobTitle: "Desarrollador Full Stack",
			description: siteConfig.description,
			sameAs: [
				"https://www.linkedin.com/in/anghelo-alva/",
				"https://github.com/AngheloAlva",
			],
			address: {
				"@type": "PostalAddress",
				addressCountry: "CL",
			},
		},
		{
			"@type": "WebSite",
			"@id": `${siteConfig.url}/#website`,
			url: siteConfig.url,
			name: siteConfig.name,
			author: { "@id": `${siteConfig.url}/#person` },
		},
	],
}

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
	display: "swap",
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
	display: "swap",
})

export const metadata: Metadata = baseMetadata

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
	],
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>): ReactNode {
	return (
		<html lang="es" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground min-h-screen font-sans antialiased`}
			>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personWebSiteSchema) }}
				/>
				<Providers>
					<SkipToContent />
					<div className="border-border mx-auto flex min-h-screen w-[calc(100%-1.5rem)] max-w-[1440px] flex-col border-x sm:w-[calc(100%-2.5rem)] lg:w-[calc(100%-3rem)]">
						{children}
					</div>
					<ThemeSwitch />
				</Providers>
			</body>
		</html>
	)
}
