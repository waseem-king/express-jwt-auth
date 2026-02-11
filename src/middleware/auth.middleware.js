// in this module it will be checked for token validation 
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const protect = async (req, res, next)=>{
    try {
        let token;
    if(
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
    ){
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return res.status(401).json({ success:"false", data:"Not Authorized"})
    }
    // if there is token then verify the token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // now get the user from the database
    const user = await User.findById(decode.id);
    // if there is no user then return back
    if(!user){
        return res.status(404).json({ success:"false", data:"User is not longer exist"})
    }
    // attach the user to the request
    req.user = user;
    next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized"
        });
    }
    
}

// this is authorization , role base access
const authorize = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({success:"false", data:"Forbiden! You don't have permission to access"})
        }
        next();
    }

}

module.exports = { protect , authorize}