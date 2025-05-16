exports.up = knex => {
  return knex.schema.hasTable("attendance").then(exists => {
    if (!exists) {
      return knex.schema.createTable("attendance", table => {
        table
          .uuid("attendance_id")
          .primary()
          .defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("emp_id");
        table.date("attendance_date");
        table.string("attendance_site_id");
        table.timestamp("first_in_time");
        table.timestamp("last_out_time");
        table.integer("time_spent_in_mins");
        table.boolean("is_late");
        table.integer("late_by_in_mins");
        table.integer("overtime_in_mins");
        table.boolean("is_half_day");
        table.string("shift_codes");
        table.string("attendance_status");
        table.string("approval_status");
        table.jsonb("in_out_times");
        table.string("data_source");
        table.jsonb("custom_info");
      });
    }
    return false;
  });
};

exports.down = knex => {
  return knex.schema.dropTable("attendance");
};
