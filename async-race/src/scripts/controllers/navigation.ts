import { Navigation } from '../components/Navigation';
import { NavigationView } from '../view/Navigation';
import { WinnersView } from './../view/Winners';
import { GarageView } from '../view/Garage';

/* rendering navigation view to start with */
const navigationView = new NavigationView();
navigationView.render();

/* here we already have navigation view, so we can work forward */
const navigation = new Navigation();

const renderGarage = () => {
  const garageView = new GarageView();
  garageView.render(5, 1);
  garageView.renderCar();
};

const renderWinners = () => {
  const winnersView = new WinnersView();
  winnersView.render(1, 1);
  winnersView.addWinner();
};

function navigationHandler(el: HTMLElement) {
  console.log(el);
  if (el.getAttribute('data-type') === 'garage') {
    return renderGarage();
  }
  return renderWinners();
}

export const navigationController = () => {
  renderGarage();
  navigation.seekerLinks(navigationHandler);
};
