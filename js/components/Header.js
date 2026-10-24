/**
 * Navigation header component with dynamic GitHub username input and search button
 */

import { toggleTheme } from "../core/theme.js";
import { renderDashboard } from "../views/DashboardView.js";
import { showToast } from "../features/toast.js";
import { fetchLiveGitHubProfile } from "../services/githubApi.js";
import { renderFooter } from "./Footer.js";
import { renderTerminalSimulator } from "../features/terminal/terminalSimulator.js";

export const renderHeader = (container) => {
  if (!container) return;

  container.innerHTML = `
    <header class="app-header">
      <div class="search-bar" style="display: flex; gap: 0.5rem; align-items: center;">
        <input 
          type="text" 
          placeholder="Enter GitHub username..." 
          id="global-search" 
          autocomplete="off"
        />
        <button id="search-btn" style="background: var(--accent-blue); color: #0f172a; border: none; padding: 0.4rem 0.8rem; border-radius: var(--radius-sm); font-weight: 600; cursor: pointer;">Search</button>
      </div>
      <div class="header-actions">
        <button id="theme-toggle-btn" class="icon-btn" aria-label="Toggle Theme">
          🌙
        </button>
        <div class="user-profile-menu">
          <img src="https://github.com/Yetemare-Yibeltal.png" alt="Profile Avatar" class="avatar" id="header-avatar" />
          <span class="username" id="header-username">Yetemare-Yibeltal</span>
        </div>
      </div>
    </header>
  `;

  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  const searchInput = document.getElementById("global-search");
  const searchBtn = document.getElementById("search-btn");

  const handleUserSearch = async () => {
    const username = searchInput.value.trim();
    if (!username) return;

    showToast(`Fetching GitHub statistics for @${username}...`, "info");

    // Fetch profile data to update dashboard, footer, and terminal dynamically
    const data = await fetchLiveGitHubProfile(username);

    const viewRoot = document.getElementById("main-content-view");
    if (viewRoot) {
      await renderDashboard(viewRoot, username);
    }

    const footerRoot = document.getElementById("app-footer-root");
    if (footerRoot) {
      footerRoot.innerHTML = "";
      renderFooter(footerRoot, data.profile);
    }

    const terminalRoot = document.getElementById("terminal-container-root");
    if (terminalRoot) {
      renderTerminalSimulator(terminalRoot, username);
    }
  };

  if (searchBtn) searchBtn.addEventListener("click", handleUserSearch);
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleUserSearch();
    });
  }
};
