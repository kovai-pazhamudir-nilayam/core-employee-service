const USER = {
  NAME: "user",
  COLUMNS: {
    USER_ID: "id",
    FULL_NAME: "full_name"
  }
};

const ADDRESS = {
  NAME: "address",
  COLUMNS: {
    ADDRESS_ID: "id",
    COUNTRY: "country",
    STATE: "state",
    CREATED_DT: "created_date_time"
  }
};

const EMPLOYEE = {
  NAME: "employee",
  COLUMNS: {
    EMP_ID: "emp_id",
    EMP_NAME: "emp_name",
    EMP_TYPE: "emp_type",
    DATE_OF_JOINING: "date_of_joining",
    CONTRACTOR_NAME: "contractor_name",
    CONTRACT_VALIDITY_DATE: "contract_validity_date",
    PHONE_NUMBER: "phone_number",
    GENDER: "gender",
    DATE_OF_BIRTH: "date_of_birth",
    EMAIL_ID: "email_id",
    DESIGNATION: "designation",
    GRADE: "grade",
    ROLE: "role",
    TITLE: "title",
    CATEGORY: "category",
    DEPARTMENT: "department",
    DIVISION: "division",
    COST_CENTER: "cost_center",
    MANAGER_EMP_ID: "manager_emp_id",
    L1_MANAGER_EMP_ID: "l1_manager_emp_id",
    L2_MANAGER_EMP_ID: "l2_manager_emp_id",
    IS_MANAGER: "is_manager",
    ONBOARDING_SITE_ID: "onboarding_site_id",
    SITE_ID: "site_id",
    ADDITIONAL_SITE_IDS: "additional_site_ids",
    GEOFENCING_SITE_ID: "geofencing_site_id",
    REGULAR_IN_TIME: "regular_in_time",
    HAS_APP_ACCESS: "has_app_access",
    HAS_APP_ATTENDANCE: "has_app_attendance",
    IS_ALLOTTED_LEAVE: "is_allotted_leave",
    LAST_WORKING_DATE: "last_working_date",
    STATUS: "status",
    DATA_SOURCE: "data_source",
    CUSTOM_INFO: "custom_info",
    API_VERSION: "api_version",
    CREATED_AT: "created_at",
    CREATED_BY: "created_by",
    LAST_MODIFIED_BY: "last_modified_by",
    LAST_MODIFIED_AT: "last_modified_at"
  }
};

module.exports = {
  USER,
  ADDRESS,
  EMPLOYEE
};
