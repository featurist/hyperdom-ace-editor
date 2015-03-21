var plastiq = require('plastiq');
var ace = require('../');
var h = plastiq.html;

require('brace/mode/javascript');
require('brace/theme/monokai');

function render(model) {
  return h('.page',
    ace({
        binding: [model, 'code'],
        key: 'editor',
        theme: 'monokai',
        mode: 'javascript'
      },
      h('pre')
    ),
    h('textarea', { binding: [model, 'code'] })
  );
}

plastiq.append(document.body, render, { code: render.toString() });
