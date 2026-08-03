async function jsonFetch(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} - ${await res.text()}`);
  return res.json();
}

function clearResult(){
  document.getElementById('result').style.display='none';
  document.getElementById('current').innerHTML='';
  document.getElementById('forecast').innerHTML='';
  document.getElementById('raw').textContent='';
}

document.getElementById('btnClear').addEventListener('click', clearResult);

function includeRawParam() {
  return document.getElementById('includeRaw').checked ? '&raw=true' : '';
}

function selectedDaysParam() {
  return `days=${encodeURIComponent(document.getElementById('days').value)}`;
}

document.getElementById('btnCurrent').addEventListener('click', async ()=>{
  clearResult();
  const city = document.getElementById('city').value.trim();
  const lat = document.getElementById('lat').value.trim();
  const lon = document.getElementById('lon').value.trim();
  try{
    let path = '/mcp/current?';
    if (city) path += `city=${encodeURIComponent(city)}`;
    else if (lat && lon) path += `lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
    else { alert('Provide city or lat+lon'); return; }
    path += includeRawParam();
    const d = await jsonFetch(path);
    document.getElementById('result').style.display='block';
    document.getElementById('resTitle').textContent = `Current — ${d.location?.name || ''}`;
    const cur = d.current;
    document.getElementById('current').innerHTML = `<p><strong>${cur.conditions?.[0]?.main || ''}</strong> — ${cur.conditions?.[0]?.description || ''}</p>
      <p>Temp: ${cur.temp_c} °C (${cur.temp_f} °F) — Feels like ${cur.feels_like_c} °C</p>
      <p>Humidity: ${cur.humidity}% — Wind: ${cur.wind_mps} m/s</p>`;
    document.getElementById('raw').textContent = JSON.stringify(d, null, 2);
  }catch(e){ alert('Error: '+e.message); }
});

document.getElementById('btnForecast').addEventListener('click', async ()=>{
  clearResult();
  const city = document.getElementById('city').value.trim();
  const lat = document.getElementById('lat').value.trim();
  const lon = document.getElementById('lon').value.trim();
  try{
    let path = `/mcp/forecast?${selectedDaysParam()}&`;
    if (city) path += `city=${encodeURIComponent(city)}`;
    else if (lat && lon) path += `lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
    else { alert('Provide city or lat+lon'); return; }
    path += includeRawParam();
    const d = await jsonFetch(path);
    document.getElementById('result').style.display='block';
    document.getElementById('resTitle').textContent = `Forecast — ${d.location?.name || ''}`;
    const fc = d.forecast || [];
    const fg = document.getElementById('forecast');
    const container = document.createElement('div'); container.className='forecast-grid';
    fc.forEach(day => {
      const el = document.createElement('div'); el.className='forecast-day';
      el.innerHTML = `<div><strong>${new Date(day.dt_iso).toLocaleDateString()}</strong></div>
        <div>${day.conditions?.[0]?.main || ''} — ${day.conditions?.[0]?.description || ''}</div>
        <div>Min ${day.temp_c.min} °C / Max ${day.temp_c.max} °C</div>
        <div>Precip Prob: ${Math.round((day.pop||0)*100)}%</div>`;
      container.appendChild(el);
    });
    fg.appendChild(container);
    document.getElementById('raw').textContent = JSON.stringify(d, null, 2);
  }catch(e){ alert('Error: '+e.message); }
});
