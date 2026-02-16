// queues/image.queue.js

const Queue = require("bull");

const imageQueue = new Queue("imageQueue", {
  redis: {
    host: "127.0.0.1",
    port: 6379
  }
});

module.exports = imageQueue;
