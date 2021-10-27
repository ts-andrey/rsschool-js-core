const weatherCity = document.querySelector('.weather-city');
const weatherIcon = document.querySelector('.weather-icon');
const weatherCurrent = document.querySelector('.weather-temp .current');
const weatherFeelsLike = document.querySelector('.weather-temp .feels-like');
const weatherClouds = document.querySelector('.weather-cloud');
const weatherWind = document.querySelector('.weather-wind');
const weatherHumidity = document.querySelector('.weather-humidity');

if (!window.localStorage.getItem('weatherCity')) {
  if (window.localStorage.getItem('language') === 'eng') window.localStorage.setItem('weatherCity', 'Minsk');
  else window.localStorage.setItem('weatherCity', 'Минск');
}
if (!window.localStorage.getItem('language')) window.localStorage.setItem('language', 'eng');

const apiKey = '3a027a2e4377124ad65147909257e334';
let cityName = window.localStorage.getItem('weatherCity');

const weatherInfoDescrEng = ['temperature:', 'feels like:', 'cloudiness:', 'wind speed: ', 'humidity:'];
const weatherInfoDescrRu = ['температура:', 'ощущается как:', 'облачность:', 'скорость ветра: ', 'влажность:'];
let descriptions = weatherInfoDescrEng;

async function getWeather() {
  const language = window.localStorage.getItem('language');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${language}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  if (response.ok) {
    weatherCurrent.classList.remove('error');
    weatherFeelsLike.classList.remove('error');
    weatherClouds.classList.remove('error');
    weatherWind.classList.remove('error');
    const data = await response.json();

    weatherIcon.className = `weather-icon owf`;
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    if (language === 'eng') descriptions = weatherInfoDescrEng;
    else descriptions = weatherInfoDescrRu;
    weatherCurrent.textContent = `${descriptions[0]} ${Math.floor(data.main.temp)}°C`;
    weatherFeelsLike.textContent = `${descriptions[1]} ${Math.floor(data.main.feels_like)}°C`;
    weatherClouds.textContent = `${descriptions[2]} ${data.weather[0].description}`;
    if (data.wind.gust)
      weatherWind.textContent = `${descriptions[3]} ${Math.floor(data.wind.speed)} - ${Math.floor(
        data.wind.gust
      )} (m/s)`;
    else weatherWind.textContent = `${descriptions[3]} ${Math.floor(data.wind.speed)} (m/s)`;
    weatherHumidity.textContent = `${descriptions[4]} ${data.main.humidity}%`;
  } else {
    const language = window.localStorage.getItem('language');
    weatherCurrent.classList.add('error');
    weatherFeelsLike.classList.add('error');
    weatherClouds.classList.add('error');
    weatherWind.classList.add('error');
    weatherCurrent.textContent = language === 'eng' ? 'Error' : 'Ошибка';
    weatherFeelsLike.textContent = language === 'eng' ? 'Wrong city name' : 'Неверное название города';
    weatherClouds.textContent =
      language === 'eng' ? 'Please provide correct city name' : 'Пожалуйста, введите корректное имя города';
    weatherWind.textContent = language === 'eng' ? 'or try again later' : 'или попытайтесь еще раз позже';
    weatherIcon.className = '';
    weatherHumidity.textContent = '';
  }
}
getWeather();

function weatherHandler() {
  cityName = this.value;
  window.localStorage.setItem('weatherCity', this.value);
  getWeather();
}

window.addEventListener('load', () => (weatherCity.value = window.localStorage.getItem('weatherCity')));
weatherCity.addEventListener('change', weatherHandler);

export { getWeather };
