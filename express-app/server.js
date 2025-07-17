const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8000;
const posts = require("./routes/posts");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/error");

const app = express();
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Custom middleware
app.use(logger);
app.use(errorHandler);

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/posts", posts);

app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
