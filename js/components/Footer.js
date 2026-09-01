/**
 * Formal professional footer component for portfolio pages
 */

export const renderFooter = (containerElement) => {
  const footer = document.createElement("footer");
  footer.className = "app-footer";
  footer.innerHTML = `
    <div class="footer-content">
      <div class="footer-col">
        <h4 class="footer-title">Metages Yibeltal</h4>
        <p class="footer-desc">Full-Stack Software Engineer & Web Systems Architect.</p>
      </div>
      <div class="footer-col">
        <h4 class="footer-title">Quick Links</h4>
        <ul class="footer-links">
          <li><a href="index.html">Dashboard</a></li>
          <li><a href="analytics.html">Analytics</a></li>
          <li><a href="portfolio.html">Portfolio</a></li>
          <li><a href="projects.html">Projects</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 class="footer-title">Connect</h4>
        <p class="footer-desc">GitHub: <a href="https://github.com/Yetemare-Yibeltal" target="_blank" style="color: var(--accent-blue);">Yetemare-Yibeltal</a></p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Metages Engineering. All rights reserved.</p>
    </div>
  `;
  containerElement.appendChild(footer);
};
