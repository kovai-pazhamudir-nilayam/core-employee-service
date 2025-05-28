const createTruinCloudTaskService = require("../services/createTruinCloudTask");

function createTruinCloudTaskHandler(fastify) {
  const createTruinCloudTask = createTruinCloudTaskService(fastify);
  return async (request, reply) => {
    const { body, logTrace } = request;
    const response = await createTruinCloudTask({ body, logTrace });
    return reply.code(201).send(response);
  };
}

module.exports = createTruinCloudTaskHandler;
