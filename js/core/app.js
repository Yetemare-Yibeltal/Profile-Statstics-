/**
 * Core entry point initializing themes, routers, command palettes, and global features
 */

import { initTheme } from "./theme.js";
import { renderHeader } from "../components/Header.js";
import { initRouter } from "./router.js";
import { initCommandPalette } from "../features/commandPalette.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCommandPalette();

  const headerContainer = document.getElementById("app-header-root");
  if (headerContainer) {
    renderHeader(headerContainer);
  }

  const mainContainer = document.getElementById("view-root");
  if (mainContainer) {
    initRouter(mainContainer);
  }
});
