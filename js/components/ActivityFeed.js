/**
 * Activity feed list component displaying recent actions
 */

import { recentActivities } from "../data/mockData.js";

export const renderActivityFeed = (containerElement) => {
  const listHTML = recentActivities
    .map(
      (act) => `
    <div class="activity-item">
      <div class="activity-status-indicator status-${act.status}"></div>
      <div class="activity-details">
        <p class="activity-title">${act.title}</p>
        <span class="activity-meta">${act.project} • ${act.timestamp}</span>
      </div>
    </div>
  `,
    )
    .join("");

  containerElement.innerHTML = `
    <div class="activity-feed-container">
      <h3 class="widget-title">Recent Activity</h3>
      <div class="activity-list">
        ${listHTML}
      </div>
    </div>
  `;
};
