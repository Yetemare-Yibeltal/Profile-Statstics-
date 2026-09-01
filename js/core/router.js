/**
 * Simple client-side view router
 */

import { renderDashboard } from "../views/DashboardView.js";
import { renderAnalytics } from "../views/AnalyticsView.js";

const routes = {
  "/": renderDashboard,
  "/analytics": renderAnalytics,
};

export const initRouter = (mainContainer) => {
  const navigate = () => {
    const path = window.location.hash.slice(1) || "/";
    const view = routes[path] || renderDashboard;
    mainContainer.innerHTML = "";
    view(mainContainer);
  };

  window.addEventListener("hashchange", navigate);
  navigate();
};
