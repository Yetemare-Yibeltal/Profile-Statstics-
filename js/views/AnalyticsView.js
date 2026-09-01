/**
 * Fully functional analytics view with interactive date range filtering
 */

import { fetchLiveGitHubProfile } from "../services/githubApi.js";
import { createTable } from "../components/DataTable.js";
import { showToast } from "../features/toast.js";

export const renderAnalytics = async (rootElement) => {
  rootElement.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
      <h2 class="dashboard-title">GitHub Repository Analytics</h2>
      <div style="display: flex; gap: 0.5rem;">
        <button class="filter-btn active" data-filter="all" style="padding: 0.4rem 0.8rem; background: var(--accent-blue); color: #0f172a; border-radius: var(--radius-sm); font-weight: 600;">All Repos</button>
        <button class="filter-btn" data-filter="starred" style="padding: 0.4rem 0.8rem; background: var(--bg-secondary); color: var(--text-primary); border-radius: var(--radius-sm); border: 1px solid var(--border-color);">Starred</button>
      </div>
    </div>
    <div id="analytics-table-wrapper">
      <p style="color: var(--text-secondary);">Loading repository metrics table...</p>
    </div>
  `;

  const data = await fetchLiveGitHubProfile();
  const tableWrapper = document.getElementById("analytics-table-wrapper");

  const renderTableContent = (filterType) => {
    let filteredRepos = data.repos;
    if (filterType === "starred") {
      filteredRepos = data.repos.filter((r) => r.stars > 0);
    }

    const headers = [
      "Repository Name",
      "Primary Language",
      "Stars",
      "Forks",
      "Last Updated",
    ];
    const rows = filteredRepos.map((r) => [
      `<a href="${r.url}" target="_blank" style="color: var(--accent-blue); font-weight: 600;">${r.name}</a>`,
      r.language,
      `⭐ ${r.stars}`,
      r.forks,
      r.updatedAt,
    ]);

    tableWrapper.innerHTML = "";
    tableWrapper.appendChild(createTable(headers, rows));
  };

  renderTableContent("all");

  rootElement.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      rootElement.querySelectorAll(".filter-btn").forEach((b) => {
        b.style.background = "var(--bg-secondary)";
        b.style.color = "var(--text-primary)";
      });
      e.target.style.background = "var(--accent-blue)";
      e.target.style.color = "#0f172a";

      const filter = e.target.dataset.filter;
      renderTableContent(filter);
      showToast(`Filtered repositories by: ${filter}`, "info");
    });
  });
};
