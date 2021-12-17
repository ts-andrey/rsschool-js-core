export class Card {
  constructor() {
    this.cards = document.querySelectorAll('.card');
  }
  cardsSeeker(cardHandler) {
    this.cards.forEach(el => {
      el.addEventListener('click', () => {
        cardHandler(el);
      });
    });
  }
}
