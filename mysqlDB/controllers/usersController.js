import pool from "../models/db.js";

// list users (server render)
export async function listUsers(req, res, next) {
  try {
    const [rows] = await pool.query("SELECT * FROM users ORDER BY id DESC");
    res.render("users/list", { title: "Users", users: rows });
  } catch (err) {
    next(err);
  }
}

export function newUserForm(req, res) {
  res.render("users/form", { title: "New User", user: {} });
}

export async function createUser(req, res, next) {
  const { username, age, type = "user", job } = req.body;
  try {
    await pool.query("INSERT INTO users (username, age, type, job) VALUES (?, ?, ?, ?)", [username, age || null, type, job || null]);
    res.redirect("/users");
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.render("users/form", { title: "New User", user: req.body, error: "Username already exists" });
    }
    next(err);
  }
}

export async function showUser(req, res, next) {
  const id = Number(req.params.id);
  try {
    const [[user]] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    if (!user) return res.status(404).send("User not found");
    const [tasks] = await pool.query("SELECT * FROM tasks WHERE user_id = ?", [id]);
    res.render("users/show", { title: `User: ${user.username}`, user, tasks });
  } catch (err) {
    next(err);
  }
}

export async function editUserForm(req, res, next) {
  const id = Number(req.params.id);
  try {
    const [[user]] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    if (!user) return res.status(404).send("User not found");
    res.render("users/form", { title: "Edit User", user });
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  const id = Number(req.params.id);
  const { username, age, type, job } = req.body;
  try {
    await pool.query("UPDATE users SET username = ?, age = ?, type = ?, job = ? WHERE id = ?", [username, age || null, type, job || null, id]);
    res.redirect(`/users/${id}`);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  const id = Number(req.params.id);
  try {
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    res.redirect("/users");
  } catch (err) {
    next(err);
  }
}
