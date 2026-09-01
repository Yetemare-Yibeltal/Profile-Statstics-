/**
 * Reusable data table component with sorting structure
 */

export const createTable = (headers, rows) => {
  const container = document.createElement("div");
  container.className = "table-wrapper";

  const table = document.createElement("table");
  table.className = "custom-table";

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      ${headers.map((h) => `<th>${h}</th>`).join("")}
    </tr>
  `;

  const tbody = document.createElement("tbody");
  tbody.innerHTML = rows
    .map(
      (row) => `
    <tr>
      ${row.map((cell) => `<td>${cell}</td>`).join("")}
    </tr>
  `,
    )
    .join("");

  table.appendChild(thead);
  table.appendChild(tbody);
  container.appendChild(table);

  return container;
};
