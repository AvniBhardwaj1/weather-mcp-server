async function fetchCurrent() {
  const city = document.getElementById('city').value;
  const raw = document.getElementById('raw').checked;
  const url = `/mcp/current?city=${encodeURIComponent(city)}${raw ? '&raw=true' : ''}`;
  document.getElementById('result').textContent = 'Loading...';
  try {
    const r = await fetch(url);
    const data = await r.json();
    document.getElementById('result').textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    document.getElementById('result').textContent = 'Error: ' + e.message;
  }
}

async function fetchForecast() {
  const city = document.getElementById('city').value;
  const days = document.getElementById('days').value;
  const raw = document.getElementById('raw').checked;
  const url = `/mcp/forecast?city=${encodeURIComponent(city)}&days=${days}${raw ? '&raw=true' : ''}`;
  document.getElementById('result').textContent = 'Loading...';
  try {
    const r = await fetch(url);
    const data = await r.json();
    document.getElementById('result').textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    document.getElementById('result').textContent = 'Error: ' + e.message;
  }
}

window.fetchCurrent = fetchCurrent;
window.fetchForecast = fetchForecast;