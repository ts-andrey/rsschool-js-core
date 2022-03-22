const formClose = document.querySelector('.form .close');
const formOpen = document.querySelector('.btn-buy');
const form = document.querySelector('.form');

const allTicketTypes = document.querySelectorAll('.tickets input[name="ticket-type"]');
let currentTicketType = document.querySelector('.tickets input[name="ticket-type"]:checked').value;

const ticketBasicNumber = document.querySelectorAll('.ticket-basic-amount');
const ticketSeniorNumber = document.querySelectorAll('.ticket-senior-amount');
const ticketButtons = document.querySelectorAll('.tickets .btn-amount .btn');

const ticketsPrice = document.querySelectorAll('.tickets-price-all');
let basicTiketsTotalPrice = 20;
let seniorTicketsTotalPrice = 10;
let ticketsPriceTotal = basicTiketsTotalPrice + seniorTicketsTotalPrice;
const TICKET_PRICES = [20, 25, 40];
const TICKET_TYPES = {
  permanent: 'Permanent exhibition',
  temporary: 'Temporary exhibition',
  combined: 'Combined Admission',
};
const basicTicketPrice = document.querySelectorAll('.basic-ticket-price');
const seniorTicketPrice = document.querySelectorAll('.senior-ticket-price');
const basicTicketsAmount = document.querySelector('.basic-tickets-amount');
const seniorTicketsAmount = document.querySelector('.senior-tickets-amount');
const basicTicketsPriceOverall = document.querySelector('.basic-ticket-totalPrice');
const seniorTicketsPriceOverall = document.querySelector('.senior-ticket-totalPrice');
const ticketTypeSelect = document.querySelector('.ticket-type-select');
const ticketTypeResult = document.querySelector('.ticket-type-result');

const ticketDate = document.querySelector('.ticket-date');
const ticketTime = document.querySelector('.ticket-time');
const ticketDateOrder = document.querySelector('.ticket-date-order');
const ticketTimeOrder = document.querySelector('.ticket-time-order');

const ticketOwnerName = document.querySelector('.tickets input[name="name"]');
const invalidTextName = document.querySelector('.invalid-name');
const ticketOwnerMail = document.querySelector('.tickets input[name="email"]');
const invalidTextMail = document.querySelector('.invalid-email');
const ticketOwnerPhone = document.querySelector('.tickets input[name="telephone"]');
const invalidTextPhone = document.querySelector('.invalid-tel');


function openFormHandler() {
  form.style.marginLeft = '0';
}
function closeFormHandler() {
  form.style.marginLeft = '-150%';
}

function ticketTypeHandler() {
  currentTicketType = this.value;
  ticketTypeSelect.value = currentTicketType;
  ticketTypeResult.textContent = TICKET_TYPES[this.value];
  allTicketTypes.forEach(el => {
    if (el.value === currentTicketType) {
      el.checked = true;
    } else el.checked = false;
  });
  setTicketsPrice();
  changeTicketsPrice();
}

function setTicketsPrice() {
  if (currentTicketType === 'permanent') {
    basicTicketPrice.forEach(el => {
      el.textContent = TICKET_PRICES[0];
    });
    seniorTicketPrice.forEach(el => {
      el.textContent = TICKET_PRICES[0] / 2;
    });
  } else if (currentTicketType === 'temporary') {
    basicTicketPrice.forEach(el => {
      el.textContent = TICKET_PRICES[1];
    });
    seniorTicketPrice.forEach(el => {
      el.textContent = TICKET_PRICES[1] / 2;
    });
  } else if (currentTicketType === 'combined') {
    basicTicketPrice.forEach(el => {
      el.textContent = TICKET_PRICES[2];
    });
    seniorTicketPrice.forEach(el => {
      el.textContent = TICKET_PRICES[2] / 2;
    });
  }
}

