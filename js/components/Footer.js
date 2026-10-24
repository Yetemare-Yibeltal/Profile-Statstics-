/**
 * Dynamic professional footer component based on GitHub profile data
 */

export const renderFooter = (containerElement, profileData = {}) => {
  if (!containerElement) {
    console.warn("Footer container element not found in the DOM.");
    return;
  }

  const name = profileData.name || "Metages Yibeltal";
  const username = profileData.username || "Yetemare-Yibeltal";
  const profileUrl = profileData.profileUrl || `https://github.com/${username}`;
  const bio =
    profileData.bio || "Full-Stack Software Engineer & Web Systems Architect.";

  containerElement.innerHTML = `
    <footer class="app-footer">
      <div class="footer-content">
        <div class="footer-col">
          <h4 class="footer-title">${name}</h4>
          <p class="footer-desc">${bio}</p>
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
          <p class="footer-desc">GitHub: <a href="${profileUrl}" target="_blank" style="color: var(--accent-blue);">@${username}</a></p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 ${name}. All rights reserved.</p>
      </div>
    </footer>
  `;
};
