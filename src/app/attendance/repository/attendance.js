const { logQuery } = require("../../commons/helpers");
const { ATTENDANCE } = require("../commons/constants");

function attendanceRepo(fastify) {
  async function insertAttendance({ data, logTrace }) {
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

  async function insertAttendanceInBatches({ data, knexReference }) {
    const knexTrx = this;
    const queryResult = await knexReference
      .batchInsert(ATTENDANCE.NAME, data, 1000)
      .transacting(knexTrx);

    return queryResult;
  }

  return { insertAttendance, insertAttendanceInBatches };
}

module.exports = attendanceRepo;
