/* ************    W E L C O M E   S L I D E R     ************** */

const pagePosition = document.querySelector('.position-current');
const welcomeSliderPages = document.querySelectorAll('.welcome .pages li');
const welcomeArrows = document.querySelectorAll('.arrows li');

const welcomeImageContainer = document.querySelector('.welcome .img');
const welcomeImage = document.querySelector('.welcome .img img');
const imgDescription = document.querySelector('.slider-description-tooltip');

const welcomePictures = ['./assets/img/welcome-slider/1.webp'];

const sliderDescription = {
  1: 'The Mona Lisa is a half-length portrait painting by Italian artist Leonardo da Vinci. Considered an archetypal masterpiece of the Italian Renaissance, it has been described as "the best known, the most visited, the most written about, the most sung about, the most parodied work of art in the world".',
  2: 'Liberty Leading the People is a painting by Eugène Delacroix commemorating the July Revolution of 1830, which toppled King Charles X of France.',
  3: 'La Belle Ferronnière is a portrait of a lady, usually attributed to Leonardo da Vinci, in the Louvre. It is also known as Portrait of an Unknown Woman.',
  4: 'The Raft of the Medusa – originally titled Scène de Naufrage – is an oil painting of 1818–19 by the French Romantic painter and lithographer Théodore Géricault. Completed when the artist was 27, the work has become an icon of French Romanticism.',
  5: 'The Astronomer is a painting finished in about 1668 by the Dutch Golden Age painter Johannes Vermeer. It is in oil on canvas, 51 cm × 45 cm, and is on display at the Louvre, in Paris, France. ',
};

let WELCOME_PAIGE = 1;
let MOVE_RIGHT = true;
let WELCOME_IMAGE_DRAGGING = false;
let WELCOME_IMAGE_DRAGGING_FROM;

function changePicture(number) {
  WELCOME_PAIGE = number;
  setTimeout(() => {
    welcomeImage.classList = '';
    welcomeImage.setAttribute('src', `./assets/img/welcome-slider/${WELCOME_PAIGE}.webp`);
  }, 450);
  removeActiveState();
  setActiveState(WELCOME_PAIGE);
  pagePosition.innerText = `0${WELCOME_PAIGE}`;
  if ((WELCOME_PAIGE === 1 && !MOVE_RIGHT) || !MOVE_RIGHT) welcomeImage.classList.add('moveLeft');
  else if ((WELCOME_PAIGE === 5 && MOVE_RIGHT) || MOVE_RIGHT) welcomeImage.classList.add('moveRight');
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
  const number = Number(this.getAttribute('data-num'));
  if (WELCOME_PAIGE < number) MOVE_RIGHT = true;
  else MOVE_RIGHT = false;
  changePicture(number);
}

function changePageNumber(next) {
  if (WELCOME_PAIGE === 1 && next === 'left') {
    MOVE_RIGHT = false;
    WELCOME_PAIGE = 5;
  } else if (WELCOME_PAIGE === 5 && next === 'right') {
    WELCOME_PAIGE = 1;
    MOVE_RIGHT = true;
  } else {
    if (next === 'right') {
      MOVE_RIGHT = true;
      WELCOME_PAIGE += 1;
    } else {
      MOVE_RIGHT = false;
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

function swipeHandler(next) {
  changePageNumber(next);
  changePicture(WELCOME_PAIGE);
  WELCOME_IMAGE_DRAGGING = false;
}

function tooltipAddHandler() {
  imgDescription.innerHTML = sliderDescription[WELCOME_PAIGE];
  imgDescription.classList.add('arisen');
}
function tooltipRemoveHandler() {
  imgDescription.classList.remove('arisen');
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

welcomeImage.addEventListener('mouseover', tooltipAddHandler);
welcomeImage.addEventListener('mouseout', tooltipRemoveHandler);
