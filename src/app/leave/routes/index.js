const schemas = require("../schemas");
const handlers = require("../handlers");

module.exports = async fastify => {
  // fastify.route({
  //   method: "GET",
  //   url: "/users/:userId",
  //   schema: schemas.getUserById,
  //   handler: handlers.getUserById(fastify)
  // });

  // fastify.route({
  //   method: "POST",
  //   url: "/",
  //   schema: schemas.postAddUser,
  //   handler: handlers.createUser(fastify)
  // });

  fastify.route({
    method: "POST",
    url: "/pull",
    schema: schemas.postLeavePull,
    handler: handlers.postLeavePull(fastify)
  });
};
