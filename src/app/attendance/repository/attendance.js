const { logQuery } = require("../../commons/helpers");
const { ATTENDANCE } = require("../commons/constants");

function attendanceRepo(fastify) {
  async function upsertAttendance({ data, logTrace }) {
    const knex = this;
    const query = knex(ATTENDANCE.NAME).returning("*").insert(data);
    logQuery({
      logger: fastify.log,
      query,
      context: "Upsert Attendance",
      logTrace
    });

    return query;
  }

  return {
    upsertAttendance
  };
}

module.exports = attendanceRepo;
