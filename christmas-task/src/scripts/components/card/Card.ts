export class Card {
  toyCards: NodeListOf<HTMLElement>;
  toyPickAmount: HTMLElement;
  constructor() {
    this.toyCards = document.querySelectorAll('.toy-card');
    this.toyPickAmount = document.querySelector('.header-box__toy-counter');
  }
  cardsSeeker(toyCardHandler: (markEl: HTMLElement, toyAmountPickEl: HTMLElement, toyCardEl: HTMLElement) => void) {
    this.toyCards.forEach(el => {
      el.addEventListener('click', () => {
        toyCardHandler(el.querySelector('.toy-card__mark'), this.toyPickAmount, el);
      });
    });
  }
}
