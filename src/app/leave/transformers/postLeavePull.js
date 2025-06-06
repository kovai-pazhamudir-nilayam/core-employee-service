const transformTrueInResponse = ({ data }) => {
  const transformedData = data.map(line => {
    const {
      empId,
      fromDate,
      toDate,
      compOffDate,
      leaveReason,
      leaveType,
      leaveCode,
      approvalStatus,
      approver,
      approverComment
      //   extRefId,
      //   siteName,
      //   siteCode,
      //   empName,
      //   fromDateHalfDay,
      //   toDateHalfDay,
      //   applySandwichPolicy,
      //   noOfHours,
      //   leaveDoc,
      //   leaveDays
    } = line;

    // TODO: get clarification on half day leave
    const leave_dates = {
      from_date: fromDate,
      is_from_date_half_day: false,
      to_date: toDate,
      is_to_date_half_day: false
    };

    const comp_off_dates = [compOffDate];
    return {
      emp_id: empId,
      leave_dates,
      comp_off_dates: JSON.stringify(comp_off_dates),
      leave_type: leaveType,
      leave_code: leaveCode,
      leave_reason: leaveReason,
      approver_emp_id: approver,
      approval_status: approvalStatus,
      approver_comment: approverComment,
      data_source: "TRUEIN",
      custom_info: JSON.stringify([])
    };
  });

  return transformedData;
};

const trueinKeyMap = {
  site_code: "siteCode",
  emp_id: "empId",
  leave_codes: "leaveCodes",
  from_date: "fromDate",
  to_date: "toDate",
  approval_status: "approvalStatus",
  search_string: "searchString"
};

const transformQueryForTruein = ({ query }) =>
  Object.entries(query).reduce((acc, [key, value]) => {
    acc[trueinKeyMap[key]] = value;

    return acc;
  }, {});

const transformAccessTokenResponse = ({ data }) => {
  const { access_token } = data;
  return access_token;
};

module.exports = {
  transformTrueInResponse,
  transformQueryForTruein,
  transformAccessTokenResponse
};
