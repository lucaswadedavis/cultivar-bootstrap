(function() {

  var root = this;

  var app = {};

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = app;
    }
    exports.app = app;
  }
  else {
    root.app = app;
  }

}).call(this);