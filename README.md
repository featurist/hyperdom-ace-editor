# plastiq-ace-editor

A [plastiq](https://github.com/featurist/plastiq) component that embeds the
[ace editor](https://github.com/ajaxorg/ace).

[Demo](http://www.featurist.co.uk/plastiq-ace-editor/)

## Example

```JavaScript
var plastiq = require('plastiq');
var ace = require('plastiq-ace-editor');
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

plastiq.append(document.body, render, { code: 'var x = 123;' });
```

## License

MIT
