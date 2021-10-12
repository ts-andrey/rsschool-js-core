const buttonSubmit = document.querySelector('.submit');

function submitHandler(ev) {
  ev.preventDefault();
}

buttonSubmit.addEventListener('click', submitHandler);

const selfEvaluation = [
  ['Слайдер в секции Welcome', '+24'],
  ['Слайдер в секции Video', '0'],
  ['Кастомный видеоплеер', '+36'],
  ['Слайдер сравнения изображений в секции Explore', '+10'],
  ['Анимация при прокрутке изображений в секции Galery', '+8'],
  ['Калькулятор продажи билетов в секции Tiskets', '+10'],
  ['Калькулятор продажи билетов в форме продажи билетов', '+14'],
  ['Валидация формы', '+14'],
  ['Интерактивная карта в секции Contacts', '+12'],
  ['дополнительный функционал (плавная прокрутка в начало сайта, с любого места)', '+10'],
  ['общее количество баллов', '138'],
];

console.table(selfEvaluation);
