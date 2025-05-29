const { buildQueryParams } = require("../../commons/helpers");

function downstreamCallsRepo(fastify) {
  async function getLeaveDataFromTruein({ query, accessToken, logTrace }) {
    const true_in_query = buildQueryParams(query);

    const response = await fastify.request({
      url: `${fastify.config.TRUEIN_BASE_URL}/ext/v1/leave/getLeave?${true_in_query}`,
      method: "GET",
      headers: {
        ...logTrace,
        Authorization: `Bearer ${accessToken}`
      },
      path: "/truein/ext/v1/leave/getLeave",
      downstream_system: "Truein",
      source_system: "core-employee-service",
      domain: "employee",
      functionality: `Get Leave Data`
    });

    return response;
  }

  async function getTrueinAccessToken({ body, logTrace }) {
    const response = await fastify.request({
      // https://api.truein.com/connect/token
      url: `${fastify.config.TRUEIN_BASE_URL}/connect/token`,
      method: "POST",
      body,
      headers: { ...logTrace },
      path: "/truein/ext/v1/connect/token",
      downstream_system: "Truein",
      source_system: "core-employee-service",
      domain: "employee",
      functionality: `Get access Token`
    });

    return response;
  }

  return { getLeaveDataFromTruein, getTrueinAccessToken };
}

module.exports = downstreamCallsRepo;
