const videoProgressBar = document.querySelectorAll('.bar');
const videoIframes = document.querySelectorAll('.iframe');

const video = document.querySelector('.film');
const playBtn = document.querySelector('.play-group');
const panelPlay = document.querySelector('.play-btn');
const panelSound = document.querySelector('.volume-btn');
const panelSize = document.querySelector('.size-btn');
const panelProgressBar = document.querySelector('.progress.bar');
const panelVolumeBar = document.querySelector('.volume.bar');
const videoPlayer = document.querySelector('.video-player');

const panelIconPlay = `
<svg width="23" height="31" viewBox="0 0 23 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23 15.5053L0 0C0 23.3683 0 11.8996 0 31L23 15.5053Z" fill="#B3B3B3"/>
</svg>
`;
const panelIconPause = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
<title>iconfinder_211871_pause_icon</title>
<path fill="#b3b3b3" d="M12.539 28.828v-27.662c0-0.515-0.415-0.93-0.938-0.93h-5.506c-0.523 0-0.938 0.415-0.938 0.93v27.662c0 0.515 0.415 0.938 0.938 0.938h5.506c0.523 0 0.938-0.415 0.938-0.938z"></path>
<path fill="#b3b3b3" d="M23.906 0.234h-5.506c-0.515 0-0.938 0.415-0.938 0.93v27.662c0 0.515 0.415 0.938 0.938 0.938h5.506c0.515 0 0.938-0.415 0.938-0.938v-27.662c0-0.515-0.415-0.93-0.938-0.93z"></path>
</svg>
`;
const panelIconSound = `
<svg  width="38" height="31" viewBox="0 0 38 31" xmlns="http://www.w3.org/2000/svg">
<path
  d="M19.3511 0C18.875 0 18.4622 0.161587 18.1138 0.484761L8.9609 8.97374H1.76C1.28282 8.97374 0.871122 9.13533 0.522673 9.4585C0.174224 9.78167 0 10.1645 0 10.6061V20.3939C0 20.8355 0.174224 21.2183 0.522673 21.5415C0.871122 21.8647 1.28393 22.0263 1.76 22.0263H8.9609L18.1138 30.5152C18.4622 30.8384 18.8739 31 19.3511 31C19.8283 31 20.24 30.8384 20.5884 30.5152C20.9369 30.1921 21.1111 29.8102 21.1111 29.3677V1.63234C21.1111 1.1908 20.9369 0.807935 20.5895 0.484761C20.2422 0.161587 19.8294 0 19.3522 0H19.3511Z"
  fill="#B3B3B3"
/>
<path
  d="M29.5979 19.1322C30.3389 18.0151 30.7094 16.8082 30.7094 15.5103C30.7094 14.2125 30.3389 13.0014 29.5979 11.8751C28.8569 10.7487 27.8774 9.95512 26.6561 9.49425C26.4819 9.40952 26.2634 9.36612 26.0027 9.36612C25.5499 9.36612 25.1572 9.52422 24.8258 9.83939C24.4943 10.1566 24.3286 10.5431 24.3286 11.004C24.3286 11.3625 24.4331 11.6653 24.6432 11.9123C24.8532 12.1592 25.1044 12.3731 25.4011 12.5519C25.6966 12.7307 25.9932 12.927 26.2898 13.1409C26.5864 13.3548 26.8387 13.6565 27.0477 14.0492C27.2567 14.4419 27.3612 14.9286 27.3612 15.5083C27.3612 16.088 27.2567 16.5747 27.0477 16.9673C26.8387 17.36 26.5864 17.6628 26.2898 17.8756C25.9932 18.0885 25.6966 18.2859 25.4011 18.4646C25.1044 18.6434 24.8522 18.8573 24.6432 19.1043C24.4342 19.3512 24.3286 19.655 24.3286 20.0126C24.3286 20.4734 24.4954 20.8609 24.8258 21.1771C25.1572 21.4913 25.5488 21.6514 26.0027 21.6514C26.2634 21.6514 26.4819 21.6091 26.6561 21.5233C27.8763 21.0449 28.8569 20.2471 29.5979 19.1291V19.1322Z"
  fill="#B3B3B3"
