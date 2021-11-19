import './sass/style.scss';

import { Game } from './scripts/classes/Game';
import { Question } from './scripts/classes/Question';
import { Quiz } from './scripts/classes/Quiz';
import { Settings } from './scripts/classes/Settings';

import { Menu } from './scripts/html/menu.js';
import {} from './scripts/html/question.js';
import {} from './scripts/html/result.js';
import {} from './scripts/html/settings.js';

import data from './assets/data/images';

const modes = ['artist', 'imgs'];

const game = new Game();
game.data = data;
const question = new Question();
const quiz = new Quiz();
const settings = new Settings();

const menu = new Menu();
// menu.render();

async function controller() {}

async function start() {
  await controller();
}

start();
