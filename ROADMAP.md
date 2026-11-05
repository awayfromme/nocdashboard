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
- [x] **P0 — Test foundation:** add focused Node tests for registration/login validation and fix the frontend test setup. The React smoke test and five backend validation tests pass.
- [ ] **P0 — Backend reliability:** add a health endpoint, central error handling, request-size limits, consistent validation, and predictable startup/shutdown behavior; mount or retire unreachable project/task API routes based on the actual UI.
- [ ] **P0 — Security review:** verify authentication on every data endpoint, safe error responses, password limits, duplicate-user handling, and authorization expectations for shared NOC data; add regression tests.
- [ ] **P1 — Working screens:** correct broken API field/key mismatches and fixed-width layouts in calendar, task report, notifications, links, and settings; show useful loading/error/empty states.
- [ ] **P1 — External integrations:** replace the hard-coded `localhost:8090` file-manager endpoint with a configurable service boundary and a local development fallback; make mail-notification status and delivery requirements explicit. Do not claim email/file delivery is working without a configured provider.
- [ ] **P1 — Database portability:** add a documented migration path from MongoDB to managed PostgreSQL after a reachable target and recoverable source backup are available; keep migrations repeatable and data-preserving.
- [ ] **P0 — API integration tests:** cover token expiry and unauthenticated access to each data API; add a DB-independent app test harness.`r`n- [ ] **P1 — Lint and formatting:** add reproducible backend/frontend lint commands and fix all project-source findings without suppressing rules broadly.
- [ ] **P1 — CI:** add GitHub Actions for clean installs, backend tests, frontend tests, lint, production build, and a critical-severity dependency audit.
- [ ] **P2 — Product/docs finish:** complete README usage examples, deployment notes for persistent storage and mail, and verify release/version instructions against the actual scripts.
- [ ] **P2 — TODO audit:** scan tracked source for TODO/FIXME/XXX; remove stale notes or reference a specific unchecked task in this roadmap.
- [ ] **P2 — Final verification:** run the full documented CI command set on this branch, record results, and update `STATUS.md`.

## Blocked

- **Production database migration:** repository code uses MongoDB, while the intended replacement is managed PostgreSQL. The source instance's availability, backup, and target database connection are outside this repository. Until these are available, keep MongoDB as the configured runtime and test database-independent behavior; do not run destructive or one-way migrations.
- **Production file and email delivery:** the repository has no supported file-service URL, persistent storage mount, or SMTP credentials. Build configurable interfaces and local/dev behavior, but live delivery remains blocked until deployment values are configured.