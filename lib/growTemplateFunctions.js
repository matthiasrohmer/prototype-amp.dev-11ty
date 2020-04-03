const {createGrowDocument} = require('./GrowDocument.js');

module.exports = {
  collection: function(collectionPath) {
    return collectionPath;
  },
  doc: function(docPath) {
    return createGrowDocument(docPath);
  }
}
