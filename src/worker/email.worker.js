const emailQueue = require("../queues/email.queue");

console.log("Worker started...");

emailQueue.on("ready", () => {
    console.log("Worker connected to Redis");
});

emailQueue.on("error", (err) => {
    console.error("Worker Redis Error:", err);
});

emailQueue.process(async (job) => {
    try {
    console.log("Processing Job...");
    console.log("Sending email to:", job.data.email);
    console.log("Message:", job.data.message);

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Email sent successfully");
    } catch (error) {
        console.log("Email sent failed", error.message)
        throw error;
    }
 
});
