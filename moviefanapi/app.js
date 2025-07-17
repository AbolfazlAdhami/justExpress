const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// /now_playing
const indexRouter = require("./routes/index");
// /movies/...
const movieRouter = require("./routes/movie");
// /search/...
const searchRouter = require("./routes/search");

const app = express();

app.use((req, res, next) => {
  //   cut off the response if the api key is bad
  const { api_key } = req.headers;
  if (parseInt(api_key) != 123456789) {
    // these are not the droids we're looking for
    res.status(401); // Unauthorized = 401, NOT a 200
    res.json("Invalid API Key");
  } else {
    next();
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/movie", movieRouter);
app.use("/search", searchRouter);

//  catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
