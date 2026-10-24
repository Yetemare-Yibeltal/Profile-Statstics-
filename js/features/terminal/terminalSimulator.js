/**
 * Dynamic Developer Terminal Simulator
 */

export const renderTerminalSimulator = (
  containerElement,
  activeUsername = null,
) => {
  if (!activeUsername) {
    containerElement.innerHTML = `
      <div class="terminal-card">
        <div class="terminal-header">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">guest@system:~</span>
        </div>
        <div class="terminal-body">
          <p class="term-line">No target GitHub user selected.</p>
          <p class="term-line">Please enter a username in the search bar above.</p>
        </div>
      </div>
    `;
    return;
  }

  containerElement.innerHTML = `
    <div class="terminal-card">
      <div class="terminal-header">
        <span class="terminal-dot red"></span>
        <span class="terminal-dot yellow"></span>
        <span class="terminal-dot green"></span>
        <span class="terminal-title">${activeUsername}@system:~</span>
      </div>
      <div class="terminal-body" id="terminal-output">
        <p class="term-line">Connected to GitHub target: @${activeUsername}</p>
        <p class="term-line">Type 'help' or 'profile' for commands.</p>
      </div>
      <div class="terminal-input-row">
        <span class="term-prompt">$</span>
        <input type="text" id="terminal-input-field" placeholder="Enter command..." autocomplete="off" />
      </div>
    </div>
  `;

  const output = document.getElementById("terminal-output");
  const input = document.getElementById("terminal-input-field");

  if (input) {
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
          pRes.textContent = "Available commands: profile, repos, clear, date";
        } else if (cmd === "profile" || cmd === "whoami") {
          pRes.textContent = `Active target profile handle: @${activeUsername}`;
        } else if (cmd === "repos") {
          pRes.textContent = `Fetching public repository telemetry for @${activeUsername}... Done.`;
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
  }
};
