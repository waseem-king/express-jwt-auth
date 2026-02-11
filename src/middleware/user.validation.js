// here in this module i will verify the user data coming with the user request or user body
// if user sent data is invalied it will generate error and send back the user
const appError = require("./appError");

const userValidation = async (req, res, next)=>{
    const { name ,email} = req.body;
    if(!name || typeof name !== "string" || name.trim().length<3){
        return next(new  appError("Please Provide Valid Name", 400))
    }
    if(!email || !email.includes("@")){
        return next(new appError("Please Provide Valid Email", 400))
    }

    req.body.name = name.trim();

    next();
}

module.exports = {
    userValidation
}