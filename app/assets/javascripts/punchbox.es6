class Punchbox {
  static on(controller, classOrObject) {
    let punchbox = new Punchbox();
    punchbox.instantiatable = classOrObject;

    punchbox._onPageLoad(() => {
      punchbox._assignAttributes();
      if (controller === punchbox._snakeToPascal(punchbox.controller)) {
        punchbox._run();
      }
    });
  }

  _assignAttributes() {
    let bodyTag = document.body;

    this.controller = bodyTag.getAttribute('data-punchbox-controller');
    this.action = bodyTag.getAttribute('data-punchbox-action');
  }

  _callIfExists(functionName) {
    let instance = this.instantiatable;

    if (typeof instance[functionName] === 'function') {
      instance[functionName]();

      if(functionName === 'controller') {
        document.dispatchEvent(new Event(`punchbox:${this.controller}:run`));
      } else {
        document.dispatchEvent(new Event(`punchbox:${this.controller}:${this.action}:run`));
      }
    }
  }

  _instantiate() {
    let classOrObject = this.instantiatable;

    if (typeof classOrObject === 'function') {
      return new classOrObject();
    } else if (typeof classOrObject === 'object') {
      return classOrObject;
    }
  }

  _onPageLoad(callback) {
    if (window.Turbolinks) {
      let loadEvent = Turbolinks.EVENTS ? 'page:change' : 'turbolinks:load';

      document.addEventListener(loadEvent, () => {
        callback();
      });
    } else {
      window.onload = () => {
        callback();
      };
    }
  }

  _run() {
    // It's like 4am.  Please excuse my naming
    this.instantiatable = this._instantiate();
    this._callIfExists('controller');
    this._callIfExists(this.action);
  }

  _snakeToPascal(string) {
    return string.split('_').map((str) => {
      return this._upperFirst(
        str.split('/')
        .map(this._upperFirst)
        .join('/'));
    }).join('');
  }

  _upperFirst(string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1, string.length);
  }
}
