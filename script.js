const wtForm = document.getElementById("wt-form");
wtForm.addEventListener("change", (e) => {
  const fDays = wtForm.elements["f-days"].value;
  const fLat = wtForm.elements["f-lati"].value;
  const fLong = wtForm.elements["f-long"].value;
  e.preventDefault();
  getWeather(fLat, fLong, fDays).then((data) => {
    renderWeather(data);
  });
});

wtForm.elements["f-loca"].addEventListener("click", (e) => {
  e.preventDefault();
  getLocation(wtForm.elements["f-lati"], wtForm.elements["f-long"]);
});

const initialize = () => {
  wtForm.elements["f-date"].value = getTime();
};
initialize();

const renderWeather = (data) => {
  renderCurrent(data);
  renderForecast(data);
};

const wtCurrent1 = document.getElementById("wt-current-1");
const renderCurrent = (data) => {
  for (const param of Object.keys(data.current)) {
    const el = wtCurrent1.querySelector(`#wt-${param}`);
    if (!el) continue;
    if (el.id === "wt-wind_direction_10m")
      el.style.transform = `rotate(${data.current[param]}deg)`;
    else el.textContent = data.current[param] + data.current_units[param];
  }
};

const wtForecast = document.getElementById("wt-forecast");
const renderForecast = (data) => {
  wtForecast.innerHTML = "";
  for (let i = 0; i < wtForm.elements["f-days"].value; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 24; j++) {
      const td = document.createElement("td");
      td.innerHTML = `
        <div class="card">
            <header class="card-header">
                <p class="card-header-title"><time datetime="${
                  data.hourly.time[i * 24 + j]
                }">${data.hourly.time[i * 24 + j]}</time></p>
            </header>
            <div class="card-content">
                <div class="content">
                    <div class="icon-text">
                        <span class="icon"><i class="fas fa-temperature-low"></i></span>
                        <span id="wt-temperature_2m">${
                          data.hourly.temperature_2m[i * 24 + j]
                        }°C</span>
                    </div>
                    <div class="icon-text">
                        <span class="icon"><i class="fas fa-cloud-showers-heavy"></i></span>
                        <span id="wt-precipitation_probability">${
                          data.hourly.precipitation_probability[i * 24 + j]
                        }%</span>
                    </div>
                </div>
            </div>
        </div>
      `;
      tr.appendChild(td);
    }

    wtForecast.appendChild(tr);
  }
};
function getWeatherIcon(weather) {
  const icons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Smoke: "🌫️",
    Haze: "🌫️",
    Dust: "🌫️",
    Fog: "🌫️",
    Sand: "🌫️",
    Ash: "🌫️",
    Squall: "💨",
    Tornado: "🌪️",
  };
  return icons[weather] || "🌤️";
}
