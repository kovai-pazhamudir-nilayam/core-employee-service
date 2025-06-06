const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postEmployeePullSchema = {
  tags: ["LEAVE"],
  summary: "This API is to create cloud task and create a employee entry in db",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    required: ["name", "data"],
    additionalProperties: false,
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

module.exports = postEmployeePullSchema;
