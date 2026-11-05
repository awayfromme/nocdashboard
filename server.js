require("dotenv").config()
const log = console.log;
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const morgan = require("morgan");
const users = require("./routes/api/users");
const blogpost = require("./routes/api/blogpost");
const mail = require("./routes/api/mail");
const setconf = require("./routes/api/setconf")
const link = require("./routes/api/link")
const file = require("./routes/api/files");
const app = express();



app.use(morgan('tiny'));

if (!process.env.MONGODB_CONNECTION_STRING || !process.env.SECRETORKEY) {
  throw new Error("MONGODB_CONNECTION_STRING and SECRETORKEY must be configured");
}

app.use(express.json());


// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/blogpost", blogpost);
app.use("/api/mail", mail);
app.use("/api/setconf", setconf)
app.use("/api/file", file);
app.use("/api/link", link);
// Serve static assets (build folder) if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.resolve(__dirname, "./client/build")));
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("MongoDB successfully connected");
    app.listen(port, () => console.log(`Server up and running on port ${port} !`));
  })
  .catch(() => {
    console.error("MongoDB connection failed");
    process.exit(1);
  });
