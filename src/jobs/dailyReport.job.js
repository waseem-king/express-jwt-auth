// this is the module that will prepare daily report and send email on daily base
const cron = require("node-cron");
const User = require("../model/user.model");

cron.schedule(" 0 34 15 * * * ", async ()=>{
    console.log("Preparing daily report...")
    // calculate active users
    const totalUsers = await User.countDocuments();
    // calculate total active users
    const activeUsers = await User.countDocuments({ isActive: true});
    // calculate inactive users
    const inactiveUsers =  await User.countDocuments({ isActive:false})
    // send email to inactive or active usrs
    console.log("Preparing report")
    console.log("Total usrs", totalUsers)
    console.log("Active users", activeUsers)
    console.log("In active user", inactiveUsers)
})