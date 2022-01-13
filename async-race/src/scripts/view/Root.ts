export class RootView {
  target: HTMLBodyElement;
  constructor() {
    this.target = document.querySelector('body');
  }
  render() {
    const header = document.createElement('header');
    header.className = 'header';
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('header__box', 'header-box');
    header.append(headerContainer);
  
    const main = document.createElement('main');
    main.className = 'main';
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('main__box', 'main-box');
    main.append(mainContainer);

    this.target.append(header, main);
  }
}
