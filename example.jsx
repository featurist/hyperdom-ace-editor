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
      <AceEditor class="hyperdom-ace-editor" theme="monokai" mode="javascript" binding="this.code" />
      <textarea binding="this.code" />
    </div>
  }
}

hyperdom.append(document.body, new App());
