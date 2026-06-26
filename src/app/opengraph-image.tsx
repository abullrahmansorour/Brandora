import { ImageResponse } from "next/og";

export const alt = "Brandora — Growth you can measure.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0C1322",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 5,
              background: "#1B4DFF",
              padding: "14px 16px",
              borderRadius: 14,
            }}
          >
            <div style={{ width: 9, height: 16, background: "#fff", borderRadius: 3 }} />
            <div style={{ width: 9, height: 26, background: "#fff", borderRadius: 3 }} />
            <div style={{ width: 9, height: 36, background: "#C6F24E", borderRadius: 3 }} />
          </div>
          <div style={{ color: "#fff", fontSize: 40, fontWeight: 700 }}>Brandora</div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              color: "#fff",
              fontSize: 90,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Growth you can
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 90,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ color: "#1B4DFF" }}>measure</span>
            <span style={{ color: "#C6F24E" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              color: "rgba(255,255,255,0.6)",
              fontSize: 30,
              marginTop: 14,
              maxWidth: 820,
            }}
          >
            A results-driven marketing agency for brands ready to scale online.
          </div>
        </div>

        {/* bottom stats */}
        <div style={{ display: "flex", gap: 56 }}>
          {[
            ["$240M+", "Revenue driven"],
            ["210+", "Brands scaled"],
            ["4.2x", "Avg. ROAS"],
          ].map(([v, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ color: "#fff", fontSize: 40, fontWeight: 700 }}>{v}</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 22 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
