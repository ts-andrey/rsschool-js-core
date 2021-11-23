const content = `
<div class="container menu">
  <div class="art-logo-wrapper">
    <div class="art-logo">
      <div class="circle">
        <div class="circle-c1"></div>
        <div class="circle-c2"></div>
      </div>
      <h1>Art Quiz</h1>
    </div>
  </div>
  <ul class="menu-list">
    <li data-type="artists" class="btn game-type">Artist quiz</li>
    <li data-type="imgs" class="btn game-type">Pictures quiz</li>
  </ul>
</div>
`;

class Home {
  constructor() {
    this.el = document.querySelector('.main-content');
  }
  render() {
    const backgroundElement = document.querySelector('main');
    backgroundElement.style.background = `top / 80% no-repeat url('./assets/background.webp')`;
    backgroundElement.style.backgroundPositionY = '10%';
    this.el.innerHTML = content;
  }
  seeker(handler) {
    this.options = document.querySelectorAll('.game-type');
    this.options.forEach(el => {
      el.addEventListener('click', ev => handler({ event: ev, element: el }));
    });
  }
}

module.exports.Home = Home;
