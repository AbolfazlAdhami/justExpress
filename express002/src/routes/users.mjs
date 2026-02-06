import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { users } from "../data/users.mjs";
import { createUserValidationSchema } from "../utils/validationSchemas";
import { resolveIndexByUserId } from "../middlewares/index.mjs";
import { User } from "../models/User";
import { hashPassword } from "../utils/helpers.mjs";
import { createUserHandler, getUserByIdHandler } from "../handlers/users.mjs";


const router = Router();

router.get("/api/users", query("filter").isString().notEmpty().withMessage("Must not be Empty").isLength({ min: 3, max: 10 }).withMessage("Must be at least 3-10 characters"), (req, res) => {
  req.sesstionStore.get


});
// router.get("/api/users/:id");
// router.post("/api/users");
// router.put("/api/users/:id");
// router.patch("/api/users/:id");
// router.delete("/api/users/:id");

export default router;
