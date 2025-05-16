const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postAttendanceSchema = {
  tags: ["EMPLOYEE"],
  summary: "This API is to create an employee",
  headers: { $ref: "request-headers#" },
  body: {
    type: "array",
    minItems: 1,
    items: {
      type: "object",
      required: ["emp_id", "attendance_date"],
      additionalProperties: false,
      properties: {
        emp_id: { type: "string", minLength: 1 },
        attendance_date: { type: "string" },
        attendance_site_id: { type: "string" },
        first_in_time: { type: "string" },
        last_out_time: { type: "string" },
        time_spent_in_mins: { type: "integer" },
        is_late: { type: "boolean" },
        late_by_in_mins: { type: "integer" },
        overtime_in_mins: { type: "integer" },
        is_half_day: { type: "boolean" },
        shift_codes: { type: "string" },
        attendance_status: { type: "string" },
        approval_status: {
          type: "string"
        },
        in_out_times: {
          type: "array",
          items: {
            type: "object",
            properties: {
              in_time: { type: "string" },
              in_geo_location: {
                type: "object",
                properties: {
                  latitude: { type: "string" },
                  longitude: { type: "string" }
                }
              },
              out_time: { type: "string" },
              out_geo_location: {
                type: "object",
                properties: {
                  latitude: { type: "string" },
                  longitude: { type: "string" }
                }
              }
            }
          }
        },
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

module.exports = postAttendanceSchema;
