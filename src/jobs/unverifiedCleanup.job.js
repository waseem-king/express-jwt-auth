// this is the module to to delete unverified users , who are not verified since 24 hours ago
const User = require("../model/user.model")
const cron = require("node-cron")

// get the time for last 24 hours match it with users created before 24 hours ago , and delet them all
cron.schedule(" 0 0 * * * *", async ()=>{
    console.log("Delete the user which is not verified")
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours()-24);
    const result = await User.deleteMany({
        isVerified:false,
        createdAt:{ $lt: oneDayAgo }
    })

    console.log("Deleted users count joined 1 day ago but not verified", result.deletedCount)
})