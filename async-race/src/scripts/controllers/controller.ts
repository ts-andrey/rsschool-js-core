import { RootView } from '../view/Root';
import { NavigationView } from '../view/Navigation';
import { GarageView } from '../view/Garage';
import { WinnersView } from '../view/Winners';

const rootView = new RootView();
rootView.render();

const navigationView = new NavigationView();
const garageView = new GarageView();
navigationView.render();
garageView.render(5, 1);
garageView.renderCar();
const winnersView = new WinnersView();
winnersView.render(1, 1);
winnersView.addWinner();