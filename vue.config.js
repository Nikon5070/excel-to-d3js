module.exports = {
  lintOnSave: false,

  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/assets/styl/variables.scss";
        `,
      },
    },
  },
};
