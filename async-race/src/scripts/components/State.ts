import { CarData } from '../interfaces/CarData';

export class State {
  selectedCar: CarData;
  pageName: string;
  pageNumber: number;
  carElement: HTMLElement;

  constructor() {
    this.carElement = null;
    this.selectedCar = {
      id: null,
      color: null,
      name: null,
    };
    this.pageName = 'garage';
    this.pageNumber = 1;
  }

  setSelectedState(id: number, name: string, color: string) {
    this.selectedCar = {
      id,
      name,
      color,
    };
  }
  setPageName(pageName: string) {
    this.pageName = pageName;
  }
  setPageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
  }
  setCarElement(el: HTMLElement) {
    this.carElement = el;
  }
}
