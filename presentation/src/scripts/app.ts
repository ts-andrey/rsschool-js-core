import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

const deck: Reveal = new Reveal({
  plugins: [Markdown],
});
deck.initialize();
