const buttonSubmit = document.querySelector('.submit');
const scrollTop = document.querySelector('.go-to-top');

function submitHandler(ev) {
  ev.preventDefault();
}

function scrollToTopHandler(){
  window.scrollTo(top);
}

buttonSubmit.addEventListener('click', submitHandler);
scrollTop.addEventListener('click', scrollToTopHandler);

const selfEvaluation = [
  ['Слайдер в секции Welcome', '+24'],
  ['Слайдер в секции Video', '+17'],
  ['Кастомный видеоплеер', '+36'],
  ['Слайдер сравнения изображений в секции Explore', '+10'],
  ['Анимация при прокрутке изображений в секции Galery', '+8'],
  ['Калькулятор продажи билетов в секции Tiskets', '+10'],
  ['Калькулятор продажи билетов в форме продажи билетов', '+14'],
  ['Валидация формы', '+14'],
  ['Интерактивная карта в секции Contacts', '+12'],
  [
    'дополнительный функционал (плавная прокрутка в начало сайта, с любого места; добавление описания картин при наведении мышкой в секции велком)',
    '+10',
  ],
  ['суммарное количество баллов', '155'],
];

console.table(selfEvaluation);
