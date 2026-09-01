/**
 * Generates an SVG polygon radar chart for engineering skill proficiencies
 */

export const renderSkillRadar = (containerElement) => {
  const skills = [
    { name: "JavaScript", level: 95 },
    { name: "React / Next", level: 90 },
    { name: "Node.js / Express", level: 88 },
    { name: "Python / FastAPI", level: 85 },
    { name: "SQL / Databases", level: 82 },
    { name: "UI / UX Design", level: 80 },
  ];

  containerElement.innerHTML = `
    <div class="radar-card">
      <h3 class="widget-title">Core Competency Matrix</h3>
      <div class="skill-bars">
        ${skills
          .map(
            (s) => `
          <div class="skill-row">
            <span class="skill-name">${s.name}</span>
            <div class="skill-track">
              <div class="skill-fill" style="width: ${s.level}%"></div>
            </div>
            <span class="skill-pct">${s.level}%</span>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
};
