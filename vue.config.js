const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/PI-CAIWeb/'
    : '/',
    
  transpileDependencies: true,

  chainWebpack: (config) => {
    config.module
      .rule("markdown")
      .test(/\.md$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  },

  pages: {
    index: {
      entry: "src/main.js",
      title: "PI-CAI",
    },
  },
});
