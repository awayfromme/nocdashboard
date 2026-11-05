const { spawnSync } = require("node:child_process");
const path = require("node:path");

const eslintPath = path.resolve("node_modules/eslint/bin/eslint.js");
const result = spawnSync(process.execPath, [eslintPath, ...process.argv.slice(2)], {
  cwd: process.cwd(),
  env: { ...process.env, ESLINT_USE_FLAT_CONFIG: "false" },
  stdio: "inherit"
});

if (result.error) throw result.error;
process.exitCode = result.status === null ? 1 : result.status;