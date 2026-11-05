const test = require("node:test");
const assert = require("node:assert/strict");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

test("registration accepts normalized valid input without mutating the caller", () => {
  const input = { name: "  Alex Operator  ", email: " OPS@EXAMPLE.COM ", password: "secret12" };
  const original = { ...input };
  const result = validateRegisterInput(input);
  assert.deepEqual(result, { errors: {}, isValid: true });
  assert.deepEqual(input, original);
});

test("registration reports required fields and rejects invalid email", () => {
  const result = validateRegisterInput({ name: " ", email: "bad", password: " " });
  assert.equal(result.isValid, false);
  assert.deepEqual(result.errors, {
    name: "Name field is required",
    email: "Email is invalid",
    password: "Password field is required"
  });
});

test("registration enforces the password length boundary", () => {
  assert.equal(validateRegisterInput({ name: "A", email: "a@example.com", password: "12345" }).isValid, false);
  assert.equal(validateRegisterInput({ name: "A", email: "a@example.com", password: "1".repeat(31) }).isValid, false);
  assert.equal(validateRegisterInput({ name: "A", email: "a@example.com", password: "123456" }).isValid, true);
});

test("login accepts normalized valid input without mutating the caller", () => {
  const input = { email: " OPS@EXAMPLE.COM ", password: "secret12" };
  const original = { ...input };
  const result = validateLoginInput(input);
  assert.deepEqual(result, { errors: {}, isValid: true });
  assert.deepEqual(input, original);
});

test("login rejects missing credentials, malformed email, and oversized passwords", () => {
  assert.equal(validateLoginInput({}).isValid, false);
  assert.equal(validateLoginInput({ email: "bad", password: "secret12" }).errors.email, "Email is invalid");
  assert.equal(validateLoginInput({ email: "a@example.com", password: "1".repeat(31) }).errors.password, "Password must be between 6 and 30 characters");
});