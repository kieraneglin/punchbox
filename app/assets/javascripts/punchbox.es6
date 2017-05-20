class Punchbox {
  static on(controller, classOrObject) {
    let punchbox = new Punchbox();
    punchbox.instantiatable = classOrObject;

    punchbox._onPageLoad(() => {
      punchbox._assignAttributes();
      if (controller === punchbox.pascalController) {
        punchbox._run();
      }
    });
  }

  _assignAttributes() {
    let bodyTag = document.getElementsByTagName('body')[0];

    this.controller = bodyTag.dataset.punchboxController;
    this.pascalController = this._snakeToPascal(this.controller);
    this.action = bodyTag.dataset.punchboxAction;
  }

  _callIfExists(functionName) {
    let instance = this.instantiatable;

    if (typeof instance[functionName] === 'function') {
      instance[functionName]();
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
    document.dispatchEvent(new Event(`punchbox:${this.controller}:run`));

    this._callIfExists(this.action);
    document.dispatchEvent(new Event(`punchbox:${this.controller}:${this.action}:run`));
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
