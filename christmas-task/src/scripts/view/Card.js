const content = (data, pickList) =>
  `
<li data-num="${data.num}" class="toy-card toys-list__item">
<h3 class="toy-card__header">${data.name}</h3>
<div class="toy-card__content-wrapper">
  <div class="toy-card__content_left">
    <div class="toy-card__img-wrapper">
      <img class="toy-card__img" src="./assets/toys/${data.num}.webp" alt="toy image ${data.num}" />
    </div>
    <span class="toy-card__mark ${pickList.includes(data.num) ? 'toy-card__mark_state_favourite' : ''}"></span>
  </div>
  <div class="toy-card__content_right">
    <ul class="description-list toy-card__description-list">
      <li class="description-list__item">
        <span data-card-info="num" class="description-list__info">Количество:</span>
        <span data-card-data="num" class="description-list__data">${data.count}</span>
      </li>
      <li class="description-list__item">
        <span data-card-info="year" class="description-list__info">Год покупки:</span>
        <span data-card-data="year" class="description-list__data">${data.year}</span>
      </li>
      <li class="description-list__item">
        <span data-card-info="shape" class="description-list__info">Форма:</span>
        <span data-card-data="shape" class="description-list__data">${data.shape}</span>
      </li>
      <li class="description-list__item">
        <span data-card-info="color" class="description-list__info">Цвет:</span>
        <span data-card-data="color" class="description-list__data">${data.color}</span>
      </li>
      <li class="description-list__item">
        <span data-card-info="size" class="description-list__info">Размер:</span>
        <span data-card-data="size" class="description-list__data">${data.size}</span>
      </li>
      <li class="description-list__item">
        <span data-card-info="favourite" class="description-list__info">Любимая:</span>
        <span data-card-data="favourite" class="description-list__data">${data.favorite ? 'да' : 'нет'}</span>
      </li>
    </ul>
  </div>
</div>
</li>
`;

export class CardView {
  constructor(data) {
    this.data = data;
    this.targetElement = document.querySelector('.toys__list');
  }

  render(pickList) {
    this.targetElement.insertAdjacentHTML('beforeend', content(this.data, pickList));
  }
}