function changeTicketAmount(element) {
  if (element.classList.contains('btn-basic-up')) {
    ticketBasicNumber.forEach(el => {
      if (+el.value < 20) el.value = +el.value + 1;
    });
  } else if (element.classList.contains('btn-basic-down')) {
    ticketBasicNumber.forEach(el => {
      if (+el.value > 0) el.value = +el.value - 1;
    });
  }
  if (element.classList.contains('btn-senior-up')) {
    ticketSeniorNumber.forEach(el => {
      if (+el.value < 20) el.value = +el.value + 1;
    });
  } else if (element.classList.contains('btn-senior-down')) {
    ticketSeniorNumber.forEach(el => {
      if (+el.value > 0) el.value = +el.value - 1;
    });
  }
  basicTicketsAmount.textContent = ticketBasicNumber[0].value;
  seniorTicketsAmount.textContent = ticketSeniorNumber[0].value;
  window.localStorage.setItem('basicAmount', ticketBasicNumber[0].value);
  window.localStorage.setItem('seniorAmount', ticketSeniorNumber[0].value);
}
function changeTicketsPrice() {
  if (currentTicketType === 'permanent') {
    basicTiketsTotalPrice = TICKET_PRICES[0] * ticketBasicNumber[0].value;
    seniorTicketsTotalPrice = (TICKET_PRICES[0] / 2) * ticketSeniorNumber[0].value;
    ticketsPriceTotal = basicTiketsTotalPrice + seniorTicketsTotalPrice;
  } else if (currentTicketType === 'temporary') {
    basicTiketsTotalPrice = TICKET_PRICES[1] * ticketBasicNumber[0].value;
    seniorTicketsTotalPrice = (TICKET_PRICES[1] / 2) * ticketSeniorNumber[0].value;
    ticketsPriceTotal = basicTiketsTotalPrice + seniorTicketsTotalPrice;
  } else if (currentTicketType === 'combined') {
    basicTiketsTotalPrice = TICKET_PRICES[2] * ticketBasicNumber[0].value;
    seniorTicketsTotalPrice = (TICKET_PRICES[2] / 2) * ticketSeniorNumber[0].value;
    ticketsPriceTotal = basicTiketsTotalPrice + seniorTicketsTotalPrice;
  }
  basicTicketsPriceOverall.textContent = basicTiketsTotalPrice;
  seniorTicketsPriceOverall.textContent = seniorTicketsTotalPrice;
  ticketsPrice.forEach(el => {
    el.textContent = ticketsPriceTotal;
  });
  window.localStorage.setItem('ticketType', currentTicketType);
  window.localStorage.setItem('price', ticketsPriceTotal);
}

function ticketsPriceHandler() {
  changeTicketAmount(this);
  changeTicketsPrice();
}

function setCurrentDate() {
  let today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;

  today = `${yyyy}-${mm}-${dd}`;
  document.querySelector('.ticket-date').setAttribute('min', today);
  document.querySelector('.ticket-date').setAttribute('value', today);
}

