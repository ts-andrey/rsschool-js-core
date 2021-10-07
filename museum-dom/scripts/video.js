const videoProgressBar = document.querySelectorAll('.bar');
const videoIframes = document.querySelectorAll('.iframe');

function progressBarHandler() {
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${this.value}%, #fff ${this.value}%, #fff 100%)`;
}

function renderVideoHandler() {
  if (this.children.length > 1) {
    if (this.classList.contains('first')) {
      this.innerHTML = `
    <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/aWmJ5DgyWPI"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
    ></iframe>
        `;
    } else if (this.classList.contains('second')) {
      this.innerHTML = `
    <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/Vi5D6FKhRmo"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
    ></iframe>
          `;
    } else if (this.classList.contains('third')) {
      this.innerHTML = `
      <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/NOhDysLnTvY"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
      ></iframe>
        `;
    }
  }
}

videoProgressBar.forEach(el => {
  el.addEventListener('input', progressBarHandler);
});

videoIframes.forEach(el => {
  el.addEventListener('mouseover', renderVideoHandler);
});
