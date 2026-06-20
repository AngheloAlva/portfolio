import type { ReactNode } from "react"

/**
 * Shared black & white wireframe primitives.
 *
 * These compose the per-project mockups under `components/mockups/*`. They are
 * purely decorative (`aria-hidden` is applied by the consuming wrapper) and
 * never render real client data — only the *structure* of a screen, so they
 * stay on-brand with the wireframe aesthetic and respect `confidential-ui`.
 *
 * Ink scale (one consistent language across every mockup):
 *   - `strong` → bg-foreground/70  (numbers, headings, active state)
 *   - `mid`    → bg-foreground/45  (secondary emphasis)
 *   - `soft`   → bg-foreground/10          (placeholder / empty)
 */

type Tone = "strong" | "mid" | "soft"

const TONE: Record<Tone, string> = {
	strong: "bg-foreground/70",
	mid: "bg-foreground/45",
	soft: "bg-foreground/10",
}

/** A rounded bar standing in for a run of text. */
export function WFBar({
	w = "100%",
	h = 8,
	tone = "soft",
	className,
}: {
	w?: string | number
	h?: number
	tone?: Tone
	className?: string
}): ReactNode {
	return (
		<div
			className={`rounded ${TONE[tone]} ${className ?? ""}`}
			style={{ width: typeof w === "number" ? `${w}%` : w, height: h }}
		/>
	)
}

/** Window traffic-light dots used on app-shell chrome. */
export function WFDots(): ReactNode {
	return (
		<div className="flex items-center gap-1.5">
			<span className="bg-border h-2 w-2 rounded-full" />
			<span className="bg-border h-2 w-2 rounded-full" />
			<span className="bg-border h-2 w-2 rounded-full" />
		</div>
	)
}

/** A small status/priority pill — a dot plus a short bar inside a border. */
export function WFPill({ w = 36 }: { w?: number }): ReactNode {
	return (
		<span
			className="border-border inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5"
			style={{ width: w }}
		>
			<span className="bg-foreground/50 h-1.5 w-1.5 shrink-0 rounded-full" />
			<span className="bg-foreground/10 h-1 flex-1 rounded" />
		</span>
	)
}

/**
 * Stat card with the signature accent strip on top (color in the real UI,
 * rendered as strong ink here), a label, a big "number" and a sub-line.
 */
export function WFStatCard({ accent = true }: { accent?: boolean }): ReactNode {
	return (
		<div className="border-border bg-background flex flex-col overflow-hidden rounded-lg border">
			{accent ? <span className="bg-foreground/60 h-1 w-full" /> : null}
			<div className="flex flex-1 flex-col gap-2 p-2.5">
				<div className="flex items-center justify-between">
					<WFBar w={40} h={5} tone="soft" />
					<span className="bg-foreground/10 h-3 w-3 rounded" />
				</div>
				<WFBar w={55} h={11} tone="strong" />
				<WFBar w={70} h={4} tone="soft" />
			</div>
		</div>
	)
}

/** Compact KPI chip (no accent strip) — for dense rows inside small glyphs. */
export function WFKpiChip(): ReactNode {
	return (
		<div className="border-border bg-background flex flex-1 flex-col gap-1 rounded-md border p-1.5">
			<WFBar w={60} h={8} tone="soft" />
			<WFBar w={45} h={24} tone="strong" />
		</div>
	)
}

/** Vertical bar chart. Heights are caller-provided percentages (deterministic). */
export function WFVBars({
	bars,
	tone = "strong",
	className,
}: {
	bars: readonly number[]
	tone?: Tone
	className?: string
}): ReactNode {
	return (
		<div className={`flex items-end gap-1 ${className ?? ""}`}>
			{bars.map((h, i) => (
				<div key={i} className={`flex-1 rounded-t ${TONE[tone]}`} style={{ height: `${h}%` }} />
			))}
		</div>
	)
}

