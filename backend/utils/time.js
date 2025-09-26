const { TIME_ZONE } = require("../config/env");
const { utcToZonedTime } = require("date-fns-tz");
const { format } = require("date-fns");

// Returns a local time string in "YYYY-MM-DD HH:mm:ss" for the configured TIME_ZONE
function formatLocal(date) {
  if (!date) return null;
  const d = date instanceof Date ? date : new Date(date);
  const zoned = utcToZonedTime(d, TIME_ZONE);
  return format(zoned, "yyyy-MM-dd HH:mm:ss");
}

module.exports = { formatLocal };
