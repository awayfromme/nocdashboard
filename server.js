require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const DEFAULT_PORT = 5000;
const DATABASE_TIMEOUT_MS = 10000;

async function startServer() {
  const connectionString = process.env.MONGODB_CONNECTION_STRING;
  const secret = process.env.SECRETORKEY;
  if (!connectionString || !secret) {
    throw new Error("MONGODB_CONNECTION_STRING and SECRETORKEY must be configured");
  }

  await mongoose.connect(connectionString, {
    serverSelectionTimeoutMS: DATABASE_TIMEOUT_MS
  });

  const port = Number(process.env.PORT) || DEFAULT_PORT;
  const server = await new Promise((resolve, reject) => {
    const listener = app.listen(port, () => resolve(listener));
    listener.once("error", reject);
  });
  console.log(`Server listening on port ${port}`);

  let shuttingDown = false;
  const shutdown = async signal => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`Received ${signal}; shutting down`);
    await new Promise(resolve => server.close(resolve));
    await mongoose.disconnect();
  };

  process.once("SIGTERM", () => shutdown("SIGTERM").catch(() => process.exit(1)));
  process.once("SIGINT", () => shutdown("SIGINT").catch(() => process.exit(1)));
  return server;
}

if (require.main === module) {
  startServer().catch(() => {
    console.error("Startup failed; verify database availability and required environment variables.");
    process.exitCode = 1;
  });
}

module.exports = { startServer };