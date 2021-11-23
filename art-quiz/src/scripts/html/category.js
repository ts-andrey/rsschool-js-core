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
<div class="container-category">
`;
  data.forEach((el, index) => {
    result += `
  <ul class="card">
    <li><img class="img-category" src="./assets/data/img/${data[index].imageNum}.webp" alt="category image" /></li>
    <li class="card-info"><span class="img-name">${data[index].name}</span></li>
    <li class="card-info"><span class="description">${data[index].author}, ${data[index].year}</span></li>
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
