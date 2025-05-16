const leaveRepo = require("../repository/leave");

function postLeaveService(fastify) {
  const { upsertLeave } = leaveRepo(fastify);

  return async ({ body, logTrace }) => {
    const { knex } = fastify;

    await upsertLeave.call(knex, {
      data: body,
      logTrace
    });

    return { success: true };
  };
}
module.exports = postLeaveService;
