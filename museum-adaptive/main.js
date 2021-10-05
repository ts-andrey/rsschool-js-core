const videoProgressBar = document.querySelectorAll('.bar');
const imgInsertPlace = document.querySelector('.insert-gallery');
const buttonSubmit = document.querySelector('.submit');
const formClose = document.querySelector('.close');
const formOpen = document.querySelector('.btn-buy');
const form = document.querySelector('.form');
const galleryPictures = document.querySelectorAll('.insert-gallery > li>img');

const burgerMenu = document.querySelector('.burger-menu');
const closeBurger = document.querySelector('.adaptive-menu > .close');
const adaptiveMenu = document.querySelector('.welcome > aside');

// console.log(adaptiveMenu);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomArray() {
  const imgsSmall = shuffle([1, 4, 10, 11, 12, 13, 15]);
  const imgsBig = shuffle([2, 3, 5, 6, 7, 8, 9, 14]);
  const imgs = [];
  for (let i = 0; i < imgsBig.length; i++) {
    if (i - 1 < 0) {
    } else {
      imgs.push(imgsSmall[i - 1]);
    }
    imgs.push(imgsBig[i]);
  }
  return imgs;
}

function insertGallery() {
  const randomArray = getRandomArray();
  randomArray.forEach((el, index) => {
    galleryPictures[index].setAttribute('src', `assets/img/galery/gallery${el}.jpg`);
    galleryPictures[index].setAttribute('alt', `gallery picture #${el}`);
  });
}

function progressBarHandler() {
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${this.value}%, #fff ${this.value}%, #fff 100%)`;
}

function submitHandler(ev) {
  ev.preventDefault();
}

function openFormHandler() {
  form.style.marginLeft = '0';
}
function closeFormHandler() {
  form.style.marginLeft = '-150%';
}
function adaptiveMenuHandler(ev) {
  if (this === burgerMenu) {
    burgerMenu.style.display = 'none';
    closeBurger.style.display = 'inline-block';
    adaptiveMenu.style.marginLeft = '0';
  } else {
    burgerMenu.style.display = 'inline-block';
    closeBurger.style.display = 'none';
    adaptiveMenu.style.marginLeft = '-100%';
  }
}

videoProgressBar.forEach(el => {
  el.addEventListener('input', progressBarHandler);
});

window.addEventListener('load', insertGallery);

buttonSubmit.addEventListener('click', submitHandler);

formOpen.addEventListener('click', openFormHandler);
formClose.addEventListener('click', closeFormHandler);

form.addEventListener(
  'click',
  function (event) {
    if (event.target.matches('.close') || !event.target.closest('form')) closeFormHandler(event);
  },
  false
);
burgerMenu.addEventListener('click', adaptiveMenuHandler);
closeBurger.addEventListener('click', adaptiveMenuHandler);

const selfEvaluation = [
  ['Вёрстка соответствует макету. Ширина экрана 1024px', '+40'],
  ['Вёрстка соответствует макету. Ширина экрана 768px', '+40'],
  ['Вёрстка соответствует макету. Ширина экрана 420px', '+40'],
  ['Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки', '+6'],
  ['Совмещается адаптивная и респонсивная (резиновая) вёрстка', '+14'],
  ['На ширине экрана 1024рх и меньше реализовано адаптивное меню', '+12'],
  ['Оптимизация скорости загрузки страницы', '+8'],
  ['Общее количество баллов самооценки', 160],
];

console.table(selfEvaluation);
