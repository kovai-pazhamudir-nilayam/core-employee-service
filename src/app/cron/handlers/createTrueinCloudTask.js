const createTrueinCloudTaskService = require("../services/createTrueinCloudTask");

function createTrueinCloudTaskHandler(fastify) {
  const createTrueinCloudTask = createTrueinCloudTaskService(fastify);
  return async (request, reply) => {
    const { logTrace } = request;
    const response = await createTrueinCloudTask({ logTrace });
    return reply.code(201).send(response);
  };
}

module.exports = createTrueinCloudTaskHandler;
