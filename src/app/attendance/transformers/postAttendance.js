const objectMapper = require("object-mapper");

function mapInOuts(inOuts) {
  return inOuts.map(entry => {
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
}

const attendanceMap = {
  emp_id: "emp_id",
  attendanceDate: "attendance_date",
  attendanceSite: "attendance_site_id",
  firstInTime: "first_in_time",
  lastOutTime: "last_out_time",
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
  "": {
    key: "data_source",
    transform: () => "TRUEIN"
  }
};

const transformTrueinResponse = ({ data }) => {
  const transformedData = data.map(line => objectMapper(line, attendanceMap));

  return transformedData;
};

module.exports = { transformTrueinResponse };
