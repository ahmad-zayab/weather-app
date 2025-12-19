const API_KEY = "1972e28b70cf290bbb0a8b2e3626655f";
async function User() {
  const city = document.getElementById("userName").value.trim();
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    const now = Date.now();
    let idx = data.list.reduce((closest, item, i, arr) =>
      Math.abs(item.dt * 1000 - now) < Math.abs(arr[closest].dt * 1000 - now) ? i : closest, 0);
    const cards = [0, 1, 2].map(offset => {
      const i = idx + offset;
      if (i < 0 || i >= data.list.length) return "";
      const item = data.list[i];
      const label = offset === 0 ? "Now" :
        offset === 1 ? "In 3 hours" :
        "In 6 hours";
      return `
        <div class="forecast-card">
          <div class="time">${label}</div>
          <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="">
          <div class="temp">${item.main.temp.toFixed(1)} °C</div>
          <div class="desc">${item.weather[0].description}</div>
        </div>`;
    }).join('');
    document.getElementById("forecast-flex").innerHTML = cards;
    document.getElementById("output").textContent = `City: ${data.city.name}, ${data.city.country}`;
  } catch (err) {
    document.getElementById("output").textContent = err.message;
    document.getElementById("forecast-flex").innerHTML = "";
  }
}
