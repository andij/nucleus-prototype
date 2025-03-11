const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const path = require('path');

module.exports = function (eleventyConfig) {
  // Copy `src/assets/img` to `_site/assets/img`
  eleventyConfig.addPassthroughCopy("src/assets/img");

  // https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  
  eleventyConfig.addFilter('sortByFilename', (collection) => {
    return collection.sort((a, b) => {
      const filenameA = path.basename(a.inputPath);
      const filenameB = path.basename(b.inputPath);
      return filenameA.localeCompare(filenameB);
    });
  });

  // https://browsersync.io/docs/options
  eleventyConfig.setServerOptions({
    module: "@11ty/eleventy-server-browsersync",
    https: true,
    port: 8080,
    open: false,
    codeSync: false,
    notify: false,
    ghostMode: {
      clicks: true,
      scroll: true,
      forms: false,
    },
    ui: {
      port: 3001,
    },
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
