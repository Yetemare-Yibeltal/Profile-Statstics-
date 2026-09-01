/**
 * Renders professional experience milestones into a vertical timeline
 */

export const renderExperienceTimeline = (containerElement, milestonesData) => {
  const itemsHTML = milestonesData
    .map(
      (item) => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <h3 class="timeline-role">${item.role}</h3>
        <div class="timeline-org">${item.organization}</div>
        <div class="timeline-date">${item.period}</div>
        <p class="timeline-desc">${item.description}</p>
      </div>
    </div>
  `,
    )
    .join("");

  containerElement.innerHTML = `
    <div class="timeline-container">
      <h2 class="dashboard-title" style="margin-bottom: 1.5rem;">Career & Education Timeline</h2>
      ${itemsHTML}
    </div>
  `;
};
