const { errorSchemas } = require("../../commons/schemas/errorSchemas");

const postEmployeeSchema = {
  tags: ["EMPLOYEE"],
  summary: "This API is to create an employee",
  headers: { $ref: "request-headers#" },
  body: {
    type: "object",
    required: ["emp_id"],
    additionalProperties: false,
    properties: {
      emp_id: { type: "string", minLength: 1 },
      emp_name: { type: "string" },
      phone_number: {
        type: "object",
        required: ["country_code", "number"],
        additionalProperties: false,
        properties: {
          country_code: { type: "string", enum: ["+91"] },
          number: { type: "string", minLength: 10, maxLength: 10 }
        }
      },
      emp_type: { type: "string" },
      date_of_joining: { type: "string" },
      contractor_name: { type: "string" },
      contract_validity_date: { type: "string" },
      gender: { type: "string" },
      date_of_birth: { type: "string" },
      email_id: { type: "string" },
      designation: { type: "string" },
      grade: { type: "string" },
      role: { type: "string" },
      title: { type: "string" },
      category: { type: "string" },
      department: { type: "string" },
      division: { type: "string" },
      cost_center: { type: "string" },
      manager_emp_id: { type: "string" },
      l1_manager_emp_id: { type: "string" },
      l2_manager_emp_id: { type: "string" },
      is_manager: { type: "boolean" },
      onboarding_site_id: { type: "string" },
      site_id: { type: "string" },
      additional_site_ids: { type: "array", items: { type: "string" } },
      geofencing_site_id: { type: "string" },
      regular_in_time: { type: "string" },
      has_app_access: { type: "boolean" },
      has_app_attendance: { type: "boolean" },
      is_allotted_leave: { type: "boolean" },
      last_working_date: { type: "string" },
      status: { type: "string" },
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

module.exports = postEmployeeSchema;
