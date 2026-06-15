import type { ReactNode } from "react"

const CHART_BARS = [38, 64, 46, 82, 58, 90, 52, 72] as const

/**
 * Abstract black & white "dashboard" wireframe. Evokes a real product UI
 * without exposing any private client data — on brand with the template's
 * wireframe aesthetic. Purely decorative.
 */
export function AppMockup({ label }: { label?: string }): ReactNode {
	return (
		<div
			aria-hidden="true"
			className="border-border bg-background flex h-full min-h-[20rem] w-full flex-col overflow-hidden rounded-2xl border"
		>
			<div className="border-border flex items-center gap-2 border-b px-4 py-3">
				<span className="bg-border h-2.5 w-2.5 rounded-full" />
				<span className="bg-border h-2.5 w-2.5 rounded-full" />
				<span className="bg-border h-2.5 w-2.5 rounded-full" />
				<div className="bg-muted ml-3 h-5 w-full max-w-[14rem] rounded-md" />
				{label ? (
					<span className="text-muted-foreground ml-auto hidden max-w-[40%] truncate font-mono text-[0.625rem] tracking-[0.14em] uppercase sm:inline">
						{label}
					</span>
				) : null}
			</div>

			<div className="flex flex-1">
				<div className="border-border hidden w-1/5 flex-col gap-2.5 border-r p-4 sm:flex">
					<div className="bg-foreground/80 h-3 w-3/4 rounded" />
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="bg-muted h-2.5 w-full rounded" />
					))}
				</div>

				<div className="flex flex-1 flex-col gap-3 p-4">
					<div className="grid grid-cols-3 gap-3">
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className="border-border rounded-lg border p-3">
								<div className="bg-muted h-2 w-1/2 rounded" />
								<div className="bg-foreground/70 mt-2 h-4 w-3/4 rounded" />
							</div>
						))}
					</div>

					<div className="border-border flex flex-1 items-end gap-2 rounded-lg border p-3">
						{CHART_BARS.map((h, i) => (
							<div
								key={i}
								className="bg-foreground/70 flex-1 rounded-t"
								style={{ height: `${h}%` }}
							/>
						))}
					</div>

					<div className="space-y-2">
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className="flex items-center gap-3">
								<span className="bg-muted h-2.5 w-2.5 shrink-0 rounded-full" />
								<div className="bg-muted h-2.5 flex-1 rounded" />
								<div className="bg-muted h-2.5 w-12 rounded" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

/**
 * Small abstract wireframe motif used to give feature cards a graphic element.
 * Four deterministic variants, picked by index. Black & white, decorative.
 */
export function WireframeGlyph({
	variant,
	className,
}: {
	variant: number
	className?: string
}): ReactNode {
	const v = ((variant % 4) + 4) % 4
	return (
		<div
			aria-hidden="true"
			className={`border-border bg-background overflow-hidden rounded-xl border p-4 ${className ?? ""}`}
		>
			{v === 0 ? (
				<div className="flex h-full items-end gap-2">
					{[45, 70, 35, 85, 55, 75].map((h, i) => (
						<div
							key={i}
							className="bg-foreground/60 flex-1 rounded-t"
							style={{ height: `${h}%` }}
						/>
					))}
				</div>
			) : null}

			{v === 1 ? (
				<div className="grid h-full grid-cols-3 grid-rows-2 gap-2">
					{Array.from({ length: 6 }).map((_, i) => (
						<div
							key={i}
							className={`rounded-md ${i % 3 === 1 ? "bg-foreground/50" : "bg-muted"}`}
						/>
					))}
				</div>
			) : null}

			{v === 2 ? (
				<div className="flex h-full flex-col justify-center gap-2.5">
					{[100, 80, 90, 65].map((w, i) => (
						<div key={i} className="flex items-center gap-3">
							<span className="bg-foreground/50 h-2.5 w-2.5 shrink-0 rounded-full" />
							<div className="bg-muted h-2.5 rounded" style={{ width: `${w}%` }} />
						</div>
					))}
				</div>
			) : null}

			{v === 3 ? (
				<div className="flex h-full items-center justify-between gap-2">
					{[0, 1, 2].map((i) => (
						<div key={i} className="flex flex-1 items-center gap-2 last:flex-none">
							<div className="border-border bg-muted flex-1 rounded-md border p-3">
								<div className="bg-foreground/50 h-2 w-3/4 rounded" />
							</div>
							{i < 2 ? <span className="bg-border h-px w-4 shrink-0" /> : null}
						</div>
					))}
				</div>
			) : null}
		</div>
	)
}
