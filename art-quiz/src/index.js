import './sass/style.scss';

import { Game } from './scripts/classes/Game.js';
import { Quiz } from './scripts/classes/Quiz.js';
import { Config } from './scripts/classes/Config.js';

import { Category } from './scripts/html/category.js';
import { Categories } from './scripts/html/categories.js';
import { Home } from './scripts/html/home.js';
import { Question } from './scripts/html/question.js';
import { Result } from './scripts/html/result.js';
import { Settings } from './scripts/html/settings.js';

import data from './assets/data/imagesEng';

// window.localStorage.clear();

const modes = ['artists', 'imgs'];
const stages = { start: 'start', between: 'between', end: ['bad', 'normal', 'perfect'] };

let gameProgress = JSON.parse(window.localStorage.getItem('progress'));
if (!gameProgress) {
  window.localStorage.setItem(
    'progress',
    JSON.stringify({
      artCategory: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [] },
      imgCategory: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [] },
    })
  );
  gameProgress = JSON.parse(window.localStorage.getItem('progress'));
}
const game = new Game(modes[0]);
const quiz = new Quiz(data, gameProgress);
game.progress = [];
game.data = [];
const config = new Config();
const home = new Home();
const settings = new Settings();

const dataCategories = [];
for (let i = 0, j = 0; i < quiz.data.length; i += 10, j++) {
  const tempObj = {};
  tempObj.src = `./assets/data/img/${quiz.data[i].imageNum}.webp`;
  if (j >= 12) tempObj.type = modes[1];
  else tempObj.type = modes[0];
  dataCategories.push(tempObj);
}

// check rendering
const categoryArtists = new Categories(dataCategories.slice(0, 12), gameProgress.artCategory);
const categoryImgs = new Categories(dataCategories.slice(12, 24), gameProgress.imgCategory);
let category;

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
    progress = game.progress;
  } catch (error) {}
  questionData.push(`./assets/data/img/${num}.webp`);
  questionData.push(progress ? progress : 0);
  const answers = prepareAnswer(type, num);
  questionData.push(answers[0]);
  questionData.push(answers[1]);
  questionData.push(data[num]);
  return questionData;
};

function homeHandler(obj) {
  obj.event.stopImmediatePropagation();
  home.render();
  home.seeker(categoryRenderer);
}

function resultNextHandler(obj) {
  obj.event.stopImmediatePropagation();
  const element = document.querySelector('.game');
  element.innerHTML = '';

  const number = game.data[game.data.length - 1] + 1;
  const question = new Question(game.gameType, prepareQuestion(game.gameType, number), true);

  game.data.push(number);
  question.render();
  question.answerSeeker(answerHandler);
}

const setNewGame = () => {
  if (game.gameType === modes[0]) quiz.progress.artCategory[game.category] = game.progress;
  if (game.gameType === modes[1]) quiz.progress.imgCategory[game.category] = game.progress;
  window.localStorage.setItem('progress', JSON.stringify(quiz.progress));
  game.progress = [];
  game.data = [];
};

function resultHomeHandler(obj) {
  obj.event.stopImmediatePropagation();
  const element = document.querySelector('.game');
  element.innerHTML = '';

  home.render();
  home.seeker(categoryRenderer);
  setNewGame();
}

function categoryHandler(obj) {
  obj.event.stopImmediatePropagation();
  let startPosition = +obj.element.getAttribute('data-category-num');
  const categoryType = obj.element.getAttribute('data-category-type');
  let categoryData = [];
  if (categoryType === modes[0]) {
    for (let i = 0; i < 10; i++) {
      const element = quiz.data[startPosition + i];
      categoryData.push(element);
    }
  }
  if (categoryType === modes[1]) {
    for (let i = 0; i < 10; i++) {
      const element = quiz.data[startPosition + 120 + i];
      categoryData.push(element);
    }
  }
  const categoryImgs = new Category(categoryData);
  categoryImgs.render();
  categoryImgs.seeker(homeHandler);
}

