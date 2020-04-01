module.exports = function(config) {
  config.module.rules.push({
    test: /\.(html)$/,
    use: [
      {
        loader: "@skpm/extract-loader"
      },
      {
        loader: "html-loader",
        options: {
          attrs: ["img:src", "link:href"],
          interpolate: true
        }
      }
    ]
  });
  config.module.rules.push({
    test: /\.(css)$/,
    use: [
      {
        loader: "@skpm/extract-loader"
      },
      {
        loader: "css-loader"
      }
    ]
  });
};