/>
<path
  d="M35.7563 22.8582C37.252 20.6112 37.9999 18.1571 37.9999 15.499C37.9999 12.8419 37.252 10.3899 35.7563 8.13971C34.2605 5.89271 32.2811 4.25452 29.819 3.23039C29.591 3.14417 29.362 3.10001 29.1329 3.10001C28.6759 3.10001 28.2796 3.26509 27.9451 3.59525C27.6105 3.92541 27.4443 4.31551 27.4443 4.76764C27.4443 5.44479 27.7874 5.95685 28.4735 6.30489C29.4579 6.80855 30.1269 7.19023 30.4785 7.45099C31.7803 8.38891 32.7967 9.56445 33.5265 10.9797C34.2562 12.395 34.6216 13.9007 34.6216 15.5C34.6216 17.0972 34.2562 18.6039 33.5265 20.0203C32.7967 21.4356 31.7803 22.6111 30.4785 23.549C30.1269 23.8098 29.4579 24.1915 28.4735 24.6951C27.7874 25.0432 27.4443 25.5542 27.4443 26.2324C27.4443 26.6835 27.6116 27.0746 27.9451 27.4048C28.2785 27.7349 28.6833 27.9 29.1585 27.9C29.3694 27.9 29.59 27.8558 29.818 27.7696C32.28 26.7444 34.2605 25.1084 35.7552 22.8593L35.7563 22.8582Z"
  fill="#B3B3B3"
/>
</svg>
`;
const panelIconMute = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
<title>mute</title>
<path fill="#b3b3b3" d="M18.405 2.387c-0.445 0-0.831 0.163-1.156 0.488l-8.556 8.556h-6.732c-0.446 0-0.831 0.163-1.156 0.488s-0.488 0.711-0.488 1.156v9.865c0 0.445 0.163 0.831 0.488 1.156s0.711 0.488 1.156 0.488h6.732l8.556 8.556c0.326 0.325 0.711 0.488 1.156 0.488s0.831-0.163 1.156-0.488 0.488-0.711 0.488-1.156v-27.955c0-0.445-0.163-0.831-0.488-1.156s-0.711-0.488-1.156-0.488z"></path>
<path fill="#b3b3b3" d="M31.902 18.679l3.468-3.468c0.22-0.22 0.33-0.488 0.33-0.802s-0.11-0.582-0.33-0.802l-1.604-1.604c-0.22-0.22-0.488-0.33-0.802-0.33s-0.582 0.11-0.802 0.33l-3.468 3.468-3.468-3.468c-0.22-0.22-0.488-0.33-0.802-0.33s-0.582 0.11-0.802 0.33l-1.604 1.604c-0.22 0.22-0.33 0.488-0.33 0.802s0.11 0.582 0.33 0.802l3.468 3.468-3.468 3.468c-0.22 0.22-0.33 0.488-0.33 0.802s0.11 0.582 0.33 0.802l1.604 1.604c0.22 0.22 0.488 0.33 0.802 0.33s0.582-0.11 0.802-0.33l3.468-3.468 3.468 3.468c0.22 0.22 0.487 0.33 0.802 0.33s0.582-0.11 0.802-0.33l1.604-1.604c0.22-0.22 0.33-0.488 0.33-0.802s-0.11-0.582-0.33-0.802l-3.468-3.468z"></path>
</svg>
`;

console.log({
  video,
  playBtn,
  panelPlay,
  panelSound,
  panelSize,
  panelProgressBar,
  panelVolumeBar,
});

function sizeHandler() {
  if (!document.fullscreenElement) {
    videoPlayer.requestFullscreen().catch(err => {});
  } else {
    document.exitFullscreen();
  }
}

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
    } else if (this.classList.contains('fourth')) {
      this.innerHTML = `
  
        `;
    } else if (this.classList.contains('fifth')) {
      this.innerHTML = `

        `;
    }
  }
}

function togglePlay() {
  this[this.paused ? 'play' : 'pause']();
}

function toggleButtonPlay() {
  video[video.paused ? 'play' : 'pause']();
}

function updateButtons() {
  if (!this.paused) {
    panelPlay.innerHTML = panelIconPause;
    playBtn.style.display = 'none';
  } else {
    panelPlay.innerHTML = panelIconPlay;
    playBtn.style.display = 'block';
  }
}

function speedRateHandler({ value }) {
  if (value) {
    if (video.playbackRate + value >= 0.5 && video.playbackRate + value <= 2) video.playbackRate += value;
    else if (video.playbackRate + value < 0.5) video.playbackRate = 0.5;
    else if (video.playbackRate + value > 2) video.playbackRate = 2;
    else video.playbackRate;
  } else video.playbackRate = this.value;
}

