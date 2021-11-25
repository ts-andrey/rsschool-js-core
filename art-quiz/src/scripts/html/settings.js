const soundMute = `
<svg data-type="mute" class="vol-icon" height="48px" version="1.1" viewBox="0 0 48 48" width="48px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g id="Artboard-Copy" transform="translate(-407.000000, -429.000000)"><path d="M418,447 C416.895,447 416,447.895 416,449 L416,457 C416,458.104 416.895,459 418,459 L424.125,459 C426.259995,461.28542 427.881873,462.952303 428.990634,464.000651 C430.049072,465.001419 430.349426,465.001419 430.515442,465.001419 C431.640442,465.001419 432,464.105 432,463 L432,443 C432,441.896 431.638261,441 430.515442,441 C430.326612,441 430.053223,440.863403 429.033419,441.945337 C428.414276,442.602199 426.75747,444.287087 424.063,447 L418,447 Z M445.717,448.221 C445.424,447.926 444.947,447.926 444.654,448.221 L442,450.875 L439.344,448.221 C439.051,447.926 438.576,447.926 438.281,448.221 L437.219,449.283 C436.926,449.576 436.926,450.053 437.219,450.346 L439.873,453 L437.219,455.656 C436.928,455.949 436.928,456.424 437.219,456.719 L438.281,457.781 C438.576,458.074 439.051,458.074 439.344,457.781 L442,455.127 L444.654,457.781 C444.947,458.074 445.424,458.074 445.717,457.781 L446.779,456.719 C447.074,456.424 447.074,455.949 446.779,455.656 L444.125,453 L446.779,450.346 C447.074,450.053 447.074,449.576 446.779,449.283 L445.717,448.221 Z" fill="#000000" id="mute"/><g id="slices" transform="translate(47.000000, 9.000000)"/></g></g></svg>
`;
const soundHigh = `
<svg data-type="full" class="vol-icon" height="48px" version="1.1" viewBox="0 0 48 48" width="48px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g id="Artboard-Copy" transform="translate(-227.000000, -429.000000)"><path d="M236,447.005552 C234.895,447.005552 234,447.900552 234,449.005552 L234,457.005552 C234,458.109552 234.895,459.005552 236,459.005552 L242.125,459.005552 C244.259995,461.290971 245.881873,462.957855 246.990634,464.006203 C248.049072,465.006971 248.349426,465.006971 248.515442,465.006971 C249.640442,465.006971 250,464.110552 250,463.005552 L250,443.005552 C250,441.901552 249.638261,441.005552 248.515442,441.005552 C248.326612,441.005552 248.053223,440.868955 247.033419,441.950889 C246.414276,442.607751 244.75747,444.292638 242.063,447.005552 L236,447.005552 Z M260.8285,470 C266.2185,467.27 270.0005,460.912 270.0005,453.5 C270.0005,446.09 266.2185,439.73 260.8285,437 L260.8285,440.273 C264.7445,442.912 267.3785,447.848 267.3785,453.5 C267.3785,459.152 264.7445,464.086 260.8285,466.729 L260.8285,470 Z M254.9315,445.275 C257.3005,447.121 258.8615,450.266 258.8615,453.832 C258.8615,457.4 257.3005,460.543 254.9315,462.391 L254.9315,464.676 C258.7595,462.965 261.4845,458.605 261.4845,453.5 C261.4845,448.393 258.7595,444.035 254.9315,442.324 L254.9315,445.275 Z" fill="#000000" id="sound3"/><g id="slices" transform="translate(47.000000, 9.000000)"/></g></g></svg>
`;

