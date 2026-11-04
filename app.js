#!/usr/bin/env node
/**
 * Cursor Training worktree deploy demo.
 * Tiny HTTP server — each worktree can run its own VERSION on its own PORT.
 *
 * Config (first match wins for version/port):
 *   CLI:  node app.js --port 3001 --version v1.0.0
 *   ENV:  PORT=3001 VERSION=v1.0.0 npm start
 *   File: deploy.json  { "version": "v1.0.0", "port": 3001 }
 *   Fallback: package.json version + port 3000
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function git(cmd) {
  try {
    return execSync(`git ${cmd}`, { cwd: __dirname, encoding: "utf8" }).trim();
  } catch {
    return "(unknown)";
  }
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const deploy = readJson(path.join(__dirname, "deploy.json")) || {};
const pkg = readJson(path.join(__dirname, "package.json")) || {};
const labelPath = path.join(__dirname, "checkout-label.txt");
const label = fs.existsSync(labelPath)
  ? fs.readFileSync(labelPath, "utf8").trim()
  : "main checkout";

const version =
  arg("version") ||
  process.env.VERSION ||
  deploy.version ||
  pkg.version ||
  "0.0.0";

const port = Number(
  arg("port") || process.env.PORT || deploy.port || 3000
);

const branch = git("branch --show-current");
const root = git("rev-parse --show-toplevel");

const payload = () => ({
  app: "cursor-training",
  version,
  label,
  branch,
  root,
  port,
  time: new Date().toISOString(),
});

const server = http.createServer((req, res) => {
  if (req.url === "/health" || req.url === "/" || req.url === "/version") {
    const body = JSON.stringify(payload(), null, 2);
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "X-App-Version": version,
    });
    res.end(body + "\n");
    return;
  }
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("not found\n");
});

server.listen(port, "127.0.0.1", () => {
  console.log("=== Cursor Training · deploy ===");
  console.log(`version: ${version}`);
  console.log(`label:   ${label}`);
  console.log(`branch:  ${branch}`);
  console.log(`root:    ${root}`);
  console.log(`listen:  http://127.0.0.1:${port}/`);
  console.log("================================");
});
