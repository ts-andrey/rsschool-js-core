export class NavigationView {
  target: HTMLElement;
  constructor() {
    this.target = document.querySelector('.header-box');
  }
  render() {
    const list: HTMLElement = document.createElement('ul');
    list.classList.add('header-box__list');

    const garageLink: HTMLElement = document.createElement('li');
    garageLink.classList.add('header-box__item');

    const winnersLink: HTMLElement = <HTMLElement>garageLink.cloneNode(true);

    garageLink.innerText = 'to garage';
    winnersLink.innerText = 'to winners';
    garageLink.setAttribute('data-type', 'garage');
    winnersLink.setAttribute('data-type', 'winners');

    list.append(garageLink, winnersLink);
    this.target.append(list);
  }
}
