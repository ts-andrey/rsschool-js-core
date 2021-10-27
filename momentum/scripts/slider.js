const sliderButtons = document.querySelectorAll('.slider-skip');
const imgContainer = document.querySelector('.images');
let allImgContainers = document.querySelectorAll('.img-container');

const resolutions = ['low', 'medium', 'high'];

let imgSettings = window.localStorage.getItem('imgSrc');
let imgTheme = window.localStorage.getItem('imgTheme');

checkScreenWidth();
let currResolution = window.localStorage.getItem('resolution');
let currDayPart;
let gitImages = [];
if (!window.localStorage.getItem('dayPart')) {
  let part = '';
  const hour = new Date().getHours();
  if (hour >= 1 && hour <= 6) part = 'night';
  if (hour >= 7 && hour <= 12) part = 'morning';
  if (hour >= 13 && hour <= 18) part = 'afternoon';
  if (hour >= 19 && hour <= 24) part = 'evening';
  currDayPart = part;
  window.localStorage.setItem('dayPart', part);
} else currDayPart = window.localStorage.getItem('dayPart');

let imgNumFirst, imgNumSecond, imgNumFourth, imgNumFifth;
let imgNumThird = Math.floor(Math.random() * 20);

for (let index = 1; index <= 20; index++) {
  const element = `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${index}.webp`;
  gitImages.push(element);
}

let unsplashImages = [];
let flickrImages = [];
let images = gitImages;

async function getGithubImgs() {
  gitImages = [];
  for (let index = 1; index <= 20; index++) {
    const element = `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${index}.webp`;
    gitImages.push(element);
  }
  images = gitImages;
  setImages();
}

async function getUnsplashImgs() {
  imgTheme = window.localStorage.getItem('imgTheme');
  const unsplashUrl = `https://api.unsplash.com/photos/random?orientation=landscape&count=20&query=${imgTheme}&client_id=6lkkvM8te0F3AHFgYrJTo1NUrX8xDxz0XzYVvgfSLQI`;
  const res = await fetch(unsplashUrl);
  const data = await res.json();

  await data.forEach(el => {
    unsplashImages.push(el.urls.regular);
  });
  images = unsplashImages;
  setImages();
}

async function getFlickrImgs() {
  imgTheme = window.localStorage.getItem('imgTheme');
  const flickrUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a3e35ed3238733a7a98765b7daef5af2&tags=${imgTheme}&per_page=30&page=9&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(flickrUrl);
  const data = await res.json();
  await data.photos.photo.forEach(el => {
    if (el.url_l) flickrImages.push(el.url_l);
  });
  images = flickrImages;
  setImages();
}

function checkScreenWidth() {
  if (document.body.offsetWidth > 1400) window.localStorage.setItem('resolution', resolutions[2]);
  else if (document.body.offsetWidth < 800) window.localStorage.setItem('resolution', resolutions[0]);
  else if (document.body.offsetWidth < 1400) window.localStorage.setItem('resolution', resolutions[1]);
}

function shiftImgNum(num) {
  imgNumFirst = num - 2 < 0 ? 19 + num - 1 : num - 2;
  imgNumSecond = num - 1 < 0 ? 19 + num : num - 1;
  imgNumThird = num < 0 ? 19 : num > 19 ? 0 : num;
  imgNumFourth = num + 1 > 19 ? num - 19 : num + 1;
  imgNumFifth = num + 2 > 19 ? num + 1 - 19 : num + 2;
}

const createElement = num => {
  const element = document.createElement('div');
  element.classList.add('img-container');
  element.style.background = `center / cover url(${images[num]})`;
  return element;
};

const getSliderPrev = () => {
  shiftImgNum(--imgNumThird);
  imgContainer.insertAdjacentElement('afterbegin', createElement(imgNumFirst));
  allImgContainers = document.querySelectorAll('.img-container');
  imgContainer.removeChild(allImgContainers[5]);
};

const getSliderNext = () => {
  shiftImgNum(++imgNumThird);
  imgContainer.removeChild(allImgContainers[0]);
  imgContainer.insertAdjacentElement('beforeend', createElement(imgNumFifth));
  allImgContainers = document.querySelectorAll('.img-container');
};

const setImages = () => {
  allImgContainers[0].style.background = `center / cover 
  url(${images[imgNumFirst]})`;
  allImgContainers[1].style.background = `center / cover
   url(${images[imgNumSecond]})`;
  allImgContainers[2].style.background = `center / cover
   url(${images[imgNumThird]})`;
  allImgContainers[3].style.background = `center / cover
   url(${images[imgNumFourth]})`;
  allImgContainers[4].style.background = `center / cover
   url(${images[imgNumFifth]})`;
};

function sliderHandler() {
  if (this.classList.contains('prev')) getSliderPrev();
  if (this.classList.contains('next')) getSliderNext();
}

function slider() {
  checkScreenWidth();
  images = [];
  flickrImages = [];
  unsplashImages = [];
  imgNumThird = Math.floor(Math.random() * 20);
  shiftImgNum(imgNumThird);
  imgSettings = window.localStorage.getItem('imgSrc');
  if (imgSettings === 'github') getGithubImgs();
  else if (imgSettings === 'unsplash') getUnsplashImgs();
  else if (imgSettings === 'flickr') getFlickrImgs();
  sliderButtons.forEach(el => el.addEventListener('click', sliderHandler));
  window.addEventListener('load', () => {
    shiftImgNum(imgNumThird);
  });
}

export { slider };
