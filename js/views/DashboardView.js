/**
 * Controller orchestrating main dashboard view state and component updates
 */

import { createStatCard } from "../components/StatCard.js";
import { renderSVGChart } from "../components/ChartWidget.js";
import { renderActivityFeed } from "../components/ActivityFeed.js";
import { userProfile } from "../data/userData.js";
import { analyticsSeries } from "../data/metrics.js";

export const renderDashboard = (rootElement) => {
  rootElement.className = "dashboard-view";
  rootElement.innerHTML = `
    <div class="dashboard-header">
      <div>
        <h1 class="dashboard-title">System Metrics</h1>
        <p class="dashboard-subtitle">Real-time engagement performance</p>
      </div>
    </div>
    <div class="grid-4" id="stats-grid"></div>
    <div class="grid-2">
      <div id="chart-area"></div>
      <div id="activity-area"></div>
    </div>
  `;

  const statsGrid = document.getElementById("stats-grid");
  statsGrid.appendChild(
    createStatCard("Total Views", userProfile.stats.totalViews, 12.5, "👁️"),
  );
  statsGrid.appendChild(
    createStatCard(
      "Profile Visits",
      userProfile.stats.profileVisits,
      8.2,
      "👤",
    ),
  );
  statsGrid.appendChild(
    createStatCard(
      "Contributions",
      userProfile.stats.contributions,
      24.1,
      "⚡",
    ),
  );
  statsGrid.appendChild(
    createStatCard("Reputation", userProfile.stats.reputationScore, 1.4, "⭐"),
  );

  renderSVGChart(
    document.getElementById("chart-area"),
    analyticsSeries.dailyViews,
  );
  renderActivityFeed(document.getElementById("activity-area"));
};