const content = `
<div class="container-settings">
<div class="coverer"></div>
<ul class="top">
  <li class="return close-settings"><svg baseProfile="tiny" height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M12,9.059V6.5c0-0.256-0.098-0.512-0.293-0.708C11.512,5.597,11.256,5.5,11,5.5s-0.512,0.097-0.707,0.292L4,12l6.293,6.207  C10.488,18.402,10.744,18.5,11,18.5s0.512-0.098,0.707-0.293S12,17.755,12,17.5v-2.489c2.75,0.068,5.755,0.566,8,3.989v-1  C20,13.367,16.5,9.557,12,9.059z"/></svg><p>Return</p></li>
  <li class="close-settings"><svg data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z"/><path d="M92.12,35.79a3,3,0,0,0-4.24,0L64,59.75l-23.87-24A3,3,0,0,0,35.88,40L59.76,64,35.88,88a3,3,0,0,0,4.25,4.24L64,68.25l23.88,24A3,3,0,0,0,92.13,88L68.24,64,92.13,40A3,3,0,0,0,92.12,35.79Z"/></svg></li>
</ul>
  <ul class="settings">
    <li>
      <h3>Volume</h3>
      <input type="range" name="volume" class="volume-bar bar" max="1" min="0" step="0.01" />
      <div class="sound">${soundMute}${soundHigh}</div>
    </li>
    <li>
      <h3>Time game</h3>
      <div class="switcher-container">
        <p class="timer">Off</p>
        <div class="time-switcher ">
          <div class="switcher"></div>
        </div>
      </div>
    </li>
    <li>
      <h3>Time to answer</h3>
      <div class="time-config">
        <button class="decrease time-btn">-</button>
        <span class="time-amount">30</span>
        <button class="increase time-btn">+</button>
      </div>
    </li>
  </ul>
  <ul class="desigion">
    <li data-type="default" class="default settings-save-option btn">Default</li>
    <li data-type="save" class="save settings-save-option btn">Save</li>
  </ul>
</div>
`;

class Settings {
  constructor() {
    this.el = document.querySelector('.main-content');
  }
  render(obj) {
    this.el.innerHTML = content;

    const volEl = document.querySelector('.volume-bar');
    const timer = document.querySelector('.timer');
    const state = document.querySelector('.time-switcher');
    const timeAmount = document.querySelector('.time-amount');
    timeAmount.textContent = obj.time;
    volEl.value = obj.volume;
    volEl.style.background = `linear-gradient(to right, #ff4901 0%, #ff4901 ${obj.volume * 100}%, #c4c4c4 ${
      obj.volume * 100
    }%, #c4c4c4 100%)`;

    if (obj.isTimerOn === true) {
      timer.textContent = 'On';
      state.classList.add('time-switcher-content');
    }
    if (obj.isTimerOn === false) {
      timer.textContent = 'Off';
      state.classList.remove('time-switcher-content');
    }
  }
  seeker(handler) {
    this.icon = document.querySelector('.configurator');
    this.icon.addEventListener('click', ev => handler({ event: ev, element: this.icon }));
  }

  seekerOption(handler) {
    this.options = document.querySelectorAll('.settings-save-option');
    this.options.forEach(el => {
      el.addEventListener('click', ev => handler({ event: ev, element: el }));
    });
  }

  getElements() {
    const volumeBar = document.querySelector('.volume-bar');
    const switchState = document.querySelector('.time-switcher');
    const timeValue = document.querySelector('.time-amount');
    return { volume: volumeBar, switcher: switchState, time: timeValue };
  }

  seekerVolume(handler) {
    this.volumeBar = document.querySelector('.volume-bar');
    this.volumeBar.addEventListener('change', ev => handler({ event: ev, element: this.volumeBar }));
  }
  seekerTimeSwitch(timeSwitchHandler) {
    this.timerState = document.querySelector('.timer');
    this.switcher = document.querySelector('.switcher');
    this.timeSwitcher = document.querySelector('.time-switcher ');

    this.switcher.addEventListener('click', ev =>
      timeSwitchHandler({ event: ev, el: this.switcher, switcher: this.timeSwitcher, state: this.timerState })
    );
  }
  seekerTime(timeHandler) {
    this.timeAmount = document.querySelector('.time-amount');
    this.timeShifters = document.querySelectorAll('.time-btn');

    this.timeShifters.forEach(el => {
      el.addEventListener('click', ev => timeHandler({ event: ev, element: el, time: this.timeAmount }));
    });
  }

  seekerClose(handler) {
    this.closeElements = document.querySelectorAll('.close-settings');
    this.closeElements.forEach(el => {
      el.addEventListener('click', ev => handler({ event: ev, element: el }));
    });
  }

  seekerIcon(handler) {
    this.volumeBar = document.querySelector('.volume-bar');
    this.iconElements = document.querySelectorAll('.vol-icon');
    this.iconElements.forEach(el => {
      el.addEventListener('click', ev => handler({ event: ev, element: el, volume: this.volumeBar }));
    });
  }
}

module.exports.Settings = Settings;
