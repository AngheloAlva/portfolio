import type { ReactNode } from "react"
import { WFBar, WFGlyphCard, WFPill } from "@/components/mockups/primitives"

/* ────────────────────────────────────────────────────────────────────────
 * Desafío PEI — AIEP — faithful black & white wireframes.
 *
 * A live, Kahoot-style quiz event (centered, white-label screens). The case
 * study's "features" are product DECISIONS, so each glyph illustrates the
 * concept through its real screen: landing, live question, admin control,
 * late-join timeline, per-campus ranking and the final raffle.
 *
 * Structure only — no real data — honouring `confidential-ui`.
 * ──────────────────────────────────────────────────────────────────────── */

/** HERO — the centered landing ("Inicio"): brand, title, CTA, event card. */
export function AiepHero({ label }: { label?: string }): ReactNode {
	return (
		<div
			aria-hidden="true"
			className="border-border bg-background flex h-full min-h-[22rem] w-full flex-col overflow-hidden rounded-2xl border"
		>
			{/* Top bar: brand lockup + theme toggle */}
			<div className="flex items-center gap-2 px-4 py-3">
				<span className="bg-foreground/70 h-5 w-9 rounded-sm" />
				<span className="bg-border h-4 w-px" />
				<span className="bg-muted h-5 w-7 rounded-sm" />
				{label ? (
					<span className="text-muted-foreground ml-3 hidden truncate font-mono text-[0.625rem] tracking-[0.14em] uppercase md:inline">
						{label}
					</span>
				) : null}
				<span className="border-border ml-auto h-6 w-6 rounded-md border" />
			</div>

			{/* Centered landing content */}
			<div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-6 text-center">
				<div className="flex flex-col items-center gap-2">
					<WFBar w="11rem" h={16} tone="strong" />
					<WFBar w="7rem" h={16} tone="strong" />
				</div>
				<div className="flex flex-col items-center gap-1.5">
					<WFBar w="16rem" h={5} tone="soft" />
					<WFBar w="13rem" h={5} tone="soft" />
				</div>
				{/* CTA */}
				<div className="bg-foreground/70 mt-1 flex h-9 w-40 items-center justify-center gap-2 rounded-lg">
					<span className="bg-background/70 h-3 w-3 rounded-full" />
					<span className="bg-background/70 h-2.5 w-16 rounded" />
				</div>
				<WFBar w="18rem" h={3} tone="soft" />

				{/* "Evento Oficial" card */}
				<div className="border-border mt-2 w-full max-w-md rounded-xl border p-4">
					<span className="bg-foreground/15 h-7 w-7 rounded-md" />
					<div className="mt-3 flex flex-col gap-1.5">
						<WFBar w="6rem" h={6} tone="mid" />
						<WFBar w="8rem" h={4} tone="soft" />
						<WFBar w="11rem" h={3} tone="soft" className="mt-1.5" />
					</div>
				</div>
			</div>
		</div>
	)
}

/* ── Feature glyphs (one per product decision) ─────────────────────────── */

/** Polling vs WebSockets — one server, many clients polling on an interval. */
function PollingGlyph({ className }: { className?: string }): ReactNode {
	const clients = [12.5, 37.5, 62.5, 87.5]
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<WFBar w={90} h={6} tone="mid" />
				<span className="border-border ml-auto rounded-full border px-2 py-0.5">
					<span className="bg-foreground/40 block h-1.5 w-10 rounded" />
				</span>
			</div>
			<div className="mt-3 flex flex-1 flex-col">
				{/* server node */}
				<div className="border-border bg-foreground/[0.06] mx-auto flex w-2/5 items-center justify-center gap-1.5 rounded-md border py-1.5">
					<span className="bg-foreground/60 h-2 w-2 rounded-sm" />
					<span className="bg-foreground/45 h-1.5 w-10 rounded" />
				</div>
				{/* connectors */}
				<div className="relative min-h-6 flex-1">
					<svg
						viewBox="0 0 100 100"
						preserveAspectRatio="none"
						className="text-foreground absolute inset-0 h-full w-full"
						aria-hidden="true"
					>
						{clients.map((x, i) => (
							<line
								key={i}
								x1="50"
								y1="0"
								x2={x}
								y2="100"
								stroke="currentColor"
								strokeOpacity={0.25}
								strokeWidth={1}
								strokeDasharray="3 3"
								vectorEffect="non-scaling-stroke"
							/>
						))}
						{clients.map((x, i) => (
							<circle
								key={`p${i}`}
								cx={(50 + x) / 2}
								cy={50}
								r={2.4}
								fill="currentColor"
								fillOpacity={0.55}
							/>
						))}
					</svg>
				</div>
				{/* client nodes */}
				<div className="flex justify-between gap-2">
					{clients.map((_, i) => (
						<div key={i} className="border-border flex-1 rounded-md border py-1.5">
							<span className="bg-muted mx-auto block h-1.5 w-3/5 rounded" />
						</div>
					))}
				</div>
			</div>
		</WFGlyphCard>
	)
}

/** Admin control — the "next question" button + live answer distribution. */
function AdminGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<WFBar w={50} h={5} tone="mid" />
				<div className="bg-foreground/70 ml-auto flex h-5 w-24 items-center justify-center rounded-md">
					<span className="bg-background/70 h-1.5 w-14 rounded" />
				</div>
			</div>
			<div className="mt-3 flex flex-1 flex-col gap-2">
				<WFBar w={40} h={4} tone="soft" />
				<div className="flex flex-1 items-end justify-center gap-3 px-2">
					{[70, 38, 92].map((h, i) => (
						<div key={i} className="flex flex-1 flex-col items-center gap-1">
							<div className="bg-foreground/55 w-full rounded-t" style={{ height: `${h}%` }} />
							<span className="bg-muted h-1.5 w-3 rounded" />
						</div>
					))}
				</div>
			</div>
		</WFGlyphCard>
	)
}

