require("dotenv").config()
const log = console.log;
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
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



app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
next();
})



// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
       { useNewUrlParser: true,
         useUnifiedTopology: true 
       }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

//Data Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


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

app.use(morgan('tiny'));



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
