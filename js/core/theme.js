/**
 * Handles application light/dark theme toggling and system preference detection
 */

import { store } from "./state.js";
import { Storage } from "../utils/storage.js";

export const initTheme = () => {
  const savedTheme = Storage.get("app_theme", "dark");
  applyTheme(savedTheme);

  store.subscribe((state) => {
    if (state.theme) {
      applyTheme(state.theme);
    }
  });
};

export const toggleTheme = () => {
  const current = store.getState().theme;
  const nextTheme = current === "dark" ? "light" : "dark";
  store.setState({ theme: nextTheme });
  Storage.set("app_theme", nextTheme);
};

const applyTheme = (themeName) => {
  document.documentElement.setAttribute("data-theme", themeName);
};
