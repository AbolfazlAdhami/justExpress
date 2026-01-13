const express = require("express");
const router = express.Router();

// middleware
const apiAuth = require("./middleware/apiAuth");
const { uploadImage } = require("./middleware/UploadMiddleware");

// Controllers
const HomeController = require(`../../controllers/api//HomeController`);
const CourseController = require(`../../controllers/api//CourseController`);
const EpisodeController = require("../../controllers/api/EpisodeController");
const AuthController = require(`../../controllers/api//AuthController`);
const UserController = require(`../../controllers/api//UserController`);

router.get("/", HomeController.index);
router.get("/version", HomeController.version);

//  Course and Episode Controller Routes
router.get("/courses", CourseController.index.bind(CourseController));
router.get("/episode/:id", EpisodeController.single.bind(EpisodeController));
// User Controller Route
router.post("/login", AuthController.login.bind(AuthController));
router.post("/register", AuthController);
router.get("/user", apiAuth, UserController.index.bind(UserController));
router.post("/user/image", apiAuth, uploadImage.single("image"), UserController.uploadImage.bind(UserController));

// Admin Controller
const CourseControllerAdmin = require(`../../controllers/api/admin/CourseController`);
const EpisodeControllerAdmin = require(`../../controllers/api/admin/EpisodeController`);
const apiAdmin = require("./middleware/apiAdmin");

const adminRouter = express.Router();

adminRouter.get("/courses", CourseControllerAdmin.index.bind(CourseControllerAdmin));
adminRouter.get("/courses/:id", CourseControllerAdmin.single.bind(CourseControllerAdmin));
adminRouter.post("/courses", CourseControllerAdmin.store.bind(CourseControllerAdmin));
adminRouter.put("/courses/:id", CourseControllerAdmin.update.bind(CourseControllerAdmin));
adminRouter.delete("/courses/:id", CourseControllerAdmin.destroy.bind(CourseControllerAdmin));

adminRouter.get("/episodes", EpisodeControllerAdmin.index.bind(EpisodeControllerAdmin));
adminRouter.get("/episodes/:id", EpisodeControllerAdmin.single.bind(EpisodeControllerAdmin));
adminRouter.post("/episodes", EpisodeControllerAdmin.store.bind(EpisodeControllerAdmin));
adminRouter.put("/episodes/:id", EpisodeControllerAdmin.update.bind(EpisodeControllerAdmin));
adminRouter.delete("/episodes/:id", EpisodeControllerAdmin.destroy.bind(EpisodeControllerAdmin));

router.use("/admin", apiAuth, apiAdmin, adminRouter);

module.exports = router;
