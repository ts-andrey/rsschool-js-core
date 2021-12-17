const content = ``;

export class DecoratorView {
  constructor() {
    this.targetElement = document.querySelector(`.main-box`);
  }

  render() {
    this.targetElement.innerHTML = content;
  }
}
