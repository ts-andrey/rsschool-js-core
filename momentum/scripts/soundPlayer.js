import songs from './playList.js';

const playList = document.querySelector('.play-list');
const volBar = document.querySelector('.volume');
const durBar = document.querySelector('.duration');
const bars = document.querySelectorAll('.bar');
const prevButton = document.querySelector('.button.prev');
const nextButton = document.querySelector('.button.next');
const playButton = document.querySelector('.button.play');
const soundButton = document.querySelector('.button.sound');
const trackName = document.querySelector('.track-name');
const buttons = document.querySelectorAll('.button');
let tracks;

// console.log({ bars });
durBar.style.background = `linear-gradient(to right, #ff4901 0%, #ff4901 0%, #c4c4c4 0%, #c4c4c4 100%)`;

songs.forEach((el, index) => {
  const song = document.createElement('li');
  song.classList.add(`track`);
  song.classList.add(`s${index}`);
  const soundIcon = document.createElement('span');
  soundIcon.classList.add('icon-play');
  soundIcon.innerHTML = `
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <title>play2</title>
  <path fill="#fff" d="M32 0c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zM32 58c-14.359 0-26-11.641-26-26s11.641-26 26-26 26 11.641 26 26-11.641 26-26 26zM24 18l24 14-24 14z"></path>
  </svg>
  
`;
  const track = document.createElement('audio');
  const songWrapper = document.createElement('figure');
  const title = document.createElement('figcaption');
  track.setAttribute('src', `${el.src}`);
  title.textContent = `${el.title} (${el.duration})`;

  songWrapper.append(title);
  songWrapper.append(track);

  song.append(soundIcon);
  song.append(songWrapper);
  playList.append(song);
});

tracks = document.querySelectorAll('.track');
console.log(tracks);

function progressBarHandler() {
  this.style.background = `linear-gradient(to right, #ff4901 0%, #ff4901 ${this.value}%, #c4c4c4 ${this.value}%, #c4c4c4 100%)`;
}

function playPrev() {}
function playNext() {}
function playHandler() {}
function changeIconHandler() {}

function buttonHandler(ev) {
  if (ev.target === prevButton) playPrev();
  if (ev.target === nextButton) playNext();
  if (ev.target === playButton) playHandler();
  if (ev.target === soundButton) changeIconHandler();
  console.log(object);
}

bars.forEach(el => {
  el.addEventListener('input', progressBarHandler);
});
buttons.forEach(el => {
  el.addEventListener('click', buttonHandler);
});
