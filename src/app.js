const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes")


// defince the middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// call auth routes with auth
app.use("/api/auth", authRoutes)
// call routes component to match with specific route and perform the action
const userRoutes = require("./routes/user.routes");
app.use("/api", userRoutes);

// get the otp routes and call the using app.use
const otpRoutes = require("./routes/otp.routes");
app.use("/api", otpRoutes);


// now call the error middleware 


// now export the app module
module.exports = app;