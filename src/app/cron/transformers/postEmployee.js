const objectMapper = require("object-mapper");

const employeeMap = {
  empId: "emp_id",
  name: "emp_name",
  mobile: {
    key: "phone_number",
    transform: val => ({
      country_code: "+91",
      number: val
    })
  },
  staff_type: "emp_type",
  joining_date: "date_of_joining",
  contractor: "contractor_name",
  valid_until_date: "contract_validity_date",
  gender: "gender",
  dob: "date_of_birth",
  email: "email_id",
  designation: "designation",
  grade: "grade",
  role: "role",
  title: "title",
  category: "category",
  department: "department",
  division: "division",
  cost_center: "cost_center",
  manager_emp_id: "manager_emp_id",
  l1_manager_emp_id: "l1_manager_emp_id",
  l2_manager_emp_id: "l2_manager_emp_id",
  is_manager: {
    key: "is_manager",
    transform: val => Boolean(val)
  },
  site_code: "site_id",
  regular_in_time: "regular_in_time",
  userAppAccess: {
    key: "has_app_access",
    transform: val => Boolean(val)
  },
  userAppAttendance: {
    key: "has_app_attendance",
    transform: val => Boolean(val)
  },
  is_allot_leave: {
    key: "is_allotted_leave",
    transform: val => val === "1"
  },
  last_working_day: "last_working_date",
  status: "status",
  geofencingLocation: "geofencing_site_id",
  additionalSites: {
    key: "additional_site_ids",
    transform: val => (val ? val.split(",") : [])
  }
};

const transformTrueInResponse = ({ data }) => {
  const transformedData = data.map(line => objectMapper(line, employeeMap));
  return transformedData;
};

module.exports = { transformTrueInResponse };
