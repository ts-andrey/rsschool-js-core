import { createCarRequest, updateCarRequest, getAllCarsRequest } from '../components/Requester';
import { Garage } from '../components/Garage';
import {
  carsReturn,
  carsStartRace,
  checkState,
  disableButton,
  getStorageState,
  removeWinnerMessage,
  renderManyCars,
  renderNewCar,
  setCarControlHandlers,
  setStorageState,
  undisableButton,
  updateCarData,
} from '../components/Util';
import { CarData } from '../interfaces/CarData';
import { GarageView } from '../view/Garage';
import { State } from '../components/State';

const state = new State();
checkState(state);

export const garageController = async () => {
  const garage = new Garage();

  garage.seekerCreateCar(createCarHandler);
  garage.seekerUpdateCar(updateCarHanlder);

  garage.seekerRaceCars(raceCarsHandler);
  garage.seekerResetCars(resetCarsHandler);
  garage.seekerGenerateCars(generateCarsHandler);

  garage.seekerPreviosPageNav(previousPageHandler);
  garage.seekerNextPageNav(nextPageHandler);

  garage.seekerCreateAllow(createAllowHandler);
};

async function createCarHandler(name: HTMLInputElement, color: HTMLInputElement) {
  if (name.value.length > 3) {
    const data = {
      name: name.value,
      color: color.value,
    };
    const result = await createCarRequest(JSON.stringify(data));
    renderNewCar(result);
  }
  name.value = '';
}

async function updateCarHanlder(
  name: HTMLInputElement,
  color: HTMLInputElement,
  inputUpdate: HTMLInputElement,
  btnUpdate: HTMLButtonElement
) {
  state.setState(getStorageState());
  const id: number = state.selectedCar.id;
  if (id && id != undefined && id !== null) {
    const data = {
      name: name.value,
      color: color.value,
    };
    const result = await updateCarRequest(id, JSON.stringify(data));
    if (result.ok) {
      const el: HTMLElement = document.querySelector(`.${state.selectClass}`);
      updateCarData(el, data.name, data.color);
      el.classList.toggle(state.selectClass);
    }
    const selectedCarReset: CarData = {
      id: null,
      name: null,
      color: null,
    };
    state.selectedCar = selectedCarReset;
    setStorageState(state);
    inputUpdate.value = '';
    disableButton(btnUpdate);
  }
}
async function raceCarsHandler(btnRace: HTMLButtonElement, btnReset: HTMLButtonElement) {
  disableButton(btnRace);
  await carsStartRace();
  undisableButton(btnReset);
}
async function resetCarsHandler(btnRace: HTMLButtonElement, btnReset: HTMLButtonElement) {
  disableButton(btnReset);
  await carsReturn();
  undisableButton(btnRace);
}
async function generateCarsHandler() {
  await renderManyCars(100);
}
async function previousPageHandler(
  btnPrev: HTMLButtonElement,
  btnNext: HTMLButtonElement,
  curPage: HTMLElement,
  carAmount: HTMLElement
) {
  removeWinnerMessage();
  state.setState(getStorageState());
  if (state.pageCarRange[0] > 1) {
    state.pageNumber = state.pageNumber - 1;
    state.pageCarRange = [state.pageCarRange[0] - 7, state.pageCarRange[1] - 7];
    state.pageCarsAmount = 7;
    renderNewPage(curPage, carAmount);
    undisableButton(btnNext);
    if (!(state.pageCarRange[0] > 1)) {
      disableButton(btnPrev);
    }
  }
}

async function nextPageHandler(
  btnPrev: HTMLButtonElement,
  btnNext: HTMLButtonElement,
  curPage: HTMLElement,
  carAmount: HTMLElement
) {
  removeWinnerMessage();
  state.setState(getStorageState());
  if (state.pageCarRange[1] < state.carAmount) {
    state.pageNumber = state.pageNumber + 1;
    state.pageCarRange = [state.pageCarRange[0] + 7, state.pageCarRange[1] + 7];
    renderNewPage(curPage, carAmount);
    undisableButton(btnPrev);
    if (!(state.pageCarRange[1] < state.carAmount)) {
      disableButton(btnNext);
    }
  }
}

async function renderNewPage(page: HTMLElement, amount: HTMLElement) {
  const garageView = new GarageView();
  amount.innerText = String(state.carAmount);
  page.innerText = String(state.pageNumber);
  const pageCars: CarData[] = await getAllCarsRequest(state.pageNumber, state.carsPerPage);
  state.pageCarsAmount = pageCars.length;
  setStorageState(state);
  garageView.clearCarList();
  pageCars.map(el => {
    const carRenderElems = garageView.renderCar(el);
    setCarControlHandlers(carRenderElems);
  });
}

function createAllowHandler(inputCreate: HTMLInputElement, btnCreate: HTMLButtonElement) {
  if (inputCreate.value.length < 4) {
    disableButton(btnCreate);
  } else {
    undisableButton(btnCreate);
  }
}
