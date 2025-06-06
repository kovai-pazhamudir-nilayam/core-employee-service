const schemas = require("../schemas");
const handlers = require("../handlers");

module.exports = async fastify => {
  fastify.route({
    method: "POST",
    url: "/pull",
    schema: schemas.postAttendancePull,
    handler: handlers.postAttendancePull(fastify)
  });
};
