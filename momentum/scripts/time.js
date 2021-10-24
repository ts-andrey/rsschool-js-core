const greetingTime = document.querySelector('.greet .day-time');
const userName = document.querySelector('.user-name');
const time = document.querySelector('.time');
const date = document.querySelector('.date');

const dayPartsEng = ['morning', 'afternoon', 'evening', 'night'];
const dayPartsRu = ['утро', 'день', 'вечер', 'ночи'];

function showTime() {
  const newDate = new Date();
  const storage = window.localStorage;
  let lang = storage.getItem('language');
  if (lang === 'eng') patrOfDay = dayPartsEng;
  else patrOfDay = dayPartsRu;
  const curTime = newDate.toLocaleTimeString(`${storage.getItem('language')}`, { hour12: false });
  const curDate = newDate.toLocaleDateString(`${storage.getItem('language')}`, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
  date.textContent = curDate;
  time.textContent = curTime;
  const curHour = newDate.getHours();
  greetingTime.textContent = `Good ${storage.getItem('dayPart')}, `;
  if (curHour >= 1 && curHour <= 6) {
    storage.setItem('dayPart', dayPartsEng[3]);
    if (lang === 'ru') greetingTime.textContent = `Доброй ${dayPartsRu[3]}, `;
  } else if (curHour >= 7 && curHour <= 12) {
    storage.setItem('dayPart', dayPartsEng[0]);
    if (lang === 'ru') greetingTime.textContent = `Доброе ${dayPartsRu[0]}, `;
  } else if (curHour >= 13 && curHour <= 18) {
    storage.setItem('dayPart', dayPartsEng[1]);
    if (lang === 'ru') greetingTime.textContent = `Добрый ${dayPartsRu[1]}, `;
  } else if (curHour >= 19 && curHour <= 24) {
    storage.setItem('dayPart', dayPartsEng[2]);
    if (lang === 'ru') greetingTime.textContent = `Добрый ${dayPartsRu[2]}, `;
  }

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
    else if (storedName.length > 7) elWidth = `${storedName.length * 0.85}ch`;
    else elWidth = `${storedName.length}ch`;
    userName.style.width = elWidth;
  } else if (!storedName) {
    userName.style.width = '20rem';
    userName.style.fontSize = '70%';
  }
}

userName.addEventListener('input', nameHandler);

window.addEventListener('load', nameHandler);
