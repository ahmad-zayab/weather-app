function User() {
  const nameInput = document.getElementById("userName");
  const city = nameInput.value;

  const apiKey = "1972e28b70cf290bbb0a8b2e3626655f";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then(data => {
      document.getElementById("output").textContent =
        `City: ${data.name}
        Temperature: ${data.main.temp} °C
        Weather: ${data.weather[0].description}`;
    })
    .catch(err => {
      document.getElementById("output").textContent = err.message;
    });
    fetch(url)
  .then(res => res.json())
  .then(data => {
    const iconCode = data.weather[1].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("weather-icon").src = iconUrl;
    document.getElementById("weather-icon").style.display = "block";
  });

}
