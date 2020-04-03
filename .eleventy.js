const yaml = require('js-yaml');
const matter = require('gray-matter');
const Nunjucks = require('nunjucks');

const {GROW_YAML_SCHEMA} = require('./lib/GrowYamlTypes.js');

const yamlSafeLoad = yaml.safeLoad;
function loadYaml(input, opts={}) {
  opts['schema'] = GROW_YAML_SCHEMA;
  return yamlSafeLoad(input, opts);
}

matter.engines.yaml.parse = loadYaml;
yaml.safeLoad = loadYaml;

const nunjucksTags = require('./lib/nunjucksTags.js');
const { RenderedDocument } = require('./lib/RenderedDocument.js');
const growTemplateFunctions = require('./lib/growTemplateFunctions.js');

module.exports = function(eleventyConfig) {
  let nunjucksEnvironment = new Nunjucks.Environment([
    new Nunjucks.FileSystemLoader([
      'amp-dev/_includes',
      'amp-dev/_layouts'
    ]),
  ]);
  nunjucksEnvironment.addGlobal('doc', new RenderedDocument());
  nunjucksEnvironment.addGlobal('g', growTemplateFunctions);
  nunjucksEnvironment.addGlobal('_', nunjucksEnvironment.filters.safe);

  eleventyConfig.setLibrary('njk', nunjucksEnvironment);

  eleventyConfig.addNunjucksTag('do', nunjucksTags.do);
  // eleventyConfig.addNunjucksTag('with', nunjucksTags.with);

  eleventyConfig.addTransform('inline-assets', function(content, outputPath) {
    console.log('Called transformer!');

    if (outputPath.endsWith('.html')) {
      let transformedContent = content;
      content.replace(/<!--style:(.*?)-->/gms, (match, css) => {
        transformedContent = transformedContent.replace(match, '').replace('<style amp-custom>', `<style amp-custom>${css}`);
      });

      content.replace(/<!--icons:(.*?)-->/gms, (match, icons) => {
        transformedContent = transformedContent.replace(match, '').replace('<defs>', `<defs>${icons}`);
      });

      return transformedContent;
    }

    return content;
  });

  return {
    dir: {
      input: 'amp-dev',
      output: 'dist',
      includes: '_includes',
      layouts: '_layouts'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  }
};
