var hyperdom = require('hyperdom');
var ace = require('../');
var h = hyperdom.html;

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

hyperdom.append(document.body, render, { code: render.toString() });
