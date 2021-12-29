export interface IDecoratorState {
  [key: string]: boolean | number | string[] | string;
  music: boolean;
  snow: boolean;
  tree: number;
  bg: number;
  colorSingle: string;
  colorManyDefault: string[];
  colorMany: string[];
  lightState: boolean;
  lightSpeed: number;
  lightBrightness: number;
  lightMode: number;
  lightAmount: string;
}
