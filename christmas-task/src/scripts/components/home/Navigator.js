export class Navigator {
  constructor() {
    this.homeLink = document.querySelector('.home-wrapper__link');
    this.iconLink = document.querySelector('.header-box__icon-box');
    this.filterLinks = document.querySelectorAll('.nav-list__item');
  }
  listenIcon(homeHandler) {
    this.iconLink.addEventListener('click', () => {
      homeHandler(this.filterLinks);
    });
  }
  listenLinks(filterView, decoratorView) {
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
  listenFilter(filterView) {
    this.homeLink.addEventListener('click', () => {
      filterView(this.filterLinks[0], this.filterLinks);
    });
  }
}
