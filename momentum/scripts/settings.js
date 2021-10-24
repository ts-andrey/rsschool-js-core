import { getWeather } from './weather.js';
import { getQuotes } from './quote.js';

const setIcond = document.querySelector('.settings-icon');
const settingsMenu = document.querySelector('.settings-menu');
let languageOptions = document.querySelectorAll('.language');
let picSrcOptions = document.querySelectorAll('.img-storage');
let imageThemeAPIOption = document.querySelector('.img-themes');
let showOptions = document.querySelectorAll('input[name="show"]');

const langWrapper = document.querySelector('.lang-option');
const imgWrapper = document.querySelector('.img-storage-option');
const imgThemeWrapper = document.querySelector('.img-theme-option');
const showWrapper = document.querySelector('.show-option');

let language = window.localStorage.getItem('language');
if (language === 'eng') languageOptions[0].checked = true;
else languageOptions[1].checked = true;

const langTextEng = ['Choose language:', 'English', 'Russian'];
const langTextRu = ['Выберите язык:', 'Английский', 'Русский'];

const ImgTextEng = ['Choose picture source:'];
const ImgTextRu = ['Выберите источник изображений:'];

const ImgThemeTextEng = ['Image themes for API source:', 'Choose image theme', 'Nature', 'Animals'];
const ImgThemeTextRu = ['Тематика изображений для API:', 'Выберите тематику', 'Природа', 'Животные'];

const showTextEng = ['Choose what to show:', 'Playlist', 'Weather', 'Time', 'Date', 'Greeting', 'Quotes'];
const showTextRu = ['Выберите что отображать:', 'Плэйлист', 'Погода', 'Время', 'Дата', 'Приветствие', 'Цитаты'];

function translateSettings() {
  language = window.localStorage.getItem('language');

  langWrapper.querySelector('p').textContent = language === 'eng' ? langTextEng[0] : langTextRu[0];
  const langWrapperLables = langWrapper.querySelectorAll('label');
  langWrapperLables[0].textContent = language === 'eng' ? langTextEng[1] : langTextRu[1];
  langWrapperLables[1].textContent = language === 'eng' ? langTextEng[2] : langTextRu[2];

  imgWrapper.querySelector('p').textContent = language === 'eng' ? ImgTextEng[0] : ImgTextRu[0];

  imgThemeWrapper.querySelector('p').textContent = language === 'eng' ? ImgThemeTextEng[0] : ImgThemeTextRu[0];

  const imgThemeOptions = imgThemeWrapper.querySelectorAll('option');

  imgThemeOptions[0].textContent = language === 'eng' ? ImgThemeTextEng[1] : ImgThemeTextRu[1];
  imgThemeOptions[1].textContent = language === 'eng' ? ImgThemeTextEng[2] : ImgThemeTextRu[2];
  imgThemeOptions[2].textContent = language === 'eng' ? ImgThemeTextEng[3] : ImgThemeTextRu[3];

  showWrapper.querySelector('p').textContent = language === 'eng' ? showTextEng[0] : showTextRu[0];
  const showWrapperLables = showWrapper.querySelectorAll('label');
  showWrapperLables[0].textContent = language === 'eng' ? showTextEng[1] : showTextRu[1];
  showWrapperLables[1].textContent = language === 'eng' ? showTextEng[2] : showTextRu[2];
  showWrapperLables[2].textContent = language === 'eng' ? showTextEng[3] : showTextRu[3];
  showWrapperLables[3].textContent = language === 'eng' ? showTextEng[4] : showTextRu[4];
  showWrapperLables[4].textContent = language === 'eng' ? showTextEng[5] : showTextRu[5];
  showWrapperLables[5].textContent = language === 'eng' ? showTextEng[6] : showTextRu[6];
}

function languageHandler() {
  console.log(this.value);
  window.localStorage.setItem('language', this.value);
  getWeather();
  getQuotes();
  translateSettings();
}

function showMenuHandler() {
  settingsMenu.classList.toggle('shown');
}

translateSettings();

setIcond.addEventListener('click', showMenuHandler);

languageOptions.forEach(el => {
  el.addEventListener('change', languageHandler);
});
