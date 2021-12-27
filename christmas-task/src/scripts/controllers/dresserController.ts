import { IData } from './../components/data/IData';
import data from '../../assets/data';
import { IFilterStateStorage } from '../components/state/IFilterState';
import { DecoratorView } from '../view/Decorator';
import { DecoratorState } from '../components/state/DecoratorState';

const sound = new Audio('./assets/audio/audio.webm');
sound.loop = true;
const CLASS_AUDIO_ACTIVE = 'features__sound-icon_state_active';
const CLASS_SNOW_ACTIVE = 'features__snow-icon_state_active';

const CLASS_LIGHT_SWITCHER_ACTIVE = 'light-options__switcher-box_state_active';
const CLASS_LIGHT_SWITCH_HANDLE_ACTIVE = 'light-options__switcher_state_active';

const CLASS_LIGHT_BRIGHTNESS_ACTIVE = 'config-light__option-brightness_state_active';
const CLASS_LIGHT_SPEED_ACTIVE = 'config-light__option-speed_state_active';
// const CLASS_LIGHT_MODE_ACTIVE = 'config-light__option-mode_state_active';

const CLASS_LIGHT_ROPE_WRAPPER_SHOW = 'xmas-tree__light-row-list_state_active';

const SNOW_RUN_CLASS = (num: number) => `xmas-tree__snow_layer_${num}`;
const SNOW_RUN_CLASS_COPY = (num: number) => `xmas-tree__snow_layer_${num}-copy`;

const decoratorState = new DecoratorState();

// helper Functions

function hexToRgb(hex: string) {
  return `${parseInt(hex.substring(1, 3), 16)}, ${parseInt(hex.substring(3, 5), 16)}, ${parseInt(
    hex.substring(5, 7),
    16
  )}`;
}

function bulbAnimationHelper(bulb: HTMLElement, color: string, delay: boolean, delayModifier?: number) {
  const bright = decoratorState.state.lightBrightness;
  const speed = decoratorState.state.lightSpeed;
  const animationDuration = 3000 / speed;
  let delayTime = 0;
  if (delay) {
    delayTime = animationDuration * delayModifier;
  }
  bulb.animate(
    [
      {
        background: `rgb(${color})`,
        filter: `contrast(150%) brightness(${bright}%) saturate(130%)`,
        boxShadow: `0 0.5rem 2.4rem 0.3rem rgb(${color})`,
        offset: 0,
      },
      {
        background: `rgba(${color}, 0.4)`,
        filter: `contrast(100%) brightness(100%) saturate(100%)`,
        boxShadow: `0 0.5rem 2.4rem 0.3rem rgba(${color}, 0.2)`,
        offset: 0.5,
      },
      {
        background: `rgb(${color})`,
        filter: `contrast(150%) brightness(${bright}%) saturate(130%)`,
        boxShadow: `0 0.5rem 2.4rem 0.3rem rgb(${color})`,
        offset: 1,
      },
    ],
    {
      delay: delayTime,
      duration: animationDuration,
      iterations: Infinity,
    }
  );
}

function bulbSameAnimation(bulbs: NodeListOf<HTMLElement>) {
  const color = decoratorState.state.colorSingle;
  let counter = 0;
  bulbs.forEach(el => {
    if (counter === 0) {
      bulbAnimationHelper(el, color, true, 1);
      counter++;
    } else if (counter === 1) {
      bulbAnimationHelper(el, color, true, 0.66);
      counter++;
    } else if (counter === 2) {
      bulbAnimationHelper(el, color, true, 0.33);
      counter = 0;
    }
  });
}

function bulbVaryAnimation(bulbs: NodeListOf<HTMLElement>) {
  let color: string[];
  if (decoratorState.state.lightAmount === 'many-default') {
    color = decoratorState.state.colorManyDefault;
  } else {
    color = decoratorState.state.colorMany;
  }
  let counter = 0;
  bulbs.forEach(el => {
    if (counter === 0) {
      bulbAnimationHelper(el, color[0], false);
      counter++;
    } else if (counter === 1) {
      bulbAnimationHelper(el, color[1], true, 0.5);
      counter++;
    } else if (counter === 2) {
      bulbAnimationHelper(el, color[2], true, 1);
      counter = 0;
    }
  });
}

function bulbAnimation(bulbs: NodeListOf<HTMLElement>) {
  if (decoratorState.state.lightAmount === 'one') {
    return bulbSameAnimation(bulbs);
  }
  return bulbVaryAnimation(bulbs);
}

