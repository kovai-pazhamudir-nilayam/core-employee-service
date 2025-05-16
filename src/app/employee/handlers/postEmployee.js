const postEmployeeService = require("../services/postEmployee");

function postEmployeeHandler(fastify) {
  const postEmployee = postEmployeeService(fastify);
  return async (request, reply) => {
    const { body, logTrace } = request;
    const response = await postEmployee({ body, logTrace });
    return reply.code(201).send(response);
  };
}

module.exports = postEmployeeHandler;
