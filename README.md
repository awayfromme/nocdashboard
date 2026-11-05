# NOC Dashboard

Dashboard for Network Operations Center workflows.

## Local development

Requires Node.js 20.19 or newer and a reachable MongoDB instance.

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_CONNECTION_STRING`, `SECRETORKEY`, and `REGISTRATION_INVITE_CODE` in `.env` to private values.
3. Install the server dependencies with `npm install`.
4. Install the client dependencies with `npm run install-client`.
5. Start the server and client with `npm run develop`.

The registration page requires the configured invitation code. Data API routes require a valid bearer token.
