const quoteRandomizer = document.querySelector('.quote-new');
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');

console.log({ quoteText, quoteAuthor });

async function getQuotes() {
  const randomQuoteNumber = Math.floor(Math.random() * 99);
  const quoteFile = './assets/quotes.eng.json';
  const response = await fetch(quoteFile);
  const data = await response.json();
  quoteText.textContent = data[randomQuoteNumber].text;
  quoteAuthor.textContent = data[randomQuoteNumber].author;
}

getQuotes();

function quoteHandler() {
  getQuotes();
}

quoteRandomizer.addEventListener('click', quoteHandler);
