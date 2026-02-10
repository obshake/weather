const apiKey = "2d0d6aad1cee96fb3937e939dadbaf1b";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      Math.round(data.wind.speed) + `<small>km/h</small>`;

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Snow") {
      weatherIcon.src = "images/snow.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

//forecast

const forecastUrl =
  "https://api.openweathermap.org/data/2.5/forecast/daily?&units=metric&q=";
const forecastWeatherIcon = document.querySelector(".forecast-weather-icon");

async function checkforecast(city) {
  const forcastResponse = await fetch(forecastUrl + city + `&appid=${apiKey}`);
  var forecastData = await forcastResponse.json();

  const caraouselContainer = document.querySelector(".caraousel-container");
  caraouselContainer.innerHTML = ""; // Clear existing content

  forecastData.list.forEach((element) => {
    const date = new Date(element.dt * 1000);
    const dateString = date.toDateString();
    const temp = Math.round(element.temp.day) + "°C";
    const icon = element.weather[0].main.toLocaleLowerCase();

    const forecastInfo = document.createElement("div");
    forecastInfo.classList.add("caraousel-card");
    forecastInfo.innerHTML = `
      <img src="images/${icon}.png" class="forecast-weather-icon">
      <h1 class="forecast-temp">${temp}</h1>
      <h2 class="forecast-date">${dateString}</h2>
    `;

    caraouselContainer.appendChild(forecastInfo);
  });
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
  checkforecast(searchBox.value);
});

//For Auto complete

let cities = [
  "Kolkata",
  "Delhi",
  "Chennai",
  "Bangalore",
  "Tokyo",
  "New York City",
  "London",
  "Paris",
  "Hong Kong",
  "Los Angeles",
  "Singapore",
  "Chicago",
  "Dubai",
  "Beijing",
  "Shanghai",
  "Sydney",
  "San Francisco",
  "Toronto",
  "Berlin",
  "Seoul",
  "Mumbai",
  "Moscow",
  "Istanbul",
  "Bangkok",
  "Miami",
  "Madrid",
  "Vancouver",
  "Rome",
  "Mexico City",
  "Kuala Lumpur",
  "Buenos Aires",
  "Sao Paulo",
  "Amsterdam",
  "Osaka",
  "Houston",
  "Jakarta",
  "Philadelphia",
  "Dallas",
  "Barcelona",
  "Munich",
  "Abu Dhabi",
  "Edinburgh",
  "Milan",
  "San Diego",
  "Vienna",
  "Zurich",
  "Stockholm",
  "Atlanta",
  "Copenhagen",
  "Dublin",
  "Warsaw",
  "Prague",
  "Montreal",
  "Budapest",
  "Lisbon",
  "Brussels",
  "Helsinki",
  "Honolulu",
  "Geneva",
  "Shenzhen",
  "Dublin",
  "Bogota",
  "Marrakech",
  "Panama City",
  "Cairo",
  "Lima",
  "Kiev",
  "Nairobi",
  "Manila",
  "Brisbane",
  "Perth",
  "Auckland",
  "Wellington",
  "Christchurch",
  "Doha",
  "Abu Dhabi",
  "Jeddah",
  "Amman",
  "Riyadh",
  "Kuwait City",
  "Dammam",
  "Minsk",
  "Bratislava",
  "Ljubljana",
  "Reykjavik",
  "Tallinn",
  "Vilnius",
  "Riga",
  "Skopje",
  "Belgrade",
  "Sofia",
  "Bucharest",
  "Budapest",
  "Zagreb"
];

const resultBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");

inputBox.onkeyup = function () {
  let result = [];
  let input = inputBox.value;
  if (input.length) {
    result = cities.filter((keyword) => {
      return keyword.toLocaleLowerCase().includes(input.toLocaleLowerCase());
    });
    console.log(result);
  }
  display(result);
};

function display(result) {
  const content = result.map((list) => {
    return "<li onclick = selectInput(this) >" + list + "</li>";
  });

  resultBox.innerHTML = "<ul>" + content.join(" ") + "</ul>";
}
function selectInput(list) {
  inputBox.value = list.innerHTML;
  resultBox.innerHTML = "";
  checkWeather(list.innerHTML);
}
