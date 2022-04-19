const { createClient } = require("redis");

client = createClient({ url: "redis://localhost:6379" });

client.on("error", (err) => {
  throw err;
});

module.exports = client;