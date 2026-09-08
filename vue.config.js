const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: "/",

  transpileDependencies: true,

  devServer: {
    // Allows previewing the dev server through a tunnel (e.g. cloudflared,
    // localtunnel), whose hostname webpack-dev-server otherwise rejects as
    // an "Invalid Host header" under its DNS-rebinding protection.
    allowedHosts: "all",
  },

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
