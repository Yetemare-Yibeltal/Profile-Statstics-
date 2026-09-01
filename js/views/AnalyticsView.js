/**
 * View controller for granular analytics tables and breakdowns
 */

import { createTable } from "../components/DataTable.js";
import { analyticsSeries } from "../data/metrics.js";

export const renderAnalytics = (rootElement) => {
  rootElement.innerHTML = `
    <h2 class="dashboard-title" style="margin-bottom: 1rem;">Language Metrics</h2>
    <div id="table-container"></div>
  `;

  const headers = ["Language", "Share (%)", "Status"];
  const rows = analyticsSeries.topLanguages.map((lang) => [
    lang.name,
    `${lang.percentage}%`,
    "Active",
  ]);

  const tableComponent = createTable(headers, rows);
  document.getElementById("table-container").appendChild(tableComponent);
};
