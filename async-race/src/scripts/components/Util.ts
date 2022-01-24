import { CarData } from '../interfaces/CarData';
import { GarageView } from '../view/Garage';
import { createCarRequest } from './Requester';
import { CarRenderElems } from '../interfaces/carRenderElems';
import { Garage } from '../components/Garage';
import { State } from './State';

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
  state.setState(getStorageState());
  console.log(state.pageCarsAmount);
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
  const carData: CarData = JSON.parse(await carSataBlob.text());
  if (state.pageCarsAmount < state.carsPerPage) {
    const garageView = new GarageView();
    const carRenderElems = garageView.renderCar(carData);
    await setCarControlHandlers(carRenderElems);
    state.pageCarsAmount = state.pageCarsAmount + 1;
  }
  if (state.pageCarRange[1] < state.carAmount) {
    const btnNext: HTMLButtonElement = document.querySelector('.page-nav_next');
    undisableButton(btnNext);
  }
  setStorageState(state);
}

export async function renderManyCars(amount: number) {
  const garage = new Garage();
  state.setState(getStorageState());
  console.log({ manyStateStateBefore: state });
  state.carAmount = state.carAmount + amount;
  console.log({ manyStateStateAfter: state });
  setStorageState(state);
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
  garage.carAmount.innerText = `Garage (${state.carAmount})`;
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
  //add event listeners to buttons for current car
  btnSelect.addEventListener('click', () => {
    const carData: CarData = getCarData(data.car);
    selectCarHandler(carData.id, carData.name, carData.color, inputUpdateElems[0], inputUpdateElems[1], data.car);
  });
  btnRemove.addEventListener('click', () => {
    const carData: CarData = getCarData(data.car);
    deleteCarHandler(carData.id);
  });
  btnStart.addEventListener('click', () => {
    const carData: CarData = getCarData(data.car);
    startCarHandler(carData.id);
  });
  btnReturn.addEventListener('click', () => {
    returnCarHandler(data.car);
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
}

async function deleteCarHandler(id: number) {
  console.log(id);
}

async function startCarHandler(id: number) {
  console.log(id);
}

async function returnCarHandler(el: HTMLElement) {
  console.log(el);
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
  if (type === 'garage') {
    disableButton(garageBtn);
    undisableButton(winnersBtn);
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
