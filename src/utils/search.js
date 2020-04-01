import cities from "../data/cities.json"


export const getCityFromIp = async () => {
  try {
    const response = await (await fetch('https://ipapi.co/json/')).json()
    if (!response.city) {
      return null;
    }
    return {
      id: null,
      country: response.country_name,
      name: response.city,
      tz: response.timezone
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const searchCities = query => {
  query = query.toLowerCase()
  const results = cities.filter(c =>
    c.name.toLowerCase().includes(query) ||
    (c.country ? c.country.toLowerCase().includes(query): false)
  )
  results.sort((a, b) => { return b.pop - a.pop })
  return results
}

export const boldSubString = (str, query) => {
    const n = str.toUpperCase()
    const q = query.toUpperCase()
    const x = n.indexOf(q)
    if (!q || x === -1) {
        return str // bail early
    }
    const l = q.length
    return str.substr(0, x) + '<b>' + str.substr(x, l) + '</b>' + str.substr(x + l)
}
