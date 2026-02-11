// this is the module to generate the token when a new user will login and for some other security purposes
const jwt = require("jsonwebtoken");
const generateToken = (userId)=>{
    return jwt.sign(
        { id:userId}, // this is payload
        process.env.JWT_SECRET, // this is secret key
        { expiresIn:"1h"}  // this will be expired in 1 hour
    )
}

module.exports = generateToken;