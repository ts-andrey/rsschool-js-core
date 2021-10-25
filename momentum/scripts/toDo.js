const toDoList = document.querySelector('.to-dos');

const newToDo = document.querySelector('.to-do');
const addNewToDo = document.querySelector('.add-new');

let checkers = document.querySelectorAll('.checker');

function checkerHandler() {
  const id = this.id;
  const el = document.querySelector(`.${id}`);
  el.classList.toggle('crossed');
}

function toDoHandler() {
  const value = newToDo.value;
  newToDo.value = '';
  const date = new Date();
  const newDeed = document.createElement('li');
  newDeed.classList.add('to-dos-item');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.classList.add('checker');
  checkBox.id = `item-${date.getTime()}`;

  const label = document.createElement('label');
  label.htmlFor = `item-${date.getTime()}`;
  label.classList.add(`item-${date.getTime()}`);
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

addNewToDo.addEventListener('click', toDoHandler);
