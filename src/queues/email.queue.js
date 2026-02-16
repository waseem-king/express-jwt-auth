// in this module email queue will be listed
const Queue = require("bull");

// create email queue
const emailQueue = new Queue("emailQueue", {
    redis:{
        host:"127.0.0.1",
        port: 6379
    }
})

module.exports = emailQueue;