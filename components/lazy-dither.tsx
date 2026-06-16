"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { useReducedMotion } from "motion/react"
import { DitherShader, type DitherTone, type DitherVariant } from "@/components/dither-shader"

type LazyDitherProps = {
	variant?: DitherVariant
	tone?: DitherTone
	className?: string
}

/**
 * Mounts the WebGL DitherShader only while its container is near the viewport,
 * and unmounts it when scrolled away. Each DitherShader holds its own WebGL2
 * context and browsers cap how many can live at once (~16); gating the mount
 * keeps the page well under that limit so older contexts (e.g. the hero) are
 * never evicted.
 */
export function LazyDither({ variant = "cta", tone, className }: LazyDitherProps): ReactNode {
	const ref = useRef<HTMLDivElement>(null)
	const reduce = useReducedMotion()
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const el = ref.current
		if (!el || reduce) return
		const io = new IntersectionObserver(
			(entries) => {
				const entry = entries[0]
				if (entry) setVisible(entry.isIntersecting)
			},
			{ rootMargin: "200px" }
		)
		io.observe(el)
		return () => io.disconnect()
	}, [reduce])

	return (
		<div ref={ref} aria-hidden="true" className={className}>
			{visible && !reduce ? <DitherShader variant={variant} {...(tone ? { tone } : {})} /> : null}
		</div>
	)
}
