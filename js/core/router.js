/**
 * Fully functional asynchronous client-side router
 */

import { renderDashboard } from "../views/DashboardView.js";
import { renderAnalytics } from "../views/AnalyticsView.js";

const routes = {
  "/": renderDashboard,
  "/analytics": renderAnalytics,
};

export const initRouter = async (mainContainer) => {
  const navigate = async () => {
    const path = window.location.hash.slice(1) || "/";
    const view = routes[path] || renderDashboard;
    mainContainer.innerHTML =
      '<div style="padding: 2rem; text-align: center; color: var(--text-secondary);">Loading view...</div>';
    await view(mainContainer);
  };

  window.addEventListener("hashchange", navigate);
  await navigate();
};
