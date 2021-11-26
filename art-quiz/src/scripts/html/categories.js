const iconAgain = `
<svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="background"><rect fill="none" height="32" width="32"/></g><g id="refresh"><circle cx="16" cy="28" r="4"/><path d="M23.735,27.666L23.735,27.666h-0.002H23.735z M29.999,15.999c-0.002-7.732-6.268-13.999-14-14   C8.267,2,2,8.267,1.999,15.999c0,3.094,1.015,5.964,2.721,8.281L2,27h8v-8l-2.404,2.404C6.589,19.845,6.001,17.998,6,15.999   c0.01-5.521,4.479-9.989,10-10c5.521,0.01,9.989,4.479,9.999,10c0.002,3.483-1.775,6.535-4.479,8.333l2.215,3.333   C27.504,25.163,29.999,20.866,29.999,15.999z"/></g></svg>
`;

const content = (data, progress, type) => {
  let result = `
  <ul class="category-header">
  <li>
    <div class="art-logo">
      <div class="circle">
        <div class="circle-c1"></div>
        <div class="circle-c2"></div>
      </div>
      <h1 class="text-gradient">Art Quiz</h1>
    </div>
  </li>
  <li><p class="home">Home</p></li>
</ul>
<h3 class="category-title">${type.type} categories</h3>
  <div class="container-category">
  `;
  data.forEach((el, index) => {
    const sum = progress[index].filter(el => el === true).length;
    result += `
  <ul class="card" data-category-num="${index * 10}" data-category-type="${el.type}">
    <li class="card-info"><span class="category-name">Category #${index + 1}</span>${
      sum !== 0 ? `<span class='category-progress'>${sum}/10</span>` : ''
    }</li>
    <li><img class="img-category ${sum ? '' : 'progress-filter'}" src="${el.src}" alt="category image" /></li>
    ${el.progress ? `<li class="offer">${iconAgain}<span>Play again?</span></li>` : ''}
    <div class="play-btn" data-category-num="${index * 10}" data-category-type="${el.type}">${
      sum !== 0 ? 'Play again?' : 'Play?'
    }</div>
  </ul>
  `;
  });
  result += `</div>`;
  return result;
};

class Categories {
  constructor(data, progress, type) {
    this.el = document.querySelector('.main-content');
    this.data = data;
    this.progress = progress;
    this.type = type;
  }
  render() {
    const backgroundElement = document.querySelector('main');
    backgroundElement.style.background = '#000';
    this.el.innerHTML = content(this.data, this.progress, this.type);
  }
  seeker({ home: homeHandler, categoryPlay: categoryPlayHandler, category: categoryHandler }) {
    this.homeEl = document.querySelector('.home');
    this.homeEl.addEventListener('click', ev => homeHandler({ event: ev, el: this.homeEl }));

    this.categories = document.querySelectorAll('.card');
    this.categories.forEach(el => {
      el.addEventListener('click', ev => categoryHandler({ event: ev, element: el }));
    });

    this.categoriesPlay = document.querySelectorAll('.play-btn');
    this.categoriesPlay.forEach(el => {
      el.addEventListener('click', ev => categoryPlayHandler({ event: ev, element: el }));
    });
  }
}

module.exports.Categories = Categories;
