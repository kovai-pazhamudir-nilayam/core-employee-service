const _ = require("lodash");
const downstreamCallsRepo = require("../repository/downstreamCalls");
const { TASK_QUEUES } = require("../../commons/constant");
const employeeRepo = require("../repository/employee");
const { transformTrueInResponse } = require("../transformers/postEmployee");

const createCloudTasks = async ({ fastify, body, logTrace }) => {
  const { SERVICE_BASE_URL } = fastify.config;
  const TASKS_URL = `${SERVICE_BASE_URL}/v1/employee/cloud-task`;
  return fastify.createCloudTask({
    queue: TASK_QUEUES.INVOICE_QUEUE, // invoice-queue
    url: TASKS_URL,
    payload: { name: "getEmployeeDtls", data: body },
    delayInSeconds: 5 * 60, // 5 minutes delay
    logTrace
  });
};

function postEmployeePullService(fastify) {
  const { upsertEmployee } = employeeRepo(fastify);
  const { getEmployeeDetailsFromTruein } = downstreamCallsRepo(fastify);
  return async ({ body, logTrace }) => {
    const { knex } = fastify;

    const isInitialCall = !("more_rows" in body.data);

    const employeesDetails = await getEmployeeDetailsFromTruein({
      query: isInitialCall ? {} : { lastUid: body.data.lastUid },
      logTrace
    });

    // Upsert employee data
    const transformedEmployees = transformTrueInResponse({
      data: employeesDetails.data
    });

    const uniqueEmployeesPayload = _.uniqBy(transformedEmployees, "emp_id");

    await upsertEmployee.call(knex, {
      data: uniqueEmployeesPayload,
      logTrace
    });

    // Decide if another task is needed
    if (employeesDetails.more_rows === 1) {
      const cloudTaskPayload = {
        last_uid: employeesDetails.last_uid,
        more_rows: employeesDetails.more_rows
      };

      await createCloudTasks({ fastify, body: cloudTaskPayload, logTrace });
    }

    return { success: true };
  };
}

module.exports = postEmployeePullService;
