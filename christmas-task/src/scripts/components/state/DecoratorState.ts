import { IDecoratorState } from './IDecoratorState';
export class DecoratorState {
  state: IDecoratorState;
  constructor() {
    this.state = {
      music: false,
      snow: false,
      tree: 1,
      bg: 1,
      colorSingle: '255, 255, 255',
      colorManyDefault: ['255, 0, 0', '0, 255, 0', '0, 0, 255'],
      colorMany: ['255, 0, 0', '0, 255, 0', '0, 0, 255'],
      lightState: false,
      lightSpeed: 1,
      lightBrightness: 100,
      lightMode: 1,
      lightAmount: 'one',
    };
  }

  resetState() {
    this.state.music = false;
    this.state.snow = false;
    this.state.tree = 1;
    this.state.bg = 1;
    this.state.colorSingle = '255, 255, 255';
    this.state.colorMany = ['255, 0, 0', '0, 255, 0', '0, 0, 255'];
    this.state.lightState = false;
    this.state.lightSpeed = 1;
    this.state.lightBrightness = 100;
    this.state.lightMode = 1;
    this.state.lightAmount = 'one';
  }

  setState(obj: IDecoratorState) {
    this.state.music = obj.music;
    this.state.snow = obj.snow;
    this.state.tree = obj.tree;
    this.state.bg = obj.bg;
    this.state.colorSingle = obj.colorSingle;
    this.state.colorMany = obj.colorMany;
    this.state.lightState = obj.lightState;
    this.state.lightSpeed = obj.lightSpeed;
    this.state.lightBrightness = obj.lightBrightness;
    this.state.lightMode = obj.lightMode;
    this.state.lightAmount = obj.lightAmount;
  }
}
