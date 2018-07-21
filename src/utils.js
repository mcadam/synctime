import moment from 'moment';

const workingHours = {
  before: 6,
  start: 9,
  end: 17,
  after: 21
};


export const getColorForHour = hour => {
  const isWorkingHours = hour.isBetween(hour.clone().hour(workingHours.start), hour.clone().hour(workingHours.end), 'hour', '[]');
  const isAlmostWorkingHours = hour.isBetween(hour.clone().hour(workingHours.before), hour.clone().hour(workingHours.after), 'hour', '[]');
  if (isWorkingHours) {
    return 'success';
  }
  if (isAlmostWorkingHours) {
    return 'warning';
  }
  return 'danger';
};

export const isOverlapping = (hour, baseHour) => {
  const isWorkingHours = hour.isBetween(hour.clone().hour(workingHours.start), hour.clone().hour(workingHours.end), 'hour', '[]');
  const isWorkingHoursBase = baseHour.isBetween(baseHour.clone().hour(workingHours.start), baseHour.clone().hour(workingHours.end), 'hour', '[]');
  if (isWorkingHours && isWorkingHoursBase) {
    return true;
  }
  return false;
};

export const isCurrent = hour => {
  const now = moment();
  return now.isBetween(hour.clone().startOf('hour'), hour.clone().endOf('hour'));
};

export const filterProgramToCurrentDate = cities => {
  const now = moment();
  return cities.filter(tz => {
    return now.isBetween(moment.unix(tz.start), moment.unix(tz.end));
  });
};

export const getOffset = (tz, base) => {
  const now = moment.utc();
  // get the zone offsets for this time, in minutes
  const offsetBase = moment(now).tz(base).utcOffset();
  const offsetTz = moment(now).tz(tz).utcOffset();
  // calculate the difference in hours
  const offset = (offsetTz - offsetBase) / 60;
  return offset >= 0 ? `+${offset}` : offset;
}
