export interface IDecorator {
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

  // workList: HTMLElement;
  targetPlace: HTMLElement;
  outerDropChecker: HTMLElement;
}
