const {
  getAuthToken
} = require("@kovai-pazhamudir-nilayam/kpn-platform-token");
const { buildQueryParams } = require("../../commons/helpers");

function downstreamCallsRepo(fastify) {
  async function getEmployeeDetailsFromTruein({ query, logTrace }) {
    // const auth = await getAuthToken("PLATFORM");
    const auth = process.env.TRUEIN_TOKEN;
    const true_in_query = buildQueryParams(query);
    const response = await fastify.request({
      url: `${fastify.config.TRUEIN_BASE_URL}/apis/ext/attendance/v1.0/getEmployeeDtls?${true_in_query}`,
      method: "GET",
      headers: {
        ...logTrace,
        Authorization: `Bearer ${auth}`
      },
      path: "/truein/apis/ext/attendance/v1.0/getEmployeeDtls",
      downstream_system: "Truein",
      source_system: "core-employee-service",
      domain: "employee",
      functionality: `Get Employee Details`
    });

    return response;
  }

  return {
    getEmployeeDetailsFromTruein
  };
}

module.exports = downstreamCallsRepo;
