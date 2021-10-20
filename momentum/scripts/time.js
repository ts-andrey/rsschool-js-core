const dayTime = window.localStorage.getItem('dayPart');
const greetingTime = document.querySelector('.greet .day-time');
const userName = document.querySelector('.user-name');
const time = document.querySelector('.time');
const date = document.querySelector('.date');

console.log(date);

function setTime() {
  
}

function nameHandler(ev) {
  if (ev.type === 'input') window.localStorage.setItem('userName', this.value);
  if (ev.type === 'load') userName.value = window.localStorage.getItem('userName');
}

greetingTime.textContent = `${dayTime}, `;

userName.addEventListener('input', nameHandler);

window.addEventListener('load', nameHandler);
