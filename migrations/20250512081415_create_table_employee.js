exports.up = knex => {
  return knex.schema.hasTable("employee").then(exists => {
    if (!exists) {
      return knex.schema.createTable("employee", table => {
        table.string("emp_id").primary();
        table.string("emp_name");
        table.string("emp_type");
        table.date("date_of_joining");
        table.string("contractor_name");
        table.date("contract_validity_date");
        table.jsonb("phone_number");
        table.string("gender");
        table.date("date_of_birth");
        table.string("email_id");
        table.string("designation");
        table.string("grade");
        table.string("role");
        table.string("title");
        table.string("category");
        table.string("department");
        table.string("division");
        table.string("cost_center");
        table.string("manager_emp_id");
        table.string("l1_manager_emp_id");
        table.string("l2_manager_emp_id");
        table.boolean("is_manager");
        table.string("onboarding_site_id");
        table.string("site_id");
        table.jsonb("additional_site_ids");
        table.string("geofencing_site_id");
        table.string("regular_in_time");
        table.boolean("has_app_access");
        table.boolean("has_app_attendance");
        table.boolean("is_allotted_leave");
        table.date("last_working_date");
        table.string("status");
        table.string("data_source");
        table.jsonb("custom_info");
        // table.jsonb("audit");
        table.string("api_version");
        table.timestamp("created_at").default(knex.fn.now());
        table.string("created_by");
        table.string("last_modified_by");
        table.timestamp("last_modified_at");
      });
    }
    return false;
  });
};

exports.down = knex => {
  return knex.schema.dropTable("employee");
};
