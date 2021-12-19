export class Card {
  constructor() {
    this.toyCards = document.querySelectorAll('.toy-card');
    this.toyPickAmount = document.querySelector('.header-box__toy-counter');
  }
  cardsSeeker(toyCardHandler) {
    this.toyCards.forEach(el => {
      el.addEventListener('click', () => {
        toyCardHandler(el.querySelector('.toy-card__mark'), this.toyPickAmount, el);
      });
    });
  }
}
