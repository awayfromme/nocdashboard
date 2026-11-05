# NOC Dashboard

A web dashboard for Network Operations Center workflows, including a shift calendar, task reports, maintenance notifications, helpful links, file management, and monitoring widgets.

## Requirements

- Node.js 20.19 or newer and npm
- A reachable MongoDB instance (the current backend still uses MongoDB)
- The Syncfusion File Manager service for the file browser; its current URL is `http://localhost:8090/`

## Local development

1. Copy `.env.example` to `.env`.
2. Copy `client/.env.example` to `client/.env` if you need to override the file service URL. Set the private backend values listed below.
3. Install backend dependencies: `npm ci`.
4. Install frontend dependencies: `npm run install-client`.
5. Start the backend and frontend: `npm run develop`.
6. Open `http://localhost:3000`.

The Express API listens on port `5000` by default. Vite proxies local API requests to it during development.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_CONNECTION_STRING` | Yes | MongoDB connection URI. |
| `SECRETORKEY` | Yes | A long, random secret used to sign session tokens. |
| `REGISTRATION_INVITE_CODE` | Yes | Invitation code required to register an account. |
| `PORT` | No | Backend HTTP port; defaults to `5000`. |
| `JWT_EXPIRES_IN_SECONDS` | No | Login token lifetime in seconds; defaults to 12 hours. |

The frontend reads `VITE_FILE_MANAGER_URL` from `client/.env` at build time. The tracked `client/.env.example` uses the localhost development service URL.

Never commit `.env`, database exports, or credentials. `.env` is ignored by Git. Configure production values in your hosting provider's environment settings.

## Authentication and data

Registration is protected by the invitation code. Data API routes require a valid bearer token, which the frontend sends after login. Keep `SECRETORKEY` and `REGISTRATION_INVITE_CODE` private and rotate them if exposed.

## Database direction

The current version stores users, shifts, tasks, notifications, links, and settings in MongoDB. The recommended direction is managed PostgreSQL (for example, Supabase) accessed only by the Express backend through `pg`. This does not require moving authentication to Supabase. The schema and data migration have not been implemented yet; until then, the server requires `MONGODB_CONNECTION_STRING`.

Before migration, provision a PostgreSQL target and take a verified MongoDB backup. Map each Mongoose collection to a relational schema, implement the repository adapter and repeatable import, then compare document counts and representative reads against the source before cutover. Keep the source backup until the target has been validated. This repository does not include the adapter, importer, or cutover tooling yet.

## Commands

- `npm run server` starts only the backend.
- `npm run start --prefix client` starts only the frontend.
- `npm run build` creates the production frontend in `client/dist`.
- `npm run install-client` performs a clean frontend install using the project's peer dependency settings.

## Verification

Run the same checks used by CI:

```sh
npm test
npm run test:client
npm run lint
npm run build
```

The backend tests use Node.js' built-in test runner and do not connect to MongoDB. The frontend smoke test runs under Vitest in non-watch mode. The current test environment verifies API guards and validation but cannot verify database-backed persistence.

## Project structure

- `server.js`, `config/`, `routes/`, `models/`: Express server, authentication, API routes, and MongoDB models.
- `client/src/`: React application, screens, and styles.
- `validation/`, `helpers/`: input validation and shared server helpers.

## Contributing

Contributions are welcome, including bug reports, documentation, accessibility improvements, and focused features. See [CONTRIBUTING.md](CONTRIBUTING.md) for development and pull request guidelines. Do not include credentials, `.env` files, database dumps, or real operational data in issues or pull requests.

## Versioning and releases

The project follows [Semantic Versioning](https://semver.org/). The root `package.json` version is the source of truth, and each published release uses a matching Git tag prefixed with `v` (for example, package version `1.2.3` is released as tag `v1.2.3`).

- **Patch** (`1.2.3` to `1.2.4`): backward-compatible bug fixes and security updates.
- **Minor** (`1.2.3` to `1.3.0`): backward-compatible features.
- **Major** (`1.2.3` to `2.0.0`): breaking changes to APIs, configuration, or user workflows.

Create releases from `main` after the changes are merged and the production build and dependency audit have been checked. A release should include a short summary of user-facing changes, required configuration or migration steps, and known limitations. For a new patch release, run `npm version patch` from the repository root; use `npm version minor` or `npm version major` when appropriate. Review the generated version commit and tag before pushing them, then publish a GitHub Release for that tag.

## Deployment

Set the environment variables on the hosting provider, install dependencies, and build the frontend. `heroku-postbuild` installs the client dependencies and generates its production build for Heroku-compatible environments. Ensure MongoDB and the file service can be reached from the deployed server. Set `VITE_FILE_MANAGER_URL` before building the frontend: Vite embeds this value in the static bundle. The file manager requires a separately hosted Syncfusion-compatible service; the localhost URL is for development only. The mail screen currently records notification data and does not send email.
