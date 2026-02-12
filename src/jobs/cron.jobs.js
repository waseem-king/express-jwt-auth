// this is the module to perform background jobs
const cron = require("node-cron");
const User = require("../model/user.model");

cron.schedule("*/10 * * * * *", ()=>{
    console.log("This cron schedule will run after every 10s");
})

cron.schedule(" * * * * * ", ()=>{
    console.log("This will run after each", new Date().getSeconds())
})

cron.schedule(" 0 0 0 * * * ", async ()=>{
    console.log("Background jobs are runing")

    const thirtyDaysAgo = new Date();

    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await User.deleteMany({
        createdAt:{ $lt: thirtyDaysAgo}
    });

    console.log(`Deleted ${result.deletedCount} old users`);
})