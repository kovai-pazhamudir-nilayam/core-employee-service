const schemas = require("../schemas");
const handlers = require("../handlers");

module.exports = async fastify => {
  fastify.route({
    method: "POST",
    url: "/pull",
    schema: schemas.postEmployeePull,
    handler: handlers.postEmployeePullHandler(fastify)
  });
};
