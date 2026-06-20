import type { ReactNode } from "react"
import { WFBar, WFGlyphCard, WFKpiChip, WFTable } from "@/components/mockups/primitives"

/* ────────────────────────────────────────────────────────────────────────
 * San Pedro de Atacama (toursanpedroatacama.com) — black & white wireframes.
 *
 * Modelled after the real ecommerce + admin platform: storefront catalogue,
 * back-office panel, multi-currency checkout, payment gateways, DB-level
 * translations and PDF vouchers. Structure only — no client data.
 *
 * Every glyph fills its card via `h-full` / `flex-1` so the bento tiles read
 * as dense, recognisable screens rather than top-aligned sketches.
 * ──────────────────────────────────────────────────────────────────────── */

/** Catálogo navegable por días recomendados — LEAD: storefront w/ filters. */
function CatalogoGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex h-full gap-2.5">
				{/* Filter rail */}
				<aside className="border-border hidden w-1/4 min-w-[5rem] flex-col gap-2 rounded-md border p-2 sm:flex">
					<WFBar w={70} h={5} tone="mid" />
					{Array.from({ length: 5 }, (_, i) => (
						<div key={i} className="flex items-center gap-1.5">
							<span className="border-border h-2.5 w-2.5 shrink-0 rounded-sm border" />
							<WFBar w={`${50 + ((i * 7) % 35)}%`} h={3} tone="soft" />
						</div>
					))}
				</aside>

				{/* Product grid — image, title, price + add-to-cart */}
				<div className="grid flex-1 auto-rows-fr grid-cols-2 gap-2">
					{Array.from({ length: 4 }, (_, i) => (
						<div
							key={i}
							className="border-border flex flex-col overflow-hidden rounded-lg border"
						>
							<div className="bg-foreground/10 flex-1" />
							<div className="flex flex-col gap-1 p-1.5">
								<WFBar w="72%" h={4} tone="mid" />
								<div className="flex items-center gap-1">
									<WFBar w={26} h={6} tone="strong" />
									<span className="bg-foreground/70 ml-auto h-4 w-4 rounded" />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</WFGlyphCard>
	)
}

/** Panel administrativo completo — back-office: KPI chips + data table. */
function PanelAdminGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex gap-1.5">
				<WFKpiChip />
				<WFKpiChip />
				<WFKpiChip />
			</div>
			<WFTable cols={[1.6, 1.2, 1, 1]} rows={5} pillCol={3} className="mt-2 flex-1" />
		</WFGlyphCard>
	)
}

/** Checkout en CLP o USD — order summary with a CLP/USD currency toggle. */
function CheckoutGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex h-full flex-col">
				{/* Currency segmented toggle (CLP active / USD) */}
				<div className="border-border flex w-max items-center gap-0.5 rounded-full border p-0.5">
					<span className="bg-foreground/70 h-4 w-9 rounded-full" />
					<span className="h-4 w-9 rounded-full" />
				</div>

				{/* Order line items */}
				<div className="mt-2 flex flex-1 flex-col justify-center gap-2">
					{Array.from({ length: 3 }, (_, i) => (
						<div key={i} className="flex items-center gap-2">
							<span className="bg-foreground/10 h-5 w-5 shrink-0 rounded" />
							<WFBar w={`${38 + ((i * 9) % 22)}%`} h={4} tone="soft" />
							<WFBar w={28} h={4} tone="mid" className="ml-auto" />
						</div>
					))}
				</div>

				{/* Total */}
				<div className="border-border mt-1 flex items-center justify-between border-t pt-2">
					<WFBar w={40} h={5} tone="mid" />
					<WFBar w={60} h={9} tone="strong" />
				</div>
			</div>
		</WFGlyphCard>
	)
}

