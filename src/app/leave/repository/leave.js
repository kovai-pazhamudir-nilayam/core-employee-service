const { logQuery } = require("../../commons/helpers");
const { LEAVE } = require("../commons/constants");

function leaveRepo(fastify) {
  async function upsertLeave({ data, logTrace }) {
    const knex = this;
    const query = knex(LEAVE.NAME).returning("*").insert(data);
    logQuery({
      logger: fastify.log,
      query,
      context: "Upsert Leave ",
      logTrace
    });

    return query;
  }

  return {
    upsertLeave
  };
}

module.exports = leaveRepo;
