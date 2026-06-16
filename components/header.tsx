"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, type ReactNode } from "react"

const primaryLinks = [
	{ label: "Proyectos", href: "/#proyectos" },
	{ label: "Experiencia", href: "/#experiencia" },
	{ label: "Sobre mí", href: "/#sobre-mi" },
	{ label: "Stack", href: "/#stack" },
	{ label: "Contacto", href: "/#contacto" },
]

const mobileLinks = [{ label: "Inicio", href: "/" }, ...primaryLinks]

const utilityLinks = [
	{ label: "Email", href: "mailto:anghelo.alva.q@gmail.com" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/anghelo-alva/" },
	{ label: "GitHub", href: "https://github.com/AngheloAlva" },
	{ label: "Descargar CV", href: "/cv-anghelo-alva.pdf" },
]

function Logo(): ReactNode {
	return (
		<Link
			href="/"
			className="focus-ring enter text-foreground inline-flex items-center gap-2 rounded-sm"
			aria-label="Anghelo Alva — inicio"
		>
			<span
				aria-hidden="true"
				className="bg-foreground text-background flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] font-mono text-[11px] leading-none font-bold"
			>
				A
			</span>
			<span className="text-lg leading-none font-semibold tracking-tight">Anghelo Alva</span>
		</Link>
	)
}

export function Header(): ReactNode {
	const [isOpen, setIsOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)

	const closeMenu = (): void => setIsOpen(false)

	useEffect(() => {
		const handleScroll = (): void => {
			setIsScrolled(window.scrollY > 8)
		}

		handleScroll()
		window.addEventListener("scroll", handleScroll, { passive: true })
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	useEffect(() => {
		if (!isOpen) return

		const originalOverflow = document.body.style.overflow
		document.body.style.overflow = "hidden"
		document.body.classList.add("nav-open")

		return () => {
			document.body.style.overflow = originalOverflow
			document.body.classList.remove("nav-open")
		}
	}, [isOpen])

	return (
		<header className="border-border bg-background/95 supports-backdrop-filter:bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
			<span
				aria-hidden="true"
				className="border-border bg-background pointer-events-none absolute bottom-0 left-0 z-10 h-1.75 w-1.75 -translate-x-1/2 translate-y-1/2 border"
			/>
			<span
				aria-hidden="true"
				className="border-border bg-background pointer-events-none absolute right-0 bottom-0 z-10 h-1.75 w-1.75 translate-x-1/2 translate-y-1/2 border"
			/>

			<div className="flex h-16 items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
				<Logo />

				<nav
					className={`hidden rounded-full px-2 py-1.5 transition-[background-color] duration-300 ease-out lg:ml-12 lg:flex lg:items-center lg:gap-1 ${
						isScrolled ? "bg-transparent" : "bg-muted"
					}`}
					aria-label="Primary navigation"
				>
					{primaryLinks.map((link, i) => (
						<Link
							key={link.href}
							href={link.href}
							style={{ ["--enter-delay" as string]: `${80 + i * 60}ms` }}
							className="focus-ring enter text-foreground hover:text-muted-foreground rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
						>
							{link.label}
						</Link>
					))}
				</nav>

				<div className="ml-auto hidden items-center gap-4 lg:flex">
					<a
						href="/cv-anghelo-alva.pdf"
						download
						style={{ ["--enter-delay" as string]: "260ms" }}
						className="focus-ring enter text-foreground hover:text-muted-foreground rounded-full px-2 py-1.5 text-sm font-medium transition-colors"
					>
						Descargar CV
					</a>
					<Link
						href="/#contacto"
						style={{ ["--enter-delay" as string]: "320ms" }}
						className={`focus-ring enter text-foreground hover:text-muted-foreground rounded-full px-5 py-2.5 text-sm font-medium transition-[background-color] duration-300 ease-out ${
							isScrolled ? "bg-transparent" : "bg-muted hover:bg-border"
						}`}
					>
						Contacto
					</Link>
				</div>

				<div className="ml-auto flex items-center gap-2 lg:hidden">
					<Link
						href="/#contacto"
						style={{ ["--enter-delay" as string]: "120ms" }}
						className="focus-ring enter bg-muted text-foreground hover:bg-border rounded-full px-4 py-2 text-sm font-medium transition-colors"
					>
						Contacto
					</Link>
					<button
						type="button"
						style={{ ["--enter-delay" as string]: "180ms" }}
						className="focus-ring enter bg-muted text-foreground hover:bg-border inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors"
						aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
						aria-expanded={isOpen}
						aria-controls="mobile-navigation"
						onClick={() => setIsOpen((open) => !open)}
					>
						{isOpen ? (
							<X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
						) : (
							<Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
						)}
					</button>
				</div>
			</div>

			<div
				id="mobile-navigation"
				className={`border-border bg-background fixed inset-x-0 top-16 z-40 min-h-[calc(100dvh-4rem)] border-t transition-[opacity,visibility] duration-200 sm:top-20 sm:min-h-[calc(100dvh-5rem)] lg:hidden ${
					isOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
				}`}
			>
				<div className="min-h-[calc(100dvh-4rem)] px-4 pt-16 sm:min-h-[calc(100dvh-5rem)] sm:px-6 sm:pt-20">
					<nav aria-label="Mobile navigation">
						<ul className="space-y-2">
							{mobileLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="focus-ring text-foreground hover:text-muted-foreground block rounded-lg text-4xl leading-tight font-normal tracking-[-0.04em] transition-colors sm:text-5xl"
										onClick={closeMenu}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<div className="mt-12 flex flex-col items-start gap-2 pb-10">
						<p className="text-muted-foreground text-base font-medium tracking-[-0.02em]">
							Contacto
						</p>
						{utilityLinks.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								className="focus-ring text-foreground hover:text-muted-foreground rounded-md text-base font-normal transition-colors"
								onClick={closeMenu}
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</header>
	)
}
