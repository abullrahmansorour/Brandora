import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 3,
          background: "#0C1322",
          borderRadius: 7,
          paddingBottom: 8,
        }}
      >
        <div style={{ width: 5, height: 9, background: "#fff", borderRadius: 2 }} />
        <div style={{ width: 5, height: 14, background: "#fff", borderRadius: 2 }} />
        <div style={{ width: 5, height: 19, background: "#C6F24E", borderRadius: 2 }} />
      </div>
    ),
    { ...size },
  );
}
