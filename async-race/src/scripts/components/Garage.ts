export class Garage {
  inputTextCreate: HTMLInputElement;
  inputColorCreate: HTMLInputElement;
  btnCarCreate: HTMLButtonElement;

  inputTextUpdate: HTMLInputElement;
  inputColorUpdate: HTMLInputElement;
  btnCarUpdate: HTMLButtonElement;

  btnCarsRace: HTMLButtonElement;
  btnCarsReset: HTMLButtonElement;
  btnCarsGenerate: HTMLButtonElement;

  carAmount: HTMLElement;
  pageNumber: HTMLElement;

  btnPagePrev: HTMLButtonElement;
  btnPageNext: HTMLButtonElement;

  constructor() {
    this.inputTextCreate = document.querySelector('.input-name_create');
    this.inputColorCreate = document.querySelector('.input-color_create');
    this.btnCarCreate = document.querySelector('.btn__car_create');

    this.inputTextUpdate = document.querySelector('.input-name_update');
    this.inputColorUpdate = document.querySelector('.input-color_update');
    this.btnCarUpdate = document.querySelector('.btn__car_update');

    this.carAmount = document.querySelector('.main-box__car-amount');
    this.pageNumber = document.querySelector('.main-box__page-number');

    this.btnCarsRace = document.querySelector('.btn__cars_race');
    this.btnCarsReset = document.querySelector('.btn__cars_reset');
    this.btnCarsGenerate = document.querySelector('.btn__cars_generate');

    this.btnPagePrev = document.querySelector('.page-nav_prev');
    this.btnPageNext = document.querySelector('.page-nav_next');
  }

  seekerCreateCar(createHandler: (name: HTMLInputElement, color: HTMLInputElement) => void) {
    this.btnCarCreate.addEventListener('click', () => createHandler(this.inputTextCreate, this.inputColorCreate));
  }
  seekerUpdateCar(
    updateHandler: (
      name: HTMLInputElement,
      color: HTMLInputElement,
      inputUpdate: HTMLInputElement,
      btnUpdate: HTMLButtonElement
    ) => void
  ) {
    this.btnCarUpdate.addEventListener('click', () =>
      updateHandler(this.inputTextUpdate, this.inputColorUpdate, this.inputTextUpdate, this.btnCarUpdate)
    );
  }
  seekerRaceCars(raceHandler: (btnRace: HTMLButtonElement, btnReset: HTMLButtonElement) => void) {
    this.btnCarsRace.addEventListener('click', () => raceHandler(this.btnCarsRace, this.btnCarsReset));
  }
  seekerResetCars(resetHandler: (btnRace: HTMLButtonElement, btnReset: HTMLButtonElement) => void) {
    this.btnCarsReset.addEventListener('click', () => resetHandler(this.btnCarsRace, this.btnCarsReset));
  }
  seekerGenerateCars(generateHandler: () => void) {
    this.btnCarsGenerate.addEventListener('click', () => generateHandler());
  }
  seekerPreviosPageNav(
    previousPageHandler: (
      btnPrev: HTMLButtonElement,
      btnNext: HTMLButtonElement,
      curPage: HTMLElement,
      carAmount: HTMLElement
    ) => void
  ) {
    this.btnPagePrev.addEventListener('click', () =>
      previousPageHandler(this.btnPagePrev, this.btnPageNext, this.pageNumber, this.carAmount)
    );
  }
  seekerNextPageNav(
    nextPageHandler: (
      btnPrev: HTMLButtonElement,
      btnNext: HTMLButtonElement,
      curPage: HTMLElement,
      carAmount: HTMLElement
    ) => void
  ) {
    this.btnPageNext.addEventListener('click', () =>
      nextPageHandler(this.btnPagePrev, this.btnPageNext, this.pageNumber, this.carAmount)
    );
  }

  seekerCreateAllow(createAllowHandler: (textField: HTMLInputElement, btn: HTMLButtonElement) => void) {
    this.inputTextCreate.addEventListener('input', () => createAllowHandler(this.inputTextCreate, this.btnCarCreate));
  }

  getUpdateFields() {
    return [this.inputTextUpdate, this.inputColorUpdate];
  }
  getCreateFields() {
    return [this.inputTextCreate, this.inputColorCreate];
  }

  getAllCars() {
    return document.querySelectorAll('.car-image');
  }
}
