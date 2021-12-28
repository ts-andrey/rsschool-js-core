import { IDecoratorState } from './../components/state/IDecoratorState';
import { IData } from './../components/data/IData';
import data from '../../assets/data';
import { IFilterStateStorage } from '../components/state/IFilterState';
import { DecoratorView } from '../view/Decorator';
import { DecoratorState } from '../components/state/DecoratorState';
import { IDecorator } from '../components/dresser/IDecorator';

const sound = new Audio('./assets/audio/audio.webm');
sound.loop = true;
const CLASS_AUDIO_ACTIVE = 'features__sound-icon_state_active';
const CLASS_SNOW_ACTIVE = 'features__snow-icon_state_active';

const CLASS_TREE_IMG_ACTIVE = 'config-tree__img_state_active';
const CLASS_BG_IMG_ACTIVE = 'config-background__img_state_active';

const CLASS_LIGHT_SWITCHER_ACTIVE = 'light-options__switcher-box_state_active';
const CLASS_LIGHT_SWITCH_HANDLE_ACTIVE = 'light-options__switcher_state_active';

const CLASS_LIGHT_BRIGHTNESS_ACTIVE = 'config-light__option-brightness_state_active';
const CLASS_LIGHT_SPEED_ACTIVE = 'config-light__option-speed_state_active';
// const CLASS_LIGHT_MODE_ACTIVE = 'config-light__option-mode_state_active';

const CLASS_LIGHT_ROPE_WRAPPER_SHOW = 'xmas-tree__light-row-list_state_active';

const SNOW_RUN_CLASS = (num: number) => `xmas-tree__snow_layer_${num}`;
const SNOW_RUN_CLASS_COPY = (num: number) => `xmas-tree__snow_layer_${num}-copy`;

const decoratorState = new DecoratorState();
if (!localStorage.getItem('dresserState')) {
  localStorage.setItem('dresserState', JSON.stringify(decoratorState));
} else {
  decoratorState.setState(JSON.parse(localStorage.getItem('dresserState')));
}