/** Sin feedback inmediato — the live question card with A/B/C options. */
function QuestionGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex items-center gap-2">
				<WFBar w={70} h={4} tone="soft" />
				<span className="border-border ml-auto h-2.5 w-2.5 rounded-full border" />
				<WFBar w={14} h={4} tone="mid" />
			</div>
			{/* progress */}
			<div className="bg-muted mt-2 h-1.5 w-full overflow-hidden rounded-full">
				<div className="bg-foreground/55 h-full w-1/3 rounded-full" />
			</div>
			<WFBar w="85%" h={6} tone="strong" className="mt-2.5" />
			<div className="mt-2.5 flex flex-1 flex-col gap-1.5">
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className="border-border flex flex-1 items-center gap-2 rounded-md border px-2"
					>
						<span className="border-border h-3.5 w-3.5 shrink-0 rounded-full border" />
						<WFBar w={`${70 - i * 12}%`} h={4} tone="soft" />
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

/** Entrada tardía — question timeline with a "joined here" marker + sync. */
function LateJoinGlyph({ className }: { className?: string }): ReactNode {
	const total = 10
	const active = 6
	const joined = 3
	return (
		<WFGlyphCard className={className}>
			<WFBar w={60} h={5} tone="mid" />
			<div className="mt-2 flex flex-1 flex-col justify-center gap-2">
				{/* join marker row */}
				<div className="flex items-end gap-1">
					{Array.from({ length: total }).map((_, i) => (
						<div key={i} className="flex flex-1 justify-center">
							{i === joined ? (
								<span className="border-t-foreground/60 h-0 w-0 border-x-4 border-t-4 border-x-transparent" />
							) : null}
						</div>
					))}
				</div>
				{/* cells */}
				<div className="flex items-center gap-1">
					{Array.from({ length: total }).map((_, i) => (
						<div
							key={i}
							className={`h-4 flex-1 rounded-sm ${
								i < active ? "bg-foreground/55" : "border-border border bg-transparent"
							} ${i === joined ? "ring-foreground/70 ring-1" : ""}`}
						/>
					))}
				</div>
				{/* sync hint */}
				<div className="flex items-center gap-2">
					<span className="bg-foreground/30 h-px flex-1" />
					<WFPill w={40} />
				</div>
			</div>
		</WFGlyphCard>
	)
}

/** Ranking por sede — leaderboard of campuses by % correct. */
function RankingGlyph({ className }: { className?: string }): ReactNode {
	const rows = [92, 74, 58, 40]
	return (
		<WFGlyphCard className={className}>
			<WFBar w={55} h={5} tone="mid" />
			<div className="mt-2 flex flex-1 flex-col justify-center gap-2">
				{rows.map((w, i) => (
					<div key={i} className="flex items-center gap-2">
						<span
							className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
								i === 0 ? "bg-foreground/60" : "border-border border"
							}`}
						/>
						<span className="bg-muted h-2 w-10 shrink-0 rounded" />
						<div className="bg-muted h-2.5 flex-1 overflow-hidden rounded-full">
							<div className="bg-foreground/50 h-full rounded-full" style={{ width: `${w}%` }} />
						</div>
						<span className="bg-foreground/40 h-2 w-5 shrink-0 rounded" />
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

/** Sorteo final + bonus — celebration: trophy, confetti and raffle tickets. */
function RaffleGlyph({ className }: { className?: string }): ReactNode {
	// deterministic confetti specks (no Math.random — keeps resume-safe)
	const confetti = [
		{ top: "8%", left: "12%", r: 18 },
		{ top: "14%", left: "82%", r: -24 },
		{ top: "30%", left: "6%", r: 40 },
		{ top: "20%", left: "55%", r: -12 },
		{ top: "62%", left: "88%", r: 28 },
		{ top: "70%", left: "16%", r: -34 },
	]
	return (
		<WFGlyphCard className={className}>
			<div className="relative flex h-full flex-col items-center justify-center gap-2">
				{confetti.map((c, i) => (
					<span
						key={i}
						className="bg-foreground/30 absolute h-1.5 w-1.5 rounded-[1px]"
						style={{ top: c.top, left: c.left, transform: `rotate(${c.r}deg)` }}
					/>
				))}
				{/* trophy */}
				<span className="bg-foreground/12 flex h-9 w-9 items-center justify-center rounded-full">
					<span className="bg-foreground/60 h-4 w-3.5 rounded-t-sm rounded-b-md" />
				</span>
				<WFBar w="7rem" h={6} tone="strong" />
				<WFBar w="9rem" h={3} tone="soft" />
				{/* raffle tickets — one winner highlighted */}
				<div className="mt-1 flex items-center gap-1.5">
					{[0, 1, 2, 3].map((i) => (
						<span
							key={i}
							className={`h-3 w-6 rounded-sm ${
								i === 1 ? "bg-foreground/55" : "border-border border"
							}`}
						/>
					))}
				</div>
			</div>
		</WFGlyphCard>
	)
}

/**
 * Feature wireframes keyed by the exact `feature.title` in portfolio-data.ts.
 */
export const aiepFeatureGlyphs: Record<string, (props: { className?: string }) => ReactNode> = {
	"Polling vs WebSockets — y por qué ganó": PollingGlyph,
	"Admin con control narrativo del evento": AdminGlyph,
	"Sin feedback inmediato (anti-abandono)": QuestionGlyph,
	"Entrada tardía inteligente": LateJoinGlyph,
	"Ranking por sede en pausas": RankingGlyph,
	"Sorteo final + pregunta bonus": RaffleGlyph,
}
