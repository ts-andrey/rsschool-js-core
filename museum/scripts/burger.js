const adaptiveMenu = document.querySelector('.welcome > aside');
const burgerMenu = document.querySelector('.burger-menu');
const closeBurger = document.querySelector('.adaptive-menu > .close');
const textBehind = document.querySelector('.welcome .text');
const welcomeSection = document.querySelector('.welcome');

function closeAside() {
  burgerMenu.style.display = 'inline-block';
  closeBurger.style.display = 'none';
  adaptiveMenu.style.marginLeft = '-100%';
  textBehind.style.display = 'block';
}
function adaptiveMenuHandler(ev) {
  if (this === burgerMenu) {
    burgerMenu.style.display = 'none';
    closeBurger.style.display = 'inline-block';
    adaptiveMenu.style.marginLeft = '0';
    textBehind.style.display = 'none';
  } else if (ev.target.matches('.adaptive-link') || !ev.target.closest('aside') || ev.target.matches('.close')) {
    closeAside();
  }
}

burgerMenu.addEventListener('click', adaptiveMenuHandler);
closeBurger.addEventListener('click', adaptiveMenuHandler);
welcomeSection.addEventListener('click', adaptiveMenuHandler);