/** Tres pasarelas de pago — three payment-method options, first selected. */
function PasarelasGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex h-full flex-col gap-2">
				{Array.from({ length: 3 }, (_, i) => (
					<div
						key={i}
						className={`flex flex-1 items-center gap-2.5 rounded-md border px-2.5 ${
							i === 0 ? "border-foreground/40 bg-foreground/[0.06]" : "border-border"
						}`}
					>
						<span
							className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
								i === 0 ? "border-foreground/60" : "border-border"
							}`}
						>
							{i === 0 ? <span className="bg-foreground/70 h-2 w-2 rounded-full" /> : null}
						</span>
						<span className="bg-foreground/10 h-6 w-10 shrink-0 rounded" />
						<WFBar w={`${42 + ((i * 11) % 24)}%`} h={4} tone={i === 0 ? "mid" : "soft"} />
					</div>
				))}
			</div>
		</WFGlyphCard>
	)
}

/** Contenido multilingüe a nivel DB — translations editor with language tabs. */
function TraduccionesGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="flex h-full flex-col">
				{/* Language tabs (ES/EN/FR/PT) — first active */}
				<div className="flex items-end gap-1">
					{Array.from({ length: 4 }, (_, i) => (
						<span
							key={i}
							className={`flex h-6 items-center justify-center rounded-t-md border ${
								i === 0
									? "border-border bg-background border-b-transparent"
									: "border-transparent bg-foreground/10"
							}`}
							style={{ width: "22%" }}
						>
							<span
								className={`h-1.5 w-5 rounded ${
									i === 0 ? "bg-foreground/55" : "bg-foreground/25"
								}`}
							/>
						</span>
					))}
				</div>

				{/* Editor body — same content edited per language */}
				<div className="border-border flex flex-1 flex-col gap-2 rounded-b-md rounded-tr-md border p-2">
					<WFBar w="35%" h={3} tone="soft" />
					<div className="border-border h-6 w-full rounded border" />
					<WFBar w="35%" h={3} tone="soft" />
					<div className="border-border w-full flex-1 rounded border" />
				</div>
			</div>
		</WFGlyphCard>
	)
}

/** Vouchers PDF y notificaciones — generated voucher document + a bell badge. */
function VoucherGlyph({ className }: { className?: string }): ReactNode {
	return (
		<WFGlyphCard className={className}>
			<div className="relative flex h-full">
				{/* PDF voucher document */}
				<div className="border-border bg-background/60 flex flex-1 flex-col rounded-md border p-2.5">
					<div className="flex items-center gap-2">
						<span className="bg-foreground/60 h-5 w-5 rounded" />
						<WFBar w={50} h={6} tone="strong" />
						<div className="ml-auto flex flex-col items-end gap-1">
							<WFBar w={34} h={3} tone="soft" />
							<WFBar w={26} h={3} tone="soft" />
						</div>
					</div>
					<span className="bg-border mt-2 h-px w-full" />
					<div className="mt-2 flex flex-1 flex-col justify-center gap-1.5">
						{Array.from({ length: 4 }, (_, i) => (
							<div key={i} className="flex items-center gap-2">
								<WFBar w={`${22 + ((i * 7) % 14)}%`} h={3} tone="soft" />
								<WFBar w={`${28 + ((i * 11) % 20)}%`} h={3} tone="mid" className="ml-auto" />
							</div>
						))}
					</div>
					<div className="border-border mt-2 h-8 w-8 self-end rounded-sm border" />
				</div>

				{/* Notification bell badge */}
				<span className="border-border bg-background absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full border">
					<span className="bg-foreground/55 h-3 w-3 rounded-sm" />
					<span className="bg-foreground/70 absolute top-0.5 right-0.5 h-2 w-2 rounded-full" />
				</span>
			</div>
		</WFGlyphCard>
	)
}

export const toursanpedroatacamaFeatureGlyphs: Record<
	string,
	(props: { className?: string }) => ReactNode
> = {
	"Catálogo navegable por días recomendados": CatalogoGlyph,
	"Panel administrativo completo": PanelAdminGlyph,
	"Checkout en CLP o USD": CheckoutGlyph,
	"Tres pasarelas de pago": PasarelasGlyph,
	"Contenido multilingüe a nivel DB": TraduccionesGlyph,
	"Vouchers PDF y notificaciones": VoucherGlyph,
}
