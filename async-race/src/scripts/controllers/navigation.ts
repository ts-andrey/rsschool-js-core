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
import { checkState, checkViewBtn, getStorageState, setCarControlHandlers, setStorageState } from '../components/Util';
import { State } from '../components/State';

const state = new State();
checkState(state);

/* rendering navigation view to start with */

/* here we already have navigation view, so we can work forward */

const renderGarage = async () => {
  state.setState(getStorageState());
  const garageView = new GarageView();
  const allCars: CarData[] = await getAllCarsRequest();
  const allCarsAmount = allCars.length;
  const pageToRender = state.pageNumber !== undefined ? state.pageNumber : 1;
  const carsPerPage = state.carsPerPage !== undefined ? state.carsPerPage : 7;
  state.carAmount = allCarsAmount;
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
  state.setState(getStorageState());
  const winnersView = new WinnersView();
  const data: WinCarData[] = await getAllWinnersRequest();
  winnersView.render(data.length, 1);

  data.forEach(async el => {
    const carInfo: CarData = await getCarRequest(el.id);
    winnersView.addWinner(el, carInfo);
  });
  winnersController();
  checkViewBtn('winners', state);
};

function navigationHandler(el: HTMLElement) {
  console.log(el);
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
