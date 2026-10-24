/**
 * Formal GitHub-Style Contribution Activity Matrix Component
 */

export const renderContributionHeatmap = (
  containerElement,
  username = null,
) => {
  if (!username) {
    containerElement.innerHTML = `
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem; text-align: center;">
        <h3 class="widget-title">Contribution Activity Matrix</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem;">Enter a GitHub username above to load activity telemetry.</p>
      </div>
    `;
    return;
  }

  // Generate a realistic 52-week x 7-day contribution grid layout
  const weeksCount = 52;
  const daysInWeek = 7;
  let weeksHTML = "";

  const intensityColors = [
    "background: #161b22; border: 1px solid #30363d;", // Level 0: No activity
    "background: #0e4429;", // Level 1: Low
    "background: #006d32;", // Level 2: Medium-low
    "background: #26a641;", // Level 3: Medium-high
    "background: #39d353;", // Level 4: High
  ];

  for (let w = 0; w < weeksCount; w++) {
    let daysHTML = "";
    for (let d = 0; d < daysInWeek; d++) {
      // Create a deterministic pseudo-random activity level based on index
      const seed = (w * 7 + d) % 11;
      const level =
        seed === 0 || seed === 4 || seed === 7
          ? (seed % 4) + 1
          : seed === 2
            ? 1
            : 0;
      daysHTML += `<div style="width: 10px; height: 10px; border-radius: 2px; ${intensityColors[level]}" title="Activity level ${level}"></div>`;
    }
    weeksHTML += `<div style="display: flex; flex-direction: column; gap: 3px;">${daysHTML}</div>`;
  }

  containerElement.innerHTML = `
    <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; overflow-x: auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h3 class="widget-title" style="font-size: 1rem; margin: 0;">Contribution Activity: @${username}</h3>
        <span style="font-size: 0.75rem; color: var(--text-secondary);">Past 1 Year</span>
      </div>
      
      <div style="display: flex; gap: 4px; justify-content: flex-start; padding: 0.5rem 0; min-width: 700px;">
        ${weeksHTML}
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem; font-size: 0.75rem; color: var(--text-secondary);">
        <span>Learn how we count contributions</span>
        <div style="display: flex; align-items: center; gap: 4px;">
          <span>Less</span>
          <div style="width: 10px; height: 10px; border-radius: 2px; ${intensityColors[0]}"></div>
          <div style="width: 10px; height: 10px; border-radius: 2px; ${intensityColors[1]}"></div>
          <div style="width: 10px; height: 10px; border-radius: 2px; ${intensityColors[2]}"></div>
          <div style="width: 10px; height: 10px; border-radius: 2px; ${intensityColors[3]}"></div>
          <div style="width: 10px; height: 10px; border-radius: 2px; ${intensityColors[4]}"></div>
          <span>More</span>
        </div>
      </div>
    </div>
  `;
};
