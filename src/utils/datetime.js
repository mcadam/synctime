import moment from "moment"

export const getColorForHour = (hour, workingHours) => {
  const isWorkingHours = hour.isBetween(
    hour.clone().hour(workingHours.start),
    hour.clone().hour(workingHours.end),
    "hour",
    "[]"
  )
  const isAlmostWorkingHours = hour.isBetween(
    hour.clone().hour(workingHours.before),
    hour.clone().hour(workingHours.after),
    "hour",
    "[]"
  )
  if (isWorkingHours) {
    return "#52c41a"
  }
  if (isAlmostWorkingHours) {
    return "#fa8c16"
  }
  return "#ff4d4f"
}

export const getOffset = (tz, base) => {
  const now = moment.utc();
  // get the zone offsets for this time, in minutes
  const offsetBase = moment(now).tz(base).utcOffset();
  const offsetTz = moment(now).tz(tz).utcOffset();
  // calculate the difference in hours
  const offset = (offsetTz - offsetBase) / 60;
  return offset >= 0 ? `+${offset}` : offset;
}

export const getUTCOffset = (time) => {
  const offset = time.utcOffset() / 60
  return offset >= 0 ? `+${offset}` : offset;
}
