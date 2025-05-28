const postEmployeePullService = require("../services/postEmployeePull");

function postEmployeePullHandler(fastify) {
  const postEmployeePull = postEmployeePullService(fastify);
  return async (request, reply) => {
    const { body, logTrace } = request;
    const response = await postEmployeePull({ body, logTrace });
    return reply.code(201).send(response);
  };
}

module.exports = postEmployeePullHandler;
