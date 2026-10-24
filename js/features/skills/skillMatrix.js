/**
 * Dynamic Skill Matrix Component
 */

export const renderSkillMatrix = (containerElement, languages = null) => {
  if (!languages || languages.length === 0) {
    containerElement.innerHTML = `
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.5rem; text-align: center;">
        <h3 class="widget-title">Dynamic Core Competencies</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem;">Enter a GitHub username above to analyze language distributions and technical proficiencies.</p>
      </div>
    `;
    return;
  }

  const itemsHTML = languages
    .map(
      (s) => `
    <div style="background: var(--bg-primary); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light);">
      <div style="font-weight: 600; color: var(--text-primary); font-size: 0.9rem;">${s.name}</div>
      <div style="display: flex; justify-content: space-between; margin-top: 0.3rem; font-size: 0.75rem; color: var(--text-secondary);">
        <span>Language Share</span>
        <span style="color: var(--accent-blue);">${s.percentage}%</span>
      </div>
    </div>
  `,
    )
    .join("");

  containerElement.innerHTML = `
    <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
      <h3 class="widget-title">Dynamic Core Competencies</h3>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">Analyzed engineering skill distribution from repositories.</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem;">
        ${itemsHTML}
      </div>
    </div>
  `;
};
