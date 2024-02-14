var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//without this user can't be loggedin
const expressSession = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const passport = require("passport");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//now user can login , we have to write this, now with this code will allow the user will be logged in and helps to allow to save the data
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "hey hey hey",
  })
);

//passport sees the functionality
app.use(passport.initialize());
//now we are holding the session(holding the data), and how we are doing this because we have setup the expressession and helping the data to be saved
app.use(passport.session());

//serializeUser() is setting id as cookie in user's browser and passport.
//deserializeUser() is getting id from the cookie, which is then used in callback to get user info or something else
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
