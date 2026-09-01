/**
 * Global keyboard shortcut command palette (Ctrl+K / Cmd+K)
 */

export const initCommandPalette = () => {
  const palette = document.createElement("div");
  palette.id = "command-palette-modal";
  palette.className = "modal-overlay";
  palette.innerHTML = `
    <div class="modal-content">
      <h3 style="margin-bottom: 1rem;">Quick Navigation</h3>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
        <li><a href="#/" class="cmd-link">📊 Dashboard Overview</a></li>
        <li><a href="#/analytics" class="cmd-link">📈 Granular Analytics</a></li>
        <li><a href="portfolio.html" class="cmd-link">💼 Full Portfolio View</a></li>
      </ul>
    </div>
  `;
  document.body.appendChild(palette);

  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      palette.classList.toggle("active");
    }
  });

  palette.addEventListener("click", (e) => {
    if (e.target === palette || e.target.classList.contains("cmd-link")) {
      palette.classList.remove("active");
    }
  });
};
