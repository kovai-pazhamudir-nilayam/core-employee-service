const handlers = require("../handlers");

module.exports = async fastify => {
  fastify.route({
    method: "GET",
    url: "/truin-cron",
    handler: handlers.createTruinCloudTask(fastify)
  });
};
