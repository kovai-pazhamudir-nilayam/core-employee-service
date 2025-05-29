const _ = require("lodash");
const { TASK_QUEUES } = require("../../commons/constant");
const attendanceRepo = require("../repository/attendance");
const downstreamCallsRepo = require("../repository/downstreamCalls");
const { transformTrueinResponse } = require("../transformers/postAttendance");
const { yesterdayDate } = require("../../cron/commons/helper");

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
  const { upsertAttendance } = attendanceRepo(fastify);
  const { getDailyAttendanceFromTruein } = downstreamCallsRepo(fastify);
  return async ({ body, logTrace }) => {
    const { knex } = fastify;

    const isInitialCall = !("more_rows" in body.data);

    const query = isInitialCall ? {} : { lastUid: body.data.lastUid };
    const dailyAttendance = await getDailyAttendanceFromTruein({
      query,
      logTrace
    });

    // Upsert Daily Attendance data
    const attendancePayload = transformTrueinResponse({
      data: dailyAttendance.data
    });

    const uniqueAttendancePayload = _.uniqBy(attendancePayload, "emp_id"); // check

    await upsertAttendance.call(knex, {
      data: uniqueAttendancePayload,
      logTrace
    });

    // Decide if another task is needed
    if (dailyAttendance.more_rows === 1) {
      const cloudTaskPayload = {
        date: yesterdayDate,
        last_uid: dailyAttendance.last_uid,
        more_rows: dailyAttendance.more_rows
      };

      await createCloudTasks({ fastify, body: cloudTaskPayload, logTrace });
    }

    return { success: true };
  };
}

module.exports = postAttendancePullService;
