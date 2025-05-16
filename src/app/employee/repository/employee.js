const { logQuery } = require("../../commons/helpers");
const { EMPLOYEE } = require("../commons/constants");

function employeeRepo(fastify) {
  async function upsertEmployee({ data, logTrace }) {
    const knex = this;
    const query = knex(EMPLOYEE.NAME)
      .returning("*")
      .insert(data)
      .onConflict([EMPLOYEE.COLUMNS.EMP_ID])
      .merge();
    logQuery({
      logger: fastify.log,
      query,
      context: "Create Employee",
      logTrace
    });
    const response = await query;
    return response[0];
  }

  async function getEmployeeById({ emp_id, logTrace }) {
    const knex = this;
    const query = knex(EMPLOYEE.NAME)
      .select("*")
      .where({ [EMPLOYEE.COLUMNS.EMP_ID]: emp_id });

    logQuery({
      logger: fastify.log,
      query,
      context: "Get Employee By Id",
      logTrace
    });
    const response = await query;
    return response[0];
  }

  return {
    upsertEmployee,
    getEmployeeById
  };
}

module.exports = employeeRepo;
