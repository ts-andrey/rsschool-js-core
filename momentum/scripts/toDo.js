const toDoList = document.querySelector('.to-dos');

const newToDo = document.querySelector('.to-do-new-item');
// const newToDoList = document.querySelector('.to-do-new-list');
const addNewToDo = document.querySelector('.add-new');

let checkers = document.querySelectorAll('.checker');
let deleteButtons;

let toDoArr;
if (window.localStorage.getItem('toDoList')) {
  toDoArr = JSON.parse(window.localStorage.getItem('toDoList'));
} else toDoArr = [];

let currTime;
let lastCurrTime;

function checkerHandler() {
  const id = this.id;
  const el = document.querySelector(`.${id}`);
  el.classList.toggle('crossed');
  if (el.classList.contains('crossed')) toDoArr = toDoArr.filter(element => element !== el.textContent);
  else if (!el.classList.contains('crossed')) toDoArr.push(el.textContent);
  window.localStorage.setItem('toDoList', JSON.stringify(toDoArr));
}

function deleteHandler() {
  const parent = this.parentNode;
  toDoArr = toDoArr.filter(element => element !== parent.textContent);
  window.localStorage.setItem('toDoList', JSON.stringify(toDoArr));
  parent.parentNode.removeChild(parent);
}

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
  newDeed.classList.add(`item-${currTime}`);

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.classList.add('checker');
  checkBox.id = `item-${currTime}`;

  const label = document.createElement('label');
  label.htmlFor = `item-${currTime}`;
  label.classList.add(`to-do-text`);
  label.textContent = value;

  const delButton = document.createElement('div');
  delButton.classList.add('to-do-delete');
  delButton.setAttribute('data-item', `item-${currTime}`);
  delButton.innerHTML = `<svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>`;

  newDeed.append(checkBox);
  newDeed.append(label);
  newDeed.append(delButton);

  toDoList.append(newDeed);
  checkers = document.querySelectorAll('.checker');

  checkers.forEach(el => {
    el.removeEventListener('change', checkerHandler);
    el.addEventListener('change', checkerHandler);
  });
  deleteButtons = document.querySelectorAll('.to-do-delete');
  deleteButtons.forEach(el => {
    el.addEventListener('click', deleteHandler);
  });
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

newToDo.addEventListener('change', toDoHandler);
addNewToDo.addEventListener('click', toDoHandler);
window.addEventListener('load', setToDos);
