const { TASK_QUEUES } = require("../../commons/constant");
const { currentDate } = require("../commons/helper");

function createTrueinCloudTaskService(fastify) {
  const { SERVICE_BASE_URL } = fastify.config;
  return async ({ logTrace }) => {
    const createTasks = [
      {
        name: "getEmployeeDtls",
        data: {},
        taskUrl: `${SERVICE_BASE_URL}/v1/employee/pull`
      },
      {
        name: "getLeave",
        data: {
          from_date: currentDate,
          to_date: currentDate
        },
        taskUrl: `${SERVICE_BASE_URL}/v1/leave/pull`
      },
      {
        name: "dailyAttendanceLog",
        data: { date: currentDate, last_uid: 0 },
        taskUrl: `${SERVICE_BASE_URL}/v1/attendance/pull`
      }
    ];

    // Create all 3 tasks in parallel
    const taskPromises = createTasks.map(({ name, data, taskUrl }) =>
      fastify.createCloudTask({
        queue: TASK_QUEUES.TRUEIN_QUEUE,
        url: taskUrl,
        payload: { name, data },
        delayInSeconds: 0,
        logTrace
      })
    );

    await Promise.all(taskPromises);
    return { success: true };
  };
}

module.exports = createTrueinCloudTaskService;
