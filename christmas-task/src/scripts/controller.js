import { Data } from './components/data/Data';

import { HomeView } from './view/Home';
import { FilterView } from './view/Filter';
import { Card } from './view/Card';
import { DecoratorView } from './view/Decorator';

import { Decorator } from './components/dresser/Decorator';
import { Filter } from './components/filter/Filter';
import { Navigator } from './components/home/Navigator';

import toysArray from '../assets/data';

const data = new Data(toysArray);

const decoratorView = new DecoratorView();
const filterView = new FilterView();
const homeView = new HomeView();

let decorator = new Decorator();

let navigator = new Navigator();

// default handler
function navigatorLinkUpdate() {
  navigator.homeLink = new Navigator().homeLink;
  navigator.listenFilter(filterViewHandler);
}

// init function
function init() {
  homeView.render();
  navigatorLinkUpdate();
}

// handlers for filter seekers
const sortListHandler = element => {
  console.log(element);
  element.classList.toggle('sorter__sort-list_state_reveal');
};
const sortOptionHandler = (curOptionElement, eventElement) => {
  curOptionElement.innerText = eventElement.innerText;
  console.log(eventElement.getAttribute('data-sort-option'));
};

// seekers for filter page
function filterViewHandler() {
  filterView.render();
  data.data.forEach(el => {
    new Card(el).render();
  });

  const filter = new Filter();
  filter.sortListSeeker(sortListHandler);
  filter.sortOptionSeeker(sortOptionHandler);
}

// seekers for decorator page
function decoratorViewHandler() {
  decoratorView.render();
}

// initialization and navigation seekers
init();
navigator.listenIcon(init);
navigator.listenLinks(filterViewHandler, decoratorViewHandler);
