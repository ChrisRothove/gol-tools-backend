var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var usersRouter = require("./routes/users/users.router");
var corsMiddleware = require("./middleware/corsMiddleware");

var app = express();

// setup CORS
var cors = require("cors");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

app.use(cors());

require("dotenv").config();

app.options("*", cors()); // include before other routes
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://gol-tools.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/users", usersRouter);

app.use("/", (req, res) => {
  res.send("Express on Vercel");
});

// catch 404 and forward to error handler
app.use(notFound);

// error handler
app.use(errorHandler);

module.exports = app;
