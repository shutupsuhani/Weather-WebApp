const apiKey = "3e3b2093a482cb508ff412d608a61b3c"; // Your OpenWeatherMap API Key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const errorMsg = document.getElementById("errorMsg");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        errorMsg.textContent = "Please enter a city name!";
        return;
    }

    fetchWeather(city);
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => updateUI(data))
        .catch(error => {
            errorMsg.textContent = error.message;
        });
}

function updateUI(data) {
    errorMsg.textContent = "";

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("weatherCondition").textContent = data.weather[0].description;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    document.getElementById("windSpeed").textContent = `${data.wind.speed} km/h`;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("pressure").textContent = `${data.main.pressure} mb`;
    document.getElementById("rainChance").textContent = data.clouds.all ? `${data.clouds.all}%` : "0%";
}
