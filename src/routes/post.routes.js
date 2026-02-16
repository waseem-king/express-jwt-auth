// this is the module to control the routes of the post
const express = require("express");
const upload = require("../middleware/upload")
const router = express.Router();
const { createPost } = require("../controller/post.controller")

router.post("/", upload.single("image"), createPost);

module.exports = router;