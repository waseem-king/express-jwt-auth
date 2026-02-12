// this is the module to verify the otp and generate the otp
const express = require("express");
const router = express.Router();

const { sendOTP , verifyOTP } = require("../controller/otp.controller");

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

module.exports = router;