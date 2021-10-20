const sliderButtons = document.querySelectorAll('.slider-skip');
const imgContainer = document.querySelector('.images');
let allImgContainers = document.querySelectorAll('.img-container');

const resolutions = ['low', 'medium', 'high'];
const dayParts = ['morning', 'afternoon', 'evening', 'night'];

window.localStorage.setItem('resolution', resolutions[2]);
window.localStorage.setItem('dayPart', dayParts[2]);

let currResolution = window.localStorage.getItem('resolution');
let currDayPart = window.localStorage.getItem('dayPart');

let imgNumFirst;
let imgNumSecond;
let imgNumThird = Math.floor(Math.random() * 20 + 1);
let imgNumFourth;
let imgNumFifth;

const imagePath = (partOfDay, resolution, imgNumber) =>
  `https://raw.githubusercontent.com/ts-andrey/momentum-images/main/images/${partOfDay}/${resolution}/${imgNumber}.webp`;

function shiftImgNum(num) {
  imgNumFirst = num - 2 < 1 ? 20 + num - 2 : num - 2;
  imgNumSecond = num - 1 < 1 ? 20 + num - 1 : num - 1;
  imgNumThird = num < 1 ? 20 : num > 20 ? 1 : num;
  imgNumFourth = num + 1 > 20 ? num + 1 - 20 : num + 1;
  imgNumFifth = num + 2 > 20 ? num + 2 - 20 : num + 2;
}

const getElement = num => {
  const element = document.createElement('div');
  element.classList.add('img-container');
  element.style.background = `center / cover url(${imagePath(currDayPart, currResolution, num)})`;
  return element;
};

function setImages(side) {
  if (side === 'left') {
    shiftImgNum(--imgNumThird);
    imgContainer.insertAdjacentElement('afterbegin', getElement(imgNumFirst));
    allImgContainers = document.querySelectorAll('.img-container');
    imgContainer.removeChild(allImgContainers[5]);
    console.log(allImgContainers);
  } else if (side === 'right') {
    shiftImgNum(++imgNumThird);
    imgContainer.removeChild(allImgContainers[0]);
    imgContainer.insertAdjacentElement('beforeend', getElement(imgNumFifth));
    allImgContainers = document.querySelectorAll('.img-container');
  } else {
    allImgContainers[0].style.background = `center / cover url(${imagePath(currDayPart, currResolution, imgNumFirst)})`;
    allImgContainers[1].style.background = `center / cover url(${imagePath(
      currDayPart,
      currResolution,
      imgNumSecond
    )})`;
    allImgContainers[2].style.background = `center / cover url(${imagePath(currDayPart, currResolution, imgNumThird)})`;
    allImgContainers[3].style.background = `center / cover url(${imagePath(
      currDayPart,
      currResolution,
      imgNumFourth
    )})`;
    allImgContainers[4].style.background = `center / cover url(${imagePath(currDayPart, currResolution, imgNumFifth)})`;
  }
}

function sliderHandler() {
  if (this.classList.contains('prev')) setImages('left');
  if (this.classList.contains('next')) setImages('right');
}

shiftImgNum(imgNumThird);
setImages('');

sliderButtons.forEach(el => el.addEventListener('click', sliderHandler));
