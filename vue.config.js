module.exports = {
  devServer: {
    disableHostCheck: true,
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
