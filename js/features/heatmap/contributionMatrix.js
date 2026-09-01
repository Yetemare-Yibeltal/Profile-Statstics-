/**
 * Renders an interactive contribution grid simulation component
 */

export const renderContributionHeatmap = (containerElement) => {
  const weeks = 20;
  const daysPerWeek = 7;
  let gridHTML = "";

  for (let w = 0; w < weeks; w++) {
    let columnHTML = '<div class="heatmap-col">';
    for (let d = 0; d < daysPerWeek; d++) {
      const activityLevel = Math.floor(Math.random() * 5);
      columnHTML += `<div class="heatmap-cell level-${activityLevel}" title="Activity level: ${activityLevel}"></div>`;
    }
    columnHTML += "</div>";
    gridHTML += columnHTML;
  }

  containerElement.innerHTML = `
    <div class="heatmap-card">
      <h3 class="widget-title">Contribution Activity Matrix</h3>
      <div class="heatmap-grid-wrapper">
        ${gridHTML}
      </div>
    </div>
  `;
};
