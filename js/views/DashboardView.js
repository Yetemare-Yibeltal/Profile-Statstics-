/**
 * Dynamic Dashboard View Controller
 */

import { fetchLiveGitHubProfile } from "../services/githubApi.js";
import { createStatCard } from "../components/StatCard.js";
import { showToast } from "../features/toast.js";

export const renderDashboard = async (
  rootElement,
  targetUsername = "Yetemare-Yibeltal",
) => {
  // Safeguard: check if root element exists
  if (!rootElement) {
    console.warn("Dashboard root element not found in the DOM.");
    return;
  }

  rootElement.className = "dashboard-view";
  rootElement.innerHTML = `
    <div class="dashboard-header">
      <div>
        <h1 class="dashboard-title" id="active-user-title">Live GitHub Analytics: @${targetUsername}</h1>
        <p class="dashboard-subtitle">Fetching live repository data and metrics directly from GitHub REST API</p>
      </div>
      <button id="refresh-data-btn" style="background: var(--accent-blue); color: #0f172a; padding: 0.5rem 1rem; border-radius: var(--radius-sm); font-weight: 600;">🔄 Sync Live Data</button>
    </div>
    
    <div class="grid-4" id="stats-grid">
      <div class="stat-card">Loading live stats...</div>
    </div>
    
    <div class="grid-2">
      <div class="chart-container">
        <h3 class="widget-title">Public Repositories</h3>
        <div id="repos-list" style="display: flex; flex-direction: column; gap: 0.75rem; max-height: 280px; overflow-y: auto;">
          <p style="color: var(--text-secondary);">Fetching repository list...</p>
        </div>
      </div>
      <div class="chart-container">
        <h3 class="widget-title">Language Distribution Share</h3>
        <div id="languages-breakdown" style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem;">
          <p style="color: var(--text-secondary);">Calculating language metrics...</p>
        </div>
      </div>
    </div>
  `;

  const loadUserData = async () => {
    const data = await fetchLiveGitHubProfile(targetUsername);

    const headerAvatar = document.getElementById("header-avatar");
    const headerUsername = document.getElementById("header-username");
    if (headerAvatar) headerAvatar.src = data.profile.avatar;
    if (headerUsername) headerUsername.textContent = data.profile.name;

    const statsGrid = document.getElementById("stats-grid");
    if (statsGrid) {
      statsGrid.innerHTML = "";
      statsGrid.appendChild(
        createStatCard(
          "Public Repositories",
          data.profile.publicRepos,
          0,
          "📂",
        ),
      );
      statsGrid.appendChild(
        createStatCard("Total Stars", data.profile.totalStars, 0, "⭐"),
      );
      statsGrid.appendChild(
        createStatCard("Followers", data.profile.followers, 0, "👥"),
      );
      statsGrid.appendChild(
        createStatCard("Following", data.profile.following || 0, 0, "🔗"),
      );
    }

    const reposList = document.getElementById("repos-list");
    if (reposList) {
      if (data.repos && data.repos.length > 0) {
        reposList.innerHTML = data.repos
          .slice(0, 6)
          .map(
            (repo) => `
          <a href="${repo.url}" target="_blank" class="repo-item-card" style="display: flex; justify-content: space-between; padding: 0.75rem; background: var(--bg-primary); border-radius: var(--radius-sm); border: 1px solid var(--border-color); text-decoration: none;">
            <div>
              <strong style="color: var(--accent-blue);">${repo.name}</strong>
              <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">${repo.description.substring(0, 60)}...</p>
            </div>
            <div style="text-align: right; font-size: 0.8rem; color: var(--text-muted);">
              <span>⭐ ${repo.stars}</span><br/>
              <span>${repo.language}</span>
            </div>
          </a>
        `,
          )
          .join("");
      } else {
        reposList.innerHTML = `<p style="color: var(--text-secondary);">No public repositories found for @${targetUsername}.</p>`;
      }
    }

    const langContainer = document.getElementById("languages-breakdown");
    if (langContainer) {
      if (data.languages && data.languages.length > 0) {
        langContainer.innerHTML = data.languages
          .map(
            (lang) => `
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.3rem;">
              <span style="font-weight: 500; color: var(--text-primary);">${lang.name}</span>
              <span style="color: var(--text-secondary);">${lang.percentage}%</span>
            </div>
            <div style="height: 8px; background: var(--bg-primary); border-radius: 4px; overflow: hidden;">
              <div style="width: ${lang.percentage}%; height: 100%; background-color: ${lang.color};"></div>
            </div>
          </div>
        `,
          )
          .join("");
      } else {
        langContainer.innerHTML =
          '<p style="color: var(--text-secondary);">No language breakdown available.</p>';
      }
    }

    showToast(
      `Successfully loaded statistics for @${targetUsername}`,
      "success",
    );
  };

  await loadUserData();

  const refreshBtn = document.getElementById("refresh-data-btn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", async () => {
      showToast(`Re-syncing data for @${targetUsername}...`, "info");
      await loadUserData();
    });
  }
};
