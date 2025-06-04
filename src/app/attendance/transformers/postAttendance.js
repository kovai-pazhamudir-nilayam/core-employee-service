const objectMapper = require("object-mapper");

function mapInOuts(inOuts) {
  const inOutsArr = inOuts.map(entry => {
    const [inLat, inLong] = entry.inLocation.split(",");
    const [outLat, outLong] = entry.outLocation.split(",");

    return {
      in_time: entry.inTime,
      in_geo_location: {
        latitude: inLat?.trim() || "",
        longitude: inLong?.trim() || ""
      },
      out_time: entry.outTime,
      out_geo_location: {
        latitude: outLat?.trim() || "",
        longitude: outLong?.trim() || ""
      }
    };
  });
  return JSON.stringify(inOutsArr);
}

const sanitizeDate = dateString => {
  return dateString === "0000-00-00 00:00:00" ? null : dateString;
};
const attendanceMap = {
  emp_id: "emp_id",
  attendanceDate: "attendance_date",
  attendanceSite: "attendance_site_id",
  firstInTime: {
    key: "first_in_time",
    transform: val => sanitizeDate(val)
  },
  lastOutTime: {
    key: "last_out_time",
    transform: val => sanitizeDate(val)
  },
  timeSpent: {
    key: "time_spent_in_mins",
    transform: val => Number(val)
  },
  isLate: {
    key: "is_late",
    transform: val => val === "1"
  },
  lateBy: {
    key: "late_by_in_mins",
    transform: val => Number(val)
  },
  ot: {
    key: "overtime_in_mins",
    transform: val => Number(val)
  },
  halfDay: {
    key: "is_half_day",
    transform: val => val === "1"
  },
  shiftCodes: "shift_codes",
  attendanceStatus: "attendance_status",
  approvalStatus: "approval_status",
  inOuts: {
    key: "in_out_times",
    transform: mapInOuts
  },
  data_source: {
    key: "data_source",
    transform: () => "TRUEIN"
  },
  custom_info: {
    key: "custom_info",
    transform: () => {}
  }
};

const transformTrueinResponse = ({ data }) => {
  const transformedData = data.map(line => objectMapper(line, attendanceMap));

  return transformedData;
};

module.exports = { transformTrueinResponse };
