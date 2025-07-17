const express = require("express");
const { deletePost, getPost, getPosts, creatPost, updatePost } = require("../controllers/postController");

const router = express.Router();
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", creatPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

module.exports = router;
