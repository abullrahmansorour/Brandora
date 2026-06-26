"use client";

import { motion, useReducedMotion } from "framer-motion";

const DATA = [18, 23, 21, 30, 37, 34, 47, 55, 63, 72, 85, 97];
const FLAT = [16, 17, 17, 18, 19, 19, 20, 21, 21, 22, 23, 24];
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const W = 560;
const H = 300;
const PAD = { l: 6, r: 6, t: 34, b: 26 };

function scale(data: number[]) {
  const min = 10;
  const max = 100;
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  return data.map((d, i) => {
    const x = PAD.l + (innerW * i) / (data.length - 1);
    const y = PAD.t + innerH * (1 - (d - min) / (max - min));
    return { x, y };
  });
}

function toLine(pts: { x: number; y: number }[]) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
}

export function AreaChart() {
  const reduce = useReducedMotion();
  const pts = scale(DATA);
  const flatPts = scale(FLAT);
  const line = toLine(pts);
  const flatLine = toLine(flatPts);
  const area = `${line} L${pts[pts.length - 1].x},${H - PAD.b} L${pts[0].x},${H - PAD.b} Z`;
  const last = pts[pts.length - 1];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label="Line chart showing a Brandora client's growth climbing far above the industry average over twelve months."
    >
      <defs>
        <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-cobalt)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-cobalt)" stopOpacity="0" />
        </linearGradient>
        <filter id="dot-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* horizontal gridlines */}
      {[0, 1, 2, 3].map((i) => {
        const y = PAD.t + ((H - PAD.t - PAD.b) * i) / 3;
        return (
          <line
            key={i}
            x1={PAD.l}
            x2={W - PAD.r}
            y1={y}
            y2={y}
            stroke="var(--color-ink-line)"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
        );
      })}

      {/* industry average (flat, dashed) */}
      <motion.path
        d={flatLine}
        fill="none"
        stroke="var(--color-muted-light)"
        strokeWidth="1.5"
        strokeDasharray="3 5"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      {/* area fill */}
      <motion.path
        d={area}
        fill="url(#area-grad)"
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: reduce ? 0 : 1 }}
      />

      {/* growth line */}
      <motion.path
        d={line}
        fill="none"
        stroke="var(--color-cobalt)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* end dot */}
      <motion.g
        initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: reduce ? 0 : 1.5 }}
        style={{ transformOrigin: `${last.x}px ${last.y}px` }}
      >
        <circle cx={last.x} cy={last.y} r="9" fill="var(--color-lime)" opacity="0.25" />
        <circle
          cx={last.x}
          cy={last.y}
          r="5"
          fill="var(--color-lime)"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
          filter="url(#dot-glow)"
        />
      </motion.g>

      {/* floating metric badge */}
      <motion.g
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: reduce ? 0 : 1.7 }}
      >
        <rect x={W - 168} y={6} width="158" height="30" rx="15" fill="var(--color-ink)" />
        <circle cx={W - 152} cy={21} r="3" fill="var(--color-lime)" />
        <text
          x={W - 142}
          y={25}
          fill="#fff"
          fontSize="13"
          fontFamily="var(--font-mono), monospace"
          letterSpacing="0.02em"
        >
          Revenue +312% YoY
        </text>
      </motion.g>

      {/* month labels */}
      {pts.map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={H - 8}
          textAnchor="middle"
          fill="var(--color-muted-light)"
          fontSize="10"
          fontFamily="var(--font-mono), monospace"
        >
          {MONTHS[i]}
        </text>
      ))}
    </svg>
  );
}
