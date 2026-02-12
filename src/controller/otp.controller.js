const redisClient = require("../config/redis")

const sendOTP = async (req, res)=>{
    const { phone } = req.body;
    // generate 4 digit otp
    const otp = Math.floor(1000 + Math.random() * 9000).toString()

    // now store this generated otp at redis
    await redisClient.set(
        `otp:${phone}`,
        otp,
        {EX:300}
    );
    console.log("Generated otp: ", otp)
    res.json({
        message:"OTP sent successfully"
    })
}

// here is the function to verify the generated and stored otp
const verifyOTP = async (req, res)=>{
    // get the otp from the body
    const { phone, otp } = req.body;
    // confirm the otp stored at redis
    const verifiedOTP = await redisClient.get(`otp:${phone}`);
    // if not found then return from here
    if(!verifiedOTP){
        return res.status(400).json({message:"OTP expired or invalid"})
    }
    if(verifiedOTP!==otp){
        return res.status(400).json({message:"OTP is invalied"})
    }
    // if otp is verified then delete it from redis immediately
    await redisClient.del(`otp:${phone}`)
    // now send a response that otp verified successfully
    res.status(200).json({message:"OTP verified successfully"})
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


module.exports = { sendOTP , verifyOTP}