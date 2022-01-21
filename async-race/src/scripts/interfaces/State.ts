import { CarData } from './CarData';

export interface State {
  selectedCar: CarData;
  pageName: string;
  pageNumber: number;
}
