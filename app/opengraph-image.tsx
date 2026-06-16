import { ImageResponse } from "next/og"

// Social preview card (LinkedIn, WhatsApp, Slack, X...). Next renders this on
// every build, so it always stays in sync with the brand — no static asset to
// re-export by hand. Mirrors the monochrome theme from app/globals.css.
export const alt = "Anghelo Alva — Desarrollador Full Stack"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage(): ImageResponse {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					backgroundColor: "#0a0a0a",
					color: "#fafafa",
					padding: "80px",
					fontFamily: "sans-serif",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "44px",
							height: "44px",
							borderRadius: "11px",
							backgroundColor: "#fafafa",
							color: "#0a0a0a",
							fontSize: "26px",
							fontWeight: 700,
							fontFamily: "monospace",
							lineHeight: 1,
						}}
					>
						A
					</div>
					<div
						style={{
							fontSize: "24px",
							letterSpacing: "0.18em",
							textTransform: "uppercase",
							color: "#a3a3a3",
						}}
					>
						Anghelo Alva
					</div>
				</div>

				<div
					style={{
						display: "flex",
						fontSize: "76px",
						fontWeight: 600,
						lineHeight: 1.05,
						letterSpacing: "-0.03em",
						maxWidth: "960px",
					}}
				>
					Construyo software que las empresas usan todos los días.
				</div>

				<div style={{ display: "flex", fontSize: "30px", color: "#737373" }}>
					Desarrollador Full Stack · Chile
				</div>
			</div>
		),
		{ ...size }
	)
}
