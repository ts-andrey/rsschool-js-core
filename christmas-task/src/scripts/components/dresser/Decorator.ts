import { IDecorator } from './IDecorator';

export class Decorator {
  soundIcon: HTMLElement;
  snowIcon: HTMLElement;
  snowElements: NodeListOf<HTMLElement>;

  choiseTreeImg: NodeListOf<HTMLElement>;

  choiseBackgroundImg: NodeListOf<HTMLElement>;

  bulbs: NodeListOf<HTMLElement>;

  choiseColorLight: NodeListOf<HTMLElement>;
  choiseColorLightCustomOne: HTMLInputElement;
  choiseColorLightsCustomMany: NodeListOf<HTMLInputElement>;

  lightSwitcher: HTMLElement;
  switchHandle: HTMLElement;
  lightSwitcherValue: HTMLElement;
  lightRopeWrapper: HTMLElement;

  lightListBright: HTMLElement;
  lightValueBright: HTMLElement;
  lightListBrightOpener: HTMLElement;
  lightListBrightItems: NodeListOf<HTMLElement>;

  lightListSpeedOpener: HTMLElement;
  lightValueSpeed: HTMLElement;
  lightListSpeed: HTMLElement;
  lightListSpeedItems: NodeListOf<HTMLElement>;

  lightListModeOpener: HTMLElement;
  lightValueMode: HTMLElement;
  lightListMode: HTMLElement;
  lightListModeItems: NodeListOf<HTMLElement>;

  dresserBackground: HTMLElement;
  dresserTreeImg: HTMLElement;

  toyList: NodeListOf<HTMLElement>;

  clearBtn: HTMLElement;

  targetPlace: HTMLElement;
  outerDropChecker: HTMLElement;

  constructor() {
    /* config element */
    this.soundIcon = document.querySelector('.features__sound-icon');
    this.snowIcon = document.querySelector('.features__snow-icon');
    this.snowElements = document.querySelectorAll('.xmas-tree__snow');

    this.choiseTreeImg = document.querySelectorAll('.config-tree__img');

    this.choiseBackgroundImg = document.querySelectorAll('.config-background__img');

    // bulbs
    this.bulbs = document.querySelectorAll('.xmas-tree__light-bulb');

    // color pickers
    this.choiseColorLight = document.querySelectorAll('.config-light__item');

    this.choiseColorLightCustomOne = document.querySelector('.color-pick__single-picker');
    this.choiseColorLightsCustomMany = document.querySelectorAll('.color-pick__multiple-picker');

    // light switch
    this.lightSwitcher = document.querySelector('.light-options__switcher-box');
    this.switchHandle = document.querySelector('.light-options__switcher');
    this.lightSwitcherValue = document.querySelector('.light-options__switcher-value');
    this.lightRopeWrapper = document.querySelector('.xmas-tree__light-row-list');

    // light options
    // brightness
    this.lightListBrightOpener = document.querySelector('.light-options__brightness-wrapper');
    this.lightValueBright = document.querySelector('.light-options__brightness-value');
    this.lightListBright = document.querySelector('.config-light__option-brightness');
    this.lightListBrightItems = document.querySelectorAll('.light-options__brightness-item');

    // speed
    this.lightListSpeedOpener = document.querySelector('.light-options__speed-wrapper');
    this.lightValueSpeed = document.querySelector('.light-options__speed-value');
    this.lightListSpeed = document.querySelector('.config-light__option-speed');
    this.lightListSpeedItems = document.querySelectorAll('.light-options__speed-item');

    // mode
    this.lightListModeOpener = document.querySelector('.light-options__mode-wrapper');
    this.lightValueMode = document.querySelector('.light-options__mode-value');
    this.lightListMode = document.querySelector('.config-light__option-mode');
    this.lightListModeItems = document.querySelectorAll('.light-options__mode-item');

    /* decoration elements */
    this.dresserBackground = document.querySelector('.dresser-wrapper__xmas-tree');
    this.dresserTreeImg = document.querySelector('.xmas-tree__img');

    /* decoration-tools elements */
    // toy drag'n'drop
    this.toyList = document.querySelectorAll('.decor-toys__img');
    this.targetPlace = document.querySelector('.xmas-tree__img');
    this.outerDropChecker = document.querySelector('.xmas-tree dresser-wrapper__xmas-tree');

    this.clearBtn = document.querySelector('.clear__btn');

    /* decoration result elements */
    // this.workList = document.querySelector('.work-list');
  }

  getAllElements() {
    return {
      soundIcon: this.soundIcon,
      snowIcon: this.snowIcon,
      snowElements: this.snowElements,

      choiseTreeImg: this.choiseTreeImg,

      choiseBackgroundImg: this.choiseBackgroundImg,

      bulbs: this.bulbs,

      choiseColorLight: this.choiseColorLight,
      choiseColorLightCustomOne: this.choiseColorLightCustomOne,
      choiseColorLightsCustomMany: this.choiseColorLightsCustomMany,

      lightSwitcher: this.lightSwitcher,
      switchHandle: this.switchHandle,
      lightSwitcherValue: this.lightSwitcherValue,
      lightRopeWrapper: this.lightRopeWrapper,

      lightListBright: this.lightListBright,
      lightValueBright: this.lightValueBright,
      lightListBrightOpener: this.lightListBrightOpener,
      lightListBrightItems: this.lightListBrightItems,

      lightListSpeedOpener: this.lightListSpeedOpener,
      lightValueSpeed: this.lightValueSpeed,
      lightListSpeed: this.lightListSpeed,
      lightListSpeedItems: this.lightListSpeedItems,

      lightListModeOpener: this.lightListModeOpener,
      lightValueMode: this.lightValueMode,
      lightListMode: this.lightListMode,
      lightListModeItems: this.lightListModeItems,

      dresserBackground: this.dresserBackground,
      dresserTreeImg: this.dresserTreeImg,

      toyList: this.toyList,

      clearBtn: this.clearBtn,

      targetPlace: this.targetPlace,
      outerDropChecker: this.outerDropChecker,
    };
  }

