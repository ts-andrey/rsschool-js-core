const formClose = document.querySelector('.close');
const formOpen = document.querySelector('.btn-buy');
const form = document.querySelector('.form');

function openFormHandler() {
  form.style.marginLeft = '0';
}
function closeFormHandler() {
  form.style.marginLeft = '-150%';
}

formOpen.addEventListener('click', openFormHandler);
formClose.addEventListener('click', closeFormHandler);

form.addEventListener(
  'click',
  function (event) {
    if (event.target.matches('.close') || !event.target.closest('form')) closeFormHandler(event);
  },
  false
);
