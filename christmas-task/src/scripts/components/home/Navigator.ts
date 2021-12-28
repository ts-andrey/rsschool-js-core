export class Navigator {
  homeLink: HTMLElement;
  iconLink: HTMLElement;
  filterLinks: NodeListOf<HTMLElement>;

  constructor() {
    this.homeLink = document.querySelector('.home-wrapper__link');
    this.iconLink = document.querySelector('.header-box__icon-box');
    this.filterLinks = document.querySelectorAll('.nav-list__item');
  }
  listenHeaderIcon(homeHandler: (links: NodeListOf<HTMLElement>) => void) {
    this.iconLink.addEventListener('click', () => homeHandler(this.filterLinks));
  }
  listenHeaderLinks(
    filterView: (link: HTMLElement, links: NodeListOf<HTMLElement>) => void,
    decoratorView: (link: HTMLElement, links: NodeListOf<HTMLElement>) => void
  ) {
    this.filterLinks.forEach(el => {
      el.addEventListener('click', () => {
        if (el.getAttribute('data-type') === 'filter') {
          filterView(el, this.filterLinks);
        }
        if (el.getAttribute('data-type') === 'decorator') {
          decoratorView(el, this.filterLinks);
        }
      });
    });
  }
  listenHomeFilterLink(filterView: (link: HTMLElement, links: NodeListOf<HTMLElement>) => void) {
    this.homeLink.addEventListener('click', () => filterView(this.filterLinks[0], this.filterLinks));
  }
}
