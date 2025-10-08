import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
// import { resolveIndexByUserId } from "../utils/middlewares.mjs";  TODO: middlewares for User id
import { User } from "../mongoose/schemas/user.mjs";
import { hashPassword } from "../utils/helpers.mjs";
import { createUserHandler, getUserByIdHandler } from "../handlers/users.mjs";

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
