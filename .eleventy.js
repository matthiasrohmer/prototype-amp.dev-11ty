const yaml = require('js-yaml');
const matter = require('gray-matter');

const {GROW_YAML_SCHEMA} = require('./lib/GrowYamlTypes.js');

const yamlSafeLoad = yaml.safeLoad;
function loadYaml(input, opts={}) {
  opts['schema'] = GROW_YAML_SCHEMA;
  return yamlSafeLoad(input, opts);
}

matter.engines.yaml.parse = loadYaml;
yaml.safeLoad = loadYaml;

module.exports = function(eleventyConfig) {
  return {
    dir: {
      input: 'amp-dev',
      output: 'dist',
      includes: '_includes',
      layouts: '_layouts'
    },
    markdownTemplateEngine: 'njk'
  }
};
