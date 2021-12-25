import { IData } from './../components/data/IData';
import data from '../../assets/data';
import { IFilterStateStorage } from '../components/state/IFilterState';
import { DecoratorView } from '../view/Decorator';

const sound = new Audio('../../assets/audio/audio.webm');
const AUDIO_ACTIVE_CLASS = 'features__sound-icon_state_active';
const SNOW_ACTIVE_CLASS = 'features__snow-icon_state_active';

const SNOW_RUN_CLASS = (num: number) => `xmas-tree__snow_layer_${num}`;
const SNOW_RUN_CLASS_COPY = (num: number) => `xmas-tree__snow_layer_${num}-copy`;

export class DresserController {
  decorToyListRenderer(decoratorView: DecoratorView) {
    const targetToyList: HTMLElement = document.querySelector('.decor-toys__list');
    targetToyList.innerHTML = '';
    const info: IFilterStateStorage = JSON.parse(localStorage.getItem('filterState'));
    const pickedToys = info.filterState.toysPick;
    if (pickedToys.length > 0) {
      pickedToys.forEach(element => {
        const toy: IData = data[Number(element)];
        targetToyList.insertAdjacentHTML('beforeend', decoratorView.renderToy(toy.num, toy.count));
      });
    }
    let counter = 20 - pickedToys.length;
    let toyNumber = 0;
    while (counter !== 0) {
      if (!pickedToys.includes(String(toyNumber))) {
        const toy = data[toyNumber];
        targetToyList.insertAdjacentHTML('beforeend', decoratorView.renderToy(toy.num, toy.count));
        counter--;
      }
      toyNumber++;
    }
  }

  featureSoundHandler(el: HTMLElement) {
    const bool = el.classList.contains(AUDIO_ACTIVE_CLASS);
    el.classList.toggle(AUDIO_ACTIVE_CLASS);
    if (bool) {
      sound.pause();
    } else {
      sound.play();
    }
  }

  featureSnowHandler(el: HTMLElement, snowList: NodeListOf<HTMLElement>) {
    el.classList.toggle(SNOW_ACTIVE_CLASS);
    snowList.forEach((el, index) => {
      const num = Math.floor(index / 2 + 1);
      if (index % 2 === 0) {
        el.classList.toggle(SNOW_RUN_CLASS(num));
      } else {
        el.classList.toggle(SNOW_RUN_CLASS(num));
        el.classList.toggle(SNOW_RUN_CLASS_COPY(num))
      }
    });
  }
  treeTypeHandler(treeNew: HTMLElement, treeOld: HTMLElement) {
    treeOld.setAttribute('src', `./assets/tree/${treeNew.getAttribute('data-num')}.webp`);
  }
  backgroundHandler(backNew: HTMLElement, backOld: HTMLElement) {
    backOld.style.background = `center / cover no-repeat url(../assets/bg/${backNew.getAttribute('data-num')}.webp)`;
  }
  lightSwitchHandler() {
    ('');
  }
  lightDefaultHandler() {
    ('');
  }
  lightCustomOneHandler() {
    ('');
  }
  lightCustomManyHandler() {
    ('');
  }
  lightBrightnessHandler() {
    ('');
  }
  lightSpeedHandler() {
    ('');
  }
  lightModeHandler() {
    ('');
  }
  lightBrightnessOptionHandler() {
    ('');
  }
  lightSpeedOptionHandler() {
    ('');
  }
  lightModeOptionHandler() {
    ('');
  }
  dresserSaveHanlder() {
    ('');
  }

  dresserToyListHandler() {
    ('');
  }
  dresserWorkListHandler() {
    ('');
  }
}
