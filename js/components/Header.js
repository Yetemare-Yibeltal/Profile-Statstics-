/**
 * Navigation header component with dynamic search trigger
 */

import { toggleTheme } from "../core/theme.js";
import { showToast } from "../features/toast.js";

export const renderHeader = (container) => {
  if (!container) return;

  container.innerHTML = `
    <header class="app-header">
      <div class="search-bar" style="display: flex; gap: 0.5rem; align-items: center;">
        <input 
          type="text" 
          placeholder="Enter GitHub username & press Search..." 
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
    } else {
      showToast(`Please enter a valid username.`, "info");
    }
  };

  searchBtn.addEventListener("click", executeSearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") executeSearch();
  });
};
