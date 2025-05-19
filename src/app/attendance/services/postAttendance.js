const attendanceRepo = require("../repository/attendance");

function postEmployeeService(fastify) {
  const { upsertAttendance } = attendanceRepo(fastify);

  return async ({ body, logTrace }) => {
    const { knex } = fastify;

    await upsertAttendance.call(knex, {
      data: body,
      logTrace
    });

    return { success: true };
  };
}

module.exports = postEmployeeService;
