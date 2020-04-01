const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const yaml = require('js-yaml');

class GrowDocument {

  constructor(filePath) {
    console.log('New Grow Document @', filePath);
    const data = fs.readFileSync(path.join(__dirname, '..', filePath), 'utf8');

    if (filePath.endsWith('.yaml')) {
      this.data = yaml.safeLoad(data);
      console.log(this.data);
    } else if (filePath.endsWith('.md') || filePath.endsWith('.html')) {
      this.data = matter(data);
    } else {
      this.data = {};
    }
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
