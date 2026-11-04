#!/usr/bin/env node
/**
 * Tiny Cursor Training demo — prints which checkout you're in.
 * Run from main or a feature worktree to see independent trees.
 */
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

const branch = git("branch --show-current");
const root = git("rev-parse --show-toplevel");
const labelPath = path.join(__dirname, "checkout-label.txt");
const label = fs.existsSync(labelPath)
  ? fs.readFileSync(labelPath, "utf8").trim()
  : "main checkout";

console.log("");
console.log("=== Cursor Training · worktree demo ===");
console.log(`label:   ${label}`);
console.log(`branch:  ${branch}`);
console.log(`root:    ${root}`);
console.log(`cwd:     ${__dirname}`);
console.log("======================================");
console.log("");
