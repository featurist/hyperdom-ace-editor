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

function AceEditor(options, children) {
  this.binding = typeof options == 'object' && options.hasOwnProperty('binding')? options.binding: [this, 'text'];
  this.options = options || {};
  this.children = children
}

AceEditor.prototype.onadd = function(element) {
  var self = this;
  var binding = hyperdom.binding(this.binding);
  var bindingText = binding.get();

  if (bindingText instanceof Error) {
    this.value = '';
  } else {
    this.value = bindingText;
  }

  var editor = aceify(element, this.options);
  this.document = editor.getSession().getDocument();
  this.document.setValue(this.value);

  this.document.on('change', hyperdom.refreshify(function () {
    if (!self.settingValue) {
      self.value = self.document.getValue();
      binding.set(self.value);
    }
  }))

  this.editor = editor;
};

AceEditor.prototype.onupdate = function() {
  var binding = hyperdom.binding(this.binding);
  var newText = binding.get(this.value);
  if (!(newText instanceof Error) && this.value != newText) {
    this.value = newText;
    this.settingValue = true;
    try {
      this.document.setValue(this.value);
    } finally {
      delete this.settingValue;
    }
  }
};

AceEditor.prototype.render = function() {
  if (this.children) {
    if (this.children instanceof Array) {
      if (this.children.length >= 1) {
        return this.children[0]
      }
    } else {
      return this.children
    }
  }

  return h('div')
};

module.exports = AceEditor;
