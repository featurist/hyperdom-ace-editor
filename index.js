var hyperdom = require('hyperdom');
var h = hyperdom.html;
var brace = require('brace');

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

function renderAceEditor(options, element) {
  var binding = hyperdom.binding(options.binding);
  return h.component(
    {
      key: options.key,
      onadd: function (element) {
        var self = this;
        this.binding = binding;
        var bindingText = binding.get();

        if (bindingText instanceof Error) {
          this.text = '';
        } else {
          this.text = bindingText;
        }

        var editor = aceify(element, options);
        this.document = editor.getSession().getDocument();
        this.document.setValue(this.text);

        this.document.on('change', function () {
          if (!self.settingValue) {
            self.text = self.document.getValue();
            self.binding.set(self.text);
          }
        });

        this.editor = editor;
      },
      onupdate: function (element) {
        var newText = binding.get();
        if (!(newText instanceof Error) && this.text != newText) {
          this.text = newText;
          this.settingValue = true;
          try {
            this.document.setValue(this.text);
          } finally {
            delete this.settingValue;
          }
        }
      }
    },
    element
  );
}

module.exports = renderAceEditor;
