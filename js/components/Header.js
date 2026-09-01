/**
 * Top app bar component containing search and user controls
 */

import { toggleTheme } from "../core/theme.js";
import { userProfile } from "../data/userData.js";

export const renderHeader = (container) => {
  container.innerHTML = `
    <header class="app-header">
      <div class="search-bar">
        <input type="text" placeholder="Search analytics or logs..." id="global-search" />
      </div>
      <div class="header-actions">
        <button id="theme-toggle-btn" class="icon-btn" aria-label="Toggle Theme">
          🌙
        </button>
        <div class="user-profile-menu">
          <img src="${userProfile.avatar}" alt="${userProfile.name}" class="avatar" />
          <span class="username">${userProfile.name}</span>
        </div>
      </div>
    </header>
  `;

  document
    .getElementById("theme-toggle-btn")
    .addEventListener("click", toggleTheme);
};
