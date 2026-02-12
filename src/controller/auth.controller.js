// here we will define controller for login and register 
const User = require("../model/user.model");
const generateToken = require("../utils/generateToken");

// for register
const register = async (req, res)=>{
    // get the data
    const { name, email, password} = req.body;
    const user = await User.create({
        name, email, password
    })
    res.status(201).json({
        status:"success",
        data:"User created successfully"
    })
}

// when user will login 
const login = async (req, res)=>{
    // get email and password
    const { email, password} = req.body;
    // find the user with these credentials
    const user = await User.findOne({email}).select("+password")

    if(!user){
        return res.status(404).json({ status:"false", data:"user not found"})
    }
    // now match the password
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({ success:"false", data:"Invalid Credentials"})
    }

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