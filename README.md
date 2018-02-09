# hyperdom-ace-editor

A [hyperdom](https://github.com/featurist/hyperdom) component that embeds the
[ace editor](https://github.com/ajaxorg/ace).

[Demo](http://www.featurist.co.uk/hyperdom-ace-editor/)

## Example

```jsx
var hyperdom = require('hyperdom');
var AceEditor = require('hyperdom-ace-editor');

require('brace/mode/javascript');
require('brace/theme/monokai');

class App {
  constructor () {
    this.code = 'var x = 123'
  }

  render () {
    return <div>
      <AceEditor theme="monokai" mode="javascript" binding="this.code" />
      <textarea binding="this.code" />
    </div>
  }
}

hyperdom.append(document.body, new App());
```

## License

MIT

## We're Hiring!
Featurist provides full stack, feature driven development teams. Want to join us? Check out [our career opportunities](https://www.featurist.co.uk/careers/).
