/**
 * Application Bootstrap Module
 * Initializes theme, header, router, footer, and advanced feature widgets.
 */

import { initTheme } from "../core/theme.js";
import { renderHeader } from "../components/Header.js";
import { renderFooter } from "../components/Footer.js";
import { initRouter } from "./router.js";
import { initCommandPalette } from "../features/commandPalette.js";
import { renderContributionHeatmap } from "../features/heatmap/contributionMatrix.js";
import { renderTerminalSimulator } from "../features/terminal/terminalSimulator.js";
import { renderExperienceTimeline } from "../features/timeline/experienceTimeline.js";

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Initialize core system settings
  initTheme();

  // 2. Render global layout shells
  const headerRoot = document.getElementById("app-header-root");
  const footerRoot = document.getElementById("app-footer-root");
  if (headerRoot) renderHeader(headerRoot);
  if (footerRoot) renderFooter(footerRoot);

  // 3. Initialize client-side router for dynamic views
  const mainContent = document.getElementById("main-content-view");
  if (mainContent) {
    await initRouter(mainContent);
  }

  // 4. Mount advanced features onto their respective DOM containers
  const heatmapRoot = document.getElementById("heatmap-container-root");
  if (heatmapRoot) renderContributionHeatmap(heatmapRoot);

  const terminalRoot = document.getElementById("terminal-container-root");
  if (terminalRoot) renderTerminalSimulator(terminalRoot);

  const timelineRoot = document.getElementById("timeline-container-root");
  if (timelineRoot) {
    try {
      const res = await fetch("assets/data/experienceData.json");
      const data = await res.json();
      renderExperienceTimeline(timelineRoot, data.milestones);
    } catch (err) {
      console.warn("Could not load experience milestones data:", err);
    }
  }

  // 5. Initialize command palette listener
  initCommandPalette();
});
