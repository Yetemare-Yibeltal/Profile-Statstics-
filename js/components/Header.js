/**
 * Formal Navigation Header Component without static profile block
 */

import { toggleTheme } from "../core/theme.js";

export const renderHeader = (container) => {
  if (!container) return;

  container.innerHTML = `
    <header class="app-header" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: var(--bg-card); border-bottom: 1px solid var(--border-color);">
      <div class="header-brand" style="display: flex; align-items: center; gap: 0.75rem;">
        <span style="font-weight: 700; font-size: 1.1rem; color: var(--text-primary); letter-spacing: -0.025em;">⚡ DevPlatform Analytics</span>
      </div>

      <div class="search-bar" style="display: flex; gap: 0.5rem; align-items: center; flex: 1; max-width: 450px; margin: 0 2rem;">
        <input 
          type="text" 
          placeholder="Enter GitHub username (e.g. Yetemare-Yibeltal)..." 
          id="global-search" 
          autocomplete="off"
          style="width: 100%; padding: 0.5rem 0.85rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); background: var(--bg-primary); color: var(--text-primary); font-size: 0.9rem;"
        />
        <button id="search-btn" style="background: var(--accent-blue); color: #0f172a; border: none; padding: 0.5rem 1rem; border-radius: var(--radius-sm); font-weight: 600; cursor: pointer; white-space: nowrap;">Search</button>
      </div>

      <div class="header-actions" style="display: flex; align-items: center; gap: 1rem;">
        <button id="theme-toggle-btn" class="icon-btn" aria-label="Toggle Theme" style="background: var(--bg-primary); border: 1px solid var(--border-color); color: var(--text-primary); padding: 0.4rem 0.6rem; border-radius: var(--radius-sm); cursor: pointer;">
          🌙
        </button>
      </div>
    </header>
  `;

  document
    .getElementById("theme-toggle-btn")
    .addEventListener("click", toggleTheme);

  const searchInput = document.getElementById("global-search");
  const searchBtn = document.getElementById("search-btn");

  const executeSearch = () => {
    const username = searchInput.value.trim();
    if (!username) return;

    if (window.refreshAppUI) {
      window.refreshAppUI(username);
    }
  };

  searchBtn.addEventListener("click", executeSearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") executeSearch();
  });
};