function updateLocalStorage(state: DecoratorState) {
  localStorage.setItem('dresserState', JSON.stringify(state));
}

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
        filter: `contrast(200%) brightness(${bright}%) saturate(130%)`,
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
        filter: `contrast(200%) brightness(${bright}%) saturate(130%)`,
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
      decoratorState.state.music = false;
      sound.pause();
    } else {
      decoratorState.state.music = true;
      sound.play();
    }
    updateLocalStorage(decoratorState);
  }

  featureSnowHandler(el: HTMLElement, snowList: NodeListOf<HTMLElement>) {
    if (el.classList.contains(CLASS_SNOW_ACTIVE)) {
      decoratorState.state.snow = false;
    } else {
      decoratorState.state.snow = true;
    }
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
    updateLocalStorage(decoratorState);
  }

  treeTypeHandler(treeNew: HTMLElement, treeOld: HTMLElement, allTrees: NodeListOf<HTMLElement>) {
    allTrees.forEach(el => el.classList.remove(CLASS_TREE_IMG_ACTIVE));
    const treeImgNum = treeNew.getAttribute('data-num');
    treeOld.setAttribute('src', `./assets/tree/${treeImgNum}.webp`);
    treeNew.classList.add(CLASS_TREE_IMG_ACTIVE);
    decoratorState.state.tree = Number(treeImgNum);
    updateLocalStorage(decoratorState);
  }

  backgroundHandler(backNew: HTMLElement, backOld: HTMLElement, allBgs: NodeListOf<HTMLElement>) {
    allBgs.forEach(el => el.classList.remove(CLASS_BG_IMG_ACTIVE));
    const backImgNum = backNew.getAttribute('data-num');
    backOld.style.background = `center / cover no-repeat url(./assets/bg/${backImgNum}.webp)`;
    backNew.classList.add(CLASS_BG_IMG_ACTIVE);
    decoratorState.state.bg = Number(backImgNum);

    updateLocalStorage(decoratorState);
  }

  // light rope switch handler
  lightSwitchHandler(
    positionValue: HTMLElement,
    switcher: HTMLElement,
    switchHandle: HTMLElement,
    lightRopeWrapper: HTMLElement,
    bulbs: NodeListOf<HTMLElement>
  ) {
    decoratorState.state.lightState = !decoratorState.state.lightState;
    updateLocalStorage(decoratorState);
    positionValue.innerText = positionValue.innerText === 'Выкл' ? 'Вкл' : 'Выкл';
    switcher.classList.toggle(CLASS_LIGHT_SWITCHER_ACTIVE);
    switchHandle.classList.toggle(CLASS_LIGHT_SWITCH_HANDLE_ACTIVE);
    lightRopeWrapper.classList.toggle(CLASS_LIGHT_ROPE_WRAPPER_SHOW);
    bulbAnimation(bulbs);
  }

  // default colors light rope handler
  lightDefaultHandler(colorEl: HTMLElement, bulbs: NodeListOf<HTMLElement>) {
    const type = colorEl.getAttribute('data-type');
    decoratorState.state.lightAmount = colorEl.getAttribute('data-type');
    if (type === 'one') {
      decoratorState.state.colorSingle = colorEl.getAttribute('data-color');
    }
    bulbAnimation(bulbs);
    updateLocalStorage(decoratorState);
  }

  // custom color handlers
  lightCustomOneHandler(eventElement: HTMLInputElement, bulbs: NodeListOf<HTMLElement>) {
    decoratorState.state.colorSingle = hexToRgb(eventElement.value);
    decoratorState.state.lightAmount = eventElement.getAttribute('data-type');
    updateLocalStorage(decoratorState);
    bulbAnimation(bulbs);
  }
  lightCustomManyHandler(eventElement: HTMLInputElement, bulbs: NodeListOf<HTMLElement>) {
    const num = Number(eventElement.getAttribute('data-num'));
    decoratorState.state.colorMany[num] = hexToRgb(eventElement.value);
    decoratorState.state.lightAmount = eventElement.getAttribute('data-type');
    updateLocalStorage(decoratorState);

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
    updateLocalStorage(decoratorState);
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
    updateLocalStorage(decoratorState);
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

  dresserToyListDragStartHandler(eventGlobal: DragEvent, toy: HTMLElement, counter: HTMLElement, target: HTMLElement) {
    target.addEventListener('dragover', (ev: DragEvent) => {
      ev.preventDefault();
      return;
    });
    target.addEventListener('dragenter', (ev: DragEvent) => {
      ev.preventDefault();
      return;
    });
    target.addEventListener('dragleave', (ev: DragEvent) => {
      ev.preventDefault();
      return;
    });
    target.addEventListener('drop', (ev: DragEvent) => {
      ev.preventDefault();
      const copy = <HTMLElement>toy.cloneNode(true);
      target.parentElement.append(copy);

      copy.style.position = 'absolute';
      copy.style.zIndex = '10';
      copy.style.left = `${Math.abs(ev.offsetX - eventGlobal.offsetX)}px`;
      copy.style.top = `${Math.abs(ev.offsetY - eventGlobal.offsetY)}px`;

      const num = Number(counter.textContent);
      counter.textContent = num === 0 ? String(0) : String(num - 1);
      return;
    });

    toy.addEventListener('dragend', (ev: DragEvent) => {
      ev.preventDefault();

      return;
    });
  }

  dresserDragTargetHandler(ev: Event, target: HTMLElement) {
    ev.preventDefault();
  }

  dresserWorkListHandler() {
    ('');
  }

  styleSetter(items: IDecorator) {
    /* handling saved progress */
    // sound
    if (decoratorState.state.music) {
      sound.play();
      items.soundIcon.classList.add(CLASS_AUDIO_ACTIVE);
    }
    // snow
    if (decoratorState.state.snow) {
      items.snowIcon.classList.toggle(CLASS_SNOW_ACTIVE);
      items.snowElements.forEach((el, index) => {
        const num = Math.floor(index / 2 + 1);
        if (index % 2 === 0) {
          el.classList.toggle(SNOW_RUN_CLASS(num));
        } else {
          el.classList.toggle(SNOW_RUN_CLASS(num));
          el.classList.toggle(SNOW_RUN_CLASS_COPY(num));
        }
      });
    }

    // tree
    items.dresserTreeImg.setAttribute('src', `./assets/tree/${decoratorState.state.tree}.webp`);
    items.choiseTreeImg[decoratorState.state.tree - 1].classList.add(CLASS_TREE_IMG_ACTIVE);

    // bg
    items.dresserBackground.style.background = `center / cover no-repeat url(./assets/bg/${decoratorState.state.bg}.webp)`;
    items.choiseBackgroundImg[decoratorState.state.bg - 1].classList.add(CLASS_BG_IMG_ACTIVE);

    // color

    // lightSwitcher
    if (decoratorState.state.lightState) {
      items.lightSwitcher.classList.add(CLASS_LIGHT_SWITCHER_ACTIVE);

      items.lightSwitcherValue.innerText = items.lightSwitcherValue.innerText === 'Выкл' ? 'Вкл' : 'Выкл';
      items.switchHandle.classList.toggle(CLASS_LIGHT_SWITCH_HANDLE_ACTIVE);
      items.lightRopeWrapper.classList.toggle(CLASS_LIGHT_ROPE_WRAPPER_SHOW);
      bulbAnimation(items.bulbs);
    }

    // bulbLightAmount
    items.lightValueBright.innerText = String(decoratorState.state.lightBrightness);

    // bulbSparkleSpeed
    items.lightValueSpeed.innerText = String(decoratorState.state.lightSpeed);
  }

  storageReset() {
    localStorage.clear();
    location.reload();
  }
}
