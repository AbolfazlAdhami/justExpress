import { Router } from "express";
import { users } from "../data/users.mjs";

const router = Router();

router.get("/api/users", (req, res) => {
  res.send(users);
});
// router.get("/api/users/:id");
// router.post("/api/users");
// router.put("/api/users/:id");
// router.patch("/api/users/:id");
// router.delete("/api/users/:id");

export default router;
