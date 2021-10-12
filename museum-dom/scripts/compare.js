const imgComparer = document.querySelector('.comparer');
const imgContainer = document.querySelector('.explore .img');
const imgOverlay = document.querySelector('.img-container-1');

console.log(imgOverlay);

function compareImages() {
  let slider = imgComparer;
  let img = imgOverlay;
  let clicked = 0;
  let w;
  let h;

  w = img.offsetWidth;
  h = img.offsetHeight;

  img.style.width = `${w / 4 *2.5}px`;
  slider.style.left =`${w / 4 *2.5 - slider.offsetWidth / 4 *2.5}px`;

  function getCursorPos(e) {
    let a;
    let x = 0;
    e = e || window.event;
    a = img.getBoundingClientRect();
    x = e.pageX - a.left;
    x = x - window.pageXOffset;
    return x;
  }

  function slide(x) {
    img.style.width = x + 'px';
    slider.style.left = img.offsetWidth - slider.offsetWidth / 2 + 'px';
  }

  function slideMove(e) {
    let pos;
    if (clicked === 0) return false;
    pos = getCursorPos(e);
    if (pos < 0) pos = 0;
    if (pos > w) pos = w;
    slide(pos);
  }

  function slideReady(e) {
    e.preventDefault();
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
