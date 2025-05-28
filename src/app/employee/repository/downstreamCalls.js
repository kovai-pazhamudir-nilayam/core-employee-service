const {
  getAuthToken
} = require("@kovai-pazhamudir-nilayam/kpn-platform-token");
const { buildQueryParams } = require("../../commons/helpers");

function downstreamCallsRepo(fastify) {
  async function getEmployeeDetailsFromTruein({ query, logTrace }) {
    // const auth = await getAuthToken("PLATFORM");
    // const auth = process.env.TRUEIN_TOKEN;
    const auth =
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFBcU9GbzVILUhSek9VRl9ENVhZVyJ9.eyJpc3MiOiJodHRwczovL2Vib21hcnQudXMuYXV0aDAuY29tLyIsInN1YiI6IjN0MTV4VVFCb2wyM2cxd0tvbEJFNHpOUVZKSDJlUXBMQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3NlcnZpY2VzLmtwbmZhcm1mcmVzaC5jb20iLCJpYXQiOjE3NDgzMTQ4MTcsImV4cCI6MTc1MDkwNjgxNywiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiM3QxNXhVUUJvbDIzZzF3S29sQkU0ek5RVkpIMmVRcEwifQ.0RyNRQUhuCeSpak67dcoXD4kRalP_yzHygP6joWb8Q1wbwhb3IQDZzk3EgCLIOiKzEpvb1AjPELE-5EP1r11yuaQEEtau-qsD-fiiShMCDmXKYIeQjMXSJMUg4YDUDaj_M-XdleARp-qO2DmlpiJI8pHtACljlKhLXKUFgLg3LP9J63Rh5l1KWV5yj9UDZLnPwl7Om4ldqfKGsZRO2Vp9MFgM3-nfFBoO4sNQkboQDT3PbeSEAltrNLr3FC8bPeTtFqWqUFnFS4-72oGB5xIRHQ9JxSLfmSBbzM_v2mOCisvhKMrcT75SSLHPXpEJbdfDLGl41Uogkvyy1I-9eBVPA";
    const true_in_query = buildQueryParams(query);
    const response = await fastify.request({
      url: `${fastify.config.TRUEIN_BASE_URL}/apis/ext/attendance/v1.0/getEmployeeDtls?${true_in_query}`,
      method: "GET",
      headers: {
        ...logTrace,
        "Subscription-key": "5dbd7c5c2729d79c28872fcb99430e52",
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
