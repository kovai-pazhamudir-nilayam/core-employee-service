const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postAttendancePullSchema = {
  tags: ["EMPLOYEE"],
  summary: "This API is to create an employee attendance",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    required: ["name", "data"],
    properties: {
      name: { type: "string", minLength: 1 },
      data: { type: "object", additionalProperties: true }
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

module.exports = postAttendancePullSchema;
