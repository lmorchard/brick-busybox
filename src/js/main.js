(function () {

  var ElementPrototype = Object.create(HTMLElement.prototype);

  var importDoc = document.implementation.createHTMLDocument('');
  importDoc.body.innerHTML = [
    '<textarea cols="50" rows="14"></textarea>'
  ].join('');

  ElementPrototype.createdCallback = function () {
    var root = this.root = document.createElement('div');
    root.className = 'brick-select-proxy-root';
    root.appendChild(importDoc.body.firstChild.cloneNode(true));

    if (this.hasAttribute('storage')) {
      this.storage = document.getElementById(this.getAttribute('storage'));
    }
  };

  ElementPrototype.attachedCallback = function () {
    var $this = this;
    this.appendChild(this.root);
    setTimeout(function () {
      $this.dump();
    }, 0.1);
  };

  ElementPrototype.detachedCallback = function () {
    this.root.parentNode.removeChild(this.root);
  };

  ElementPrototype.log = function (msg) {
    var ta = this.querySelector('textarea');
    if (!ta) { return; }
    ta.value = ta.value + Date.now() + ': ' + msg + "\n";
    ta.scrollTop = 9999;
  };

  ElementPrototype.clear = function () {
    var $this = this;
    $this.log("Clearing db records...");
    $this.storage.clear().then(function (objs) {
      $this.log("Done clearing db records");
    }).catch(function (err) {
      $this.log("ERR CLEARING " + err);
    });
  };

  ElementPrototype.dump = function () {
    var $this = this;
    $this.log("Dumping db records...");
    $this.storage.getMany().then(function (objs) {
      objs.forEach(function (obj) {
        $this.log(JSON.stringify(obj));
      });
      $this.log("Done dumping db records");
    });
  };

  ['alpha', 'beta', 'gamma'].forEach(function (name) {
    ElementPrototype['set_' + name] = function () {
      var $this = this;
      var obj = {
        _id: name,
        note: 'Updated at ' + Date.now()
      };
      $this.storage.set(obj).then(function (key) {
        $this.log("Set " + key + " = " + JSON.stringify(obj));
      }).catch(function (err) {
        $this.log("ERR SET " + err.name);
      });
    };
  });

  document.registerElement('busybox-storage-demo', {
    prototype: ElementPrototype
  });

}());
