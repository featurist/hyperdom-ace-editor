# hyperdom-ace-editor

A [hyperdom](https://github.com/featurist/hyperdom) component that embeds the
[ace editor](https://github.com/ajaxorg/ace).

[Demo](http://www.featurist.co.uk/hyperdom-ace-editor/)

## Example

```JavaScript
var hyperdom = require('hyperdom');
var ace = require('hyperdom-ace-editor');
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

hyperdom.append(document.body, render, { code: 'var x = 123;' });
```

## License

MIT
