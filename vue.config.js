module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,

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
