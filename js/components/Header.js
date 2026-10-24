/**
 * Navigation header component with dynamic GitHub username input trigger
 */

import { toggleTheme } from '../core/theme.js';
import { renderDashboard } from '../views/DashboardView.js';
import { showToast } from '../features/toast.js';

export const renderHeader = (container) => {
  container.innerHTML = `
    <header class="app-header">
      <div class="search-bar">
        <input 
          type="text" 
          placeholder="Enter GitHub username & press Enter..." 
          id="global-search" 
          autocomplete="off"
        />
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

  // Attach theme toggle listener
  document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);

  // Attach dynamic username search event listener
  const searchInput = document.getElementById('global-search');
  searchInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const username = searchInput.value.trim();
      if (!username) return;

      showToast(`Fetching GitHub statistics for @${username}...`, 'info');
      
      const viewRoot = document.getElementById('main-content-view');
      if (viewRoot) {
        // Pass the typed username directly to the dashboard renderer
        await renderDashboard(viewRoot, username);
      }
    }
  });
};