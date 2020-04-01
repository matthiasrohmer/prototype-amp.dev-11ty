const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

const { createGrowDocument } = require('./GrowDocument.js');

const GYamlYamlType = new yaml.Type('!g.yaml', {
  kind: 'scalar',
  resolve: (data) => {
    return !!data;
  },

  construct: (filePath) => {
    const data = fs.readFileSync(path.join(__dirname, '..', filePath), 'utf8');
    return yaml.safeLoad(data);
  },

  instanceOf: String,
});

const GDocYamlType = new yaml.Type('!g.doc', {
  kind: 'scalar',
  resolve: (data) => {
    return !!data;
  },

  construct: (filePath) => {
    return createGrowDocument(filePath);
  },

  instanceOf: String,
});

const GROW_YAML_SCHEMA = yaml.Schema.create([
  GYamlYamlType,
  GDocYamlType,
]);

module.exports = {
  GYamlYamlType,
  GDocYamlType,
  GROW_YAML_SCHEMA
};
