const sliderButtons = document.querySelectorAll('.slider-skip');
const imgContainer = document.querySelector('.images');
let allImgContainers = document.querySelectorAll('.img-container');

const resolutions = ['low', 'medium', 'high'];

window.localStorage.setItem('resolution', resolutions[2]);

let currResolution = window.localStorage.getItem('resolution');
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

function shiftImgNum(num) {
  imgNumFirst = num - 2 < 0 ? 19 + num - 1 : num - 2;
  imgNumSecond = num - 1 < 0 ? 19 + num : num - 1;
  imgNumThird = num < 0 ? 19 : num > 19 ? 0 : num;
  imgNumFourth = num + 1 > 19 ? num - 19 : num + 1;
  imgNumFifth = num + 2 > 19 ? num + 1 - 19 : num + 2;
  // console.log({ imgNumFirst, imgNumSecond, imgNumThird, imgNumFourth, imgNumFifth });
}

const createElement = num => {
  const element = document.createElement('div');
  element.classList.add('img-container');
  element.style.background = `center / cover url(${gitImages[num]})`;
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
  url(${gitImages[imgNumFirst]})`;
  allImgContainers[1].style.background = `center / cover
   url(${gitImages[imgNumSecond]})`;
  allImgContainers[2].style.background = `center / cover
   url(${gitImages[imgNumThird]})`;
  allImgContainers[3].style.background = `center / cover
   url(${gitImages[imgNumFourth]})`;
  allImgContainers[4].style.background = `center / cover
   url(${gitImages[imgNumFifth]})`;
};

function sliderHandler() {
  if (this.classList.contains('prev')) getSliderPrev();
  if (this.classList.contains('next')) getSliderNext();
}

sliderButtons.forEach(el => el.addEventListener('click', sliderHandler));
window.addEventListener('load', () => {
  shiftImgNum(imgNumThird);
  setImages();
});
