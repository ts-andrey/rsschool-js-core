const pagePosition = document.querySelector('.position-current');
const welcomeSliderPages = document.querySelectorAll('.welcome .pages li');
const welcomeArrows = document.querySelectorAll('.arrows li');

const welcomeImageContainer = document.querySelector('.welcome .img');
const welcomeImage = document.querySelector('.welcome .img img');

const welcomePictures = ['./assets/img/welcome-slider/1.webp'];

console.log(pagePosition.innerText);

let WELCOME_PAIGE = 1;
let WELCOME_IMAGE_DRAGGING = false;
let WELCOME_IMAGE_DRAGGING_FROM;

function changePicture(number) {
  WELCOME_PAIGE = number;
  setTimeout(() => {
    welcomeImage.setAttribute('src', `./assets/img/welcome-slider/${WELCOME_PAIGE}.webp`);
    welcomeImage.style.transform = 'scale(1)';
  }, 150);
  removeActiveState();
  setActiveState(WELCOME_PAIGE);
  pagePosition.innerText = `0${WELCOME_PAIGE}`;
  welcomeImage.style.transform = 'scale(0)';
}

function removeActiveState() {
  welcomeSliderPages.forEach(el => {
    el.childNodes[0].classList.remove('active');
  });
}
function setActiveState(pageNumber) {
  welcomeSliderPages[pageNumber - 1].childNodes[0].classList.add('active');
}

function pageClickHandler() {
  WELCOME_PAIGE = Number(this.getAttribute('data-num'));
  changePicture(WELCOME_PAIGE);
}

function changePageNumber(next) {
  if (WELCOME_PAIGE === 1 && next === 'left') {
    WELCOME_PAIGE = 5;
  } else if (WELCOME_PAIGE === 5 && next === 'right') {
    WELCOME_PAIGE = 1;
  } else {
    if (next === 'right') {
      WELCOME_PAIGE += 1;
    } else {
      WELCOME_PAIGE -= 1;
    }
  }
}

function arrowClickHandler() {
  const arrow = this.getAttribute('data-side');
  welcomeSliderPages.forEach((el, index) => {
    if (el.childNodes[0].classList.contains('active')) return (WELCOME_PAIGE = ++index);
  });
  changePageNumber(arrow);
  changePicture(WELCOME_PAIGE);
}

function swipeHandler(next, el) {
  changePageNumber(next);
  changePicture(WELCOME_PAIGE);
  WELCOME_IMAGE_DRAGGING = false;
}

welcomeSliderPages.forEach(el => {
  el.addEventListener('click', pageClickHandler);
});
welcomeArrows.forEach(el => {
  el.addEventListener('click', arrowClickHandler);
});

welcomeImage.addEventListener('mousedown', ev => {
  WELCOME_IMAGE_DRAGGING_FROM = ev.clientX;
  WELCOME_IMAGE_DRAGGING = true;
});
welcomeImage.addEventListener('mousemove', ev => {
  if (WELCOME_IMAGE_DRAGGING) {
    if (ev.clientX / WELCOME_IMAGE_DRAGGING_FROM < 0.85) {
      swipeHandler('left', this);
    } else if (ev.clientX / WELCOME_IMAGE_DRAGGING_FROM > 1.15) {
      swipeHandler('right', this);
    }
  } else return;
});
