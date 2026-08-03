# Weather MCP Server

A small, well-documented MCP-style wrapper around a weather API (OpenWeatherMap). This is a fun learning project that demonstrates how to:

- Integrate with a third-party REST API
- Normalize provider responses into a stable contract
- Expose simple MCP-style REST endpoints for current conditions and daily forecasts
- Build a tiny static UI to explore the endpoints
- Add a basic in-memory cache and request validation to make the service more robust

This repository is intended for learning and prototyping (not production). It is deliberately small and easy to read so you can extend it as an exercise.

Quick summary: what it does
- Accepts location queries (city name or lat/lon) and returns structured weather data.
- Two endpoints:
  - GET /mcp/current?city=NAME  OR /mcp/current?lat=..&lon=..
  - GET /mcp/forecast?days=N&city=NAME  OR /mcp/forecast?lat=..&lon=..
- Optional: append `&raw=true` to include the underlying provider's raw payload(s) in the response.
- In-memory TTL caching reduces redundant calls to the provider during development.

Why this project is useful (learning topics)
- REST API integration (axios, query params)
- Data normalization and designing a simple consistent contract
- Input validation and error handling
- Lightweight caching strategies (TTL cache)
- Static web UI that consumes the API (vanilla JS)
- Environment configuration via .env and dotenv
- Basic project structuring for a small service

Architecture & file map (what file contains what)
- public/
  - index.html — demo UI to call the MCP endpoints. Includes controls for city/coords, days, and raw toggle.
  - app.js — client-side JS used by the demo UI.
- src/
  - server.js — Express server exposing the MCP endpoints, performing validation, and using the cache.
  - weather.js — integration module that calls OpenWeatherMap (geocoding, current, forecast) and normalizes results.
    - Uses the free 5-day / 3-hour forecast endpoint and aggregates entries into daily objects.
  - cache.js — tiny in-memory TTL cache used by the server (suitable for demos).
- package.json — project metadata and scripts (start, dev)
- .env (not committed) — put your OPENWEATHER_API_KEY here.
- README.md — (this file) usage and explanation

Data contract (summary)
- Current conditions (example shape):
  {
    provider: 'openweathermap',
    fetchedAt: '2026-08-03T10:00:00Z',
    location: { name: 'London, England, GB', lat: 51.5074, lon: -0.1278 },
    current: {
      temp_k, temp_c, temp_f,
      feels_like_c, humidity, pressure_hpa, wind_mps, wind_deg,
      conditions: [{ id, main, description }]
    }
    // Use ?raw=true to include current.raw with the provider payload
  }
- Forecast (example shape):
  {
    provider: 'openweathermap',
    fetchedAt: '2026-08-03T10:00:00Z',
    location: { lat, lon, name? },
    forecast: [
      { dt_iso, temp_k: {min,max}, temp_c: {min,max}, temp_f: {min,max}, humidity, wind_mps, conditions, pop }
    ]
    // Use ?raw=true to include forecast.raw and per-day raw arrays
  }

Getting started (run locally)
1. Clone or download the repository to your machine.

2. Install Node.js (includes npm). On macOS, Homebrew:
   brew install node

3. Install dependencies (from project root):
   npm install

4. Create a .env file in the project root with your OpenWeatherMap API key (no quotes):
   OPENWEATHER_API_KEY=your_api_key_here

5. Start the server (dev mode with auto-reload):
   npm run dev

6. (Optional) Run unit tests (uses Jest + Supertest):
   npm test

7. Open the demo UI in your browser:
   http://localhost:3000/

8. Example API calls (use curl or your browser):
   - Current by city:
     curl "http://localhost:3000/mcp/current?city=London"
   - Forecast (3 days) by city:
     curl "http://localhost:3000/mcp/forecast?days=3&city=London"
   - Include raw provider payloads (can be large):
     curl "http://localhost:3000/mcp/forecast?days=3&city=London&raw=true"

Notes about .env and API keys
- Do NOT commit your .env or API key. The repository includes a .gitignore that ignores .env.
- The free OpenWeatherMap tier may restrict access to some endpoints (One Call). This project uses the free 5-day forecast and current weather endpoints and normalizes results.

Caching & robustness
- The server uses a simple in-memory TTL cache (src/cache.js). TTL defaults to 300 seconds and can be configured with the environment variable `CACHE_TTL_SECONDS`.
- Input validation ensures lat/lon are in valid ranges and days are clamped (1–5 for the forecast aggregation).
- Error responses are JSON with an `error` field and sometimes a `details` message.

Extending this project (ideas / next steps)
- Add Redis-backed caching for multi-instance usage
- Add authentication and rate-limiting
- Add unit tests and CI (mock axios responses)
- Add provider abstraction to support multiple weather providers (e.g., Weatherbit, Meteostat)
- Add more fields to the contract (hourly forecasts, precipitation types)

Pushing to GitHub (quick guide)
1. Initialize a local git repo and commit:
   git init
   git add .
   git commit -m "Initial Weather MCP server scaffold"

2. Create a remote repository on GitHub (via the website or the gh CLI):
   gh repo create my-weather-mcp --public --source=. --remote=origin
   (or create the repo on github.com and copy the remote URL)

3. Push to GitHub:
   git branch -M main
   git remote add origin <your-remote-url>
   git push -u origin main

If you want, I can create a GitHub repo for you (I will need repo name and whether it should be public or private) — tell me the name and preference and I'll create it and push the files.

License & safety
- This is a demo/learning project. Add an appropriate license if you plan to publish it.

Contact / origin
- Scaffolding and updates were provided by an AI assistant using Copilot CLI runtime in VS Code. Use and modify this project freely for learning and experimentation.

Enjoy — try adding caching, tests, or provider adapters as practice. If you'd like, I can now:
- Add unit tests and a simple test runner
- Create a GitHub repo and push the project (ask me to proceed and provide repo visibility and name)
- Add Redis caching instead of in-memory cache

What would you like to do next?