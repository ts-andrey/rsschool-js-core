const weather = document.querySelector('.weather');
const weatherCity = document.querySelector('.weather-city');
const weatherIcon = document.querySelector('.weather-icon');
const weatherCurrent = document.querySelector('.weather-temp .current');
const weatherFeelsLike = document.querySelector('.weather-temp .feels-like');
const weatherClouds = document.querySelector('.weather-cloud');
const weatherWind = document.querySelector('.weather-wind');
const weatherHumidity = document.querySelector('.weather-humidity');

if (!window.localStorage.getItem('weatherCity')) window.localStorage.setItem('weatherCity', 'Minsk');
if (!window.localStorage.getItem('language')) window.localStorage.setItem('language', 'eng');

const apiKey = '3a027a2e4377124ad65147909257e334';
let cityName = window.localStorage.getItem('weatherCity');
let lang = window.localStorage.getItem('language');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${lang}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  weatherIcon.className = `weather-icon owf`;
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  weatherCurrent.textContent = `temperature: ${Math.floor(data.main.temp)}°C`;
  weatherFeelsLike.textContent = `feels like: ${Math.floor(data.main.feels_like)}°C`;
  weatherClouds.textContent = `cloudiness: ${data.weather[0].description}`;
  if (data.wind.gust)
    weatherWind.textContent = `wind speed ${Math.floor(data.wind.speed)} - ${Math.floor(data.wind.gust)} (m/s)`;
  else weatherWind.textContent = `wind speed ${Math.floor(data.wind.speed)} (m/s)`;
  weatherHumidity.textContent = `humidity: ${data.main.humidity}%`;
}
getWeather();

function weatherHandler() {
  cityName = this.value;
  window.localStorage.setItem('weatherCity', this.value);
  getWeather();
}

window.addEventListener('load', () => (weatherCity.value = window.localStorage.getItem('weatherCity')));
weatherCity.addEventListener('change', weatherHandler);
