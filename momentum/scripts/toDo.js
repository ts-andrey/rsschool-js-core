const toDoList = document.querySelector('.to-dos');

const newToDo = document.querySelector('.to-do-new-item');
// const newToDoList = document.querySelector('.to-do-new-list');
const addNewToDo = document.querySelector('.add-new');

let checkers = document.querySelectorAll('.checker');

let toDoArr;
if (window.localStorage.getItem('toDoList')) {
  toDoArr = JSON.parse(window.localStorage.getItem('toDoList'));
} else toDoArr = [];

let currTime;
let lastCurrTime;

function addDeed(value) {
  let check = true;
  lastCurrTime = currTime;
  currTime = new Date().getTime();
  while (check) {
    currTime = new Date().getTime();
    if (lastCurrTime !== currTime) check = false;
  }
  const newDeed = document.createElement('li');
  newDeed.classList.add('to-dos-item');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.classList.add('checker');
  checkBox.id = `item-${currTime}`;

  const label = document.createElement('label');
  label.htmlFor = `item-${currTime}`;
  label.classList.add(`item-${currTime}`);
  label.textContent = value;

  newDeed.append(checkBox);
  newDeed.append(label);

  toDoList.append(newDeed);
  checkers = document.querySelectorAll('.checker');

  checkers.forEach(el => {
    el.removeEventListener('change', checkerHandler);
    el.addEventListener('change', checkerHandler);
  });
}

function checkerHandler() {
  const id = this.id;
  const el = document.querySelector(`.${id}`);
  el.classList.toggle('crossed');
  if (el.classList.contains('crossed')) toDoArr = toDoArr.filter(element => element !== el.textContent);
  else if (!el.classList.contains('crossed')) toDoArr.push(el.textContent);
  window.localStorage.setItem('toDoList', JSON.stringify(toDoArr));
}

function toDoHandler() {
  if (newToDo.value) {
    toDoArr.push(newToDo.value);
    const value = newToDo.value;
    newToDo.value = '';
    addDeed(value);
    toDoList.scrollTop = toDoList.scrollHeight;
    window.localStorage.setItem('toDoList', JSON.stringify(toDoArr));
  }
}

function setToDos() {
  if (toDoArr.length > 0) {
    toDoArr.forEach(el => {
      addDeed(el);
    });
  }
}

addNewToDo.addEventListener('click', toDoHandler);
window.addEventListener('load', setToDos);
