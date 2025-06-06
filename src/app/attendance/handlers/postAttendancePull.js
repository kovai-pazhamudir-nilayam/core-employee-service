const postAttendancePullService = require("../services/postAttendancePull");

function postAttendancePullHandler(fastify) {
  const postAttendancePull = postAttendancePullService(fastify);
  return async (request, reply) => {
    const { body, logTrace } = request;
    const response = await postAttendancePull({ body, logTrace });
    return reply.code(201).send(response);
  };
}

module.exports = postAttendancePullHandler;
