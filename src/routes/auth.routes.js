const express = require("express");
const router = express.Router()
// get the login and register controller
const { register, login} = require("../controller/auth.controller"); 

// define auth routes for login and register
router.post("/login", login);
router.post("/register", register);

module.exports = router;