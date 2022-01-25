import { CarData } from '../interfaces/CarData';
import { GarageView } from '../view/Garage';
import { createCarRequest, deleteCarRequest, switchCarEngineState } from './Requester';
import { CarRenderElems } from '../interfaces/carRenderElems';
import { Garage } from '../components/Garage';
import { State } from './State';
import { CarEngineData } from '../interfaces/CarEngineData';

const CAR_IMG_BOX_SELECTOR = '.car-item__car-img-box';
const CAR_NAME_ELEMENT_SELECTOR = '.car-item__model';
const CAR_COLOR_SELECTOR = 'g';
const CAR_ID_ATTRIBUTE = 'data-id';
const CAR_COLOR_ATTRIBUTE = 'fill';

const DISABLED_BTN_CLASS = 'button-disabled';

const state = new State();
checkState(state);

export function checkState(state: State) {
  const newState = getStorageState();
  if (newState) {
    return state.setState(newState);
  }
  setStorageState(state);
  return state;
}

export function getStorageState(): State {
  return JSON.parse(localStorage.getItem('state'));
}
export function setStorageState(state: State) {
  localStorage.setItem('state', JSON.stringify(state));
}

export function getCarData(el: HTMLElement) {
  const carBox = el.querySelector(CAR_IMG_BOX_SELECTOR);
  const carName = (el.querySelector(CAR_NAME_ELEMENT_SELECTOR) as HTMLElement).innerText;
  const carId = Number(carBox.getAttribute(CAR_ID_ATTRIBUTE));
  const carColor = carBox.querySelector(CAR_COLOR_SELECTOR).getAttribute(CAR_COLOR_ATTRIBUTE);
  return { id: carId, name: carName, color: carColor };
}

export function updateCarData(el: HTMLElement, newCarName: string, newCarColor: string) {
  const carNameElement: HTMLElement = el.querySelector(CAR_NAME_ELEMENT_SELECTOR);
  const imageElement: SVGElement = el.querySelector(CAR_COLOR_SELECTOR);
  carNameElement.innerText = newCarName;
  imageElement.setAttribute(CAR_COLOR_ATTRIBUTE, newCarColor);
}

export async function renderNewCar(result: Response) {
  const garage = new Garage();
  state.setState(getStorageState());
  console.log(state.pageCarsAmount);
  // const reader = result.body.getReader();
  // const stream = new ReadableStream({
  //   start(controller) {
  //     return pump();
  //     function pump(): Promise<Uint8Array> {
  //       return reader.read().then(({ done, value }) => {
  //         if (done) {
  //           controller.close();
  //           return;
  //         }
  //         controller.enqueue(value);
  //         return pump();
  //       });
  //     }
  //   },
  // });
  // const carDataResponse = new Response(stream);
  // const carSataBlob = await carDataResponse.blob();
  // const carData: CarData = JSON.parse(await carSataBlob.text());
  const carData = <CarData>await processResult(result);
  if (state.pageCarsAmount < state.carsPerPage) {
    const garageView = new GarageView();
    const carRenderElems = garageView.renderCar(carData);
    await setCarControlHandlers(carRenderElems);
    state.pageCarsAmount = state.pageCarsAmount + 1;
  }
  if (state.pageCarRange[1] <= state.carAmount) {
    const btnNext: HTMLButtonElement = document.querySelector('.page-nav_next');
    undisableButton(btnNext);
  }
  state.carAmount = state.carAmount + 1;
  garage.carAmount.innerText = `Garage (${state.carAmount})`;
  setStorageState(state);
}

export async function renderManyCars(amount: number) {
  state.setState(getStorageState());
  for (let i = 0; i < amount; i++) {
    const carName = getRandomCar();
    const carColor = getRandomColor();
    const car = {
      name: carName,
      color: carColor,
    };
    const result = await createCarRequest(JSON.stringify(car));
    await renderNewCar(result);
  }
}

