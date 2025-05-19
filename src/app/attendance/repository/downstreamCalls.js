const {
  getAuthToken
} = require("@kovai-pazhamudir-nilayam/kpn-platform-token");
const { buildQueryParams } = require("../../commons/helpers");

function downstreamCallsRepo(fastify) {
  async function getDailyAttendanceFromTruein({ query, logTrace }) {
    // const auth = await getAuthToken("PLATFORM");
    const auth = process.env.TRUEIN_TOKEN;
    const true_in_query = buildQueryParams(query);

    // https://api.truein.com/apis/ext/attendance/v1.0/dailyAttendanceLog?date=2020-07-31&lastUid=0
    const response = await fastify.request({
      url: `${fastify.config.TRUEIN_BASE_URL}/apis/ext/attendance/v1.0/dailyAttendanceLog?${true_in_query}`,
      method: "GET",
      headers: {
        ...logTrace,
        Authorization: `Bearer ${auth}`
      },
      path: "/truein/apis/ext/attendance/v1.0/dailyAttendanceLog",
      downstream_system: "Truein",
      source_system: "core-employee-service",
      domain: "employee",
      functionality: `Get Daily Attendance`
    });

    return response;
  }

  return {
    getDailyAttendanceFromTruein
  };
}

module.exports = downstreamCallsRepo;
