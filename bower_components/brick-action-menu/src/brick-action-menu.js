/* global Platform */

(function () {

  var currentScript = document._currentScript || document.currentScript;

  var BrickActionMenuElementPrototype = Object.create(HTMLElement.prototype);

  // Custom methods

  BrickActionMenuElementPrototype.show = function (callback) {
    this.ns.callback = callback;

    var form = this.shadowRoot.querySelector('form');
    form.setAttribute('show', 'in');

    function animEnd (ev) {
      this.removeEventListener('animationend', animEnd);
      form.setAttribute('show', '');
    };
    form.querySelector('fieldset').addEventListener('animationend', animEnd);
  };

  BrickActionMenuElementPrototype.hide = function () {
    this.ns.callback = null;

    var form = this.shadowRoot.querySelector('form');
    form.setAttribute('show', 'out');

    function animEnd (ev) {
      if (ev.target !== this) { return; }
      this.removeEventListener('animationend', animEnd);
      form.removeAttribute('show');
    };
    form.addEventListener('animationend', animEnd, false);
  };

  var EV_PICK = 'pick';
  var RE_BUTTON = /^button$/i;

  // Lifecycle methods

  BrickActionMenuElementPrototype.createdCallback = function () {

    this.ns = { };

    var importDoc = currentScript.ownerDocument;
    var templateContent = importDoc.querySelector('template').content;

    shimShadowStyles(templateContent.querySelectorAll('style'),'brick-action-menu');

    // create shadowRoot and append template to it.
    var shadowRoot = this.createShadowRoot();
    shadowRoot.appendChild(templateContent.cloneNode(true));

    // Event delegation for all buttons in the menu
    this.addEventListener('click', function (e) {
      if (!RE_BUTTON.test(e.target.tagName)) { return; }

      // Do we have a callback supplied from show()?
      if (this.ns.callback) {

        // HACK: Defer the callback, yielding for animations & etc.
        (function (cb) {
          setTimeout(function () { cb(e.target); }, 0.1);
        })(this.ns.callback);

        // Clear the callback (which is why we just used a closure to defer)
        this.ns.callback = null;

      }

      // Dispatch a custom event for the menu item pick
      e.target.dispatchEvent(new CustomEvent(EV_PICK, {
        bubbles: true
      }));

      // Finish up by hiding the menu.
      return this.hide();
    });

    // Squelch the form submission process
    this.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();
    });

  };

  BrickActionMenuElementPrototype.detachedCallback = function () {
    this.ns = null;
  };

  // Register the element
  window.BrickActionMenuElement = document.registerElement('brick-action-menu', {
    prototype: BrickActionMenuElementPrototype
  });

  // Utility funcitons

  function shimShadowStyles(styles, tag) {
    if (!Platform.ShadowCSS) {
      return;
    }
    for (var i = 0; i < styles.length; i++) {
      var style = styles[i];
      var cssText = Platform.ShadowCSS.shimStyle(style, tag);
      Platform.ShadowCSS.addCssToDocument(cssText);
      style.remove();
    }
  }

})();
