const growth = [18, 23, 21, 30, 37, 34, 47, 55, 63, 72, 85, 97];
const average = [16, 17, 17, 18, 19, 19, 20, 21, 21, 22, 23, 24];

function points(data, { left, right, top, bottom, min, max }) {
  return data.map((value, index) => [
    (left + index / (data.length - 1) * (right - left)).toFixed(1),
    (bottom - (value - min) / (max - min) * (bottom - top)).toFixed(1),
  ]);
}

function series(coordinates) {
  return coordinates.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ");
}

export function areaChart() {
  const bounds = { left: 38, right: 534, top: 19, bottom: 194, min: 10, max: 100 };
  const line = points(growth, bounds);
  const [endX, endY] = line.at(-1);
  const ticks = [100, 75, 50, 25];
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  return `<svg class="growth-chart" viewBox="0 0 552 221" role="img" aria-labelledby="growth-chart-title">
    <title id="growth-chart-title">Line chart showing a Brandora client's growth climbing far above the industry average over twelve months.</title>
    <defs><linearGradient id="growth-shade" x2="0" y2="100%"><stop stop-color="var(--accent)" stop-opacity=".29"/><stop offset="1" stop-color="var(--accent)" stop-opacity=".015"/></linearGradient></defs>
    ${ticks.map((tick) => {
      const y = bounds.bottom - (tick - bounds.min) / (bounds.max - bounds.min) * (bounds.bottom - bounds.top);
      return `<path class="chart-grid" d="M38 ${y}H534"/><text x="0" y="${y + 4}">${tick}</text>`;
    }).join("")}
    ${line.map(([x], index) => `<path class="chart-grid chart-grid--vertical" d="M${x} 19V194"/><text x="${x}" y="215" text-anchor="middle">${months[index]}</text>`).join("")}
    <path d="${series(line)} L534 194H38Z" fill="url(#growth-shade)"/>
    <path class="chart-average" d="${series(points(average, bounds))}"/>
    <path class="chart-series" d="${series(line)}"/>
    <circle class="chart-halo" cx="${endX}" cy="${endY}" r="10"/>
    <circle class="chart-dot" cx="${endX}" cy="${endY}" r="5"/>
  </svg>`;
}

export function sparkline(data) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const coordinates = points(data, { left: 2, right: 118, top: 3, bottom: 27, min, max: max === min ? min + 1 : max });
  const path = series(coordinates);
  return `<svg class="sparkline" viewBox="0 0 120 30" width="120" height="30" preserveAspectRatio="none" aria-hidden="true">
    <path d="${path} L118 29H2Z" fill="currentColor" opacity=".08"/>
    <path d="${path}" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
  </svg>`;
}
