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
    this.appendChild(this.root);
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
    $this.log("CLEARING DB RECORDS");
    $this.storage.clear().then(function (objs) {
      $this.log("DONE CLEARING DB RECORDS");
    });
  };

  ElementPrototype.dump = function () {
    var $this = this;
    $this.log("DUMPING DB RECORDS");
    $this.storage.getMany().then(function (objs) {
      objs.forEach(function (obj) {
        $this.log(JSON.stringify(obj));
      });
      $this.log("DONE DUMPING DB RECORDS");
    });
  };

  ['alpha', 'beta', 'gamma'].forEach(function (name) {
    ElementPrototype['put_' + name] = function () {
      var $this = this;
      var obj = {
        name: name,
        created: Date.now()
      };
      $this.storage.insert(obj).then(function (key) {
        $this.log("PUT " + name + ": " + key + " = " + JSON.stringify(obj));
      });
    };
  });

  document.registerElement('busybox-storage-demo', {
    prototype: ElementPrototype
  });

}());
