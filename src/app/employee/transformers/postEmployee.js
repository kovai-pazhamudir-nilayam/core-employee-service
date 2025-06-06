const objectMapper = require("object-mapper");
const { getCurrentTimestamp } = require("../../commons/helpers");

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
  joining_date: {
    key: "date_of_joining",
    transform: val => (val && val.trim() !== "" ? val : null)
  },
  contractor: "contractor_name",
  valid_until_date: {
    key: "contract_validity_date",
    transform: val => (val && val.trim() !== "" ? val : null)
  },
  gender: "gender",
  dob: {
    key: "date_of_birth",
    transform: val => (val && val.trim() !== "" ? val : null)
  },
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
  last_working_day: {
    key: "last_working_date",
    transform: val => (val && val.trim() !== "" ? val : null)
  },
  status: "status",
  geofencingLocation: "geofencing_site_id",
  additionalSites: {
    key: "additional_site_ids",
    transform: val => (val ? val.split(",") : [])
  },
  createdAt: {
    key: "created_at",
    transform: () => getCurrentTimestamp()
  },
  createdBy: {
    key: "created_by",
    transform: () => "SYSTEM"
  },
  lastModifiedAt: {
    key: "last_modified_at",
    transform: () => getCurrentTimestamp()
  },
  lastModifiedBy: {
    key: "last_modified_by",
    transform: () => "SYSTEM"
  },
  apiVersion: {
    key: "api_version",
    transform: () => "v1"
  }
};

const transformTrueInResponse = ({ data }) => {
  const transformedData = data.map(line => objectMapper(line, employeeMap));
  return transformedData;
};

module.exports = { transformTrueInResponse };
