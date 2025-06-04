const { TASK_QUEUES } = require("../../commons/constant");
const attendanceRepo = require("../repository/attendance");
const downstreamCallsRepo = require("../repository/downstreamCalls");
const { transformTrueinResponse } = require("../transformers/postAttendance");

const createCloudTasks = async ({ fastify, body, logTrace }) => {
  const { SERVICE_BASE_URL } = fastify.config;
  const TASKS_URL = `${SERVICE_BASE_URL}/v1/attendance/pull`;
  return fastify.createCloudTask({
    queue: TASK_QUEUES.TRUEIN_QUEUE,
    url: TASKS_URL,
    payload: { name: "dailyAttendanceLog", data: body },
    delayInSeconds: 5 * 60, // 5 minutes delay
    logTrace
  });
};

function postAttendancePullService(fastify) {
  const { insertAttendanceInBatches } = attendanceRepo(fastify);
  const { getDailyAttendanceFromTruein } = downstreamCallsRepo(fastify);
  return async ({ body, logTrace }) => {
    const { knex } = fastify;

    const query = { date: body.data.date, lastUid: body.data.last_uid };
    const dailyAttendance = await getDailyAttendanceFromTruein({
      query,
      logTrace
    });

    // Upsert Daily Attendance data
    const attendancePayload = transformTrueinResponse({
      data: dailyAttendance.data
    });

    const knexTrx = await knex.transaction();
    try {
      await insertAttendanceInBatches.call(knexTrx, {
        data: attendancePayload,
        knexReference: knex,
        logTrace
      });
      await knexTrx.commit();
    } catch (error) {
      await knexTrx.rollback();
      throw error;
    }

    // [dont't remove]
    // await insertAttendance.call(knex, {
    //   data: attendancePayload,
    //   logTrace
    // });

    // Decide if another task is needed
    if (dailyAttendance.moreRows === "1") {
      const cloudTaskPayload = {
        date: body.data.date,
        last_uid: dailyAttendance.last_uid,
        more_rows: dailyAttendance.more_rows
      };

      await createCloudTasks({ fastify, body: cloudTaskPayload, logTrace });
    }

    return { success: true };
  };
}

module.exports = postAttendancePullService;
