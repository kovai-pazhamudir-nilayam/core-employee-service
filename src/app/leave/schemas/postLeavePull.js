const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postLeaveSchema = {
  tags: ["LEAVE"],
  summary: "This API is to pull leave data from truein",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    properties: {
      from_date: { type: "string" },
      to_date: { type: "string" }
    }
  },
  response: {
    201: {
      type: "object",
      properties: {
        success: { type: "boolean" }
      }
    },
    ...errorSchemas
  }
};

module.exports = postLeaveSchema;
