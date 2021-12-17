export class Navigator {
  constructor() {
    this.homeLink = document.querySelector('.home-wrapper__link');
    this.iconLink = document.querySelector('.header-box__icon-box');
    this.filterLinks = document.querySelectorAll('.nav-list__item');
  }
  listenIcon(homeHandler) {
    this.iconLink.addEventListener('click', () => {
      homeHandler();
    });
  }
  listenLinks(filterView, decoratorView) {
    this.filterLinks.forEach(el => {
      el.addEventListener('click', () => {
        if (el.getAttribute('data-type') === 'filter') {
          filterView();
        }
        if (el.getAttribute('data-type') === 'decorator') {
          decoratorView();
        }
      });
    });
  }
  listenFilter(filterView) {
    this.homeLink.addEventListener('click', () => {
      filterView();
    });
  }
}
