// here routes will be defined
const express = require("express");
// get the routes instance from express
const router = express.Router();
// get user controller class to call specific method to perform controll over the api call
const  userController  = require("../controller/user.controller")

// get the validation middleware to check data validation and return before controller and database run if not valid
const { userValidation } = require("../middleware/user.validation")
// validate the token 
const { protect , authorize} = require("../middleware/auth.middleware")

// route to get all the users
router.get("/users", protect, userController.getAllUsers);
// route to get the user by id
router.get("/user/:id", userController.getUserById);
// router to create a new user at database
router.post("/users", userValidation,  userController.createNewUser);
// route to delte a specific user 
router.delete("/user/:id", protect, authorize("admin"), userController.deleteUser)
// route to update a user 
router.put("/user/:id", userController.getUserById)
// route to update a specific property
router.patch("/user/:id", userController.updateUser);

module.exports = router;
