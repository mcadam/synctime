import moment from 'moment';
import url from 'url';
import cities from './cities.json';
import ry from './data.json';

const workingHours = {
  before: 6,
  start: 9,
  end: 17,
  after: 21
};

const initParams = {
  date: moment(),
  home: null,
  itinerary: null,
  filterItinerary: false
};

const getCityFromIp = async () => {
  try {
    const response = await (await fetch('https://geoip.nekudo.com/api/')).json()
    return {
      id: null,
      country: response.country.name,
      name: response.city,
      tz: response.location.time_zone
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getParams = async () => {
  const city = await getCityFromIp();
  const query = url.parse(window.location.href, true).query;
  if (city) {
    initParams.home = city;
  }
  if (query.ry) {
    initParams.itinerary = query.ry;
  }
  return initParams;
};

export const searchCities = query => {
  const results = cities.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()));
  results.sort((a, b) => { return b.pop - a.pop });
  return results;
};

export const getRYItineraries = () => {
  return Object.keys(ry);
}

export const getRYItinerary = (name) => {
  return ry[name];
}

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
