const videoProgressBar = document.querySelectorAll('.bar');
const imgInsertPlace = document.querySelector('.insert-gallery');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomArray() {
  let imgsSmall = [1, 4, 10, 11, 12, 13, 15];
  let imgsBig = [2, 3, 5, 6, 7, 8, 9, 14];
  imgsSmall = shuffle(imgsSmall);
  imgsBig = shuffle(imgsBig);
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
  let gallery = ``;
  getRandomArray().forEach(el => {
    gallery += `<li><img src="assets/img/galery/gallery${el}.jpg" alt="gallery picture #${el}"/></li>`;
  });
  imgInsertPlace.innerHTML = gallery;
}

function progressBarHandler() {
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${this.value}%, #fff ${this.value}%, #fff 100%)`;
}


videoProgressBar.forEach(el => {
  el.addEventListener('input', progressBarHandler);
});

window.addEventListener('load', insertGallery);

