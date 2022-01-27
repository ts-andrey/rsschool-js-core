import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
require('reveal.js/dist/reveal.css');
require('reveal.js/dist/theme/black.css');

const deck = new Reveal({
  plugins: [Markdown],
});
deck.initialize({
  slideNumber: 'h/v'
});
