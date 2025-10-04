var express = require('express');
var router = express.Router();

import usersRouter from "./routes/users.js";
import tasksRouter from "./routes/tasks.js";

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);