function ticketDateHandler() {
  ticketDateOrder.textContent = new Date(ticketDate.value).toLocaleDateString('en-EN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

function ticketTimeHandler() {
  ticketTimeOrder.textContent = ticketTime.value;
}

basicTicketsAmount.textContent = ticketBasicNumber[0].value;
seniorTicketsAmount.textContent = ticketSeniorNumber[0].value;

function setFormData() {
  ticketBasicNumber.forEach(el => {
    el.value = window.localStorage.getItem('basicAmount');
  });
  ticketSeniorNumber.forEach(el => {
    el.value = window.localStorage.getItem('seniorAmount');
  });
  ticketsPrice.forEach(el => {
    el.textContent = window.localStorage.getItem('price');
  });
  currentTicketType = window.localStorage.getItem('ticketType');
  basicTicketsAmount.textContent = ticketBasicNumber[0].value;
  seniorTicketsAmount.textContent = ticketSeniorNumber[0].value;
  ticketTypeSelect.value = currentTicketType;
  ticketTypeResult.textContent = TICKET_TYPES[currentTicketType];
  allTicketTypes.forEach(el => {
    if (el.value === currentTicketType) {
      el.checked = true;
    } else el.checked = false;
  });
}

function setDefaultState() {
  setCurrentDate();
  ticketDateHandler();
  ticketTimeHandler();
}

setDefaultState();
setFormData();
changeTicketsPrice();

function validateTextInput() {
  if (this.value.length < 3) {
    ticketOwnerName.classList.add('invalid');
    invalidTextName.textContent = 'should contain more than 3 letters';
    invalidTextName.style.display = 'inline';
  } else if (this.value.length > 15) {
    ticketOwnerName.classList.add('invalid');
    invalidTextName.textContent = 'should contain less than 16 symbols';
    invalidTextName.style.display = 'inline';
  } else if (/[^A-Za-zА-Яа-яЁё\s]/g.test(this.value)) {
    ticketOwnerName.classList.add('invalid');
    invalidTextName.textContent = 'only russian/english letters or space allowed';
    invalidTextName.style.display = 'inline';
  } else {
    ticketOwnerName.classList.remove('invalid');
    invalidTextName.style.display = 'none';
    ticketOwnerName.classList.add('valid');
  }
}
function validatePhoneInput() {
  const value = this.value;
  let counter = 0;
  for (let i = 0; i < this.value.length; i++) {
    if (typeof +this.value[i] === 'number' && this.value[i] !== ' ' && this.value[i] !== '-' && this.value[i] !== '.')
      counter++;
  }
  if (counter > 10) {
    ticketOwnerPhone.classList.add('invalid');
    invalidTextPhone.textContent = 'should contain less than 10 numbers';
    invalidTextPhone.style.display = 'inline';
  } else if (!/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(value)) {
    ticketOwnerPhone.classList.add('invalid');
    invalidTextPhone.textContent = 'contain invalid symbols';
    invalidTextPhone.style.display = 'inline';
  } else {
    ticketOwnerPhone.classList.remove('invalid');
    invalidTextPhone.style.display = 'none';
    ticketOwnerPhone.classList.add('valid');
  }
}
function validateEmailInput() {
  let atCount = 0;
  for (let i = 0; i < this.value.length; i++) if (this.value[i] === '@') atCount++;

  if (this.value.includes(' ')) {
    ticketOwnerMail.classList.add('invalid');
    invalidTextMail.textContent = "space isn't allowed";
    invalidTextMail.style.display = 'inline';
  } else if (atCount > 1) {
    ticketOwnerMail.classList.add('invalid');
    invalidTextMail.textContent = 'should be only one @';
    invalidTextMail.style.display = 'inline';
  } else if (/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(this.value.toLowerCase())) {
    ticketOwnerMail.classList.add('invalid');
    invalidTextMail.textContent = 'contain invalid symbols';
    invalidTextMail.style.display = 'inline';
  } else {
    ticketOwnerMail.classList.remove('invalid');
    invalidTextMail.style.display = 'none';
    ticketOwnerMail.classList.add('valid');
  }
}

formOpen.addEventListener('click', openFormHandler);
formClose.addEventListener('click', closeFormHandler);

form.addEventListener(
  'click',
  function (ev) {
    if (ev.target.matches('.close') || !ev.target.closest('form')) closeFormHandler(event);
  },
  false
);

allTicketTypes.forEach(el => {
  el.addEventListener('click', ticketTypeHandler);
});

ticketButtons.forEach(el => {
  el.addEventListener('click', ticketsPriceHandler);
});

ticketTypeSelect.addEventListener('change', ticketTypeHandler);

ticketDate.addEventListener('change', ticketDateHandler);
ticketTime.addEventListener('change', ticketTimeHandler);

ticketOwnerName.addEventListener('input', validateTextInput);
ticketOwnerMail.addEventListener('input', validateEmailInput);
ticketOwnerPhone.addEventListener('input', validatePhoneInput);
