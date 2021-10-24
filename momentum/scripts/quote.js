const quoteRandomizer = document.querySelector('.quote-new');
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');

const engQuotes = './assets/quotes.eng.json';
const ruQuotes = './assets/quotes.ru.json';

async function getQuotes() {
  let quotes = window.localStorage.getItem('language') === 'eng' ? engQuotes : ruQuotes;
  const randomQuoteNumber = Math.floor(Math.random() * 99);
  const response = await fetch(quotes);
  const data = await response.json();
  quoteText.textContent = data[randomQuoteNumber].text;
  quoteAuthor.textContent = data[randomQuoteNumber].author;
}

function quoteHandler() {
  getQuotes();
}

quoteRandomizer.addEventListener('click', quoteHandler);
window.addEventListener('load', quoteHandler);

export { getQuotes };
