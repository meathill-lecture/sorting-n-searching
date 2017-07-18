import { getSearchParams, load } from './helper';

let query = getSearchParams(location.search);

Reveal.initialize({
  history: true,
  controls: 'controls' in query ? query.controls : true,
  transition: query.transition || 'slide',
  dependencies: [
    {
      src: './node_modules/reveal.js/plugin/markdown/marked.js',
      condition: function () {
        return !!document.querySelector('[data-markdown]');
      }
    },
    {
      src: './node_modules/reveal.js/plugin/markdown/markdown.js',
      condition: function () {
        return !!document.querySelector('[data-markdown]');
      }
    },
    {
      src: './node_modules/reveal.js/plugin/highlight/highlight.js',
      async: true,
      callback: function () {
        hljs.initHighlightingOnLoad();
      }
    }
  ]
});

if (query.print) {
  load('./node_modules/reveal.js/css/print/pdf.css');
}

if (query.platform) {
  document.body.classList.add(query.platform);
}