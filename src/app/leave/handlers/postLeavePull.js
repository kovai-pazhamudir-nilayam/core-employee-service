const postLeavePullService = require("../services/postLeavePull");

function postLeavePullHandler(fastify) {
  const postLeavePull = postLeavePullService(fastify);
  return async (request, reply) => {
    const { body, logTrace } = request;
    const response = await postLeavePull({ body, logTrace });
    return reply.code(201).send(response);
  };
}

module.exports = postLeavePullHandler;
