const downstreamCallsRepo = require("../repository/downstreamCalls");
const {
  transformAccessTokenResponse
} = require("../transformers/postLeavePull");

async function postTrueinAccessTokenService({ fastify, logTrace }) {
  const { getTrueinAccessToken } = downstreamCallsRepo(fastify);

  const { TRUEIN_ACCESS_KEY_ID, TRUEIN_SECRET_SUCCESS_KEY, TRUEIN_GRANT_TYPE } =
    fastify.config;
  const accessTokenPayload = {
    access_key_id: TRUEIN_ACCESS_KEY_ID,
    secret_access_key: TRUEIN_SECRET_SUCCESS_KEY,
    grant_type: TRUEIN_GRANT_TYPE
  };

  const { data: accessTokenResponse } = await getTrueinAccessToken({
    body: accessTokenPayload,
    logTrace
  });

  const accessToken = transformAccessTokenResponse({
    data: accessTokenResponse
  });

  return { accessToken };
}

module.exports = postTrueinAccessTokenService;
