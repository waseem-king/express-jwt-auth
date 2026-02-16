// here we will define controller for login and register 
const User = require("../model/user.model");
const generateToken = require("../utils/generateToken");
const redisClient = require("../config/redis")
const emailQueue = require("../queues/email.queue");

// for register
const register = async (req, res)=>{
    // get the data
    const { name, email, password, phone, role} = req.body;
    const user = await User.create({
        name, email, password, phone, role
    })

    // when user is saved successfully then 
    await emailQueue.add({
        email:email,
        message:"Welcome to our platform"
    })
    res.status(201).json({
        status:"success",
        data: user || "User created successfully"
    })
}

// rate limiting when user tries to login in too many attempts with wrong mobile number or otp then auto block the user
const checkLoginAttempts = async (phone)=>{
    const key = `login_attempts:${phone}`;
    const attempts = await redisClient.incr(key)
    if(attempts === 1){
        await redisClient.expire(key , 60);
    }
    return attempts;
}
// when user will login 
const login = async (req, res)=>{
    // get email and password
    const { email, password, phone} = req.body;
    // find the user with these credentials
    const user = await User.findOne({email}).select("+password")

    if(!user){
        return res.status(404).json({ status:"false", data:"user not found"})
    }
    // now match the password
    const isMatch = await user.comparePassword(password);
    if(!isMatch){

        const attempts = checkLoginAttempts(phone)
        if(attempts>5){
            return res.status(429).json({
                message:"Too many attempts try again later"
            })
        }

        return res.status(401).json({ success:"false", data:"Invalid Credentials"})
    }

    
    // success login → clear attempts
    await redisClient.del(`login_attempts:${phone}`);
    // if user exist and password is matched the generated a new token
    const token = generateToken(user.id);
    user.lastLogin = Date.now();
    await user.save();
    res.json({
        success:"success",
        token:token
    })

}

module.exports = { register, login}