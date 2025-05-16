const {
  getAuthToken
} = require("@kovai-pazhamudir-nilayam/kpn-platform-token");
const { buildQueryParams } = require("../../commons/helpers");

function downstreamCallsRepo(fastify) {
  async function getLeaveDataFromTruein({ query, logTrace }) {
    // const auth = await getAuthToken("PLATFORM");
    const auth =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOjEzMzUsImRiX3Rva2VuIjoiIiwiaWF0IjoxNzQ3MzczNDUyLCJleHAiOjE3NDc0NTk4NTIsImlzcyI6InRydWVpbi5jb20ifQ.ZVxSWTUiUn-ifi_nY25mqhKIDjqLrJuyZqDmvUD6jTA";
    const true_in_query = buildQueryParams(query);

    const response = await fastify.request({
      url: `${fastify.config.TRUEIN_BASE_URL}/ext/v1/leave/getLeave?${true_in_query}`,
      method: "GET",
      headers: {
        ...logTrace,
        Authorization: `Bearer ${auth}`
      },
      path: "/truein/ext/v1/leave/getLeave",
      downstream_system: "Truein",
      source_system: "core-employee-service",
      domain: "employee",
      functionality: `Get Leave Data`
    });

    return response;
  }

  return {
    getLeaveDataFromTruein
  };
}

module.exports = downstreamCallsRepo;
