const fs = require('fs');
const path = require('path');

const DEFAULT_LOCALE = 'en';

class Icons {

  constructor() {
    this.cache = {};
    this.icons = {};
  }

  useIcon(name) {
    if (!this.cache[name]) {
      let icon = null;
      try {
        icon = fs.readFileSync(path.join(__dirname, '..', name), 'utf8');
      } catch (e) {
        console.error('Icon does not exist:', name);
        return;
      }

      this.cache[name] = icon;
    }

    if (!this.icons[name]) {
      this.icons[name] = this.cache[name];
    }
  }

  emit() {
    return Object.values(this.icons).join('');
  }

  reset() {
    this.icons = {};
  }
}

class AmpDependencies {

  constructor() {
    this.extensions = [];
  }

  add(extensionName, version) {
    this.extensions.push({extensionName, version});
  }

  emit() {
    const scripts = [];
    for (const extension of this.extensions) {
      scripts.push(`<script custom-element="${extension.extensionName}" src="https://cdn.ampproject.org/v0/${extension.extensionName}-${extension.version}.js" async></script>`)
    }

    return scripts.join('');
  }

  reset() {
    this.extensions = [];
  }
}

class DocumentStyles {

  constructor() {
    this.cache = {};
    this.cssFiles = {};
  }

  addCssFile(filePath) {
    if (!this.cache[filePath]) {
      let css = null;
      try {
        css = fs.readFileSync(path.join(__dirname, '..', filePath), 'utf8');
      } catch (e) {
        console.error('CSS does not exist:', filePath);
        return;
      }

      this.cache[filePath] = css;
    }

    if (!this.cssFiles[filePath]) {
      this.cssFiles[filePath] = this.cache[filePath];
    }
  }

  emit() {
    return Object.values(this.cssFiles).join('');
  }

  reset() {
    this.cssFiles = {};
  }
}

class Pod {

  get_represented_locales(doc) {
    return [DEFAULT_LOCALE];
  }

  get amp_dev() {
    return {
      get_represented_locales: this.get_represented_locales
    };
  }
}

const POD = new Pod();

class RenderedDocument {

  constructor(filePath = '') {
    this.filePath = filePath;
    this.styles = new DocumentStyles();
    this.amp_dependencies = new AmpDependencies();
    this.icons = new Icons();
  }

  titles(key) {
    return '';
  }

  get title() {
    return '';
  }

  localize() {
    return this;
  }

  get locales() {
    return [DEFAULT_LOCALE];
  }

  get locale() {
    return DEFAULT_LOCALE;
  }

  get pod() {
    return POD;
  }

  get html() {
    return true;
  }

  get pod_path() {
    return this.filePath;
  }

  reset(page, context) {
    console.log(page, context);
    console.log(Object.keys(this.styles.cssFiles));

    this.styles.reset();
    this.icons.reset();
    this.amp_dependencies.reset();
  }
}

module.exports = {
  RenderedDocument
};
