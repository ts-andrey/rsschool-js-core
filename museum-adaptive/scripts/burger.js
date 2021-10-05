const adaptiveMenu = document.querySelector('.welcome > aside');
const burgerMenu = document.querySelector('.burger-menu');
const closeBurger = document.querySelector('.adaptive-menu > .close');

function adaptiveMenuHandler(ev) {
  if (this === burgerMenu) {
    burgerMenu.style.display = 'none';
    closeBurger.style.display = 'inline-block';
    adaptiveMenu.style.marginLeft = '0';
  } else {
    burgerMenu.style.display = 'inline-block';
    closeBurger.style.display = 'none';
    adaptiveMenu.style.marginLeft = '-100%';
  }
}

burgerMenu.addEventListener('click', adaptiveMenuHandler);
closeBurger.addEventListener('click', adaptiveMenuHandler);