# Decisions

## 2026-11-05 — Infer the product goal from the repository

**Context:** The supplied Goal section was a placeholder. The README and screens describe a Network Operations Center dashboard for shift schedules, tasks, maintenance notifications, links, files, and charts.

**Options:** Stop for a product brief; or infer a concrete goal from the existing product surface.

**Choice:** Use the repository's existing NOC workflows as the goal and record that assumption in `ROADMAP.md`.

**Reason:** The user explicitly asked for autonomous progress without clarification.

## 2026-11-05 — Keep the existing runtime database until migration prerequisites exist

**Context:** Runtime persistence uses Mongoose/MongoDB; the README names managed PostgreSQL as a future direction, but no target endpoint or verified backup is available in the repository.

**Options:** Rewrite persistence to an unconfigured database now; or isolate/document the migration and keep current runtime behavior meanwhile.

**Choice:** Keep MongoDB as the runtime for this completion branch, add portable tests, and track PostgreSQL migration as blocked pending source backup and target connection.

**Reason:** Avoid losing operational data or shipping an untestable database rewrite.

## 2026-11-05 — Use Node's built-in test runner for backend unit tests

**Context:** The backend has no test framework; the supported runtime is Node.js 20.19 or newer.

**Options:** Add Jest/Mocha; or use `node:test` and `node:assert`.

**Choice:** Use the built-in runner for backend validation and API tests; retain the existing React Scripts runner for the client.

**Reason:** It adds no production dependency and fits the declared Node runtime.

## 2026-11-05 — Preserve and untrack local client environment configuration

**Context:** `client/.env` is tracked and contains a local Create React App setting. The repository must not commit machine-specific environment files.

**Options:** Delete the local file; or remove it from Git while keeping it on disk and ignore it.

**Choice:** Preserve the working copy, remove only its Git index entry, and ensure `.env.example` remains tracked.

**Reason:** Keep local setup intact while preventing future environment values from entering commits.