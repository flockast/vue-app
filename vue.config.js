module.exports = {
  pages: {
    index: {
      entry: "src/index.js",
      title: "CMS"
    }
  },
  chainWebpack: config => {
    // for remove chunk-vendors
    config.optimization.delete("splitChunks");
  },
  productionSourceMap: false
};
