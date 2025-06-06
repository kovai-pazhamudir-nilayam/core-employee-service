exports.up = knex => {
  return knex.schema.hasTable("leave").then(exists => {
    if (!exists) {
      return knex.schema.createTable("leave", table => {
        table
          .uuid("leave_id")
          .primary()
          .defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("emp_id");
        table.jsonb("leave_dates");
        table.jsonb("comp_off_dates");
        table.string("leave_type");
        table.string("leave_code");
        table.string("leave_reason");
        table.string("approver_emp_id");
        table.string("approval_status");
        table.string("approver_comment");
        table.string("data_source");
        table.jsonb("custom_info");
      });
    }
    return false;
  });
};

exports.down = knex => {
  return knex.schema.dropTable("leave");
};
