const moment = require("moment-timezone");

const yesterdayDate = moment
  .tz("Asia/Kolkata")
  .subtract(1, "days")
  .format("YYYY-MM-DD");
const currentDate = moment.tz("Asia/Kolkata").format("YYYY-MM-DD");

module.exports = { yesterdayDate, currentDate };
