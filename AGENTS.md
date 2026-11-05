# AGENTS.md

## Project conventions

- Work only on branch `agent/completion` for this effort. Do not switch to or push `main`.
- The product goal, priority order, and blockers live in `ROADMAP.md`; record non-trivial choices in `DECISIONS.md`.
- Backend: Node.js 20.19+, CommonJS, Express, Passport JWT, Mongoose/MongoDB.
- Frontend: React 17, React Router 4, Redux, Create React App 5, DevExtreme, JavaScript and SCSS.
- npm is authoritative. The frontend uses its npm lockfile and `--legacy-peer-deps`; do not regenerate or reintroduce a Yarn lockfile.
- Keep public API behavior and existing NOC data fields stable unless a roadmap task explicitly changes them and tests cover the change.
- Do not log request bodies, passwords, tokens, database URLs, or environment values. `.env` files are private; `.env.example` contains placeholders only.
- Match surrounding source formatting. Prefer small CommonJS modules on the server and focused React components on the client.
- Use conventional commits (`feat:`, `fix:`, `test:`, `docs:`, `chore:`) authored as the repository owner; never add a co-author.

## Commands

- Install backend: `npm ci`
- Install frontend: `npm run install-client`
- Backend tests: `npm test` (Node's built-in test runner)
- Frontend tests: `npm run test:client`
- Lint: `npm run lint`
- Production build: `npm run build`
- Start development servers: `npm run develop`

Windows PowerShell can invoke npm scripts with `npm.cmd`. CI should use the same scripts on Node 20.19+.

## Completion workflow

1. Pick the highest-priority unchecked item in `ROADMAP.md`.
2. Implement a narrow change, add/adjust tests, then run lint, tests, and build as applicable.
3. Check the roadmap item only after its acceptance criteria pass. Add newly discovered work there.
4. Keep external-service limitations in the roadmap Blocked section and provide a local/test fallback when practical.
5. Before stopping, update `STATUS.md` and verify the working tree and branch.