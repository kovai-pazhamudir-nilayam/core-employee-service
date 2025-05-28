const { TASK_QUEUES } = require("../../commons/constant");

async function createTruinCloudTaskService(fastify) {
  return async ({ logTrace }) => {
    const { APPLICATION_BASE_URL } = fastify.config;

    const createTasks = [
      {
        name: "getEmployeeDtls",
        data: {},
        taskUrl: `${APPLICATION_BASE_URL}/v1/employee/pull`
      },
      {
        name: "getLeave",
        data: {
          from_date: new Date().toISOString().split("T")[0],
          to_date: new Date().toISOString().split("T")[0]
        },
        taskUrl: `${APPLICATION_BASE_URL}/v1/leave/pull`
      },
      {
        name: "dailyAttendanceLog",
        data: {
          date: new Date(Date.now() - 86400000).toISOString().split("T")[0] // yesterday
        },
        taskUrl: `${APPLICATION_BASE_URL}/v1/attendance/pull`
      }
    ];

    // Create all 3 tasks in parallel
    const taskPromises = createTasks.map(({ name, data, taskUrl }) =>
      fastify.createCloudTask({
        queue: TASK_QUEUES.TRUIN_QUEUE,
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

module.exports = createTruinCloudTaskService;
