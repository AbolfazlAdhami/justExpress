import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { users } from "../data/users.mjs";
import * as createUserValidationSchema from "../utils/validationSchemas.mjs";
import { resolveIndexByUserId } from "../middlewares/index.mjs";
import { createUserHandler, getUserByIdHandler } from "../handlers/users.mjs";

const router = Router();

router.get("/api/users", query("filter").isString().notEmpty().withMessage("Must not be Empty").isLength({ min: 3, max: 10 }).withMessage("Must be at least 3-10 characters"), (req, res) => {
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) throw err;

    const result = validationResult(req);
    const {
      query: { filter, value },
    } = req;
    if (filter && value) return res.send((users) => users[filter].includes(value));

    return res.send(users);
  });
});

router.get("/api/users/:id", resolveIndexByUserId, getUserByIdHandler);

router.post("/api/users", checkSchema(createUserValidationSchema), createUserHandler);

router.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;

  users[findUserIndex] = { id: users[findUserIndex]._id, ...body };
  return res.sendStatus(200);
});

router.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  users[findUserIndex] = { ...users[findUserIndex], ...body };
  return res.sendStatus(200);
});
router.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  users.slice(findUserIndex, 1);
  return res.sendStatus(200);
});

export default router;
