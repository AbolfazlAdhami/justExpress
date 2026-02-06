import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { users } from "../data/users.mjs";
import { createUserValidationSchema } from "../utils/validationSchemas";
import { resolveIndexByUserId } from "../middlewares/index.mjs";




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