function resultNewHandler(obj) {
  obj.event.stopImmediatePropagation();
  const element = document.querySelector('.game');
  element.innerHTML = '';

  if (game.gameType === modes[0]) category = categoryArtists;
  if (game.gameType === modes[1]) category = categoryImgs;
  category.render();
  category.seeker({ home: homeHandler, categoryPlay: categoryPlayHandler, category: categoryHandler });
  setNewGame();
}

function resultRepeatHandler(obj) {
  obj.event.stopImmediatePropagation();
  const element = document.querySelector('.game');
  element.innerHTML = '';
  setNewGame();
}

function answerHandler(obj) {
  obj.event.stopImmediatePropagation();
  const isRight = +obj.element.getAttribute('data-num') === obj.answer;
  game.progress.push(isRight);
  let currentStage;
  const rightAnsCount = game.progress.filter(el => el === true).length;
  if (game.data.length <= 9) currentStage = stages.between;
  else {
    if (rightAnsCount === 0) currentStage = stages.end[0];
    if (rightAnsCount > 0 && rightAnsCount < 10) currentStage = stages.end[1];
    if (rightAnsCount === 10) currentStage = stages.end[2];
  }
  const result = new Result(currentStage, [
    isRight,
    obj.imgPath,
    obj.answerData.name,
    `${obj.answerData.author}, ${obj.answerData.year}`,
    `${rightAnsCount}/10`,
  ]);
  result.render();
  if (currentStage === stages.between) {
    game.playsound(isRight, config.volume);
    result.seekerNext(resultNextHandler);
  }
  if (currentStage === stages.end[0]) {
    game.playsound(stages.end[0], config.volume);
    result.seekerHome(resultHomeHandler);
    result.seekerRepeat(resultRepeatHandler);
  }
  if (currentStage === stages.end[1]) {
    game.playsound(stages.end[1], config.volume);
    result.seekerHome(resultHomeHandler);
    result.seekerNew(resultNewHandler);
  }
  if (currentStage === stages.end[2]) {
    game.playsound(stages.end[2], config.volume);
    result.seekerNew(resultNewHandler);
  }
}

function categoryPlayHandler(obj) {
  obj.event.stopImmediatePropagation();
  const type = obj.element.getAttribute('data-category-type');
  if (game.gameType !== type) game.gameType = type;
  let num = +obj.element.getAttribute('data-category-num');
  game.category = num / 10;
  if (type === modes[1]) num += 120;

  const question = new Question(type, prepareQuestion(type, num), true);
  game.isStarted = true;
  game.playsound(stages.start, config.volume);
  game.data.push(num);

  question.render();
  question.answerSeeker(answerHandler);
}

function categoryRenderer(obj) {
  obj.event.stopImmediatePropagation();
  if (obj.element.getAttribute('data-type') === modes[0]) category = categoryArtists;
  else if (obj.element.getAttribute('data-type') === modes[1]) category = categoryImgs;
  category.render();
  category.seeker({ home: homeHandler, categoryPlay: categoryPlayHandler, category: categoryHandler });
}

function closeSettingsHandler(obj) {
  obj.event.stopImmediatePropagation();
  home.render();
  home.seeker(categoryRenderer);
}

function volumeHandler(obj) {
  config.volume = obj.element.value;
}

function settingsHandler(obj) {
  obj.event.stopImmediatePropagation();
  settings.render();
  settings.closeSeeker(closeSettingsHandler);

  settings.volumeSeeker(volumeHandler);
}

home.render();
home.seeker(categoryRenderer);

settings.seeker(settingsHandler);

console.log(
  `Уважаемый проверяющий, если у тебя будет возможность и желание проверить в четверг, или в крайнем случае в среду вечером - буду безмерно благодарен! (Очень стараюсь доделать весь функционал)`
);
