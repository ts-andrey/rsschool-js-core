export class Navigation {
  links: NodeListOf<HTMLElement>;
  constructor() {
    this.links = document.querySelectorAll('.header-box__item');
  }
  seekerLinks(linkHandler: (el: HTMLElement) => void) {
    return this.links.forEach(el => el.addEventListener('click', () => linkHandler(el)));
  }
}
