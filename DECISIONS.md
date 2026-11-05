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

## 2026-11-05 — Retire unreachable project and task API routes

**Context:** The app router does not expose the project screen, and its Redux action modules are absent. Those routes allowed every authenticated user to modify any project's records without ownership checks.

**Options:** Mount the legacy API and preserve inaccessible, insufficiently scoped handlers; or leave it unmounted until its screen and access rules are restored together.

**Choice:** Keep `/api/projects` and `/api/tasks` unmounted and test their 404 response.

**Reason:** Avoid exposing unmaintained handlers and data operations that have no reachable product workflow.

## 2026-11-05 — Use a short default JWT lifetime and generic login failures

**Context:** Login tokens lasted one year, and distinct errors revealed whether an email had an account.

**Options:** Preserve the old token lifetime and errors; or set a configurable 12-hour default and return one generic unauthorized response.

**Choice:** Use `JWT_EXPIRES_IN_SECONDS` with a 12-hour default and identical 401 responses for unknown email and wrong password.

**Reason:** Reduce the exposure window for lost tokens and prevent account enumeration while retaining operator configurability.

## 2026-11-05 — Keep email and file services as explicit external integrations

**Context:** The repository contains no SMTP sender or Syncfusion server implementation.

**Options:** Claim the UI sends mail/files despite no provider; or record drafts, configure the file endpoint, and document the external service requirement.

**Choice:** Keep mail records as drafts with no delivery claim; make the frontend file-service URL configurable before build.

**Reason:** Ensure deployment expectations match code that can be verified in this repository.

## 2026-11-05 — Use ESLint 10 for server code and the installed CRA ESLint for the client

**Context:** The server had no lint runner, while Create React App 5 depends on ESLint 8 and its legacy configuration.

**Options:** Upgrade/eject CRA to share one ESLint version; or run a separate root flat config and invoke the existing CRA ESLint in legacy mode.

**Choice:** Keep CRA intact, add root ESLint 10 for server/tests, and a small launcher for the client ESLint already installed by CRA.

**Reason:** Add reproducible linting without an app-framework migration.

## 2026-11-05 — Push only the completion branch to trigger CI

**Context:** The Definition of Done requires GitHub Actions, and local checks cannot verify hosted dependency audits.

**Options:** Keep the branch local and leave CI untriggered; or publish the requested feature branch while keeping `main` untouched.

**Choice:** Push `agent/completion` to `origin` and leave the hosted result as a blocker because this environment cannot query the Actions API.

**Reason:** Let GitHub run the committed workflow without changing the default branch.

## 2026-11-05 — Replace Create React App with Vite and Vitest

**Context:** The Create React App 5 dependency tree contained multiple high-severity development-server and build-tool alerts with no safe non-breaking remediation.

**Options:** Pin vulnerable transitive packages outside their supported ranges; or replace the unmaintained build/test layer while retaining React 17 and the application code.

**Choice:** Move development, build, proxy, and test execution to Vite 8 and Vitest 5. Rename JSX-bearing modules to `.jsx`, retain extensionless imports, and serve Vite's `client/dist` output from Express.

**Reason:** Remove known high-severity frontend toolchain vulnerabilities without a React or product rewrite.

## 2026-11-05 — Pin jsdom to the Node 20-compatible release line

**Context:** GitHub Actions runs Node 20.19. The current jsdom release loaded an `undici` implementation that could not start a Vitest worker under that runtime.

**Choice:** Use jsdom 26.1.0 for the Vitest environment.

**Reason:** Restore CI compatibility while retaining the Vite/Vitest security update.
