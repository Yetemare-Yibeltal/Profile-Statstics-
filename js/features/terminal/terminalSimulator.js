/**
 * Developer terminal simulator component with command inputs
 */

export const renderTerminalSimulator = (containerElement) => {
  containerElement.innerHTML = `
    <div class="terminal-card">
      <div class="terminal-header">
        <span class="terminal-dot red"></span>
        <span class="terminal-dot yellow"></span>
        <span class="terminal-dot green"></span>
        <span class="terminal-title">metages@system:~</span>
      </div>
      <div class="terminal-body" id="terminal-output">
        <p class="term-line">Welcome to Metages Engineering CLI v3.5</p>
        <p class="term-line">Type 'help' to view available commands.</p>
      </div>
      <div class="terminal-input-row">
        <span class="term-prompt">$</span>
        <input type="text" id="terminal-input-field" placeholder="Enter command..." autocomplete="off" />
      </div>
    </div>
  `;

  const output = document.getElementById("terminal-output");
  const input = document.getElementById("terminal-input-field");

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const cmd = input.value.trim().toLowerCase();
      const pReq = document.createElement("p");
      pReq.className = "term-line";
      pReq.innerHTML = `<span style="color: var(--accent-blue);">$</span> ${input.value}`;
      output.appendChild(pReq);

      const pRes = document.createElement("p");
      pRes.className = "term-line";

      if (cmd === "help") {
        pRes.textContent =
          "Available commands: whoami, skills, repos, clear, date";
      } else if (cmd === "whoami") {
        pRes.textContent =
          "Metages Yibeltal - Full-Stack Software Engineer & Student at Injibara University.";
      } else if (cmd === "skills") {
        pRes.textContent =
          "JavaScript, TypeScript, Python, React, Node.js, Express, FastAPI, MongoDB, MySQL";
      } else if (cmd === "repos") {
        pRes.textContent =
          "Synced with GitHub account: Yetemare-Yibeltal (Over 35 repositories)";
      } else if (cmd === "date") {
        pRes.textContent = new Date().toUTCString();
      } else if (cmd === "clear") {
        output.innerHTML = "";
        input.value = "";
        return;
      } else {
        pRes.textContent = `command not found: ${cmd}. Type 'help' for options.`;
      }

      output.appendChild(pRes);
      input.value = "";
      output.scrollTop = output.scrollHeight;
    }
  });
};
