const express = require("express");
const router = express.Router();
const { createUploadMiddleware } = require("../middlewares/upload");
const { uploadSingle, uploadMultiple, uploadFields } = require("../controllers/uploadController");

// Create upload middleware instance
// Example: for single avatar — store in 'avatars' subfolder
const uploadForAvatar = createUploadMiddleware({
  subfolderResolver: () => "avatars", // will save to uploads/avatars/...
  multerOptions: {
    limits: { fileSize: 5 * 1024 * 1024 },
  },
});

// Example: for post images (store in posts/<postId>)
const uploadForPosts = createUploadMiddleware({
  subfolderResolver: (req) => {
    // if request has postId param, put images into posts/<postId>
    return req.body.postId ? `posts/${req.body.postId}` : "posts";
  },
});

// Single file route
router.post("/avatar", uploadForAvatar.single("avatar"), uploadSingle);

// Array route (multiple files under same fieldname)
router.post("/photos", uploadForPosts.array("photos", 8), uploadMultiple);

// Fields route (different fieldnames)
router.post(
  "/mixed",
  createUploadMiddleware({ subfolderResolver: () => "mixed" }).fields([
    { name: "avatar", maxCount: 1 },
    { name: "gallery", maxCount: 6 },
  ]),
  uploadFields
);

module.exports = router;
