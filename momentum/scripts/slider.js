const sliderButtons = document.querySelectorAll('.slider-skip');
const imgContainer = document.querySelector('.images');
let allImgContainers = document.querySelectorAll('.img-container');

const resolutions = ['low', 'medium', 'high'];

let imgSettings = window.localStorage.getItem('imgSrc');
let imgTheme = window.localStorage.getItem('imgTheme');

window.localStorage.setItem('resolution', resolutions[2]);

let currResolution = window.localStorage.getItem('resolution');
if (!window.localStorage.getItem('dayPart')) window.localStorage.setItem('dayPart', 'morning');
let currDayPart = window.localStorage.getItem('dayPart');

let imgNumFirst, imgNumSecond, imgNumFourth, imgNumFifth;
let imgNumThird = Math.floor(Math.random() * 20);

// const gitImagePath = imgNumber =>
//   `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${imgNumber}.webp`;
const gitImages = [
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${1}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${2}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${3}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${4}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${5}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${6}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${7}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${8}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${9}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${10}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${11}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${12}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${13}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${14}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${15}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${16}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${17}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${18}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${19}.webp`,
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${20}.webp`,
];
let unsplashImages = [];
let flickrImages = [];
let images = gitImages;

async function getGithubImgs() {
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
