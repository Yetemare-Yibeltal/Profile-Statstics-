/**
 * Formal Navigation Header Component with Site Links and no top search input
 */

import { toggleTheme } from "../core/theme.js";

export const renderHeader = (container) => {
  if (!container) return;

  container.innerHTML = `
    <header class="app-header" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 2.5rem; background: var(--bg-card); border-bottom: 1px solid var(--border-color);">
      <div class="header-brand" style="display: flex; align-items: center; gap: 0.75rem;">
        <span style="font-weight: 700; font-size: 1.15rem; color: var(--text-primary); letter-spacing: -0.025em;">⚡ DevPlatform</span>
      </div>

      <nav class="header-nav" style="display: flex; gap: 1.5rem; align-items: center;">
        <a href="index.html" style="color: var(--text-primary); text-decoration: none; font-size: 0.9rem; font-weight: 500;">Dashboard</a>
        <a href="portfolio.html" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; font-weight: 500;">Portfolio</a>
        <a href="projects.html" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; font-weight: 500;">Projects</a>
        <a href="experience.html" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; font-weight: 500;">Experience</a>
      </nav>

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
};
