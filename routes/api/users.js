require("dotenv").config()
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { timingSafeEqual } = require("crypto");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const configuredInviteCode = process.env.REGISTRATION_INVITE_CODE;
  const suppliedInviteCode = typeof req.body.inviteCode === "string" ? req.body.inviteCode : "";
  if (!configuredInviteCode) {
    return res.status(503).json({ inviteCode: "Registration is currently disabled" });
  }

  const expectedCode = Buffer.from(configuredInviteCode);
  const receivedCode = Buffer.from(suppliedInviteCode);
  if (expectedCode.length !== receivedCode.length || !timingSafeEqual(expectedCode, receivedCode)) {
    return res.status(403).json({ inviteCode: "Invitation code is invalid" });
  }

  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const email = req.body.email.trim().toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ email: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 12);
    const user = await new User({
      name: req.body.name.trim(),
      email,
      password: passwordHash
    }).save();

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ email: "Email already exists" });
    }
    return res.status(500).json({ message: "Unable to register user" });
  }
});












// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", async (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const password = req.body.password;

  // Find user by email
  try {
  const user = await User.findOne({ email: req.body.email.trim().toLowerCase() });
    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        };

        // Sign token
        jwt.sign(
          payload,
          process.env.SECRETORKEY,
          {
            expiresIn: Number(process.env.JWT_EXPIRES_IN_SECONDS) || 43200
          },
          (err, token) => {
            if (err) {
              return res.status(500).json({ message: "Unable to sign in" });
            }
            return res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  } catch {
    return res.status(500).json({ message: "Unable to sign in" });
  }
});

module.exports = router;
