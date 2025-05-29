const handlers = require("../handlers");

module.exports = async fastify => {
  fastify.route({
    method: "GET",
    url: "/truein/data-pull/cron",
    handler: handlers.createTrueinCloudTask(fastify)
  });
};
