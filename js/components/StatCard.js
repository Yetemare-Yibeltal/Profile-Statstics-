/**
 * Component for displaying key metrics with percentage indicators
 */

import { formatNumber, formatPercentage } from "../utils/formatters.js";

export const createStatCard = (title, value, change, icon) => {
  const isPositive = change >= 0;
  const changeClass = isPositive ? "positive" : "negative";

  const card = document.createElement("div");
  card.className = "stat-card";
  card.innerHTML = `
    <div class="stat-card-header">
      <span class="stat-card-title">${title}</span>
      <span class="stat-card-icon">${icon}</span>
    </div>
    <div class="stat-card-body">
      <h3 class="stat-card-value">${formatNumber(value)}</h3>
      <span class="stat-card-badge ${changeClass}">
        ${formatPercentage(change)}
      </span>
    </div>
  `;

  return card;
};
