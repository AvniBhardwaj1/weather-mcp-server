const axios = require('axios');

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE = 'https://api.openweathermap.org/data/2.5';
const GEO = 'http://api.openweathermap.org/geo/1.0';

if (!API_KEY) {
  // Do not throw on load so the module can be inspected without env, but warn at runtime
  // Server startup will log reminders if key is missing.
}

async function geocodeCity(city) {
  // Use OpenWeatherMap geocoding to resolve city -> lat/lon
  const url = `${GEO}/direct`;
  const res = await axios.get(url, { params: { q: city, limit: 1, appid: API_KEY } });
  if (!res.data || res.data.length === 0) return null;
  const r = res.data[0];
  return { name: `${r.name}${r.state ? ', '+r.state : ''}, ${r.country}`, lat: r.lat, lon: r.lon };
}

function kToC(k) { return +(k - 273.15).toFixed(1); }
function kToF(k) { return +((k - 273.15) * 9/5 + 32).toFixed(1); }

async function getCurrentByCoords(lat, lon, includeRaw = false) {
  const url = `${BASE}/weather`;
  const res = await axios.get(url, { params: { lat, lon, appid: API_KEY } });
  const d = res.data;
  const currentObj = {
    temp_k: d.main.temp,
    temp_c: kToC(d.main.temp),
    temp_f: kToF(d.main.temp),
    feels_like_c: kToC(d.main.feels_like),
    humidity: d.main.humidity,
    pressure_hpa: d.main.pressure,
    wind_mps: d.wind?.speed,
    wind_deg: d.wind?.deg,
    conditions: d.weather?.map(w => ({ id: w.id, main: w.main, description: w.description })) || []
  };
  if (includeRaw) currentObj.raw = d;

  const out = {
    provider: 'openweathermap',
    fetchedAt: new Date().toISOString(),
    location: {
      name: d.name || `${lat},${lon}`,
      lat: d.coord?.lat ?? lat,
      lon: d.coord?.lon ?? lon
    },
    current: currentObj
  };
  return out;
}

async function getForecastByCoords(lat, lon, days = 3) {
  // Use the free 5 day / 3 hour forecast endpoint and aggregate entries into daily summaries.
  // Many free OpenWeather accounts cannot access the One Call daily endpoint (401). The /forecast endpoint
  // returns a list of 3-hour forecasts which we group by date and compute min/max temps and common conditions.
  days = Number(days) || 3;
  days = Math.min(5, Math.max(1, days)); // /forecast covers up to 5 days
  const url = `${BASE}/forecast`;
  const res = await axios.get(url, { params: { lat, lon, appid: API_KEY } });
  const d = res.data;
  const entries = d.list || [];

  const byDate = {};
  entries.forEach(e => {
    const date = new Date(e.dt * 1000).toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(e);
  });

  const dates = Object.keys(byDate).sort().slice(0, days);
  const daily = dates.map(date => {
    const items = byDate[date];
    let minK = Infinity, maxK = -Infinity, humidSum = 0, windMax = 0, popMax = 0;
    const condCount = {};
    items.forEach(it => {
      const t = it.main?.temp;
      if (typeof t === 'number') {
        if (t < minK) minK = t;
        if (t > maxK) maxK = t;
      }
      humidSum += (it.main?.humidity) ?? 0;
      if ((it.wind?.speed || 0) > windMax) windMax = it.wind.speed;
      if (typeof it.pop === 'number' && it.pop > popMax) popMax = it.pop;
      const w = it.weather?.[0];
      if (w) {
        const key = `${w.id}|${w.main}|${w.description}`;
        condCount[key] = (condCount[key] || 0) + 1;
      }
    });

    const avgHumidity = items.length ? Math.round(humidSum / items.length) : null;
    let topCond = null; let topCount = 0;
    Object.entries(condCount).forEach(([k, v]) => { if (v > topCount) { topCount = v; topCond = k; } });
    const condObj = [];
    if (topCond) {
      const [id, main, description] = topCond.split('|');
      condObj.push({ id: Number(id), main, description });
    }

    const dayObj = {
      dt_iso: new Date(items[Math.floor(items.length/2)].dt * 1000).toISOString(),
      temp_k: { min: minK === Infinity ? null : minK, max: maxK === -Infinity ? null : maxK },
      temp_c: { min: minK === Infinity ? null : kToC(minK), max: maxK === -Infinity ? null : kToC(maxK) },
      temp_f: { min: minK === Infinity ? null : kToF(minK), max: maxK === -Infinity ? null : kToF(maxK) },
      humidity: avgHumidity,
      wind_mps: windMax,
      conditions: condObj,
      pop: popMax
    };
    if (includeRaw) dayObj.raw = items;
    return dayObj;
  });

  const out = {
    provider: 'openweathermap',
    fetchedAt: new Date().toISOString(),
    location: { lat, lon },
    forecast: daily
  };
  if (includeRaw) out.raw = d;
  return out;
}

module.exports = {
  geocodeCity,
  getCurrentByCoords,
  getForecastByCoords
};
