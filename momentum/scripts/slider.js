const sliderButtons = document.querySelectorAll('.slider-skip');
const imgContainer = document.querySelector('.images');
let allImgContainers = document.querySelectorAll('.img-container');

const resolutions = ['low', 'medium', 'high'];

window.localStorage.setItem('resolution', resolutions[2]);

let currResolution = window.localStorage.getItem('resolution');
let currDayPart = window.localStorage.getItem('dayPart');

let imgNumFirst, imgNumSecond, imgNumFourth, imgNumFifth;
let imgNumThird = Math.floor(Math.random() * 20 + 1);

const imagePath = imgNumber =>
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${currDayPart}/${currResolution}/${imgNumber}.webp`;

function shiftImgNum(num) {
  imgNumFirst = num - 2 < 1 ? 20 + num - 2 : num - 2;
  imgNumSecond = num - 1 < 1 ? 20 + num - 1 : num - 1;
  imgNumThird = num < 1 ? 20 : num > 20 ? 1 : num;
  imgNumFourth = num + 1 > 20 ? num + 1 - 20 : num + 1;
  imgNumFifth = num + 2 > 20 ? num + 2 - 20 : num + 2;
}

const createElement = num => {
  const element = document.createElement('div');
  element.classList.add('img-container');
  element.style.background = `center / cover url(${imagePath(num)})`;
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
  allImgContainers[0].style.background = `center / cover url(${imagePath(imgNumFirst)})`;
  allImgContainers[1].style.background = `center / cover url(${imagePath(imgNumSecond)})`;
  allImgContainers[2].style.background = `center / cover url(${imagePath(imgNumThird)})`;
  allImgContainers[3].style.background = `center / cover url(${imagePath(imgNumFourth)})`;
  allImgContainers[4].style.background = `center / cover url(${imagePath(imgNumFifth)})`;
};

function sliderHandler() {
  if (this.classList.contains('prev')) getSliderPrev();
  if (this.classList.contains('next')) getSliderNext();
}

shiftImgNum(imgNumThird);
setImages();

sliderButtons.forEach(el => el.addEventListener('click', sliderHandler));
