const forecastUrl =
  "https://api.openweathermap.org/data/2.5/forecast/daily?&units=metric&q=";
const forecastWeatherIcon = document.querySelector(".forecast-weather-icon");

async function checkforecast(city) {
  const forcastResponse = await fetch(forecastUrl + city + `&appid=${apiKey}`);
  var forecastData = await forcastResponse.json();
  document.querySelector(".forecast-temp").innerHTML =
    Math.round(forecastData.list[0].temp.day) + "°C";
}