  setStyles(styleSetter: (elements: IDecorator) => void) {
    return styleSetter(this.getAllElements());
  }

  featureSoundSeeker(featureHandler: (el: HTMLElement) => void) {
    this.soundIcon.addEventListener('click', () => featureHandler(this.soundIcon));
  }
  featureSnowSeeker(featureHandler: (el: HTMLElement, elements: NodeListOf<HTMLElement>) => void) {
    this.snowIcon.addEventListener('click', () => featureHandler(this.snowIcon, this.snowElements));
  }

  treeTypeSeeker(
    treeTypeHandler: (treeNew: HTMLElement, treeOld: HTMLElement, allElems: NodeListOf<HTMLElement>) => void
  ) {
    this.choiseTreeImg.forEach(el => {
      el.addEventListener('click', () => treeTypeHandler(el, this.dresserTreeImg, this.choiseTreeImg));
    });
  }

  backgroundSeeker(
    backgroundHandler: (backNew: HTMLElement, backOld: HTMLElement, allElems: NodeListOf<HTMLElement>) => void
  ) {
    this.choiseBackgroundImg.forEach(el => {
      el.addEventListener('click', () => backgroundHandler(el, this.dresserBackground, this.choiseBackgroundImg));
    });
  }

  lightSwitchSeeker(
    lightSwitchHandler: (
      positionValue: HTMLElement,
      switcher: HTMLElement,
      switchHandler: HTMLElement,
      lightRopeWrapper: HTMLElement,
      bulbs: NodeListOf<HTMLElement>
    ) => void
  ) {
    this.lightSwitcher.addEventListener('click', () => {
      return lightSwitchHandler(
        this.lightSwitcherValue,
        this.lightSwitcher,
        this.switchHandle,
        this.lightRopeWrapper,
        this.bulbs
      );
    });
  }

  lightDefaultSeeker(lightDefaultHandler: (colorEl: HTMLElement, bulbs: NodeListOf<HTMLElement>) => void) {
    this.choiseColorLight.forEach(el => el.addEventListener('click', () => lightDefaultHandler(el, this.bulbs)));
  }

  lightCustomOneSeeker(lightCustomOneHandler: (colorInput: HTMLInputElement, bulbs: NodeListOf<HTMLElement>) => void) {
    this.choiseColorLightCustomOne.addEventListener('change', () =>
      lightCustomOneHandler(this.choiseColorLightCustomOne, this.bulbs)
    );
  }

  lightCustomManySeeker(
    lightCustomManyHandler: (colorInput: HTMLInputElement, bulbs: NodeListOf<HTMLElement>) => void
  ) {
    this.choiseColorLightsCustomMany.forEach(el => {
      el.addEventListener('change', () => lightCustomManyHandler(el, this.bulbs));
    });
  }

  lightBrightnessSeeker(lightBrightnessHandler: (list: HTMLElement) => void) {
    this.lightListBrightOpener.addEventListener('click', () => lightBrightnessHandler(this.lightListBright));
  }
  lightSpeedSeeker(lightSpeedHandler: (list: HTMLElement) => void) {
    this.lightListSpeedOpener.addEventListener('click', () => lightSpeedHandler(this.lightListSpeed));
  }
  lightModeSeeker(lightModeHandler: (list: HTMLElement) => void) {
    this.lightListModeOpener.addEventListener('click', () => lightModeHandler(this.lightListMode));
  }

  lightBightnessOptionSeeker(
    lightBrightnessOptionHandler: (
      eventElement: HTMLElement,
      valueElement: HTMLElement,
      list: HTMLElement,
      bulbs: NodeListOf<HTMLElement>
    ) => void
  ) {
    this.lightListBrightItems.forEach(el => {
      el.addEventListener('click', () =>
        lightBrightnessOptionHandler(el, this.lightValueBright, this.lightListBright, this.bulbs)
      );
    });
  }
  lightSpeedOptionSeeker(
    lightSpeedOptionHandler: (
      eventElement: HTMLElement,
      valueElement: HTMLElement,
      list: HTMLElement,
      bulbs: NodeListOf<HTMLElement>
    ) => void
  ) {
    this.lightListSpeedItems.forEach(el => {
      el.addEventListener('click', () =>
        lightSpeedOptionHandler(el, this.lightValueSpeed, this.lightListSpeed, this.bulbs)
      );
    });
  }

  dragNDropSeeker(DragNDropHandler: (toys: NodeListOf<HTMLElement>, targetPlace: HTMLElement) => void) {
    return DragNDropHandler(this.toyList, this.targetPlace);
  }

  dresserClearSeeker(dresserClearHandler: () => void) {
    this.clearBtn.addEventListener('click', () => dresserClearHandler());
  }
}
