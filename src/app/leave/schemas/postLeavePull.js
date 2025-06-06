const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postLeavePullSchema = {
  tags: ["LEAVE"],
  summary: "This API is to pull leave data from truein",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    required: ["name", "data"],
    properties: {
      name: { type: "string" },
      data: {
        type: "object",
        required: ["from_date", "to_date"],
        properties: {
          from_date: { type: "string" },
          to_date: { type: "string" }
        }
      }
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

module.exports = postLeavePullSchema;