function getRandomCar() {
  const brands = [
    'Acura',
    'Audi',
    'BMW',
    'Cadillac',
    'Chevrolet',
    'Dodge',
    'Fiat',
    'Ford',
    'Honda',
    'Hyundai',
    'Infinity',
    'Jaguar',
    'Kia',
    'Lexus',
    'Mazda',
    'Mitsubishi',
    'Nissan',
    'Porsche',
    'Scion',
    'Subaru',
    'Suzuki',
    'Tesla',
    'Toyota',
    'Volkswagen',
    'Volvo',
  ];
  const models = [
    '2 Series',
    '3 Series',
    '4 Series',
    '5 Series',
    'X1',
    'X2',
    'X3',
    'X4',
    'X5',
    'X6',
    'X7',
    'M2',
    'M3',
    'M5',
    'M8',
    'A3',
    'A4',
    'A4 Allroad',
    'A5',
    'A6',
    'Q1',
    'Q2',
    'Q3',
    'Q4',
    'Q5',
    'Q6',
    'RS 1',
    'RS 2',
    'RS 3',
    'RS 5',
    'CT4',
    'CT5',
    'XT4',
    'XT5',
    'Challenger',
    'Endge',
    'Escape',
    'Ranger',
    'Clarity',
    'Insight',
    'Accord',
    'Cayenne',
    'Macan',
    'Panamera',
    'Taycan',
    'Carnival',
    'Forte',
    'Rio',
    'Soul',
    'Sportage',
    'Stinger',
    'Niro',
  ];
  return `${brands[getRandomNumber(0, 24)]} ${models[getRandomNumber(0, 51)]}`;
}

function getRandomColor() {
  let hashStr = '';
  for (let i = 0; i < 6; i++) {
    hashStr += getColorSymbol();
  }

  return `#${hashStr}`;
}

