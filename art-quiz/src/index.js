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

window.localStorage.clear();

const modes = ['artists', 'imgs'];
const stages = { start: 'start', between: 'between', end: ['bad', 'normal', 'perfect'] };
let timerVal;

const defaultConfig = {
  isMute: false,
  isTimerOn: false,
  time: 30,
  volume: 1,
};

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

let gameSettings = JSON.parse(window.localStorage.getItem('settings'));
if (!gameSettings) {
  window.localStorage.setItem('settings', JSON.stringify(defaultConfig));
  gameSettings = JSON.parse(window.localStorage.getItem('settings'));
}

const game = new Game(modes[0]);
const quiz = new Quiz(data, gameProgress);
game.progress = [];
game.data = [];
const config = new Config(gameSettings);
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
const categoryArtists = new Categories(dataCategories.slice(0, 12), gameProgress.artCategory, { type: 'Artists' });
const categoryImgs = new Categories(dataCategories.slice(12, 24), gameProgress.imgCategory, { type: 'Paintings' });
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

function questionCloseHandler(obj) {
  obj.event.stopImmediatePropagation();
  clearInterval(timerVal);
  startTime = null;
  home.render();
  home.seeker(categoryRenderer);
}

function resultNextHandler(obj) {
  obj.event.stopImmediatePropagation();
  const element = document.querySelector('.game');
  element.innerHTML = '';

  const number = game.data[game.data.length - 1] + 1;
  const question = new Question(game.gameType, prepareQuestion(game.gameType, number), [config.isTimerOn, config.time]);

  const timeValElement = question.render();
  timerHandler(timeValElement);
  if (config.isTimerOn) question.closeSeeker(questionCloseHandler);
  question.answerSeeker(answerHandler);
  game.data.push(number);
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

  const categoryDescription = {
    type: categoryType === modes[0] ? 'Artists' : 'Paintings',
    num: startPosition / 10 + 1,
  };

  let categoryProgress;
  if (categoryType === modes[0]) categoryProgress = quiz.progress.artCategory[startPosition / 10];
  if (categoryType === modes[1]) categoryProgress = quiz.progress.imgCategory[startPosition / 10];

  const categoryImgs = new Category(categoryData, categoryProgress);
  categoryImgs.render(categoryDescription);
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

function gameProgressHandler(answer) {
  game.progress.push(answer);
  let currStage;
  const rightAnsCount = game.progress.filter(el => el === true).length;
  if (game.data.length <= 9) currStage = stages.between;
  else {
    if (rightAnsCount === 0) currStage = stages.end[0];
    if (rightAnsCount > 0 && rightAnsCount < 10) currStage = stages.end[1];
    if (rightAnsCount === 10) currStage = stages.end[2];
  }
  return [currStage, rightAnsCount];
}

function setStageHandler(currentStage, isRight, result) {
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

function answerHandler(obj) {
  clearInterval(timerVal);
  startTime = null;

  obj.event.stopImmediatePropagation();
  const isRight = +obj.element.getAttribute('data-num') === obj.answer;
  const [currentStage, rightAnsCount] = gameProgressHandler(isRight);

  const result = new Result(currentStage, [
    isRight,
    obj.imgPath,
    obj.answerData.name,
    `${obj.answerData.author}, ${obj.answerData.year}`,
    `${rightAnsCount}/10`,
  ]);

  result.render();
  setStageHandler(currentStage, isRight, result);
}

let startTime;
function timer() {
  if (!startTime) startTime = new Date().getTime();
  const currentTime = new Date().getTime();
  const result = (config.time - (currentTime - startTime) / 1000).toFixed(2);
  return result;
}

function timerHandler(timeValElement) {
  if (config.isTimerOn) {
    timerVal = setInterval(() => {
      const hasTime = timer();

      if (hasTime <= 0) {
        clearInterval(timerVal);
        startTime = null;
        timeValElement[0].textContent = '00:00';
        game.playsound(false, config.volume);
        const [currentStage, rightAnsCount] = gameProgressHandler(false);

        const result = new Result(currentStage, [
          false,
          timeValElement[1][1],
          timeValElement[1][5].name,
          `${timeValElement[1][5].author}, ${timeValElement[1][5].year}`,
          `${rightAnsCount}/10`,
        ]);

        result.render();
        setStageHandler(currentStage, false, result);
        // result.seekerNext(resultNextHandler);
      } else {
        timeValElement[0].textContent = hasTime;
      }
    }, 250);
  }
}

function categoryPlayHandler(obj) {
  obj.event.stopImmediatePropagation();
  const type = obj.element.getAttribute('data-category-type');
  if (game.gameType !== type) game.gameType = type;
  let num = +obj.element.getAttribute('data-category-num');
  game.category = num / 10;
  if (type === modes[1]) num += 120;

  const question = new Question(type, prepareQuestion(type, num), [config.isTimerOn, config.time]);
  game.isStarted = true;
  game.playsound(stages.start, config.volume);
  game.data.push(num);

  const timeValElement = question.render();
  timerHandler(timeValElement);
  if (config.isTimerOn) question.closeSeeker(questionCloseHandler);
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
  const volumeVal = obj.element.value;
  obj.element.style.background = `linear-gradient(to right, #ff4901 0%, #ff4901 ${volumeVal * 100}%, #c4c4c4 ${
    volumeVal * 100
  }%, #c4c4c4 100%)`;
}

function timeSwitchHandler(obj) {
  obj.switcher.classList.toggle('time-switcher-content');
  const switcherState = obj.switcher.classList.contains('time-switcher-content');

  if (switcherState === true) obj.state.textContent = 'On';
  if (switcherState === false) obj.state.textContent = 'Off';
}

function timeHandler(obj) {
  const timeAmount = +obj.time.textContent;
  if (obj.element.classList.contains('increase')) {
    if (timeAmount >= 30) '';
    else obj.time.textContent = timeAmount + 5;
  }
  if (obj.element.classList.contains('decrease')) {
    if (timeAmount <= 5) '';
    else obj.time.textContent = timeAmount - 5;
  }
}

function settingsOptionHandler(obj) {
  if (obj.element.getAttribute('data-type') === 'default') {
    const elements = settings.getElements();

    config.volume = defaultConfig.volume;
    config.isTimerOn = defaultConfig.isTimerOn;
    config.time = defaultConfig.time;
    config.isMute = defaultConfig.isMute;

    window.localStorage.setItem('settings', JSON.stringify(config));

    elements.volume.value = config.volume;
    elements.volume.style.background = `linear-gradient(to right, #ff4901 0%, #ff4901 100%, #c4c4c4 100%, #c4c4c4 100%)`;
    if (elements.switcher.classList.contains('time-switcher-content'))
      elements.switcher.classList.remove('time-switcher-content');
    document.querySelector('.timer').textContent = 'Off';
    elements.time.textContent = '30';
  }
  if (obj.element.getAttribute('data-type') === 'save') {
    const elements = settings.getElements();

    config.volume = elements.volume.value;
    config.isTimerOn = elements.switcher.classList.contains('time-switcher-content');
    config.time = +elements.time.textContent;
    window.localStorage.setItem('settings', JSON.stringify(config));
  }
}

function iconHandler(obj) {
  if (obj.element.getAttribute('data-type') === 'mute') {
    obj.volume.value = 0;
    obj.volume.style.background = `linear-gradient(to right, #ff4901 0%, #ff4901 0%, #c4c4c4 0%, #c4c4c4 100%)`;
  }
  if (obj.element.getAttribute('data-type') === 'full') {
    obj.volume.value = 1;
    obj.volume.style.background = `linear-gradient(to right, #ff4901 0%, #ff4901 100%, #c4c4c4 100%, #c4c4c4 100%)`;
  }
}

function settingsHandler(obj) {
  obj.event.stopImmediatePropagation();
  settings.render(config);
  settings.seekerClose(closeSettingsHandler);

  settings.seekerVolume(volumeHandler);
  settings.seekerTimeSwitch(timeSwitchHandler);
  settings.seekerTime(timeHandler);
  settings.seekerOption(settingsOptionHandler);
  settings.seekerIcon(iconHandler);
}

home.render();
home.seeker(categoryRenderer);

settings.seeker(settingsHandler);
