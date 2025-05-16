const postLeaveService = require("../services/postLeave");

function postLeaveHandler(fastify) {
  const postLeave = postLeaveService(fastify);
  return async (request, reply) => {
    const { body, logTrace } = request;
    const response = await postLeave({ body, logTrace });
    return reply.code(201).send(response);
  };
}

module.exports = postLeaveHandler;
