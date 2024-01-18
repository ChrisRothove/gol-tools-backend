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

var allowedOrigins = [
  "http://localhost:5173",
  "https://gol-tools-backend.vercel.app/",
  "https://gol-tools.vercel.app/",
];

app.use(cors());

require("dotenv").config();

app.options("*", cors()); // include before other routes
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://gol-tools.vercel.app/");
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
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
