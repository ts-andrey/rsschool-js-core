const galleryPictures = document.querySelectorAll('.insert-gallery > li>img');
const pictureContainers = document.querySelectorAll('.insert-gallery > li');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function ariseHandler() {
  pictureContainers.forEach(el => {
    const itemHeight = el.offsetHeight;
    const itemOffset = el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
    const startPoint = 4;

    let animationStart = window.innerHeight - itemHeight / startPoint;
    if (itemHeight > window.innerHeight) {
      animationStart = window.innerHeight - window.innerHeight / startPoint;
    }

    if (pageYOffset > itemOffset - animationStart && pageYOffset < itemOffset + itemHeight) {
      el.childNodes[0].classList.add('shown');
    } else {
      el.childNodes[0].classList.remove('shown');
    }
  });
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
    galleryPictures[index].setAttribute('src', `assets/img/galery/gallery${el}.webp`);
    galleryPictures[index].setAttribute('alt', `gallery picture #${el}`);
  });
}

window.addEventListener('load', insertGallery);
window.addEventListener('scroll', ariseHandler);
