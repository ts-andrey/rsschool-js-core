const adaptiveMenu = document.querySelector('.welcome > aside');
const burgerMenu = document.querySelector('.burger-menu');
const closeBurger = document.querySelector('.adaptive-menu > .close');
const textBehind = document.querySelector('.welcome .text');

console.log(textBehind);

function adaptiveMenuHandler(ev) {
  if (this === burgerMenu) {
    burgerMenu.style.display = 'none';
    closeBurger.style.display = 'inline-block';
    adaptiveMenu.style.marginLeft = '0';
    textBehind.style.display = 'none';
  } else {
    burgerMenu.style.display = 'inline-block';
    closeBurger.style.display = 'none';
    adaptiveMenu.style.marginLeft = '-100%';
    textBehind.style.display = 'block';
  }
}

burgerMenu.addEventListener('click', adaptiveMenuHandler);
closeBurger.addEventListener('click', adaptiveMenuHandler);
