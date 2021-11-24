const content = (data, progress) => {
  let result = `
<ul class="category-header">
<li>
  <div class="art-logo">
    <div class="circle">
      <div class="circle-c1"></div>
      <div class="circle-c2"></div>
    </div>
    <h1>Art Quiz</h1>
  </div>
</li>
<li><p class="home">Home</p></li>
</ul>
<h3 class="category-title">Category</h3>
<div class="category-gallery">
`;
  data.forEach((el, index) => {
    result += `
  <ul class="card">
    <li class="card-img"><img class="img-category" src="./assets/data/img/${data[index].imageNum}.webp" alt="category image" /></li>
    <li class="card-description">
    <div class="img-name">${data[index].name}</div>
    <div class="img-description"><i>${data[index].author}, ${data[index].year}</i></div>
    </li>
    <li class="card-cover"></li>
  </ul>
  `;
  });
  result += `</div>`;
  return result;
};

class Category {
  constructor(data, progress) {
    this.el = document.querySelector('.main-content');
    this.data = data;
    this.progress = progress;
  }
  render() {
    this.el.innerHTML = content(this.data, this.progress);
  }
  seeker(homeHandler) {
    this.homeEl = document.querySelector('.home');
    this.homeEl.addEventListener('click', ev => homeHandler({ event: ev, element: this.homeEl }));
  }
}

module.exports.Category = Category;
