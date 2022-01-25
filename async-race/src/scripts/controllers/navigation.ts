import { WinnersState } from './../components/WinnersState';
import { getAllWinnersRequest, getCarRequest } from '../components/Requester';
import { Navigation } from '../components/Navigation';
import { NavigationView } from '../view/Navigation';
import { WinnersView } from './../view/Winners';
import { GarageView } from '../view/Garage';

import { getAllCarsRequest } from '../components/Requester';
import { CarData } from '../interfaces/CarData';
import { WinCarData } from '../interfaces/WinCarData';

import { garageController } from './garage';
import { winnersController } from './winners';
import {
  checkState,
  checkViewBtn,
  checkWinState,
  getStorageState,
  getStorageWinState,
  setCarControlHandlers,
  setStorageState,
  setStorageWinState,
} from '../components/Util';
import { State } from '../components/State';

const state = new State();
checkState(state);

const winState = new WinnersState();
checkWinState(winState);

/* rendering navigation view to start with */

/* here we already have navigation view, so we can work forward */

const renderGarage = async () => {
  state.setState(getStorageState());
  const garageView = new GarageView();
  const allCars: CarData[] = await getAllCarsRequest();
  const pageToRender = state.pageNumber !== undefined ? state.pageNumber : 1;
  const carsPerPage = state.carsPerPage !== undefined ? state.carsPerPage : 7;
  state.carAmount = allCars.length;
  const maxRangeEdge = pageToRender * carsPerPage;
  const minRangeEdge = pageToRender * carsPerPage - carsPerPage - 1;
  state.pageCarRange = [minRangeEdge < 0 ? 1 : minRangeEdge, maxRangeEdge];

  const data: CarData[] = await getAllCarsRequest(pageToRender, carsPerPage);
  state.pageCarsAmount = data.length;
  garageView.render(state.carAmount, pageToRender);
  data.forEach(el => {
    const carRenderElems = garageView.renderCar(el);
    setCarControlHandlers(carRenderElems);
  });
  garageController();
  setStorageState(state);
  checkViewBtn('garage', state);
};

const renderWinners = async () => {
  winState.setState(getStorageWinState());
  const winnersView = new WinnersView();
  const allWinners = await getAllWinnersRequest();
  const data: WinCarData[] = await getAllWinnersRequest(
    winState.pageNumber,
    winState.winnersPerPage,
    winState.sortType,
    winState.sortOrder
  );

  const pageToRender = winState.pageNumber !== undefined ? winState.pageNumber : 1;
  const winnersPerPage = winState.winnersPerPage !== undefined ? winState.winnersPerPage : 10;
  winState.winnersAmount = allWinners.length;
  const maxRangeEdge = pageToRender * winnersPerPage + 1;
  const minRangeEdge = maxRangeEdge - winState.winnersPerPage;
  winState.winnersRange = [minRangeEdge < 0 ? 1 : minRangeEdge, maxRangeEdge];

  winnersView.render(winState.winnersAmount, winState.pageNumber);

  data.forEach(async el => {
    const carInfo: CarData = await getCarRequest(el.id);
    winnersView.addWinner(el, carInfo);
  });
  winnersController();
  setStorageWinState(winState);
  checkViewBtn('winners', state);
};

function navigationHandler(el: HTMLElement) {
  if (el.getAttribute('data-type') === 'garage') {
    return renderGarage();
  }
  return renderWinners();
}

export const navigationController = async () => {
  const navigationView = new NavigationView();
  navigationView.render();
  const navigation = new Navigation();

  await renderGarage();
  navigation.seekerLinks(navigationHandler);
};