export class DresserController {
  decorToyListRenderer(decoratorView: DecoratorView) {
    const targetToyList: HTMLElement = document.querySelector('.decor-toys__list');
    targetToyList.innerHTML = '';
    const info: IFilterStateStorage = JSON.parse(localStorage.getItem('filterState'));
    const pickedToys = info.filterState.toysPick;
    if (pickedToys.length > 0) {
      pickedToys.forEach(element => {
        const toy: IData = data[Number(element) - 1];
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
    const bool = el.classList.contains(CLASS_AUDIO_ACTIVE);
    el.classList.toggle(CLASS_AUDIO_ACTIVE);
    if (bool) {
      sound.pause();
    } else {
      sound.play();
    }
  }

  featureSnowHandler(el: HTMLElement, snowList: NodeListOf<HTMLElement>) {
    el.classList.toggle(CLASS_SNOW_ACTIVE);
    snowList.forEach((el, index) => {
      const num = Math.floor(index / 2 + 1);
      if (index % 2 === 0) {
        el.classList.toggle(SNOW_RUN_CLASS(num));
      } else {
        el.classList.toggle(SNOW_RUN_CLASS(num));
        el.classList.toggle(SNOW_RUN_CLASS_COPY(num));
      }
    });
  }

  treeTypeHandler(treeNew: HTMLElement, treeOld: HTMLElement) {
    treeOld.setAttribute('src', `./assets/tree/${treeNew.getAttribute('data-num')}.webp`);
  }

  backgroundHandler(backNew: HTMLElement, backOld: HTMLElement) {
    backOld.style.background = `center / cover no-repeat url(./assets/bg/${backNew.getAttribute('data-num')}.webp)`;
  }

  // light rope switch handler
  lightSwitchHandler(
    positionValue: HTMLElement,
    switcher: HTMLElement,
    switchHandle: HTMLElement,
    lightRopeWrapper: HTMLElement
  ) {
    decoratorState.state.lightState = !decoratorState.state.lightState;
    positionValue.innerText = positionValue.innerText === 'Выкл' ? 'Вкл' : 'Выкл';
    switcher.classList.toggle(CLASS_LIGHT_SWITCHER_ACTIVE);
    switchHandle.classList.toggle(CLASS_LIGHT_SWITCH_HANDLE_ACTIVE);
    lightRopeWrapper.classList.toggle(CLASS_LIGHT_ROPE_WRAPPER_SHOW);
  }

  // default colors light rope handler
  lightDefaultHandler(colorEl: HTMLElement, bulbs: NodeListOf<HTMLElement>) {
    const type = colorEl.getAttribute('data-type');
    decoratorState.state.lightAmount = colorEl.getAttribute('data-type');
    if (type === 'one') {
      decoratorState.state.colorSingle = colorEl.getAttribute('data-color');
    }
    bulbAnimation(bulbs);
  }

  // custom color handlers
  lightCustomOneHandler(eventElement: HTMLInputElement, bulbs: NodeListOf<HTMLElement>) {
    decoratorState.state.colorSingle = hexToRgb(eventElement.value);
    decoratorState.state.lightAmount = eventElement.getAttribute('data-type');
    bulbAnimation(bulbs);
  }
  lightCustomManyHandler(eventElement: HTMLInputElement, bulbs: NodeListOf<HTMLElement>) {
    const num = Number(eventElement.getAttribute('data-num'));
    decoratorState.state.colorMany[num] = hexToRgb(eventElement.value);
    decoratorState.state.lightAmount = eventElement.getAttribute('data-type');

    bulbAnimation(bulbs);
  }

  // additional light rope option list handlers
  lightBrightnessHandler(item: HTMLElement) {
    item.classList.toggle(CLASS_LIGHT_BRIGHTNESS_ACTIVE);
  }

  lightSpeedHandler(item: HTMLElement) {
    item.classList.toggle(CLASS_LIGHT_SPEED_ACTIVE);
  }

  /*  
  lightModeHandler(item: HTMLElement) {
    item.classList.toggle(CLASS_LIGHT_MODE_ACTIVE);
  } 
  */

  // additional light rope option handlers
  lightBrightnessOptionHandler(
    eventElement: HTMLElement,
    valueElement: HTMLElement,
    optionList: HTMLElement,
    bulbs: NodeListOf<HTMLElement>
  ) {
    const option = eventElement.innerText;
    valueElement.innerText = option;
    decoratorState.state.lightBrightness = Number(option);
    optionList.classList.toggle(CLASS_LIGHT_BRIGHTNESS_ACTIVE);
    bulbAnimation(bulbs);
  }

  lightSpeedOptionHandler(
    eventElement: HTMLElement,
    valueElement: HTMLElement,
    optionList: HTMLElement,
    bulbs: NodeListOf<HTMLElement>
  ) {
    const option = eventElement.innerText;
    valueElement.innerText = option;
    decoratorState.state.lightSpeed = Number(option);
    optionList.classList.toggle(CLASS_LIGHT_SPEED_ACTIVE);
    bulbAnimation(bulbs);
  }

  /* lightModeOptionHandler(
    eventElement: HTMLElement,
    valueElement: HTMLElement,
    optionList: HTMLElement,
    bulbs: NodeListOf<HTMLElement>
  ) {
    const option = eventElement.innerText;
    valueElement.innerText = option;
    decoratorState.state.lightMode = Number(option);
    optionList.classList.toggle(CLASS_LIGHT_MODE_ACTIVE);
    bulbAnimation(bulbs);
  } */

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
