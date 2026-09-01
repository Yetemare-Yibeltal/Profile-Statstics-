/**
 * Lightweight SVG Chart generator for rendering statistics curves
 */

export const renderSVGChart = (container, dataPoints) => {
  const maxVal = Math.max(...dataPoints.map((d) => d.views));
  const height = 180;
  const width = 500;
  const step = width / (dataPoints.length - 1);

  const points = dataPoints
    .map((d, index) => {
      const x = index * step;
      const y = height - (d.views / maxVal) * (height - 20);
      return `${x},${y}`;
    })
    .join(" ");

  container.innerHTML = `
    <div class="chart-container">
      <h3 class="widget-title">Traffic Trend</h3>
      <svg viewBox="0 0 ${width} ${height}" class="svg-chart">
        <polyline
          fill="none"
          stroke="var(--accent-blue)"
          stroke-width="3"
          points="${points}"
        />
      </svg>
    </div>
  `;
};
