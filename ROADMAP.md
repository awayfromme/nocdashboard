# Roadmap

## Goal

NOC Dashboard gives a small Network Operations team one authenticated workspace for shift schedules, tasks, maintenance notices, useful links, and monitoring. The current React and Express application should work end to end, remain usable on desktop and mobile, and be safe to deploy with documented configuration. External database and file/mail services must have explicit production requirements and useful local behavior.

## Definition of Done

- Core workflows work end to end and their critical logic has automated tests.
- Frontend and backend lint checks, tests, and production build pass in GitHub Actions.
- README covers setup, configuration, usage, deployment, and release versioning.
- Every TODO/FIXME is removed or linked to an unchecked task below.
- The final status report records completed work, external blockers, and run/test commands.

## Completed

- [x] Work on the dedicated `agent/completion` branch; keep `main` unchanged.
- [x] Add invite-gated account registration, hashed passwords, bearer-token API access, and session expiry handling.
- [x] Refresh the dashboard layout for responsive screens.
- [x] Add an English README, contribution guidance, MIT license, and SemVer release instructions.
- [x] Remove unused vulnerable client dependencies, update PDF export packages, and clear GitHub's critical alert count at release `v1.0.1`.

## Tasks (priority order)

- [x] **P0 — Repository hygiene:** stop tracking the local `client/.env` while preserving the local file; ensure all environment files are ignored except `.env.example`; confirm no credential is added to the branch.
- [x] **P0 — Test foundation:** add focused Node tests for registration/login validation and fix the frontend test setup. The React smoke test and fifteen backend tests pass.
- [x] **P0 — Backend reliability:** add health/readiness endpoints, safe central errors, a 1 MB JSON limit, consistent validation, startup checks and graceful shutdown. Keep the disconnected legacy project/task APIs unmounted.
- [x] **P0 — Security review:** enforce auth on every mounted data API; use generic login failures, 12-hour default JWTs, unique normalized email storage, invite-gated registration, and regression tests. Authenticated users share one NOC workspace by design.
- [x] **P1 — Working screens:** align notification settings and mail entry fields with MongoDB models, use the Mongo `_id` key, remove the extra database read on new mail drafts, and make settings widths responsive. Other screen behavior still requires validation against the deployment data.
- [x] **P1 — External integrations:** configure the Syncfusion file-service URL through `REACT_APP_FILE_MANAGER_URL`, retain a localhost development default, and document that the mail screen stores drafts but does not deliver email.
- [ ] **P1 — Database portability:** implement and rehearse a migration from MongoDB to managed PostgreSQL after a reachable target and recoverable source backup are available; keep migrations repeatable and data-preserving.
- [x] **P0 — API integration tests:** add a database-independent app harness covering health/readiness, auth on all mounted data APIs, expired tokens, login error parity, malformed/oversized requests and JSON 404 responses.
- [x] **P1 — Lint and formatting:** add reproducible backend/frontend lint commands and pass both without broad rule suppressions.
- [x] **P1 — CI:** add GitHub Actions for clean installs, backend/frontend tests, lint, production build and critical-severity dependency audits.
- [x] **P2 — Product/docs finish:** document setup, environment variables, local verification, deployment prerequisites, notification delivery limitations and SemVer releases in the English README.
- [x] **P2 — TODO audit:** scan tracked application source for TODO/FIXME/XXX; no untracked markers remain. Roadmap references are planning text.
- [ ] **P2 — Final verification:** run the hosted dependency audit and confirm a green GitHub Actions result after pushing this branch; record the result in `STATUS.md`.

## Blocked

- **Production database migration:** repository code uses MongoDB, while the intended replacement is managed PostgreSQL. The source instance's availability, backup, and target database connection are outside this repository. Until these are available, keep MongoDB as the configured runtime and test database-independent behavior; do not run destructive or one-way migrations.
- **Production file and email delivery:** the repository has no supported file-service URL, persistent storage mount, or SMTP credentials. Build configurable interfaces and local/dev behavior, but live delivery remains blocked until deployment values are configured.
- **Database-backed end-to-end verification:** no safe MongoDB test URI or test dataset is available. Registration persistence, CRUD workflows, and visual behavior against existing operational records cannot be verified locally. The CI suite deliberately avoids connecting to any database.
- **Hosted CI result:** the branch's GitHub Actions run is not observable from this local environment. The workflow is committed and the local tests/lint/build pass; verify the hosted audit and CI result when the branch push is available.
- **Frontend legacy warnings:** React Router 4 still emits deprecated lifecycle warnings, and the `rrule` package ships source maps pointing at missing files. Both are dependency maintenance items; production build succeeds.
