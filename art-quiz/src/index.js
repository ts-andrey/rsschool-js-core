import './sass/style.scss';

import { Game } from './scripts/classes/Game';
import { QuestionInfo } from './scripts/classes/Question';
import { Quiz } from './scripts/classes/Quiz';
import { SettingsStore } from './scripts/classes/Settings';

import { Categories } from './scripts/html/categories.js';
import { Home } from './scripts/html/home.js';
import { Question } from './scripts/html/question.js';
import { Result } from './scripts/html/result.js';
import { Settings } from './scripts/html/settings.js';

import data from './assets/data/imagesEng';

const modes = ['artists', 'imgs'];
const stages = { start: 'start', between: 'between', end: ['bad', 'normal', 'perfect'] };

const game = new Game(modes[0]);
game.data = data;
game.progress = [];
game.data = [];
const questionInfo = new QuestionInfo();
const quiz = new Quiz();
const setStore = new SettingsStore();

const dataCategories = [];
for (let i = 0, j = 0; i < data.length; i += 10, j++) {
  const tempObj = {};
  tempObj.src = `./assets/data/img/${data[i].imageNum}.webp`;
  if (j >= 12) tempObj.type = modes[1];
  else tempObj.type = modes[0];
  dataCategories.push(tempObj);
}

// menu.render();

// check rendering
const categoryArtists = new Categories(dataCategories.slice(0, 12));
const categoryImgs = new Categories(dataCategories.slice(12, 24));
let category;
const home = new Home();

const settings = new Settings();

// for random numbers
const getRandomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// create answers for question
const createAnswer = (arr, type, num) => {
  if (type === modes[0]) {
    let author = data[num].author;
    if (arr.includes(author)) createAnswer(arr, type, num + 1);
    else arr.push(author);
  }
  if (type === modes[1]) {
    let picture = `./assets/data/img/${data[num].imageNum}.webp`;
    if (arr.includes(picture)) createAnswer(arr, type, num + 1);
    else arr.push(picture);
  }
};

const prepareAnswer = (type, num) => {
  const result = [];
  for (let i = 0; i < 4; i++) {
    if (type === modes[0]) result.push(getRandomBetween(0, 119));
    if (type === modes[1]) result.push(getRandomBetween(120, 239));
  }
  const answerNumber = getRandomBetween(0, 3);
  result[answerNumber] = num;

  // prepare finalAnswers
  const finalAnswers = [];
  for (let i = 0; i < result.length; i++) {
    createAnswer(finalAnswers, type, result[i]);
  }
  return [finalAnswers, answerNumber];
};

const prepareQuestion = (type, num) => {
  const questionData = [];
  if (type === 'artists') {
    questionData.push('Who is the author of this picture?');
  }
  if (type === 'imgs') {
    questionData.push(`Which picture painted by ${data[num].author}?`);
  }
  let progress;
  try {
    progress = game.data.length;
  } catch (error) {}
  questionData.push(`./assets/data/img/${num}.webp`);
  questionData.push(progress ? progress : 0);
  const answers = prepareAnswer(type, num);
  questionData.push(answers[0]);
  questionData.push(answers[1]);
  questionData.push(data[num]);
  return questionData;
};

function homeHandler() {
  home.render();
  home.seeker(categoryRenderer);
}

function resultNextHandler() {
  const element = document.querySelector('.game');
  element.innerHTML = '';

  const number = game.data[game.data.length - 1] + 1;
  const question = new Question(game.gameType, prepareQuestion(game.gameType, number), true);

  game.data.push(number);
  question.render();
  question.answerSeeker(answerHandler);
}

function resultHomeHandler() {
  const element = document.querySelector('.game');
  element.innerHTML = '';

  home.render();
  home.seeker(categoryRenderer);
}

function resultNewHandler() {
  const element = document.querySelector('.game');
  element.innerHTML = '';

  if (game.gameType === modes[0]) category = categoryArtists;
  if (game.gameType === modes[1]) category = categoryImgs;
  category.render();
  category.seeker({ home: homeHandler, category: categoryHandler });
}

function resultRepeatHandler() {
  const element = document.querySelector('.game');
  element.innerHTML = '';
}

function answerHandler(obj) {
  const isRight = +obj.element.getAttribute('data-num') === obj.answer;
  if (isRight) game.progress.push(isRight);
  let currentStage;
  if (game.data.length <= 9) currentStage = stages.between;
  else {
    if (game.progress.length === 0) currentStage = stages.end[0];
    if (game.progress.length > 0 && game.progress.length < 10) currentStage = stages.end[1];
    if (game.progress.length === 10) currentStage = stages.end[2];
  }
  const result = new Result(currentStage, [
    isRight,
    obj.imgPath,
    obj.answerData.name,
    `${obj.answerData.author}, ${obj.answerData.year}`,
    `${game.progress.length}/10`,
  ]);
  result.render();
  if (!game.isEnded) game.playsound(isRight, 1);
  if (game.isEnded) {
    if (game.progress.length === 0) game.playsound(stages.end[0]);
    if (game.progress.length > 0 && game.progress.length < 10) game.playsound(stages.end[1]);
    if (game.progress.length === 10) game.playsound(stages.end[2]);
  }
  result.seeker({
    home: resultHomeHandler,
    next: resultNextHandler,
    new: resultNewHandler,
    repeat: resultRepeatHandler,
  });
}

function categoryHandler(obj) {
  const type = obj.element.getAttribute('data-category-type');
  if (game.gameType !== type) game.gameType = type;
  let num = +obj.element.getAttribute('data-category-num');
  if (type === modes[0]) {
  }
  if (type === modes[1]) {
    num += 120;
  }

  const question = new Question(type, prepareQuestion(type, num), true);
  game.isStarted = true;
  game.playsound(stages.start, 1);
  game.data.push(num);

  question.render();
  question.answerSeeker(answerHandler);
}

function categoryRenderer(obj) {
  if (obj.element.getAttribute('data-type') === modes[0]) category = categoryArtists;
  else if (obj.element.getAttribute('data-type') === modes[1]) category = categoryImgs;
  category.render();
  category.seeker({ home: homeHandler, category: categoryHandler });
}

function closeSettingsHandler() {
  home.render();
  home.seeker(categoryRenderer);
}

function settingsHandler() {
  settings.render();
  settings.closeSeeker(closeSettingsHandler);
}

home.render();
home.seeker(categoryRenderer);

settings.seeker(settingsHandler);
