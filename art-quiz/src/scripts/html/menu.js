const content = `
<div class="container menu">
  <div class="art-logo">
    <div class="circle">
      <div class="circle-c1"></div>
      <div class="circle-c2"></div>
    </div>
    <h1>Art Quiz</h1>
  </div>
  <ul class="menu-list">
    <li data-type="art" class="btn">Artist quiz</li>
    <li data-type="img" class="btn">Pictures quiz</li>
  </ul>
</div>
`;

class Menu {
  constructor() {
    this.el = document.querySelector('.main-content');
  }
  render() {
    this.el.innerHTML = content;
  }
}

module.exports.Menu = Menu;
