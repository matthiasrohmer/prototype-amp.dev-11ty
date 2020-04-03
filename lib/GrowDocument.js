const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const yaml = require('js-yaml');

class GrowDocument {

  constructor(filePath) {
    console.log('New Grow Document @', filePath);
    this.data = null;
    try {
      this.data = fs.readFileSync(path.join(__dirname, '..', filePath), 'utf8');
    } catch(e) {
      console.warn('No document exists at', filePath);
    }

    if (this.data && filePath.endsWith('.yaml')) {
      this.data = yaml.safeLoad(this.data);
    } else if (this.data && (filePath.endsWith('.md') || filePath.endsWith('.html'))) {
      this.data = matter(this.data);
    } else {
      this.data = {};
    }
  }

  titles(key) {
    if (this.data.titles && this.data.titles[key]) {
      return this.data.titles[key];
    }

    if (this.data.$titles && this.data.$titles[key]) {
      return this.data.$titles[key];
    }

    return this.data.title;
  }
}

function createGrowDocument(filePath) {
  const doc = new GrowDocument(filePath);

  return new Proxy(doc, {
    get: (doc, property) => {
      return doc[property] || doc.data[property] || undefined;
    }
  });
}

module.exports = {
  createGrowDocument
};
