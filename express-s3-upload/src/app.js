require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
require("express-async-errors"); // to catch async errors in route handlers

const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", uploadRoutes);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

module.exports = app;
