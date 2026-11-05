const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

process.env.SECRETORKEY = crypto.randomBytes(32).toString("hex");
const app = require("../app");
const User = require("../models/User");
const Mail = require("../models/Mail");

let server;
let baseUrl;

test.before(async () => {
  server = app.listen(0);
  await new Promise(resolve => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
  if (!server) return;
  server.closeAllConnections();
  await new Promise((resolve, reject) => {
    server.close(error => error ? reject(error) : resolve());
  });
});

test("health reports process liveness and database readiness separately", async () => {
  const live = await fetch(`${baseUrl}/health`);
  const ready = await fetch(`${baseUrl}/ready`);
  assert.equal(live.status, 200);
  assert.deepEqual(await live.json(), { status: "ok" });
  assert.equal(ready.status, 503);
  assert.deepEqual(await ready.json(), { status: "not_ready", database: "disconnected" });
});

test("notification models expose fields used by the dashboard editors", () => {
  assert.ok(Mail.schema.path("ToWho"));
  const Setconf = require("../models/Setconf");
  for (const field of ["main1d", "main1hs", "main1he", "main1ms", "main1me", "loc1", "tables1", "chk1h"]) {
    assert.ok(Setconf.schema.path(field), `${field} should exist in the settings schema`);
  }
});

test("all data APIs reject missing bearer tokens", async () => {
  for (const path of ["/api/blogpost", "/api/mail", "/api/setconf", "/api/file", "/api/link"]) {
    const response = await fetch(`${baseUrl}${path}`);
    assert.equal(response.status, 401, `${path} should require authentication`);
  }
});

test("unmounted legacy project and task endpoints return not found", async () => {
  for (const path of ["/api/projects", "/api/tasks/test-id"]) {
    const response = await fetch(`${baseUrl}${path}`, {
      headers: { Authorization: "Bearer invalid" }
    });
    assert.equal(response.status, 404, `${path} should not expose the unused legacy API`);
  }
});

test("protected APIs reject expired bearer tokens before database access", async () => {
  const token = jwt.sign({ id: "test-user" }, process.env.SECRETORKEY, { expiresIn: -1 });
  const response = await fetch(`${baseUrl}/api/blogpost`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  assert.equal(response.status, 401);
});

test("unknown email and wrong password return identical unauthorized responses", async () => {
  const originalFindOne = User.findOne;
  const sendLogin = password => fetch(`${baseUrl}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "member@example.com", password })
  });

  try {
    User.findOne = async () => null;
    const unknownEmail = await sendLogin("password123");
    const unknownEmailBody = await unknownEmail.json();

    User.findOne = async () => ({
      id: "member-id",
      name: "Member",
      email: "member@example.com",
      password: await bcrypt.hash("other-password", 4)
    });
    const wrongPassword = await sendLogin("password123");
    const wrongPasswordBody = await wrongPassword.json();

    assert.equal(unknownEmail.status, 401);
    assert.equal(wrongPassword.status, 401);
    assert.deepEqual(unknownEmailBody, wrongPasswordBody);
  } finally {
    User.findOne = originalFindOne;
  }
});

test("invalid login input is rejected before database access", async () => {
  const response = await fetch(`${baseUrl}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "not-an-email", password: "short" })
  });
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    email: "Email is invalid",
    password: "Password must be between 6 and 30 characters"
  });
});

test("registration rejects a request without a JSON body safely", async () => {
  const previousInviteCode = process.env.REGISTRATION_INVITE_CODE;
  process.env.REGISTRATION_INVITE_CODE = "test-invite-code";

  try {
    const response = await fetch(`${baseUrl}/api/users/register`, { method: "POST" });
    assert.equal(response.status, 403);
    assert.deepEqual(await response.json(), { inviteCode: "Invitation code is invalid" });
  } finally {
    if (previousInviteCode === undefined) delete process.env.REGISTRATION_INVITE_CODE;
    else process.env.REGISTRATION_INVITE_CODE = previousInviteCode;
  }
});

test("unknown API routes return JSON 404 responses", async () => {
  const response = await fetch(`${baseUrl}/api/unknown`);
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { message: "API route not found" });
});

test("malformed JSON receives a safe client error", async () => {
  const response = await fetch(`${baseUrl}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{invalid json"
  });
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { message: "Request failed" });
});

test("oversized JSON bodies return a safe 413 response", async () => {
  const response = await fetch(`${baseUrl}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "x".repeat(1024 * 1024 + 1) })
  });
  assert.equal(response.status, 413);
  assert.deepEqual(await response.json(), { message: "Request body is too large" });
});
