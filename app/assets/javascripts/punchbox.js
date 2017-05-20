class Punchbox {
  constructor() {
    this._onPageLoad(() => {
      this._assignAttributes();
      this.render();
    });
  }

  render() {
    let punchbox = Punchbox[this.controller];
    let namespace = this._getNamespace(punchbox);
    // let controller = Punchbox[this.controller]._namespace;
    console.log(namespace);
  }

  _assignAttributes() {
    let bodyTag = document.getElementsByTagName('body')[0];

    this.controller = bodyTag.dataset.punchboxController;
    this.action = bodyTag.dataset.punchboxAction;
  }

  _getNamespace(pbInstance) {
    if(typeof pbInstance._namespace === 'undefined') {
      return null;
    } else if (typeof pbInstance._namespace === 'function') {
      return pbInstance._namespace();
    } else {
      return pbInstance._namespace;
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
