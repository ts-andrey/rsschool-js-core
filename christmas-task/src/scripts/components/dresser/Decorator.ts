export class Decorator {
  soundIcon: HTMLElement;
  snowIcon: HTMLElement;
  snowElements: NodeListOf<HTMLElement>;

  choiseTreeImg: NodeListOf<HTMLElement>;

  choiseBackgroundImg: NodeListOf<HTMLElement>;

  choiseColorLight: NodeListOf<HTMLElement>;
  choiseColorLightCustomOne: HTMLInputElement;
  choiseColorLightsCustomMany: NodeListOf<HTMLInputElement>;

  lightSwitcher: HTMLElement;
  lightSwitcherValue: HTMLElement;

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

  saveWorkBtn: HTMLElement;

  workList: HTMLElement;

  constructor() {
    /* config element */
    this.soundIcon = document.querySelector('.features__sound-icon');
    this.snowIcon = document.querySelector('.features__snow-icon');
    this.snowElements = document.querySelectorAll('.xmas-tree__snow');

    this.choiseTreeImg = document.querySelectorAll('.config-tree__img');

    this.choiseBackgroundImg = document.querySelectorAll('.config-background__img');
    this.choiseColorLight = document.querySelectorAll('.config-light__item');

    // color pickers
    this.choiseColorLightCustomOne = document.querySelector('.color-pick__single-picker');
    this.choiseColorLightsCustomMany = document.querySelectorAll('.color-pick__multiple-picker');

    // light switch
    this.lightSwitcher = document.querySelector('.light-options__switcher-box');
    this.lightSwitcherValue = document.querySelector('.light-options__switcher-value');

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

    this.saveWorkBtn = document.querySelector('.save__btn');

    /* decoration result elements */
    this.workList = document.querySelector('.work-list');
  }

  featureSoundSeeker(featureHandler: (el: HTMLElement) => void) {
    this.soundIcon.addEventListener('click', () => {
      return featureHandler(this.soundIcon);
    });
  }
  featureSnowSeeker(featureHandler: (el: HTMLElement, elements: NodeListOf<HTMLElement>) => void) {
    this.snowIcon.addEventListener('click', () => {
      return featureHandler(this.snowIcon, this.snowElements);
    });
  }

  treeTypeSeeker(treeTypeHandler: (treeNew: HTMLElement, treeOld: HTMLElement) => void) {
    this.choiseTreeImg.forEach(el => {
      el.addEventListener('click', () => {
        return treeTypeHandler(el, this.dresserTreeImg);
      });
    });
  }

  backgroundSeeker(backgroundHandler: (backNew: HTMLElement, backOld: HTMLElement) => void) {
    this.choiseBackgroundImg.forEach(el => {
      el.addEventListener('click', () => {
        return backgroundHandler(el, this.dresserBackground);
      });
    });
  }

  lightSwitchSeeker(lightSwitchHandler: (positionValue: HTMLElement, switcher: HTMLElement) => void) {
    this.lightSwitcher.addEventListener('click', () => {
      return lightSwitchHandler(this.lightSwitcherValue, this.lightSwitcher);
    });
  }

  lightDefaultSeeker(lightDefaultHandler: (colorElement: HTMLElement) => void) {
    this.choiseColorLight.forEach(el => {
      el.addEventListener('click', () => {
        return lightDefaultHandler(el);
      });
    });
  }

  lightCustomOneSeeker(lightCustomOneHandler: (colorInput: HTMLInputElement) => void) {
    this.choiseColorLightCustomOne.addEventListener('click', () => {
      return lightCustomOneHandler(this.choiseColorLightCustomOne);
    });
  }

  lightCustomManySeeker(lightCustomManyHandler: (colorInput: HTMLInputElement) => void) {
    this.choiseColorLightsCustomMany.forEach(el => {
      el.addEventListener('click', () => {
        return lightCustomManyHandler(el);
      });
    });
  }

  lightBrightnessSeeker(lightBrightnessHandler: (list: HTMLElement) => void) {
    this.lightListBrightOpener.addEventListener('click', () => {
      return lightBrightnessHandler(this.lightListBright);
    });
  }
  lightSpeedSeeker(lightSpeedHandler: (list: HTMLElement) => void) {
    this.lightListSpeedOpener.addEventListener('click', () => {
      return lightSpeedHandler(this.lightListSpeed);
    });
  }
  lightModeSeeker(lightModeHandler: (list: HTMLElement) => void) {
    this.lightListModeOpener.addEventListener('click', () => {
      return lightModeHandler(this.lightListMode);
    });
  }

  lightBightnessOptionSeeker(
    lightBrightnessOptionHandler: (eventElement: HTMLElement, valueElement: HTMLElement) => void
  ) {
    this.lightListBrightItems.forEach(el => {
      el.addEventListener('click', () => {
        return lightBrightnessOptionHandler(el, this.lightValueBright);
      });
    });
  }
  lightSpeedOptionSeeker(lightSpeedOptionHandler: (eventElement: HTMLElement, valueElement: HTMLElement) => void) {
    this.lightListSpeedItems.forEach(el => {
      el.addEventListener('click', () => {
        return lightSpeedOptionHandler(el, this.lightValueSpeed);
      });
    });
  }
  lightModeOptionSeeker(lightModeOptionHandler: (eventElement: HTMLElement, valueElement: HTMLElement) => void) {
    this.lightListModeItems.forEach(el => {
      el.addEventListener('click', () => {
        return lightModeOptionHandler(el, this.lightValueMode);
      });
    });
  }

  dresserToySeeker(toyList: NodeListOf<HTMLElement>, dresserToyHandler: (ev: Event, toy: HTMLElement) => void) {
    toyList.forEach(el => {
      el.addEventListener('click', ev => {
        return dresserToyHandler(ev, el);
      });
    });
  }

  dresserSaveSeeker(dresserSaveHandler: () => void) {
    this.saveWorkBtn.addEventListener('click', () => {
      return dresserSaveHandler();
    });
  }

  dresserWorkListSeeker(elements: NodeListOf<HTMLElement>, dresserWorkListHandler: (el: HTMLElement) => void) {
    if (elements.length > 0) {
      elements.forEach(el => {
        el.addEventListener('click', () => {
          return dresserWorkListHandler(el);
        });
      });
    }
  }
}
