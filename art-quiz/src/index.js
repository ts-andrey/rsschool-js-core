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

const game = new Game();
game.data = data;
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

const result = new Result('bad', ['./assets/data/img/3.webp', 'right', 'image name', 'image author']);
const settings = new Settings();

home.render();

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
  questionData.push(`./assets/data/img/${num}.webp`);
  questionData.push(2);
  const answers = prepareAnswer(type, num);
  questionData.push(answers[0]);
  questionData.push(answers[1]);
  console.log(questionData);
  return questionData;
};

function homeHandler() {
  home.render();
  home.seeker(categoryRenderer);
}

function answerHandler(obj) {
  console.log(+obj.element.getAttribute('data-num') === obj.answer);
}

function categoryHandler(obj) {
  console.log(obj.element);
  const type = obj.element.getAttribute('data-category-type');
  let num = +obj.element.getAttribute('data-category-num');
  console.log(num);
  if (type === modes[0]) {
    console.log(type);
  }
  if (type === modes[1]) {
    num += 120;
  }
  const question = new Question(type, prepareQuestion(type, num), true);
  console.log(question);
  question.render();
  question.answerSeeker(answerHandler);
}

function categoryRenderer(obj) {
  if (obj.element.getAttribute('data-type') === modes[0]) category = categoryArtists;
  else if (obj.element.getAttribute('data-type') === modes[1]) category = categoryImgs;
  category.render();
  category.seeker({ home: homeHandler, category: categoryHandler });
}
home.seeker(categoryRenderer);

// async function controller() {}

// async function start() {
//   await controller();
// }

// start();
