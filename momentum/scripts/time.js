const dayTime = window.localStorage.getItem('dayPart');
const greetingTime = document.querySelector('.greet .day-time');
const userName = document.querySelector('.user-name');
const time = document.querySelector('.time');
const date = document.querySelector('.date');

const dayParts = ['morning', 'afternoon', 'evening', 'night'];

function showTime() {
  const newDate = new Date();
  const curTime = newDate.toLocaleTimeString('ru-RU', { hour12: false });
  const curDate = newDate.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
  date.textContent = curDate;
  time.textContent = curTime;
  const curHour = newDate.getHours();
  if (curHour >= 1 && curHour <= 6) window.localStorage.setItem('dayPart', dayParts[3]);
  else if (curHour >= 7 && curHour <= 12) window.localStorage.setItem('dayPart', dayParts[0]);
  else if (curHour >= 13 && curHour <= 18) window.localStorage.setItem('dayPart', dayParts[1]);
  else if (curHour >= 19 && curHour <= 24) window.localStorage.setItem('dayPart', dayParts[2]);
  setTimeout(showTime, 1000);
}
showTime();

function nameHandler(ev) {
  if (ev.type === 'input') window.localStorage.setItem('userName', this.value);
  const storedName = window.localStorage.getItem('userName');
  if (ev.type === 'load') userName.value = storedName;
  if (storedName) {
    userName.style.fontSize = 'inherit';
    let elWidth;
    if (storedName.length < 5) elWidth = `${storedName.length * 1.3}ch`;
    else if (storedName.length > 7) elWidth = `${storedName.length * 0.8}ch`;
    else elWidth = `${storedName.length}ch`;
    userName.style.width = elWidth;
  } else if (!storedName) {
    userName.style.width = '20rem';
    userName.style.fontSize = '70%';
  }
}

greetingTime.textContent = `${dayTime}, `;

userName.addEventListener('input', nameHandler);

window.addEventListener('load', nameHandler);
