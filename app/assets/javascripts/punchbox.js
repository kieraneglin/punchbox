var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Punchbox = function () {
  function Punchbox() {
    _classCallCheck(this, Punchbox);
  }

  _createClass(Punchbox, [{
    key: '_assignAttributes',
    value: function _assignAttributes() {
      var bodyTag = document.getElementsByTagName('body')[0];

      this.controller = bodyTag.getAttribute('data-punchbox-controller');
      this.action = bodyTag.getAttribute('data-punchbox-action');
    }
  }, {
    key: '_callIfExists',
    value: function _callIfExists(functionName) {
      var instance = this.instantiatable;

      if (typeof instance[functionName] === 'function') {
        instance[functionName]();

        if (functionName === 'controller') {
          document.dispatchEvent(new Event('punchbox:' + this.controller + ':run'));
        } else {
          document.dispatchEvent(new Event('punchbox:' + this.controller + ':' + this.action + ':run'));
        }
      }
    }
  }, {
    key: '_instantiate',
    value: function _instantiate() {
      var classOrObject = this.instantiatable;

      if (typeof classOrObject === 'function') {
        return new classOrObject();
      } else if ((typeof classOrObject === 'undefined' ? 'undefined' : _typeof(classOrObject)) === 'object') {
        return classOrObject;
      }
    }
  }, {
    key: '_onPageLoad',
    value: function _onPageLoad(callback) {
      if (window.Turbolinks) {
        var loadEvent = Turbolinks.EVENTS ? 'page:change' : 'turbolinks:load';

        document.addEventListener(loadEvent, function () {
          callback();
        });
      } else {
        window.onload = function () {
          callback();
        };
      }
    }
  }, {
    key: '_run',
    value: function _run() {
      // It's like 4am.  Please excuse my naming
      this.instantiatable = this._instantiate();
      this._callIfExists('controller');
      this._callIfExists(this.action);
    }
  }, {
    key: '_snakeToPascal',
    value: function _snakeToPascal(string) {
      var _this = this;

      return string.split('_').map(function (str) {
        return _this._upperFirst(str.split('/').map(_this._upperFirst).join('/'));
      }).join('');
    }
  }, {
    key: '_upperFirst',
    value: function _upperFirst(string) {
      return string.slice(0, 1).toUpperCase() + string.slice(1, string.length);
    }
  }], [{
    key: 'on',
    value: function on(controller, classOrObject) {
      var _this2 = this;

      var punchbox = new Punchbox();
      punchbox.instantiatable = classOrObject;

      punchbox._onPageLoad(function () {
        punchbox._assignAttributes();
        if (controller === _this2._snakeToPascal(punchbox.controller)) {
          punchbox._run();
        }
      });
    }
  }]);

  return Punchbox;
}();
