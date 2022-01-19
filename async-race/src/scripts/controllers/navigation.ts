import { getAllWinnersRequest, getCarRequest } from './../components/Util';
import { Navigation } from '../components/Navigation';
import { NavigationView } from '../view/Navigation';
import { WinnersView } from './../view/Winners';
import { GarageView } from '../view/Garage';

import { getAllCarsRequest } from '../components/Util';
import { CarData } from '../interfaces/CarData';
import { WinCarData } from '../interfaces/WinCarData';

/* rendering navigation view to start with */
const navigationView = new NavigationView();
navigationView.render();

/* here we already have navigation view, so we can work forward */
const navigation = new Navigation();

const renderGarage = async () => {
  const garageView = new GarageView();
  const data: CarData[] = await getAllCarsRequest();
  garageView.render(data.length, 1);
  data.forEach(el => {
    garageView.renderCar(el);
  });
};

const renderWinners = async () => {
  const winnersView = new WinnersView();
  const data: WinCarData[] = await getAllWinnersRequest();
  winnersView.render(data.length, 1);

  data.forEach(async el => {
    const carInfo: CarData = await getCarRequest(el.id);
    winnersView.addWinner(el, carInfo);
  });
};

function navigationHandler(el: HTMLElement) {
  console.log(el);
  if (el.getAttribute('data-type') === 'garage') {
    return renderGarage();
  }
  return renderWinners();
}

export const navigationController = async () => {
  await renderGarage();
  navigation.seekerLinks(navigationHandler);
};
