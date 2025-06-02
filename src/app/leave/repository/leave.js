const { logQuery } = require("../../commons/helpers");
const { LEAVE } = require("../commons/constants");

function leaveRepo(fastify) {
  async function createLeave({ data, logTrace }) {
    const knex = this;
    const query = knex(LEAVE.NAME).returning("*").insert(data);
    logQuery({
      logger: fastify.log,
      query,
      context: "Create Leave ",
      logTrace
    });

    return query;
  }

  return { createLeave };
}

module.exports = leaveRepo;
