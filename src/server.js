require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./weather');
const cache = require('./cache');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
const DEFAULT_TTL = Number(process.env.CACHE_TTL_SECONDS) || 300; // cache TTL seconds

const logger = require('./logger');

if (!process.env.OPENWEATHER_API_KEY) {
  logger.warn('OPENWEATHER_API_KEY is not set. Set it in .env to enable external API calls.');
}

function validateLatLon(lat, lon) {
  if (Number.isNaN(lat) || Number.isNaN(lon)) return false;
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return false;
  return true;
}

function safeCityKey(city) {
  return (city || '').trim().toLowerCase().slice(0, 200);
}

// MCP-style endpoints with lightweight caching and input validation
// 1) /mcp/current - Get current weather by ?city=NAME OR ?lat=&lon=
// 2) /mcp/forecast - Get forecast by ?city=NAME OR ?lat=&lon=&days=

app.get('/mcp/current', async (req, res) => {
  try {
    const { city, lat, lon } = req.query;
    let coords = null;
    let cacheKeyParts = ['current'];
    if (city) {
      const safeCity = safeCityKey(city);
      cacheKeyParts.push('city', safeCity);
      coords = await weather.geocodeCity(city);
      if (!coords) return res.status(404).json({ error: 'city_not_found' });
    } else if (lat && lon) {
      const latN = parseFloat(lat);
      const lonN = parseFloat(lon);
      if (!validateLatLon(latN, lonN)) return res.status(400).json({ error: 'invalid_coordinates' });
      coords = { lat: latN, lon: lonN, name: `${latN},${lonN}` };
      cacheKeyParts.push('coords', `${latN.toFixed(4)},${lonN.toFixed(4)}`);
    } else {
      return res.status(400).json({ error: 'missing_parameters', message: 'Provide ?city=NAME or ?lat=&lon=' });
    }

    const includeRaw = String(req.query.raw || '').toLowerCase() === 'true';
    cacheKeyParts.push('raw', includeRaw ? '1' : '0');
    const cacheKey = cache.makeKey(cacheKeyParts);
    const cached = await cache.get(cacheKey);
    if (cached) return res.json(cached);

    const current = await weather.getCurrentByCoords(coords.lat, coords.lon, includeRaw);
    if (coords.name) current.location.name = coords.name;
    await cache.set(cacheKey, current, DEFAULT_TTL);
    res.json(current);
  } catch (err) {
    console.error(err?.response?.data || err.message || err);
    res.status(500).json({ error: 'server_error', details: err?.message || 'unknown' });
  }
});

app.get('/mcp/forecast', async (req, res) => {
  try {
    const { city, lat, lon, days } = req.query;
    let coords = null;
    let cacheKeyParts = ['forecast'];
    if (city) {
      const safeCity = safeCityKey(city);
      cacheKeyParts.push('city', safeCity);
      coords = await weather.geocodeCity(city);
      if (!coords) return res.status(404).json({ error: 'city_not_found' });
    } else if (lat && lon) {
      const latN = parseFloat(lat);
      const lonN = parseFloat(lon);
      if (!validateLatLon(latN, lonN)) return res.status(400).json({ error: 'invalid_coordinates' });
      coords = { lat: latN, lon: lonN, name: `${latN},${lonN}` };
      cacheKeyParts.push('coords', `${latN.toFixed(4)},${lonN.toFixed(4)}`);
    } else {
      return res.status(400).json({ error: 'missing_parameters', message: 'Provide ?city=NAME or ?lat=&lon=' });
    }

    const d = Number(days) || 3;
    const limitedDays = Math.min(5, Math.max(1, d));
    const includeRaw = String(req.query.raw || '').toLowerCase() === 'true';
    cacheKeyParts.push('days', String(limitedDays));
    cacheKeyParts.push('raw', includeRaw ? '1' : '0');
    const cacheKey = cache.makeKey(cacheKeyParts);
    const cached = await cache.get(cacheKey);
    if (cached) return res.json(cached);

    const forecast = await weather.getForecastByCoords(coords.lat, coords.lon, limitedDays, includeRaw);
    if (coords.name) forecast.location.name = coords.name;
    await cache.set(cacheKey, forecast, DEFAULT_TTL);
    res.json(forecast);
  } catch (err) {
    console.error(err?.response?.data || err.message || err);
    res.status(500).json({ error: 'server_error', details: err?.message || 'unknown' });
  }
});

// health
app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`Weather MCP server listening on port ${PORT}`);
  });
}

module.exports = app;
