const workingHours = {
  before: 6,
  start: 9,
  end: 17,
  after: 21,
}

export const getColorForHour = hour => {
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
