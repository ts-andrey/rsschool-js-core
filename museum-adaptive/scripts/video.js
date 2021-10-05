const videoProgressBar = document.querySelectorAll('.bar');

function progressBarHandler() {
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${this.value}%, #fff ${this.value}%, #fff 100%)`;
}

videoProgressBar.forEach(el => {
  el.addEventListener('input', progressBarHandler);
});
