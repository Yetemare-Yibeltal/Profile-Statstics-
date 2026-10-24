/**
 * Dynamic Contribution Activity Heatmap Component
 */

export const renderContributionHeatmap = (
  containerElement,
  username = null,
) => {
  if (!username) {
    containerElement.innerHTML = `
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem; text-align: center;">
        <h3 class="widget-title">Contribution Activity Matrix</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem;">Enter a GitHub username above to view live contribution telemetry.</p>
      </div>
    `;
    return;
  }

  // Generate mock heatmap blocks dynamically for the searched user
  let blocksHTML = "";
  for (let i = 0; i < 52; i++) {
    const opacity =
      i % 3 === 0 || i % 5 === 0
        ? "background: #22c55e;"
        : "background: #1e293b;";
    blocksHTML += `<div style="width: 10px; height: 10px; border-radius: 2px; ${opacity}"></div>`;
  }

  containerElement.innerHTML = `
    <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
      <h3 class="widget-title">Contribution Activity Matrix: @${username}</h3>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">Simulated activity grid for active target.</p>
      <div style="display: grid; grid-template-columns: repeat(26, 1fr); gap: 4px; padding: 0.5rem 0;">
        ${blocksHTML}
      </div>
    </div>
  `;
};
