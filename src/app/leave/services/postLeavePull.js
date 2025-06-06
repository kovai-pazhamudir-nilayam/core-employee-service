const leaveRepo = require("../repository/leave");
const downstreamCallsRepo = require("../repository/downstreamCalls");
const {
  transformTrueInResponse,
  transformQueryForTruein
} = require("../transformers/postLeavePull");
const postTrueinAccessTokenService = require("./postTrueinAccessToken");

function postLeavePullService(fastify) {
  const { createLeave } = leaveRepo(fastify);
  const { getLeaveDataFromTruein } = downstreamCallsRepo(fastify);

  return async ({ body, logTrace }) => {
    const { knex } = fastify;
    const { accessToken } = await postTrueinAccessTokenService({
      fastify,
      logTrace
    });

    const transformedQuery = transformQueryForTruein({ query: body.data });

    const trueinResponse = await getLeaveDataFromTruein({
      query: transformedQuery,
      accessToken,
      logTrace
    });

    const transformedData = transformTrueInResponse({
      data: trueinResponse.data
    });

    await createLeave.call(knex, {
      data: transformedData,
      logTrace
    });

    return { success: true };
  };
}
module.exports = postLeavePullService;
