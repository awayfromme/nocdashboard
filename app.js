const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const morgan = require("morgan");

const users = require("./routes/api/users");
const blogpost = require("./routes/api/blogpost");
const mail = require("./routes/api/mail");
const setconf = require("./routes/api/setconf");
const link = require("./routes/api/link");
const file = require("./routes/api/files");

const app = express();

app.disable("x-powered-by");
app.use(morgan("tiny"));
app.use(express.json({ limit: "1mb" }));
app.use(passport.initialize());
require("./config/passport")(passport);

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));
app.get("/ready", (req, res) => {
  const ready = mongoose.connection.readyState === 1;
  return res.status(ready ? 200 : 503).json({
    status: ready ? "ready" : "not_ready",
    database: ready ? "connected" : "disconnected"
  });
});

app.use("/api/users", users);
app.use("/api/blogpost", blogpost);
app.use("/api/mail", mail);
app.use("/api/setconf", setconf);
app.use("/api/file", file);
app.use("/api/link", link);

app.use("/api", (req, res) => res.status(404).json({ message: "API route not found" }));

if (process.env.NODE_ENV === "production") {
  const buildPath = path.resolve(__dirname, "client/build");
  app.use(express.static(buildPath));
  app.get("*", (req, res) => res.sendFile(path.join(buildPath, "index.html")));
}

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  const status = Number.isInteger(error.status) ? error.status : 500;
  const message = status === 413 ? "Request body is too large" : "Request failed";
  return res.status(status).json({ message });
});

module.exports = app;
