class Punchbox {
  constructor() {
    this._onPageLoad(() => {
      this._assignAttributes();
      this.render();
    });
  }

  render() {
    let controller = new Punchbox[this.controller]();
    let action = controller[this.action]();
    let namespace = this._getNamespace(controller);
  }

  _assignAttributes() {
    let bodyTag = document.getElementsByTagName('body')[0];

    this.controller = bodyTag.dataset.punchboxController;
    this.action = bodyTag.dataset.punchboxAction;
  }

  _getNamespace(controller) {
    if(typeof controller._namespace === 'undefined') {
      return null;
    } else if (typeof controller._namespace === 'function') {
      return controller._namespace();
    } else {
      return controller._namespace;
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

  _snakeToCamelCase(string){
    return string.replace(/(_\w)/g, (m) => {
      return m[1].toUpperCase();
    });
  }
}

new Punchbox();
