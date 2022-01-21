import { getCarData } from './Util';
export class Garage {
  inputTextCreate: HTMLInputElement;
  inputColorCreate: HTMLInputElement;
  btnCarCreate: HTMLButtonElement;

  inputTextUpdate: HTMLInputElement;
  inputColorUpdate: HTMLInputElement;
  btnCarUpdate: HTMLButtonElement;

  btnCarsRase: HTMLButtonElement;
  btnCarsReset: HTMLButtonElement;
  btnCarsGenerate: HTMLButtonElement;

  btnsSelect: NodeListOf<HTMLButtonElement>;
  btnsRemove: NodeListOf<HTMLButtonElement>;

  btnPagePrev: HTMLButtonElement;
  btnPageNext: HTMLButtonElement;

  btnsStart: NodeListOf<HTMLButtonElement>;
  btnsReturn: NodeListOf<HTMLButtonElement>;

  constructor() {
    this.inputTextCreate = document.querySelector('.input-name_create');
    this.inputColorCreate = document.querySelector('.input-color_create');
    this.btnCarCreate = document.querySelector('.btn__car_create');

    this.inputTextUpdate = document.querySelector('.input-name_update');
    this.inputColorUpdate = document.querySelector('.input-color_update');
    this.btnCarUpdate = document.querySelector('.btn__car_update');

    this.btnCarsRase = document.querySelector('.btn__cars_race');
    this.btnCarsReset = document.querySelector('.btn__cars_reset');
    this.btnCarsGenerate = document.querySelector('.btn__cars_generate');

    this.btnsSelect = document.querySelectorAll('.car-item__btn_type_select');
    this.btnsRemove = document.querySelectorAll('.car-item__btn_type_remove');

    this.btnsStart = document.querySelectorAll('.car-item__btn_type_start');
    this.btnsReturn = document.querySelectorAll('.car-item__btn_type_back');

    this.btnPagePrev = document.querySelector('.page-nav_prev');
    this.btnPageNext = document.querySelector('.page-nav_next');
  }

  seekerCreateCar(createHandler: (name: HTMLInputElement, color: HTMLInputElement) => void) {
    this.btnCarCreate.addEventListener('click', () => createHandler(this.inputTextCreate, this.inputColorCreate));
  }
  seekerUpdateCar(updateHandler: (name: HTMLInputElement, color: HTMLInputElement) => void) {
    this.btnCarUpdate.addEventListener('click', () => updateHandler(this.inputTextUpdate, this.inputColorUpdate));
  }
  seekerRaceCars(raceHandler: () => void) {
    this.btnCarsRase.addEventListener('click', () => raceHandler());
  }
  seekerResetCars(resetHandler: () => void) {
    this.btnCarsReset.addEventListener('click', () => resetHandler());
  }
  seekerGenerateCars(generateHandler: () => void) {
    this.btnCarsGenerate.addEventListener('click', () => generateHandler());
  }

  seekerSelectCar(
    selectCarHandler: (
      id: number,
      name: string,
      color: string,
      nameInput: HTMLInputElement,
      colorInput: HTMLInputElement,
      el: HTMLElement
    ) => void
  ) {
    this.btnsSelect.forEach(el => {
      el.addEventListener('click', () => {
        const carData = getCarData(el.parentElement);
        selectCarHandler(
          carData.id,
          carData.name,
          carData.color,
          this.inputTextUpdate,
          this.inputColorUpdate,
          el.parentElement.parentElement
        );
      });
    });
  }
  seekerRemoveCar(removeCarHandler: (id: number) => void) {
    this.btnsRemove.forEach(el => {
      el.addEventListener('click', () => {
        console.log(el);
        const carData = getCarData(el.parentElement);
        removeCarHandler(carData.id);
      });
    });
  }
  seekerStartCar(startCarHandler: (id: number) => void) {
    this.btnsStart.forEach(el => {
      el.addEventListener('click', () => {
        console.log(el);
        const carData = getCarData(el.parentElement);
        startCarHandler(carData.id);
      });
    });
  }
  seekerReturnCar(returnCarHandler: (el: HTMLElement) => void) {
    this.btnsReturn.forEach(el => {
      el.addEventListener('click', () => returnCarHandler(el));
    });
  }

  getAllCars() {
    const allCars = document.querySelectorAll('.car-image');
    return allCars;
  }
}