function muteHandler() {
  if (panelSound.classList.contains('unmuted')) {
    panelSound.classList.remove('unmuted');
    panelSound.innerHTML = panelIconMute;
    video.muted = true;
  } else {
    panelSound.classList.add('unmuted');
    panelSound.innerHTML = panelIconSound;
    video.muted = false;
  }
}

function shiftPositionHandler({ e, value }) {
  if (value) {
    switch (value) {
      case 1:
        return (video.currentTime = (video.duration / 100) * 10);
      case 2:
        return (video.currentTime = (video.duration / 100) * 20);
      case 3:
        return (video.currentTime = (video.duration / 100) * 30);
      case 4:
        return (video.currentTime = (video.duration / 100) * 40);
      case 5:
        return (video.currentTime = (video.duration / 100) * 50);
      case 6:
        return (video.currentTime = (video.duration / 100) * 60);
      case 7:
        return (video.currentTime = (video.duration / 100) * 70);
      case 8:
        return (video.currentTime = (video.duration / 100) * 80);
      case 9:
        return (video.currentTime = (video.duration / 100) * 90);
    }
  } else {
    const position = (e.offsetX / panelProgressBar.offsetWidth) * video.duration;
    video.currentTime = position;
  }
}

function soundClickHandler() {
  video.volume = this.value / 100;
}

function headwayHandler() {
  const headway = (video.currentTime / video.duration) * 100;
  panelProgressBar.value = headway;
  panelProgressBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${headway}%, #c4c4c4 ${headway}%, #c4c4c4 100%)`;
}

function skip({ value }) {
  if (value) {
    if (video.currentTime + value > 0 && video.currentTime + value < video.duration) video.currentTime += value;
    else if (video.currentTime + value < 0) video.currentTime = 0;
    else video.currentTime;
  } else video.currentTime += parseFloat(this.dataset.skip);
}

function keydownHandler(e) {
  if (e.key === ' ') e.preventDefault();
  if (e.key === 'f' || e.key === 'а') sizeHandler();
  else if (e.key === ' ') toggleButtonPlay();
  else if (e.key === 'm' || e.key === 'ь') muteHandler();
  else if (e.key === '<' || e.key === 'Б') speedRateHandler({ value: -0.1 });
  else if (e.key === '>' || e.key === 'Ю') speedRateHandler({ value: 0.1 });
  else if (e.key === 'j' || e.key === 'о') skip({ value: -5 });
  else if (e.key === 'k' || e.key === 'л') toggleButtonPlay();
  else if (e.key === 'l' || e.key === 'д') skip({ value: 5 });
  else if (e.key === '1') shiftPositionHandler({ value: 1 });
  else if (e.key === '2') shiftPositionHandler({ value: 2 });
  else if (e.key === '3') shiftPositionHandler({ value: 3 });
  else if (e.key === '4') shiftPositionHandler({ value: 4 });
  else if (e.key === '5') shiftPositionHandler({ value: 5 });
  else if (e.key === '6') shiftPositionHandler({ value: 6 });
  else if (e.key === '7') shiftPositionHandler({ value: 7 });
  else if (e.key === '8') shiftPositionHandler({ value: 8 });
  else if (e.key === '9') shiftPositionHandler({ value: 9 });
}

video.volume = panelVolumeBar.value / 100;

videoProgressBar.forEach(el => {
  el.addEventListener('input', progressBarHandler);
});

videoIframes.forEach(el => {
  el.addEventListener('mouseover', renderVideoHandler);
});

let progressMousedown = false;
let volumeMousedown = false;
panelProgressBar.addEventListener('mousedown', () => (volumeMousedown = true));
panelProgressBar.addEventListener('mouseup', () => (volumeMousedown = false));
panelVolumeBar.addEventListener('mousedown', () => (progressMousedown = true));
panelVolumeBar.addEventListener('mouseup', () => (progressMousedown = false));

playBtn.addEventListener('click', toggleButtonPlay);
panelPlay.addEventListener('click', toggleButtonPlay);
panelSize.addEventListener('click', sizeHandler);
panelProgressBar.addEventListener('click', e => shiftPositionHandler({ e }));
panelProgressBar.addEventListener('mousemove', e => progressMousedown && shiftPositionHandler({ e }));
panelVolumeBar.addEventListener('change', soundClickHandler);
panelVolumeBar.addEventListener('mousemove', e => progressMousedown && soundClickHandler);
panelSound.addEventListener('click', muteHandler);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButtons);
video.addEventListener('pause', updateButtons);
video.addEventListener('timeupdate', headwayHandler);

window.addEventListener('keydown', keydownHandler);
