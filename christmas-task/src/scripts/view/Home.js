const content = `
<div class="home-wrapper main-box__home-wrapper">
  <div class="home-wrapper__greeting-wrapper">
    <p class="home-wrapper__greeting">Новогодняя игра</p>
    <p class="home-wrapper__greeting">"Нарядить ёлку"</p>
  </div>
  <p class="home-wrapper__link">Начать</p>
</div>
`;

export class HomeView {
  constructor() {
    this.targetElement = document.querySelector('.main-box');
  }
  render() {
    this.targetElement.innerHTML = content;
  }
}
