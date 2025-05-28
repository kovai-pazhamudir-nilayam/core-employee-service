const attendanceRepo = require("../repository/attendance");
const downstreamCallsRepo = require("../repository/downstreamCalls");
const { transformTrueinResponse } = require("../transformers/postAttendance");

function postAttendancePullService(fastify) {
  const { upsertAttendance } = attendanceRepo(fastify);
  const { getDailyAttendanceFromTruein } = downstreamCallsRepo(fastify);

  return async ({ body, logTrace }) => {
    const { knex } = fastify;
    const query = { date: body.date };
    const attendance = await getDailyAttendanceFromTruein({ query, logTrace });

    const attendancePayload = transformTrueinResponse({
      data: attendance.data
    });

    await upsertAttendance.call(knex, {
      data: attendancePayload,
      logTrace
    });

    return { success: true };
  };
}

module.exports = postAttendancePullService;
