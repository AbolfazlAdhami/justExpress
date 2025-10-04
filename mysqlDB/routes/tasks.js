// routes/tasks.js
import express from "express";
import * as tasksCtrl from "../controllers/tasksController.js";
const router = express.Router();

router.get("/", tasksCtrl.listTasks);
router.get("/new", tasksCtrl.newTaskForm);
router.post("/", tasksCtrl.createTask);
router.get("/:id", tasksCtrl.showTask);
router.get("/:id/edit", tasksCtrl.editTaskForm);
router.post("/:id/edit", tasksCtrl.updateTask);
router.post("/:id/delete", tasksCtrl.deleteTask);
router.post("/:id/assign", tasksCtrl.assignTask); // assign by posting user_id

export default router;
