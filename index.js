var hyperdom = require('hyperdom');
var h = hyperdom.html;
var brace = require('brace');

function extend(object, extension) {
  Object.keys(extension).forEach(function (key) {
    object[key] = extension[key];
  });

  return object;
}

function aceify(element, options) {
  var editor = brace.edit(element);
  var session = editor.getSession();

  function option(subject, name, defaultValue) {
    var setter = subject["set" + name[0].toUpperCase() + name.slice(1)];
    if (typeof(options[name]) != 'undefined') {
      setter.call(subject, options[name]);
    }
    else if (typeof(defaultValue) != 'undefined') {
      setter.call(subject, defaultValue);
    }
  }

  option(editor, 'displayIndentGuides', false);
  option(session, 'tabSize', 2);
  option(session, 'useSoftTabs', true);

  var editorOptions = {maxLines: Infinity};
  if (options.options) {
    extend(editorOptions, options.options);
  }
  editor.setOptions(editorOptions);
  editor.$blockScrolling = Infinity;

  if (options.theme) {
    editor.setTheme("ace/theme/" + options.theme);
  }
  if (options.mode) {
    session.setMode("ace/mode/" + options.mode);
  }
  if (options.configure) {
    options.configure(editor);
  }

  return editor;
}

function AceEditor(options) {
  var binding = typeof options == 'object' && options.hasOwnProperty('binding')? options.binding: [this, 'text'];
  this._render = typeof options == 'object' && options.hasOwnProperty('render')? options.render: undefined;
  this.binding = hyperdom.binding(binding);
  this.options = options || {};
};

AceEditor.prototype.onadd = function(element) {
  var self = this;
  var bindingText = this.binding.get();

  if (bindingText instanceof Error) {
    this.text = '';
  } else {
    this.text = bindingText;
  }

  var editor = aceify(element, this.options);
  this.document = editor.getSession().getDocument();
  this.document.setValue(this.text);

  this.document.on('change', function () {
    if (!self.settingValue) {
      self.text = self.document.getValue();
      self.binding.set(self.text);
    }
  });

  this.editor = editor;
};

AceEditor.prototype.onupdate = function(element) {
  var newText = this.binding.get(this.text);
  if (!(newText instanceof Error) && this.text != newText) {
    this.text = newText;
    this.settingValue = true;
    try {
      this.document.setValue(this.text);
    } finally {
      delete this.settingValue;
    }
  }
};

AceEditor.prototype.render = function() {
  return this._render? this._render(): h('div');
};

module.exports = AceEditor;
