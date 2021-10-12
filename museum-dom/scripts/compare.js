const imgComparer = document.querySelector('.comparer');
const imgContainer = document.querySelector('.explore .img');
const imgOverlay = document.querySelector('.img-container-1');

function compareImages() {
  let slider = imgComparer;
  let img = imgOverlay;
  let clicked = 0;
  let width;

  width = img.offsetWidth;

  img.style.width = `${width / 4 *2.5}px`;
  slider.style.left =`${width / 4 *2.5 - slider.offsetWidth / 4 *2.5}px`;

  function getCursorPos(ev) {
    let imgRect;
    let coordX = 0;
    ev = ev || window.event;
    imgRect = img.getBoundingClientRect();
    coordX = ev.pageX - imgRect.left;
    coordX = coordX - window.pageXOffset;
    return coordX;
  }

  function slide(width) {
    img.style.width = width + 'px';
    slider.style.left = img.offsetWidth - slider.offsetWidth / 2 + 'px';
  }

  function slideMove(ev) {
    let pos;
    if (clicked === 0) return false;
    pos = getCursorPos(ev);
    if (pos < 0) pos = 0;
    if (pos > width) pos = width;
    slide(pos);
  }

  function slideReady(ev) {
    ev.preventDefault();
    clicked = 1;
    window.addEventListener('mousemove', slideMove);
    window.addEventListener('touchmove', slideMove);
  }

  function slideFinish() {
    clicked = 0;
  }

  slider.addEventListener('mousedown', slideReady);
  window.addEventListener('mouseup', slideFinish);
  slider.addEventListener('touchstart', slideReady);
  window.addEventListener('touchstop', slideFinish);
}

compareImages();