/** Horizontal bar chart — rows of left-aligned bars of varying width. */
export function WFHBars({
	bars,
	className,
}: {
	bars: readonly number[]
	className?: string
}): ReactNode {
	return (
		<div className={`flex flex-col justify-center gap-2 ${className ?? ""}`}>
			{bars.map((w, i) => (
				<div key={i} className="flex items-center gap-2">
					<span className="bg-foreground/10 h-3 w-8 shrink-0 rounded" />
					<div className="bg-foreground/60 h-2.5 rounded" style={{ width: `${w}%` }} />
				</div>
			))}
		</div>
	)
}

/** Donut ring drawn with SVG so it stays crisp at any size. */
export function WFDonut({ pct = 70, className }: { pct?: number; className?: string }): ReactNode {
	const r = 28
	const c = 2 * Math.PI * r
	return (
		<svg viewBox="0 0 80 80" className={`text-foreground ${className ?? ""}`} aria-hidden="true">
			<circle
				cx="40"
				cy="40"
				r={r}
				fill="none"
				stroke="currentColor"
				strokeOpacity={0.15}
				strokeWidth={11}
			/>
			<circle
				cx="40"
				cy="40"
				r={r}
				fill="none"
				stroke="currentColor"
				strokeOpacity={0.7}
				strokeWidth={11}
				strokeDasharray={`${(pct / 100) * c} ${c}`}
				strokeLinecap="round"
				transform="rotate(-90 40 40)"
			/>
		</svg>
	)
}

/**
 * Combo chart: vertical bars with a line overlaid — the signature shape of an
 * "indicadores / KPIs over time" panel.
 */
export function WFComboChart({
	bars,
	line,
	className,
}: {
	bars: readonly number[]
	line: readonly number[]
	className?: string
}): ReactNode {
	const points = line.map((y, i) => `${(i / (line.length - 1)) * 100},${100 - y}`).join(" ")
	return (
		<div className={`relative ${className ?? ""}`}>
			<WFVBars bars={bars} tone="mid" className="absolute inset-0" />
			<svg
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				className="text-foreground absolute inset-0 h-full w-full"
				aria-hidden="true"
			>
				<polyline
					points={points}
					fill="none"
					stroke="currentColor"
					strokeOpacity={0.75}
					strokeWidth={2}
					vectorEffect="non-scaling-stroke"
				/>
			</svg>
		</div>
	)
}

/**
 * Data table: a header row plus body rows. `cols` describes each column by
 * relative flex weight; rows can opt into a trailing pill column.
 */
export function WFTable({
	cols,
	rows = 4,
	pillCol,
	className,
}: {
	cols: readonly number[]
	rows?: number
	/** index of the column rendered as a status pill */
	pillCol?: number
	className?: string
}): ReactNode {
	return (
		<div
			className={`border-border flex flex-col overflow-hidden rounded-md border ${className ?? ""}`}
		>
			<div className="border-border bg-foreground/[0.06] flex items-center gap-2 border-b px-2 py-1.5">
				{cols.map((flex, c) => (
					<div key={c} style={{ flex }}>
						<WFBar w="70%" h={4} tone="mid" />
					</div>
				))}
			</div>
			<div className="flex flex-1 flex-col">
				{Array.from({ length: rows }).map((_, r) => (
					<div
						key={r}
						className="border-border/60 flex flex-1 items-center gap-2 border-b px-2 last:border-b-0"
					>
						{cols.map((flex, c) => (
							<div key={c} style={{ flex }} className="flex items-center">
								{c === pillCol ? (
									<WFPill w={34} />
								) : (
									<WFBar w={c === 0 ? "60%" : "85%"} h={4} tone="soft" />
								)}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

/** Outer wrapper shared by every small feature glyph (the "card surface"). */
export function WFGlyphCard({
	children,
	className,
}: {
	children: ReactNode
	className?: string | undefined
}): ReactNode {
	return (
		<div
			aria-hidden="true"
			className={`border-border bg-background overflow-hidden rounded-xl border p-3 ${className ?? ""}`}
		>
			<div className="flex h-full flex-col">{children}</div>
		</div>
	)
}
