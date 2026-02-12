// this is the module used for redis connection which is used as a server works a saperate server
const { createClient } = require("redis");

const redisClient = createClient({
    url: "redis://localhost:6379"
});

redisClient.on("error", (err) => {
    console.log("Redis Client Error", err);
});

(async () => {
    await redisClient.connect();
    console.log("Redis Connected");
})();

module.exports = redisClient;
