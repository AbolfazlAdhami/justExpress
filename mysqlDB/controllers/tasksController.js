import pool from "../models/db.js";

export async function listTasks(req, res, next) {
  try {
    const [rows] = await pool.query("SELECT t.*, u.username as owner FROM tasks t LEFT JOIN users u ON t.user_id = u.id ORDER BY t.id DESC");
    res.render("tasks/list", { title: "Tasks", tasks: rows });
  } catch (err) {
    next(err);
  }
}

export function newTaskForm(req, res) {
  res.render("tasks/form", { title: "New Task", task: {} });
}

export async function createTask(req, res, next) {
  const { title, description, status = "todo", user_id = null } = req.body;
  try {
    await pool.query("INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)", [title, description || null, status, user_id || null]);
    res.redirect("/tasks");
  } catch (err) {
    next(err);
  }
}

export async function showTask(req, res, next) {
  const id = Number(req.params.id);
  try {
    const [[task]] = await pool.query("SELECT t.*, u.username FROM tasks t LEFT JOIN users u ON t.user_id = u.id WHERE t.id = ?", [id]);
    if (!task) return res.status(404).send("Task not found");
    const [users] = await pool.query("SELECT id, username FROM users");
    res.render("tasks/show", { title: `Task: ${task.title}`, task, users });
  } catch (err) {
    next(err);
  }
}

export async function editTaskForm(req, res, next) {
  const id = Number(req.params.id);
  try {
    const [[task]] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
    if (!task) return res.status(404).send("Task not found");
    const [users] = await pool.query("SELECT id, username FROM users");
    res.render("tasks/form", { title: "Edit Task", task, users });
  } catch (err) {
    next(err);
  }
}

export async function updateTask(req, res, next) {
  const id = Number(req.params.id);
  const { title, description, status, user_id } = req.body;
  try {
    await pool.query("UPDATE tasks SET title = ?, description = ?, status = ?, user_id = ? WHERE id = ?", [title, description || null, status, user_id || null, id]);
    res.redirect(`/tasks/${id}`);
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(req, res, next) {
  const id = Number(req.params.id);
  try {
    await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
    res.redirect("/tasks");
  } catch (err) {
    next(err);
  }
}

export async function assignTask(req, res, next) {
  const id = Number(req.params.id);
  const { user_id } = req.body;
  try {
    await pool.query("UPDATE tasks SET user_id = ? WHERE id = ?", [user_id || null, id]);
    res.redirect(`/tasks/${id}`);
  } catch (err) {
    next(err);
  }
}
