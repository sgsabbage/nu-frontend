module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      "^/api": {
        target: "http://app:8000",
        changeOrigin: true,
        ws: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      // Add another loader
      .rule("font")
      .test("/\\.(woff(2)?|ttf|eot|svg)(\\?v=\\d+\\.\\d+\\.\\d+)?$/,")
      .use("file-loader")

      .loader("file-loader")
      .tap(() => {
        return {
          name: "[name].[ext]",
          outputPath: "fonts/",
        };
      })
      .end();
  },
};
