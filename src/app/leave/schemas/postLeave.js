const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postLeaveSchema = {
  tags: ["LEAVE"],
  summary: "This API is to create a leave entry",
  headers: { $ref: "request-headers#" },
  body: {
    type: "array",
    minItems: 1,
    items: {
      type: "object",
      required: ["emp_id", "leave_dates"],
      additionalProperties: false,
      properties: {
        emp_id: { type: "string", minLength: 1 },
        leave_dates: {
          type: "object",
          properties: {
            from_date: { type: "string" },
            is_from_date_half_day: { type: "boolean" },
            to_date: { type: "string" },
            is_to_date_half_day: { type: "boolean" }
          }
        },
        comp_off_dates: {
          type: "array",
          items: { type: "string" }
        },
        leave_type: { type: "string" },
        leave_code: { type: "string" },
        leave_reason: { type: "string" },
        approver_emp_id: { type: "string" },
        approval_status: {
          type: "string"
        },
        approver_comment: { type: "string" },
        data_source: { type: "string", default: "TRUEIN" },
        custom_info: {
          type: "array",
          items: {
            type: "object",
            properties: {
              group: { type: "string" },
              id: { type: "string" },
              values: { type: "array", items: { type: "string" } },
              additional_info: { type: "object" }
            }
          }
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

module.exports = postLeaveSchema;
