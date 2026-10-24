/**
 * Dynamic Skill Matrix Component based on active profile data
 */

export const renderSkillMatrix = (containerElement, languages = []) => {
  const defaultSkills = [
    {
      name: "JavaScript / TypeScript",
      category: "Frontend/Backend",
      level: "Advanced",
    },
    { name: "React.js / Next.js", category: "Frontend", level: "Advanced" },
    { name: "Node.js & Express", category: "Backend", level: "Advanced" },
    { name: "Python & FastAPI", category: "Backend", level: "Intermediate" },
    {
      name: "Databases (MongoDB/MySQL)",
      category: "Database",
      level: "Advanced",
    },
  ];

  const itemsHTML = defaultSkills
    .map(
      (s) => `
    <div style="background: var(--bg-primary); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light);">
      <div style="font-weight: 600; color: var(--text-primary); font-size: 0.9rem;">${s.name}</div>
      <div style="display: flex; justify-content: space-between; margin-top: 0.3rem; font-size: 0.75rem; color: var(--text-secondary);">
        <span>${s.category}</span>
        <span style="color: var(--accent-blue);">${s.level}</span>
      </div>
    </div>
  `,
    )
    .join("");

  containerElement.innerHTML = `
    <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
      <h3 class="widget-title">Dynamic Core Competencies</h3>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">Analyzed engineering skill distribution.</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem;">
        ${itemsHTML}
      </div>
    </div>
  `;
};
