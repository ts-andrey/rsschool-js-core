const content = ``;

export class DecoratorView {
  targetElement: HTMLElement;

  constructor() {
    this.targetElement = document.querySelector(`.main-box`);
  }

  render() {
    this.targetElement.innerHTML = content;
  }
}
