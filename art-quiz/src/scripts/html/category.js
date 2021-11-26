const content = (data, progress, description) => {
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
<h3 class="category-title">${description.type} category #${description.num}</h3>
<div class="category-gallery">
`;
  data.forEach((el, index) => {
    result += `
  <ul class="card">
    <li class="card-img">
    <img class="${progress[index] ? '' : 'progress-filter'}" src="./assets/data/img/${
      data[index].imageNum
    }.webp" alt="category image" />
    </li>
    <li class="card-description">
    <div class="card-data img-name">${data[index].name}</div>
    <div class="card-data img-description"><i>${data[index].author}, ${data[index].year}</i></div>
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
  render(description) {
    this.el.innerHTML = content(this.data, this.progress, description);
  }
  seeker(homeHandler) {
    this.homeEl = document.querySelector('.home');
    this.homeEl.addEventListener('click', ev => homeHandler({ event: ev, element: this.homeEl }));
  }
}

module.exports.Category = Category;
