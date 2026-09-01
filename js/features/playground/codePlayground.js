/**
 * Interactive Code Snippet Playground Component
 */

export const renderCodePlayground = (containerElement) => {
  containerElement.innerHTML = `
    <div class="playground-card">
      <h3 class="widget-title">Interactive Code Playground</h3>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">Test and execute built-in full-stack snippets.</p>
      
      <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem;">
        <button class="snippet-btn active" data-snippet="js">Node.js Express Route</button>
        <button class="snippet-btn" data-snippet="python">Python FastAPI Endpoint</button>
      </div>

      <pre id="code-editor-box" class="code-box"><code>app.get('/api/v1/status', (req, res) => {
  res.json({ status: 'healthy', engine: 'Express' });
});</code></pre>

      <button id="run-code-btn" style="margin-top: 0.75rem; background: var(--accent-blue); color: #0f172a; padding: 0.4rem 1rem; border-radius: var(--radius-sm); font-weight: 600; font-size: 0.85rem;">▶ Run Snippet</button>
      
      <div id="playground-output" style="margin-top: 0.75rem; padding: 0.5rem; background: #020617; border-radius: 4px; font-family: monospace; font-size: 0.8rem; color: #4ade80; min-height: 35px;">
        Output console ready...
      </div>
    </div>
  `;

  const codeBox = document.getElementById("code-editor-box");
  const outputBox = document.getElementById("playground-output");

  const snippets = {
    js: `app.get('/api/v1/status', (req, res) => {\n  res.json({ status: 'healthy', engine: 'Express' });\n});`,
    python: `@app.get("/api/v1/status")\ndef get_status():\n    return {"status": "healthy", "engine": "FastAPI"}`,
  };

  containerElement.querySelectorAll(".snippet-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      containerElement
        .querySelectorAll(".snippet-btn")
        .forEach((b) => (b.style.background = "var(--bg-secondary)"));
      e.target.style.background = "var(--accent-blue)";
      const type = e.target.dataset.snippet;
      codeBox.querySelector("code").textContent = snippets[type];
      outputBox.textContent = `Loaded ${type.toUpperCase()} snippet. Click 'Run Snippet'.`;
    });
  });

  document.getElementById("run-code-btn").addEventListener("click", () => {
    outputBox.textContent =
      'Executing... \nStatus 200 OK: {"status": "healthy", "engine": "Operational"}';
  });
};
