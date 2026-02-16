// 

const express = require("express");
const router = express.Router();
const upload = require("../middleware/videoUpload");
const vieoUploadController = require("../controller/video.controller")

router.post("/video", upload.single("video"), vieoUploadController);

module.exports = router;
