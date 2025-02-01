const mapContainer = $("#map-container");
let countryP = $(".country");
let idP = $(".temp_c");
let latP = $("#lat");
let lonP = $("#lon");
let nameP = $(".name");
let regionP = $(".region");
let urlP = $(".url");
let humidity = $(".humidity");
let tz_id = $(".tz_id");
let wind_kph = $(".wind_kph");
let img = document.getElementById("weatherIcon");
const apiKey = "4a758dd1aed04dc3950175920231609";

var map = L.map('map').setView([0, 0], 13);

var marker;

getLocation();

// Dark Mode
function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

// Geolocation and Weather Data
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  fetchWeatherData(latitude + "," + longitude);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  marker = L.marker([latitude, longitude]).addTo(map);
  marker.setLatLng([latitude, longitude]).update();
  map.setView([latitude, longitude]);
}

// Handle Weather Search
function handleSearch() {
  const location = document.getElementById("location-input").value;
  fetchWeatherData(location);
}
document.getElementById("search-button").addEventListener("click", handleSearch);

// Fetch Weather Data
function fetchWeatherData(location) {
  $.ajax({
    method: "GET",
    url: `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`,
    success: ({ location, current }) => {
      countryP.text(location.country);
      idP.text(current.temp_c.toLocaleString(undefined, { style: "unit", unit: "celsius" }));
      latP.text(location.lat);
      lonP.text(location.lon);
      nameP.text(location.name);
      regionP.text(location.region);
      urlP.text(current.condition.text);
      humidity.text(current.humidity);
      tz_id.text(location.tz_id);
      wind_kph.text(current.wind_kph + "kph");
      img.src = current.condition.icon;

      marker.setLatLng([location.lat, location.lon]).update();
      map.setView([location.lat, location.lon]);
    }
  });
}

// Update Local Time
function updateLocalTime() {
  const localTimeElement = document.getElementById("local-time");
  const now = new Date();
  const localTimeString = now.toLocaleTimeString();
  localTimeElement.textContent = `${localTimeString}`;
}

updateLocalTime();
setInterval(updateLocalTime, 1000);
