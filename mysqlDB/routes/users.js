import express from "express";
import * as usersCtrl from "../controllers/usersController.js";
const router = express.Router();

router.get("/", usersCtrl.listUsers); // list page
router.get("/new", usersCtrl.newUserForm); // form to create
router.post("/", usersCtrl.createUser); // submit create
router.get("/:id", usersCtrl.showUser); // detail
router.get("/:id/edit", usersCtrl.editUserForm);
router.post("/:id/edit", usersCtrl.updateUser);
router.post("/:id/delete", usersCtrl.deleteUser);

export default router;