function getColorSymbol() {
  const hashSymobls: {
    [key: string]: string;
  } = {
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F',
  };
  return hashSymobls[getRandomNumber(0, 15)];
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function setCarControlHandlers(data: CarRenderElems) {
  const garage = new Garage();
  // get update inputs for car name and car color
  const inputUpdateElems = garage.getUpdateFields();
  // get just rendered car and its buttons
  // get all buttons from just rendered car item
  const btnSelect = data.select;
  const btnRemove = data.remove;
  const btnStart = data.start;
  const btnReturn = data.return;
  disableButton(btnReturn);
  //add event listeners to buttons for current car
  btnSelect.addEventListener('click', () => {
    const carData: CarData = getCarData(data.car);
    selectCarHandler(carData.id, carData.name, carData.color, inputUpdateElems[0], inputUpdateElems[1], data.car);
  });
  btnRemove.addEventListener('click', () => {
    const carData: CarData = getCarData(data.car);
    deleteCarHandler(carData.id, data.car);
  });
  btnStart.addEventListener('click', () => {
    const carData: CarData = getCarData(data.car);
    const carImg: HTMLElement = data.car.querySelector('.car-image');
    const btnStartCar: HTMLButtonElement = data.car.querySelector('.car-item__btn_type_start');
    const btnReturnCar: HTMLButtonElement = data.car.querySelector('.car-item__btn_type_back');
    startCarHandler(carData.id, carImg, btnStartCar, btnReturnCar);
  });
  btnReturn.addEventListener('click', () => {
    const carData: CarData = getCarData(data.car);
    const carImg: HTMLElement = data.car.querySelector('.car-image');
    const btnStartCar: HTMLButtonElement = data.car.querySelector('.car-item__btn_type_start');
    const btnReturnCar: HTMLButtonElement = data.car.querySelector('.car-item__btn_type_back');
    returnCarHandler(carData.id, carImg, btnStartCar, btnReturnCar);
  });
}

async function selectCarHandler(
  id: number,
  name: string,
  color: string,
  nameInput: HTMLInputElement,
  colorInput: HTMLInputElement,
  el: HTMLElement
) {
  const selectedCar: CarData = { id, name, color };
  state.selectedCar = selectedCar;
  el.classList.toggle(state.selectClass);
  setStorageState(state);
  nameInput.value = name;
  colorInput.value = color;
  const btnUpdate: HTMLButtonElement = document.querySelector('.btn__car_update');
  undisableButton(btnUpdate);
}

async function deleteCarHandler(id: number, car: HTMLElement) {
  const result = await deleteCarRequest(id);
  console.log(result);
  if (result.ok) {
    const state = new State();
    state.setState(getStorageState());
    car.parentElement.removeChild(car);
    state.carAmount = state.carAmount - 1;
    state.pageCarsAmount = state.pageCarsAmount - 1;
    setPageTotalCarAmount(state.carAmount);
    setStorageState(state);
  }
}

async function startCarHandler(
  id: number,
  carImg: HTMLElement,
  btnStartCar: HTMLButtonElement,
  btnReturnCar: HTMLButtonElement
) {
  const time = <number>await carEngineSwitcher(id, 'started');
  animationStart(id, time, carImg, btnStartCar, btnReturnCar);
}

async function returnCarHandler(
  id: number,
  carImg: HTMLElement,
  btnStartCar: HTMLButtonElement,
  btnReturnCar: HTMLButtonElement
) {
  await carEngineSwitcher(id, 'stopped');
  animationReturn(1000, carImg, btnStartCar, btnReturnCar);
}

export function disableButton(btn: HTMLButtonElement) {
  if (!btn.classList.contains(DISABLED_BTN_CLASS)) {
    btn.classList.add(DISABLED_BTN_CLASS);
  }
}

export function undisableButton(btn: HTMLButtonElement) {
  if (btn.classList.contains(DISABLED_BTN_CLASS)) {
    btn.classList.remove(DISABLED_BTN_CLASS);
  }
}

export function checkViewBtn(type: string, state: State) {
  const garageBtn: HTMLButtonElement = document.querySelector('.header-box__item_type_garage');
  const winnersBtn: HTMLButtonElement = document.querySelector('.header-box__item_type_winners');
  const pageNavPrev: HTMLButtonElement = document.querySelector('.page-nav_prev');
  const pageNavNext: HTMLButtonElement = document.querySelector('.page-nav_next');

  const inputCreate: HTMLInputElement = document.querySelector('.input-name_create');
  const inputUpdate: HTMLInputElement = document.querySelector('.input-name_update');
  const btnCreate: HTMLButtonElement = document.querySelector('.btn__car_create');
  const btnUpdate: HTMLButtonElement = document.querySelector('.btn__car_update');

  if (type === 'garage') {
    disableButton(garageBtn);
    undisableButton(winnersBtn);

    if (inputCreate.value.length < 4) {
      disableButton(btnCreate);
    }
    if (inputUpdate.value.length < 4) {
      disableButton(btnUpdate);
    }
  } else if (type === 'winners') {
    disableButton(winnersBtn);
    undisableButton(garageBtn);
  }
  if (state.pageCarRange[0] <= 1) {
    disableButton(pageNavPrev);
  }
  if (state.pageCarRange[1] >= state.carAmount) {
    disableButton(pageNavNext);
  }
}

async function animationStart(
  id: number,
  time: number,
  element: HTMLElement,
  btnStartCar: HTMLButtonElement,
  btnReturnCar: HTMLButtonElement
) {
  let indent = 0;
  let animationId = 0;
  const second = 1000;
  const animationSpeed = 5;
  const wideScreenSize = 1920;
  const deviation = 0.00105;

  disableButton(btnStartCar);

  function animation(time: number) {
    indent += (animationSpeed * second) / time;

    element.style.marginLeft = `calc(${indent}% - ${deviation * (wideScreenSize - window.innerWidth) * indent}px)`;

    animationId = requestAnimationFrame(animation);

    if (indent >= 88) {
      cancelAnimationFrame(animationId);
      undisableButton(btnReturnCar);
    }
  }
  animation(time);
  const result = await switchCarEngineState(id, 'drive');
  if (result.status === 500) {
    cancelAnimationFrame(animationId);
    undisableButton(btnReturnCar);
  }
}

function animationReturn(
  time: number,
  element: HTMLElement,
  btnStartCar: HTMLButtonElement,
  btnReturnCar: HTMLButtonElement
) {
  let indent = 85;
  let animationId = 0;
  const second = 1000;
  const animationSpeed = 80;

  disableButton(btnReturnCar);

  function animation(time: number) {
    indent -= animationSpeed * (second / time);

    element.style.marginLeft = `calc(${indent}%`;

    animationId = requestAnimationFrame(animation);

    if (indent <= 0.5) {
      cancelAnimationFrame(animationId);
      element.style.marginLeft = '0';
      undisableButton(btnStartCar);
    }
  }
  animation(time);
}

export function setPageTotalCarAmount(amount: number) {
  const carsAmount: HTMLElement = document.querySelector('.main-box__header');
  carsAmount.innerText = `Garage (${amount})`;
}

async function carEngineSwitcher(id: number, engineState: string) {
  const response = await switchCarEngineState(id, engineState);
  const result = <CarEngineData>await processResult(response);
  if (engineState === 'started') {
    return result.distance / result.velocity;
  }
  if (engineState === 'stopped') {
    return result;
  }
  return result;
}

async function processResult(result: Response): Promise<CarEngineData | CarData> {
  const reader = result.body.getReader();
  const stream = new ReadableStream({
    start(controller) {
      return pump();
      function pump(): Promise<Uint8Array> {
        return reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();
            return;
          }
          controller.enqueue(value);
          return pump();
        });
      }
    },
  });
  const carDataResponse = new Response(stream);
  const carSataBlob = await carDataResponse.blob();
  return JSON.parse(await carSataBlob.text());
}
