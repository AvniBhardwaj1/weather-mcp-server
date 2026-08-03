# Weather MCP Server

A clean, readable learning project that wraps OpenWeatherMap into a small MCP-style server. It exposes friendly endpoints for current weather and daily forecasts, normalizes provider output, and includes a demo browser UI.

## Why this exists

Many weather APIs return complex or inconsistent responses. This project makes it easy to:

- query weather by city name or coordinates,
- get a standardized JSON response for current conditions,
- get a simplified daily forecast summary,
- optionally include raw provider payloads for debugging,
- cache results so repeated requests are faster.

It is built as a learning exercise for REST integration, data normalization, and service design.

## What is MCP here?

“MCP” stands for Minimal Common Platform in this context. The goal is to provide a tiny wrapper layer that:

- hides provider-specific API details,
- offers a stable contract to clients,
- handles validation and error responses uniformly,
- keeps the implementation simple and transparent.

This server is not a full real-world platform; it is a small, usable sample service for education and experimentation.

## What this project solves

This project solves the problem of consuming raw weather API responses directly in a client or another service. It:

- abstracts OpenWeatherMap endpoint details,
- normalizes temperature and weather condition fields,
- aggregates 3-hour forecast data into daily summaries,
- adds caching and validation,
- provides a tiny demo UI so you can try the API instantly.

## Features

- GET `/mcp/current?city=London`
- GET `/mcp/forecast?days=3&city=London`
- optional `?raw=true` to include raw provider data
- city name or latitude/longitude input
- in-memory TTL cache
- optional Redis cache when `REDIS_URL` is set
- friendly JSON error responses
- minimal static UI at `/`
- basic automated tests with Jest + Supertest

## API Reference

### GET /mcp/current

Parameters:

- `city` (string) OR
- `lat` and `lon` (numbers)
- `raw=true` (optional)

Returns current weather normalized to:

- temperature in Kelvin, Celsius, Fahrenheit
- feels-like temperature
- humidity
- pressure
- wind speed and direction
- simple weather conditions array

### GET /mcp/forecast

Parameters:

- `city` (string) OR
- `lat` and `lon` (numbers)
- `days` (1–5, optional, default 3)
- `raw=true` (optional)

The forecast response uses OpenWeatherMap's free 5-day / 3-hour endpoint and groups results into daily summaries with:

- min/max temperatures,
- average humidity,
- max wind speed,
- most frequent weather condition,
- precipitation probability.

### GET /health

Returns a simple health check JSON object.

## Project structure

- `src/server.js` — Express server, request validation, cache integration, endpoints
- `src/weather.js` — OpenWeatherMap integration and data normalization
- `src/cache.js` — in-memory TTL cache plus optional Redis support
- `src/logger.js` — simple logging with winston
- `public/index.html` — small demo UI page
- `public/app.js` — UI fetch helpers for current and forecast
- `__tests__/server.test.js` — basic test coverage for endpoints
- `README.md` — this file

## Setup

1. Install Node.js 18+ and npm.
2. In the project root, install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with:

```text
OPENWEATHER_API_KEY=your_api_key_here
```

4. Start the server:

```bash
npm run dev
```

5. Open the demo UI:

```text
http://localhost:3000
```

## Example usage

Current weather by city:

```bash
curl "http://localhost:3000/mcp/current?city=London"
```

3-day forecast by city:

```bash
curl "http://localhost:3000/mcp/forecast?days=3&city=London"
```

Include raw provider data:

```bash
curl "http://localhost:3000/mcp/forecast?days=3&city=London&raw=true"
```

## What you learn from this project

- integrating with third-party REST APIs
- designing a stable output contract for clients
- normalizing and summarizing complex provider data
- building a small Express service with validation
- caching results for performance
- serving a static UI from the same app
- writing simple endpoint tests

## Notes

- Keep your `.env` file secret and do not commit it.
- This project is meant for learning and prototyping, not production use.
- The free OpenWeatherMap tier may restrict some endpoints, so this project uses the free current weather and forecast APIs.

## License

MIT
