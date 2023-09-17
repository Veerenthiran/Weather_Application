import { DateTime } from 'luxon';

const API_KEY = 'e40c651d8a8c50677715e99abd20fa7a';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + '/' + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;
  const { main: detail, icon } = weather[0];
  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    speed,
    detail,
    icon,
  };
};

const formatForecastWeather = (data) => {
  let { timezone, hourly, daily } = data;
  daily = daily.slice(1, 7).map((day) => {
    return {
      title: formatToLocalTime(day.dt, timezone, 'ccc'),
      temp: day.temp.day,
      icon: day.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 7).map((day) => {
    return {
      title: formatToLocalTime(day.dt, timezone, 'hh:mm a'),
      temp: day.temp,
      icon: day.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    'weather',
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWether = await getWeatherData('onecall', {
    lat,
    lon,
    exclude: 'current,minutely,alerts',
    units: searchParams.units,
  }).then((data) => formatForecastWeather(data));
  return { ...formattedCurrentWeather, ...formattedForecastWether };
};

const getFourWeatherData = (searchParams) => {
  const chennai = getWeatherData('weather', {
    q: 'chennai',
    units: searchParams.units,
  }).then((data) => formatCurrentWeather(data));

  const bangalore = getWeatherData('weather', {
    q: 'bangalore',
    units: searchParams.units,
  }).then((data) => formatCurrentWeather(data));

  const hyderabad = getWeatherData('weather', {
    q: 'hyderabad',
    units: searchParams.units,
  }).then((data) => formatCurrentWeather(data));

  const visakhapatnam = getWeatherData('weather', {
    q: 'visakhapatnam',
    units: searchParams.units,
  }).then((data) => formatCurrentWeather(data));
  return [chennai,bangalore,hyderabad,visakhapatnam];
};

const formatToLocalTime = (
  secs,
  zone,
  format = "ccc, dd LLL yyyy' | local time: 'hh: mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export { formatToLocalTime, getFourWeatherData };

export default getFormattedWeatherData;
