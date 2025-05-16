const employeeRepo = require("../repository/employee");

function postEmployeeService(fastify) {
  const { upsertEmployee } = employeeRepo(fastify);

  return async ({ body, logTrace }) => {
    const { knex } = fastify;

    await upsertEmployee.call(knex, {
      data: body,
      logTrace
    });

    return { success: true };
  };
}

module.exports = postEmployeeService;
