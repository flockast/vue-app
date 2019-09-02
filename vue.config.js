const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  pages: {
    index: {
      entry: 'src/index.js',
      title: 'CMS'
    }
  },
  chainWebpack: config => {
    // for remove chunk-vendors
    config.optimization.delete('splitChunks');
  },
  configureWebpack: {
    devtool: isDev ? 'eval-source-map' : false
  },
  css: {
    sourceMap: isDev,
    loaderOptions: {
      sass: {
        data:
          `@import "@/assets/styles/abstracts/_variables.scss";
           @import "@/assets/styles/abstracts/_mixins.scss";
          `
      }
    }
  }
};
