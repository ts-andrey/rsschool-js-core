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

  setState(obj: DecoratorState) {
    const newState = obj.state;
    (Object.keys(newState) as (keyof IDecoratorState)[]).forEach(key =>
      Object.assign(this.state, { [`${key}`]: newState[`${key}`] })
    );
  }
}
