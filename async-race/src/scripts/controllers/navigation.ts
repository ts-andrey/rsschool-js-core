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

/* rendering navigation view to start with */

/* here we already have navigation view, so we can work forward */

const renderGarage = async () => {
  const garageView = new GarageView();
  const data: CarData[] = await getAllCarsRequest();
  garageView.render(data.length, 1);
  data.forEach(el => {
    garageView.renderCar(el);
  });
  garageController();
};

const renderWinners = async () => {
  const winnersView = new WinnersView();
  const data: WinCarData[] = await getAllWinnersRequest();
  winnersView.render(data.length, 1);

  data.forEach(async el => {
    const carInfo: CarData = await getCarRequest(el.id);
    winnersView.addWinner(el, carInfo);
  });
  winnersController();
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
