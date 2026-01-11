const express = require("express");
const router = express.Router();

// middleware
const apiAuth = require("./middleware/apiAuth");
const { uploadImage } = require("./middleware/UploadMiddleware");

// Controllers
const { api: ControllerApi } = config.path.controller;
const HomeController = require(`${ControllerApi}/HomeController`);
const CourseController = require(`${ControllerApi}/HomeController`);
const AuthController = require(`${ControllerApi}/AuthController`);
const UserController = require(`${ControllerApi}/UserController`);

// Admin Controller
const CourseControllerAdmin = require(`${ControllerApi}/admin/CourseController`);
const EpisodeControllerAdmin = require(`${ControllerApi}/admin/EpisodeController`);

router.get("/", HomeController.index);
router.get("/version", HomeController.version);
router.get("/courses", CourseController.index.bind(CourseController));
router.post("/login", AuthController.login.bind(AuthController));
router.post("/register", AuthController);
router.get("/user", apiAuth, UserController.index.bind(UserController));

router.post("/user/image", apiAuth, uploadImage.single("image"), UserController.uploadImage.bind(UserController));

const adminRouter = express.Router();

router.use("/admin", adminRouter);

module.exports = router;
